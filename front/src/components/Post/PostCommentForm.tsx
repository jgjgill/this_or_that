import { useMutation } from '@tanstack/react-query'
import Input from 'components/Common/Input'
import { useCookieLoginError } from 'hooks/useCookieLoginError'
import { queryClient } from 'index'
import { SubmitHandler, useForm } from 'react-hook-form'
import { postNewComment } from 'services/api'
import styles from './postCommentForm.module.scss'

interface PostCommentProps {
  postId: number
}

const PostCommentForm = ({ postId }: PostCommentProps) => {
  const notLoginError = useCookieLoginError()

  const { register, handleSubmit, reset } = useForm<{ comment: string }>()

  const mutationNewComment = useMutation((commentData: { comment: string }) => postNewComment(commentData, postId), {
    onSuccess: () => {
      queryClient.invalidateQueries(['post', String(postId)]).then(() => {
        setTimeout(() => {
          window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
        }, 0)
      })
    },
  })

  const formValid: SubmitHandler<{ comment: string }> = (commentData) => {
    notLoginError()

    mutationNewComment.mutate(commentData)

    reset()
  }

  return (
    <form onSubmit={handleSubmit(formValid)} className={styles.commentForm}>
      <Input placeholder='comment' register={register('comment', { required: true })} />

      <button type='submit' className={styles.submitButton}>
        Submit
      </button>
    </form>
  )
}

export default PostCommentForm

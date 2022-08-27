import { useMutation } from '@tanstack/react-query'
import Input from 'components/Common/Input'
import { queryClient } from 'index'
import { SubmitHandler, useForm } from 'react-hook-form'
import { postNewComment } from 'services/api'
import styles from './postCommentForm.module.scss'

interface PostCommentProps {
  postId: number
  userId?: number
}

const PostCommentForm = ({ postId, userId }: PostCommentProps) => {
  const { register, handleSubmit, reset } = useForm<{ comment: string }>()

  const mutationNewComment = useMutation((newComment: any) => postNewComment(newComment, String(postId)), {
    onSettled: () => {
      queryClient.invalidateQueries(['post', String(postId)]).then(() => {
        setTimeout(() => {
          window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
        }, 0)
      })
    },
  })

  const formValid: SubmitHandler<{ comment: string }> = (data) => {
    if (!userId) return

    mutationNewComment.mutate({ comment: data.comment })

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

import { useMutation } from '@tanstack/react-query'
import Input from 'components/Common/Input'
import { SubmitHandler, useForm } from 'react-hook-form'
import { postNewComment } from 'services/api'
import styles from './postCommentForm.module.scss'

interface PostCommentProps {
  postId: string
}

const PostCommentForm = ({ postId }: PostCommentProps) => {
  const { register, handleSubmit, reset } = useForm<{ comment: string }>()

  const mutationNewComment = useMutation((newComment: any) => postNewComment(newComment, postId))

  const formValid: SubmitHandler<{ comment: string }> = (data) => {
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

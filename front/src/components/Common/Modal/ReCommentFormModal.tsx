import { useMutation } from '@tanstack/react-query'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { queryClient } from 'index'
import { useRef } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { useClickAway } from 'react-use'
import { postNewReComment } from 'services/api'
import { setIsViewFalse } from 'states/reCommentModalData'
import SubmitButton from '../Button/SubmitButton'
import Input from '../Input'
import styles from './reCommentFormModal.module.scss'

interface ReCommentFormModalProps {
  isView: boolean
  commentId: number
}

const ReCommentFormModal = ({ isView, commentId }: ReCommentFormModalProps) => {
  const ref = useRef(null)

  const { register, handleSubmit, reset } = useForm<{ reComment: string }>()

  const { postId } = useParams()

  const dispatch = useAppDispatch()

  const scrollToCommentId = (reCommentId: number) => {
    const comment = document.body.querySelector<HTMLDivElement>(
      `.postReCommentItem_reCommentWrapper__Eqmbo${reCommentId}`
    )
    if (!comment) return

    comment.scrollIntoView({ behavior: 'smooth' })
  }

  const mutationNewComment = useMutation((newReComment: any) => postNewReComment(newReComment, postId!, commentId), {
    onSettled: (data) => {
      if (!data) return

      queryClient.invalidateQueries(['post', postId])

      setTimeout(() => {
        scrollToCommentId(data.data.id)
      }, 50)
    },
  })

  const formValid: SubmitHandler<{ reComment: string }> = (data) => {
    mutationNewComment.mutate({ comment: data.reComment })

    reset()
    dispatch(setIsViewFalse())
  }

  useClickAway(ref, () => {
    dispatch(setIsViewFalse())
  })

  if (!isView) return null

  return (
    <form ref={ref} onSubmit={handleSubmit(formValid)} className={styles.reCommentForm}>
      <Input placeholder='ReComment' register={register('reComment', { required: true })} />

      <SubmitButton text='Submit' />
    </form>
  )
}

export default ReCommentFormModal

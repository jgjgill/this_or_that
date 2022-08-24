import { useMutation } from '@tanstack/react-query'
import { LikeIcon } from 'assets/svgs'
import dayjs from 'dayjs'
import { queryClient } from 'index'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { postNewCommentLike } from 'services/api'
import { cx } from 'styles'
import styles from './postCommentItem.module.scss'

interface PostCommentItemProps {
  postCommentData: any
  isLiked: boolean
}

const PostCommentItem = ({ postCommentData, isLiked }: PostCommentItemProps) => {
  const [likeText, setLikeText] = useState('Like')

  const { postId } = useParams()

  const mutationNewCommentLike = useMutation((commentId: string) => postNewCommentLike(commentId), {
    onSettled: () => {
      queryClient.invalidateQueries(['myPostInfo', postId])
      queryClient.invalidateQueries(['post', postId])
    },
  })

  const postCreatedAt = dayjs(postCommentData.createdAt).format('YYYY-MM-DD')

  const handleClickLike = () => {
    mutationNewCommentLike.mutate(String(postCommentData.id))
  }

  useEffect(() => {
    isLiked ? setLikeText('UnLike') : setLikeText('Like')
  }, [isLiked])

  return (
    <li className={styles.temp}>
      <span>{postCommentData.content}</span>

      <div className={styles.commentUserInfoWrapper}>
        <button type='button' onClick={handleClickLike} className={styles.likeButton}>
          <LikeIcon className={cx(styles.svgIcon, { [styles.toggleLike]: isLiked })} />
          <span className={styles.likeText}>{likeText}</span>
        </button>

        <div className={styles.likeCountWrapper}>
          <LikeIcon className={cx(styles.svgIcon, { [styles.toggleLike]: true })} />
          <span className={styles.liekCountText}>{postCommentData._count.CommentLike}</span>
        </div>

        <span>{postCommentData.User.name}</span>
        <time dateTime={postCreatedAt}>{postCreatedAt}</time>
      </div>
    </li>
  )
}

export default PostCommentItem

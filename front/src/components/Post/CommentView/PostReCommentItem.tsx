import { useMutation } from '@tanstack/react-query'
import { LikeIcon, RightArrowIcon } from 'assets/svgs'
import CreatedAtText from 'components/Common/Etc/CreatedAtText'
import { queryClient } from 'index'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { postNewReCommentLike } from 'services/api'
import { cx } from 'styles'
import styles from './postReCommentItem.module.scss'

interface PostReCommentItemProps {
  postReCommentData: {
    id: number
    content: string
    reCommentCommentId: number
    reCommentUserId: number
    User: { name: string }
    _count: { ReCommentLike: number }
    createdAt: Date
    updatedAt: Date
  }
  isLiked: boolean
  userId?: number
}

const PostReCommentItem = ({ postReCommentData, isLiked, userId }: PostReCommentItemProps) => {
  const [likeText, setLikeText] = useState('Like')

  const { postId } = useParams()

  const mutationNewReCommentLike = useMutation(() => postNewReCommentLike(postReCommentData.id), {
    onSettled: () => {
      queryClient.invalidateQueries(['myRecommentInfo', postReCommentData.reCommentCommentId])
      queryClient.invalidateQueries(['post', postId])
    },
  })

  const handleClickLike = () => {
    if (!userId) return

    mutationNewReCommentLike.mutate()
  }

  useEffect(() => {
    isLiked ? setLikeText('UnLike') : setLikeText('Like')
  }, [isLiked])

  return (
    <li className={styles.reCommentWrapper}>
      <RightArrowIcon className={styles.rightArrowIcon} />
      <div className={styles.reCommentContent}>
        <span>{postReCommentData.content}</span>

        <div className={styles.reCommentBottomWrapper}>
          <button type='button' onClick={handleClickLike} className={styles.likeButton}>
            <LikeIcon className={cx(styles.svgIcon, { [styles.toggleLike]: isLiked })} />
            <span className={styles.likeText}>{likeText}</span>
          </button>

          <div className={styles.likeCountWrapper}>
            <LikeIcon className={cx(styles.svgIcon, styles.toggleLike)} />
            <span className={styles.liekCountText}>{postReCommentData._count.ReCommentLike}</span>
          </div>

          <span>{postReCommentData.User.name}</span>
          <CreatedAtText dateTime={postReCommentData.createdAt} />
        </div>
      </div>
    </li>
  )
}

export default PostReCommentItem

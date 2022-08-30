import { useMutation } from '@tanstack/react-query'
import { LikeIcon, RightArrowIcon } from 'assets/svgs'
import IconButton from 'components/Common/Button/IconButton'
import CreatedAtText from 'components/Common/Etc/CreatedAtText'
import { useCookieLoginError } from 'hooks/useCookieLoginError'
import { queryClient } from 'index'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { postNewReCommentLike } from 'services/api'
import { cx } from 'styles'
import { IReComment } from 'types/reComment'
import styles from './postReCommentItem.module.scss'

interface PostReCommentItemProps {
  postReCommentData: IReComment
  isLiked: boolean
}

const PostReCommentItem = ({ postReCommentData, isLiked }: PostReCommentItemProps) => {
  const notLoginError = useCookieLoginError()

  const [likeText, setLikeText] = useState('Like')

  const { postId } = useParams()

  const mutationNewReCommentLike = useMutation(() => postNewReCommentLike(postReCommentData.id), {
    onSettled: () => {
      queryClient.invalidateQueries(['myRecommentInfo', postReCommentData.reCommentCommentId])
      queryClient.invalidateQueries(['post', postId])
    },
  })

  const handleClickLike = () => {
    notLoginError()

    mutationNewReCommentLike.mutate()
  }

  useEffect(() => {
    isLiked ? setLikeText('UnLike') : setLikeText('Like')
  }, [isLiked])

  return (
    <li className={cx(styles.reCommentWrapper, styles.reCommentWrapper + String(postReCommentData.id))}>
      <RightArrowIcon className={styles.rightArrowIcon} />
      <div className={styles.reCommentContent}>
        <span>{postReCommentData.content}</span>

        <div className={styles.reCommentBottomWrapper}>
          <IconButton
            IconElement={<LikeIcon className={cx(styles.svgIcon, { [styles.toggleLike]: isLiked })} />}
            onClick={handleClickLike}
            text={likeText}
          />

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

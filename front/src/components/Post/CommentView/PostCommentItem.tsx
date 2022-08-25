import { useMutation, useQuery } from '@tanstack/react-query'
import { ChatIcon, LikeIcon } from 'assets/svgs'
import CreatedAtText from 'components/Common/Etc/CreatedAtText'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { useAppSelector } from 'hooks/useAppSelector'
import { queryClient } from 'index'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMyReCommentInfo, postNewCommentLike } from 'services/api'
import { getReCommentModalValue, setToggleReCommentModal } from 'states/reCommentModalData'
import { cx } from 'styles'
import styles from './postCommentItem.module.scss'
import PostReCommentItem from './PostReCommentItem'

interface PostCommentItemProps {
  postCommentData: {
    id: number
    commentPostId: number
    commentUserId: number
    content: string
    User: { name: string }
    ReComment: {
      id: number
      content: string
      reCommentCommentId: number
      reCommentUserId: number
      User: { name: string }
      _count: { ReCommentLike: number }
      createdAt: Date
      updatedAt: Date
    }[]
    _count: { CommentLike: number }
    createdAt: Date
    updatedAt: Date
  }
  isLiked: boolean
}

const PostCommentItem = ({ postCommentData, isLiked }: PostCommentItemProps) => {
  const [likeText, setLikeText] = useState('Like')

  const { postId } = useParams()

  const dispatch = useAppDispatch()
  const reCommentModalValue = useAppSelector(getReCommentModalValue)

  const { isError, data: myRecommentInfoData } = useQuery(
    ['myRecommentInfo', postCommentData.id],
    () => getMyReCommentInfo(postCommentData.id),
    {
      initialData: { reCommentIsLikedArray: false },
      enabled: postCommentData.ReComment.length !== 0,
      refetchOnWindowFocus: false,
      cacheTime: Infinity,
    }
  )

  const mutationNewCommentLike = useMutation((commentId: string) => postNewCommentLike(commentId), {
    onSettled: () => {
      queryClient.invalidateQueries(['myPostInfo', postId])
      queryClient.invalidateQueries(['post', postId])
    },
  })

  const handleClickLike = () => {
    mutationNewCommentLike.mutate(String(postCommentData.id))
  }

  const handleClickReComment = () => {
    dispatch(setToggleReCommentModal({ commentId: postCommentData.id }))
  }

  useEffect(() => {
    isLiked ? setLikeText('UnLike') : setLikeText('Like')
  }, [isLiked])

  return (
    <>
      <li className={styles.commentWrapper}>
        <span>{postCommentData.content}</span>

        <div className={styles.commentBottomWrapper}>
          <button type='button' onClick={handleClickLike} className={styles.likeButton}>
            <LikeIcon className={cx(styles.svgIcon, { [styles.toggleLike]: isLiked })} />
            <span className={styles.likeText}>{likeText}</span>
          </button>

          <div className={styles.likeCountWrapper}>
            <LikeIcon className={cx(styles.svgIcon, styles.toggleLike)} />
            <span className={styles.liekCountText}>{postCommentData._count.CommentLike}</span>
          </div>

          <button type='button' onClick={handleClickReComment} className={styles.reCommentButton}>
            <ChatIcon
              className={cx(styles.reCommentIcon, {
                [styles.isViewModalIcon]:
                  reCommentModalValue.isView && reCommentModalValue.commentId === postCommentData.id,
              })}
            />
          </button>

          <span>{postCommentData.User.name}</span>
          <CreatedAtText dateTime={postCommentData.createdAt} />
        </div>
      </li>

      {postCommentData.ReComment.map((item, index) => (
        <PostReCommentItem
          key={item.id}
          postReCommentData={item}
          isLiked={myRecommentInfoData.reCommentIsLikedArray[index]?.isLiked || false}
        />
      ))}

      <hr />
    </>
  )
}

export default PostCommentItem

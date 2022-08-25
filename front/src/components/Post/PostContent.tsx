import { useMutation } from '@tanstack/react-query'
import { LikeIcon } from 'assets/svgs'
import CreatedAtText from 'components/Common/Etc/CreatedAtText'
import PreviewImage from 'components/Common/Etc/PreviewImage'
import { queryClient } from 'index'
import { useEffect, useState } from 'react'
import { IMyInfo, INewLike, INewPostVote, postNewPostLike, postNewPostVote } from 'services/api'
import { cx } from 'styles'
import { IPost } from 'types/post'
import styles from './postContent.module.scss'

interface PostContentProps {
  postContentData: IPost
  myPostInfoData: IMyInfo
}

const PostContent = ({ postContentData, myPostInfoData }: PostContentProps) => {
  const [likeText, setLikeText] = useState('Like')

  const mutationNewPostVote = useMutation((newPostVote: INewPostVote) => postNewPostVote(newPostVote), {
    onMutate: async ({ postId, assignedBy }) => {
      const StringPostId: String = String(postId)

      const previousMyPostInfo = queryClient.getQueryData<IMyInfo>(['myPostInfo', StringPostId])
      const previousPost = queryClient.getQueryData<IPost>(['post', StringPostId])

      queryClient.setQueryData(['myPostInfo', StringPostId], {
        ...previousMyPostInfo,
        isVoted: true,
      })

      if (assignedBy === 'this' && previousPost && previousMyPostInfo) {
        queryClient.setQueryData(['post', StringPostId], {
          ...previousPost,
          thisCount: previousPost.thisCount + 1,
          thatCount: previousMyPostInfo.isVoted ? previousPost.thatCount - 1 : previousPost.thatCount,
        })
      }

      if (assignedBy === 'that' && previousPost && previousMyPostInfo) {
        queryClient.setQueryData(['post', StringPostId], {
          ...previousPost,
          thatCount: previousPost.thatCount + 1,
          thisCount: previousMyPostInfo.isVoted ? previousPost.thisCount - 1 : previousPost.thisCount,
        })
      }

      return previousPost
    },
    onSettled: () => {
      queryClient.invalidateQueries(['post'])
      queryClient.invalidateQueries(['myPostInfo'])
    },
  })

  const mutationNewPostLike = useMutation((newPostLike: INewLike) => postNewPostLike(newPostLike), {
    onMutate: async ({ postId }) => {
      const StringPostId = String(postId)

      const previousLiked = queryClient.getQueryData<IMyInfo>(['myPostInfo', StringPostId])

      queryClient.setQueryData(['myPostInfo', StringPostId], { ...previousLiked, isLiked: !previousLiked?.isLiked })

      return previousLiked
    },
    onSettled: () => {
      queryClient.invalidateQueries(['myPostInfo'])
    },
  })

  const handleClickThis = () => {
    if (!myPostInfoData.userId) return

    mutationNewPostVote.mutate({ postId: postContentData.id, assignedBy: 'this' })
  }

  const handleClickThat = () => {
    if (!myPostInfoData.userId) return

    mutationNewPostVote.mutate({ postId: postContentData.id, assignedBy: 'that' })
  }

  const handleClickLike = () => {
    if (!myPostInfoData.userId) return

    mutationNewPostLike.mutate({ postId: postContentData.id })
  }

  useEffect(() => {
    myPostInfoData.isLiked ? setLikeText('UnLike') : setLikeText('Like')
  }, [myPostInfoData.isLiked])

  return (
    <div className={styles.postContentWrapper}>
      <div>
        <div>
          <div />
          <div>{postContentData.author.name}</div>
        </div>

        <CreatedAtText dateTime={postContentData.createdAt} />
      </div>

      <div className={styles.postWrapper}>
        <h2 className={styles.postTitle}>{postContentData.title}</h2>

        <div className={styles.postVersusWrapper}>
          <button type='button' onClick={handleClickThis} className={styles.versusWrapper}>
            {postContentData.thisImagePath && (
              <PreviewImage imagePath={postContentData.thisImagePath} altText={postContentData.this} />
            )}
            <p className={cx({ [styles.versusText]: !postContentData.thisImagePath })}>{postContentData.this}</p>
          </button>

          <button type='button' onClick={handleClickThat} className={styles.versusWrapper}>
            {postContentData.thatImagePath && (
              <PreviewImage imagePath={postContentData.thatImagePath} altText={postContentData.that} />
            )}
            <p className={cx({ [styles.versusText]: !postContentData.thisImagePath })}>{postContentData.that}</p>
          </button>
        </div>
      </div>

      <hr />

      <div>
        {myPostInfoData.isVoted && (
          <div>
            <dl className={styles.countWrapper}>
              <dt>thisCount</dt>
              <dd>{postContentData.thisCount}</dd>
            </dl>

            <dl className={styles.countWrapper}>
              <dt>thatCount</dt>
              <dd>{postContentData.thatCount}</dd>
            </dl>
          </div>
        )}
      </div>

      <hr />

      <p className={styles.postDescription}>{postContentData.description}</p>

      <button type='button' onClick={handleClickLike} className={styles.likeButton}>
        <LikeIcon className={cx(styles.svgIcon, { [styles.toggleLike]: myPostInfoData.isLiked })} />
        <span className={styles.likeText}>{likeText}</span>
      </button>
    </div>
  )
}
export default PostContent

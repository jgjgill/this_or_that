import { useQuery } from '@tanstack/react-query'
import { CommentIcon, LikeIcon, VoteIcon } from 'assets/svgs'
import dayjs from 'dayjs'
import { getUser } from 'services/api'
import { IPost } from 'types/post'
import styles from './postItem.module.scss'

interface PostItemProps {
  postData: IPost
}

const PostItem = ({ postData }: PostItemProps) => {
  const { isLoading, isError, data: authorUserData } = useQuery(['authorUser'], () => getUser(1))

  const postCreatedAt = dayjs(postData.createdAt).format('YYYY-MM-DD')

  return (
    <div className={styles.postWrapper}>
      <h2 className={styles.postTitle}>{postData.title}</h2>

      <div className={styles.contentInfo}>
        <p className={styles.this}>{postData.this}</p>

        <p className={styles.that}>{postData.that}</p>
      </div>

      <div className={styles.bottomWrapper}>
        <div className={styles.countInfo}>
          <div className={styles.countWrapper}>
            <VoteIcon className={styles.svgIcon} />
            <span>투표 10회</span>
          </div>

          <div className={styles.countWrapper}>
            <LikeIcon className={styles.svgIcon} />
            <span>좋아요 10개</span>
          </div>

          <div className={styles.countWrapper}>
            <CommentIcon className={styles.svgIcon} />
            <span>댓글 10개</span>
          </div>
        </div>

        <div className={styles.uploadInfo}>
          <time dateTime={postCreatedAt}>{postCreatedAt}</time>
          <span>{authorUserData?.name}</span>
        </div>
      </div>
    </div>
  )
}

export default PostItem

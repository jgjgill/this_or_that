import { CommentIcon, LikeIcon, VoteIcon } from 'assets/svgs'
import PreviewImage from 'components/Common/PreviewImage'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import { IPost } from 'types/post'
import styles from './postItem.module.scss'

interface PostItemProps {
  postData: IPost
}

const PostItem = ({ postData }: PostItemProps) => {
  const navigate = useNavigate()

  const postCreatedAt = dayjs(postData.createdAt).format('YYYY-MM-DD')

  const handleClick = () => {
    navigate(`/post/${postData.id}`)
  }

  return (
    <button type='button' onClick={handleClick} className={styles.postWrapper}>
      <h2 className={styles.postTitle}>{postData.title}</h2>

      <div className={styles.contentInfo}>
        <div className={styles.contentWrapper}>
          {postData.thisImagePath && <PreviewImage imagePath={postData.thisImagePath} altText={postData.this} />}

          <p className={styles.versusText}>{postData.this}</p>
        </div>

        <div className={styles.contentWrapper}>
          {postData.thatImagePath && <PreviewImage imagePath={postData.thatImagePath} altText={postData.this} />}

          <p className={styles.versusText}>{postData.that}</p>
        </div>
      </div>

      <div className={styles.bottomWrapper}>
        <div className={styles.countInfo}>
          <div className={styles.countWrapper}>
            <VoteIcon className={styles.svgIcon} />
            <span>투표 {postData._count.voters}회</span>
          </div>

          <div className={styles.countWrapper}>
            <LikeIcon className={styles.svgIcon} />
            <span>좋아요 {postData._count.likes}개</span>
          </div>

          <div className={styles.countWrapper}>
            <CommentIcon className={styles.svgIcon} />
            <span>댓글 {postData._count.comments}개</span>
          </div>
        </div>

        <div className={styles.uploadInfo}>
          <time dateTime={postCreatedAt}>{postCreatedAt}</time>
          <span>{postData.author.name}</span>
        </div>
      </div>
    </button>
  )
}

export default PostItem

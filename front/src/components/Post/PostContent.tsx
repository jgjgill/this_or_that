import PreviewImage from 'components/Common/PreviewImage'
import dayjs from 'dayjs'
import { cx } from 'styles'
import { IPost } from 'types/post'
import styles from './postContent.module.scss'

interface PostContentProps {
  postContentData: IPost
}

const PostContent = ({ postContentData }: PostContentProps) => {
  const postCreatedAt = dayjs(postContentData.createdAt).format('YYYY-MM-DD')

  return (
    <div className={styles.postContentWrapper}>
      <div>
        <div>
          <div />
          <div>{postContentData.author.name}</div>
        </div>

        <time dateTime={postCreatedAt}>{postCreatedAt}</time>
      </div>

      <div className={styles.postWrapper}>
        <h2 className={styles.postTitle}>{postContentData.title}</h2>

        <div className={styles.postVersusWrapper}>
          <div className={styles.versusWrapper}>
            {postContentData.thisImagePath && (
              <PreviewImage imagePath={postContentData.thisImagePath} altText={postContentData.this} />
            )}
            <p className={cx({ [styles.versusText]: !postContentData.thisImagePath })}>{postContentData.this}</p>
          </div>

          <div className={styles.versusWrapper}>
            {postContentData.thatImagePath && (
              <PreviewImage imagePath={postContentData.thatImagePath} altText={postContentData.that} />
            )}
            <p className={cx({ [styles.versusText]: !postContentData.thisImagePath })}>{postContentData.that}</p>
          </div>
        </div>
      </div>

      <hr />

      <p className={styles.postDescription}>{postContentData.description}</p>
    </div>
  )
}
export default PostContent

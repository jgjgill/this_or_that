import { CommentIcon, LikeIcon, VoteIcon } from 'assets/svgs'
import styles from './postItem.module.scss'

const PostItem = () => {
  return (
    <div className={styles.postWrapper}>
      <h2 className={styles.postTitle}>Title</h2>

      <div className={styles.contentInfo}>
        <p className={styles.this}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Id voluptatem nam quae minus esse earum nulla
          molestiae aliquam debitis quas saepe alias, tempore optio veniam numquam in! Nisi, tenetur dolore?
        </p>

        <p className={styles.that}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis fuga vel velit ad, eos culpa? Fugiat
          laboriosam, rerum eos eveniet, laborum a incidunt praesentium consequuntur, sequi itaque beatae esse omnis?
        </p>
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
          <time dateTime='2022-08-10'>10분 전</time>
          <span>닉네임</span>
        </div>
      </div>
    </div>
  )
}

export default PostItem

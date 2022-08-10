import PostItem from './PostItem'
import styles from './postList.module.scss'

const PostList = () => {
  return (
    <div className={styles.temp}>
      {[1, 2, 3, 4].map((item) => (
        <PostItem key={item} />
      ))}
    </div>
  )
}

export default PostList

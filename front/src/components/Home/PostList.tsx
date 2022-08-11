import { useQuery } from '@tanstack/react-query'
import { fetchPosts } from 'services/api'
import PostItem from './PostItem'
import styles from './postList.module.scss'

const PostList = () => {
  const { isLoading, isError, data: postsData } = useQuery(['posts'], fetchPosts)

  return (
    <div className={styles.temp}>
      {postsData?.map((item) => (
        <PostItem key={item.id} postData={item} />
      ))}
    </div>
  )
}

export default PostList

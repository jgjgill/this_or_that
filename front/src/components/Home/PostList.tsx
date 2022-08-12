import { useQuery } from '@tanstack/react-query'
import { getPosts } from 'services/api'
import PostItem from './PostItem'
import styles from './postList.module.scss'

const PostList = () => {
  const { isLoading, isError, data: postsData } = useQuery(['posts'], getPosts)

  return (
    <div className={styles.temp}>
      {postsData?.map((item) => (
        <PostItem key={item.id} postData={item} />
      ))}
    </div>
  )
}

export default PostList

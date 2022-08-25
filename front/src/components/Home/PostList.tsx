import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { getPosts } from 'services/api'
import PostItem from './PostItem'
import styles from './postList.module.scss'

const PostList = () => {
  const { ref: InViewRef, inView } = useInView()
  const [skip, setSkip] = useState(0)

  const { isError, data: postsData } = useQuery(['posts'], () => getPosts(skip), {
    enabled: inView,
  })
  console.log(postsData)

  useEffect(() => {
    if (!postsData) return

    setSkip((prev) => prev + 5)
  }, [postsData])

  return (
    <div className={styles.postsList}>
      {postsData?.map((item) => (
        <PostItem key={item.id} postData={item} />
      ))}

      <div ref={InViewRef} />
    </div>
  )
}

export default PostList

import { useMutation } from '@tanstack/react-query'
import { XCircleIcon } from 'assets/svgs'
import { queryClient } from 'index'
import { Link } from 'react-router-dom'
import { deletePost } from 'services/api'
import styles from './postInfoItem.module.scss'

interface PostInfoItemProps {
  postInfoData: {
    id: number
    title: string
    this: string
    that: string
    description: string
  }
}

const PostInfoItem = ({ postInfoData }: PostInfoItemProps) => {
  const mutationDeletePost = useMutation((postId: number) => deletePost(postId), {
    onSuccess: () => {
      queryClient.resetQueries(['posts'])
      queryClient.invalidateQueries(['profileInfo'])
    },
  })

  const handleClickRemove = () => {
    mutationDeletePost.mutate(postInfoData.id)
  }

  return (
    <div className={styles.postInfoItemWrapper}>
      <button type='button' onClick={handleClickRemove} className={styles.removeButton}>
        <XCircleIcon className={styles.svgIcon} />
      </button>

      <Link to={`/post/${postInfoData.id}`} className={styles.linkWrapper}>
        <h3 className={styles.title}>{postInfoData.title}</h3>

        <div className={styles.contentWrapper}>
          <p>{postInfoData.this}</p>
          <p>{postInfoData.that}</p>
        </div>

        <p className={styles.descriptionText}>{postInfoData.description}</p>
      </Link>
    </div>
  )
}

export default PostInfoItem

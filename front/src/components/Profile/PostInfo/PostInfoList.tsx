import PostInfoItem from './PostInfoItem'
import styles from './postInfoList.module.scss'

interface PostInfoProps {
  postsInfoData: {
    id: number
    title: string
    this: string
    that: string
    description: string
  }[]
  myPostCount: number
}

const PostInfo = ({ postsInfoData, myPostCount }: PostInfoProps) => {
  return (
    <div className={styles.postInfoListWrapper}>
      <div />
      <h2 className={styles.myPostText}>My Posts ({myPostCount})</h2>

      <div className={styles.postInfoListGridContainer}>
        {postsInfoData?.map((item: any) => (
          <PostInfoItem key={item.id} postInfoData={item} />
        ))}
      </div>
    </div>
  )
}

export default PostInfo

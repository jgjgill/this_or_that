import PostCommentItem from './PostCommentItem'
import styles from './postCommentList.module.scss'

interface PostCommentListProps {
  postCommentsData: any[]
  commentIsLikedArray: { isLiked: boolean }[]
}

const PostCommentList = ({ postCommentsData, commentIsLikedArray }: PostCommentListProps) => {
  return (
    <ul className={styles.postCommentsList}>
      {postCommentsData.map((item, index) => (
        <PostCommentItem key={item.id} postCommentData={item} isLiked={commentIsLikedArray[index].isLiked} />
      ))}
    </ul>
  )
}

export default PostCommentList

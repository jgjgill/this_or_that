import { IMyInfo } from 'services/api'
import { IComment } from 'types/comment'
import PostCommentItem from './PostCommentItem'
import styles from './postCommentList.module.scss'

interface PostCommentListProps {
  postCommentsData: IComment[]
  myPostInfoData: IMyInfo

  commentIsLikedArray: { isLiked: boolean }[]
}

const PostCommentList = ({ postCommentsData, myPostInfoData, commentIsLikedArray }: PostCommentListProps) => {
  return (
    <ul className={styles.postCommentsList}>
      {postCommentsData.map((item, index) => (
        <PostCommentItem
          key={item.id}
          postCommentData={item}
          userId={myPostInfoData.userId}
          isLiked={commentIsLikedArray[index]?.isLiked || false}
        />
      ))}
    </ul>
  )
}

export default PostCommentList

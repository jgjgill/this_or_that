import { useQuery } from '@tanstack/react-query'
import PostCommentForm from 'components/Post/PostCommentForm'
import PostCommentList from 'components/Post/PostCommentList'
import PostContent from 'components/Post/PostContent'
import { useParams } from 'react-router-dom'
import { getMyPostInfo, getPost } from 'services/api'
import styles from './post.module.scss'

const Post = () => {
  const { postId } = useParams()

  const { isError: postIsError, data: postData } = useQuery(['post', postId], () => getPost(postId!), {
    enabled: !!postId,
  })

  const { isError: myInfoIsError, data: myPostInfoData } = useQuery(
    ['myPostInfo', postId],
    () => getMyPostInfo(postId!),
    { enabled: !!postId, staleTime: Infinity, cacheTime: Infinity }
  )

  return (
    <div className={styles.postWrapper}>
      {postData && myPostInfoData && (
        <>
          <PostContent postContentData={postData} myPostInfoData={myPostInfoData!} />
          <PostCommentForm postId={postData.id} />
          <PostCommentList
            postCommentsData={postData.comments}
            commentIsLikedArray={myPostInfoData.commentIsLikedArray}
          />
        </>
      )}
    </div>
  )
}

export default Post

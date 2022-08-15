import { useQuery } from '@tanstack/react-query'
import PostComment from 'components/Post/PostComment'
import PostContent from 'components/Post/PostContent'
import { useParams } from 'react-router-dom'
import { getPost } from 'services/api'

const Post = () => {
  const { postId } = useParams()

  const { isLoading, isError, data: postData } = useQuery(['post'], () => getPost(postId!))

  return (
    <div>
      {postData && (
        <>
          <PostContent postContentData={postData} />
          <PostComment postCommentData={postData.comments} />
        </>
      )}
    </div>
  )
}

export default Post

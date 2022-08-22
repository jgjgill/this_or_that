import { useQuery } from '@tanstack/react-query'
import PostComment from 'components/Post/PostComment'
import PostContent from 'components/Post/PostContent'
import { useParams } from 'react-router-dom'
import { getMyPostInfo, getPost } from 'services/api'

const Post = () => {
  const { postId } = useParams()

  const { isError: postIsError, data: postData } = useQuery(['post', postId], () => getPost(postId!), {
    enabled: !!postId,
  })

  const { isError: myInfoIsError, data: myPostInfoData } = useQuery(
    ['myPostInfo', postId],
    () => getMyPostInfo(postId!),
    {
      enabled: !!postId,
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  )

  return (
    <div>
      {postData && myPostInfoData && (
        <>
          <PostContent postContentData={postData} myPostInfoData={myPostInfoData!} />
          <PostComment postCommentData={postData.comments} />
        </>
      )}
    </div>
  )
}

export default Post

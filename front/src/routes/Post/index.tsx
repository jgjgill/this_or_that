import { useParams } from 'react-router-dom'

const Post = () => {
  const params = useParams()

  return <div>post {params.postId}</div>
}

export default Post

import PostCreateForm from 'components/Write/PostCreateForm'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

const Write = () => {
  const [cookie] = useCookies(['jwt'])

  const navigate = useNavigate()

  useEffect(() => {
    if (cookie.jwt) return

    navigate('/', { replace: true })
  }, [cookie, navigate])

  if (!cookie.jwt) return null

  return (
    <div>
      <PostCreateForm />
    </div>
  )
}

export default Write

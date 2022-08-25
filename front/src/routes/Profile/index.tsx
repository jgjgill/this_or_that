import { useQuery } from '@tanstack/react-query'
import BasicInfo from 'components/Profile/BasicInfo'
import NicknameForm from 'components/Profile/NicknameForm'
import PostInfoList from 'components/Profile/PostInfo/PostInfoList'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import { getProfileInfo } from 'services/api'
import styles from './profile.module.scss'

const Profile = () => {
  const [cookie] = useCookies(['jwt'])

  const { isError: myInfoIsError, data: profileInfoData } = useQuery(['profileInfo', cookie], getProfileInfo, {
    enabled: Boolean(cookie.jwt),
    staleTime: Infinity,
    cacheTime: Infinity,
  })

  const navigate = useNavigate()

  useEffect(() => {
    if (cookie.jwt) return

    navigate('/', { replace: true })
  }, [cookie, navigate])

  if (!cookie.jwt) return null

  return (
    <div className={styles.profileWrapper}>
      <BasicInfo email={profileInfoData?.email} name={profileInfoData?.name} createdAt={profileInfoData?.createdAt} />
      <NicknameForm name={profileInfoData?.name} />

      <PostInfoList postsInfoData={profileInfoData?.posts} myPostCount={profileInfoData?._count.posts} />
    </div>
  )
}

export default Profile

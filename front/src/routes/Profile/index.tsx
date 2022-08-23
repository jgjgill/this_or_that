import { useQuery } from '@tanstack/react-query'
import NicknameForm from 'components/Profile/NicknameForm'
import { getProfileInfo } from 'services/api'

const Profile = () => {
  const { isError: myInfoIsError, data: profileInfoData } = useQuery(['profileInfo'], getProfileInfo, {
    staleTime: Infinity,
    cacheTime: Infinity,
  })

  console.log(profileInfoData)

  return (
    <div>
      <NicknameForm name={profileInfoData?.name} />

      <div>posts</div>
    </div>
  )
}

export default Profile

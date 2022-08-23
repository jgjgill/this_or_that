import dayjs from 'dayjs'
import styles from './basicInfo.module.scss'

interface BasicInfoProps {
  email: string
  name: string
  createdAt: string
}

const BasicInfo = ({ email, name, createdAt }: BasicInfoProps) => {
  const UserCreatedAt = dayjs(createdAt).format('YYYY-MM-DD')

  return (
    <div className={styles.basicInfoWrapper}>
      <dl className={styles.contentWrapper}>
        <dt>Email</dt>
        <dd>{email}</dd>
      </dl>

      <dl className={styles.contentWrapper}>
        <dt>Name</dt>
        <dd>{name}</dd>
      </dl>

      <time dateTime={UserCreatedAt} className={styles.userCreatedAt}>
        {UserCreatedAt}
      </time>
    </div>
  )
}

export default BasicInfo

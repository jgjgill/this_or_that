import CreatedAtText from 'components/Common/Etc/CreatedAtText'
import styles from './basicInfo.module.scss'

interface BasicInfoProps {
  email: string
  name: string
  createdAt: Date
}

const BasicInfo = ({ email, name, createdAt }: BasicInfoProps) => {
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

      <CreatedAtText dateTime={createdAt} />
    </div>
  )
}

export default BasicInfo

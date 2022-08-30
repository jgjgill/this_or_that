import { WriteIcon } from 'assets/svgs'
import IconButton from 'components/Common/Button/IconButton'
import { useNavigate } from 'react-router-dom'
import styles from './writeButton.module.scss'

const WriteButton = () => {
  const navigate = useNavigate()

  const handleClickWrite = () => {
    navigate('/write')
    window.scrollTo(0, 0)
  }

  return (
    <button type='button' onClick={handleClickWrite} className={styles.writeButtonWrpper}>
      <WriteIcon className={styles.svgIcon} />
      <span>Write</span>
    </button>
  )
}

export default WriteButton

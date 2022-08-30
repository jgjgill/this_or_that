import { ReactElement } from 'react'
import styles from './iconButton.module.scss'

interface IconButtonProps {
  IconElement: ReactElement
  onClick: () => void
  text: string
}

const IconButton = ({ text, onClick, IconElement }: IconButtonProps) => {
  return (
    <button type='button' onClick={onClick} className={styles.iconButton}>
      {IconElement}
      <span className={styles.text}>{text}</span>
    </button>
  )
}

export default IconButton

import styles from './basicButton.module.scss'

interface ButtonProps {
  onClick: () => void
  isView: boolean
  text: string
}

const BasicButton = ({ onClick, isView, text }: ButtonProps) => {
  if (!isView) return null

  return (
    <button type='button' onClick={onClick} className={styles.button}>
      <span>{text}</span>
    </button>
  )
}

export default BasicButton

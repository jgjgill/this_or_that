import styles from './button.module.scss'

interface ButtonProps {
  onClick: () => void
  isView: boolean
  text: string
}

const Button = ({ onClick, isView, text }: ButtonProps) => {
  if (!isView) return null

  return (
    <button type='button' onClick={onClick} className={styles.button}>
      {text}
    </button>
  )
}

export default Button

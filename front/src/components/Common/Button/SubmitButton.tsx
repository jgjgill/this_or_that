import styles from './submitButton.module.scss'

interface SubmitButtonProps {
  text: string
}

const SubmitButton = ({ text }: SubmitButtonProps) => {
  return (
    <button type='submit' className={styles.submitButton}>
      {text}
    </button>
  )
}

export default SubmitButton

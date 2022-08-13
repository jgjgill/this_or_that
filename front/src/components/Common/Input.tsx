import { FieldError, UseFormRegisterReturn } from 'react-hook-form'
import { cx } from 'styles'
import styles from './input.module.scss'

interface InputProps {
  placeholder: string
  register: UseFormRegisterReturn
  error: FieldError | undefined
}

const Input = ({ placeholder, register, error }: InputProps) => {
  return (
    <>
      <input
        type='text'
        placeholder={placeholder}
        {...register}
        className={cx(styles.input, { [styles.errorInput]: error })}
      />
      {error && <p className={cx({ [styles.errorText]: error })}>error</p>}
    </>
  )
}

export default Input

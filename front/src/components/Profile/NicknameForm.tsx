import { useMutation } from '@tanstack/react-query'
import Input from 'components/Common/Input'
import { queryClient } from 'index'
import { SubmitHandler, useForm } from 'react-hook-form'
import { postNewNickname } from 'services/api'
import styles from './nicknameForm.module.scss'

interface NicknameFormProps {
  name: string
}

const NicknameForm = ({ name }: NicknameFormProps) => {
  const { register, handleSubmit, reset } = useForm<NicknameFormProps>()

  const mutationNewName = useMutation((newName: { name: string }) => postNewNickname(newName), {
    onMutate: async (data) => {
      await queryClient.cancelQueries(['profileInfo'])

      const previousName = queryClient.getQueryData<any>(['profileInfo'])

      queryClient.setQueryData<any>(['profileInfo'], {
        ...previousName,
        name: data.name,
      })

      return previousName
    },
    onSettled: () => {
      queryClient.invalidateQueries(['profileInfo'])
    },
  })

  const formValid: SubmitHandler<NicknameFormProps> = (data) => {
    mutationNewName.mutate({ name: data.name })
    reset()
  }

  return (
    <form onSubmit={handleSubmit(formValid)} className={styles.nicknameFormWrapper}>
      <Input placeholder={name} register={register('name', { required: true })} />

      <button type='submit' className={styles.submitButton}>
        Save
      </button>
    </form>
  )
}

export default NicknameForm

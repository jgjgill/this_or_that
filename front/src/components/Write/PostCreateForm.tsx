import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { SubmitHandler, useForm } from 'react-hook-form'
import styles from './postCreateForm.module.scss'

interface IPost {
  title: string
  this: string
  that: string
  description: string
  authorId: number
}

const PostCreateForm = () => {
  const { register, handleSubmit } = useForm<IPost>()

  const mutation = useMutation((newPost: IPost) => {
    return axios.post('http://localhost:3005/post', newPost)
  })

  const formValid: SubmitHandler<IPost> = (data) => {
    mutation.mutate({ ...data, authorId: 1 })
  }

  return (
    <form onSubmit={handleSubmit(formValid)} className={styles.temp}>
      <input type='text' placeholder='title' {...register('title', { required: true })} />
      <input type='text' placeholder='this' {...register('this', { required: true })} />
      <input type='text' placeholder='that' {...register('that', { required: true })} />
      <input type='text' placeholder='description' {...register('description', { required: true })} />
      <button type='submit'>submit</button>
    </form>
  )
}

export default PostCreateForm

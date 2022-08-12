import { useMutation } from '@tanstack/react-query'
import { useAppSelector } from 'hooks/useAppSelector'
import { SubmitHandler, useForm } from 'react-hook-form'
import { postNewPost, postNewThatImage, postNewThisImage } from 'services/api'
import { getThatImage, getThisImage, setThatImagePath, setThisImagePath } from 'states/imageData'
import { IPost } from 'types/post'
import CreateImage from './Image/CreateImage'
import styles from './postCreateForm.module.scss'

const PostCreateForm = () => {
  const { register, handleSubmit } = useForm<IPost>()

  const mutationNewPost = useMutation((newPost: IPost) => {
    return postNewPost(newPost)
  })

  const thisImageData = useAppSelector(getThisImage)
  const thatImageData = useAppSelector(getThatImage)

  const formValid: SubmitHandler<IPost> = (data) => {
    mutationNewPost.mutate({ ...data, authorId: 1 })
  }

  console.log(thisImageData)
  console.log(thatImageData)

  return (
    <form onSubmit={handleSubmit(formValid)} className={styles.formWrapper}>
      <input type='text' placeholder='title' {...register('title', { required: true })} />

      <CreateImage
        register={register}
        postNewImage={postNewThisImage}
        setImagePath={setThisImagePath}
        imageData={thisImageData}
        inputImage='this'
      />

      <CreateImage
        register={register}
        postNewImage={postNewThatImage}
        setImagePath={setThatImagePath}
        imageData={thatImageData}
        inputImage='that'
      />

      <input type='text' placeholder='description' {...register('description', { required: true })} />

      <button type='submit'>submit</button>
    </form>
  )
}

export default PostCreateForm

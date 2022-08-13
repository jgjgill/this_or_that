import { useMutation } from '@tanstack/react-query'
import Input from 'components/Common/Input'
import { useAppSelector } from 'hooks/useAppSelector'
import { SubmitHandler, useForm } from 'react-hook-form'
import { postNewPost, postNewThatImage, postNewThisImage } from 'services/api'
import { getThatImage, getThisImage, setThatImagePath, setThisImagePath } from 'states/imageData'
import { IPost } from 'types/post'
import CreateImage from './Image/CreateImage'
import styles from './postCreateForm.module.scss'

const PostCreateForm = () => {
  const { register, handleSubmit, formState } = useForm<IPost>()

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
      <Input placeholder='title' register={register('title', { required: true })} error={formState.errors.title} />

      <CreateImage
        register={register}
        formState={formState}
        postNewImage={postNewThisImage}
        setImagePath={setThisImagePath}
        imageData={thisImageData}
        inputImage='this'
      />

      <CreateImage
        register={register}
        formState={formState}
        postNewImage={postNewThatImage}
        setImagePath={setThatImagePath}
        imageData={thatImageData}
        inputImage='that'
      />

      <Input
        placeholder='description'
        register={register('description', { required: true })}
        error={formState.errors.description}
      />

      <button type='submit'>submit</button>
    </form>
  )
}

export default PostCreateForm

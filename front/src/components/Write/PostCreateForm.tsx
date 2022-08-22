import { useMutation, useQuery } from '@tanstack/react-query'
import Input from 'components/Common/Input'
import { useAppSelector } from 'hooks/useAppSelector'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { getMyInfo, postNewPost, postNewThatImage, postNewThisImage } from 'services/api'
import { getThatImage, getThisImage, setThatImagePath, setThisImagePath } from 'states/imageData'
import { IPost } from 'types/post'
import CreateImage from './Image/CreateImage'
import styles from './postCreateForm.module.scss'

const PostCreateForm = () => {
  const { isError: myInfoIsError, data: myInfoData } = useQuery(['post'], getMyInfo, {
    staleTime: Infinity,
    cacheTime: Infinity,
  })

  const { register, handleSubmit, formState } = useForm<IPost>()

  const mutationNewPost = useMutation((newPost: IPost) => {
    return postNewPost(newPost)
  })

  const thisImageData = useAppSelector(getThisImage)
  const thatImageData = useAppSelector(getThatImage)

  const navigate = useNavigate()

  const formValid: SubmitHandler<IPost> = (data) => {
    mutationNewPost.mutate({
      ...data,
      thisImagePath: thisImageData?.imagePath,
      thatImagePath: thatImageData?.imagePath,
      authorId: myInfoData?.id!,
    })
    navigate('/', { replace: true })
  }

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

      <button type='submit' className={styles.submitButton}>
        submit
      </button>
    </form>
  )
}

export default PostCreateForm

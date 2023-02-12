import { useMutation, useQuery } from '@tanstack/react-query'
import SubmitButton from 'components/Common/Button/SubmitButton'
import Input from 'components/Common/Input'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { useAppSelector } from 'hooks/useAppSelector'
import { queryClient } from 'index'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { getMyInfo, postNewPost, postNewThatImage, postNewThisImage } from 'services/api'
import { getThatImage, getThisImage, setResetImage, setThatImagePath, setThisImagePath } from 'states/imageData'
import { IPost } from 'types/post'
import CreateImage from './Image/CreateImage'
import styles from './postCreateForm.module.scss'

const PostCreateForm = () => {
  const { isError: myInfoIsError, data: myInfoData } = useQuery(['post'], getMyInfo, {
    staleTime: Infinity,
    cacheTime: Infinity,
  })

  const dispatch = useAppDispatch()

  const { register, handleSubmit, formState } = useForm<IPost>()

  const mutationNewPost = useMutation((newPost: IPost) => postNewPost(newPost), {
    onSuccess: () => {
      queryClient.resetQueries(['posts'])
      queryClient.invalidateQueries(['profileInfo'])

      dispatch(setResetImage())
      navigate('/', { replace: true })
      window.scrollTo(0, 0)
    },
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

      <SubmitButton text='Submit' />
    </form>
  )
}

export default PostCreateForm

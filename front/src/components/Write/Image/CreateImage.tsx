import { DragEvent, useEffect, useState } from 'react'
import { UseFormRegister } from 'react-hook-form'
import { IPost } from 'types/post'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import { getLastImage } from 'services/api'
import { IImage } from 'types/image'
import styles from './createImage.module.scss'
import PreviewImage from './PreviewImage'

interface CreateImageProps {
  register: UseFormRegister<IPost>
  postNewImage: (newImage: FormData) => Promise<AxiosResponse<any, any>>
  setImagePath: ActionCreatorWithPayload<IImage, string>
  imageData: IImage | null
  inputImage: 'this' | 'that'
}

const CreateImage = ({ register, postNewImage, setImagePath, imageData, inputImage }: CreateImageProps) => {
  const [dragOver, setDragOver] = useState(false)
  const [isDrop, setIsDrop] = useState(false)

  const queryClient = useQueryClient()

  const {
    isLoading,
    isError,
    data: previewImageData,
  } = useQuery([`${inputImage}Image`, isDrop], () => getLastImage(), {
    enabled: isDrop,
    staleTime: Infinity,
    initialData: null,
  })

  const addImage = (newImage: FormData) => postNewImage(newImage)

  const mutationNewImage = useMutation(addImage, {
    onSettled: () => {
      queryClient.invalidateQueries([`${inputImage}Image`])
    },
  })

  const dispatch = useAppDispatch()

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()

    const formData = new FormData()

    if (e.dataTransfer.files.length === 1) {
      const file = e.dataTransfer.files[0]

      formData.append('image', file)
    }

    mutationNewImage.mutate(formData)
    setDragOver(false)
    setIsDrop(true)
  }

  useEffect(() => {
    if (!previewImageData || !isDrop) return

    dispatch(setImagePath(previewImageData))
  }, [previewImageData, isDrop, dispatch, setImagePath])

  return (
    <div className={styles.imageWrapper}>
      <input type='text' placeholder={inputImage} {...register(inputImage, { required: true })} />

      <div onDragOver={handleDragOver} onDrop={handleDrop}>
        <div className={styles.imageBox}>
          {imageData && <PreviewImage imagePath={imageData.imagePath} altText={inputImage} />}
          {!imageData && <span>Image</span>}
        </div>

        {dragOver && <div className={styles.drapOver} />}
      </div>
    </div>
  )
}

export default CreateImage

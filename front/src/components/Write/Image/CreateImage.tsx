import { DragEvent, useEffect, useState } from 'react'
import { FormState, UseFormRegister } from 'react-hook-form'
import { IPost } from 'types/post'
import { useMutation, useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import { getLastImage } from 'services/api'
import { IImage } from 'types/image'
import Input from 'components/Common/Input'
import { cx } from 'styles'
import { queryClient } from 'index'
import styles from './createImage.module.scss'
import PreviewImage from '../../Common/Etc/PreviewImage'

interface CreateImageProps {
  register: UseFormRegister<IPost>
  formState: FormState<IPost>
  postNewImage: (newImage: FormData) => Promise<AxiosResponse<any, any>>
  setImagePath: ActionCreatorWithPayload<IImage, string>
  imageData: IImage | null
  inputImage: 'this' | 'that'
}

const CreateImage = ({ register, formState, postNewImage, setImagePath, imageData, inputImage }: CreateImageProps) => {
  const [dragOver, setDragOver] = useState(false)
  const [isDrop, setIsDrop] = useState(false)

  const { isError, data: previewImageData } = useQuery([`${inputImage}Image`, isDrop], getLastImage, {
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

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()

    if (e.currentTarget.contains(e.relatedTarget as Node)) {
      return
    }

    setDragOver(false)
  }

  useEffect(() => {
    if (!previewImageData || !isDrop) return

    dispatch(setImagePath(previewImageData))
  }, [previewImageData, isDrop, dispatch, setImagePath])

  const ImageToggleText = () => {
    return (
      <div className={styles.imageToggleText}>
        {dragOver && <span>Upload!</span>}
        {!dragOver && <span>Image Drop!</span>}
      </div>
    )
  }

  return (
    <div className={styles.imageWrapper}>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
        className={cx(styles.uploadBox, { [styles.imageBorder]: !imageData })}
      >
        {imageData && <PreviewImage imagePath={imageData.imagePath} altText={inputImage} />}

        {!imageData && <span>Image Upload</span>}
      </div>

      <ImageToggleText />

      <Input
        placeholder={inputImage}
        register={register(inputImage, { required: true })}
        error={formState.errors[inputImage]}
      />
    </div>
  )
}

export default CreateImage

import axios from 'axios'
import { IImage } from 'types/image'
import { IPost } from 'types/post'

const url = process.env.REACT_APP_API_URL

// export const getUser = (userId: number): Promise<IUser> => axios.get(`${url}/user/${userId}`).then((res) => res.data)

export const getPosts = (): Promise<IPost[]> => axios.get(`${url}/post`).then((res) => res.data)

export const getLastImage = (): Promise<IImage> => axios.get(`${url}/image/-1`).then((res) => res.data)

export const postNewPost = (newPost: IPost) => axios.post(`${url}/post`, newPost)

export const postNewThisImage = (newPost: FormData) => axios.post(`${url}/image/this_image`, newPost)

export const postNewThatImage = (newImage: FormData) => axios.post(`${url}/image/that_image`, newImage)

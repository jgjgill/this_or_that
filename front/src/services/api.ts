import axios from 'axios'
import { IImage } from 'types/image'
import { IPost } from 'types/post'

const url = process.env.REACT_APP_API_URL

export interface INewPostVote {
  postId: number
  userId: number
  assignedBy: 'this' | 'that'
}

export interface INewPostLike {
  postId: number
  userId: number
}

// export const getUser = (userId: number): Promise<IUser> => axios.get(`${url}/user/${userId}`).then((res) => res.data)

export const getPosts = (): Promise<IPost[]> => axios.get(`${url}/post`).then((res) => res.data)

export const getPost = (postId: string): Promise<IPost> => axios.get(`${url}/post/${postId}`).then((res) => res.data)

export const getLastImage = (): Promise<IImage> => axios.get(`${url}/image/-1`).then((res) => res.data)

export const getPostVotes = (postId: string): Promise<any> => axios.get(`${url}/vote/${postId}`).then((res) => res.data)

export const postNewPost = (newPost: IPost) => axios.post(`${url}/post`, newPost)

export const postNewThisImage = (newPost: FormData) => axios.post(`${url}/image/this_image`, newPost)

export const postNewThatImage = (newImage: FormData) => axios.post(`${url}/image/that_image`, newImage)

export const postNewPostVote = (newPostVote: INewPostVote) => axios.post(`${url}/vote`, newPostVote)

export const postNewPostLike = (newPostLike: INewPostLike) => axios.post(`${url}/like`, newPostLike)

import axios from 'axios'
import { IImage } from 'types/image'
import { IPost } from 'types/post'
import { IUser } from 'types/user'

const url = process.env.REACT_APP_API_URL

export interface INewPostVote {
  postId: number
  assignedBy: 'this' | 'that'
}

export interface INewPostLike {
  postId: number
}

export interface IMyInfo {
  userId: number
  isLiked: boolean
  isVoted: boolean
}

axios.defaults.withCredentials = true

// export const getUser = (userId: number): Promise<IUser> => axios.get(`${url}/user/${userId}`).then((res) => res.data)

export const getLogout = () => axios.get(`${url}/auth/google/logout`).then((res) => res.data)

export const getAuthStatus = () => axios.get(`${url}/auth/google/status`).then((res) => res.data)

export const getMyInfo = (): Promise<IUser> => axios.get(`${url}/user/myInfo`).then((res) => res.data)

export const getProfileInfo = (): Promise<any> => axios.get(`${url}/user/profileInfo`).then((res) => res.data)

export const getMyPostInfo = (postId: string): Promise<IMyInfo> =>
  axios.get(`${url}/user/me?postId=${postId}`).then((res) => res.data)

export const getPosts = (): Promise<IPost[]> => axios.get(`${url}/post`).then((res) => res.data)

export const getPost = (postId: string): Promise<IPost> => axios.get(`${url}/post/${postId}`).then((res) => res.data)

export const getLastImage = (): Promise<IImage> => axios.get(`${url}/image/-1`).then((res) => res.data)

export const postNewPost = (newPost: IPost) => axios.post(`${url}/post`, newPost)

export const postNewThisImage = (newPost: FormData) => axios.post(`${url}/image/this_image`, newPost)

export const postNewThatImage = (newImage: FormData) => axios.post(`${url}/image/that_image`, newImage)

export const postNewPostVote = (newPostVote: INewPostVote) => axios.post(`${url}/vote`, newPostVote)

export const postNewPostLike = (newPostLike: INewPostLike) => axios.post(`${url}/like`, newPostLike)

export const postNewNickname = (newPostName: { name: string }) => axios.post(`${url}/user/name`, newPostName)

export const deletePost = (postId: number) => axios.delete(`${url}/post/${postId}`)

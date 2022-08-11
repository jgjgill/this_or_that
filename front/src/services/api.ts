import axios from 'axios'
import { IPost } from 'types/post'
import { IUser } from 'types/user'

const url = process.env.REACT_APP_API_URL

export const fetchUser = (userId: number): Promise<IUser> => axios.get(`${url}user/${userId}`).then((res) => res.data)

export const fetchPosts = (): Promise<IPost[]> => axios.get(`${url}post`).then((res) => res.data)

export interface IPost {
  id: nubmer
  author: { name: string }
  authorId: number
  description: string
  this: string
  thisImagePath?: string
  that: string
  thatImagePath?: string
  title: string
  createdAt: Date
  updatedAt: Date
  comments: {
    id: number
    User: { name: string }
    commentPostId: number
    commentUserId: number
    content: string
    createdAt: Date
    updatedAt: Date
    _count: { CommentLike: number }
  }[]
  thisCount: number
  thatCount: number
  _count: { comments: number; likes: number; voters: number; ReComment: number }
}

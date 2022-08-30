export interface IComment {
  id: number
  commentPostId: number
  commentUserId: number
  content: string
  User: { name: string }
  ReComment: IReComment[]
  _count: { CommentLike: number }
  createdAt: Date
  updatedAt: Date
}

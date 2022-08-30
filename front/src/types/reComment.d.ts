export interface IReComment {
  id: number
  content: string
  reCommentPostId: number
  reCommentUserId: number
  reCommentCommentId: number
  User: { name: string }
  _count: { ReCommentLike: number }
  createdAt: Date
  updatedAt: Date
}

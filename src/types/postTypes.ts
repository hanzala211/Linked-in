import { IUser } from "@types"

export interface PostType {
  _id: string,
  caption: string,
  postBy: IUser | string,
  imageUrls: string[],
  likes: string[],
  likeCount: number,
  commentCount: number,
  createdAt: number,
  comments: CommentType[],
  __v: number
}

export interface CommentType {
  user: IUser | null,
  comment: string,
  createdAt: number
}

export interface CompleteComment {
  page: number,
  totalPages: number,
  comments: CommentType[],
  status: string
}
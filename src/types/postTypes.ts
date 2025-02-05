import { IUser } from "@types"

export interface PostType {
  _id: string,
  caption: string,
  postBy: string,
  imageUrls: string[],
  likes: string[],
  likeCount: number,
  commentCount: number,
  createdAt: Date,
  comments: CommentType[],
  __v: number
}

export interface CommentType {
  user: IUser,
  comment: string,
  createdAt: Date
}
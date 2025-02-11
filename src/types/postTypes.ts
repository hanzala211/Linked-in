import { IUser } from "@types"

export interface PostType {
  _id: string,
  caption: string,
  postBy: IUser,
  imageUrls: string[],
  likes: string[],
  likeCount: number,
  commentCount: number,
  createdAt: number,
  comments: CommentType[],
  __v: number,
  mentions?: string[],
  articleContent?: string,
  isArticle: boolean,
  title?: string
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
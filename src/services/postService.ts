import { sendRequest } from "@helpers";

export const postService = {
  createPost: (data: unknown) => sendRequest({
    isAuthIncluded: true,
    method: "POST",
    url: "/post/create-post",
    data,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  }),
  getFeedPosts: () => sendRequest({
    method: "GET",
    url: "/post/feed-posts?limit=2",
    isAuthIncluded: true
  }),
  likePost: (postId: string) => sendRequest({
    method: "GET",
    url: `/post/like-post/${postId}`,
    isAuthIncluded: true
  }),
  disLikePost: (postId: string) => sendRequest({
    method: "GET",
    url: `/post/dislike-post/${postId}`,
    isAuthIncluded: true
  }),
  postComment: (postId: string, data: unknown) => sendRequest({
    method: "POST",
    url: `/post/post-comment/${postId}`,
    data,
    isAuthIncluded: true,
  }),
  getComments: (postId: string, page: unknown) => sendRequest({
    method: "GET",
    url: `/post/get-comments/${postId}?limit=2&page=${page}`,
    isAuthIncluded: true
  })
}
import { sendRequest } from "@helpers";

export const postService = {
  createPost: (data: unknown) => sendRequest({
    isAuthIncluded: true,
    method: "POST",
    url: "/post/create",
    data,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  }),
  getFeedPosts: () => sendRequest({
    method: "GET",
    url: "/post/feed?limit=2",
    isAuthIncluded: true
  }),
  likePost: (postId: string) => sendRequest({
    method: "POST",
    url: `/post/like/${postId}`,
    isAuthIncluded: true
  }),
  disLikePost: (postId: string) => sendRequest({
    method: "POST",
    url: `/post/dislike/${postId}`,
    isAuthIncluded: true
  }),
  postComment: (postId: string, data: unknown) => sendRequest({
    method: "POST",
    url: `/post/comment/${postId}`,
    data,
    isAuthIncluded: true,
  }),
  getComments: (postId: string, page: unknown) => sendRequest({
    method: "GET",
    url: `/post/comments/${postId}?limit=2&page=${page}`,
    isAuthIncluded: true
  }),
  getSixPosts: (userId: string) => sendRequest({
    method: "GET",
    url: `/post/six-posts/${userId}`,
    isAuthIncluded: true
  }),
  getPosts: (userId: string) => sendRequest({
    method: "GET",
    url: `/post/posts/${userId}`,
    isAuthIncluded: true
  }),
  getPost: (postId: string) => sendRequest({
    method: "GET",
    url: `/post/post/${postId}`,
    isAuthIncluded: true
  }),
  savePost: (postId: string) => sendRequest({
    method: "GET",
    url: `/post/save/${postId}`,
    isAuthIncluded: true
  }),
  unSavePost: (postId: string) => sendRequest({
    method: "GET",
    url: `/post/unsave/${postId}`,
    isAuthIncluded: true
  }),
  deletePost: (postId: string) => sendRequest({
    method: "DELETE",
    url: `/post/delete/${postId}`,
    isAuthIncluded: true
  }),
  updatePost: (postId: string, data: unknown) => sendRequest({
    method: "PUT",
    url: `/post/update/${postId}`,
    isAuthIncluded: true,
    data,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  }),
  createArticle: (data: unknown) => sendRequest({
    method: "POST",
    url: `/post/create-article`,
    data,
    isAuthIncluded: true
  }),
  updateArticle: (data: unknown, postId: string) => sendRequest({
    method: "PATCH",
    url: `/post/update-article/${postId}`,
    data,
    isAuthIncluded: true
  }),
  getSavedPosts: () => sendRequest({
    method: "GET",
    url: `/post/saved-posts`,
    isAuthIncluded: true
  })
}
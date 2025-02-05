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
}
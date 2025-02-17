import { useAuth } from "@context";
import { errorToast, successToast } from "@helpers";
import { postService } from "@services";
import { IUser, PostContextTypes, PostType } from "@types";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PostContext = createContext<PostContextTypes | undefined>(undefined)

export const PostProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { userData, setUserData } = useAuth()
  const [isPostCreatorOpen, setIsPostCreatorOpen] = useState<boolean>(false)
  const [isImageCreatorOpen, setIsImageCreatorOpen] = useState<boolean>(false)
  const [selectedImage, setSelectedImage] = useState<string[]>([])
  const [isCreatingLoading, setIsCreatingLoading] = useState<boolean>(false)
  const [captionValue, setCaptionValue] = useState<string>("")
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [feedPosts, setFeedPosts] = useState<PostType[]>([])
  const [isFeedPostsLoading, setIsFeedPostsLoading] = useState<boolean>(true)
  const [allPosts, setAllPosts] = useState<PostType[]>([])
  const [isAllPostsLoading, setIsAllPostsLoading] = useState<boolean>(true)
  const [firstPosts, setFirstPosts] = useState<PostType[]>([])
  const [isPostsLoading, setIsPostsLoading] = useState<boolean>(true)
  const [isSelectingImage, setIsSelectingImage] = useState<boolean>(true)
  const [isEditingPost, setIsEditingPost] = useState<boolean>(false)
  const [imagesToRemove, setImagesToRemove] = useState<string[]>([])
  const [editPostID, setEditPostID] = useState<string>("")
  const [title, setTitle] = useState<string>('');
  const [editorContent, setEditorContent] = useState<string>('');
  const [mentions, setMentions] = useState<IUser[]>([])
  const [isArticleCreator, setIsArticleCreator] = useState<boolean>(false)
  const [selectedArticle, setSelectedArticle] = useState<PostType | null>(null)
  const [isEditingArticle, setIsEditingArticle] = useState<boolean>(false)
  const [savedPosts, setSavedPosts] = useState<PostType[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    if (savedPosts.length === 0) {
      getSavedPosts()
    }
  }, [])


  const createPost = async () => {
    try {
      setIsCreatingLoading(true)
      const formData = new FormData()
      formData.append("caption", captionValue)
      if (selectedImage.length > 0) {
        await Promise.all(selectedImage.map(async (item, index) => {
          const response = await fetch(item)
          const blob = await response.blob()
          formData.append("image", blob, `image${index}.jpg`)
        }))
      }
      const { data } = await postService.createPost(formData)
      console.log(data)
      if (data.status === "Post Created Successfully") {
        successToast(data.status)

      } else {
        errorToast(data.status)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsCreatingLoading(false)
      setSelectedImage([])
      setCaptionValue("")
      setIsPostCreatorOpen(false)
    }
  }

  const getFeedPosts = async () => {
    try {
      const { data } = await postService.getFeedPosts();
      console.log(data);

      setFeedPosts((prev: PostType[]) => {
        const newPosts: PostType[] = data.data.filter((post: PostType) =>
          !prev.some((existingPost: PostType) => existingPost._id === post._id)
        );
        console.log(newPosts)

        if (newPosts.length === 0) {
          setHasMore(false);
        }

        return [...prev, ...newPosts];
      });
      setIsFeedPostsLoading(false)
    } catch (error) {
      console.error(error);
    }
  };


  const getSixPosts = async (userId: string) => {
    try {
      setFirstPosts([])
      setIsPostsLoading(true)
      const { data } = await postService.getSixPosts(userId)
      if (data.status === "Posts Found") {
        console.log(data)
        setFirstPosts(data.posts)
      }
      setIsPostsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }


  const likePost = async (postId: string) => {
    try {
      setFeedPosts((prev: PostType[]) =>
        prev.map((item) =>
          item._id === postId
            ? {
              ...item,
              likeCount: item.likeCount + 1,
              likes: [...item.likes, userData?._id].filter((id): id is string => Boolean(id))
            }
            : item
        )
      );
      setAllPosts((prev: PostType[]) =>
        prev.map((item) =>
          item._id === postId
            ? {
              ...item,
              likeCount: item.likeCount + 1,
              likes: [...item.likes, userData?._id].filter((id): id is string => Boolean(id))
            }
            : item
        )
      );
      setFirstPosts((prev: PostType[]) =>
        prev.map((item) =>
          item._id === postId
            ? {
              ...item,
              likeCount: item.likeCount + 1,
              likes: [...item.likes, userData?._id].filter((id): id is string => Boolean(id))
            }
            : item
        )
      );
      setSelectedArticle((prev: PostType | null) =>
        prev
          ? {
            ...prev,
            likeCount: prev.likeCount + 1,
            likes: [...prev.likes, userData?._id].filter((id): id is string => Boolean(id))
          }
          : null
      );
      const { data } = await postService.likePost(postId)
      if (data.status === "Post Liked Successfully") {
        successToast(data.status)
      } else {
        errorToast(data.status)
        setFeedPosts((prev) =>
          prev.map((item) =>
            item._id === postId
              ? { ...item, likeCount: item.likeCount - 1, likes: item.likes.filter((like) => like !== userData?._id) }
              : item
          )
        );
        setAllPosts((prev) =>
          prev.map((item) =>
            item._id === postId
              ? { ...item, likeCount: item.likeCount - 1, likes: item.likes.filter((like) => like !== userData?._id) }
              : item
          )
        );
        setFirstPosts((prev) =>
          prev.map((item) =>
            item._id === postId
              ? { ...item, likeCount: item.likeCount - 1, likes: item.likes.filter((like) => like !== userData?._id) }
              : item
          )
        );
        setSelectedArticle((prev: PostType | null) =>
          prev
            ? {
              ...prev,
              likeCount: prev.likeCount - 1,
              likes: prev.likes.filter((id) => id !== userData?._id)
            }
            : null
        );
      }
    } catch (error) {
      console.log(error)
    }
  }


  const disLikePost = async (postId: string) => {
    try {
      setFeedPosts((prev) =>
        prev.map((item) =>
          item._id === postId
            ? { ...item, likeCount: item.likeCount - 1, likes: item.likes.filter((like) => like !== userData?._id) }
            : item
        )
      );
      setFirstPosts((prev) =>
        prev.map((item) =>
          item._id === postId
            ? { ...item, likeCount: item.likeCount - 1, likes: item.likes.filter((like) => like !== userData?._id) }
            : item
        )
      );
      setAllPosts((prev) =>
        prev.map((item) =>
          item._id === postId
            ? { ...item, likeCount: item.likeCount - 1, likes: item.likes.filter((like) => like !== userData?._id) }
            : item
        )
      );
      setSelectedArticle((prev: PostType | null) =>
        prev
          ? {
            ...prev,
            likeCount: prev.likeCount - 1,
            likes: prev.likes.filter((id) => id !== userData?._id)
          }
          : null
      );
      const { data } = await postService.disLikePost(postId)
      if (data.status === "Post DisLiked Successfully") {
        successToast(data.status)
      } else {
        errorToast(data.status)
        setFeedPosts((prev: PostType[]) =>
          prev.map((item) =>
            item._id === postId
              ? {
                ...item,
                likeCount: item.likeCount + 1,
                likes: [...item.likes, userData?._id].filter(Boolean) as string[]
              }
              : item
          )
        );
        setAllPosts((prev: PostType[]) =>
          prev.map((item) =>
            item._id === postId
              ? {
                ...item,
                likeCount: item.likeCount + 1,
                likes: [...item.likes, userData?._id].filter(Boolean) as string[]
              }
              : item
          )
        );
        setFirstPosts((prev: PostType[]) =>
          prev.map((item) =>
            item._id === postId
              ? {
                ...item,
                likeCount: item.likeCount + 1,
                likes: [...item.likes, userData?._id].filter(Boolean) as string[]
              }
              : item
          )
        );
        setSelectedArticle((prev: PostType | null) =>
          prev
            ? {
              ...prev,
              likeCount: prev.likeCount + 1,
              likes: [...prev.likes, userData?._id].filter((id): id is string => Boolean(id))
            }
            : null
        );
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getComments = async (postId: string, page: unknown) => {
    try {
      const { data } = await postService.getComments(postId, page)
      if (data.status === "Comments Found") {
        return data
      }
    } catch (error) {
      console.log(error)
    }
  }

  const postComment = async (postId: string, senData: unknown) => {
    try {
      const { data } = await postService.postComment(postId, senData)
      if (data.status === "Commented Successfully") {
        return data
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getAllPosts = async (userId: string) => {
    try {
      setIsAllPostsLoading(true)
      const { data } = await postService.getPosts(userId)
      console.log(data)
      if (data.status === "Post Retrieved Successfully") {
        setAllPosts(data.data)
      }
      setIsAllPostsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const getPost = async (postId: string, isArticle: boolean) => {
    try {
      setIsAllPostsLoading(true)
      const { data } = await postService.getPost(postId)
      if (data.status === "Post Retrieved Successfully") {
        if (!isArticle) {
          setAllPosts([data.post])
        } else {
          setSelectedArticle(data.post)
        }
      }
      setIsAllPostsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const savePost = async (postId: string) => {
    try {
      const { data } = await postService.savePost(postId)
      if (data.status === "Post Saved Successfully") {
        setUserData((prev: IUser | null) => prev ? {
          ...prev,
          savedPosts: [...prev.savedPosts, postId],
        } : null)
        successToast(data.status)
      } else {
        errorToast(data.status)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const unSavePost = async (postId: string) => {
    try {
      const { data } = await postService.unSavePost(postId)
      if (data.status === "Post Unsaved Successfully") {
        setUserData((prev: IUser | null) => prev ? {
          ...prev,
          savedPosts: prev.savedPosts.filter((item) => item !== postId),
        } : null)
        successToast(data.status)
      } else {
        errorToast(data.status)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const deletePost = async (postId: string) => {
    try {
      const { data } = await postService.deletePost(postId)
      if (data.status === "Post Deleted Successfully") {
        setFirstPosts((prev) => prev.filter((item) => item._id !== postId))
        setAllPosts((prev) => prev.filter((item) => item._id !== postId))
        successToast(data.status)
        setUserData((prev: IUser | null) => prev ? {
          ...prev,
          posts: prev.posts.filter((item) => item !== postId),
          postsCount: prev.postsCount - 1
        } : null)
      } else {
        errorToast(data.status)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const editPost = async () => {
    try {
      setIsCreatingLoading(true)
      const formData = new FormData()
      formData.append("caption", captionValue)
      const filteredImages = selectedImage.filter(
        (item) => !item.startsWith("https://res.cloudinary.com/")
      );
      if (filteredImages.length > 0) {
        await Promise.all(filteredImages.map(async (item, index) => {
          const response = await fetch(item)
          const blob = await response.blob()
          formData.append("image", blob, `image${index}.jpg`)
        }))
      }
      if (imagesToRemove.length > 0) {
        imagesToRemove.forEach((item) => {
          formData.append("imagesToRemove[]", item)
        });
      }
      const { data } = await postService.updatePost(editPostID, formData)
      console.log(data)
      if (data.status === "Post Updated Successfully") {
        successToast(data.status)
        setAllPosts((prev) => [...prev.filter((item) => item._id !== editPostID), data.post])
        setFirstPosts((prev) => [...prev.filter((item) => item._id !== editPostID), data.post])
      } else {
        errorToast(data.status)
      }
      setIsCreatingLoading(false)
      setIsPostCreatorOpen(false)
      setSelectedImage([])
      setImagesToRemove([])
    } catch (error) {
      console.log(error)
    }
  }

  const createArticle = async () => {
    try {
      setIsCreatingLoading(true)
      const { data } = await postService.createArticle({ caption: captionValue, articleContent: editorContent, title, mentions })
      console.log(data)
      if (data.status === "Article Created Successfully") {
        successToast(data.status)
      } else {
        errorToast(data.status)
      }
      setIsCreatingLoading(false)
      setIsPostCreatorOpen(false)
      setTitle("")
      setEditorContent("")
      setMentions([])
      setCaptionValue("")
      navigate("/feed")
    } catch (error) {
      console.log(error)
    }
  }

  const editArticle = async () => {
    try {
      setIsCreatingLoading(true)
      const { data } = await postService.updateArticle({ articleContent: editorContent, mentions, title, caption: captionValue }, selectedArticle?._id || "")
      console.log(data)
      if (data.status === "Article Updated Successfully") {
        successToast(data.status)
        setSelectedArticle(data.article)
      } else {
        errorToast(data.status)
      }
      setIsCreatingLoading(false)
      setIsPostCreatorOpen(false)
      setIsEditingArticle(false)
      navigate(-1)
    } catch (error) {
      console.log(error)
    }
  }

  const getSavedPosts = async () => {
    try {
      const { data } = await postService.getSavedPosts()
      console.log(data)
      if (data.status === "Posts Found") {
        setSavedPosts(data.posts)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleSelectPost = (item: PostType) => {
    setAllPosts([item])
  }

  const handleOpenImageCreator = (data: string[], caption: string, id: string) => {
    setIsEditingPost(true)
    setEditPostID(id)
    setCaptionValue(caption)
    if (data.length > 0) {
      setIsImageCreatorOpen(true)
      setSelectedImage(data)
      setIsSelectingImage(false)
    } else {
      setIsPostCreatorOpen(true)
    }
  }

  const handleSelectArticle = (item: PostType) => {
    setSelectedArticle(item)
  }

  console.log(selectedImage)

  return <PostContext.Provider value={{ isPostCreatorOpen, setIsPostCreatorOpen, currentIndex, setCurrentIndex, selectedImage, setSelectedImage, isImageCreatorOpen, setIsImageCreatorOpen, captionValue, setCaptionValue, createPost, isCreatingLoading, setIsCreatingLoading, feedPosts, setFeedPosts, getFeedPosts, likePost, disLikePost, hasMore, setHasMore, isFeedPostsLoading, setIsFeedPostsLoading, getComments, postComment, allPosts, setAllPosts, getAllPosts, isAllPostsLoading, setIsAllPostsLoading, handleSelectPost, getPost, firstPosts, setFirstPosts, isPostsLoading, getSixPosts, savePost, unSavePost, deletePost, handleOpenImageCreator, isSelectingImage, setIsSelectingImage, isEditingPost, setIsEditingPost, imagesToRemove, setImagesToRemove, editPost, title, setTitle, mentions, setMentions, editorContent, setEditorContent, isArticleCreator, setIsArticleCreator, createArticle, selectedArticle, setSelectedArticle, handleSelectArticle, isEditingArticle, setIsEditingArticle, editArticle, savedPosts }}>{children}</PostContext.Provider>
}

export const usePost = (): PostContextTypes => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("use usePost in it's Provider")
  }
  return context;
}
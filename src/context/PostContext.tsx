import { useAuth } from "@context";
import { postService } from "@services";
import { PostContextTypes, PostType } from "@types";
import { createContext, ReactNode, useContext, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { toast } from "sonner";

const PostContext = createContext<PostContextTypes | undefined>(undefined)

export const PostProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { userData } = useAuth()
  const [isPostCreatorOpen, setIsPostCreatorOpen] = useState<boolean>(false)
  const [isImageCreatorOpen, setIsImageCreatorOpen] = useState<boolean>(false)
  const [selectedImage, setSelectedImage] = useState<string[]>([])
  const [isCreatingLoading, setIsCreatingLoading] = useState<boolean>(false)
  const [captionValue, setCaptionValue] = useState<string>("")
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [hasMore, setHasMore] = useState<boolean>(false)
  const [feedPosts, setFeedPosts] = useState<PostType[]>([])
  const [isFeedPostsLoading, setIsFeedPostsLoading] = useState<boolean>(true)

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
        toast.success(data.status, {
          action: {
            label: <button className="p-1 rounded text-black bg-white hover:bg-gray-200"><RxCross2 className="w-4 h-4" /></button>,
            onClick: () => null,
          },
        });
      } else {
        toast.error(data.status, {
          action: {
            label: <button className="p-1 rounded text-black bg-white hover:bg-gray-200"><RxCross2 className="w-4 h-4" /></button>,
            onClick: () => null,
          },
        })
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
      setIsFeedPostsLoading(true)
      const { data } = await postService.getFeedPosts();
      console.log(data);

      setFeedPosts((prev: PostType[]) => {
        const newPosts: PostType[] = data.data.filter((post: PostType) =>
          !prev.some((existingPost: PostType) => existingPost._id === post._id)
        );

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
      const { data } = await postService.likePost(postId)
      if (data.status === "Post Liked Successfully") {
        toast.success(data.status, {
          action: {
            label: <button className="p-1 rounded text-black bg-white hover:bg-gray-200"><RxCross2 className="w-4 h-4" /></button>,
            onClick: () => null,
          },
        });
      } else {
        toast.error(data.status, {
          action: {
            label: <button className="p-1 rounded text-black bg-white hover:bg-gray-200"><RxCross2 className="w-4 h-4" /></button>,
            onClick: () => null,
          },
        })
        setFeedPosts((prev) =>
          prev.map((item) =>
            item._id === postId
              ? { ...item, likeCount: item.likeCount - 1, likes: item.likes.filter((like) => like !== userData?._id) }
              : item
          )
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
      const { data } = await postService.disLikePost(postId)
      if (data.status === "Post DisLiked Successfully") {
        toast.success(data.status, {
          action: {
            label: <button className="p-1 rounded text-black bg-white hover:bg-gray-200"><RxCross2 className="w-4 h-4" /></button>,
            onClick: () => null,
          },
        });
      } else {
        toast.error(data.status, {
          action: {
            label: <button className="p-1 rounded text-black bg-white hover:bg-gray-200"><RxCross2 className="w-4 h-4" /></button>,
            onClick: () => null,
          },
        })
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



  return <PostContext.Provider value={{ isPostCreatorOpen, setIsPostCreatorOpen, currentIndex, setCurrentIndex, selectedImage, setSelectedImage, isImageCreatorOpen, setIsImageCreatorOpen, captionValue, setCaptionValue, createPost, isCreatingLoading, setIsCreatingLoading, feedPosts, setFeedPosts, getFeedPosts, likePost, disLikePost, hasMore, setHasMore, isFeedPostsLoading, setIsFeedPostsLoading, getComments, postComment }}>{children}</PostContext.Provider>
}

export const usePost = (): PostContextTypes => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("use usePost in it's Provider")
  }
  return context;
}
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, Comment, CommentInput, PostOptions } from "@components"
import { useEffect, useRef, useState } from "react"
import { FaBookmark, FaCheck, FaPlus, FaRegBookmark } from "react-icons/fa"
import { IoEarth } from "react-icons/io5"
import { Link, useParams } from "react-router-dom"
import { DEFAULT_PIC, DotSVG, EmojiIcon } from "@assets"
import { TbArrowsDiagonal2 } from "react-icons/tb"
import EmojiPicker from "emoji-picker-react"
import { CommentType, PostType } from "@types"
import { formatDate } from "@helpers"
import { useAuth, usePost, useProfile } from "@context"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { MdDelete, MdOutlineEdit } from "react-icons/md"

interface PostProps {
  item: PostType
}

export const Post: React.FC<PostProps> = ({ item }) => {
  const { likePost, disLikePost, getComments, postComment, savePost, unSavePost, deletePost, handleOpenImageCreator, handleSelectArticle } = usePost()
  const { userData } = useAuth()
  const { handleFollow, handleUnfollow, handleClick: handleProfile } = useProfile()
  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  const [isTextOverflowing, setIsTextOverflowing] = useState<boolean>(false);
  const [isCommentExpanded, setIsCommentExpanded] = useState<boolean>(false)
  const [isEmojiPicker, setIsEmojiPicker] = useState<boolean>(false)
  const [commentValue, setCommentValue] = useState<string>("")
  const [comments, setComments] = useState<CommentType[]>([])
  const [page, setPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const textRef = useRef<HTMLPreElement | null>(null);
  const emojiIconRef = useRef<HTMLButtonElement | null>(null)
  const emojiPickerRef = useRef<HTMLDivElement | null>(null)
  const params = useParams()
  const isFollowing = userData?.following.includes(item.postBy?._id)
  const isSaved = userData?.savedPosts.includes(item._id)

  useEffect(() => {
    if (textRef.current && textRef.current.scrollHeight > textRef.current.clientHeight) {
      setIsTextOverflowing(true);
    } else {
      setIsTextOverflowing(false);
    }
  }, [isExpanded]);

  useEffect(() => {
    window.addEventListener("click", handleClick)
    return () => {
      window.removeEventListener("click", handleClick)
    }
  }, [])

  function handleClick(e: MouseEvent) {
    if (emojiIconRef.current && emojiPickerRef.current && !emojiIconRef.current.contains(e.target as Node) && !emojiPickerRef.current.contains(e.target as Node)) {
      setIsEmojiPicker(false)
    }
  }

  const handleLikes = () => {
    if (item.likes.includes(userData?._id || "")) {
      disLikePost(item._id)
    } else {
      likePost(item._id)
    }
  }

  const handleComments = async (id: string) => {
    try {
      if (!isExpanded) {
        const data = await getComments(id, page)
        setIsCommentExpanded(true)
        setComments(data.comments)
        setPage(data.page + 1)
        setTotalPages(data.totalPages)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleMore = async (id: string) => {
    try {
      const data = await getComments(id, page)
      setPage((prev) => prev + 1)
      setComments((prev) => [...prev, ...data.comments])
    } catch (error) {
      console.log(error)
    }
  }

  const handlePostComment = async (postId: string) => {
    try {
      await postComment(postId, {
        comment: commentValue
      })
      setComments((prev: CommentType[]) => [{
        comment: commentValue,
        user: userData,
        createdAt: Date.now()
      }, ...prev])
      setCommentValue("")
    } catch (error) {
      console.log(error)
    }
  }

  const handleFollowing = (id: string) => {
    if (isFollowing) {
      handleUnfollow(id)
    } else {
      handleFollow(id)
    }
  }

  const handleSaving = (id: string) => {
    if (isSaved) {
      unSavePost(id)
    } else {
      savePost(id)
    }
  }

  return <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
    <div className="px-4 py-3 flex items-start gap-3">
      <img
        src={item.postBy?.profilePic || DEFAULT_PIC}
        alt="Test User"
        className="w-12 h-12 rounded-full"
      />
      <div className="flex-1">
        <Link to={`/${item.postBy.userName}`} onClick={() => handleProfile(item.postBy)} className="font-semibold hover:text-[#0a66c2] hover:underline transition-all duration-200">{item.postBy.firstName} {item.postBy.lastName}</Link>
        <p className="text-[#666] text-[13px] text-ellipsis max-w-[30rem] line-clamp-1">{item.postBy?.headline}</p>
        <p className="text-[#666] flex items-center text-[12px]">
          {formatDate(item.createdAt)} • <IoEarth />
        </p>
      </div>
      <div className="flex gap-2 items-center">
        {params.username !== userData?.userName &&
          <button onClick={() => handleFollowing(item.postBy._id)} className={`flex items-center gap-2 active:bg-transparent px-2 py-1 rounded-md transition-all duration-200 ${isFollowing ? "text-gray-600 hover:bg-gray-50" : "text-[#0A66C2] hover:bg-[#EBF4FD]"}`}>
            {isFollowing ? <FaCheck /> : <FaPlus />} {isFollowing ? "Following" : "Follow"}
          </button>
        }
        <DropdownMenu>
          <DropdownMenuTrigger className="hover:bg-gray-100 p-2 rounded-full outline-none"><DotSVG /></DropdownMenuTrigger>
          <DropdownMenuContent className="w-60 md:-translate-x-24 -translate-x-10 translate-y-2 rounded-lg border-[1px] bg-white outline-none z-50">
            <DropdownMenuItem onClick={() => handleSaving(item._id)} className="flex items-center rounded-lg gap-2 text-[17px] text-gray-700 hover:text-black transition-all duration-200 hover:bg-gray-100 outline-none cursor-pointer p-2">{isSaved ? <FaBookmark /> : <FaRegBookmark />} {isSaved ? "Unsave" : "Save"}</DropdownMenuItem>
            {item.postBy._id === userData?._id && <>
              <DropdownMenuItem onClick={() => deletePost(item._id)} className="flex rounded-lg items-center gap-2 text-[17px] text-gray-700 hover:text-black transition-all duration-200 hover:bg-gray-100 outline-none cursor-pointer p-2"><MdDelete /> Delete</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleOpenImageCreator(item.imageUrls, item.caption, item._id)} className="flex rounded-lg items-center gap-2 text-[17px] text-gray-700 hover:text-black transition-all duration-200 hover:bg-gray-100 outline-none cursor-pointer p-2"><MdOutlineEdit />Edit</DropdownMenuItem>
            </>}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>

    <div className="p-4">
      <div className={`overflow-hidden transition-all flex duration-300 ${!isExpanded ? "max-h-[6.4em]" : "max-h-[99rem]"}`}>
        <pre ref={textRef} className={`whitespace-pre-wrap text-ellipsis ${!isExpanded ? "line-clamp-3" : ""}  text-gray-900 dark:text-white font-medium`}>
          {item.caption}
        </pre>
      </div>

      {isTextOverflowing && !isExpanded && (
        <button
          className="text-gray-400 mt-2 hover:underline transition-all duration-200"
          onClick={() => setIsExpanded(true)}
        >
          ...more
        </button>
      )}
    </div>

    {!item.isArticle ? <Carousel className="w-full relative group bg-black">
      <CarouselContent className="flex">
        {item.imageUrls.length > 0 ? item.imageUrls.map((item, index) => (
          <CarouselItem key={index} className="w-full shrink-0 flex items-center">
            <img src={item} alt="Post Content" className="w-full h-auto" />
          </CarouselItem>
        )) : ""}
      </CarouselContent>
      {item.imageUrls.length > 1 &&
        <CarouselPrevious className="absolute top-1/2 transition-all duration-200 group-hover:opacity-100 opacity-0 ease-in-out -translate-y-1/2 left-3 bg-black p-2 bg-opacity-80 text-white rounded-full " />
      }
      {item.imageUrls.length > 1 &&
        <CarouselNext className="absolute top-1/2 -translate-y-1/2 right-3 group-hover:opacity-100 opacity-0 transition-all duration-200 ease-in-out bg-black p-2 bg-opacity-80 text-white rounded-full " />
      }
    </Carousel> : <Link to={`/pulse/${item.title?.split(" ").join("-").toLowerCase()}/${item.postBy.firstName?.toLowerCase()}-${item.postBy.lastName?.toLowerCase()}/${item._id}`} onClick={() => handleSelectArticle(item)} className="w-full max-w-[95%] mx-auto relative">
      <img src="/images/articleCreator.png" alt="Article Creator Image" className="w-full rounded-t-lg h-auto" />
      <div className="bg-[#0A66C3] text-white rounded-b-lg p-2">
        <h2 className="font-semibold text-[20px]">{item.title}</h2>
        <div className="text-[9px] line-clamp-1"
          dangerouslySetInnerHTML={{ __html: item.articleContent || "" }}
        />
      </div>
    </Link>}

    <div className="mx-5 border-b-[1px] py-3 flex justify-between">
      <div className="flex gap-2">
        <img src="/images/likeSVG.svg" alt="likes SVG" className="w-5" />
        <p className="text-[#666] text-[14px]">{item.likeCount}</p>
      </div>
      <p className="text-[#666] text-[14px] hover:underline cursor-pointer">{item.commentCount > 1 ? item.commentCount + " comments" : item.commentCount + " comment"}</p>
    </div>

    <div className="mx-5 py-2 flex gap-4 justify-between">
      <PostOptions handleComments={handleComments} handleLikes={handleLikes} item={item} />
    </div>

    <div className={`h-full transition-all duration-300 ${isCommentExpanded ? "max-h-[99rem] opacity-100 p-4" : "max-h-[0rem] opacity-0 overflow-hidden"}`}>
      <div className="flex gap-4 items-center relative">
        <img
          src={userData?.profilePic || DEFAULT_PIC}
          alt="Test User"
          className="w-10 h-10 rounded-full"
        />
        <CommentInput className="right-14" handlePostComment={handlePostComment} item={item} commentValue={commentValue} setCommentValue={setCommentValue} />
        <button ref={emojiIconRef} className="hover:opacity-50 duration-200" onClick={() => setIsEmojiPicker(true)}><EmojiIcon /></button>
        {isEmojiPicker &&
          <div className="absolute md:-top-[22rem] -top-[18rem] md:left-5 left-0" ref={emojiPickerRef}>
            <EmojiPicker width={innerWidth > 770 ? 350 : 300} height={innerWidth > 770 ? 350 : 300} onEmojiClick={(emoji) => setCommentValue((prev) => prev + emoji.emoji)} />
          </div>
        }
      </div>
      <div className="flex mt-5 flex-col gap-5">
        {comments.map((comment, index) => (
          <Comment key={index} comment={comment} />
        ))}
      </div>
      {page <= totalPages &&
        <button onClick={() => handleMore(item._id)} className="flex gap-2 mt-5 items-center text-[14px]"><span className="bg-[#EAE6DF] p-2 rounded-full"><TbArrowsDiagonal2 className="text-[17px]" /></span> <span className="hover:bg-[#EAE6DF] p-1 rounded-md transition-all duration-200">Load more comments</span></button>
      }
    </div>
  </div >
}
import { DEFAULT_PIC } from "@assets"
import { Comment, CommentInput, PostOptions } from "@components"
import { useAuth, usePost } from "@context"
import { isoToLocalDate } from "@helpers"
import { CommentType, IUser } from "@types"
import { useEffect, useState } from "react"
import { IoIosEye } from "react-icons/io"
import { MdOutlineModeEdit } from "react-icons/md"
import { TbArrowsDiagonal2 } from "react-icons/tb"
import { Link, useParams } from "react-router-dom"

export const ArtilceReviewPage: React.FC = () => {
  const { userData } = useAuth()
  const { likePost, disLikePost, selectedArticle, postComment, getComments, getPost } = usePost()
  const [comments, setComments] = useState<CommentType[]>([])
  const [commentValue, setCommentValue] = useState<string>("")
  const [page, setPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const params = useParams()

  useEffect(() => {
    if (params.id && selectedArticle === null) {
      getPost(params.id || "", true)
    }
    findComments()
  }, [selectedArticle?._id])

  const findComments = async () => {
    if (comments.length === 0) {
      const data = await getComments(selectedArticle?._id || "", page)
      setComments(data.comments)
      setPage(data.page + 1)
      setTotalPages(data.totalPages)
    }
  }

  const highlightMentions = (content: string, mentions: IUser[]) => {
    if (!content || !mentions) return content;

    return mentions.reduce((updatedContent, mention) => {
      const fullName = `${mention.firstName} ${mention.lastName}`;
      const mentionRegex = new RegExp(`\\b${fullName}\\b`, "g");

      return updatedContent.replace(
        mentionRegex,
        `<a href="/${mention.userName}" class="text-[#0A66C2] bg-[#F8FAFD] p-1 rounded-md font-semibold hover:underline">${fullName}</a>`
      );
    }, content);
  };

  const handleLikes = () => {
    if (selectedArticle?.likes.includes(userData?._id || "")) {
      disLikePost(selectedArticle._id)
    } else {
      likePost(selectedArticle?._id || "")
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

  const handleMore = async (id: string) => {
    try {
      const data = await getComments(id, page)
      setPage((prev) => prev + 1)
      setComments((prev) => [...prev, ...data.comments])
    } catch (error) {
      console.log(error)
    }
  }


  return <div className="bg-white min-h-screen w-full pt-20">
    <div className="lg:max-w-[70%] md:max-w-[85%] max-w-full mx-auto">
      <div className="bg-[#F8FAFD] p-2 rounded-lg flex gap-4 border-[1px] items-center">
        <button className="flex gap-1.5 items-center hover:bg-[#E5F0FB] p-1 rounded-md transition-all duration-200 text-[#0A66C2] font-semibold text-[18px]"><MdOutlineModeEdit className="text-[20px]" />Edit Article</button>
        <Link to={`/${selectedArticle?.postBy.userName}/update/urn:li:activity/${selectedArticle?._id}`} className="flex gap-1.5 items-center hover:bg-[#E5F0FB] p-1 rounded-md transition-all duration-200 text-[#0A66C2] font-semibold text-[18px]"><IoIosEye className="text-[20px]" />View Post</Link>
      </div>
      <div className="w-full mt-4 px-4 flex md:justify-between md:gap-0 gap-10 flex-col md:flex-row">

        <div className="flex flex-col gap-4 w-[65%]">
          <h1 className="md:text-[35px] text-[25px]">{selectedArticle?.title}</h1>
          <Link to={`/${selectedArticle?.postBy.userName}`} className="flex gap-5 w-fit items-center">
            <img src={selectedArticle?.postBy.profilePic || DEFAULT_PIC} alt={`${selectedArticle?.postBy.firstName} Profile Pic`} className="w-10 h-10 rounded-full" />
            <div>
              <h1 className="text-[17px] hover:underline">{selectedArticle?.postBy.firstName} {selectedArticle?.postBy.lastName}</h1>
              <p className="text-[12px] text-[#666] line-clamp-1">{selectedArticle?.postBy.headline}</p>
            </div>
          </Link>
          <p className="text-[#666] text-[13px]">{isoToLocalDate(selectedArticle?.createdAt)}</p>
          <div
            className="text-[17px]"
            dangerouslySetInnerHTML={{ __html: highlightMentions(selectedArticle?.articleContent || "", selectedArticle?.mentions || []) }}
          />
        </div>
        <div className="w-[3t%] p-3 rounded-lg flex flex-col gap-2 bg-[#F8FAFD]">
          <h1 className="font-semibold">Comments</h1>
          <div className="flex">
            <PostOptions item={selectedArticle} handleLikes={handleLikes} handleComments={() => null} />
          </div>
          <div className="relative w-full">
            <CommentInput className="right-3 top-1/2 -translate-y-1/2" handlePostComment={handlePostComment} item={selectedArticle} commentValue={commentValue} setCommentValue={setCommentValue} />
          </div>
          <div className="flex mt-5 flex-col gap-5">
            {comments.length > 0 ? comments.map((comment, index) => (
              <Comment key={index} comment={comment} />
            )) : <div className="flex gap-2 items-center flex-col justify-center">
              <img src="/images/noComments.svg" alt="No Comments Found SVG" className="w-36" />
              <h1 className="text-[20px]">No comments, yet.</h1>
              <p className="text-[#666] text-[14px]">Be the first to comment.</p>
            </div>}
          </div>
          {page <= totalPages &&
            <button onClick={() => handleMore(selectedArticle?._id || "")} className="flex gap-2 mt-5 items-center text-[14px]"><span className="bg-[#EAE6DF] p-2 rounded-full"><TbArrowsDiagonal2 className="text-[17px]" /></span> <span className="hover:bg-[#EAE6DF] p-1 rounded-md transition-all duration-200">Load more comments</span></button>
          }
        </div>
      </div>
    </div>
  </div>
}
import { DEFAULT_PIC } from "@assets"
import { formatDate } from "@helpers"
import { CommentType } from "@types"
import { Link } from "react-router-dom"

export const Comment: React.FC<{ comment: CommentType }> = ({ comment }) => {
  return <div>
    <div className="flex justify-between items-center">
      <Link to="#" className="flex gap-2 items-center">
        <img
          src={comment.user?.profilePic || DEFAULT_PIC}
          alt={`${comment.user?.firstName} profilePic`}
          className="w-8 h-8 rounded-full"
        />
        <p className="text-[#111] hover:underline transition-all duration-200 text-[15px]">{comment.user?.firstName} {comment.user?.lastName}</p>
      </Link>
      <p className="text-[#666] text-[14px]">{formatDate(comment?.createdAt)}</p>
    </div>
    <pre className={`whitespace-pre-wrap mx-10 max-w-md text-[14px] text-gray-900 `}>
      {comment.comment}
    </pre>
  </div>
}
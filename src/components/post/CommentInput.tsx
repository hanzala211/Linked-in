import { PostType } from "@types"

interface CommentInputProps {
  handlePostComment: (id: string) => void,
  item: PostType | null,
  commentValue: string,
  setCommentValue: React.Dispatch<React.SetStateAction<string>>,
  className?: string
}

export const CommentInput: React.FC<CommentInputProps> = ({ handlePostComment, item, commentValue, setCommentValue, className }) => {
  return <>
    <input type="text" className="border-[1px] border-[#666] outline-none px-4 pr-[5.7rem] py-2 w-full rounded-full" value={commentValue} placeholder="Add a comment..." onChange={(e) => setCommentValue(e.target.value)} />
    <button onClick={() => handlePostComment(item?._id || "")} className={`text-white bg-[#0A66C2] px-2 text-[13px] py-1 rounded-full ${commentValue.length > 0 ? "opacity-100" : "opacity-0 pointer-events-none"} transition-all duration-100 hover:bg-opacity-70 absolute ${className} `}>Comment</button>
  </>
}
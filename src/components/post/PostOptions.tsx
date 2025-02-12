import { useAuth } from "@context"
import { PostType } from "@types"
import { BiLike, BiMessageRoundedMinus } from "react-icons/bi"
import { RiSendPlaneFill } from "react-icons/ri"

interface PostOptionsProps {
  handleLikes: () => void,
  handleComments: (id: string) => void,
  item: PostType | null
}

export const PostOptions: React.FC<PostOptionsProps> = ({ handleLikes, handleComments, item }) => {
  const { userData } = useAuth()
  return <>
    <button onClick={handleLikes} className={`flex gap-2 items-center text-[15px] justify-center hover:bg-slate-100 w-full max-w-lg rounded-lg px-4 py-2 ${item?.likes.includes(userData?._id || "") ? "text-[#0A66C2]" : ""}`}>{!item?.likes.includes(userData?._id || "") ? <BiLike className="text-[17px]" /> : <img src="/images/likeSVG.svg" alt="likes SVG" className="w-5" />
    } Like</button>
    <button className="flex gap-2 items-center text-[15px] justify-center hover:bg-slate-100 w-full max-w-lg rounded-lg px-4 py-2" onClick={() => handleComments(item?._id || "")}><BiMessageRoundedMinus /> Comment</button>
    <button className="flex gap-2 items-center text-[15px] justify-center hover:bg-slate-100 w-full max-w-lg rounded-lg px-4 py-2"><RiSendPlaneFill /> Send</button>
  </>
}
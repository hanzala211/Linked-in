import { DEFAULT_PIC } from "@assets"
import { useAuth, usePost, useProfile } from "@context"
import { formatDate } from "@helpers"
import { PostType } from "@types"
import { BiLike, BiMessageRoundedMinus } from "react-icons/bi"
import { IoEarth } from "react-icons/io5"
import { RiSendPlaneFill } from "react-icons/ri"
import { Link, useNavigate } from "react-router-dom"

interface ProfliePostProps {
  isCurrentProfile: boolean,
  item: PostType
}

export const ProfilePost: React.FC<ProfliePostProps> = ({ isCurrentProfile, item }) => {
  const { userData } = useAuth()
  const { handleSelectPost, likePost, disLikePost, } = usePost()
  const { selectedProfile } = useProfile()
  const navigate = useNavigate()
  const isLiked = item.likes.includes(userData?._id || "");

  const handleClick = () => {
    navigate(`/${isCurrentProfile ? userData?.userName : selectedProfile?.userName}/update/urn:li:activity/${item._id}`)
    handleSelectPost(item)
  }

  const handleLike = () => {
    if (isLiked) {
      disLikePost(item._id)
    } else {
      likePost(item._id)
    }
  }

  return <div className="bg-white border-[1px] w-full mt-3 border-gray-200 p-3 rounded-lg">
    <Link to={`/${isCurrentProfile ? userData?.userName : selectedProfile?.userName}`} className="flex gap-3">
      <img src={(isCurrentProfile ? userData?.profilePic : selectedProfile?.profilePic) || DEFAULT_PIC} alt={`${isCurrentProfile ? userData?.firstName : selectedProfile?.firstName} Profile Pic`} className="w-12 h-12 rounded-full" />
      <div className="space-y-0.5">
        <h1 className="text-[17px] hover:text-[#0A66C2] transition-all duration-200 hover:underline">{isCurrentProfile ? userData?.firstName : selectedProfile?.firstName} {isCurrentProfile ? userData?.lastName : selectedProfile?.lastName}</h1>
        <p className="text-[12px] text-[#666] line-clamp-1">{isCurrentProfile ? userData?.headline : selectedProfile?.headline} </p>
      </div>
    </Link>
    <p className="mx-[3.7rem] text-[13px] flex items-center gap-0.5 text-[#666]">{formatDate(item.createdAt)} • <IoEarth /> </p>
    <Link onClick={() => handleSelectPost(item)} to={`/${isCurrentProfile ? userData?.userName : selectedProfile?.userName}/update/urn:li:activity/${item._id}`}>
      <p className="line-clamp-3 text-[14px] text-gray-700">{item.caption}</p>
      {item.imageUrls.length > 0 &&
        <img src={item.imageUrls.length > 0 ? item.imageUrls[0] : ""} alt={`${item.postBy} Post`} className="md:w-96 mt-1 h-96 w-full object-contain" />
      }
    </Link>
    <div className="px-3 py-2">
      <div className="text-[#666] flex gap-2 text-[13px] border-b-[1px] px-2 py-1">
        <img src="images/likeSVG.svg" alt="Like Image" className="w-4" />
        {item.likeCount} • {item.commentCount} comments
      </div>
      <div className="flex justify-between">
        <button onClick={handleLike} className={`flex gap-2 items-center text-[13px] ${isLiked ? "text-[#0A66C2]" : ""} hover:bg-slate-100 w-fit rounded-lg p-2`}>{isLiked ? <img src="/images/likeSVG.svg" srcSet="like SVG" className="w-4" /> : <BiLike className="text-[17px]" />} Like</button>
        <button onClick={handleClick} className="flex gap-2 items-center text-[13px] hover:bg-slate-100 w-fit rounded-lg p-2"><BiMessageRoundedMinus /> Comment</button>
        <button className="flex gap-2 items-center text-[13px] hover:bg-slate-100 w-fit rounded-lg p-2"><RiSendPlaneFill /> Send</button>
      </div>
    </div>
  </div>
}

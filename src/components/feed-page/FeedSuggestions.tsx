import { DEFAULT_PIC } from "@assets"
import { Skeleton } from "@components"
import { useAuth, useProfile } from "@context"
import { FaCheck, FaPlus } from "react-icons/fa"
import { FaArrowRightLong } from "react-icons/fa6"
import { Link } from "react-router-dom"

export const FeedSuggestions: React.FC<{ className?: string }> = ({ className }) => {
  const { suggestions, isSuggestionLoading, handleFollow, handleUnfollow, handleClick } = useProfile()
  const { userData } = useAuth()

  const handleFollowing = (id: string) => {
    if (userData?.following.includes(id)) {
      handleUnfollow(id)
    } else {
      handleFollow(id)
    }
  }

  return <div className={`bg-white flex flex-col border-[1px] px-4 py-3 gap-3 rounded-lg ${className}`}>
    <h1 className="font-semibold text-[15px]">Add to your feed</h1>
    {!isSuggestionLoading ? suggestions.map((item, index) => (
      <div key={index}>
        <Link to={`/${item.userName}`} onClick={() => handleClick(item)} className="flex gap-2">
          <img src={item.profilePic || DEFAULT_PIC} className="rounded-full w-12 h-12" alt="User" />
          <div className="flex flex-col gap-0.5">
            <h1 className="hover:underline">{item.firstName} {item.lastName}</h1>
            <p className="text-[#666666] text-[12px]">{item.headline}</p>
          </div>
        </Link>
        <button onClick={() => handleFollowing(item._id)} className={`mx-12 flex gap-2 items-center hover:bg-[#F3F3F3] hover:outline hover:outline-1 outline-black mt-2 px-2 border-[1px] border-black rounded-full text-[14px] py-1`}>
          {!userData?.following.includes(item._id) ? <FaPlus /> : <FaCheck />}
          {!userData?.following.includes(item._id) ? `Follow` : `Following`}
        </button>
      </div>
    )) : Array.from({ length: 3 }, (_, index) => (
      <div key={index}>
        <div className="flex items-center gap-2">
          <Skeleton className="w-12 h-12 rounded-full" />
          <div className="flex flex-col gap-1">
            <Skeleton className="w-32 h-3 rounded-md" />
            <Skeleton className="w-24 h-3 rounded-md" />
          </div>
        </div>
        <Skeleton className="w-20 mx-12 h-7 mt-2 rounded-full" />
      </div>
    ))}
    <Link to="/mynetwork" className="flex gap-2 items-center text-[#666] text-[14px] hover:bg-gray-100 transition-all duration-200 px-2 py-1 rounded-lg w-fit">View all recommendations <FaArrowRightLong /></Link>
  </div>
}
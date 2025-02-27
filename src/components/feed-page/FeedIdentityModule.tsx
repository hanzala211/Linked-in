import { BANNER_PIC, DEFAULT_PIC } from "@assets"
import { useAuth, useProfile } from "@context"
import { IUser } from "@types"
import { IoIosBookmark, IoMdClose } from "react-icons/io"
import { Link, useParams } from "react-router-dom"

export const FeedIdentityModule: React.FC<{ data: IUser | null, isNetwork?: boolean, isIndustry?: boolean }> = ({ data, isNetwork, isIndustry }) => {
  const { userData } = useAuth()
  const { handleFollow, handleUnfollow, handleRemoveSuggestions } = useProfile()
  const params = useParams()
  const isCurrentProfile = (params.username || data?.userName) === userData?.userName;
  const isFollowing = !isCurrentProfile && userData?.following.includes(data?._id || "");


  const handleFollowing = () => {
    if (isFollowing) {
      handleUnfollow(data?._id || "")
    } else {
      handleFollow(data?._id || "")
    }
  }

  return <div className="w-full lg:max-w-[95%] max-w-full h-fit relative bg-white rounded-lg border border-gray-300">
    <img src={data?.banner || BANNER_PIC} alt="Feed Page Container" className="w-full rounded-t-lg" />

    <Link to={`/${data?.userName}`} className="flex flex-col items-center relative -top-6">
      <img src={data?.profilePic || DEFAULT_PIC} alt="User" className="w-20 h-20 border-4 border-white rounded-full" />
      <h1 className="hover:underline transition-all font-semibold duration-200 pt-5">{data?.firstName} {data?.lastName}</h1>
      <p className="text-sm text-gray-600 text-center">{data?.headline}</p>
    </Link>

    {isNetwork && <button onClick={() => handleRemoveSuggestions(data?._id || "", isIndustry || false)} className="absolute top-2 right-2 text-white bg-black p-1 rounded-full"><IoMdClose /></button>}

    {isCurrentProfile ?
      <Link to="/my-items/posted-jobs" className="flex items-center gap-3 p-3 border-t group border-gray-300 hover:bg-gray-100 rounded-b-lg transition-all duration-200">
        <IoIosBookmark className="text-gray-500" />
        <span className="text-sm font-semibold text-gray-500 underline group-hover:no-underline transition-all duration-200">Saved Items</span>
      </Link>
      :
      <div className="border-t-[1px] p-4 border-gray-100">
        <button onClick={handleFollowing} className={`${isFollowing ? "bg-blue-800" : "bg-[#0A66C2]"} w-full rounded-full p-2 hover:bg-opacity-80 transition-all duration-200 text-white`}>{isFollowing ? "Following" : "Follow"}</button>
      </div>
    }
  </div>
}
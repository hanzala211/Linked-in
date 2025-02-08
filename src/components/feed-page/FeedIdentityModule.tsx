import { DEFAULT_PIC } from "@assets"
import { useAuth } from "@context"
import { IoIosBookmark } from "react-icons/io"
import { Link } from "react-router-dom"

export const FeedIdentityModule: React.FC = () => {
  const { userData } = useAuth()
  return <div className="w-full lg:max-w-[95%] max-w-full h-fit relative bg-white rounded-lg border border-gray-300">
    <img src="images/homePageContainer.svg" alt="Feed Page Container" className="w-full rounded-t-lg" />

    <Link to={`/${userData?.userName}`} className="flex flex-col items-center relative -top-6">
      <img src={userData?.profilePic || DEFAULT_PIC} alt="User" className="w-20 h-20 border-4 border-white rounded-full" />
      <h1 className="hover:underline transition-all font-semibold duration-200 pt-5">{userData?.firstName} {userData?.lastName}</h1>
      <p className="text-sm text-gray-600 text-center">{userData?.headline}</p>
    </Link>

    <Link to="#" className="flex items-center gap-3 p-3 border-t group border-gray-300 hover:bg-gray-100 rounded-b-lg transition-all duration-200">
      <IoIosBookmark className="text-gray-500" />
      <span className="text-sm font-semibold text-gray-500 underline group-hover:no-underline transition-all duration-200">Saved Items</span>
    </Link>
  </div>
}
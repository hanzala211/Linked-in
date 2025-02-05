import { BANNER_PIC, DEFAULT_PIC } from "@assets"
import { useAuth, useProfile } from "@context"
import { FaCamera } from "react-icons/fa"
import { HiPlus } from "react-icons/hi"
import { MdOutlineModeEdit } from "react-icons/md"

export const ProfileSection: React.FC = () => {
  const { setIsEditingProfile, setIsAddingProfile, setIsAddingBanner } = useProfile()
  const { userData } = useAuth()

  return <div className="w-full rounded-lg relative bg-white">
    <div className="relative">
      <img
        src={userData?.banner || BANNER_PIC}
        alt={`${userData?.firstName} Banner`}
        className="rounded-t-lg w-full object-cover"
      />
      <button onClick={() => setIsAddingBanner(true)} className="absolute bg-white p-2 rounded-full top-4 right-4 border">
        <FaCamera className="text-[#0A66C2] text-[15px]" />
      </button>
    </div>

    <div className="relative md:pt-8 pt-3">
      <div className="absolute md:-top-24 -top-16 left-4">
        <button onClick={() => setIsAddingProfile(true)} className="rounded-full md:w-40 w-28">
          <img
            src={userData?.profilePic || DEFAULT_PIC}
            className="rounded-full w-full"
            alt={`${userData?.firstName} Profile Pic`}
          />
          {userData?.profilePic === null && (
            <div className="text-[#0A66C2] w-fit border border-[#0A66C2] p-3 text-[20px] absolute md:right-5 right-0 -bottom-2 rounded-full bg-white">
              <HiPlus />
            </div>
          )}
        </button>
      </div>

      <div className="mt-12 px-5 pb-5">
        <h1 className="text-[25px]">{userData?.firstName} {userData?.lastName}</h1>
        <p className="line-clamp-1 text-[#666] text-[16px] my-1">{userData?.headline}</p>
        <p className="text-[#666] text-[13px]">
          {userData?.region}, {userData?.country}
        </p>
        <button className="w-fit p-2 border hover:bg-[#f3f3f3] border-black font-semibold mt-2 rounded-full">
          Saved Items
        </button>
      </div>
    </div>

    <button onClick={() => setIsEditingProfile(true)} className="absolute right-2 top-1/2 text-[25px] p-3 hover:bg-[#F3F3F3] transition-all duration-200 rounded-full">
      <MdOutlineModeEdit />
    </button>
  </div>

}
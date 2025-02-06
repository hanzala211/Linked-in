import { BANNER_PIC, DEFAULT_PIC } from "@assets"
import { useAuth, useProfile, useSearch } from "@context"
import { FaCamera } from "react-icons/fa"
import { HiPlus } from "react-icons/hi"
import { LuPlus } from "react-icons/lu"
import { MdOutlineFileDownload, MdOutlineModeEdit } from "react-icons/md"

export const ProfileSection: React.FC<{ isCurrentProfile: boolean }> = ({ isCurrentProfile }) => {
  const { setIsEditingProfile, setIsAddingProfile, setIsAddingBanner } = useProfile()
  const { selectedProfile } = useSearch()
  const { userData } = useAuth()

  const handleAddingProfile = () => {
    if (isCurrentProfile) {
      setIsAddingProfile(true)
    }
  }

  return <div className="w-full rounded-lg relative bg-white">
    <div className="relative">
      <img
        src={(isCurrentProfile ? userData?.banner : selectedProfile?.banner) || BANNER_PIC}
        alt={`${isCurrentProfile ? userData?.firstName : selectedProfile?.firstName} Banner`}
        className="rounded-t-lg w-full object-cover"
      />
      {isCurrentProfile &&
        <button onClick={() => setIsAddingBanner(true)} className="absolute bg-white p-2 rounded-full top-4 right-4 border">
          <FaCamera className="text-[#0A66C2] text-[15px]" />
        </button>
      }
    </div>

    <div className="relative md:pt-8 pt-3">
      <div className="absolute md:-top-24 -top-16 left-4">
        <button onClick={handleAddingProfile} className="rounded-full md:w-40 w-28">
          <img
            src={(isCurrentProfile ? userData?.profilePic : selectedProfile?.profilePic) || DEFAULT_PIC}
            className="rounded-full w-full"
            alt={`${isCurrentProfile ? userData?.firstName : selectedProfile?.firstName} Profile Pic`}
          />
          {isCurrentProfile && userData?.profilePic === null && (
            <div className="text-[#0A66C2] w-fit border border-[#0A66C2] p-3 text-[20px] absolute md:right-5 right-0 -bottom-2 rounded-full bg-white">
              <HiPlus />
            </div>
          )}
        </button>
      </div>

      <div className="mt-12 px-5 pb-5">
        <h1 className="text-[25px]">{isCurrentProfile ? userData?.firstName : selectedProfile?.firstName} {isCurrentProfile ? userData?.lastName : selectedProfile?.lastName}</h1>
        <p className="line-clamp-1 text-[#666] text-[16px] my-1">{isCurrentProfile ? userData?.headline : selectedProfile?.headline}</p>
        <p className="text-[#666] text-[13px]">
          {isCurrentProfile ? userData?.region : selectedProfile?.region} {isCurrentProfile ? userData?.country : selectedProfile?.country}
        </p>
        <div className="flex gap-2 items-center justify-end mt-4">
          {isCurrentProfile &&
            <button className="w-fit p-2 border hover:bg-[#f3f3f3] border-black rounded-full">
              Saved Items
            </button>
          }
          {!isCurrentProfile &&
            <button className="bg-[#0A66C2] text-white flex p-2 items-center rounded-full px-4 hover:bg-blue-900 transition-all duration-200"><LuPlus className="text-[20px]" />Follow</button>
          }
          <button className="flex items-center gap-2 w-fit p-2 border hover:bg-[#f3f3f3] border-black rounded-full transition-all duration-200"><MdOutlineFileDownload className="text-[20px]" />Save to PDF</button>
        </div>
      </div>
    </div>
    {isCurrentProfile &&
      <button onClick={() => setIsEditingProfile(true)} className="absolute right-2 sm:top-1/2 top-1/3 text-[25px] p-3 hover:bg-[#F3F3F3] transition-all duration-200 rounded-full">
        <MdOutlineModeEdit />
      </button>
    }
  </div>

}
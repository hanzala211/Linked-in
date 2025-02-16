import { DEFAULT_EXPERIENCE_PIC, DotSVG } from "@assets"
import { useAuth, useJob } from "@context"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { JobType } from "@types"
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5"
import { MdDelete } from "react-icons/md"
import { Link } from "react-router-dom"

interface SavePageJobModelProps {
  isSaves?: boolean,
  item?: JobType,
  index?: number,
  arr: JobType[]
}

export const SavePageJobModel: React.FC<SavePageJobModelProps> = ({ isSaves, item, index, arr }) => {
  const { saveJob, unSaveJob } = useJob()
  const { userData } = useAuth()
  const isSaved = userData?.jobs.includes(item?._id || '')

  const handleSave = () => {
    if (isSaved) {
      unSaveJob(item?._id || "")
    } else {
      saveJob(item?._id || "")
    }
  }

  return <div className="py-2 px-5">
    <div className="flex items-start justify-between">
      <div className={`flex gap-2 items-start ${index !== arr?.length - 1 ? "border-b-[1px]" : ""} w-full py-3`}>
        <img src={item?.company.companyImg || DEFAULT_EXPERIENCE_PIC} alt="Test Img" className="w-12 h-12" />
        <div className="space-y-0.5">
          <Link to={`/jobs/search?jobId=${item?._id}`} className="hover:underline">{item?.title}</Link>
          <p className="text-[#666] text-[14px]">{item?.company.companyName}</p>
          <p className="text-[#666] text-[12px]">{item?.region}, {item?.country} ({item?.employmentType})</p>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger className="hover:bg-gray-100 transition-all duration-200 text-[25px] p-2 rounded-full">
          <DotSVG />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white shadow-md rounded-md border-[1px] hover:bg-gray-100 transition-all duration-200 mt-5 lg:mt-2 mr-10 lg:mr-56 p-2 w-60">
          <DropdownMenuItem onClick={() => {
            if (isSaves) {
              handleSave()
            }
          }} className="cursor-pointer flex items-center gap-2 p-2 rounded-md outline-none">
            <span>{isSaves ? (isSaved ? <IoBookmark /> : <IoBookmarkOutline />) : <MdDelete />}</span> {isSaves ? (isSaved ? "Unsave Job" : "Save Job") : "Delete Job"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>
}
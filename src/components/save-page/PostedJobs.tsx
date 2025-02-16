import { SavePageJobModel } from "@components"
import { useJob } from "@context"
import { MdOutlineEdit } from "react-icons/md"
import { Link } from "react-router-dom"

export const PostedJobs: React.FC = () => {
  const { postedJobs } = useJob()
  return <>
    <div className="bg-white border-[1px] rounded-lg">
      <h1 className="text-[24px] p-5 border-b-[1px]">Posted Jobs</h1>
      <div className="flex flex-col gap-2">
        {postedJobs.length > 0 ? postedJobs.map((item, index, arr) => (
          <SavePageJobModel isSaves={false} item={item} key={index} arr={arr} index={index} />
        )) : <h1 className="flex mt-2 justify-center">You have not posted any job yet.</h1>}
      </div>
    </div>
    <div className="bg-white p-4 h-20 rounded-lg border-[1px]">
      <Link to="/job-posting/form" className="border-[#0A66C2] text-[#0A66C2] border-[1px] rounded-full flex items-center gap-2 w-full justify-center p-2 text-[18px] hover:bg-[#EBF4FD] transition-all duration-200 "><span><MdOutlineEdit /></span> Post a free Job</Link>
    </div>
  </>
}
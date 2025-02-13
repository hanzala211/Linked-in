import { FeedIdentityModule, JobModel } from "@components"
import { useAuth } from "@context"
import { FaLongArrowAltRight } from "react-icons/fa"
import { IoBookmark } from "react-icons/io5"
import { MdModeEdit } from "react-icons/md"
import { Link } from "react-router-dom"

export const JobPage: React.FC = () => {
  const { userData } = useAuth()
  return <section className="grid md:grid-cols-[0.7fr_2fr] gap-5 lg:gap-0 grid-cols-1 pt-20 mx-auto w-full xl:max-w-[70%] max-w-[98%]">
    {/* First Column */}
    <div className="flex flex-col gap-3">
      <FeedIdentityModule data={userData} />

      <div className="bg-white rounded-lg border-[1px] border-gray-300 py-2 w-full md:max-w-[95%] max-w-full">
        <div className="hover:bg-gray-100 p-3 ">
          <button className="flex gap-2 w-full items-center font-semibold"><IoBookmark className="text-[22px]" /> My jobs</button>
        </div>
        <div className="border-b-[1px] mx-4 my-2"></div>
        <div className="hover:bg-gray-100 p-3">
          <Link to="/job-posting/form" className="flex gap-2 w-full items-center text-[#0A66C2] font-semibold"><MdModeEdit className="text-[22px]" /> Post a free job</Link>
        </div>
      </div>

    </div>

    <div className="flex flex-col gap-3">
      <div className="bg-white rounded-lg border-[1px] border-gray-300 w-full lg:max-w-[92%] max-w-full">
        <div className="p-4">
          <h1 className="text-[20px]">Job picks for you</h1>
          <p className="text-[#666] text-[13px]">Based on your profile, preferences, and activity like applies, searches, and saves</p>
        </div>
        <div className="flex flex-col gap-5 px-4">
          {Array.from({ length: 3 }, (_, i) => (
            <JobModel key={i} />
          ))}
        </div>
        <Link to="/jobs/search" className="w-full py-2.5 flex text-[#666] transition-all border-t-[1px] mt-4 duration-200 items-center justify-center gap-2 hover:bg-gray-50 rounded-b-lg">
          Search for more jobs <FaLongArrowAltRight />
        </Link>
      </div>

      <div className="bg-white rounded-lg border-[1px] border-gray-300 w-full lg:max-w-[92%] max-w-full">
        <div className="p-4">
          <h1 className="text-[20px]">Random Jobs</h1>
        </div>
        <div className="flex flex-col gap-5 px-4 py-2">
          {Array.from({ length: 10 }, (_, i) => (
            <JobModel key={i} />
          ))}
        </div>
      </div>
    </div>

  </section>
}
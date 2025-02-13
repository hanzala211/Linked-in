import { DEFAULT_EXPERIENCE_PIC, DEFAULT_PIC } from "@assets"
import { useJob, useProfile, useSearch } from "@context"
import { IUser, JobType } from "@types"
import { IoSearchOutline } from "react-icons/io5"
import { Link } from "react-router-dom"

export const SearchBox: React.FC = () => {
  const { handleClick } = useProfile()
  const { searchData } = useSearch()
  const { setSelectedJob } = useJob()


  return <div className="fixed bg-white rounded-lg border-[1px] lg:w-96 sm:w-[82vw] w-[90vw] h-fit top-14 lg:top-auto">
    {searchData.map((item: JobType | IUser, index) => {
      const isUser = "userName" in item;
      const isJob = "title" in item;

      return (
        <Link
          to={isUser && !isJob ? `/${(item as IUser).userName}` : `/jobs/search?jobId=${(item as JobType)._id}`}
          key={index}
          onClick={() => {
            if (!isJob && isUser) {
              handleClick(item as IUser);
            } else {
              setSelectedJob(item)
            }
          }}
          className="py-2 flex gap-2 items-center px-4 justify-between hover:bg-gray-100 rounded-lg"
        >
          <div className="flex gap-2 items-center">
            <IoSearchOutline className="text-[20px]" />
            <h1 className="font-semibold text-[#666]">
              {isUser && !isJob ? (item as IUser).userName : (item as JobType).title}
            </h1>
          </div>
          <img
            src={
              isUser && !isJob
                ? (item as IUser).profilePic || DEFAULT_PIC
                : (item as JobType).company?.companyImg || DEFAULT_EXPERIENCE_PIC
            }
            alt={
              isUser && !isJob
                ? `${(item as IUser).firstName} Image`
                : "Company Image"
            }
            className={`w-10 h-10 ${isUser && "rounded-full"}`}
          />
        </Link>
      );
    })}
  </div>
}
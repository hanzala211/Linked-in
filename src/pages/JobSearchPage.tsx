import { DEFAULT_EXPERIENCE_PIC, DEFAULT_PIC } from "@assets";
import { JobModel, JobsLoader, Pagination, PaginationContent, PaginationItem } from "@components"
import { useJob } from "@context";
import { formatDate, titleChanger } from "@helpers";
import { useEffect } from "react"
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const JobSearchPage: React.FC = () => {
  const { paginatedJobs, totalPages, setPage, page, isJobsLoading, selectedJob, setSelectedJob, getJob, getJobs, setIsApplicationModelOpen } = useJob()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    titleChanger(`${selectedJob?.title || ""} Job`)
  }, [selectedJob?.title])

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.style.overflow = "hidden";
    }
    if (location.search) {
      getJob(location.search.slice(location.search.indexOf("=") + 1) || "")
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (page <= totalPages) {
      getJobs(page, "7")
    }
  }, [page])

  return (
    <section className="flex pt-20 mx-auto w-full xl:max-w-[55%] max-w-[98%] h-[100dvh]">
      <div className={`border-[1px] border-r-[0] border-gray-200 bg-white h-full ${selectedJob !== null ? "md:w-full w-0" : "w-full"} overflow-y-auto`}>
        <div className={`flex flex-col`}>
          {!isJobsLoading ? paginatedJobs.map((item, i) => (
            <div onClick={() => {
              setSelectedJob(item)
              navigate(`/jobs/search?jobId=${item?._id}`)
            }}
              className={`px-4 ${selectedJob?._id === item?._id ? "bg-gray-50 border-l-[1px] border-black" : ""} p-3`}>
              <JobModel item={item} key={i} />
            </div>
          )) : Array.from({ length: 9 }, (_, i) => (
            <div className="px-4 p-3">
              <JobsLoader key={i} />
            </div>
          ))}
        </div>


        <Pagination>
          <PaginationContent className="space-x-4 my-5">
            {page > 3 && (
              <PaginationItem
                key="left-ellipsis"
                onClick={() => setPage(Math.max(1, page - 5))}
                className="text-[14px] cursor-pointer"
              >
                ...
              </PaginationItem>
            )}
            {Array.from({ length: totalPages }, (_, i) => {
              const pageNumber = i + 1;
              const showFirstPages = page <= 3 && pageNumber <= 5;
              const showMiddlePages =
                page > 3 &&
                page < totalPages - 2 &&
                pageNumber >= page - 2 &&
                pageNumber <= page + 2;
              const showLastPages =
                page >= totalPages - 2 && pageNumber >= totalPages - 4;

              if (showFirstPages || showMiddlePages || showLastPages) {
                return (
                  <PaginationItem
                    key={i}
                    onClick={() => setPage(pageNumber)}
                    className={`${page === pageNumber
                      ? "text-white bg-black px-2 py-0.5 rounded-full"
                      : ""
                      } text-[14px] cursor-pointer`}
                  >
                    {pageNumber}
                  </PaginationItem>
                );
              }
              return null;
            })}

            {page < totalPages - 2 && (
              <PaginationItem
                key="right-ellipsis"
                onClick={() => setPage(Math.min(totalPages, page + 5))}
                className="text-[14px] cursor-pointer"
              >
                ...
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>


      <div className={`border-[1px] flex flex-col gap-3 border-l-[0] border-gray-200 bg-white h-full ${selectedJob === null ? " md:w-full md:p-4 w-0 p-0" : "w-full p-4"} overflow-y-auto`}>
        {window.innerWidth < 768 && <Link to="/jobs/search" className="text-white bg-[#0A66C2] w-fit p-1.5 rounded-full mb-2" onClick={() => setSelectedJob(null)}><FaArrowLeftLong /></Link>}
        <h2 className="flex gap-2 items-center text-[15px]"><img src={selectedJob?.company.companyImg || DEFAULT_EXPERIENCE_PIC} alt={`${selectedJob?.company.companyName} image`} className="w-8" /> {selectedJob?.company.companyName}</h2>
        <h1 className="text-[30px]">{selectedJob?.title}</h1>
        <p className="text-[13px] text-[#666]">{selectedJob?.region}, {selectedJob?.country} · <span className="text-[#01754F] font-semibold">{formatDate(selectedJob?.createdAt || 0)}</span> · {(selectedJob?.appliedCount || 0) > 0 && `${selectedJob?.appliedCount} applicants`} </p>
        <p className="bg-gray-200 w-fit p-1 rounded-md text-[14px]">{selectedJob?.employmentType}</p>
        <div className="space-x-2">
          <button onClick={() => setIsApplicationModelOpen(true)} className="bg-[#0A66C2] text-white rounded-full px-6 py-2 text-[18px] hover:bg-opacity-70 transition-all duration-200">Easy Apply</button>
          <button className="bg-transparent text-[#0A66C2] hover:bg-gray-200 hover:text-gray-500 hover:border-gray-500 border-[1px] border-[#0A66C2] rounded-full px-6 py-2 text-[18px] hover:bg-opacity-70 transition-all duration-200">Save</button>
        </div>
        <div className="p-3 border-[1px] border-gray-300 rounded-lg">
          <h1 className="font-semibold">Meet the hiring team</h1>
          <Link to={`/${selectedJob?.jobBy.userName}`} className="flex gap-3 py-4 items-center">
            <img src={selectedJob?.jobBy.profilePic || DEFAULT_PIC} alt={`${selectedJob?.jobBy.firstName} Image`} className="w-12 rounded-full" />
            <div>
              <h1 className="hover:underline">{selectedJob?.jobBy.firstName} {selectedJob?.jobBy.lastName}</h1>
              <p className="text-[#666] text-[13px]">{selectedJob?.jobBy.headline}</p>
              <p className="text-[#666] text-[12px]">Job Poster</p>
            </div>
          </Link>
        </div>
        <h1 className="text-[18px] font-semibold">About the job:</h1>
        <div
          className="text-[17px]"
          dangerouslySetInnerHTML={{ __html: selectedJob?.jobContent || "" }}
        />
      </div>
    </section>
  );
};

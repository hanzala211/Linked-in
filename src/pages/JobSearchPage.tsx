import { JobModel, Pagination, PaginationContent, PaginationItem } from "@components"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

export const JobSearchPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const itemsPerPage = 10; // Number of items per page
  const totalItems = 100; // Total number of items (can be dynamic)
  const totalPages = Math.ceil(totalItems / itemsPerPage); // Calculate total pages dynamically

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <section className="flex pt-20 mx-auto w-full xl:max-w-[55%] max-w-[98%] h-screen">
      <div className="border-[1px] border-r-[0] border-gray-200 py-1 bg-white w-full h-full overflow-y-auto">
        <div className="flex flex-col">
          {Array.from({ length: itemsPerPage }, (_, i) => (
            <div className="border-l-[1px] border-black px-4 bg-gray-50 p-3">
              <JobModel key={i} />
            </div>
          ))}
        </div>

        <Pagination>
          <PaginationContent className="space-x-4 mt-5">
            {currentPage > 3 && (
              <PaginationItem
                key="left-ellipsis"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 5))}
                className="text-[14px] cursor-pointer"
              >
                ...
              </PaginationItem>
            )}
            {Array.from({ length: totalPages }, (_, i) => {
              const pageNumber = i + 1;
              const showFirstPages = currentPage <= 3 && pageNumber <= 5;
              const showMiddlePages =
                currentPage > 3 &&
                currentPage < totalPages - 2 &&
                pageNumber >= currentPage - 2 &&
                pageNumber <= currentPage + 2;
              const showLastPages =
                currentPage >= totalPages - 2 && pageNumber >= totalPages - 4;

              if (showFirstPages || showMiddlePages || showLastPages) {
                return (
                  <PaginationItem
                    key={i}
                    onClick={() => setCurrentPage(pageNumber)}
                    className={`${currentPage === pageNumber
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

            {currentPage < totalPages - 2 && (
              <PaginationItem
                key="right-ellipsis"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 5))}
                className="text-[14px] cursor-pointer"
              >
                ...
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>


      <div className="border-[1px] flex flex-col gap-3 border-l-[0] border-gray-200 w-full bg-white p-4 h-full overflow-y-auto">
        <h2 className="flex gap-2 items-center text-[15px]"><img src="/images/userTest.jpeg" alt="Test Company Img" className="w-8" /> Company Name</h2>
        <h1 className="text-[30px]">Title</h1>
        <p className="text-[13px] text-[#666]">Lahore, Punjab, Pakistan · <span className="text-[#01754F] font-semibold">44 minutes ago</span> · 1 applicant</p>
        <p className="bg-gray-200 w-fit p-1 rounded-md text-[14px]">On-site</p>
        <div className="space-x-2">
          <button className="bg-[#0A66C2] text-white rounded-full px-6 py-2 text-[18px] hover:bg-opacity-70 transition-all duration-200">Easy Apply</button>
          <button className="bg-transparent text-[#0A66C2] hover:bg-gray-200 hover:text-gray-500 hover:border-gray-500 border-[1px] border-[#0A66C2] rounded-full px-6 py-2 text-[18px] hover:bg-opacity-70 transition-all duration-200">Save</button>
        </div>
        <div className="p-3 border-[1px] border-gray-300 rounded-lg">
          <h1 className="font-semibold">Meet the hiring team</h1>
          <Link to="#" className="flex gap-3 py-4 items-center">
            <img src="/images/userTest.jpeg" alt="Test User Img" className="w-12 rounded-full" />
            <div>
              <h1 className="hover:underline">Name</h1>
              <p className="text-[#666] text-[13px]">Talent Acquisition Specialist | Payroll Management | Human Resource Management | Employee Engagement & Performance | Effective Policy Maker | People Manager |</p>
              <p className="text-[#666] text-[12px]">Job Poster</p>
            </div>
          </Link>
        </div>
        <h1 className="text-[18px] font-semibold">About the job:</h1>
        <div
          className="text-[17px]"
          dangerouslySetInnerHTML={{ __html: "<h1>You will write everything in this </h1>" }}
        />
      </div>
    </section>
  );
};

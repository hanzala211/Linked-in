import { useSearch } from "@context";
import { errorToast, getErrorMessage, successToast } from "@helpers";
import { jobService } from "@services";
import { JobContextTypes, JobType } from "@types";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const JobContext = createContext<JobContextTypes | undefined>(undefined)

export const JobProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { searchValue, setSearchData } = useSearch()
  const [jobContent, setJobContent] = useState<string>("")
  const [firstJobs, setFirstJobs] = useState<JobType[]>([])
  const [threeJobs, setThreeJobs] = useState<JobType[]>([])
  const [paginatedJobs, setPaginatedJobs] = useState<JobType[]>([])
  const [isCreatingJob, setIsCreatingJob] = useState<boolean>(false)
  const [isJobsLoading, setIsJobsLoading] = useState<boolean>(true)
  const [page, setPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(2)
  const [selectedJob, setSelectedJob] = useState<JobType | null>(null)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (searchValue.length > 3 && location.pathname.includes("/jobs")) {
      searchJobs(signal);
    } else {
      setSearchData([]);
    }

    return () => controller.abort();
  }, [searchValue]);


  useEffect(() => {
    if (threeJobs.length === 0) {
      getJobs("1", "3")
    }
    if (firstJobs.length === 0) {
      getJobs("1", "8")
    }
    if (page <= totalPages) {
      getJobs(page, "7")
    }
  }, [page])

  const createJob = async (sendData: unknown) => {
    try {
      setIsCreatingJob(true)
      const { data } = await jobService.createJob(sendData)
      if (data.status === "Job Created Successfully") {
        successToast(data.status)
        console.log(data)
      } else {
        errorToast(data.status)
      }
      navigate("/jobs")
    } catch (error) {
      console.log(error)
      const errorMessage = getErrorMessage(error);
      errorToast(errorMessage);
    } finally {
      setIsCreatingJob(false)
    }
  }

  const getJobs = async (page: unknown, limit: unknown) => {
    try {
      setIsJobsLoading(true)
      const { data } = await jobService.getJobs(page, limit)
      console.log(data)
      if (data.status === "Jobs Found") {
        if (limit === "3") {
          setThreeJobs(data.jobs)
        } else if (limit === "8") {
          setFirstJobs(data.jobs)
        } else {
          setPaginatedJobs(data.jobs)
          setPage(data.page)
          setTotalPages(data.totalPages)
          if (window.innerWidth > 768) {
            setSelectedJob(data.jobs[0])
            navigate(`/jobs/search?jobId=${data.jobs[0]._id}`)
          }
        }
      }
      setIsJobsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const searchJobs = async (signal: AbortSignal) => {
    try {
      const { data } = await jobService.searchJobs(searchValue, signal)
      if (data.status === "Jobs Found") {
        setSearchData(data.data)
      }
    } catch (error) {
      const genreated = getErrorMessage(error)
      if (genreated !== "canceled") {
        console.log(genreated)
      }
    }
  }

  const getJob = async (jobId: string) => {
    try {
      const { data } = await jobService.getJob(jobId)
      if (data.status === "Job Found") {
        setSelectedJob(data.job)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return <JobContext.Provider value={{ jobContent, setJobContent, createJob, isCreatingJob, isJobsLoading, setIsJobsLoading, firstJobs, setFirstJobs, threeJobs, setThreeJobs, paginatedJobs, setPaginatedJobs, page, totalPages, setPage, selectedJob, setSelectedJob, getJob }}>{children}</JobContext.Provider>
}

export const useJob = (): JobContextTypes => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error("use useAuth in it's Provider")
  }
  return context;
}
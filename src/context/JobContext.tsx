import { useAuth, useSearch } from "@context";
import { errorToast, getErrorMessage, successToast } from "@helpers";
import { jobService } from "@services";
import { IUser, JobContextTypes, JobType } from "@types";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const JobContext = createContext<JobContextTypes | undefined>(undefined)

export const JobProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { searchValue, setSearchData } = useSearch()
  const { setUserData } = useAuth()
  const [jobContent, setJobContent] = useState<string>("")
  const [firstJobs, setFirstJobs] = useState<JobType[]>([])
  const [threeJobs, setThreeJobs] = useState<JobType[]>([])
  const [paginatedJobs, setPaginatedJobs] = useState<JobType[]>([])
  const [isCreatingJob, setIsCreatingJob] = useState<boolean>(false)
  const [isJobsLoading, setIsJobsLoading] = useState<boolean>(true)
  const [page, setPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(2)
  const [selectedJob, setSelectedJob] = useState<JobType | null>(null)
  const [email, setEmail] = useState<string>('')
  const [phone, setPhone] = useState<string>("")
  const [isApplicationModelOpen, setIsApplicationModelOpen] = useState<boolean>(false)
  const [selectedFile, setSelectedFile] = useState<string[]>([])
  const [fileName, setFileName] = useState<string>("")
  const [isApplying, setIsApplying] = useState<boolean>(false)
  const [isAddingPDF, setIsAddingPDF] = useState<boolean>(false)
  const [savedJobs, setSavedJobs] = useState<JobType[]>([])
  const [postedJobs, setPostedJobs] = useState<JobType[]>([])
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
    if (savedJobs.length === 0) {
      getSavedJobs()
    }
    if (postedJobs.length === 0) {
      getPostedJobs()
    }
  }, [])

  const createJob = async (sendData: unknown) => {
    try {
      setIsCreatingJob(true)
      const { data } = await jobService.createJob(sendData)
      if (data.status === "Job Created Successfully") {
        successToast(data.status)
        console.log(data)
        setPostedJobs((prev) => [...prev, data.job])
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
          if (window.innerWidth > 768 && location.search === "") {
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


  const applyToJob = async () => {
    try {
      setIsApplying(true)
      const formData = new FormData()
      if (selectedFile.length !== 0) {
        const response = await fetch(selectedFile[0]);
        const blob = await response.blob();
        formData.append("file", blob, `${fileName}`);
      }
      formData.append("number", phone)
      formData.append("recieverEmail", selectedJob?.jobBy.email || "")
      formData.append("email", email)
      formData.append("title", selectedJob?.title || "")
      const { data } = await jobService.applyToJob(formData, selectedJob?._id || "")
      if (data.status === "Applied Successfully") {
        successToast(data.status)
      }
    } catch (error) {
      console.log(error)
      const errorMessage = getErrorMessage(error);
      errorToast(errorMessage);
    } finally {
      setIsApplying(false)
      setIsApplicationModelOpen(false)
      setEmail("")
      setPhone("")
      setSelectedFile([])
      setFileName("")
      setIsAddingPDF(false)
    }
  }

  const saveJob = async (id: string, item: JobType | null) => {
    try {
      const { data } = await jobService.saveJob(id || "")
      console.log(data)
      if (data.status === "Job Saved Successfully") {
        successToast(data.status)
        setUserData((prev: IUser | null) => prev ? {
          ...prev,
          jobs: [...prev.jobs, id],
        } : null)
        if (item !== null) {
          setSavedJobs((prev) => [...prev, item])
        }
      } else {
        errorToast(data.status)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const unSaveJob = async (id: string) => {
    try {
      const { data } = await jobService.unSaveJob(id || "")
      if (data.status === "Job Unsaved Successfully") {
        successToast(data.status)
        setUserData((prev: IUser | null) => prev ? {
          ...prev,
          jobs: prev.jobs.filter((item) => item !== id),
        } : null)
        setSavedJobs((prev) => prev.filter((item) => item._id !== id))
      } else {
        errorToast(data.status)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getSavedJobs = async () => {
    try {
      const { data } = await jobService.getSavedJobs()
      if (data.status === "Saved Jobs Found") {
        console.log(data)
        setSavedJobs(data.jobs)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getPostedJobs = async () => {
    try {
      const { data } = await jobService.getPostedJobs()
      if (data.status === "Jobs Found") {
        setPostedJobs(data.jobs)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const deleteJob = async (id: string) => {
    try {
      const { data } = await jobService.deleteJob(id);
      if (data.status === "Job Deleted Successfully") {
        successToast(data.status)
        setPostedJobs((prev) => prev.filter((item) => item._id !== id))
      } else {
        errorToast(data.status || "Failed")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return <JobContext.Provider value={{ jobContent, setJobContent, createJob, isCreatingJob, isJobsLoading, setIsJobsLoading, firstJobs, setFirstJobs, threeJobs, setThreeJobs, paginatedJobs, setPaginatedJobs, page, totalPages, setPage, selectedJob, setSelectedJob, getJob, getJobs, email, setEmail, phone, setPhone, isApplicationModelOpen, setIsApplicationModelOpen, selectedFile, setSelectedFile, fileName, setFileName, applyToJob, isApplying, isAddingPDF, setIsAddingPDF, saveJob, unSaveJob, savedJobs, getSavedJobs, postedJobs, deleteJob }}>{children}</JobContext.Provider>
}

export const useJob = (): JobContextTypes => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error("use useJob in it's Provider")
  }
  return context;
}
import { errorToast, successToast } from "@helpers";
import { jobService } from "@services";
import { JobContextTypes } from "@types";
import { createContext, ReactNode, useContext, useState } from "react";

const JobContext = createContext<JobContextTypes | undefined>(undefined)

export const JobProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [jobContent, setJobContent] = useState<string>("")
  const [isCreatingJob, setIsCreatingJob] = useState<boolean>(false)

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
    } catch (error) {
      console.log(error)
      errorToast(error?.errors[0])
    } finally {
      setIsCreatingJob(false)
    }
  }

  return <JobContext.Provider value={{ jobContent, setJobContent, createJob, isCreatingJob }}>{children}</JobContext.Provider>
}

export const useJob = (): JobContextTypes => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error("use useAuth in it's Provider")
  }
  return context;
}
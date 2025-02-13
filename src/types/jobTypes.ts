import { IUser } from "@types"

export interface JobType {
  company: {
    companyName: string,
    companyImg: string | null
  },
  _id: string,
  title: string,
  jobContent: string,
  employmentType: string,
  industry: string,
  appliedCount?: number,
  region: string,
  country: string,
  jobBy: IUser,
  createdAt: number,
  updatedAt: number,
  __v: number

}
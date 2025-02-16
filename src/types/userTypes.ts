
export interface IUser {
  _id: string,
  userName: string,
  email: string,
  firstName?: string,
  lastName?: string,
  __v?: number,
  profilePic?: string | null,
  country?: string | null,
  region?: string | null,
  posts: string[],
  banner?: string | null,
  experience: IExperience[],
  education: IEducation[],
  headline: string,
  industry: string | null,
  postsCount: number,
  followers: string[],
  followerCount: number,
  following: string[],
  followingCount: number,
  savedPosts: string[],
  resume: {
    resumeLink: string,
    resumeName: string
  } | null,
  jobs: string[]
}

export interface IExperience {
  companyName: string,
  companyImg?: string | null,
  employmentType: string,
  description: string,
  startDate: string,
  endDate: string,
  location: string,
}

export interface IEducation {
  schoolName: string,
  schoolImg?: string | null,
  description: string,
  startDate: string,
  endDate: string,
  location: string,
  degree: string,
  grade: string
}

export interface FormTypes {
  text: string,
  name: string,
  type: string
}

import { z } from "zod"
export const baseScheema = z.object({
  email: z.string().email('Invalid Email Address'),
  password: z.string().min(7),
  userName: z.string(),
  firstName: z.string(),
  lastName: z.string(),
})

export const formScheemaLogin = baseScheema.pick({ email: true, password: true })
export const formScheemaSignup = baseScheema.pick({ email: true, password: true, userName: true })
export const formScheemaName = baseScheema.pick({ firstName: true, lastName: true })


export type FormScheemaLogin = z.infer<typeof formScheemaLogin>
export type FormScheemaSignup = z.infer<typeof formScheemaSignup>
export type FormScheemaName = z.infer<typeof formScheemaName>

export const experienceSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  companyImg: z.any(),
  employmentType: z.string().min(1, "Employment Type is required"),
  description: z.string().min(1, "Description is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  location: z.string().min(1, "Location is required"),
});

export const educationSchema = z.object({
  schoolName: z.string().min(1, "Institution name is required"),
  schoolImg: z.any(),
  description: z.string().min(1, "Description is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  location: z.string().min(1, "Location is required"),
  degree: z.string(),
  grade: z.string(),
});

export const editFormSchema = z.object({
  firstName: z.string().min(1, "First Name is Required"),
  lastName: z.string().min(1, "Last Name is Required"),
  industry: z.string().min(1, "Industry is Required"),
  headline: z.string().min(1, "Headline is Required"),
  country: z.string().min(1, "Country is Required"),
  region: z.string().min(1, "Region is Required"),
  education: z.array(educationSchema).optional(),
  experience: z.array(experienceSchema).optional(),
});

export type EditForm = z.infer<typeof editFormSchema>;
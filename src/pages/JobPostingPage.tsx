import { companies, DEFAULT_EXPERIENCE_PIC } from "@assets"
import { EditInput, JobContentEditor } from "@components"
import { useJob } from "@context"
import { titleChanger } from "@helpers"
import { zodResolver } from "@hookform/resolvers/zod"
import { JobForm, jobFormSchema } from "@types"
import { useEffect, useState } from "react"
import { CountryDropdown, RegionDropdown } from "react-country-region-selector"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { SyncLoader } from "react-spinners"

export const JobPostingPage: React.FC = () => {
  const { control, register, handleSubmit, watch, formState: { errors }, setValue } = useForm<JobForm>({
    resolver: zodResolver(jobFormSchema)
  })
  const { jobContent, isCreatingJob, createJob } = useJob()
  const [foundValue, setFoundValue] = useState<{ name: string, image: string } | null>(null)

  useEffect(() => {
    titleChanger(`Create Job`)
  }, [])

  useEffect(() => {
    handleSearch()
    if (watch("companyName").length === 0) {
      setFoundValue(null)
      setValue("companyImg", null)
    } else {
      setValue("companyImg", DEFAULT_EXPERIENCE_PIC)
    }
  }, [watch("companyName")])


  const onSubmit: SubmitHandler<JobForm> = (e) => {
    console.log(e, jobContent)
    const formData = {
      title: e.title,
      company: {
        companyName: e.companyName,
        companyImg: e.companyImg === DEFAULT_EXPERIENCE_PIC ? null : e.companyImg,
      },
      industry: e.industry,
      jobContent,
      employmentType: e.employmentType,
      country: e.country,
      region: e.region
    }
    createJob(formData)
  }

  function handleSearch() {
    const foundCompany = companies.find((item) => item.name.toLowerCase() === watch("companyName").toLowerCase())
    if (foundCompany) {
      setFoundValue(foundCompany)
    }
  }

  const handleClick = () => {
    if (foundValue) {
      setValue("companyName", foundValue.name || "");
      setValue("companyImg", foundValue.image || DEFAULT_EXPERIENCE_PIC);
      setFoundValue(null)
    }
  }

  return <section className="pt-20 pb-12 mx-auto w-full lg:max-w-[70%] xl:max-w-[55%] max-w-[98%]">
    <div className="w-full bg-white rounded-lg border-[1px] border-gray-300 pb-3">
      <div className="p-3 border-b-[1px]">
        <h1 className="text-[20px]">Review job description</h1>
      </div>
      <div className="p-3 px-9 flex gap-2 flex-col">
        <p className="text-[#666] text-[13px]">* Indicates required</p>
        <h1 className="text-[20px]">Job details *</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-3 px-10">
          <EditInput label="Job Title*" type="text" name="title" register={register} errors={errors} />
          <div className="relative">
            {watch("companyImg") !== null && <img src={watch("companyImg")} className="w-4 absolute top-1/2 left-3" alt="Company Img" />}
            <EditInput label="Company Name*" className={`${watch("companyImg") !== null ? "px-9" : ""}`} type="text" name="companyName" register={register} errors={errors} />
            {foundValue !== null &&
              <div onClick={handleClick} className="absolute items-center hover:bg-gray-100 cursor-pointer -bottom-[3.4rem] bg-white w-full border-[1px] rounded-b-lg p-2 flex gap-4">
                <img src={foundValue?.image} alt="Found Company" className="w-10 h-10" />
                <h2>{foundValue.name}</h2>
              </div>
            }
          </div>
          <EditInput label="Work Type*" type="text" name="employmentType" register={register} errors={errors} />
          <EditInput label="Industry*" type="text" name="industry" register={register} errors={errors} />
          <div className="flex flex-col gap-1">
            <label htmlFor="country" className="text-[#666] text-[13px]">Country*</label>
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <CountryDropdown
                  {...field}
                  value={field.value}
                  onChange={(val) => field.onChange(val)}
                  onBlur={() => {
                    field.onBlur();
                    return null;
                  }}
                  className="border-[1px] group-hover:outline-1 outline outline-0 border-black rounded-sm py-1 px-2 text-[14px]"
                />
              )}
            />
            <p className="text-red-400 text-[13px]">{errors["country"]?.message}</p>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="region" className="text-[#666] text-[13px]">Region*</label>
            <Controller
              name="region"
              control={control}
              render={({ field }) => (
                <RegionDropdown
                  {...field}
                  country={watch("country")}
                  value={field.value}
                  onChange={(val) => field.onChange(val)}
                  onBlur={() => {
                    field.onBlur();
                    return null;
                  }}
                  className="border-[1px] group-hover:outline-1 outline outline-0 border-black rounded-sm py-1 px-2 text-[14px]"
                />
              )}
            />

            <p className="text-red-400 text-[13px]">{errors["region"]?.message}</p>
          </div>
        </div>
        <div className="mt-5 px-10">
          <h1 className="font-semibold text-[20px]">Description *</h1>
          <JobContentEditor />
        </div>
        <div className="border-t-[1px] flex p-2 pt-4 justify-end px-10 mt-4">
          <button type="submit" disabled={isCreatingJob || jobContent.length > 0} className={`text-white bg-[#0A66C2] py-2 px-4 hover:bg-blue-700 transition-all duration-200 rounded-full ${jobContent.length > 0 ? "bg-[#0A66C2] text-white" : "bg-[#E8E8E8] opacity-70"}`}> {isCreatingJob ? <SyncLoader color="white" size={10} /> : "Upload"}</button>
        </div>
      </form>
    </div>
  </section>
}
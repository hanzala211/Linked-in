import { DEFAULT_EXPERIENCE_PIC } from "@assets";
import { EditButton, EditFooter, EditHead, EditInput } from "@components"
import { useAuth, useProfile } from "@context";
import { overFlowHidder } from "@helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditForm, editFormSchema } from "@types";
import { useEffect } from "react";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";


export const EditProfile: React.FC = () => {
  const { control, register, handleSubmit, watch, formState: { errors }, reset } = useForm<EditForm>({
    resolver: zodResolver(editFormSchema)
  })
  const { isEditingProfile, setIsEditingProfile, isAddingExperience, isAddingEducation, editProfile, experienceFormData, setExperienceFormData, educationFormData, setEducationFormData, handleDeleteEducation, handleDeleteExperience, handleEducation, handlePosition } = useProfile()
  const { userData } = useAuth()

  useEffect(() => {
    if (userData) {
      reset((prevData) => ({
        firstName: userData.firstName ?? prevData.firstName ?? "",
        lastName: userData.lastName ?? prevData.lastName ?? "",
        headline: userData.headline ?? prevData.headline ?? "",
        industry: userData.industry ?? prevData.industry ?? "",
        country: userData.country ?? prevData.country ?? "",
        region: userData.region ?? prevData.region ?? "",
      }));
      setExperienceFormData(userData?.experience || [])
      setEducationFormData(userData?.education || [])
    }
  }, [userData, reset])

  useEffect(() => {
    overFlowHidder(isEditingProfile || isAddingExperience || isAddingEducation)
  }, [isEditingProfile, isAddingExperience, isAddingEducation])

  const onSubmit: SubmitHandler<EditForm> = (value) => {
    const formData = {
      firstName: value.firstName,
      lastName: value.lastName,
      headline: value.headline,
      industry: value.industry,
      country: value.country,
      region: value.region,
      experience: experienceFormData,
      education: educationFormData
    }
    editProfile(formData)
    reset()
  }

  const handleClose = () => {
    setIsEditingProfile(false)
    setExperienceFormData(userData?.experience || [])
    setEducationFormData(userData?.education || [])
    reset()
  }

  return <>
    <div onClick={handleClose} className={`transition-all duration-200 overlay z-20 ${isEditingProfile ? "opacity-100" : "opacity-0 pointer-events-none"}`}></div>
    <div className={`fixed ${isEditingProfile ? "opacity-100" : "opacity-0 pointer-events-none"} transition-all duration-200 inset-0 rounded-t-lg bg-white z-50 w-full flex flex-col justify-between xl:max-w-[40%] md:max-w-[70%] max-w-full left-1/2 shadow shadow-slate-200 -translate-x-1/2 h-full max-h-[85%] top-[5%]`}>

      <EditHead heading="Edit Intro" handleClose={handleClose} />

      <form className="h-full flex flex-col bg-white w-full" onSubmit={handleSubmit(onSubmit)}>

        <div className="flex flex-col gap-4 py-4 px-6 flex-1 overflow-y-auto">
          <p className="text-[12px] text-[#666]">* Indicates required</p>

          <EditInput errors={errors} type="text" register={register} label="First Name*" name="firstName" />
          <EditInput errors={errors} type="text" register={register} label="Last Name*" name="lastName" />

          <div className="flex flex-col gap-1">
            <label htmlFor="headline" className="text-[#666] text-[13px]">Headline*</label>
            <textarea {...register("headline")} id="headline" className="border-[1px] outline-none border-black rounded-sm py-1 px-2 text-[14px]" />
            <p className="text-red-400 text-[13px]">{errors["headline"]?.message}</p>
          </div>
          {experienceFormData?.map((item, index) => (
            <span key={index} className="border-[1px] border-black p-2 rounded-lg flex items-center justify-between gap-2">
              <div onClick={() => handlePosition(index)} className="flex cursor-pointer items-center gap-2">
                <img src={item.companyImg || DEFAULT_EXPERIENCE_PIC} alt="Company Img" className="w-5" />
                <p>{item.companyName}</p>
              </div>
              <button type="button" onClick={() => handleDeleteExperience(index)} className="text-[22px]"><IoClose /></button>
            </span>
          ))}
          <EditButton heading="Current position" btnText="Add new position" onClick={() => handlePosition(-1)} type="button" />
          <EditInput errors={errors} label="Industry*" register={register} name="industry" type="text" />
          {educationFormData?.map((item, index) => (
            <span key={index} className="border-[1px] border-black p-2 rounded-lg flex items-center justify-between gap-2">
              <div onClick={() => handleEducation(index)} className="flex items-center cursor-pointer gap-2">
                <img src={item.schoolImg || DEFAULT_EXPERIENCE_PIC} alt="School Img" className="w-5" />
                <p>{item.schoolName}</p>
              </div>
              <button type="button" onClick={() => handleDeleteEducation(index)} className="text-[22px]"><IoClose /></button>
            </span>
          ))}
          <EditButton heading="Education" btnText="Add new education" onClick={() => handleEducation(-1)} type="button" />

          <h2 className="text-[18px]">Location</h2>
          <div className="flex flex-col gap-1">
            <label htmlFor="country" className="text-[#666] text-[13px]">Country*</label>
            <Controller
              name="country"
              control={control}
              render={({ field: { ref, ...field } }) => (
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
              render={({ field: { ref, ...field } }) => (
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

        <div className="sticky bottom-0 w-full bg-white shadow-md z-10">
          <EditFooter type="submit" />
        </div>
      </form>

    </div >
  </>
}
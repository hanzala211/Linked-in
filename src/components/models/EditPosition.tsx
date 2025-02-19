import { companies, DEFAULT_EXPERIENCE_PIC } from "@assets";
import { EditFooter, EditHead, EditInput, Years } from "@components";
import { useProfile } from "@context";
import { experienceSchema } from "@types";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod"

type ExperienceFormScheema = z.infer<typeof experienceSchema>

export const EditPosition: React.FC = () => {
  const { isAddingExperience, setSelectedForm, selectedForm, setIsAddingExperience, setIsEditingProfile, setExperienceFormData, startYearExperience, setStartYearExperience, endYearExperience, setEndYearExperience } = useProfile();
  const { handleSubmit, register, formState: { errors }, watch, setValue, reset } = useForm<ExperienceFormScheema>();
  const [foundValue, setFoundValue] = useState<{ name: string, image: string } | null>(null)
  const [isPresent, setIsPresent] = useState<boolean>(false)

  useEffect(() => {
    if (selectedForm) {
      reset((prevData) => ({
        companyName: "companyName" in selectedForm ? selectedForm?.companyName : prevData.companyName ?? "",
        companyImg: "companyImg" in selectedForm ? selectedForm?.companyImg : prevData.companyImg ?? "",
        description: selectedForm?.description ?? prevData.description ?? "",
        employmentType: "employmentType" in selectedForm ? selectedForm?.employmentType : prevData.employmentType ?? "",
        startDate: selectedForm?.startDate ?? prevData.startDate ?? "",
        endDate: selectedForm?.endDate ?? prevData.endDate ?? "",
        location: selectedForm?.location ?? prevData.location ?? "",
      }))
    } else {
      reset({
        companyName: "",
        companyImg: null,
        description: "",
        employmentType: "",
        startDate: "",
        endDate: "",
        location: "",
      })
    }
  }, [selectedForm, reset])

  useEffect(() => {
    handleSearch()
    if (watch("companyName").length === 0) {
      setFoundValue(null)
      setValue("companyImg", null)
    } else {
      setValue("companyImg", DEFAULT_EXPERIENCE_PIC)
    }
  }, [watch("companyName")])

  const handleClose = () => {
    setIsAddingExperience(false);
    setTimeout(() => {
      setIsEditingProfile(true)
    }, 300)
    setIsPresent(false)
    reset()
  };

  const onSubmit: SubmitHandler<ExperienceFormScheema> = (data) => {
    const formData = {
      companyName: data.companyName,
      companyImg: data.companyImg,
      description: data.description,
      employmentType: data.employmentType,
      startDate: startYearExperience,
      endDate: isPresent ? "Present" : endYearExperience,
      location: data.location,
    };


    setExperienceFormData((prev) => {
      if (selectedForm && "companyName" in selectedForm) {
        return prev.map((item) =>
          item.companyName === selectedForm.companyName ? formData : item
        );
      } else {
        return [...prev, formData];
      }
    });
    handleClose();
    setStartYearExperience("")
    setEndYearExperience("")
    setSelectedForm(null)
    reset()
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

  return (
    <>
      <div onClick={handleClose} className={`transition-all duration-200 overlay z-20 ${isAddingExperience ? "opacity-100" : "opacity-0 pointer-events-none"}`}></div>
      <div className={`fixed ${isAddingExperience ? "opacity-100" : "opacity-0 pointer-events-none"} transition-all duration-200 inset-0 rounded-lg bg-white z-50 w-full flex flex-col justify-between xl:max-w-[40%] md:max-w-[70%] max-w-[98%] left-1/2 shadow shadow-slate-200 -translate-x-1/2 h-full max-h-[90%] top-[5%]`}>
        <EditHead heading="Add experience" handleClose={handleClose} />
        <form onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col justify-between overflow-y-auto w-full">
          <div className="flex flex-col gap-4 py-4 px-6">
            <p className="text-[12px] text-[#666]">* Indicates required</p>
            <div className="relative">
              {watch("companyImg") !== null && <img src={watch("companyImg")} className="w-4 absolute top-1/2 left-3" alt="Company Img" />}
              <EditInput errors={errors} label="Company name*" register={register} name="companyName" type="text" className={`${watch("companyImg") ? "px-9" : ""}`} />
              {foundValue !== null &&
                <div onClick={handleClick} className="absolute items-center hover:bg-gray-100 cursor-pointer -bottom-[3.4rem] bg-white w-full border-[1px] rounded-b-lg p-2 flex gap-4">
                  <img src={foundValue?.image} alt="Found Company" className="w-10 h-10" />
                  <h2>{foundValue.name}</h2>
                </div>
              }
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="description" className="text-[#666] text-[13px]">Description</label>
              <textarea {...register("description")} id="description" className="border-[1px] outline-none border-black rounded-sm py-1 px-2 text-[14px]" />
            </div>
            <EditInput errors={errors} label="Employment Type*" register={register} name="employmentType" type="text" />
            <div className="flex items-center gap-2">
              <input type="checkbox" id="check" onChange={() => setIsPresent((prev) => !prev)} />
              <label htmlFor="check" className="text-[#666] text-[14px]">I am currently working in this role</label>
            </div>
            <Years label="Start Year*" setSelectYear={setStartYearExperience} isPresent={false} />
            <Years label="End Year*" setSelectYear={setEndYearExperience} isPresent={isPresent} />
            <EditInput errors={errors} label="Location*" register={register} name="location" type="text" />
          </div>
          <div className="sticky bottom-0 w-full bg-white shadow-md z-10">
            <EditFooter type="submit" />
          </div>
        </form>
      </div>
    </>
  );
};
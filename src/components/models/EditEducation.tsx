import { DEFAULT_EXPERIENCE_PIC, universities } from "@assets";
import { EditFooter, EditHead, EditInput, Years } from "@components";
import { useProfile } from "@context";
import { educationSchema } from "@types";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod"

type EducationFormScheema = z.infer<typeof educationSchema>

export const EditEducation: React.FC = () => {
  const { isAddingEducation, setIsAddingEducation, setIsEditingProfile, setEducationFormData, startYearEducation, setStartYearEducation, endYearEducation, setEndYearEducation } = useProfile();
  const { handleSubmit, register, formState: { errors }, watch, setValue, reset } = useForm<EducationFormScheema>();
  const [foundValue, setFoundValue] = useState<{ name: string, image: string } | null>(null)
  const [isPresent, setIsPresent] = useState<boolean>(false)


  useEffect(() => {
    handleSearch()
    if (watch("schoolName").length === 0) {
      setFoundValue(null)
      setValue("schoolImg", null)
    } else {
      setValue("schoolImg", DEFAULT_EXPERIENCE_PIC)
    }
  }, [watch("schoolName")])


  const handleClose = () => {
    setIsAddingEducation(false);
    setTimeout(() => {
      setIsEditingProfile(true)
    }, 300)
    setIsPresent(false)
    reset()
  };

  const onSubmit: SubmitHandler<EducationFormScheema> = (data) => {
    const formData = {
      schoolName: data.schoolName,
      companyImg: data.schoolImg,
      description: data.description,
      grade: data.grade,
      degree: data.degree,
      startDate: startYearEducation,
      endDate: isPresent ? "Present" : endYearEducation,
      location: data.location,
    };
    setEducationFormData((prev) => [...prev, formData]);
    handleClose();
    setStartYearEducation("")
    setEndYearEducation("")
  };

  function handleSearch() {
    const foundCompany = universities.find((item) => item.name.toLowerCase() === watch("schoolName").toLowerCase())
    if (foundCompany) {
      setFoundValue(foundCompany)
    }
  }

  const handleClick = () => {
    if (foundValue) {
      setValue("schoolName", foundValue.name || "");
      setValue("schoolImg", foundValue.image || DEFAULT_EXPERIENCE_PIC);
      setFoundValue(null)
    } else {
      console.warn("No company found!");
    }
  }

  return (
    <>
      <div onClick={handleClose} className={`transition-all duration-200 overlay z-20 ${isAddingEducation ? "opacity-100" : "opacity-0 pointer-events-none"}`}></div>
      <div className={`fixed ${isAddingEducation ? "opacity-100" : "opacity-0 pointer-events-none"} transition-all duration-200 inset-0 rounded-lg bg-white z-50 w-full flex flex-col justify-between xl:max-w-[40%] md:max-w-[70%] max-w-[98%] left-1/2 shadow shadow-slate-200 -translate-x-1/2 h-full max-h-[90%] top-[5%]`}>
        <EditHead heading="Add education" handleClose={handleClose} />
        <form onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col justify-between overflow-y-auto w-full">
          <div className="flex flex-col gap-4 py-4 px-6">
            <p className="text-[12px] text-[#666]">* Indicates required</p>
            <div className="relative">
              {watch("schoolImg") !== null && <img src={watch("schoolImg")} className="w-4 absolute top-1/2 left-3" alt="School Img" />}
              <EditInput errors={errors} label="School name*" register={register} name="schoolName" type="text" className={`${watch("schoolImg") !== null ? "px-9" : ""}`} />
              {foundValue !== null &&
                <div onClick={handleClick} className="absolute items-center hover:bg-gray-100 cursor-pointer -bottom-[3.4rem] bg-white w-full border-[1px] rounded-b-lg p-2 flex gap-4">
                  <img src={foundValue?.image} alt="Found School" className="w-10 h-10" />
                  <h2>{foundValue.name}</h2>
                </div>
              }
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="description" className="text-[#666] text-[13px]">Description</label>
              <textarea {...register("description")} placeholder="Activites" id="description" className="border-[1px] outline-none border-black rounded-sm py-1 px-2 text-[14px]" />
            </div>
            <EditInput
              errors={errors}
              label="Degree*"
              register={register}
              name="degree"
              type="text"
            />
            <EditInput errors={errors} label="Grade*" register={register} name="grade" type="text" />
            <div className="flex items-center gap-2">
              <input type="checkbox" id="check" onChange={() => setIsPresent((prev) => !prev)} />
              <label htmlFor="check" className="text-[#666] text-[14px]">I am currently studying their</label>
            </div>
            <Years label="Start Year*" setSelectYear={setStartYearEducation} isPresent={false} />
            <Years label="End Year*" setSelectYear={setEndYearEducation} isPresent={isPresent} />
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
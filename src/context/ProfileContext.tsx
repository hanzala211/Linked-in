import { useAuth } from "@context";
import { postService, profileService } from "@services";
import { IEducation, IExperience, PostType, ProfileContextTypes } from "@types";
import { createContext, ReactNode, useContext, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { toast } from "sonner";

const ProfileContext = createContext<ProfileContextTypes | undefined>(undefined)

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { setUserData } = useAuth()
  const [isEditingProfile, setIsEditingProfile] = useState<boolean>(false)
  const [isAddingExperience, setIsAddingExperience] = useState<boolean>(false)
  const [isAddingEducation, setIsAddingEducation] = useState<boolean>(false)
  const [isAddingProfile, setIsAddingProfile] = useState<boolean>(false)
  const [isAddingBanner, setIsAddingBanner] = useState<boolean>(false)
  const [selectedBanner, setSelectedBanner] = useState<string[]>([])
  const [selectedProfilePic, setSelectedProfilePic] = useState<string[]>([])
  const [isEditProfileLoading, setIsEditProfileLoading] = useState<boolean>(false)
  const [isUpdatingProfilePic, setIsUpdatingProfilePic] = useState<boolean>(false)
  const [isUpdatingProfileBanner, setIsUpdatingProfileBanner] = useState<boolean>(false)
  const [experienceFormData, setExperienceFormData] = useState<IExperience[]>([])
  const [educationFormData, setEducationFormData] = useState<IEducation[]>([])
  const [startYearExperience, setStartYearExperience] = useState<string>("")
  const [endYearExperience, setEndYearExperience] = useState<string>("")
  const [startYearEducation, setStartYearEducation] = useState<string>("")
  const [endYearEducation, setEndYearEducation] = useState<string>("")
  const [firstPosts, setFirstPosts] = useState<PostType[]>([])
  const [isPostsLoading, setIsPostsLoading] = useState<boolean>(true)

  const editProfile = async (sendData: unknown) => {
    try {
      setIsEditProfileLoading(true)
      const { data } = await profileService.editProfile(sendData);
      console.log(data)
      if (data.status === "Profile Updated Successfully") {
        toast.success(data.status, {
          action: {
            label: <button className="p-1 rounded text-black bg-white hover:bg-gray-200"><RxCross2 className="w-4 h-4" /></button>,
            onClick: () => null,
          },
        });
        setUserData(data.data)
      } else {
        toast.error(data.status, {
          action: {
            label: <button className="p-1 rounded text-black bg-white hover:bg-gray-200"><RxCross2 className="w-4 h-4" /></button>,
            onClick: () => null,
          },
        })
      }
      setIsEditProfileLoading(false)
      setIsEditingProfile(false)
    } catch (error) {
      console.log(error)
    }
  }

  const updateProfilePic = async () => {
    try {
      setIsUpdatingProfilePic(true)
      const formData = new FormData()
      if (selectedProfilePic.length > 0) {
        await Promise.all(selectedProfilePic.map(async (item, index) => {
          const response = await fetch(item)
          const blob = await response.blob()
          formData.append("image", blob, `image${index}.jpg`)
        }))
      }
      const { data } = await profileService.updateProfilePic(formData)
      if (data.status === "Profile Picture Updated Successfully") {
        toast.success(data.status, {
          action: {
            label: <button className="p-1 rounded text-black bg-white hover:bg-gray-200"><RxCross2 className="w-4 h-4" /></button>,
            onClick: () => null,
          },
        });
        setUserData(data.updatedPic)
      } else {
        toast.error(data.status, {
          action: {
            label: <button className="p-1 rounded text-black bg-white hover:bg-gray-200"><RxCross2 className="w-4 h-4" /></button>,
            onClick: () => null,
          },
        })
      }
      setIsUpdatingProfilePic(false)
      setSelectedProfilePic([])
      setIsAddingProfile(false)
    } catch (error) {
      console.log(error)
    }
  }

  const uploadBanner = async () => {
    try {
      setIsUpdatingProfileBanner(true)
      const formData = new FormData()
      if (selectedBanner.length > 0) {
        await Promise.all(selectedBanner.map(async (item, index) => {
          const response = await fetch(item)
          const blob = await response.blob()
          formData.append("image", blob, `image${index}.jpg`)
        }))
      }
      const { data } = await profileService.updateProfileBanner(formData)
      if (data.status === "Profile Banner Updated Successfully") {
        toast.success(data.status, {
          action: {
            label: <button className="p-1 rounded text-black bg-white hover:bg-gray-200"><RxCross2 className="w-4 h-4" /></button>,
            onClick: () => null,
          },
        });
        setUserData(data.updatedPic)
      } else {
        toast.error(data.status, {
          action: {
            label: <button className="p-1 rounded text-black bg-white hover:bg-gray-200"><RxCross2 className="w-4 h-4" /></button>,
            onClick: () => null,
          },
        })
      }
      setIsUpdatingProfileBanner(false)
      setSelectedBanner([])
      setIsAddingBanner(false)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteProfilePic = async () => {
    try {
      const { data } = await profileService.deleteProfilePic();
      if (data.status === "Profile Picture Removed Successfully") {
        toast.success(data.status, {
          action: {
            label: <button className="p-1 rounded text-black bg-white hover:bg-gray-200"><RxCross2 className="w-4 h-4" /></button>,
            onClick: () => null,
          },
        });
        setUserData(data.data)
      } else {
        toast.error(data.status, {
          action: {
            label: <button className="p-1 rounded text-black bg-white hover:bg-gray-200"><RxCross2 className="w-4 h-4" /></button>,
            onClick: () => null,
          },
        })
      }
      setIsAddingProfile(false)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteProfileBanner = async () => {
    try {
      const { data } = await profileService.deleteProfileBanner();
      if (data.status === "Banner Removed Successfully") {
        toast.success(data.status, {
          action: {
            label: <button className="p-1 rounded text-black bg-white hover:bg-gray-200"><RxCross2 className="w-4 h-4" /></button>,
            onClick: () => null,
          },
        });
        setUserData(data.data)
      } else {
        toast.error(data.status, {
          action: {
            label: <button className="p-1 rounded text-black bg-white hover:bg-gray-200"><RxCross2 className="w-4 h-4" /></button>,
            onClick: () => null,
          },
        })
      }
      setIsAddingBanner(false)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDownloadPDF = async (id: string | undefined) => {
    try {
      if (!id) return;

      toast.info("Preparing Profile PDF", {
        action: {
          label: <button className="p-1 rounded text-black bg-white hover:bg-gray-200"><RxCross2 className="w-4 h-4" /></button>,
          onClick: () => null,
        },
      });

      const res = await profileService.downloadPDF(id);

      const blob = new Blob([res.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Resume.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.log(error);
      toast.error("Failed to download PDF");
    }
  };

  const getSixPosts = async (userId: string) => {
    if (firstPosts.length > 0 && firstPosts[0].postBy === userId) return
    try {
      setIsPostsLoading(true)
      const { data } = await postService.getSixPosts(userId)
      if (data.status === "Posts Found") {
        console.log(data)
        setFirstPosts(data.posts)
      }
      setIsPostsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteEducation = (i: number) => {
    setEducationFormData((prev) => prev.filter((_, index) => index !== i))
  }

  const handleDeleteExperience = (i: number) => {
    setExperienceFormData((prev) => prev.filter((_, index) => index !== i))
  }

  const handlePosition = () => {
    setIsEditingProfile(false)
    setTimeout(() => {
      setIsAddingExperience(true)
    }, 300)
  }

  const handleEducation = () => {
    setIsEditingProfile(false)
    setTimeout(() => {
      setIsAddingEducation(true)
    }, 300)
  }


  return <ProfileContext.Provider value={{ isEditingProfile, setIsEditingProfile, isAddingExperience, setIsAddingExperience, isAddingEducation, setIsAddingEducation, isAddingProfile, setIsAddingProfile, isAddingBanner, setIsAddingBanner, selectedBanner, setSelectedBanner, selectedProfilePic, setSelectedProfilePic, editProfile, isEditProfileLoading, setIsEditProfileLoading, updateProfilePic, isUpdatingProfilePic, setIsUpdatingProfilePic, isUpdatingProfileBanner, setIsUpdatingProfileBanner, uploadBanner, deleteProfilePic, deleteProfileBanner, experienceFormData, setExperienceFormData, educationFormData, setEducationFormData, handleDeleteEducation, handleDeleteExperience, handleEducation, handlePosition, startYearEducation, setStartYearEducation, startYearExperience, setStartYearExperience, endYearEducation, setEndYearEducation, endYearExperience, setEndYearExperience, handleDownloadPDF, getSixPosts, firstPosts, setFirstPosts, isPostsLoading }}>{children}</ProfileContext.Provider>
}

export const useProfile = (): ProfileContextTypes => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("use useProfile in it's Provider")
  }
  return context;
}
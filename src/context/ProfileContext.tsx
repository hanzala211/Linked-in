import { useAuth } from "@context";
import { profileService, suggestionsService } from "@services";
import { IEducation, IExperience, IUser, ProfileContextTypes } from "@types";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { toast } from "sonner";

const ProfileContext = createContext<ProfileContextTypes | undefined>(undefined)

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { userData, setUserData } = useAuth()
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
  const [industrySuggestions, setIndustrySuggestions] = useState<IUser[]>([])
  const [suggestions, setSuggestions] = useState<IUser[]>([])
  const [networkSuggestions, setNetworkSuggestions] = useState<IUser[]>([])
  const [isIndustryLoading, setIsIndustryLoading] = useState<boolean>(true)
  const [isSuggestionLoading, setIsSuggestionsLoading] = useState<boolean>(true)
  const [selectedProfile, setSelectedProfile] = useState<IUser | null>(null)

  useEffect(() => {
    if (suggestions.length === 0 && window.innerWidth > 768) {
      randomUsers("3")
    }
    if (networkSuggestions.length === 0) {
      randomUsers("8")
    }
    if (industrySuggestions.length === 0 && userData?.industry) {
      randomIndustryUsers("8")
    } else {
      setIsIndustryLoading(false)
    }
  }, [userData?._id])


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
        toast.error(data.message, {
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

  const randomUsers = async (limit: string) => {
    try {
      setIsSuggestionsLoading(true)
      const { data } = await suggestionsService.randomUsers(limit)
      if (data.status === "Users Found") {
        console.log(data)
        if (limit === "3") {
          setSuggestions(data.data)
        } else {
          setNetworkSuggestions((prev) => [...prev, ...data.data.filter((item: IUser) => !prev.some((suug) => suug._id === item._id)),]);
        }
      }
      setIsSuggestionsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const handleFollow = async (id: string | undefined) => {
    if (!id || !userData) return;
    try {
      const { data } = await profileService.followUser(id)
      if (data.status === "User Followed Successfully") {
        toast.success(data.status, {
          action: {
            label: <button className="p-1 rounded text-black bg-white hover:bg-gray-200"><RxCross2 className="w-4 h-4" /></button>,
            onClick: () => null,
          },
        });
        setSuggestions((prev) =>
          prev.map((item) =>
            item._id === id ? { ...item, followerCount: (item.followerCount || 0) + 1, followers: [...item.followers, userData?._id] } : item
          )
        );
        setSelectedProfile((prev: IUser | null) =>
          prev
            ? {
              ...prev,
              followerCount: prev.followerCount + 1,
              followers: [...prev.followers, userData?._id],
            }
            : null
        );
        setUserData((prev: IUser | null) => prev ? {
          ...prev,
          following: [...prev.following, id],
          followingCount: prev.followingCount + 1
        } : null)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleUnfollow = async (id: string | undefined) => {
    if (!id || !userData) return;
    try {
      const { data } = await profileService.unFollowUser(id)
      if (data.status === "User Unfollowed Successfully") {
        toast.success(data.status, {
          action: {
            label: <button className="p-1 rounded text-black bg-white hover:bg-gray-200"><RxCross2 className="w-4 h-4" /></button>,
            onClick: () => null,
          },
        });
        setSuggestions((prev) =>
          prev.map((item) =>
            item._id === id ? { ...item, followerCount: (item.followerCount || 0) - 1, followers: item.followers.filter((item) => item !== userData._id) } : item
          )
        );
        setSelectedProfile((prev: IUser | null) =>
          prev
            ? {
              ...prev,
              followerCount: prev.followerCount - 1,
              followers: prev.followers.filter((item) => item !== userData?._id),
            }
            : null
        );
        setUserData((prev: IUser | null) => prev ? {
          ...prev,
          following: prev.following.filter((item) => item !== id),
          followingCount: prev.followingCount - 1
        } : null)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const randomIndustryUsers = async (limit: string) => {
    try {
      setIsIndustryLoading(true)
      const { data } = await suggestionsService.randomIndustryUsers(limit)
      if (data.status === "Users Found") {
        console.log(data)
        setIndustrySuggestions((prev) => [...prev, ...data.data.filter((item: IUser) => !prev.some((suug) => suug._id === item._id)),]);
      }
      setIsIndustryLoading(false)
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

  const handleClick = (item: IUser) => {
    setSelectedProfile(item)
  }


  return <ProfileContext.Provider value={{ isEditingProfile, setIsEditingProfile, isAddingExperience, setIsAddingExperience, isAddingEducation, setIsAddingEducation, isAddingProfile, setIsAddingProfile, isAddingBanner, setIsAddingBanner, selectedBanner, setSelectedBanner, selectedProfilePic, setSelectedProfilePic, editProfile, isEditProfileLoading, setIsEditProfileLoading, updateProfilePic, isUpdatingProfilePic, setIsUpdatingProfilePic, isUpdatingProfileBanner, setIsUpdatingProfileBanner, uploadBanner, deleteProfilePic, deleteProfileBanner, experienceFormData, setExperienceFormData, educationFormData, setEducationFormData, handleDeleteEducation, handleDeleteExperience, handleEducation, handlePosition, startYearEducation, setStartYearEducation, startYearExperience, setStartYearExperience, endYearEducation, setEndYearEducation, endYearExperience, setEndYearExperience, handleDownloadPDF, suggestions, setSuggestions, networkSuggestions, setNetworkSuggestions, industrySuggestions, setIndustrySuggestions, isSuggestionLoading, setIsSuggestionsLoading, isIndustryLoading, setIsIndustryLoading, handleFollow, handleUnfollow, handleClick, selectedProfile, setSelectedProfile, randomUsers, randomIndustryUsers }}>{children}</ProfileContext.Provider>
}

export const useProfile = (): ProfileContextTypes => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("use useProfile in it's Provider")
  }
  return context;
}
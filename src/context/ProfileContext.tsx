import { useAuth } from "@context";
import { errorToast, infoToast, successToast } from "@helpers";
import { profileService, suggestionsService } from "@services";
import { IEducation, IExperience, IUser, ProfileContextTypes } from "@types";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

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
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [followData, setFollowData] = useState<IUser[]>([])

  useEffect(() => {
    if (suggestions.length === 0 && window.innerWidth > 768) {
      randomUsers("3")
    }
  }, [userData?._id])

  const editProfile = async (sendData: unknown) => {
    try {
      setIsEditProfileLoading(true)
      const { data } = await profileService.editProfile(sendData);
      console.log(data)
      if (data.status === "Profile Updated Successfully") {
        successToast(data.status)
        setUserData(data.data)
      } else {
        errorToast(data.status)
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
        successToast(data.status)
        setUserData(data.updatedPic)
      } else {
        errorToast(data.status)
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
        successToast(data.status)
        setUserData(data.updatedPic)
      } else {
        errorToast(data.status)
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
        successToast(data.status)
        setUserData(data.data)
      } else {
        errorToast(data.status)
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
        successToast(data.status)
        setUserData(data.data)
      } else {
        errorToast(data.status)
      }
      setIsAddingBanner(false)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDownloadPDF = async (id: string | undefined) => {
    try {
      if (!id) return;

      infoToast("Preparing Profile PDF")

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
      errorToast("Error in Downloading the PDF")
    }
  };

  const randomUsers = async (limit: string) => {
    try {
      const { data } = await suggestionsService.randomUsers(limit)
      if (data.status === "Users Found") {
        console.log(data)
        if (limit === "3") {
          setSuggestions(data.data)
        } else {
          setNetworkSuggestions((prev: IUser[]) => {
            const newPosts: IUser[] = data.data.filter((post: IUser) =>
              !prev.some((existingPost: IUser) => existingPost._id === post._id)
            );

            if (newPosts.length === 0) {
              setHasMore(false);
            }

            return [...prev, ...newPosts];
          });
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
        successToast(data.status)
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
        successToast(data.status)
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
      const { data } = await suggestionsService.randomIndustryUsers(limit)
      if (data.status === "Users Found") {
        console.log(data)
        setIndustrySuggestions((prev: IUser[]) => {
          const newPosts: IUser[] = data.data.filter((post: IUser) =>
            !prev.some((existingPost: IUser) => existingPost._id === post._id)
          );

          if (newPosts.length === 0) {
            setHasMore(false);
          }

          return [...prev, ...newPosts];
        });
      }
      setIsIndustryLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const getFollow = async () => {
    try {
      const { data } = await profileService.getFollow()
      if (data.status === "Users Found") {
        setFollowData(data.users)
      }
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

  const handleRemoveSuggestions = (id: string, isIndustry: boolean) => {
    if (!isIndustry) {
      setNetworkSuggestions((prev) => prev.filter((item) => item._id !== id))
    } else {
      setIndustrySuggestions((prev) => prev.filter((item) => item._id !== id))
    }
  }


  return <ProfileContext.Provider value={{ isEditingProfile, setIsEditingProfile, isAddingExperience, setIsAddingExperience, isAddingEducation, setIsAddingEducation, isAddingProfile, setIsAddingProfile, isAddingBanner, setIsAddingBanner, selectedBanner, setSelectedBanner, selectedProfilePic, setSelectedProfilePic, editProfile, isEditProfileLoading, setIsEditProfileLoading, updateProfilePic, isUpdatingProfilePic, setIsUpdatingProfilePic, isUpdatingProfileBanner, setIsUpdatingProfileBanner, uploadBanner, deleteProfilePic, deleteProfileBanner, experienceFormData, setExperienceFormData, educationFormData, setEducationFormData, handleDeleteEducation, handleDeleteExperience, handleEducation, handlePosition, startYearEducation, setStartYearEducation, startYearExperience, setStartYearExperience, endYearEducation, setEndYearEducation, endYearExperience, setEndYearExperience, handleDownloadPDF, suggestions, setSuggestions, networkSuggestions, setNetworkSuggestions, industrySuggestions, setIndustrySuggestions, isSuggestionLoading, setIsSuggestionsLoading, isIndustryLoading, setIsIndustryLoading, handleFollow, handleUnfollow, handleClick, selectedProfile, setSelectedProfile, randomUsers, randomIndustryUsers, hasMore, setHasMore, handleRemoveSuggestions, getFollow, followData }}>{children}</ProfileContext.Provider>
}

export const useProfile = (): ProfileContextTypes => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("use useProfile in it's Provider")
  }
  return context;
}
import { CompleteComment, PostType } from "@types";
import { IEducation, IExperience, IUser } from "./userTypes";

export interface AuthContextTypes {
    userData: IUser | null,
    setUserData: React.Dispatch<React.SetStateAction<IUser | null>>,
    isLoading: boolean,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    login: (sendData: unknown) => Promise<void>,
    signup: (sendData: unknown) => Promise<void>,
    errorMessage: string,
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
    updateName: (sendData: unknown) => Promise<void>,
    isMainPageLoading: boolean,
    setIsMainPageLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export interface SearchContextTypes {
    isFocused: boolean,
    setIsFocused: React.Dispatch<React.SetStateAction<boolean>>,
    searchValue: string,
    setSearchValue: React.Dispatch<React.SetStateAction<string>>,
    searchData: IUser[],
    setSearchData: React.Dispatch<React.SetStateAction<IUser[]>>,
    handleSearch: (signal: AbortSignal, value: string) => Promise<IUser[]>,
}

export interface PostContextTypes {
    isPostCreatorOpen: boolean,
    setIsPostCreatorOpen: React.Dispatch<React.SetStateAction<boolean>>,
    currentIndex: number,
    setCurrentIndex: React.Dispatch<React.SetStateAction<number>>,
    selectedImage: string[],
    setSelectedImage: React.Dispatch<React.SetStateAction<string[]>>,
    isImageCreatorOpen: boolean,
    setIsImageCreatorOpen: React.Dispatch<React.SetStateAction<boolean>>,
    captionValue: string,
    setCaptionValue: React.Dispatch<React.SetStateAction<string>>,
    createPost: () => void,
    isCreatingLoading: boolean,
    setIsCreatingLoading: React.Dispatch<React.SetStateAction<boolean>>,
    feedPosts: PostType[],
    setFeedPosts: React.Dispatch<React.SetStateAction<PostType[]>>,
    getFeedPosts: () => void,
    likePost: (postId: string) => void,
    disLikePost: (postId: string) => void,
    hasMore: boolean,
    setHasMore: React.Dispatch<React.SetStateAction<boolean>>,
    isFeedPostsLoading: boolean,
    setIsFeedPostsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    getComments: (postId: string, page: unknown) => Promise<CompleteComment>,
    postComment: (postId: string, sendData: unknown) => unknown,
    allPosts: PostType[],
    setAllPosts: React.Dispatch<React.SetStateAction<PostType[]>>,
    getAllPosts: (userId: string) => void,
    isAllPostsLoading: boolean,
    setIsAllPostsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    handleSelectPost: (item: PostType) => void,
    getPost: (postId: string) => void,
    firstPosts: PostType[],
    setFirstPosts: React.Dispatch<React.SetStateAction<PostType[]>>,
    isPostsLoading: boolean,
    getSixPosts: (userId: string) => void,
}

export interface ProfileContextTypes {
    isEditingProfile: boolean,
    setIsEditingProfile: React.Dispatch<React.SetStateAction<boolean>>,
    isAddingExperience: boolean,
    setIsAddingExperience: React.Dispatch<React.SetStateAction<boolean>>,
    isAddingEducation: boolean,
    setIsAddingEducation: React.Dispatch<React.SetStateAction<boolean>>,
    isAddingProfile: boolean,
    setIsAddingProfile: React.Dispatch<React.SetStateAction<boolean>>,
    isAddingBanner: boolean,
    setIsAddingBanner: React.Dispatch<React.SetStateAction<boolean>>,
    selectedBanner: string[],
    setSelectedBanner: React.Dispatch<React.SetStateAction<string[]>>,
    selectedProfilePic: string[],
    setSelectedProfilePic: React.Dispatch<React.SetStateAction<string[]>>,
    editProfile: (sendData: unknown) => void,
    isEditProfileLoading: boolean,
    setIsEditProfileLoading: React.Dispatch<React.SetStateAction<boolean>>,
    updateProfilePic: () => void,
    isUpdatingProfilePic: boolean,
    setIsUpdatingProfilePic: React.Dispatch<React.SetStateAction<boolean>>,
    isUpdatingProfileBanner: boolean,
    setIsUpdatingProfileBanner: React.Dispatch<React.SetStateAction<boolean>>,
    uploadBanner: () => void,
    deleteProfilePic: () => void,
    deleteProfileBanner: () => void,
    experienceFormData: IExperience[],
    setExperienceFormData: React.Dispatch<React.SetStateAction<IExperience[]>>,
    educationFormData: IEducation[],
    setEducationFormData: React.Dispatch<React.SetStateAction<IEducation[]>>,
    handleDeleteEducation: (i: number) => void,
    handleDeleteExperience: (i: number) => void,
    handleEducation: () => void,
    handlePosition: () => void,
    startYearEducation: string,
    setStartYearEducation: React.Dispatch<React.SetStateAction<string>>,
    startYearExperience: string,
    setStartYearExperience: React.Dispatch<React.SetStateAction<string>>,
    endYearEducation: string,
    setEndYearEducation: React.Dispatch<React.SetStateAction<string>>,
    endYearExperience: string,
    setEndYearExperience: React.Dispatch<React.SetStateAction<string>>,
    handleDownloadPDF: (id: string | undefined) => void,
    suggestions: IUser[],
    setSuggestions: React.Dispatch<React.SetStateAction<IUser[]>>,
    networkSuggestions: IUser[],
    setNetworkSuggestions: React.Dispatch<React.SetStateAction<IUser[]>>,
    industrySuggestions: IUser[],
    setIndustrySuggestions: React.Dispatch<React.SetStateAction<IUser[]>>,
    isSuggestionLoading: boolean,
    setIsSuggestionsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    isIndustryLoading: boolean,
    setIsIndustryLoading: React.Dispatch<React.SetStateAction<boolean>>,
    handleFollow: (id: string) => void,
    handleUnfollow: (id: string) => void,
    selectedProfile: IUser | null,
    setSelectedProfile: React.Dispatch<React.SetStateAction<IUser | null>>,
    handleClick: (item: IUser) => void,
    randomUsers: (limit: string) => void,
    randomIndustryUsers: (limit: string) => void,
    hasMore: boolean,
    setHasMore: React.Dispatch<React.SetStateAction<boolean>>,
    handleRemoveSuggestions: (id: string, isIndustry: boolean) => void
}

export interface NetworkContextTypes {
    isSuggestionsModalOpen: boolean,
    setIsSuggestionsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    isIndustryModalOpen: boolean,
    setIsIndustryModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
}
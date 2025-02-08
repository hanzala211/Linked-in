import { useAuth } from "@context";
import { authService, profileService } from "@services";
import { IUser, SearchContextTypes } from "@types";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { toast } from "sonner";

const SearchContext = createContext<SearchContextTypes | undefined>(undefined)

export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { setUserData, userData } = useAuth()
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState<string>("")
  const [searchData, setSearchData] = useState<IUser[]>([])
  const [selectedProfile, setSelectedProfile] = useState<IUser | null>(null)

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (searchValue.length > 3) {
      handleSearch(signal, searchValue);
    } else {
      setSearchData([]);
    }

    return () => controller.abort();
  }, [searchValue]);

  async function handleSearch(signal: AbortSignal, value?: string) {
    try {
      setSearchData([]);
      const { data } = await authService.searchUser(value, signal);

      console.log(data);
      if (data.data.length > 0) {
        setSearchData(data.data);
        return data.data;
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleFollow = async (id: string | undefined) => {
    if (!userData || !id) return;
    try {
      const { data } = await profileService.followUser(id);
      if (data.status === "User Followed Successfully") {
        toast.success(data.status, {
          action: {
            label: <button className="p-1 rounded text-black bg-white hover:bg-gray-200"><RxCross2 className="w-4 h-4" /></button>,
            onClick: () => null,
          },
        });
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
    if (!userData || !id) return;
    try {
      const { data } = await profileService.unFollowUser(id);
      if (data.status === "User Unfollowed Successfully") {
        toast.success(data.status, {
          action: {
            label: <button className="p-1 rounded text-black bg-white hover:bg-gray-200"><RxCross2 className="w-4 h-4" /></button>,
            onClick: () => null,
          },
        });
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

  const handleClick = (item: IUser) => {
    setSelectedProfile(item)
  }

  return <SearchContext.Provider value={{ isFocused, setIsFocused, searchValue, setSearchValue, searchData, setSearchData, selectedProfile, setSelectedProfile, handleClick, handleSearch, handleFollow, handleUnfollow }}>{children}</SearchContext.Provider>
}

export const useSearch = (): SearchContextTypes => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("use useSearch in it's Provider")
  }
  return context;
}
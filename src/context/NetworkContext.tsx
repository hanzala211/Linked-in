import { useAuth } from "@context";
import { profileService, suggestionsService } from "@services";
import { IUser, NetworkContextType } from "@types";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { toast } from "sonner";

const NetworkContext = createContext<NetworkContextType | undefined>(undefined)

export const NetworkProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { userData, setUserData } = useAuth()
  const [suggestions, setSuggestions] = useState<IUser[]>([])
  const [isSuggestionLoading, setIsSuggestionsLoading] = useState<boolean>(true)

  useEffect(() => {
    if (suggestions.length === 0 && window.innerWidth > 768) {
      randomUsers()
    }
  }, [])

  const randomUsers = async () => {
    try {
      const { data } = await suggestionsService.randomUsers("3")
      if (data.status === "Users Found") {
        console.log(data)
        setSuggestions(data.data)
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

  return <NetworkContext.Provider value={{ suggestions, setSuggestions, randomUsers, isSuggestionLoading, setIsSuggestionsLoading, handleFollow, handleUnfollow }}>{children}</NetworkContext.Provider>
}

export const useNetwork = (): NetworkContextType => {
  const context = useContext(NetworkContext);
  if (!context) {
    throw new Error("use useProfile in it's Provider")
  }
  return context;
}
import { authService } from "@services";
import { IUser, SearchContextTypes } from "@types";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

const SearchContext = createContext<SearchContextTypes | undefined>(undefined)

export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
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

  const handleClick = (item: IUser) => {
    setSelectedProfile(item)
  }

  return <SearchContext.Provider value={{ isFocused, setIsFocused, searchValue, setSearchValue, searchData, setSearchData, selectedProfile, setSelectedProfile, handleClick, handleSearch }}>{children}</SearchContext.Provider>
}

export const useSearch = (): SearchContextTypes => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("use useSearch in it's Provider")
  }
  return context;
}
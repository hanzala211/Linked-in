import { authService } from "@services";
import { IUser, JobType, SearchContextTypes } from "@types";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const SearchContext = createContext<SearchContextTypes | undefined>(undefined)

export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState<string>("")
  const [searchData, setSearchData] = useState<IUser[] | JobType[]>([])
  const location = useLocation()

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (searchValue.length > 3 && !location.pathname.includes("/jobs")) {
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

  return <SearchContext.Provider value={{ isFocused, setIsFocused, searchValue, setSearchValue, searchData, setSearchData, handleSearch }}>{children}</SearchContext.Provider>
}

export const useSearch = (): SearchContextTypes => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("use useSearch in it's Provider")
  }
  return context;
}
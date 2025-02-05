import { authService } from "@services";
import { SearchContextTypes, SearchUser } from "@types";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

const SearchContext = createContext<SearchContextTypes | undefined>(undefined)

export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState<string>("")
  const [searchData, setSearchData] = useState<SearchUser[]>([])

  useEffect(() => {
    if (searchValue.length > 3) {
      handleSearch()
    } else {
      setSearchData([])
    }
  }, [searchValue])

  async function handleSearch() {
    try {
      setSearchData([])
      const { data } = await authService.searchUser(searchValue)
      console.log(data)
      if (data.data.length > 0) {
        setSearchData(data.data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return <SearchContext.Provider value={{ isFocused, setIsFocused, searchValue, setSearchValue, searchData, setSearchData }}>{children}</SearchContext.Provider>
}

export const useSearch = (): SearchContextTypes => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("use useSearch in it's Provider")
  }
  return context;
}
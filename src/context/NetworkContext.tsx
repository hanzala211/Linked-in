import { NetworkContextTypes } from "@types";
import { createContext, ReactNode, useContext, useState } from "react";

const NetworkContext = createContext<NetworkContextTypes | undefined>(undefined)

export const NetworkProvider: React.FC<{ children?: ReactNode }> = ({ children }) => {
  const [isSuggestionsModalOpen, setIsSuggestionsModalOpen] = useState<boolean>(false)
  const [isIndustryModalOpen, setIsIndustryModalOpen] = useState<boolean>(false)

  return <NetworkContext.Provider value={{ isSuggestionsModalOpen, setIsSuggestionsModalOpen, isIndustryModalOpen, setIsIndustryModalOpen }}>{children}</NetworkContext.Provider>
}

export const useNetwork = (): NetworkContextTypes => {
  const context = useContext(NetworkContext);
  if (!context) {
    throw new Error("use useAuth in it's Provider")
  }
  return context;
}
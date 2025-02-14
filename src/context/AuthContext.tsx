import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { authService } from "@services";
import { IUser, AuthContextTypes } from "@types";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "@helpers";

const AuthContext = createContext<AuthContextTypes | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [userData, setUserData] = useState<IUser | null>(null)
    const [errorMessage, setErrorMessage] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isMainPageLoading, setIsMainPageLoading] = useState<boolean>(true)
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token && userData === null) {
            me()
        } else {
            setIsMainPageLoading(false)
        }
    }, [])

    const login = async (sendData: unknown) => {
        try {
            setIsMainPageLoading(true)
            setIsLoading(true)
            setErrorMessage("")
            const { data } = await authService.login(sendData)
            console.log(data)
            if (data?.status === "Success") {
                localStorage.setItem("token", data.token)
                setUserData(data.user)
                navigate(`/feed`)
            } else if (data !== undefined) {
                setErrorMessage(data?.message)
            } else {
                setErrorMessage("Server Error")
            }
        } catch (error) {
            console.error(error)
            const errorMessage = getErrorMessage(error);
            setErrorMessage(errorMessage);
        } finally {
            setIsLoading(false)
            setIsMainPageLoading(false)
        }
    }

    const signup = async (sendData: unknown) => {
        try {
            setIsLoading(true)
            setErrorMessage("")
            const { data } = await authService.signup(sendData)
            console.log(data)
            if (data.status === "Success") {
                localStorage.setItem("token", data.token)
                setUserData(data.user)
                navigate("/login-step")
            } else if (data !== undefined) {
                setErrorMessage(data?.message)
            } else {
                setErrorMessage("Server Error")
            }
        } catch (error) {
            console.error(error)
            const errorMessage = getErrorMessage(error);
            setErrorMessage(errorMessage);
        } finally {
            setIsLoading(false)
        }
    }

    const updateName = async (sendData: unknown) => {
        try {
            setIsLoading(true)
            setErrorMessage("")
            setIsMainPageLoading(true)
            const { data } = await authService.updateName(sendData)
            console.log(data)
            if (data.status === "Success") {
                setUserData(data.user)
                navigate(`/feed`)
            } else if (data !== undefined) {
                setErrorMessage(data?.status)
            } else {
                setErrorMessage("Server Error")
            }
        } catch (error) {
            console.error(error)
            const errorMessage = getErrorMessage(error);
            setErrorMessage(errorMessage);
        } finally {
            setIsLoading(false)
            setIsMainPageLoading(false)
        }
    }

    const me = async () => {
        try {
            setIsMainPageLoading(true)
            const { data } = await authService.me()
            console.log(data)
            if (data?.status === "Success") {
                setUserData(data.user)
            } else {
                navigate("/login")
                localStorage.removeItem("token")
            }
        } catch (error) {
            console.error(error)
        } finally {
            setIsMainPageLoading(false)
        }
    }


    return <AuthContext.Provider value={{ userData, setUserData, isLoading, setIsLoading, login, signup, errorMessage, setErrorMessage, updateName, isMainPageLoading, setIsMainPageLoading }}>{children}</AuthContext.Provider>
}

export const useAuth = (): AuthContextTypes => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("use useAuth in it's Provider")
    }
    return context;
}
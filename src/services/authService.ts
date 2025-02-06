import { sendRequest } from "@helpers"

export const authService = {
    login: (data: unknown) => sendRequest({
        method: "POST",
        url: "/auth/login",
        data,
        isAuthIncluded: false
    }),
    signup: (data: unknown) => sendRequest({
        method: "POST",
        url: "/auth/signup",
        data,
        isAuthIncluded: false
    }),
    updateName: (data: unknown) => sendRequest({
        method: "POST",
        url: "/auth/update-name",
        data,
        isAuthIncluded: true
    }),
    me: () => sendRequest({
        method: "GET",
        url: "/auth/me",
        isAuthIncluded: true
    }),
    searchUser: (data?: string, signal?: AbortSignal) => sendRequest({
        method: "GET",
        url: `/auth/search?search=${data}`,
        isAuthIncluded: false,
        signal
    })
}
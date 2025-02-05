import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export const sendRequest = async (configs: AxiosRequestConfig & { isAuthIncluded: boolean }): Promise<AxiosResponse> => {
    try {
        const token = localStorage.getItem("token")
        const headers = {
            ...configs.headers,
        };

        if (configs.isAuthIncluded && token) {
            headers.Authorization = token;
        }

        const requestConfig = {
            baseURL: import.meta.env.VITE_API_URL,
            ...configs,
            headers,
        };

        const response = await axios(requestConfig);
        return response;
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            return error?.response?.data || error.message;
        } else {
            throw new Error(error?.response.data);
        }
    }
};
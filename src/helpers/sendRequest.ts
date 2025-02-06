import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export const sendRequest = async (
    configs: AxiosRequestConfig & { isAuthIncluded: boolean }
): Promise<AxiosResponse> => {
    const token = localStorage.getItem("token");

    const headers = { ...(configs.headers || {}) } as Record<string, string>;

    if (configs.isAuthIncluded && token) {
        headers.Authorization = token;
    }

    const requestConfig: AxiosRequestConfig = {
        baseURL: import.meta.env.VITE_API_URL as string,
        ...configs,
        headers,
    };

    if (configs.signal) {
        requestConfig.signal = configs.signal;
    }

    try {
        const response = await axios(requestConfig);
        return response;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            if (error.code === "ERR_CANCELED") {
                return Promise.reject(error);
            }
            return Promise.reject(error.response?.data || error.message);
        } else {
            return Promise.reject(new Error('An unexpected error occurred'));
        }
    }
};

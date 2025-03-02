import axios, { AxiosRequestConfig, CreateAxiosDefaults } from 'axios';
import { getContext } from '../../utils/getcontext.ts';

const axiosConfig: CreateAxiosDefaults = {
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function errorHandling(error: any) {
    if (error?.response?.data?.errors?.length) {
        return Promise.reject(error.response.data.errors.map((err: { msg: string }) => ({ message: err.msg })));
    }

    if (error?.response?.data) {
        return Promise.reject([
            {
                message: error.response.data.message,
            },
        ]);
    }
    return Promise.reject([
        {
            message: error.message,
        },
    ]);
}

const instance = axios.create(axiosConfig);
const authInstance = axios.create(axiosConfig);

authInstance.interceptors.request.use(
    (axiosRequest) => {
        const context = getContext();
        if (context.token) {
            axiosRequest.headers.Authorization = `Bearer ${context.token}`;
        }
        return axiosRequest;
    },
    (error) => {
        return Promise.reject(error.response.data);
    }
);

export async function request(config: AxiosRequestConfig) {
    return instance
        .request(config)
        .then((response) => response.data)
        .catch(errorHandling);
}

export async function authRequest(config: AxiosRequestConfig) {
    const authConfig: AxiosRequestConfig = {
        ...config,
        baseURL: `${import.meta.env.VITE_API_URL}/auth`,
    };
    return authInstance
        .request(authConfig)
        .then((response) => response.data)
        .catch(errorHandling);
}

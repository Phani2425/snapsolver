/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestHeaders, Method } from 'axios';

// Create an axios instance for more generic API interaction
const axiosInstance = axios.create({});

// Define types for function parameters
interface ApiConnectorParams {
  method: Method;
  body?: Record<string, any> | null;
  header?: AxiosRequestHeaders | undefined;
  params?: Record<string, any> | null;
  code: string;
}

// Function to make a request based on the attributes passed
export const apiConnector = ({ method,code, body, header, params,  }: ApiConnectorParams) => {
  return axiosInstance({
    method,
    url: `${import.meta.env.VITE_API_URL}/auth/google?code=${code}`,
    data: body || null,
    headers: header || undefined, // Set undefined instead of null
    params: params || null,
  });
};

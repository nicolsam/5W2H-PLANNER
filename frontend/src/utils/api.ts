import ResponseType from "@models/Api";
import CompanyType from "@models/Company";
import GoalType from "@models/Goal";
import axios, { AxiosError, AxiosResponse } from "axios";

import getCookie from "./getCookie";

const https = axios.create({
    baseURL: import.meta.env.VITE_API_URL 
})

function ApiResponse(success: boolean, data: CompanyType | GoalType | [], message?: string) {
    
    const response: ResponseType = {
        'success': success,
        'message': message,
        'data': data
    }

    return response;

}

const api = {
    admin: {
        login: async(user: string, password: string) => {
            try {
                const payload = {
                    'name': user,
                    'password': password
                }

                const response: AxiosResponse = await https.post('/admin/login', payload);

                return ApiResponse(true, response.data, response.data.message);

            } catch(error: any) {
                if(error.response) {
                    return ApiResponse(false, [], error.response.data.message); 
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an error
                    console.log('Error', error.message);
                }
            }
        }
    },
    companies: {

        index: async () => {
            try {

                const headers = { 'Authorization': `Bearer ${getCookie('_auth')}` }; // auth header with bearer token

                const response: AxiosResponse = await https.get('/companies', { headers })

                return ApiResponse(true, response.data.data, response.data.message);

            } catch(error: any) {
                if(error.response) {
                    return ApiResponse(false, [], error.response.data.message); 
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an error
                    console.log('Error', error.message);
                }
            }
        },
        show: async (id: number) => {
            try {

                const headers = { 'Authorization': `Bearer ${getCookie('_auth')}` }; // auth header with bearer token
                
                const response: AxiosResponse = await https.get(`/companies/${id}`, { headers })
                
                return ApiResponse(true, response.data.data, response.data.message);

            } catch(error: any) {
                if(error.response) {
                    return ApiResponse(false, [], error.response.data.message); 
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an error
                    console.log('Error', error.message);
                }
            }
        },
        store: async (name: string, cnpj: string, password: string) => {
            try {

                const headers = { 'Authorization': `Bearer ${getCookie('_auth')}` }; // auth header with bearer token
                
                const payload = {
                    'name': name,
                    'cnpj': cnpj,
                    'password': password
                }
                const response: AxiosResponse = await https.post('/companies', payload, { headers })
                
                return ApiResponse(true, response.data.data, response.data.message);

            } catch(error: any) {
                if(error.response) {
                    return ApiResponse(false, [], error.response.data.message); 
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an error
                    console.log('Error', error.message);
                }
            }
        },
        update: async (company_id: string | number, name: string, cnpj: string, password: string): Promise<ResponseType | undefined> => {
            try {

                const headers = { 'Authorization': `Bearer ${getCookie('_auth')}` }; // auth header with bearer token
                
                const payload = {
                    'name': name,
                    'cnpj': cnpj,
                    'password': password
                }
                
                const response: AxiosResponse = await https.patch(`/companies/${company_id}`, payload, { headers })
                
                return ApiResponse(true, response.data.data, response.data.message);

            } catch(error: any) {
                if(error.response) {
                    return ApiResponse(false, [], error.response.data.message); 
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an error
                    console.log('Error', error.message);
                }
            }
        },
        delete: async (company_id: number) => {
            try {

                const headers = { 'Authorization': `Bearer ${getCookie('_auth')}` }; // auth header with bearer token
                
                const response: AxiosResponse = await https.delete(`/companies/${company_id}`, { headers })
                
                return ApiResponse(true, response.data.data, response.data.message);

            } catch(error: any) {
                if(error.response) {
                    return ApiResponse(false, [], error.response.data.message); 
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an error
                    console.log('Error', error.message);
                }
            }
        },

    }
}

export default api;
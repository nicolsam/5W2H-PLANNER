import ResponseType from "@models/Api";
import CompanyType from "@models/Company";
import GoalType from "@models/Goal";
import axios, { AxiosError, AxiosResponse } from "axios";

import ActionAttributes from "@models/Action";
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
        
        login: async(cnpj: string, password: string) => {
            try {
                const payload = {
                    'cnpj': cnpj,
                    'password': password
                }

                const response: AxiosResponse = await https.post('/company/login', payload);

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
        },
        index: async () => {
            try {

                const headers = { 'Authorization': `Bearer ${getCookie('_auth')}` }; // auth header with bearer token
                console.log(getCookie('_auth'))
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
        
        goals: async (company_id: number) => {
            try {

                const headers = { 'Authorization': `Bearer ${getCookie('_auth')}` }; // auth header with bearer token
                
                const response: AxiosResponse = await https.get(`/companies/${company_id}/goals`, { headers })
                
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

        responsibles: async (company_id: number) => {
            try {

                const headers = { 'Authorization': `Bearer ${getCookie('_auth')}` }; // auth header with bearer token
                
                const response: AxiosResponse = await https.get(`/companies/${company_id}/responsibles`, { headers })
                
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
    },

    goals: {
        
        show: async (id: number) => {
            try {

                const headers = { 'Authorization': `Bearer ${getCookie('_auth')}` }; // auth header with bearer token
                
                const response: AxiosResponse = await https.get(`/goals/${id}`, { headers })
                
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
        
        store: async (company_id: number, name: string, area: string) => {
            try {

                const headers = { 'Authorization': `Bearer ${getCookie('_auth')}` }; // auth header with bearer token
                
                const payload = {
                    "company_id": company_id,
                    "name": name,
                    "area": area,
                }
                const response: AxiosResponse = await https.post('/goals', payload, { headers })
                
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
        update: async (goal_id: string | number, company_id: number, name: string, area: string): Promise<ResponseType | undefined> => {
            try {

                const headers = { 'Authorization': `Bearer ${getCookie('_auth')}` }; // auth header with bearer token
                
                const payload = {
                    'company_id': company_id,
                    'name': name,
                    'area': area,
                }
                
                const response: AxiosResponse = await https.patch(`/goals/${goal_id}`, payload, { headers })
                
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
        delete: async (goal_id: number) => {
            try {

                const headers = { 'Authorization': `Bearer ${getCookie('_auth')}` }; // auth header with bearer token
                
                const response: AxiosResponse = await https.delete(`/goals/${goal_id}`, { headers })
                
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
        
        actions: async (id: number) => {
            try {

                const headers = { 'Authorization': `Bearer ${getCookie('_auth')}` }; // auth header with bearer token
                
                const response: AxiosResponse = await https.get(`/goals/${id}/actions`, { headers })
                
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
    },

    actions: {
        
        show: async (id: number) => {
            try {

                const headers = { 'Authorization': `Bearer ${getCookie('_auth')}` }; // auth header with bearer token
                
                const response: AxiosResponse = await https.get(`/actions/${id}`, { headers })
                
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
        
        store: async (company_id: number, goal_id: number, data: any) => {
            try {

                const headers = { 'Authorization': `Bearer ${getCookie('_auth')}` }; // auth header with bearer token
                
                const start_at = data.start_at.$d;
                const end_at =  data.end_at.$d;
                
                const payload = {
                    "goal_id": goal_id,
                    "company_id": company_id,
                    "name": data.name,
                    "area": data.area,
                    "value": data.value,
                    "value_status": data.value_status,
                    "status": data.status,
                    "start_at": start_at.toISOString().split('T')[0],
                    "end_at": end_at.toISOString().split('T')[0],
                    "responsible_id": data.responsibles,
                    "how": data.how,
                    "what": data.what,
                    "priority": data.priority,
                    "observation": data.observation
                    
                }

                const response: AxiosResponse = await https.post('/actions', payload, { headers })
                
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
        update: async (action_id: number, company_id: number, goal_id: number, data: any): Promise<ResponseType | undefined> => {
            try {

                const headers = { 'Authorization': `Bearer ${getCookie('_auth')}` }; // auth header with bearer token
                
                const start_at = data.start_at.$d;
                const end_at =  data.end_at.$d;
                
                const payload = {
                    "goal_id": goal_id,
                    "company_id": company_id,
                    "name": data.name,
                    "area": data.area,
                    "value": data.value,
                    "value_status": data.value_status,
                    "status": data.status,
                    "start_at": start_at.toISOString().split('T')[0],
                    "end_at": end_at.toISOString().split('T')[0],
                    "responsible_id": data.responsibles,
                    "how": data.how,
                    "what": data.what,
                    "priority": data.priority,
                    "observation": data.observation
                    
                }
                
                const response: AxiosResponse = await https.patch(`/actions/${action_id}`, payload, { headers })
                
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
        delete: async (action_id: number) => {
            try {

                const headers = { 'Authorization': `Bearer ${getCookie('_auth')}` }; // auth header with bearer token
                
                const response: AxiosResponse = await https.delete(`/actions/${action_id}`, { headers })
                
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
        
        actions: async (id: number) => {
            try {

                const headers = { 'Authorization': `Bearer ${getCookie('_auth')}` }; // auth header with bearer token
                
                const response: AxiosResponse = await https.get(`/goals/${id}/actions`, { headers })
                
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
    },
    responsibles: {
        
        show: async (id: number) => {
            try {

                const headers = { 'Authorization': `Bearer ${getCookie('_auth')}` }; // auth header with bearer token
                
                const response: AxiosResponse = await https.get(`/responsibles/${id}`, { headers })
                
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
        
        store: async (company_id: number, name: string, description: string) => {
            try {

                const headers = { 'Authorization': `Bearer ${getCookie('_auth')}` }; // auth header with bearer token
                
                const payload = {
                    "company_id": company_id,
                    "name": name,
                    "description": description,
                }
                const response: AxiosResponse = await https.post('/responsibles', payload, { headers })
                
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
        update: async (responsible_id: string | number, company_id: number, name: string, description: string): Promise<ResponseType | undefined> => {
            try {

                const headers = { 'Authorization': `Bearer ${getCookie('_auth')}` }; // auth header with bearer token
                
                const payload = {
                    'company_id': company_id,
                    'name': name,
                    'description': description,
                }
                
                const response: AxiosResponse = await https.patch(`/responsibles/${responsible_id}`, payload, { headers })
                
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
        delete: async (responsible_id: number) => {
            try {

                const headers = { 'Authorization': `Bearer ${getCookie('_auth')}` }; // auth header with bearer token
                
                const response: AxiosResponse = await https.delete(`/responsibles/${responsible_id}`, { headers })
                
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
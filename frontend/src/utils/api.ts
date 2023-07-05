import axios, { AxiosResponse } from "axios";

const https = axios.create({
    baseURL: import.meta.env.VITE_API_URL 
})

type Response = {
    success: boolean,
    data: any,
    message?: string
}

function ApiResponse(success: boolean, data:any, message?: string): Response {
    
    const response = {
        'success': success,
        'message': message,
        'data': data
    }

    return response;

}

function getCookie(cname:string) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
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

                if(response.data[0] == 401) {
                    throw new Error(response.data.message);
                }
                
                return ApiResponse(true, response.data, response.data.message);

            } catch(error: any) {
                return ApiResponse(false, [], error.message); 
            }
        }
    },
    companies: {

        index: async () => {
            try {

                const headers = { 'Authorization': `Bearer ${getCookie('_auth')}` }; // auth header with bearer token

                const response: AxiosResponse = await https.get('/companies', { headers })

                if(response.data[0] == 401) {
                    throw new Error(response.data.message);
                }
                
                return ApiResponse(true, response.data.data, response.data.message);

            } catch(error: any) {
                return ApiResponse(false, [], error.message); 
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

                if(response.data[0] == 401) {
                    throw new Error(response.data.message);
                }
                
                return ApiResponse(true, response.data.data, response.data.message);

            } catch(error: any) {
                return ApiResponse(false, [], error.message); 
            }
        }


    }
}

export default api;
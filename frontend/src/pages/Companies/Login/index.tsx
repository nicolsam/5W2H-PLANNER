
import { GlobalContext } from '@contexts/Context';
import { useContext } from 'react';

import { useSignIn } from 'react-auth-kit';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { IMaskInput } from 'react-imask';

import { toast } from 'react-toastify';

import HttpsIcon from '@mui/icons-material/Https';
import CompanyCnpj from '@icons/company-cnpj.svg';

import { Button, InputAdornment, Stack, TextField } from "@mui/material";

import api from "@utils/api";

type LoginFormValues = {
    cnpj: string,
    password: string
}

const CompanyLogin = () => {

    const { setCompany, setIsCompanyAccess } = useContext(GlobalContext);

    
    const navigate = useNavigate();
    const signIn = useSignIn(); 

    const form = useForm<LoginFormValues>({
        defaultValues: {
            cnpj: "",
            password: ""
        }
    })

    const { register, handleSubmit, formState } = form
    const { errors } = formState;

    const onSubmit = async (data: LoginFormValues) => {
        try {
            const response = await api.companies.login(data.cnpj, data.password);

            if(response.success === false) {
                throw new Error(response.message)
            }
            
            setCompany({
                id: response?.data.company.id,
                attributes: {
                    name: response?.data.company.name,
                    cnpj: response?.data.company.cnpj,
                    created_at: response?.data.company.created_at,
                    updated_at: response?.data.company.updated_at
                }
            });

            signIn({
                token: response.data.token,
                expiresIn: 3600,
                tokenType: "Bearer",
                authState: { 
                    company: response.data.company.name
                }
            })

            setIsCompanyAccess(true);

            toast('Logado com sucesso', {
                type: 'success',
                isLoading: false,
                autoClose: 3000,
                closeButton: true,
            });

            navigate('/dashboard');

        } catch(error:any) {
            toast(error.message);
        }
    }

    return (
        <div className="w-full h-screen flex flex-col gap-2 justify-center items-center">
            <form 
                method="POST"
                className="bg-main-color min-h-fit w-4/5 sm:w-2/3 lg:w-1/2 xl:w-1/3 px-7 py-10 2xl:px-10 2xl:py-24 rounded" 
                onSubmit={handleSubmit(onSubmit)} 
            >
                <Stack spacing={3} direction={"column"}>

                    <div>
                        <h1 className="text-white mb-1 text-4xl font-bold">Olá!</h1>
                        <p className="text-white text-2xl">Insira seu CNPJ e senha.</p>
                    </div>

                    <Stack spacing={2} direction={"column"} className="h-fit">
                        <TextField 
                            id="formatted-cnpj-input"
                            label="CNPJ"
                            variant="filled"
                            {...register('cnpj', {
                                required: 'O campo CNPJ é obrigatório.',
                            })}
                            error={!!errors.cnpj}
                            helperText={errors.cnpj?.message}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <img src={CompanyCnpj} alt="CNPJ" />
                                    </InputAdornment>
                                ),
                                inputComponent: IMaskInput,
                                inputProps: {
                                    mask: '00.000.000/0000-00'
                                }
                            }}
                            sx={{
                                backgroundColor: '#ffffff',
                            }}

                        />
                        
                        <TextField 
                            id="password-login" 
                            className="rounded text-xl"
                            type="password"
                            {...register("password", {
                                required: "Senha é obrigatório."
                            })}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                            label="Senha" 
                            variant="filled" 
                            color="primary" 
                            InputProps={{
                            startAdornment: (
                                    <InputAdornment position="start">
                                        <HttpsIcon />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                backgroundColor: '#F4F4F4',
                            }}
                        />
                        <Button type="submit" variant="action" size="large" disableElevation>
                            <span className="text-2xl p-1">Login</span>
                        </Button>
                    </Stack>
                </Stack>

                
            </form>

            <div>
                v{import.meta.env.VITE_APP_VERSION}
            </div>  
        </div>
    );
}

export default CompanyLogin;
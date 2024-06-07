
import { GlobalContext } from '@contexts/Context';
import { useContext } from 'react';

import { useSignIn } from 'react-auth-kit';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import useShowPassword from "@hooks/useShowPassword";

import { IMaskInput } from 'react-imask';

import { toast } from 'react-toastify';

import CompanyCnpj from '@icons/company-cnpj.svg';
import HttpsIcon from '@mui/icons-material/Https';

import { Button, IconButton, InputAdornment, Stack, TextField } from "@mui/material";

import api from "@utils/api";

type LoginFormValues = {
    cnpj: string,
    password: string
}

const CompanyLogin = () => {

    const { setCompany, setIsCompanyAccess } = useContext(GlobalContext);

    const navigate = useNavigate();
    const signIn = useSignIn(); 
    
    const { 
        showPasswordIcon, 
        showPasswordType, 
        handleClickShowPassword 
    } = useShowPassword();

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
            
            const toastSubmit = toast.loading('Logando no sistema. Por favor espere um momento.');

            const response = await api.companies.login(data.cnpj, data.password);

            if(response?.success === false) {
                toast.update(toastSubmit, {
                    render: 'Não foi possível fazer login. Seu usuário ou senha estão incorretos.',
                    type: 'error',
                    isLoading: false,
                    autoClose: 3000,
                    closeButton: true,
                })
                throw new Error(response.message)
            } else {
                
                setCompany({
                    id: response?.data.company.id,
                    attributes: {
                        name: response?.data.company.name,
                        cnpj: response?.data.company.cnpj,
                        created_at: response?.data.company.created_at,
                        updated_at: response?.data.company.updated_at
                    }
                });

                if(signIn({
                    token: response.data.token,
                    expiresIn: 3600,
                    tokenType: "Bearer",
                    authState: { 
                        company: response.data.company.name
                    }
                })) {

                    setIsCompanyAccess(true);

                    toast.update(toastSubmit, { 
                        render: 'Logado com sucesso',
                        type: 'success',
                        isLoading: false,
                        autoClose: 3000,
                        closeButton: true,
                    });

                    navigate('/dashboard');

                }
            }

        } catch(error:any) {
            console.log(error.message)
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
                            type={showPasswordType}
                            {...register("password", {
                                required: "Senha é obrigatória."
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
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="alterar visibilidade da senha"
                                            onClick={handleClickShowPassword}
                                        >
                                            {showPasswordIcon}
                                        </IconButton>
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
                        
                        <div className="flex justify-center">
                            <Link to="/admin/login">
                                <Button 
                                    variant="secondary" 
                                    disableElevation 
                                    className="my-2 w-fit"
                                >
                                    Logar como administrador
                                </Button>
                            </Link>
                        </div>

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
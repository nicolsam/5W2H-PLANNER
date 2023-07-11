import useShowPassword from "@hooks/useShowPassword";
import { useSignIn } from 'react-auth-kit';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { toast } from 'react-toastify';

import HttpsIcon from '@mui/icons-material/Https';
import PersonIcon from '@mui/icons-material/Person';

import { Button, IconButton, InputAdornment, Stack, TextField } from "@mui/material";

import api from "@utils/api";

type LoginFormValues = {
    user: string,
    password: string
}

const Login = () => {

    const navigate = useNavigate();
    const signIn = useSignIn(); 
    const { 
        showPasswordIcon, 
        showPasswordType, 
        handleClickShowPassword 
    } = useShowPassword();

    const form = useForm<LoginFormValues>({
        defaultValues: {
            user: "",
            password: ""
        }
    })

    const { register, handleSubmit, formState } = form
    const { errors } = formState;

    const onSubmit = async (data: LoginFormValues) => {
        try {
            const response = await api.admin.login(data.user, data.password);

            if(response.success === false) {
                throw new Error(response.message)
            }

            signIn({
                token: response.data.token,
                expiresIn: 3600,
                tokenType: "Bearer",
                authState: { 
                    admin: response.data.admin.name
                }
            })

            toast('Logado com sucesso', {
              type: 'success',
              isLoading: false,
              autoClose: 3000,
              closeButton: true,
            });

            navigate('/companies');

        } catch(error:any) {
            toast(error.message);
        }
    }

    return (
        <div className="w-full h-screen flex flex-col gap-2 justify-center items-center">
            <form 
                method="POST"
                className="bg-main-color w-1/3 h-3/5 px-10 py-24 rounded" 
                onSubmit={handleSubmit(onSubmit)} 
            >
                <Stack spacing={3} direction={"column"}>

                    <div>
                        <h1 className="text-white mb-1 text-4xl font-bold">Login do administrador</h1>
                        <p className="text-white text-2xl">Insira seu usuário e senha.</p>
                    </div>

                    <Stack spacing={2} direction={"column"}>
                        <TextField 
                            id="user-login" 
                            className="rounded"
                            {...register("user", {
                                required: "Usuário é obrigatório."
                            })}
                            error={!!errors.user}
                            helperText={errors.user?.message}
                            label="Usuário" 
                            variant="filled" 
                            color="primary" 
                            InputProps={{
                            startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonIcon />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                backgroundColor: '#F4F4F4',
                            }}
                        />
                        
                        <TextField 
                            id="password-login" 
                            className="rounded text-xl"
                            type={showPasswordType}
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
                        <Button type="submit" variant="contained" size="large" disableElevation>
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

export default Login;
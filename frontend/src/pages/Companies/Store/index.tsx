import useShowPassword from '@hooks/useShowPassword';
import { useForm } from "react-hook-form";
import { IMaskInput } from 'react-imask';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

import { Button, IconButton, InputAdornment, Stack, TextField } from "@mui/material";

import BackButton from '@components/Layout/BackButton';
import Header from "@components/Layout/Header";
import Main from "@components/Layout/Main";

import CompanyCnpj from '@icons/company-cnpj.svg';
import BusinessIcon from '@mui/icons-material/Business';
import HttpsIcon from '@mui/icons-material/Https';

import api from '@utils/api';

type StoreCompanyFormValues = {
    name: string,
    cnpj: string
    password: string,
}

const StoreCompany = () => {
    
    const navigate = useNavigate();
    
    const form = useForm<StoreCompanyFormValues>({
        defaultValues: {
            name: "",
            cnpj: "",
            password: "",
        },
        mode: "onChange",
    })

    const { register, control, handleSubmit, formState } = form
    const { errors } = formState;
    const { showPasswordIcon, showPasswordType, handleClickShowPassword } = useShowPassword();

    const onSubmit = async (data: StoreCompanyFormValues) => {
        try {
            const response = await api.companies.store(data.name, data.cnpj, data.password);

            if(response.success === false) {
                throw new Error(response.message)
            }

            toast('Nova empresa criada com sucesso', {
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
        <Main>
            <Header description="Complete as informações abaixo para cadastrar uma nova empresa.">
                Cadastro de nova empresa
            </Header>

            <BackButton />

            <form
                method="POST"
                className="bg-main-color p-8 rounded relative"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Stack spacing={2} direction={'column'}>

                    <TextField
                        id="company-name"
                        className="rounded"
                        {...register('name', {
                        required: 'O nome da empresa é obrigatório.',
                        })}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        label="Nome da empresa"
                        variant="filled"
                        color="primary"
                        InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <BusinessIcon />
                            </InputAdornment>
                        )
                        }}
                        sx={{
                            backgroundColor: '#ffffff',
                        }}
                    />
                    
                    <TextField 
                        id="formatted-cnpj-input"
                        label="CNPJ"
                        variant="filled"
                        {...register('cnpj', {
                            required: 'CNPJ é obrigatório.',
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
                        {...register('password', {
                        required: 'Senha é obrigatório.',
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

                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            variant="contained"
                            disableElevation
                            className="w-fit"
                        >
                            <span className="text-lg px-5 py-2 uppercase">Criar</span>
                        </Button>
                    </div>
                        
                </Stack>
            </form>
        </Main>
    );
}

export default StoreCompany;
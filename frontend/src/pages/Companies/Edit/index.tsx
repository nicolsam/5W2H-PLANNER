import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { IMaskInput } from 'react-imask';
import { useNavigate, useParams } from 'react-router-dom';

import { toast } from 'react-toastify';

import { Button, InputAdornment, Stack, TextField } from "@mui/material";

import BackButton from '@components/Layout/BackButton';
import Header from "@components/Layout/Header";
import Main from "@components/Layout/Main";
import Loading from '@components/Loading';

import CompanyCnpj from '@icons/company-cnpj.svg';
import BusinessIcon from '@mui/icons-material/Business';
import HttpsIcon from '@mui/icons-material/Https';

import CompanyType from '@models/Company';
import api from '@utils/api';

type EditCompanyFormValues = {
    name: string,
    cnpj: string
    password: string,
}

const EditCompany = () => {
    
    const [company, setCompany] = useState<CompanyType>();

    const navigate = useNavigate();
    const { company_id } = useParams<{company_id: string}>();
    
    const form = useForm<EditCompanyFormValues>({ 
        mode: 'onBlur' 
    });

    const { register, control, handleSubmit, formState, setValue } = form
    const { errors } = formState;

    const onSubmit = async (data: EditCompanyFormValues) => {
        try {
            
            const response = await api.companies.update(company_id, data.name, data.cnpj, data.password);

            if(response?.success === false) {
                throw new Error(response.message)
            }

            toast('Empresa atualizada com sucesso', {
                type: 'success',
                isLoading: false,
                autoClose: 3000,
                closeButton: true,
            });

            navigate('/companies');

        } catch(error: any) {
            toast(error.message);
        }
    }

    const findCompany = async (company_id: string | undefined) => {
        try {

            const response = await api.companies.show(company_id ?? 0);

            const company: CompanyType = response?.data;
            
            setCompany(company);

            setValue('name', company.attributes.name)
            setValue('cnpj', company.attributes.cnpj)

        } catch(error) {

        }
    }

    useEffect(() => {

        findCompany(company_id);
        

    }, [])

    return (
        <Main>
            <Header>
                <>Editando {company?.attributes.name ?? <Loading />}</>
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
                        type="password"
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
                            <span className="text-lg px-5 py-2 uppercase">Editar</span>
                        </Button>
                    </div>
                        
                </Stack>
            </form>
        </Main>
    );
}

export default EditCompany;
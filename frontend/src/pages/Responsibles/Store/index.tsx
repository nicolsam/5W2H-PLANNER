import { GlobalContext } from '@contexts/Context';
import { useContext, useEffect } from 'react';

import { DevTool } from '@hookform/devtools';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

import { Button, InputAdornment, Stack, TextField } from "@mui/material";

import BackButton from '@components/Layout/BackButton';
import Header from "@components/Layout/Header";
import Main from "@components/Layout/Main";

import DescriptionIcon from '@mui/icons-material/Description';
import PersonIcon from '@mui/icons-material/Person';

import api from '@utils/api';

type StoreResponsibleFormValues = {
    name: string,
    description: string
}

const StoreResponsible = () => {
    
    const { company } = useContext(GlobalContext);

    const navigate = useNavigate();
    
    const form = useForm<StoreResponsibleFormValues>({
        defaultValues: {
            name: "",
            description: "",
        },
        mode: "onChange",
    })

    const { register, control, handleSubmit, formState } = form
    const { errors } = formState;

    const onSubmit = async (data: StoreCompanyFormValues) => {
        try {
            const response = await api.responsibles.store(company.id, data.name, data.description);

            if(response.success === false) {
                throw new Error(response.message)
            }

            toast('Novo responsável criada com sucesso', {
                type: 'success',
                isLoading: false,
                autoClose: 3000,
                closeButton: true,
            });

            navigate('/responsibles');

        } catch(error:any) {
            toast(error.message);
        }
    }

    useEffect(() => {
        
        if(company.id == -1) {
            navigate('/companies');
        }

    }, [])
    return (
        <Main>
            <Header description="Complete as informações abaixo para criar um novo responsável">
                Cadastro de novo responsável 
            </Header>

            <BackButton />

            <form
                method="POST"
                className="bg-main-color p-8 rounded relative"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Stack spacing={2} direction={'column'}>

                    <TextField
                        id="responsible-name"
                        className="rounded"
                        {...register('name', {
                        required: 'O nome do responsável é obrigatório.',
                        })}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        label="Responsável"
                        variant="filled"
                        color="primary"
                        InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <PersonIcon />
                            </InputAdornment>
                        )
                        }}
                        sx={{
                            backgroundColor: '#ffffff',
                        }}
                    />
                    
                    <TextField 
                        id="formatted-cnpj-input"
                        label="Descrição"
                        variant="filled"
                        {...register('description', {
                            required: 'Descrição é obrigatório.',
                        })}
                        error={!!errors.description}
                        helperText={errors.description?.message}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <DescriptionIcon />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            backgroundColor: '#ffffff',
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
             <DevTool control={control} />
        </Main>
    );
}

export default StoreResponsible;
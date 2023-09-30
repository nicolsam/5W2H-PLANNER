import { GlobalContext } from '@contexts/Context';
import { useContext } from 'react';

import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from 'react-router-dom';

import { toast } from 'react-toastify';

import { Button, InputAdornment, Stack, TextField } from "@mui/material";

import BackButton from '@components/Layout/BackButton';
import Header from "@components/Layout/Header";
import Main from "@components/Layout/Main";
import Loading from '@components/Loading';

import BusinessIcon from '@mui/icons-material/Business';
import WorkIcon from '@mui/icons-material/Work';

import ResponsibleType from '@models/Responsible';
import api from '@utils/api';

type EditGoalFormValues = {
    name: string,
    description: string,
}

const EditResponsible = () => {
    
    const { company, getCompanyResponsibles } = useContext(GlobalContext);

    const [responsible, setResponsible] = useState<ResponsibleType>();

    const navigate = useNavigate();
    const { responsible_id } = useParams<{responsible_id: any}>();
    
    const form = useForm<EditGoalFormValues>({ 
        mode: 'onBlur' 
    });

    const { register, control, handleSubmit, formState, setValue } = form
    const { errors } = formState;

    const onSubmit = async (data: EditGoalFormValues) => {
        try {
            
            const response = await api.responsibles.update(responsible_id, company.id, data.name, data.description);

            if(response?.success === false) {
                throw new Error(response.message)
            }

            getCompanyResponsibles();

            toast('Responsável atualizado com sucesso', {
                type: 'success',
                isLoading: false,
                autoClose: 3000,
                closeButton: true,
            });

            navigate('/responsibles');

        } catch(error: any) {
            toast(error.message);
        }
    }

    const findGoal = async (responsible_id: number) => {
        try {

            const response = await api.responsibles.show(responsible_id ?? 0);

            const responsible: ResponsibleType = response?.data;
            
            setResponsible(responsible);

            setValue('name', responsible.attributes.name)
            setValue('description', responsible.attributes.description)

        } catch(error) {

        }
    }

    useEffect(() => {
        if(company.id == -1) {
            navigate('/companies');
        }

        findGoal(responsible_id);

    }, [])

    return (
        <Main>
            <Header>
                <>Editando {responsible?.attributes.name ?? <Loading />}</>
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
                        label="Meta"
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
                                    <WorkIcon />
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
                            variant="action"
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

export default EditResponsible;
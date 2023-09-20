import { GlobalContext } from '@contexts/Context';
import { useContext, useEffect, useState } from 'react';

import { useForm } from "react-hook-form";
import { useNavigate, useParams } from 'react-router-dom';

import { toast } from 'react-toastify';

import { Button, Chip, CircularProgress, InputAdornment, Skeleton, Stack, TextField } from "@mui/material";

import BackButton from '@components/Layout/BackButton';
import Header from "@components/Layout/Header";
import Main from "@components/Layout/Main";

import DescriptionIcon from '@mui/icons-material/Description';
import PersonIcon from '@mui/icons-material/Person';

import api from '@utils/api';

import Loading from '@components/Loading';
import ResponsibleType from '@models/Responsible';
import { extractDateAndFormatToBrazil } from '@utils/formatDate';

type ShowResponsibleFormValues = {
    name: string,
    description: string
}

const ShowResponsible = () => {
    
    const { company } = useContext(GlobalContext);

    const [responsible, setResponsible] = useState<ResponsibleType>();

    const navigate = useNavigate();
    const { responsible_id } = useParams<{responsible_id: any}>();
    
    const form = useForm<ShowResponsibleFormValues>({ 
        mode: 'onBlur' 
    });
    
    const { register, control, handleSubmit, formState, setValue } = form
    const { errors } = formState;

    const findResponsible = async (responsible_id: number) => {
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

        findResponsible(responsible_id);

    }, [])

    return (
        <Main>
            <Header>
                <span className="flex flex-row items-center gap-3">Editando {responsible?.attributes.name ?? <CircularProgress color="inherit" size="2rem" />}</span>
            </Header>

            {responsible ? (<Stack spacing={1}>
                <Stack spacing={1} direction={"row"} sx={{ alignItems: 'center' }}>
                    <h2 className="text-2xl"><span className="font-semibold">Cadastrado</span> em</h2>
                    <Chip
                        variant="outlined"
                        label={extractDateAndFormatToBrazil(responsible?.attributes.created_at)}
                        sx={{ width: 'fit-content', fontSize: '1.25rem' }}
                    />
                </Stack>
                <Stack spacing={1} direction={"row"} sx={{ alignItems: 'center' }}>
                    <h2 className="text-2xl"><span className="font-semibold">Última Atualização</span> em</h2>
                    <Chip
                        variant="outlined"
                        label={extractDateAndFormatToBrazil(responsible?.attributes.updated_at)}
                        sx={{ width: 'fit-content', fontSize: '1.25rem' }}
                    />
                </Stack>
            </Stack>) : (
                <Stack spacing={1}>
                    <Skeleton height={30} width={350} />
                    <Skeleton height={30} width={350} />
                </Stack>
            )}

            <BackButton />
            
            <Stack spacing={2} direction={'column'} className="bg-main-color p-8 rounded relative">

                <TextField
                    id="responsible-name"
                    className="rounded"
                    {...register('name')}
                    disabled
                    label="Meta"
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
                    label="Descrição"
                    variant="filled"
                    {...register('description')}
                    disabled
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

            </Stack>
            
        </Main>
    );
}

export default ShowResponsible;
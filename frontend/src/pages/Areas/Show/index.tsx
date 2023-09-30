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
import AreaType from '@models/Area';
import { extractDateAndFormatToBrazil } from '@utils/formatDate';

type ShowAreaFormValues = {
    name: string,
}

const ShowArea = () => {
    
    const { company } = useContext(GlobalContext);

    const [area, setArea] = useState<AreaType>();

    const navigate = useNavigate();
    const { area_id } = useParams<{area_id: any}>();
    
    const form = useForm<ShowAreaFormValues>({ 
        mode: 'onBlur' 
    });
    
    const { register, control, handleSubmit, formState, setValue } = form
    const { errors } = formState;

    const findArea = async (area_id: number) => {
        try {

            const response = await api.areas.show(area_id ?? 0);

            const area: AreaType = response?.data;
            
            setArea(area);

            setValue('name', area.attributes.name)

        } catch(error) {

        }
    }

    useEffect(() => {
        if(company.id == -1) {
            navigate('/companies');
        }

        findArea(area_id);

    }, [])

    return (
        <Main>
            <Header>
                <span className="flex flex-row items-center gap-3">Visualizando {area?.attributes.name ?? <CircularProgress color="inherit" size="2rem" />}</span>
            </Header>

            {area ? (<Stack spacing={1}>
                <Stack spacing={1} direction={"row"} sx={{ alignItems: 'center' }}>
                    <h2 className="text-2xl"><span className="font-semibold">Cadastrado</span> em</h2>
                    <Chip
                        variant="outlined"
                        label={extractDateAndFormatToBrazil(area?.attributes.created_at)}
                        sx={{ width: 'fit-content', fontSize: '1.25rem' }}
                    />
                </Stack>
                <Stack spacing={1} direction={"row"} sx={{ alignItems: 'center' }}>
                    <h2 className="text-2xl"><span className="font-semibold">Última Atualização</span> em</h2>
                    <Chip
                        variant="outlined"
                        label={extractDateAndFormatToBrazil(area?.attributes.updated_at)}
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
                    id="area-name"
                    className="rounded"
                    {...register('name')}
                    disabled
                    label="Área"
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
                
            </Stack>
            
        </Main>
    );
}

export default ShowArea;
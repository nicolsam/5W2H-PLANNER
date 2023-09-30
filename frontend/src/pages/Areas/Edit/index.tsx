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

import ResponseType from '@models/Api';
import AreaType from '@models/Area';
import api from '@utils/api';

type EditAreaFormValues = {
    name: string,
}

const EditArea = () => {
    
    const { company, getCompanyAreas } = useContext(GlobalContext);

    const [area, setArea] = useState<AreaType>();

    const navigate = useNavigate();
    const { area_id } = useParams<{area_id: any}>();
    
    const form = useForm<EditAreaFormValues>({ 
        mode: 'onBlur' 
    });

    const { register, control, handleSubmit, formState, setValue } = form
    const { errors } = formState;

    const onSubmit = async (data: EditAreaFormValues) => {
        try {
            
            const response = await api.areas.update(area_id, company.id, data.name);

            if(response?.success === false) {
                throw new Error(response.message)
            }

            getCompanyAreas();

            toast('Área atualizada com sucesso', {
                type: 'success',
                isLoading: false,
                autoClose: 3000,
                closeButton: true,
            });

            navigate('/areas');

        } catch(error: any) {
            toast(error.message);
        }
    }

    const findArea = async (area_id: number) => {
        try {

            const response: any = await api.areas.show(area_id ?? 0);

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
                <>Editando {area?.attributes.name ?? <Loading />}</>
            </Header>

            <BackButton />
            
            <form
                method="POST"
                className="bg-main-color p-8 rounded relative"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Stack spacing={2} direction={'column'}>

                    <TextField
                        id="area-name"
                        className="rounded"
                        {...register('name', {
                            required: 'O nome da área é obrigatório.',
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

export default EditArea;
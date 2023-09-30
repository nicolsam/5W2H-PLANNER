import { GlobalContext } from '@contexts/Context';
import { useContext, useEffect } from 'react';

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

type StoreAreaFormValues = {
    name: string,
}

const StoreArea = () => {
    
    const { company, getCompanyAreas } = useContext(GlobalContext);

    const navigate = useNavigate();
    
    const form = useForm<StoreAreaFormValues>({
        defaultValues: {
            name: "",
        },
        mode: "onChange",
    })

    const { register, control, handleSubmit, formState } = form
    const { errors } = formState;

    const onSubmit = async (data: StoreAreaFormValues) => {
        try {
            const response = await api.areas.store(company.id, data.name);
            
            if(response?.success === false) {
                throw new Error(response?.message)
            }

            getCompanyAreas();
            
            toast('Nova área cadastrada com sucesso', {
                type: 'success',
                isLoading: false,
                autoClose: 3000,
                closeButton: true,
            });

            navigate('/areas');

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
            <Header description="Complete as informações abaixo para criar uma nova área">
                Cadastro de nova área 
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

export default StoreArea;
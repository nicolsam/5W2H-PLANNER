import { GlobalContext } from '@contexts/Context';
import { useContext, useEffect, useState } from 'react';

import { Controller, useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

import { Box, Button, Chip, FormControl, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, Stack, TextField } from "@mui/material";

import BackButton from '@components/Layout/BackButton';
import Header from "@components/Layout/Header";
import Main from "@components/Layout/Main";

import BusinessIcon from '@mui/icons-material/Business';
import WorkIcon from '@mui/icons-material/Work';

import AreaType from '@models/Area';
import api from '@utils/api';

type StoreCompanyFormValues = {
    name: string,
    area: string
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const StoreGoal = () => {
    
    const { company, contextAreas } = useContext(GlobalContext);

    const navigate = useNavigate();
    
    const form = useForm<StoreCompanyFormValues>({
        defaultValues: {
            name: "",
            area: "",
        },
        mode: "onChange",
    })

    const { register, control, handleSubmit, formState } = form
    const { errors } = formState;

    const onSubmit = async (data: StoreCompanyFormValues) => {
        try {
            const response = await api.goals.store(company.id, data.name, data.area);

            if(response.success === false) {
                throw new Error(response.message)
            }

            toast('Nova meta criada com sucesso', {
                type: 'success',
                isLoading: false,
                autoClose: 3000,
                closeButton: true,
            });

            navigate('/planning');

        } catch(error:any) {
            toast(error.message);
        }
    }

    return (
        <Main>
            <Header description="Complete as informações abaixo para criar uma nova meta">
                Cadastro de nova meta
            </Header>

            <BackButton />

            <form
                method="POST"
                className="bg-main-color p-8 rounded relative"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Stack spacing={2} direction={'column'}>

                    <TextField
                        id="goal-name"
                        className="rounded"
                        {...register('name', {
                        required: 'O nome da meta é obrigatório.',
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
                    
                    <Controller
                        name="area"
                        control={control}
                        rules={{
                            required: 'A área da meta é obrigatória'
                        }}
                        render={({ field: { ref, onBlur, name, ...field }, fieldState }) => (
                            <FormControl
                                className="rounded w-full"
                                variant="filled"
                                sx={{
                                    backgroundColor: '#ffffff',
                                }}
                            >
                                <InputLabel id="area">Área</InputLabel>
                                <Select
                                    labelId="area"
                                    id="area"
                                    label="Área"
                                    {...field}
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <WorkIcon sx={{ color: 'gray', marginRight: '10px' }} />
                                        </InputAdornment>
                                    }
                                >
                                    {contextAreas.length != 0 ? contextAreas.map((area: AreaType) => (
                                        <MenuItem
                                            key={area.id}
                                            value={area.attributes.name}
                                        >
                                            {area.attributes.name}
                                        </MenuItem>
                                    )) : (
                                        <MenuItem disabled>
                                            Não foi encontrada nenhuma área cadastrada
                                        </MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                        )}
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

export default StoreGoal;
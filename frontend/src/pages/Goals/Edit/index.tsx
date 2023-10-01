import { GlobalContext } from '@contexts/Context';
import { useContext } from 'react';

import { useEffect, useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from 'react-router-dom';

import { toast } from 'react-toastify';

import { Alert, AlertTitle, Button, FormControl, InputAdornment, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";

import BackButton from '@components/Layout/BackButton';
import Header from "@components/Layout/Header";
import Main from "@components/Layout/Main";
import Loading from '@components/Loading';

import BusinessIcon from '@mui/icons-material/Business';
import WorkIcon from '@mui/icons-material/Work';

import AreaType from '@models/Area';
import GoalType from '@models/Goal';
import api from '@utils/api';

type EditGoalFormValues = {
    name: string,
    area: string,
}

const EditGoal = () => {
    
    const { company, contextAreas } = useContext(GlobalContext);

    const [goal, setGoal] = useState<GoalType>();

    const navigate = useNavigate();
    const { goal_id } = useParams<{goal_id: any}>();
    
    const form = useForm<EditGoalFormValues>({ 
        defaultValues: {
            name: '',
            area: '',
        },
        mode: 'onBlur' 
    });

    const { register, control, handleSubmit, formState, setValue } = form
    const { errors } = formState;

    const onSubmit = async (data: EditGoalFormValues) => {
        try {
            
            const response = await api.goals.update(goal_id, company.id, data.name, data.area);

            if(response?.success === false) {
                throw new Error(response.message)
            }

            toast('Meta atualizada com sucesso', {
                type: 'success',
                isLoading: false,
                autoClose: 3000,
                closeButton: true,
            });

            navigate('/planning');

        } catch(error: any) {
            toast(error.message);
        }
    }

    const findGoal = async (goal_id: number) => {
        try {

            const response = await api.goals.show(goal_id ?? 0);

            const goal: GoalType = response?.data;
            
            setGoal(goal);

            setValue('name', goal.attributes.name)
            setValue('area', goal.attributes.area)

        } catch(error) {

        }
    }

    useEffect(() => {

        findGoal(goal_id);
        

    }, [])

    return (
        <Main>
            <Header>
                <>Editando {goal?.attributes.name ?? <Loading />}</>
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
                    {contextAreas.find((item) => item.attributes.name === goal?.attributes?.area) === undefined && (
                        <Alert severity="warning">
                            <AlertTitle>A área selecionada não está disponível ou foi removida. Por gentileza, atualize a área desta meta.</AlertTitle>
                        </Alert>
                    )}
                    
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

export default EditGoal;
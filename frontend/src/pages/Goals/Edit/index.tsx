import { GlobalContext } from '@contexts/Context';
import { useContext } from 'react';

import { DevTool } from '@hookform/devtools';
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

import GoalType from '@models/Goal';
import api from '@utils/api';

type EditGoalFormValues = {
    name: string,
    area: string,
}

const EditGoal = () => {
    
    const { company } = useContext(GlobalContext);

    const [goal, setGoal] = useState<GoalType>();

    const navigate = useNavigate();
    const { goal_id } = useParams<{goal_id: any}>();
    
    const form = useForm<EditGoalFormValues>({ 
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
                    
                    <TextField 
                        id="formatted-cnpj-input"
                        label="Área"
                        variant="filled"
                        {...register('area', {
                            required: 'Área é obrigatório.',
                        })}
                        error={!!errors.area}
                        helperText={errors.area?.message}
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

export default EditGoal;
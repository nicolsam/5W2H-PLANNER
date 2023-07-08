import { GlobalContext } from '@contexts/Context';
import { useContext, useEffect, useState } from 'react';

import { DevTool } from '@hookform/devtools';
import useIsCompanySelected from '@hooks/useIsCompanySelected';
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from 'react-router-dom';

import { toast } from 'react-toastify';

import { Box, Button, Chip, FormControl, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, Stack, TextField } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import BackButton from '@components/Layout/BackButton';
import Header from "@components/Layout/Header";
import Main from "@components/Layout/Main";
import Loading from '@components/Loading';

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BusinessIcon from '@mui/icons-material/Business';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import WorkIcon from '@mui/icons-material/Work';

import ActionType, { ActionAttributes } from '@models/Action';
import ResponsibleType from '@models/Responsible';
import api from '@utils/api';
import formatDate, { formatToBrazil } from '@utils/formatDate';
import dayjs from 'dayjs';

type EditActionFormValues = {
    name: string;
    area: string;
    what: string;
    how: string;
    start_at: string;
    end_at: string;
    value: string;
    value_status: 'Solicitar Orçamento' | 'Aguardando Cotação' | 'Orçamento em Apreciação' | 'Aprovado' | 'Não Aprovado' | 'Sem ônus' | 'Não definido';
    responsibles: [],
    status: 'A Iniciar' | 'Em Andamento' | 'Finalizado';
    priority: 'Baixa' | 'Média' | 'Alta';
    observation: string;
    created_at: string;
    updated_at: string;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const ShowAction = () => {
    
    const { company, currentGoal, contextResponsibles } = useContext(GlobalContext);

    const [responsiblesSelect, setResponsiblesSelect] = useState<ResponsibleType[]>([]);
    const [action, setAction] = useState<ActionType>();

    const { action_id } = useParams<{action_id: any}>();

    const navigate = useNavigate();
    const companySelected = useIsCompanySelected();
    
    const form = useForm<EditActionFormValues>({
        defaultValues: {
            name: '',
            area: '',
            what: '',
            how: '',
            start_at: '',
            end_at: '',
            value: '',
            responsibles: [],
            value_status: 'Não definido',
            status: 'A Iniciar',
            priority: 'Baixa',
            observation: '',
            created_at: '',
            updated_at: '',
        },
        mode: "onChange",
    })

    const {
      register,
      control,
      handleSubmit,
      formState,
      setValue,
    } = form;
    const { errors } = formState;

    const onSubmit = async (data: ActionAttributes) => {
        try {
            const response = await api.actions.update(action.id, company.id, currentGoal.id, data);

            if(response.success === false) {
                throw new Error(response.message)
            }

            toast('Ação atualizada com sucesso', {
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
    
    const findAction = async (action_id: number) => {
        try {

            const response = await api.actions.show(action_id ?? 0);

            const action: ActionType = response?.data;
            
            setAction(action);

            let responsibles = []

            action.relationships.responsibles.map((responsible: ResponsibleType) => {
                responsibles.push(
                    responsible.id,
                )
            })

            console.log(formatToBrazil(action.attributes.start_at))

            setValue('name', action.attributes.name)
            setValue('area', action.attributes.area)
            setValue('value', action.attributes.value)
            setValue('value_status', action.attributes.value_status)
            setValue('status', action.attributes.status)
            setValue('priority', action.attributes.priority)
            setValue('responsibles', responsibles)
            setValue('start_at', dayjs(formatToBrazil(action.attributes.start_at)))
            setValue('end_at', dayjs(formatToBrazil(action.attributes.end_at)))
            setValue('how', action.attributes.how, {shouldDirty: true, shouldTouch: true})
            setValue('what', action.attributes.what, {shouldDirty: true, shouldTouch: true})
            setValue('observation', action.attributes.observation, {shouldDirty: true})

        } catch(error) {
            navigate('/planning');
        }
    }
    
    useEffect(() => {
        findAction(action_id)
    }, [])
    
    return (
        <Main>
            <Header>
                <>Visualizando {action?.attributes.name ?? <Loading />}</>
            </Header>

            <BackButton />
            
            <Stack spacing={2} direction={'column'} className="bg-main-color p-8 rounded relative">


                <Stack spacing={1} direction={'column'}>
                    <TextField
                        id="action-name"
                        className="rounded"
                        {...register('name', {
                        required: 'O nome da ação é obrigatório.',
                        })}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        label="Ação"
                        variant="filled"
                        color="primary"
                        disabled
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
                        disabled
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
                </Stack>

                <Stack spacing={1} direction={"column"}>
                    <Stack spacing={1} direction={"row"}>
                        <Controller
                            name="start_at"
                            control={control}
                            rules={{
                                required: 'Previsão de início é obrigatório',
                            }}
                            render={({ field: { ref, onBlur, name, value, ...field }, fieldState }) => (
                                <DatePicker
                                    slotProps={{ textField: {
                                        variant: 'filled',
                                        error: !!fieldState.error,
                                        helperText: fieldState.error?.message
                                    }}}
                                    className="w-1/3"
                                    disabled
                                    value={value}
                                    {...field}
                                    sx={{
                                        backgroundColor: '#ffffff',
                                        color: "#444344",
                                        fill: "#444344",
                                    }}
                                    inputRef={ref}
                                    label="Previsão de início"
                                    renderInput={(inputProps) => (
                                        <TextField
                                            {...inputProps}
                                            InputProps={{
                                                style: { color: '#444344' },
                                                readOnly: true,
                                            }}
                                            variant='filled'
                                            onBlur={onBlur}
                                            name={name}
                                        />
                                    )}
                    
                                />
                            )}
                        />
                        <Controller
                            name="end_at"
                            control={control}
                            rules={{
                                required: 'Previsão de término é obrigatório'
                            }}
                            render={({ field: { ref, onBlur, name, ...field }, fieldState }) => (
                                <DatePicker
                                    slotProps={{ textField: {
                                        variant: 'filled',
                                        error: !!fieldState.error,
                                        helperText: fieldState.error?.message
                                    }}}
                                    className="w-1/3"
                                    disabled
                                    {...field}
                                    sx={{
                                        backgroundColor: '#ffffff',
                                    }}
                                    inputRef={ref}
                                    label="Previsão de término"
                                    renderInput={(inputProps) => (
                                        <TextField
                                            {...inputProps}
                                            variant='standard'
                                            onBlur={onBlur}
                                            name={name}
                                        />
                                    )}
                    
                                />
                            )}
                        />
                        <Controller
                            name="status"
                            control={control}
                            rules={{
                                required: 'O Status da ação é obrigatória'
                            }}
                            defaultValue={action?.attributes.status}
                            render={({ field: { ref, onBlur, name, ...field }, fieldState }) => (
                                <FormControl
                                    className="rounded w-1/3"
                                    disabled
                                    variant="filled"
                                    sx={{
                                        backgroundColor: '#ffffff',
                                    }}
                    
                                >
                                    <InputLabel id="status">Status</InputLabel>
                                    <Select
                                        labelId="status"
                                        id="status"
                                        label="Status"
                                        {...field}
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <CheckCircleIcon sx={{ color: 'gray', marginRight: '10px' }} />
                                            </InputAdornment>
                                        }
                    
                                    >
                                        <MenuItem value="A Iniciar">A Iniciar</MenuItem>
                                        <MenuItem value="Em Andamento">Em Andamento</MenuItem>
                                        <MenuItem value="Finalizado">Finalizado</MenuItem>
                                    </Select>
                                </FormControl>
                            )}
                        />
                    </Stack>
                    
                    <Stack spacing={1} direction={"row"}>
                        <TextField
                            id="value"
                            className="rounded w-1/2"
                            disabled
                            {...register('value', {
                            required: 'O preço da ação é obrigatório.',
                            })}
                            error={!!errors.value}
                            helperText={errors.value?.message}
                            label="Preço"
                            variant="filled"
                            color="primary"
                            InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AttachMoneyIcon />
                                </InputAdornment>
                            )
                            }}
                            sx={{
                                backgroundColor: '#ffffff',
                            }}
                        />
                    
                        <Controller
                            name="value_status"
                            control={control}
                            rules={{
                                required: 'A situação do preço é obrigatória'
                            }}
                            render={({ field: { ref, onBlur, name, ...field }, fieldState }) => (
                                <FormControl
                                    className="rounded w-1/2"
                                    variant="filled"
                                    disabled
                                    sx={{
                                        backgroundColor: '#ffffff',
                                    }}
                    
                                >
                                    <InputLabel id="value_status">Situação</InputLabel>
                                    <Select
                                        labelId="value_status"
                                        id="value_status"
                                        label="Situação"
                                        {...field}
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <LocalOfferIcon sx={{ color: 'gray', marginRight: '10px' }} />
                                            </InputAdornment>
                                        }
                    
                                    >
                                        <MenuItem value="Solicitar Orçamento">Solicitar Orçamento</MenuItem>
                                        <MenuItem value="Aguardando Cotação">Aguardando Cotação</MenuItem>
                                        <MenuItem value="Orçamento em Apreciação">Orçamento em Apreciação</MenuItem>
                                        <MenuItem value="Aprovado">Aprovado</MenuItem>
                                        <MenuItem value="Não Aprovado">Não Aprovado</MenuItem>
                                        <MenuItem value="Sem ônus">Sem Ônus</MenuItem>
                                        <MenuItem value="Não definido" selected autoFocus>Não Definido</MenuItem>
                                    </Select>
                                </FormControl>
                            )}
                        />
                    </Stack>
                </Stack>

                <Stack spacing={1} direction={"column"}>
                    <Controller
                        name="responsibles"
                        control={control}
                        rules={{
                            required: 'O campo de responsável é obrigatório'
                        }}
                        render={({ field: { ref, onBlur, name, ...field }, fieldState }) => (
                            <FormControl
                                className="rounded"
                                variant="filled"
                                disabled
                                sx={{
                                    backgroundColor: '#ffffff',
                                }}
                    
                            >
                                <InputLabel id="responsibles">Responsáveis</InputLabel>
                                <Select
                                    labelId="responsibles"
                                    id="responsibles"
                                    multiple
                                    value={responsiblesSelect}
                                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                    renderValue={(selected: any) => {
                                        return (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt:2 }}>
                                                {selected.map((value: any) => (
                                                    <Chip
                                                        key={value}
                                                        label={contextResponsibles.find((item) => item.id === value)?.attributes.name}
                                                    />
                                                ))}
                                            </Box>
                                        )}}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <PeopleAltIcon sx={{ color: 'gray', marginRight: '10px' }} />
                                        </InputAdornment>
                                    }
                                    MenuProps={{
                                        PaperProps: {
                                            style: {
                                            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                                            },
                                        },
                                    }}
                                    {...field}
                                >
                                    {contextResponsibles.map((responsible: ResponsibleType) => (
                                        <MenuItem
                                            key={responsible.id}
                                            value={responsible.id}
                                        >
                                            {responsible.attributes.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}
                    />
                    <Controller
                        name="priority"
                        control={control}
                        rules={{
                            required: 'A prioridade da ação é obrigatória'
                        }}
                        defaultValue=""
                        render={({ field: { ref, onBlur, name, ...field }, fieldState }) => (
                            <FormControl
                                className="rounded w-1/2"
                                variant="filled"
                                disabled
                                sx={{
                                    backgroundColor: '#ffffff',
                                }}
                            >
                                <InputLabel id="priority">Prioridade</InputLabel>
                                <Select
                                    labelId="priority"
                                    id="priority"
                                    label="Prioridade"
                                    {...field}
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <ErrorIcon sx={{ color: 'gray', marginRight: '10px' }} />
                                        </InputAdornment>
                                    }
                                >
                                    <MenuItem value="Baixa">Baixa</MenuItem>
                                    <MenuItem value="Média">Média</MenuItem>
                                    <MenuItem value="Alta">Alta</MenuItem>
                                </Select>
                            </FormControl>
                        )}
                    />
                </Stack>
                
                <Stack spacing={1} direction={"column"}>
                    <Controller
                        name="what"
                        control={control}
                        rules={{
                            required: 'O campo "O que fazer" é obrigatório.',
                        }}
                        render={({ field: { ref, onBlur, name, ...field }, fieldState }) => (
                            <TextField
                                id="what"
                                className="rounded"
                                disabled
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                                label="O que fazer"
                                variant="filled"
                                color="primary"
                                multiline
                                rows={2}
                                {...field}
                                InputProps={{
                                }}
                                sx={{
                                    backgroundColor: '#ffffff',
                                }}
                            />
                        )}
                    />
                    
                    <Controller
                        name="how"
                        control={control}
                        rules={{
                            required: 'O campo "Como fazer" é obrigatório.',
                        }}
                        render={({ field: { ref, onBlur, name, ...field }, fieldState }) => (
                            <TextField
                                id="how"
                                className="rounded"
                                disabled
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                                label="Como fazer"
                                variant="filled"
                                color="primary"
                                multiline
                                {...field}
                                rows={2}
                                InputProps={{
                                }}
                                sx={{
                                    backgroundColor: '#ffffff',
                                }}
                            />
                        )}
                    />

                    
                </Stack>
                <Controller
                    name="observation"
                    control={control}
                    render={({ field: { ref, onBlur, name, ...field }, fieldState }) => (
                        <TextField
                            id="observations"
                            className="rounded"
                            disabled
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                            label="Observações"
                            variant="filled"
                            color="primary"
                            multiline
                            {...field}
                            rows={2}
                            InputProps={{
                            }}
                            sx={{
                                backgroundColor: '#ffffff',
                            }}
                        />
                    )}
                />
                
            </Stack>
            
            <DevTool control={control} />
        </Main>
    );
}

export default ShowAction;
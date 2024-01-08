import { GlobalContext } from '@contexts/Context';
import { useContext, useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import Header from '@components/Layout/Header';
import Item from '@components/Layout/List/Item';
import Main from '@components/Layout/Main';

import { Alert, AlertTitle, Stack } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import api from "@utils/api";

import { BadgeStatusType } from '@components/Badge/styles';
import BackButton from '@components/Layout/BackButton';
import ListContainer from '@components/Layout/List';
import Loading from '@components/Loading';

import ActionType from '@models/Action';

const Actions = () => {

    const { isAdminAccess, company, currentGoal, setAction } = useContext(GlobalContext)

    const navigate = useNavigate();
    const { goal_id } = useParams<{goal_id: any}>();

    const [actions, setActions] = useState<ActionType[] | null>(null);
    const [userActions, setUserActions] = useState<any>([])
    const [userAccordionActions, setUserAccordionActions] = useState<any>([]);

    const select = (action_id: number) => {

        navigate(`/planning/action/show/${action_id}`)
    }
    
    const selectStage = (action_id: number) => {

        navigate(`/planning/stage/show/${action_id}`)
    }

    const show = async () => {

        let response = await api.goals.actions(goal_id);

        setActions(response.data);
        
        return response;
    }

    const deleteAction = async (action_id: number) => {
        try {
            
            await api.actions.delete(action_id)
        
            toast('Ação deletada com sucesso', {
                type: 'success',
                isLoading: false,
                autoClose: 3000,
                closeButton: true,
            });

            show();

        } catch(error) {
            toast(error.message, {
                type: 'error',
                isLoading: false,
                autoClose: 3000,
                closeButton: true,
            });
        }
        
    }
    
    const deleteStage = async (stage_id: number) => {
        try {
            
            await api.stages.delete(stage_id)
        
            toast('Etapa deletada com sucesso', {
                type: 'success',
                isLoading: false,
                autoClose: 3000,
                closeButton: true,
            });

            show();

        } catch(error) {
            toast(error.message, {
                type: 'error',
                isLoading: false,
                autoClose: 3000,
                closeButton: true,
            });
        }
        
    }

    const editAction = (action_id: number) => {
        navigate(`/planning/action/edit/${action_id}`);
    }
    
    const editStage = (action: ActionType, stage_id: number) => {
        setAction(action);
        navigate(`/planning/stage/edit/${stage_id}`);
    }
    
    const handleAccordionButton = (action: ActionType) => {
        setAction(action);
        navigate('/planning/stage/store');
    }

    useEffect(() => {
        
        if(company.id == -1) {
            navigate('/companies');
        }

        show();

    }, [])
    
    return (
        <Main>
            <Header 
                description='Cadastre, edite e acompanhe as ações desta meta.'
                storeButton={isAdminAccess}
                storeText='Ação'
                redirect='planning/action/store'
            >{currentGoal.attributes.name}</Header>

            <BackButton link="/planning" />

            <ListContainer>
                {actions ? 
                    actions.length > 0 ? actions.map((action: ActionType, index: number) => (
                        <Item 
                            key={index}
                            color="primary"
                            showCount
                            firstBadgeSpacing
                            accordionButton={isAdminAccess}
                            handleAccordionButton={() => handleAccordionButton(action)}
                            click={() => select(action.id)}
                            actions={isAdminAccess ? [
                                    {
                                        name: 'Editar',
                                        ariaLabel: 'editar',
                                        icon: <EditIcon className="text-main-color" />,
                                        click: () => editAction(action.id)
                                    },
                                    {
                                        name: 'Deletar',
                                        ariaLabel: 'deletar',
                                        icon: <DeleteIcon className="text-danger" />,
                                        click: () => deleteAction(action.id)
                                    }
                                ] : [
                                    {
                                        name: 'Editar',
                                        ariaLabel: 'editar',
                                        icon: <EditIcon className="text-main-color" />,
                                        click: () => editAction(action.id)
                                    }
                                ]
                            } 
                            badges={[
                                {
                                    name: 'Etapas',
                                    count: action.count.stages.total
                                },
                                {
                                    name: 'A iniciar',
                                    count: action.count.stages.start,
                                    status: 'uncompleted'
                                },
                                {
                                    name: 'Em desenvolvimento',
                                    count: action.count.stages.developing,
                                    status: 'developing'
                                },
                                {
                                    name: 'Finalizados',
                                    count: action.count.stages.completed,
                                    status: 'completed'
                                },
                                
                            ]}
                            accordions={[
                                {
                                    name: "ETAPAS",
                                    errorMessage: "Nenhuma etapa foi cadastrada",
                                    errorDescription: "Utilize o botão acima para cadastrar sua primeira etapa.",
                                    content: action.relationships.stages.map((stage, index: number) => {
                                        let badgeStatus: BadgeStatusType = 'uncompleted';
                                        if (stage.status === 'Em Andamento') badgeStatus = 'developing'
                                        if (stage.status === 'Finalizado') badgeStatus = 'completed'
                                        return (
                                            <Item 
                                                key={index}
                                                color="secondary"
                                                click={() => selectStage(stage.id)}
                                                actions={isAdminAccess ? [
                                                        {
                                                            name: 'Editar',
                                                            ariaLabel: 'editar',
                                                            icon: <EditIcon className="text-main-color" />,
                                                            click: () => editStage(action, stage.id)
                                                        },
                                                        {
                                                            name: 'Deletar',
                                                            ariaLabel: 'deletar',
                                                            icon: <DeleteIcon className="text-danger" />,
                                                            click: () => deleteStage(stage.id)
                                                        }
                                                    ]: [
                                                        {
                                                            name: 'Editar',
                                                            ariaLabel: 'editar',
                                                            icon: <EditIcon className="text-main-color" />,
                                                            click: () => editStage(action, stage.id)
                                                        }
                                                    ]
                                                }
                                                badges={[
                                                    {
                                                        name: stage.status,
                                                        status: badgeStatus
                                                    }
                                                ]}
                                            >
                                                <span className="ml-2">
                                                    <span className="mr-4">{index + 1}.</span> 
                                                    <span>{stage.name}</span>
                                                </span>
                                            </Item>
                                        )
                                    })
                                }
                            ]} 
                        >
                            {action.attributes.name}
                        </Item>
                    ))   
                    : (
                        <Alert severity="warning">
                            <AlertTitle>Nenhuma ação foi cadastrada</AlertTitle>
                            Utilize o botão acima para cadastrar sua primeira ação.
                        </Alert>

                    )
                    : (
                        <div className="w-full flex justify-center">
                            <Loading color="white" />
                        </div>
                    )
                }
            </ListContainer>
        </Main>
    )
}

export default Actions
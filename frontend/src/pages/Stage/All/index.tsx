import { GlobalContext } from '@contexts/Context';
import { useContext, useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import Header from '@components/Layout/Header';
import Item from '@components/Layout/List/Item';
import Main from '@components/Layout/Main';

import { Alert, AlertTitle } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import api from "@utils/api";

import BackButton from '@components/Layout/BackButton';
import ListContainer from '@components/Layout/List';
import Loading from '@components/Loading';

import { BadgeStatusType } from '@components/Badge/styles';
import StageType from '@models/Stage';

const AllStages = () => {

    const { isAdminAccess, company } = useContext(GlobalContext)

    const navigate = useNavigate();

    const [stages, setStages] = useState<StageType[] | null>(null);

    const select = (action_id: number) => {

        navigate(`/planning/stage/show/${action_id}`)
    }
    
    const show = async () => {

        let response = await api.stages.all();
        console.log(response)
        setStages(response.data);
        
        return response;
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

    const editStage = (stage_id: number) => {
        navigate(`/planning/stage/edit/${stage_id}`);
    }
    
    const handleAccordionButton = (action: ActionType) => {
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
            >Lista de etapas cadastradas</Header>

            <BackButton link="/dashboard" />

            <ListContainer>
                {stages ? 
                    stages.length > 0 ? stages.map((stage: StageType, index: number) => {
                        let badgeStatus: BadgeStatusType = 'uncompleted';
                        if (stage.attributes.status === 'Em Andamento') badgeStatus = 'developing'
                        if (stage.attributes.status === 'Finalizado') badgeStatus = 'completed'
                        return (
                            <Item 
                                key={index}
                                color="primary"
                                firstBadgeSpacing
                                accordionButton={isAdminAccess}
                                handleAccordionButton={() => handleAccordionButton(stage)}
                                click={() => select(stage.id)}
                                actions={isAdminAccess ? [
                                        {
                                            name: 'Editar',
                                            ariaLabel: 'editar',
                                            icon: <EditIcon className="text-main-color" />,
                                            click: () => editStage(stage.id)
                                        },
                                        {
                                            name: 'Deletar',
                                            ariaLabel: 'deletar',
                                            icon: <DeleteIcon className="text-danger" />,
                                            click: () => deleteStage(stage.id)
                                        }
                                    ] : [
                                        {
                                            name: 'Editar',
                                            ariaLabel: 'editar',
                                            icon: <EditIcon className="text-main-color" />,
                                            click: () => editStage(stage.id)
                                        }
                                    ]
                                } 
                                badges={[
                                    {
                                        name: stage.attributes.status,
                                        status: badgeStatus
                                    }
                                ]}
                            >
                                {stage.attributes.name}
                            </Item>
                        )
                    })   
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

export default AllStages;
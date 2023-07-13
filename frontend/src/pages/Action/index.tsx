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

import ListContainer from '@components/Layout/List';
import Loading from '@components/Loading';
import ActionType from '@models/Action';

const Actions = () => {

    const { company, currentGoal } = useContext(GlobalContext)

    const navigate = useNavigate();
    const { goal_id } = useParams<{goal_id: any}>();

    const [actions, setActions] = useState<ActionType[] | null>(null);

    const select = (action_id: number) => {

        navigate(`/planning/action/show/${action_id}`)
    }

    const show = async () => {

        let response = await api.goals.actions(goal_id);

        setActions(response.data);
        
        return response;
    }

    const deleteGoal = async (action_id: number) => {
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

    const editGoal = (company_id: number) => {
        navigate(`/planning/action/edit/${company_id}`);
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
                storeButton
                storeText='Ação'
                redirect='planning/action/store'
            >{currentGoal.attributes.name}</Header>

            <ListContainer>
                {actions ? 
                    actions.length > 0 ? actions.map((action: ActionType, index: number) => (
                        <Item 
                            click={() => select(action.id)}
                            actions={[
                                {
                                    name: 'Editar',
                                    ariaLabel: 'editar',
                                    icon: <EditIcon className="text-main-color" />,
                                    click: () => editGoal(action.id)
                                },
                                {
                                    name: 'Deletar',
                                    ariaLabel: 'deletar',
                                    icon: <DeleteIcon className="text-danger" />,
                                    click: () => deleteGoal(action.id)
                                }
                            ]} 
                            key={index}
                        >
                            {action.attributes.name}
                        </Item>
                    ))   
                    : (
                        <Alert severity="warning">
                            <AlertTitle>Nenhuma meta foi cadastrada</AlertTitle>
                            Utilize o botão acima para cadastrar sua primeira meta.
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
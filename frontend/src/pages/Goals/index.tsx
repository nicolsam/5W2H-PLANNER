import { GlobalContext } from '@contexts/Context';
import { useContext, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
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
import GoalType from '@models/Goal';

const Goals = () => {

    const { isAdminAccess, company, setGoal } = useContext(GlobalContext)

    const navigate = useNavigate();

    const [goals, setGoals] = useState<GoalType[] | null>(null);
    const [userActions, setUserActions] = useState<any>([])

    const select = (goal: GoalType) => {

        setGoal(goal)
        navigate(`/planning/action/${goal.id}`);
    }

    const show = async () => {

        let response = await api.companies.goals(company.id);
        
        setGoals(response.data);
        return response;
    }

    const deleteGoal = async (goal_id: number) => {
        try {
            
            await api.goals.delete(goal_id)
        
            toast('Meta deletada com sucesso', {
                type: 'success',
                isLoading: false,
                autoClose: 3000,
                closeButton: true,
            });

            show();

        } catch(error) {
            toast(error.message, {
                type: 'success',
                isLoading: false,
                autoClose: 3000,
                closeButton: true,
            });
        }
        
    }

    const editGoal = (company_id: number) => {
        navigate(`/planning/edit/${company_id}`);
    }

    useEffect(() => {
        
        if(company.id == -1) {
            navigate('/companies');
        }

        show();

        if(isAdminAccess) {
            setUserActions([
                {
                    name: 'Editar',
                    ariaLabel: 'editar',
                    icon: <EditIcon className="text-main-color" />,
                    click: () => editGoal(goal.id)
                },
                {
                    name: 'Deletar',
                    ariaLabel: 'deletar',
                    icon: <DeleteIcon className="text-danger" />,
                    click: () => deleteGoal(goal.id)
                }
            ])
        }

    }, [])
    
    return (
        <Main>
            <Header 
                description='Cadastre, edite e acompanhe metas.'
                storeButton={isAdminAccess}
                storeText='Meta'
                redirect='planning/store'
            >Planejamento</Header>

            <ListContainer>
                {goals ? 
                    goals.length > 0 ? goals.map((goal: GoalType, index: number) => (
                        <Item 
                            color="primary"
                            showCount
                            firstBadgeSpacing
                            click={() => select(goal)}
                            actions={userActions} 
                            badges={[
                                {
                                    name: 'Ações',
                                    count: goal.count.actions.total
                                },
                                {
                                    name: 'A iniciar',
                                    count: goal.count.actions.start,
                                    status: 'uncompleted'
                                },
                                {
                                    name: 'Em desenvolvimento',
                                    count: goal.count.actions.developing,
                                    status: 'developing'
                                },
                                {
                                    name: 'Finalizados',
                                    count: goal.count.actions.completed,
                                    status: 'completed'
                                },
                                
                            ]}
                            key={index}
                        >
                            {goal.attributes.name}
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

export default Goals
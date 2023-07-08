import { GlobalContext } from '@contexts/Context';
import { useContext, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import Header from '@components/Layout/Header';
import ListContainer from '@components/Layout/List';
import Item from '@components/Layout/List/Item';
import Main from '@components/Layout/Main';

import { Alert, AlertTitle, Stack } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import api from "@utils/api";

import Loading from '@components/Loading';

import ResponsibleType from '@models/Responsible';

const Responsibles = () => {

    const { company, setContextResponsibles } = useContext(GlobalContext)

    const navigate = useNavigate();

    const [responsibles, setResponsibles] = useState<ResponsibleType[] | null>(null);

    const select = (responsible: ResponsibleType) => {

        setResponsibles(responsible);

        navigate(`/responsibles/${responsible.id}`)
    }

    const show = async () => {

        let response = await api.companies.responsibles(company.id);

        setResponsibles(response.data);
        setContextResponsibles(response.data);

        return response;
    }

    const deleteResponsible = async (responsible_id: number) => {
        try {
            
            await api.responsibles.delete(responsible_id)
        
            toast('Responsável deletado com sucesso', {
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

    const editResponsible = (responsible_id: number) => {
        navigate(`/responsibles/edit/${responsible_id}`);
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
                description='Cadastre, edite e acompanhe responsáveis.'
                storeButton
                storeText='Responsável'
                redirect='responsibles/store'
            >Responsáveis</Header>

            <ListContainer>
                {responsibles ? 
                    responsibles.length > 0 ? responsibles.map((responsible: ResponsibleType, index: number) => (
                        <Item 
                            description={responsible.attributes.description}
                            click={() => select(responsible)}
                            actions={[
                                {
                                    name: 'Editar',
                                    ariaLabel: 'editar',
                                    icon: <EditIcon className="text-main-color" />,
                                    click: () => editResponsible(responsible.id)
                                },
                                {
                                    name: 'Deletar',
                                    ariaLabel: 'deletar',
                                    icon: <DeleteIcon className="text-danger" />,
                                    click: () => deleteResponsible(responsible.id)
                                }
                            ]} 
                            key={index}
                        >
                            {responsible.attributes.name}
                        </Item>
                    ))   
                    : (
                        <Alert severity="warning">
                            <AlertTitle>Nenhum responsável foi cadastrado</AlertTitle>
                            Utilize o botão acima para cadastrar seu primeiro responsável.
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

export default Responsibles
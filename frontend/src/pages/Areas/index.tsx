import { GlobalContext } from '@contexts/Context';
import { useContext, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import Header from '@components/Layout/Header';
import ListContainer from '@components/Layout/List';
import Item from '@components/Layout/List/Item';
import Main from '@components/Layout/Main';

import { Alert, AlertTitle } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import api from "@utils/api";

import Loading from '@components/Loading';

import AreaType from '@models/Area';

const Areas = () => {

    const { isAdminAccess, company, getCompanyAreas } = useContext(GlobalContext)

    const navigate = useNavigate();

    const [areas, setAreas] = useState<AreaType[] | null>(null);
    const [userActions, setUserActions] = useState<any>([])

    const select = (area: AreaType) => {

        setAreas(area);

        navigate(`/areas/${area.id}`)
    }

    const show = async () => {

        let response = await api.companies.areas(company.id);

        setAreas(response.data);

        return response;
    }

    const deleteArea = async (area_id: number) => {
        try {
            
            await api.areas.delete(area_id);
            
            getCompanyAreas();

            toast('Área deletada com sucesso', {
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

    const editArea = (area_id: number) => {
        navigate(`/areas/edit/${area_id}`);
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
                description='Cadastre, edite e acompanhe áreas.'
                storeButton={isAdminAccess}
                storeText='Área'
                redirect='areas/store'
            >Áreas</Header>

            <ListContainer>
                {areas ? 
                    areas.length > 0 ? areas.map((area: AreaType, index: number) => (
                        <Item 
                            color="primary"
                            click={() => select(area)}
                            actions={isAdminAccess ? [
                                {
                                    name: 'Editar',
                                    ariaLabel: 'editar',
                                    icon: <EditIcon className="text-main-color" />,
                                    click: () => editArea(area.id)
                                },
                                {
                                    name: 'Deletar',
                                    ariaLabel: 'deletar',
                                    icon: <DeleteIcon className="text-danger" />,
                                    click: () => deleteArea(area.id)
                                }
                            ] : []} 
                            key={index}
                        >
                            {area.attributes.name}
                        </Item>
                    ))   
                    : (
                        <Alert severity="warning">
                            <AlertTitle>Nenhuma área foi cadastrada</AlertTitle>
                            Utilize o botão acima para cadastrar sua primeira área.
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

export default Areas;
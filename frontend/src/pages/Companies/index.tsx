import { GlobalContext } from '@contexts/Context';
import { useContext, useEffect, useMemo, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import Header from '@components/Layout/Header';
import Item from '@components/Layout/List/Item';
import Main from '@components/Layout/Main';

import { Alert, AlertTitle } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import api from "@utils/api";

import ListContainer from '@components/Layout/List';
import Loading from '@components/Loading';
import CompanyType from '@models/Company';

const Companies = () => {

    const { setCompany, isAdminAccess, logout } = useContext(GlobalContext)

    const navigate = useNavigate();

    const [companies, setCompanies] = useState<CompanyType[] | null>(null);

    const select = (company: CompanyType) => {

        setCompany(company);

        navigate('/dashboard')
    }

    const show = async () => {

        try {
            let response = await api.companies.index();

            setCompanies(response.data);
            console.log(response.data)
        } catch(error: any) {
            console.log(error.message)
        }
        
    }

    const deleteCompany = async (company_id: number) => {
        try {
            
            await api.companies.delete(company_id)
        
            toast('Empresa deletada com sucesso', {
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

    const editCompany = (company_id: number) => {
        navigate(`/companies/edit/${company_id}`);
    }

    useEffect(() => {

        show();

    }, [])
    
    return (
        <Main>
            <Header 
                description='Esta é a página para gerenciar suas empresas. Crie, edite e delete empresas.'
                storeButton
                storeText='Empresa'
                redirect='companies/store'
            >Olá, Administrador.</Header>

            <ListContainer>
                {companies ? 
                    companies.length > 0 ? companies.map((company: CompanyType, index: number) => (
                    <Item 
                        id={company.id}
                        click={() => select(company)}
                        actions={[
                            {
                                name: 'Editar',
                                ariaLabel: 'editar',
                                icon: <EditIcon className="text-main-color" />,
                                click: () => editCompany(company.id)
                            },
                            {
                                name: 'Deletar',
                                ariaLabel: 'deletar',
                                icon: <DeleteIcon className="text-danger" />,
                                click: () => deleteCompany(company.id)
                            }
                        ]} 
                        key={index}
                    >
                        {company.attributes.name}
                    </Item>
                )) 
                : (
                    <Alert severity="warning">
                        <AlertTitle>Nenhuma empresa foi cadastrada</AlertTitle>
                        Utilize o botão acima para cadastrar sua primeira empresa.
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

export default Companies
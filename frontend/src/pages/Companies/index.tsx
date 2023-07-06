import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import Header from '@components/Layout/Header';
import Item from '@components/Layout/List/Item';
import Main from '@components/Layout/Main';

import { Stack } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import api from "@utils/api";

import Loading from '@components/Loading';
import CompanyType from '@models/Company';

const Companies = () => {

    const navigate = useNavigate();

    const [companies, setCompanies] = useState<CompanyType[] | null>(null);

    const show = async () => {

        let response = await api.companies.index();

        setCompanies(response.data);
        return response;
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

            <Stack spacing={1} direction={"column"} className="mt-20 bg-main-color p-8 rounded h-full">
                {companies ? companies.map((company: CompanyType, index: number) => (
                    <Item 
                        actions={[
                            {
                                ariaLabel: 'editar',
                                icon: <EditIcon className="text-white" />,
                                onClick: () => editCompany(company.id)
                            },
                            {
                                ariaLabel: 'deletar',
                                icon: <DeleteIcon className="text-danger" />,
                                onClick: () => deleteCompany(company.id)
                            }
                        ]} 
                        key={index}
                    >
                        {company.attributes.name}
                    </Item>
                )) 
                    : <Loading />
                }
            </Stack>
        </Main>
    )
}

export default Companies
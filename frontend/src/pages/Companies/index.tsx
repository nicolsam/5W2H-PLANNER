import { GlobalContext } from '@contexts/Context';
import { useContext, useEffect, useRef, useState } from 'react';

import { useAuthHeader } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import AlertModal from '@components/Layout/Alert';
import Header from '@components/Layout/Header';
import Item from '@components/Layout/List/Item';
import Main from '@components/Layout/Main';

import { Alert, AlertTitle } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import api from "@utils/api";
import getToken from '@utils/getToken';

import ListContainer from '@components/Layout/List';
import Loading from '@components/Loading';
import CompanyType from '@models/Company';

const Companies = () => {

    const { setCompany } = useContext(GlobalContext)

    const navigate = useNavigate();
    const auth = useAuthHeader();
    const modalRef = useRef(null);

    const [companies, setCompanies] = useState<CompanyType[] | []>([]);
    const [loading, setLoading] = useState(true);

    const openModal = () => {
        modalRef.current.open();
    };

    const select = (company: CompanyType) => {

        setCompany(company);

        navigate('/dashboard')
    }

    const show = async () => {

        try {
            const response = await api.companies.index(getToken(auth()));
            
            if(response?.success) {
                const companies = response.data as CompanyType[];
                setCompanies(companies);
            }
            
        } catch(error: any) {
            console.log(error.message)
        } finally {
            setLoading(false);
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

        } catch(error: any) {
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
                {loading ? (
                    <div className="w-full flex justify-center">
                        <Loading color="white" />
                    </div>
                ) : companies.length > 0 ? companies.map((company: CompanyType, index: number) => (
                    <div>
                        <Item
                            color="primary"
                            showCount
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
                                    click: () => openModal()
                                }
                            ]}
                            badges={[
                                {
                                    name: 'Metas',
                                    count: company.count?.goals
                                },
                            ]}
                            key={index}
                        >
                            {company.attributes.name}
                        </Item>

                        <AlertModal
                            alertTitle={`Deletando ${company.attributes.name}`}
                            alertContentText="Deseja deletar esta empresa? Esta ação é irreversível."
                            closeText="Cancelar"
                            execFunctionOnAccept={() => deleteCompany(company.id)}
                            functionText="Deletar"
                            functionButtonColor="danger"
                            ref={modalRef}
                        />
                    </div>
                ))
                : (
                    <Alert severity="warning">
                        <AlertTitle>Nenhuma empresa foi cadastrada</AlertTitle>
                        Utilize o botão acima para cadastrar sua primeira empresa.
                    </Alert>
                    
                )}
            </ListContainer>

            
        </Main>
    )
}

export default Companies
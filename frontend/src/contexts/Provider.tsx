import CompanyType from "@models/Company";
import GoalType from "@models/Goal";
import ResponsibleType from "@models/Responsible";
import api from "@utils/api";
import { useEffect, useState } from "react";
import { GlobalContext } from "./Context";

import ActionType from "@models/Action";
import { useSignOut } from 'react-auth-kit';


type Props = {
    children: JSX.Element
}


const companyInitialValue: CompanyType = {
    id: -1,
    attributes: {
        name: '',
        cnpj: '',
        created_at: '',
        updated_at: ''
    }
}

const goalInitialValue: GoalType = {
    id: -1,
    attributes: {
        company_id: -1,
        name: '',
        area: '',
        created_at: '',
        updated_at: ''
    }
}

const actionInitialValue: ActionType = {
    id: -1,
    attributes: {
        name: "",
        area: "",
        what: "",
        how: "",
        start_at: "",
        end_at: "",
        remaining_days: 0,
        value: "",
        value_status: 'Não definido',
        status: 'Finalizado',
        priority: 'Baixa',
        observation: "",
        created_at: "",
        updated_at: "",
    }
}



export const GlobalProvider = ({ children }: Props) => {

    const signOut = useSignOut();

    const [isAdminAccess, setIsAdminAccess] = useState(false);
    const [isCompanyAccess, setIsCompanyAccess] = useState(false);
    const [company, setCompany] = useState<CompanyType>(companyInitialValue);
    const [currentGoal, setGoal] = useState<GoalType>(goalInitialValue);
    const [currentAction, setAction] = useState<ActionType>(actionInitialValue);

    const [contextResponsibles, setContextResponsibles] = useState<ResponsibleType[] | []>([]);

    useEffect(() => {

        if(company.id != -1) { 
            getCompanyResponsibles(); 
        }

    }, [company]);

    const getCompanyResponsibles = async () => {

        let response = await api.companies.responsibles(company.id);

        setContextResponsibles(response.data);

    }

    function logout() {

        setIsAdminAccess(false);
        setIsCompanyAccess(false);

        signOut();

    }

    return (
        <GlobalContext.Provider
            value={{
                isAdminAccess,
                setIsAdminAccess,
                isCompanyAccess,
                setIsCompanyAccess,
                company,
                setCompany,
                currentGoal,
                setGoal,
                currentAction,
                setAction,
                contextResponsibles,
                setContextResponsibles,
                logout
            }}
        >
            { children }
        </GlobalContext.Provider>
    )

}
import CompanyType from "@models/Company";
import GoalType from "@models/Goal";
import ResponsibleType from "@models/Responsible";
import api from "@utils/api";
import { useEffect, useState } from "react";
import { GlobalContext } from "./Context";

import ActionType from "@models/Action";
import AreaType from "@models/Area";
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

    const [contextResponsibles, setContextResponsibles] = useState<ResponsibleType[]>([]);
    const [contextAreas, setContextAreas] = useState<AreaType[]>([]);

    useEffect(() => {

        if(company.id != -1) { 
            getCompanyResponsibles(); 
            getCompanyAreas();
            console.log('areas: ', contextAreas);
        }

    }, [company]);

    const getCompanyResponsibles = async () => {
        try {
            const response = await api.companies.responsibles(company.id);
            if(response?.success) {
                const responsibles = response.data as ResponsibleType[];
                setContextResponsibles(responsibles);
            } else {
                console.error("API call failed:", response?.message);
            }
        } catch (error: any) {
            console.log("getting company responsibles on global provider error: ", error)
        }
        

    }
    
    const getCompanyAreas = async () => {
        try {
            const response = await api.companies.areas(company.id);
            if(response?.success) {
                const areas = response.data as AreaType[];
                setContextAreas(areas);
            } else {
                console.error("API call failed:", response?.message);
            }
        } catch (error: any) {
            console.log("getting company areas on global provider error: ", error)
        }
        

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
                getCompanyResponsibles,
                contextAreas,
                setContextAreas,
                getCompanyAreas,
                logout
            }}
        >
            { children }
        </GlobalContext.Provider>
    )

}
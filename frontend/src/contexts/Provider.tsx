import CompanyType from "@models/Company";
import GoalType from "@models/Goal";
import ResponsibleType from "@models/Responsible";
import api from "@utils/api";
import { useEffect, useState } from "react";
import { GlobalContext } from "./Context";

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



export const GlobalProvider = ({ children }: Props) => {
    
    const [company, setCompany] = useState<CompanyType>(companyInitialValue);
    const [currentGoal, setGoal] = useState<GoalType>(goalInitialValue);
    const [contextResponsibles, setContextResponsibles] = useState<ResponsibleType[] | []>([]);

    useEffect(() => {

        company.id != -1 ?? getCompanyResponsibles();

    }, [company]);

    const getCompanyResponsibles = async () => {

        let response = await api.companies.responsibles(company.id);

        setContextResponsibles(response.data);

    }

    return (
        <GlobalContext.Provider
            value={{
                company,
                setCompany,
                currentGoal,
                setGoal,
                contextResponsibles,
                setContextResponsibles
            }}
        >
            { children }
        </GlobalContext.Provider>
    )

}
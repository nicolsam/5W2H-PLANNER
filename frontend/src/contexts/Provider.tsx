import CompanyType from "@models/Company";
import { useState } from "react";
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

export const GlobalProvider = ({ children }: Props) => {
    
    const [company, setCompany] = useState<CompanyType>(companyInitialValue);

    return (
        <GlobalContext.Provider
            value={{
                company,
                setCompany
            }}
        >
            { children }
        </GlobalContext.Provider>
    )

}
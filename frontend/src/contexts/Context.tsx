import { createContext } from "react";

import CompanyType from "@models/Company";

export type GlobalContextType = {
    company: CompanyType
    setCompany: React.Dispatch<React.SetStateAction<CompanyType>>;
}

export const GlobalContext = createContext<GlobalContextType>(null!);
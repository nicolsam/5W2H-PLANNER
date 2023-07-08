import { createContext } from "react";

import CompanyType from "@models/Company";
import GoalType from "@models/Goal";
import ResponsibleType from "@models/Responsible";

export type GlobalContextType = {
    company: CompanyType;
    setCompany: React.Dispatch<React.SetStateAction<CompanyType>>;
    currentGoal: GoalType;
    setGoal: React.Dispatch<React.SetStateAction<GoalType>>;
    contextResponsibles: ResponsibleType[],
    setContextResponsibles: React.Dispatch<React.SetStateAction<ResponsibleType[]>>;
}

export const GlobalContext = createContext<GlobalContextType>(null!);
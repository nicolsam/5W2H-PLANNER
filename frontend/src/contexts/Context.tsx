import { createContext } from "react";

import ActionType from "@models/Action";
import CompanyType from "@models/Company";
import GoalType from "@models/Goal";
import ResponsibleType from "@models/Responsible";

export type GlobalContextType = {
    isAdminAccess: boolean;
    setIsAdminAccess: React.Dispatch<React.SetStateAction<boolean>>;
    isCompanyAccess: boolean;
    setIsCompanyAccess: React.Dispatch<React.SetStateAction<boolean>>;
    company: CompanyType;
    setCompany: React.Dispatch<React.SetStateAction<CompanyType>>;
    currentGoal: GoalType;
    setGoal: React.Dispatch<React.SetStateAction<GoalType>>;
    currentAction: ActionType;
    setAction: React.Dispatch<React.SetStateAction<ActionType>>;
    contextResponsibles: ResponsibleType[],
    setContextResponsibles: React.Dispatch<React.SetStateAction<ResponsibleType[]>>;
    logout: () => void;
}

export const GlobalContext = createContext<GlobalContextType>(null!);
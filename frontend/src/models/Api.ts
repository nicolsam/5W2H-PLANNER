import ActionType from "./Action";
import AreaType from "./Area";
import CompanyType from "./Company";
import GoalType from "./Goal";
import ResponsibleType from "./Responsible";
import StageType from "./Stage";

export type ResponseType = {
    success: boolean,
    data: CompanyType | GoalType | ActionType | StageType | ResponsibleType | AreaType | [],
    message?: string
}

export default ResponseType;
import CompanyType from "./Company";
import GoalType from "./Goal";

export type ResponseType = {
    success: boolean,
    data: CompanyType | GoalType | [],
    message?: string
}

export default ResponseType;
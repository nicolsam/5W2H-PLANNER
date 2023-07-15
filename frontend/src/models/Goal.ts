export type GoalType =  {
    id: number;
    attributes: {
        company_id: number;
        name: string;
        area: string;
        created_at: string;
        updated_at: string;
    }
    count?: {
        actions: {
            total: number;
            completed: number;
            developing: number;
            start: number
        }
    }
}

export default GoalType;
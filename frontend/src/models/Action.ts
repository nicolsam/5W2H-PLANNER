import { StageAttributes } from './Stage';
export type ActionType = {
    id: number;
    attributes: ActionAttributes; 
    relationships: {
        goal: {
            id: number;
            name: string;
            area: string;
            created_at: string;
            updated_at: string;
        }   
        stages: (StageAttributes & StageAnnoyingType)[]
    }
    count: {
        stages: {
            total: number;
            completed: number;
            developing: number;
            start: number
        }
    }
};

export type ActionAttributes = {
    name: string;
    area: string;
    what: string;
    how: string;
    start_at: string;
    end_at: string;
    remaining_days: number;
    value: string;
    value_status: 'Solicitar Orçamento' | 'Aguardando Cotação' | 'Orçamento em Apreciação' | 'Aprovado' | 'Não Aprovado' | 'Sem ônus' | 'Não definido';
    status: 'A Iniciar' | 'Em Andamento' | 'Finalizado';
    priority: 'Baixa' | 'Média' | 'Alta';
    observation: string;
    created_at: string;
    updated_at: string;
}

type StageAnnoyingType = {
    id: number;
    action_id: number;
}

export default ActionType;
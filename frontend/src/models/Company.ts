export type CompanyType = {
    id: number;
    attributes: {
        name: string;
        cnpj: string;
        created_at: string;
        updated_at: string;
    }
    count: {
        goals: number;
    }
}

export default CompanyType;
export type CompanyType = {
    id: number | null;
    attributes: {
        name: string;
        cnpj: string;
        created_at: string;
        updated_at: string;
    }
}

export default CompanyType;
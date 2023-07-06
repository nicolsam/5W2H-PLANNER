export type CompanyType = {
    id: number;
    attributes: {
        name: string;
        cnpj: string;
        password?: string;
        create_at: string;
        updated_at: string;
    }
}

export default CompanyType;
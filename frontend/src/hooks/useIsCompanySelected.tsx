import { GlobalContext } from "@contexts/Context"
import { useContext, useEffect } from "react"

import { useNavigate } from "react-router-dom"

const useIsCompanySelected = () => {

    const { company } = useContext(GlobalContext)
    const navigate = useNavigate();

    useEffect(() => {
        if(company.id == -1) {
            navigate('/companies');
        }
    }, [])

}

export default useIsCompanySelected
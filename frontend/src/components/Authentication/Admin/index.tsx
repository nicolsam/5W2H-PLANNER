import { GlobalContext } from "@contexts/Context";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
type Props = {
    children: JSX.Element;
}
const RequireAdminAccess = ({children}: Props) => {

    const navigate = useNavigate();
    const {isAdminAccess} = useContext(GlobalContext)

    useEffect(() => {
        console.log(isAdminAccess)
        if(!isAdminAccess) { navigate('/forbidden') }
    }, [])

    return (
        <>
            {isAdminAccess && children}
        </>
    )
}

export default RequireAdminAccess
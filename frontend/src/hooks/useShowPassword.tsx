import { useEffect, useState } from "react";

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

type PasswordTextType = 'text' | 'password';

const useShowPassword = () => {

    const [showPassword, setShowPassword] = useState(false);

    const [showPasswordIcon, setShowPasswordIcon] = useState(<VisibilityOff />);
    const [showPasswordType, setShowPasswordType] = useState<PasswordTextType>('password');

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }

    useEffect(() => {
        
        if(showPassword) {
            setShowPasswordIcon(<Visibility />);
            setShowPasswordType('text')
        } else {
            setShowPasswordIcon(<VisibilityOff />);
            setShowPasswordType('password')
        }

    }, [showPassword])
    
    return { showPassword, showPasswordIcon, showPasswordType, handleClickShowPassword }


}

export default useShowPassword
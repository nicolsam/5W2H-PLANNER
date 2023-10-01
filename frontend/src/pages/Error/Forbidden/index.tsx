import ErrorRobot from '@components/Robot/robot';
import ErrorIcon from '@mui/icons-material/Error';
import ErrorPage from '../Error';

const Forbidden = () => {

    return (
        <ErrorPage  
            code={403}
            description="Acesso recusado"
            button={{
                text: "PÁGINA DE LOGIN",
                url: "/company/login"
            }}
        />
    )
}

export default Forbidden
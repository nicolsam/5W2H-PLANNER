import ErrorRobot from '@components/Robot/robot';
import ErrorIcon from '@mui/icons-material/Error';
import { Button } from '@mui/material';
import { HttpStatusCode } from "axios";
import { Link } from 'react-router-dom';

type Props = {
    code: HttpStatusCode;
    description: string;
    button: {
        url: string;
        text: string;
    }
}

const ErrorPage = ({ code, description, button }: Props) => {

    return (
        <div className="bg-secondary-color w-full h-screen overflow-hidden relative flex flex-col justify-center items-center gap-5">
            <div className="absolute top-36 2xl:top-40 flex gap-8 flex-col">
                <div className="flex flex-row justify-center items-center gap-7">
                    <ErrorIcon color="error" style={{ fontSize: 80 }} />
                    <div className="flex flex-col">
                        <h1 className="text-white font-semibold text-5xl lg:text-6xl xl:text-7xl">{code}</h1>
                        <p className="text-white text-xl lg:text-2xl xl:text-3xl">{description}</p>
                    </div>
                </div>
                <div className="h-auto flex justify-center">
                    <Button variant="main" disableElevation className="my-2 w-fit">
                        <Link to={button.url}>{button.text}</Link>
                    </Button>
                </div>
                <div className="h-auto scale-50 flex justify-center items-start">
                    <ErrorRobot />
                </div>
            </div>
        </div>

    )
}

export default ErrorPage;
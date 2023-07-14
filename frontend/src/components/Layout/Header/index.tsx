import { Button, Stack } from "@mui/material";
import { To, useNavigate } from "react-router-dom";

import AddCircleIcon from '@mui/icons-material/AddCircle';

type Props = {
    children: JSX.Element | string | undefined;
    description?: string;
    storeButton?: boolean;
    storeText?: string;
    redirect?: To; 
}

const Header = ({ description, storeButton, storeText, redirect, children }: Props) => {

    const navigate = useNavigate();

    const navigateToRedirect = () => {
        navigate('/' + redirect);
    }

    return (
        <header className="flex justify-between flex-col md:flex-row gap-2 md:gap-4 2xl:gap-0">
            <Stack spacing={0} direction={"column"} className="md:w-3/4 xl:w-auto">
                <h1 className="text-4xl xl:text-4xl 2xl:text-5xl font-medium">{children}</h1>
                <p className="text-xl mt-1 xl:mt-0 xl:text-xl 2xl:text-2xl">{description}</p>
            </Stack>
            {storeButton && redirect && (
                
                <Button className="md:w-1/4 xl:w-auto h-fit" sx={{padding: 2}} variant="main" startIcon={<AddCircleIcon />} disableElevation onClick={navigateToRedirect}>
                    <span className="text-2xl xl:text-xl">{storeText}</span>
                </Button>
                
            )}
        </header>
    )
}

export default Header
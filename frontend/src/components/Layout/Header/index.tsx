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
        <header className="flex justify-between flex-col md:flex-row">
            <Stack spacing={0} direction={"column"}>
                <h1 className="xl:text-4xl font-medium">{children}</h1>
                <p className="xl:text-xl">{description}</p>
            </Stack>
            {storeButton && redirect && (
                
                <Button className="h-fit" sx={{padding: 2}} variant="main" startIcon={<AddCircleIcon />} disableElevation onClick={navigateToRedirect}>
                    <span className="2xl:text-xl">{storeText}</span>
                </Button>
                
            )}
        </header>
    )
}

export default Header
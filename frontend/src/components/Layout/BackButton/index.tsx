import React from 'react';
import { redirect, useNavigate } from 'react-router-dom';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Button } from '@mui/material';

interface Props {
    link?: string;
}

const BackButton = ({ link }: Props) => {
    const navigate = useNavigate();

    /**
     * Return to a specific page if a link is provided,
     * otherwise return one page backwards
     */
    const back = (link = '') => {

        if(!link) {
            navigate(-1)
            return;
        }
        
        navigate(link);

    };

    return (
        <Button 
            className="w-fit"
            variant="secondary"
            size="medium"
            disableElevation
            onClick={() => back(link)}
            startIcon={<ArrowBackIosIcon />}
        >
            <span className="py-1 text-lg">Voltar</span>
        </Button>
    )
}

export default BackButton
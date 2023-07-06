import React from 'react';
import { useNavigate } from 'react-router-dom';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Button } from '@mui/material';

const BackButton = () => {
    const navigate = useNavigate();

    return (
        <Button 
            className="w-fit"
            variant='contained'
            size='large'
            disableElevation
            onClick={() => navigate(-1)}
            startIcon={<ArrowBackIosIcon />}
        >
            <span className="py-1 text-lg">Voltar</span>
        </Button>
    )
}

export default BackButton
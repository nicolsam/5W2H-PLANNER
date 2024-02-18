import { useState } from 'react';
import { Card } from './styles';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Tooltip } from "@mui/material";

type Props = {
    type: 'number' | 'percent';
    amount: number | undefined;
    description: string;
    onClick?: () => void;
    tooltip?: string;
};

const SmCard = ({ type, amount, description, onClick, tooltip }: Props) => {

    return (
        <Tooltip 
                title={
                    onClick && (
                        <div className="text-sm 2xl:text-base text-center">
                            <h2>{tooltip}</h2>
                        </div>
                    )
                } 
                placement="top"
                arrow
        >
            <Card 
                className="group h-full px-2 py-5 md:py-3 lg:px-4 lg:py-5 bg-main-color text-white rounded"
                onClick={onClick}
            >
                
                <div className="flex flex-row justify-between align-center md:mb-2 lg:mb-2">
                    <h2 className="text-3xl">
                        {amount}
                        {type == 'percent' && '%'}
                    </h2>
                    {onClick && (
                        <div className="group-hover:bg-secondary-color rounded">
                            <KeyboardArrowRightIcon sx={{ fontSize: 35 }} />
                        </div>
                    )}
                </div>
            
                <p className="xl:text-base 2xl:text-base">{description}</p>
            </Card>
        </Tooltip>
        
    );
};

export default SmCard;

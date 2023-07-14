import Badge from '@components/Badge';
import { BadgeStatusType } from '@components/Badge/styles';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Accordion, AccordionDetails, AccordionSummary, Alert, AlertTitle, Button, Divider, IconButton, Menu, MenuItem, Stack, Tooltip, Typography } from "@mui/material";

import {
    bindMenu,
    bindTrigger,
    usePopupState,
} from 'material-ui-popup-state/hooks';

type Props = {
    children: string | JSX.Element;
    description?: string;
    showCount?: boolean;
    color: 'primary' | 'secondary';
    accordionButton?: boolean;
    handleAccordionButton?: any;
    click: () => void;
    actions: Action[];
    firstBadgeSpacing?: boolean;
    badges?: Badge[];
    accordions?: Accordion[];
};

type Action = {
    name: string;
    ariaLabel?: string;
    icon: JSX.Element,
    click: () => void;
}

type Badge = {
    name: string,
    count?: number,
    status?: BadgeStatusType;
}

type Accordion = {
    name: string,
    content: JSX.Element[] | string;
    errorMessage: string;
    errorDescription: string;
}

const Item = ({ 
    children, 
    description, 
    showCount = false,
    color,
    accordionButton = false,
    handleAccordionButton,
    click, 
    actions, 
    firstBadgeSpacing = false, 
    badges,
    accordions 
}: Props) => {
    const popupState = usePopupState({
        variant: 'popover',
        popupId: 'options',
    });

    return (
        <Stack direction={"column"} spacing={0} className="rounded bg-secondary-color" sx={{ backgroundColor: color != "primary" ? '#585858' : "#444344" }}> 
            <div className="flex flex-row justify-between items-center">
                <Tooltip 
                    title={
                        <div className="2xl:text-lg text-center">
                            <h2>Clique para visualizar</h2>
                        </div>
                    } 
                    arrow
                >
                    <Button
                        variant="list"
                        className="w-full h-full rounded p-4 bg-secondary-color"
                        sx={{ backgroundColor: color != "primary" ? '#585858' : "#444344" }}
                        onClick={click}
                    >
                        <div className="flex flex-col items-start pt-2">
                            <h2 className="text-white text-2xl font-semibold normal-case">{children}</h2>
                            {description && (
                                <p className="text-white text-base font-normal normal-case">{description}</p>
                            )}
                            <Stack sx={{ mt: 2 }} spacing={1} direction={"row"}>
                            {badges && badges.map((badge: Badge) => (
                                <Badge firstBadgeSpacing={firstBadgeSpacing} showCount={showCount} count={badge.count} status={badge.status ? badge.status : 'neutral'}>{badge.name}</Badge>
                            ))}
                            </Stack>
                        </div>
                    </Button>
                </Tooltip>

                {/* <Divider orientation="vertical" variant="middle" flexItem /> */}

                <div className="p-4 w-fit">
                    <IconButton 
                        {...bindTrigger(popupState)} 
                        size="large" 
                        sx={{ 
                            backgroundColor: color != "secondary" ? '#585858' : "#444344",
                            '&:hover': {
                                backgroundColor: '#686768',
                            },
                        }}
                    >
                        <MoreVertIcon className="text-white" fontSize="inherit" />
                    </IconButton>
            
                    <Menu {...bindMenu(popupState)} >
            
                    {popupState && actions.map((action, index: number) => (
                        <MenuItem
                            key={index}
                            onClick={action.click}
                            className="flex gap-2"
                        >
                            {action.icon}
                            {action.name}
                        </MenuItem>
                    ))}
                    </Menu>
                </div>
            </div>
            {accordions && accordions.map((accordion: Accordion, index: number) => (
                <Accordion 
                    disableGutters 
                    elevation={0} 
                    sx={{ 
                        backgroundColor:'#444344', 
                        color: "white", 
                        paddingTop: '.5rem',
                        paddingLeft: '1rem',
                        paddingBottom: '1rem',
                        flexDirection: 'row' 
                    }}>
                    <Stack spacing={1} direction="row">
                        <AccordionSummary
                            sx={{
                                backgroundColor: '#585858',
                                maxWidth: 'fit-content',
                                flexDirection: 'row-reverse',
                                gap: '.5rem',
                                alignItems: 'center',
                                paddingRight: '1.4rem',
                                borderRadius: '0.25rem',
                                '&:hover': {
                                    backgroundColor: '#686768',
                                },
                            }}
                            expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
                            aria-controls="panel1a-content"
                            id={`item-accordion-${index}`}
                        >
                            <span className="2xl:text-lg font-normal font-sans">{accordion.name}</span>
                        </AccordionSummary>
                        {accordionButton && (
                            <Button className="h-fit" sx={{padding: 2}} variant="main" startIcon={<AddCircleIcon />} disableElevation onClick={handleAccordionButton}>
                                <span className="2xl:text-base font-normal">ETAPA</span>
                            </Button>
                        )}
                    </Stack>
                    <AccordionDetails
                        sx={{
                            mt: 1,
                            pl: 0,
                            display: "flex",
                            flexDirection: "column",
                            gap: 1
                        }}
                    >
                        {accordion.content != "" ? accordion.content : (
                            <Alert severity="warning">
                                <AlertTitle>{accordion.errorMessage}</AlertTitle>
                                {accordion.errorDescription}
                            </Alert>
                        )}
                    </AccordionDetails>
                </Accordion>
            ))}
        </Stack>
    )
}

export default Item
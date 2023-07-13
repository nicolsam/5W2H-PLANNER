import Badge from '@components/Badge';
import { BadgeStatusType } from '@components/Badge/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button, Divider, IconButton, Menu, MenuItem, Stack } from "@mui/material";

import {
    bindMenu,
    bindTrigger,
    usePopupState,
} from 'material-ui-popup-state/hooks';

type Props = {
    id: number;
    children: string | JSX.Element;
    description?: string;
    click: () => void;
    actions: Action[];
    firstBadgeSpacing: boolean;
    badges?: Badge[];
};

type Action = {
    name: string;
    ariaLabel?: string;
    icon: JSX.Element,
    click: () => void;
}

type Badge = {
    name: string,
    count: number,
    status?: BadgeStatusType;
}

const Item = ({ id, children, description, click, actions, firstBadgeSpacing = false, badges }: Props) => {
    const popupState = usePopupState({
        variant: 'popover',
        popupId: 'options',
    });

    return (
        <div
            key={id} 
            className="rounded bg-secondary-color flex flex-row justify-between items-center"
        >
            <Button 
                variant="list" 
                className="w-full h-full rounded p-4 bg-secondary-color"
                onClick={click}
            >
                <div className="flex flex-col items-start">
                    <h2 className="text-white text-2xl font-semibold normal-case">{children}</h2>
                    {description && (
                        <p className="text-white text-base font-normal normal-case">{description}</p>
                    )}

                    <Stack sx={{ mt: 1 }} spacing={1} direction={"row"}>
                    {badges && badges.map((badge: Badge) => (
                        <Badge firstBadgeSpacing={firstBadgeSpacing} showCount count={badge.count} status={badge.status ? badge.status : 'neutral'}>{badge.name}</Badge>
                    ))}
                    </Stack>
                </div>
            </Button>

            <Divider orientation="vertical" variant="middle" flexItem />

            <div className="p-4 w-fit">
                <IconButton {...bindTrigger(popupState)} size="large" sx={{ backgroundColor: '#585858'}}>
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
    )
}

export default Item
import { IconButton, Stack } from "@mui/material";

type Props = {
    children: string | JSX.Element;
    key: string | number;
    actions: Action[];
};

type Action = {
    ariaLabel?: string;
    icon: JSX.Element,
    onClick: () => void;
}

const Item = ({ children, key, actions }: Props) => {
  return (
    <div key={key} className="rounded p-4 bg-secondary-color flex flex-row justify-between items-center hover:cursor-pointer">
        <Stack>
            <h2 className="text-white text-2xl font-semibold">{children}</h2>
        </Stack>
        <Stack spacing={1} direction={"row"} className="bg-main-color rounded p-1">
            {actions.map((action, index: number) => (
                <IconButton key={index} aria-label={action.ariaLabel} className="w-fit" onClick={action.onClick}>{action.icon}</IconButton>
            ))}
        </Stack>
    </div>
  )
}

export default Item
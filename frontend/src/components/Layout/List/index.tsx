import { Stack } from "@mui/material";

type Props = {
    children: JSX.Element | JSX.Element[];
}

const ListContainer = ({children}: Props) => {
    return (
        <Stack spacing={1} direction={"column"} className="mt-12 bg-main-color p-8 rounded h-full">
            {children}
        </Stack>
    )
}

export default ListContainer
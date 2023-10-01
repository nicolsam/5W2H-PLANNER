import { Stack } from "@mui/material";

type Props = {
    children: JSX.Element | JSX.Element[];
}

const ListContainer = ({children}: Props) => {
    return (
        <Stack spacing={1} direction={"column"} className="bg-main-color px-4 py-6 xl:p-8 rounded h-full">
            {children}
        </Stack>
    )
}

export default ListContainer
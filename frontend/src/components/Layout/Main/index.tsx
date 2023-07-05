import React from 'react';

type Props = {
    children: React.ReactNode;
}

const Main = ({ children }: Props) => {
    return (
        <div className="px-10 py-8 flex flex-col gap-5">{children}</div>
    )
}

export default Main
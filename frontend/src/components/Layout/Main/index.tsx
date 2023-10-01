import React from 'react';

type Props = {
    children: React.ReactNode;
}

const Main = ({ children }: Props) => {
    return (
        <div className="px-7 pb-12 pt-20 lg:px-10 lg:py-24 flex flex-col gap-8 w-full h-auto xl:px-28 xl:py-12">{children}</div>
    )
}

export default Main
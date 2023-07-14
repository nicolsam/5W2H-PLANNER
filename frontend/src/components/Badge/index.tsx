import { BadgeContainer, BadgeStatusType, Count } from './styles';

type Props = {
    showCount: boolean;
    count: number;
    firstBadgeSpacing?: boolean;
    status: BadgeStatusType;
    children: JSX.Element | string;
};

const Badge = ({ showCount = false, count, firstBadgeSpacing, status, children }: Props) => {
    return (
        <BadgeContainer
            status={status}
            firstBadgeSpacing={firstBadgeSpacing}
            className="w-fit md:w-auto py-2 px-3 rounded flex gap-2 flex-row justify-center items-center"
        >
            {showCount && (
                <Count className="bg-white px-1.5 rounded-full">
                    <p className="text-sm text-main-color">{count}</p>
                </Count>
            )}
            <span className="text-sm xl:text-base">{children}</span>
        </BadgeContainer>
    );
};

export default Badge;

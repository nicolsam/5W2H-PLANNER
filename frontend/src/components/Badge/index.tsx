import { BadgeContainer, BadgeStatusType, Count } from './styles';

type Props = {
    showCount: boolean;
    count: number;
    firstBadgeSpacing?: boolean;
    status: BadgeStatusType;
    children: JSX.Element | string;
};

const Badge = ({ showCount, count, firstBadgeSpacing, status, children }: Props) => {
    return (
        <BadgeContainer
            status={status}
            firstBadgeSpacing={firstBadgeSpacing}
            className="py-2 px-3 rounded flex gap-2 flex-row justify-center items-center"
        >
            {showCount && (
                <Count className="bg-white px-1.5 rounded-full">
                    <p className="text-sm text-main-color">{count}</p>
                </Count>
            )}
            {children}
        </BadgeContainer>
    );
};

export default Badge;

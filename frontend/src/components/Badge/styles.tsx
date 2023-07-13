import styled from 'styled-components';

export type BadgeStatusType = 'neutral' | 'completed' | 'uncompleted' | 'developing'; 

export type BadgeProps = {
    firstBadgeSpacing?: boolean;
    status: BadgeStatusType;
};

type BadgeVariant = {
    neutral: {
        color?: string,
        backgroundColor?: string
    },
    completed: {
        color?: string,
        backgroundColor?: string
    }, 
    uncompleted: {
        color?: string,
        backgroundColor?: string
    }
    developing: {
        color?: string,
        backgroundColor?: string
    }
}

const badgeVariant: BadgeVariant = {
    neutral: {
        color: 'white',
        backgroundColor: '#585858',
    },
    completed: {
        color: 'white',
        backgroundColor: '#10AD55',
    },
    uncompleted: {
        color: 'white',
        backgroundColor: '#FF4D4D',
    },
    developing: {
        color: 'white',
        backgroundColor: '#db8c0cdf',
    }
};

export const BadgeContainer = styled.div<BadgeProps>`
    background-color: ${({ status }) => badgeVariant[status].backgroundColor};
    color: ${({ status }) => badgeVariant[status].color ? badgeVariant[status].color : 'black'};
    margin-right: ${({ firstBadgeSpacing }) => firstBadgeSpacing ? '.7rem' : '0' }; 

    font-weight: bold;
`;

export const Count = styled.div`
    color: black;
`;

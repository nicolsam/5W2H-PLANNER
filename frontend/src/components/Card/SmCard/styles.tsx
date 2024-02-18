import styled from 'styled-components';

export const Card = styled.div`
    min-width: 17em;
    min-height: 5em;
    max-height: 7em;

    @media (max-width: 768px) {
        min-width: 0;
    }

    &:hover { 
        cursor: ${({onClick}) => onClick ? 'pointer' : 'normal'};

        box-shadow: 3px 5px 5px rgba(0, 0, 0, .3);
    }
`;

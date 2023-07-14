import styled from 'styled-components';

export const Card = styled.div`
    min-width: 17em;
    min-height: 5em;
    max-height: 7em;

    @media (max-width: 768px) {
        min-width: 0;
    }
`;

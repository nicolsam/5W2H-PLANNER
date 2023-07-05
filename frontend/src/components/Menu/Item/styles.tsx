import styled from 'styled-components';

type StyleProps = {
  isSelected?: boolean;
};

export const Option = styled.div<StyleProps>`
  background-color: ${(props) => props.isSelected && '#444344;'};
`;

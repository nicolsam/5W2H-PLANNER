import styled from 'styled-components';

export const Card = styled.div`
  min-width: 17em;

  @media (max-width: 768px) {
    min-width: 0;
  }
`;

export const CChart = styled.div`
  canvas {
    background: radial-gradient(
      circle at center,
      rgba(0, 0, 0, 0) 0,
      rgba(0, 0, 0, 0) 55%,
      rgba(255, 255, 255, 0.2) 56%,
      rgba(255, 255, 255, 0.2) 60%,
      rgba(255, 255, 255, 0.2) 64%,
      rgba(0, 0, 0, 0) 65%,
      rgba(0, 0, 0, 0) 100%
    );
  }
`;

type StyleProps = {
  color: string;
};

export const Color = styled.div<StyleProps>`
  width: 1.4em;
  height: 0.6em;
  border-radius: 10px;
  background-color: ${(props) => props.color};
`;

import styled from "styled-components";

interface MainContainerProps {
  color: any;
  content: string;
  hasHeader: boolean;
}

export const Container = styled.div<MainContainerProps>`
  background-color: ${(props) => props.color};
  margin-top: ${(props) => props.hasHeader ? '60px' : 0};
  height: ${(props) => props.hasHeader ? 'calc(100vh - 60px)' : '100vh'};
  width: 100%;
  display: flex;
  justify-content: ${(props) => props.content};
  align-items: center;
  display: flex;
  flex-direction: column;

  @media (max-width: 1100px) {
    margin-top: ${(props) => props.hasHeader ? '50px' : 0};
  }
`;

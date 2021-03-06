import styled from "styled-components";

export const Container = styled.div`
  padding: 24px;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  border-radius: 6px;
  background: var(--content);
  width: 720px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Header = styled.header`
  padding-bottom: 24px;
`;

export const Title = styled.h1`
  color: var(--text);
  transition: font-size 0.5s ease;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

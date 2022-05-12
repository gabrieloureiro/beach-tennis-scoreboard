import styled from "styled-components";

export const ScoreboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 6px;
  padding: 16px;
  color: var(--text);
  background: var(--background);
  position: relative;
`;

export const RowButtons = styled.div`
  display: flex;
  position: absolute;
  right: 0;
  top: 0;
`;

export const UndoButton = styled.button`
  background: salmon;
  padding: 8px;
  color: var(--text);
  font-weight: 600;
`;

export const ResetButton = styled.button`
  border-radius: 0 6px 0 0;
  padding: 8px;
  background: green;
  color: var(--text);
  font-weight: 600;
`;

export const TeamRowWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  &:last-child {
    border-top: 2px solid var(--background);
  }
`;

export const TeamWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: var(--content);
  padding: 0 12px;
  flex: 1;
  height: 46px;
`;

export const Number = styled.button<{ isFinished?: boolean }>`
  border: none;
  height: 100%;
  width: 36px;
  padding: 12px 8px;
  font-weight: bold;
  font-size: 1.02rem;
  background: ${({ isFinished }) => (isFinished ? "black" : "gray")};
  color: var(--text);
  border-left: 2px solid var(--content);
`;

export const PlayerName = styled.span<{ isServing?: boolean }>`
  font-size: 1.1rem;
  font-weight: bold;
  color: ${({ isServing }) => (isServing ? "green" : "var(--text)")};

  @media (max-width: 385px) {
    font-size: 0.75rem;
  }
`;

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

export const ResetButton = styled.button`
  position: absolute;
  border-radius: 0 6px 0 0;
  padding: 8px;
  border: 0;
  right: 0;
  top: 0;
  background: green;
  color: var(--text);
`;

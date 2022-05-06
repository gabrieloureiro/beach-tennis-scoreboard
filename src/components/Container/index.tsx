import * as S from "./styles";

export function Container({ children }): JSX.Element {
  return (
    <S.Container>
      <S.Content>
        <S.Header>
          <S.Title>btscoreboard</S.Title>
        </S.Header>
        {children}
      </S.Content>
    </S.Container>
  );
}

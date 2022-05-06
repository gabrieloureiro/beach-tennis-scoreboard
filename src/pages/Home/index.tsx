import { Container, Input } from "../../components";
import { useScoreboardData } from "../../context";
import * as S from "./styles";

export function Home() {
  const {
    firstDuo,
    setFirstDuo,
    secondDuo,
    setSecondDuo,
    setGameDescription,
    pageStep,
    setPageStep,
  } = useScoreboardData();

  const isDisabledToNextStep =
    firstDuo.playerOne === "" ||
    firstDuo.playerTwo === "" ||
    secondDuo.playerOne === "" ||
    secondDuo.playerTwo === "";

  const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setPageStep(1);
  };

  return (
    <Container>
      {pageStep === 0 && (
        <S.Form>
          <S.Text>Informações iniciais da partida</S.Text>
          <Input
            onChange={(e) => setGameDescription(e.target.value)}
            placeholder="Descrição do jogo/campeonato"
          />
          <S.Label>Dupla 1</S.Label>
          <Input
            required
            onChange={(e) =>
              setFirstDuo((prevState) => ({
                ...prevState,
                playerOne: e.target.value,
              }))
            }
            placeholder="Digite o nome do jogador"
          />
          <Input
            required
            onChange={(e) =>
              setFirstDuo((prevState) => ({
                ...prevState,
                playerTwo: e.target.value,
              }))
            }
            placeholder="Digite o nome do jogador"
          />
          <S.Label>Dupla 2</S.Label>
          <Input
            required
            onChange={(e) =>
              setSecondDuo((prevState) => ({
                ...prevState,
                playerOne: e.target.value,
              }))
            }
            placeholder="Digite o nome do jogador"
          />
          <Input
            required
            onChange={(e) =>
              setSecondDuo((prevState) => ({
                ...prevState,
                playerTwo: e.target.value,
              }))
            }
            placeholder="Digite o nome do jogador"
          />
          <S.Button
            onClick={handleSubmit}
            type="submit"
            disabled={isDisabledToNextStep}
          >
            Avançar
          </S.Button>
        </S.Form>
      )}
      {pageStep === 1 && <h1>Placar</h1>}
    </Container>
  );
}

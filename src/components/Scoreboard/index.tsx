import {
  DuoProps,
  GameProps,
  PlayerProps,
  useScoreboardData,
} from "../../context";
import { Text, Row } from "../../components";
import * as S from "./styles";
import { useEffect, useState } from "react";
import { FiRefreshCcw } from "react-icons/fi";

type InitialGameDataProps = {
  firstDuo: DuoProps;
  secondDuo: DuoProps;
  game: GameProps;
};

type ScoreboardStateProps = {
  currentServing: PlayerProps;
};

export function Scoreboard() {
  const [initialGameData, setInitialGameData] = useState<InitialGameDataProps>(
    {} as InitialGameDataProps
  );

  const [scoreboardState, setScoreboardState] = useState();

  const { game, firstDuo, setFirstDuo, setSecondDuo, setGame, secondDuo } =
    useScoreboardData();

  const handleResetMatch = () => {
    console.log(initialGameData);
    setFirstDuo(initialGameData.firstDuo);
    setSecondDuo(initialGameData.secondDuo);
    setGame(initialGameData.game);
  };

  useEffect(() => {
    setInitialGameData({ firstDuo, secondDuo, game });
  }, []);

  return (
    <S.ScoreboardWrapper>
      <Row>
        <Text>{game.gameDescription || "Partida sem nome"}</Text>
        <S.ResetButton onClick={() => handleResetMatch()}>
          <FiRefreshCcw size="16px" />
        </S.ResetButton>
      </Row>
    </S.ScoreboardWrapper>
  );
}

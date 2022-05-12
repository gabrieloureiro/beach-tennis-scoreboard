import { DuoProps, MatchProps, useScoreboardData } from "../../context";
import { Text } from "../../components";
import * as S from "./styles";
import { useEffect, useState } from "react";

export type ScoreboardStateProps = {
  firstDuo: DuoProps;
  secondDuo: DuoProps;
  match: MatchProps;
  isTiebreakGame: boolean;
};

export function Scoreboard() {
  const { match, firstDuo, secondDuo, setPageStep } = useScoreboardData();

  const [initialGameData, setInitialGameData] = useState<ScoreboardStateProps>({
    firstDuo,
    secondDuo,
    match,
    isTiebreakGame: false,
  });

  const [scoreboardState, setScoreboardState] =
    useState<ScoreboardStateProps>(initialGameData);

  const [scoreboardUndoState, setScoreboardUndoState] =
    useState<ScoreboardStateProps>(initialGameData);

  const [sets, setSets] = useState([]);

  const handleResetMatch = () => {
    setScoreboardState(initialGameData);
    setScoreboardUndoState(initialGameData);
    setSets([]);
  };

  const handleUndo = () => {
    setScoreboardState(scoreboardUndoState);
  };

  const handlePointFirstDuo = (currentPointNumber: number) => {
    setScoreboardState((prevState) => ({
      ...prevState,
      firstDuo: {
        ...prevState.firstDuo,
        currentPointNumber,
      },
    }));
  };

  const handlePointSecondDuo = (currentPointNumber: number) => {
    setScoreboardState((prevState) => ({
      ...prevState,
      secondDuo: {
        ...prevState.secondDuo,
        currentPointNumber,
      },
    }));
  };

  const handleGameFirstDuo = () => {
    setScoreboardState((prevState) => ({
      ...prevState,
      firstDuo: {
        ...prevState.firstDuo,
        gamesWon: prevState.firstDuo.gamesWon + 1,
      },
    }));
  };

  const handleGameSecondDuo = () => {
    setScoreboardState((prevState) => ({
      ...prevState,
      secondDuo: {
        ...prevState.secondDuo,
        gamesWon: prevState.secondDuo.gamesWon + 1,
      },
    }));
  };

  const handleChangeDuoServer = () => {
    if (
      scoreboardState.firstDuo.playerOne.isServing ||
      scoreboardState.firstDuo.playerTwo.isServing
    ) {
      setScoreboardState((prevState) => ({
        ...prevState,
        firstDuo: {
          ...prevState.firstDuo,
          playerOne: {
            ...prevState.firstDuo.playerOne,
            isServing: false,
          },
          playerTwo: {
            ...prevState.firstDuo.playerTwo,
            isServing: false,
          },
        },
      }));
    } else {
      setScoreboardState((prevState) => ({
        ...prevState,
        secondDuo: {
          ...prevState.secondDuo,
          playerOne: {
            ...prevState.secondDuo.playerOne,
            isServing: false,
          },
          playerTwo: {
            ...prevState.secondDuo.playerTwo,
            isServing: false,
          },
        },
      }));
    }
  };

  const handleChangeFirstDuoPlayerServe = () => {
    if (scoreboardState.firstDuo.playerOne.isServing) {
      setScoreboardState((prevState) => ({
        ...prevState,
        firstDuo: {
          ...prevState.firstDuo,
          playerOne: {
            ...prevState.firstDuo.playerOne,
            isServing: false,
          },
          playerTwo: {
            ...prevState.firstDuo.playerTwo,
            isServing: true,
          },
        },
      }));
    } else if (scoreboardState.firstDuo.playerTwo.isServing) {
      setScoreboardState((prevState) => ({
        ...prevState,
        firstDuo: {
          ...prevState.firstDuo,
          playerOne: {
            ...prevState.firstDuo.playerOne,
            isServing: true,
          },
          playerTwo: {
            ...prevState.firstDuo.playerTwo,
            isServing: false,
          },
        },
      }));
    }
  };

  const handleChangeSecondDuoPlayerServe = () => {
    if (scoreboardState.secondDuo.playerOne.isServing) {
      setScoreboardState((prevState) => ({
        ...prevState,
        secondDuo: {
          ...prevState.secondDuo,
          playerOne: {
            ...prevState.secondDuo.playerOne,
            isServing: false,
          },
          playerTwo: {
            ...prevState.secondDuo.playerTwo,
            isServing: true,
          },
        },
      }));
    } else if (scoreboardState.secondDuo.playerTwo.isServing) {
      setScoreboardState((prevState) => ({
        ...prevState,
        secondDuo: {
          ...prevState.secondDuo,
          playerOne: {
            ...prevState.secondDuo.playerOne,
            isServing: true,
          },
          playerTwo: {
            ...prevState.secondDuo.playerTwo,
            isServing: false,
          },
        },
      }));
    }
  };

  const validateFirstDuoPoint = () => {
    setScoreboardUndoState(scoreboardState);

    switch (scoreboardState.firstDuo.currentPointNumber) {
      case 15:
        handlePointFirstDuo(30);
        return;
      case 30:
        handlePointFirstDuo(40);
        return;
      case 40:
        handlePointFirstDuo(0);
        handleGameFirstDuo();
        return;
      default:
        handlePointFirstDuo(15);
        return;
    }
  };

  const validateSecondDuoPoint = () => {
    setScoreboardUndoState(scoreboardState);

    switch (scoreboardState.secondDuo.currentPointNumber) {
      case 15:
        handlePointSecondDuo(30);
        return;
      case 30:
        handlePointSecondDuo(40);
        return;
      case 40:
        handlePointSecondDuo(0);
        handleGameSecondDuo();
        return;
      default:
        handlePointSecondDuo(15);
        return;
    }
  };

  useEffect(() => {
    if (
      scoreboardState.firstDuo.gamesWon !==
      scoreboardUndoState.firstDuo.gamesWon
    ) {
      handleChangeFirstDuoPlayerServe();
    }
  }, [scoreboardState.firstDuo.currentPointNumber]);

  useEffect(() => {
    if (
      scoreboardState.secondDuo.gamesWon !==
      scoreboardUndoState.secondDuo.gamesWon
    ) {
      handleChangeSecondDuoPlayerServe();
    }
  }, [scoreboardState.secondDuo.currentPointNumber]);

  useEffect(() => {
    if (
      scoreboardState.firstDuo.gamesWon === 7 ||
      scoreboardState.secondDuo.gamesWon === 7
    ) {
      setSets((prevState) => [
        ...prevState,
        {
          firstDuo: scoreboardState.firstDuo.gamesWon,
          secondDuo: scoreboardState.secondDuo.gamesWon,
        },
      ]);
      setScoreboardState((prevState) => ({
        ...prevState,
        firstDuo: {
          ...prevState.firstDuo,
          gamesWon: 0,
        },
        secondDuo: {
          ...prevState.secondDuo,
          gamesWon: 0,
        },
      }));
    }

    if (
      scoreboardState.match.numberOfSets === 1 &&
      scoreboardState.firstDuo.gamesWon === 7
    ) {
      alert(
        `Fim de jogo! Vitória da Dupla ${firstDuo.playerOne.name}/${firstDuo.playerTwo.name} por ${scoreboardState.firstDuo.gamesWon} games a ${scoreboardState.secondDuo.gamesWon}.`
      );
      setPageStep(0);
    }

    if (
      scoreboardState.match.numberOfSets === 3 &&
      sets.length === 2 &&
      sets[0].firstDuo > sets[0].secondDuo &&
      sets[1].firstDuo > sets[1].secondDuo
    ) {
      alert(
        `Fim de jogo! Vitória da Dupla ${firstDuo.playerOne.name}/${firstDuo.playerTwo.name}.`
      );
      setPageStep(0);
    }

    if (
      scoreboardState.match.numberOfSets === 1 &&
      scoreboardState.secondDuo.gamesWon === 7
    ) {
      alert(
        `Fim de jogo! Vitória da Dupla ${secondDuo.playerOne.name}/${secondDuo.playerTwo.name} por ${scoreboardState.firstDuo.gamesWon} games a ${scoreboardState.secondDuo.gamesWon}.`
      );
      setPageStep(0);
    }

    if (
      scoreboardState.match.numberOfSets === 3 &&
      sets.length === 2 &&
      sets[0].secondDuo > sets[0].firstDuo &&
      sets[1].secondDuo > sets[1].firstDuo
    ) {
      alert(
        `Fim de jogo! Vitória da Dupla ${secondDuo.playerOne.name}/${secondDuo.playerTwo.name}.`
      );
      setPageStep(0);
    }

    if (
      scoreboardState.match.numberOfSets === 3 &&
      sets.length === 3 &&
      sets[2].secondDuo > sets[2].firstDuo
    ) {
      alert(
        `Fim de jogo! Vitória da Dupla ${secondDuo.playerOne.name}/${secondDuo.playerTwo.name}.`
      );
      setPageStep(0);
    }

    if (
      scoreboardState.match.numberOfSets === 3 &&
      sets.length === 3 &&
      sets[2].firstDuo > sets[2].secondDuo
    ) {
      alert(
        `Fim de jogo! Vitória da Dupla ${firstDuo.playerOne.name}/${firstDuo.playerTwo.name}.`
      );
      setPageStep(0);
    }
  }, [scoreboardState.firstDuo.gamesWon, scoreboardState.secondDuo.gamesWon]);

  return (
    <S.ScoreboardWrapper>
      <S.RowButtons>
        <S.UndoButton
          disabled={scoreboardState === scoreboardUndoState}
          onClick={() => handleUndo()}
        >
          Desfazer
        </S.UndoButton>
        <S.ResetButton onClick={() => handleResetMatch()}>
          Resetar partida
        </S.ResetButton>
      </S.RowButtons>
      <Text>{`${match.name} | Beach Tennis` || "Partida sem nome"}</Text>
      <Text>Placar</Text>
      <S.TeamRowWrapper>
        <S.TeamWrapper>
          <S.PlayerName
            isServing={scoreboardState.firstDuo.playerOne.isServing}
          >
            {firstDuo.playerOne.name}
          </S.PlayerName>
          <S.PlayerName
            isServing={scoreboardState.firstDuo.playerTwo.isServing}
          >
            {firstDuo.playerTwo.name}
          </S.PlayerName>
        </S.TeamWrapper>
        {sets.map((set, index) => {
          return (
            <S.Number key={index} style={{ background: "black" }}>
              {set?.firstDuo}
            </S.Number>
          );
        })}
        <S.Number style={{ background: "black" }}>
          {scoreboardState.firstDuo.gamesWon}
        </S.Number>
        <S.Number onClick={() => validateFirstDuoPoint()}>
          {scoreboardState.firstDuo.currentPointNumber}
        </S.Number>
      </S.TeamRowWrapper>
      <S.TeamRowWrapper>
        <S.TeamWrapper>
          <S.PlayerName
            isServing={scoreboardState.secondDuo.playerOne.isServing}
          >
            {secondDuo.playerOne.name}
          </S.PlayerName>
          <S.PlayerName
            isServing={scoreboardState.secondDuo.playerTwo.isServing}
          >
            {secondDuo.playerTwo.name}
          </S.PlayerName>
        </S.TeamWrapper>
        {sets.map((set, index) => {
          return (
            <S.Number key={index} style={{ background: "black" }}>
              {set?.secondDuo}
            </S.Number>
          );
        })}
        <S.Number style={{ background: "black" }}>
          {scoreboardState.secondDuo.gamesWon}
        </S.Number>
        <S.Number onClick={() => validateSecondDuoPoint()}>
          {scoreboardState.secondDuo.currentPointNumber}
        </S.Number>
      </S.TeamRowWrapper>
    </S.ScoreboardWrapper>
  );
}

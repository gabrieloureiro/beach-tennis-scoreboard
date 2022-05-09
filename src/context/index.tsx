import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { defaultDuo, defaultGame } from "../constants";

export type PlayerProps = {
  name: string;
  isServing: boolean;
};

export type DuoProps = {
  playerOne: PlayerProps;
  playerTwo: PlayerProps;
};

export type GameProps = {
  gameDescription: string;
  numberOfSets: number;
  isSuperTiebreak: boolean;
};

type ScoreboardDataContextValue = {
  pageStep: number;
  setPageStep: Dispatch<SetStateAction<number>>;
  firstDuo: DuoProps;
  setFirstDuo: Dispatch<SetStateAction<DuoProps>>;
  secondDuo: DuoProps;
  setSecondDuo: Dispatch<SetStateAction<DuoProps>>;
  game: GameProps;
  setGame: Dispatch<SetStateAction<GameProps>>;
};

const ScoreboardDataContext = createContext<ScoreboardDataContextValue>(
  {} as ScoreboardDataContextValue
);

export const useScoreboardData: () => ScoreboardDataContextValue = () =>
  useContext(ScoreboardDataContext);

export const ScoreboardDataProvider = ({ children }) => {
  const [pageStep, setPageStep] = useState(0);

  const [game, setGame] = useState<GameProps>(defaultGame);

  const [firstDuo, setFirstDuo] = useState<DuoProps>(defaultDuo);

  const [secondDuo, setSecondDuo] = useState<DuoProps>(defaultDuo);

  const value = {
    pageStep,
    setPageStep,
    firstDuo,
    setFirstDuo,
    secondDuo,
    setSecondDuo,
    game,
    setGame,
  };

  return (
    <ScoreboardDataContext.Provider value={value}>
      {children}
    </ScoreboardDataContext.Provider>
  );
};

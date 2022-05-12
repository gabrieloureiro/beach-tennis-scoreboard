import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { defaultDuo, defaultMatch } from "../constants";

export type PlayerProps = {
  name: string;
  isServing: boolean;
};

export type DuoProps = {
  playerOne: PlayerProps;
  playerTwo: PlayerProps;
  gamesWon: number;
  setsWon: number;
  currentPointNumber: number;
};

export type MatchProps = {
  name: string;
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
  match: MatchProps;
  setMatch: Dispatch<SetStateAction<MatchProps>>;
};

const ScoreboardDataContext = createContext<ScoreboardDataContextValue>(
  {} as ScoreboardDataContextValue
);

export const useScoreboardData: () => ScoreboardDataContextValue = () =>
  useContext(ScoreboardDataContext);

export const ScoreboardDataProvider = ({ children }) => {
  const [pageStep, setPageStep] = useState(0);

  const [match, setMatch] = useState<MatchProps>(defaultMatch);

  const [firstDuo, setFirstDuo] = useState<DuoProps>(defaultDuo);

  const [secondDuo, setSecondDuo] = useState<DuoProps>(defaultDuo);

  const value = {
    pageStep,
    setPageStep,
    firstDuo,
    setFirstDuo,
    secondDuo,
    setSecondDuo,
    match,
    setMatch,
  };

  return (
    <ScoreboardDataContext.Provider value={value}>
      {children}
    </ScoreboardDataContext.Provider>
  );
};

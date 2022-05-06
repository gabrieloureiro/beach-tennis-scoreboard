import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

export type DuoProps = {
  playerOne: string;
  playerTwo: string;
};

type ScoreboardDataContextValue = {
  pageStep: number;
  setPageStep: Dispatch<SetStateAction<number>>;
  firstDuo: DuoProps;
  setFirstDuo: Dispatch<SetStateAction<DuoProps>>;
  secondDuo: DuoProps;
  setSecondDuo: Dispatch<SetStateAction<DuoProps>>;
  gameDescription: string;
  setGameDescription: Dispatch<SetStateAction<string>>;
};

const ScoreboardDataContext = createContext<ScoreboardDataContextValue>(
  {} as ScoreboardDataContextValue
);

export const useScoreboardData: () => ScoreboardDataContextValue = () =>
  useContext(ScoreboardDataContext);

export const ScoreboardDataProvider = ({ children }) => {
  const [pageStep, setPageStep] = useState(0);

  const [gameDescription, setGameDescription] = useState("");

  const [firstDuo, setFirstDuo] = useState({
    playerOne: "",
    playerTwo: "",
  });

  const [secondDuo, setSecondDuo] = useState({
    playerOne: "",
    playerTwo: "",
  });

  const value = {
    pageStep,
    setPageStep,
    firstDuo,
    setFirstDuo,
    secondDuo,
    setSecondDuo,
    gameDescription,
    setGameDescription,
  };

  return (
    <ScoreboardDataContext.Provider value={value}>
      {children}
    </ScoreboardDataContext.Provider>
  );
};

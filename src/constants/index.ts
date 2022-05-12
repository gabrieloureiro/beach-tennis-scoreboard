export const defaultDuo = {
  playerOne: {
    name: "",
    isServing: false,
  },
  playerTwo: {
    name: "",
    isServing: false,
  },
  gamesWon: 0,
  setsWon: 0,
  currentPointNumber: 0,
};

export const defaultMatch = {
  name: "",
  numberOfSets: 1,
  isSuperTiebreak: false,
};

export const defaultScoreboard = {
  isTiebreakGame: false,
  match: defaultMatch,
  firstDuo: defaultDuo,
  secondDuo: defaultDuo,
};

import { useScoreboardData } from "../../context";
import { Input, Text } from "..";
import Switch from "react-switch";
import * as S from "./styles";

export function ScoreboardForm() {
  const {
    firstDuo,
    setFirstDuo,
    secondDuo,
    setSecondDuo,
    match,
    setMatch,
    setPageStep,
  } = useScoreboardData();

  const isBestOfOne = match.numberOfSets === 1;

  const isBestOfThree = match.numberOfSets === 3;

  const isDisabledToNextStep =
    firstDuo.playerOne.name === "" ||
    firstDuo.playerTwo.name === "" ||
    secondDuo.playerOne.name === "" ||
    secondDuo.playerTwo.name === "" ||
    (!firstDuo.playerOne.isServing && !secondDuo.playerOne.isServing);

  const handleChangeDuoServing = (checked: boolean, isSecondDuo: boolean) => {
    if (!isSecondDuo) {
      setFirstDuo((prevState) => ({
        ...prevState,
        playerOne: {
          ...prevState.playerOne,
          isServing: checked,
        },
      }));
      setSecondDuo((prevState) => ({
        ...prevState,
        playerOne: {
          ...prevState.playerOne,
          isServing: false,
        },
      }));
    } else {
      setFirstDuo((prevState) => ({
        ...prevState,
        playerOne: {
          ...prevState.playerOne,
          isServing: false,
        },
      }));
      setSecondDuo((prevState) => ({
        ...prevState,
        playerOne: {
          ...prevState.playerOne,
          isServing: checked,
        },
      }));
    }
  };

  const handleChangeNumberOfSets = (value: number) => {
    setMatch((prevState) => ({ ...prevState, numberOfSets: value }));
  };

  const handleChangeTiebreak = (isSuperTiebreak: boolean) => {
    setMatch((prevState) => ({ ...prevState, isSuperTiebreak }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setPageStep(1);
  };
  return (
    <S.Form>
      <Text>Informações iniciais da partida</Text>
      <Input
        onChange={(e) =>
          setMatch((prevState) => ({
            ...prevState,
            name: e.target.value,
          }))
        }
        placeholder="Descrição do jogo/campeonato"
      />
      <S.FormRow>
        <S.CheckboxWrapper>
          <S.Checkbox
            onChange={() => handleChangeNumberOfSets(1)}
            checked={isBestOfOne}
          />
          <S.Label>Melhor de 1</S.Label>
        </S.CheckboxWrapper>
        <S.CheckboxWrapper>
          <S.Checkbox
            type="checkbox"
            onChange={() => handleChangeNumberOfSets(3)}
            checked={isBestOfThree}
          />
          <S.Label>Melhor de 3</S.Label>
        </S.CheckboxWrapper>
      </S.FormRow>
      {isBestOfThree && (
        <S.FormRow>
          <S.CheckboxWrapper>
            <S.Checkbox
              onChange={() => handleChangeTiebreak(false)}
              checked={!match.isSuperTiebreak}
            />
            <S.Label>Tiebreak</S.Label>
          </S.CheckboxWrapper>
          <S.CheckboxWrapper>
            <S.Checkbox
              type="checkbox"
              onChange={() => handleChangeTiebreak(true)}
              checked={match.isSuperTiebreak}
            />
            <S.Label>Supertiebreak</S.Label>
          </S.CheckboxWrapper>
        </S.FormRow>
      )}
      <S.Label>Dupla 1</S.Label>
      <Input
        required
        onChange={(e) =>
          setFirstDuo((prevState) => ({
            ...prevState,
            playerOne: {
              ...prevState.playerOne,
              name: e.target.value,
            },
          }))
        }
        placeholder="Digite o nome do jogador"
      />
      <Input
        required
        onChange={(e) =>
          setFirstDuo((prevState) => ({
            ...prevState,
            playerTwo: {
              ...prevState.playerTwo,
              name: e.target.value,
            },
          }))
        }
        placeholder="Digite o nome do jogador"
      />
      <S.FormRow>
        <Switch
          checkedIcon={false}
          uncheckedIcon={false}
          onChange={(checked) => handleChangeDuoServing(checked, false)}
          checked={firstDuo.playerOne.isServing}
        />
        <Text>A dupla 1 começa sacando?</Text>
      </S.FormRow>
      <S.Label>Dupla 2</S.Label>
      <Input
        required
        onChange={(e) =>
          setSecondDuo((prevState) => ({
            ...prevState,
            playerOne: {
              ...prevState.playerOne,
              name: e.target.value,
            },
          }))
        }
        placeholder="Digite o nome do jogador"
      />
      <Input
        required
        onChange={(e) =>
          setSecondDuo((prevState) => ({
            ...prevState,
            playerTwo: {
              ...prevState.playerTwo,
              name: e.target.value,
            },
          }))
        }
        placeholder="Digite o nome do jogador"
      />
      <S.FormRow>
        <Switch
          checkedIcon={false}
          uncheckedIcon={false}
          onChange={(checked) => handleChangeDuoServing(checked, true)}
          checked={secondDuo.playerOne.isServing}
        />
        <Text>A dupla 2 começa sacando?</Text>
      </S.FormRow>
      <S.Button
        onClick={handleSubmit}
        type="submit"
        disabled={isDisabledToNextStep}
      >
        Avançar
      </S.Button>
    </S.Form>
  );
}

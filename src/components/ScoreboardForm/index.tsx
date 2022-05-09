import { useScoreboardData } from "../../context";
import { Input } from "../../components";
import Switch from "react-switch";
import * as S from "./styles";

export function ScoreboardForm() {
  const {
    firstDuo,
    setFirstDuo,
    secondDuo,
    setSecondDuo,
    game,
    setGame,
    setPageStep,
  } = useScoreboardData();

  const firstDuoIsServing =
    firstDuo.playerOne.isServing || firstDuo.playerTwo.isServing;

  const secondDuoIsServing =
    secondDuo.playerOne.isServing || secondDuo.playerTwo.isServing;

  const isBestOfOne = game.numberOfSets === 1;

  const isBestOfThree = game.numberOfSets === 3;

  const isDisabledToNextStep =
    firstDuo.playerOne.name === "" ||
    firstDuo.playerTwo.name === "" ||
    secondDuo.playerOne.name === "" ||
    secondDuo.playerTwo.name === "" ||
    (!firstDuoIsServing && !secondDuoIsServing);

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
    setGame((prevState) => ({ ...prevState, numberOfSets: value }));
  };

  const handleChangeTiebreak = (isSuperTiebreak: boolean) => {
    setGame((prevState) => ({ ...prevState, isSuperTiebreak }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setPageStep(1);
  };
  return (
    <S.Form>
      <S.Text>Informações iniciais da partida</S.Text>
      <Input
        onChange={(e) =>
          setGame((prevState) => ({
            ...prevState,
            gameDescription: e.target.value,
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
              checked={!game.isSuperTiebreak}
            />
            <S.Label>Tiebreak</S.Label>
          </S.CheckboxWrapper>
          <S.CheckboxWrapper>
            <S.Checkbox
              type="checkbox"
              onChange={() => handleChangeTiebreak(true)}
              checked={game.isSuperTiebreak}
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
      <S.FormRow>
        <Switch
          checkedIcon={false}
          uncheckedIcon={false}
          onChange={(checked) => handleChangeDuoServing(checked, false)}
          checked={firstDuoIsServing}
        />
        <S.Text>A dupla 1 começa sacando?</S.Text>
      </S.FormRow>
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
      <S.FormRow>
        <Switch
          checkedIcon={false}
          uncheckedIcon={false}
          onChange={(checked) => handleChangeDuoServing(checked, true)}
          checked={secondDuoIsServing}
        />
        <S.Text>A dupla 2 começa sacando?</S.Text>
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

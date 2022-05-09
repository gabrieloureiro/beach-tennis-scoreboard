import { useScoreboardData } from "../../context";

export function Scoreboard() {
  const { game, firstDuo, secondDuo } = useScoreboardData();
  return <div>index</div>;
}

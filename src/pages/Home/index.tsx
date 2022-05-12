import { Container, Scoreboard, ScoreboardForm } from "../../components";
import { useScoreboardData } from "../../context";

export function Home() {
  const { pageStep } = useScoreboardData();

  return (
    <Container>
      {pageStep === 0 && <ScoreboardForm />}
      {pageStep === 1 && <Scoreboard />}
    </Container>
  );
}

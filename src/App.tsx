import { ScoreboardDataProvider } from "./context";
import { Home } from "./pages/Home";
import { GlobalStyle } from "./styles/global";

export function App() {
  return (
    <ScoreboardDataProvider>
      <Home />
      <GlobalStyle />
    </ScoreboardDataProvider>
  );
}

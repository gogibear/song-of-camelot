import { usePlayer } from '../dojo/hooks/usePlayer';
import HomePage from '../components/pages/HomeScreen';
import Onboarding from '../components/onboarding';

function App() {
  const { player } = usePlayer();

  if (!player) {
    return <Onboarding />;
  }

  return <HomePage />;
}

export default App;
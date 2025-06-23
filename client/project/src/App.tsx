import { useEffect, useState } from 'react';
import { OnboardingView } from '@/components/OnboardingView';
import { MainMapView } from '@/components/MainMapView';
import { usePlayer } from '@/hooks/useDojo';

function App() {
  const [hasPlayer, setHasPlayer] = useState(false);
  const player = usePlayer();

  useEffect(() => {
    setHasPlayer(player !== null);
  }, [player]);

  const handlePlayerCreated = () => {
    setHasPlayer(true);
  };

  return (
    <div className="min-h-screen">
      {hasPlayer ? (
        <MainMapView />
      ) : (
        <OnboardingView onPlayerCreated={handlePlayerCreated} />
      )}
    </div>
  );
}

export default App;
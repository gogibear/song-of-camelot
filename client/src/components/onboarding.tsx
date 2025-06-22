import React from 'react';
import { Button } from './ui/button';
import { useSpawnPlayer } from '../dojo/hooks/useSpawnPlayer';
import { useStarknetConnect } from '../dojo/hooks/useStarknetConnect';

const Onboarding: React.FC = () => {
  const { isInitializing, initializePlayer, error: spawnError, currentStep } = useSpawnPlayer();
  const { handleConnect, status } = useStarknetConnect();

  const handleSpawn = async () => {
    await initializePlayer();
    // The App.tsx will handle navigation once the player object exists
  };

  const renderContent = () => {
    if (status === 'disconnected' || status === 'connecting') {
      return (
        <>
          <p className="mb-6 text-lg">
            Connect your wallet to enter the Isles of Avalon.
          </p>
          <Button
            onClick={handleConnect}
            disabled={status === 'connecting'}
          >
            {status === 'connecting' ? 'Connecting...' : 'Connect Controller'}
          </Button>
        </>
      );
    }

    if (status === 'connected') {
      return (
        <>
          <p className="mb-6 text-lg">
            Your controller is connected. Prepare for your quest and spawn into the world.
          </p>
          <Button
            onClick={handleSpawn}
            disabled={isInitializing}
          >
            {isInitializing ? `${currentStep}...` : 'Begin Quest'}
          </Button>
          {spawnError && <p className="text-red-500 mt-4">{spawnError}</p>}
        </>
      );
    }

    return null;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="p-8 bg-gray-800 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-4 text-yellow-400">Song of Camelot</h1>
        {renderContent()}
      </div>
    </div>
  );
};

export default Onboarding; 
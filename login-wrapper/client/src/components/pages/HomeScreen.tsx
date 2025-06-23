import { Header } from "../header"
import { Button } from "../ui/button";
import { useStarknetConnect } from "../../dojo/hooks/useStarknetConnect";
import { useSpawnPlayer } from "../../dojo/hooks/useSpawnPlayer";
import { usePlayer } from "../../dojo/hooks/usePlayer";
import { useAccount } from "@starknet-react/core"
import { Loader2, Wallet } from "lucide-react"
import { useEffect } from "react"

export default function HomePage() {
  const {
    status,
    isConnecting,
    handleConnect,
  } = useStarknetConnect();

  const { player, isLoading: playerLoading } = usePlayer();
  const {
    initializePlayer,
    isInitializing,
  } = useSpawnPlayer();

  const { connector } = useAccount();

  const isConnected = status === "connected";
  const isLoading = isConnecting || status === "connecting" || isInitializing || playerLoading;

  // Auto-initialize player after connecting controller
  useEffect(() => {
    if (isConnected && !player && !isInitializing && !playerLoading) {
      setTimeout(() => {
        initializePlayer();
      }, 500);
    }
  }, [isConnected, player, isInitializing, playerLoading, initializePlayer]);
  
  // once player is initialized, redirect
  useEffect(() => {
    if (player) {
        window.location.href = 'http://localhost:5173'
    }
  }, [player])


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-gray-900 to-slate-800 flex items-center justify-center">
      <div className="container mx-auto px-4 py-8 max-w-6xl text-center">
        <Header />
        {!isConnected ? (
            <Button
              onClick={handleConnect}
              disabled={isLoading}
              className="px-6 py-3 font-semibold transition-all duration-300 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 shadow-lg shadow-yellow-500/30 disabled:opacity-50 disabled:cursor-not-allowed text-gray-800"
            >
              {(isConnecting || status === "connecting") ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <Wallet className="w-4 h-4 mr-2" />
                  Begin Quest
                </>
              )}
            </Button>
          ) : (
            <div className="text-white">
                {isInitializing ? 'Creating Player...' : 'Player Ready, Redirecting...'}
            </div>
          )
        }
      </div>
    </div>
  )
}
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Coins, Clock } from 'lucide-react';
import { useTiles, usePlayer, useDojo } from '@/hooks/useDojo';
import { TileInteractionModal } from './TileInteractionModal';
import { 
  getTileColorClass, 
  ELEMENT_COLORS, 
  getPlayerTokenBalance, 
  getPlayerElements, 
  calculateClaimableResources,
  mapVisualToLogicalTile,
  getVisualTilesForLogicalTile
} from '@/utils/gameUtils';

export function MainMapView() {
  const [selectedLogicalTileId, setSelectedLogicalTileId] = useState<number | null>(null);
  const [hoveredLogicalTileId, setHoveredLogicalTileId] = useState<number | null>(null);
  const [isHarvesting, setIsHarvesting] = useState(false);
  const tiles = useTiles(); // 9 logical tiles from backend
  const player = usePlayer();
  const { account, systemCalls } = useDojo();

  const handleVisualTileClick = (visualTileIndex: number) => {
    const logicalTileId = mapVisualToLogicalTile(visualTileIndex);
    setSelectedLogicalTileId(logicalTileId);
  };

  const handleVisualTileHover = (visualTileIndex: number) => {
    const logicalTileId = mapVisualToLogicalTile(visualTileIndex);
    setHoveredLogicalTileId(logicalTileId);
  };

  const handleVisualTileLeave = () => {
    setHoveredLogicalTileId(null);
  };

  const handleCloseModal = () => {
    setSelectedLogicalTileId(null);
  };

  const handleHarvest = async () => {
    if (!player || isHarvesting) return;
    
    setIsHarvesting(true);
    try {
      await systemCalls.harvest({ signer: account });
    } catch (error) {
      console.error('Failed to harvest:', error);
    } finally {
      setIsHarvesting(false);
    }
  };

  if (!player) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white">Loading player data...</div>
      </div>
    );
  }

  const playerElements = getPlayerElements(player);
  const claimableResources = calculateClaimableResources(player);
  const hasClaimableResources = claimableResources.primary > 0 || claimableResources.secondary1 > 0 || claimableResources.secondary2 > 0;

  // Create visual tiles array (54 tiles) mapped to logical tiles
  const visualTiles = Array.from({ length: 54 }, (_, index) => {
    const logicalTileId = mapVisualToLogicalTile(index);
    const logicalTile = tiles.find(t => t.tile_id === logicalTileId);
    return {
      visualIndex: index,
      logicalTileId,
      logicalTile
    };
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      {/* HUD */}
      <Card className="fixed top-4 left-4 z-10 p-4 bg-black/60 backdrop-blur-sm border-purple-500/20 min-w-[320px]">
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-white mb-2">Player Status</h2>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className={`${ELEMENT_COLORS[player.primary_element]} text-white font-semibold`}>
                {player.primary_element} (Primary)
              </Badge>
              {player.secondary_elements.map((element) => (
                <Badge key={element} variant="outline" className={`border-2 text-white`}>
                  {element}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-slate-300 mb-2">Token Balances</h3>
            <div className="space-y-1">
              {playerElements.map((element) => (
                <div key={element} className="flex justify-between items-center text-sm">
                  <span className="text-slate-300">{element}:</span>
                  <span className="text-white font-mono">{getPlayerTokenBalance(player, element)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Harvest Section */}
          <div className="border-t border-slate-600 pt-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-slate-300 flex items-center gap-1">
                <Clock className="h-4 w-4" />
                Claimable Resources
              </h3>
              {hasClaimableResources && (
                <Button
                  onClick={handleHarvest}
                  disabled={isHarvesting}
                  size="sm"
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isHarvesting ? (
                    <>
                      <Coins className="h-3 w-3 mr-1 animate-spin" />
                      Harvesting...
                    </>
                  ) : (
                    <>
                      <Coins className="h-3 w-3 mr-1" />
                      Harvest
                    </>
                  )}
                </Button>
              )}
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">{player.primary_element}:</span>
                <span className="text-green-400">+{claimableResources.primary}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{player.secondary_elements[0]}:</span>
                <span className="text-green-400">+{claimableResources.secondary1}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{player.secondary_elements[1]}:</span>
                <span className="text-green-400">+{claimableResources.secondary2}</span>
              </div>
            </div>
          </div>

          {/* Logical Tile Info */}
          {hoveredLogicalTileId !== null && (
            <div className="border-t border-slate-600 pt-3">
              <h3 className="text-sm font-medium text-slate-300 mb-1">
                Control Zone {hoveredLogicalTileId}
              </h3>
              <div className="text-xs text-slate-400">
                Click any tile in this region to fortify
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Main Map */}
      <div className="flex items-center justify-center min-h-screen pl-80">
        <Card className="p-8 bg-black/40 backdrop-blur-sm border-purple-500/20">
          <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-yellow-400 to-purple-400 bg-clip-text text-transparent">
            Realm of Camelot
          </h1>
          
          {/* Visual 6x9 Grid (54 tiles) */}
          <div className="grid grid-cols-9 gap-1 p-4 bg-slate-800/50 rounded-lg">
            {visualTiles.map(({ visualIndex, logicalTileId, logicalTile }) => {
              const isHovered = hoveredLogicalTileId === logicalTileId;
              const colorClass = logicalTile ? getTileColorClass(logicalTile) : 'bg-slate-600';
              
              return (
                <button
                  key={visualIndex}
                  onClick={() => handleVisualTileClick(visualIndex)}
                  onMouseEnter={() => handleVisualTileHover(visualIndex)}
                  onMouseLeave={handleVisualTileLeave}
                  className={`
                    w-12 h-12 rounded border-2 transition-all duration-200
                    hover:scale-110 active:scale-95
                    ${colorClass}
                    ${isHovered ? 'border-white ring-2 ring-white/50' : 'border-slate-600'}
                  `}
                  title={`Visual Tile ${visualIndex} → Control Zone ${logicalTileId}`}
                />
              );
            })}
          </div>
          
          <div className="text-center mt-4 space-y-2">
            <div className="text-slate-400 text-sm">
              Click any tile to fortify its control zone
            </div>
            <div className="text-slate-500 text-xs">
              54 visual tiles mapped to 9 strategic control zones
            </div>
          </div>
        </Card>
      </div>

      {/* Tile Interaction Modal */}
      {selectedLogicalTileId !== null && (
        <TileInteractionModal
          tileId={selectedLogicalTileId}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
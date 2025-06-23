import type { Element, Tile } from '@/types/game';

export const ELEMENTS: Element[] = ['Fire', 'Water', 'Earth', 'Wind', 'Lightning', 'Ice', 'Light', 'Shadow', 'Aether'];

export const ELEMENT_COLORS: Record<Element, string> = {
  Fire: 'bg-red-500',
  Water: 'bg-blue-500',
  Earth: 'bg-amber-600',
  Wind: 'bg-cyan-300',
  Lightning: 'bg-yellow-400',
  Ice: 'bg-blue-200',
  Light: 'bg-yellow-300',
  Shadow: 'bg-purple-900',
  Aether: 'bg-violet-400'
};

export const ELEMENT_HOVER_COLORS: Record<Element, string> = {
  Fire: 'hover:bg-red-600',
  Water: 'hover:bg-blue-600',
  Earth: 'hover:bg-amber-700',
  Wind: 'hover:bg-cyan-400',
  Lightning: 'hover:bg-yellow-500',
  Ice: 'hover:bg-blue-300',
  Light: 'hover:bg-yellow-400',
  Shadow: 'hover:bg-purple-800',
  Aether: 'hover:bg-violet-500'
};

export const ELEMENT_BORDER_COLORS: Record<Element, string> = {
  Fire: 'border-red-600',
  Water: 'border-blue-600',
  Earth: 'border-amber-700',
  Wind: 'border-cyan-400',
  Lightning: 'border-yellow-500',
  Ice: 'border-blue-300',
  Light: 'border-yellow-400',
  Shadow: 'border-purple-800',
  Aether: 'border-violet-500'
};

export function getDominantElement(tile: Tile): Element {
  const influences = {
    Fire: tile.fire_influence,
    Water: tile.water_influence,
    Earth: tile.earth_influence,
    Wind: tile.wind_influence,
    Lightning: tile.lightning_influence,
    Ice: tile.ice_influence,
    Light: tile.light_influence,
    Shadow: tile.shadow_influence,
    Aether: tile.aether_influence,
  };
  
  let maxInfluence = -1;
  let dominantElement: Element = 'Fire';
  
  for (const [element, influence] of Object.entries(influences)) {
    if (influence > maxInfluence) {
      maxInfluence = influence;
      dominantElement = element as Element;
    }
  }
  
  return dominantElement;
}

export function getTileColorClass(tile: Tile): string {
  const dominant = getDominantElement(tile);
  return ELEMENT_COLORS[dominant];
}

export function getTileInfluenceScores(tile: Tile): Record<Element, number> {
  return {
    Fire: tile.fire_influence,
    Water: tile.water_influence,
    Earth: tile.earth_influence,
    Wind: tile.wind_influence,
    Lightning: tile.lightning_influence,
    Ice: tile.ice_influence,
    Light: tile.light_influence,
    Shadow: tile.shadow_influence,
    Aether: tile.aether_influence,
  };
}

export function getPlayerTokenBalance(player: any, element: Element): number {
  if (element === player.primary_element) {
    return player.token_balance_primary;
  } else if (element === player.secondary_elements[0]) {
    return player.token_balance_secondary_1;
  } else if (element === player.secondary_elements[1]) {
    return player.token_balance_secondary_2;
  }
  return 0;
}

export function getPlayerElements(player: any): Element[] {
  return [player.primary_element, ...player.secondary_elements];
}

// Calculate claimable resources based on time elapsed
export function calculateClaimableResources(player: any): { primary: number; secondary1: number; secondary2: number } {
  const now = Math.floor(Date.now() / 1000);
  const timeElapsed = now - player.last_harvest_timestamp;
  const hoursElapsed = timeElapsed / 3600;
  
  // 840 tokens per hour total, split 70/15/15
  const totalTokensPerHour = 840;
  const primaryRate = totalTokensPerHour * 0.7; // 588 per hour
  const secondaryRate = totalTokensPerHour * 0.15; // 126 per hour
  
  return {
    primary: Math.floor(primaryRate * hoursElapsed),
    secondary1: Math.floor(secondaryRate * hoursElapsed),
    secondary2: Math.floor(secondaryRate * hoursElapsed),
  };
}

/**
 * Maps a visual tile position (0-53 in 6x9 grid) to a logical tile ID (0-8)
 * Using Option A: Region Mapping - Each 2x3 block maps to one logical tile
 * 
 * Visual Grid Layout (6x9):
 * [ 0] [ 1] [ 2] [ 3] [ 4] [ 5] [ 6] [ 7] [ 8]
 * [ 9] [10] [11] [12] [13] [14] [15] [16] [17]
 * [18] [19] [20] [21] [22] [23] [24] [25] [26]
 * [27] [28] [29] [30] [31] [32] [33] [34] [35]
 * [36] [37] [38] [39] [40] [41] [42] [43] [44]
 * [45] [46] [47] [48] [49] [50] [51] [52] [53]
 * 
 * Logical Mapping (3x3):
 * [0] [1] [2]
 * [3] [4] [5]
 * [6] [7] [8]
 */
export function mapVisualToLogicalTile(visualTileIndex: number): number {
  const row = Math.floor(visualTileIndex / 9); // 0-5 (6 rows)
  const col = Math.floor((visualTileIndex % 9) / 3); // 0-2 (3 columns of 3)
  
  const logicalRow = Math.floor(row / 2); // 0-2 (3 logical rows)
  const logicalCol = col; // 0-2 (3 logical columns)
  
  return logicalRow * 3 + logicalCol; // 0-8
}

/**
 * Gets the visual tile indices that belong to a logical tile
 */
export function getVisualTilesForLogicalTile(logicalTileId: number): number[] {
  const logicalRow = Math.floor(logicalTileId / 3); // 0-2
  const logicalCol = logicalTileId % 3; // 0-2
  
  const visualTiles: number[] = [];
  
  // Each logical tile covers a 2x3 area in the visual grid
  for (let r = 0; r < 2; r++) {
    for (let c = 0; c < 3; c++) {
      const visualRow = logicalRow * 2 + r;
      const visualCol = logicalCol * 3 + c;
      const visualIndex = visualRow * 9 + visualCol;
      visualTiles.push(visualIndex);
    }
  }
  
  return visualTiles;
}
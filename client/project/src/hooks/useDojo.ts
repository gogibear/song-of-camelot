import { useState, useEffect } from 'react';
import type { DojoContext, Element, Player, Tile } from '@/types/game';

// Mock implementation - replace with actual Dojo integration
const mockAccount = {
  address: '0x1234567890abcdef'
};

let mockPlayer: Player | null = null;
// Changed to 9 tiles (0-8) to match backend
let mockTiles: Tile[] = Array.from({ length: 9 }, (_, i) => ({
  tile_id: i,
  fire_influence: Math.floor(Math.random() * 100),
  water_influence: Math.floor(Math.random() * 100),
  earth_influence: Math.floor(Math.random() * 100),
  wind_influence: Math.floor(Math.random() * 100),
  lightning_influence: Math.floor(Math.random() * 100),
  ice_influence: Math.floor(Math.random() * 100),
  light_influence: Math.floor(Math.random() * 100),
  shadow_influence: Math.floor(Math.random() * 100),
  aether_influence: Math.floor(Math.random() * 100),
}));

const mockSystemCalls = {
  spawn: async ({ signer, primary_element }: { signer: any; primary_element: Element }) => {
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network delay
    
    const allElements: Element[] = ['Fire', 'Water', 'Earth', 'Wind', 'Lightning', 'Ice', 'Light', 'Shadow', 'Aether'];
    const otherElements = allElements.filter(e => e !== primary_element);
    const shuffled = otherElements.sort(() => Math.random() - 0.5);
    const secondary_elements = shuffled.slice(0, 2) as [Element, Element];
    
    mockPlayer = {
      player_id: signer.address,
      primary_element,
      secondary_elements,
      token_balance_primary: 0,
      token_balance_secondary_1: 0,
      token_balance_secondary_2: 0,
      last_harvest_timestamp: Math.floor(Date.now() / 1000),
    };
  },
  
  fortify: async ({ signer, tile_id, element, amount }: { 
    signer: any; 
    tile_id: number; 
    element: Element; 
    amount: number 
  }) => {
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
    
    if (mockPlayer) {
      // Deduct tokens from player
      if (element === mockPlayer.primary_element) {
        mockPlayer.token_balance_primary -= amount;
      } else if (element === mockPlayer.secondary_elements[0]) {
        mockPlayer.token_balance_secondary_1 -= amount;
      } else if (element === mockPlayer.secondary_elements[1]) {
        mockPlayer.token_balance_secondary_2 -= amount;
      }
      
      // Add influence to tile
      const tile = mockTiles[tile_id];
      switch (element) {
        case 'Fire': tile.fire_influence += amount; break;
        case 'Water': tile.water_influence += amount; break;
        case 'Earth': tile.earth_influence += amount; break;
        case 'Wind': tile.wind_influence += amount; break;
        case 'Lightning': tile.lightning_influence += amount; break;
        case 'Ice': tile.ice_influence += amount; break;
        case 'Light': tile.light_influence += amount; break;
        case 'Shadow': tile.shadow_influence += amount; break;
        case 'Aether': tile.aether_influence += amount; break;
      }
    }
  },
  
  harvest: async ({ signer }: { signer: any }) => {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
    
    if (mockPlayer) {
      const now = Math.floor(Date.now() / 1000);
      const timeElapsed = now - mockPlayer.last_harvest_timestamp;
      const hoursElapsed = timeElapsed / 3600;
      
      // 840 tokens per hour total, split 70/15/15
      const totalTokensPerHour = 840;
      const primaryGain = Math.floor(totalTokensPerHour * 0.7 * hoursElapsed);
      const secondaryGain = Math.floor(totalTokensPerHour * 0.15 * hoursElapsed);
      
      mockPlayer.token_balance_primary += primaryGain;
      mockPlayer.token_balance_secondary_1 += secondaryGain;
      mockPlayer.token_balance_secondary_2 += secondaryGain;
      mockPlayer.last_harvest_timestamp = now;
    }
  }
};

export function useDojo(): DojoContext {
  return {
    account: mockAccount,
    components: {
      Player: {},
      Tile: {}
    },
    systemCalls: mockSystemCalls
  };
}

export function usePlayer(): Player | null {
  const [player, setPlayer] = useState<Player | null>(mockPlayer);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setPlayer(mockPlayer);
    }, 100);
    
    return () => clearInterval(interval);
  }, []);
  
  return player;
}

export function useTiles(): Tile[] {
  const [tiles, setTiles] = useState<Tile[]>(mockTiles);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTiles([...mockTiles]);
    }, 100);
    
    return () => clearInterval(interval);
  }, []);
  
  return tiles;
}
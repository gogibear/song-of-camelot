export type Element = 'Fire' | 'Water' | 'Earth' | 'Wind' | 'Lightning' | 'Ice' | 'Light' | 'Shadow' | 'Aether';

export interface Player {
  player_id: string;
  primary_element: Element;
  secondary_elements: [Element, Element];
  token_balance_primary: number;
  token_balance_secondary_1: number;
  token_balance_secondary_2: number;
  last_harvest_timestamp: number;
}

export interface Tile {
  tile_id: number;
  fire_influence: number;
  water_influence: number;
  earth_influence: number;
  wind_influence: number;
  lightning_influence: number;
  ice_influence: number;
  light_influence: number;
  shadow_influence: number;
  aether_influence: number;
}

export interface Account {
  address: string;
}

export interface SystemCalls {
  spawn: (params: { signer: Account; primary_element: Element }) => Promise<void>;
  fortify: (params: { 
    signer: Account; 
    tile_id: number; 
    element: Element; 
    amount: number 
  }) => Promise<void>;
  harvest: (params: { signer: Account }) => Promise<void>;
}

export interface DojoContext {
  account: Account;
  components: {
    Player: any;
    Tile: any;
  };
  systemCalls: SystemCalls;
}
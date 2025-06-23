use starknet::ContractAddress;

#[derive(Copy, Drop, Serde, Introspect)]
#[dojo::model]
#[generate_trait]
pub struct Tile {
    #[key]
    pub tile_id: u32,
    pub fire_influence: u256,
    pub water_influence: u256,
    pub earth_influence: u256,
    pub air_influence: u256,
    pub aether_influence: u256,
    pub wood_influence: u256,
    pub light_influence: u256,
    pub shadow_influence: u256,
    pub iron_influence: u256,
} 
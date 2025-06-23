use starknet::ContractAddress;
use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};
use array::{ArrayTrait, SpanTrait};

use crate::models::player::{Player};
use crate::models::tile::{Tile};
use crate::models::element::{Element};

#[starknet::interface]
trait IActions<T> {
    fn spawn(ref self: T, primary_element: Element);
    fn fortify(ref self: T, tile_id: u32, element: Element, amount: u256);
}

#[dojo::contract]
mod actions {
    use super::{IActions};
    use starknet::{get_caller_address, get_block_timestamp};
    use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};
    use array::{ArrayTrait, SpanTrait};

    use crate::models::player::{Player};
    use crate::models::tile::{Tile};
    use crate::models::element::{Element};

    const INITIAL_TOKEN_BALANCE: u256 = 0;

    #[abi(embed_v0)]
    impl ActionsImpl of IActions<ContractState> {
        fn spawn(ref self: ContractState, primary_element: Element) {
            let world = self.world_dispatcher.read();
            let player_id = get_caller_address();

            let player = world.get_model::<Player>(player_id);
            assert(player.player_id.is_zero(), 'Player already exists');

            // Simple pseudo-randomness for secondary elements
            let mut all_elements = array![
                Element::Fire, Element::Water, Element::Earth, Element::Air, Element::Aether,
                Element::Wood, Element::Light, Element::Shadow, Element::Iron
            ];

            let mut available_elements = array![];
            let mut i = 0;
            loop {
                if i >= all_elements.len() {
                    break;
                }
                if *all_elements.at(i) != primary_element {
                    available_elements.append(*all_elements.at(i));
                }
                i += 1;
            };

            let mut secondary_1_index = (player_id.into() + get_block_timestamp().into()) % available_elements.len();
            let secondary_1 = *available_elements.get(secondary_1_index).unwrap();
            available_elements.remove(secondary_1_index);

            let mut secondary_2_index = (player_id.into() + get_block_timestamp().into() + 1) % available_elements.len();
            let secondary_2 = *available_elements.get(secondary_2_index).unwrap();

            world.set_model(
                Player {
                    player_id,
                    primary_element,
                    secondary_elements: (secondary_1, secondary_2),
                    balance_primary: 0,
                    balance_secondary_1: 0,
                    balance_secondary_2: 0,
                    last_harvest_timestamp: get_block_timestamp()
                }
            );
        }

        fn fortify(ref self: ContractState, tile_id: u32, element: Element, amount: u256) {
            let world = self.world_dispatcher.read();
            let player_id = get_caller_address();

            let mut player = world.get_model::<Player>(player_id);
            assert(!player.player_id.is_zero(), 'Player does not exist');

            let mut tile = world.get_model::<Tile>(tile_id);
            // Check if the tile has been created. For the MVP, we assume they are pre-created.
            // A robust implementation would create the tile if it doesn't exist.
            // assert(tile.tile_id == tile_id, 'Tile does not exist');

            // Determine which balance to check and update
            if element == player.primary_element {
                assert(player.balance_primary >= amount, 'Insufficient primary balance');
                player.balance_primary -= amount;
            } else if element == player.secondary_elements.0 {
                assert(player.balance_secondary_1 >= amount, 'Insufficient secondary 1 balance');
                player.balance_secondary_1 -= amount;
            } else if element == player.secondary_elements.1 {
                assert(player.balance_secondary_2 >= amount, 'Insufficient secondary 2 balance');
                player.balance_secondary_2 -= amount;
            } else {
                panic('Invalid element for player');
            }

            // Update tile influence
            match element {
                Element::Fire => tile.fire_influence += amount,
                Element::Water => tile.water_influence += amount,
                Element::Earth => tile.earth_influence += amount,
                Element::Air => tile.air_influence += amount,
                Element::Aether => tile.aether_influence += amount,
                Element::Wood => tile.wood_influence += amount,
                Element::Light => tile.light_influence += amount,
                Element::Shadow => tile.shadow_influence += amount,
                Element::Iron => tile.iron_influence += amount,
            };

            world.set_model(player);
            world.set_model(tile);
        }
    }
}

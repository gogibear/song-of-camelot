use starknet::ContractAddress;
use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};

use crate::models::player::{Player};

#[starknet::interface]
trait IResource<T> {
    fn harvest(ref self: T);
}

#[dojo::contract]
mod resource {
    use super::IResource;
    use starknet::{get_caller_address, get_block_timestamp};
    use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};
    use integer::u256_safe_div;

    use crate::models::player::{Player};

    const TOKENS_PER_HOUR: u256 = 840;
    const WALLET_CAP: u256 = 10080;
    const SECONDS_PER_HOUR: u64 = 3600;

    #[abi(embed_v0)]
    impl ResourceImpl of IResource<ContractState> {
        fn harvest(ref self: ContractState) {
            let world = self.world_dispatcher.read();
            let player_id = get_caller_address();

            let mut player = world.get_model::<Player>(player_id);
            assert(!player.player_id.is_zero(), 'Player does not exist');

            let current_timestamp = get_block_timestamp();
            let time_elapsed = current_timestamp - player.last_harvest_timestamp;

            if time_elapsed == 0 {
                return;
            }

            let total_tokens_generated = u256_safe_div(
                (time_elapsed as u256) * TOKENS_PER_HOUR, (SECONDS_PER_HOUR as u256)
            );

            if total_tokens_generated == 0 {
                player.last_harvest_timestamp = current_timestamp;
                world.set_model(player);
                return;
            }
            
            let current_total_balance = player.balance_primary + player.balance_secondary_1 + player.balance_secondary_2;
            let remaining_capacity = WALLET_CAP - current_total_balance;

            if remaining_capacity == 0 {
                player.last_harvest_timestamp = current_timestamp;
                world.set_model(player);
                return;
            }

            let tokens_to_add = if total_tokens_generated > remaining_capacity {
                remaining_capacity
            } else {
                total_tokens_generated
            };
            
            let primary_to_add = tokens_to_add * 70 / 100;
            let secondary_to_add = tokens_to_add * 15 / 100;

            player.balance_primary += primary_to_add;
            player.balance_secondary_1 += secondary_to_add;
            player.balance_secondary_2 += secondary_to_add;

            player.last_harvest_timestamp = current_timestamp;
            world.set_model(player);
        }
    }
} 
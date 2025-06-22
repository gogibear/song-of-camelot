use starknet::ContractAddress;

#[derive(Copy, Drop, Serde, IntrospectPacked, Debug)]
#[dojo::model]
pub struct Player {
    #[key]
    pub owner: ContractAddress,
    pub primary_element: u8,
    pub secondary_element: u8,
    pub tertiary_element: u8,
    pub primary_balance: u256,
    pub secondary_balance: u256,
    pub tertiary_balance: u256,
}

#[derive(Copy, Drop, Serde, IntrospectPacked, Debug)]
#[dojo::model]
pub struct Influence {
    #[key]
    pub x: u32,
    #[key]
    pub y: u32,
    #[key]
    pub element: u8,
    pub score: u256,
}

#[starknet::interface]
trait IActions<T> {
    fn spawn(ref self: T, primary_element: u8, secondary_element: u8, tertiary_element: u8);
    fn fortify(ref self: T, x: u32, y: u32, element: u8, amount: u256);
}

#[dojo::contract]
mod actions {
    use super::{IActions, Player, Influence};
    use starknet::{ContractAddress, get_caller_address};
    use dojo::model::ModelStorage;

    const INITIAL_ELEMENT_BALANCE: u256 = 100;

    #[abi(embed_v0)]
    impl ActionsImpl of IActions<ContractState> {
        fn spawn(ref self: ContractState, primary_element: u8, secondary_element: u8, tertiary_element: u8) {
            let owner = get_caller_address();
            let mut world = self.world_default();

            let mut player_model: Player = world.read_model(owner);
            assert(player_model.primary_element == 0, 'Player already spawned');
            
            player_model.owner = owner;
            player_model.primary_element = primary_element;
            player_model.secondary_element = secondary_element;
            player_model.tertiary_element = tertiary_element;
            player_model.primary_balance = INITIAL_ELEMENT_BALANCE;
            player_model.secondary_balance = INITIAL_ELEMENT_BALANCE;
            player_model.tertiary_balance = INITIAL_ELEMENT_BALANCE;

            world.write_model(@player_model);
        }

        fn fortify(ref self: ContractState, x: u32, y: u32, element: u8, amount: u256) {
            let owner = get_caller_address();
            let mut world = self.world_default();

            let mut player: Player = world.read_model(owner);

            if element == player.primary_element {
                assert(player.primary_balance >= amount, 'Insufficient p balance');
                player.primary_balance -= amount;
            } else if element == player.secondary_element {
                assert(player.secondary_balance >= amount, 'Insufficient s balance');
                player.secondary_balance -= amount;
            } else if element == player.tertiary_element {
                assert(player.tertiary_balance >= amount, 'Insufficient t balance');
                player.tertiary_balance -= amount;
            } else {
                assert(false, 'Invalid element');
            }
            
            world.write_model(@player);

            let mut influence: Influence = world.read_model((x, y, element));
            influence.score += amount;
            world.write_model(@influence);
        }
    }

    #[generate_trait]
    impl InternalImpl of InternalTrait {
        fn world_default(self: @ContractState) -> dojo::world::WorldStorage {
            self.world(@"song_of_camelot")
        }
    }
}

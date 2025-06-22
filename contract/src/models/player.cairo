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

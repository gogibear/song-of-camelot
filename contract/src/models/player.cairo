use starknet::ContractAddress;
use super::element::Element;

#[derive(Copy, Drop, Serde, Introspect)]
#[dojo::model]
#[generate_trait]
pub struct Player {
    #[key]
    pub player_id: ContractAddress,
    pub primary_element: Element,
    pub secondary_elements: (Element, Element),
    pub balance_primary: u256,
    pub balance_secondary_1: u256,
    pub balance_secondary_2: u256,
    pub last_harvest_timestamp: u64,
}

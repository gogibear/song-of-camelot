use starknet::ContractAddress;

#[derive(Copy, Drop, Serde, Introspect, Debug, PartialEq)]
#[generate_trait]
pub enum Element {
    Fire,
    Water,
    Earth,
    Air,
    Aether,
    Wood,
    Light,
    Shadow,
    Iron,
} 
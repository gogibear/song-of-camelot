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

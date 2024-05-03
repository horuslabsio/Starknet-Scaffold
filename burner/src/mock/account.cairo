#[starknet::contract]
mod Account {
    #[storage]
    struct Storage {}

    #[constructor]
    fn constructor(ref self: ContractState, public_key: felt252) {}
}

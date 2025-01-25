use contracts::{IHelloStarknetDispatcher, IHelloStarknetDispatcherTrait};
use snforge_std::{ContractClassTrait, DeclareResult, declare};

#[test]
fn test_balance() {
    let contract = match declare("HelloStarknet").unwrap() {
        DeclareResult::Success(class) => class,
        DeclareResult::AlreadyDeclared(class) => class,
    };

    let (contract_address, _) = contract.deploy(@ArrayTrait::new()).unwrap();

    let dispatcher = IHelloStarknetDispatcher { contract_address };

    let balance = dispatcher.get_balance();
    assert(balance == 0, 'Balance is wrong');

    dispatcher.increase_balance(69);

    let updated_balance = dispatcher.get_balance();
    assert(updated_balance == 69, 'Balance wasnt updated correctly');
}

use starknet::ContractAddress;
use starknet::class_hash::ClassHash;

use snforge_std::{ declare, ContractClassTrait, get_class_hash, load };

use burner::burner_deployer::{
    BurnerWalletDeployer,
    IBurnerWalletDeployerDispatcher,
    IBurnerWalletDeployerDispatcherTrait
};
use burner::mock::account::Account;

fn declare_account_contract() -> felt252 {
    let account_class = declare('Account');
    account_class.class_hash.into()
}

fn deploy_contract_to_test(account_class_hash: felt252) -> ContractAddress {
    let burnerDeployer = declare('BurnerWalletDeployer');

    let calldata = array![account_class_hash];
    let burnerDeployerAddress = burnerDeployer.deploy(@calldata).unwrap();
    burnerDeployerAddress
}

fn read_storage(contract_address: ContractAddress, selector: felt252) -> felt252 {
    let loaded = load(contract_address, selector, 1);
    *loaded.at(0)
}

#[test]
fn test_deploy_a_first_account() {
    // -- Arrange
    let account_class_hash = declare_account_contract();
    let burnerDeployerAddress = deploy_contract_to_test(account_class_hash);
    let dispatcher = IBurnerWalletDeployerDispatcher { contract_address: burnerDeployerAddress };

    let public_key = 883045738439352841478194533192765345509759306772397516907181243450667673002;

    // -- Act
    let account_address = dispatcher.deploy_burner_wallet(public_key);

    // -- Assert

    // check that the account has been correctly deployed
    let deployed_class_hash = get_class_hash(account_address).into();
    assert!(account_class_hash == deployed_class_hash, "Account contract was not deployed correctly");

    // check internal storage
    let internal_salt = read_storage(burnerDeployerAddress, selector!("salt"));
    let internal_account_class_hash = read_storage(burnerDeployerAddress, selector!("account_class_hash"));

    assert!(internal_salt == 1, "salt has not been updated");
    assert!(internal_account_class_hash == account_class_hash, "account class hash has not been set correctly");
}

#[test]
fn test_deploy_a_second_account() {
    // -- Arrange
    let account_class_hash = declare_account_contract();
    let burnerDeployerAddress = deploy_contract_to_test(account_class_hash);
    let dispatcher = IBurnerWalletDeployerDispatcher { contract_address: burnerDeployerAddress };

    let public_key = 883092738439352829178194533192765345509759306772397516907181243450667673002;

    let first_account = dispatcher.deploy_burner_wallet(public_key);

    // -- Act
    let second_account = dispatcher.deploy_burner_wallet(public_key);

    // -- Assert

    // be sure that both accounts have not the same address
    assert!(first_account != second_account, "Both accounts have the same address !");

    // check that the account has been correctly deployed
    let deployed_class_hash = get_class_hash(second_account).into();
    assert!(account_class_hash == deployed_class_hash, "Account contract was not deployed correctly");

    // check internal storage
    let internal_salt = read_storage(burnerDeployerAddress, selector!("salt"));

    assert!(internal_salt == 2, "salt has not been updated");
}


use sncast_std::{
    declare, deploy, DeclareResult, DeployResult, get_nonce, DisplayContractAddress,
    DisplayClassHash
};

fn main() {
    let max_fee = 99999999999999999;
    let salt = 0x3;

    let declare_result = declare("HelloStarknet", Option::Some(max_fee), Option::None)
        .expect('contract already declared');

    let nonce = get_nonce('latest');
    let class_hash = declare_result.class_hash;

    println!("Class hash of the declared contract: {}", declare_result.class_hash);

    let deploy_result = deploy(
        class_hash,
        ArrayTrait::new(),
        Option::Some(salt),
        true,
        Option::Some(max_fee),
        Option::Some(nonce)
    )
        .expect('deploy failed');

    println!("Deployed the contract to address: {}", deploy_result.contract_address);
}

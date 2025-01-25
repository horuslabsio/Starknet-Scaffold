use sncast_std::{DeclareResultTrait, EthFeeSettings, FeeSettings, declare, deploy, get_nonce};

fn main() {
    let max_fee = 99999999999999999;
    let salt = 0x3;
    let nonce = get_nonce('latest');

    let declare_result = declare(
        "HelloStarknet",
        FeeSettings::Eth(EthFeeSettings { max_fee: Option::Some(max_fee) }),
        Option::Some(nonce),
    )
        .expect('contract already declared');

    let class_hash = declare_result.class_hash();

    println!("Class hash of the declared contract: {:?}", declare_result.class_hash());

    let deploy_result = deploy(
        *class_hash,
        ArrayTrait::new(),
        Option::Some(salt),
        true,
        FeeSettings::Eth(EthFeeSettings { max_fee: Option::Some(max_fee) }),
        Option::Some(nonce),
    )
        .expect('deploy failed');

    println!("Deployed the contract to address: {:?}", deploy_result.contract_address);
}

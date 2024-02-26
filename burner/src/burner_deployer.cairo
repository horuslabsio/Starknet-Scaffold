#[starknet::interface]
trait IBurnerWalletDeployer<TContractState> {
    fn deploy_burner_wallet(
        ref self: TContractState, public_key: felt252
    ) -> starknet::ContractAddress;
}

#[starknet::contract]
mod BurnerWalletDeployer {
    use core::traits::TryInto;
    use starknet::syscalls::deploy_syscall;

    // OpenZeppelin preset Account class hash (v0.9.0)
    const OZ_ACCOUNT_CLASSHASH: felt252 = 0x01148c31dfa5c4708a4e9cf1eb0fd3d4d8ad9ccf09d0232cd6b56bee64a7de9d;

    #[storage]
    struct Storage {
        account_class_hash: felt252,
        salt: felt252
    }

    #[constructor]
    fn constructor(ref self: ContractState, account_class_hash: felt252) {
        self.salt.write(0);

        if account_class_hash == 0 {
            self.account_class_hash.write(OZ_ACCOUNT_CLASSHASH);
        }
        else {
            self.account_class_hash.write(account_class_hash);
    }
    }

    #[abi(embed_v0)]
    impl BurnerWalletDeployerImpl of super::IBurnerWalletDeployer<ContractState> {
        fn deploy_burner_wallet(ref self: ContractState, public_key: felt252) -> starknet::ContractAddress {
            let account_class_hash: starknet::ClassHash = self.account_class_hash.read().try_into().unwrap();
            let calldata = array![public_key];
            let salt = self.salt.read();

            let (deployed_address, _) = deploy_syscall(
                account_class_hash, salt, calldata.span(), false
            ).unwrap();

            self.salt.write(salt + 1);
            deployed_address
        }
    }
}


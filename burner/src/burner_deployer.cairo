#[starknet::interface]
trait IBurnerWalletDeployer<TContractState> {
    fn deploy_burner_wallet(
        ref self: TContractState, public_key: felt252
    ) -> starknet::ContractAddress;
}

#[starknet::contract]
mod BurnerWalletDeployer {
    use core::array::ArrayTrait;
use core::starknet::SyscallResultTrait;
    use core::traits::TryInto;
    use starknet::syscalls::deploy_syscall;

    const ARGENT_CLASSHASH_V2: felt252 = 0x01a736d6ed154502257f02b1ccdf4d9d1089f80811cd6acad48e6b6a9d1f2003;

    #[storage]
    struct Storage {
        account_class_hash: felt252,
        salt: felt252
    }

    #[constructor]
    fn constructor(ref self: ContractState, class_hash: felt252) {
        self.salt.write(0);
        if class_hash == 0 {
            self.account_class_hash.write(ARGENT_CLASSHASH_V2);
        }
        self.account_class_hash.write(class_hash);
    }

    #[abi(embed_v0)]
    impl BurnerWalletDeployerImpl of super::IBurnerWalletDeployer<ContractState> {
        fn deploy_burner_wallet(ref self: ContractState, public_key: felt252) -> starknet::ContractAddress {
            let account_class_hash: starknet::ClassHash = self.account_class_hash.read().try_into().unwrap();

            let mut calldata = array![public_key];
            if self.account_class_hash.read() == ARGENT_CLASSHASH_V2 {
                calldata.append(0);
            }
            let salt = self.salt.read();

            let result = deploy_syscall(
                account_class_hash, salt, calldata.span(), true
            );
            let (deployed_address, _) = result.unwrap_syscall();

            self.salt.write(salt + 1);
            deployed_address
        }
    }
}


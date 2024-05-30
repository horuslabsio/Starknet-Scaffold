# Starknet-Scaffold Scripts Overview

## Contract  Scripts

Below are scripts provided by `Starknet-Scaffold` for contract management.

### Build Contract

Initiate the contract building process with the following command.
```
npm run build-contracts
```

### Format contracts
Leverage `Scarb’s` native formatting capabilities to tidy up your contracts.
```
npm run format-contracts
```


###  Test contracts
The following comand will kick off the testing sequence for your contracts and receive the corresponding results.
```
npm run test-contracts
```


###  Run custom `starknet-foundry` scripts
To run custom starknet foundry deploy/declare/invoke script, use the specified command, ensure to replace placeholders with actual parameters.
```
npm run contract-scripts --url=<RPC_URL> --account=<ACCOUNT_NAME> <SCRIPT_NAME>
```


###  Generate an SRC-5 interface ID for your contracts
Create an `SRC-5 interface ID` for your contracts using the command provided.
```
npm run generate-interface <PATH_TO_INTERFACE>
```


### Declare Contract
Declaring a contract is an important step to ensure its availability on the network. Once declared, the contract can then be implemented and interacted with.
```
npm run delete-account --url=<RPC_URL> --name=<ACCOUNT_NAME> --network=<alpha-mainnet | alpha-goerli>
```

###  Deploy Account
After `declaring` your contract, you can use the command below to deploy. Make sure to specify the profile from `Scarb.toml` where the name corresponds to your account name. Additionally, you should provide the maximum fee
```
npm run deploy-account --profile=<MY_PROFILE> --name=<ACCOUNT_NAME> --maxfee=<MAX_FEE>
```


### Delete Account
To delete an account run the following command. Please ensure to replace all placeholders with the actual parameters:
```
npm run delete-account --url=<RPC_URL> --name=<ACCOUNT_NAME> --network=<alpha-mainnet | alpha-goerli>
```



###  Starknet-Devnet
Confirm that Docker is installed and running correctly to utilize starknet-devnet effectively.
```
npm run devnet
```


## User Interface Scripts

The following are scripts from `Starknet-Scaffold` for handling the user interface.


### Run Frontend
To run UI, from the `base` repository:
```
npm run start
```



### Run Frontend
For compiling your frontend, in the `root` directory execute:
```
npm run build-ui
```


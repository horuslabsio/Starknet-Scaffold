# Scripts Overview

## Contract Scripts

Below are npx scripts provided by `Starknet-Scaffold` for your smart contract development.

### Build Contract

To build your contracts:
```
npm run build-contracts
```

### Format contracts
Leverage `Scarb’s` native formatting capabilities by running:
```
npm run format-contracts
```

### Test contracts
To run your Starknet Foundry tests:
```
npm run test-contracts
```

### Run custom `starknet-foundry` scripts
To run a custom starknet foundry deploy/declare/invoke script:
```
npm run contract-scripts --url=<RPC_URL> --account=<ACCOUNT_NAME> <SCRIPT_NAME>
```

### Generate an SRC-5 interface ID for your contracts
To generate an `SRC-5 interface ID`, run:
```
npm run generate-interface <PATH_TO_INTERFACE>
```

### Prepare Account for deployment
To prepare your account for deployment, run:
```
npm run prepare-account --url=<RPC_URL> --name=<ACCOUNT_NAME>
```
generates a profile which is added to scarb.toml and can be passed to other commands.

### Deploy Account
To deploy an account:
```
npm run deploy-account --profile=<MY_PROFILE> --name=<ACCOUNT_NAME> --maxfee=<MAX_FEE>
```
where the profile is gotten from scarb.toml, name is the prepared account and maxfee is the specified max fee.

### Delete Account
To delete an account:
```
npm run delete-account --url=<RPC_URL> --name=<ACCOUNT_NAME> --network=<alpha-mainnet | alpha-goerli>
```

### Declare Contract
To declare a Starknet contract:
```
npm run delete-account --url=<RPC_URL> --name=<ACCOUNT_NAME> --network=<alpha-mainnet | alpha-goerli>
```

###  Starknet-Devnet
Confirm that Docker is installed and running to use starknet-devnet. To run devnet:
```
npm run devnet
```

## User Interface Scripts

The following are scripts from `Starknet-Scaffold` for handling the user interface.

### Run Frontend
To run UI, from the base repository:
```
npm run start
```

### Run Frontend
To build your frontend, from the base repository run:
```
npm run build-ui
```


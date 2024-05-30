# Scaffold Scripts

A detailed breakdown of available scripts

## Contract Scripts

Here are the available script commands in Starknet-Sca

## Build Contract

The following command will `cd contracts` and execute `scarb build`

```
npm run build-contracts
```

## Format contracts

Formatting contracts utilizes Scarb in-built formatter.

```
npm run build-contracts
```


## Test contracts

This initiates the testing process for your contracts and retruns the approraite result

```
npm run test-contracts
```


## Run custom starknet foundry scripts

This command will run the foundry scripts 
```
npm run contract-scripts --url=<RPC_URL> --account=<ACCOUNT_NAME> <SCRIPT_NAME>
```



## Generate an SRC-5 interface ID for your contracts
```
npm run generate-interface <PATH_TO_INTERFACE>
```



## Deploy Account

A contract can be depolyed on Starknet using the flowing command:
Ensure to provide profile which is found in `Scarb.toml` name is your account name and then supply the maxFee 
Max fee will be automatically computed if --max-fee <MAX_FEE> is not passed.
```
npm run deploy-account --profile=<MY_PROFILE> --name=<ACCOUNT_NAME> --maxfee=<MAX_FEE>
```



##  Starknet-Devnet

Please ensure docker is successfully installed to run starknet-devnet

```
npm run devnet
```





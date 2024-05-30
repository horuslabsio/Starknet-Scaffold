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

To deploy a contract, you can use the command below. Make sure to specify the profile from Scarb.toml, where the name corresponds to your account name. Additionally, you should provide the maximum fee
```
npm run deploy-account --profile=<MY_PROFILE> --name=<ACCOUNT_NAME> --maxfee=<MAX_FEE>
```



##  Starknet-Devnet

It’s important to verify that Docker has been properly installed to ensure the functionality of starknet-devnet.
```
npm run devnet
```





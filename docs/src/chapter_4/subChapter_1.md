# Deployer

The scaffold deployer is a simple tool for seamlessly deploying smart contracts to Starknet testnet and mainnet.

This tools interface consists of two sections; the declare and deploy section.

## Declare section

This section is for declaring the contract by inputing the Contract Class JSON file (Sierra) and the Compiled Contract Class JSON file (CASM). During declaration, a class hash is returned which can be used to deploy the contract.

## Deploy section

This is for deploying a declared contract. For deploying a contract it takes in the class hash and constructor arguments as parameters.

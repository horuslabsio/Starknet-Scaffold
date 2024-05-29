# Spinning up and using Devnet

## Introduction

Starknet Devnet is a development network (devnet) implemented in Rust, similar to the Python-based starknet-devnet.With Devnet, you can simulate Starknet in the comfort of your local network. Fork mainnet/testnet to interact with real-world smart contracts, while maintaining isolation.

## Characteristics

1. Simulate Starknet in the comfort of your local network. Fork mainnet/testnet to interact with real-world smart contracts, while maintaining isolation.

2. Gas price, predeployed accounts, chain ID... All of this and more can be configured according to your needs. Once your work is done, dump Devnet into a file and later load it to continue where you left off.

3. Unlike its Pythonic predecessor, this program is built in Rust to ensure a better performance and overall user experience.

The Starknet Scaffold provides a simple script to help spin devnet up.

## Prerequisites:

1. Docker Installation: Docker has to be installed for the script to work.

## Run Starknet-Devnet

Ensure to have Docker installed. To run starknet-devnet:

```
npm run devnet
```

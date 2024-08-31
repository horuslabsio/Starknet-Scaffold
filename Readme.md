# 🏗 STARKNET-SCAFFOLD

🧪 An open-source, up-to-date toolkit for building decentralized applications (dapps) on Starknet. It's designed to make it easier for developers to create and deploy smart contracts and build user interfaces that interact with those contracts.

⚙️ Built using NextJS, Starknet.js, Starknet-React, Starknetkit, Typescript, Scarb, and Starknet-Foundry.

## REQUIREMENTS

Before you begin, you need to install the following tools:

- [Node (v18 LTS)](https://nodejs.org/en/download/)
- [Rust](https://www.rust-lang.org/tools/install)
- [Git](https://git-scm.com/downloads)

## QUICK START

To get started with Starknet-Scaffold, Clone this repo:

```
git clone git@github.com:horuslabsio/Starknet-Scaffold.git
cd Starknet-Scaffold
```

Or install using create-starknet-app (recommended).

PS: defaults to debugger mode, if no type is specified.

## FEATURES

### Contract Section

Scripts exists to make your life easier! Here are available scripts and features:
| Feature | Available |
| :---: | :---: |
| Build Contract | ✅ |
| Format Contract | ✅ |
| Verify Contract | ✅ |
| Run custom scripts | ✅ |
| Generate SRC5 Interface | ✅ |
| Prepare Account | ✅ |
| Deploy Account| ✅ |
| Delete Account | ✅ |
| Declare Contract | ✅ |
| Deploy Contract | ✅ |
| Devnet spin up | ✅ |
| Burner wallets for debugging | ✅ |
| Starknet contract Deployer | ✅ |
| sepETH/sepSTRK faucet | ✅ |
| Cairo Wikipedia | ✅ |

### Dojo Section

Scripts to make building with Dojo easier! Here are available scripts and features:
| Feature | Available |
| :---: | :---: |
| Initialize Dojo Project | ✅ |
| Build Dojo Project | ✅ |
| Deploy Katana | ✅ |
| Migrate Dojo Project | ✅ |

### UI Section

UI components, to spin up faster UIs. Any missing UI component you'd like to see? please open a PR:)
| Feature | Available |
| :---: | :---: |
| Connect button & Custom Wallet Modal | ✅ |
| Address bar (Displays StarknetID) | ✅ |
| Transactions List | ✅ |
| modal to copy/disconnect/view account | ✅ |
| Display account balance | ✅ |
| Switch/display network | ✅ |
| App Light/Dark mode | ✅ |
| Burner wallet UI| ✅ |

## USAGE

### Contract Section

The `contract` folder contains all the tools needed to write, build, test and deploy your Starknet smart contracts. It is built with Scarb and Starknet Foundry. Here are common operations you can perform on your contracts:

#### Build contracts

To build your smart contracts, from the base repository run:

```
npm run build-contracts
```

#### Format contracts

Scarb comes with an in-built cairo formatter. To utilize it run:

```
npm run format-contracts
```

#### Verify contracts

To verify your smart contracts, from the base repository run:

```
npm run verify-contracts --contract-address=<CONTRACT_ADDRESS> --contract-name=<CONTRACT_NAME> --network=<NETWORK>
```

#### Test contracts

To run your tests:

```
npm run test-contracts
```

#### Run custom starknet foundry scripts

To run a custom starknet foundry deploy/declare/invoke script:

```
npm run contract-scripts <SCRIPT_NAME> --url=<RPC_URL>
```

#### Generate an SRC-5 interface ID for your contracts

To generate an interface ID, run:

```
npm run generate-interface <PATH_TO_INTERFACE>
```

#### Prepare Account for deployment

To prepare your account for deployment, run:

```
npm run prepare-account --url=<RPC_URL> --name=<ACCOUNT_NAME> <PROFILE_NAME>
```

generates a profile which is added to `scarb.toml` and can be passed to other commands.

#### Deploy Account

To deploy an account:

```
npm run deploy-account --profile=<MY_PROFILE> --name=<ACCOUNT_NAME> --feetoken=<FEE_TOKEN> --maxfee=<MAX_FEE>
```

where the `profile` is gotten from `snfoundry.toml`, `name` is the prepared account and `maxfee` is the specified max fee.

#### Delete Account

To delete an account:

```
npm run delete-account --profile=<MY_PROFILE> --accountfile=<PATH_TO_ACCOUNT_FILE> --name=<ACCOUNT_NAME> --network=<alpha-mainnet | alpha-goerli>
```

#### Declare Contract

To declare a contract:

```
npm run declare-contract --profile=<MY_PROFILE> --contract=<CONTRACT_NAME> --feetoken=<FEE_TOKEN>
```

#### Deploy Contract

To deploy a contract:

```
npm run deploy-contract --profile=<MY_PROFILE> --feetoken=<FEE_TOKEN> --class=<CONTRACT_CLASSHASH>
```

#### Run Starknet-Devnet

Ensure to have Docker installed. To run starknet-devnet:

```
npm run devnet
```

### Dojo Section

The `dojo-contracts` folder contains all the tools needed to write, build, test and dojo projects. It is built with sozo and katana. Here are common operations you can perform on your dojo contracts.

#### Initialize Dojo Project

To initialize a dojo project, from the base repository:

```
npm run initialize-dojo --name=<PROJECT_NAME>
```

#### Build Dojo Project

To build your dojo project, from the base repository run:

```
npm run build-dojo --name=<PROJECT_NAME>
```

### Deploy Katana

To build deploy katana, from the base repository run:

```
npm run deploy-dojo-katana --name=<PROJECT_NAME>
```

#### Migrate Dojo Project

To migrate your dojo project, from the base repository run:

```
npm run migrate-dojo --name=<PROJECT_NAME>
```

### UI SECTION

The `frontend` section contains all UI components. Built using NextJS, Starknet.js, Starknet-React, Starknetkit, and Typescript.

#### Run UI

To run UI, from the base repository:

```
npm run start
```

#### Build UI

To build your frontend, from the base repository run:

```
npm run build-ui
```

## DOCUMENTATION

Documentations of tools used in this scaffold:

1. [Scarb](https://docs.swmansion.com/scarb/docs.html)
2. [Starknet Foundry](https://foundry-rs.github.io/starknet-foundry/index.html)
3. [Nextjs](https://nextjs.org/docs)
4. [Starknetjs](https://www.starknetjs.com/docs/API/)
5. [Starknet-React](https://starknet-react.com/docs/getting-started)
6. [Starknetkit](https://www.starknetkit.com/docs/getting-started)

## HOW TO CONTRIBUTE TO STARKNET-SCAFFOLD

We welcome contributions to Starknet-Scaffold!

Please see [CONTRIBUTING.MD](https://github.com/argentlabs/Starknet-Scaffold/blob/main/CONTRIBUTING.md) for more information and guidelines for contributing to Starknet-Scaffold.

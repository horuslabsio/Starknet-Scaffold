# Burner wallet UI

Burner wallets are temporary wallets that can be generated and used during the course of development. Burner wallets can be generated and connected in the burner page. Burner wallets are only supported on the Sepolia network and a user can only only generate a maximum of 5 wallets at a time.

The burner wallet UI shows the ETH and STRK balance which is 0.000 initially and also shows the address which can be easily copied by clicking the copy button. The wallet can be easily funded. The component also has connect button that connects the burner wallet to the dapp.

Once the burner wallet has been connected, two buttons are exposed, a send button and an execute button. The Send button pops out a modal to help to send either ETH or STRK. While the execute button pops out a modal which has a form that allows the user to type in the contract address, function name and arguments. Once the form is submitted, the function call is executed.

## Import

```
import BurnerWallet from "~/components/BurnerWallet/BurnerWallet";
```

## Usage

```
 <BurnerWallet wallet={wallet} />
```

## Props

```
type Wallet = {
  address: string;
  publicKey: string;
  privateKey: string;
};
```

| Prop   | Type   | Description                                                              |
| :----- | :----- | :----------------------------------------------------------------------- |
| wallet | wallet | Generated burner wallet that holds the address, publicKey and privateKey |

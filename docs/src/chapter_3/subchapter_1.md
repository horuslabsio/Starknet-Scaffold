# Connect Button

A custom connect button is located in the header of the page, facilitating the connection of a user's Starknet wallet to the dapp. When clicked, a custom wallet modal appears at the center of the screen.

## Connect Wallet Modal

The connect wallet modal is a UI component that appears when the connect button is clicked. This component consists of an overlay that spans across the screen and a modal positioned at the center of the overlay. Its primary function is to allow users to select the wallet they wish to use to connect to the dapp.

The modal is divided into two parts. The left side lists some popular Starknet wallets available for use, such as:

1. Argent X
2. Braavos
3. Argent Web Wallet
4. Argent (mobile)
5. Bitget
6. OKX

When any of these options are clicked, a modal from the selected wallet (if installed) opens, allowing the user to unlock their wallet and initiate the connection. If the connection is successful, the user is then redirected to the dapp.

The right side of the modal serves to educate the user on how wallet connections work.

## Import

```
import ConnectModal from "~/components/ConnectModal";
```

## Usage

```
<ConnectModal isOpen={true} onClose={setIsOpen} />
```

## Props

| Prop    | Type     | Description                                                  |
| :------ | :------- | :----------------------------------------------------------- |
| isOpen  | boolean  | State value prop to monitor whether the modal is open or not |
| onClose | function | Function to handle closing the modal                         |

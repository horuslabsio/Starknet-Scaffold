# Connect Button

A custom connect button is available and is found at the header of the page which aids in the connection of a user's Starknet wallet to the dapp. Once clicked, a custom wallet modal pops up at the center of the screen.

# Connect Wallet Modal

The connect wallet modal is a UI component that appears once the connect button is clicked. This component consists of an overlay which spans across the screen and a modal that is located at the center of the overlay. This component's primary function is to allow users select the wallet they wish to use to connect to the Dapp.

The modal is divided into two parts. The left side of the modal lists some popular starknet wallets available to be used such as;

1. Argent X
2. Braavos
3. Argent Web Wallet
4. Argent(mobile).

When any of these are clicked, a modal from that particular wallet (if installed) is opened and the user then unlocks their wallet and instantiates the connection. If the connection is successful, the user is then redirected to the dapp.

The right side of the modal helps as an aid to educate the user on how wallet connections work.

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

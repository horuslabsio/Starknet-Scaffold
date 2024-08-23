# Connect Button

The custom connect button is located in the header of the page and facilitates the connection of a user's Starknet wallet to the dapp. When clicked, it triggers a custom wallet modal that appears at the center of the screen.

## Connect Wallet Modal

The connect wallet modal is a UI component that appears when the connect button is clicked. Its primary function is to allow users to select the wallet they wish to use to connect to the dapp.

The modal is divided into two sections:

- Left side: Lists popular Starknet wallets available for connection, including:

  1. Argent X
  2. Braavos
  3. Argent Web Wallet
  4. Argent (mobile)
  5. Bitget
  6. OKX

When an option is clicked, the corresponding wallet's modal (if installed) opens, allowing the user to unlock their wallet and connect. Once connected, the user is redirected to the dapp.

- Right side: Provides information to educate users on how wallet connections work.

## Import

```
import ConnectButton from "~/app/components/lib/Connect";
```

## Usage

```
<ConnectButton />
```

## Props

| Prop       | Type   | Description                     |
| :--------- | :----- | :------------------------------ |
| text?      | string | Name of the button (optional)   |
| className? | string | CSS class for button (optional) |

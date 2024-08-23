# Address Bar & User Modal

## Address Bar

The Address Bar displays the address of the connected account. If the connected wallet has a Starknet.id, the Address Bar will display the Starknet.id pfp and name. If not, a Blockies-generated image representation of the connected address is displayed alongside a shortened version of the address.

## User Modal

The User Modal is a component that is triggered from the Address Bar. It provides the following details about the connected account:

- Profile Picture & Address: Displays either the user's Starknet.id profile picture or a Blockies-generated image representing the connected address.
- Wallet Address: Shows the wallet address, which can be copied by the user.
- Account Balance: Displays the current ETH and STRK balance of the connected wallet.
- Disconnect Button: Provides an option for the user to disconnect their wallet from the dapp.

## Import

```
import AddressBar from "~/app/components/lib/AddressBar";
```

## Usage

```
<AddressBar />
```

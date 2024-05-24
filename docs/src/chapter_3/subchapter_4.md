# User modal

This modal is used to copy the connected wallet address, disconnect the wallet from the dapp and view connected account. This modal can be accessed by clicking on the address bar component. The modal contains firstly contains an avatar which is either the starknetId profile picture or a blockies image representation of the connected address.

Then it has a component that either displays the StarknetId name or the connected address. This also contains a copy button to help copy the address or name with one click.

Then lastly it has a component that shows the connected [account balance](subchapter_5.md) and disconnect button that once clicked, it disconnects the current connected wallet from the dapp.

## Import

```
import UserModal from "~/components/UserModal";
```

## Usage

```
<UserModal openConnectedModal={openConnectedModal} address="0x34aA3F359A9D614239015126635CE7732c18fDF3" closeConnectedModal={closeConnectedModal} />
```

## Props

| Prop                | Type     | Description                                                   |
| :------------------ | :------- | :------------------------------------------------------------ |
| openConnectedModal  | boolean  | State value prop to monitor whether the modal is open or not. |
| address             | string   | Address in 0x\_\_\_ format.                                   |
| closeConnectedModal | function | Function to handle the closing of the modal.                  |

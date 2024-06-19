# User modal

This modal contains a copy button for copying the address of the connected wallet, a disconnect button for disconnecting the wallet, and displays the ETH/STRK balance of the connected wallet. You can access this modal by clicking on the address bar component.

## Import

```
import {UserModal} from "~/ui_components/AddressBar";
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

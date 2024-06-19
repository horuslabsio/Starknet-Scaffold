# Address bar (Displays StarknetID)

The Address bar displays the address of the connected account. If the connected wallet has a Starknet.id, the Address bar will display the Starknet.id profile picture and name. Otherwise, it shows a Blockies-generated image representation of the connected address along with a shortened version of the address.

## Import

```
import AddressBar from "~/ui_components/AddressBar";
```

## Usage

```
<AddressBar setOpenConnectedModal={setOpenConnectedModal} />
```

## Props

| Prop                  | Type     | Description                                               |
| :-------------------- | :------- | :-------------------------------------------------------- |
| setOpenConnectedModal | Function | State changing function to control the user modal display |

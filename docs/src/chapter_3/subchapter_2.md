# Address bar (Displays StarknetID)

To indicate that a wallet is connected to the dApp, the header of the page features an Address bar. If the connected wallet has a StarknetID, the Address bar will display the StarknetID profile picture and name. If the wallet does not have a StarknetID, it will instead show a Blockies-generated image representation of the connected address along with a shortened version of the address.

## Import

```
import AddressBar from "~/components/AddressBar";
```

## Usage

```
<AddressBar setOpenConnectedModal={setOpenConnectedModal} />
```

## Props

| Prop                  | Type     | Description                                               |
| :-------------------- | :------- | :-------------------------------------------------------- |
| setOpenConnectedModal | Function | State changing function to control the user modal display |

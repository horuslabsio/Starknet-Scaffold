# Transactions List

This component displays the list of transactions performed by the connected wallet.

Each transaction item shows the following:

1. Transaction status: represented by icons. The status of a transaction can be one of the following: completed, pending, or failed.
2. Transaction ID
3. Transaction description
4. Transaction time and date
5. "See transaction": redirects the user to view the transaction on the Starkscan block explorer, where they can access more information about the transaction.

## Import

```
import TransactionModal from "~/TranscationList/TransactionModal";
```

## Usage

```
<TransactionModal isOpen={true} onClose={setIsOpen} />
```

## Props

| Prop    | Type     | Description                                                  |
| :------ | :------- | :----------------------------------------------------------- |
| isOpen  | boolean  | State value prop to monitor whether the modal is open or not |
| onClose | function | Function to handle closing the modal                         |

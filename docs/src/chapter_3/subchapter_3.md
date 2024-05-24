# Transactions List

This is a component that shows the list of transactions done by the connected wallet.

Each transaction item shows the:

1. Transaction status: which is represented by icons. The status of a transaction can be one of the following; Completed, pending, Failed.
2. Transaction ID
3. Transaction Description
4. Transaction time and date
5. "See transaction" button: which redirects the user to view the transaction on StarkScan block explorer where they can get more information of the transaction.

## Import

```
import TransactionModal from "~/components/TransactionModal";
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

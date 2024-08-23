# Transactions History

This component displays the list of transactions performed by the connected wallet.

Each transaction item shows the following:

- Transaction status: represented by icons. The status of a transaction can be one of the following: `completed`, `pending`, or `failed`.
- User address
- Transaction time and date
- "See transaction": redirects the user to view the transaction on a block explorer.

## Import

```
import TransactionsButton from "~/app/components/lib/Transactions";
```

## Usage

```
 <TransactionsButton />
```

## Props

| Prop       | Type   | Description                     |
| :--------- | :----- | :------------------------------ |
| text?      | string | Name of the button (optional)   |
| className? | string | CSS class for button (optional) |

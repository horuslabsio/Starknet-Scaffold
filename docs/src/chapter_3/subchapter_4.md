# Add Token

The Add Token component enables users to add a custom token to their wallet. To successfully add a token, users need to provide the following information:

- Contract Address: The contract address of the token.
- Token Name: The name of the token.
- Token Symbol: The token's symbol.
- Decimals: The decimal for the token.

Once all fields are filled out, users can click the Add Token button to add the custom token to their wallet.

## Import

```
import AddTokenButton from "~/app/components/lib/AddToken";
```

## Usage

```
<AddTokenButton />
```

## Props

| Prop       | Type   | Description                     |
| :--------- | :----- | :------------------------------ |
| text?      | string | Name of the button (optional)   |
| className? | string | CSS class for button (optional) |

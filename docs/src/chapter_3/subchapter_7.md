# App Light/Dark mode

The theme toggler is used to switch between light and dark modes of the dapp.

## Import

```
import ThemeSwitch from "./Theme";
```

## Usage

```
  <ThemeSwitch className="flex md:hidden dark:transform-none transform dark:translate-none transition-all duration-500 ease-in-out" action={changeTheme} theme={theme} openMenu={openMenu} />
```

## Props

| Prop      | Type     | Description                                      |
| :-------- | :------- | :----------------------------------------------- |
| className | string   | Additional classses to be added to the component |
| action    | function | function to change the theme of the dapp         |
| theme     | string   | specify the current theme of the dapp            |
| openMenu  | boolean  | state value for wether a menu is open or not.    |

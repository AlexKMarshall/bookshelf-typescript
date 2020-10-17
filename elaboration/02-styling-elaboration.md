## Styled components with emotion

If you want to reuse something throughout the app, it's useful to create a
styled version. E.g. a button, or other elements of a design system. A Styled
component can take any number of arguments, each one can be a style object, or a
function from props to a style object, so you can compose elements of static
style, and variable style together, based on multiple props

## CSS prop

If you're just styling a single component then a css prop is easiest To do that
then you need to insert the following at the top of the file

```
/** @jsx jsx */
import {jsx} from '@emotion/core'
```

This is because it compiles to a special jsx factory function instead of
React.createElement. You could use a custom Babel config to sort this out,
rather than the pragma, but Create-React-App doesn't support custom Babel
configs

## Typescript with wrapped components

If you have a wrapper component that does a few things, then passes props to its child, use the proptypes of that child in the proptypes of the wrapper. So the proptypes become `React.FC<NewProps & WrappedElementProps>`

## Typescript with context

Create a type for the context value, then the type of the createContext call should be `YourContextType | undefined` You can then check for undefined in a useMyContext hook that guards against undefined.

## Typescript with cloneElement

Typical use for cloneElement is to add extra props to a child or children passed into the component. But children could also be text, or null, or other things. So you need a type guard using `React.isValidElement` to check for a valid element before trying to clone it. Possibly need to handle arrays there too, but haven't checked that out yet

## Typescript Eslint bug with tuples

Currently specifying a type as an explicit tuple causes eslint to complain with a cannot read property map of undefined error. This is because of changes in TS that eslint/ts-parser hasn't yet sorted out. As a workaround, use objects rather than tuples (in my case here, converting the useState tuple to an object before passing to context value)

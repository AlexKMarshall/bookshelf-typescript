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

## Emotion styled components display name

If you use styled components, then the component name doesn't show up in the react dev tools, only the underlying element. To fix this, import @emotion/styled/macro that way, the name of the styled component will apear in the React Component tree. N.B the component display name property is what shows up there, so if you really want to you can modify it manually, but not sure why you would

## Providing an accessible label

If we create an svg icon, we need to provide some kind of aria-label for instance "loading". We shouldn't rely on the users of our components adding this, so set a default for them. In this case, where we are rendering an animated version of the icon, first we grab the type of the icon (or its props) and create a wrapper component typed to have those props. Then we can destructure off the prop we want to default, and give it a default value, then pass that, and the ...props to the underlying icon

## Destructuring aria props

You can't destructure a prop with a hyphen. All the aria props have hyphens. So you have to alias them to something else first, e.g.

```
const {'aria-label': ariaLabel = "loading"} = props;
return <Icon aria-label={ariaLabel} {...props} />
```

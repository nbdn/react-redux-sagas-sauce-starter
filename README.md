# React / Redux / ReduxSagas / ReduxSauce STARTER

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).


## Installation

1. First clone this repo.
2. Then run `npm install` or `yarn install`
3. When installation is done, run `npm start` or `yarn start`, your browser will automatically open at address `http://localhost:3000`.


## Librairies

This repo is composed of the next libraries :

* `redux` for handling app state
* `react-redux` for easy connect redux with react
* `redux-sagas` for handling async redux actions
* `reduxsauce` for redux action creators
* `react-router` for the app navigation
* `react-router-redux` for handling redux state with navigation



## App directory

Included in an Ignite boilerplate project is the App directory. This is a directory you would normally have to create when using vanilla React.

The inside of the App directory looks similar to the following:

```
App
├── Components
│   └── Styles
├── Config
├── Containers
│   └── Styles
├── Fixtures
├── Images
├── Lib
├── Navigation
│   └── Styles
├── Redux
├── Sagas
├── Services
├── Themes
└── Transforms
```

**Components**
"Dumb" components are stored here. All data is passed into dumb components. These components are often used inside a "Container Component". Container components are described in more detail further on.

**Components ── Styles**
We separate component styles from component functionality. Use this folder to create and store style files that match the naming of your components.

**Config**
All application specific configuration falls in this folder.

**Containers**
A container is what they call a "Smart Component" in Redux. It is a component
which knows about Redux. They are usually used as "Screens".

Also located here are two special containers: `App.js` and `RootContainer.js`.

`App.js` is first component loaded after `index.js`. The purpose of this file is to setup Redux or any other non-visual "global" modules. Having Redux setup here helps with the hot-reloading process in React during development as it won't try to reload your sagas and reducers should your colors change (for example).

`RootContainer.js` is the first visual component in the app. It is the ancestor of all other screens and components.

You'll probably find you can get quite far in an Ignite boilerplate app without even touching these two files. They, of course, belong to you, so when you're ready to add something non-visual, like Firebase, or something visual, like an overlay, you have places for these additions.

**Containers ── Styles**
This `/Containers/Styles` folder will house your container styles. Each container component will likely have a companion styles file, just like `/Components`.

**Fixtures**
TODO: Correct this, the description is outdated.

All key API responses are housed here.

These API responses can be used for several reasons.  _E.G._:
* To bypass logins when building any screen of the application
* To quickly test API parsing in unit tests
* To separate Network from Data concerns while coding

**Images**
Static images used in your project are stored here.

**Lib**
At first glance, this could appear to be a "miscellaneous" folder, but we recommend that you treat this as proving ground for components that could be reusable outside your project.

Maybe you're writing a set of utilities that you could use outside your project, but they're not quite ready or battle tested. This folder would be a great place to put them. They would ideally be pure functions and have no dependencies related to other things in your App folder.

**Redux**
A place to store your Redux files (reducers, stores, etc.).

**Sagas**
A place to store your Sagas (Redux side effects).

**Services**
API calls to external services.

**Themes**
A place to contain styles shared across your project (fonts, colors, etc.).

**Transforms**
A common pattern when working with APIs is to change data so that it plays nice between your app and the API.

We've found this to be the case in every project we've worked on. So much so that we're recommending that you use this folder for these transformations.

Transforms are not necessarily a bad thing (although an API might have you transforming more than you'd like).

For example, you may:

* turn appropriate strings to date objects
* convert snake case to camel case
* normalize or denormalize things
* create lookup tables



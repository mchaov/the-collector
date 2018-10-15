# Scaffolding for Responsive project React components

## Requirements

1. NodeJS 10.x

## Installation

### Prepare the environment

1. [NodeJS](https://nodejs.org/en/download/current/)
1. [YarnPkg](https://yarnpkg.com/en/docs/install)

```shell
# install npmrc globally with yarn
yarn global add npmrc
# or npm 
npm i -g npmrc

# On Windows OS make sure you are using CMD with administrative priviliges
# create new sbtech npmrc
npmrc -c sbtech

# set registry for created sbtech npmrc
npm set registry http://artifactory.sbtech.com:8081/artifactory/api/npm/npm

# !!!CAUTION!!! once you changed the registry all new installed dependencies with yarn would be resolved to below registry 
# to avoid such situations, switch back to default npmrc with after platform installation
# npmrc default
# yarn install some-lib

# and switch back (if needed)
npmrc sbtech
```

### Install globals

1. ```npm install http-server -g```

### Install project

1. Navigate to project folder and run ```yarn install```

## Usage

```shell
yarn build:debug
```

```shell
yarn build:release
```

```shell
yarn test
```

```shell
yarn test:coverage
```

## Build alteration

In order to control the granularity of the bundler scripts, put this property into your project's package.json file. 

```json
  "webpack": {
    "minChunks": 2
  },
```

To enable external build configuration for the pipeline add "widget" field with value "true":

```json
  "widget": "true"
```

## Observables

Please refer to MobX **[DOs and DONTs](https://mobx.js.org/best/pitfalls.html)** and **[Reactions](https://mobx.js.org/best/react.html)**. Also checkout [MobX react dev tools docs](https://github.com/mobxjs/mobx-react-devtools)

## Unit tests, code coverage and linting

To have fully working code coverage do not alter tsconfig.json to remove comments from the code during compile. Comments are removed automatically during build for release.

Testing libraries/frameworks used:

1. [Enzyme](https://github.com/airbnb/enzyme)
1. [Istanbul](https://github.com/gotwarlost/istanbul)
1. [Jest](https://facebook.github.io/jest/docs/en/getting-started.html#content)
1. [React test utils](https://reactjs.org/docs/test-utils.html)
1. [TsLint](https://palantir.github.io/tslint/rules/)

## Build tools (optional)

1. [Typescript](https://www.typescriptlang.org/docs/home.html)
1. [Webpack](https://webpack.js.org/configuration/)
1. [Bundle Analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer)

## Working with React

Props and composition give you all the flexibility you need to customize a component’s look and behavior in an explicit and safe way. Remember that components may accept arbitrary props, including primitive values, React elements, or functions.
If you want to reuse non-UI functionality between components, **extract it** into a separate JavaScript module. The components may import it and use that function, object, or a class, without extending it.

### Excerpt from the React docs you should read:

1. [Thinking in React](https://reactjs.org/docs/thinking-in-react.html)
1. [Rendering Elements](https://reactjs.org/docs/rendering-elements.html)
1. [Components and Props](https://reactjs.org/docs/components-and-props.html)
1. [State and Lifecycle](https://reactjs.org/docs/state-and-lifecycle.html)
1. [Handling Events](https://reactjs.org/docs/handling-events.html)
1. [Conditional Rendering](https://reactjs.org/docs/conditional-rendering.html)
1. [Lists and Keys](https://reactjs.org/docs/lists-and-keys.html)
1. [Forms](https://reactjs.org/docs/forms.html)
1. [Lifting State Up](https://reactjs.org/docs/lifting-state-up.html)
1. **[Composition vs Inheritance](https://reactjs.org/docs/composition-vs-inheritance.html)**

### Advanced

1. [Typechecking With PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html)
1. [Reconciliation](https://reactjs.org/docs/reconciliation.html)
1. [Portals](https://reactjs.org/docs/portals.html)
1. [Higher-Order Components](https://reactjs.org/docs/higher-order-components.html)

### Animating components
1. [Animation](https://reactjs.org/docs/animation.html)
1. [UI Animations with React](https://medium.com/@joethedave/achieving-ui-animations-with-react-the-right-way-562fa8a91935)
1. [Velocity for react](https://github.com/twitter-fabric/velocity-react)
1. [Velocity for react additional docs](https://www.npmjs.com/package/velocity-react)
1. [Velocity Demos](https://react.rocks/example/velocity-react)

## Manage common dependencies

File with the name of the project will be automatically compiled with all common dependencies for your blocks.

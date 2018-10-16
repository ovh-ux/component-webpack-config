# Component Webpack Config

Extensible webpack configuration for the OVH Components.

## Usage

The webpack configuration can be imported and extended in your component. To import the configuration, simply add component-webpack-config as a devDependency :

```js
yarn add -D @ovh-ux/component-webpack-config
```

### Parameters

The following configuration parameters are _mandatory_ :
 - _library_: your component name (used to name the dist files)

## Example

```js
const config = require('@ovh-ux/component-webpack-config');

module.exports = config({
  library: 'my-lib',
}).merge({
    entry: "./src/index.js",
    externals: [
      'angular', // please note that by default peerDependencies are automatically added to the externals
    ]
});
```

# About this folder
This folder holds configuration files for different environments.
These to provide app with different settings based on the current
environment, e.g. to configure different API base urls depending on
when setup run in dev mode or is built for distribution.

This was just done by the generator, so I kept it. Good for long
projects.

```javascript
let react = require('react/addons');
let config = require('/path/to/config');
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    let currentAppEnv = config.appEnv;
  }
}
```

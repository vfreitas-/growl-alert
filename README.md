# Growl Alert

<a href="https://travis-ci.org/vfreitas-/growl-alert">
    <img src="https://travis-ci.org/vfreitas-/growl-alert.svg?branch=master" alt="travis">
</a>

<a href="https://www.npmjs.org/package/growl-alert">
  <img src="https://img.shields.io/npm/v/growl-alert.svg?style=flat" alt="npm">
</a>

<a href="https://david-dm.org/vfreitas-/growl-alert">
  <img src="https://david-dm.org/vfreitas-/growl-alert/status.svg" alt="dependencies Status">
</a>

A simple growl like notification system.

![Example] (https://github.com/vfreitas-/growl-alert/blob/master/example.png)

## Table of Contents

-   [Install](#install)
-   [Usage](#usage)
-   [Examples & Demos](#examples--demos)
-   [API](#api)
-   [Contribute](#contribute)
-   [Whishlist](#whishlist)
-   [Browser Support](#browser-support)

## Install

You can get it on npm

```sh
$ npm install --save growl-alert
```

Then import it with a module bundler like [rollup](http://rollupjs.org/) or [webpack](https://webpack.js.org/)

```javascript
// using ES6 modules
import growl from 'growl-alert'
// you need to import the css too!
// but first you need to configure your bundler to process css files!
import 'growl-alert/dist/growl-alert.css'

// using CommonJS modules
var growl = require('growl-alert')
require('growl-alert/dist/growl-alert.css')
```

There is also an [UMD](https://github.com/umdjs/umd) build available on [unpkg](https://unpkg.com):

```html
<head>
    ...
    <link rel="stylesheet" href="https://unpkg.com/growl-alert/dist/growl-alert.css"></link>
    ...
</head>
<body>
    ...
    <script src="https://unpkg.com/growl-alert"></script>
</body>
```

You can find the library on `window.growl` or just `growl`.

## Usage

You can use the `growl()` function, or one of its shortcuts.

```javascript

//..

growl({text: 'Hello World!', type: 'success'});

growl.success('User Saved!');
growl.error('Somethng gone wrong...');
growl.warning({options...});
growl.info();

```

## Examples & Demos

Soon :)

## API

*option: (default value) type/values description*

- **type**: (*'success'*) ['success', 'error', 'warning', 'info'] Type of the growl-alert
- **text**: The message
- **fadeAway**: (*false*) Boolean: If the growl notification should fade away after x milliseconds
- **fadeAwayTimeout**: (*5000*) Integer: Time in milliseconds.
- **alertBoxLoadedCB**: Function: open callback
- **alertBoxOnCloseCB**: Function: close callback
 
#### You can also define your own default options

`growl.defaults.type = 'error'`

## Contribute

All contributions are welcome.

- Fork the repo on GitHub
- Clone the project to your own machine
- Install the tools necessary for development: `npm install`
- Make your changes and test it: `npm test` 
- Commit it to your own branch
- Push your work back up to your fork
- Submit a pull request with full remarks documenting your changes


## Browser Support

IE 10+</br>
Modern Browsers

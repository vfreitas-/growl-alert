# Growl Alert

A simple growl like notification system.

![Example] (https://github.com/vfreitas-/growl-alert/blob/master/example.png)

## Installation

This lib is registered at bower and npm.

`npm install growl-alert --save`

`bower install growl-alert --save`

## Usage

You can use the global `growl()` function, or one of the shortcuts.

```javascript

//..

growl({text: 'Hello World!', type: 'success'});

growl.success('User Saved!');
growl.error('Somethng gone wrong...');
growl.warning({options...});
growl.info();

```

### options

*option: (default value) type/values description*

- **type**: (*'success'*) ['success', 'error', 'warning', 'info'] Type of the growl-alertw
- **text**: The message
- **fadeAway**: (*false*) Boolean: If the growl notification should fade away after x milliseconds
- **fadeAwayTimeout**: (*5000*) Integer: Time in milliseconds.
- **alertBoxLoadedCB**: Function: open callback
- **alertBoxOnCloseCB**: Function: close callback

## //TODO

- Add position option(bottom-left, bottom-right, top-left, top-right)
- More animations

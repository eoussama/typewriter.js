<p align="center">
    <a href="http://eoussama.github.io/typewriterjs"><img src="docs/assets/img/logo.svg" alt="Logo" width="200px"><a>
    <h1 align="center">TypeWriterJS</h1>
    <h5 align="center">Version 4.0.0</h5>
    <p align="center">A Javascript library for typewriter animations</p>
</p>
<hr>

## Navigation
* [Description](#description)
* [Installation](#installation)
* [Building](#building)
* [Documentation](#documentation)
* [Credits](#credits)


## Description
TypewriterJS offers an easy and hackable way of producing and maintaining typewriter-like animations on text, basic stuff like typing, deleting and moving the cursor around are only at the command of a method call.

## Installation
#### npm
```bash
npm install typewriterjs
```

#### bower
```bash
bower install eo-typewriterjs
```

#### yarn
```bash
yarn add typewriterjs
```

#### cdn
```bash
// cdn here.
```

#### manual
Download the latest version from [here](https://github.com/EOussama/typewriterjs/releases).
Download a specific version from [here](https://github.com/EOussama/typewriterjs/releases).

> The following is only applicable starting from version 4.0.0.
1. Navigate to the `dist` folder inside of the downloaded package.
2. Copy either of `typewriter.js` or `typewriter.min.js` to your project.


## Building
1. Clone the GitHub repository `https://github.com/EOussama/typewriterjs.git`.
2. Run `npm install` to install all the dependencies.
3. Run `npm run prod` to build the package.
4. The production scripts will be placed in the `dist` folder.

## Documentation
### The constructor

```js
TypeWriter (options: Object)
```
This constructor is used to instantiate typewriter objects that are responsible for producing the animations.

### `typewriter` options.

|  Option  |                                     Description                                   | Default value |
|----------|-----------------------------------------------------------------------------------|---------------|
|  target  |  The element you want to perform the animation on must be a valid HTML element.  |   undefined   |
|  speed   |  The time between outputting each character in milliseconds.                       |   1500        |

After instantiating a typewriter object, we can use all sort of method to control and customize the animation, here's a list of available methods.

* rtpe
* delete
* stop
* clear
* moveCursor

### Example
```html
<!-- index.html -->

<!DOCTYPE html>

<html>
    <body>
        <p id="target"></p>
    </body>
</html>
```

```js
// main.js

var tw = new TypeWriter({
    target: document.getElementById('target'),
    speed: 300
});

tw.type({
    script: '_Lorem Ipsum!_',
    endCallback: () => alert('Animation finished!');
});
```

That would output '_Lorem Ipsum!_' in the paragraph element as if it's being written with a scrapped typewriter, each character will take _300 milliseconds_ to be output, and will trigger a function to execute when it's finished, alerting '_Animation finished!_' for the user.

In order to stop the animation at any point, we can utilize the `stop` function;

```js
// main.js

setTimeout(() => {
    tw.stop();
}, 1000);
```

That will stop the animation after a second had passed.

> Checkout the `tests/sandbox/index.html` file for usage examples, or visit [this documentation page](https://eoussama.github.io/typewriterjs/).


## Credits
> Icon made by [**Freepik**](http://www.flaticon.com) from [www.flaticon.com](http://www.flaticon.com)
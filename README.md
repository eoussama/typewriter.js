<p align="center">
    <a href="http://eoussama.github.io/typewriterjs"><img src="assets/logo.svg" alt="Logo" width="200px"><a>
    <h1 align="center">TypeWriterJS</h1>
    <p align="center">A Javascript library for typewriter animations</p>
    <p align="center">
        <img src="https://img.shields.io/github/release/EOussama/typewriterjs.svg">
        <img src="https://img.shields.io/github/downloads/EOussama/typewriterjs/latest/total.svg">
        <img src="https://img.shields.io/github/languages/code-size/EOussama/typewriterjs.svg">
        <img src="https://img.shields.io/github/license/EOussama/typewriterjs.svg">
    </p>
</p>

<hr>

## Navigation

- [Description](#description)
- [Installation](#installation)
- [Building](#building)
- [Usage](#usage)
- [Credits](#credits)

## Description

TypewriterJS is a promise-based virtual typewriter that offers an easy and hackable way of producing and maintaining typewriter-like animations on text, basic stuff like typing, deleting and moving the cursor around are only at the command of a method call.

## Installation

#### npm

```bash
npm install eo-typewriterjs
```

#### bower

```bash
bower install eo-typewriterjs
```

#### yarn

```bash
yarn add eo-typewriterjs
```

#### cdn

```bash
https://cdn.jsdelivr.net/npm/eo-typewriterjs@latest/dist/typewriter.js
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
4. The production script will be placed in the `dist` folder.

## Usage

The following example types the string “Hello, world!”:

`index.js`

```html
<div id="target"></div>
```

`script.js`

```js
var typewriter = new Typewriter("#target");
typewriter.type("Hello, world!");
```

See more use cases [here](./docs/).

## Credits

> Icon made by [**Freepik**](http://www.flaticon.com) from [www.flaticon.com](http://www.flaticon.com)

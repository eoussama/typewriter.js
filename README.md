<p align="center">
    <a href="http://eoussama.github.io/typewriter.js">
      <img src="assets/typewriter.svg" alt="Logo" width="200px">
      <h1 align="center">Typewriter.js</h1>
    </a>
    <p align="center">Typewriting utility for JavaScript</p>
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

## Description

Typewriter.js is your on-the-go, virtual typewriter that offers an easy and hackable way of producing and maintaining typewriter-like animations on text.

## Installation

#### npm

```bash
npm install eo-typewriterjs
```

#### yarn

```bash
yarn add eo-typewriterjs
```

#### cdn

```bash
https://cdn.jsdelivr.net/npm/eo-typewriterjs@latest/dist/typewriter.js
```

## Building

1. Clone the GitHub repository `https://github.com/EOussama/typewriterjs.git`.
2. Run `npm install` to install all the dependencies.
3. Run `npm run build` to build the package.
4. The production script will be placed in the `dist` folder.

## Usage

The following example types the string “Hello, world!”:

`index.html`

```html
<div id="target"></div>
```

`script.js`

```js
var tw = new Typewriter("#target");
tw.type("Hello, world!").start();
```

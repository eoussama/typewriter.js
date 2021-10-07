import Typewriter from "./../../dist/index.js";

const options = {};
const tw = new Typewriter('#target');

tw.type('Hello').type(' World').start();

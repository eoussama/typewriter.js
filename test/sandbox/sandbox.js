import Typewriter from "./../../dist/index.js";

const options = {};
const tw = new Typewriter('#target');

tw.type('Hello').sleep(1000).type(' World').start();

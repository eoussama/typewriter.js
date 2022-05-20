import Typewriter from "./../../dist/index.js";

const tw = new Typewriter();

tw.type('Hi!');
tw.delete(2);

tw.start();

console.log(tw);

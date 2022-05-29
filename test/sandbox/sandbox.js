import Typewriter from "./../../dist/index.js";

const target = document.getElementById('target');
const tw = new Typewriter(target);

tw.type('Hi!');
tw.delete(2);

tw.start();

console.log(tw);

import Typewriter from "./../../dist/index.js";

const options = {};
const tw = new Typewriter('#target');

tw
  .type('Hello,')
  .sleep(600)
  .type(' World')
  .exec(() => new Promise(resolve => {
    setTimeout(() => {
      console.log('exec finished');
      resolve();
    }, 2000);
  }))
  .type('!')
  .start();

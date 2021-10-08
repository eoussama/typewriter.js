import Typewriter from "./../../dist/index.js";

const options = { speed: 1000 };
const tw = new Typewriter('#target', options);

tw
  .type('Hello,', { speed: 500 })
  .sleep(600)
  .type(' World', { step: 3 })
  .exec(() => new Promise(resolve => {
    setTimeout(() => {
      console.log('exec finished');
      resolve();
    }, 2000);
  }))
  .type('!')
  .start();

import Typewriter from "./../../dist/index.js";

const options = { speed: 100 };
const tw = new Typewriter('#target', options);

tw
  .type('Hello,', { speed: 500 })
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

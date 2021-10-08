import Typewriter from "./../../dist/index.js";

const options = { speed: 1000 };
const tw = new Typewriter('#target', options);

tw
  .type('Hllo', { speed: 500 })
  .move(-3).type('e')
  .move(3).sleep(600)
  .type(' World', { step: 3 })
  .exec(() => new Promise(resolve => {
    setTimeout(() => {
      console.log('exec finished');
      resolve();
    }, 2000);
  }))
  .move(-6).type(',')
  .move(6).type('!')
  .start();

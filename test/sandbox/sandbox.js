import Typewriter from "./../../dist/index.js";
import SFX from "./../../dist/assets/audio.js";

const options = {
  speed: 1000,
  audio: { enable: true, src: SFX },
  caret: { enable: true, content: '_/' }
};
const tw = new Typewriter('#target', options);

tw
  .type('Lorem Ipsum', { speed: 100 })
  .delete(6, { step: 2 })
  // .type('Lorem', { speed: 100 })
  // .move(5, { delay: 3000 })
  // .move(-6)
  // .move(2)
  // .move(-500)
  // .move(1000)
  // .move(-1)
  .start();

const start = document.getElementById('start');
const pause = document.getElementById('pause');
const resume = document.getElementById('resume');

start.addEventListener('click', async () => {
  tw.reset();

  setTimeout(() => {
    tw
    // .type('Lorem ipsum dolor sit amet, consectetur adipiscing elit').start();
    tw
      .type('Hzllo', { speed: 200 })
      .move(-3).delete(1).type('e')
      .move(3).sleep(600)
      .type(' World', { step: 3 })
      .exec(() => new Promise(resolve => {
        setTimeout(() => {
          console.log('exec finished');
          tw.config.caret.content = '|';
          resolve();
        }, 2000);
      }))
      .move(-6, { step: 6 }).type(',')
      .move(6).type('!').start();
  }, 100);
});

pause.addEventListener('click', () => {
  tw.pause();
});

resume.addEventListener('click', () => {
  tw.resume();
});

tw.before('move', () => {
  // console.log('before move');
});

tw.after('move', () => {
  // console.log('after move');
});

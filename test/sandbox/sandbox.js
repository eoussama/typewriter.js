import Typewriter from "./../../dist/index.js";
import SFX from "./../../dist/assets/audio.js";

const options = {
  speed: 80,
  audio: { enable: true, src: SFX },
  caret: { enable: true, content: '|' }
};

const tw = new Typewriter('#target', options);
tw.catch(console.log);

const start = document.getElementById('start');
const pause = document.getElementById('pause');
const resume = document.getElementById('resume');

start.addEventListener('click', async () => {
  tw
    /* 
    .type('LO')
    .type('REM_', { classes: ['style'] })
    .type('IPSUM')
    .move(-8, { step: 8 })
    .delete(2)
    .highlight(5, { step: 8 })
    */

    /*
    .type('Hello, my name is Oussama')
    .delete('Oussama'.length, { delay: 500 })
    .type('Oussama', { classes: ['style'] })
    .type('!')
    */

    .type('TEXT')
    .move('start')
    .delete('end', { step: 1, delay: 1000, speed: 1000, done: () => console.info('done') })
    // .move(-3)
    // .highlight(-1)
    // .delete(10, { step: 5, speed: 500, done: () => console.info('done') })
    // .type('TEST', { delay: 500, speed: 1000, step: 1 })
    // .delete(5, { delay: 500, speed: 1000, step: 1 })
    .start();
});

pause.addEventListener('click', () => {
  tw.pause();
});

resume.addEventListener('click', () => {
  tw.resume();
});

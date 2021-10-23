import Typewriter from "./../../dist/index.js";
import SFX from "./../../dist/assets/audio.js";

const options = {
  speed: 100,
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

    .type('LoremIpsum')
    .highlight(-3)
    .highlight(0)
    .start();
});

pause.addEventListener('click', () => {
  tw.pause();
});

resume.addEventListener('click', () => {
  tw.resume();
});

tw.after('highlight', () => console.log('highlighted'));

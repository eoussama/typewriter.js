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
    // .type('Hello, my name is Oussama')
    // .delete('Oussama'.length, { delay: 500 })
    // .type('Oussama', { classes: ['style'] })
    // .type('!')

    .type('Hello')
    .tab()
    .type('World')
    .move(-2)
    .highlight(-4)
    .delete(-2, {delay: 1550, speed: 1000})

    // .type('Hello')
    // .tab()
    // .type('World')
    // .highlight(-4)
    // .delete(2, {delay: 1550, speed: 1000})

    .start();
});

pause.addEventListener('click', () => {
  tw.pause();
});

resume.addEventListener('click', () => {
  tw.resume();
});

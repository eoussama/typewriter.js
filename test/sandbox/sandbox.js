import Typewriter from "./../../dist/index.js";
import SFX from "./../../dist/assets/audio.js";

const options = {
  speed: 80,
  targetAttribute: 'placeholder',
  parseHTML: false,
  audio: { enable: true, src: SFX },
  caret: { enable: true, content: '|' }
};

const tw = new Typewriter('#input', options);
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

    // .type('Hello')
    // .tab()
    // .type('World')
    // .move(-2)
    // .highlight(-4)
    // .delete(-2, {delay: 1550, speed: 1000})

    // .type('Hello')
    // .tab()
    // .tab()
    // .type('World')
    // .highlight(-5, { step: 5 })
    // .delete(2, { delay: 1550, speed: 1000 })

    // .type('void ', { classes: ['blue'] })
    // .type('main', { classes: ['italic'] })
    // .type(' {')
    // .return()
    // .tab()
    // .type('return', { classes: ['magenta'] })
    // .type(' 0;')
    // .return()
    // .type('}')
    // .highlight(-8)

    .type('Hello')
    .highlight(-3)

    .start();
});

pause.addEventListener('click', () => {
  tw.pause();
});

resume.addEventListener('click', () => {
  tw.resume();
});

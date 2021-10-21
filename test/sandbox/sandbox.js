import Typewriter from "./../../dist/index.js";
import SFX from "./../../dist/assets/audio.js";

const options = {
  speed: 500,
  audio: { enable: false, src: SFX },
  caret: { enable: true, content: '|' }
};

const tw = new Typewriter('#target', options);
tw.catch(console.log);

const start = document.getElementById('start');
const pause = document.getElementById('pause');
const resume = document.getElementById('resume');

start.addEventListener('click', async () => {
  tw
    .type('LOREM_IPSUM', { step: 'LOREM_IPSUM'.length })
    .move(-8, { step: 8 })
    .delete(2)
    .highlight(5, { step: 8 })
    .start();

});

pause.addEventListener('click', () => {
  tw.pause();
});

resume.addEventListener('click', () => {
  tw.resume();
});

tw.after('highlight', () => console.log('highlighted'));

import Typewriter from "./../../dist/index.js";
import SFX from "./../../dist/assets/audio.js";

const options = {
  speed: 100,
  // targetAttribute: 'placeholder',
  // parseHTML: false,
  audio: { enable: true, src: SFX },
  caret: { enable: true, content: '|' }
};

const start = document.getElementById('start');
const tw = new Typewriter('#target', options);
tw.catch(console.error);


start.addEventListener('click', async () => {
  tw
    // .type('Hello, my name is Oussama')
    // .delete('Oussama'.length, { delay: 500 })
    // .type('Oussama', { props: { class: ['style'] } })
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

    // .type('void ', { props: { class: ['blue'] } })
    // .type('main', { props: { class: ['italic'] } })
    // .type(' {')
    // .return()
    // .tab()
    // .type('return', { props: { class: ['magenta'] } })
    // .type(' 0;')
    // .return()
    // .type('}')
    // .highlight(-8)

    // .move(-3)
    // .delete('end')

    // .type('LoremIpsum', { props: { title: 'Is this working?', class: ['italic'], style: { color: 'red', 'font-weight': 'bold' } } })
    // .highlight(-3, { repeat: 2, delay: 1000, speed: 300, done: () => console.log('done') })

    // .type('hi')
    // .exec(e => {
    //   console.log({ exec: e });

    //   e.type(' there!')
    //     .highlight(-3);

    //   return Promise.resolve(e);
    // }, { delay: 0 })
    // .type('bop')


    .type('Hello, ')
    .exec(e => {
      e.config.caret.content = '_';
      e.config.audio.enable = false;
      e.config.speed = 1000;
      return e;
    })
    .type('World!')

    .start();
});

tw.after('highlight', () => console.log(tw.getHighlight));

import Typewriter from "./../../dist/index.js";
import SFX from "./../../dist/assets/audio.js";

const options = {
  speed: 80,
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

    // .move(-3)
    // .delete('end')

    // .type('LoremIpsum', { props: { title: 'Is this working?', class: ['italic'], style: { color: 'red', 'font-weight': 'bold' } } })
    // .highlight(-3, { repeat: 2, delay: 1000, speed: 300, done: () => console.log('done') })

    .type('hi')
    .exec(e => {
      console.log({ e });
      throw 'ddd';
      e.type(' there!')
        .highlight(-3);

      return Promise.resolve(e);
    }, { delay: 1000 })

    .start();
});

tw.after('highlight', () => console.log(tw.getHighlight));

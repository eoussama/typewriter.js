import Typewriter from "./lib/index.js";
import SFX from "./lib/assets/audio.js";

/**
 * @description
 * The entry point of the script
 */
function main() {
  initHeader();
};

/**
 * @description
 * Animates a button press on the typewriter
 */
function pressButton() {
  const typewriter = document.querySelector('#icon #Typewriter');
  const buttons = typewriter.querySelectorAll('#Keyboard rect');
  const paper = typewriter.querySelector('#Paper');

  const randBtnIndex = Math.floor(Math.random() * buttons.length);
  const outputLength = document.getElementById('header')?.textContent?.length;

  paper.style.transform = `translateY(-${outputLength * 10}px)`;
  buttons[randBtnIndex].classList.remove('btn--press');
  setTimeout(() => buttons[randBtnIndex].classList.add('btn--press'), 0);
}

/**
 * @description
 * Initializes the header
 */
function initHeader() {

  // Initializing the typewriter
  const headerOpts = { speed: 150, audio: { src: SFX, enable: true } };
  const headerTw = new Typewriter('#header', headerOpts);

  // Fire animation after each action
  headerTw.before('type', () => {
    pressButton();
  });

  // Writing the title
  headerTw
    .type('Typzwriter')
    .move(-6)
    .delete(1)
    .type('e')
    .move(6)
    .type('.js')
    .start();
}

// Fires the main function when the window loads
window.addEventListener('load', main);

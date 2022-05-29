import Tick from '../models/tick.model';

/**
 * @util
 * @description
 * Rnder manager, manages DOM updates
 */
export default class Renderer {

  /**
   * @description
   * Host element that recieves updates
   */
  private target: HTMLElement;

  /**
   * @description
   * Creates a rendering manager
   *
   * @param target HTML element instance
   */
  constructor(target: HTMLElement) {
      this.target = target;
  }

  /**
   * @description
   * Updates the DOM
   *
   * @param tick Target state tick to update with
   */
  public render(tick: Tick) {
    let output = '';

    tick.content.split('').forEach((character, index) => {
      output += this.renderCharacter(character);

      if (index === tick.index) {
        output += this.renderCaret();
      }
    });

    if (output.length === 0) {
      output = this.renderCaret();
    }

    this.updateDOM(output);
  }

  /**
   * @description
   * Updates thhe target DOM element
   *
   * @param content Input HTML content
   */
  private updateDOM(content: string) {
    this.target.innerHTML = content;
  }

  /**
   * @description
   * Returns appropriate HTML embed for a character
   *
   * @param character Input character
   */
  private renderCharacter(character: string): string {
    return `<span class="tw__char">${character}</span>`;
  }

  /**
   * @description
   * Returns configured caret symbole
   */
  private renderCaret(): string {
    return '<span class="tw__caret">|</span>';
  }
}

import Action from './action.js';
import Typewriter from '../index.js';
import { IActionConfig } from '../types/action-config.type.js';

/**
 * @description
 * Typewriter tabulation action
 */
export default class Tab extends Action {

  /**
   * @description
   * Spacing width of the tab
   */
  private spaces!: number;

  /**
   * @description
   * Instantiates a tabulation action
   *
   * @param spaces Number of spaces that make the tab
   * @param parent The parent typewriter
   * @param config The configuration object
   */
  constructor(spaces: number, parent: Typewriter, config?: IActionConfig) {
    super(parent, config);
    this.spaces = spaces ?? 4;
  }

  /**
   * @description
   * Adds a tabulation character
   */
  protected run(): Promise<void> {
    const spaces = Math.max(Math.abs(this.spaces), 1);

    return new Promise(async resolve => {
      this.before();

      const char = Array(spaces).fill('&nbsp;').join('');
      const props = { classes: [] };

      this.parent.context.content = [
        ...this.parent.context.content.slice(0, this.parent.context.index),
        ...[{ char, props }],
        ...this.parent.context.content.slice(this.parent.context.index)
      ];

      this.parent.context.index += 1;

      this.parent.update();
      this.parent.audio.play(this.parent.config.audio);

      this.after();

      resolve();
    });
  }
}
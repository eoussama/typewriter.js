import Action from './action.js';
import Typewriter from '../index.js';
import { IActionConfig } from '../types/action-config.type.js';

/**
 * @description
 * Typewriter carriage return action
 */
export default class Return extends Action {

  /**
   * @description
   * Instantiates a carriage return action
   *
   * @param parent The parent typewriter
   * @param config The configuration object
   */
  constructor(parent: Typewriter, config?: IActionConfig) {
    super(parent, config);
  }

  /**
   * @description
   * Adds a carriage return character
   */
  protected run(): Promise<void> {
    return new Promise(async resolve => {
      this.before();

      const char = '<br />';
      const props = { classes: [] };

      this.parent.context.content = [
        ...this.parent.context.content.slice(0, this.parent.context.index),
        ...[{ char, props }],
        ...this.parent.context.content.slice(this.parent.context.index)
      ];

      this.parent.context.index += 1;

      this.parent.update();
      this.parent.audio.play();

      this.after();

      resolve();
    });
  }
}
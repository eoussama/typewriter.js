import Typewriter from "../index.js";

import { Action } from "./action.js";
import { IActionConfig } from "../types/action-config.type.js";

/**
 * @description
 * Typewriter carriage return action
 */
export class Return extends Action {

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
   * Initiates a carriage return action
   */
  public async start(): Promise<void> {
    await super.start();
    await this.return();
  }

  /**
   * @description
   * Adds a carriage return character
   */
  private async return(): Promise<void> {
    return new Promise(async resolve => {
      try {
        this.before();

        const char = '<br />';
        const props = { classes: [] };

        this.parent._context.content = [
          ...this.parent._context.content.slice(0, this.parent._context.index),
          ...[{ char, props }],
          ...this.parent._context.content.slice(this.parent._context.index)
        ];

        this.parent._context.index += 1;

        this.parent.update();
        this.parent._audio.play();

        this.after();

        this.resolveAction();
        resolve();
      } catch (err) {
        this.parent.errorHandler(err);
      }
    });
  }
}
import Typewriter from "../index.js";

import { Action } from "./action.js";
import { IActionConfig } from "../types/action-config.type.js";

/**
 * @description
 * Typewriter tabulation action
 */
export class Tab extends Action {

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
   * Initiates tabulation action
   */
  public async start(): Promise<void> {
    await super.start();
    await this.tab();
  }

  /**
   * @description
   * Adds a tabulation character
   */
  private async tab(): Promise<void> {
    const spaces = Math.max(Math.abs(this.spaces), 1);

    return new Promise(async resolve => {
      try {
        this.before();

        const char = Array(spaces).fill('&nbsp;').join('');
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
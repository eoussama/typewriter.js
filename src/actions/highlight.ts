import Typewriter from "../index.js";

import { IActionConfig } from "../types/action-config.type.js";
import { timeOut } from "../utils/timeout.js";
import { Action } from "./action.js";
import { Move } from "./move.js";

/**
 * @description
 * Typewriter move action
 */
export class Highlight extends Action {

  /**
   * @description
   * The target index
   */
  index!: number | 'start' | 'end';

  /**
   * @description
   * Instantiates a move action,
   * moves the caret tomoves the caret to the target index
   *
   * @param index The target index
   * @param parent The parent typewriter
   * @param config The configuration object
   */
  constructor(index: number, parent: Typewriter, config?: IActionConfig) {
    super(parent, config);
    this.index = index;
  }

  /**
   * @description
   * Initiates the sleep action
   */
  public async start(): Promise<void> {
    await super.start();
    await this.highlight();
  }

  /**
   * @description
   * Highlights content
   */
  private async highlight(): Promise<void> {
    const speed = Math.max(0, this.getConfig('speed'));
    const step = Math.max(0, this.getConfig('step'));

    const currentIndex = this.parent.context.index;
    const currentLength = this.parent.context.content?.length;
    const absoluteIndex = typeof this.index === 'number'
      ? this.index
      : this.index === 'start'
        ? -currentIndex
        : currentLength - currentIndex

    const index = absoluteIndex < 0
      ? Math.max(currentIndex * -1, absoluteIndex)
      : Math.min(currentLength - currentIndex, absoluteIndex);

    return new Promise(async resolve => {
      try {
        for await (let _ of this.step(Math.abs(index), step)) {
          this.before();

          const minStep = absoluteIndex < 0
            ? this.parent.context.index - step
            : this.parent.context.index + step;

          const nextStep = Math.min(minStep + 1, step);

          this.parent.context.index += absoluteIndex < 0 ? -nextStep : nextStep;
          this.parent.context.highlight = [
            absoluteIndex < 0 ? this.parent.context.index : currentIndex,
            absoluteIndex < 0 ? absoluteIndex : this.parent.context.index
          ];
          console.log(this.parent.context.highlight);
          this.parent.update();
          this.parent.audio.play();

          this.after();
          await timeOut(speed);
        }

        this.resolveAction();
        resolve();
      } catch (err) {
        this.parent.errorHandler(err);
      }
    });
  }
};
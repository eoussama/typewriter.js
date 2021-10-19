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
    const step = Math.max(1, this.getConfig('step'));
    const speed = Math.max(0, this.getConfig('speed'));

    const currentIndex = this.parent.context.index;
    const currentLength = this.parent.context.content?.length;
    const absoluteIndex = typeof this.index === 'number'
      ? this.index
      : this.index === 'start'
        ? -currentIndex
        : currentLength - currentIndex

    const limitedIndex = absoluteIndex < 0
      ? Math.max(currentIndex * -1, absoluteIndex)
      : Math.min(currentLength - currentIndex, absoluteIndex);

    const index = Math.abs(limitedIndex);

    return new Promise(async resolve => {
      try {
        for await (let _ of this.step(Math.abs(index), step)) {
          this.before();

          const iteration = (_ / step);
          const iterPart = iteration * step;
          const remIndex = index - iterPart;
          const sanitizedStep = Math.min(remIndex, step);

          this.parent.context.index += absoluteIndex < 0 ? -sanitizedStep : sanitizedStep;
          this.parent.context.highlight = [
            absoluteIndex < 0 ? this.parent.context.index : currentIndex,
            absoluteIndex < 0 ? currentIndex - 1 : this.parent.context.index - 1
          ];

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

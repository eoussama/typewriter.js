import Action from './action.js';
import Typewriter from '../index.js';
import { IActionConfig } from '../types/action-config.type.js';
import ActionManager from '../utils/action-manager.js';

/**
 * @description
 * Typewriter exec action,
 * used for user-defined actions
 */
export default class Exec extends Action {

  /**
   * @description
   * The user-defined action
   */
  private func: any;

  /**
   * @description
   * Instantiates an exec action
   *
   * @param func The user-defined action
   * @param parent The parent typewriter
   * @param config The configuration object
   */
  constructor(func: any, parent: Typewriter, config?: IActionConfig) {
    super(parent, config);
    this.func = func;
  }

  /**
   * @description
   * Executes user defined function
   */
  protected run(): Promise<void> {
    return new Promise(async resolve => {
      try {
        this.before();

        const dummyElement = document.createElement('div');
        const dummyTypewriter = new Typewriter(dummyElement, this.parent.config);

        const result = await this.func(dummyTypewriter);
        // this.parent.actionManager.queue.stack(result.actionManager.queue.items);
        console.log(result.actionManager.queue.items);

        this.after();
        resolve();
      } catch (err) {
        this.parent.errorHandler(err);
      }
    });
  }
}
import Typewriter from "../index.js";
import { IActionConfig } from "../types/action-config.type.js";
import { Action } from "./action.js";

/**
 * @description
 * Typewriter exec action,
 * used for user-defined actions
 */
export class Exec extends Action {

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
   * Initiates the exec action
   */
  async start(): Promise<void> {
    return new Promise(async resolve => {
      await this.func();
      resolve();
    });
  }
}
import { Action } from "../actions/action.js";

/**
 * @description
 * The queuer responsible for
 * organizing the actions
 */
export class Queuer {

  /**
   * @description 
   * Action queue
   */
  private queue!: Array<Action>;

  /**
   * @description
   * Returns the queue items
   */
  get items() {
    return this.queue.slice(0);
  }

  /**
   * @description
   * Instantiates the queuer
   */
  constructor() {
    this.reset();
  }

  /**
   * @description
   * Adds an action to the queue
   *
   * @param action The action to add
   */
  public add(action: Action): void {
    this.queue.push(action);
  }

  /**
   * @description
   * Clears the action list
   */
  public reset(): void {
    this.queue = [];
  }
}

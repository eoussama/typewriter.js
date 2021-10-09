import { Action } from "../actions/action";

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
  private readonly queue!: Array<Action>;

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
    this.queue = [];
  }

  /**
   * @description
   * Adds an action to the queue
   *
   * @param action The action to add
   */
  add(action: Action) {
    this.queue.push(action);
  }
}

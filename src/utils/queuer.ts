import { Action } from "../actions/action.js";

/**
 * @description
 * The queuer responsible for
 * organizing the actions
 */
export class Queuer {

  /**
   * @description
   * Unique ID for the queue to defferentiate
   * between overlaping queues
   */
  private id!: string;

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
    action.queueId = this.id;
    this.queue.push(action);
  }

  /**
   * @description
   * Clears the action list
   */
  public reset(): void {
    this.id = new Date().getTime().toString(32);
    this.queue = [];
  }

  /**
   * @description
   * Checks if the action belongs to the queue
   *
   * @param action The target action
   */
  public isValid(action: Action): boolean {
    return action.queueId === this.id;
  }
}

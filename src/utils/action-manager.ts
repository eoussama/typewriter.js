import Queue from './queue.js';
import Typewriter from './../index.js';

import Tab from '../actions/tab.js';
import Exec from '../actions/exec.js';
import Move from '../actions/move.js';
import Type from '../actions/type.js';
import Sleep from '../actions/sleep.js';
import Action from '../actions/action.js';
import Return from '../actions/return.js';
import Delete from '../actions/delete.js';
import Highlight from '../actions/highlight.js';

import IActions from '../types/actions.type.js';
import { IActionConfigType, IActionConfig } from '../types/action-config.type.js';

/**
 * @description
 * Manages the action queue
 */
export default class ActionManager implements IActions {

  /**
   * @description
   * The parent typewriter instance
   */
  private parent!: Typewriter;

  /**
   * @description
   * Action queue
   */
  public queue: Queue<Action>;

  /**
   * @description
   * Initializes the queue manager
   *
   * @param parent The parent typewriter instance
   */
  constructor(parent: Typewriter) {
    this.parent = parent;
    this.queue = new Queue();
  }

  /**
     * @description
     * Initiates a sleep action
     *
     * @param time The timeout time in milliseconds
     */
  public sleep(time: number): Typewriter {
    const action = new Sleep(time, this.parent);
    this.queue.enqueue(action);

    return this.parent;
  }

  /**
   * @description
   * Initiates anb exec action
   *
   * @param func The user-defined action
   */
  public exec(func: Promise<void>): Typewriter {
    const action = new Exec(func, this.parent);
    this.queue.enqueue(action);

    return this.parent;
  }

  /**
   * @description
   * Initiates a type action
   *
   * @param input The target input
   * @param config The action configuration
   */
  public type(input: string, config?: IActionConfigType): Typewriter {
    const action = new Type(input, this.parent, config);
    this.queue.enqueue(action);

    return this.parent;
  }

  /**
   * @description
   * Initiates a delete action
   *
   * @param times Number of deletions
   * @param config The action configuration
   */
  public delete(times: number, config?: IActionConfig): Typewriter {
    const action = new Delete(times, this.parent, config);
    this.queue.enqueue(action);

    return this.parent;
  }

  /**
   * @description
   * Initiates a move action
   *
   * @param index The target index
   * @param config The action configuration
   */
  public move(index: number, config?: IActionConfig): Typewriter {
    const action = new Move(index, this.parent, config);
    this.queue.enqueue(action);

    return this.parent;
  }

  /**
   * @description
   * Highlights content
   *
   * @param index The target index
   * @param config The action configuration
   */
  public highlight(index: number, config?: IActionConfig): Typewriter {
    const action = new Highlight(index, this.parent, config);
    this.queue.enqueue(action);

    return this.parent;
  }

  /**
   * @description
   * Inserts tabulation
   *
   * @param spaces Number of spaces that make the tabulation
   * @param config The action configuration
   */
  public tab(index: number = 4, config?: IActionConfig): Typewriter {
    const action = new Tab(index, this.parent, config);
    this.queue.enqueue(action);

    return this.parent;
  }

  /**
   * @description
   * Inserts carriage return
   *
   * @param config The action configuration
   */
  public return(config?: IActionConfig): Typewriter {
    const action = new Return(this.parent, config);
    this.queue.enqueue(action);

    return this.parent;
  }

  /**
   * @description
   * Resets the queue
   */
  public reset(): void {
    this.queue.clear();
  }

  /**
   * @description
   * Returns and dequeues the head of the queue
   */
  public * next() {
    while (this.queue.peek()) {
      yield this.queue.dequeue();
    }
  }
}

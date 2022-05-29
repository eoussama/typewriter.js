import Keys from '../types/keys.type';

/**
 * @model
 * @description
 * The smallest entity that makes up actions
 */
export default class Tick {

  /**
   * @description
   * Execution delay in milliseconds
   */
  delay: number;

  /**
   * @description
   * Caret position, zero based
   */
  index: number;

  /**
   * @description
   * Current text content
   */
  content: string;

  /**
   * @description
   * Instantiates a tick, a snapshot of action history
   */
  constructor(tick?: Keys<Tick>) {
    this.content = tick?.content ?? '';
    this.index = Math.max(tick?.index ?? 0, 0);
    this.delay = Math.max(tick?.delay ?? 0, 0);
  }
}

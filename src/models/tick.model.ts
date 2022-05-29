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
   *
   * @param content Text content
   * @param index Caret position
   * @param delay Execution delay in milliseconds
   */
  constructor(content: string, index: number, delay: number = 0) {
    this.content = content ?? '';
    this.index = Math.max(index ?? 0, 0);
    this.delay = Math.max(delay ?? 0, 0);
  }
}

/**
 * @description
 * Action configuration object
 */
export interface IActionConfig {

  /**
   * @description
   * The action speed in milliseconds
   */
  speed: number;

  /**
   * @description
   * Update steps dictates the number of characters processed
   * by an action, be it typing, deleting, or moving.
   */
  step: number;
}
/**
 * @description
 * Action configuration object
 */
export interface IActionConfig {

  /**
   * @description
   * Delay before the action starts
   * in milliseconds.
   */
  delay: number;

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

  /**
   * @description
   * Looping times
   */
  repeat: number;

  /**
   * @description
   * Resolving callback, called
   * after the action is finished.
   */
  done: () => void
}

/**
 * @description
 * Type action configuration object
 */
export interface IActionConfigType extends IActionConfig {

  /**
   * @description
   * Properties
   */
  props: { [key: string]: any };
}

/**
 * @description
 * Global configuration object
 */
 export interface IConfig {

  /**
   * @description
   * Tick in milliseconds, this is essentially the speed
	 * in which the typewriter performs every action.
   */
  speed: number;

  /**
   * @description
   * Update steps dictates the number of characters processed
   * by an action, be it typing, deleting, or moving.
   */
  step: number;
}
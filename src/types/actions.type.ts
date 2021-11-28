import { IActionConfig, IActionConfigType } from './action-config.type';

/**
 * @description
 * Action definitions
 */
export default interface IActions {

  /**
   * @description
   * Types content
   *
   * @param input The target input to type
   * @param config Action configuration
   */
  type(input: string, config?: IActionConfigType): any;

  /**
   * @description
   * Deletes content
   *
   * @param times The number of times to delete
   * @param config Action configuration
   */
  delete(times: number, config?: IActionConfig): any;

  /**
   * @description
   * Moves caret
   *
   * @param index The index of the character to move
   * @param config Action configuration
   */
  move(index: number, config?: IActionConfig): any;

  /**
   * @description
   * Highlights content
   *
   * @param index The index where to stop highlighting from
   * the corrent caret position
   *
   * @param config Action configuration
   */
  highlight(index: number, config?: IActionConfig): any;

  /**
   * @description
   * Idles the typewriter
   *
   * @param time The time in milliseconds to idlethe typewriter
   */
  sleep(time: number): any;

  /**
   * @description
   * Inserts a tab character
   *
   * @param index The indentation width in spaces
   * @param config Action configuration
   */
  tab(index: number, config?: IActionConfig): any;

  /**
   * @description
   * Insert a carriage return character
   *
   * @param config Action configuration
   */
  return(config?: IActionConfig): any;

  /**
   * @description
   * Invokes an input function
   *
   * @param func User defined function
   */
  exec(func: Promise<void>): any;
}

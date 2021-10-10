import Typewriter from "../index";
import { IActionConfig } from "./action-config.type";

/**
 * @description
 * Actions definition
 */
export interface IActions {

  /**
   * @description
   * Initiates a sleep action
   *
   * @param time The timeout time in milliseconds
   */
  sleep(time: number): Typewriter;

  /**
   * @description
   * Initiates anb exec action
   *
   * @param func The user-defined action
   */
  exec(func: Promise<void>): Typewriter;

  /**
   * @description
   * Initiates a type action
   *
   * @param input The target input
   * @param config The action configuration
   */
  type(input: string, config?: IActionConfig): Typewriter;

  /**
   * @description
   * Initiates a delete action
   *
   * @param times Number of deletions
   * @param config The action configuration
   */
  delete(times: number, config?: IActionConfig): Typewriter;

  /**
   * @description
   * Initiates a move action
   *
   * @param index The target index
   * @param config The action configuration
   */
  move(index: number, config?: IActionConfig): Typewriter;

  /**
   * @description
   * Pauses the execution of the actions
   */
  pause(): void;

  /**
   * @description
   * Resumes the execution of the actions
   */
  resume(): void;

  /**
   * @description
   * Resets the entire typewriter
   */
  reset(): void;
}

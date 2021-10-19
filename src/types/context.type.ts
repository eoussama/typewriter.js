import { Nullable } from './nullable.type';

/**
 * @description
 *  The typewriter context
 */
export interface IContext {

  /**
   * @description
   * The content that formulates the output
   */
  content: string;

  /**
   * @description
   * The index which dictates the potential
   * position of the caret
   */
  index: number;

  /**
   * @description
   * The highlight range
   */
  highlight: [Nullable<number>, Nullable<number>];
}

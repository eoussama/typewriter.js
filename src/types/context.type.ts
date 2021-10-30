import { Nullable } from './nullable.type';

/**
 * @description
 * The typewriter context
 */
export interface IContext {

  /**
   * @description
   * The content that formulates the output
   */
  content: Array<IContent>;

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

/**
 * @description
 * Content array
 */
export interface IContent {

  /**
   * @description
   * Target character
   */
  char: string;

  /**
   * @description
   * Properties of character
   */
  props?: { [key: string]: any };
}

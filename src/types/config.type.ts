import IAudioConfig from './audio-config.type.js';
import { IActionConfig } from './action-config.type.js';
import IRendererConfig from './renderer-config.type.js';

/**
 * @description
 * Global configuration object
 */
export default interface IConfig extends IActionConfig {

  /**
   * @description
   * Whether or not to keep HTML output
   */
  parseHTML: boolean;

  /**
   * @description
   * The attribute to update
   */
  targetAttribute: string;

  /**
   * @description
   * The caret configuration
   */
  caret?: IRendererConfig,

  /**
   * @description
   * The audio configuration
   */
  audio?: IAudioConfig,
}

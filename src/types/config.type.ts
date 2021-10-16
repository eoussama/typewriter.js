import { IActionConfig } from "./action-config.type.js";
import { IAudioConfig } from "./audio-config.type.js";
import { IRendererConfig } from "./renderer-config.type.js";

/**
 * @description
 * Global configuration object
 */
export interface IConfig extends IActionConfig {

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

/**
 * @description
 * Audio configuration object
 */
export interface IAudioConfig {

  /**
   * @description
   * Whether the audio is enabled
   */
  enable: boolean,

  /**
   * @description
   * The volume of the audio
   */
  volume: number,

  /**
   * @description
   * An array of audio sources,
   * file paths, base64, remote links, etc...
   */
  src: Array<string>;
}

import { IAudioConfig } from "../types/audio-config.type.js";

/**
 * @description
 * Audio management utility
 */
export class Audio {

  /**
   * @description
   * The renderer's config
   */
  private config!: IAudioConfig;

  /**
   * @description
   * Instantiates the audio instance
   *
   * @param config The audio configuration
   */
  constructor(config?: IAudioConfig) {
    this.config = {
      enable: config?.enable ?? false,
      volume: config?.volume ?? 0.5,
      src: config?.src ?? []
    };
  }

  /**
   * @description
   * Plays a random sound from
   * the imported source array
   */
  play(): void {
    if (this.config.enable) {
      const index = Math.floor((Math.random()) * (this.config.src.length - 1));
      const sfx = this.config.src[index];
      const audio = new window.Audio(sfx);

      audio.volume = this.config.volume;
      
      if (document?.hasFocus()) {
        audio.play().catch(err => {});
      }
    }
  }
}

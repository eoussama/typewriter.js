/**
   * @description
   * Caret configuration
   */
export default interface IRendererConfig {

  /**
   * @description
   * If the caret is enabled
   */
  enable: boolean,

  /**
   * @description
   * Whether blinking is enabled
   */
  blink: boolean,

  /**
   * @description
   * The content of the caret
   */
  content: string
}

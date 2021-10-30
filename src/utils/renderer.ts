import { Nullable } from "../types/nullable.type.js";
import { Context } from "./context.js";
import { IRendererConfig } from "../types/renderer-config.type.js";

/**
 * @description
 * The renderer responsible for rendering
 * the typewriter's output
 */
export class Renderer {

  /**
   * @description
   * The target element that contains the
   * typewriter's output
   */
  private target!: Nullable<HTMLElement>;

  /**
   * @description
   * The attribute to update
   */
  private targetAttribute!: string;

  /**
   * @description
   * Whether or not to keep HTML output
   */
  private parseHTML!: boolean;

  /**
   * @description
   * The renderer's config
   */
  private config!: IRendererConfig;

  /**
   * @description
   * The typewriter's context
   */
  private context!: Context;

  /**
   * @description
   * Instantiates the renderer instance
   *
   * @param target The target element
   * @param targetAttribute The target attributes that recieves content update
   * @param parseHTML Whether or not to keep HTML output
   * @param context The typewriter context
   * @param config The renderer configuration
   */
  constructor(target: HTMLElement, targetAttribute: string, parseHTML: boolean, context: Context, config?: IRendererConfig) {
    this.context = context;
    this.target = target;
    this.parseHTML = parseHTML ?? true;
    this.targetAttribute = targetAttribute;

    this.config = {
      blink: config?.blink ?? true,
      enable: config?.enable ?? true,
      content: config?.content ?? '_'
    };

    this.injectStyle();
    this.render();
  }

  /**
   * @description
   * Renders the context inside of the target HTML element
   */
  public render(): void {
    if (this.target) {
      (this.target as any)[this.targetAttribute] = this.parseContent(this.parseHTML);
    }
  }

  /**
   * @description
   * Resets the target
   */
  public reset(): void {
    if (this.target) {
      (this.target as any)[this.targetAttribute] = '';
    }
  }

  /**
   * @description
   * Strips out HTML formatting and returns a raw string
   *
   * @param input The HTML input to sanitize
   * @returns 
   */
  public stripHTML(input: string): string {
    const element = document.createElement('div');
    element.innerHTML = input;

    return element.textContent ?? '';
  }

  /**
   * @description
   * Returns the parse content
   *
   * @param allowHtml Whether or not to return content as HTML or raw text
   */
  public parseContent(allowHtml: boolean = true): string {
    let output = '';

    if (this.context.content.length > 0) {
      this.context.content.forEach((content, i) => {

        // Render caret at the begining of the content
        if (this.config?.enable && i === 0 && this.context.index === 0) {
          output += this.renderedCaret();
        }

        // Opening the highlighter tag
        if (this.canHighlight() && this.context.highlight[0] === i) {
          output += '<mark class="tw_highlight">';
        }

        // Extracting properties
        const props = this.context.extractProps(content);

        // Render character
        output += `<span ${props.attributes} style="${props.style}" class="tw_char ${props.class}">${content.char}</span>`;

        // Opening the highlighter tag
        if (this.canHighlight() && this.context.highlight[1] === i) {
          output += '</mark>';
        }

        // Render caret after character
        if (this.config?.enable && i + 1 === this.context.index) {
          output += this.renderedCaret();
        }
      });
    } else if (this.config?.enable) {
      output += this.renderedCaret();
    }

    return allowHtml ? output : this.stripHTML(output);
  }

  /**
   * @description
   * If the highlighter is active
   */
  private canHighlight(): boolean {
    return true;
  }

  /**
   * @description
   * Returns the rendered caret
   */
  private renderedCaret(): string {
    return `<span class="tw_caret ${this.config.blink ? 'tw_blink' : ''}">${this.config.content}</span>`;
  }

  /**
   * @description
   * Injects CSS styling for certain features to work,
   * ex; caret blinking, etc...
   */
  private injectStyle(): void {
    let styles = document.getElementById('tw_styles');

    // Checking if the stylres aren't already injected
    if (!styles) {
      styles = document.createElement('style');
      styles.id = 'tw_styles';
      styles.textContent = `
        .tw_highlight {
          background-color: #3390ff;
          color: #ffffff;
        }

				.tw_caret.tw_blink {
					animation-name: tw_blink_animation;
					animation-duration: 0.5s;
					animation-iteration-count: infinite;
					animation-direction: alternate-reverse;
				}

				@keyframes tw_blink_animation {
					from {
						opacity: 0;
					}

					to {
						opacity: 1;
					}
				}
			`;
      document.head.appendChild(styles);
    }
  }
}

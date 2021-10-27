import { Nullable } from "../types/nullable.type";

/**
 * @description
 * Caret context
 */
export class Context {

  /**
   * @description
   * Caret index
   */
  public index: number;

  /**
   * @description
   * Encoded content list
   */
  public content: Array<{ char: string, props?: { classes: Array<string> } }>;

  /**
   * @description
   * Highlight range
   */
  public highlight: [Nullable<number>, Nullable<number>];

  /**
   * @description
   * The target HTML attribute that recieves live updates
   */
  private config!: { targetAttribute: string };

  /**
   * @description
   * Instantiates a base context object
   *
   * @param targetAttribute The target HTML attribute that recieves live updates
   */
  constructor(targetAttribute: string) {
    this.index = 0;
    this.content = [];
    this.highlight = [null, null];
    this.config = { targetAttribute };
  }

  /**
   * @description
   * Resets the context state
   */
  public reset(): void {
    this.index = 0;
    this.content = [];
    this.highlight = [null, null];
  }

  /**
 * @description
 * Checks if content has highlight
 */
  public hasHighlight(): boolean {
    return this.highlight.map(e => parseInt(e as any, 10)).filter(e => !isNaN(e)).length === 2;
  }

  /**
 * @description
 * Initializes the contents, copyies over the target's
 * contents and adapts the typewriter's context.
 *
 * @param target The target element
 */
  public initializeContent(target: HTMLElement): void {
    const targetAttribute = this.config?.targetAttribute === 'innerHTML' ? 'textContent' : this.config?.targetAttribute;
    const targetContent = (target as any)[targetAttribute];

    this.content = targetContent?.split('').map((e: string) => ({ char: e, props: { classes: [] } })) ?? [];
    this.index = this.content.length;
  }
}

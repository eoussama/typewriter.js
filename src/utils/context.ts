import { IContent } from "../types/context.type";
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
  public content: Array<IContent>;

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

  /**
   * @description
   * Extracts properties for a given target
   *
   * @param content The target content
   */
  public extractProps(content: IContent) {

    // Extracting props
    const props = content?.props ?? {};

    // Extracting classes
    const classes = Array.isArray(props?.class) ? props?.class : [];

    // Extracting styles
    const styles = props?.style ?? {};
    const styleEntries = Object.entries(styles);
    const styleString = styleEntries?.map(e => `${e[0]}: ${e[1]}`).join(';');

    // Extracting attributes
    const attributeKeys = Object.keys(props)?.filter(e => ['style', 'class'].indexOf(e) === -1);
    const attributes = attributeKeys.map(e => `${e}="${props[e]}"`).join(' ');

    return {
      attributes,
      class: classes?.join('') ?? '',
      style: styleString ?? ''
    };
  }
}

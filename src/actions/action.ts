import Typewriter from "../index";
import { IActionConfig } from "../types/action-config.type";

/**
 * @description
 * Base typewriter action
 */
export class Action {

	/**
	 * @description
	 * The parent typewriter object
	 */
	protected readonly parent!: Typewriter;

	/**
	 * @description
	 * The action configuration object
	 */
	protected config!: IActionConfig;

	/**
	 * @description
	 * Instantiates a base typewriter action
	 *
	 * @param parent The parent typewriter
	 * @param config The configuration object
	 */
	constructor(parent: Typewriter, config?: IActionConfig) {
		this.parent = parent;
		this.config = config as any;
	}

	/**
	 * @description
	 * Initiates the action
	 */
	async start(): Promise<void> {
		return Promise.resolve();
	 }
}

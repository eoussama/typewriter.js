import Typewriter from "../index.js";
import { Action } from "./action.js";
import { IActionConfig } from "../types/action-config.type.js";

/**
 * @description
 * Typewriter move action
 */
export class Move extends Action {

	/**
	 * @description
	 * The target index
	 */
	index!: number;

	/**
	 * @description
	 * Instantiates a move action,
	 * moves the caret tomoves the caret to the target index
	 *
	 * @param index The target index
	 * @param parent The parent typewriter
	 * @param config The configuration object
	 */
	constructor(index: number, parent: Typewriter, config?: IActionConfig) {
		super(parent, config);
		this.index = index;
	}

	/**
	 * @description
	 * Initiates the sleep action
	 */
	async start(): Promise<void> {
		await super.start();
		const speed = this.getConfig('speed');

		return new Promise(resolve => {
			setTimeout(() => {
				this.parent.context.index += this.index;
				this.parent.update();

				resolve();
			}, speed);
		});
	}
}
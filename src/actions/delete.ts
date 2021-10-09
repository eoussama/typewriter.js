import Typewriter from "../index.js";
import { Action } from "./action.js";
import { IActionConfig } from "../types/action-config.type.js";

/**
 * @description
 * Typewriter delete action
 */
export class Delete extends Action {

	/**
	 * @description
	 * Number of deletions
	 */
	private times!: number;

	/**
	 * @description
	 * Instantiates a type action
	 *
	 @param times Number of deletions
	 * @param parent The parent typewriter
	 * @param config The configuration object
	 */
	constructor(times: number, parent: Typewriter, config?: IActionConfig) {
		super(parent, config);
		this.times = times;
	}

	/**
	 * @description
	 * Initiates delete action
	 *
	 @param times Number of deletions
	 * @param parentResolve Parent resolve function
	 */
	async start(times: number = this.times, parentResolve?: any): Promise<void> {
		const step = this.getConfig('step');
		const speed = this.getConfig('speed');

		return new Promise(resolve => {
			setTimeout(() => {
				const deletionWidth = Math.min(times, step);

				this.parent.context.content = this.parent.context.content.substr(0, this.parent.context.index - deletionWidth) + this.parent.context.content.substr(this.parent.context.index + deletionWidth - 1);
				this.parent.context.index -= deletionWidth;
				times -= deletionWidth;

				this.parent.update();

				if (times > 0) {
					this.start(times, parentResolve ?? resolve);
				} else {
					parentResolve ? parentResolve() : resolve();
				}
			}, speed);
		});
	}
}
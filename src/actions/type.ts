import Typewriter from "../index.js";
import { Action } from "./action.js";
import { IActionConfig } from "../types/action-config.type.js";

/**
 * @description
 * Typewriter type action
 */
export class Type extends Action {

	/**
	 * @description
	 * The target input to type
	 */
	private input!: string;

	/**
	 * @description
	 * Instantiates a type action
	 *
	 * @param input The target input
	 * @param parent The parent typewriter
	 * @param config The configuration object
	 */
	constructor(input: string, parent: Typewriter, config?: IActionConfig) {
		super(parent, config);
		this.input = input;
	}

	/**
	 * @description
	 * Initiates type action
	 *
	 * @param input The target input
	 * @param parentResolve Parent resolve function
	 */
	async start(input: string = this.input, parentResolve?: any): Promise<void> {
		await super.start();

		const step = this.getConfig('step');
		const speed = this.getConfig('speed');

		return new Promise(resolve => {
			setTimeout(() => {
				const characters = input.substr(0, step);
				const rest = input.substr(step);

				this.parent.context.content = this.parent.context.content.substr(0, this.parent.context.index) + characters + this.parent.context.content.substr(this.parent.context.index);
				this.parent.context.index += characters.length;

				this.parent.update();
				this.parent.audio.play();

				if (rest.length > 0) {
					this.start(rest, parentResolve ?? resolve);
				} else {
					parentResolve ? parentResolve() : resolve();
				}
			}, speed);
		});
	}
}
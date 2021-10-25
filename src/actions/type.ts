import Typewriter from "../index.js";

import { timeOut } from "../utils/timeout.js";
import { Action } from "./action.js";
import { IActionConfigType } from "../types/action-config.type.js";

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
	constructor(input: string, parent: Typewriter, config?: IActionConfigType) {
		super(parent, config);
		this.input = input;
	}

	/**
	 * @description
	 * Initiates type action
	 */
	public async start(): Promise<void> {
		await super.start();
		await this.type();
	}

	/**
	 * @description
	 * Types a target input
	 */
	private async type(): Promise<void> {
		const step = Math.max(1, this.getConfig('step'))
		const speed = Math.max(0, this.getConfig('speed'));

		return new Promise(async resolve => {
			try {
				for await (let index of this.step(this.input.length, step)) {
					const characters = this.input.substr(index, step);
					const classes = (this.config as IActionConfigType)?.classes ?? [];
					const props = { classes };

					this.before({ currentIndex: this.parent._context.index });

					// Overwriting highlighted content
					if (this.parent.hasHighlight()) {
						const start = <number>this.parent._context.highlight[0];
						const end = <number>this.parent._context.highlight[1] + 1;

						this.parent._context.content = [
							...this.parent._context.content.slice(0, start),
							...characters.split('').map(char => ({ char, props })),
							...this.parent._context.content.slice(end)
						];

						// Typing regular content
					} else {
						this.parent._context.content = [
							...this.parent._context.content.slice(0, this.parent._context.index),
							...characters.split('').map(char => ({ char, props })),
							...this.parent._context.content.slice(this.parent._context.index)
						];
					}

					this.parent._context.index += characters.length;
					this.parent._context.highlight = [null, null];

					this.parent.update();
					this.parent._audio.play();

					this.after({
						character: characters,
						currentIndex: this.parent._context.index,
					});

					await timeOut(speed);
				}

				this.resolveAction();
				resolve();
			} catch (err) {
				this.parent.errorHandler(err);
			}
		});
	}
}
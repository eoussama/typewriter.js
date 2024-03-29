import Typewriter from '../index.js';

import Action from './action.js';
import timeOut from '../utils/timeout.js';
import { IActionConfigType } from '../types/action-config.type.js';

/**
 * @description
 * Typewriter type action
 */
export default class Type extends Action {

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
	 * Types a target input
	 */
	protected run(): Promise<void> {
		const step = Math.max(1, this.getConfig('step'))
		const speed = Math.max(0, this.getConfig('speed'));

		return new Promise(async resolve => {
			for await (let index of this.step(this.input.length, step)) {
				const characters = this.input.substr(index, step);
				const props = (this.config as IActionConfigType)?.props ?? {};

				this.before({ currentIndex: this.parent.context.index });

				// Overwriting highlighted content
				if (this.parent.context.hasHighlight()) {
					const start = Number(this.parent.context.highlight[0]);
					const end = Number(this.parent.context.highlight[1]) + 1;

					this.parent.context.content = [
						...this.parent.context.content.slice(0, start),
						...characters.split('').map(char => ({ char, props })),
						...this.parent.context.content.slice(end)
					];

					// Typing regular content
				} else {
					this.parent.context.content = [
						...this.parent.context.content.slice(0, this.parent.context.index),
						...characters.split('').map(char => ({ char, props })),
						...this.parent.context.content.slice(this.parent.context.index)
					];
				}

				this.parent.context.index += characters.length;
				this.parent.context.highlight = [null, null];

				this.parent.update();
				this.parent.audio.play(this.parent.config.audio);

				this.after({
					character: characters,
					currentIndex: this.parent.context.index,
				});

				await timeOut(speed);
			}

			resolve();
		});
	}
}

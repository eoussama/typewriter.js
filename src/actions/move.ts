import Typewriter from "../index.js";

import { timeOut } from "../utils/timeout.js";
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
	 * Whether the movements is to the left
	 */
	get moveLeft() {
		return this.index < 0;
	}

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
	public async start(): Promise<void> {
		await super.start();
		await this.move();
	}

	/**
	 * @description
	 * Moves the caret around
	 */
	private async move(): Promise<void> {
		const speed = this.getConfig('speed');
		const step = this.getConfig('step');

		const currentIndex = this.parent.context.index;
		const currentLength = this.parent.context.content?.length;

		const index = this.moveLeft
			? Math.max(currentIndex * -1, this.index)
			: Math.min(currentLength - currentIndex, this.index);

		return new Promise(async resolve => {
			for await (let _ of this.step(Math.abs(index), step)) {
				this.before();

				const minStep = this.moveLeft
					? this.parent.context.index - step
					: this.parent.context.index + step;

				const nextStep = Math.min(minStep, step);

				this.parent.context.index += this.moveLeft ? -nextStep : nextStep;
				this.parent.update();
				this.parent.audio.play();

				this.after();
				await timeOut(speed);
			}

			resolve();
		});
	}
};
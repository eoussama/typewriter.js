import Typewriter from "../index.js";
import { timeOut } from "../utils/timeOut.js"
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
	async start(): Promise<void> {
		await super.start();
		await this.move();
	}

	private async move(): Promise<void> {
		const speed = this.getConfig('speed');

		const currentLength = this.parent.context.content?.length;
		const currentIndex = this.parent.context.index;

		const index = this.moveLeft
			? Math.max(currentIndex * -1, this.index)
			: Math.min(currentLength - currentIndex, this.index);

		return new Promise(async resolve => {
			for await (let _ of this.step(index)) {
				this.before();

				this.parent.context.index += this.moveLeft ? -1 : 1;
				this.parent.update();
				this.parent.audio.play();

				this.after();
				await timeOut(speed);
			}

			resolve();
		});
	}

	/**
	 * @description
	 * Defines required steps to resolve the action
	 *
	 * @param length The length of the steps
	 */
	private * step(length: number) {
		const max = Math.abs(length);

		for (let i = 0; i < max; i++) {
			yield i;
		}
	}
};
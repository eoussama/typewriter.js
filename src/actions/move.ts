import Action from './action.js';
import Typewriter from '../index.js';
import timeOut from '../utils/timeout.js';
import { IActionConfig } from '../types/action-config.type.js';

/**
 * @description
 * Typewriter move action
 */
export default class Move extends Action {

	/**
	 * @description
	 * The target index
	 */
	index!: number | 'start' | 'end';

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
	 * Moves the caret around
	 */
	protected run(): Promise<void> {
		const step = Math.max(1, this.getConfig('step'));
		const speed = Math.max(0, this.getConfig('speed'));

		const currentIndex = this.parent.context.index;
		const currentLength = this.parent.context.content?.length;
		const absoluteIndex = typeof this.index === 'number'
			? this.index
			: this.index === 'start'
				? -currentIndex
				: currentLength - currentIndex

		const limitedIndex = absoluteIndex < 0
			? Math.max(currentIndex * -1, absoluteIndex)
			: Math.min(currentLength - currentIndex, absoluteIndex);

		const index = Math.abs(limitedIndex);

		return new Promise(async resolve => {
			for await (let _ of this.step(Math.abs(index), step)) {
				this.before({ currentIndex: this.parent.context.index });

				const iteration = (_ / step);
				const iterPart = iteration * step;
				const remIndex = index - iterPart;
				const sanitizedStep = Math.min(remIndex, step);

				this.parent.context.highlight = [null, null];
				this.parent.context.index += absoluteIndex < 0 ? -sanitizedStep : sanitizedStep;

				this.parent.update();
				this.parent.audio.play(this.parent.config.audio);

				this.after({ currentIndex: this.parent.context.index });
				await timeOut(speed);
			}

			resolve();
		});
	}
};
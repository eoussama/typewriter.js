import Typewriter from "../index.js";
import { Action } from "./action.js";
import { IActionConfig } from "../types/action-config.type.js";
import { timeOut } from "../utils/timeout.js";

/**
 * @description
 * Typewriter delete action
 */
export class Delete extends Action {

	/**
	 * @description
	 * Number of deletions
	 */
	private times!: number | 'start';

	/**
	 * @description
	 * Instantiates a type action
	 *
	 * @param times Number of deletions
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
	 */
	public async start(): Promise<void> {
		await super.start();
		await this.delete();
	}

	/**
	 * @description
	 * Deletes content
	 */
	private async delete(): Promise<void> {
		const step = Math.max(1, this.getConfig('step'));
		const speed = Math.max(0, this.getConfig('speed'));

		// The starting index, the current poisition of the caret
		const startingIndex = this.parent._context.index;

		// The starting length of the content
		const startingLength = this.parent._context.content.length;

		// Converting the anchor to a valid number
		const sanitizedIndex = typeof this.times === 'string'
			? this.times === 'start'
				? startingIndex
				: startingIndex - startingLength
			: this.times;

		// If the deletion mode is inverted
		const inverseDeletion = sanitizedIndex < 0;

		// Comparing bounds to prevent overflowing index
		const normalizedIndex = inverseDeletion
			? Math.min(startingLength - startingIndex, Math.abs(sanitizedIndex))
			: Math.min(startingIndex, sanitizedIndex);

		// Positive value of the index
		const absoluteIndex = Math.abs(normalizedIndex);

		return new Promise(async resolve => {
			try {
				for await (let _ of this.step(absoluteIndex, step)) {
					let deletedContent = '';

					this.before({ currentIndex: this.parent._context.index });

					// Deleting highlighted content
					if (this.parent._context.hasHighlight()) {
						const start = <number>this.parent._context.highlight[0];
						const end = <number>this.parent._context.highlight[1] + 1;

						// Extracting the content that's gonna be deleted
						deletedContent = this.parent._context.content.slice(0).slice(start, end).map(e => e.char).join('');

						this.parent._context.content = [
							...this.parent._context.content.slice(0, start),
							...this.parent._context.content.slice(end)
						];

						// Deleting regular content
					} else {

						// The current iteration
						const iteration = (_ / step);

						// The remaining deletion index
						const iterPart = iteration * step;
						const remainingIndex = absoluteIndex - iterPart;

						// Deleting width accounting for the counding step
						const deletionWidth = Math.min(remainingIndex, step);

						// Deletion bounds
						const start = this.parent._context.index - (inverseDeletion ? 0 : deletionWidth);
						const end = this.parent._context.index + (inverseDeletion ? deletionWidth : 0);

						// Extracting the content that's gonna be deleted
						deletedContent = this.parent._context.content.slice(0).slice(start, end).map(e => e.char).join('');

						// Deleting the marked width
						this.parent._context.content = [
							...this.parent._context.content.slice(0, start),
							...this.parent._context.content.slice(end)
						]

						// Updating the caret position
						this.parent._context.index -= inverseDeletion ? 0 : deletionWidth;
					}

					this.parent._context.highlight = [null, null];

					this.parent.update();
					this.parent._audio.play();

					this.after({
						characters: deletedContent,
						currentIndex: this.parent._context.index
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
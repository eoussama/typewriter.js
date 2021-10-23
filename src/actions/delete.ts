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
	 *
	 @param times Number of deletions
	 * @param parentResolve Parent resolve function
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

		let times = (typeof this.times === 'string' && this.times === 'start') ? this.parent.context.index : this.times;

		return new Promise(async resolve => {
			try {
				for await (let _ of this.step(times, step)) {
					this.before();

					const deletionWidth = Math.min(times, step);

					// Deleting highlighted content
					if (this.parent.hasHighlight()) {
						const start = <number>this.parent.context.highlight[0];
						const end = <number>this.parent.context.highlight[1] + 1;

						this.parent.context.content = [
							...this.parent.context.content.slice(0, start),
							...this.parent.context.content.slice(end)
						];

						// Deleting regular content
					} else {
						this.parent.context.content = [
							...this.parent.context.content.slice(0, this.parent.context.index - deletionWidth),
							...this.parent.context.content.slice(this.parent.context.index + deletionWidth - 1)
						]

						this.parent.context.index -= deletionWidth;
						times -= deletionWidth;
					}

					this.parent.context.highlight = [null, null];

					this.parent.update();
					this.parent.audio.play();

					this.after();
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
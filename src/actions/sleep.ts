import { Action } from "./action.js";

/**
 * @description
 * Typewriter sleep action
 */
export class Sleep extends Action {

	/**
	 * @description
	 * Timeout time in milliseconds
	 */
	time!: number;

	/**
	 * @description
	 * Instantiates a sleep action,
	 * times out the execution of the action chain
	 *
	 * @param time The time in milliseconds
	 */
	constructor(time: number) {
		super();
		this.time = time;
	}

	/**
	 * @description
	 * Initiates the sleep action
	 */
	async start(): Promise<void> {
		return new Promise(resolve => {
			setTimeout(() => {
				resolve();
			}, this.time);
		});
	}
}
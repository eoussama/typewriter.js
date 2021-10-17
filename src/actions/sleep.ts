import Typewriter from "../index.js";
import { Action } from "./action.js";
import { IActionConfig } from "../types/action-config.type.js";
import { timeOut } from "../utils/timeout.js";

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
	 * @param parent The parent typewriter
	 * @param config The configuration object
	 */
	constructor(time: number, parent: Typewriter, config?: IActionConfig) {
		super(parent, config);
		this.time = time;
	}

	/**
	 * @description
	 * Initiates the sleep action
	 */
	public async start(): Promise<void> {
		await super.start();
		await this.sleep();
	}

	/**
	 * @description
	 * Times-out the action queue
	 */
	private async sleep(): Promise<void> {
		return new Promise(async resolve => {
			this.before();
			await timeOut(this.time);
			this.after();

			this.resolveAction();
			resolve();
		});
	}
}
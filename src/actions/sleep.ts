import Action from './action.js';
import Typewriter from '../index.js';
import timeOut from '../utils/timeout.js';
import { IActionConfig } from '../types/action-config.type.js';

/**
 * @description
 * Typewriter sleep action
 */
export default class Sleep extends Action {

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
	 * Times-out the action queue
	 */
	protected run(): Promise<void> {
		const time = Math.max(0, this.time);

		return new Promise(async resolve => {
			try {
				this.before();
				await timeOut(time);
				this.after();

				resolve();
			} catch (err) {
				this.parent.errorHandler(err);
			}
		});
	}
}
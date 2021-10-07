import { Action } from "./action.js";

/**
 * @description
 * Typewriter exec action,
 * used for user-defined actions
 */
export class Exec extends Action {

	/**
	 * @description
	 * The user-defined action
	 */
	private func: any;

	/**
	 * @description
	 * Instantiates an exec action
	 *
	 * @param
	 * The user-defined action
	 */
	constructor(func:any) {
		super();
		this.func = func;
	}

	/**
	 * @description
	 * Initiates the exec action
	 */
	async start(): Promise<void> {
		return new Promise(async resolve => {
			await this.func();
			resolve();
		});
	}
}
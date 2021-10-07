import { Action } from "./action.js";

/**
 * @description
 * Typewriter type action
 */
export class Type extends Action {

	/**
	 * @description
	 * Instantiates a type action
	 *
	 * @param input The target input
	 */
	constructor(input: string) {
		super(input);
	}

	/**
	 * @description
	 * Initiates typewriter action
	 *
	 * @param context Typewriter context
	 * @param update The update method
	 * @param input The target input
	 * @param parentResolve Parent resolve function
	 */
	async start(context: any, update: any, input: string = this.input, parentResolve?: any): Promise<void> {
		return new Promise(resolve => {
			setTimeout(() => {
				const character = input[0];
				const rest = input.substr(1);

				context.content += character;
				context.index = context.content.length - 1;
				update();

				if (rest.length > 0) {
					this.start(context, update, rest, parentResolve ?? resolve);
				} else {
					parentResolve();
				}
			}, 200);
		});
	}
}
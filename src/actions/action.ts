/**
 * @description
 * Base typewriter action
 */
export class Action {

	/**
	 * @description
	 * The target input
	 */
	protected input!: string;

	/**
	 * @description
	 * Instantiates a base typewriter action
	 *
	 * @param input The target input
	 */
	constructor(input: string) {
		this.input = input;
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
	async start(context: any, update: any, input?: string, parentResolve?: any): Promise<void> { }
}

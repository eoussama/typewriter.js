import Typewriter from '../index.js';
import timeOut from '../utils/timeout.js';
import { IActionConfig } from '../types/action-config.type.js';

/**
 * @description
 * Base typewriter action
 */
export default class Action {

	/**
	 * @description
	 * The action configuration object
	 */
	protected readonly config!: IActionConfig;

	/**
	 * @description
	 * The parent typewriter object
	 */
	protected parent!: Typewriter;

	/**
	 * @description
	 * Instantiates a base typewriter action
	 *
	 * @param parent The parent typewriter
	 * @param config The configuration object
	 */
	constructor(parent: Typewriter, config?: IActionConfig) {
		this.parent = parent;
		this.config = config as any ?? {};
	}

	/**
	 * @description
	 * Overrides the current action parent
	 *
	 * @param parent The input parent
	 */
	public setParent(parent: Typewriter): void {
		if (parent instanceof Typewriter) {
			this.parent = parent;
		}
	}

	/**
	 * @description
	 * Fires before events
	 */
	public before(params: object = {}): void {
		const name = this.constructor.name?.toLowerCase();
		this.parent.events.filter(e => e.event === `before:${name}`).forEach(event => event.func(params));
	}

	/**
	 * @description
	 * Fires after events
	 */
	public after(params: object = {}): void {
		const name = this.constructor.name?.toLowerCase();
		this.parent.events.filter(e => e.event === `after:${name}`).forEach(event => event.func(params));
	}

	/**
	 * @description
	 * Initiates the action
	 */
	public async start(): Promise<void> {
		const repeat = this.getConfig('repeat');

		for await (let _ of Array(repeat).fill(0)) {
			const delay = this.getConfig('delay');

			await timeOut(delay);
			await this.run();
			await this.done();
		}
	}

	/**
	 * @override
	 * @description
	 * Runs the action's instructions
	 */
	protected run(): Promise<any> {
		return Promise.resolve();
	}

	/**
	 * @description
	 * Returns the target key value,
	 * used to check both global and local configuration.
	 *
	 * @param key The config key
	 * @param fallback An optional fallback value
	 */
	protected getConfig(key: keyof IActionConfig, fallback?: any) {
		const localValue = this.config ? this.config[key] : null;
		const globalValue = this.parent.config ? this.parent.config[key] : null;

		return localValue ?? globalValue ?? fallback;
	}

	/**
	 * @description
	 * Defines required steps to resolve the action
	 *
	 * @param length The length of the steps
	 * @param step The step of every iteration
	 */
	protected * step(length: number, step: number = 1) {
		const max = Math.abs(length);

		for (let i = 0; i < max; i += step) {
			yield i;
		}
	}

	/**
	 * @description
	 * Calls the resolving user-defined callback
	 */
	private done(): Promise<any> {
		return this.getConfig('done')();
	}
}

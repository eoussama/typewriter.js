import Typewriter from "../index.js";
import { IActionConfig } from "../types/action-config.type.js";

/**
 * @description
 * Base typewriter action
 */
export class Action {

	/**
	 * @description
	 * The action configuration object
	 */
	protected config!: IActionConfig;

	/**
	 * @description
	 * The parent typewriter object
	 */
	protected readonly parent!: Typewriter;

	/**
	 * @description
	 * The containing queue ID
	 */
	public queueId!: string;

	/**
	 * @description
	 * Instantiates a base typewriter action
	 *
	 * @param parent The parent typewriter
	 * @param config The configuration object
	 */
	constructor(parent: Typewriter, config?: IActionConfig) {
		this.parent = parent;
		this.config = config as any;
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
		const globalValue = this.parent._config ? this.parent._config[key] : null;

		return localValue ?? globalValue ?? fallback;
	}

	/**
	 * @description
	 * Calls the resolving user-defined callback
	 */
	protected resolveAction() {
		this.getConfig('done')();
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
	 * Fires before events
	 */
	public before(params: object = {}): void {
		const name = this.constructor.name?.toLowerCase();
		this.parent._events.filter(e => e.event === `before:${name}`).forEach(event => event.func(params));
	}

	/**
	 * @description
	 * Fires after events
	 */
	public after(params: object = {}): void {
		const name = this.constructor.name?.toLowerCase();
		this.parent._events.filter(e => e.event === `after:${name}`).forEach(event => event.func(params));
	}

	/**
	 * @description
	 * Initiates the action
	 */
	public async start(): Promise<void> {
		const delay = this.getConfig('delay');

		return new Promise(resolve => {
			setTimeout(() => {
				this.parent._pauseObservable.subscribe((e) => {
					if (!e && this.parent._queuer.isValid(this)) {
						resolve();
					}
				});
			}, delay);
		});
	}
}

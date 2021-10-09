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
		const globalValue = this.parent.config ? this.parent.config[key] : null;

		return localValue ?? globalValue ?? fallback;
	}

	/**
	 * @description
	 * Initiates the action
	 */
	public async start(): Promise<void> {
		return new Promise(resolve => {
			this.parent.pauseObservable.subscribe((e) => {
				if (!e && this.parent.queuer.isValid(this)) {
					resolve();
				}
			});
		});
	}
}

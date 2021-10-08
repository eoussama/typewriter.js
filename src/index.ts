import { Nullable } from "./types/nullable.type.js";

import { IConfig } from "./types/config.type.js";
import { IActionConfig } from "./types/action-config.type.js";

import { Action } from "./actions/action.js";
import { Type } from "./actions/type.js";
import { Sleep } from "./actions/sleep.js";
import { Exec } from "./actions/exec.js";
import { Move } from "./actions/move.js";

export default class Typewriter {

	public readonly context = {
		content: '',
		index: 0
	};

	/**
	 * @description
	 * Action queue
	 */
	private readonly queue: Array<Action> = [];

	/**
	 * @description
	 * HTML target element
	 */
	private readonly target!: Nullable<HTMLElement>;

	/**
	 * @description
	 * Global configuration
	 */
	public config!: IConfig;

	/**
	 * @description
	 * Instantiates the typewriter
	 *
	 * @param selector The target selector
	 * @param config The global configuration object
	 */
	constructor(selector: string, config?: IConfig) {
		this.target = document.querySelector(selector);

		this.config = {
			step: config?.step ?? 1,
			speed: config?.speed ?? 300
		};

		this.render();
	}

	public async start() {
		for await (let action of this.queue) {
			await action.start();
		}
	}

	/**
	 * @description
	 * Initiates a sleep action
	 *
	 * @param time The timeout time in milliseconds
	 */
	public sleep(time: number) {
		this.queue.push(new Sleep(time, this));
		return this;
	}

	/**
	 * @description
	 * Initiates anb exec action
	 *
	 * @param func The user-defined action
	 */
	public exec(func: Promise<void>) {
		this.queue.push(new Exec(func, this));
		return this;
	}

	/**
	 * @description
	 * Initiates a type action
	 *
	 * @param input The target input
	 * @param config The action configuration
	 */
	public type(input: string, config?: IActionConfig) {
		this.queue.push(new Type(input, this, config));
		return this;
	}

	/**
	 * @description
	 * Initiates a move action
	 *
	 * @param input The target input
	 * @param config The action configuration
	 */
	public move(index: number, config?: IActionConfig) {
		this.queue.push(new Move(index, this, config));
		return this;
	}

	/**
	 * @description
	 * The update callback, called from inside every action
	 */
	public update(): void {
		this.render();
	}

	/**
	 * @description
	 * Renders the context inside of the target HTML element
	 */
	private render(): void {
		if (this.target) {
			let output = '';

			if (this.context.content.length > 0) {
				this.context.content.split('').forEach((char, i) => {
					output += `<span class="tw-char">${char}</span>`;

					if (i + 1 === this.context.index) {
						output += `<span class="tw_caret">_</span>`;
					}
				});
			} else {
				output += `<span class="tw_caret">_</span>`;
			}

			this.target.innerHTML = output;
		}
	}
}

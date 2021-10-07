import { Nullable } from "./types/nullable.type.js";

import { Action } from "./actions/action.js";
import { Type } from "./actions/type.js";
import { Sleep } from "./actions/sleep.js";
import { Exec } from "./actions/exec.js";

export default class Typewriter {

	private context = {
		content: '',
		index: 0
	};

	/**
	 * @description
	 * Action queue
	 */
	private queue: Array<Action> = [];

	/**
	 * @description
	 * HTML target element
	 */
	private target!: Nullable<HTMLElement>;

	constructor(selector: string) {
		this.target = document.querySelector(selector);
		this.render();
	}

	public async start() {
		for await (let action of this.queue) {
			await action.start(this.context, this.update.bind(this));
		}
	}

	/**
	 * @description
	 * Initiates a sleep action
	 *
	 * @param time The timeout time in milliseconds
	 */
	public sleep(time: number) {
		this.queue.push(new Sleep(time));
		return this;
	}

	/**
	 * @description
	 * Initiates anb exec action
	 *
	 * @param func The user-defined action
	 */
	public exec(func: Promise<void>) {
		this.queue.push(new Exec(func));
		return this;
	}

	/**
	 * @description
	 * Initiates a type action
	 *
	 * @param input The target input
	 */
	public type(input: string) {
		this.queue.push(new Type(input));
		return this;
	}

	/**
	 * @description
	 * The update callback, called from inside every action
	 */
	private update(): void {
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

					if (i === this.context.index) {
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

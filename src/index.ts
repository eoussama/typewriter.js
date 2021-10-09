import { Nullable } from "./types/nullable.type.js";

import { IConfig } from "./types/config.type.js";
import { IActionConfig } from "./types/action-config.type.js";

import { Action } from "./actions/action.js";
import { Type } from "./actions/type.js";
import { Sleep } from "./actions/sleep.js";
import { Exec } from "./actions/exec.js";
import { Move } from "./actions/move.js";
import { Delete } from "./actions/delete.js";

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
	 * Whether the typewriter is paused
	 */
	public paused: boolean = false;

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
			caret: {
				enable: config?.caret?.enable ?? true,
				blink: config?.caret?.blink ?? true,
				content: config?.caret?.content ?? '_'
			},
			step: config?.step ?? 1,
			speed: config?.speed ?? 300
		};

		this.injectStyle();
		this.render();
	}

	public async start(): Promise<void> {
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
	public sleep(time: number): Typewriter {
		this.queue.push(new Sleep(time, this));
		return this;
	}

	/**
	 * @description
	 * Initiates anb exec action
	 *
	 * @param func The user-defined action
	 */
	public exec(func: Promise<void>): Typewriter {
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
	public type(input: string, config?: IActionConfig): Typewriter {
		this.queue.push(new Type(input, this, config));
		return this;
	}

	/**
	 * @description
	 * Initiates a delete action
	 *
	 * @param times Number of deletions
	 * @param config The action configuration
	 */
	public delete(times: number, config?: IActionConfig): Typewriter {
		this.queue.push(new Delete(times, this, config));
		return this;
	}

	/**
	 * @description
	 * Initiates a move action
	 *
	 * @param index The target index
	 * @param config The action configuration
	 */
	public move(index: number, config?: IActionConfig): Typewriter {
		this.queue.push(new Move(index, this, config));
		return this;
	}

	/**
	 * @description
	 * Pauses the actions of typewriter
	 */
	public pause(): void {
		this.paused = true;
	}

	/**
	 * @description
	 * Resumes the actions of the typewriter
	 */
	public resume(): void {
		this.paused = false;
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
	 * Returnes the rendered caret
	 */
	private renderedCaret(): string {
		return `<span class="tw_caret ${this.config.caret.blink ? 'tw_blink' : ''}">${this.config.caret.content}</span>`;
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

					if (this.config?.caret?.enable && i + 1 === this.context.index) {
						output += this.renderedCaret();
					}
				});
			} else if (this.config?.caret?.enable) {
				output += this.renderedCaret();
			}

			this.target.innerHTML = output;
		}
	}

	/**
	 * @description
	 * Injects CSS styling for certain features to work,
	 * ex; caret blinking, etc...
	 */
	private injectStyle(): void {
		let styles = document.getElementById('tw_styles');

		if (!styles) {
			styles = document.createElement('style');
			styles.id = 'tw_styles';
			styles.textContent = `
				.tw_caret.tw_blink {
					animation-name: tw_blink_animation;
					animation-duration: 0.5s;
					animation-iteration-count: infinite;
					animation-direction: alternate-reverse;
				}

				@keyframes tw_blink_animation {
					from {
						opacity: 0;
					}

					to {
						opacity: 1
					}
				}
			`;
			document.head.appendChild(styles);
		}
	}
}

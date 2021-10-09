import { IConfig } from "./types/config.type.js";
import { IActionConfig } from "./types/action-config.type.js";

import { Renderer } from "./utils/renderer.js";

import { Action } from "./actions/action.js";
import { Type } from "./actions/type.js";
import { Sleep } from "./actions/sleep.js";
import { Exec } from "./actions/exec.js";
import { Move } from "./actions/move.js";
import { Delete } from "./actions/delete.js";
import { IContext } from "./types/context.type.js";

/**
 * @description
 * Typewriter
 */
export default class Typewriter {

	/**
	 * @description
	 * The typewriter's context
	 */
	public readonly context!: IContext;

	/**
	 * @description
	 * The renderer responsible on rendering
	 * the typewriter's output
	 */
	public readonly renderer!: Renderer;

	/**
	 * @description
	 * Action queue
	 */
	private readonly queue: Array<Action> = [];

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
		this.context = {
			content: '',
			index: 0
		};

		this.config = {
			caret: config?.caret,
			step: config?.step ?? 1,
			speed: config?.speed ?? 300
		};

		const target = <HTMLElement>document.querySelector(selector);
		this.renderer = new Renderer(target, this.context);
	}

	/**
	 * @description
	 * Starts the actions queue
	 */
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
	 * The update callback, called from inside every action
	 */
	public update(): void {
		this.renderer.render();
	}
}

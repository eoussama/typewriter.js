import { IConfig } from "./types/config.type.js";
import { IActionConfig } from "./types/action-config.type.js";

import { Renderer } from "./utils/renderer.js";

import { Type } from "./actions/type.js";
import { Sleep } from "./actions/sleep.js";
import { Exec } from "./actions/exec.js";
import { Move } from "./actions/move.js";
import { Delete } from "./actions/delete.js";
import { IContext } from "./types/context.type.js";
import { Queuer } from "./utils/queuer.js";
import { Observable } from "./utils/observable.js";
import { Audio } from "./utils/audio.js";
import { Func } from "./types/function.type.js";
import { IActions } from "./types/actions.type.js";

/**
 * @description
 * Typewriter
 */
export default class Typewriter implements IActions {

	/**
	 * @description
	 * The renderer responsible on rendering
	 * the typewriter's output
	 */
	private readonly renderer!: Renderer;

	/**
	 * @description
	 * Event list
	 */
	public events!: Array<{ event: string, func: Func<any> }>;

	/**
	 * @description
	 * The queuer responsible for
	 * organizing the actions
	 */
	public readonly queuer!: Queuer;

	/**
	 * @description
	 * The audio utility responsible
	 * for playing SFX
	 */
	public readonly audio!: Audio;

	/**
	 * @description
	 * The pause observable, handles updates
	 * for pause/resume operations
	 */
	public readonly pauseObservable!: Observable<boolean>;

	/**
	 * @description
	 * The typewriter's context
	 */
	public readonly context!: IContext;

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

		// Initializing the events
		this.events = [];

		// Initializing the context
		this.context = {
			content: '',
			index: 0
		};

		// Initializing global configurations
		this.config = {
			caret: config?.caret,
			audio: config?.audio,
			step: config?.step ?? 1,
			delay: config?.delay ?? 0,
			speed: config?.speed ?? 300
		};

		// Initializing the renderer
		const target = <HTMLElement>document.querySelector(selector);
		this.renderer = new Renderer(target, this.context, this.config.caret);

		// Initializing the audio utility
		this.audio = new Audio(this.config.audio);

		// Initializing the queuer
		this.queuer = new Queuer();

		// Initializing the pause/resume observable
		this.pauseObservable = new Observable<boolean>(false);
	}

	/**
	 * @description
	 * Starts the actions queue
	 */
	public async start(): Promise<void> {
		for await (let action of this.queuer.items) {
			if (!this.queuer.isValid(action)) {
				continue;
			}

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
		const action = new Sleep(time, this);
		this.queuer.add(action);
		return this;
	}

	/**
	 * @description
	 * Initiates anb exec action
	 *
	 * @param func The user-defined action
	 */
	public exec(func: Promise<void>): Typewriter {
		const action = new Exec(func, this);
		this.queuer.add(action);

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
		const action = new Type(input, this, config);
		this.queuer.add(action);

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
		const action = new Delete(times, this, config);
		this.queuer.add(action);

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
		const action = new Move(index, this, config);
		this.queuer.add(action);

		return this;
	}

	/**
	 * @description
	 * Pauses the execution of the actions
	 */
	public pause(): void {
		this.pauseObservable.emit(true);
	}

	/**
	 * @description
	 * Resumes the execution of the actions
	 */
	public resume(): void {
		this.pauseObservable.emit(false);
	}

	/**
	 * @description
	 * Resets the entire typewriter
	 */
	public reset(): void {
		this.context.content = '';
		this.context.index = 0;

		this.queuer.reset();
		this.renderer.reset();
		this.pauseObservable.emit(false);
	}

	/**
	 * @description
	 * Subscribes to events
	 */
	public before<T>(event: keyof IActions, func: Func<T>): void {
		this.events.push({ event: `before:${event}`, func });
	}

	/**
	 * @description
	 * Subscribes to events
	 */
	public after<T>(event: keyof IActions, func: Func<T>): void {
		this.events.push({ event: `after:${event}`, func });
	}

	/**
	 * @description
	 * The update callback, called from inside every action
	 */
	public update(): void {
		this.renderer.render();
	}
}

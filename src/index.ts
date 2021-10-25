import { IConfig } from "./types/config.type.js";
import { IActionConfig, IActionConfigType } from "./types/action-config.type.js";

import { Renderer } from "./utils/renderer.js";

import { Type } from "./actions/type.js";
import { Sleep } from "./actions/sleep.js";
import { Exec } from "./actions/exec.js";
import { Move } from "./actions/move.js";
import { Delete } from "./actions/delete.js";
import { Highlight } from "./actions/highlight.js";
import { Tab } from "./actions/tab.js";
import { Return } from "./actions/return.js";
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
	private readonly _renderer!: Renderer;

	/**
	 * @description
	 * Event list
	 */
	public _events!: Array<{ event: string, func: Func<any> }>;

	/**
	 * @description
	 * The queuer responsible for
	 * organizing the actions
	 */
	public readonly _queuer!: Queuer;

	/**
	 * @description
	 * The audio utility responsible
	 * for playing SFX
	 */
	public readonly _audio!: Audio;

	/**
	 * @description
	 * The pause observable, handles updates
	 * for pause/resume operations
	 */
	public readonly _pauseObservable!: Observable<boolean>;

	/**
	 * @description
	 * The typewriter's context
	 */
	public readonly _context!: IContext;

	/**
	 * @description
	 * Global configuration
	 */
	public _config!: IConfig;

	/**
	 * @description
	 * Returns the event handler
	 */
	get errorHandler() {
		const handler = this._events.find(e => e.event === 'error')?.func ?? (() => { })
		return handler;
	}

	/**
	 * @description
	 * Instantiates the typewriter
	 *
	 * @param selector The target selector
	 * @param config The global configuration object
	 */
	constructor(selector: string, config?: IConfig) {

		// Initializing the events
		this._events = [];

		// Initializing the context
		this._context = {
			index: 0,
			content: [],
			highlight: [null, null]
		};

		// Initializing global configurations
		this._config = {
			caret: config?.caret,
			audio: config?.audio,
			step: config?.step ?? 1,
			delay: config?.delay ?? 0,
			speed: config?.speed ?? 300,
			done: config?.done ?? (() => { }),
			parseHTML: config?.parseHTML ?? true,
			targetAttribute: config?.targetAttribute ?? 'innerHTML'
		};

		// Initializing the content
		const target = <HTMLElement>document.querySelector(selector);
		this.initializeContent(target);

		// Initializing the renderer
		this._renderer = new Renderer(target, this._config?.targetAttribute, this._config?.parseHTML, this._context, this._config.caret);

		// Initializing the audio utility
		this._audio = new Audio(this._config.audio);

		// Initializing the queuer
		this._queuer = new Queuer();

		// Initializing the pause/resume observable
		this._pauseObservable = new Observable<boolean>(false);
	}

	/**
	 * @description
	 * Starts the actions queue
	 */
	public async start(): Promise<void> {
		for await (let action of this._queuer.items) {
			if (!this._queuer.isValid(action)) {
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
		this._queuer.add(action);
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
		this._queuer.add(action);

		return this;
	}

	/**
	 * @description
	 * Initiates a type action
	 *
	 * @param input The target input
	 * @param config The action configuration
	 */
	public type(input: string, config?: IActionConfigType): Typewriter {
		const action = new Type(input, this, config);
		this._queuer.add(action);

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
		this._queuer.add(action);

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
		this._queuer.add(action);

		return this;
	}

	/**
	 * @description
	 * Highlights content
	 *
	 * @param index The target index
	 * @param config The action configuration
	 */
	public highlight(index: number, config?: IActionConfig): Typewriter {
		const action = new Highlight(index, this, config);
		this._queuer.add(action);

		return this;
	}

	/**
	 * @description
	 * Inserts tabulation
	 *
	 * @param spaces Number of spaces that make the tabulation
	 * @param config The action configuration
	 */
	public tab(index: number = 4, config?: IActionConfig): Typewriter {
		const action = new Tab(index, this, config);
		this._queuer.add(action);

		return this;
	}

	/**
	 * @description
	 * Inserts carriage return
	 *
	 * @param config The action configuration
	 */
	public return(config?: IActionConfig): Typewriter {
		const action = new Return(this, config);
		this._queuer.add(action);

		return this;
	}

	/**
	 * @description
	 * Pauses the execution of the actions
	 */
	public pause(): void {
		this._pauseObservable.emit(true);
	}

	/**
	 * @description
	 * Resumes the execution of the actions
	 */
	public resume(): void {
		this._pauseObservable.emit(false);
	}

	/**
	 * @description
	 * Resets the entire typewriter
	 */
	public reset(): void {
		this._context.index = 0;
		this._context.content = [];
		this._context.highlight = [null, null];

		this._queuer.reset();
		this._renderer.reset();
		this._pauseObservable.emit(false);
	}

	/**
	 * @description
	 * Subscribes to events
	 */
	public before<T>(event: keyof IActions, func: Func<T>): void {
		this._events.push({ event: `before:${event}`, func });
	}

	/**
	 * @description
	 * Subscribes to events
	 */
	public after<T>(event: keyof IActions, func: Func<T>): void {
		this._events.push({ event: `after:${event}`, func });
	}

	/**
	 * @description
	 * The update callback, called from inside every action
	 */
	public update(): void {
		this._renderer.render();
	}

	/**
	 * @description
	 * Hooks the event handler
	 *
	 * @param handler The event handler
	 */
	public catch<T>(handler: Func<T>): void {
		const handlerIndex = this._events.findIndex(e => e.event === 'error');

		if (handlerIndex === -1) {
			this._events.push({ event: `error`, func: handler });
		} else {
			this._events[handlerIndex].func = handler;
		}
	}

	/**
	 * @description
	 * Checks if content has highlight
	 */
	public hasHighlight(): boolean {
		return this._context.highlight.map(e => parseInt(e as any, 10)).filter(e => !isNaN(e)).length === 2
	}

	/**
	 * @description
	 * Initializes the contents, copyies over the target's
	 * contents and adapts the typewriter's context.
	 *
	 * @param target The target element
	 */
	private initializeContent(target: HTMLElement): void {
		const targetAttribute = this._config.targetAttribute === 'innerHTML' ? 'textContent' : this._config.targetAttribute;
		const targetContent = (target as any)[targetAttribute];

		this._context.content = targetContent?.split('').map((e: string) => ({ char: e, props: { classes: [] } })) ?? [];
		this._context.index = this._context.content.length;
	}
}

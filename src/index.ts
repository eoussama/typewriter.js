import IActions from './types/actions.type';
import IConfig from './types/config.type.js';
import { IActionConfig, IActionConfigType } from './types/action-config.type.js';

import Context from "./utils/context.js";
import Renderer from './utils/renderer.js';

import Audio from './utils/audio.js';
import { Func } from './types/function.type.js';
import ActionInvoker from './utils/action-manager.js';

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
	 * Action manager
	 */
	public actionManager!: ActionInvoker;

	/**
	 * @description
	 * Event list
	 */
	public events!: Array<{ event: string, func: Func<any> }>;

	/**
	 * @description
	 * The audio utility responsible
	 * for playing SFX
	 */
	public readonly audio!: Audio;

	/**
	 * @description
	 * The typewriter's context
	 */
	public readonly context!: Context;

	/**
	 * @description
	 * Global configuration
	 */
	public config!: IConfig;

	/**
	 * @description
	 * Returns raw text content
	 */
	get getText() {
		return this.renderer.parseContent(false);
	}

	/**
	 * @description
	 * Returns HTML text content
	 */
	get getHtml() {
		return this.renderer.parseContent(true);
	}

	/**
	 * @description
	 * Returns the highlighted content
	 */
	get getHighlight() {
		const start = this.context.highlight[0] ?? 0;
		const end = (this.context.highlight[1] ?? 0) + 1;

		return this.context.content.slice(start, end)?.map(e => e.char)?.join('') ?? '';
	}

	/**
	 * @description
	 * Returns the event handler
	 */
	get errorHandler() {
		const handler = this.events.find(e => e.event === 'error')?.func ?? (() => { })
		return handler;
	}

	/**
	 * @description
	 * Instantiates the typewriter
	 *
	 * @param element The target element or selector
	 * @param config The global configuration object
	 */
	constructor(element: string | HTMLElement, config?: IConfig) {

		// Initializing global configurations
		this.config = {
			caret: config?.caret,
			audio: config?.audio,
			step: config?.step ?? 1,
			delay: config?.delay ?? 0,
			speed: config?.speed ?? 300,
			repeat: config?.repeat ?? 1,
			done: config?.done ?? (() => { }),
			parseHTML: config?.parseHTML ?? true,
			targetAttribute: config?.targetAttribute ?? 'innerHTML'
		};

		// Initializing the events
		this.events = [];

		// Initializing the context
		this.context = new Context(this.config?.targetAttribute);

		// Initializing the content
		const target = typeof element === 'string' ? <HTMLElement>document.querySelector(element) : element;
		this.context.initializeContent(target);

		// Initializing the renderer
		this.renderer = new Renderer(target, this.config?.targetAttribute, this.config?.parseHTML, this.context, this.config.caret);

		// Initializing the audio utility
		this.audio = new Audio(this.config.audio);

		// Initializing the action manager
		this.actionManager = new ActionInvoker(this);
	}

	/**
	 * @description
	 * Starts the actions queue
	 */
	public async start(): Promise<void> {
		for await (let action of this.actionManager.next()) {
			await action?.start();
		}
	}

	/**
	 * @description
	 * Initiates a sleep action
	 *
	 * @param time The timeout time in milliseconds
	 */
	public sleep(time: number): Typewriter {
		return this.actionManager.sleep(time);
	}

	/**
	 * @description
	 * Initiates anb exec action
	 *
	 * @param func The user-defined action
	 */
	public exec(func: Promise<void>): Typewriter {
		return this.actionManager.exec(func);
	}

	/**
	 * @description
	 * Initiates a type action
	 *
	 * @param input The target input
	 * @param config The action configuration
	 */
	public type(input: string, config?: IActionConfigType): Typewriter {
		return this.actionManager.type(input, config);
	}

	/**
	 * @description
	 * Initiates a delete action
	 *
	 * @param times Number of deletions
	 * @param config The action configuration
	 */
	public delete(times: number, config?: IActionConfig): Typewriter {
		return this.actionManager.delete(times, config);
	}

	/**
	 * @description
	 * Initiates a move action
	 *
	 * @param index The target index
	 * @param config The action configuration
	 */
	public move(index: number, config?: IActionConfig): Typewriter {
		return this.actionManager.move(index, config);
	}

	/**
	 * @description
	 * Highlights content
	 *
	 * @param index The target index
	 * @param config The action configuration
	 */
	public highlight(index: number, config?: IActionConfig): Typewriter {
		return this.actionManager.highlight(index);
	}

	/**
	 * @description
	 * Inserts tabulation
	 *
	 * @param spaces Number of spaces that make the tabulation
	 * @param config The action configuration
	 */
	public tab(index: number = 4, config?: IActionConfig): Typewriter {
		return this.actionManager.tab(index, config);
	}

	/**
	 * @description
	 * Inserts carriage return
	 *
	 * @param config The action configuration
	 */
	public return(config?: IActionConfig): Typewriter {
		return this.actionManager.return(config);
	}

	/**
	 * @description
	 * Resets the entire typewriter
	 */
	public reset(): void {
		this.context.reset();
		this.renderer.reset();
		this.actionManager.reset();
	}

	/**
	 * @description
	 * Subscribes to events
	 *
	 * @param event The event name
	 * @param func Callback
	 */
	public before<T>(event: string, func: Func<T>): void {
		this.events.push({ event: `before:${event}`, func });
	}

	/**
	 * @description
	 * Subscribes to events
	 *
	 * @param event The event name
	 * @param func Callback
	 */
	public after<T>(event: string, func: Func<T>): void {
		this.events.push({ event: `after:${event}`, func });
	}

	/**
	 * @description
	 * The update callback, called from inside every action
	 */
	public update(): void {
		this.renderer.render();
	}

	/**
	 * @description
	 * Hooks the event handler
	 *
	 * @param handler The event handler
	 */
	public catch<T>(handler: Func<T>): void {
		const handlerIndex = this.events.findIndex(e => e.event === 'error');

		if (handlerIndex === -1) {
			this.events.push({ event: `error`, func: handler });
		} else {
			this.events[handlerIndex].func = handler;
		}
	}
}

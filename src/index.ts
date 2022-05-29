import Renderer from './utils/renderer.util.js';
import Timeline from './utils/timeline.util.js';
import timeout from './utils/timeout.util.js';

/**
 * @class
 * @description
 * Virtual typewriter
 */
export default class Typewriter {

	/**
	 * @description
	 * Rendering manager
	 */
	private timeline: Timeline;

	/**
	 * @description
	 * Rendering manager
	 */
	private renderer: Renderer;

	/**
	 * @description
	 * Creates a typewriter instance
	 *
	 * @param target DOM element instance that recieves updates
	 */
	constructor(target: HTMLElement) {
		this.renderer = new Renderer(target);
		this.timeline = new Timeline();
	}

	type(input: string) {
		for (let char of input) {
			this.write(char);
		}
	}

	delete(chars: number) {
		const range = Array(chars).fill(0);

		for (let _ of range) {
			this.remove(1);
		}
	}

	async start() {
		for await (let tick of this.timeline.getTicks()) {
			await timeout(tick.delay);
			this.renderer.render(tick);
		}
	}

	private write(character: string, delay = 0) {
		const currentTick = this.timeline.getTick();
		const content = currentTick.content + character;
		const index = currentTick.index + (content.length === 1 ? 0 : 1);

		this.timeline.update({ content, index, delay });
	}

	private remove(char: number, delay = 1000) {
		const currentTick = this.timeline.getTick();
		const start = char + currentTick.index;
		const content = currentTick.content.substring(0, start - 1) + currentTick.content.substring(start);
		const index = Math.max(currentTick.index - 1, 0);

		this.timeline.update({ content, index, delay });
	}
}

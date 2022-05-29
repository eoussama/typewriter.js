import Tick from './models/tick.model.js';
import Renderer from './utils/renderer.util.js';
import timeout from './utils/timeout.util.js';

/**
 * @description
 * Typewriter
 */
export default class Typewriter {

	private ticks: Array<Tick>;

	private cursor: number;

	private renderer: Renderer;

	constructor(target: HTMLElement) {
		this.cursor = 0;
		this.ticks = [];
		this.renderer = new Renderer(target);

		this.ticks.push(new Tick('', 0));
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
		for await (let tick of this.ticks) {
			await timeout(tick.delay);
			this.renderer.render(tick);
		}
	}

	private write(character: string, delay = 0) {
		const currentTick = this.getTick();
		const content = currentTick.content + character;
		const index = currentTick.index + (content.length === 1 ? 0 : 1);

		this.update(content, index, delay);
	}

	private remove(char: number, delay = 1000) {
		const currentTick = this.getTick();
		const start = char + currentTick.index;
		const content = currentTick.content.substring(0, start - 1) + currentTick.content.substring(start);
		const index = Math.max(currentTick.index - 1, 0);

		this.update(content, index, delay);
	}

	private update(content: string, index: number, delay: number = 0) {
		const tick = new Tick(content, index, delay);

		this.ticks.push(tick);
		this.cursor++;
	}

	private getTick() {
		return { ...this.ticks[this.cursor] };
	}
}

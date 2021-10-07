import { Type } from "./actions/type.js";
import { Action } from "./actions/action.js";
import { Nullable } from "./types/nullable.type.js";

export default class Typewriter {

	private context = {
		content: '',
		index: 0
	};

	private queue: Array<Action> = [];
	private target!: Nullable<HTMLElement>;

	constructor(selector: string) {
		this.target = document.querySelector(selector);
		this.render();
	}

	public type(input: string) {
		this.queue.push(new Type(input));
		return this;
	}

	public async start() {
		for await (let action of this.queue) {
			await action.start(this.context, this.update.bind(this));
		}
	}

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

	private update(): void {
		this.render();
	}
}

export default class Typewriter {

	private context = {
		content: '',
		index: 0
	};

	private queue: Array<Type> = [];
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

class Action {
	protected input!: string;

	constructor(input: string) {
		this.input = input;
	}
}

class Type extends Action {

	constructor(input: string) {
		super(input);
	}

	async start(context: any, update: any, input: string = this.input, parentResolve?: any): Promise<void> {
		return new Promise(resolve => {
			setTimeout(() => {
				const character = input[0];
				const rest = input.substr(1);

				context.content += character;
				context.index = context.content.length - 1;
				update();

				if (rest.length > 0) {
					this.start(context, update, rest, parentResolve ?? resolve);
				} else {
					parentResolve();
				}
			}, 200);
		});
	}
}

type Nullable<T> = T | null;

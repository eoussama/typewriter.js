/**
 * 
 * @name:       typewriterjs
 * @version:    5.0.0
 * @author:     EOussama
 * @license     MIT
 * @source:     https://github.com/EOussama/typewriterjs
 *
 * A typewriter for the web.
 * 
 */


/**
 * The typewriter classes.
 */
class Typewriter {

	//#region Properties



	//#endregion

	//#region Lifecycle

	constructor(selector, config = {}) {
		try {

			// Checking the validity of the selector
			if (!selector || typeof selector !== 'string') {
				throw new TypeError('Invalid element selector');
			}

			// Getting the matching targets
			var target = document.querySelector(selector);

			// Checking retrieved targets
			if (!target) {
				throw new TypeError(`No elements match the selector “${selector}”`);
			}

			this.target = target;
			this.text = config.text || target.textContent;
			this.tick = config.tick || 300;
			this.typing = false;
			this.cursor = Object.assign({ index: 0, type: 'stick', blink: true }, { ...config.cursor });

			this.typeResolve;
			this.timer;
			this.cache = {};
		}
		catch (e) {
			throw e;
		}
	}

	//#endregion

	//#region Methods

	/**
	 * Types a snippet of text
	 * @param text The text to type
	 * @param config The config object
	 */
	type(text = '', config = {}) {

		// Caching the typing state
		this.cache = {
			...config,
			text,
		};

		return new Promise(resolve => {

			// Attaching the type resolve function
			this.typeResolve = resolve;

			// Updating the typing state
			this.typing = true;

			// Recursive typing
			const recType = (text, tick = 0) => {

				// Checking if the text is finished
				if (text.length > 0 && this.typing) {
					this.timer = setTimeout(() => {

						// Typing a character
						this.target.textContent += text[0];

						// Caching the typing state
						this.cache = {
							...config,
							tick,
							text: text.slice(1),
						};

						// Invoking the recursion
						recType(text.slice(1), config.tick || this.tick);
					}, tick);
				} else {

					// Updating the typing state
					this.typing = false;

					clearTimeout(this.timer);

					// Resolving the typing
					resolve(this);
				}
			}

			// Starting the recursion
			recType(text);
		});
	}

	/**
	 * Stops the typewriter
	 */
	stop() {
		return new Promise(resolve => {

			// Updating the typing state
			this.typing = false;

			// Clearing the timeout
			clearTimeout(this.timer);

			// Resolving the typing promise
			this.typeResolve(this);

			// Resolving the typing
			resolve(this);
		})
	}

	/**
	 * Resumes typing
	 * @param delay The delay until resuming typing
	 */
	resume(delay = 0) {

		// Extracting params
		const { text, ...config } = this.cache;

		// Resuming typing
		return this.type(text, config);;
	}

	//#endregion
}

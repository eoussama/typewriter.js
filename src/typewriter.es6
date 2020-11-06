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
			this.deleteResolve;

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
			const recType = (text, tick = config.delay || 0) => {

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

					// Clearing timeout
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

			// Resolving the promises
			if (this.typeResolve) {
				this.typeResolve(this);
			}

			if (this.deleteResolve) {
				this.deleteResolve(this);
			}

			// Resolving the typing
			resolve(this);
		})
	}

	/**
	 * Resumes typing
	 * @param config The config object
	 */
	resume(config = {}) {

		// Extracting params
		const { text, chars, ...conf } = this.cache;

		// Resuming typing
		return text
			? this.type(text, Object.assign({ ...conf }, { ...config }))
			: this.delete(chars, Object.assign({ ...conf }, { ...config }));
	}

	/**
	 * Deletes a character or more
	 * @param chars The characters to delete
	 * @param config The config object
	 */
	delete(chars = 1, config = {}) {

		// Caching the typing state
		this.cache = {
			...config,
			chars
		};

		return new Promise(resolve => {

			// Attaching the delete resolve function
			this.deleteResolve = resolve;

			// Updating the typing state
			this.typing = true;

			// Recursive delete
			const recDelete = (chars, tick = config.delay || 0) => {

				// Checking if deleting is finished
				if (chars > 0 && this.typing) {
					this.timer = setTimeout(() => {

						// Typing a character
						this.target.textContent = this.target.textContent.slice(0, this.target.textContent.length - 1);

						// Caching the deletion state
						this.cache = {
							...config,
							tick,
							chars: chars - 1,
						};

						// Invoking the recursion
						recDelete(chars - 1, config.tick || this.tick);
					}, tick);
				} else {

					// Updating the typing state
					this.typing = false;

					// Clearing timeout
					clearTimeout(this.timer);

					// Resolving the typing
					resolve(this);
				}
			}

			// Starting the recursion
			recDelete(chars);
		});
	}

	/**
	 * Clears the entire script
	 */
	clear(config = {}) {
		return new Promise(resolve => {
			setTimeout(() => {
				this.stop().then(() => {

					// Clearing the text
					this.target.textContent = '';

					// Resetting the cursor index
					this.cursor.index = 0;

					// Resolving
					resolve(this);
				});
			}, config.delay || 0);
		})
	}

	//#endregion
}

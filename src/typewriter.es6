/**
 * 
 * @name:       typewriterjs
 * @version:    4.0.0
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


    /**
     * Constructor with parameters.
     * 
     * @param params The configurative parameters of the typewrtier.
     */
    constructor(params: Object = {}) {

        try {

            if (params.target == null) {
                throw new TypeError("A valid target is required.");
            }

            if (!(params.target instanceof HTMLElement)) {
                throw new TypeError("The target must be a valid HTML element.");
            }

            this.target = params.target;
            this.speed = params.speed || 1500;
            this.timer = null;
            this.cursor = { index: this.target.textContent.length };
        }
        catch (e) {

            throw e;
        }
    }


    /**
     * Moves the cursor to a specific column.
     * 
     * @param index The column where the cursor should move to.
     */
    moveCursor(index: number = this.cursor.index): void {

        if (index < 0) {

            index = 0;
        } else if (index > this.target.textContent.length) {

            index = this.target.textContent.length;
        }

        this.cursor.index = index;
    }


    /**
     * Types the content of the typewriter.
     * 
     * @param params The parameters that go with the typing.
     */
    type(params: Object = {}): void {

        const script: string = params.script || '';

        let
            start: number = params.start || 0,
            index: number = params.index || 0,
            length: number = params.length || script.length;

        // Checking if start is outbound.
        if (start < 0) {

            start = 0;
        } else if (start > this.target.textContent.length) {

            start = this.target.textContent.length;
        }

        // Checking if length is outbound.
        if (length < 0) {

            length = 0;
        } else if (length > script.length) {

            length = script.length;
        }

        if (script.length > 0) {

            this.timer = setTimeout(() => {

                // Moving the cursor to the correct column.
                this.moveCursor(index);

                // Inserting a character.
                const targetContent: string = this.target.textContent;

                this.target.textContent = targetContent.slice(0, start + index) + script[index] + targetContent.slice(start + index);

                if (this.cursor.index < length - 1) {

                    this.type({ script: script, start: start, index: index + 1, length, length });
                }
            }, this.speed);
        }
    }


    /**
     * Delete the content of the typewriter.
     * 
     * @param params The parameters that go with the deleting.
     */
    delete(params: Object = {}): void {

        let
            start: number = params.start || this.target.textContent.length,
            index: number = params.index || start,
            length: number = params.length || start;

        // Checking if start is outbound.
        if (start < 0) {

            start = 0;
        } else if (start > this.target.textContent.length) {

            start = this.target.textContent.length;
        }

        // Checking if length is outbound.
        if (length < 0) {

            length = 0;
        } else if (length > this.target.textContent.length) {

            length = this.target.textContent.length;
        }
        
        if (this.target.textContent.length > 0) {
            
            this.timer = setTimeout(() => {

                // Moving the cursor to the correct column.
                this.moveCursor(index - 1);

                // Deleting a character.
                const targetContent: string = this.target.textContent;

                this.target.textContent = targetContent;

                if (this.cursor.index > 0 ) {

                    this.delete({ start: start, length: length, index: index - 1 });
                }
            }, this.speed);
        }
    }


    /**
     * Stops the typewriter.
     */
    stop(): void {

        if (this.timer !== null) {

            clearTimeout(this.timer);
        }
    }


    /**
     * Clears the typewriter's input.
     */
    clear(): void {

        this.stop();

        this.target.textContent = "";
        this.cursor.index = 0;
    }
}

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


// @flow


/**
 * Injects the CSS styling to the document.
 */
const injectStyle = () => {

    // The CSS styling of the typewriters' cursor.
    const cssStyle: string = `
        span.typewriter-cursor {
            position: relative;
        }
        
        span.typewriter-cursor::after {
            animation-duration: .5s;
            animation-iteration-count: infinite;
            animation-name: cursorAnimation;
            animation-timing-function: linear;
            animation-direction: alternate-reverse;
            content: '|';
            position: absolute;
            left: -1.5px;
        }

        @keyframes cursorAnimation {
            40% {
                opacity: 1;    
            }
            100% {
                opacity: 0;
            }
        }
    `;

    // Creating the HTML style element.
    const styleElement: HTMLElement = document.createElement('style');

    // Adding a unique id to the HTML style element.
    styleElement.id = "typewriterjs-style";

    // Appending the styling rules.
    styleElement.textContent = cssStyle;

    // Appending the HTML style element to the document.
    document.body.appendChild(styleElement);
}


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
            this.state = 0;
            this.cursor = { index: this.target.textContent.length };

            this.moveCursor();

            // Injecting the style.
            if (document.getElementById('typewriterjs-style') == null) {


                injectStyle();
            }
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
    moveCursorTo(index: number = this.cursor.index + 1): void {

        if (index < 0) {

            index = 0;
        } else if (index > this.target.textContent.length) {

            index = this.target.textContent.length;
        }

        this.cursor.index = index;
    }


    /**
     * Moves the cursor to a specific column (visually).
     * 
     * @param index The index where to move the cursor to.
     */
    moveCursor(index: number): void {

        const targetContent: string = this.target.textContent;
        
        this.moveCursorTo(index);
        this.target.innerHTML = targetContent.slice(0, this.cursor.index) + '<span class="typewriter-cursor"></span>' + targetContent.slice(this.cursor.index);
    }


    /**
     * Types the content of the typewriter.
     * 
     * @param params The parameters that go with the typing.
     */
    type(params: Object = {}): void {

        const
            script: string = params.script || '',
            endCallback = params.endCallback || function () { },
            charCallback = params.charCallback || function (index: number, char: string) { };

        let
            start: number = params.start || 0,
            index: number = params.index || start,
            length: number = params.length || script.length;

        // Checking if start is outbound.
        if (start < 0) {

            start = 0;
            index = start;
        } else if (start > this.target.textContent.length) {

            start = this.target.textContent.length;
            index = start;
        }

        // Checking if length is outbound.
        if (length < 0) {

            length = 0;
        } else if (length > script.length) {

            length = script.length;
        }

        this.state = 1;

        if (script.length > 0) {

            this.timer = setTimeout(() => {

                // Moving the cursor to the correct column.
                this.moveCursorTo(index);

                // Inserting a character.
                const targetContent: string = this.target.textContent;

                this.target.innerHTML = targetContent.slice(0, index) + script[index - start] + '<span class="typewriter-cursor"></span>' + targetContent.slice(index);

                charCallback(this.cursor.index, script[index - start]);

                if (index - start < length - 1 && this.state === 1) {

                    this.type({ script: script, start: start, index: index + 1, length, length, endCallback: endCallback, charCallback: charCallback });
                } else {

                    endCallback();
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
            length: number = params.length || start,
            endCallback = params.endCallback || function () { },
            charCallback = params.charCallback || function (index: number, char: string) { };

        // Checking if start is outbound.
        if (start < 0) {

            start = 0;
            index = start;
        } else if (start > this.target.textContent.length) {

            start = this.target.textContent.length;
            index = start;
        }

        // Checking if length is outbound.
        if (length <= 0) {

            length = 0;
        } else if (length > this.target.textContent.length) {

            length = this.target.textContent.length;
        } else if (length > start) {

            length = start;
        }

        this.state = 2;

        if (this.target.textContent.length > 0) {

            this.timer = setTimeout(() => {

                // Moving the cursor to the correct column.
                this.moveCursorTo(index - 1);

                // Deleting a character.
                const targetContent: string = this.target.textContent;

                this.target.innerHTML = targetContent.slice(0, index - 1) + '<span class="typewriter-cursor"></span>' + targetContent.slice(index);

                charCallback(this.cursor.index, targetContent[this.cursor.index]);

                if (start - length < index - 1 && this.state === 2) {

                    this.delete({ start: start, length: length, index: index - 1, endCallback: endCallback, charCallback: charCallback });
                } else {

                    endCallback();
                    return 13;
                }
            }, this.speed);
        }
    }


    /**
     * Stops the typewriter.
     */
    stop(): void {

        if (this.timer !== null) {

            // Resetting the state.
            this.state = 0;

            // Clearing the timer.
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

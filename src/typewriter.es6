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
     * @param target The HTML element to target with the typewriter.
     * @param script The script to type in the target.
     * @param speed The typing speed of the typewriter in milliseconds.
     */
    constructor(target: HTMLElement, script: string = target.textContent, speed: number = 1500) {

        try {
            
            if (target == null || !(target instanceof HTMLElement)) {
                throw new TypeError("The target must be a valid HTML element");
            }

            this.target = target;
            this.script = script;
            this.speed = speed;
            this.cursor = { index: 0 };
            this.timer = null;
        }
        catch(e) {

            throw e;
        }
    }


    /**
     * Types the content of the typewriter.
     */
    type(): void {

        if (this.script.length > 0) {

            this.timer = setTimeout(() => {
    
                typeChar(this);
    
                if (this.cursor.index !== this.script.length) {
    
                    this.type();
                }
            }, this.speed);
        }


        /**
         * Types a single character in the typewriter.
         * 
         * @param typewriter The typewriter object.
         */
        function typeChar(typewriter: Typewriter): void {

            // Typing a character.
            typewriter.target.textContent += typewriter.script[typewriter.cursor.index];
            
            // Moving the cursor forward.
            typewriter.cursor.index++
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

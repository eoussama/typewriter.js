"use strict";

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}

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
var Typewriter =
    /*#__PURE__*/
    function() {
        /**
         * Constructor with parameters.
         * 
         * @param target The HTML element to target with the typewriter.
         * @param script The script to type in the target.
         * @param speed The typing speed of the typewriter in milliseconds.
         */
        function Typewriter(target) {
            var script = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : target.textContent;
            var speed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1500;

            _classCallCheck(this, Typewriter);

            try {
                if (target == null || !(target instanceof HTMLElement)) {
                    throw new TypeError("The target must be a valid HTML element");
                }

                this.target = target;
                this.script = script;
                this.speed = speed;
                this.cursor = {
                    index: 0
                };
                this.timer = null;
            } catch (e) {
                throw e;
            }
        }
        /**
         * Types the content of the typewriter.
         */


        _createClass(Typewriter, [{
            key: "type",
            value: function type() {
                var _this = this;

                if (this.script.length > 0) {
                    this.timer = setTimeout(function() {
                        typeChar(_this);

                        if (_this.cursor.index !== _this.script.length) {
                            _this.type();
                        }
                    }, this.speed);
                }
                /**
                 * Types a single character in the typewriter.
                 * 
                 * @param typewriter The typewriter object.
                 */


                function typeChar(typewriter) {
                    // Typing a character.
                    typewriter.target.textContent += typewriter.script[typewriter.cursor.index]; // Moving the cursor forward.

                    typewriter.cursor.index++;
                }
            }
            /**
             * Stops the typewriter.
             */

        }, {
            key: "stop",
            value: function stop() {
                if (this.timer !== null) {
                    clearTimeout(this.timer);
                }
            }
            /**
             * Clears the typewriter's input.
             */

        }, {
            key: "clear",
            value: function clear() {
                this.stop();
                this.target.textContent = "";
                this.cursor.index = 0;
            }
        }]);

        return Typewriter;
    }();
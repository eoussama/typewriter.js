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
         * @param params The configurative parameters of the typewrtier.
         */
        function Typewriter() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            _classCallCheck(this, Typewriter);

            try {
                if (params.target == null) {
                    throw new TypeError("A valid target is required.");
                }

                if (!(params.target instanceof HTMLElement)) {
                    throw new TypeError("The target must be a valid HTML element.");
                }

                this.target = params.target;
                this.script = params.script || this.target.textContent;
                this.speed = params.speed || 1500;
                this.timer = null;
                this.cursor = {
                    index: this.target.textContent.length
                };
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
             * Delete the content of the typewriter.
             */

        }, {
            key: "delete",
            value: function _delete() {
                var _this2 = this;

                if (this.script.length > 0) {
                    this.timer = setTimeout(function() {
                        deleteChar(_this2);

                        if (_this2.cursor.index > 0) {
                            _this2.delete();
                        }
                    }, this.speed);
                }
                /**
                 * Types a single character in the typewriter.
                 * 
                 * @param typewriter The typewriter object.
                 */


                function deleteChar(typewriter) {
                    // Typing a character.
                    typewriter.target.textContent = typewriter.script.substring(0, typewriter.cursor.index - 1); // Moving the cursor forward.

                    typewriter.cursor.index--;
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
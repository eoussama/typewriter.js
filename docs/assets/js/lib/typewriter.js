"use strict";

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}

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
 * Injects the CSS styling to the document.
 */
var injectStyle = function injectStyle() {
    // The CSS styling of the typewriters' cursor.
    var cssStyle = "\n        span.typewriter-cursor {\n            position: relative;\n        }\n        \n        span.typewriter-cursor::after {\n            animation-duration: .5s;\n            animation-iteration-count: infinite;\n            animation-name: cursorAnimation;\n            animation-timing-function: linear;\n            animation-direction: alternate-reverse;\n            content: '|';\n            position: absolute;\n            left: -1.5px;\n        }\n\n        @keyframes cursorAnimation {\n            40% {\n                opacity: 1;    \n            }\n            100% {\n                opacity: 0;\n            }\n        }\n    "; // Creating the HTML style element.

    var styleElement = document.createElement('style'); // Adding a unique id to the HTML style element.

    styleElement.id = "typewriterjs-style"; // Appending the styling rules.

    styleElement.textContent = cssStyle; // Appending the HTML style element to the document.

    document.body.appendChild(styleElement);
};
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
                this.speed = params.speed || 1500;
                this.timer = null;
                this.state = 0;
                this.cursor = {
                    index: this.target.textContent.length
                };
                this.moveCursor(); // Injecting the style.

                if (document.getElementById('typewriterjs-style') == null) {
                    injectStyle();
                }
            } catch (e) {
                throw e;
            }
        }
        /**
         * Moves the cursor to a specific column.
         * 
         * @param index The column where the cursor should move to.
         */


        _createClass(Typewriter, [{
            key: "moveCursorTo",
            value: function moveCursorTo() {
                var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.cursor.index + 1;

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

        }, {
            key: "moveCursor",
            value: function moveCursor(index) {
                var targetContent = this.target.textContent;
                this.moveCursorTo(index);
                this.target.innerHTML = targetContent.slice(0, this.cursor.index) + '<span class="typewriter-cursor"></span>' + targetContent.slice(this.cursor.index);
            }
            /**
             * Types the content of the typewriter.
             * 
             * @param params The parameters that go with the typing.
             */

        }, {
            key: "type",
            value: function type() {
                var _this = this;

                var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                var script = params.script || '',
                    endCallback = params.endCallback || function() {},
                    charCallback = params.charCallback || function(index, char) {};

                var start = params.start || 0,
                    index = params.index || start,
                    length = params.length || script.length; // Checking if start is outbound.

                if (start < 0) {
                    start = 0;
                    index = start;
                } else if (start > this.target.textContent.length) {
                    start = this.target.textContent.length;
                    index = start;
                } // Checking if length is outbound.


                if (length < 0) {
                    length = 0;
                } else if (length > script.length) {
                    length = script.length;
                }

                this.state = 1;

                if (script.length > 0) {
                    this.timer = setTimeout(function() {
                        // Moving the cursor to the correct column.
                        _this.moveCursorTo(index); // Inserting a character.


                        var targetContent = _this.target.textContent;
                        _this.target.innerHTML = targetContent.slice(0, index) + script[index - start] + '<span class="typewriter-cursor"></span>' + targetContent.slice(index);
                        charCallback(_this.cursor.index, script[index - start]);

                        if (index - start < length - 1 && _this.state === 1) {
                            var _this$type;

                            _this.type((_this$type = {
                                script: script,
                                start: start,
                                index: index + 1,
                                length: length
                            }, _defineProperty(_this$type, "length", length), _defineProperty(_this$type, "endCallback", endCallback), _defineProperty(_this$type, "charCallback", charCallback), _this$type));
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

        }, {
            key: "delete",
            value: function _delete() {
                var _this2 = this;

                var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                var start = params.start || this.target.textContent.length,
                    index = params.index || start,
                    length = params.length || start,
                    endCallback = params.endCallback || function() {},
                    charCallback = params.charCallback || function(index, char) {}; // Checking if start is outbound.


                if (start < 0) {
                    start = 0;
                    index = start;
                } else if (start > this.target.textContent.length) {
                    start = this.target.textContent.length;
                    index = start;
                } // Checking if length is outbound.


                if (length <= 0) {
                    length = 0;
                } else if (length > this.target.textContent.length) {
                    length = this.target.textContent.length;
                } else if (length > start) {
                    length = start;
                }

                this.state = 2;

                if (this.target.textContent.length > 0) {
                    this.timer = setTimeout(function() {
                        // Moving the cursor to the correct column.
                        _this2.moveCursorTo(index - 1); // Deleting a character.


                        var targetContent = _this2.target.textContent;
                        _this2.target.innerHTML = targetContent.slice(0, index - 1) + '<span class="typewriter-cursor"></span>' + targetContent.slice(index);
                        charCallback(_this2.cursor.index, targetContent[_this2.cursor.index]);

                        if (start - length < index - 1 && _this2.state === 2) {
                            _this2.delete({
                                start: start,
                                length: length,
                                index: index - 1,
                                endCallback: endCallback,
                                charCallback: charCallback
                            });
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

        }, {
            key: "stop",
            value: function stop() {
                if (this.timer !== null) {
                    // Resetting the state.
                    this.state = 0; // Clearing the timer.

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
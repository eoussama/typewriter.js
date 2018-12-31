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
                this.cursor = {
                    index: this.target.textContent.length
                };
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
            key: "moveCursor",
            value: function moveCursor() {
                var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.cursor.index;

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

        }, {
            key: "type",
            value: function type() {
                var _this = this;

                var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                var script = params.script || '';
                var start = params.start || 0,
                    index = params.index || 0,
                    length = params.length || script.length; // Checking if start is outbound.

                if (start < 0) {
                    start = 0;
                } else if (start > this.target.textContent.length) {
                    start = this.target.textContent.length;
                } // Checking if length is outbound.


                if (length < 0) {
                    length = 0;
                } else if (length > script.length) {
                    length = script.length;
                }

                if (script.length > 0) {
                    this.timer = setTimeout(function() {
                        // Moving the cursor to the correct column.
                        _this.moveCursor(index); // Inserting a character.


                        var targetContent = _this.target.textContent;
                        _this.target.textContent = targetContent.slice(0, start + index) + script[index] + targetContent.slice(start + index);

                        if (_this.cursor.index < length - 1) {
                            _this.type(_defineProperty({
                                script: script,
                                start: start,
                                index: index + 1,
                                length: length
                            }, "length", length));
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
                    length = params.length || start; // Checking if start is outbound.

                if (start < 0) {
                    start = 0;
                } else if (start > this.target.textContent.length) {
                    start = this.target.textContent.length;
                } // Checking if length is outbound.


                if (length < 0) {
                    length = 0;
                } else if (length > this.target.textContent.length) {
                    length = this.target.textContent.length;
                }

                console.log(start, length, index);

                if (this.target.textContent.length > 0) {
                    this.timer = setTimeout(function() {
                        // Moving the cursor to the correct column.
                        _this2.moveCursor(index - 1); // Deleting a character.


                        var targetContent = _this2.target.textContent;
                        _this2.target.textContent = targetContent.slice(0, index - 1) + targetContent.slice(index);

                        if (start - length < index - 1) {
                            _this2.delete({
                                start: start,
                                length: length,
                                index: index - 1
                            });
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
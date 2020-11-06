"use strict";

function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};
    var target = _objectWithoutPropertiesLoose(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
            key = sourceSymbolKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
            target[key] = source[key];
        }
    }
    return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }
    return target;
}

function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === 'function') {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _defineProperty(target, key, source[key]);
        });
    }
    return target;
}

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
var Typewriter =
    /*#__PURE__*/
    function() {
        //#region Properties
        //#endregion
        //#region Lifecycle
        function Typewriter(selector) {
            var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            _classCallCheck(this, Typewriter);

            try {
                // Checking the validity of the selector
                if (!selector || typeof selector !== 'string') {
                    throw new TypeError('Invalid element selector');
                } // Getting the matching targets


                var target = document.querySelector(selector); // Checking retrieved targets

                if (!target) {
                    throw new TypeError("No elements match the selector \u201C".concat(selector, "\u201D"));
                }

                this.target = target;
                this.text = config.text || target.textContent;
                this.tick = config.tick || 300;
                this.typing = false;
                this.cursor = Object.assign({
                    index: 0,
                    type: 'stick',
                    blink: true
                }, _objectSpread({}, config.cursor));
                this.typeResolve;
                this.deleteResolve;
                this.timer;
                this.cache = {};
            } catch (e) {
                throw e;
            }
        } //#endregion
        //#region Methods

        /**
         * Types a snippet of text
         * @param text The text to type
         * @param config The config object
         */


        _createClass(Typewriter, [{
            key: "type",
            value: function type() {
                var _this = this;

                var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
                var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
                // Caching the typing state
                this.cache = _objectSpread({}, config, {
                    text: text
                });
                return new Promise(function(resolve) {
                    // Attaching the type resolve function
                    _this.typeResolve = resolve; // Updating the typing state

                    _this.typing = true; // Recursive typing

                    var recType = function recType(text) {
                        var tick = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : config.delay || 0;

                        // Checking if the text is finished
                        if (text.length > 0 && _this.typing) {
                            _this.timer = setTimeout(function() {
                                // Typing a character
                                _this.target.textContent += text[0]; // Caching the typing state

                                _this.cache = _objectSpread({}, config, {
                                    tick: tick,
                                    text: text.slice(1)
                                }); // Invoking the recursion

                                recType(text.slice(1), config.tick || _this.tick);
                            }, tick);
                        } else {
                            // Updating the typing state
                            _this.typing = false; // Clearing timeout

                            clearTimeout(_this.timer); // Resolving the typing

                            resolve(_this);
                        }
                    }; // Starting the recursion


                    recType(text);
                });
            }
            /**
             * Stops the typewriter
             */

        }, {
            key: "stop",
            value: function stop() {
                var _this2 = this;

                return new Promise(function(resolve) {
                    // Updating the typing state
                    _this2.typing = false; // Clearing the timeout

                    clearTimeout(_this2.timer); // Resolving the promises

                    if (_this2.typeResolve) {
                        _this2.typeResolve(_this2);
                    }

                    if (_this2.deleteResolve) {
                        _this2.deleteResolve(_this2);
                    } // Resolving the typing


                    resolve(_this2);
                });
            }
            /**
             * Resumes typing
             * @param config The config object
             */

        }, {
            key: "resume",
            value: function resume() {
                var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                // Extracting params
                var _this$cache = this.cache,
                    text = _this$cache.text,
                    chars = _this$cache.chars,
                    conf = _objectWithoutProperties(_this$cache, ["text", "chars"]); // Resuming typing


                return text ? this.type(text, Object.assign(_objectSpread({}, conf), _objectSpread({}, config))) : this.delete(chars, Object.assign(_objectSpread({}, conf), _objectSpread({}, config)));
            }
            /**
             * Deletes a character or more
             * @param chars The characters to delete
             * @param config The config object
             */

        }, {
            key: "delete",
            value: function _delete() {
                var _this3 = this;

                var chars = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
                var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
                // Caching the typing state
                this.cache = _objectSpread({}, config, {
                    chars: chars
                });
                return new Promise(function(resolve) {
                    // Attaching the delete resolve function
                    _this3.deleteResolve = resolve; // Updating the typing state

                    _this3.typing = true; // Recursive delete

                    var recDelete = function recDelete(chars) {
                        var tick = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : config.delay || 0;

                        // Checking if deleting is finished
                        if (chars > 0 && _this3.typing) {
                            _this3.timer = setTimeout(function() {
                                // Typing a character
                                _this3.target.textContent = _this3.target.textContent.slice(0, _this3.target.textContent.length - 1); // Caching the deletion state

                                _this3.cache = _objectSpread({}, config, {
                                    tick: tick,
                                    chars: chars - 1
                                }); // Invoking the recursion

                                recDelete(chars - 1, config.tick || _this3.tick);
                            }, tick);
                        } else {
                            // Updating the typing state
                            _this3.typing = false; // Clearing timeout

                            clearTimeout(_this3.timer); // Resolving the typing

                            resolve(_this3);
                        }
                    }; // Starting the recursion


                    recDelete(chars);
                });
            }
            /**
             * Clears the entire script
             */

        }, {
            key: "clear",
            value: function clear() {
                var _this4 = this;

                var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                return new Promise(function(resolve) {
                    setTimeout(function() {
                        _this4.stop().then(function() {
                            // Clearing the text
                            _this4.target.textContent = ''; // Resetting the cursor index

                            _this4.cursor.index = 0; // Resolving

                            resolve(_this4);
                        });
                    }, config.delay || 0);
                });
            } //#endregion

        }]);

        return Typewriter;
    }();
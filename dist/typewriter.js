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
                this.deleting = false;
                this.cursor = Object.assign({
                    index: 0,
                    type: 'stick',
                    blink: true
                }, _objectSpread({}, config.cursor));
                this.typeResolve;
                this.typeTimer;
                this.deleteResolve;
                this.deleteTimer;
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
                // Stopping typing
                this.stopType(); // Caching the typing state

                this.cache = _objectSpread({}, config, {
                    text: text
                });
                return new Promise(function(resolve) {
                    // Attaching the type resolve function
                    _this.typeResolve = resolve; // Recursive typing

                    var recType = function recType(text) {
                        var tick = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : config.delay || 0;

                        // Checking if the text is finished
                        if (text.length > 0) {
                            _this.typeTimer = setTimeout(function() {
                                // Stopping typing
                                if (_this.deleting) {
                                    _this.stopDelete();
                                } // Updating the typing state


                                _this.typing = true; // Typing a character

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

                            clearTimeout(_this.typeTimer); // Resolving the typing

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

                var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                return new Promise(function(resolve) {
                    setTimeout(function() {
                        // Stopping typing
                        _this2.stopType(); // Stopping deleting


                        _this2.stopDelete(); // Resolving


                        resolve(_this2);
                    }, config.delay || 0);
                });
            }
            /**
             * Stops typing
             */

        }, {
            key: "stopType",
            value: function stopType() {
                var _this3 = this;

                return new Promise(function(resolve) {
                    // Updating the typing state
                    _this3.typing = false; // Clearing the timeouts

                    if (_this3.typeTimer) {
                        clearTimeout(_this3.typeTimer);
                    } // Resolving the promises


                    if (_this3.deleteResolve) {
                        _this3.deleteResolve(_this3);
                    } // Resolving


                    resolve(_this3);
                });
            }
            /**
             * Stops deleting
             */

        }, {
            key: "stopDelete",
            value: function stopDelete() {
                var _this4 = this;

                return new Promise(function(resolve) {
                    // Updating the typing state
                    _this4.deleting = false; // Clearing the timeouts

                    if (_this4.deleteTimer) {
                        clearTimeout(_this4.deleteTimer);
                    } // Resolving the promises


                    if (_this4.deleteResolve) {
                        _this4.deleteResolve(_this4);
                    } // Resolving


                    resolve(_this4);
                });
            }
            /**
             * Resumes typing
             * @param config The config object
             */

        }, {
            key: "resume",
            value: function resume() {
                var _this5 = this;

                var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                return new Promise(function(resolve) {
                    console.log(config);
                    setTimeout(function() {
                        // Extracting params
                        var _this5$cache = _this5.cache,
                            text = _this5$cache.text,
                            chars = _this5$cache.chars,
                            conf = _objectWithoutProperties(_this5$cache, ["text", "chars"]);

                        console.log({
                            text: text,
                            chars: chars,
                            config: config
                        }); // Resuming typing

                        resolve(text ? _this5.type(text, Object.assign(_objectSpread({}, conf), _objectSpread({}, config, {
                            delay: 0
                        }))) : _this5.delete(chars, Object.assign(_objectSpread({}, conf), _objectSpread({}, config, {
                            delay: 0
                        }))));
                    }, config.delay || 0);
                });
            }
            /**
             * Deletes a character or more
             * @param chars The characters to delete
             * @param config The config object
             */

        }, {
            key: "delete",
            value: function _delete() {
                var _this6 = this;

                var chars = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
                var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
                // Stopping typing
                this.stopDelete(); // Caching the typing state

                this.cache = _objectSpread({}, config, {
                    chars: chars
                });
                return new Promise(function(resolve) {
                    // Attaching the delete resolve function
                    _this6.deleteResolve = resolve; // Recursive delete

                    var recDelete = function recDelete(chars) {
                        var tick = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : config.delay || 0;

                        // Checking if deleting is finished
                        if (chars > 0) {
                            _this6.deleteTimer = setTimeout(function() {
                                // Stopping typing
                                if (_this6.typing) {
                                    _this6.stopType();
                                } // Updating the typing state


                                _this6.deleting = true; // Typing a character

                                _this6.target.textContent = _this6.target.textContent.slice(0, _this6.target.textContent.length - 1); // Caching the deletion state

                                _this6.cache = _objectSpread({}, config, {
                                    tick: tick,
                                    chars: chars - 1
                                }); // Invoking the recursion

                                recDelete(chars - 1, config.tick || _this6.tick);
                            }, tick);
                        } else {
                            // Updating the typing state
                            _this6.deleting = false; // Clearing timeout

                            clearTimeout(_this6.deleteTimer); // Resolving the typing

                            resolve(_this6);
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
                var _this7 = this;

                var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                return new Promise(function(resolve) {
                    setTimeout(function() {
                        _this7.stop().then(function() {
                            // Clearing the text
                            _this7.target.textContent = ''; // Resetting the cursor index

                            _this7.cursor.index = 0; // Resolving

                            resolve(_this7);
                        });
                    }, config.delay || 0);
                });
            } //#endregion

        }]);

        return Typewriter;
    }();
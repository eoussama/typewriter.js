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
var TYPING_SOUNDS = ['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'];
var STYLES = "\n\t.eo-typewriter__cursor {\n\t\tposition: relative;\n\t}\n\n\t.eo-typewriter__cursor--blink {\n\t\tanimation-name: eo-typewriter-blink;\n    animation-iteration-count: infinite;\n\t\tanimation-duration: 0.7s;\n\t}\n\t\n\t.eo-typewriter__cursor::after {\n\t\tposition: absolute;\n\t}\n\t\n\t.eo-typewriter__cursor--underscore::after {\n\t\tcontent: '_';\n\t}\n\n\t.eo-typewriter__cursor--stick::after {\n\t\tcontent: '|';\n    display: inline-block;\n    left: -4px;\n    width: 4px;\n\t}\n\n\t@keyframes eo-typewriter-blink {\n\t\tfrom { opacity: 1; }\n\t\tto { opacity: 0; }\n\t}\n";
/**
 * The typewriter classes.
 */

var Typewriter =
    /*#__PURE__*/
    function() {
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
                } // Extracting the primary value


                var text = target.textContent || ''; // Preparing the config object

                this.config = _objectSpread({}, config, {
                    target: target,
                    text: text,
                    delay: config.delay || 0,
                    tick: config.tick || 300,
                    sound: Object.assign({
                        enabled: false,
                        volume: 0.5
                    }, _objectSpread({}, config.sound)),
                    cursor: Object.assign({
                        index: text.length,
                        type: 'stick',
                        blink: true
                    }, _objectSpread({}, config.cursor))
                }); // Initializing the cache

                this.cache = {};
                this.typing = false;
                this.typeResolve;
                this.typeTimer;
                this.deleting = false;
                this.deleteResolve;
                this.deleteTimer; // Initial output

                this.render(this.config); // Injecting styles

                if (document.getElementById('eo-typewriter-stylesheet') == null) {
                    injectStyle();
                }
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
                // Contextualizing the config object
                var conf = this.contextConfig(config); // Caching the typing state

                this.cache = _objectSpread({}, conf, {
                    text: text
                });
                return new Promise(function(resolve) {
                    // Attaching the type resolve function
                    _this.typeResolve = resolve; // Recursive typing

                    var recType = function recType(text, tick) {
                        var init = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

                        // Checking if the text is finished
                        if (text.length > 0) {
                            _this.typeTimer = setTimeout(function() {
                                // Stopping typing
                                if (init && _this.typing) {
                                    _this.stopType(); // Updating the index


                                    conf.cursor.index = _this.config.cursor.index;
                                } // Stopping deleting


                                if (_this.deleting) {
                                    _this.stopDelete(); // Updating the index


                                    conf.cursor.index = _this.config.cursor.index;
                                } // Updating the typing state


                                _this.typing = true; // Typing a character

                                _this.config.text = _this.config.text.slice(0, conf.cursor.index) + text[0] + _this.config.text.slice(conf.cursor.index);
                                _this.config.cursor.index = ++conf.cursor.index;

                                _this.render(conf); // Playing typing sound


                                _this.playSound(conf); // Caching the typing state


                                _this.cache = _objectSpread({}, conf, {
                                    tick: tick,
                                    text: text.slice(1)
                                }); // Invoking the recursion

                                recType(text.slice(1), conf.tick || _this.config.tick);
                            }, tick);
                        } else {
                            // Stopping typing
                            _this.stopType(); // Resolving the typing


                            resolve(_this);
                        }
                    }; // Starting the recursion


                    recType(text, conf.delay || 0, true);
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
                var _this2 = this;

                var chars = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
                var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
                // Contextualizing the config object
                var conf = this.contextConfig(config); // Caching the typing state

                this.cache = _objectSpread({}, conf, {
                    chars: chars
                });
                return new Promise(function(resolve) {
                    // Attaching the delete resolve function
                    _this2.deleteResolve = resolve; // Recursive delete

                    var recDelete = function recDelete(chars, tick) {
                        var init = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

                        // Checking if deleting is finished
                        if (chars > 0 && _this2.config.text.length > 0 && _this2.config.cursor.index >= 0) {
                            _this2.deleteTimer = setTimeout(function() {
                                // Refresh cursor
                                conf.cursor.index = _this2.config.cursor.index; // Stopping deleting

                                if (init && _this2.deleting) {
                                    _this2.stopDelete(); // Updating the index


                                    conf.cursor.index = _this2.config.cursor.index;
                                } // Stopping typing


                                if (_this2.typing) {
                                    _this2.stopType(); // Updating the index


                                    conf.cursor.index = _this2.config.cursor.index;
                                } // Updating the typing state


                                _this2.deleting = true; // Deleting a character

                                _this2.config.text = _this2.config.text.slice(0, conf.cursor.index - 1) + _this2.config.text.slice(conf.cursor.index);
                                _this2.config.cursor.index = --conf.cursor.index;

                                _this2.render(conf); // Playing typing sound


                                _this2.playSound(conf); // Caching the deletion state


                                _this2.cache = _objectSpread({}, conf, {
                                    tick: tick,
                                    chars: chars - 1
                                }); // Invoking the recursion

                                recDelete(chars - 1, conf.tick || _this2.config.tick);
                            }, tick);
                        } else {
                            // Stopping deleting
                            _this2.stopDelete(); // Resolving the typing


                            resolve(_this2);
                        }
                    }; // Starting the recursion


                    recDelete(chars, conf.delay || 0, true);
                });
            }
            /**
             * Stops the typewriter
             */

        }, {
            key: "stop",
            value: function stop() {
                var _this3 = this;

                var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                // Contextualizing the config object
                var conf = this.contextConfig(config);
                return new Promise(function(resolve) {
                    setTimeout(function() {
                        // Stopping typing
                        _this3.stopType(); // Stopping deleting


                        _this3.stopDelete(); // Resolving


                        resolve(_this3);
                    }, conf.delay || 0);
                });
            }
            /**
             * Resumes typing
             * @param config The config object
             */

        }, {
            key: "resume",
            value: function resume() {
                var _this4 = this;

                var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                return new Promise(function(resolve) {
                    setTimeout(function() {
                        // Extracting params
                        var _this4$cache = _this4.cache,
                            text = _this4$cache.text,
                            chars = _this4$cache.chars,
                            conf = _objectWithoutProperties(_this4$cache, ["text", "chars"]); // Resuming typing


                        resolve(text ? _this4.type(text, Object.assign(_objectSpread({}, conf), _objectSpread({}, config, {
                            delay: 0
                        }))) : _this4.delete(chars, Object.assign(_objectSpread({}, conf), _objectSpread({}, config, {
                            delay: 0
                        }))));
                    }, config.delay || 0);
                });
            }
            /**
             * Clears the entire script
             */

        }, {
            key: "clear",
            value: function clear() {
                var _this5 = this;

                var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                // Contextualizing the config object
                var conf = this.contextConfig(config);
                return new Promise(function(resolve) {
                    setTimeout(function() {
                        _this5.stop().then(function() {
                            // Clearing the text
                            _this5.config.text = ''; // Resetting the cursor index

                            _this5.config.cursor.index = 0; // Updating the output

                            _this5.render(conf); // Resolving


                            resolve(_this5);
                        });
                    }, conf.delay || 0);
                });
            }
            /**
             * Moves the cursor
             * @param index The cursor index
             */

        }, {
            key: "move",
            value: function move(index) {
                // Chaning the cursor index
                this.config.cursor.index = Math.max(Math.min(parseInt(index), this.config.target.textContent.length - 1), 0); // Updates the output

                this.render(this.config);
            } //#endregion
            //#region Utils

            /**
             * Stops typing
             */

        }, {
            key: "stopType",
            value: function stopType() {
                var _this6 = this;

                return new Promise(function(resolve) {
                    // Updating the typing state
                    _this6.typing = false; // Clearing the timeouts

                    if (_this6.typeTimer) {
                        clearTimeout(_this6.typeTimer);
                    } // Resolving the promises


                    if (_this6.typeResolve) {
                        _this6.typeResolve(_this6);
                    } // Resolving


                    resolve(_this6);
                });
            }
            /**
             * Stops deleting
             */

        }, {
            key: "stopDelete",
            value: function stopDelete() {
                var _this7 = this;

                return new Promise(function(resolve) {
                    // Updating the typing state
                    _this7.deleting = false; // Clearing the timeouts

                    if (_this7.deleteTimer) {
                        clearTimeout(_this7.deleteTimer);
                    } // Resolving the promises


                    if (_this7.deleteResolve) {
                        _this7.deleteResolve(_this7);
                    } // Resolving


                    resolve(_this7);
                });
            }
            /**
             * Plays a typing sounds
             * @param config The config object
             */

        }, {
            key: "playSound",
            value: function playSound() {
                var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                // Contextualizing the config object
                var conf = this.contextConfig(config); // Checking if sound is enbaled

                if (conf.sound.enabled === true) {
                    // Getting a random index
                    var index = Math.floor(Math.random() * 2); // Formatting the sound base

                    var typingSound = "data:audio/mpeg;base64,".concat(TYPING_SOUNDS[index]); // Constructing an audio object

                    var audio = new Audio(typingSound); // Setting the volume

                    audio.volume = Math.max(Math.min(parseFloat(conf.sound.volume) || 0.5, 1), 0); // Playing the typing sounds

                    audio.play();
                }
            }
            /**
             * Textualize the config
             * @param config The configuration to clone
             */

        }, {
            key: "contextConfig",
            value: function contextConfig(config) {
                // Param config
                var conf = JSON.parse(JSON.stringify(config)); // Global config

                var globalConf = JSON.parse(JSON.stringify(this.config)); // Merging configs

                var res = _objectSpread({}, globalConf, conf, {
                    sound: _objectSpread({}, globalConf.sound, conf.sound),
                    cursor: _objectSpread({}, globalConf.cursor, conf.cursor)
                }); // Returning the merged config


                return res;
            }
            /**
             * Outputs the script
             */

        }, {
            key: "render",
            value: function render() {
                var _this8 = this;

                var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                // Contextualizing the config object
                var conf = this.contextConfig(config); // Checking the cursor position

                var cursor = function cursor(index) {
                    return _this8.config.cursor.index - 1 === index;
                }; // Rendering the output


                this.config.target.innerHTML = Array.from(this.config.text).map(function(char, index) {
                    return "<span class=\"eo-typewriter__char ".concat(cursor(index) ? 'eo-typewriter__char--current' : '', "\">").concat(char, "</span>").concat(cursor(index) ? "<span class=\"eo-typewriter__cursor ".concat('eo-typewriter__cursor--' + conf.cursor.type, " ").concat(conf.cursor.blink ? 'eo-typewriter__cursor--blink' : '', "\"></span>") : '');
                }).join('');
            } //#endregion

        }]);

        return Typewriter;
    }();
/**
 * Injects CSS styling.
 */


var injectStyle = function injectStyle() {
    // Creating the HTML style element.
    var styleElement = document.createElement('style'); // Adding a unique id to the HTML style element.

    styleElement.id = "eo-typewriter-stylesheet"; // Appending the styling rules.

    styleElement.textContent = STYLES; // Appending the style element to the document.

    document.body.appendChild(styleElement);
};
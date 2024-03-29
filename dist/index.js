var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
import Context from "./utils/context.js";
import Renderer from './utils/renderer.js';
import Audio from './utils/audio.js';
import ActionInvoker from './utils/action-manager.js';
/**
 * @description
 * Typewriter
 */
var Typewriter = /** @class */ (function () {
    /**
     * @description
     * Instantiates the typewriter
     *
     * @param element The target element or selector
     * @param config The global configuration object
     */
    function Typewriter(element, config) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        // Initializing global configurations
        this.config = {
            caret: config === null || config === void 0 ? void 0 : config.caret,
            audio: config === null || config === void 0 ? void 0 : config.audio,
            step: (_a = config === null || config === void 0 ? void 0 : config.step) !== null && _a !== void 0 ? _a : 1,
            delay: (_b = config === null || config === void 0 ? void 0 : config.delay) !== null && _b !== void 0 ? _b : 0,
            speed: (_c = config === null || config === void 0 ? void 0 : config.speed) !== null && _c !== void 0 ? _c : 300,
            repeat: (_d = config === null || config === void 0 ? void 0 : config.repeat) !== null && _d !== void 0 ? _d : 1,
            done: (_e = config === null || config === void 0 ? void 0 : config.done) !== null && _e !== void 0 ? _e : (function () { }),
            parseHTML: (_f = config === null || config === void 0 ? void 0 : config.parseHTML) !== null && _f !== void 0 ? _f : true,
            targetAttribute: (_g = config === null || config === void 0 ? void 0 : config.targetAttribute) !== null && _g !== void 0 ? _g : 'innerHTML'
        };
        // Initializing the events
        this.events = [];
        // Initializing the context
        this.context = new Context((_h = this.config) === null || _h === void 0 ? void 0 : _h.targetAttribute);
        // Initializing the content
        var target = typeof element === 'string' ? document.querySelector(element) : element;
        this.context.initializeContent(target);
        // Initializing the renderer
        this.renderer = new Renderer(target, (_j = this.config) === null || _j === void 0 ? void 0 : _j.targetAttribute, (_k = this.config) === null || _k === void 0 ? void 0 : _k.parseHTML, this.context, this.config.caret);
        // Initializing the audio utility
        this.audio = new Audio(this.config.audio);
        // Initializing the action manager
        this.actionManager = new ActionInvoker(this);
    }
    Object.defineProperty(Typewriter.prototype, "getText", {
        /**
         * @description
         * Returns raw text content
         */
        get: function () {
            return this.renderer.parseContent(false);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Typewriter.prototype, "getHtml", {
        /**
         * @description
         * Returns HTML text content
         */
        get: function () {
            return this.renderer.parseContent(true);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Typewriter.prototype, "getHighlight", {
        /**
         * @description
         * Returns the highlighted content
         */
        get: function () {
            var _a, _b, _c, _d, _e;
            var start = (_a = this.context.highlight[0]) !== null && _a !== void 0 ? _a : 0;
            var end = ((_b = this.context.highlight[1]) !== null && _b !== void 0 ? _b : 0) + 1;
            return (_e = (_d = (_c = this.context.content.slice(start, end)) === null || _c === void 0 ? void 0 : _c.map(function (e) { return e.char; })) === null || _d === void 0 ? void 0 : _d.join('')) !== null && _e !== void 0 ? _e : '';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Typewriter.prototype, "errorHandler", {
        /**
         * @description
         * Returns the event handler
         */
        get: function () {
            var _a, _b;
            var handler = (_b = (_a = this.events.find(function (e) { return e.event === 'error'; })) === null || _a === void 0 ? void 0 : _a.func) !== null && _b !== void 0 ? _b : (function () { });
            return handler;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @description
     * Starts the actions queue
     */
    Typewriter.prototype.start = function () {
        var e_1, _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, _c, action, e_1_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 6, 7, 12]);
                        _b = __asyncValues(this.actionManager.next());
                        _d.label = 1;
                    case 1: return [4 /*yield*/, _b.next()];
                    case 2:
                        if (!(_c = _d.sent(), !_c.done)) return [3 /*break*/, 5];
                        action = _c.value;
                        return [4 /*yield*/, (action === null || action === void 0 ? void 0 : action.start())];
                    case 3:
                        _d.sent();
                        _d.label = 4;
                    case 4: return [3 /*break*/, 1];
                    case 5: return [3 /*break*/, 12];
                    case 6:
                        e_1_1 = _d.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 12];
                    case 7:
                        _d.trys.push([7, , 10, 11]);
                        if (!(_c && !_c.done && (_a = _b.return))) return [3 /*break*/, 9];
                        return [4 /*yield*/, _a.call(_b)];
                    case 8:
                        _d.sent();
                        _d.label = 9;
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 11: return [7 /*endfinally*/];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @description
     * Initiates a sleep action
     *
     * @param time The timeout time in milliseconds
     */
    Typewriter.prototype.sleep = function (time) {
        return this.actionManager.sleep(time);
    };
    /**
     * @description
     * Initiates anb exec action
     *
     * @param func The user-defined action
     */
    Typewriter.prototype.exec = function (func) {
        return this.actionManager.exec(func);
    };
    /**
     * @description
     * Initiates a type action
     *
     * @param input The target input
     * @param config The action configuration
     */
    Typewriter.prototype.type = function (input, config) {
        return this.actionManager.type(input, config);
    };
    /**
     * @description
     * Initiates a delete action
     *
     * @param times Number of deletions
     * @param config The action configuration
     */
    Typewriter.prototype.delete = function (times, config) {
        return this.actionManager.delete(times, config);
    };
    /**
     * @description
     * Initiates a move action
     *
     * @param index The target index
     * @param config The action configuration
     */
    Typewriter.prototype.move = function (index, config) {
        return this.actionManager.move(index, config);
    };
    /**
     * @description
     * Highlights content
     *
     * @param index The target index
     * @param config The action configuration
     */
    Typewriter.prototype.highlight = function (index, config) {
        return this.actionManager.highlight(index);
    };
    /**
     * @description
     * Inserts tabulation
     *
     * @param spaces Number of spaces that make the tabulation
     * @param config The action configuration
     */
    Typewriter.prototype.tab = function (index, config) {
        if (index === void 0) { index = 4; }
        return this.actionManager.tab(index, config);
    };
    /**
     * @description
     * Inserts carriage return
     *
     * @param config The action configuration
     */
    Typewriter.prototype.return = function (config) {
        return this.actionManager.return(config);
    };
    /**
     * @description
     * Resets the entire typewriter
     */
    Typewriter.prototype.reset = function () {
        this.context.reset();
        this.renderer.reset();
        this.actionManager.reset();
    };
    /**
     * @description
     * Subscribes to events
     *
     * @param event The event name
     * @param func Callback
     */
    Typewriter.prototype.before = function (event, func) {
        this.events.push({ event: "before:" + event, func: func });
    };
    /**
     * @description
     * Subscribes to events
     *
     * @param event The event name
     * @param func Callback
     */
    Typewriter.prototype.after = function (event, func) {
        this.events.push({ event: "after:" + event, func: func });
    };
    /**
     * @description
     * The update callback, called from inside every action
     */
    Typewriter.prototype.update = function () {
        this.renderer.render(this.config.caret);
    };
    /**
     * @description
     * Hooks the event handler
     *
     * @param handler The event handler
     */
    Typewriter.prototype.catch = function (handler) {
        var handlerIndex = this.events.findIndex(function (e) { return e.event === 'error'; });
        if (handlerIndex === -1) {
            this.events.push({ event: "error", func: handler });
        }
        else {
            this.events[handlerIndex].func = handler;
        }
    };
    return Typewriter;
}());
export default Typewriter;

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
import Typewriter from '../index.js';
import timeOut from '../utils/timeout.js';
/**
 * @description
 * Base typewriter action
 */
var Action = /** @class */ (function () {
    /**
     * @description
     * Instantiates a base typewriter action
     *
     * @param parent The parent typewriter
     * @param config The configuration object
     */
    function Action(parent, config) {
        var _a;
        this.parent = parent;
        this.config = (_a = config) !== null && _a !== void 0 ? _a : {};
    }
    /**
     * @description
     * Overrides the current action parent
     *
     * @param parent The input parent
     */
    Action.prototype.setParent = function (parent) {
        if (parent instanceof Typewriter) {
            this.parent = parent;
        }
    };
    /**
     * @description
     * Fires before events
     */
    Action.prototype.before = function (params) {
        var _a;
        if (params === void 0) { params = {}; }
        var name = (_a = this.constructor.name) === null || _a === void 0 ? void 0 : _a.toLowerCase();
        this.parent.events.filter(function (e) { return e.event === "before:" + name; }).forEach(function (event) { return event.func(params); });
    };
    /**
     * @description
     * Fires after events
     */
    Action.prototype.after = function (params) {
        var _a;
        if (params === void 0) { params = {}; }
        var name = (_a = this.constructor.name) === null || _a === void 0 ? void 0 : _a.toLowerCase();
        this.parent.events.filter(function (e) { return e.event === "after:" + name; }).forEach(function (event) { return event.func(params); });
    };
    /**
     * @description
     * Initiates the action
     */
    Action.prototype.start = function () {
        var e_1, _a;
        return __awaiter(this, void 0, void 0, function () {
            var repeat, _b, _c, _, delay, err_1, e_1_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        repeat = this.getConfig('repeat');
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 11, 12, 17]);
                        _b = __asyncValues(Array(repeat).fill(0));
                        _d.label = 2;
                    case 2: return [4 /*yield*/, _b.next()];
                    case 3:
                        if (!(_c = _d.sent(), !_c.done)) return [3 /*break*/, 10];
                        _ = _c.value;
                        delay = this.getConfig('delay');
                        _d.label = 4;
                    case 4:
                        _d.trys.push([4, 8, , 9]);
                        return [4 /*yield*/, timeOut(delay)];
                    case 5:
                        _d.sent();
                        return [4 /*yield*/, this.run()];
                    case 6:
                        _d.sent();
                        return [4 /*yield*/, this.done()];
                    case 7:
                        _d.sent();
                        return [3 /*break*/, 9];
                    case 8:
                        err_1 = _d.sent();
                        this.parent.errorHandler(err_1);
                        return [3 /*break*/, 9];
                    case 9: return [3 /*break*/, 2];
                    case 10: return [3 /*break*/, 17];
                    case 11:
                        e_1_1 = _d.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 17];
                    case 12:
                        _d.trys.push([12, , 15, 16]);
                        if (!(_c && !_c.done && (_a = _b.return))) return [3 /*break*/, 14];
                        return [4 /*yield*/, _a.call(_b)];
                    case 13:
                        _d.sent();
                        _d.label = 14;
                    case 14: return [3 /*break*/, 16];
                    case 15:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 16: return [7 /*endfinally*/];
                    case 17: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @override
     * @description
     * Runs the action's instructions
     */
    Action.prototype.run = function () {
        return Promise.resolve();
    };
    /**
     * @description
     * Returns the target key value,
     * used to check both global and local configuration.
     *
     * @param key The config key
     * @param fallback An optional fallback value
     */
    Action.prototype.getConfig = function (key, fallback) {
        var _a;
        var localValue = this.config ? this.config[key] : null;
        var globalValue = this.parent.config ? this.parent.config[key] : null;
        return (_a = localValue !== null && localValue !== void 0 ? localValue : globalValue) !== null && _a !== void 0 ? _a : fallback;
    };
    /**
     * @description
     * Defines required steps to resolve the action
     *
     * @param length The length of the steps
     * @param step The step of every iteration
     */
    Action.prototype.step = function (length, step) {
        var max, i;
        if (step === void 0) { step = 1; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    max = Math.abs(length);
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < max)) return [3 /*break*/, 4];
                    return [4 /*yield*/, i];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i += step;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    };
    /**
     * @description
     * Calls the resolving user-defined callback
     */
    Action.prototype.done = function () {
        return this.getConfig('done')();
    };
    return Action;
}());
export default Action;

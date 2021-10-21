var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { timeOut } from "../utils/timeout.js";
import { Action } from "./action.js";
/**
 * @description
 * Typewriter type action
 */
var Type = /** @class */ (function (_super) {
    __extends(Type, _super);
    /**
     * @description
     * Instantiates a type action
     *
     * @param input The target input
     * @param parent The parent typewriter
     * @param config The configuration object
     */
    function Type(input, parent, config) {
        var _this = _super.call(this, parent, config) || this;
        _this.input = input;
        return _this;
    }
    /**
     * @description
     * Initiates type action
     *
     * @param input The target input
     * @param parentResolve Parent resolve function
     */
    Type.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.start.call(this)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.type()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @description
     * Types a target input
     */
    Type.prototype.type = function () {
        return __awaiter(this, void 0, void 0, function () {
            var step, speed;
            var _this = this;
            return __generator(this, function (_a) {
                step = Math.max(1, this.getConfig('step'));
                speed = Math.max(0, this.getConfig('speed'));
                return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        var _a, _b, index, characters, classes, props, e_1_1, err_1;
                        var e_1, _c;
                        var _d, _e;
                        return __generator(this, function (_f) {
                            switch (_f.label) {
                                case 0:
                                    _f.trys.push([0, 14, , 15]);
                                    _f.label = 1;
                                case 1:
                                    _f.trys.push([1, 7, 8, 13]);
                                    _a = __asyncValues(this.step(this.input.length, step));
                                    _f.label = 2;
                                case 2: return [4 /*yield*/, _a.next()];
                                case 3:
                                    if (!(_b = _f.sent(), !_b.done)) return [3 /*break*/, 6];
                                    index = _b.value;
                                    this.before();
                                    characters = this.input.substr(index, step);
                                    classes = (_e = (_d = this.config) === null || _d === void 0 ? void 0 : _d.classes) !== null && _e !== void 0 ? _e : [];
                                    props = { classes: classes };
                                    this.parent.context.content = __spreadArray(__spreadArray(__spreadArray([], this.parent.context.content.slice(0, this.parent.context.index), true), characters.split('').map(function (char) { return ({ char: char, props: props }); }), true), this.parent.context.content.slice(this.parent.context.index), true);
                                    this.parent.context.index += characters.length;
                                    this.parent.update();
                                    this.parent.audio.play();
                                    this.after();
                                    return [4 /*yield*/, timeOut(speed)];
                                case 4:
                                    _f.sent();
                                    _f.label = 5;
                                case 5: return [3 /*break*/, 2];
                                case 6: return [3 /*break*/, 13];
                                case 7:
                                    e_1_1 = _f.sent();
                                    e_1 = { error: e_1_1 };
                                    return [3 /*break*/, 13];
                                case 8:
                                    _f.trys.push([8, , 11, 12]);
                                    if (!(_b && !_b.done && (_c = _a.return))) return [3 /*break*/, 10];
                                    return [4 /*yield*/, _c.call(_a)];
                                case 9:
                                    _f.sent();
                                    _f.label = 10;
                                case 10: return [3 /*break*/, 12];
                                case 11:
                                    if (e_1) throw e_1.error;
                                    return [7 /*endfinally*/];
                                case 12: return [7 /*endfinally*/];
                                case 13:
                                    this.resolveAction();
                                    resolve();
                                    return [3 /*break*/, 15];
                                case 14:
                                    err_1 = _f.sent();
                                    this.parent.errorHandler(err_1);
                                    return [3 /*break*/, 15];
                                case 15: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    return Type;
}(Action));
export { Type };

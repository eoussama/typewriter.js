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
import Action from './action.js';
import timeOut from '../utils/timeout.js';
/**
 * @description
 * Typewriter delete action
 */
var Delete = /** @class */ (function (_super) {
    __extends(Delete, _super);
    /**
     * @description
     * Instantiates a type action
     *
     * @param times Number of deletions
     * @param parent The parent typewriter
     * @param config The configuration object
     */
    function Delete(times, parent, config) {
        var _this = _super.call(this, parent, config) || this;
        _this.times = times;
        return _this;
    }
    /**
     * @description
     * Deletes content
     */
    Delete.prototype.run = function () {
        var _this = this;
        var step = Math.max(1, this.getConfig('step'));
        var speed = Math.max(0, this.getConfig('speed'));
        // The starting index, the current poisition of the caret
        var startingIndex = this.parent.context.index;
        // The starting length of the content
        var startingLength = this.parent.context.content.length;
        // Converting the anchor to a valid number
        var sanitizedIndex = typeof this.times === 'string'
            ? this.times === 'start'
                ? startingIndex
                : startingIndex - startingLength
            : this.times;
        // If the deletion mode is inverted
        var inverseDeletion = sanitizedIndex < 0;
        // Comparing bounds to prevent overflowing index
        var normalizedIndex = inverseDeletion
            ? Math.min(startingLength - startingIndex, Math.abs(sanitizedIndex))
            : Math.min(startingIndex, sanitizedIndex);
        // Positive value of the index
        var absoluteIndex = Math.abs(normalizedIndex);
        return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
            var _a, _b, _, deletedContent, start, end, iteration, iterPart, remainingIndex, deletionWidth, start, end, e_1_1;
            var e_1, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 6, 7, 12]);
                        _a = __asyncValues(this.step(absoluteIndex, step));
                        _d.label = 1;
                    case 1: return [4 /*yield*/, _a.next()];
                    case 2:
                        if (!(_b = _d.sent(), !_b.done)) return [3 /*break*/, 5];
                        _ = _b.value;
                        deletedContent = '';
                        this.before({ currentIndex: this.parent.context.index });
                        // Deleting highlighted content
                        if (this.parent.context.hasHighlight()) {
                            start = this.parent.context.highlight[0];
                            end = this.parent.context.highlight[1] + 1;
                            // Extracting the content that's gonna be deleted
                            deletedContent = this.parent.context.content.slice(0).slice(start, end).map(function (e) { return e.char; }).join('');
                            this.parent.context.content = __spreadArray(__spreadArray([], this.parent.context.content.slice(0, start), true), this.parent.context.content.slice(end), true);
                            // Deleting regular content
                        }
                        else {
                            iteration = (_ / step);
                            iterPart = iteration * step;
                            remainingIndex = absoluteIndex - iterPart;
                            deletionWidth = Math.min(remainingIndex, step);
                            start = this.parent.context.index - (inverseDeletion ? 0 : deletionWidth);
                            end = this.parent.context.index + (inverseDeletion ? deletionWidth : 0);
                            // Extracting the content that's gonna be deleted
                            deletedContent = this.parent.context.content.slice(0).slice(start, end).map(function (e) { return e.char; }).join('');
                            // Deleting the marked width
                            this.parent.context.content = __spreadArray(__spreadArray([], this.parent.context.content.slice(0, start), true), this.parent.context.content.slice(end), true);
                            // Updating the caret position
                            this.parent.context.index -= inverseDeletion ? 0 : deletionWidth;
                        }
                        this.parent.context.highlight = [null, null];
                        this.parent.update();
                        this.parent.audio.play(this.parent.config.audio);
                        this.after({
                            characters: deletedContent,
                            currentIndex: this.parent.context.index
                        });
                        return [4 /*yield*/, timeOut(speed)];
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
                        if (!(_b && !_b.done && (_c = _a.return))) return [3 /*break*/, 9];
                        return [4 /*yield*/, _c.call(_a)];
                    case 8:
                        _d.sent();
                        _d.label = 9;
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 11: return [7 /*endfinally*/];
                    case 12:
                        resolve();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    return Delete;
}(Action));
export default Delete;

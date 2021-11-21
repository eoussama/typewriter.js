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
import Action from './action.js';
import timeOut from '../utils/timeout.js';
/**
 * @description
 * Typewriter move action
 */
var Move = /** @class */ (function (_super) {
    __extends(Move, _super);
    /**
     * @description
     * Instantiates a move action,
     * moves the caret tomoves the caret to the target index
     *
     * @param index The target index
     * @param parent The parent typewriter
     * @param config The configuration object
     */
    function Move(index, parent, config) {
        var _this = _super.call(this, parent, config) || this;
        _this.index = index;
        return _this;
    }
    /**
     * @description
     * Moves the caret around
     */
    Move.prototype.run = function () {
        var _this = this;
        var _a;
        var step = Math.max(1, this.getConfig('step'));
        var speed = Math.max(0, this.getConfig('speed'));
        var currentIndex = this.parent.context.index;
        var currentLength = (_a = this.parent.context.content) === null || _a === void 0 ? void 0 : _a.length;
        var absoluteIndex = typeof this.index === 'number'
            ? this.index
            : this.index === 'start'
                ? -currentIndex
                : currentLength - currentIndex;
        var limitedIndex = absoluteIndex < 0
            ? Math.max(currentIndex * -1, absoluteIndex)
            : Math.min(currentLength - currentIndex, absoluteIndex);
        var index = Math.abs(limitedIndex);
        return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
            var _a, _b, _, iteration, iterPart, remIndex, sanitizedStep, e_1_1, err_1;
            var e_1, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 14, , 15]);
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 7, 8, 13]);
                        _a = __asyncValues(this.step(Math.abs(index), step));
                        _d.label = 2;
                    case 2: return [4 /*yield*/, _a.next()];
                    case 3:
                        if (!(_b = _d.sent(), !_b.done)) return [3 /*break*/, 6];
                        _ = _b.value;
                        this.before({ currentIndex: this.parent.context.index });
                        iteration = (_ / step);
                        iterPart = iteration * step;
                        remIndex = index - iterPart;
                        sanitizedStep = Math.min(remIndex, step);
                        this.parent.context.highlight = [null, null];
                        this.parent.context.index += absoluteIndex < 0 ? -sanitizedStep : sanitizedStep;
                        this.parent.update();
                        this.parent.audio.play();
                        this.after({ currentIndex: this.parent.context.index });
                        return [4 /*yield*/, timeOut(speed)];
                    case 4:
                        _d.sent();
                        _d.label = 5;
                    case 5: return [3 /*break*/, 2];
                    case 6: return [3 /*break*/, 13];
                    case 7:
                        e_1_1 = _d.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 13];
                    case 8:
                        _d.trys.push([8, , 11, 12]);
                        if (!(_b && !_b.done && (_c = _a.return))) return [3 /*break*/, 10];
                        return [4 /*yield*/, _c.call(_a)];
                    case 9:
                        _d.sent();
                        _d.label = 10;
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 12: return [7 /*endfinally*/];
                    case 13:
                        resolve();
                        return [3 /*break*/, 15];
                    case 14:
                        err_1 = _d.sent();
                        this.parent.errorHandler(err_1);
                        return [3 /*break*/, 15];
                    case 15: return [2 /*return*/];
                }
            });
        }); });
    };
    return Move;
}(Action));
export default Move;
;

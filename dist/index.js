var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
import timeout from "./utils/timeout.util.js";
/**
 * @description
 * Typewriter
 */
var Typewriter = /** @class */ (function () {
    function Typewriter(target) {
        this.cursor = 0;
        this.ticks = [];
        this.target = target;
        this.ticks.push(new Tick('', 0));
    }
    Typewriter.prototype.type = function (input) {
        for (var _i = 0, input_1 = input; _i < input_1.length; _i++) {
            var char = input_1[_i];
            this.write(char);
        }
    };
    Typewriter.prototype.delete = function (chars) {
        var range = Array(chars).fill(0);
        for (var _i = 0, range_1 = range; _i < range_1.length; _i++) {
            var _ = range_1[_i];
            this.remove(1);
        }
    };
    Typewriter.prototype.start = function () {
        var e_1, _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, _c, tick, e_1_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 6, 7, 12]);
                        _b = __asyncValues(this.ticks);
                        _d.label = 1;
                    case 1: return [4 /*yield*/, _b.next()];
                    case 2:
                        if (!(_c = _d.sent(), !_c.done)) return [3 /*break*/, 5];
                        tick = _c.value;
                        return [4 /*yield*/, timeout(tick.delay)];
                    case 3:
                        _d.sent();
                        this.render(tick);
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
    Typewriter.prototype.write = function (character, delay) {
        if (delay === void 0) { delay = 0; }
        var currentTick = this.getTick();
        var content = currentTick.content + character;
        var index = currentTick.index + 1;
        this.update(content, index, delay);
    };
    Typewriter.prototype.remove = function (char, delay) {
        if (delay === void 0) { delay = 1000; }
        var currentTick = this.getTick();
        var start = char + currentTick.index - 1;
        var content = currentTick.content.substring(0, start - 1) + currentTick.content.substring(start);
        var index = currentTick.index - 1;
        this.update(content, index, delay);
    };
    Typewriter.prototype.update = function (content, index, delay) {
        if (delay === void 0) { delay = 0; }
        var tick = new Tick(content, index, delay);
        this.ticks.push(tick);
        this.cursor++;
    };
    Typewriter.prototype.getTick = function () {
        return __assign({}, this.ticks[this.cursor]);
    };
    Typewriter.prototype.render = function (tick) {
        this.target.innerHTML = tick.content.split('').map(function (e, i) {
            var output = "<span class=\"tw__char\">" + e + "</span>";
            if (i === tick.index - 1) {
                output += '<span class="tw__caret">|</span>';
            }
            return output;
        }).join('');
    };
    return Typewriter;
}());
export default Typewriter;
var Tick = /** @class */ (function () {
    function Tick(content, index, delay) {
        if (delay === void 0) { delay = 0; }
        this.delay = delay;
        this.index = index;
        this.content = content;
    }
    return Tick;
}());

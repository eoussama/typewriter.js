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
import Queue from './queue.js';
import Tab from '../actions/tab.js';
import Exec from '../actions/exec.js';
import Move from '../actions/move.js';
import Type from '../actions/type.js';
import Sleep from '../actions/sleep.js';
import Return from '../actions/return.js';
import Delete from '../actions/delete.js';
import Highlight from '../actions/highlight.js';
/**
 * @description
 * Manages the action queue
 */
var ActionManager = /** @class */ (function () {
    /**
     * @description
     * Initializes the queue manager
     *
     * @param parent The parent typewriter instance
     */
    function ActionManager(parent) {
        this.parent = parent;
        this.queue = new Queue();
    }
    /**
       * @description
       * Initiates a sleep action
       *
       * @param time The timeout time in milliseconds
       */
    ActionManager.prototype.sleep = function (time) {
        var action = new Sleep(time, this.parent);
        this.queue.enqueue(action);
        return this.parent;
    };
    /**
     * @description
     * Initiates anb exec action
     *
     * @param func The user-defined action
     */
    ActionManager.prototype.exec = function (func) {
        var action = new Exec(func, this.parent);
        this.queue.enqueue(action);
        return this.parent;
    };
    /**
     * @description
     * Initiates a type action
     *
     * @param input The target input
     * @param config The action configuration
     */
    ActionManager.prototype.type = function (input, config) {
        var action = new Type(input, this.parent, config);
        this.queue.enqueue(action);
        return this.parent;
    };
    /**
     * @description
     * Initiates a delete action
     *
     * @param times Number of deletions
     * @param config The action configuration
     */
    ActionManager.prototype.delete = function (times, config) {
        var action = new Delete(times, this.parent, config);
        this.queue.enqueue(action);
        return this.parent;
    };
    /**
     * @description
     * Initiates a move action
     *
     * @param index The target index
     * @param config The action configuration
     */
    ActionManager.prototype.move = function (index, config) {
        var action = new Move(index, this.parent, config);
        this.queue.enqueue(action);
        return this.parent;
    };
    /**
     * @description
     * Highlights content
     *
     * @param index The target index
     * @param config The action configuration
     */
    ActionManager.prototype.highlight = function (index, config) {
        var action = new Highlight(index, this.parent, config);
        this.queue.enqueue(action);
        return this.parent;
    };
    /**
     * @description
     * Inserts tabulation
     *
     * @param spaces Number of spaces that make the tabulation
     * @param config The action configuration
     */
    ActionManager.prototype.tab = function (index, config) {
        if (index === void 0) { index = 4; }
        var action = new Tab(index, this.parent, config);
        this.queue.enqueue(action);
        return this.parent;
    };
    /**
     * @description
     * Inserts carriage return
     *
     * @param config The action configuration
     */
    ActionManager.prototype.return = function (config) {
        var action = new Return(this.parent, config);
        this.queue.enqueue(action);
        return this.parent;
    };
    /**
     * @description
     * Resets the queue
     */
    ActionManager.prototype.reset = function () {
        this.queue.clear();
    };
    /**
     * @description
     * Returns and dequeues the head of the queue
     */
    ActionManager.prototype.next = function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!this.queue.peek()) return [3 /*break*/, 2];
                    return [4 /*yield*/, this.queue.dequeue()];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 0];
                case 2: return [2 /*return*/];
            }
        });
    };
    return ActionManager;
}());
export default ActionManager;

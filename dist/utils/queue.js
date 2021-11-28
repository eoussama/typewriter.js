var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
/**
 * @description
 * Queue utility
 */
var Queue = /** @class */ (function () {
    /**
     * @description
     * Initializes the queue object
     */
    function Queue() {
        this._items = [];
    }
    Object.defineProperty(Queue.prototype, "length", {
        /**
         * @description
         * The number of items inside the queue
         */
        get: function () { return this._items.length; },
        enumerable: false,
        configurable: true
    });
    ;
    Object.defineProperty(Queue.prototype, "items", {
        /**
         * @description
         * Returns a snapshot of the items
         */
        get: function () { return this._items.slice(0); },
        enumerable: false,
        configurable: true
    });
    ;
    /**
     * @description
     * Insert an element at the head of the queue,
     * I know it makes no sense to have in a queue
     * but sircumstances call for it.
     */
    Queue.prototype.stack = function (item) {
        var items = Array.isArray(item) ? item : [item];
        this._items = __spreadArray(__spreadArray([], items, true), this._items, true);
    };
    /**
     * @description
     * Queues the target item in
     *
     * @param item The target iteme
     */
    Queue.prototype.enqueue = function (item) {
        this._items.push(item);
    };
    /**
     * @description
     * Dequeues the first item
     */
    Queue.prototype.dequeue = function () {
        var _a;
        return (_a = this._items.shift()) !== null && _a !== void 0 ? _a : null;
    };
    /**
     * @description
     * Checks if the list is empty
     */
    Queue.prototype.isEmpty = function () {
        return this._items.length === 0;
    };
    /**
     * @description
     * Returns the first item n the queue
     */
    Queue.prototype.peek = function () {
        return this._items[0];
    };
    /**
     * @description
     * Clears the queue
     */
    Queue.prototype.clear = function () {
        this._items = [];
    };
    return Queue;
}());
export default Queue;

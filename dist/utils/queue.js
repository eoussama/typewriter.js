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

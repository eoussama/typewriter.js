/**
 * @description
 * The queuer responsible for
 * organizing the actions
 */
var Queuer = /** @class */ (function () {
    /**
     * @description
     * Instantiates the queuer
     */
    function Queuer() {
        this.reset();
    }
    Object.defineProperty(Queuer.prototype, "items", {
        /**
         * @description
         * Returns the queue items
         */
        get: function () {
            return this.queue.slice(0);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @description
     * Adds an action to the queue
     *
     * @param action The action to add
     */
    Queuer.prototype.add = function (action) {
        action.queueId = this.id;
        this.queue.push(action);
    };
    /**
     * @description
     * Clears the action list
     */
    Queuer.prototype.reset = function () {
        this.id = new Date().getTime().toString(32);
        this.queue = [];
    };
    /**
     * @description
     * Checks if the action belongs to the queue
     *
     * @param action The target action
     */
    Queuer.prototype.isValid = function (action) {
        return action.queueId === this.id;
    };
    return Queuer;
}());
export { Queuer };

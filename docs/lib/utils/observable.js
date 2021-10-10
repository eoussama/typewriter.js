/**
 * @description
 * Observable definition
 */
var Observable = /** @class */ (function () {
    /**
     * @description
     * Instanciates an observable instance
     */
    function Observable(defaultValue) {
        // Initializing the default value
        this.value = defaultValue;
        // Initializing the subscribers list
        this.subscribers = [];
    }
    /**
     * @description
     * Emits an event for all listening subscribers
     *
     * @param e The emitted value
     */
    Observable.prototype.emit = function (e) {
        var _this = this;
        this.subscribers.forEach(function (subscriber) {
            _this.value = e;
            subscriber(_this.value);
        });
    };
    /**
     * @description
     * Registers a new subscriber
     *
     * @param func The target function
     */
    Observable.prototype.subscribe = function (func) {
        this.subscribers.push(func);
        func(this.value);
    };
    return Observable;
}());
export { Observable };

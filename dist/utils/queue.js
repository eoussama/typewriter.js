var Queuer = /** @class */ (function () {
    function Queuer() {
        this.queue = [];
    }
    Queuer.prototype.add = function (action) {
        this.queue.push(action);
    };
    return Queuer;
}());
export { Queuer };

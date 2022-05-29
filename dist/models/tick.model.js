/**
 * @model
 * @description
 * The smallest entity that makes up actions
 */
var Tick = /** @class */ (function () {
    /**
     * @description
     * Instantiates a tick, a snapshot of action history
     */
    function Tick(tick) {
        var _a, _b, _c;
        this.content = (_a = tick === null || tick === void 0 ? void 0 : tick.content) !== null && _a !== void 0 ? _a : '';
        this.index = Math.max((_b = tick === null || tick === void 0 ? void 0 : tick.index) !== null && _b !== void 0 ? _b : 0, 0);
        this.delay = Math.max((_c = tick === null || tick === void 0 ? void 0 : tick.delay) !== null && _c !== void 0 ? _c : 0, 0);
    }
    return Tick;
}());
export default Tick;

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
import Tick from '../models/tick.model.js';
/**
 * @util
 * @description
 * Collection of ticks that manages execution context
 * and chronological order
 */
var Timeline = /** @class */ (function () {
    /**
     * @description
     * Creates a timeline instance
     */
    function Timeline() {
        this.cursor = 0;
        this.ticks = [new Tick()];
    }
    /**
     * @description
     * Updates timeline ticks
     *
     * @param tick Tick info
     */
    Timeline.prototype.update = function (tick) {
        this.ticks.push(new Tick(tick));
        this.cursor++;
    };
    /**
     * @description
     * Returns the current active tick
     */
    Timeline.prototype.getTick = function () {
        return __assign({}, this.ticks[this.cursor]);
    };
    return Timeline;
}());
export default Timeline;

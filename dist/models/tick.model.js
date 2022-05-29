/**
 * @model
 * @description
 * The smallest entity that makes up actions
 */
var Tick = /** @class */ (function () {
    /**
     * @description
     * Instantiates a tick, a snapshot of action history
     *
     * @param content Text content
     * @param index Caret position
     * @param delay Execution delay in milliseconds
     */
    function Tick(content, index, delay) {
        if (delay === void 0) { delay = 0; }
        this.content = content !== null && content !== void 0 ? content : '';
        this.index = Math.max(index !== null && index !== void 0 ? index : 0, 0);
        this.delay = Math.max(delay !== null && delay !== void 0 ? delay : 0, 0);
    }
    return Tick;
}());
export default Tick;

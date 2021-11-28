/**
 * @description
 * Caret context
 */
var Context = /** @class */ (function () {
    /**
     * @description
     * Instantiates a base context object
     *
     * @param targetAttribute The target HTML attribute that recieves live updates
     */
    function Context(targetAttribute) {
        this.index = 0;
        this.content = [];
        this.highlight = [null, null];
        this.config = { targetAttribute: targetAttribute };
    }
    /**
     * @description
     * Resets the context state
     */
    Context.prototype.reset = function () {
        this.index = 0;
        this.content = [];
        this.highlight = [null, null];
    };
    /**
   * @description
   * Checks if content has highlight
   */
    Context.prototype.hasHighlight = function () {
        return this.highlight.map(function (e) { return parseInt(e, 10); }).filter(function (e) { return !isNaN(e); }).length === 2;
    };
    /**
   * @description
   * Initializes the contents, copyies over the target's
   * contents and adapts the typewriter's context.
   *
   * @param target The target element
   */
    Context.prototype.initializeContent = function (target) {
        var _a, _b, _c;
        var targetAttribute = ((_a = this.config) === null || _a === void 0 ? void 0 : _a.targetAttribute) === 'innerHTML' ? 'textContent' : (_b = this.config) === null || _b === void 0 ? void 0 : _b.targetAttribute;
        var targetContent = target[targetAttribute];
        this.content = (_c = targetContent === null || targetContent === void 0 ? void 0 : targetContent.split('').map(function (e) { return ({ char: e, props: { classes: [] } }); })) !== null && _c !== void 0 ? _c : [];
        this.index = this.content.length;
    };
    /**
     * @description
     * Extracts properties for a given target
     *
     * @param content The target content
     */
    Context.prototype.extractProps = function (content) {
        var _a, _b, _c, _d;
        // Extracting props
        var props = (_a = content === null || content === void 0 ? void 0 : content.props) !== null && _a !== void 0 ? _a : {};
        // Extracting classes
        var classes = Array.isArray(props === null || props === void 0 ? void 0 : props.class) ? props === null || props === void 0 ? void 0 : props.class : [];
        // Extracting styles
        var styles = (_b = props === null || props === void 0 ? void 0 : props.style) !== null && _b !== void 0 ? _b : {};
        var styleEntries = Object.entries(styles);
        var styleString = styleEntries === null || styleEntries === void 0 ? void 0 : styleEntries.map(function (e) { return e[0] + ": " + e[1]; }).join(';');
        // Extracting attributes
        var attributeKeys = (_c = Object.keys(props)) === null || _c === void 0 ? void 0 : _c.filter(function (e) { return ['style', 'class'].indexOf(e) === -1; });
        var attributes = attributeKeys.map(function (e) { return e + "=\"" + props[e] + "\""; }).join(' ');
        return {
            attributes: attributes,
            class: (_d = classes === null || classes === void 0 ? void 0 : classes.join('')) !== null && _d !== void 0 ? _d : '',
            style: styleString !== null && styleString !== void 0 ? styleString : ''
        };
    };
    return Context;
}());
export default Context;

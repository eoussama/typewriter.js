/**
 * @description
 * The renderer responsible for rendering
 * the typewriter's output
 */
var Renderer = /** @class */ (function () {
    /**
     * @description
     * Instantiates the renderer instance
     *
     * @param config The renderer configuration
     */
    function Renderer(target, context, config) {
        var _a, _b, _c;
        this.context = context;
        this.target = target;
        this.config = {
            enable: (_a = config === null || config === void 0 ? void 0 : config.enable) !== null && _a !== void 0 ? _a : true,
            blink: (_b = config === null || config === void 0 ? void 0 : config.blink) !== null && _b !== void 0 ? _b : true,
            content: (_c = config === null || config === void 0 ? void 0 : config.content) !== null && _c !== void 0 ? _c : '_'
        };
        this.injectStyle();
        this.render();
    }
    /**
     * @description
     * Renders the context inside of the target HTML element
     */
    Renderer.prototype.render = function () {
        var _this = this;
        var _a;
        if (this.target) {
            var output_1 = '';
            if (this.context.content.length > 0) {
                this.context.content.forEach(function (content, i) {
                    var _a, _b, _c, _d;
                    // Render caret at the begining of the content
                    if (((_a = _this.config) === null || _a === void 0 ? void 0 : _a.enable) && i === 0 && _this.context.index === 0) {
                        output_1 += _this.renderedCaret();
                    }
                    // Opening the highlighter tag
                    if (_this.canHighlight() && _this.context.highlight[0] === i) {
                        output_1 += '<mark class="tw_highlight">';
                    }
                    // Render character
                    output_1 += "<span class=\"tw_char " + ((_c = (_b = content === null || content === void 0 ? void 0 : content.props) === null || _b === void 0 ? void 0 : _b.classes) === null || _c === void 0 ? void 0 : _c.join('')) + "\">" + content.char + "</span>";
                    // Opening the highlighter tag
                    if (_this.canHighlight() && _this.context.highlight[1] === i) {
                        output_1 += '</mark>';
                    }
                    // Render caret after character
                    if (((_d = _this.config) === null || _d === void 0 ? void 0 : _d.enable) && i + 1 === _this.context.index) {
                        output_1 += _this.renderedCaret();
                    }
                });
            }
            else if ((_a = this.config) === null || _a === void 0 ? void 0 : _a.enable) {
                output_1 += this.renderedCaret();
            }
            this.target.innerHTML = output_1;
        }
    };
    /**
     * @description
     * Resets the target
     */
    Renderer.prototype.reset = function () {
        if (this.target) {
            this.target.innerHTML = '';
        }
    };
    /**
     * @description
     * If the highlighter is active
     */
    Renderer.prototype.canHighlight = function () {
        return true;
    };
    /**
     * @description
     * Returns the rendered caret
     */
    Renderer.prototype.renderedCaret = function () {
        return "<span class=\"tw_caret " + (this.config.blink ? 'tw_blink' : '') + "\">" + this.config.content + "</span>";
    };
    /**
     * @description
     * Injects CSS styling for certain features to work,
     * ex; caret blinking, etc...
     */
    Renderer.prototype.injectStyle = function () {
        var styles = document.getElementById('tw_styles');
        // Checking if the stylres aren't already injected
        if (!styles) {
            styles = document.createElement('style');
            styles.id = 'tw_styles';
            styles.textContent = "\n        .tw_highlight {\n          background-color: #3390ff;\n          color: #ffffff;\n        }\n\n\t\t\t\t.tw_caret.tw_blink {\n\t\t\t\t\tanimation-name: tw_blink_animation;\n\t\t\t\t\tanimation-duration: 0.5s;\n\t\t\t\t\tanimation-iteration-count: infinite;\n\t\t\t\t\tanimation-direction: alternate-reverse;\n\t\t\t\t}\n\n\t\t\t\t@keyframes tw_blink_animation {\n\t\t\t\t\tfrom {\n\t\t\t\t\t\topacity: 0;\n\t\t\t\t\t}\n\n\t\t\t\t\tto {\n\t\t\t\t\t\topacity: 1;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t";
            document.head.appendChild(styles);
        }
    };
    return Renderer;
}());
export { Renderer };

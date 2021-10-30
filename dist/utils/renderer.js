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
     * @param target The target element
     * @param targetAttribute The target attributes that recieves content update
     * @param parseHTML Whether or not to keep HTML output
     * @param context The typewriter context
     * @param config The renderer configuration
     */
    function Renderer(target, targetAttribute, parseHTML, context, config) {
        var _a, _b, _c;
        this.context = context;
        this.target = target;
        this.parseHTML = parseHTML !== null && parseHTML !== void 0 ? parseHTML : true;
        this.targetAttribute = targetAttribute;
        this.config = {
            blink: (_a = config === null || config === void 0 ? void 0 : config.blink) !== null && _a !== void 0 ? _a : true,
            enable: (_b = config === null || config === void 0 ? void 0 : config.enable) !== null && _b !== void 0 ? _b : true,
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
        if (this.target) {
            this.target[this.targetAttribute] = this.parseContent(this.parseHTML);
        }
    };
    /**
     * @description
     * Resets the target
     */
    Renderer.prototype.reset = function () {
        if (this.target) {
            this.target[this.targetAttribute] = '';
        }
    };
    /**
     * @description
     * Strips out HTML formatting and returns a raw string
     *
     * @param input The HTML input to sanitize
     * @returns
     */
    Renderer.prototype.stripHTML = function (input) {
        var _a;
        var element = document.createElement('div');
        element.innerHTML = input;
        return (_a = element.textContent) !== null && _a !== void 0 ? _a : '';
    };
    /**
     * @description
     * Returns the parse content
     *
     * @param allowHtml Whether or not to return content as HTML or raw text
     */
    Renderer.prototype.parseContent = function (allowHtml) {
        var _this = this;
        var _a;
        if (allowHtml === void 0) { allowHtml = true; }
        var output = '';
        if (this.context.content.length > 0) {
            this.context.content.forEach(function (content, i) {
                var _a, _b;
                // Render caret at the begining of the content
                if (((_a = _this.config) === null || _a === void 0 ? void 0 : _a.enable) && i === 0 && _this.context.index === 0) {
                    output += _this.renderedCaret();
                }
                // Opening the highlighter tag
                if (_this.canHighlight() && _this.context.highlight[0] === i) {
                    output += '<mark class="tw_highlight">';
                }
                // Extracting properties
                var props = _this.context.extractProps(content);
                console.log({ props: props });
                // Render character
                output += "<span class=\"tw_char " + props.class + "\">" + content.char + "</span>";
                // Opening the highlighter tag
                if (_this.canHighlight() && _this.context.highlight[1] === i) {
                    output += '</mark>';
                }
                // Render caret after character
                if (((_b = _this.config) === null || _b === void 0 ? void 0 : _b.enable) && i + 1 === _this.context.index) {
                    output += _this.renderedCaret();
                }
            });
        }
        else if ((_a = this.config) === null || _a === void 0 ? void 0 : _a.enable) {
            output += this.renderedCaret();
        }
        return allowHtml ? output : this.stripHTML(output);
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

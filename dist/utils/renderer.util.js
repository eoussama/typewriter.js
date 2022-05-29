/**
 * @description
 * Rnder manager, manages DOM updates
 */
var Renderer = /** @class */ (function () {
    /**
     * @description
     * Creates a rendering manager
     *
     * @param target HTML element instance
     */
    function Renderer(target) {
        this.target = target;
    }
    /**
     * @description
     * Updates the DOM
     *
     * @param tick Target state tick to update with
     */
    Renderer.prototype.render = function (tick) {
        var _this = this;
        var output = '';
        tick.content.split('').forEach(function (character, index) {
            output += _this.renderCharacter(character);
            if (index === tick.index) {
                output += _this.renderCaret();
            }
        });
        if (output.length === 0) {
            output = this.renderCaret();
        }
        this.updateDOM(output);
    };
    /**
     * @description
     * Updates thhe target DOM element
     *
     * @param content Input HTML content
     */
    Renderer.prototype.updateDOM = function (content) {
        this.target.innerHTML = content;
    };
    /**
     * @description
     * Returns appropriate HTML embed for a character
     *
     * @param character Input character
     */
    Renderer.prototype.renderCharacter = function (character) {
        return "<span class=\"tw__char\">" + character + "</span>";
    };
    /**
     * @description
     * Returns configured caret symbole
     */
    Renderer.prototype.renderCaret = function () {
        return '<span class="tw__caret">|</span>';
    };
    return Renderer;
}());
export default Renderer;

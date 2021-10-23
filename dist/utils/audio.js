/**
 * @description
 * Audio management utility
 */
var Audio = /** @class */ (function () {
    /**
     * @description
     * Instantiates the audio instance
     *
     * @param config The audio configuration
     */
    function Audio(config) {
        var _a, _b, _c;
        this.config = {
            enable: (_a = config === null || config === void 0 ? void 0 : config.enable) !== null && _a !== void 0 ? _a : false,
            volume: (_b = config === null || config === void 0 ? void 0 : config.volume) !== null && _b !== void 0 ? _b : 0.5,
            src: (_c = config === null || config === void 0 ? void 0 : config.src) !== null && _c !== void 0 ? _c : []
        };
    }
    /**
     * @description
     * Plays a random sound from
     * the imported source array
     */
    Audio.prototype.play = function () {
        if (this.config.enable) {
            var index = Math.floor((Math.random()) * (this.config.src.length - 1));
            var sfx = this.config.src[index];
            var audio = new window.Audio(sfx);
            audio.volume = this.config.volume;
            if (document === null || document === void 0 ? void 0 : document.hasFocus()) {
                audio.play().catch(function (err) { });
            }
        }
    };
    return Audio;
}());
export { Audio };

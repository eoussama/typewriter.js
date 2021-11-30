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
     *
     * @param config Optional updated configuration
     */
    Audio.prototype.play = function (config) {
        // Overrides the configuration object
        if (config) {
            this.config = __assign(__assign({}, this.config), config);
        }
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
export default Audio;

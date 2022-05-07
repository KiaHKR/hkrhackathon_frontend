(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../OptionsColor"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LightShadow = void 0;
    const OptionsColor_1 = require("../../OptionsColor");
    class LightShadow {
        constructor() {
            this.color = new OptionsColor_1.OptionsColor();
            this.color.value = "#000000";
            this.length = 2000;
        }
        load(data) {
            if (!data) {
                return;
            }
            this.color = OptionsColor_1.OptionsColor.create(this.color, data.color);
            if (data.length !== undefined) {
                this.length = data.length;
            }
        }
    }
    exports.LightShadow = LightShadow;
});

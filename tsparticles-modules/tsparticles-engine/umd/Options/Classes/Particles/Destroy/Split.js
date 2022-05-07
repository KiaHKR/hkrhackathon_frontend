(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./SplitFactor", "./SplitRate", "../../../../Utils/Utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Split = void 0;
    const SplitFactor_1 = require("./SplitFactor");
    const SplitRate_1 = require("./SplitRate");
    const Utils_1 = require("../../../../Utils/Utils");
    class Split {
        constructor() {
            this.count = 1;
            this.factor = new SplitFactor_1.SplitFactor();
            this.rate = new SplitRate_1.SplitRate();
            this.sizeOffset = true;
        }
        load(data) {
            if (!data) {
                return;
            }
            if (data.count !== undefined) {
                this.count = data.count;
            }
            this.factor.load(data.factor);
            this.rate.load(data.rate);
            if (data.particles !== undefined) {
                this.particles = (0, Utils_1.deepExtend)({}, data.particles);
            }
            if (data.sizeOffset !== undefined) {
                this.sizeOffset = data.sizeOffset;
            }
        }
    }
    exports.Split = Split;
});

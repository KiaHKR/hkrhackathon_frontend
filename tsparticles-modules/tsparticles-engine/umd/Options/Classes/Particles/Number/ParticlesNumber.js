(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./ParticlesDensity"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ParticlesNumber = void 0;
    const ParticlesDensity_1 = require("./ParticlesDensity");
    class ParticlesNumber {
        constructor() {
            this.density = new ParticlesDensity_1.ParticlesDensity();
            this.limit = 0;
            this.value = 100;
        }
        get max() {
            return this.limit;
        }
        set max(value) {
            this.limit = value;
        }
        load(data) {
            var _a;
            if (!data) {
                return;
            }
            this.density.load(data.density);
            const limit = (_a = data.limit) !== null && _a !== void 0 ? _a : data.max;
            if (limit !== undefined) {
                this.limit = limit;
            }
            if (data.value !== undefined) {
                this.value = data.value;
            }
        }
    }
    exports.ParticlesNumber = ParticlesNumber;
});
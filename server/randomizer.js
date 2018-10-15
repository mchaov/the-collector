"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function randomResponse(res, template) {
    let t = getRndInteger(100, 2000);
    setTimeout(() => { res.render(template, { time: t }); }, t);
}
exports.randomResponse = randomResponse;
//# sourceMappingURL=randomizer.js.map
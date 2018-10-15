"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs-extra");
const helpers_1 = require("./helpers");
const dir = path.resolve(__dirname, "..", "RESULT");
const file = path.join(dir, "res.json");
var data = [];
if (!fs.pathExistsSync(file)) {
    fs.ensureDirSync(dir);
    fs.ensureFileSync(file);
}
else {
    data = fs.readJSONSync(file);
}
exports.clearMemory = () => {
    data = [];
    helpers_1.updateFs(file, data);
};
exports.getData = () => {
    return JSON.stringify(data);
};
function logMe(x) {
    data.push(x);
    helpers_1.updateFs(file, data);
}
exports.logMe = logMe;
//# sourceMappingURL=logger.js.map
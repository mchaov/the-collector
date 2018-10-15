"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-extra");
const debounce_decorator_1 = require("debounce-decorator");
exports.updateFs = debounce_decorator_1.debounce((file, data) => {
    try {
        fs.writeFileSync(file, JSON.stringify(data));
    }
    catch (e) {
        console.log(e);
    }
});
//# sourceMappingURL=updateFs.js.map
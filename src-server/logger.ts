import * as path from "path";
import * as fs from "fs-extra";
import { updateFs } from "./helpers";

const dir = path.resolve(__dirname, "..", "RESULT");
const file = path.join(dir, "res.json");
var data: any[] = [];

if (!fs.pathExistsSync(file)) {
    fs.ensureDirSync(dir);
    fs.ensureFileSync(file);
} else {
    data = fs.readJSONSync(file)
}

export const clearMemory = () => {
    data = [];
    updateFs(file, data);
}

export const getData = () => {
    return JSON.stringify(data);
}

export function logMe(x) {
    data.push(x);
    updateFs(file, data);
}
import * as fs from "fs-extra";
import { debounce } from "debounce-decorator";

export const updateFs: (file: string, data: any[]) => void = debounce((file: string, data: any[]) => {
    try {
        fs.writeFileSync(file, JSON.stringify(data));
    } catch (e) {
        console.log(e);
    }
})
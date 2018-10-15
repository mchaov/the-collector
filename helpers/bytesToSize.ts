// https://github.com/paulirish/memory-stats.js/blob/master/memory-stats.js
// Thanks Paul Irish :)

const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
export function bytesToSize(bytes, nFractDigit) {
    if (bytes === 0) { return "N/A"; }
    nFractDigit = nFractDigit !== undefined ? nFractDigit : 0;
    let precision = Math.pow(10, nFractDigit);
    let i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes * precision / Math.pow(1024, i)) / precision + " " + sizes[i];
}
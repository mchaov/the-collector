export function hashString(s) {
    var hash = 0, i, chr;
    if (s.length === 0) { return hash; }
    for (i = 0; i < s.length; i++) {
        chr = s.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0;
    }
    return hash;
};
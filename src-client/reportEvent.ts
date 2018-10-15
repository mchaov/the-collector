const URL = "/collect";

export function reportEvent(event, qstr) {
    let body = {
        metrics: event
    };
    let blob = new Blob([JSON.stringify(body)], { type: "text/plain; charset=UTF-8" });
    if ("navigator" in window && "sendBeacon" in navigator) {
        navigator.sendBeacon(URL, blob);
    } else {
        var o: any = new XMLHttpRequest();
        o.open("POST", `${URL}?guid=${qstr}`);
        o.setRequestHeader("Content-Type", blob.type);
        try {
            o.send(blob);
        } catch (e) { }
    }
}
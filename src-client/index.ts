// https://www.w3.org/TR/navigation-timing-2/
// http://siusin.github.io/perf-timing-primer/

import * as UAParser from "ua-parser-js";
import { addToDom } from "./addToDom";
import { hashString } from "../helpers";
import { reportEvent } from "./reportEvent";

var timesStart = Date.now();
var timesDOM = 0;
const GUID = hashString(`${timesStart}-${location.host}-${location.pathname}`);
const naStr = "N/A";
const PAINT = {
    "first-paint": naStr,
    "first-contentful-paint": naStr
};
const MEMORY = ((performance as any).memory && {
    usedJSHeapSize: (performance as any).memory.usedJSHeapSize,
    jsHeapSizeLimit: (performance as any).memory.jsHeapSizeLimit,
    totalJSHeapSize: (performance as any).memory.totalJSHeapSize
}) || {
        usedJSHeapSize: naStr,
        jsHeapSizeLimit: naStr,
        totalJSHeapSize: naStr
    };

document.addEventListener("DOMContentLoaded", e => {
    timesDOM = Date.now();
});

var n: any = navigator;
if (typeof n.connection === "undefined") {
    n.connection = {
        downlink: naStr,
        effectiveType: naStr,
        rtt: naStr
    }
}
const n1 = new UAParser(n.userAgent);
const AGENT = {
    guid: GUID,
    domain: location.host,
    path: location.pathname,
    memory: MEMORY,
    connection: {
        rtt: n.connection.rtt,
        downlink: n.connection.downlink,
        effectiveType: n.connection.effectiveType
    },
    client: {
        os: n1.getOS(),
        cpu: n1.getCPU(),
        platform: n.platform,
        userAgent: n.userAgent,
        device: n1.getDevice(),
        engine: n1.getEngine(),
        browser: n1.getBrowser(),
        hardwareConcurrency: n.hardwareConcurrency || naStr
    }
};

if (!AGENT.client.device.type && AGENT.client.os.name) {
    AGENT.client.device.type = naStr;
    AGENT.client.device.model = naStr;
    AGENT.client.device.vendor = naStr;
    if (
        navigator.userAgent.match(/mac/gim) ||
        navigator.userAgent.match(/linux/gim) ||
        navigator.userAgent.match(/windows/gim)
    ) {
        AGENT.client.device.type = "desktop";
        AGENT.client.device.model = "PC/MAC";
    }
}

if (typeof PerformanceObserver !== "undefined") {
    const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            PAINT[entry.name] = Math.round(entry.startTime + entry.duration)
        }
    });
    try {
        observer.observe({ entryTypes: ["paint"] });
    } catch (e) { }
}

function crossTiming(v2: number, v1: number, fallback: number | string = naStr) {
    return v2 || v1 || fallback;
}

window.addEventListener("load", e => {
    setTimeout(() => {
        let p: PerformanceNavigationTiming = performance.getEntries()[0] as any;
        let p1: PerformanceResourceTiming[] = performance.getEntriesByType("resource") as any;
        let pv1 = performance.timing;
        let timesLoaded = Date.now() - timesStart;
        let timesDOMPolyfil = timesDOM - timesStart;
        let d = {
            size: {
                transferSizeKB: (p.transferSize / 1024).toFixed(2),
                decodedBodySizeKB: (p.decodedBodySize / 1024).toFixed(2),
                totalTransferSizeKB: (p1.reduce((a, b) => a += b.transferSize, 0) / 1024).toFixed(2),
                totalDecodedBodySizeKB: (p1.reduce((a, b) => a += b.decodedBodySize, 0) / 1024).toFixed(2)
            },
            events: {
                dom: {
                    completed: crossTiming(p.domComplete, pv1.domComplete - pv1.navigationStart, timesDOMPolyfil),
                    interactive: crossTiming(p.domInteractive, pv1.domInteractive - pv1.navigationStart, timesDOMPolyfil),
                    contentLoadedEnd: crossTiming(p.domContentLoadedEventEnd, pv1.domContentLoadedEventEnd - pv1.navigationStart, timesDOMPolyfil),
                    contentLoadedStart: crossTiming(p.domContentLoadedEventStart, pv1.domContentLoadedEventStart - pv1.navigationStart, timesDOMPolyfil)
                },
                load: {
                    end: crossTiming(p.loadEventEnd, pv1.loadEventEnd - pv1.navigationStart, timesLoaded),
                    start: crossTiming(p.loadEventStart, pv1.loadEventStart - pv1.navigationStart, timesLoaded - p.duration),
                    duration: p.duration // p.loadEvent - p.startTime -> https://www.w3.org/TR/navigation-timing-2/#sec-navigation-timing
                },
                paint: PAINT
            },
            network: {
                redirectTime: {
                    end: crossTiming(p.redirectEnd, pv1.redirectEnd),
                    start: crossTiming(p.redirectStart, pv1.redirectStart),
                    count: p.redirectCount
                },
                dnsLookup: {
                    end: crossTiming(p.domainLookupEnd, pv1.domainLookupEnd - pv1.navigationStart),
                    start: crossTiming(p.domainLookupStart, pv1.domainLookupStart - pv1.navigationStart)
                },
                tcpTime: {
                    end: crossTiming(p.connectEnd, pv1.connectEnd - pv1.navigationStart),
                    start: crossTiming(p.connectStart, pv1.connectStart - pv1.navigationStart)
                },
                secureConnection: {
                    end: crossTiming(p.connectEnd, pv1.connectEnd - pv1.navigationStart),
                    start: crossTiming(p.connectStart, pv1.connectStart - pv1.navigationStart)
                },
                responseTime: {
                    end: crossTiming(p.responseEnd, pv1.responseEnd - pv1.navigationStart),
                    start: crossTiming(p.responseStart, pv1.responseStart - pv1.navigationStart)
                }
            },
            meta: {
                responseEnd: crossTiming(p.responseEnd, pv1.responseEnd - pv1.navigationStart),
                requestStart: crossTiming(p.requestStart, pv1.requestStart - pv1.navigationStart),
                responseStart: crossTiming(p.responseStart, pv1.responseStart - pv1.navigationStart)
            },
            ...AGENT
        };
        addToDom(GUID, d);
        reportEvent(d, GUID);
    });
});
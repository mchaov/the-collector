import { Response } from "express-serve-static-core";

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

export function randomResponse(res: Response, template: string) {
    let t = getRndInteger(100, 2000);
    setTimeout(() => { res.render(template, { time: t }) }, t);
}
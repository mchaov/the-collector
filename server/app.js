"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const logger = require("morgan");
const express = require("express");
const geoip = require("geoip-country");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const cookieParser = require("cookie-parser");
const logger_1 = require("./logger");
const randomizer_1 = require("./randomizer");
exports.app = express();
const pthImgs = path.resolve(path.join(__dirname, "..", "imgs"));
const distPath = path.resolve(path.join(__dirname, "..", "dist"));
const viewsPath = path.resolve(path.join(__dirname, "..", "views"));
const vendorPath = path.resolve(path.join(__dirname, "..", "vendor"));
const hbs = exphbs.create({
    layoutsDir: path.join(viewsPath, "layouts"),
    partialsDir: path.join(viewsPath, "partials"),
    defaultLayout: "main"
});
exports.app.enable("trust proxy");
exports.app.engine("handlebars", hbs.engine);
exports.app.set("views", viewsPath);
exports.app.set("view engine", "handlebars");
exports.app.use(favicon(path.join(pthImgs, "favicon.ico")));
exports.app.use(logger("dev"));
exports.app.use(bodyParser.json({ limit: "50mb" }));
exports.app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
exports.app.use(cookieParser());
exports.app.use(express.static(pthImgs));
exports.app.use(express.static(distPath));
exports.app.use(express.static(vendorPath));
exports.app.use("/static", express.static(pthImgs));
exports.app.use("/static", express.static(distPath));
exports.app.use("/static", express.static(vendorPath));
exports.app.use((req, res, next) => {
    res.append("Access-Control-Allow-Origin", ["*"]);
    res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.append("Access-Control-Allow-Headers", "*");
    next();
});
exports.app.use("/collect", bodyParser.raw({ type: "*/*" }), (req, res, next) => {
    let stampedObj = JSON.parse(req.body.toString());
    let c = geoip.lookup(req.ip);
    stampedObj.loggedTimeStamp = Date.now();
    stampedObj.metrics.client.countryCode = c ? c.country : "N/A";
    logger_1.logMe(stampedObj);
    res.send("");
});
exports.app.use("/reset", (req, res, next) => {
    logger_1.clearMemory();
    res.send("done");
});
exports.app.use("/data", (req, res, next) => {
    res.send(logger_1.getData());
});
exports.app.use("/result", (req, res, next) => {
    res.render("result");
});
exports.app.use("/noDelay", (req, res, next) => {
    res.render("index", { time: 0 });
});
exports.app.use("*", (req, res, next) => {
    randomizer_1.randomResponse(res, "index");
});
exports.app.use((req, res, next) => {
    res
        .status(404)
        .render("error", {
        status: 404,
        url: req.url,
        layout: false,
        message: "Resourse not found!"
    });
});
//# sourceMappingURL=app.js.map
import * as path from "path";
import * as logger from "morgan";
import * as express from "express";
import * as geoip from "geoip-country";
import * as favicon from "serve-favicon";
import * as bodyParser from "body-parser";
import * as exphbs from "express-handlebars";
import * as cookieParser from "cookie-parser";
import { logMe, clearMemory, getData } from "./logger";
import { randomResponse } from "./randomizer";

export const app = express();

const pthImgs = path.resolve(path.join(__dirname, "..", "imgs"));
const distPath = path.resolve(path.join(__dirname, "..", "dist"));
const viewsPath = path.resolve(path.join(__dirname, "..", "views"));
const vendorPath = path.resolve(path.join(__dirname, "..", "vendor"));

const hbs = exphbs.create({
    layoutsDir: path.join(viewsPath, "layouts"),
    partialsDir: path.join(viewsPath, "partials"),
    defaultLayout: "main"
});

app.enable("trust proxy");

app.engine("handlebars", hbs.engine);

app.set("views", viewsPath);
app.set("view engine", "handlebars");

app.use(favicon(path.join(pthImgs, "favicon.ico")));
app.use(logger("dev"));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

app.use(express.static(pthImgs));
app.use(express.static(distPath));
app.use(express.static(vendorPath));
app.use("/static", express.static(pthImgs));
app.use("/static", express.static(distPath));
app.use("/static", express.static(vendorPath));

app.use((req, res, next) => {
    res.append("Access-Control-Allow-Origin", ["*"]);
    res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.append("Access-Control-Allow-Headers", "*");
    next();
});

app.use("/collect", bodyParser.raw({ type: "*/*" }), (req, res, next) => {
    let stampedObj = JSON.parse(req.body.toString());
    let c = geoip.lookup(req.ip);
    stampedObj.loggedTimeStamp = Date.now();
    stampedObj.metrics.client.countryCode = c ? c.country : "N/A";
    logMe(stampedObj);
    res.send("");
});

app.use("/reset", (req, res, next) => {
    clearMemory();
    res.send("done");
});

app.use("/data", (req, res, next) => {
    res.send(getData());
});

app.use("/result", (req, res, next) => {
    res.render("result");
});

app.use("/noDelay", (req, res, next) => {
    res.render("index", { time: 0 });
});

app.use("*", (req, res, next) => {
    randomResponse(res, "index");
    // res.render("index");
});

app.use((req, res, next) => {
    res
        .status(404)
        .render("error", {
            status: 404,
            url: req.url,
            layout: false,
            message: "Resourse not found!"
        });
});
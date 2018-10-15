"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const app_1 = require("./app");
const helpers_1 = require("./helpers");
let port = helpers_1.normalizePort(process.env.PORT || "3000");
app_1.app.set("port", port);
let server = http.createServer(app_1.app);
server.listen(port);
server.timeout = 60 * 10 * 1000;
server.on("error", helpers_1.onError.bind(null, port));
server.on("listening", helpers_1.onListening.bind(null, server));
//# sourceMappingURL=index.js.map
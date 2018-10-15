"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const open = require("open");
const debug = require("debug");
function onListening(server) {
    let addr = server.address();
    let bind = typeof addr === "string"
        ? "pipe " + addr
        : "port " + addr.port;
    debug("devStuff:server")("Listening on " + bind);
    open("http://localhost:" + addr.port);
    console.log("working on port:", addr.port);
}
exports.onListening = onListening;
//# sourceMappingURL=onListening.js.map
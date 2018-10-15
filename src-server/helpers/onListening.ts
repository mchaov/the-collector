const open = require("open");
import * as debug from "debug";

export function onListening(server) {
    let addr: any = server.address();
    let bind = typeof addr === "string"
        ? "pipe " + addr
        : "port " + addr.port;
    debug("devStuff:server")("Listening on " + bind);
    open("http://localhost:" + addr.port);
    console.log("working on port:", addr.port);
}
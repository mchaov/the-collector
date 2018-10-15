import * as http from "http";

import { app } from "./app";
import { onError, normalizePort, onListening } from "./helpers";

let port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

let server = http.createServer(app);
server.listen(port);
server.timeout = 60 * 10 * 1000;
server.on("error", onError.bind(null, port));
server.on("listening", onListening.bind(null, server));
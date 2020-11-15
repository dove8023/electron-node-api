const http = require("http");
const fs = require("fs");
const path = require("path");

function createServer() {
    const server = http.createServer((req, res) => {
        let pathStr = path.resolve(__dirname, "../../../../");
        let root = fs.readdirSync(pathStr);
        let config = fs.readFileSync(path.resolve(pathStr, "config.json"));
        res.write("yes, ok ============ ");
        res.write(config);
        res.end();
    });
    server.on("clientError", (err, socket) => {
        socket.end("HTTP/1.1 400 Bad Request\r\n\r\n");
    });
    server.listen(8000);
}

/* get the config */

function getTheConfig() {
    const root = fs.readdirSync("/");
    console.log(root);
}

module.exports = {
    createServer,
};

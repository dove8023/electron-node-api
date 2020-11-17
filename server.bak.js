const http = require("http");
const fs = require("fs");
const path = require("path");

const { app } = require("electron")

let data = {};

function createServer() {
    const server = http.createServer((req, res) => {
        // let pathStr = path.resolve(__dirname);
        // let root = fs.readdirSync(pathStr);
        // let config = fs.readFileSync(path.resolve(pathStr, "config.json"));

        data["__dirname"] = __dirname;
        data["process.execPath"] = process.execPath;
        data["process.cwd"] = process.cwd();
        data["app.getPath"] = app.getPath('exe')

        res.write(JSON.stringify(data));

        res.write("yes, ok ============ " + __dirname);

        let config = {
            path: path.resolve(app.getPath('exe'), "./config.json")
        };
        config.isExists = fs.existsSync(config.path);
        if (config.isExists) {
            config.content = fs.readFileSync(config.path)
        }

        res.write(JSON.stringify(config))

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

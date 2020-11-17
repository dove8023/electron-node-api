const net = require("net");

function isPortInUse(port) {
    return new Promise((resolve, reject) => {
        let server = net.createServer().listen(port);
        server.on("listening", () => {
            server.close();
            resolve(port);
        });
        server.on("error", (err) => {
            if (err.code == "EADDRINUSE") {
                resolve(0);
            }
        })
    })
}

async function getEmptyPort() {
    // 验证端口是否有效
    let checkPort = 3000;
    let port = 0;
    do {
        let port = await isPortInUse(checkPort);
        if (port) {
            return port;
        } else {
            checkPort++;
        }
        if (checkPort >= 65535) {
            return;
        }
    } while (!port);
}

module.exports = { getEmptyPort }
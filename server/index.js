const http = require("http");
const { getEmptyPort } = require("./common");
const httpProxy = require("http-proxy");
const { ipcMain } = require("electron")

let serverPort = 0;

ipcMain.on('server-on', (event, arg) => {
    if (!serverPort) {
        return;
    }
    event.reply('server-on', serverPort);
})

const createServer = async () => {
    // 获取有效端口
    let port = await getEmptyPort();

    // 获取配置信息 如 java server 地址；wallet相关参数；

    // 创建poxy代理
    let proxy = httpProxy.createProxyServer({
        headers: {
            blockChainAuth: "dkdkdkdkdkddkdkdkdkdkdkdkdkdkdkdkdkdkdkdkdkd"
        }
    });

    proxy.on('error', function (err, req, res) {
        res.writeHead(500, {
            'Content-Type': 'text/plain'
        });

        res.end('Something went wrong. And we are reporting a custom error message.');
    });

    let server = http.createServer((req, res) => {
        console.log(req.headers)
        proxy.web(req, res, {
            target: "http://localhost:3000"
        })
    })

    server.listen(port, () => {
        // 通知 java Server，node-api ok，并发送端口号
        console.log('node-api is on: ' + port);
        serverPort = port;
    });
}

module.exports = {
    createServer
}
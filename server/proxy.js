const httpProxy = require("http-proxy");
const path = require("path");
const config = require('./config');
const log = require('electron-log');
const application = require(path.resolve(config.path, "application.json"));


// 创建poxy代理
let proxy = httpProxy.createProxyServer({
    // selfHandleResponse: true,
});


proxy.on('error', function (err, req, res) {
    res.writeHead(500, {
        'Content-Type': 'text/plain'
    });

    console.log('error: ', err)
    res.end('Something went wrong. And we are reporting a custom error message.');
});



module.exports = async function proxyFn(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", ["Authorization", "blockAuth"]);
    res.setHeader("Access-Control-Allow-Methods", ["PUT,POST,GET,DELETE,OPTIONS"]);
    // process.env.PORTABLE_EXECUTABLE_DIR
    log.info(req.url)
    if (req.url == '/ping') {
        res.end('pong: ' + process.env.PORTABLE_EXECUTABLE_DIR);
    } else {
        proxy.web(req, res, {
            target: `http://${application.host}:${application.port}`,
            headers: {
                blockAuth: userBlockAuth
            }
        })
    }
}
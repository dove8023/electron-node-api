const httpProxy = require("http-proxy");
const path = require("path");
const query = require("./query");

const dir = global.dir;
const application = require(path.resolve(dir, "application.json"));


// 创建poxy代理
let proxy = httpProxy.createProxyServer({
    selfHandleResponse: true,
});


proxy.on('error', function (err, req, res) {
    res.writeHead(500, {
        'Content-Type': 'text/plain'
    });

    console.log('error: ', err)
    res.end('Something went wrong. And we are reporting a custom error message.');
});

proxy.on('proxyRes', (proxyRes, req, res, options) => {
    let body = [];
    proxyRes.on('data', (chunk) => {
        body.push(chunk);
    })

    proxyRes.on('end', () => {
        body = Buffer.concat(body).toString();
        console.log('res from proxied server: ', body);

        // 检测请求状态是否过期
        res.end(body);
    })
})


let userBlockAuth = null;

module.exports = async function proxyFn(req, res) {
    // if (!userBlockAuth) {
    //     userBlockAuth = await query();
    // }

    proxy.web(req, res, {
        target: `http://${application.host}:${application.port}`,
        headers: {
            blockAuth: userBlockAuth
        }
    })
}
const http = require("http");
const { getEmptyPort } = require("./common");
const updateAgentState = require("./agentState");
const log = require('electron-log');


const createServer = async () => {
    // 获取有效端口
    let port = await getEmptyPort();

    let server = http.createServer(async (req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers", ["Authorization", "blockAuth"]);
        res.setHeader("Access-Control-Allow-Methods", ["PUT,POST,GET,DELETE,OPTIONS"]);
        console.log(req.url);

        let urls = req.url.split('?');
        let path = urls[0];

        if (path == '/ping') {
            return res.end('pong');
        }

        if (path == '/identity') {
            res.setHeader("Content-type", "application/json");
            let resData = {
                code: 0,
                message: 'success',
                data: null
            }

            if (req.headers.auth != "gsBlockChainAgent") {
                resData.code = 100;
                resData.message = "验证错误";
                return res.end(JSON.stringify(resData));
            }

            let result;
            try {
                result = 'no fabric';
                resData.data = result;
            } catch (error) {
                console.log(error);
                resData.code = 101;
                resData.message = "区块链网络请求错误";
                resData.data = error.toString()
            }


            return res.end(JSON.stringify(resData));
        }

        res.statusCode = 404;
        res.end('Not Found');
    })

    server.listen(port, () => {
        log.info('node-api is on: ' + port);

        // 每隔5分钟更新一次状态
        updateAgentState(port);
        setInterval(() => {
            updateAgentState(port)
        }, 1000 * 60 * 5)
    });
}

module.exports = {
    createServer
}
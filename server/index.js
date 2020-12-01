const path = require("path")

const http = require("http");
const { getEmptyPort } = require("./common");
const proxy = require("./proxy");
const updateAgentState = require("./agentState");
const log = require('electron-log');



const createServer = async () => {
    // 获取有效端口
    let port = await getEmptyPort();

    let server = http.createServer((req, res) => {
        proxy(req, res);
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
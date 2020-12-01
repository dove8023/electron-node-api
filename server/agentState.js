const axios = require('axios');
const path = require("path");
const log = require('electron-log');
const config = require('./config')

const application = require(path.resolve(config.path, "application.json"));
const userConfig = require(path.resolve(config.path, "user.json"));



const request = axios.create({
    headers: {
        "Content-type": "application/json"
    },
    baseURL: `http://${application.host}:${application.port}`
})

module.exports = async function updateAgentState(port) {
    try {
        let res = await request.post(application.statePath, {
            port: port,
            userName: userConfig.userName,
        });

        log.info('----------------------------------------------', res.data)
    } catch (error) {
        console.log(error);
    }
}
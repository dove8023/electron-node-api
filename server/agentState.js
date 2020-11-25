const axios = require('axios');
const path = require("path");

const dir = global.dir;
const application = require('../config/application.json');
const userConfig = require(path.resolve(dir, "user.json"));



const request = axios.create({
    baseURL: `http://${application.host}:${application.port}`
})

module.exports = async function updateAgentState(port) {
    try {
        let res = await request.post(application.statePath, {
            userName: userConfig.userName,
            port
        });

        console.log('----------------------------------------------------------', res)
    } catch (error) {
        console.log(error);
    }
}
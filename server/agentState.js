const axios = require('axios');
const path = require("path");

const dir = path.resolve(process.cwd(), 'resources/config')
const application = require(path.resolve(dir, "application.json"));
const userConfig = require(path.resolve(dir, "user.json"));



const request = axios.create({
    headers: {
        "Content-type": "application/json"
    },
    baseURL: `http://${application.host}:${application.port}`
})

module.exports = async function updateAgentState(port) {
    console.log(222222, port)
    try {
        let res = await request.post(application.statePath, {
            port: port,
            userName: userConfig.userName,
        });

        console.log('----------------------------------------------', res.data)
    } catch (error) {
        console.log(error);
    }
}
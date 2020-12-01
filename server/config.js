const path = require("path");
const fs = require("fs");
const log = require('electron-log');


class ConfigPath {
    constructor() {
        this.path = '';
    }

    async set(app) {
        let appPath = app.getAppPath();
        log.info('=============')
        log.info(appPath)
        const dir = fs.lstatSync(appPath);
        if (appPath.indexOf('app.asar') > -1) {
            let res = appPath.replace('app.asar', '');
            log.info('11111， app.asar exist.', res);
            log.info('11110', path.resolve(res, "config"))
            this.path = path.resolve(res, "config");
        } else {
            log.info('222222  app.asar not exist.', path.resolve(appPath, "resources/config"))
            this.path = path.resolve(appPath, "resources/config");
        }
    }
}

let config = new ConfigPath();

module.exports = config;
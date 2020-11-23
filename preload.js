// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.


window.ipcRenderer = require('electron').ipcRenderer;

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }

    for (const type of ['chrome', 'node', 'electron']) {
        replaceText(`${type}-version`, process.versions[type])
    }

    const infoEle = document.getElementById("info");

    let info = {
        "process.cwd()": process.cwd(),
        "__dirname": __dirname,
        "app.getAppPath()": global.appPath
    }


    const fs = require('fs');
    const path = require('path');
    let config = '....error';
    try {
        config = fs.readFileSync(path.resolve(process.cwd(), 'resources/config.json'));
    } catch (error) {
        console.log(error)
    }

    infoEle.innerHTML = JSON.stringify(info) + config;

})

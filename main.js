// Modules to control application life and create native browser window
const { app, BrowserWindow } = require("electron");
const path = require("path");
const fs = require("fs");

const config = require("./server/config")
// 设置config路径
config.set(app);

if (!fs.existsSync(path.resolve(config.path, "user.json"))) {
    console.log('not has user.json')
    app.quit();
    return;
}


const { createServer } = require("./server");
require('./regedit');
const log = require('electron-log');


// 用户打开多个实例时，立即关闭
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
    app.quit();
    return;
}




createServer();

function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        },
    });

    // and load the index.html of the app.
    mainWindow.loadFile("./view/index.html");

    // Open the DevTools.
    mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    // createWindow();

    app.on("activate", function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
    if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.



process.on('unhandledRejection', (reason, p) => {
    console.error("1111 unhandledRejection", reason);
    log.error(reason)
    // app.quit();
});

process.on('uncaughtException', function (err) {
    console.error('2222 uncaughtException==>', err.stack ? err.stack : err);
    log.error(err)
    // app.quit();
});
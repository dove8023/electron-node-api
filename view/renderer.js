// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

let portInterval = null;

ipcRenderer.on('server-on', (event, arg) => {
    console.log('get the port')
    console.log(event, arg)
    if (!arg) {
        return;
    }

    let ele = document.getElementById("port");
    ele.innerHTML = arg;
    clearInterval(portInterval);
})

portInterval = setInterval(() => {
    ipcRenderer.send('server-on')
}, 500);

// 调试代码
// ipcRenderer.on('app-path', (event, arg) => {
//     console.log('app-path: ', arg)
// })

// setTimeout(() => {
//     ipcRenderer.send('app-path')
// }, 5000);
const { app, BrowserWindow } = require('electron')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1920,
        height: 1280,
        autoHideMenuBar: true
    })

    win.loadFile('src/main.html')
}

app.whenReady().then(() => {
    createWindow()
})
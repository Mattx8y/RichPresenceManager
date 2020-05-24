const electron = require("electron");
const rpc = require("discord-rpc");

let isQuitting = false;

function createWindow() {
    const bounds = electron.screen.getPrimaryDisplay().bounds;
    const win = new electron.BrowserWindow({
        width: 300,
        height: 150,
        webPreferences: {
             nodeIntegration: true
        },
        frame: false,
        icon: "./icon.ico",
        resizable: false,
        alwaysOnTop: true,
        fullscreenable: false,
        skipTaskbar: true,
        backgroundColor: "#7289DA",
        x: bounds.width - 310,
        y: bounds.height - 200
    });
    win.loadFile("./views/index.html").catch(console.error);
    const icon = new electron.Tray("./icon.ico");
    const menu = electron.Menu.buildFromTemplate([
        {
            label: "Quit",
            click: function() {
                isQuitting = true;
                icon.destroy();
                electron.app.quit();
            }
        }
    ]);
    icon.setContextMenu(menu);
    win.on("minimize", function(e) {
        e.preventDefault();
        win.hide();
    });
    win.on("close", function(e) {
        if (!isQuitting) {
            e.preventDefault();
            win.hide();
        }
        return false;
    });
    icon.on("click", function() {
        win.show();
    });
    win.on("blur", function() {
        win.hide();
    });
}

electron.app.whenReady().then(createWindow);
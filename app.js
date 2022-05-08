const { app } = require("electron")
const  { BrowserWindow} = require('electron-acrylic-window')
    const url = require("url");
    const path = require("path");

    let mainWindow

    function createWindow () {
      mainWindow = new BrowserWindow({
        width: 1000,
        height: 600,
        vibrancy:{
          theme:"#12345678",
          effect:"blur"
          
        },
        webPreferences: {
          nodeIntegration: true,
          contextIsolation:false,
          //websecuriy is disabled to allow the player to access local files
          webSecurity:false
        }
      })  

      mainWindow.loadURL(
        // url.format({
        //   pathname: path.join(__dirname, `/dist/electron-app/index.html`),
        //   protocol: "file:",
        //   slashes: true
        // })
        "http://localhost:4200"
      );
      // Open the DevTools.
      mainWindow.webContents.openDevTools()
      mainWindow.setMenuBarVisibility(true)
      mainWindow.on('closed', function () {
        mainWindow = null
      })
    }
    //import modules
    require("./modules/songs.js");
    app.on('ready', createWindow)

    app.on('window-all-closed', function () {
      if (process.platform !== 'darwin') app.quit()
    })

    app.on('activate', function () {
      if (mainWindow === null) createWindow()
    })

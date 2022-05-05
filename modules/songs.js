const { ipcMain,app } = require("electron")
const fs = require("fs");
function getSongs()
{
    music_path = app.getPath("music");
    fs.readdir(music_path,(err,files)=>{
        console.log(files)
        console.log(err)
    })
}
getSongs()
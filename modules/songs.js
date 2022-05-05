const { ipcMain,app } = require("electron")
const jsmediatags = require("jsmediatags")
const fs = require("fs");
songs = []
function getSongs()
{
    music_path = app.getPath("music");
    fs.readdir(music_path,(err,files)=>{
        files.forEach((file)=>{
            full_path = `${music_path}\\${file}`
            jsmediatags.read(full_path,{
                onSuccess:((tag)=>{
                    data = {}
                    data.title = tag.tags.title != null ? tag.tags.title : file
                    data.artist = tag.tags.artist != null ? tag.tags.artist : "Unknown Artist"
                    data.albulm = tag.tags.album

                    //add song data to array
                    songs.push(data)
                })
            })
        })
    })
    setTimeout(()=>{
        //send songs object to subprocess from main process
        ipcMain.on("get_songs",(event,arg)=>{
            event.returnValue = songs
        })
    },500)
}
getSongs()
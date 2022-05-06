const { ipcMain,app } = require("electron")
const jsmediatags = require("jsmediatags")
const getMP3Duration = require('get-mp3-duration')
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
                    path  = `${music_path}\\${file}`
                    data.title = tag.tags.title != null ? tag.tags.title : file
                    data.artist = tag.tags.artist != null ? tag.tags.artist : "Unknown Artist"
                    data.albulm = tag.tags.album
                    data.path = "file:///"+path
                    picture = tag.tags.picture
                    data.art = picture
                    const buffer = fs.readFileSync(path)
                    data.duration = getMP3Duration(buffer)
                    if(picture != null){
                        let base64 = ""
                        for(var i=0; i < picture.data.length; i++){
                            base64 += String.fromCharCode(picture.data[i]);
                        }
                    data.picture = "data:"+picture.format+";base64,"+Buffer.from(base64,"ascii").toString("base64")
                    }
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
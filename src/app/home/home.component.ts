import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
declare var WaveSurfer:any;
declare var $:any;
declare var Vibrant:any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
 public songs:any
 public sampleImage: any;
  constructor(
      public $common:CommonService
  ) { }
  initializeWavesurfer()
    {
    const self = this
    var wavesurfer = WaveSurfer.create({
      container: '#waveform',
      backend: 'MediaElement',
      waveColor: $('body').hasClass('theme-dark') ? '#243049' : '#ecf0f5',
      height: 50,
      responsive: false,
      barWidth: 3,
      normalize: true
  });
  var nextTrackSelector = $('#nextTrack');

var prevTrackSelector = $('#previousTrack');
    // Bind controls
    document.addEventListener('DOMContentLoaded', function () {
        if ($('#playPause').length > 0) {
            var playPause:any = document.querySelector('#playPause');
    
            playPause.addEventListener('click', function () {
                    //@ts-ignore
                wavesurfer.playPause();
            });
    
    
            // Toggle play/pause text
            wavesurfer.on('play', function () {
                    //@ts-ignore
                document.querySelector('#play').style.display = 'none';
                      //@ts-ignore
                document.querySelector('#pause').style.display = '';
                $('#playlist a.active i').removeClass('icon-play').addClass('icon-pause');
    
            });
          //@ts-ignore
            wavesurfer.on('pause', function () {
                    //@ts-ignore
                document.querySelector('#play').style.display = '';
                      //@ts-ignore
                document.querySelector('#pause').style.display = 'none';
                $('#playlist a.active i').removeClass('icon-pause').addClass('icon-play');
            });
    
        }
    
    
    
        if ($('.playlist').length > 0) {
            // The playlist links
            var links = document.querySelectorAll('.playlist .media-url');
            var currentTrack = 0;
    
    
            //Player Actions
          //@ts-ignore
 
            var disablePrevNextBtn = function (track) {
                if (track === 0) {
                        //@ts-ignore
                    prevTrackSelector.addClass('disabled');
                } else {
                        //@ts-ignore
                    prevTrackSelector.removeClass('disabled');
                }
                if (track === links.length) {
                        //@ts-ignore
                    nextTrackSelector.addClass('disabled');
                } else {
                        //@ts-ignore
                    nextTrackSelector.removeClass('disabled');
                }
            };
    
            var nextTrack = function () {
                $('.playlist .media-url i').removeClass('icon-pause').addClass('icon-play');
                if (currentTrack <= links.length) {
                    setCurrentSong((currentTrack + 1) % links.length);
                }
            };
    
            var previousTrack = function () {
                $('.playlist .media-url i').removeClass('icon-pause').addClass('icon-play');
                if (currentTrack > 0) {
                    setCurrentSong((currentTrack - 1) % links.length);
                }
            };
          //@ts-ignore
            nextTrackSelector.on('click', function (e) {
                e.preventDefault();
                nextTrack();
            });
                  //@ts-ignore
            prevTrackSelector.on('click', function (e) {
                e.preventDefault();
                previousTrack();
            });
    
    
            // Load a track by index and highlight the corresponding link
                  //@ts-ignore
            var setCurrentSong = window.setCurrentSong = function (index) {
    
                disablePrevNextBtn(index);
    
                links[currentTrack].classList.remove('active');
                currentTrack = index;
                links[currentTrack].classList.add('active');
                let title = (<HTMLBodyElement>links[currentTrack]).dataset["songTitle"]
                let picture = (<HTMLBodyElement>links[currentTrack]).dataset["songPicture"]
                self.setMedia(picture,title)
          //@ts-ignore
                var waveUrl = links[currentTrack].dataset.wave;
    
                if (waveUrl !== undefined) {
                        //@ts-ignore
                    $.getJSON(waveUrl, function (data) {
                            //@ts-ignore
                        wavesurfer.load(links[currentTrack].href, data.data);
                    });
                } else {
                        //@ts-ignore
                    wavesurfer.load(links[currentTrack].href);
                    // wavesurfer.playPause();
                }
          //@ts-ignore
                window.media = links[currentTrack].href;
                $('.playlist a.active i').toggleClass('icon-pause');
                      //@ts-ignore
                window.currentTrack = currentTrack;
            };
    
    
            Array.prototype.forEach.call(links, function (link, index) {
                    //@ts-ignore
                link.addEventListener('click', function (e) {
                    e.preventDefault();
                    if (currentTrack == index) {
                        $(e.target).toggleClass('icon-pause');
                              //@ts-ignore
                        wavesurfer.playPause();
                    } else {
                        $('.playlist .media-url i').removeClass('icon-pause').addClass('icon-play');
                        setCurrentSong(index);
                        $(e.target + ' i').toggleClass('icon-pause');
                    }
                });
            });
    
    
            // Auto Play on audio load
                  //@ts-ignore
            wavesurfer.on('ready', function () {
                if ($('#mediaPlayer').data('auto')) {
                        //@ts-ignore
                    wavesurfer.play();
                }
            });
    
            // Go to the next track on finish
                  //@ts-ignore
            wavesurfer.on('finish', function () {
                nextTrack();
            });
    
            // Load the first track
            setCurrentSong(currentTrack);
    
            // Show current time
                  //@ts-ignore
            wavesurfer.on('audioprocess', function () {
                    //@ts-ignore
                $('.track-time').text(formatTime(wavesurfer.getCurrentTime()));
            });
    
          //@ts-ignore
            var formatTime = function (time) {
                return [
                    Math.floor((time % 3600) / 60), // minutes
                    ('00' + Math.floor(time % 60)).slice(-2) // seconds
                ].join(':');
            };
    
            //loading
                  //@ts-ignore
            wavesurfer.on('loading', function (percents, eventTarget) {
                    //@ts-ignore
                NProgress.start();
    
                if (percents >= 100) {
                        //@ts-ignore
                    NProgress.done();
                }
            });
    
        }
    
    
    });
    
    
    }
    /**
     * 
     * @param src the source of the picture that must be html accesible
     * @param track the track name or title
     */
    setMedia(src:any,track:any)
    {
        //change masthead image to albulm track
        (<HTMLBodyElement>document.getElementById("masthead")).style.backgroundImage = `url(${src})`;
        (<HTMLBodyElement>document.getElementById("track-list")).innerHTML = "Now Playing" + " "+track;

        //change app accent color to track vibrant color
        var accent_image = (<HTMLImageElement>document.getElementById("accent-helper"))
        accent_image.src = src;
        Vibrant.from(accent_image).getPalette().then((pallete:any)=>{
            console.log(pallete)
            document.querySelectorAll(".btn-link").forEach((element)=>{
                //@ts-ignore
                element.style.color = pallete.Vibrant.hex
            });
            //inner wavesurfer
            let wave = (<HTMLBodyElement>document.querySelectorAll("wave")[1]);
            //outer wavesurfer
            let outerWave = (<HTMLBodyElement>document.querySelectorAll("wave")[0]);
            wave.style.background = pallete.Vibrant.hex
            outerWave.style.border = `1px solid ${pallete.Vibrant.hex}`
            outerWave.style.overflow = "hidden"
        })
    }
  ngOnInit(): void {
      //retrieve songs from main process
      this.songs = this.$common.$electron.ipcRenderer.sendSync("get_songs")
      this.initializeWavesurfer()
  }
} 

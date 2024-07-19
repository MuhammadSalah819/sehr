class PLAYER {
    constructor(selector) {
        this.player = document.querySelector(selector);
        this.video = this.player.querySelector(".video");
        this.window = window;
        this.playVideo();
    }
    playVideo() {
        this.video.addEventListener("click", this.toggleVideo.bind(this));
        this.player.querySelector(".play__circle").addEventListener("click", this.toggleVideo.bind(this))
        window.addEventListener("keypress", this.toggleVideo.bind(this));
        this.player.querySelector(".play").addEventListener("click", this.toggleVideo.bind(this));this.toggleVideo.bind(this);
        this.video.addEventListener("dblclick", this.toggleFullscreen.bind(this));
        this.player.querySelector(".fullscreen").addEventListener("click", this.toggleFullscreen.bind(this));
        this.player.querySelector(".mute").addEventListener("click", this.toggleVolume.bind(this));
        this.player.querySelector(".volume__slider").addEventListener("input", this.setVolume.bind(this));
        this.player.querySelector(".video__speed").addEventListener("input", this.setSpeed.bind(this));
        this.video.addEventListener("loadedmetadata", this.setVideoTime.bind(this));
        this.video.addEventListener("timeupdate", this.timeUpdate.bind(this));
        this.player.querySelector(".panel__line").addEventListener("click", this.setVideoLine.bind(this));
    } 
    toggleVideo() {
        if(event.key == " ") {
            this.playing = !this.playing;
            let playCircle = this.player.querySelector(".play__circle");
            let playIcon = this.player.querySelector(".play .fas");
            playIcon.classList.toggle("fa-play", !this.playing);
            playIcon.classList.toggle("fa-pause", this.playing);
            if(this.playing) {
                this.video.play()
                playCircle.style.display = "none"
            }else {
                this.video.pause()
                playCircle.style.display = "block"
            }
        }
    }
    toggleFullscreen() {
        let full = document.fullscreenElement;
        let fullIcon = this.player.querySelector(".fullscreen .fas");
        fullIcon.classList.toggle("fa-expand", full)
        fullIcon.classList.toggle("fa-compress", !full)
        if(!full) {
            this.player.requestFullscreen();
        }else {
            document.exitFullscreen();
        }
    }
    toggleVolume() {
        this.sounding = !this.sounding;
        let volumeIcon = this.player.querySelector(".mute .fas");
        volumeIcon.classList.toggle("fa-volume-up", !this.sounding);
        volumeIcon.classList.toggle("fa-volume-slash", this.sounding);
        let volumeSlider = this.player.querySelector(".volume__slider");
        if(this.sounding) {
            this.video.muted = true;
            volumeSlider.setAttribute("data-volume", volumeSlider.value);
            volumeSlider.value = 0
        }else {
            this.video.muted = false;
            volumeSlider.value = volumeSlider.getAttribute("data-volume")
        }
    }
    setVolume() {
        this.video.volume = this.player.querySelector(".volume__slider").value / 100;
    }
    setSpeed() {
        this.video.playbackRate = this.player.querySelector(".video__speed").value;
    }
    setVideoTime() {
        let duration = Math.floor(this.video.duration);
        this.player.querySelector(".video__duration").innerHTML = `${Math.floor(duration / 60)}:${Math.floor(duration % 60)}`;
    }
    timeUpdate() {
        let duration = Math.floor(this.video.duration);
        let current = Math.floor(this.video.currentTime);
        let seconds;
        if(current % 60 < 10) {
            seconds = "0" + (current % 60);
        }else {
            seconds = current % 60;
        }
        
        this.player.querySelector(".video__current").innerHTML = `${Math.floor(current / 60)}:${seconds}`;
        this.player.querySelector(".panel__line-current").style.width = `${current / duration * 100}%`
    }
    setVideoLine() {
        let lineWidth = this.player.querySelector(".panel__line").clientWidth;
        let position = event.offsetX;
        let duration = Math.floor(this.video.duration);
        
        this.player.querySelector(".panel__line-current").style.width = `${position / lineWidth * 100}%`;
        this.video.currentTime = `${position / lineWidth * duration}`;
    }
}

let player = new PLAYER(".player")



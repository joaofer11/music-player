import { musics } from './music_data'
import PlayIcon from 'assets/images/play_icon.png'
import PauseIcon from 'assets/images/pause_icon.png'

const audio = document.querySelector('[data-js="audio"]')
const controls = document.querySelector('[data-js="controls"]')


let musicData = musics[0]
let itsPlaying = false
audio.setAttribute('src', musicData.musicPath)

const setTrackDetails = () => {
    const { musicName, artistName } = musicData

    const domMusicNameElement = document.querySelector('[data-js="music-name"]')
    const domArtistNameElement = document.querySelector('[data-js="artist-name"]')

    domMusicNameElement.textContent = musicName
    domArtistNameElement.textContent = artistName
}

const switchMusicTrack = track => {
    musicData = musics[track]
    audio.setAttribute('data-track', track)
    audio.setAttribute('src', musicData.musicPath)

    setTrackDetails()
}

const playMusic = playButton => {
    
    if (playButton) {
        playButton.setAttribute('src', PauseIcon)
        playButton.setAttribute('data-button', 'pause')
    }

    audio.play()
    itsPlaying = true
}

const pauseMusic = pauseButton => {
    if (pauseButton) {
        pauseButton.setAttribute('src', PlayIcon)
        pauseButton.setAttribute('data-button', 'play')
    }

    audio.pause()
    itsPlaying = false
}

const backMusic = () => {
    const maxTrack = musics.length - 1
    const currentTrack = Number(audio.getAttribute('data-track'))
    const backTrack = (currentTrack > 0) ? (currentTrack - 1) : maxTrack

    
    switchMusicTrack(backTrack)
    
    if (itsPlaying) {
        playMusic()
        return
    }

    pauseMusic()
}

const nextMusic = () => {
    const maxTrack = musics.length - 1
    const currentTrack = Number(audio.getAttribute('data-track'))
    const nextTrack = (currentTrack < maxTrack) ? (currentTrack + 1) : 0

    
    switchMusicTrack(nextTrack)
    
    if (itsPlaying) {
        playMusic()
        return
    }

    pauseMusic()
}

const checkButton = (clickedButton, domElement) => ({
    play: playMusic,
    pause: pauseMusic,
    back: backMusic,
    next: nextMusic,
})[clickedButton](domElement)

const handleControlButtonsClick = (event) => {
    const buttons = ['play', 'pause','back', 'next']

    const domElement = event.target
    const clickedButton = event.target.dataset.button
    const allowedButton = buttons.some(button => button === clickedButton)

    if (allowedButton) checkButton(clickedButton, domElement)
}

const updateProgressBar = event => {
    const progressBar = document.querySelector('[data-js="progress-bar"]')
    
    const musicDuration = event.target.duration
    const musicCurrentTime = event.target.currentTime

    const musicCurrentTimePercent = (musicCurrentTime / musicDuration) * 100

    console.log(musicCurrentTimePercent)
    progressBar.style.width = `${musicCurrentTimePercent}%`
}

controls.addEventListener('click', handleControlButtonsClick)
audio.addEventListener('timeupdate', updateProgressBar)
setTrackDetails()
import { musics } from './music_data'
import PlayIcon from 'assets/images/play_icon.png'
import PauseIcon from 'assets/images/pause_icon.png'


const controls = document.querySelector('[data-js="controls"]')
const audio = document.querySelector('[data-js="audio"]')
const progressContainer = document.querySelector('[data-js="progress-container"]')
const progressRange = document.querySelector('[data-js="progress-range"]')


let musicData = musics[0]
let itsPlaying = false
let progressIsClicked = false
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

const disableProgressBarDragging = xAxisPositionPercent2 => () => {
    const { duration } = audio
    const setMusicTo = xAxisPositionPercent2 * duration
    audio.currentTime = (setMusicTo - (setMusicTo % 100)) / 100

    progressRange.style.display = 'none'
    progressIsClicked = false
    audio.addEventListener('timeupdate', updateProgressBar)

    window.onmouseup = false
}

const handleDraggingProgressBar = event => {
    if (progressIsClicked) {
        audio.removeEventListener('timeupdate', updateProgressBar)
        const progressBar = document.querySelector('[data-js="progress-bar"]')
        const ProgressContainerRect = progressContainer.getBoundingClientRect()

        const { clientX } = event
        const { width, left } = ProgressContainerRect
        
        const xAxisPositionPercent = ((clientX - left) / width) * 100
        const notReachedXAxisPositionPercent = (xAxisPositionPercent < 100)
        
        if (notReachedXAxisPositionPercent) {
            progressBar.style.width = `${xAxisPositionPercent}%`
            window.onmouseup = disableProgressBarDragging(xAxisPositionPercent)
        }
    }
}

const handleProgressBarClick = event => {
    const { offsetWidth } = event.target
    const { duration } = audio
    const { offsetX } = event

    const clickedXPosition = (duration / offsetWidth) * offsetX
    audio.currentTime = clickedXPosition

    progressIsClicked = true
    progressRange.style.display = 'block'
}

const touchBar = event => {
    console.log('clicoou')
}

const touchBarMove = () => {
    console.log('kkkkmk')
}


const updateProgressBar = event => {
    const progressBar = document.querySelector('[data-js="progress-bar"]')
    const { duration, currentTime } = event.target

    const musicCurrentTimePercent = (currentTime / duration) * 100

    progressBar.style.width = `${musicCurrentTimePercent}%`
}

controls.addEventListener('click', handleControlButtonsClick)

progressContainer.addEventListener('mousedown', handleProgressBarClick)
progressContainer.addEventListener('touchstart', touchBar)
progressContainer.addEventListener('touchmove', touchBarMove)
progressRange.addEventListener('mousemove', handleDraggingProgressBar)


audio.addEventListener('timeupdate', updateProgressBar)

setTrackDetails()
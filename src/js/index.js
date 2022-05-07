import { musics } from './music_data'
import PlayIcon from 'assets/images/play_icon.png'
import PauseIcon from 'assets/images/pause_icon.png'


const controls = document.querySelector('[data-js="controls"]')
const audio = document.querySelector('[data-js="audio"]')
const progressContainer = document.querySelector('[data-js="progress-container"]')


let musicData = musics[0]
let itsPlaying = false
audio.setAttribute('src', musicData.musicPath)

// SET DEFAULT TRACK
const setTrackDetails = () => {
	const { musicName, artistName } = musicData

	const domMusicNameElement = document.querySelector('[data-js="music-name"]')
	const domArtistNameElement = document.querySelector('[data-js="artist-name"]')

	domMusicNameElement.textContent = musicName
	domArtistNameElement.textContent = artistName
}

// CONTROLS SETTINGS
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
	const buttons = ['play', 'pause', 'back', 'next']

	const domElement = event.target
	const clickedButton = event.target.dataset.button
	const allowedButton = buttons.some(button => button === clickedButton)

	if (allowedButton) checkButton(clickedButton, domElement)
}

// SETIINGS PROGRESS BAR
const setProgressBarOnEnd = (...dataEvent) => () => {
	const [moveType, endType, xPositionPercent] = dataEvent

	const { duration } = audio
	const time = xPositionPercent * duration

	audio.currentTime = (time - (time % 100)) / 100
	audio.addEventListener('timeupdate', updateProgressBar)

	if (moveType === 'ontouchmove')
		progressContainer.addEventListener('mousedown', handleProgressBarClick)

	window[moveType] = false
	window[endType] = false
	window.onselectstart = false
}

const setProgressBarOnMove = moveType => event => {
	const progressBar = document.querySelector('[data-js="progress-bar"]')
	const endType = (moveType === 'onmousemove') ? 'onmouseup' : 'ontouchend'

	const { width, left } = progressContainer.getBoundingClientRect()
	const { clientX } = (moveType === 'onmousemove') ? event : event.changedTouches[0]
	const clickedXPositionPercent = ((clientX - left) / width) * 100


	audio.removeEventListener('timeupdate', updateProgressBar)

	if (clickedXPositionPercent < 100) {
		progressBar.style.width = `${clickedXPositionPercent}%`
		window[endType] = setProgressBarOnEnd(moveType, endType, clickedXPositionPercent)
	}
}

const setProgressBarOnClick = (moveType, clientX) => {
	const { width, left } = progressContainer.getBoundingClientRect()
	const { duration } = audio

	const clickedXPosition = (duration / width) * (clientX - left)
	audio.currentTime = clickedXPosition

	window[moveType] = setProgressBarOnMove(moveType)
	window.onselectstart = () => false
}

const handleProgressBarClick = event => {
	const clickType = event.type

	if (clickType === 'touchstart') {
		progressContainer.removeEventListener('mousedown', handleProgressBarClick)
		const { clientX } = event.changedTouches[0]
		setProgressBarOnClick('ontouchmove', clientX)
		return
	}

	const { clientX } = event
	setProgressBarOnClick('onmousemove', clientX)

}

// CONTEXT MENU DISABLED FOR MOBILE
const disableContextMenu = event => {
	const exceptions = ['progress-container', 'button']
	const targetElement = event.target.dataset.js

	const itsTouch = event.pointerType === 'touch'
	const itsException = exceptions.some(exception => exception === targetElement)

	if (itsTouch && itsException) {
		event.preventDefault()
		event.stopPropagation()
		return false
	}
}

const disableDrag = event => {
	event.preventDefault()
}

// PROGRESS BAR LOADING
const updateProgressBar = event => {
	const progressBar = document.querySelector('[data-js="progress-bar"]')
	const { duration, currentTime } = event.target

	const musicCurrentTimePercent = (currentTime / duration) * 100

	progressBar.style.width = `${musicCurrentTimePercent}%`
}

const switchMusicOnEnd = event => {
	nextMusic()
}

// EVENTS
controls.addEventListener('click', handleControlButtonsClick)
progressContainer.addEventListener('mousedown', handleProgressBarClick)
progressContainer.addEventListener('touchstart', handleProgressBarClick)

window.addEventListener('contextmenu', disableContextMenu)
window.addEventListener('dragstart', disableDrag)
audio.addEventListener('timeupdate', updateProgressBar)
audio.addEventListener('ended', switchMusicOnEnd)

setTrackDetails()
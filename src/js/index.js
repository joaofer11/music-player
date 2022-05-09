import { musics } from './music_data'
import PlayIcon from 'assets/images/play_icon.png'
import PauseIcon from 'assets/images/pause_icon.png'


const controls = document.querySelector('[data-js="controls"]')
const audio = document.querySelector('[data-js="audio"]')
const progressContainer = document.querySelector('[data-js="progress-container"]')


let musicData = musics[0]
let itsPlaying = false
audio.setAttribute('src', musicData.musicPath)

// SET TRACK DETAILS
const setTrackDetails = () => {
	const { musicName, artistName, albumCover } = musicData

	const musicNameEl = document.querySelector('[data-js="music-name"]')
	const musicArtistEl = document.querySelector('[data-js="artist-name"]')
	const albumCoverImgEl = document.querySelector('[data-js="album-cover-img"]')

	musicNameEl.textContent = musicName
	musicArtistEl.textContent = artistName
	albumCoverImgEl.src = albumCover

	audio.preload = 'metadata'
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

	const { style } = document.documentElement
	const albumCoverContainerEl = document.querySelector('[data-js="album-cover-container"]')

	albumCoverContainerEl.classList.add('active')
	style.setProperty('--state', 'running')
	style.setProperty('--opacity', 0.4)
	style.setProperty('--width', '25%')

	audio.play()

	itsPlaying = true
}

const pauseMusic = pauseButton => {
	if (pauseButton) {
		pauseButton.setAttribute('src', PlayIcon)
		pauseButton.setAttribute('data-button', 'play')
	}

	const { style } = document.documentElement
	style.setProperty('--state', 'paused')
	style.setProperty('--opacity', 1)
	style.setProperty('--width', '30%')

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


	progressContainer.classList.remove('active')
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
	const endType = (moveType === 'onmousemove') ? 'onmouseup' : 'ontouchend'
	const { width, left } = progressContainer.getBoundingClientRect()
	const { duration } = audio

	const clickedXPosition = (duration / width) * (clientX - left)
	audio.currentTime = clickedXPosition

	window[moveType] = setProgressBarOnMove(moveType)
	window[endType] = () => {
		progressContainer.classList.remove('active')
		window[moveType] = false
		window[endType] = false
	}
	window.onselectstart = () => false
}

const handleProgressBarClick = event => {
	const clickType = event.type
	progressContainer.classList.add('active')

	if (clickType === 'touchstart') {
		progressContainer.removeEventListener('mousedown', handleProgressBarClick)
		const { clientX } = event.changedTouches[0]
		setProgressBarOnClick('ontouchmove', clientX)
		return
	}

	const { clientX } = event
	setProgressBarOnClick('onmousemove', clientX)

}

// DISABLED CONTEXT MENU FOR MOBILE
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

// DISABLED DRAGGING
const disableDrag = event => {
	event.preventDefault()
	event.stopPropagation()
	return false
}

// SHOW MINUTES ON DOM
const showCurrentTimeAndDuration = (duration, currentTime) => {
	const musicDurationEl = document.querySelector('[data-js="music-duration"]')
	const musicCurrentTimeEl = document.querySelector('[data-js="music-current-time"]')

	const durationMinutes = duration / 60
	const durationSeconds = Math.floor((durationMinutes * 60) % 60)

	const currentTimeSeconds = Math.floor(currentTime % 60)
	const currentTimeMinutes = Math.floor(currentTime / 60)

	musicCurrentTimeEl.textContent = `${currentTimeMinutes}:${currentTimeSeconds < 10
		? '0' + currentTimeSeconds
		: currentTimeSeconds}`

	if (duration) {
		musicDurationEl.textContent = `
		${Math.floor(durationMinutes)}:${durationSeconds < 10
				? '0' + durationSeconds
				: durationSeconds}`
	}

}

// PROGRESS BAR LOADING
const updateProgressBar = event => {
	const progressBar = document.querySelector('[data-js="progress-bar"]')
	const { duration, currentTime } = event.target

	const musicCurrentTimePercent = (currentTime / duration) * 100
	progressBar.style.width = `${musicCurrentTimePercent}%`

	showCurrentTimeAndDuration(duration, currentTime)
}

// DINAMIC VIEWPORT HEIGHT
const changeViewHeight = () => {
	let vh = window.innerHeight * 0.01
	const { style } = document.documentElement
	style.setProperty('--vh', `${vh}px`)
}

// INIT
const init = () => {
	controls.addEventListener('click', handleControlButtonsClick)
	progressContainer.addEventListener('mousedown', handleProgressBarClick)
	progressContainer.addEventListener('touchstart', handleProgressBarClick)

	window.addEventListener('contextmenu', disableContextMenu)
	window.addEventListener('dragstart', disableDrag)
	window.addEventListener('resize', changeViewHeight)
	audio.addEventListener('timeupdate', updateProgressBar)
	audio.addEventListener('ended', () => nextMusic())

	changeViewHeight()
	setTrackDetails()
}

init()
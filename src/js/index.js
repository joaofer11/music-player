import { musics } from './music_data'
import PlayIcon from 'assets/images/play_icon.png'
import PauseIcon from 'assets/images/pause_icon.png'


const controls = document.querySelector('[data-js="controls"]')
const audio = document.querySelector('[data-js="audio"]')
const progressContainer = document.querySelector('[data-js="progress-container"]')


let musicData = musics[0]
let itsDragging = false
let itsPlaying = false
let musicTime = 0
audio.setAttribute('src', musicData.musicPath)

const trackStatus = {
	currentTime: 0,
	definedByMovement: false
}


// DOM ELEMETS GETTER
const getDomElement = (elementName, all) => {
	const element = all
		? document.querySelectorAll(elementName)
		: document.querySelector(elementName)

	return element
}

// SET TRACK DETAILS
const setTrackDetails = () => {
	const { musicName, artistName, albumCover } = musicData

	const musicNameEl = getDomElement('[data-js="music-name"]')
	const musicArtistEl = getDomElement('[data-js="artist-name"]')
	const albumCoverImgEl = getDomElement('[data-js="album-cover-img"]')

	musicNameEl.textContent = musicName
	musicArtistEl.textContent = artistName
	albumCoverImgEl.src = albumCover

	audio.preload = 'metadata'
}

// CURRENT TIME LABEL
const activeLabel = active => {
	const timeLabel = getDomElement('[data-js="time-label"]')

	active
		? timeLabel.classList.add('active')
		: timeLabel.classList.remove('active')

}

const insertTime = (minutes, seconds) => {
	if (minutes < 0) return '0:00'

	return `${minutes < 0 ? 0 : minutes}:${(seconds < 10) ? '0' + seconds : seconds}`
}


// CONTROLS EVENTS
const checkMusicStatus = () => {
	if (itsPlaying) {
		playMusic()
		return
	}

	pauseMusic()
}

const switchMusicTrack = track => {
	musicData = musics[track]
	audio.setAttribute('data-track', track)
	audio.setAttribute('src', musicData.musicPath)

	setTrackDetails()
	checkMusicStatus()
}

const changeButton = (...buttonData) => {
	const [buttonEl, icon, alteration] = buttonData

	buttonEl.setAttribute('src', icon)
	buttonEl.setAttribute('data-button', alteration)
}

const animateAlbumCover = state => {
	const albumCoverContainerEl = getDomElement('[data-js="album-cover-container"]')

	switch (state) {
		case 'playing':
			albumCoverContainerEl.classList.remove('paused')
			albumCoverContainerEl.classList.add('playing')
			break
		case 'paused':
			albumCoverContainerEl.classList.remove('playing')
			albumCoverContainerEl.classList.add('paused')
	}
}

const playMusic = playButton => {
	if (playButton) changeButton(playButton, PauseIcon, 'pause')

	const { style } = document.documentElement
	const albumCoverContainerEl = document.querySelector('[data-js="album-cover-container"]')


	audio.play()
	animateAlbumCover('playing')
	itsPlaying = true
}

const pauseMusic = pauseButton => {
	if (pauseButton) changeButton(pauseButton, PlayIcon, 'play')


	audio.pause()
	animateAlbumCover('paused')
	itsPlaying = false
}

const backMusic = () => {
	const maxTrack = musics.length - 1
	const currentTrack = audio.getAttribute('data-track')
	const backTrack = (currentTrack > 0) ? (+currentTrack - 1) : maxTrack

	switchMusicTrack(backTrack)
}

const nextMusic = () => {
	const maxTrack = musics.length - 1
	const currentTrack = audio.getAttribute('data-track')
	const nextTrack = (currentTrack < maxTrack) ? (+currentTrack + 1) : 0


	switchMusicTrack(nextTrack)
}

const checkButton = (clickedButton, target) => ({
	play: playMusic,
	pause: pauseMusic,
	back: backMusic,
	next: nextMusic,
})[clickedButton](target)

const handleControlButtonsClick = ({ target }) => {
	const buttons = ['play', 'pause', 'back', 'next']

	const clickedButton = target.dataset.button
	const allowedButton = buttons.some(button => button === clickedButton)

	if (allowedButton) checkButton(clickedButton, target)
}

// PROGRESS BAR EVENTS
const setSongTime = time => {
	musicTime = time

	audio.currentTime = musicTime
	trackStatus.definedByMovement = false
}

const handleMusicTimeSynchronization = active => {
	active
		? audio.addEventListener('timeupdate', updateProgressBar)
		: audio.removeEventListener('timeupdate', updateProgressBar)
}

const activeBarAnimation = active => {
	active
		? progressContainer.classList.add('active')
		: progressContainer.classList.remove('active')
}

const getXPosition = event => {
	const itsMouse = event.type.includes('mouse')

	const position = itsMouse ? event.clientX : event.changedTouches[0].clientX
	return position
}

const syncMusicTimeOnClick = clickedXPosition => {
	const { width, left } = progressContainer.getBoundingClientRect()
	const { duration } = audio

	return (duration / width) * (clickedXPosition - left)
}

const syncMusicTimeOnMovement = movementXPosition => {
	trackStatus.definedByMovement = true

	const { width, left } = progressContainer.getBoundingClientRect()
	return ((movementXPosition - left) / width) * 100
}

const showCurrentTimeOnLabel = () => {
	const timeLabel = getDomElement('[data-js="time-label"]')

	const minutes = Math.floor(musicTime / 60)
	const seconds = Math.floor(musicTime % 60)

	activeLabel(true)
	timeLabel.textContent = insertTime(minutes, seconds)
}

const updateMusicTime = percent => {
	handleMusicTimeSynchronization(false)

	const TimePercent = percent * audio.duration
	const TimePercentRounding = (TimePercent - (TimePercent % 100)) / 100

	musicTime = TimePercentRounding
}

const setBar = positionPercent => {
	const progressBar = getDomElement('[data-js="progress-bar"]')

	if (positionPercent < 100) {
		progressBar.style.width = `${positionPercent}%`
		updateMusicTime(positionPercent)
	}
}

const handleProgressBarOnEnd = event => {
	itsDragging = false

	if (trackStatus.definedByMovement) setSongTime(musicTime)

	activeLabel(false)
	activeBarAnimation(false)
	handleMusicTimeSynchronization(true)
}

const handleProgressBarOnMovement = event => {
	if (itsDragging) {
		const movementXPosition = getXPosition(event)
		const time = syncMusicTimeOnMovement(movementXPosition)

		setBar(time)
		showCurrentTimeOnLabel()
	}
}

const handleProgressBarOnClick = event => {
	itsDragging = true

	const clickedXPosition = getXPosition(event)
	const time = syncMusicTimeOnClick(clickedXPosition)

	activeBarAnimation(true)
	setSongTime(time)
	showCurrentTimeOnLabel()
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

// SHOW DURATION AND CURRENT TIME
const showSongDuration = ({ duration }) => {
	const musicDurationEl = getDomElement('[data-js="music-duration"]')

	const minutes = Math.floor(duration / 60)
	const seconds = Math.floor(duration % 60)

	if (duration)
		musicDurationEl.textContent = insertTime(minutes, seconds)
}

const showSongCurrentTime = ({ currentTime }) => {
	const musicCurrentTimeEl = getDomElement('[data-js="music-current-time"]')

	const minutes = Math.floor(currentTime / 60)
	const seconds = Math.floor(currentTime % 60)

	if (currentTime)
		musicCurrentTimeEl.textContent = insertTime(minutes, seconds)
}

const getSongCurrentTimePercent = ({ target }) => {
	const { duration, currentTime } = target

	const timePercent = (currentTime / duration) * 100
	return timePercent
}

const updateProgressBar = event => {
	const progressBar = getDomElement('[data-js="progress-bar"]')
	const time = getSongCurrentTimePercent(event)


	progressBar.style.width = `${time}%`

	showSongDuration(event.target)
	showSongCurrentTime(event.target)
}

// DINAMIC VIEWPORT HEIGHT
const changeViewHeight = () => {
	let vh = window.innerHeight * 0.01
	const { style } = document.documentElement
	style.setProperty('--vh', `${vh}px`)
}

// CONTROLS LISTENER
controls.addEventListener('click', handleControlButtonsClick)

// PROGRESS BAR LISTENERS
progressContainer.addEventListener('mousedown', handleProgressBarOnClick)
progressContainer.addEventListener('touchstart', handleProgressBarOnClick)

window.addEventListener('mousemove', handleProgressBarOnMovement)
window.addEventListener('touchmove', handleProgressBarOnMovement)

window.addEventListener('mouseup', handleProgressBarOnEnd)
window.addEventListener('touchend', handleProgressBarOnEnd)

// AUDIO LISTENERS
audio.addEventListener('timeupdate', updateProgressBar)
audio.addEventListener('ended', () => nextMusic())

// CONFIGS LISTENERS
window.addEventListener('contextmenu', disableContextMenu)
window.addEventListener('dragstart', disableDrag)
window.addEventListener('resize', changeViewHeight)


changeViewHeight()
setTrackDetails()
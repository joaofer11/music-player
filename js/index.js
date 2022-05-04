const controls = document.querySelector('[data-js="controls"]')



const playMusic = () => {
    const playButton = document.querySelector('[data-button="play"]')
    playButton.setAttribute('src', '../assets/images/pause_icon.png')
    playButton.setAttribute('data-button', 'pause')
}

const pauseMusic = () => {
    const pauseButton = document.querySelector('[data-button="pause"]')
    pauseButton.setAttribute('src', '../assets/images/play_icon.png')
    pauseButton.setAttribute('data-button', 'play')
}

const checkButton = button => ({
    play: playMusic,
    pause: pauseMusic
})[button]()


const handleControlButtonsClick = (event) => {
    const buttons = ['play', 'pause']
    const clickedButton = event.target.dataset.button
    const allowedButton = buttons.some(button => button === clickedButton)

    if (allowedButton) checkButton(clickedButton)
}

controls.addEventListener('click', handleControlButtonsClick)


console.log(window)
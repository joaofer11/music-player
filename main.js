/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _music_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./music_data */ \"./src/js/music_data.js\");\n/* harmony import */ var assets_images_play_icon_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! assets/images/play_icon.png */ \"./src/assets/images/play_icon.png\");\n/* harmony import */ var assets_images_pause_icon_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! assets/images/pause_icon.png */ \"./src/assets/images/pause_icon.png\");\n\n\n\n\n\nconst controls = document.querySelector('[data-js=\"controls\"]')\nconst audio = document.querySelector('[data-js=\"audio\"]')\nconst progressContainer = document.querySelector('[data-js=\"progress-container\"]')\n\n\nlet musicData = _music_data__WEBPACK_IMPORTED_MODULE_0__.musics[0]\nlet itsPlaying = false\naudio.setAttribute('src', musicData.musicPath)\n\n// SET DEFAULT TRACK\nconst setTrackDetails = () => {\n\tconst { musicName, artistName, albumCover } = musicData\n\n\tconst musicNameEl = document.querySelector('[data-js=\"music-name\"]')\n\tconst musicArtistEl = document.querySelector('[data-js=\"artist-name\"]')\n\tconst albumCoverImgEl = document.querySelector('[data-js=\"album-cover-img\"]')\n\n\tmusicNameEl.textContent = musicName\n\tmusicArtistEl.textContent = artistName\n\talbumCoverImgEl.src = albumCover\n\t\n\taudio.preload = 'metadata'\n}\n\n// CONTROLS SETTINGS\nconst switchMusicTrack = track => {\n    console.log(audio.preload)\n\tmusicData = _music_data__WEBPACK_IMPORTED_MODULE_0__.musics[track]\n\taudio.setAttribute('data-track', track)\n\taudio.setAttribute('src', musicData.musicPath)\n\n\tsetTrackDetails()\n}\n\nconst playMusic = playButton => {\n\tif (playButton) {\n\t\tplayButton.setAttribute('src', assets_images_pause_icon_png__WEBPACK_IMPORTED_MODULE_2__)\n\t\tplayButton.setAttribute('data-button', 'pause')\n\t}\n\n\tconst { style } = document.documentElement\n\tconst albumCoverContainerEl = document.querySelector('[data-js=\"album-cover-container\"]')\n\n\talbumCoverContainerEl.classList.add('active')\n\tstyle.setProperty('--state', 'running')\n\tstyle.setProperty('--opacity', 0.4)\n\tstyle.setProperty('--width', '40%')\n\t\n\taudio.play()\n\n\titsPlaying = true\n}\n\nconst pauseMusic = pauseButton => {\n\tif (pauseButton) {\n\t\tpauseButton.setAttribute('src', assets_images_play_icon_png__WEBPACK_IMPORTED_MODULE_1__)\n\t\tpauseButton.setAttribute('data-button', 'play')\n\t}\n\n\tconst { style } = document.documentElement\n\tstyle.setProperty('--state', 'paused')\n    style.setProperty('--opacity', 1)\n    style.setProperty('--width', '50%')\n    \n    audio.pause()\n\titsPlaying = false\n}\n\nconst backMusic = () => {\n\tconst maxTrack = _music_data__WEBPACK_IMPORTED_MODULE_0__.musics.length - 1\n\tconst currentTrack = Number(audio.getAttribute('data-track'))\n\tconst backTrack = (currentTrack > 0) ? (currentTrack - 1) : maxTrack\n\n\n\tswitchMusicTrack(backTrack)\n\n\tif (itsPlaying) {\n\t\tplayMusic()\n\t\treturn\n\t}\n\n\tpauseMusic()\n}\n\nconst nextMusic = () => {\n\tconst maxTrack = _music_data__WEBPACK_IMPORTED_MODULE_0__.musics.length - 1\n\tconst currentTrack = Number(audio.getAttribute('data-track'))\n\tconst nextTrack = (currentTrack < maxTrack) ? (currentTrack + 1) : 0\n\n\n\tswitchMusicTrack(nextTrack)\n\n\tif (itsPlaying) {\n\t\tplayMusic()\n\t\treturn\n\t}\n\n\tpauseMusic()\n}\n\nconst checkButton = (clickedButton, domElement) => ({\n\tplay: playMusic,\n\tpause: pauseMusic,\n\tback: backMusic,\n\tnext: nextMusic,\n})[clickedButton](domElement)\n\nconst handleControlButtonsClick = (event) => {\n\tconst buttons = ['play', 'pause', 'back', 'next']\n\n\tconst domElement = event.target\n\tconst clickedButton = event.target.dataset.button\n\tconst allowedButton = buttons.some(button => button === clickedButton)\n\n\tif (allowedButton) checkButton(clickedButton, domElement)\n}\n\n// SETIINGS PROGRESS BAR\nconst setProgressBarOnEnd = (...dataEvent) => () => {\n\tconst [moveType, endType, xPositionPercent] = dataEvent\n\n\tconst { duration } = audio\n\tconst time = xPositionPercent * duration\n\n\taudio.currentTime = (time - (time % 100)) / 100\n\taudio.addEventListener('timeupdate', updateProgressBar)\n\n\tif (moveType === 'ontouchmove')\n\t\tprogressContainer.addEventListener('mousedown', handleProgressBarClick)\n\n\n\tprogressContainer.classList.remove('active')\n\twindow[moveType] = false\n\twindow[endType] = false\n\twindow.onselectstart = false\n}\n\nconst setProgressBarOnMove = moveType => event => {\n\tconst progressBar = document.querySelector('[data-js=\"progress-bar\"]')\n\tconst endType = (moveType === 'onmousemove') ? 'onmouseup' : 'ontouchend'\n\n\tconst { width, left } = progressContainer.getBoundingClientRect()\n\tconst { clientX } = (moveType === 'onmousemove') ? event : event.changedTouches[0]\n\tconst clickedXPositionPercent = ((clientX - left) / width) * 100\n\n\n\taudio.removeEventListener('timeupdate', updateProgressBar)\n\n\tif (clickedXPositionPercent < 100) {\n\t\tprogressBar.style.width = `${clickedXPositionPercent}%`\n\t\twindow[endType] = setProgressBarOnEnd(moveType, endType, clickedXPositionPercent)\n\t}\n}\n\nconst setProgressBarOnClick = (moveType, clientX) => {\n\tconst endType = (moveType === 'onmousemove') ? 'onmouseup' : 'ontouchend'\n\tconst { width, left } = progressContainer.getBoundingClientRect()\n\tconst { duration } = audio\n\n\tconst clickedXPosition = (duration / width) * (clientX - left)\n\taudio.currentTime = clickedXPosition\n\n\twindow[moveType] = setProgressBarOnMove(moveType)\n\twindow[endType] = () => {\n\t\tprogressContainer.classList.remove('active')\n\t\twindow[moveType] = false\n\t\twindow[endType] = false\n\t}\n\twindow.onselectstart = () => false\n}\n\nconst handleProgressBarClick = event => {\n\tconst clickType = event.type\n\tprogressContainer.classList.add('active')\n\n\tif (clickType === 'touchstart') {\n\t\tprogressContainer.removeEventListener('mousedown', handleProgressBarClick)\n\t\tconst { clientX } = event.changedTouches[0]\n\t\tsetProgressBarOnClick('ontouchmove', clientX)\n\t\treturn\n\t}\n\n\tconst { clientX } = event\n\tsetProgressBarOnClick('onmousemove', clientX)\n\n}\n\n// DISABLED CONTEXT MENU FOR MOBILE\nconst disableContextMenu = event => {\n\tconst exceptions = ['progress-container', 'button']\n\tconst targetElement = event.target.dataset.js\n\n\tconst itsTouch = event.pointerType === 'touch'\n\tconst itsException = exceptions.some(exception => exception === targetElement)\n\n\tif (itsTouch && itsException) {\n\t\tevent.preventDefault()\n\t\tevent.stopPropagation()\n\t\treturn false\n\t}\n}\n\n// DISABLED DRAGGING\nconst disableDrag = event => {\n\tevent.preventDefault()\n\tevent.stopPropagation()\n\treturn false\n}\n\n// SHOW MINUTES ON DOM\nconst showCurrentTimeAndDuration = (duration, currentTime) => {\n\tconst musicDurationEl = document.querySelector('[data-js=\"music-duration\"]')\n\tconst musicCurrentTimeEl = document.querySelector('[data-js=\"music-current-time\"]')\n\n\tconst durationMinutes = duration / 60\n\tconst durationSeconds = Math.floor((durationMinutes * 60) % 60)\n\n\tconst currentTimeSeconds = Math.floor(currentTime % 60)\n\tconst currentTimeMinutes = Math.floor(currentTime / 60)\n\n\tmusicCurrentTimeEl.textContent = `${currentTimeMinutes}:${currentTimeSeconds < 10\n\t\t? '0' + currentTimeSeconds\n\t\t: currentTimeSeconds}`\n\n\tif (duration) {\n\t\tmusicDurationEl.textContent = `\n\t\t${Math.floor(durationMinutes)}:${durationSeconds < 10\n\t\t\t\t? '0' + durationSeconds\n\t\t\t\t: durationSeconds}`\n\t}\n\n}\n\n// PROGRESS BAR LOADING\nconst updateProgressBar = event => {\n\tconst progressBar = document.querySelector('[data-js=\"progress-bar\"]')\n\tconst { duration, currentTime } = event.target\n\n\tconst musicCurrentTimePercent = (currentTime / duration) * 100\n\tprogressBar.style.width = `${musicCurrentTimePercent}%`\n\n\tshowCurrentTimeAndDuration(duration, currentTime)\n}\n\n// INIT\nconst init = () => {\n\tcontrols.addEventListener('click', handleControlButtonsClick)\n\tprogressContainer.addEventListener('mousedown', handleProgressBarClick)\n\tprogressContainer.addEventListener('touchstart', handleProgressBarClick)\n\n\twindow.addEventListener('contextmenu', disableContextMenu)\n\twindow.addEventListener('dragstart', disableDrag)\n\taudio.addEventListener('timeupdate', updateProgressBar)\n\taudio.addEventListener('ended', () => nextMusic())\n\n\tsetTrackDetails()\n}\n\ninit()\n\n\n//# sourceURL=webpack://new-music-player/./src/js/index.js?");

/***/ }),

/***/ "./src/js/music_data.js":
/*!******************************!*\
  !*** ./src/js/music_data.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"musics\": () => (/* binding */ musics)\n/* harmony export */ });\n/* harmony import */ var assets_sounds_Riders_On_The_Storm_mp3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! assets/sounds/Riders_On_The_Storm.mp3 */ \"./src/assets/sounds/Riders_On_The_Storm.mp3\");\n/* harmony import */ var assets_sounds_Love_Her_Madly_mp3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! assets/sounds/Love_Her_Madly.mp3 */ \"./src/assets/sounds/Love_Her_Madly.mp3\");\n/* harmony import */ var assets_sounds_Dogs_m4a__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! assets/sounds/Dogs.m4a */ \"./src/assets/sounds/Dogs.m4a\");\n/* harmony import */ var assets_images_The_Doors_album_cover_jpg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! assets/images/The_Doors_album_cover.jpg */ \"./src/assets/images/The_Doors_album_cover.jpg\");\n/* harmony import */ var assets_images_Pink_Floyd_album_cover_jpg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! assets/images/Pink_Floyd_album_cover.jpg */ \"./src/assets/images/Pink_Floyd_album_cover.jpg\");\n\n\n\n\n\n\n\nconst musics = [\n    {\n        musicPath: assets_sounds_Riders_On_The_Storm_mp3__WEBPACK_IMPORTED_MODULE_0__,\n        albumCover: assets_images_The_Doors_album_cover_jpg__WEBPACK_IMPORTED_MODULE_3__,\n        musicName: 'Riders On The Storm',\n        artistName: 'The Doors'\n    },\n    {\n        musicPath: assets_sounds_Love_Her_Madly_mp3__WEBPACK_IMPORTED_MODULE_1__,\n        albumCover: assets_images_The_Doors_album_cover_jpg__WEBPACK_IMPORTED_MODULE_3__,\n        musicName: 'Love Her Madly',\n        artistName: 'The Doors'\n    },\n    {\n        musicPath: assets_sounds_Dogs_m4a__WEBPACK_IMPORTED_MODULE_2__,\n        albumCover: assets_images_Pink_Floyd_album_cover_jpg__WEBPACK_IMPORTED_MODULE_4__,\n        musicName: 'Dogs',\n        artistName: 'Pinky Floyd'\n    }\n]\n\n\n//# sourceURL=webpack://new-music-player/./src/js/music_data.js?");

/***/ }),

/***/ "./src/assets/images/Pink_Floyd_album_cover.jpg":
/*!******************************************************!*\
  !*** ./src/assets/images/Pink_Floyd_album_cover.jpg ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"assets/images/Pink_Floyd_album_cover.f06df07e1cb9846e869c.jpg\";\n\n//# sourceURL=webpack://new-music-player/./src/assets/images/Pink_Floyd_album_cover.jpg?");

/***/ }),

/***/ "./src/assets/images/The_Doors_album_cover.jpg":
/*!*****************************************************!*\
  !*** ./src/assets/images/The_Doors_album_cover.jpg ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"assets/images/The_Doors_album_cover.b677e9531d91aa08a764.jpg\";\n\n//# sourceURL=webpack://new-music-player/./src/assets/images/The_Doors_album_cover.jpg?");

/***/ }),

/***/ "./src/assets/images/pause_icon.png":
/*!******************************************!*\
  !*** ./src/assets/images/pause_icon.png ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"assets/images/pause_icon.0400e977bf0dc4ea7ea1.png\";\n\n//# sourceURL=webpack://new-music-player/./src/assets/images/pause_icon.png?");

/***/ }),

/***/ "./src/assets/images/play_icon.png":
/*!*****************************************!*\
  !*** ./src/assets/images/play_icon.png ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"assets/images/play_icon.8784f7d9000c0ed917df.png\";\n\n//# sourceURL=webpack://new-music-player/./src/assets/images/play_icon.png?");

/***/ }),

/***/ "./src/assets/sounds/Dogs.m4a":
/*!************************************!*\
  !*** ./src/assets/sounds/Dogs.m4a ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"assets/sounds/Dogs.bf272f1381905709a85d.m4a\";\n\n//# sourceURL=webpack://new-music-player/./src/assets/sounds/Dogs.m4a?");

/***/ }),

/***/ "./src/assets/sounds/Love_Her_Madly.mp3":
/*!**********************************************!*\
  !*** ./src/assets/sounds/Love_Her_Madly.mp3 ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"assets/sounds/Love_Her_Madly.930391b56e1752a123a7.mp3\";\n\n//# sourceURL=webpack://new-music-player/./src/assets/sounds/Love_Her_Madly.mp3?");

/***/ }),

/***/ "./src/assets/sounds/Riders_On_The_Storm.mp3":
/*!***************************************************!*\
  !*** ./src/assets/sounds/Riders_On_The_Storm.mp3 ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"assets/sounds/Riders_On_The_Storm.803d9ffef736bfc21fc8.mp3\";\n\n//# sourceURL=webpack://new-music-player/./src/assets/sounds/Riders_On_The_Storm.mp3?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/index.js");
/******/ 	
/******/ })()
;
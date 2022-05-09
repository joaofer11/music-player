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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _music_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./music_data */ \"./src/js/music_data.js\");\n/* harmony import */ var assets_images_play_icon_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! assets/images/play_icon.png */ \"./src/assets/images/play_icon.png\");\n/* harmony import */ var assets_images_pause_icon_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! assets/images/pause_icon.png */ \"./src/assets/images/pause_icon.png\");\n\r\n\r\n\r\n\r\n\r\nconst controls = document.querySelector('[data-js=\"controls\"]')\r\nconst audio = document.querySelector('[data-js=\"audio\"]')\r\nconst progressContainer = document.querySelector('[data-js=\"progress-container\"]')\r\n\r\n\r\nlet musicData = _music_data__WEBPACK_IMPORTED_MODULE_0__.musics[0]\r\nlet itsPlaying = false\r\naudio.setAttribute('src', musicData.musicPath)\r\n\r\n// SET DEFAULT TRACK\r\nconst setTrackDetails = () => {\r\n\tconst { musicName, artistName } = musicData\r\n\r\n\tconst domMusicNameElement = document.querySelector('[data-js=\"music-name\"]')\r\n\tconst domArtistNameElement = document.querySelector('[data-js=\"artist-name\"]')\r\n\r\n\tdomMusicNameElement.textContent = musicName\r\n\tdomArtistNameElement.textContent = artistName\r\n}\r\n\r\n// CONTROLS SETTINGS\r\nconst switchMusicTrack = track => {\r\n\tmusicData = _music_data__WEBPACK_IMPORTED_MODULE_0__.musics[track]\r\n\taudio.setAttribute('data-track', track)\r\n\taudio.setAttribute('src', musicData.musicPath)\r\n\r\n\tsetTrackDetails()\r\n}\r\n\r\nconst playMusic = playButton => {\r\n\tif (playButton) {\r\n\t\tplayButton.setAttribute('src', assets_images_pause_icon_png__WEBPACK_IMPORTED_MODULE_2__)\r\n\t\tplayButton.setAttribute('data-button', 'pause')\r\n\t}\r\n\r\n\tconst { style } = document.documentElement\r\n\tconst albumCover = document.querySelector('[data-js=\"album-cover\"]')\r\n\r\n\talbumCover.classList.add('active')\r\n\tstyle.setProperty('--state', 'running')\r\n\taudio.play()\r\n\r\n\titsPlaying = true\r\n}\r\n\r\nconst pauseMusic = pauseButton => {\r\n\tif (pauseButton) {\r\n\t\tpauseButton.setAttribute('src', assets_images_play_icon_png__WEBPACK_IMPORTED_MODULE_1__)\r\n\t\tpauseButton.setAttribute('data-button', 'play')\r\n\t}\r\n\r\n\tconst { style } = document.documentElement\r\n\tstyle.setProperty('--state', 'paused')\r\n\r\n\taudio.pause()\r\n\titsPlaying = false\r\n}\r\n\r\nconst backMusic = () => {\r\n\tconst maxTrack = _music_data__WEBPACK_IMPORTED_MODULE_0__.musics.length - 1\r\n\tconst currentTrack = Number(audio.getAttribute('data-track'))\r\n\tconst backTrack = (currentTrack > 0) ? (currentTrack - 1) : maxTrack\r\n\r\n\r\n\tswitchMusicTrack(backTrack)\r\n\r\n\tif (itsPlaying) {\r\n\t\tplayMusic()\r\n\t\treturn\r\n\t}\r\n\r\n\tpauseMusic()\r\n}\r\n\r\nconst nextMusic = () => {\r\n\tconst maxTrack = _music_data__WEBPACK_IMPORTED_MODULE_0__.musics.length - 1\r\n\tconst currentTrack = Number(audio.getAttribute('data-track'))\r\n\tconst nextTrack = (currentTrack < maxTrack) ? (currentTrack + 1) : 0\r\n\r\n\r\n\tswitchMusicTrack(nextTrack)\r\n\r\n\tif (itsPlaying) {\r\n\t\tplayMusic()\r\n\t\treturn\r\n\t}\r\n\r\n\tpauseMusic()\r\n}\r\n\r\nconst checkButton = (clickedButton, domElement) => ({\r\n\tplay: playMusic,\r\n\tpause: pauseMusic,\r\n\tback: backMusic,\r\n\tnext: nextMusic,\r\n})[clickedButton](domElement)\r\n\r\nconst handleControlButtonsClick = (event) => {\r\n\tconst buttons = ['play', 'pause', 'back', 'next']\r\n\r\n\tconst domElement = event.target\r\n\tconst clickedButton = event.target.dataset.button\r\n\tconst allowedButton = buttons.some(button => button === clickedButton)\r\n\r\n\tif (allowedButton) checkButton(clickedButton, domElement)\r\n}\r\n\r\n// SETIINGS PROGRESS BAR\r\nconst setProgressBarOnEnd = (...dataEvent) => () => {\r\n\tconst [moveType, endType, xPositionPercent] = dataEvent\r\n\r\n\tconst { duration } = audio\r\n\tconst time = xPositionPercent * duration\r\n\r\n\taudio.currentTime = (time - (time % 100)) / 100\r\n\taudio.addEventListener('timeupdate', updateProgressBar)\r\n\r\n\tif (moveType === 'ontouchmove')\r\n\t\tprogressContainer.addEventListener('mousedown', handleProgressBarClick)\r\n\r\n\r\n\tprogressContainer.classList.remove('active')\r\n\twindow[moveType] = false\r\n\twindow[endType] = false\r\n\twindow.onselectstart = false\r\n}\r\n\r\nconst setProgressBarOnMove = moveType => event => {\r\n\tconst progressBar = document.querySelector('[data-js=\"progress-bar\"]')\r\n\tconst endType = (moveType === 'onmousemove') ? 'onmouseup' : 'ontouchend'\r\n\r\n\tconst { width, left } = progressContainer.getBoundingClientRect()\r\n\tconst { clientX } = (moveType === 'onmousemove') ? event : event.changedTouches[0]\r\n\tconst clickedXPositionPercent = ((clientX - left) / width) * 100\r\n\r\n\r\n\taudio.removeEventListener('timeupdate', updateProgressBar)\r\n\r\n\tif (clickedXPositionPercent < 100) {\r\n\t\tprogressBar.style.width = `${clickedXPositionPercent}%`\r\n\t\twindow[endType] = setProgressBarOnEnd(moveType, endType, clickedXPositionPercent)\r\n\t}\r\n}\r\n\r\nconst setProgressBarOnClick = (moveType, clientX) => {\r\n\tconst endType = (moveType === 'onmousemove') ? 'onmouseup' : 'ontouchend'\r\n\tconst { width, left } = progressContainer.getBoundingClientRect()\r\n\tconst { duration } = audio\r\n\r\n\tconst clickedXPosition = (duration / width) * (clientX - left)\r\n\taudio.currentTime = clickedXPosition\r\n\r\n\twindow[moveType] = setProgressBarOnMove(moveType)\r\n\twindow[endType] = () => {\r\n\t\tprogressContainer.classList.remove('active')\r\n\t\twindow[moveType] = false\r\n\t\twindow[endType] = false\r\n\t}\r\n\twindow.onselectstart = () => false\r\n}\r\n\r\nconst handleProgressBarClick = event => {\r\n\tconst clickType = event.type\r\n\tprogressContainer.classList.add('active')\r\n\r\n\tif (clickType === 'touchstart') {\r\n\t\tprogressContainer.removeEventListener('mousedown', handleProgressBarClick)\r\n\t\tconst { clientX } = event.changedTouches[0]\r\n\t\tsetProgressBarOnClick('ontouchmove', clientX)\r\n\t\treturn\r\n\t}\r\n\r\n\tconst { clientX } = event\r\n\tsetProgressBarOnClick('onmousemove', clientX)\r\n\r\n}\r\n\r\n// DISABLED CONTEXT MENU FOR MOBILE\r\nconst disableContextMenu = event => {\r\n\tconst exceptions = ['progress-container', 'button']\r\n\tconst targetElement = event.target.dataset.js\r\n\r\n\tconst itsTouch = event.pointerType === 'touch'\r\n\tconst itsException = exceptions.some(exception => exception === targetElement)\r\n\r\n\tif (itsTouch && itsException) {\r\n\t\tevent.preventDefault()\r\n\t\tevent.stopPropagation()\r\n\t\treturn false\r\n\t}\r\n}\r\n\r\n// DISABLED DRAGGING\r\nconst disableDrag = event => {\r\n\tevent.preventDefault()\r\n\tevent.stopPropagation()\r\n\treturn false\r\n}\r\n\r\n// SHOW MINUTES ON DOM\r\nconst showCurrentTimeAndDuration = (duration, currentTime) => {\r\n\tconst musicDurationEl = document.querySelector('[data-js=\"music-duration\"]')\r\n\tconst musicCurrentTimeEl = document.querySelector('[data-js=\"music-current-time\"]')\r\n\r\n\tconst durationMinutes = duration / 60\r\n\tconst durationSeconds = Math.floor((durationMinutes * 60) % 60)\r\n\r\n\tconst currentTimeSeconds = Math.floor(currentTime % 60)\r\n\tconst currentTimeMinutes = Math.floor(currentTime / 60)\r\n\r\n\tmusicCurrentTimeEl.textContent = `${currentTimeMinutes}:${currentTimeSeconds < 10\r\n\t\t? '0' + currentTimeSeconds\r\n\t\t: currentTimeSeconds}`\r\n\r\n\tif (duration) {\r\n\t\tmusicDurationEl.textContent = `\r\n\t\t${Math.floor(durationMinutes)}:${durationSeconds < 10\r\n\t\t\t\t? '0' + durationSeconds\r\n\t\t\t\t: durationSeconds}`\r\n\t}\r\n\r\n}\r\n\r\n// PROGRESS BAR LOADING\r\nconst updateProgressBar = event => {\r\n\tconst progressBar = document.querySelector('[data-js=\"progress-bar\"]')\r\n\tconst { duration, currentTime } = event.target\r\n\r\n\tconst musicCurrentTimePercent = (currentTime / duration) * 100\r\n\tprogressBar.style.width = `${musicCurrentTimePercent}%`\r\n\r\n\tshowCurrentTimeAndDuration(duration, currentTime)\r\n}\r\n\r\n// INIT\r\nconst init = () => {\r\n\tcontrols.addEventListener('click', handleControlButtonsClick)\r\n\tprogressContainer.addEventListener('mousedown', handleProgressBarClick)\r\n\tprogressContainer.addEventListener('touchstart', handleProgressBarClick)\r\n\r\n\twindow.addEventListener('contextmenu', disableContextMenu)\r\n\twindow.addEventListener('dragstart', disableDrag)\r\n\taudio.addEventListener('timeupdate', updateProgressBar)\r\n\taudio.addEventListener('ended', () => nextMusic())\r\n\r\n\tsetTrackDetails()\r\n}\r\n\r\ninit()\n\n//# sourceURL=webpack://new-music-player/./src/js/index.js?");

/***/ }),

/***/ "./src/js/music_data.js":
/*!******************************!*\
  !*** ./src/js/music_data.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"musics\": () => (/* binding */ musics)\n/* harmony export */ });\n/* harmony import */ var assets_sounds_Riders_On_The_Storm_mp3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! assets/sounds/Riders_On_The_Storm.mp3 */ \"./src/assets/sounds/Riders_On_The_Storm.mp3\");\n/* harmony import */ var assets_sounds_Love_Her_Madly_mp3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! assets/sounds/Love_Her_Madly.mp3 */ \"./src/assets/sounds/Love_Her_Madly.mp3\");\nObject(function webpackMissingModule() { var e = new Error(\"Cannot find module 'assets/sounds/Dogs.mp3'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }());\n\r\n\r\n\r\n\r\nconst musics = [\r\n    {\r\n        musicPath: assets_sounds_Riders_On_The_Storm_mp3__WEBPACK_IMPORTED_MODULE_0__,\r\n        musicName: 'Riders On The Storm',\r\n        artistName: 'The Doors'\r\n    },\r\n    {\r\n        musicPath: assets_sounds_Love_Her_Madly_mp3__WEBPACK_IMPORTED_MODULE_1__,\r\n        musicName: 'Love Her Madly',\r\n        artistName: 'The Doors'\r\n    },\r\n    {\r\n        musicPath: Object(function webpackMissingModule() { var e = new Error(\"Cannot find module 'assets/sounds/Dogs.mp3'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()),\r\n        musicName: 'Dogs',\r\n        artistName: 'Pinky Floyd'\r\n    }\r\n]\n\n//# sourceURL=webpack://new-music-player/./src/js/music_data.js?");

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
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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _music_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./music_data */ \"./src/js/music_data.js\");\n/* harmony import */ var assets_images_play_icon_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! assets/images/play_icon.png */ \"./src/assets/images/play_icon.png\");\n/* harmony import */ var assets_images_pause_icon_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! assets/images/pause_icon.png */ \"./src/assets/images/pause_icon.png\");\n\r\n\r\n\r\n\r\nconst audio = document.querySelector('[data-js=\"audio\"]')\r\nconst controls = document.querySelector('[data-js=\"controls\"]')\r\n\r\n\r\nlet musicData = _music_data__WEBPACK_IMPORTED_MODULE_0__.musics[0]\r\nlet itsPlaying = false\r\naudio.setAttribute('src', musicData.musicPath)\r\n\r\nconst setTrackDetails = () => {\r\n    const { musicName, artistName } = musicData\r\n\r\n    const domMusicNameElement = document.querySelector('[data-js=\"music-name\"]')\r\n    const domArtistNameElement = document.querySelector('[data-js=\"artist-name\"]')\r\n\r\n    domMusicNameElement.textContent = musicName\r\n    domArtistNameElement.textContent = artistName\r\n}\r\n\r\nconst switchMusicTrack = track => {\r\n    musicData = _music_data__WEBPACK_IMPORTED_MODULE_0__.musics[track]\r\n    audio.setAttribute('data-track', track)\r\n    audio.setAttribute('src', musicData.musicPath)\r\n\r\n    setTrackDetails()\r\n}\r\n\r\nconst playMusic = playButton => {\r\n    \r\n    if (playButton) {\r\n        playButton.setAttribute('src', assets_images_pause_icon_png__WEBPACK_IMPORTED_MODULE_2__)\r\n        playButton.setAttribute('data-button', 'pause')\r\n    }\r\n\r\n    audio.play()\r\n    itsPlaying = true\r\n}\r\n\r\nconst pauseMusic = pauseButton => {\r\n    if (pauseButton) {\r\n        pauseButton.setAttribute('src', assets_images_play_icon_png__WEBPACK_IMPORTED_MODULE_1__)\r\n        pauseButton.setAttribute('data-button', 'play')\r\n    }\r\n\r\n    audio.pause()\r\n    itsPlaying = false\r\n}\r\n\r\nconst backMusic = () => {\r\n    const maxTrack = _music_data__WEBPACK_IMPORTED_MODULE_0__.musics.length - 1\r\n    const currentTrack = Number(audio.getAttribute('data-track'))\r\n    const backTrack = (currentTrack > 0) ? (currentTrack - 1) : maxTrack\r\n\r\n    \r\n    switchMusicTrack(backTrack)\r\n    \r\n    if (itsPlaying) {\r\n        playMusic()\r\n        return\r\n    }\r\n\r\n    pauseMusic()\r\n}\r\n\r\nconst nextMusic = () => {\r\n    const maxTrack = _music_data__WEBPACK_IMPORTED_MODULE_0__.musics.length - 1\r\n    const currentTrack = Number(audio.getAttribute('data-track'))\r\n    const nextTrack = (currentTrack < maxTrack) ? (currentTrack + 1) : 0\r\n\r\n    \r\n    switchMusicTrack(nextTrack)\r\n    \r\n    if (itsPlaying) {\r\n        playMusic()\r\n        return\r\n    }\r\n\r\n    pauseMusic()\r\n}\r\n\r\nconst checkButton = (clickedButton, domElement) => ({\r\n    play: playMusic,\r\n    pause: pauseMusic,\r\n    back: backMusic,\r\n    next: nextMusic,\r\n})[clickedButton](domElement)\r\n\r\nconst handleControlButtonsClick = (event) => {\r\n    const buttons = ['play', 'pause','back', 'next']\r\n\r\n    const domElement = event.target\r\n    const clickedButton = event.target.dataset.button\r\n    const allowedButton = buttons.some(button => button === clickedButton)\r\n\r\n    if (allowedButton) checkButton(clickedButton, domElement)\r\n}\r\n\r\nconst updateProgressBar = event => {\r\n    const progressBar = document.querySelector('[data-js=\"progress-bar\"]')\r\n    \r\n    const musicDuration = event.target.duration\r\n    const musicCurrentTime = event.target.currentTime\r\n\r\n    const musicCurrentTimePercent = (musicCurrentTime / musicDuration) * 100\r\n\r\n    console.log(musicCurrentTimePercent)\r\n    progressBar.style.width = `${musicCurrentTimePercent}%`\r\n}\r\n\r\ncontrols.addEventListener('click', handleControlButtonsClick)\r\naudio.addEventListener('timeupdate', updateProgressBar)\r\nsetTrackDetails()\n\n//# sourceURL=webpack://new-music-player/./src/js/index.js?");

/***/ }),

/***/ "./src/js/music_data.js":
/*!******************************!*\
  !*** ./src/js/music_data.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"musics\": () => (/* binding */ musics)\n/* harmony export */ });\n/* harmony import */ var assets_sounds_Daft_Punk_Get_Lucky_mp3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! assets/sounds/Daft_Punk-Get_Lucky.mp3 */ \"./src/assets/sounds/Daft_Punk-Get_Lucky.mp3\");\n/* harmony import */ var assets_sounds_Daft_Punk_Something_About_Us_mp3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! assets/sounds/Daft_Punk-Something_About_Us.mp3 */ \"./src/assets/sounds/Daft_Punk-Something_About_Us.mp3\");\n/* harmony import */ var assets_sounds_Daft_Punk_Giorgio_by_Moroder_mp3__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! assets/sounds/Daft_Punk-Giorgio_by_Moroder.mp3 */ \"./src/assets/sounds/Daft_Punk-Giorgio_by_Moroder.mp3\");\n\r\n\r\n\r\n\r\nconst musics = [\r\n    {\r\n        musicPath: assets_sounds_Daft_Punk_Get_Lucky_mp3__WEBPACK_IMPORTED_MODULE_0__,\r\n        musicName: 'Get Lucky',\r\n        artistName: 'Daft Punk'\r\n    },\r\n    {\r\n        musicPath: assets_sounds_Daft_Punk_Something_About_Us_mp3__WEBPACK_IMPORTED_MODULE_1__,\r\n        musicName: 'Something About Us',\r\n        artistName: 'Daft Punk'\r\n    },\r\n    {\r\n        musicPath: assets_sounds_Daft_Punk_Giorgio_by_Moroder_mp3__WEBPACK_IMPORTED_MODULE_2__,\r\n        musicName: 'Gergio By Moroder',\r\n        artistName: 'Daft Punk'\r\n    }\r\n]\n\n//# sourceURL=webpack://new-music-player/./src/js/music_data.js?");

/***/ }),

/***/ "./src/assets/images/pause_icon.png":
/*!******************************************!*\
  !*** ./src/assets/images/pause_icon.png ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"assets/images/pause_icon.12897fc4f7fbef63497f.png\";\n\n//# sourceURL=webpack://new-music-player/./src/assets/images/pause_icon.png?");

/***/ }),

/***/ "./src/assets/images/play_icon.png":
/*!*****************************************!*\
  !*** ./src/assets/images/play_icon.png ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"assets/images/play_icon.d67631bbea2f5801c8e1.png\";\n\n//# sourceURL=webpack://new-music-player/./src/assets/images/play_icon.png?");

/***/ }),

/***/ "./src/assets/sounds/Daft_Punk-Get_Lucky.mp3":
/*!***************************************************!*\
  !*** ./src/assets/sounds/Daft_Punk-Get_Lucky.mp3 ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"assets/sounds/Daft_Punk-Get_Lucky.cc047c596181d71a489c.mp3\";\n\n//# sourceURL=webpack://new-music-player/./src/assets/sounds/Daft_Punk-Get_Lucky.mp3?");

/***/ }),

/***/ "./src/assets/sounds/Daft_Punk-Giorgio_by_Moroder.mp3":
/*!************************************************************!*\
  !*** ./src/assets/sounds/Daft_Punk-Giorgio_by_Moroder.mp3 ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"assets/sounds/Daft_Punk-Giorgio_by_Moroder.79fdc09ea82937bbba24.mp3\";\n\n//# sourceURL=webpack://new-music-player/./src/assets/sounds/Daft_Punk-Giorgio_by_Moroder.mp3?");

/***/ }),

/***/ "./src/assets/sounds/Daft_Punk-Something_About_Us.mp3":
/*!************************************************************!*\
  !*** ./src/assets/sounds/Daft_Punk-Something_About_Us.mp3 ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"assets/sounds/Daft_Punk-Something_About_Us.d485fb0538eb65f96023.mp3\";\n\n//# sourceURL=webpack://new-music-player/./src/assets/sounds/Daft_Punk-Something_About_Us.mp3?");

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
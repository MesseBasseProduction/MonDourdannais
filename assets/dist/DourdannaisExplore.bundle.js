/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/utils/Map.js":
/*!*****************************!*\
  !*** ./src/js/utils/Map.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _MarkerEnum_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MarkerEnum.js */ "./src/js/utils/MarkerEnum.js");
/* harmony import */ var _Utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Utils.js */ "./src/js/utils/Utils.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }


var Map = /*#__PURE__*/function () {
  function Map(options) {
    _classCallCheck(this, Map);
    this._id = options.targetId;
    this._map = null;
    this._marks = {};
    this._polygons = [];
    this._layers = {
      Carte: null,
      Satellite: null
    };
    this._init();
    this._events();
  }
  _createClass(Map, [{
    key: "_init",
    value: function _init() {
      // Use main div to inject OSM into
      this._map = window.L.map(this._id, {
        zoomControl: false
      }).setView([_Utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].CCDH_CENTER.LAT, _Utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].CCDH_CENTER.LNG], 12);
      // Add meter and feet scale on map
      window.L.control.scale().addTo(this._map);
      // Prevent panning outside of the map bounds definined in utils
      this._map.setMaxBounds(_Utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].MAP_BOUNDS);
      // Add layer group to interface and start map with osm default
      this._layers.Carte = _Utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].OSM_LAYER;
      this._layers.Satellite = _Utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].ESRI_LAYER;
      this._layers.Carte.addTo(this._map);
      // Add layer switch radio on bottom right of the map
      window.L.control.layers(this._layers, {}, {
        position: 'bottomright'
      }).addTo(this._map);
    }
  }, {
    key: "_events",
    value: function _events() {
      var _this = this;
      // Subscribe to click event on map to react
      this._map.on('click', this._mapClicked.bind(this));
      // Map is dragged by user mouse/finger
      this._map.on('drag', function () {
        // Constrain pan to the map bounds
        _this._map.panInsideBounds(_Utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].MAP_BOUNDS, {
          animate: true
        });
      });
    }
  }, {
    key: "_mapClicked",
    value: function _mapClicked(opts) {
      console.log(opts.latlng, JSON.stringify(opts.latlng.lat + ', ' + opts.latlng.lng));
    }
  }, {
    key: "drawUserMarker",
    value: function drawUserMarker() {
      if (!window.dx.user.marker) {
        window.dx.user.marker = window.L.marker([window.dx.user.lat, window.dx.user.lng], {
          icon: _MarkerEnum_js__WEBPACK_IMPORTED_MODULE_0__["default"].user
        });
        window.dx.user.marker.addTo(this._map);
      } else {
        window.dx.user.marker.setLatLng(window.dx.user);
      }
    }
  }, {
    key: "addMark",
    value: function addMark(opts, createPopup) {
      var _this2 = this;
      var types = opts.type.split('/');
      var type = opts.type;
      if (types.length > 1) {
        type = "".concat(types[0]).concat(types[1]);
      }
      var marker = window.L.marker([opts.lat, opts.lng], {
        icon: _MarkerEnum_js__WEBPACK_IMPORTED_MODULE_0__["default"][type]
      }).on('click', function () {
        _this2._map.flyTo([opts.lat, opts.lng], 18);
      });
      marker.bindPopup(createPopup(opts));
      marker.addTo(this._map);
      if (types.length > 1) {
        for (var i = 0; i < types.length; ++i) {
          if (!this._marks[types[i]]) {
            this._marks[types[i]] = [];
          }
          this._marks[types[i]].push(marker);
        }
      } else {
        if (!this._marks[type]) {
          this._marks[type] = [];
        }
        this._marks[type].push(marker);
      }
    }
  }, {
    key: "addPolygon",
    value: function addPolygon(polygon) {
      this._polygons.push(window.L.polygon(polygon).addTo(this._map));
    }
  }]);
  return Map;
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Map);

/***/ }),

/***/ "./src/js/utils/MarkerEnum.js":
/*!************************************!*\
  !*** ./src/js/utils/MarkerEnum.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Object.freeze({
  restaurant: new window.L.Icon({
    iconUrl: 'assets/img/marker/restaurant.svg',
    iconSize: [26, 26],
    iconAnchor: [13, 13],
    popupAnchor: [0, -13],
    shadowUrl: 'assets/img/marker/marker-shadow.png',
    shadowSize: [42, 42],
    shadowAnchor: [20, 20]
  }),
  bar: new window.L.Icon({
    iconUrl: 'assets/img/marker/bar.svg',
    iconSize: [26, 26],
    iconAnchor: [13, 13],
    popupAnchor: [0, -13],
    shadowUrl: 'assets/img/marker/marker-shadow.png',
    shadowSize: [42, 42],
    shadowAnchor: [20, 20]
  }),
  cellar: new window.L.Icon({
    iconUrl: 'assets/img/marker/cellar.svg',
    iconSize: [26, 26],
    iconAnchor: [13, 13],
    popupAnchor: [0, -13],
    shadowUrl: 'assets/img/marker/marker-shadow.png',
    shadowSize: [42, 42],
    shadowAnchor: [20, 20]
  }),
  grocery: new window.L.Icon({
    iconUrl: 'assets/img/marker/grocery.svg',
    iconSize: [26, 26],
    iconAnchor: [13, 13],
    popupAnchor: [0, -13],
    shadowUrl: 'assets/img/marker/marker-shadow.png',
    shadowSize: [42, 42],
    shadowAnchor: [20, 20]
  }),
  foot: new window.L.Icon({
    iconUrl: 'assets/img/marker/foot.svg',
    iconSize: [26, 26],
    iconAnchor: [13, 13],
    popupAnchor: [0, -13],
    shadowUrl: 'assets/img/marker/marker-shadow.png',
    shadowSize: [42, 42],
    shadowAnchor: [20, 20]
  }),
  rugby: new window.L.Icon({
    iconUrl: 'assets/img/marker/rugby.svg',
    iconSize: [26, 26],
    iconAnchor: [13, 13],
    popupAnchor: [0, -13],
    shadowUrl: 'assets/img/marker/marker-shadow.png',
    shadowSize: [42, 42],
    shadowAnchor: [20, 20]
  }),
  pingpong: new window.L.Icon({
    iconUrl: 'assets/img/marker/pingpong.svg',
    iconSize: [26, 26],
    iconAnchor: [13, 13],
    popupAnchor: [0, -13],
    shadowUrl: 'assets/img/marker/marker-shadow.png',
    shadowSize: [42, 42],
    shadowAnchor: [20, 20]
  }),
  bocce: new window.L.Icon({
    iconUrl: 'assets/img/marker/bocce.svg',
    iconSize: [26, 26],
    iconAnchor: [13, 13],
    popupAnchor: [0, -13],
    shadowUrl: 'assets/img/marker/marker-shadow.png',
    shadowSize: [42, 42],
    shadowAnchor: [20, 20]
  }),
  tennis: new window.L.Icon({
    iconUrl: 'assets/img/marker/tennis.svg',
    iconSize: [26, 26],
    iconAnchor: [13, 13],
    popupAnchor: [0, -13],
    shadowUrl: 'assets/img/marker/marker-shadow.png',
    shadowSize: [42, 42],
    shadowAnchor: [20, 20]
  }),
  bakery: new window.L.Icon({
    iconUrl: 'assets/img/marker/bread.svg',
    iconSize: [26, 26],
    iconAnchor: [13, 13],
    popupAnchor: [0, -13],
    shadowUrl: 'assets/img/marker/marker-shadow.png',
    shadowSize: [42, 42],
    shadowAnchor: [20, 20]
  }),
  book: new window.L.Icon({
    iconUrl: 'assets/img/marker/book.svg',
    iconSize: [26, 26],
    iconAnchor: [13, 13],
    popupAnchor: [0, -13],
    shadowUrl: 'assets/img/marker/marker-shadow.png',
    shadowSize: [42, 42],
    shadowAnchor: [20, 20]
  }),
  landmark: new window.L.Icon({
    iconUrl: 'assets/img/marker/landmark.svg',
    iconSize: [26, 26],
    iconAnchor: [13, 13],
    popupAnchor: [0, -13],
    shadowUrl: 'assets/img/marker/marker-shadow.png',
    shadowSize: [42, 42],
    shadowAnchor: [20, 20]
  }),
  castle: new window.L.Icon({
    iconUrl: 'assets/img/marker/castle.svg',
    iconSize: [26, 26],
    iconAnchor: [13, 13],
    popupAnchor: [0, -13],
    shadowUrl: 'assets/img/marker/marker-shadow.png',
    shadowSize: [42, 42],
    shadowAnchor: [20, 20]
  }),
  church: new window.L.Icon({
    iconUrl: 'assets/img/marker/church.svg',
    iconSize: [26, 26],
    iconAnchor: [13, 13],
    popupAnchor: [0, -13],
    shadowUrl: 'assets/img/marker/marker-shadow.png',
    shadowSize: [42, 42],
    shadowAnchor: [20, 20]
  }),
  garden: new window.L.Icon({
    iconUrl: 'assets/img/marker/garden.svg',
    iconSize: [26, 26],
    iconAnchor: [13, 13],
    popupAnchor: [0, -13],
    shadowUrl: 'assets/img/marker/marker-shadow.png',
    shadowSize: [42, 42],
    shadowAnchor: [20, 20]
  }),
  car: new window.L.Icon({
    iconUrl: 'assets/img/marker/car.svg',
    iconSize: [26, 26],
    iconAnchor: [13, 13],
    popupAnchor: [0, -13],
    shadowUrl: 'assets/img/marker/marker-shadow.png',
    shadowSize: [42, 42],
    shadowAnchor: [20, 20]
  }),
  train: new window.L.Icon({
    iconUrl: 'assets/img/marker/train.svg',
    iconSize: [26, 26],
    iconAnchor: [13, 13],
    popupAnchor: [0, -13],
    shadowUrl: 'assets/img/marker/marker-shadow.png',
    shadowSize: [42, 42],
    shadowAnchor: [20, 20]
  }),
  animal: new window.L.Icon({
    iconUrl: 'assets/img/marker/animal.svg',
    iconSize: [26, 26],
    iconAnchor: [13, 13],
    popupAnchor: [0, -13],
    shadowUrl: 'assets/img/marker/marker-shadow.png',
    shadowSize: [42, 42],
    shadowAnchor: [20, 20]
  }),
  dental: new window.L.Icon({
    iconUrl: 'assets/img/marker/dental.svg',
    iconSize: [26, 26],
    iconAnchor: [13, 13],
    popupAnchor: [0, -13],
    shadowUrl: 'assets/img/marker/marker-shadow.png',
    shadowSize: [42, 42],
    shadowAnchor: [20, 20]
  }),
  pharmacy: new window.L.Icon({
    iconUrl: 'assets/img/marker/pharmacy.svg',
    iconSize: [26, 26],
    iconAnchor: [13, 13],
    popupAnchor: [0, -13],
    shadowUrl: 'assets/img/marker/marker-shadow.png',
    shadowSize: [42, 42],
    shadowAnchor: [20, 20]
  }),
  mail: new window.L.Icon({
    iconUrl: 'assets/img/marker/mail.svg',
    iconSize: [26, 26],
    iconAnchor: [13, 13],
    popupAnchor: [0, -13],
    shadowUrl: 'assets/img/marker/marker-shadow.png',
    shadowSize: [42, 42],
    shadowAnchor: [20, 20]
  }),
  park: new window.L.Icon({
    iconUrl: 'assets/img/marker/park.svg',
    iconSize: [26, 26],
    iconAnchor: [13, 13],
    popupAnchor: [0, -13],
    shadowUrl: 'assets/img/marker/marker-shadow.png',
    shadowSize: [42, 42],
    shadowAnchor: [20, 20]
  }),
  recycle: new window.L.Icon({
    iconUrl: 'assets/img/marker/recycle.svg',
    iconSize: [26, 26],
    iconAnchor: [13, 13],
    popupAnchor: [0, -13],
    shadowUrl: 'assets/img/marker/marker-shadow.png',
    shadowSize: [42, 42],
    shadowAnchor: [20, 20]
  }),
  administration: new window.L.Icon({
    iconUrl: 'assets/img/marker/administration.svg',
    iconSize: [26, 26],
    iconAnchor: [13, 13],
    popupAnchor: [0, -13],
    shadowUrl: 'assets/img/marker/marker-shadow.png',
    shadowSize: [42, 42],
    shadowAnchor: [20, 20]
  }),
  school: new window.L.Icon({
    iconUrl: 'assets/img/marker/school.svg',
    iconSize: [26, 26],
    iconAnchor: [13, 13],
    popupAnchor: [0, -13],
    shadowUrl: 'assets/img/marker/marker-shadow.png',
    shadowSize: [42, 42],
    shadowAnchor: [20, 20]
  }),
  user: new window.L.Icon({
    iconUrl: 'assets/img/marker/user.svg',
    iconSize: [26, 26],
    iconAnchor: [13, 13],
    popupAnchor: [0, -13],
    shadowUrl: 'assets/img/marker/marker-shadow.png',
    shadowSize: [42, 42],
    shadowAnchor: [20, 20]
  })
}));

/***/ }),

/***/ "./src/js/utils/Utils.js":
/*!*******************************!*\
  !*** ./src/js/utils/Utils.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var getDistanceBetweenCoords = function getDistanceBetweenCoords(from, to) {
  // Return distance in meters
  var lon1 = from[1] * Math.PI / 180,
    lat1 = from[0] * Math.PI / 180,
    lon2 = to[1] * Math.PI / 180,
    lat2 = to[0] * Math.PI / 180;
  var deltaLat = lat2 - lat1;
  var deltaLon = lon2 - lon1;
  var a = Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon / 2), 2);
  var c = 2 * Math.asin(Math.sqrt(a));
  return c * 6371 * 1000;
};
var convertDistanceToString = function convertDistanceToString(distance) {
  if (distance > 1000) {
    distance = "".concat(precisionRound(distance / 1000, 2), "km");
  } else {
    distance = "".concat(precisionRound(distance, 2), "m");
  }
  return distance;
};
var buildDistanceETA = function buildDistanceETA(distance) {
  var carMinutes = 0;
  var carSeconds = 0;
  if (distance > 50000) {
    // Over 50km, we use average speed of 100kmh
    carMinutes = distance / 100000 * 60;
  } else if (distance > 10000) {
    // Over 10km, we use average speed of 60km/h
    carMinutes = distance / 60000 * 60;
  } else {
    // Under 10km we user average speed of 30km/h
    carMinutes = distance / 30000 * 60;
  }
  carSeconds = carMinutes % 1; // Keep floating value for seconds computing
  carMinutes = Math.floor(carMinutes); // Remove floating value

  if (carMinutes > 60) {
    carMinutes = "".concat(Math.floor(carMinutes / 60), "h ").concat(carMinutes % 60, "m");
  } else {
    carMinutes = "".concat(carMinutes, "m");
  }
  var walkMinutes = distance / 5000 * 60;
  var walkSeconds = walkMinutes % 1;
  walkMinutes = Math.floor(walkMinutes); // Remove floating value

  if (walkMinutes > 60) {
    walkMinutes = "".concat(Math.floor(walkMinutes / 60), "h ").concat(walkMinutes % 60, "m");
  } else {
    walkMinutes = "".concat(walkMinutes, "m");
  }
  return {
    car: "".concat(carMinutes, " ").concat(Math.floor(precisionRound(carSeconds / 100 * 60, 2) * 100), "s"),
    walk: "".concat(walkMinutes, " ").concat(Math.floor(precisionRound(walkSeconds / 100 * 60, 2) * 100), "s")
  };
};
var precisionRound = function precisionRound(value, precision) {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  CCDH_CENTER: {
    LAT: 48.53183906441962,
    LNG: 2.053756713867188
  },
  CCDH_CITIES: ['BRX', 'COR', 'DRD', 'LFR', 'LGR', 'RIC', 'ROV', 'SCD', 'SER', 'STC', 'VSG'],
  MAP_BOUNDS: window.L.latLngBounds(window.L.latLng(48.679400715963894, 1.7390606689453127), window.L.latLng(48.38439074151866, 2.343395996093750)),
  OSM_LAYER: window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19,
    minZoom: 12
  }),
  ESRI_LAYER: window.L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: '&copy; <a href="https://www.arcgis.com/home/item.html?id=10df2279f9684e4a9f6a7f08febac2a9">Esri Imagery</a>',
    maxZoom: 19,
    minZoom: 12
  }),
  getDistanceBetweenCoords: getDistanceBetweenCoords,
  convertDistanceToString: convertDistanceToString,
  buildDistanceETA: buildDistanceETA,
  precisionRound: precisionRound
});

/***/ }),

/***/ "./src/scss/DourdannaisExplore.scss":
/*!******************************************!*\
  !*** ./src/scss/DourdannaisExplore.scss ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


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
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************************!*\
  !*** ./src/js/DourdannaisExplore.js ***!
  \**************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _scss_DourdannaisExplore_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/DourdannaisExplore.scss */ "./src/scss/DourdannaisExplore.scss");
/* harmony import */ var _utils_Map_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/Map.js */ "./src/js/utils/Map.js");
/* harmony import */ var _utils_Utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/Utils.js */ "./src/js/utils/Utils.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }



var DourdannaisExplore = /*#__PURE__*/function () {
  function DourdannaisExplore() {
    _classCallCheck(this, DourdannaisExplore);
    // Map internals
    this._map = null;
    this._layers = {};

    // Data object
    this._data = {};
    this._user = {
      geolocationAllowed: false,
      lat: _utils_Utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].HOME_LAT,
      lng: _utils_Utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].HOME_LNG,
      accuracy: 0,
      marker: null
    };
    this._initGeolocation().then(this._initMap.bind(this)).then(this._initEvents.bind(this)).then(this._fetchMarkers.bind(this)).then(function () {
      console.log('we are done');
    });
    //      .then(this._buildMarkers.bind(this))
    //      .then(this._buildPolygons.bind(this));
  }

  /* Init sequence */
  _createClass(DourdannaisExplore, [{
    key: "_initGeolocation",
    value: function _initGeolocation() {
      var _this = this;
      return new Promise(function (resolve) {
        if ('geolocation' in navigator) {
          // TODO : in next version, make this a pref low/high (toggle)
          var options = {
            enableHighAccuracy: true,
            // More consuption, better position
            maximumAge: 1000,
            // A position will last 1s maximum
            timeout: 900 // A position is updated in 0.9s maximum
          };

          navigator.geolocation.getCurrentPosition(_this._positionInitialized.bind(_this), null, options);
          _this._watchId = navigator.geolocation.watchPosition(_this._positionUpdate.bind(_this), null, options);
        }
        // Don't lock initialization waiting for pos
        resolve();
      });
    }
  }, {
    key: "_initMap",
    value: function _initMap() {
      var _this2 = this;
      return new Promise(function (resolve) {
        _this2._map = new _utils_Map_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
          targetId: 'sarmates-land'
        });
        resolve();
      });
    }
  }, {
    key: "_initEvents",
    value: function _initEvents() {
      var _this3 = this;
      return new Promise(function (resolve) {
        // Listening to modal event
        document.getElementById('modal-overlay').addEventListener('click', _this3.closeModal.bind(_this3));
        resolve();
      });
    }
  }, {
    key: "_fetchMarkers",
    value: function _fetchMarkers() {
      var _this4 = this;
      return new Promise(function (resolve) {
        var promises = [];
        var _loop = function _loop(i) {
          promises.push(new Promise(function (resolveLocal) {
            fetch("./assets/json/".concat(_utils_Utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].CCDH_CITIES[i], ".json")).then(function (data) {
              data.json().then(function (jsonData) {
                _this4._data[_utils_Utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].CCDH_CITIES[i]] = jsonData;
                requestAnimationFrame(function () {
                  _this4._buildPolygons(_this4._data[_utils_Utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].CCDH_CITIES[i]].bounds).then(function () {
                    requestAnimationFrame(function () {
                      _this4._buildMarkers(_this4._data[_utils_Utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].CCDH_CITIES[i]].pois).then(resolveLocal);
                    });
                  });
                });
              })["catch"](resolveLocal);
            })["catch"](resolveLocal);
          }));
        };
        for (var i = 0; i < _utils_Utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].CCDH_CITIES.length; ++i) {
          _loop(i);
        }
        Promise.all(promises).then(resolve);
        /*
              fetch(`./assets/json/MapData.json`).then(data => {
                data.json().then(jsonData => {
                  this._data = jsonData;
                  resolve();
                }).catch(resolve);
              }).catch(resolve);
        */
      });
    }
  }, {
    key: "_buildMarkers",
    value: function _buildMarkers(markers) {
      var _this5 = this;
      return new Promise(function (resolve) {
        var keys = Object.keys(markers);
        for (var i = 0; i < keys.length; ++i) {
          for (var j = 0; j < markers[keys[i]].length; ++j) {
            _this5._map.addMark(markers[keys[i]][j], _this5._createMarkerPopup.bind(_this5));
          }
        }
        resolve();
      });
    }
  }, {
    key: "_buildPolygons",
    value: function _buildPolygons(cityBounds) {
      var _this6 = this;
      return new Promise(function (resolve) {
        _this6._map.addPolygon(cityBounds);
        /*
        const keys = Object.keys(cityBounds);
        for (let i = 0; i < keys.length; ++i) {
          this._map.addPolygon(cityBounds[keys[i]]);
        }
        */
        resolve();
      });
    }

    /* Geoloc callbacks */
  }, {
    key: "_positionInitialized",
    value: function _positionInitialized() {
      this._user.geolocationAllowed = true;
    }
  }, {
    key: "_positionUpdate",
    value: function _positionUpdate(position) {
      // Only if user allowed geolocation;
      // Should never be false when called back
      if (this._user.geolocationAllowed === true) {
        // Update saved user position
        this._user.lat = position.coords.latitude;
        this._user.lng = position.coords.longitude;
        this._user.accuracy = position.coords.accuracy;
        // Only draw marker if map is already created
        if (this._map) {
          this._map.drawUserMarker();
        }
      }
    }

    /* Map Utils */
  }, {
    key: "_createMarkerPopup",
    value: function _createMarkerPopup(opts) {
      var dom = document.createElement('DIV');
      var title = document.createElement('H3');
      var address = document.createElement('I');
      var town = document.createElement('I');
      var phone = document.createElement('A');
      var website = document.createElement('A');
      var info = document.createElement('P');
      var openWith = document.createElement('A');
      dom.classList.add('marker-popup');
      title.innerHTML = opts.name;
      address.innerHTML = opts.address;
      town.innerHTML = opts.town;
      phone.href = "tel:".concat(opts.phone);
      phone.innerHTML = "<img src=\"./assets/img/icon/phone.svg\">".concat(opts.phone);
      website.href = opts.website;
      website.innerHTML = '<img src="./assets/img/icon/web.svg">Consulter le site';
      website.setAttribute('rel', 'noopener noreferrer');
      website.setAttribute('target', '_blank');
      info.innerHTML = opts.info;
      openWith.href = "geo:".concat(opts.lat, ",").concat(opts.lng);
      openWith.innerHTML = '<img src="./assets/img/icon/pin.svg">Ouvrir dans le GPS';
      dom.appendChild(title);
      dom.appendChild(address);
      dom.appendChild(town);
      var button = this._markerOpenedState(opts.timetable);
      dom.appendChild(button);
      var alwaysClosed = true;
      for (var i = 0; i < opts.timetable.length; ++i) {
        if (opts.timetable[i].isOpen === true) {
          alwaysClosed = false;
          break;
        }
      }
      // Allow modal only if poi has timetable and is not always closed
      if (opts.timetable.length > 0 && alwaysClosed === false) {
        button.addEventListener('click', this._timetbaleModal.bind(this, opts));
      }
      if (opts.info !== '') {
        dom.appendChild(info);
      }
      if (opts.phone !== '') {
        dom.appendChild(phone);
      }
      if (opts.website !== '') {
        dom.appendChild(website);
      }
      dom.appendChild(openWith);
      return dom;
    }
  }, {
    key: "_markerOpenedState",
    value: function _markerOpenedState(timetable) {
      var dom = document.createElement('DIV');
      var state = document.createElement('H5');
      var more = document.createElement('I');
      dom.classList.add('marker-opened');
      dom.appendChild(state);
      dom.appendChild(more);
      if (timetable.length) {
        var alwaysClosed = true;
        for (var i = 0; i < timetable.length; ++i) {
          if (timetable[i].isOpen === true) {
            alwaysClosed = false;
            break;
          }
        }
        if (alwaysClosed === true) {
          this._markerIsClosed(dom, true);
        } else {
          this._checkTime(timetable, dom);
          // Update each minutes
          // TODO store interval if to be ready to cancel when other navigation mode available
          setInterval(this._checkTime.bind(this, timetable, dom), 60000);
        }
      } else {
        this._markerIsOpened(dom, true);
      }
      return dom;
    }
  }, {
    key: "_checkTime",
    value: function _checkTime(timetable, dom) {
      var now = new Date();
      var hour = now.getHours();
      var minutes = now.getMinutes();
      if (minutes < 10) {
        minutes = "0".concat(minutes);
      }
      var dayOfWeek = now.getDay() - 1;
      var openingTime = parseInt("".concat(timetable[dayOfWeek].open.h).concat(timetable[dayOfWeek].open.m));
      var closingTime = parseInt("".concat(timetable[dayOfWeek].close.h).concat(timetable[dayOfWeek].close.m));
      var currentTime = parseInt("".concat(hour).concat(minutes));
      // Won't work if timetable open/close hours aren't on the same day
      if (timetable[dayOfWeek].isOpen && isNaN(openingTime)) {
        // 24/7 opening
        this._markerIsOpened(dom, true);
      } else if (timetable[dayOfWeek].isOpen && currentTime >= openingTime && currentTime < closingTime) {
        if (timetable[dayOfWeek]["break"].hasBreak) {
          var breakOpeningTime = parseInt("".concat(timetable[dayOfWeek]["break"].end.h).concat(timetable[dayOfWeek]["break"].end.m));
          var breakClosingTime = parseInt("".concat(timetable[dayOfWeek]["break"].start.h).concat(timetable[dayOfWeek]["break"].start.m));
          if (currentTime >= breakClosingTime && currentTime < breakOpeningTime) {
            this._markerIsClosed(dom);
          } else {
            this._markerIsOpened(dom);
          }
        } else {
          this._markerIsOpened(dom);
        }
      } else {
        this._markerIsClosed(dom);
      }
    }
  }, {
    key: "_markerIsOpened",
    value: function _markerIsOpened(dom, alwaysOpened) {
      dom.firstChild.innerHTML = "Ouvert";
      if (alwaysOpened === true) {
        dom.lastChild.innerHTML = "Toujours ouvert";
      } else {
        dom.lastChild.innerHTML = "Voir les horaires";
      }
      dom.classList.add('opened');
    }
  }, {
    key: "_markerIsClosed",
    value: function _markerIsClosed(dom, alwaysClosed) {
      dom.firstChild.innerHTML = "Ferm\xE9";
      if (alwaysClosed) {
        dom.lastChild.innerHTML = 'Toujours fermé';
      } else {
        dom.lastChild.innerHTML = "Voir les horaires";
      }
      dom.classList.remove('opened');
    }
  }, {
    key: "_timetbaleModal",
    value: function _timetbaleModal(opts) {
      var _this7 = this;
      this.fetchModal('timetablemodal').then(function (dom) {
        // Updating modal header and info
        dom.querySelector('#mark-name').innerHTML = opts.name;
        dom.querySelector('#mark-address').innerHTML = "".concat(opts.address, ", ").concat(opts.town);
        var distance = _utils_Utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].getDistanceBetweenCoords([opts.lat, opts.lng], [_this7._user.lat, _this7._user.lng]);
        dom.querySelector('#mark-distance').innerHTML = "Vous \xE8tes \xE0 environ ".concat(_utils_Utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].convertDistanceToString(distance), " de <b>").concat(opts.name, "</b> \xE0 vol d'oiseau");
        var eta = _utils_Utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].buildDistanceETA(distance);
        dom.querySelector('#mark-eta').innerHTML = "Ce qui repr\xE9sente environ ".concat(eta.car, " en voiture, ou ").concat(eta.walk, " \xE0 pied.");
        dom.querySelector('#mark-state').appendChild(_this7._markerOpenedState(opts.timetable));
        // Now update day by day
        var now = new Date();
        var dayOfWeek = now.getDay() - 1;
        for (var i = 0; i < opts.timetable.length; ++i) {
          var dayDom = dom.querySelector('#timetable').children[i];
          if (opts.timetable[i].isOpen === true) {
            var morning = dayDom.lastElementChild.firstElementChild;
            var afternoon = dayDom.lastElementChild.lastElementChild;
            if (opts.timetable[i]["break"] && opts.timetable[i]["break"].hasBreak === true) {
              morning.innerHTML = "<p>".concat(opts.timetable[i].open.h, ":").concat(opts.timetable[i].open.m, " \u2012 ").concat(opts.timetable[i]["break"].start.h, ":").concat(opts.timetable[i]["break"].start.m, "</p>");
              morning.classList.add('filled'); // Morning
              morning.classList.add('splited'); // Morning
              afternoon.innerHTML = "<p>".concat(opts.timetable[i]["break"].end.h, ":").concat(opts.timetable[i]["break"].end.m, " \u2012 ").concat(opts.timetable[i].close.h, ":").concat(opts.timetable[i].close.m, "</p>");
              afternoon.classList.add('filled'); // Afternoon
              afternoon.classList.add('splited'); // Afternoon
            } else if (opts.timetable[i].open.h && opts.timetable[i].close.h) {
              morning.innerHTML = "<p>".concat(opts.timetable[i].open.h, ":").concat(opts.timetable[i].open.m, "</p>");
              morning.classList.add('filled'); // Morning
              afternoon.innerHTML = "<p>".concat(opts.timetable[i].close.h, ":").concat(opts.timetable[i].close.m, "</p>");
              afternoon.classList.add('filled'); // Afternoon
            } else {
              morning.innerHTML = "<p>00:00</p>";
              morning.classList.add('filled'); // Morning
              afternoon.innerHTML = "<p>24:00</p>";
              afternoon.classList.add('filled'); // Afternoon
            }
          } else {
            dayDom.lastElementChild.innerHTML = "<div class=\"closed\"><p>Ferm\xE9</p></div>";
          }
          // Matching today's day
          if (i === dayOfWeek) {
            dayDom.classList.add('today');
          }
        }
        document.getElementById('modal-overlay').appendChild(dom);
        document.getElementById('modal-overlay').style.display = 'flex';
        setTimeout(function () {
          return document.getElementById('modal-overlay').style.opacity = 1;
        }, 50);
      });
    }

    /* Search modal methods */

    /*
      _searchModal() {
        this._fetchModal('searchmodal').then(dom => {
          const keys = Object.keys(this._marks);
          for (let i = 0; i < keys.length; ++i) {
            dom.firstElementChild.appendChild(this._createMarkCategorySearchIcon(keys[i]));
          }
          document.getElementById('modal-overlay').appendChild(dom);
          document.getElementById('modal-overlay').style.display = 'flex';
    			setTimeout(() => document.getElementById('modal-overlay').style.opacity = 1, 50);
        });
      }
    
    
      _createMarkCategorySearchIcon(type) {
        const dom = document.createElement('DIV');
        const img = document.createElement('IMG');
        const label = document.createElement('P');
        dom.classList.add('filtering-element');
        img.src = `/assets/img/marker/${type}.svg`;
        label.innerHTML = type;
        dom.appendChild(img);
        dom.appendChild(label);
        return dom;
      }
    */

    /* Modal methods */
  }, {
    key: "fetchModal",
    value: function fetchModal(url) {
      return new Promise(function (resolve) {
        fetch("./assets/html/".concat(url, ".html")).then(function (data) {
          data.text().then(function (html) {
            resolve(document.createRange().createContextualFragment(html));
          });
        });
      });
    }
  }, {
    key: "closeModal",
    value: function closeModal(event, force) {
      if (force === true || event.target.id === 'modal-overlay' || event.target.id.indexOf('close') !== -1) {
        document.getElementById('modal-overlay').style.opacity = 0;
        setTimeout(function () {
          document.getElementById('modal-overlay').style.display = 'none';
          document.getElementById('modal-overlay').innerHTML = '';
        }, 300);
      }
    }
  }, {
    key: "user",
    get: function get() {
      return this._user;
    }
  }]);
  return DourdannaisExplore;
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DourdannaisExplore);
})();

window.DourdannaisExplore = __webpack_exports__["default"];
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGRSxNQUFNLEVBQUUsSUFBSS9ELE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lBQ3hCQyxPQUFPLEVBQUUsOEJBQThCO0lBQ3ZDQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xCQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BCQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGRyxPQUFPLEVBQUUsSUFBSWhFLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lBQ3pCQyxPQUFPLEVBQUUsK0JBQStCO0lBQ3hDQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xCQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BCQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGSSxJQUFJLEVBQUUsSUFBSWpFLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lBQ3RCQyxPQUFPLEVBQUUsNEJBQTRCO0lBQ3JDQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xCQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BCQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGSyxLQUFLLEVBQUUsSUFBSWxFLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lBQ3ZCQyxPQUFPLEVBQUUsNkJBQTZCO0lBQ3RDQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xCQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BCQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGTSxRQUFRLEVBQUUsSUFBSW5FLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lBQzFCQyxPQUFPLEVBQUUsZ0NBQWdDO0lBQ3pDQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xCQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BCQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGTyxLQUFLLEVBQUUsSUFBSXBFLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lBQ3ZCQyxPQUFPLEVBQUUsNkJBQTZCO0lBQ3RDQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xCQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BCQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGUSxNQUFNLEVBQUUsSUFBSXJFLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lBQ3hCQyxPQUFPLEVBQUUsOEJBQThCO0lBQ3ZDQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xCQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BCQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGUyxNQUFNLEVBQUUsSUFBSXRFLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lBQ3hCQyxPQUFPLEVBQUUsNkJBQTZCO0lBQ3RDQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xCQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BCQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGVSxJQUFJLEVBQUUsSUFBSXZFLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lBQ3RCQyxPQUFPLEVBQUUsNEJBQTRCO0lBQ3JDQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xCQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BCQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGVyxRQUFRLEVBQUUsSUFBSXhFLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lBQzFCQyxPQUFPLEVBQUUsZ0NBQWdDO0lBQ3pDQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xCQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BCQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGWSxNQUFNLEVBQUUsSUFBSXpFLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lBQ3hCQyxPQUFPLEVBQUUsOEJBQThCO0lBQ3ZDQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xCQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BCQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGYSxNQUFNLEVBQUUsSUFBSTFFLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lBQ3hCQyxPQUFPLEVBQUUsOEJBQThCO0lBQ3ZDQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xCQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BCQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGYyxNQUFNLEVBQUUsSUFBSTNFLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lBQ3hCQyxPQUFPLEVBQUUsOEJBQThCO0lBQ3ZDQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xCQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BCQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGZSxHQUFHLEVBQUUsSUFBSTVFLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lB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LEtBQUssRUFBRUMsS0FBSyxFQUFFO01BQ3pCLElBQUlBLEtBQUssS0FBSyxJQUFJLElBQUlELEtBQUssQ0FBQ0UsTUFBTSxDQUFDQyxFQUFFLEtBQUssZUFBZSxJQUFJSCxLQUFLLENBQUNFLE1BQU0sQ0FBQ0MsRUFBRSxDQUFDQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDbEd6RyxRQUFRLENBQUNDLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQzJGLEtBQUssQ0FBQ0csT0FBTyxHQUFHLENBQUM7UUFDMURELFVBQVUsQ0FBQyxZQUFNO1VBQ2Y5RixRQUFRLENBQUNDLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQzJGLEtBQUssQ0FBQ0MsT0FBTyxHQUFHLE1BQU07VUFDL0Q3RixRQUFRLENBQUNDLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQ3NDLFNBQVMsR0FBRyxFQUFFO1FBQ3pELENBQUMsRUFBRSxHQUFHLENBQUM7TUFDVDtJQUNGO0VBQUM7SUFBQTlMLEdBQUE7SUFBQWlRLEdBQUEsRUFHRCxTQUFBQSxJQUFBLEVBQVc7TUFDVCxPQUFPLElBQUksQ0FBQ2pJLEtBQUs7SUFDbkI7RUFBQztFQUFBLE9BQUFGLGtCQUFBO0FBQUE7QUFLSCxpRUFBZUEsa0JBQWtCLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Eb3VyZGFubmFpc0V4cGxvcmUvLi9zcmMvanMvdXRpbHMvTWFwLmpzIiwid2VicGFjazovL0RvdXJkYW5uYWlzRXhwbG9yZS8uL3NyYy9qcy91dGlscy9NYXJrZXJFbnVtLmpzIiwid2VicGFjazovL0RvdXJkYW5uYWlzRXhwbG9yZS8uL3NyYy9qcy91dGlscy9VdGlscy5qcyIsIndlYnBhY2s6Ly9Eb3VyZGFubmFpc0V4cGxvcmUvLi9zcmMvc2Nzcy9Eb3VyZGFubmFpc0V4cGxvcmUuc2NzcyIsIndlYnBhY2s6Ly9Eb3VyZGFubmFpc0V4cGxvcmUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vRG91cmRhbm5haXNFeHBsb3JlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9Eb3VyZGFubmFpc0V4cGxvcmUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9Eb3VyZGFubmFpc0V4cGxvcmUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9Eb3VyZGFubmFpc0V4cGxvcmUvLi9zcmMvanMvRG91cmRhbm5haXNFeHBsb3JlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBNYXJrZXJzIGZyb20gJy4vTWFya2VyRW51bS5qcyc7XHJcbmltcG9ydCBVdGlscyBmcm9tICcuL1V0aWxzLmpzJztcclxuXHJcblxyXG5jbGFzcyBNYXAge1xyXG5cclxuXHJcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xyXG4gICAgdGhpcy5faWQgPSBvcHRpb25zLnRhcmdldElkO1xyXG4gICAgdGhpcy5fbWFwID0gbnVsbDtcclxuICAgIHRoaXMuX21hcmtzID0ge307XHJcbiAgICB0aGlzLl9wb2x5Z29ucyA9IFtdO1xyXG4gICAgdGhpcy5fbGF5ZXJzID0ge1xyXG4gICAgICBDYXJ0ZTogbnVsbCxcclxuICAgICAgU2F0ZWxsaXRlOiBudWxsXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuX2luaXQoKTtcclxuICAgIHRoaXMuX2V2ZW50cygpO1xyXG4gIH1cclxuXHJcblxyXG4gIF9pbml0KCkge1xyXG4gICAgLy8gVXNlIG1haW4gZGl2IHRvIGluamVjdCBPU00gaW50b1xyXG4gICAgdGhpcy5fbWFwID0gd2luZG93LkwubWFwKHRoaXMuX2lkLCB7XHJcbiAgICAgIHpvb21Db250cm9sOiBmYWxzZSxcclxuICAgIH0pLnNldFZpZXcoW1V0aWxzLkNDREhfQ0VOVEVSLkxBVCwgVXRpbHMuQ0NESF9DRU5URVIuTE5HXSwgMTIpO1xyXG4gICAgLy8gQWRkIG1ldGVyIGFuZCBmZWV0IHNjYWxlIG9uIG1hcFxyXG4gICAgd2luZG93LkwuY29udHJvbC5zY2FsZSgpLmFkZFRvKHRoaXMuX21hcCk7XHJcbiAgICAvLyBQcmV2ZW50IHBhbm5pbmcgb3V0c2lkZSBvZiB0aGUgbWFwIGJvdW5kcyBkZWZpbmluZWQgaW4gdXRpbHNcclxuICAgIHRoaXMuX21hcC5zZXRNYXhCb3VuZHMoVXRpbHMuTUFQX0JPVU5EUyk7XHJcbiAgICAvLyBBZGQgbGF5ZXIgZ3JvdXAgdG8gaW50ZXJmYWNlIGFuZCBzdGFydCBtYXAgd2l0aCBvc20gZGVmYXVsdFxyXG4gICAgdGhpcy5fbGF5ZXJzLkNhcnRlID0gVXRpbHMuT1NNX0xBWUVSO1xyXG4gICAgdGhpcy5fbGF5ZXJzLlNhdGVsbGl0ZSA9IFV0aWxzLkVTUklfTEFZRVI7XHJcbiAgICB0aGlzLl9sYXllcnMuQ2FydGUuYWRkVG8odGhpcy5fbWFwKTtcclxuICAgIC8vIEFkZCBsYXllciBzd2l0Y2ggcmFkaW8gb24gYm90dG9tIHJpZ2h0IG9mIHRoZSBtYXBcclxuICAgIHdpbmRvdy5MLmNvbnRyb2wubGF5ZXJzKHRoaXMuX2xheWVycywge30sIHsgcG9zaXRpb246ICdib3R0b21yaWdodCcgfSkuYWRkVG8odGhpcy5fbWFwKTtcclxuICB9XHJcblxyXG5cclxuICBfZXZlbnRzKCkge1xyXG4gICAgLy8gU3Vic2NyaWJlIHRvIGNsaWNrIGV2ZW50IG9uIG1hcCB0byByZWFjdFxyXG4gICAgdGhpcy5fbWFwLm9uKCdjbGljaycsIHRoaXMuX21hcENsaWNrZWQuYmluZCh0aGlzKSk7XHJcbiAgICAvLyBNYXAgaXMgZHJhZ2dlZCBieSB1c2VyIG1vdXNlL2ZpbmdlclxyXG4gICAgdGhpcy5fbWFwLm9uKCdkcmFnJywgKCkgPT4ge1xyXG4gICAgICAvLyBDb25zdHJhaW4gcGFuIHRvIHRoZSBtYXAgYm91bmRzXHJcbiAgICAgIHRoaXMuX21hcC5wYW5JbnNpZGVCb3VuZHMoVXRpbHMuTUFQX0JPVU5EUywgeyBhbmltYXRlOiB0cnVlIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgX21hcENsaWNrZWQob3B0cykge1xyXG4gICAgY29uc29sZS5sb2cob3B0cy5sYXRsbmcsIEpTT04uc3RyaW5naWZ5KG9wdHMubGF0bG5nLmxhdCArICcsICcgKyBvcHRzLmxhdGxuZy5sbmcpKTtcclxuICB9XHJcblxyXG5cclxuICBkcmF3VXNlck1hcmtlcigpIHtcclxuICAgIGlmICghd2luZG93LmR4LnVzZXIubWFya2VyKSB7XHJcbiAgICAgIHdpbmRvdy5keC51c2VyLm1hcmtlciA9IHdpbmRvdy5MLm1hcmtlcihbd2luZG93LmR4LnVzZXIubGF0LCB3aW5kb3cuZHgudXNlci5sbmddLCB7XHJcbiAgICAgICAgaWNvbjogTWFya2Vycy51c2VyXHJcbiAgICAgIH0pO1xyXG4gICAgICB3aW5kb3cuZHgudXNlci5tYXJrZXIuYWRkVG8odGhpcy5fbWFwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHdpbmRvdy5keC51c2VyLm1hcmtlci5zZXRMYXRMbmcod2luZG93LmR4LnVzZXIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIGFkZE1hcmsob3B0cywgY3JlYXRlUG9wdXApIHtcclxuICAgIGxldCB0eXBlcyA9IG9wdHMudHlwZS5zcGxpdCgnLycpO1xyXG4gICAgbGV0IHR5cGUgPSBvcHRzLnR5cGU7XHJcbiAgICBpZiAodHlwZXMubGVuZ3RoID4gMSkge1xyXG4gICAgICB0eXBlID0gYCR7dHlwZXNbMF19JHt0eXBlc1sxXX1gO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG1hcmtlciA9IHdpbmRvdy5MLm1hcmtlcihbb3B0cy5sYXQsIG9wdHMubG5nXSwgeyBcclxuICAgICAgaWNvbjogTWFya2Vyc1t0eXBlXVxyXG4gICAgfSkub24oJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLl9tYXAuZmx5VG8oW29wdHMubGF0LCBvcHRzLmxuZ10sIDE4KTtcclxuICAgIH0pO1xyXG5cclxuICAgIG1hcmtlci5iaW5kUG9wdXAoY3JlYXRlUG9wdXAob3B0cykpO1xyXG4gICAgbWFya2VyLmFkZFRvKHRoaXMuX21hcCk7XHJcbiAgICBpZiAodHlwZXMubGVuZ3RoID4gMSkge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHR5cGVzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9tYXJrc1t0eXBlc1tpXV0pIHtcclxuICAgICAgICAgIHRoaXMuX21hcmtzW3R5cGVzW2ldXSA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9tYXJrc1t0eXBlc1tpXV0ucHVzaChtYXJrZXIpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoIXRoaXMuX21hcmtzW3R5cGVdKSB7XHJcbiAgICAgICAgdGhpcy5fbWFya3NbdHlwZV0gPSBbXTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLl9tYXJrc1t0eXBlXS5wdXNoKG1hcmtlcik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcbiAgYWRkUG9seWdvbihwb2x5Z29uKSB7XHJcbiAgICB0aGlzLl9wb2x5Z29ucy5wdXNoKHdpbmRvdy5MLnBvbHlnb24ocG9seWdvbikuYWRkVG8odGhpcy5fbWFwKSk7XHJcbiAgfVxyXG5cclxuXHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBNYXA7XHJcbiIsImV4cG9ydCBkZWZhdWx0IE9iamVjdC5mcmVlemUoe1xyXG4gIHJlc3RhdXJhbnQ6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9yZXN0YXVyYW50LnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBiYXI6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9iYXIuc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIGNlbGxhcjogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL2NlbGxhci5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgZ3JvY2VyeTogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL2dyb2Nlcnkuc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIGZvb3Q6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9mb290LnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBydWdieTogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL3J1Z2J5LnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBwaW5ncG9uZzogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL3Bpbmdwb25nLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBib2NjZTogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL2JvY2NlLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICB0ZW5uaXM6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci90ZW5uaXMuc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIGJha2VyeTogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL2JyZWFkLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBib29rOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvYm9vay5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgbGFuZG1hcms6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9sYW5kbWFyay5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgY2FzdGxlOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvY2FzdGxlLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBjaHVyY2g6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9jaHVyY2guc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIGdhcmRlbjogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL2dhcmRlbi5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgY2FyOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvY2FyLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICB0cmFpbjogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL3RyYWluLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBhbmltYWw6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9hbmltYWwuc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIGRlbnRhbDogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL2RlbnRhbC5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgcGhhcm1hY3k6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9waGFybWFjeS5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgbWFpbDogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21haWwuc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIHBhcms6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9wYXJrLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICByZWN5Y2xlOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvcmVjeWNsZS5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgYWRtaW5pc3RyYXRpb246IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9hZG1pbmlzdHJhdGlvbi5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgc2Nob29sOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvc2Nob29sLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICB1c2VyOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvdXNlci5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF1cclxuICB9KVxyXG59KTtcclxuIiwiY29uc3QgZ2V0RGlzdGFuY2VCZXR3ZWVuQ29vcmRzID0gKGZyb20sIHRvKSA9PiB7XHJcbiAgLy8gUmV0dXJuIGRpc3RhbmNlIGluIG1ldGVyc1xyXG4gIGNvbnN0IGxvbjEgPSAoZnJvbVsxXSAqIE1hdGguUEkpIC8gMTgwLFxyXG4gICAgbGF0MSA9IChmcm9tWzBdICogTWF0aC5QSSkgLyAxODAsXHJcbiAgICBsb24yID0gKHRvWzFdICogTWF0aC5QSSkgLyAxODAsXHJcbiAgICBsYXQyID0gKHRvWzBdICogTWF0aC5QSSkgLyAxODA7XHJcblxyXG4gIGNvbnN0IGRlbHRhTGF0ID0gbGF0MiAtIGxhdDE7XHJcbiAgY29uc3QgZGVsdGFMb24gPSBsb24yIC0gbG9uMTtcclxuXHJcbiAgY29uc3QgYSA9IE1hdGgucG93KE1hdGguc2luKGRlbHRhTGF0IC8gMiksIDIpICsgTWF0aC5jb3MobGF0MSkgKiBNYXRoLmNvcyhsYXQyKSAqIE1hdGgucG93KE1hdGguc2luKGRlbHRhTG9uIC8gMiksIDIpO1xyXG4gIGNvbnN0IGMgPSAyICogTWF0aC5hc2luKE1hdGguc3FydChhKSk7XHJcbiAgcmV0dXJuIGMgKiA2MzcxICogMTAwMDtcclxufTtcclxuXHJcblxyXG5jb25zdCBjb252ZXJ0RGlzdGFuY2VUb1N0cmluZyA9IGRpc3RhbmNlID0+IHtcclxuICBpZiAoZGlzdGFuY2UgPiAxMDAwKSB7XHJcbiAgICBkaXN0YW5jZSA9IGAke3ByZWNpc2lvblJvdW5kKGRpc3RhbmNlIC8gMTAwMCwgMil9a21gO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBkaXN0YW5jZSA9IGAke3ByZWNpc2lvblJvdW5kKGRpc3RhbmNlLCAyKX1tYDtcclxuICB9XHJcbiAgcmV0dXJuIGRpc3RhbmNlO1xyXG59O1xyXG5cclxuXHJcbmNvbnN0IGJ1aWxkRGlzdGFuY2VFVEEgPSBkaXN0YW5jZSA9PiB7XHJcbiAgbGV0IGNhck1pbnV0ZXMgPSAwO1xyXG4gIGxldCBjYXJTZWNvbmRzID0gMDtcclxuXHJcbiAgaWYgKGRpc3RhbmNlID4gNTAwMDApIHtcclxuICAgIC8vIE92ZXIgNTBrbSwgd2UgdXNlIGF2ZXJhZ2Ugc3BlZWQgb2YgMTAwa21oXHJcbiAgICBjYXJNaW51dGVzID0gKGRpc3RhbmNlIC8gMTAwMDAwKSAqIDYwO1xyXG4gIH0gZWxzZSBpZiAoZGlzdGFuY2UgPiAxMDAwMCkge1xyXG4gICAgLy8gT3ZlciAxMGttLCB3ZSB1c2UgYXZlcmFnZSBzcGVlZCBvZiA2MGttL2hcclxuICAgIGNhck1pbnV0ZXMgPSAoZGlzdGFuY2UgLyA2MDAwMCkgKiA2MDtcclxuICB9IGVsc2Uge1xyXG4gICAgLy8gVW5kZXIgMTBrbSB3ZSB1c2VyIGF2ZXJhZ2Ugc3BlZWQgb2YgMzBrbS9oXHJcbiAgICBjYXJNaW51dGVzID0gKGRpc3RhbmNlIC8gMzAwMDApICogNjA7XHJcbiAgfVxyXG5cclxuICBjYXJTZWNvbmRzID0gY2FyTWludXRlcyAlIDE7IC8vIEtlZXAgZmxvYXRpbmcgdmFsdWUgZm9yIHNlY29uZHMgY29tcHV0aW5nXHJcbiAgY2FyTWludXRlcyA9IE1hdGguZmxvb3IoY2FyTWludXRlcyk7IC8vIFJlbW92ZSBmbG9hdGluZyB2YWx1ZVxyXG5cclxuICBpZiAoY2FyTWludXRlcyA+IDYwKSB7XHJcbiAgICBjYXJNaW51dGVzID0gYCR7TWF0aC5mbG9vcihjYXJNaW51dGVzIC8gNjApfWggJHtjYXJNaW51dGVzICUgNjB9bWA7XHJcbiAgfSBlbHNlIHtcclxuICAgIGNhck1pbnV0ZXMgPSBgJHtjYXJNaW51dGVzfW1gO1xyXG4gIH1cclxuXHJcbiAgbGV0IHdhbGtNaW51dGVzID0gKGRpc3RhbmNlIC8gNTAwMCkgKiA2MDtcclxuICBsZXQgd2Fsa1NlY29uZHMgPSB3YWxrTWludXRlcyAlIDE7XHJcbiAgd2Fsa01pbnV0ZXMgPSBNYXRoLmZsb29yKHdhbGtNaW51dGVzKTsgLy8gUmVtb3ZlIGZsb2F0aW5nIHZhbHVlXHJcblxyXG4gIGlmICh3YWxrTWludXRlcyA+IDYwKSB7XHJcbiAgICB3YWxrTWludXRlcyA9IGAke01hdGguZmxvb3Iod2Fsa01pbnV0ZXMgLyA2MCl9aCAke3dhbGtNaW51dGVzICUgNjB9bWA7XHJcbiAgfSBlbHNlIHtcclxuICAgIHdhbGtNaW51dGVzID0gYCR7d2Fsa01pbnV0ZXN9bWA7XHJcbiAgfSAgXHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBjYXI6IGAke2Nhck1pbnV0ZXN9ICR7TWF0aC5mbG9vcihwcmVjaXNpb25Sb3VuZCgoY2FyU2Vjb25kcyAvIDEwMCkgKiA2MCwgMikgKiAxMDApfXNgLFxyXG4gICAgd2FsazogYCR7d2Fsa01pbnV0ZXN9ICR7TWF0aC5mbG9vcihwcmVjaXNpb25Sb3VuZCgod2Fsa1NlY29uZHMgLyAxMDApICogNjAsIDIpICogMTAwKX1zYCxcclxuICB9O1xyXG59O1xyXG5cclxuXHJcbmNvbnN0IHByZWNpc2lvblJvdW5kID0gKHZhbHVlLCBwcmVjaXNpb24pID0+IHtcclxuICBjb25zdCBtdWx0aXBsaWVyID0gTWF0aC5wb3coMTAsIHByZWNpc2lvbiB8fCAwKTtcclxuICByZXR1cm4gTWF0aC5yb3VuZCh2YWx1ZSAqIG11bHRpcGxpZXIpIC8gbXVsdGlwbGllcjtcclxufTtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgQ0NESF9DRU5URVI6IHtcclxuICAgIExBVDogNDguNTMxODM5MDY0NDE5NjIsXHJcbiAgICBMTkc6IDIuMDUzNzU2NzEzODY3MTg4XHJcbiAgfSxcclxuICBDQ0RIX0NJVElFUzogWydCUlgnLCAnQ09SJywgJ0RSRCcsICdMRlInLCAnTEdSJywgJ1JJQycsICdST1YnLCAnU0NEJywgJ1NFUicsICdTVEMnLCAnVlNHJ10sXHJcbiAgTUFQX0JPVU5EUzogd2luZG93LkwubGF0TG5nQm91bmRzKFxyXG4gICAgd2luZG93LkwubGF0TG5nKDQ4LjY3OTQwMDcxNTk2Mzg5NCwgMS43MzkwNjA2Njg5NDUzMTI3KSxcclxuICAgIHdpbmRvdy5MLmxhdExuZyg0OC4zODQzOTA3NDE1MTg2NiwgMi4zNDMzOTU5OTYwOTM3NTApXHJcbiAgKSxcclxuICBPU01fTEFZRVI6IHdpbmRvdy5MLnRpbGVMYXllcignaHR0cHM6Ly97c30udGlsZS5vcGVuc3RyZWV0bWFwLm9yZy97en0ve3h9L3t5fS5wbmcnLCB7XHJcbiAgICBhdHRyaWJ1dGlvbjogJyZjb3B5OyA8YSBocmVmPVwiaHR0cHM6Ly93d3cub3BlbnN0cmVldG1hcC5vcmcvY29weXJpZ2h0XCI+T3BlblN0cmVldE1hcDwvYT4nLFxyXG4gICAgbWF4Wm9vbTogMTksXHJcbiAgICBtaW5ab29tOiAxMlxyXG4gIH0pLFxyXG4gIEVTUklfTEFZRVI6IHdpbmRvdy5MLnRpbGVMYXllcignaHR0cHM6Ly9zZXJ2ZXIuYXJjZ2lzb25saW5lLmNvbS9BcmNHSVMvcmVzdC9zZXJ2aWNlcy9Xb3JsZF9JbWFnZXJ5L01hcFNlcnZlci90aWxlL3t6fS97eX0ve3h9Jywge1xyXG4gICAgYXR0cmlidXRpb246ICcmY29weTsgPGEgaHJlZj1cImh0dHBzOi8vd3d3LmFyY2dpcy5jb20vaG9tZS9pdGVtLmh0bWw/aWQ9MTBkZjIyNzlmOTY4NGU0YTlmNmE3ZjA4ZmViYWMyYTlcIj5Fc3JpIEltYWdlcnk8L2E+JyxcclxuICAgIG1heFpvb206IDE5LFxyXG4gICAgbWluWm9vbTogMTJcclxuICB9KSxcclxuICBnZXREaXN0YW5jZUJldHdlZW5Db29yZHM6IGdldERpc3RhbmNlQmV0d2VlbkNvb3JkcyxcclxuICBjb252ZXJ0RGlzdGFuY2VUb1N0cmluZzogY29udmVydERpc3RhbmNlVG9TdHJpbmcsXHJcbiAgYnVpbGREaXN0YW5jZUVUQTogYnVpbGREaXN0YW5jZUVUQSxcclxuICBwcmVjaXNpb25Sb3VuZDogcHJlY2lzaW9uUm91bmRcclxufTtcclxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgJy4uL3Njc3MvRG91cmRhbm5haXNFeHBsb3JlLnNjc3MnO1xyXG5pbXBvcnQgTWFwIGZyb20gJy4vdXRpbHMvTWFwLmpzJztcclxuaW1wb3J0IFV0aWxzIGZyb20gJy4vdXRpbHMvVXRpbHMuanMnO1xyXG5cclxuXHJcbmNsYXNzIERvdXJkYW5uYWlzRXhwbG9yZSB7XHJcblxyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIC8vIE1hcCBpbnRlcm5hbHNcclxuICAgIHRoaXMuX21hcCA9IG51bGw7XHJcbiAgICB0aGlzLl9sYXllcnMgPSB7fTtcclxuXHJcbiAgICAvLyBEYXRhIG9iamVjdFxyXG4gICAgdGhpcy5fZGF0YSA9IHt9O1xyXG5cclxuICAgIHRoaXMuX3VzZXIgPSB7XHJcbiAgICAgIGdlb2xvY2F0aW9uQWxsb3dlZDogZmFsc2UsXHJcbiAgICAgIGxhdDogVXRpbHMuSE9NRV9MQVQsXHJcbiAgICAgIGxuZzogVXRpbHMuSE9NRV9MTkcsXHJcbiAgICAgIGFjY3VyYWN5OiAwLFxyXG4gICAgICBtYXJrZXI6IG51bGxcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5faW5pdEdlb2xvY2F0aW9uKClcclxuICAgICAgLnRoZW4odGhpcy5faW5pdE1hcC5iaW5kKHRoaXMpKVxyXG4gICAgICAudGhlbih0aGlzLl9pbml0RXZlbnRzLmJpbmQodGhpcykpXHJcbiAgICAgIC50aGVuKHRoaXMuX2ZldGNoTWFya2Vycy5iaW5kKHRoaXMpKVxyXG4gICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3dlIGFyZSBkb25lJylcclxuICAgICAgfSk7XHJcbi8vICAgICAgLnRoZW4odGhpcy5fYnVpbGRNYXJrZXJzLmJpbmQodGhpcykpXHJcbi8vICAgICAgLnRoZW4odGhpcy5fYnVpbGRQb2x5Z29ucy5iaW5kKHRoaXMpKTtcclxuICB9XHJcblxyXG5cclxuICAvKiBJbml0IHNlcXVlbmNlICovXHJcblxyXG5cclxuICBfaW5pdEdlb2xvY2F0aW9uKCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xyXG5cdFx0XHRpZiAoJ2dlb2xvY2F0aW9uJyBpbiBuYXZpZ2F0b3IpIHtcclxuICAgICAgICAvLyBUT0RPIDogaW4gbmV4dCB2ZXJzaW9uLCBtYWtlIHRoaXMgYSBwcmVmIGxvdy9oaWdoICh0b2dnbGUpXHJcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgICAgIGVuYWJsZUhpZ2hBY2N1cmFjeTogdHJ1ZSwgLy8gTW9yZSBjb25zdXB0aW9uLCBiZXR0ZXIgcG9zaXRpb25cclxuICAgICAgICAgIG1heGltdW1BZ2U6IDEwMDAsIC8vIEEgcG9zaXRpb24gd2lsbCBsYXN0IDFzIG1heGltdW1cclxuICAgICAgICAgIHRpbWVvdXQ6IDkwMCwgLy8gQSBwb3NpdGlvbiBpcyB1cGRhdGVkIGluIDAuOXMgbWF4aW11bVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbih0aGlzLl9wb3NpdGlvbkluaXRpYWxpemVkLmJpbmQodGhpcyksIG51bGwsIG9wdGlvbnMpO1xyXG5cdFx0XHRcdHRoaXMuX3dhdGNoSWQgPSBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24ud2F0Y2hQb3NpdGlvbih0aGlzLl9wb3NpdGlvblVwZGF0ZS5iaW5kKHRoaXMpLCBudWxsLCBvcHRpb25zKTtcclxuICAgICAgfVxyXG4gICAgICAvLyBEb24ndCBsb2NrIGluaXRpYWxpemF0aW9uIHdhaXRpbmcgZm9yIHBvc1xyXG4gICAgICByZXNvbHZlKCk7XHJcblx0XHR9KTtcclxuICB9XHJcblxyXG5cclxuICBfaW5pdE1hcCgpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuICAgICAgdGhpcy5fbWFwID0gbmV3IE1hcCh7XHJcbiAgICAgICAgdGFyZ2V0SWQ6ICdzYXJtYXRlcy1sYW5kJ1xyXG4gICAgICB9KTtcclxuICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgX2luaXRFdmVudHMoKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICAgIC8vIExpc3RlbmluZyB0byBtb2RhbCBldmVudFxyXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWwtb3ZlcmxheScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5jbG9zZU1vZGFsLmJpbmQodGhpcykpO1xyXG4gICAgICByZXNvbHZlKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG5cclxuICBfZmV0Y2hNYXJrZXJzKCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xyXG4gICAgICBjb25zdCBwcm9taXNlcyA9IFtdO1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IFV0aWxzLkNDREhfQ0lUSUVTLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgcHJvbWlzZXMucHVzaChuZXcgUHJvbWlzZShyZXNvbHZlTG9jYWwgPT4ge1xyXG4gICAgICAgICAgZmV0Y2goYC4vYXNzZXRzL2pzb24vJHtVdGlscy5DQ0RIX0NJVElFU1tpXX0uanNvbmApLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGRhdGEuanNvbigpLnRoZW4oanNvbkRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgIHRoaXMuX2RhdGFbVXRpbHMuQ0NESF9DSVRJRVNbaV1dID0ganNvbkRhdGE7XHJcbiAgICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2J1aWxkUG9seWdvbnModGhpcy5fZGF0YVtVdGlscy5DQ0RIX0NJVElFU1tpXV0uYm91bmRzKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9idWlsZE1hcmtlcnModGhpcy5fZGF0YVtVdGlscy5DQ0RIX0NJVElFU1tpXV0ucG9pcykudGhlbihyZXNvbHZlTG9jYWwpO1xyXG4gICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKHJlc29sdmVMb2NhbCk7XHJcbiAgICAgICAgICB9KS5jYXRjaChyZXNvbHZlTG9jYWwpO1xyXG4gICAgICAgIH0pKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4ocmVzb2x2ZSk7XHJcbi8qXHJcbiAgICAgIGZldGNoKGAuL2Fzc2V0cy9qc29uL01hcERhdGEuanNvbmApLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgZGF0YS5qc29uKCkudGhlbihqc29uRGF0YSA9PiB7XHJcbiAgICAgICAgICB0aGlzLl9kYXRhID0ganNvbkRhdGE7XHJcbiAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgfSkuY2F0Y2gocmVzb2x2ZSk7XHJcbiAgICAgIH0pLmNhdGNoKHJlc29sdmUpO1xyXG4qL1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgX2J1aWxkTWFya2VycyhtYXJrZXJzKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhtYXJrZXJzKTtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBtYXJrZXJzW2tleXNbaV1dLmxlbmd0aDsgKytqKSB7XHJcbiAgICAgICAgICB0aGlzLl9tYXAuYWRkTWFyayhtYXJrZXJzW2tleXNbaV1dW2pdLCB0aGlzLl9jcmVhdGVNYXJrZXJQb3B1cC5iaW5kKHRoaXMpKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgX2J1aWxkUG9seWdvbnMoY2l0eUJvdW5kcykge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xyXG4gICAgICB0aGlzLl9tYXAuYWRkUG9seWdvbihjaXR5Qm91bmRzKTtcclxuICAgICAgLypcclxuICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGNpdHlCb3VuZHMpO1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICB0aGlzLl9tYXAuYWRkUG9seWdvbihjaXR5Qm91bmRzW2tleXNbaV1dKTtcclxuICAgICAgfVxyXG4gICAgICAqL1xyXG4gICAgICByZXNvbHZlKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG5cclxuICAvKiBHZW9sb2MgY2FsbGJhY2tzICovXHJcblxyXG5cclxuICBfcG9zaXRpb25Jbml0aWFsaXplZCgpIHtcclxuICAgIHRoaXMuX3VzZXIuZ2VvbG9jYXRpb25BbGxvd2VkID0gdHJ1ZTtcclxuICB9XHJcblxyXG5cclxuICBfcG9zaXRpb25VcGRhdGUocG9zaXRpb24pIHtcclxuICAgIC8vIE9ubHkgaWYgdXNlciBhbGxvd2VkIGdlb2xvY2F0aW9uO1xyXG4gICAgLy8gU2hvdWxkIG5ldmVyIGJlIGZhbHNlIHdoZW4gY2FsbGVkIGJhY2tcclxuICAgIGlmICh0aGlzLl91c2VyLmdlb2xvY2F0aW9uQWxsb3dlZCA9PT0gdHJ1ZSkge1xyXG4gICAgICAvLyBVcGRhdGUgc2F2ZWQgdXNlciBwb3NpdGlvblxyXG4gICAgICB0aGlzLl91c2VyLmxhdCA9IHBvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZTtcclxuICAgICAgdGhpcy5fdXNlci5sbmcgPSBwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlO1xyXG4gICAgICB0aGlzLl91c2VyLmFjY3VyYWN5ID0gcG9zaXRpb24uY29vcmRzLmFjY3VyYWN5O1xyXG4gICAgICAvLyBPbmx5IGRyYXcgbWFya2VyIGlmIG1hcCBpcyBhbHJlYWR5IGNyZWF0ZWRcclxuICAgICAgaWYgKHRoaXMuX21hcCkge1xyXG4gICAgICAgIHRoaXMuX21hcC5kcmF3VXNlck1hcmtlcigpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcbiAgLyogTWFwIFV0aWxzICovXHJcblxyXG5cclxuICBfY3JlYXRlTWFya2VyUG9wdXAob3B0cykge1xyXG4gICAgY29uc3QgZG9tID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XHJcbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0gzJyk7XHJcbiAgICBjb25zdCBhZGRyZXNzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnSScpO1xyXG4gICAgY29uc3QgdG93biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0knKTtcclxuICAgIGNvbnN0IHBob25lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnQScpO1xyXG4gICAgY29uc3Qgd2Vic2l0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0EnKTtcclxuICAgIGNvbnN0IGluZm8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdQJyk7XHJcbiAgICBjb25zdCBvcGVuV2l0aCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0EnKTtcclxuXHJcbiAgICBkb20uY2xhc3NMaXN0LmFkZCgnbWFya2VyLXBvcHVwJyk7XHJcbiAgICB0aXRsZS5pbm5lckhUTUwgPSBvcHRzLm5hbWU7XHJcbiAgICBhZGRyZXNzLmlubmVySFRNTCA9IG9wdHMuYWRkcmVzcztcclxuICAgIHRvd24uaW5uZXJIVE1MID0gb3B0cy50b3duO1xyXG4gICAgcGhvbmUuaHJlZiA9IGB0ZWw6JHtvcHRzLnBob25lfWA7XHJcbiAgICBwaG9uZS5pbm5lckhUTUwgPSBgPGltZyBzcmM9XCIuL2Fzc2V0cy9pbWcvaWNvbi9waG9uZS5zdmdcIj4ke29wdHMucGhvbmV9YDtcclxuICAgIHdlYnNpdGUuaHJlZiA9IG9wdHMud2Vic2l0ZTtcclxuICAgIHdlYnNpdGUuaW5uZXJIVE1MID0gJzxpbWcgc3JjPVwiLi9hc3NldHMvaW1nL2ljb24vd2ViLnN2Z1wiPkNvbnN1bHRlciBsZSBzaXRlJztcclxuICAgIHdlYnNpdGUuc2V0QXR0cmlidXRlKCdyZWwnLCAnbm9vcGVuZXIgbm9yZWZlcnJlcicpO1xyXG4gICAgd2Vic2l0ZS5zZXRBdHRyaWJ1dGUoJ3RhcmdldCcsICdfYmxhbmsnKTtcclxuICAgIGluZm8uaW5uZXJIVE1MID0gb3B0cy5pbmZvO1xyXG4gICAgb3BlbldpdGguaHJlZiA9IGBnZW86JHtvcHRzLmxhdH0sJHtvcHRzLmxuZ31gO1xyXG4gICAgb3BlbldpdGguaW5uZXJIVE1MID0gJzxpbWcgc3JjPVwiLi9hc3NldHMvaW1nL2ljb24vcGluLnN2Z1wiPk91dnJpciBkYW5zIGxlIEdQUyc7XHJcblxyXG4gICAgZG9tLmFwcGVuZENoaWxkKHRpdGxlKTtcclxuICAgIGRvbS5hcHBlbmRDaGlsZChhZGRyZXNzKTtcclxuICAgIGRvbS5hcHBlbmRDaGlsZCh0b3duKTtcclxuXHJcbiAgICBjb25zdCBidXR0b24gPSB0aGlzLl9tYXJrZXJPcGVuZWRTdGF0ZShvcHRzLnRpbWV0YWJsZSk7XHJcbiAgICBkb20uYXBwZW5kQ2hpbGQoYnV0dG9uKTtcclxuXHJcbiAgICBsZXQgYWx3YXlzQ2xvc2VkID0gdHJ1ZTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3B0cy50aW1ldGFibGUubGVuZ3RoOyArK2kpIHtcclxuICAgICAgaWYgKG9wdHMudGltZXRhYmxlW2ldLmlzT3BlbiA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIGFsd2F5c0Nsb3NlZCA9IGZhbHNlO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBBbGxvdyBtb2RhbCBvbmx5IGlmIHBvaSBoYXMgdGltZXRhYmxlIGFuZCBpcyBub3QgYWx3YXlzIGNsb3NlZFxyXG4gICAgaWYgKG9wdHMudGltZXRhYmxlLmxlbmd0aCA+IDAgJiYgYWx3YXlzQ2xvc2VkID09PSBmYWxzZSkge1xyXG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl90aW1ldGJhbGVNb2RhbC5iaW5kKHRoaXMsIG9wdHMpKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgaWYgKG9wdHMuaW5mbyAhPT0gJycpIHtcclxuICAgICAgZG9tLmFwcGVuZENoaWxkKGluZm8pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChvcHRzLnBob25lICE9PSAnJykge1xyXG4gICAgICBkb20uYXBwZW5kQ2hpbGQocGhvbmUpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChvcHRzLndlYnNpdGUgIT09ICcnKSB7XHJcbiAgICAgIGRvbS5hcHBlbmRDaGlsZCh3ZWJzaXRlKTtcclxuICAgIH0gICAgXHJcbiAgICBcclxuICAgIGRvbS5hcHBlbmRDaGlsZChvcGVuV2l0aCk7XHJcblxyXG4gICAgcmV0dXJuIGRvbTtcclxuICB9XHJcblxyXG5cclxuICBfbWFya2VyT3BlbmVkU3RhdGUodGltZXRhYmxlKSB7XHJcbiAgICBjb25zdCBkb20gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcclxuICAgIGNvbnN0IHN0YXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnSDUnKTtcclxuICAgIGNvbnN0IG1vcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdJJyk7XHJcbiAgICBkb20uY2xhc3NMaXN0LmFkZCgnbWFya2VyLW9wZW5lZCcpO1xyXG4gICAgZG9tLmFwcGVuZENoaWxkKHN0YXRlKTtcclxuICAgIGRvbS5hcHBlbmRDaGlsZChtb3JlKTtcclxuICAgIFxyXG4gICAgaWYgKHRpbWV0YWJsZS5sZW5ndGgpIHtcclxuICAgICAgbGV0IGFsd2F5c0Nsb3NlZCA9IHRydWU7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGltZXRhYmxlLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgaWYgKHRpbWV0YWJsZVtpXS5pc09wZW4gPT09IHRydWUpIHtcclxuICAgICAgICAgIGFsd2F5c0Nsb3NlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoYWx3YXlzQ2xvc2VkID09PSB0cnVlKSB7XHJcbiAgICAgICAgdGhpcy5fbWFya2VySXNDbG9zZWQoZG9tLCB0cnVlKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLl9jaGVja1RpbWUodGltZXRhYmxlLCBkb20pO1xyXG4gICAgICAgIC8vIFVwZGF0ZSBlYWNoIG1pbnV0ZXNcclxuICAgICAgICAvLyBUT0RPIHN0b3JlIGludGVydmFsIGlmIHRvIGJlIHJlYWR5IHRvIGNhbmNlbCB3aGVuIG90aGVyIG5hdmlnYXRpb24gbW9kZSBhdmFpbGFibGVcclxuICAgICAgICBzZXRJbnRlcnZhbCh0aGlzLl9jaGVja1RpbWUuYmluZCh0aGlzLCB0aW1ldGFibGUsIGRvbSksIDYwMDAwKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5fbWFya2VySXNPcGVuZWQoZG9tLCB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZG9tO1xyXG4gIH1cclxuXHJcblxyXG4gIF9jaGVja1RpbWUodGltZXRhYmxlLCBkb20pIHtcclxuICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XHJcbiAgICBsZXQgaG91ciA9IG5vdy5nZXRIb3VycygpO1xyXG4gICAgbGV0IG1pbnV0ZXMgPSBub3cuZ2V0TWludXRlcygpO1xyXG4gICAgaWYgKG1pbnV0ZXMgPCAxMCkge1xyXG4gICAgICBtaW51dGVzID0gYDAke21pbnV0ZXN9YDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBkYXlPZldlZWsgPSBub3cuZ2V0RGF5KCkgLSAxO1xyXG4gICAgY29uc3Qgb3BlbmluZ1RpbWUgPSBwYXJzZUludChgJHt0aW1ldGFibGVbZGF5T2ZXZWVrXS5vcGVuLmh9JHt0aW1ldGFibGVbZGF5T2ZXZWVrXS5vcGVuLm19YCk7XHJcbiAgICBjb25zdCBjbG9zaW5nVGltZSA9IHBhcnNlSW50KGAke3RpbWV0YWJsZVtkYXlPZldlZWtdLmNsb3NlLmh9JHt0aW1ldGFibGVbZGF5T2ZXZWVrXS5jbG9zZS5tfWApO1xyXG4gICAgY29uc3QgY3VycmVudFRpbWUgPSBwYXJzZUludChgJHtob3VyfSR7bWludXRlc31gKTtcclxuICAgIC8vIFdvbid0IHdvcmsgaWYgdGltZXRhYmxlIG9wZW4vY2xvc2UgaG91cnMgYXJlbid0IG9uIHRoZSBzYW1lIGRheVxyXG4gICAgaWYgKHRpbWV0YWJsZVtkYXlPZldlZWtdLmlzT3BlbiAmJiBpc05hTihvcGVuaW5nVGltZSkpIHsgLy8gMjQvNyBvcGVuaW5nXHJcbiAgICAgIHRoaXMuX21hcmtlcklzT3BlbmVkKGRvbSwgdHJ1ZSk7XHJcbiAgICB9IGVsc2UgaWYgKHRpbWV0YWJsZVtkYXlPZldlZWtdLmlzT3BlbiAmJiBjdXJyZW50VGltZSA+PSBvcGVuaW5nVGltZSAmJiBjdXJyZW50VGltZSA8IGNsb3NpbmdUaW1lKSB7XHJcbiAgICAgIGlmICh0aW1ldGFibGVbZGF5T2ZXZWVrXS5icmVhay5oYXNCcmVhaykge1xyXG4gICAgICAgIGNvbnN0IGJyZWFrT3BlbmluZ1RpbWUgPSBwYXJzZUludChgJHt0aW1ldGFibGVbZGF5T2ZXZWVrXS5icmVhay5lbmQuaH0ke3RpbWV0YWJsZVtkYXlPZldlZWtdLmJyZWFrLmVuZC5tfWApO1xyXG4gICAgICAgIGNvbnN0IGJyZWFrQ2xvc2luZ1RpbWUgPSBwYXJzZUludChgJHt0aW1ldGFibGVbZGF5T2ZXZWVrXS5icmVhay5zdGFydC5ofSR7dGltZXRhYmxlW2RheU9mV2Vla10uYnJlYWsuc3RhcnQubX1gKTtcclxuICAgICAgICBpZiAoY3VycmVudFRpbWUgPj0gYnJlYWtDbG9zaW5nVGltZSAmJiBjdXJyZW50VGltZSA8IGJyZWFrT3BlbmluZ1RpbWUpIHtcclxuICAgICAgICAgIHRoaXMuX21hcmtlcklzQ2xvc2VkKGRvbSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuX21hcmtlcklzT3BlbmVkKGRvbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuX21hcmtlcklzT3BlbmVkKGRvbSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7ICAgICAgXHJcbiAgICAgIHRoaXMuX21hcmtlcklzQ2xvc2VkKGRvbSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcbiAgX21hcmtlcklzT3BlbmVkKGRvbSwgYWx3YXlzT3BlbmVkKSB7XHJcbiAgICBkb20uZmlyc3RDaGlsZC5pbm5lckhUTUwgPSBgT3V2ZXJ0YDtcclxuICAgIGlmIChhbHdheXNPcGVuZWQgPT09IHRydWUpIHtcclxuICAgICAgZG9tLmxhc3RDaGlsZC5pbm5lckhUTUwgPSBgVG91am91cnMgb3V2ZXJ0YDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGRvbS5sYXN0Q2hpbGQuaW5uZXJIVE1MID0gYFZvaXIgbGVzIGhvcmFpcmVzYDtcclxuICAgIH1cclxuICAgIGRvbS5jbGFzc0xpc3QuYWRkKCdvcGVuZWQnKTtcclxuICB9XHJcblxyXG5cclxuICBfbWFya2VySXNDbG9zZWQoZG9tLCBhbHdheXNDbG9zZWQpIHtcclxuICAgIGRvbS5maXJzdENoaWxkLmlubmVySFRNTCA9IGBGZXJtw6lgO1xyXG4gICAgaWYgKGFsd2F5c0Nsb3NlZCkge1xyXG4gICAgICBkb20ubGFzdENoaWxkLmlubmVySFRNTCA9ICdUb3Vqb3VycyBmZXJtw6knO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZG9tLmxhc3RDaGlsZC5pbm5lckhUTUwgPSBgVm9pciBsZXMgaG9yYWlyZXNgO1xyXG4gICAgfVxyXG4gICAgZG9tLmNsYXNzTGlzdC5yZW1vdmUoJ29wZW5lZCcpO1xyXG4gIH1cclxuXHJcblxyXG4gIF90aW1ldGJhbGVNb2RhbChvcHRzKSB7XHJcbiAgICB0aGlzLmZldGNoTW9kYWwoJ3RpbWV0YWJsZW1vZGFsJykudGhlbihkb20gPT4ge1xyXG4gICAgICAvLyBVcGRhdGluZyBtb2RhbCBoZWFkZXIgYW5kIGluZm9cclxuICAgICAgZG9tLnF1ZXJ5U2VsZWN0b3IoJyNtYXJrLW5hbWUnKS5pbm5lckhUTUwgPSBvcHRzLm5hbWU7XHJcbiAgICAgIGRvbS5xdWVyeVNlbGVjdG9yKCcjbWFyay1hZGRyZXNzJykuaW5uZXJIVE1MID0gYCR7b3B0cy5hZGRyZXNzfSwgJHtvcHRzLnRvd259YDtcclxuICAgICAgY29uc3QgZGlzdGFuY2UgPSBVdGlscy5nZXREaXN0YW5jZUJldHdlZW5Db29yZHMoW29wdHMubGF0LCBvcHRzLmxuZ10sIFt0aGlzLl91c2VyLmxhdCwgdGhpcy5fdXNlci5sbmddKTtcclxuICAgICAgZG9tLnF1ZXJ5U2VsZWN0b3IoJyNtYXJrLWRpc3RhbmNlJykuaW5uZXJIVE1MID0gYFZvdXMgw6h0ZXMgw6AgZW52aXJvbiAke1V0aWxzLmNvbnZlcnREaXN0YW5jZVRvU3RyaW5nKGRpc3RhbmNlKX0gZGUgPGI+JHtvcHRzLm5hbWV9PC9iPiDDoCB2b2wgZCdvaXNlYXVgO1xyXG4gICAgICBjb25zdCBldGEgPSBVdGlscy5idWlsZERpc3RhbmNlRVRBKGRpc3RhbmNlKTtcclxuICAgICAgZG9tLnF1ZXJ5U2VsZWN0b3IoJyNtYXJrLWV0YScpLmlubmVySFRNTCA9IGBDZSBxdWkgcmVwcsOpc2VudGUgZW52aXJvbiAke2V0YS5jYXJ9IGVuIHZvaXR1cmUsIG91ICR7ZXRhLndhbGt9IMOgIHBpZWQuYDtcclxuICAgICAgZG9tLnF1ZXJ5U2VsZWN0b3IoJyNtYXJrLXN0YXRlJykuYXBwZW5kQ2hpbGQodGhpcy5fbWFya2VyT3BlbmVkU3RhdGUob3B0cy50aW1ldGFibGUpKTtcclxuICAgICAgLy8gTm93IHVwZGF0ZSBkYXkgYnkgZGF5XHJcbiAgICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XHJcbiAgICAgIGNvbnN0IGRheU9mV2VlayA9IG5vdy5nZXREYXkoKSAtIDE7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3B0cy50aW1ldGFibGUubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICBjb25zdCBkYXlEb20gPSBkb20ucXVlcnlTZWxlY3RvcignI3RpbWV0YWJsZScpLmNoaWxkcmVuW2ldO1xyXG4gICAgICAgIGlmIChvcHRzLnRpbWV0YWJsZVtpXS5pc09wZW4gPT09IHRydWUpIHtcclxuICAgICAgICAgIGNvbnN0IG1vcm5pbmcgPSBkYXlEb20ubGFzdEVsZW1lbnRDaGlsZC5maXJzdEVsZW1lbnRDaGlsZDtcclxuICAgICAgICAgIGNvbnN0IGFmdGVybm9vbiA9IGRheURvbS5sYXN0RWxlbWVudENoaWxkLmxhc3RFbGVtZW50Q2hpbGQ7XHJcbiAgICAgICAgICBpZiAob3B0cy50aW1ldGFibGVbaV0uYnJlYWsgJiYgb3B0cy50aW1ldGFibGVbaV0uYnJlYWsuaGFzQnJlYWsgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgbW9ybmluZy5pbm5lckhUTUwgPSBgPHA+JHtvcHRzLnRpbWV0YWJsZVtpXS5vcGVuLmh9OiR7b3B0cy50aW1ldGFibGVbaV0ub3Blbi5tfSDigJIgJHtvcHRzLnRpbWV0YWJsZVtpXS5icmVhay5zdGFydC5ofToke29wdHMudGltZXRhYmxlW2ldLmJyZWFrLnN0YXJ0Lm19PC9wPmA7XHJcbiAgICAgICAgICAgIG1vcm5pbmcuY2xhc3NMaXN0LmFkZCgnZmlsbGVkJyk7IC8vIE1vcm5pbmdcclxuICAgICAgICAgICAgbW9ybmluZy5jbGFzc0xpc3QuYWRkKCdzcGxpdGVkJyk7IC8vIE1vcm5pbmdcclxuICAgICAgICAgICAgYWZ0ZXJub29uLmlubmVySFRNTCA9IGA8cD4ke29wdHMudGltZXRhYmxlW2ldLmJyZWFrLmVuZC5ofToke29wdHMudGltZXRhYmxlW2ldLmJyZWFrLmVuZC5tfSDigJIgJHtvcHRzLnRpbWV0YWJsZVtpXS5jbG9zZS5ofToke29wdHMudGltZXRhYmxlW2ldLmNsb3NlLm19PC9wPmA7XHJcbiAgICAgICAgICAgIGFmdGVybm9vbi5jbGFzc0xpc3QuYWRkKCdmaWxsZWQnKTsgLy8gQWZ0ZXJub29uXHJcbiAgICAgICAgICAgIGFmdGVybm9vbi5jbGFzc0xpc3QuYWRkKCdzcGxpdGVkJyk7IC8vIEFmdGVybm9vblxyXG4gICAgICAgICAgfSBlbHNlIGlmIChvcHRzLnRpbWV0YWJsZVtpXS5vcGVuLmggJiYgb3B0cy50aW1ldGFibGVbaV0uY2xvc2UuaCkge1xyXG4gICAgICAgICAgICBtb3JuaW5nLmlubmVySFRNTCA9IGA8cD4ke29wdHMudGltZXRhYmxlW2ldLm9wZW4uaH06JHtvcHRzLnRpbWV0YWJsZVtpXS5vcGVuLm19PC9wPmA7XHJcbiAgICAgICAgICAgIG1vcm5pbmcuY2xhc3NMaXN0LmFkZCgnZmlsbGVkJyk7IC8vIE1vcm5pbmdcclxuICAgICAgICAgICAgYWZ0ZXJub29uLmlubmVySFRNTCA9IGA8cD4ke29wdHMudGltZXRhYmxlW2ldLmNsb3NlLmh9OiR7b3B0cy50aW1ldGFibGVbaV0uY2xvc2UubX08L3A+YDtcclxuICAgICAgICAgICAgYWZ0ZXJub29uLmNsYXNzTGlzdC5hZGQoJ2ZpbGxlZCcpOyAvLyBBZnRlcm5vb25cclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG1vcm5pbmcuaW5uZXJIVE1MID0gYDxwPjAwOjAwPC9wPmA7XHJcbiAgICAgICAgICAgIG1vcm5pbmcuY2xhc3NMaXN0LmFkZCgnZmlsbGVkJyk7IC8vIE1vcm5pbmdcclxuICAgICAgICAgICAgYWZ0ZXJub29uLmlubmVySFRNTCA9IGA8cD4yNDowMDwvcD5gO1xyXG4gICAgICAgICAgICBhZnRlcm5vb24uY2xhc3NMaXN0LmFkZCgnZmlsbGVkJyk7IC8vIEFmdGVybm9vblxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBkYXlEb20ubGFzdEVsZW1lbnRDaGlsZC5pbm5lckhUTUwgPSBgPGRpdiBjbGFzcz1cImNsb3NlZFwiPjxwPkZlcm3DqTwvcD48L2Rpdj5gOyAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gTWF0Y2hpbmcgdG9kYXkncyBkYXlcclxuICAgICAgICBpZiAoaSA9PT0gZGF5T2ZXZWVrKSB7XHJcbiAgICAgICAgICBkYXlEb20uY2xhc3NMaXN0LmFkZCgndG9kYXknKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RhbC1vdmVybGF5JykuYXBwZW5kQ2hpbGQoZG9tKTtcclxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsLW92ZXJsYXknKS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG5cdFx0XHRzZXRUaW1lb3V0KCgpID0+IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RhbC1vdmVybGF5Jykuc3R5bGUub3BhY2l0eSA9IDEsIDUwKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbi8qIFNlYXJjaCBtb2RhbCBtZXRob2RzICovXHJcblxyXG4vKlxyXG4gIF9zZWFyY2hNb2RhbCgpIHtcclxuICAgIHRoaXMuX2ZldGNoTW9kYWwoJ3NlYXJjaG1vZGFsJykudGhlbihkb20gPT4ge1xyXG4gICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXModGhpcy5fbWFya3MpO1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICBkb20uZmlyc3RFbGVtZW50Q2hpbGQuYXBwZW5kQ2hpbGQodGhpcy5fY3JlYXRlTWFya0NhdGVnb3J5U2VhcmNoSWNvbihrZXlzW2ldKSk7XHJcbiAgICAgIH1cclxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsLW92ZXJsYXknKS5hcHBlbmRDaGlsZChkb20pO1xyXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWwtb3ZlcmxheScpLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XHJcblx0XHRcdHNldFRpbWVvdXQoKCkgPT4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsLW92ZXJsYXknKS5zdHlsZS5vcGFjaXR5ID0gMSwgNTApO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgX2NyZWF0ZU1hcmtDYXRlZ29yeVNlYXJjaEljb24odHlwZSkge1xyXG4gICAgY29uc3QgZG9tID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XHJcbiAgICBjb25zdCBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdJTUcnKTtcclxuICAgIGNvbnN0IGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnUCcpO1xyXG4gICAgZG9tLmNsYXNzTGlzdC5hZGQoJ2ZpbHRlcmluZy1lbGVtZW50Jyk7XHJcbiAgICBpbWcuc3JjID0gYC9hc3NldHMvaW1nL21hcmtlci8ke3R5cGV9LnN2Z2A7XHJcbiAgICBsYWJlbC5pbm5lckhUTUwgPSB0eXBlO1xyXG4gICAgZG9tLmFwcGVuZENoaWxkKGltZyk7XHJcbiAgICBkb20uYXBwZW5kQ2hpbGQobGFiZWwpO1xyXG4gICAgcmV0dXJuIGRvbTtcclxuICB9XHJcbiovXHJcblxyXG4gIC8qIE1vZGFsIG1ldGhvZHMgKi9cclxuXHJcbiAgZmV0Y2hNb2RhbCh1cmwpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuICAgICAgZmV0Y2goYC4vYXNzZXRzL2h0bWwvJHt1cmx9Lmh0bWxgKS50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgIGRhdGEudGV4dCgpLnRoZW4oaHRtbCA9PiB7XHJcbiAgICAgICAgICByZXNvbHZlKGRvY3VtZW50LmNyZWF0ZVJhbmdlKCkuY3JlYXRlQ29udGV4dHVhbEZyYWdtZW50KGh0bWwpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG5cclxuICBjbG9zZU1vZGFsKGV2ZW50LCBmb3JjZSkge1xyXG5cdFx0aWYgKGZvcmNlID09PSB0cnVlIHx8IGV2ZW50LnRhcmdldC5pZCA9PT0gJ21vZGFsLW92ZXJsYXknIHx8IGV2ZW50LnRhcmdldC5pZC5pbmRleE9mKCdjbG9zZScpICE9PSAtMSkge1xyXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWwtb3ZlcmxheScpLnN0eWxlLm9wYWNpdHkgPSAwO1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWwtb3ZlcmxheScpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsLW92ZXJsYXknKS5pbm5lckhUTUwgPSAnJztcclxuICAgICAgfSwgMzAwKTtcclxuICAgIH1cclxuICB9XHJcblxyXG5cclxuICBnZXQgdXNlcigpIHtcclxuICAgIHJldHVybiB0aGlzLl91c2VyO1xyXG4gIH1cclxuXHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBEb3VyZGFubmFpc0V4cGxvcmU7XHJcbiJdLCJuYW1lcyI6WyJNYXJrZXJzIiwiVXRpbHMiLCJNYXAiLCJvcHRpb25zIiwiX2NsYXNzQ2FsbENoZWNrIiwiX2lkIiwidGFyZ2V0SWQiLCJfbWFwIiwiX21hcmtzIiwiX3BvbHlnb25zIiwiX2xheWVycyIsIkNhcnRlIiwiU2F0ZWxsaXRlIiwiX2luaXQiLCJfZXZlbnRzIiwiX2NyZWF0ZUNsYXNzIiwia2V5IiwidmFsdWUiLCJ3aW5kb3ciLCJMIiwibWFwIiwiem9vbUNvbnRyb2wiLCJzZXRWaWV3IiwiQ0NESF9DRU5URVIiLCJMQVQiLCJMTkciLCJjb250cm9sIiwic2NhbGUiLCJhZGRUbyIsInNldE1heEJvdW5kcyIsIk1BUF9CT1VORFMiLCJPU01fTEFZRVIiLCJFU1JJX0xBWUVSIiwibGF5ZXJzIiwicG9zaXRpb24iLCJfdGhpcyIsIm9uIiwiX21hcENsaWNrZWQiLCJiaW5kIiwicGFuSW5zaWRlQm91bmRzIiwiYW5pbWF0ZSIsIm9wdHMiLCJjb25zb2xlIiwibG9nIiwibGF0bG5nIiwiSlNPTiIsInN0cmluZ2lmeSIsImxhdCIsImxuZyIsImRyYXdVc2VyTWFya2VyIiwiZHgiLCJ1c2VyIiwibWFya2VyIiwiaWNvbiIsInNldExhdExuZyIsImFkZE1hcmsiLCJjcmVhdGVQb3B1cCIsIl90aGlzMiIsInR5cGVzIiwidHlwZSIsInNwbGl0IiwibGVuZ3RoIiwiY29uY2F0IiwiZmx5VG8iLCJiaW5kUG9wdXAiLCJpIiwicHVzaCIsImFkZFBvbHlnb24iLCJwb2x5Z29uIiwiT2JqZWN0IiwiZnJlZXplIiwicmVzdGF1cmFudCIsIkljb24iLCJpY29uVXJsIiwiaWNvblNpemUiLCJpY29uQW5jaG9yIiwicG9wdXBBbmNob3IiLCJzaGFkb3dVcmwiLCJzaGFkb3dTaXplIiwic2hhZG93QW5jaG9yIiwiYmFyIiwiY2VsbGFyIiwiZ3JvY2VyeSIsImZvb3QiLCJydWdieSIsInBpbmdwb25nIiwiYm9jY2UiLCJ0ZW5uaXMiLCJiYWtlcnkiLCJib29rIiwibGFuZG1hcmsiLCJjYXN0bGUiLCJjaHVyY2giLCJnYXJkZW4iLCJjYXIiLCJ0cmFpbiIsImFuaW1hbCIsImRlbnRhbCIsInBoYXJtYWN5IiwibWFpbCIsInBhcmsiLCJyZWN5Y2xlIiwiYWRtaW5pc3RyYXRpb24iLCJzY2hvb2wiLCJnZXREaXN0YW5jZUJldHdlZW5Db29yZHMiLCJmcm9tIiwidG8iLCJsb24xIiwiTWF0aCIsIlBJIiwibGF0MSIsImxvbjIiLCJsYXQyIiwiZGVsdGFMYXQiLCJkZWx0YUxvbiIsImEiLCJwb3ciLCJzaW4iLCJjb3MiLCJjIiwiYXNpbiIsInNxcnQiLCJjb252ZXJ0RGlzdGFuY2VUb1N0cmluZyIsImRpc3RhbmNlIiwicHJlY2lzaW9uUm91bmQiLCJidWlsZERpc3RhbmNlRVRBIiwiY2FyTWludXRlcyIsImNhclNlY29uZHMiLCJmbG9vciIsIndhbGtNaW51dGVzIiwid2Fsa1NlY29uZHMiLCJ3YWxrIiwicHJlY2lzaW9uIiwibXVsdGlwbGllciIsInJvdW5kIiwiQ0NESF9DSVRJRVMiLCJsYXRMbmdCb3VuZHMiLCJsYXRMbmciLCJ0aWxlTGF5ZXIiLCJhdHRyaWJ1dGlvbiIsIm1heFpvb20iLCJtaW5ab29tIiwiRG91cmRhbm5haXNFeHBsb3JlIiwiX2RhdGEiLCJfdXNlciIsImdlb2xvY2F0aW9uQWxsb3dlZCIsIkhPTUVfTEFUIiwiSE9NRV9MTkciLCJhY2N1cmFjeSIsIl9pbml0R2VvbG9jYXRpb24iLCJ0aGVuIiwiX2luaXRNYXAiLCJfaW5pdEV2ZW50cyIsIl9mZXRjaE1hcmtlcnMiLCJQcm9taXNlIiwicmVzb2x2ZSIsIm5hdmlnYXRvciIsImVuYWJsZUhpZ2hBY2N1cmFjeSIsIm1heGltdW1BZ2UiLCJ0aW1lb3V0IiwiZ2VvbG9jYXRpb24iLCJnZXRDdXJyZW50UG9zaXRpb24iLCJfcG9zaXRpb25Jbml0aWFsaXplZCIsIl93YXRjaElkIiwid2F0Y2hQb3NpdGlvbiIsIl9wb3NpdGlvblVwZGF0ZSIsIl90aGlzMyIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJhZGRFdmVudExpc3RlbmVyIiwiY2xvc2VNb2RhbCIsIl90aGlzNCIsInByb21pc2VzIiwiX2xvb3AiLCJyZXNvbHZlTG9jYWwiLCJmZXRjaCIsImRhdGEiLCJqc29uIiwianNvbkRhdGEiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJfYnVpbGRQb2x5Z29ucyIsImJvdW5kcyIsIl9idWlsZE1hcmtlcnMiLCJwb2lzIiwiYWxsIiwibWFya2VycyIsIl90aGlzNSIsImtleXMiLCJqIiwiX2NyZWF0ZU1hcmtlclBvcHVwIiwiY2l0eUJvdW5kcyIsIl90aGlzNiIsImNvb3JkcyIsImxhdGl0dWRlIiwibG9uZ2l0dWRlIiwiZG9tIiwiY3JlYXRlRWxlbWVudCIsInRpdGxlIiwiYWRkcmVzcyIsInRvd24iLCJwaG9uZSIsIndlYnNpdGUiLCJpbmZvIiwib3BlbldpdGgiLCJjbGFzc0xpc3QiLCJhZGQiLCJpbm5lckhUTUwiLCJuYW1lIiwiaHJlZiIsInNldEF0dHJpYnV0ZSIsImFwcGVuZENoaWxkIiwiYnV0dG9uIiwiX21hcmtlck9wZW5lZFN0YXRlIiwidGltZXRhYmxlIiwiYWx3YXlzQ2xvc2VkIiwiaXNPcGVuIiwiX3RpbWV0YmFsZU1vZGFsIiwic3RhdGUiLCJtb3JlIiwiX21hcmtlcklzQ2xvc2VkIiwiX2NoZWNrVGltZSIsInNldEludGVydmFsIiwiX21hcmtlcklzT3BlbmVkIiwibm93IiwiRGF0ZSIsImhvdXIiLCJnZXRIb3VycyIsIm1pbnV0ZXMiLCJnZXRNaW51dGVzIiwiZGF5T2ZXZWVrIiwiZ2V0RGF5Iiwib3BlbmluZ1RpbWUiLCJwYXJzZUludCIsIm9wZW4iLCJoIiwibSIsImNsb3NpbmdUaW1lIiwiY2xvc2UiLCJjdXJyZW50VGltZSIsImlzTmFOIiwiaGFzQnJlYWsiLCJicmVha09wZW5pbmdUaW1lIiwiZW5kIiwiYnJlYWtDbG9zaW5nVGltZSIsInN0YXJ0IiwiYWx3YXlzT3BlbmVkIiwiZmlyc3RDaGlsZCIsImxhc3RDaGlsZCIsInJlbW92ZSIsIl90aGlzNyIsImZldGNoTW9kYWwiLCJxdWVyeVNlbGVjdG9yIiwiZXRhIiwiZGF5RG9tIiwiY2hpbGRyZW4iLCJtb3JuaW5nIiwibGFzdEVsZW1lbnRDaGlsZCIsImZpcnN0RWxlbWVudENoaWxkIiwiYWZ0ZXJub29uIiwic3R5bGUiLCJkaXNwbGF5Iiwic2V0VGltZW91dCIsIm9wYWNpdHkiLCJ1cmwiLCJ0ZXh0IiwiaHRtbCIsImNyZWF0ZVJhbmdlIiwiY3JlYXRlQ29udGV4dHVhbEZyYWdtZW50IiwiZXZlbnQiLCJmb3JjZSIsInRhcmdldCIsImlkIiwiaW5kZXhPZiIsImdldCJdLCJzb3VyY2VSb290IjoiIn0=
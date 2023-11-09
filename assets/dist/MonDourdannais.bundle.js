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
      if (!window.md.user.marker) {
        window.md.user.marker = window.L.marker([window.md.user.lat, window.md.user.lng], {
          icon: _MarkerEnum_js__WEBPACK_IMPORTED_MODULE_0__["default"].user
        });
        window.md.user.marker.addTo(this._map);
      } else {
        window.md.user.marker.setLatLng(window.md.user);
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
  tobacco: new window.L.Icon({
    iconUrl: 'assets/img/marker/tobacco.svg',
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
  sport: new window.L.Icon({
    iconUrl: 'assets/img/marker/sport.svg',
    iconSize: [26, 26],
    iconAnchor: [13, 13],
    popupAnchor: [0, -13],
    shadowUrl: 'assets/img/marker/marker-shadow.png',
    shadowSize: [42, 42],
    shadowAnchor: [20, 20]
  }),
  store: new window.L.Icon({
    iconUrl: 'assets/img/marker/store.svg',
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
  craft: new window.L.Icon({
    iconUrl: 'assets/img/marker/craft.svg',
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
  gas: new window.L.Icon({
    iconUrl: 'assets/img/marker/gas.svg',
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
  bank: new window.L.Icon({
    iconUrl: 'assets/img/marker/bank.svg',
    iconSize: [26, 26],
    iconAnchor: [13, 13],
    popupAnchor: [0, -13],
    shadowUrl: 'assets/img/marker/marker-shadow.png',
    shadowSize: [42, 42],
    shadowAnchor: [20, 20]
  }),
  medical: new window.L.Icon({
    iconUrl: 'assets/img/marker/medical.svg',
    iconSize: [26, 26],
    iconAnchor: [13, 13],
    popupAnchor: [0, -13],
    shadowUrl: 'assets/img/marker/marker-shadow.png',
    shadowSize: [42, 42],
    shadowAnchor: [20, 20]
  }),
  deco: new window.L.Icon({
    iconUrl: 'assets/img/marker/deco.svg',
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
  }),
  barstore: new window.L.Icon({
    iconUrl: 'assets/img/marker/mixed/barstore.svg',
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

/***/ "./src/scss/MonDourdannais.scss":
/*!**************************************!*\
  !*** ./src/scss/MonDourdannais.scss ***!
  \**************************************/
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
/*!**********************************!*\
  !*** ./src/js/MonDourdannais.js ***!
  \**********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _scss_MonDourdannais_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/MonDourdannais.scss */ "./src/scss/MonDourdannais.scss");
/* harmony import */ var _utils_Map_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/Map.js */ "./src/js/utils/Map.js");
/* harmony import */ var _utils_Utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/Utils.js */ "./src/js/utils/Utils.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }



var MonDourdannais = /*#__PURE__*/function () {
  function MonDourdannais() {
    _classCallCheck(this, MonDourdannais);
    this._map = null;
    this._layers = {};
    this._data = null;
    this._user = {
      lat: _utils_Utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].HOME_LAT,
      lng: _utils_Utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].HOME_LNG,
      accuracy: 0,
      marker: null
    };
    this._initGeolocation().then(this._fetchMarkers.bind(this)).then(this._initMap.bind(this)).then(this._initEvents.bind(this)).then(this._buildMarkers.bind(this)).then(this._buildPolygons.bind(this));
  }
  _createClass(MonDourdannais, [{
    key: "_initGeolocation",
    value: function _initGeolocation() {
      var _this = this;
      return new Promise(function (resolve) {
        if ('geolocation' in navigator) {
          var options = {
            enableHighAccuracy: true,
            // More consuption, better position
            maximumAge: 1000,
            // A position will last 1s maximum
            timeout: 900 // A position is updated in 0.9s maximum
          };

          _this._watchId = navigator.geolocation.watchPosition(function (position) {
            // Update saved user position
            _this._user.lat = position.coords.latitude;
            _this._user.lng = position.coords.longitude;
            _this._user.accuracy = position.coords.accuracy;
            // Only draw marker if map is already created
            if (_this._map) {
              _this._map.drawUserMarker();
            }
            resolve();
          }, resolve, options);
        } else {
          resolve();
        }
      });
    }
  }, {
    key: "_fetchMarkers",
    value: function _fetchMarkers() {
      var _this2 = this;
      return new Promise(function (resolve) {
        fetch("/assets/json/MapData.json").then(function (data) {
          data.json().then(function (jsonData) {
            _this2._data = jsonData;
            resolve();
          })["catch"](resolve);
        })["catch"](resolve);
      });
    }
  }, {
    key: "_initMap",
    value: function _initMap() {
      var _this3 = this;
      return new Promise(function (resolve) {
        _this3._map = new _utils_Map_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
          targetId: 'sarmates-land'
        });
        resolve();
      });
    }
  }, {
    key: "_initEvents",
    value: function _initEvents() {
      var _this4 = this;
      return new Promise(function (resolve) {
        // Listening to modal event
        document.getElementById('modal-overlay').addEventListener('click', _this4.closeModal.bind(_this4));
        resolve();
      });
    }
  }, {
    key: "_buildMarkers",
    value: function _buildMarkers() {
      var _this5 = this;
      return new Promise(function (resolve) {
        var keys = Object.keys(_this5._data.markers);
        for (var i = 0; i < keys.length; ++i) {
          for (var j = 0; j < _this5._data.markers[keys[i]].length; ++j) {
            _this5._map.addMark(_this5._data.markers[keys[i]][j], _this5._createMarkerPopup.bind(_this5));
          }
        }
        resolve();
      });
    }
  }, {
    key: "_buildPolygons",
    value: function _buildPolygons() {
      var _this6 = this;
      return new Promise(function (resolve) {
        var keys = Object.keys(_this6._data.cityBounds);
        for (var i = 0; i < keys.length; ++i) {
          _this6._map.addPolygon(_this6._data.cityBounds[keys[i]]);
        }
        resolve();
      });
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
      phone.innerHTML = "<img src=\"/assets/img/icon/phone.svg\">".concat(opts.phone);
      website.href = opts.website;
      website.innerHTML = '<img src="/assets/img/icon/web.svg">Consulter le site';
      website.setAttribute('rel', 'noopener noreferrer');
      website.setAttribute('target', '_blank');
      info.innerHTML = opts.info;
      openWith.href = "geo:".concat(opts.lat, ",").concat(opts.lng);
      openWith.innerHTML = '<img src="/assets/img/icon/pin.svg">Ouvrir dans le GPS';
      dom.appendChild(title);
      dom.appendChild(address);
      dom.appendChild(town);
      var button = this._markerOpenedState(opts.timetable);
      dom.appendChild(button);
      if (opts.timetable.length > 0) {
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
        more.innerHTML = 'Voir les horaires';
        this._checkTime(timetable, dom);
        setInterval(this._checkTime.bind(this, timetable, dom), 30000);
      } else {
        this._markerIsOpened(dom, true);
        more.innerHTML = 'Toujours ouvert';
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
        dom.lastChild.innerHTML = "24h/24h et 7j/7j";
      }
      dom.classList.add('opened');
    }
  }, {
    key: "_markerIsClosed",
    value: function _markerIsClosed(dom) {
      dom.firstChild.innerHTML = "Ferm\xE9";
      dom.lastChild.innerHTML = "Voir les horaires";
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
        fetch("/assets/html/".concat(url, ".html")).then(function (data) {
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
  return MonDourdannais;
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MonDourdannais);
})();

window.MonDourdannais = __webpack_exports__["default"];
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDbEJDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFdBQVcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUNyQkMsU0FBUyxFQUFFLHFDQUFxQztJQUNoREMsVUFBVSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUNwQkMsWUFBWSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUU7RUFDdkIsQ0FBQyxDQUFDO0VBQ0ZLLEtBQUssRUFBRSxJQUFJbEUsTUFBTSxDQUFDQyxDQUFDLENBQUNxRCxJQUFJLENBQUM7SUFDdkJDLE9BQU8sRUFBRSw2QkFBNkI7SUFDdENDLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDbEJDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFdBQVcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUNyQkMsU0FBUyxFQUFFLHFDQUFxQztJQUNoREMsVUFBVSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUNwQkMsWUFBWSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUU7RUFDdkIsQ0FBQyxDQUFDO0VBQ0ZNLElBQUksRUFBRSxJQUFJbkUsTUFBTSxDQUFDQyxDQUFDLENBQUNxRCxJQUFJLENBQUM7SUFDdEJDLE9BQU8sRUFBRSw0QkFBNEI7SUFDckNDLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDbEJDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFdBQVcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUNyQkMsU0FBUyxFQUFFLHFDQUFxQztJQUNoREMsVUFBVSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUNwQkMsWUFBWSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUU7RUFDdkIsQ0FBQyxDQUFDO0VBQ0ZPLFFBQVEsRUFBRSxJQUFJcEUsTUFBTSxDQUFDQyxDQUFDLENBQUNxRCxJQUFJLENBQUM7SUFDMUJDLE9BQU8sRUFBRSxnQ0FBZ0M7SUFDekNDLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDbEJDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFdBQVcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUNyQkMsU0FBUyxFQUFFLHFDQUFxQztJQUNoREMsVUFBVSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUNwQkMsWUFBWSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUU7RUFDdkIsQ0FBQyxDQUFDO0VBQ0ZRLEtBQUssRUFBRSxJQUFJckUsTUFBTSxDQUFDQyxDQUFDLENBQUNxRCxJQUFJLENBQUM7SUFDdkJDLE9BQU8sRUFBRSw2QkFBNkI7SUFDdENDLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDbEJDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFdBQVcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUNyQkMsU0FBUyxFQUFFLHFDQUFxQztJQUNoREMsVUFBVSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUNwQkMsWUFBWSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUU7RUFDdkIsQ0FBQyxDQUFDO0VBQ0ZTLE1BQU0sRUFBRSxJQUFJdEUsTUFBTSxDQUFDQyxDQUFDLENBQUNxRCxJQUFJLENBQUM7SUFDeEJDLE9BQU8sRUFBRSw4QkFBOEI7SUFDdkNDLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDbEJDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFdBQVcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUNyQkMsU0FBUyxFQUFFLHFDQUFxQztJQUNoREMsVUFBVSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUNwQkMsWUFBWSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUU7RUFDdkIsQ0FBQyxDQUFDO0VBQ0ZVLEdBQUcsRUFBRSxJQUFJdkUsTUFBTSxDQUFDQyxDQUFDLENBQUNxRCxJQUFJLENBQUM7SUFDckJDLE9BQU8sRUFBRSwyQkFBMkI7SUFDcENDLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDbEJDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFdBQVcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUNyQkMsU0FBUyxFQUFFLHFDQUFxQztJQUNoREMsVUFBVSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUNwQkMsWUFBWSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUU7RUFDdkIsQ0FBQyxDQUFDO0VBQ0ZXLEdBQUcsRUFBRSxJQUFJeEUsTUFBTSxDQUFDQyxDQUFDLENBQUNxRCxJQUFJLENBQUM7SUFDckJDLE9BQU8sRUFBRSwyQkFBMkI7SUFDcENDLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDbEJDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFdBQVcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUNyQkMsU0FBUyxFQUFFLHFDQUFxQztJQUNoREMsVUFBVSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUNwQkMsWUFBWSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUU7RUFDdkIsQ0FBQyxDQUFDO0VBQ0ZZLE1BQU0sRUFBRSxJQUFJekUsTUFBTSxDQUFDQyxDQUFDLENBQUNxRCxJQUFJLENBQUM7SUFDeEJDLE9BQU8sRUFBRSw4QkFBOEI7SUFDdkNDLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDbEJDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFdBQVcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUNyQkMsU0FBUyxFQUFFLHFDQUFxQztJQUNoREMsVUFBVSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUNwQkMsWUFBWSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUU7RUFDdkIsQ0FBQyxDQUFDO0VBQ0ZhLElBQUksRUFBRSxJQUFJMUUsTUFBTSxDQUFDQyxDQUFDLENBQUNxRCxJQUFJLENBQUM7SUFDdEJDLE9BQU8sRUFBRSw0QkFBNEI7SUFDckNDLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDbEJDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFdBQVcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUNyQkMsU0FBUyxFQUFFLHFDQUFxQztJQUNoREMsVUFBVSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUNwQkMsWUFBWSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUU7RUFDdkIsQ0FBQyxDQUFDO0VBQ0ZjLElBQUksRUFBRSxJQUFJM0UsTUFBTSxDQUFDQyxDQUFDLENBQUNxRCxJQUFJLENBQUM7SUFDdEJDLE9BQU8sRUFBRSw0QkFBNEI7SUFDckNDLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDbEJDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFdBQVcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUNyQkMsU0FBUyxFQUFFLHFDQUFxQztJQUNoREMsVUFBVSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUNwQkMsWUFBWSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUU7RUFDdkIsQ0FBQyxDQUFDO0VBQ0ZlLE9BQU8sRUFBRSxJQUFJNUUsTUFBTSxDQUFDQyxDQUFDLENBQUNxRCxJQUFJLENBQUM7SUFDekJD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LENBQUMsRUFBRSxHQUFHLENBQUM7TUFDVDtJQUNGO0VBQUM7SUFBQTlLLEdBQUE7SUFBQWdQLEdBQUEsRUFHRCxTQUFBQSxJQUFBLEVBQVc7TUFDVCxPQUFPLElBQUksQ0FBQ3JILEtBQUs7SUFDbkI7RUFBQztFQUFBLE9BQUFGLGNBQUE7QUFBQTtBQUtILGlFQUFlQSxjQUFjLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Nb25Eb3VyZGFubmFpcy8uL3NyYy9qcy91dGlscy9NYXAuanMiLCJ3ZWJwYWNrOi8vTW9uRG91cmRhbm5haXMvLi9zcmMvanMvdXRpbHMvTWFya2VyRW51bS5qcyIsIndlYnBhY2s6Ly9Nb25Eb3VyZGFubmFpcy8uL3NyYy9qcy91dGlscy9VdGlscy5qcyIsIndlYnBhY2s6Ly9Nb25Eb3VyZGFubmFpcy8uL3NyYy9zY3NzL01vbkRvdXJkYW5uYWlzLnNjc3MiLCJ3ZWJwYWNrOi8vTW9uRG91cmRhbm5haXMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vTW9uRG91cmRhbm5haXMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL01vbkRvdXJkYW5uYWlzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vTW9uRG91cmRhbm5haXMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9Nb25Eb3VyZGFubmFpcy8uL3NyYy9qcy9Nb25Eb3VyZGFubmFpcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTWFya2VycyBmcm9tICcuL01hcmtlckVudW0uanMnO1xyXG5pbXBvcnQgVXRpbHMgZnJvbSAnLi9VdGlscy5qcyc7XHJcblxyXG5cclxuY2xhc3MgTWFwIHtcclxuXHJcblxyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuICAgIHRoaXMuX2lkID0gb3B0aW9ucy50YXJnZXRJZDtcclxuICAgIHRoaXMuX21hcCA9IG51bGw7XHJcbiAgICB0aGlzLl9tYXJrcyA9IHt9O1xyXG4gICAgdGhpcy5fcG9seWdvbnMgPSBbXTtcclxuICAgIHRoaXMuX2xheWVycyA9IHtcclxuICAgICAgQ2FydGU6IG51bGwsXHJcbiAgICAgIFNhdGVsbGl0ZTogbnVsbFxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLl9pbml0KCk7XHJcbiAgICB0aGlzLl9ldmVudHMoKTtcclxuICB9XHJcblxyXG5cclxuICBfaW5pdCgpIHtcclxuICAgIC8vIFVzZSBtYWluIGRpdiB0byBpbmplY3QgT1NNIGludG9cclxuICAgIHRoaXMuX21hcCA9IHdpbmRvdy5MLm1hcCh0aGlzLl9pZCwge1xyXG4gICAgICB6b29tQ29udHJvbDogZmFsc2UsXHJcbiAgICB9KS5zZXRWaWV3KFtVdGlscy5DQ0RIX0NFTlRFUi5MQVQsIFV0aWxzLkNDREhfQ0VOVEVSLkxOR10sIDEyKTtcclxuICAgIC8vIEFkZCBtZXRlciBhbmQgZmVldCBzY2FsZSBvbiBtYXBcclxuICAgIHdpbmRvdy5MLmNvbnRyb2wuc2NhbGUoKS5hZGRUbyh0aGlzLl9tYXApO1xyXG4gICAgLy8gUHJldmVudCBwYW5uaW5nIG91dHNpZGUgb2YgdGhlIG1hcCBib3VuZHMgZGVmaW5pbmVkIGluIHV0aWxzXHJcbiAgICB0aGlzLl9tYXAuc2V0TWF4Qm91bmRzKFV0aWxzLk1BUF9CT1VORFMpO1xyXG4gICAgLy8gQWRkIGxheWVyIGdyb3VwIHRvIGludGVyZmFjZSBhbmQgc3RhcnQgbWFwIHdpdGggb3NtIGRlZmF1bHRcclxuICAgIHRoaXMuX2xheWVycy5DYXJ0ZSA9IFV0aWxzLk9TTV9MQVlFUjtcclxuICAgIHRoaXMuX2xheWVycy5TYXRlbGxpdGUgPSBVdGlscy5FU1JJX0xBWUVSO1xyXG4gICAgdGhpcy5fbGF5ZXJzLkNhcnRlLmFkZFRvKHRoaXMuX21hcCk7XHJcbiAgICAvLyBBZGQgbGF5ZXIgc3dpdGNoIHJhZGlvIG9uIGJvdHRvbSByaWdodCBvZiB0aGUgbWFwXHJcbiAgICB3aW5kb3cuTC5jb250cm9sLmxheWVycyh0aGlzLl9sYXllcnMsIHt9LCB7IHBvc2l0aW9uOiAnYm90dG9tcmlnaHQnIH0pLmFkZFRvKHRoaXMuX21hcCk7XHJcbiAgfVxyXG5cclxuXHJcbiAgX2V2ZW50cygpIHtcclxuICAgIC8vIFN1YnNjcmliZSB0byBjbGljayBldmVudCBvbiBtYXAgdG8gcmVhY3RcclxuICAgIHRoaXMuX21hcC5vbignY2xpY2snLCB0aGlzLl9tYXBDbGlja2VkLmJpbmQodGhpcykpO1xyXG4gICAgLy8gTWFwIGlzIGRyYWdnZWQgYnkgdXNlciBtb3VzZS9maW5nZXJcclxuICAgIHRoaXMuX21hcC5vbignZHJhZycsICgpID0+IHtcclxuICAgICAgLy8gQ29uc3RyYWluIHBhbiB0byB0aGUgbWFwIGJvdW5kc1xyXG4gICAgICB0aGlzLl9tYXAucGFuSW5zaWRlQm91bmRzKFV0aWxzLk1BUF9CT1VORFMsIHsgYW5pbWF0ZTogdHJ1ZSB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG4gIF9tYXBDbGlja2VkKG9wdHMpIHtcclxuICAgIGNvbnNvbGUubG9nKG9wdHMubGF0bG5nLCBKU09OLnN0cmluZ2lmeShvcHRzLmxhdGxuZy5sYXQgKyAnLCAnICsgb3B0cy5sYXRsbmcubG5nKSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgZHJhd1VzZXJNYXJrZXIoKSB7XHJcbiAgICBpZiAoIXdpbmRvdy5tZC51c2VyLm1hcmtlcikge1xyXG4gICAgICB3aW5kb3cubWQudXNlci5tYXJrZXIgPSB3aW5kb3cuTC5tYXJrZXIoW3dpbmRvdy5tZC51c2VyLmxhdCwgd2luZG93Lm1kLnVzZXIubG5nXSwge1xyXG4gICAgICAgIGljb246IE1hcmtlcnMudXNlclxyXG4gICAgICB9KTtcclxuICAgICAgd2luZG93Lm1kLnVzZXIubWFya2VyLmFkZFRvKHRoaXMuX21hcCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB3aW5kb3cubWQudXNlci5tYXJrZXIuc2V0TGF0TG5nKHdpbmRvdy5tZC51c2VyKTtcclxuICAgIH1cclxuICB9XHJcblxyXG5cclxuICBhZGRNYXJrKG9wdHMsIGNyZWF0ZVBvcHVwKSB7XHJcbiAgICBsZXQgdHlwZXMgPSBvcHRzLnR5cGUuc3BsaXQoJy8nKTtcclxuICAgIGxldCB0eXBlID0gb3B0cy50eXBlO1xyXG4gICAgaWYgKHR5cGVzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgdHlwZSA9IGAke3R5cGVzWzBdfSR7dHlwZXNbMV19YDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBtYXJrZXIgPSB3aW5kb3cuTC5tYXJrZXIoW29wdHMubGF0LCBvcHRzLmxuZ10sIHsgXHJcbiAgICAgIGljb246IE1hcmtlcnNbdHlwZV1cclxuICAgIH0pLm9uKCdjbGljaycsICgpID0+IHtcclxuICAgICAgdGhpcy5fbWFwLmZseVRvKFtvcHRzLmxhdCwgb3B0cy5sbmddLCAxOCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBtYXJrZXIuYmluZFBvcHVwKGNyZWF0ZVBvcHVwKG9wdHMpKTtcclxuICAgIG1hcmtlci5hZGRUbyh0aGlzLl9tYXApO1xyXG4gICAgaWYgKHR5cGVzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0eXBlcy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgIGlmICghdGhpcy5fbWFya3NbdHlwZXNbaV1dKSB7XHJcbiAgICAgICAgICB0aGlzLl9tYXJrc1t0eXBlc1tpXV0gPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbWFya3NbdHlwZXNbaV1dLnB1c2gobWFya2VyKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKCF0aGlzLl9tYXJrc1t0eXBlXSkge1xyXG4gICAgICAgIHRoaXMuX21hcmtzW3R5cGVdID0gW107XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5fbWFya3NbdHlwZV0ucHVzaChtYXJrZXIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIGFkZFBvbHlnb24ocG9seWdvbikge1xyXG4gICAgdGhpcy5fcG9seWdvbnMucHVzaCh3aW5kb3cuTC5wb2x5Z29uKHBvbHlnb24pLmFkZFRvKHRoaXMuX21hcCkpO1xyXG4gIH1cclxuXHJcblxyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTWFwO1xyXG4iLCJleHBvcnQgZGVmYXVsdCBPYmplY3QuZnJlZXplKHtcclxuICByZXN0YXVyYW50OiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvcmVzdGF1cmFudC5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgYmFyOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvYmFyLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICB0b2JhY2NvOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvdG9iYWNjby5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgY2VsbGFyOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvY2VsbGFyLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBzcG9ydDogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL3Nwb3J0LnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBzdG9yZTogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL3N0b3JlLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBib29rOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvYm9vay5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgbGFuZG1hcms6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9sYW5kbWFyay5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgY3JhZnQ6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9jcmFmdC5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgZ2FyZGVuOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvZ2FyZGVuLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBjYXI6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9jYXIuc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIGdhczogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL2dhcy5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgYW5pbWFsOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvYW5pbWFsLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBtYWlsOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFpbC5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgcGFyazogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL3Bhcmsuc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIHJlY3ljbGU6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9yZWN5Y2xlLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBhZG1pbmlzdHJhdGlvbjogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL2FkbWluaXN0cmF0aW9uLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBiYW5rOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvYmFuay5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgbWVkaWNhbDogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21lZGljYWwuc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIGRlY286IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9kZWNvLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSwgIFxyXG4gIHVzZXI6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci91c2VyLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXVxyXG4gIH0pLFxyXG4gIGJhcnN0b3JlOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWl4ZWQvYmFyc3RvcmUuc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdXHJcbiAgfSksXHJcbn0pO1xyXG4iLCJjb25zdCBnZXREaXN0YW5jZUJldHdlZW5Db29yZHMgPSAoZnJvbSwgdG8pID0+IHtcclxuICAvLyBSZXR1cm4gZGlzdGFuY2UgaW4gbWV0ZXJzXHJcbiAgY29uc3QgbG9uMSA9IChmcm9tWzFdICogTWF0aC5QSSkgLyAxODAsXHJcbiAgICBsYXQxID0gKGZyb21bMF0gKiBNYXRoLlBJKSAvIDE4MCxcclxuICAgIGxvbjIgPSAodG9bMV0gKiBNYXRoLlBJKSAvIDE4MCxcclxuICAgIGxhdDIgPSAodG9bMF0gKiBNYXRoLlBJKSAvIDE4MDtcclxuXHJcbiAgY29uc3QgZGVsdGFMYXQgPSBsYXQyIC0gbGF0MTtcclxuICBjb25zdCBkZWx0YUxvbiA9IGxvbjIgLSBsb24xO1xyXG5cclxuICBjb25zdCBhID0gTWF0aC5wb3coTWF0aC5zaW4oZGVsdGFMYXQgLyAyKSwgMikgKyBNYXRoLmNvcyhsYXQxKSAqIE1hdGguY29zKGxhdDIpICogTWF0aC5wb3coTWF0aC5zaW4oZGVsdGFMb24gLyAyKSwgMik7XHJcbiAgY29uc3QgYyA9IDIgKiBNYXRoLmFzaW4oTWF0aC5zcXJ0KGEpKTtcclxuICByZXR1cm4gYyAqIDYzNzEgKiAxMDAwO1xyXG59O1xyXG5cclxuXHJcbmNvbnN0IGNvbnZlcnREaXN0YW5jZVRvU3RyaW5nID0gZGlzdGFuY2UgPT4ge1xyXG4gIGlmIChkaXN0YW5jZSA+IDEwMDApIHtcclxuICAgIGRpc3RhbmNlID0gYCR7cHJlY2lzaW9uUm91bmQoZGlzdGFuY2UgLyAxMDAwLCAyKX1rbWA7XHJcbiAgfSBlbHNlIHtcclxuICAgIGRpc3RhbmNlID0gYCR7cHJlY2lzaW9uUm91bmQoZGlzdGFuY2UsIDIpfW1gO1xyXG4gIH1cclxuICByZXR1cm4gZGlzdGFuY2U7XHJcbn07XHJcblxyXG5cclxuY29uc3QgYnVpbGREaXN0YW5jZUVUQSA9IGRpc3RhbmNlID0+IHtcclxuICBsZXQgY2FyTWludXRlcyA9IDA7XHJcbiAgbGV0IGNhclNlY29uZHMgPSAwO1xyXG5cclxuICBpZiAoZGlzdGFuY2UgPiA1MDAwMCkge1xyXG4gICAgLy8gT3ZlciA1MGttLCB3ZSB1c2UgYXZlcmFnZSBzcGVlZCBvZiAxMDBrbWhcclxuICAgIGNhck1pbnV0ZXMgPSAoZGlzdGFuY2UgLyAxMDAwMDApICogNjA7XHJcbiAgfSBlbHNlIGlmIChkaXN0YW5jZSA+IDEwMDAwKSB7XHJcbiAgICAvLyBPdmVyIDEwa20sIHdlIHVzZSBhdmVyYWdlIHNwZWVkIG9mIDYwa20vaFxyXG4gICAgY2FyTWludXRlcyA9IChkaXN0YW5jZSAvIDYwMDAwKSAqIDYwO1xyXG4gIH0gZWxzZSB7XHJcbiAgICAvLyBVbmRlciAxMGttIHdlIHVzZXIgYXZlcmFnZSBzcGVlZCBvZiAzMGttL2hcclxuICAgIGNhck1pbnV0ZXMgPSAoZGlzdGFuY2UgLyAzMDAwMCkgKiA2MDtcclxuICB9XHJcblxyXG4gIGNhclNlY29uZHMgPSBjYXJNaW51dGVzICUgMTsgLy8gS2VlcCBmbG9hdGluZyB2YWx1ZSBmb3Igc2Vjb25kcyBjb21wdXRpbmdcclxuICBjYXJNaW51dGVzID0gTWF0aC5mbG9vcihjYXJNaW51dGVzKTsgLy8gUmVtb3ZlIGZsb2F0aW5nIHZhbHVlXHJcblxyXG4gIGlmIChjYXJNaW51dGVzID4gNjApIHtcclxuICAgIGNhck1pbnV0ZXMgPSBgJHtNYXRoLmZsb29yKGNhck1pbnV0ZXMgLyA2MCl9aCAke2Nhck1pbnV0ZXMgJSA2MH1tYDtcclxuICB9IGVsc2Uge1xyXG4gICAgY2FyTWludXRlcyA9IGAke2Nhck1pbnV0ZXN9bWA7XHJcbiAgfVxyXG5cclxuICBsZXQgd2Fsa01pbnV0ZXMgPSAoZGlzdGFuY2UgLyA1MDAwKSAqIDYwO1xyXG4gIGxldCB3YWxrU2Vjb25kcyA9IHdhbGtNaW51dGVzICUgMTtcclxuICB3YWxrTWludXRlcyA9IE1hdGguZmxvb3Iod2Fsa01pbnV0ZXMpOyAvLyBSZW1vdmUgZmxvYXRpbmcgdmFsdWVcclxuXHJcbiAgaWYgKHdhbGtNaW51dGVzID4gNjApIHtcclxuICAgIHdhbGtNaW51dGVzID0gYCR7TWF0aC5mbG9vcih3YWxrTWludXRlcyAvIDYwKX1oICR7d2Fsa01pbnV0ZXMgJSA2MH1tYDtcclxuICB9IGVsc2Uge1xyXG4gICAgd2Fsa01pbnV0ZXMgPSBgJHt3YWxrTWludXRlc31tYDtcclxuICB9ICBcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGNhcjogYCR7Y2FyTWludXRlc30gJHtNYXRoLmZsb29yKHByZWNpc2lvblJvdW5kKChjYXJTZWNvbmRzIC8gMTAwKSAqIDYwLCAyKSAqIDEwMCl9c2AsXHJcbiAgICB3YWxrOiBgJHt3YWxrTWludXRlc30gJHtNYXRoLmZsb29yKHByZWNpc2lvblJvdW5kKCh3YWxrU2Vjb25kcyAvIDEwMCkgKiA2MCwgMikgKiAxMDApfXNgLFxyXG4gIH07XHJcbn07XHJcblxyXG5cclxuY29uc3QgcHJlY2lzaW9uUm91bmQgPSAodmFsdWUsIHByZWNpc2lvbikgPT4ge1xyXG4gIGNvbnN0IG11bHRpcGxpZXIgPSBNYXRoLnBvdygxMCwgcHJlY2lzaW9uIHx8IDApO1xyXG4gIHJldHVybiBNYXRoLnJvdW5kKHZhbHVlICogbXVsdGlwbGllcikgLyBtdWx0aXBsaWVyO1xyXG59O1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBDQ0RIX0NFTlRFUjoge1xyXG4gICAgTEFUOiA0OC41MzE4MzkwNjQ0MTk2MixcclxuICAgIExORzogMi4wNTM3NTY3MTM4NjcxODhcclxuICB9LFxyXG4gIE1BUF9CT1VORFM6IHdpbmRvdy5MLmxhdExuZ0JvdW5kcyhcclxuICAgIHdpbmRvdy5MLmxhdExuZyg0OC42Nzk0MDA3MTU5NjM4OTQsIDEuNzM5MDYwNjY4OTQ1MzEyNyksXHJcbiAgICB3aW5kb3cuTC5sYXRMbmcoNDguMzg0MzkwNzQxNTE4NjYsIDIuMzQzMzk1OTk2MDkzNzUwKVxyXG4gICksXHJcbiAgT1NNX0xBWUVSOiB3aW5kb3cuTC50aWxlTGF5ZXIoJ2h0dHBzOi8ve3N9LnRpbGUub3BlbnN0cmVldG1hcC5vcmcve3p9L3t4fS97eX0ucG5nJywge1xyXG4gICAgYXR0cmlidXRpb246ICcmY29weTsgPGEgaHJlZj1cImh0dHBzOi8vd3d3Lm9wZW5zdHJlZXRtYXAub3JnL2NvcHlyaWdodFwiPk9wZW5TdHJlZXRNYXA8L2E+JyxcclxuICAgIG1heFpvb206IDE5LFxyXG4gICAgbWluWm9vbTogMTJcclxuICB9KSxcclxuICBFU1JJX0xBWUVSOiB3aW5kb3cuTC50aWxlTGF5ZXIoJ2h0dHBzOi8vc2VydmVyLmFyY2dpc29ubGluZS5jb20vQXJjR0lTL3Jlc3Qvc2VydmljZXMvV29ybGRfSW1hZ2VyeS9NYXBTZXJ2ZXIvdGlsZS97en0ve3l9L3t4fScsIHtcclxuICAgIGF0dHJpYnV0aW9uOiAnJmNvcHk7IDxhIGhyZWY9XCJodHRwczovL3d3dy5hcmNnaXMuY29tL2hvbWUvaXRlbS5odG1sP2lkPTEwZGYyMjc5Zjk2ODRlNGE5ZjZhN2YwOGZlYmFjMmE5XCI+RXNyaSBJbWFnZXJ5PC9hPicsXHJcbiAgICBtYXhab29tOiAxOSxcclxuICAgIG1pblpvb206IDEyXHJcbiAgfSksXHJcbiAgZ2V0RGlzdGFuY2VCZXR3ZWVuQ29vcmRzOiBnZXREaXN0YW5jZUJldHdlZW5Db29yZHMsXHJcbiAgY29udmVydERpc3RhbmNlVG9TdHJpbmc6IGNvbnZlcnREaXN0YW5jZVRvU3RyaW5nLFxyXG4gIGJ1aWxkRGlzdGFuY2VFVEE6IGJ1aWxkRGlzdGFuY2VFVEEsXHJcbiAgcHJlY2lzaW9uUm91bmQ6IHByZWNpc2lvblJvdW5kXHJcbn07XHJcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICcuLi9zY3NzL01vbkRvdXJkYW5uYWlzLnNjc3MnO1xyXG5pbXBvcnQgTWFwIGZyb20gJy4vdXRpbHMvTWFwLmpzJztcclxuaW1wb3J0IFV0aWxzIGZyb20gJy4vdXRpbHMvVXRpbHMuanMnO1xyXG5cclxuXHJcbmNsYXNzIE1vbkRvdXJkYW5uYWlzIHtcclxuXHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5fbWFwID0gbnVsbDtcclxuICAgIHRoaXMuX2xheWVycyA9IHt9O1xyXG4gICAgdGhpcy5fZGF0YSA9IG51bGw7XHJcblxyXG4gICAgdGhpcy5fdXNlciA9IHtcclxuICAgICAgbGF0OiBVdGlscy5IT01FX0xBVCxcclxuICAgICAgbG5nOiBVdGlscy5IT01FX0xORyxcclxuICAgICAgYWNjdXJhY3k6IDAsXHJcbiAgICAgIG1hcmtlcjogbnVsbFxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLl9pbml0R2VvbG9jYXRpb24oKVxyXG4gICAgICAudGhlbih0aGlzLl9mZXRjaE1hcmtlcnMuYmluZCh0aGlzKSlcclxuICAgICAgLnRoZW4odGhpcy5faW5pdE1hcC5iaW5kKHRoaXMpKVxyXG4gICAgICAudGhlbih0aGlzLl9pbml0RXZlbnRzLmJpbmQodGhpcykpXHJcbiAgICAgIC50aGVuKHRoaXMuX2J1aWxkTWFya2Vycy5iaW5kKHRoaXMpKVxyXG4gICAgICAudGhlbih0aGlzLl9idWlsZFBvbHlnb25zLmJpbmQodGhpcykpO1xyXG4gIH1cclxuXHJcblxyXG4gIF9pbml0R2VvbG9jYXRpb24oKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcblx0XHRcdGlmICgnZ2VvbG9jYXRpb24nIGluIG5hdmlnYXRvcikge1xyXG5cdFx0XHRcdGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICBlbmFibGVIaWdoQWNjdXJhY3k6IHRydWUsIC8vIE1vcmUgY29uc3VwdGlvbiwgYmV0dGVyIHBvc2l0aW9uXHJcbiAgICAgICAgICBtYXhpbXVtQWdlOiAxMDAwLCAvLyBBIHBvc2l0aW9uIHdpbGwgbGFzdCAxcyBtYXhpbXVtXHJcbiAgICAgICAgICB0aW1lb3V0OiA5MDAsIC8vIEEgcG9zaXRpb24gaXMgdXBkYXRlZCBpbiAwLjlzIG1heGltdW1cclxuICAgICAgICB9O1xyXG5cdFx0XHRcdHRoaXMuX3dhdGNoSWQgPSBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24ud2F0Y2hQb3NpdGlvbihwb3NpdGlvbiA9PiB7XHJcblx0XHRcdFx0XHQvLyBVcGRhdGUgc2F2ZWQgdXNlciBwb3NpdGlvblxyXG5cdFx0XHRcdFx0dGhpcy5fdXNlci5sYXQgPSBwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGU7XHJcblx0XHRcdFx0XHR0aGlzLl91c2VyLmxuZyA9IHBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGU7XHJcblx0XHRcdFx0XHR0aGlzLl91c2VyLmFjY3VyYWN5ID0gcG9zaXRpb24uY29vcmRzLmFjY3VyYWN5O1xyXG5cdFx0XHRcdFx0Ly8gT25seSBkcmF3IG1hcmtlciBpZiBtYXAgaXMgYWxyZWFkeSBjcmVhdGVkXHJcblx0XHRcdFx0XHRpZiAodGhpcy5fbWFwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21hcC5kcmF3VXNlck1hcmtlcigpO1xyXG4gICAgICAgICAgfVxyXG5cdFx0XHRcdFx0cmVzb2x2ZSgpO1xyXG5cdFx0XHRcdH0sIHJlc29sdmUsIG9wdGlvbnMpO1xyXG4gICAgICB9IGVsc2Uge1xyXG5cdFx0XHRcdHJlc29sdmUoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgX2ZldGNoTWFya2VycygpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuICAgICAgZmV0Y2goYC9hc3NldHMvanNvbi9NYXBEYXRhLmpzb25gKS50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgIGRhdGEuanNvbigpLnRoZW4oanNvbkRhdGEgPT4ge1xyXG4gICAgICAgICAgdGhpcy5fZGF0YSA9IGpzb25EYXRhO1xyXG4gICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgIH0pLmNhdGNoKHJlc29sdmUpO1xyXG4gICAgICB9KS5jYXRjaChyZXNvbHZlKTtcclxuICAgIH0pO1xyXG4gIH0gIFxyXG5cclxuXHJcbiAgX2luaXRNYXAoKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICAgIHRoaXMuX21hcCA9IG5ldyBNYXAoe1xyXG4gICAgICAgIHRhcmdldElkOiAnc2FybWF0ZXMtbGFuZCdcclxuICAgICAgfSk7XHJcbiAgICAgIHJlc29sdmUoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG4gIF9pbml0RXZlbnRzKCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xyXG4gICAgICAvLyBMaXN0ZW5pbmcgdG8gbW9kYWwgZXZlbnRcclxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsLW92ZXJsYXknKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuY2xvc2VNb2RhbC5iaW5kKHRoaXMpKTtcclxuICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgX2J1aWxkTWFya2VycygpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMuX2RhdGEubWFya2Vycyk7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5fZGF0YS5tYXJrZXJzW2tleXNbaV1dLmxlbmd0aDsgKytqKSB7XHJcbiAgICAgICAgICB0aGlzLl9tYXAuYWRkTWFyayh0aGlzLl9kYXRhLm1hcmtlcnNba2V5c1tpXV1bal0sIHRoaXMuX2NyZWF0ZU1hcmtlclBvcHVwLmJpbmQodGhpcykpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXNvbHZlKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG5cclxuICBfYnVpbGRQb2x5Z29ucygpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMuX2RhdGEuY2l0eUJvdW5kcyk7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgIHRoaXMuX21hcC5hZGRQb2x5Z29uKHRoaXMuX2RhdGEuY2l0eUJvdW5kc1trZXlzW2ldXSk7XHJcbiAgICAgIH1cclxuICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLyogTWFwIFV0aWxzICovXHJcblxyXG5cclxuICBfY3JlYXRlTWFya2VyUG9wdXAob3B0cykge1xyXG4gICAgY29uc3QgZG9tID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XHJcbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0gzJyk7XHJcbiAgICBjb25zdCBhZGRyZXNzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnSScpO1xyXG4gICAgY29uc3QgdG93biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0knKTtcclxuICAgIGNvbnN0IHBob25lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnQScpO1xyXG4gICAgY29uc3Qgd2Vic2l0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0EnKTtcclxuICAgIGNvbnN0IGluZm8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdQJyk7XHJcbiAgICBjb25zdCBvcGVuV2l0aCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0EnKTtcclxuXHJcbiAgICBkb20uY2xhc3NMaXN0LmFkZCgnbWFya2VyLXBvcHVwJyk7XHJcbiAgICB0aXRsZS5pbm5lckhUTUwgPSBvcHRzLm5hbWU7XHJcbiAgICBhZGRyZXNzLmlubmVySFRNTCA9IG9wdHMuYWRkcmVzcztcclxuICAgIHRvd24uaW5uZXJIVE1MID0gb3B0cy50b3duO1xyXG4gICAgcGhvbmUuaHJlZiA9IGB0ZWw6JHtvcHRzLnBob25lfWA7XHJcbiAgICBwaG9uZS5pbm5lckhUTUwgPSBgPGltZyBzcmM9XCIvYXNzZXRzL2ltZy9pY29uL3Bob25lLnN2Z1wiPiR7b3B0cy5waG9uZX1gO1xyXG4gICAgd2Vic2l0ZS5ocmVmID0gb3B0cy53ZWJzaXRlO1xyXG4gICAgd2Vic2l0ZS5pbm5lckhUTUwgPSAnPGltZyBzcmM9XCIvYXNzZXRzL2ltZy9pY29uL3dlYi5zdmdcIj5Db25zdWx0ZXIgbGUgc2l0ZSc7XHJcbiAgICB3ZWJzaXRlLnNldEF0dHJpYnV0ZSgncmVsJywgJ25vb3BlbmVyIG5vcmVmZXJyZXInKTtcclxuICAgIHdlYnNpdGUuc2V0QXR0cmlidXRlKCd0YXJnZXQnLCAnX2JsYW5rJyk7XHJcbiAgICBpbmZvLmlubmVySFRNTCA9IG9wdHMuaW5mbztcclxuICAgIG9wZW5XaXRoLmhyZWYgPSBgZ2VvOiR7b3B0cy5sYXR9LCR7b3B0cy5sbmd9YDtcclxuICAgIG9wZW5XaXRoLmlubmVySFRNTCA9ICc8aW1nIHNyYz1cIi9hc3NldHMvaW1nL2ljb24vcGluLnN2Z1wiPk91dnJpciBkYW5zIGxlIEdQUyc7XHJcblxyXG4gICAgZG9tLmFwcGVuZENoaWxkKHRpdGxlKTtcclxuICAgIGRvbS5hcHBlbmRDaGlsZChhZGRyZXNzKTtcclxuICAgIGRvbS5hcHBlbmRDaGlsZCh0b3duKTtcclxuXHJcbiAgICBjb25zdCBidXR0b24gPSB0aGlzLl9tYXJrZXJPcGVuZWRTdGF0ZShvcHRzLnRpbWV0YWJsZSk7XHJcbiAgICBkb20uYXBwZW5kQ2hpbGQoYnV0dG9uKTtcclxuXHJcbiAgICBpZiAob3B0cy50aW1ldGFibGUubGVuZ3RoID4gMCkge1xyXG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl90aW1ldGJhbGVNb2RhbC5iaW5kKHRoaXMsIG9wdHMpKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgaWYgKG9wdHMuaW5mbyAhPT0gJycpIHtcclxuICAgICAgZG9tLmFwcGVuZENoaWxkKGluZm8pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChvcHRzLnBob25lICE9PSAnJykge1xyXG4gICAgICBkb20uYXBwZW5kQ2hpbGQocGhvbmUpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChvcHRzLndlYnNpdGUgIT09ICcnKSB7XHJcbiAgICAgIGRvbS5hcHBlbmRDaGlsZCh3ZWJzaXRlKTtcclxuICAgIH0gICAgXHJcbiAgICBcclxuICAgIGRvbS5hcHBlbmRDaGlsZChvcGVuV2l0aCk7XHJcblxyXG4gICAgcmV0dXJuIGRvbTtcclxuICB9XHJcblxyXG5cclxuICBfbWFya2VyT3BlbmVkU3RhdGUodGltZXRhYmxlKSB7XHJcbiAgICBjb25zdCBkb20gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcclxuICAgIGNvbnN0IHN0YXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnSDUnKTtcclxuICAgIGNvbnN0IG1vcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdJJyk7XHJcbiAgICBkb20uY2xhc3NMaXN0LmFkZCgnbWFya2VyLW9wZW5lZCcpO1xyXG4gICAgZG9tLmFwcGVuZENoaWxkKHN0YXRlKTtcclxuICAgIGRvbS5hcHBlbmRDaGlsZChtb3JlKTtcclxuICAgIFxyXG4gICAgaWYgKHRpbWV0YWJsZS5sZW5ndGgpIHtcclxuICAgICAgbW9yZS5pbm5lckhUTUwgPSAnVm9pciBsZXMgaG9yYWlyZXMnO1xyXG4gICAgICB0aGlzLl9jaGVja1RpbWUodGltZXRhYmxlLCBkb20pO1xyXG4gICAgICBzZXRJbnRlcnZhbCh0aGlzLl9jaGVja1RpbWUuYmluZCh0aGlzLCB0aW1ldGFibGUsIGRvbSksIDMwMDAwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuX21hcmtlcklzT3BlbmVkKGRvbSwgdHJ1ZSk7XHJcbiAgICAgIG1vcmUuaW5uZXJIVE1MID0gJ1RvdWpvdXJzIG91dmVydCc7ICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGRvbTtcclxuICB9XHJcblxyXG5cclxuICBfY2hlY2tUaW1lKHRpbWV0YWJsZSwgZG9tKSB7XHJcbiAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xyXG4gICAgbGV0IGhvdXIgPSBub3cuZ2V0SG91cnMoKTtcclxuICAgIGxldCBtaW51dGVzID0gbm93LmdldE1pbnV0ZXMoKTtcclxuICAgIGlmIChtaW51dGVzIDwgMTApIHtcclxuICAgICAgbWludXRlcyA9IGAwJHttaW51dGVzfWA7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZGF5T2ZXZWVrID0gbm93LmdldERheSgpIC0gMTtcclxuICAgIGNvbnN0IG9wZW5pbmdUaW1lID0gcGFyc2VJbnQoYCR7dGltZXRhYmxlW2RheU9mV2Vla10ub3Blbi5ofSR7dGltZXRhYmxlW2RheU9mV2Vla10ub3Blbi5tfWApO1xyXG4gICAgY29uc3QgY2xvc2luZ1RpbWUgPSBwYXJzZUludChgJHt0aW1ldGFibGVbZGF5T2ZXZWVrXS5jbG9zZS5ofSR7dGltZXRhYmxlW2RheU9mV2Vla10uY2xvc2UubX1gKTtcclxuICAgIGNvbnN0IGN1cnJlbnRUaW1lID0gcGFyc2VJbnQoYCR7aG91cn0ke21pbnV0ZXN9YCk7XHJcbiAgICAvLyBXb24ndCB3b3JrIGlmIHRpbWV0YWJsZSBvcGVuL2Nsb3NlIGhvdXJzIGFyZW4ndCBvbiB0aGUgc2FtZSBkYXlcclxuICAgIGlmICh0aW1ldGFibGVbZGF5T2ZXZWVrXS5pc09wZW4gJiYgaXNOYU4ob3BlbmluZ1RpbWUpKSB7IC8vIDI0Lzcgb3BlbmluZ1xyXG4gICAgICB0aGlzLl9tYXJrZXJJc09wZW5lZChkb20sIHRydWUpO1xyXG4gICAgfSBlbHNlIGlmICh0aW1ldGFibGVbZGF5T2ZXZWVrXS5pc09wZW4gJiYgY3VycmVudFRpbWUgPj0gb3BlbmluZ1RpbWUgJiYgY3VycmVudFRpbWUgPCBjbG9zaW5nVGltZSkge1xyXG4gICAgICBpZiAodGltZXRhYmxlW2RheU9mV2Vla10uYnJlYWsuaGFzQnJlYWspIHtcclxuICAgICAgICBjb25zdCBicmVha09wZW5pbmdUaW1lID0gcGFyc2VJbnQoYCR7dGltZXRhYmxlW2RheU9mV2Vla10uYnJlYWsuZW5kLmh9JHt0aW1ldGFibGVbZGF5T2ZXZWVrXS5icmVhay5lbmQubX1gKTtcclxuICAgICAgICBjb25zdCBicmVha0Nsb3NpbmdUaW1lID0gcGFyc2VJbnQoYCR7dGltZXRhYmxlW2RheU9mV2Vla10uYnJlYWsuc3RhcnQuaH0ke3RpbWV0YWJsZVtkYXlPZldlZWtdLmJyZWFrLnN0YXJ0Lm19YCk7XHJcbiAgICAgICAgaWYgKGN1cnJlbnRUaW1lID49IGJyZWFrQ2xvc2luZ1RpbWUgJiYgY3VycmVudFRpbWUgPCBicmVha09wZW5pbmdUaW1lKSB7XHJcbiAgICAgICAgICB0aGlzLl9tYXJrZXJJc0Nsb3NlZChkb20pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLl9tYXJrZXJJc09wZW5lZChkb20pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLl9tYXJrZXJJc09wZW5lZChkb20pO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgeyAgICAgIFxyXG4gICAgICB0aGlzLl9tYXJrZXJJc0Nsb3NlZChkb20pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIF9tYXJrZXJJc09wZW5lZChkb20sIGFsd2F5c09wZW5lZCkge1xyXG4gICAgZG9tLmZpcnN0Q2hpbGQuaW5uZXJIVE1MID0gYE91dmVydGA7XHJcbiAgICBpZiAoYWx3YXlzT3BlbmVkID09PSB0cnVlKSB7XHJcbiAgICAgIGRvbS5sYXN0Q2hpbGQuaW5uZXJIVE1MID0gYDI0aC8yNGggZXQgN2ovN2pgO1xyXG4gICAgfVxyXG4gICAgZG9tLmNsYXNzTGlzdC5hZGQoJ29wZW5lZCcpO1xyXG4gIH1cclxuXHJcblxyXG4gIF9tYXJrZXJJc0Nsb3NlZChkb20pIHtcclxuICAgIGRvbS5maXJzdENoaWxkLmlubmVySFRNTCA9IGBGZXJtw6lgO1xyXG4gICAgZG9tLmxhc3RDaGlsZC5pbm5lckhUTUwgPSBgVm9pciBsZXMgaG9yYWlyZXNgO1xyXG4gICAgZG9tLmNsYXNzTGlzdC5yZW1vdmUoJ29wZW5lZCcpO1xyXG4gIH1cclxuXHJcblxyXG4gIF90aW1ldGJhbGVNb2RhbChvcHRzKSB7XHJcbiAgICB0aGlzLmZldGNoTW9kYWwoJ3RpbWV0YWJsZW1vZGFsJykudGhlbihkb20gPT4ge1xyXG4gICAgICAvLyBVcGRhdGluZyBtb2RhbCBoZWFkZXIgYW5kIGluZm9cclxuICAgICAgZG9tLnF1ZXJ5U2VsZWN0b3IoJyNtYXJrLW5hbWUnKS5pbm5lckhUTUwgPSBvcHRzLm5hbWU7XHJcbiAgICAgIGRvbS5xdWVyeVNlbGVjdG9yKCcjbWFyay1hZGRyZXNzJykuaW5uZXJIVE1MID0gYCR7b3B0cy5hZGRyZXNzfSwgJHtvcHRzLnRvd259YDtcclxuICAgICAgY29uc3QgZGlzdGFuY2UgPSBVdGlscy5nZXREaXN0YW5jZUJldHdlZW5Db29yZHMoW29wdHMubGF0LCBvcHRzLmxuZ10sIFt0aGlzLl91c2VyLmxhdCwgdGhpcy5fdXNlci5sbmddKTtcclxuICAgICAgZG9tLnF1ZXJ5U2VsZWN0b3IoJyNtYXJrLWRpc3RhbmNlJykuaW5uZXJIVE1MID0gYFZvdXMgw6h0ZXMgw6AgZW52aXJvbiAke1V0aWxzLmNvbnZlcnREaXN0YW5jZVRvU3RyaW5nKGRpc3RhbmNlKX0gZGUgPGI+JHtvcHRzLm5hbWV9PC9iPiDDoCB2b2wgZCdvaXNlYXVgO1xyXG4gICAgICBjb25zdCBldGEgPSBVdGlscy5idWlsZERpc3RhbmNlRVRBKGRpc3RhbmNlKTtcclxuICAgICAgZG9tLnF1ZXJ5U2VsZWN0b3IoJyNtYXJrLWV0YScpLmlubmVySFRNTCA9IGBDZSBxdWkgcmVwcsOpc2VudGUgZW52aXJvbiAke2V0YS5jYXJ9IGVuIHZvaXR1cmUsIG91ICR7ZXRhLndhbGt9IMOgIHBpZWQuYDtcclxuICAgICAgZG9tLnF1ZXJ5U2VsZWN0b3IoJyNtYXJrLXN0YXRlJykuYXBwZW5kQ2hpbGQodGhpcy5fbWFya2VyT3BlbmVkU3RhdGUob3B0cy50aW1ldGFibGUpKTtcclxuICAgICAgLy8gTm93IHVwZGF0ZSBkYXkgYnkgZGF5XHJcbiAgICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XHJcbiAgICAgIGNvbnN0IGRheU9mV2VlayA9IG5vdy5nZXREYXkoKSAtIDE7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3B0cy50aW1ldGFibGUubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICBjb25zdCBkYXlEb20gPSBkb20ucXVlcnlTZWxlY3RvcignI3RpbWV0YWJsZScpLmNoaWxkcmVuW2ldO1xyXG4gICAgICAgIGlmIChvcHRzLnRpbWV0YWJsZVtpXS5pc09wZW4gPT09IHRydWUpIHtcclxuICAgICAgICAgIGNvbnN0IG1vcm5pbmcgPSBkYXlEb20ubGFzdEVsZW1lbnRDaGlsZC5maXJzdEVsZW1lbnRDaGlsZDtcclxuICAgICAgICAgIGNvbnN0IGFmdGVybm9vbiA9IGRheURvbS5sYXN0RWxlbWVudENoaWxkLmxhc3RFbGVtZW50Q2hpbGQ7XHJcbiAgICAgICAgICBpZiAob3B0cy50aW1ldGFibGVbaV0uYnJlYWsgJiYgb3B0cy50aW1ldGFibGVbaV0uYnJlYWsuaGFzQnJlYWsgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgbW9ybmluZy5pbm5lckhUTUwgPSBgPHA+JHtvcHRzLnRpbWV0YWJsZVtpXS5vcGVuLmh9OiR7b3B0cy50aW1ldGFibGVbaV0ub3Blbi5tfSDigJIgJHtvcHRzLnRpbWV0YWJsZVtpXS5icmVhay5zdGFydC5ofToke29wdHMudGltZXRhYmxlW2ldLmJyZWFrLnN0YXJ0Lm19PC9wPmA7XHJcbiAgICAgICAgICAgIG1vcm5pbmcuY2xhc3NMaXN0LmFkZCgnZmlsbGVkJyk7IC8vIE1vcm5pbmdcclxuICAgICAgICAgICAgbW9ybmluZy5jbGFzc0xpc3QuYWRkKCdzcGxpdGVkJyk7IC8vIE1vcm5pbmdcclxuICAgICAgICAgICAgYWZ0ZXJub29uLmlubmVySFRNTCA9IGA8cD4ke29wdHMudGltZXRhYmxlW2ldLmJyZWFrLmVuZC5ofToke29wdHMudGltZXRhYmxlW2ldLmJyZWFrLmVuZC5tfSDigJIgJHtvcHRzLnRpbWV0YWJsZVtpXS5jbG9zZS5ofToke29wdHMudGltZXRhYmxlW2ldLmNsb3NlLm19PC9wPmA7XHJcbiAgICAgICAgICAgIGFmdGVybm9vbi5jbGFzc0xpc3QuYWRkKCdmaWxsZWQnKTsgLy8gQWZ0ZXJub29uXHJcbiAgICAgICAgICAgIGFmdGVybm9vbi5jbGFzc0xpc3QuYWRkKCdzcGxpdGVkJyk7IC8vIEFmdGVybm9vblxyXG4gICAgICAgICAgfSBlbHNlIGlmIChvcHRzLnRpbWV0YWJsZVtpXS5vcGVuLmggJiYgb3B0cy50aW1ldGFibGVbaV0uY2xvc2UuaCkge1xyXG4gICAgICAgICAgICBtb3JuaW5nLmlubmVySFRNTCA9IGA8cD4ke29wdHMudGltZXRhYmxlW2ldLm9wZW4uaH06JHtvcHRzLnRpbWV0YWJsZVtpXS5vcGVuLm19PC9wPmA7XHJcbiAgICAgICAgICAgIG1vcm5pbmcuY2xhc3NMaXN0LmFkZCgnZmlsbGVkJyk7IC8vIE1vcm5pbmdcclxuICAgICAgICAgICAgYWZ0ZXJub29uLmlubmVySFRNTCA9IGA8cD4ke29wdHMudGltZXRhYmxlW2ldLmNsb3NlLmh9OiR7b3B0cy50aW1ldGFibGVbaV0uY2xvc2UubX08L3A+YDtcclxuICAgICAgICAgICAgYWZ0ZXJub29uLmNsYXNzTGlzdC5hZGQoJ2ZpbGxlZCcpOyAvLyBBZnRlcm5vb25cclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG1vcm5pbmcuaW5uZXJIVE1MID0gYDxwPjAwOjAwPC9wPmA7XHJcbiAgICAgICAgICAgIG1vcm5pbmcuY2xhc3NMaXN0LmFkZCgnZmlsbGVkJyk7IC8vIE1vcm5pbmdcclxuICAgICAgICAgICAgYWZ0ZXJub29uLmlubmVySFRNTCA9IGA8cD4yNDowMDwvcD5gO1xyXG4gICAgICAgICAgICBhZnRlcm5vb24uY2xhc3NMaXN0LmFkZCgnZmlsbGVkJyk7IC8vIEFmdGVybm9vblxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBkYXlEb20ubGFzdEVsZW1lbnRDaGlsZC5pbm5lckhUTUwgPSBgPGRpdiBjbGFzcz1cImNsb3NlZFwiPjxwPkZlcm3DqTwvcD48L2Rpdj5gOyAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gTWF0Y2hpbmcgdG9kYXkncyBkYXlcclxuICAgICAgICBpZiAoaSA9PT0gZGF5T2ZXZWVrKSB7XHJcbiAgICAgICAgICBkYXlEb20uY2xhc3NMaXN0LmFkZCgndG9kYXknKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RhbC1vdmVybGF5JykuYXBwZW5kQ2hpbGQoZG9tKTtcclxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsLW92ZXJsYXknKS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG5cdFx0XHRzZXRUaW1lb3V0KCgpID0+IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RhbC1vdmVybGF5Jykuc3R5bGUub3BhY2l0eSA9IDEsIDUwKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbi8qIFNlYXJjaCBtb2RhbCBtZXRob2RzICovXHJcblxyXG4vKlxyXG4gIF9zZWFyY2hNb2RhbCgpIHtcclxuICAgIHRoaXMuX2ZldGNoTW9kYWwoJ3NlYXJjaG1vZGFsJykudGhlbihkb20gPT4ge1xyXG4gICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXModGhpcy5fbWFya3MpO1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICBkb20uZmlyc3RFbGVtZW50Q2hpbGQuYXBwZW5kQ2hpbGQodGhpcy5fY3JlYXRlTWFya0NhdGVnb3J5U2VhcmNoSWNvbihrZXlzW2ldKSk7XHJcbiAgICAgIH1cclxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsLW92ZXJsYXknKS5hcHBlbmRDaGlsZChkb20pO1xyXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWwtb3ZlcmxheScpLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XHJcblx0XHRcdHNldFRpbWVvdXQoKCkgPT4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsLW92ZXJsYXknKS5zdHlsZS5vcGFjaXR5ID0gMSwgNTApO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgX2NyZWF0ZU1hcmtDYXRlZ29yeVNlYXJjaEljb24odHlwZSkge1xyXG4gICAgY29uc3QgZG9tID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XHJcbiAgICBjb25zdCBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdJTUcnKTtcclxuICAgIGNvbnN0IGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnUCcpO1xyXG4gICAgZG9tLmNsYXNzTGlzdC5hZGQoJ2ZpbHRlcmluZy1lbGVtZW50Jyk7XHJcbiAgICBpbWcuc3JjID0gYC9hc3NldHMvaW1nL21hcmtlci8ke3R5cGV9LnN2Z2A7XHJcbiAgICBsYWJlbC5pbm5lckhUTUwgPSB0eXBlO1xyXG4gICAgZG9tLmFwcGVuZENoaWxkKGltZyk7XHJcbiAgICBkb20uYXBwZW5kQ2hpbGQobGFiZWwpO1xyXG4gICAgcmV0dXJuIGRvbTtcclxuICB9XHJcbiovXHJcblxyXG4gIC8qIE1vZGFsIG1ldGhvZHMgKi9cclxuXHJcbiAgZmV0Y2hNb2RhbCh1cmwpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuICAgICAgZmV0Y2goYC9hc3NldHMvaHRtbC8ke3VybH0uaHRtbGApLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgZGF0YS50ZXh0KCkudGhlbihodG1sID0+IHtcclxuICAgICAgICAgIHJlc29sdmUoZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKS5jcmVhdGVDb250ZXh0dWFsRnJhZ21lbnQoaHRtbCkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG4gIGNsb3NlTW9kYWwoZXZlbnQsIGZvcmNlKSB7XHJcblx0XHRpZiAoZm9yY2UgPT09IHRydWUgfHwgZXZlbnQudGFyZ2V0LmlkID09PSAnbW9kYWwtb3ZlcmxheScgfHwgZXZlbnQudGFyZ2V0LmlkLmluZGV4T2YoJ2Nsb3NlJykgIT09IC0xKSB7XHJcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RhbC1vdmVybGF5Jykuc3R5bGUub3BhY2l0eSA9IDA7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RhbC1vdmVybGF5Jykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWwtb3ZlcmxheScpLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICB9LCAzMDApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIGdldCB1c2VyKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3VzZXI7XHJcbiAgfVxyXG5cclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1vbkRvdXJkYW5uYWlzO1xyXG4iXSwibmFtZXMiOlsiTWFya2VycyIsIlV0aWxzIiwiTWFwIiwib3B0aW9ucyIsIl9jbGFzc0NhbGxDaGVjayIsIl9pZCIsInRhcmdldElkIiwiX21hcCIsIl9tYXJrcyIsIl9wb2x5Z29ucyIsIl9sYXllcnMiLCJDYXJ0ZSIsIlNhdGVsbGl0ZSIsIl9pbml0IiwiX2V2ZW50cyIsIl9jcmVhdGVDbGFzcyIsImtleSIsInZhbHVlIiwid2luZG93IiwiTCIsIm1hcCIsInpvb21Db250cm9sIiwic2V0VmlldyIsIkNDREhfQ0VOVEVSIiwiTEFUIiwiTE5HIiwiY29udHJvbCIsInNjYWxlIiwiYWRkVG8iLCJzZXRNYXhCb3VuZHMiLCJNQVBfQk9VTkRTIiwiT1NNX0xBWUVSIiwiRVNSSV9MQVlFUiIsImxheWVycyIsInBvc2l0aW9uIiwiX3RoaXMiLCJvbiIsIl9tYXBDbGlja2VkIiwiYmluZCIsInBhbkluc2lkZUJvdW5kcyIsImFuaW1hdGUiLCJvcHRzIiwiY29uc29sZSIsImxvZyIsImxhdGxuZyIsIkpTT04iLCJzdHJpbmdpZnkiLCJsYXQiLCJsbmciLCJkcmF3VXNlck1hcmtlciIsIm1kIiwidXNlciIsIm1hcmtlciIsImljb24iLCJzZXRMYXRMbmciLCJhZGRNYXJrIiwiY3JlYXRlUG9wdXAiLCJfdGhpczIiLCJ0eXBlcyIsInR5cGUiLCJzcGxpdCIsImxlbmd0aCIsImNvbmNhdCIsImZseVRvIiwiYmluZFBvcHVwIiwiaSIsInB1c2giLCJhZGRQb2x5Z29uIiwicG9seWdvbiIsIk9iamVjdCIsImZyZWV6ZSIsInJlc3RhdXJhbnQiLCJJY29uIiwiaWNvblVybCIsImljb25TaXplIiwiaWNvbkFuY2hvciIsInBvcHVwQW5jaG9yIiwic2hhZG93VXJsIiwic2hhZG93U2l6ZSIsInNoYWRvd0FuY2hvciIsImJhciIsInRvYmFjY28iLCJjZWxsYXIiLCJzcG9ydCIsInN0b3JlIiwiYm9vayIsImxhbmRtYXJrIiwiY3JhZnQiLCJnYXJkZW4iLCJjYXIiLCJnYXMiLCJhbmltYWwiLCJtYWlsIiwicGFyayIsInJlY3ljbGUiLCJhZG1pbmlzdHJhdGlvbiIsImJhbmsiLCJtZWRpY2FsIiwiZGVjbyIsImJhcnN0b3JlIiwiZ2V0RGlzdGFuY2VCZXR3ZWVuQ29vcmRzIiwiZnJvbSIsInRvIiwibG9uMSIsIk1hdGgiLCJQSSIsImxhdDEiLCJsb24yIiwibGF0MiIsImRlbHRhTGF0IiwiZGVsdGFMb24iLCJhIiwicG93Iiwic2luIiwiY29zIiwiYyIsImFzaW4iLCJzcXJ0IiwiY29udmVydERpc3RhbmNlVG9TdHJpbmciLCJkaXN0YW5jZSIsInByZWNpc2lvblJvdW5kIiwiYnVpbGREaXN0YW5jZUVUQSIsImNhck1pbnV0ZXMiLCJjYXJTZWNvbmRzIiwiZmxvb3IiLCJ3YWxrTWludXRlcyIsIndhbGtTZWNvbmRzIiwid2FsayIsInByZWNpc2lvbiIsIm11bHRpcGxpZXIiLCJyb3VuZCIsImxhdExuZ0JvdW5kcyIsImxhdExuZyIsInRpbGVMYXllciIsImF0dHJpYnV0aW9uIiwibWF4Wm9vbSIsIm1pblpvb20iLCJNb25Eb3VyZGFubmFpcyIsIl9kYXRhIiwiX3VzZXIiLCJIT01FX0xBVCIsIkhPTUVfTE5HIiwiYWNjdXJhY3kiLCJfaW5pdEdlb2xvY2F0aW9uIiwidGhlbiIsIl9mZXRjaE1hcmtlcnMiLCJfaW5pdE1hcCIsIl9pbml0RXZlbnRzIiwiX2J1aWxkTWFya2VycyIsIl9idWlsZFBvbHlnb25zIiwiUHJvbWlzZSIsInJlc29sdmUiLCJuYXZpZ2F0b3IiLCJlbmFibGVIaWdoQWNjdXJhY3kiLCJtYXhpbXVtQWdlIiwidGltZW91dCIsIl93YXRjaElkIiwiZ2VvbG9jYXRpb24iLCJ3YXRjaFBvc2l0aW9uIiwiY29vcmRzIiwibGF0aXR1ZGUiLCJsb25naXR1ZGUiLCJmZXRjaCIsImRhdGEiLCJqc29uIiwianNvbkRhdGEiLCJfdGhpczMiLCJfdGhpczQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNsb3NlTW9kYWwiLCJfdGhpczUiLCJrZXlzIiwibWFya2VycyIsImoiLCJfY3JlYXRlTWFya2VyUG9wdXAiLCJfdGhpczYiLCJjaXR5Qm91bmRzIiwiZG9tIiwiY3JlYXRlRWxlbWVudCIsInRpdGxlIiwiYWRkcmVzcyIsInRvd24iLCJwaG9uZSIsIndlYnNpdGUiLCJpbmZvIiwib3BlbldpdGgiLCJjbGFzc0xpc3QiLCJhZGQiLCJpbm5lckhUTUwiLCJuYW1lIiwiaHJlZiIsInNldEF0dHJpYnV0ZSIsImFwcGVuZENoaWxkIiwiYnV0dG9uIiwiX21hcmtlck9wZW5lZFN0YXRlIiwidGltZXRhYmxlIiwiX3RpbWV0YmFsZU1vZGFsIiwic3RhdGUiLCJtb3JlIiwiX2NoZWNrVGltZSIsInNldEludGVydmFsIiwiX21hcmtlcklzT3BlbmVkIiwibm93IiwiRGF0ZSIsImhvdXIiLCJnZXRIb3VycyIsIm1pbnV0ZXMiLCJnZXRNaW51dGVzIiwiZGF5T2ZXZWVrIiwiZ2V0RGF5Iiwib3BlbmluZ1RpbWUiLCJwYXJzZUludCIsIm9wZW4iLCJoIiwibSIsImNsb3NpbmdUaW1lIiwiY2xvc2UiLCJjdXJyZW50VGltZSIsImlzT3BlbiIsImlzTmFOIiwiaGFzQnJlYWsiLCJicmVha09wZW5pbmdUaW1lIiwiZW5kIiwiYnJlYWtDbG9zaW5nVGltZSIsInN0YXJ0IiwiX21hcmtlcklzQ2xvc2VkIiwiYWx3YXlzT3BlbmVkIiwiZmlyc3RDaGlsZCIsImxhc3RDaGlsZCIsInJlbW92ZSIsIl90aGlzNyIsImZldGNoTW9kYWwiLCJxdWVyeVNlbGVjdG9yIiwiZXRhIiwiZGF5RG9tIiwiY2hpbGRyZW4iLCJtb3JuaW5nIiwibGFzdEVsZW1lbnRDaGlsZCIsImZpcnN0RWxlbWVudENoaWxkIiwiYWZ0ZXJub29uIiwic3R5bGUiLCJkaXNwbGF5Iiwic2V0VGltZW91dCIsIm9wYWNpdHkiLCJ1cmwiLCJ0ZXh0IiwiaHRtbCIsImNyZWF0ZVJhbmdlIiwiY3JlYXRlQ29udGV4dHVhbEZyYWdtZW50IiwiZXZlbnQiLCJmb3JjZSIsInRhcmdldCIsImlkIiwiaW5kZXhPZiIsImdldCJdLCJzb3VyY2VSb290IjoiIn0=
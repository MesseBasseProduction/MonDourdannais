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
      }).setView([_Utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].HOME_LAT, _Utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].HOME_LNG], 13);
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
      console.log(opts.latlng);
      console.log(this._map.getBounds());
      window._tmp.push([opts.latlng.lat, opts.latlng.lng]);
      console.log(JSON.stringify(window._tmp));
    }
  }, {
    key: "drawUserMarker",
    value: function drawUserMarker() {
      if (!window.hm.user.marker) {
        window.hm.user.marker = window.L.marker([window.hm.user.lat, window.hm.user.lng], {
          icon: _MarkerEnum_js__WEBPACK_IMPORTED_MODULE_0__["default"].user
        });
        window.hm.user.marker.addTo(this._map);
      } else {
        window.hm.user.marker.setLatLng(window.hm.user);
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
  HOME_LAT: 48.522667,
  HOME_LNG: 2.079561,
  MAP_BOUNDS: window.L.latLngBounds(window.L.latLng(51.04484764446179, -5.965075683593751), window.L.latLng(41.520916896362515, 9.063720703125002)),
  OSM_LAYER: window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 21,
    maxNativeZoom: 19,
    minZoom: 8
  }),
  ESRI_LAYER: window.L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: '&copy; <a href="https://www.arcgis.com/home/item.html?id=10df2279f9684e4a9f6a7f08febac2a9">Esri Imagery</a>',
    maxZoom: 21,
    maxNativeZoom: 19,
    minZoom: 8
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
    window._tmp = [];
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
          console.log(_this6._data.cityBounds[keys[i]]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QztJQUNwQkMsWUFBWSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUU7RUFDdkIsQ0FBQyxDQUFDO0VBQ0ZJLEtBQUssRUFBRSxJQUFJbEUsTUFBTSxDQUFDQyxDQUFDLENBQUNzRCxJQUFJLENBQUM7SUFDdkJDLE9BQU8sRUFBRSw2QkFBNkI7SUFDdENDLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDbEJDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFdBQVcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUNyQkMsU0FBUyxFQUFFLHFDQUFxQztJQUNoREMsVUFBVSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUNwQkMsWUFBWSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUU7RUFDdkIsQ0FBQyxDQUFDO0VBQ0ZLLElBQUksRUFBRSxJQUFJbkUsTUFBTSxDQUFDQyxDQUFDLENBQUNzRCxJQUFJLENBQUM7SUFDdEJDLE9BQU8sRUFBRSw0QkFBNEI7SUFDckNDLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDbEJDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFdBQVcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUNyQkMsU0FBUyxFQUFFLHFDQUFxQztJQUNoREMsVUFBVSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUNwQkMsWUFBWSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUU7RUFDdkIsQ0FBQyxDQUFDO0VBQ0ZNLFFBQVEsRUFBRSxJQUFJcEUsTUFBTSxDQUFDQyxDQUFDLENBQUNzRCxJQUFJLENBQUM7SUFDMUJDLE9BQU8sRUFBRSxnQ0FBZ0M7SUFDekNDLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDbEJDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFdBQVcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUNyQkMsU0FBUyxFQUFFLHFDQUFxQztJQUNoREMsVUFBVSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUNwQkMsWUFBWSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUU7RUFDdkIsQ0FBQyxDQUFDO0VBQ0ZPLEtBQUssRUFBRSxJQUFJckUsTUFBTSxDQUFDQyxDQUFDLENBQUNzRCxJQUFJLENBQUM7SUFDdkJDLE9BQU8sRUFBRSw2QkFBNkI7SUFDdENDLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDbEJDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFdBQVcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUNyQkMsU0FBUyxFQUFFLHFDQUFxQztJQUNoREMsVUFBVSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUNwQkMsWUFBWSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUU7RUFDdkIsQ0FBQyxDQUFDO0VBQ0ZRLE1BQU0sRUFBRSxJQUFJdEUsTUFBTSxDQUFDQyxDQUFDLENBQUNzRCxJQUFJLENBQUM7SUFDeEJDLE9BQU8sRUFBRSw4QkFBOEI7SUFDdkNDLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDbEJDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFdBQVcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUNyQkMsU0FBUyxFQUFFLHFDQUFxQztJQUNoREMsVUFBVSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUNwQkMsWUFBWSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUU7RUFDdkIsQ0FBQyxDQUFDO0VBQ0ZTLEdBQUcsRUFBRSxJQUFJdkUsTUFBTSxDQUFDQyxDQUFDLENBQUNzRCxJQUFJLENBQUM7SUFDckJDLE9BQU8sRUFBRSwyQkFBMkI7SUFDcENDLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDbEJDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFdBQVcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUNyQkMsU0FBUyxFQUFFLHFDQUFxQztJQUNoREMsVUFBVSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUNwQkMsWUFBWSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUU7RUFDdkIsQ0FBQyxDQUFDO0VBQ0ZVLEdBQUcsRUFBRSxJQUFJeEUsTUFBTSxDQUFDQyxDQUFDLENBQUNzRCxJQUFJLENBQUM7SUFDckJDLE9BQU8sRUFBRSwyQkFBMkI7SUFDcENDLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDbEJDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFdBQVcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUNyQkMsU0FBUyxFQUFFLHFDQUFxQztJQUNoREMsVUFBVSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUNwQkMsWUFBWSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUU7RUFDdkIsQ0FBQyxDQUFDO0VBQ0ZXLE1BQU0sRUFBRSxJQUFJekUsTUFBTSxDQUFDQyxDQUFDLENBQUNzRCxJQUFJLENBQUM7SUFDeEJDLE9BQU8sRUFBRSw4QkFBOEI7SUFDdkNDLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDbEJDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFdBQVcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUNyQkMsU0FBUyxFQUFFLHFDQUFxQztJQUNoREMsVUFBVSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUNwQkMsWUFBWSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUU7RUFDdkIsQ0FBQyxDQUFDO0VBQ0ZZ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QUFXLENBQUMsQ0FBQyxDQUFDQyx3QkFBd0IsQ0FBQ0YsSUFBSSxDQUFDLENBQUM7VUFDaEUsQ0FBQyxDQUFDO1FBQ0osQ0FBQyxDQUFDO01BQ0osQ0FBQyxDQUFDO0lBQ0o7RUFBQztJQUFBdE8sR0FBQTtJQUFBQyxLQUFBLEVBR0QsU0FBQXdKLFdBQVdnRixLQUFLLEVBQUVDLEtBQUssRUFBRTtNQUN6QixJQUFJQSxLQUFLLEtBQUssSUFBSSxJQUFJRCxLQUFLLENBQUNFLE1BQU0sQ0FBQ0MsRUFBRSxLQUFLLGVBQWUsSUFBSUgsS0FBSyxDQUFDRSxNQUFNLENBQUNDLEVBQUUsQ0FBQ0MsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQ2xHdkYsUUFBUSxDQUFDQyxjQUFjLENBQUMsZUFBZSxDQUFDLENBQUN5RSxLQUFLLENBQUNHLE9BQU8sR0FBRyxDQUFDO1FBQzFERCxVQUFVLENBQUMsWUFBTTtVQUNmNUUsUUFBUSxDQUFDQyxjQUFjLENBQUMsZUFBZSxDQUFDLENBQUN5RSxLQUFLLENBQUNDLE9BQU8sR0FBRyxNQUFNO1VBQy9EM0UsUUFBUSxDQUFDQyxjQUFjLENBQUMsZUFBZSxDQUFDLENBQUNxQixTQUFTLEdBQUcsRUFBRTtRQUN6RCxDQUFDLEVBQUUsR0FBRyxDQUFDO01BQ1Q7SUFDRjtFQUFDO0lBQUE1SyxHQUFBO0lBQUE4TyxHQUFBLEVBR0QsU0FBQUEsSUFBQSxFQUFXO01BQ1QsT0FBTyxJQUFJLENBQUNuSCxLQUFLO0lBQ25CO0VBQUM7RUFBQSxPQUFBRixjQUFBO0FBQUE7QUFLSCxpRUFBZUEsY0FBYyxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vTW9uRG91cmRhbm5haXMvLi9zcmMvanMvdXRpbHMvTWFwLmpzIiwid2VicGFjazovL01vbkRvdXJkYW5uYWlzLy4vc3JjL2pzL3V0aWxzL01hcmtlckVudW0uanMiLCJ3ZWJwYWNrOi8vTW9uRG91cmRhbm5haXMvLi9zcmMvanMvdXRpbHMvVXRpbHMuanMiLCJ3ZWJwYWNrOi8vTW9uRG91cmRhbm5haXMvLi9zcmMvc2Nzcy9Nb25Eb3VyZGFubmFpcy5zY3NzPzkyY2YiLCJ3ZWJwYWNrOi8vTW9uRG91cmRhbm5haXMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vTW9uRG91cmRhbm5haXMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL01vbkRvdXJkYW5uYWlzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vTW9uRG91cmRhbm5haXMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9Nb25Eb3VyZGFubmFpcy8uL3NyYy9qcy9Nb25Eb3VyZGFubmFpcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTWFya2VycyBmcm9tICcuL01hcmtlckVudW0uanMnO1xyXG5pbXBvcnQgVXRpbHMgZnJvbSAnLi9VdGlscy5qcyc7XHJcblxyXG5cclxuY2xhc3MgTWFwIHtcclxuXHJcblxyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuICAgIHRoaXMuX2lkID0gb3B0aW9ucy50YXJnZXRJZDtcclxuICAgIHRoaXMuX21hcCA9IG51bGw7XHJcbiAgICB0aGlzLl9tYXJrcyA9IHt9O1xyXG4gICAgdGhpcy5fcG9seWdvbnMgPSBbXTtcclxuICAgIHRoaXMuX2xheWVycyA9IHtcclxuICAgICAgQ2FydGU6IG51bGwsXHJcbiAgICAgIFNhdGVsbGl0ZTogbnVsbFxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLl9pbml0KCk7XHJcbiAgICB0aGlzLl9ldmVudHMoKTtcclxuICB9XHJcblxyXG5cclxuICBfaW5pdCgpIHtcclxuICAgIC8vIFVzZSBtYWluIGRpdiB0byBpbmplY3QgT1NNIGludG9cclxuICAgIHRoaXMuX21hcCA9IHdpbmRvdy5MLm1hcCh0aGlzLl9pZCwge1xyXG4gICAgICB6b29tQ29udHJvbDogZmFsc2UsXHJcbiAgICB9KS5zZXRWaWV3KFtVdGlscy5IT01FX0xBVCwgVXRpbHMuSE9NRV9MTkddLCAxMyk7XHJcbiAgICAvLyBBZGQgbWV0ZXIgYW5kIGZlZXQgc2NhbGUgb24gbWFwXHJcbiAgICB3aW5kb3cuTC5jb250cm9sLnNjYWxlKCkuYWRkVG8odGhpcy5fbWFwKTtcclxuICAgIC8vIFByZXZlbnQgcGFubmluZyBvdXRzaWRlIG9mIHRoZSBtYXAgYm91bmRzIGRlZmluaW5lZCBpbiB1dGlsc1xyXG4gICAgdGhpcy5fbWFwLnNldE1heEJvdW5kcyhVdGlscy5NQVBfQk9VTkRTKTtcclxuICAgIC8vIEFkZCBsYXllciBncm91cCB0byBpbnRlcmZhY2UgYW5kIHN0YXJ0IG1hcCB3aXRoIG9zbSBkZWZhdWx0XHJcbiAgICB0aGlzLl9sYXllcnMuQ2FydGUgPSBVdGlscy5PU01fTEFZRVI7XHJcbiAgICB0aGlzLl9sYXllcnMuU2F0ZWxsaXRlID0gVXRpbHMuRVNSSV9MQVlFUjtcclxuICAgIHRoaXMuX2xheWVycy5DYXJ0ZS5hZGRUbyh0aGlzLl9tYXApO1xyXG4gICAgLy8gQWRkIGxheWVyIHN3aXRjaCByYWRpbyBvbiBib3R0b20gcmlnaHQgb2YgdGhlIG1hcFxyXG4gICAgd2luZG93LkwuY29udHJvbC5sYXllcnModGhpcy5fbGF5ZXJzLCB7fSwgeyBwb3NpdGlvbjogJ2JvdHRvbXJpZ2h0JyB9KS5hZGRUbyh0aGlzLl9tYXApO1xyXG4gIH1cclxuXHJcblxyXG4gIF9ldmVudHMoKSB7XHJcbiAgICAvLyBTdWJzY3JpYmUgdG8gY2xpY2sgZXZlbnQgb24gbWFwIHRvIHJlYWN0XHJcbiAgICB0aGlzLl9tYXAub24oJ2NsaWNrJywgdGhpcy5fbWFwQ2xpY2tlZC5iaW5kKHRoaXMpKTtcclxuICAgIC8vIE1hcCBpcyBkcmFnZ2VkIGJ5IHVzZXIgbW91c2UvZmluZ2VyXHJcbiAgICB0aGlzLl9tYXAub24oJ2RyYWcnLCAoKSA9PiB7XHJcbiAgICAgIC8vIENvbnN0cmFpbiBwYW4gdG8gdGhlIG1hcCBib3VuZHNcclxuICAgICAgdGhpcy5fbWFwLnBhbkluc2lkZUJvdW5kcyhVdGlscy5NQVBfQk9VTkRTLCB7IGFuaW1hdGU6IHRydWUgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG5cclxuICBfbWFwQ2xpY2tlZChvcHRzKSB7XHJcbiAgICBjb25zb2xlLmxvZyhvcHRzLmxhdGxuZyk7XHJcbiAgICBjb25zb2xlLmxvZyh0aGlzLl9tYXAuZ2V0Qm91bmRzKCkpO1xyXG4gICAgd2luZG93Ll90bXAucHVzaChbb3B0cy5sYXRsbmcubGF0LCBvcHRzLmxhdGxuZy5sbmddKTtcclxuICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHdpbmRvdy5fdG1wKSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgZHJhd1VzZXJNYXJrZXIoKSB7XHJcbiAgICBpZiAoIXdpbmRvdy5obS51c2VyLm1hcmtlcikge1xyXG4gICAgICB3aW5kb3cuaG0udXNlci5tYXJrZXIgPSB3aW5kb3cuTC5tYXJrZXIoW3dpbmRvdy5obS51c2VyLmxhdCwgd2luZG93LmhtLnVzZXIubG5nXSwge1xyXG4gICAgICAgIGljb246IE1hcmtlcnMudXNlclxyXG4gICAgICB9KTtcclxuICAgICAgd2luZG93LmhtLnVzZXIubWFya2VyLmFkZFRvKHRoaXMuX21hcCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB3aW5kb3cuaG0udXNlci5tYXJrZXIuc2V0TGF0TG5nKHdpbmRvdy5obS51c2VyKTtcclxuICAgIH1cclxuICB9XHJcblxyXG5cclxuICBhZGRNYXJrKG9wdHMsIGNyZWF0ZVBvcHVwKSB7XHJcbiAgICBsZXQgdHlwZXMgPSBvcHRzLnR5cGUuc3BsaXQoJy8nKTtcclxuICAgIGxldCB0eXBlID0gb3B0cy50eXBlO1xyXG4gICAgaWYgKHR5cGVzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgdHlwZSA9IGAke3R5cGVzWzBdfSR7dHlwZXNbMV19YDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBtYXJrZXIgPSB3aW5kb3cuTC5tYXJrZXIoW29wdHMubGF0LCBvcHRzLmxuZ10sIHsgXHJcbiAgICAgIGljb246IE1hcmtlcnNbdHlwZV1cclxuICAgIH0pLm9uKCdjbGljaycsICgpID0+IHtcclxuICAgICAgdGhpcy5fbWFwLmZseVRvKFtvcHRzLmxhdCwgb3B0cy5sbmddLCAxOCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBtYXJrZXIuYmluZFBvcHVwKGNyZWF0ZVBvcHVwKG9wdHMpKTtcclxuICAgIG1hcmtlci5hZGRUbyh0aGlzLl9tYXApO1xyXG4gICAgaWYgKHR5cGVzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0eXBlcy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgIGlmICghdGhpcy5fbWFya3NbdHlwZXNbaV1dKSB7XHJcbiAgICAgICAgICB0aGlzLl9tYXJrc1t0eXBlc1tpXV0gPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbWFya3NbdHlwZXNbaV1dLnB1c2gobWFya2VyKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKCF0aGlzLl9tYXJrc1t0eXBlXSkge1xyXG4gICAgICAgIHRoaXMuX21hcmtzW3R5cGVdID0gW107XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5fbWFya3NbdHlwZV0ucHVzaChtYXJrZXIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIGFkZFBvbHlnb24ocG9seWdvbikge1xyXG4gICAgdGhpcy5fcG9seWdvbnMucHVzaCh3aW5kb3cuTC5wb2x5Z29uKHBvbHlnb24pLmFkZFRvKHRoaXMuX21hcCkpO1xyXG4gIH1cclxuXHJcblxyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTWFwO1xyXG4iLCJleHBvcnQgZGVmYXVsdCBPYmplY3QuZnJlZXplKHtcclxuICByZXN0YXVyYW50OiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvcmVzdGF1cmFudC5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgYmFyOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvYmFyLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICB0b2JhY2NvOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvdG9iYWNjby5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgY2VsbGFyOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvY2VsbGFyLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBzdG9yZTogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL3N0b3JlLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBib29rOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvYm9vay5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgbGFuZG1hcms6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9sYW5kbWFyay5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgY3JhZnQ6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9jcmFmdC5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgZ2FyZGVuOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvZ2FyZGVuLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBjYXI6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9jYXIuc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIGdhczogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL2dhcy5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgYW5pbWFsOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvYW5pbWFsLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBtYWlsOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFpbC5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgcmVjeWNsZTogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL3JlY3ljbGUuc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIGFkbWluaXN0cmF0aW9uOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvYWRtaW5pc3RyYXRpb24uc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIGJhbms6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9iYW5rLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBtZWRpY2FsOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWVkaWNhbC5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgZGVjbzogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL2RlY28uc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLCAgXHJcbiAgdXNlcjogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL3VzZXIuc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdXHJcbiAgfSksXHJcbiAgYmFyc3RvcmU6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9taXhlZC9iYXJzdG9yZS5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF1cclxuICB9KSxcclxufSk7XHJcbiIsImNvbnN0IGdldERpc3RhbmNlQmV0d2VlbkNvb3JkcyA9IChmcm9tLCB0bykgPT4ge1xyXG4gIC8vIFJldHVybiBkaXN0YW5jZSBpbiBtZXRlcnNcclxuICBjb25zdCBsb24xID0gKGZyb21bMV0gKiBNYXRoLlBJKSAvIDE4MCxcclxuICAgIGxhdDEgPSAoZnJvbVswXSAqIE1hdGguUEkpIC8gMTgwLFxyXG4gICAgbG9uMiA9ICh0b1sxXSAqIE1hdGguUEkpIC8gMTgwLFxyXG4gICAgbGF0MiA9ICh0b1swXSAqIE1hdGguUEkpIC8gMTgwO1xyXG5cclxuICBjb25zdCBkZWx0YUxhdCA9IGxhdDIgLSBsYXQxO1xyXG4gIGNvbnN0IGRlbHRhTG9uID0gbG9uMiAtIGxvbjE7XHJcblxyXG4gIGNvbnN0IGEgPSBNYXRoLnBvdyhNYXRoLnNpbihkZWx0YUxhdCAvIDIpLCAyKSArIE1hdGguY29zKGxhdDEpICogTWF0aC5jb3MobGF0MikgKiBNYXRoLnBvdyhNYXRoLnNpbihkZWx0YUxvbiAvIDIpLCAyKTtcclxuICBjb25zdCBjID0gMiAqIE1hdGguYXNpbihNYXRoLnNxcnQoYSkpO1xyXG4gIHJldHVybiBjICogNjM3MSAqIDEwMDA7XHJcbn07XHJcblxyXG5cclxuY29uc3QgY29udmVydERpc3RhbmNlVG9TdHJpbmcgPSBkaXN0YW5jZSA9PiB7XHJcbiAgaWYgKGRpc3RhbmNlID4gMTAwMCkge1xyXG4gICAgZGlzdGFuY2UgPSBgJHtwcmVjaXNpb25Sb3VuZChkaXN0YW5jZSAvIDEwMDAsIDIpfWttYDtcclxuICB9IGVsc2Uge1xyXG4gICAgZGlzdGFuY2UgPSBgJHtwcmVjaXNpb25Sb3VuZChkaXN0YW5jZSwgMil9bWA7XHJcbiAgfVxyXG4gIHJldHVybiBkaXN0YW5jZTtcclxufTtcclxuXHJcblxyXG5jb25zdCBidWlsZERpc3RhbmNlRVRBID0gZGlzdGFuY2UgPT4ge1xyXG4gIGxldCBjYXJNaW51dGVzID0gMDtcclxuICBsZXQgY2FyU2Vjb25kcyA9IDA7XHJcblxyXG4gIGlmIChkaXN0YW5jZSA+IDUwMDAwKSB7XHJcbiAgICAvLyBPdmVyIDUwa20sIHdlIHVzZSBhdmVyYWdlIHNwZWVkIG9mIDEwMGttaFxyXG4gICAgY2FyTWludXRlcyA9IChkaXN0YW5jZSAvIDEwMDAwMCkgKiA2MDtcclxuICB9IGVsc2UgaWYgKGRpc3RhbmNlID4gMTAwMDApIHtcclxuICAgIC8vIE92ZXIgMTBrbSwgd2UgdXNlIGF2ZXJhZ2Ugc3BlZWQgb2YgNjBrbS9oXHJcbiAgICBjYXJNaW51dGVzID0gKGRpc3RhbmNlIC8gNjAwMDApICogNjA7XHJcbiAgfSBlbHNlIHtcclxuICAgIC8vIFVuZGVyIDEwa20gd2UgdXNlciBhdmVyYWdlIHNwZWVkIG9mIDMwa20vaFxyXG4gICAgY2FyTWludXRlcyA9IChkaXN0YW5jZSAvIDMwMDAwKSAqIDYwO1xyXG4gIH1cclxuXHJcbiAgY2FyU2Vjb25kcyA9IGNhck1pbnV0ZXMgJSAxOyAvLyBLZWVwIGZsb2F0aW5nIHZhbHVlIGZvciBzZWNvbmRzIGNvbXB1dGluZ1xyXG4gIGNhck1pbnV0ZXMgPSBNYXRoLmZsb29yKGNhck1pbnV0ZXMpOyAvLyBSZW1vdmUgZmxvYXRpbmcgdmFsdWVcclxuXHJcbiAgaWYgKGNhck1pbnV0ZXMgPiA2MCkge1xyXG4gICAgY2FyTWludXRlcyA9IGAke01hdGguZmxvb3IoY2FyTWludXRlcyAvIDYwKX1oICR7Y2FyTWludXRlcyAlIDYwfW1gO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBjYXJNaW51dGVzID0gYCR7Y2FyTWludXRlc31tYDtcclxuICB9XHJcblxyXG4gIGxldCB3YWxrTWludXRlcyA9IChkaXN0YW5jZSAvIDUwMDApICogNjA7XHJcbiAgbGV0IHdhbGtTZWNvbmRzID0gd2Fsa01pbnV0ZXMgJSAxO1xyXG4gIHdhbGtNaW51dGVzID0gTWF0aC5mbG9vcih3YWxrTWludXRlcyk7IC8vIFJlbW92ZSBmbG9hdGluZyB2YWx1ZVxyXG5cclxuICBpZiAod2Fsa01pbnV0ZXMgPiA2MCkge1xyXG4gICAgd2Fsa01pbnV0ZXMgPSBgJHtNYXRoLmZsb29yKHdhbGtNaW51dGVzIC8gNjApfWggJHt3YWxrTWludXRlcyAlIDYwfW1gO1xyXG4gIH0gZWxzZSB7XHJcbiAgICB3YWxrTWludXRlcyA9IGAke3dhbGtNaW51dGVzfW1gO1xyXG4gIH0gIFxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgY2FyOiBgJHtjYXJNaW51dGVzfSAke01hdGguZmxvb3IocHJlY2lzaW9uUm91bmQoKGNhclNlY29uZHMgLyAxMDApICogNjAsIDIpICogMTAwKX1zYCxcclxuICAgIHdhbGs6IGAke3dhbGtNaW51dGVzfSAke01hdGguZmxvb3IocHJlY2lzaW9uUm91bmQoKHdhbGtTZWNvbmRzIC8gMTAwKSAqIDYwLCAyKSAqIDEwMCl9c2AsXHJcbiAgfTtcclxufTtcclxuXHJcblxyXG5jb25zdCBwcmVjaXNpb25Sb3VuZCA9ICh2YWx1ZSwgcHJlY2lzaW9uKSA9PiB7XHJcbiAgY29uc3QgbXVsdGlwbGllciA9IE1hdGgucG93KDEwLCBwcmVjaXNpb24gfHwgMCk7XHJcbiAgcmV0dXJuIE1hdGgucm91bmQodmFsdWUgKiBtdWx0aXBsaWVyKSAvIG11bHRpcGxpZXI7XHJcbn07XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIEhPTUVfTEFUOiA0OC41MjI2NjcsXHJcbiAgSE9NRV9MTkc6IDIuMDc5NTYxLFxyXG4gIE1BUF9CT1VORFM6IHdpbmRvdy5MLmxhdExuZ0JvdW5kcyhcclxuICAgIHdpbmRvdy5MLmxhdExuZyg1MS4wNDQ4NDc2NDQ0NjE3OSwgLTUuOTY1MDc1NjgzNTkzNzUxKSxcclxuICAgIHdpbmRvdy5MLmxhdExuZyg0MS41MjA5MTY4OTYzNjI1MTUsIDkuMDYzNzIwNzAzMTI1MDAyKVxyXG4gICksXHJcbiAgT1NNX0xBWUVSOiB3aW5kb3cuTC50aWxlTGF5ZXIoJ2h0dHBzOi8ve3N9LnRpbGUub3BlbnN0cmVldG1hcC5vcmcve3p9L3t4fS97eX0ucG5nJywge1xyXG4gICAgYXR0cmlidXRpb246ICcmY29weTsgPGEgaHJlZj1cImh0dHBzOi8vd3d3Lm9wZW5zdHJlZXRtYXAub3JnL2NvcHlyaWdodFwiPk9wZW5TdHJlZXRNYXA8L2E+JyxcclxuICAgIG1heFpvb206IDIxLFxyXG4gICAgbWF4TmF0aXZlWm9vbTogMTksXHJcbiAgICBtaW5ab29tOiA4XHJcbiAgfSksXHJcbiAgRVNSSV9MQVlFUjogd2luZG93LkwudGlsZUxheWVyKCdodHRwczovL3NlcnZlci5hcmNnaXNvbmxpbmUuY29tL0FyY0dJUy9yZXN0L3NlcnZpY2VzL1dvcmxkX0ltYWdlcnkvTWFwU2VydmVyL3RpbGUve3p9L3t5fS97eH0nLCB7XHJcbiAgICBhdHRyaWJ1dGlvbjogJyZjb3B5OyA8YSBocmVmPVwiaHR0cHM6Ly93d3cuYXJjZ2lzLmNvbS9ob21lL2l0ZW0uaHRtbD9pZD0xMGRmMjI3OWY5Njg0ZTRhOWY2YTdmMDhmZWJhYzJhOVwiPkVzcmkgSW1hZ2VyeTwvYT4nLFxyXG4gICAgbWF4Wm9vbTogMjEsXHJcbiAgICBtYXhOYXRpdmVab29tOiAxOSxcclxuICAgIG1pblpvb206IDhcclxuICB9KSxcclxuICBnZXREaXN0YW5jZUJldHdlZW5Db29yZHM6IGdldERpc3RhbmNlQmV0d2VlbkNvb3JkcyxcclxuICBjb252ZXJ0RGlzdGFuY2VUb1N0cmluZzogY29udmVydERpc3RhbmNlVG9TdHJpbmcsXHJcbiAgYnVpbGREaXN0YW5jZUVUQTogYnVpbGREaXN0YW5jZUVUQSxcclxuICBwcmVjaXNpb25Sb3VuZDogcHJlY2lzaW9uUm91bmRcclxufTtcclxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgJy4uL3Njc3MvTW9uRG91cmRhbm5haXMuc2Nzcyc7XHJcbmltcG9ydCBNYXAgZnJvbSAnLi91dGlscy9NYXAuanMnO1xyXG5pbXBvcnQgVXRpbHMgZnJvbSAnLi91dGlscy9VdGlscy5qcyc7XHJcblxyXG5cclxuY2xhc3MgTW9uRG91cmRhbm5haXMge1xyXG5cclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLl9tYXAgPSBudWxsO1xyXG4gICAgdGhpcy5fbGF5ZXJzID0ge307XHJcbiAgICB0aGlzLl9kYXRhID0gbnVsbDtcclxuXHJcbiAgICB0aGlzLl91c2VyID0ge1xyXG4gICAgICBsYXQ6IFV0aWxzLkhPTUVfTEFULFxyXG4gICAgICBsbmc6IFV0aWxzLkhPTUVfTE5HLFxyXG4gICAgICBhY2N1cmFjeTogMCxcclxuICAgICAgbWFya2VyOiBudWxsXHJcbiAgICB9O1xyXG5cclxuICAgIHdpbmRvdy5fdG1wID0gW107XHJcblxyXG4gICAgdGhpcy5faW5pdEdlb2xvY2F0aW9uKClcclxuICAgICAgLnRoZW4odGhpcy5fZmV0Y2hNYXJrZXJzLmJpbmQodGhpcykpXHJcbiAgICAgIC50aGVuKHRoaXMuX2luaXRNYXAuYmluZCh0aGlzKSlcclxuICAgICAgLnRoZW4odGhpcy5faW5pdEV2ZW50cy5iaW5kKHRoaXMpKVxyXG4gICAgICAudGhlbih0aGlzLl9idWlsZE1hcmtlcnMuYmluZCh0aGlzKSlcclxuICAgICAgLnRoZW4odGhpcy5fYnVpbGRQb2x5Z29ucy5iaW5kKHRoaXMpKTtcclxuICB9XHJcblxyXG5cclxuICBfaW5pdEdlb2xvY2F0aW9uKCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xyXG5cdFx0XHRpZiAoJ2dlb2xvY2F0aW9uJyBpbiBuYXZpZ2F0b3IpIHtcclxuXHRcdFx0XHRjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgZW5hYmxlSGlnaEFjY3VyYWN5OiB0cnVlLCAvLyBNb3JlIGNvbnN1cHRpb24sIGJldHRlciBwb3NpdGlvblxyXG4gICAgICAgICAgbWF4aW11bUFnZTogMTAwMCwgLy8gQSBwb3NpdGlvbiB3aWxsIGxhc3QgMXMgbWF4aW11bVxyXG4gICAgICAgICAgdGltZW91dDogOTAwLCAvLyBBIHBvc2l0aW9uIGlzIHVwZGF0ZWQgaW4gMC45cyBtYXhpbXVtXHJcbiAgICAgICAgfTtcclxuXHRcdFx0XHR0aGlzLl93YXRjaElkID0gbmF2aWdhdG9yLmdlb2xvY2F0aW9uLndhdGNoUG9zaXRpb24ocG9zaXRpb24gPT4ge1xyXG5cdFx0XHRcdFx0Ly8gVXBkYXRlIHNhdmVkIHVzZXIgcG9zaXRpb25cclxuXHRcdFx0XHRcdHRoaXMuX3VzZXIubGF0ID0gcG9zaXRpb24uY29vcmRzLmxhdGl0dWRlO1xyXG5cdFx0XHRcdFx0dGhpcy5fdXNlci5sbmcgPSBwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlO1xyXG5cdFx0XHRcdFx0dGhpcy5fdXNlci5hY2N1cmFjeSA9IHBvc2l0aW9uLmNvb3Jkcy5hY2N1cmFjeTtcclxuXHRcdFx0XHRcdC8vIE9ubHkgZHJhdyBtYXJrZXIgaWYgbWFwIGlzIGFscmVhZHkgY3JlYXRlZFxyXG5cdFx0XHRcdFx0aWYgKHRoaXMuX21hcCkge1xyXG4gICAgICAgICAgICB0aGlzLl9tYXAuZHJhd1VzZXJNYXJrZXIoKTtcclxuICAgICAgICAgIH1cclxuXHRcdFx0XHRcdHJlc29sdmUoKTtcclxuXHRcdFx0XHR9LCByZXNvbHZlLCBvcHRpb25zKTtcclxuICAgICAgfSBlbHNlIHtcclxuXHRcdFx0XHRyZXNvbHZlKCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG4gIH1cclxuXHJcblxyXG4gIF9mZXRjaE1hcmtlcnMoKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICAgIGZldGNoKGAvYXNzZXRzL2pzb24vTWFwRGF0YS5qc29uYCkudGhlbihkYXRhID0+IHtcclxuICAgICAgICBkYXRhLmpzb24oKS50aGVuKGpzb25EYXRhID0+IHtcclxuICAgICAgICAgIHRoaXMuX2RhdGEgPSBqc29uRGF0YTtcclxuICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICB9KS5jYXRjaChyZXNvbHZlKTtcclxuICAgICAgfSkuY2F0Y2gocmVzb2x2ZSk7XHJcbiAgICB9KTtcclxuICB9ICBcclxuXHJcblxyXG4gIF9pbml0TWFwKCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xyXG4gICAgICB0aGlzLl9tYXAgPSBuZXcgTWFwKHtcclxuICAgICAgICB0YXJnZXRJZDogJ3Nhcm1hdGVzLWxhbmQnXHJcbiAgICAgIH0pO1xyXG4gICAgICByZXNvbHZlKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG5cclxuICBfaW5pdEV2ZW50cygpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuICAgICAgLy8gTGlzdGVuaW5nIHRvIG1vZGFsIGV2ZW50XHJcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RhbC1vdmVybGF5JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsb3NlTW9kYWwuYmluZCh0aGlzKSk7XHJcbiAgICAgIHJlc29sdmUoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG4gIF9idWlsZE1hcmtlcnMoKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyh0aGlzLl9kYXRhLm1hcmtlcnMpO1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuX2RhdGEubWFya2Vyc1trZXlzW2ldXS5sZW5ndGg7ICsraikge1xyXG4gICAgICAgICAgdGhpcy5fbWFwLmFkZE1hcmsodGhpcy5fZGF0YS5tYXJrZXJzW2tleXNbaV1dW2pdLCB0aGlzLl9jcmVhdGVNYXJrZXJQb3B1cC5iaW5kKHRoaXMpKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgX2J1aWxkUG9seWdvbnMoKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyh0aGlzLl9kYXRhLmNpdHlCb3VuZHMpO1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICB0aGlzLl9tYXAuYWRkUG9seWdvbih0aGlzLl9kYXRhLmNpdHlCb3VuZHNba2V5c1tpXV0pO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuX2RhdGEuY2l0eUJvdW5kc1trZXlzW2ldXSlcclxuICAgICAgfVxyXG4gICAgICByZXNvbHZlKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG5cclxuICAvKiBNYXAgVXRpbHMgKi9cclxuXHJcblxyXG4gIF9jcmVhdGVNYXJrZXJQb3B1cChvcHRzKSB7XHJcbiAgICBjb25zdCBkb20gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcclxuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnSDMnKTtcclxuICAgIGNvbnN0IGFkZHJlc3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdJJyk7XHJcbiAgICBjb25zdCB0b3duID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnSScpO1xyXG4gICAgY29uc3QgcGhvbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdBJyk7XHJcbiAgICBjb25zdCB3ZWJzaXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnQScpO1xyXG4gICAgY29uc3QgaW5mbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ1AnKTtcclxuICAgIGNvbnN0IG9wZW5XaXRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnQScpO1xyXG5cclxuICAgIGRvbS5jbGFzc0xpc3QuYWRkKCdtYXJrZXItcG9wdXAnKTtcclxuICAgIHRpdGxlLmlubmVySFRNTCA9IG9wdHMubmFtZTtcclxuICAgIGFkZHJlc3MuaW5uZXJIVE1MID0gb3B0cy5hZGRyZXNzO1xyXG4gICAgdG93bi5pbm5lckhUTUwgPSBvcHRzLnRvd247XHJcbiAgICBwaG9uZS5ocmVmID0gYHRlbDoke29wdHMucGhvbmV9YDtcclxuICAgIHBob25lLmlubmVySFRNTCA9IGA8aW1nIHNyYz1cIi9hc3NldHMvaW1nL2ljb24vcGhvbmUuc3ZnXCI+JHtvcHRzLnBob25lfWA7XHJcbiAgICB3ZWJzaXRlLmhyZWYgPSBvcHRzLndlYnNpdGU7XHJcbiAgICB3ZWJzaXRlLmlubmVySFRNTCA9ICc8aW1nIHNyYz1cIi9hc3NldHMvaW1nL2ljb24vd2ViLnN2Z1wiPkNvbnN1bHRlciBsZSBzaXRlJztcclxuICAgIHdlYnNpdGUuc2V0QXR0cmlidXRlKCdyZWwnLCAnbm9vcGVuZXIgbm9yZWZlcnJlcicpO1xyXG4gICAgd2Vic2l0ZS5zZXRBdHRyaWJ1dGUoJ3RhcmdldCcsICdfYmxhbmsnKTtcclxuICAgIGluZm8uaW5uZXJIVE1MID0gb3B0cy5pbmZvO1xyXG4gICAgb3BlbldpdGguaHJlZiA9IGBnZW86JHtvcHRzLmxhdH0sJHtvcHRzLmxuZ31gO1xyXG4gICAgb3BlbldpdGguaW5uZXJIVE1MID0gJzxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvaWNvbi9waW4uc3ZnXCI+T3V2cmlyIGRhbnMgbGUgR1BTJztcclxuXHJcbiAgICBkb20uYXBwZW5kQ2hpbGQodGl0bGUpO1xyXG4gICAgZG9tLmFwcGVuZENoaWxkKGFkZHJlc3MpO1xyXG4gICAgZG9tLmFwcGVuZENoaWxkKHRvd24pO1xyXG5cclxuICAgIGNvbnN0IGJ1dHRvbiA9IHRoaXMuX21hcmtlck9wZW5lZFN0YXRlKG9wdHMudGltZXRhYmxlKTtcclxuICAgIGRvbS5hcHBlbmRDaGlsZChidXR0b24pO1xyXG5cclxuICAgIGlmIChvcHRzLnRpbWV0YWJsZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX3RpbWV0YmFsZU1vZGFsLmJpbmQodGhpcywgb3B0cykpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBpZiAob3B0cy5pbmZvICE9PSAnJykge1xyXG4gICAgICBkb20uYXBwZW5kQ2hpbGQoaW5mbyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG9wdHMucGhvbmUgIT09ICcnKSB7XHJcbiAgICAgIGRvbS5hcHBlbmRDaGlsZChwaG9uZSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG9wdHMud2Vic2l0ZSAhPT0gJycpIHtcclxuICAgICAgZG9tLmFwcGVuZENoaWxkKHdlYnNpdGUpO1xyXG4gICAgfSAgICBcclxuICAgIFxyXG4gICAgZG9tLmFwcGVuZENoaWxkKG9wZW5XaXRoKTtcclxuXHJcbiAgICByZXR1cm4gZG9tO1xyXG4gIH1cclxuXHJcblxyXG4gIF9tYXJrZXJPcGVuZWRTdGF0ZSh0aW1ldGFibGUpIHtcclxuICAgIGNvbnN0IGRvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xyXG4gICAgY29uc3Qgc3RhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdINScpO1xyXG4gICAgY29uc3QgbW9yZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0knKTtcclxuICAgIGRvbS5jbGFzc0xpc3QuYWRkKCdtYXJrZXItb3BlbmVkJyk7XHJcbiAgICBkb20uYXBwZW5kQ2hpbGQoc3RhdGUpO1xyXG4gICAgZG9tLmFwcGVuZENoaWxkKG1vcmUpO1xyXG4gICAgXHJcbiAgICBpZiAodGltZXRhYmxlLmxlbmd0aCkge1xyXG4gICAgICBtb3JlLmlubmVySFRNTCA9ICdWb2lyIGxlcyBob3JhaXJlcyc7XHJcbiAgICAgIHRoaXMuX2NoZWNrVGltZSh0aW1ldGFibGUsIGRvbSk7XHJcbiAgICAgIHNldEludGVydmFsKHRoaXMuX2NoZWNrVGltZS5iaW5kKHRoaXMsIHRpbWV0YWJsZSwgZG9tKSwgMzAwMDApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5fbWFya2VySXNPcGVuZWQoZG9tLCB0cnVlKTtcclxuICAgICAgbW9yZS5pbm5lckhUTUwgPSAnVG91am91cnMgb3V2ZXJ0JzsgICAgICBcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZG9tO1xyXG4gIH1cclxuXHJcblxyXG4gIF9jaGVja1RpbWUodGltZXRhYmxlLCBkb20pIHtcclxuICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XHJcbiAgICBsZXQgaG91ciA9IG5vdy5nZXRIb3VycygpO1xyXG4gICAgbGV0IG1pbnV0ZXMgPSBub3cuZ2V0TWludXRlcygpO1xyXG4gICAgaWYgKG1pbnV0ZXMgPCAxMCkge1xyXG4gICAgICBtaW51dGVzID0gYDAke21pbnV0ZXN9YDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBkYXlPZldlZWsgPSBub3cuZ2V0RGF5KCkgLSAxO1xyXG4gICAgY29uc3Qgb3BlbmluZ1RpbWUgPSBwYXJzZUludChgJHt0aW1ldGFibGVbZGF5T2ZXZWVrXS5vcGVuLmh9JHt0aW1ldGFibGVbZGF5T2ZXZWVrXS5vcGVuLm19YCk7XHJcbiAgICBjb25zdCBjbG9zaW5nVGltZSA9IHBhcnNlSW50KGAke3RpbWV0YWJsZVtkYXlPZldlZWtdLmNsb3NlLmh9JHt0aW1ldGFibGVbZGF5T2ZXZWVrXS5jbG9zZS5tfWApO1xyXG4gICAgY29uc3QgY3VycmVudFRpbWUgPSBwYXJzZUludChgJHtob3VyfSR7bWludXRlc31gKTtcclxuICAgIC8vIFdvbid0IHdvcmsgaWYgdGltZXRhYmxlIG9wZW4vY2xvc2UgaG91cnMgYXJlbid0IG9uIHRoZSBzYW1lIGRheVxyXG4gICAgaWYgKHRpbWV0YWJsZVtkYXlPZldlZWtdLmlzT3BlbiAmJiBpc05hTihvcGVuaW5nVGltZSkpIHsgLy8gMjQvNyBvcGVuaW5nXHJcbiAgICAgIHRoaXMuX21hcmtlcklzT3BlbmVkKGRvbSwgdHJ1ZSk7XHJcbiAgICB9IGVsc2UgaWYgKHRpbWV0YWJsZVtkYXlPZldlZWtdLmlzT3BlbiAmJiBjdXJyZW50VGltZSA+PSBvcGVuaW5nVGltZSAmJiBjdXJyZW50VGltZSA8IGNsb3NpbmdUaW1lKSB7XHJcbiAgICAgIGlmICh0aW1ldGFibGVbZGF5T2ZXZWVrXS5icmVhay5oYXNCcmVhaykge1xyXG4gICAgICAgIGNvbnN0IGJyZWFrT3BlbmluZ1RpbWUgPSBwYXJzZUludChgJHt0aW1ldGFibGVbZGF5T2ZXZWVrXS5icmVhay5lbmQuaH0ke3RpbWV0YWJsZVtkYXlPZldlZWtdLmJyZWFrLmVuZC5tfWApO1xyXG4gICAgICAgIGNvbnN0IGJyZWFrQ2xvc2luZ1RpbWUgPSBwYXJzZUludChgJHt0aW1ldGFibGVbZGF5T2ZXZWVrXS5icmVhay5zdGFydC5ofSR7dGltZXRhYmxlW2RheU9mV2Vla10uYnJlYWsuc3RhcnQubX1gKTtcclxuICAgICAgICBpZiAoY3VycmVudFRpbWUgPj0gYnJlYWtDbG9zaW5nVGltZSAmJiBjdXJyZW50VGltZSA8IGJyZWFrT3BlbmluZ1RpbWUpIHtcclxuICAgICAgICAgIHRoaXMuX21hcmtlcklzQ2xvc2VkKGRvbSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuX21hcmtlcklzT3BlbmVkKGRvbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuX21hcmtlcklzT3BlbmVkKGRvbSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7ICAgICAgXHJcbiAgICAgIHRoaXMuX21hcmtlcklzQ2xvc2VkKGRvbSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcbiAgX21hcmtlcklzT3BlbmVkKGRvbSwgYWx3YXlzT3BlbmVkKSB7XHJcbiAgICBkb20uZmlyc3RDaGlsZC5pbm5lckhUTUwgPSBgT3V2ZXJ0YDtcclxuICAgIGlmIChhbHdheXNPcGVuZWQgPT09IHRydWUpIHtcclxuICAgICAgZG9tLmxhc3RDaGlsZC5pbm5lckhUTUwgPSBgMjRoLzI0aCBldCA3ai83amA7XHJcbiAgICB9XHJcbiAgICBkb20uY2xhc3NMaXN0LmFkZCgnb3BlbmVkJyk7XHJcbiAgfVxyXG5cclxuXHJcbiAgX21hcmtlcklzQ2xvc2VkKGRvbSkge1xyXG4gICAgZG9tLmZpcnN0Q2hpbGQuaW5uZXJIVE1MID0gYEZlcm3DqWA7XHJcbiAgICBkb20ubGFzdENoaWxkLmlubmVySFRNTCA9IGBWb2lyIGxlcyBob3JhaXJlc2A7XHJcbiAgICBkb20uY2xhc3NMaXN0LnJlbW92ZSgnb3BlbmVkJyk7XHJcbiAgfVxyXG5cclxuXHJcbiAgX3RpbWV0YmFsZU1vZGFsKG9wdHMpIHtcclxuICAgIHRoaXMuZmV0Y2hNb2RhbCgndGltZXRhYmxlbW9kYWwnKS50aGVuKGRvbSA9PiB7XHJcbiAgICAgIC8vIFVwZGF0aW5nIG1vZGFsIGhlYWRlciBhbmQgaW5mb1xyXG4gICAgICBkb20ucXVlcnlTZWxlY3RvcignI21hcmstbmFtZScpLmlubmVySFRNTCA9IG9wdHMubmFtZTtcclxuICAgICAgZG9tLnF1ZXJ5U2VsZWN0b3IoJyNtYXJrLWFkZHJlc3MnKS5pbm5lckhUTUwgPSBgJHtvcHRzLmFkZHJlc3N9LCAke29wdHMudG93bn1gO1xyXG4gICAgICBjb25zdCBkaXN0YW5jZSA9IFV0aWxzLmdldERpc3RhbmNlQmV0d2VlbkNvb3Jkcyhbb3B0cy5sYXQsIG9wdHMubG5nXSwgW3RoaXMuX3VzZXIubGF0LCB0aGlzLl91c2VyLmxuZ10pO1xyXG4gICAgICBkb20ucXVlcnlTZWxlY3RvcignI21hcmstZGlzdGFuY2UnKS5pbm5lckhUTUwgPSBgVm91cyDDqHRlcyDDoCBlbnZpcm9uICR7VXRpbHMuY29udmVydERpc3RhbmNlVG9TdHJpbmcoZGlzdGFuY2UpfSBkZSA8Yj4ke29wdHMubmFtZX08L2I+IMOgIHZvbCBkJ29pc2VhdWA7XHJcbiAgICAgIGNvbnN0IGV0YSA9IFV0aWxzLmJ1aWxkRGlzdGFuY2VFVEEoZGlzdGFuY2UpO1xyXG4gICAgICBkb20ucXVlcnlTZWxlY3RvcignI21hcmstZXRhJykuaW5uZXJIVE1MID0gYENlIHF1aSByZXByw6lzZW50ZSBlbnZpcm9uICR7ZXRhLmNhcn0gZW4gdm9pdHVyZSwgb3UgJHtldGEud2Fsa30gw6AgcGllZC5gO1xyXG4gICAgICBkb20ucXVlcnlTZWxlY3RvcignI21hcmstc3RhdGUnKS5hcHBlbmRDaGlsZCh0aGlzLl9tYXJrZXJPcGVuZWRTdGF0ZShvcHRzLnRpbWV0YWJsZSkpO1xyXG4gICAgICAvLyBOb3cgdXBkYXRlIGRheSBieSBkYXlcclxuICAgICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcclxuICAgICAgY29uc3QgZGF5T2ZXZWVrID0gbm93LmdldERheSgpIC0gMTtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvcHRzLnRpbWV0YWJsZS5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgIGNvbnN0IGRheURvbSA9IGRvbS5xdWVyeVNlbGVjdG9yKCcjdGltZXRhYmxlJykuY2hpbGRyZW5baV07XHJcbiAgICAgICAgaWYgKG9wdHMudGltZXRhYmxlW2ldLmlzT3BlbiA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgY29uc3QgbW9ybmluZyA9IGRheURvbS5sYXN0RWxlbWVudENoaWxkLmZpcnN0RWxlbWVudENoaWxkO1xyXG4gICAgICAgICAgY29uc3QgYWZ0ZXJub29uID0gZGF5RG9tLmxhc3RFbGVtZW50Q2hpbGQubGFzdEVsZW1lbnRDaGlsZDtcclxuICAgICAgICAgIGlmIChvcHRzLnRpbWV0YWJsZVtpXS5icmVhayAmJiBvcHRzLnRpbWV0YWJsZVtpXS5icmVhay5oYXNCcmVhayA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBtb3JuaW5nLmlubmVySFRNTCA9IGA8cD4ke29wdHMudGltZXRhYmxlW2ldLm9wZW4uaH06JHtvcHRzLnRpbWV0YWJsZVtpXS5vcGVuLm19IOKAkiAke29wdHMudGltZXRhYmxlW2ldLmJyZWFrLnN0YXJ0Lmh9OiR7b3B0cy50aW1ldGFibGVbaV0uYnJlYWsuc3RhcnQubX08L3A+YDtcclxuICAgICAgICAgICAgbW9ybmluZy5jbGFzc0xpc3QuYWRkKCdmaWxsZWQnKTsgLy8gTW9ybmluZ1xyXG4gICAgICAgICAgICBtb3JuaW5nLmNsYXNzTGlzdC5hZGQoJ3NwbGl0ZWQnKTsgLy8gTW9ybmluZ1xyXG4gICAgICAgICAgICBhZnRlcm5vb24uaW5uZXJIVE1MID0gYDxwPiR7b3B0cy50aW1ldGFibGVbaV0uYnJlYWsuZW5kLmh9OiR7b3B0cy50aW1ldGFibGVbaV0uYnJlYWsuZW5kLm19IOKAkiAke29wdHMudGltZXRhYmxlW2ldLmNsb3NlLmh9OiR7b3B0cy50aW1ldGFibGVbaV0uY2xvc2UubX08L3A+YDtcclxuICAgICAgICAgICAgYWZ0ZXJub29uLmNsYXNzTGlzdC5hZGQoJ2ZpbGxlZCcpOyAvLyBBZnRlcm5vb25cclxuICAgICAgICAgICAgYWZ0ZXJub29uLmNsYXNzTGlzdC5hZGQoJ3NwbGl0ZWQnKTsgLy8gQWZ0ZXJub29uXHJcbiAgICAgICAgICB9IGVsc2UgaWYgKG9wdHMudGltZXRhYmxlW2ldLm9wZW4uaCAmJiBvcHRzLnRpbWV0YWJsZVtpXS5jbG9zZS5oKSB7XHJcbiAgICAgICAgICAgIG1vcm5pbmcuaW5uZXJIVE1MID0gYDxwPiR7b3B0cy50aW1ldGFibGVbaV0ub3Blbi5ofToke29wdHMudGltZXRhYmxlW2ldLm9wZW4ubX08L3A+YDtcclxuICAgICAgICAgICAgbW9ybmluZy5jbGFzc0xpc3QuYWRkKCdmaWxsZWQnKTsgLy8gTW9ybmluZ1xyXG4gICAgICAgICAgICBhZnRlcm5vb24uaW5uZXJIVE1MID0gYDxwPiR7b3B0cy50aW1ldGFibGVbaV0uY2xvc2UuaH06JHtvcHRzLnRpbWV0YWJsZVtpXS5jbG9zZS5tfTwvcD5gO1xyXG4gICAgICAgICAgICBhZnRlcm5vb24uY2xhc3NMaXN0LmFkZCgnZmlsbGVkJyk7IC8vIEFmdGVybm9vblxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbW9ybmluZy5pbm5lckhUTUwgPSBgPHA+MDA6MDA8L3A+YDtcclxuICAgICAgICAgICAgbW9ybmluZy5jbGFzc0xpc3QuYWRkKCdmaWxsZWQnKTsgLy8gTW9ybmluZ1xyXG4gICAgICAgICAgICBhZnRlcm5vb24uaW5uZXJIVE1MID0gYDxwPjI0OjAwPC9wPmA7XHJcbiAgICAgICAgICAgIGFmdGVybm9vbi5jbGFzc0xpc3QuYWRkKCdmaWxsZWQnKTsgLy8gQWZ0ZXJub29uXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGRheURvbS5sYXN0RWxlbWVudENoaWxkLmlubmVySFRNTCA9IGA8ZGl2IGNsYXNzPVwiY2xvc2VkXCI+PHA+RmVybcOpPC9wPjwvZGl2PmA7ICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBNYXRjaGluZyB0b2RheSdzIGRheVxyXG4gICAgICAgIGlmIChpID09PSBkYXlPZldlZWspIHtcclxuICAgICAgICAgIGRheURvbS5jbGFzc0xpc3QuYWRkKCd0b2RheScpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBcclxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsLW92ZXJsYXknKS5hcHBlbmRDaGlsZChkb20pO1xyXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWwtb3ZlcmxheScpLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XHJcblx0XHRcdHNldFRpbWVvdXQoKCkgPT4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsLW92ZXJsYXknKS5zdHlsZS5vcGFjaXR5ID0gMSwgNTApO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuLyogU2VhcmNoIG1vZGFsIG1ldGhvZHMgKi9cclxuXHJcbi8qXHJcbiAgX3NlYXJjaE1vZGFsKCkge1xyXG4gICAgdGhpcy5fZmV0Y2hNb2RhbCgnc2VhcmNobW9kYWwnKS50aGVuKGRvbSA9PiB7XHJcbiAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyh0aGlzLl9tYXJrcyk7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgIGRvbS5maXJzdEVsZW1lbnRDaGlsZC5hcHBlbmRDaGlsZCh0aGlzLl9jcmVhdGVNYXJrQ2F0ZWdvcnlTZWFyY2hJY29uKGtleXNbaV0pKTtcclxuICAgICAgfVxyXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWwtb3ZlcmxheScpLmFwcGVuZENoaWxkKGRvbSk7XHJcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RhbC1vdmVybGF5Jykuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcclxuXHRcdFx0c2V0VGltZW91dCgoKSA9PiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWwtb3ZlcmxheScpLnN0eWxlLm9wYWNpdHkgPSAxLCA1MCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG5cclxuICBfY3JlYXRlTWFya0NhdGVnb3J5U2VhcmNoSWNvbih0eXBlKSB7XHJcbiAgICBjb25zdCBkb20gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcclxuICAgIGNvbnN0IGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0lNRycpO1xyXG4gICAgY29uc3QgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdQJyk7XHJcbiAgICBkb20uY2xhc3NMaXN0LmFkZCgnZmlsdGVyaW5nLWVsZW1lbnQnKTtcclxuICAgIGltZy5zcmMgPSBgL2Fzc2V0cy9pbWcvbWFya2VyLyR7dHlwZX0uc3ZnYDtcclxuICAgIGxhYmVsLmlubmVySFRNTCA9IHR5cGU7XHJcbiAgICBkb20uYXBwZW5kQ2hpbGQoaW1nKTtcclxuICAgIGRvbS5hcHBlbmRDaGlsZChsYWJlbCk7XHJcbiAgICByZXR1cm4gZG9tO1xyXG4gIH1cclxuKi9cclxuXHJcbiAgLyogTW9kYWwgbWV0aG9kcyAqL1xyXG5cclxuICBmZXRjaE1vZGFsKHVybCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xyXG4gICAgICBmZXRjaChgL2Fzc2V0cy9odG1sLyR7dXJsfS5odG1sYCkudGhlbihkYXRhID0+IHtcclxuICAgICAgICBkYXRhLnRleHQoKS50aGVuKGh0bWwgPT4ge1xyXG4gICAgICAgICAgcmVzb2x2ZShkb2N1bWVudC5jcmVhdGVSYW5nZSgpLmNyZWF0ZUNvbnRleHR1YWxGcmFnbWVudChodG1sKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgY2xvc2VNb2RhbChldmVudCwgZm9yY2UpIHtcclxuXHRcdGlmIChmb3JjZSA9PT0gdHJ1ZSB8fCBldmVudC50YXJnZXQuaWQgPT09ICdtb2RhbC1vdmVybGF5JyB8fCBldmVudC50YXJnZXQuaWQuaW5kZXhPZignY2xvc2UnKSAhPT0gLTEpIHtcclxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsLW92ZXJsYXknKS5zdHlsZS5vcGFjaXR5ID0gMDtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsLW92ZXJsYXknKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RhbC1vdmVybGF5JykuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgIH0sIDMwMCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcbiAgZ2V0IHVzZXIoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fdXNlcjtcclxuICB9XHJcblxyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTW9uRG91cmRhbm5haXM7XHJcbiJdLCJuYW1lcyI6WyJNYXJrZXJzIiwiVXRpbHMiLCJNYXAiLCJvcHRpb25zIiwiX2NsYXNzQ2FsbENoZWNrIiwiX2lkIiwidGFyZ2V0SWQiLCJfbWFwIiwiX21hcmtzIiwiX3BvbHlnb25zIiwiX2xheWVycyIsIkNhcnRlIiwiU2F0ZWxsaXRlIiwiX2luaXQiLCJfZXZlbnRzIiwiX2NyZWF0ZUNsYXNzIiwia2V5IiwidmFsdWUiLCJ3aW5kb3ciLCJMIiwibWFwIiwiem9vbUNvbnRyb2wiLCJzZXRWaWV3IiwiSE9NRV9MQVQiLCJIT01FX0xORyIsImNvbnRyb2wiLCJzY2FsZSIsImFkZFRvIiwic2V0TWF4Qm91bmRzIiwiTUFQX0JPVU5EUyIsIk9TTV9MQVlFUiIsIkVTUklfTEFZRVIiLCJsYXllcnMiLCJwb3NpdGlvbiIsIl90aGlzIiwib24iLCJfbWFwQ2xpY2tlZCIsImJpbmQiLCJwYW5JbnNpZGVCb3VuZHMiLCJhbmltYXRlIiwib3B0cyIsImNvbnNvbGUiLCJsb2ciLCJsYXRsbmciLCJnZXRCb3VuZHMiLCJfdG1wIiwicHVzaCIsImxhdCIsImxuZyIsIkpTT04iLCJzdHJpbmdpZnkiLCJkcmF3VXNlck1hcmtlciIsImhtIiwidXNlciIsIm1hcmtlciIsImljb24iLCJzZXRMYXRMbmciLCJhZGRNYXJrIiwiY3JlYXRlUG9wdXAiLCJfdGhpczIiLCJ0eXBlcyIsInR5cGUiLCJzcGxpdCIsImxlbmd0aCIsImNvbmNhdCIsImZseVRvIiwiYmluZFBvcHVwIiwiaSIsImFkZFBvbHlnb24iLCJwb2x5Z29uIiwiT2JqZWN0IiwiZnJlZXplIiwicmVzdGF1cmFudCIsIkljb24iLCJpY29uVXJsIiwiaWNvblNpemUiLCJpY29uQW5jaG9yIiwicG9wdXBBbmNob3IiLCJzaGFkb3dVcmwiLCJzaGFkb3dTaXplIiwic2hhZG93QW5jaG9yIiwiYmFyIiwidG9iYWNjbyIsImNlbGxhciIsInN0b3JlIiwiYm9vayIsImxhbmRtYXJrIiwiY3JhZnQiLCJnYXJkZW4iLCJjYXIiLCJnYXMiLCJhbmltYWwiLCJtYWlsIiwicmVjeWNsZSIsImFkbWluaXN0cmF0aW9uIiwiYmFuayIsIm1lZGljYWwiLCJkZWNvIiwiYmFyc3RvcmUiLCJnZXREaXN0YW5jZUJldHdlZW5Db29yZHMiLCJmcm9tIiwidG8iLCJsb24xIiwiTWF0aCIsIlBJIiwibGF0MSIsImxvbjIiLCJsYXQyIiwiZGVsdGFMYXQiLCJkZWx0YUxvbiIsImEiLCJwb3ciLCJzaW4iLCJjb3MiLCJjIiwiYXNpbiIsInNxcnQiLCJjb252ZXJ0RGlzdGFuY2VUb1N0cmluZyIsImRpc3RhbmNlIiwicHJlY2lzaW9uUm91bmQiLCJidWlsZERpc3RhbmNlRVRBIiwiY2FyTWludXRlcyIsImNhclNlY29uZHMiLCJmbG9vciIsIndhbGtNaW51dGVzIiwid2Fsa1NlY29uZHMiLCJ3YWxrIiwicHJlY2lzaW9uIiwibXVsdGlwbGllciIsInJvdW5kIiwibGF0TG5nQm91bmRzIiwibGF0TG5nIiwidGlsZUxheWVyIiwiYXR0cmlidXRpb24iLCJtYXhab29tIiwibWF4TmF0aXZlWm9vbSIsIm1pblpvb20iLCJNb25Eb3VyZGFubmFpcyIsIl9kYXRhIiwiX3VzZXIiLCJhY2N1cmFjeSIsIl9pbml0R2VvbG9jYXRpb24iLCJ0aGVuIiwiX2ZldGNoTWFya2VycyIsIl9pbml0TWFwIiwiX2luaXRFdmVudHMiLCJfYnVpbGRNYXJrZXJzIiwiX2J1aWxkUG9seWdvbnMiLCJQcm9taXNlIiwicmVzb2x2ZSIsIm5hdmlnYXRvciIsImVuYWJsZUhpZ2hBY2N1cmFjeSIsIm1heGltdW1BZ2UiLCJ0aW1lb3V0IiwiX3dhdGNoSWQiLCJnZW9sb2NhdGlvbiIsIndhdGNoUG9zaXRpb24iLCJjb29yZHMiLCJsYXRpdHVkZSIsImxvbmdpdHVkZSIsImZldGNoIiwiZGF0YSIsImpzb24iLCJqc29uRGF0YSIsIl90aGlzMyIsIl90aGlzNCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJhZGRFdmVudExpc3RlbmVyIiwiY2xvc2VNb2RhbCIsIl90aGlzNSIsImtleXMiLCJtYXJrZXJzIiwiaiIsIl9jcmVhdGVNYXJrZXJQb3B1cCIsIl90aGlzNiIsImNpdHlCb3VuZHMiLCJkb20iLCJjcmVhdGVFbGVtZW50IiwidGl0bGUiLCJhZGRyZXNzIiwidG93biIsInBob25lIiwid2Vic2l0ZSIsImluZm8iLCJvcGVuV2l0aCIsImNsYXNzTGlzdCIsImFkZCIsImlubmVySFRNTCIsIm5hbWUiLCJocmVmIiwic2V0QXR0cmlidXRlIiwiYXBwZW5kQ2hpbGQiLCJidXR0b24iLCJfbWFya2VyT3BlbmVkU3RhdGUiLCJ0aW1ldGFibGUiLCJfdGltZXRiYWxlTW9kYWwiLCJzdGF0ZSIsIm1vcmUiLCJfY2hlY2tUaW1lIiwic2V0SW50ZXJ2YWwiLCJfbWFya2VySXNPcGVuZWQiLCJub3ciLCJEYXRlIiwiaG91ciIsImdldEhvdXJzIiwibWludXRlcyIsImdldE1pbnV0ZXMiLCJkYXlPZldlZWsiLCJnZXREYXkiLCJvcGVuaW5nVGltZSIsInBhcnNlSW50Iiwib3BlbiIsImgiLCJtIiwiY2xvc2luZ1RpbWUiLCJjbG9zZSIsImN1cnJlbnRUaW1lIiwiaXNPcGVuIiwiaXNOYU4iLCJoYXNCcmVhayIsImJyZWFrT3BlbmluZ1RpbWUiLCJlbmQiLCJicmVha0Nsb3NpbmdUaW1lIiwic3RhcnQiLCJfbWFya2VySXNDbG9zZWQiLCJhbHdheXNPcGVuZWQiLCJmaXJzdENoaWxkIiwibGFzdENoaWxkIiwicmVtb3ZlIiwiX3RoaXM3IiwiZmV0Y2hNb2RhbCIsInF1ZXJ5U2VsZWN0b3IiLCJldGEiLCJkYXlEb20iLCJjaGlsZHJlbiIsIm1vcm5pbmciLCJsYXN0RWxlbWVudENoaWxkIiwiZmlyc3RFbGVtZW50Q2hpbGQiLCJhZnRlcm5vb24iLCJzdHlsZSIsImRpc3BsYXkiLCJzZXRUaW1lb3V0Iiwib3BhY2l0eSIsInVybCIsInRleHQiLCJodG1sIiwiY3JlYXRlUmFuZ2UiLCJjcmVhdGVDb250ZXh0dWFsRnJhZ21lbnQiLCJldmVudCIsImZvcmNlIiwidGFyZ2V0IiwiaWQiLCJpbmRleE9mIiwiZ2V0Il0sInNvdXJjZVJvb3QiOiIifQ==
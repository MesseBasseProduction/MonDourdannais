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
      console.log(opts.latlng);
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
  CCDH_CENTER: {
    LAT: 48.53183906441962,
    LNG: 2.053756713867188
  },
  MAP_BOUNDS: window.L.latLngBounds(window.L.latLng(48.679400715963894, 1.7390606689453127), window.L.latLng(48.38439074151866, 2.343395996093750)),
  OSM_LAYER: window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 21,
    minZoom: 12
  }),
  ESRI_LAYER: window.L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: '&copy; <a href="https://www.arcgis.com/home/item.html?id=10df2279f9684e4a9f6a7f08febac2a9">Esri Imagery</a>',
    maxZoom: 21,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9uRG91cmRhbm5haXMuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBc0M7QUFDUDtBQUFBLElBR3pCRSxHQUFHO0VBR1AsU0FBQUEsSUFBWUMsT0FBTyxFQUFFO0lBQUFDLGVBQUEsT0FBQUYsR0FBQTtJQUNuQixJQUFJLENBQUNHLEdBQUcsR0FBR0YsT0FBTyxDQUFDRyxRQUFRO0lBQzNCLElBQUksQ0FBQ0MsSUFBSSxHQUFHLElBQUk7SUFDaEIsSUFBSSxDQUFDQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQ2hCLElBQUksQ0FBQ0MsU0FBUyxHQUFHLEVBQUU7SUFDbkIsSUFBSSxDQUFDQyxPQUFPLEdBQUc7TUFDYkMsS0FBSyxFQUFFLElBQUk7TUFDWEMsU0FBUyxFQUFFO0lBQ2IsQ0FBQztJQUVELElBQUksQ0FBQ0MsS0FBSyxDQUFDLENBQUM7SUFDWixJQUFJLENBQUNDLE9BQU8sQ0FBQyxDQUFDO0VBQ2hCO0VBQUNDLFlBQUEsQ0FBQWIsR0FBQTtJQUFBYyxHQUFBO0lBQUFDLEtBQUEsRUFHRCxTQUFBSixNQUFBLEVBQVE7TUFDTjtNQUNBLElBQUksQ0FBQ04sSUFBSSxHQUFHVyxNQUFNLENBQUNDLENBQUMsQ0FBQ0MsR0FBRyxDQUFDLElBQUksQ0FBQ2YsR0FBRyxFQUFFO1FBQ2pDZ0IsV0FBVyxFQUFFO01BQ2YsQ0FBQyxDQUFDLENBQUNDLE9BQU8sQ0FBQyxDQUFDckIsaURBQUssQ0FBQ3NCLFdBQVcsQ0FBQ0MsR0FBRyxFQUFFdkIsaURBQUssQ0FBQ3NCLFdBQVcsQ0FBQ0UsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDO01BQzlEO01BQ0FQLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDTyxPQUFPLENBQUNDLEtBQUssQ0FBQyxDQUFDLENBQUNDLEtBQUssQ0FBQyxJQUFJLENBQUNyQixJQUFJLENBQUM7TUFDekM7TUFDQSxJQUFJLENBQUNBLElBQUksQ0FBQ3NCLFlBQVksQ0FBQzVCLGlEQUFLLENBQUM2QixVQUFVLENBQUM7TUFDeEM7TUFDQSxJQUFJLENBQUNwQixPQUFPLENBQUNDLEtBQUssR0FBR1YsaURBQUssQ0FBQzhCLFNBQVM7TUFDcEMsSUFBSSxDQUFDckIsT0FBTyxDQUFDRSxTQUFTLEdBQUdYLGlEQUFLLENBQUMrQixVQUFVO01BQ3pDLElBQUksQ0FBQ3RCLE9BQU8sQ0FBQ0MsS0FBSyxDQUFDaUIsS0FBSyxDQUFDLElBQUksQ0FBQ3JCLElBQUksQ0FBQztNQUNuQztNQUNBVyxNQUFNLENBQUNDLENBQUMsQ0FBQ08sT0FBTyxDQUFDTyxNQUFNLENBQUMsSUFBSSxDQUFDdkIsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFO1FBQUV3QixRQUFRLEVBQUU7TUFBYyxDQUFDLENBQUMsQ0FBQ04sS0FBSyxDQUFDLElBQUksQ0FBQ3JCLElBQUksQ0FBQztJQUN6RjtFQUFDO0lBQUFTLEdBQUE7SUFBQUMsS0FBQSxFQUdELFNBQUFILFFBQUEsRUFBVTtNQUFBLElBQUFxQixLQUFBO01BQ1I7TUFDQSxJQUFJLENBQUM1QixJQUFJLENBQUM2QixFQUFFLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQ0MsV0FBVyxDQUFDQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7TUFDbEQ7TUFDQSxJQUFJLENBQUMvQixJQUFJLENBQUM2QixFQUFFLENBQUMsTUFBTSxFQUFFLFlBQU07UUFDekI7UUFDQUQsS0FBSSxDQUFDNUIsSUFBSSxDQUFDZ0MsZUFBZSxDQUFDdEMsaURBQUssQ0FBQzZCLFVBQVUsRUFBRTtVQUFFVSxPQUFPLEVBQUU7UUFBSyxDQUFDLENBQUM7TUFDaEUsQ0FBQyxDQUFDO0lBQ0o7RUFBQztJQUFBeEIsR0FBQTtJQUFBQyxLQUFBLEVBR0QsU0FBQW9CLFlBQVlJLElBQUksRUFBRTtNQUNoQkMsT0FBTyxDQUFDQyxHQUFHLENBQUNGLElBQUksQ0FBQ0csTUFBTSxDQUFDO0lBQzFCO0VBQUM7SUFBQTVCLEdBQUE7SUFBQUMsS0FBQSxFQUdELFNBQUE0QixlQUFBLEVBQWlCO01BQ2YsSUFBSSxDQUFDM0IsTUFBTSxDQUFDNEIsRUFBRSxDQUFDQyxJQUFJLENBQUNDLE1BQU0sRUFBRTtRQUMxQjlCLE1BQU0sQ0FBQzRCLEVBQUUsQ0FBQ0MsSUFBSSxDQUFDQyxNQUFNLEdBQUc5QixNQUFNLENBQUNDLENBQUMsQ0FBQzZCLE1BQU0sQ0FBQyxDQUFDOUIsTUFBTSxDQUFDNEIsRUFBRSxDQUFDQyxJQUFJLENBQUNFLEdBQUcsRUFBRS9CLE1BQU0sQ0FBQzRCLEVBQUUsQ0FBQ0MsSUFBSSxDQUFDRyxHQUFHLENBQUMsRUFBRTtVQUNoRkMsSUFBSSxFQUFFbkQsc0RBQU8sQ0FBQytDO1FBQ2hCLENBQUMsQ0FBQztRQUNGN0IsTUFBTSxDQUFDNEIsRUFBRSxDQUFDQyxJQUFJLENBQUNDLE1BQU0sQ0FBQ3BCLEtBQUssQ0FBQyxJQUFJLENBQUNyQixJQUFJLENBQUM7TUFDeEMsQ0FBQyxNQUFNO1FBQ0xXLE1BQU0sQ0FBQzRCLEVBQUUsQ0FBQ0MsSUFBSSxDQUFDQyxNQUFNLENBQUNJLFNBQVMsQ0FBQ2xDLE1BQU0sQ0FBQzRCLEVBQUUsQ0FBQ0MsSUFBSSxDQUFDO01BQ2pEO0lBQ0Y7RUFBQztJQUFBL0IsR0FBQTtJQUFBQyxLQUFBLEVBR0QsU0FBQW9DLFFBQVFaLElBQUksRUFBRWEsV0FBVyxFQUFFO01BQUEsSUFBQUMsTUFBQTtNQUN6QixJQUFJQyxLQUFLLEdBQUdmLElBQUksQ0FBQ2dCLElBQUksQ0FBQ0MsS0FBSyxDQUFDLEdBQUcsQ0FBQztNQUNoQyxJQUFJRCxJQUFJLEdBQUdoQixJQUFJLENBQUNnQixJQUFJO01BQ3BCLElBQUlELEtBQUssQ0FBQ0csTUFBTSxHQUFHLENBQUMsRUFBRTtRQUNwQkYsSUFBSSxNQUFBRyxNQUFBLENBQU1KLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBQUksTUFBQSxDQUFHSixLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUU7TUFDakM7TUFFQSxJQUFNUixNQUFNLEdBQUc5QixNQUFNLENBQUNDLENBQUMsQ0FBQzZCLE1BQU0sQ0FBQyxDQUFDUCxJQUFJLENBQUNRLEdBQUcsRUFBRVIsSUFBSSxDQUFDUyxHQUFHLENBQUMsRUFBRTtRQUNuREMsSUFBSSxFQUFFbkQsc0RBQU8sQ0FBQ3lELElBQUk7TUFDcEIsQ0FBQyxDQUFDLENBQUNyQixFQUFFLENBQUMsT0FBTyxFQUFFLFlBQU07UUFDbkJtQixNQUFJLENBQUNoRCxJQUFJLENBQUNzRCxLQUFLLENBQUMsQ0FBQ3BCLElBQUksQ0FBQ1EsR0FBRyxFQUFFUixJQUFJLENBQUNTLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQztNQUMzQyxDQUFDLENBQUM7TUFFRkYsTUFBTSxDQUFDYyxTQUFTLENBQUNSLFdBQVcsQ0FBQ2IsSUFBSSxDQUFDLENBQUM7TUFDbkNPLE1BQU0sQ0FBQ3BCLEtBQUssQ0FBQyxJQUFJLENBQUNyQixJQUFJLENBQUM7TUFDdkIsSUFBSWlELEtBQUssQ0FBQ0csTUFBTSxHQUFHLENBQUMsRUFBRTtRQUNwQixLQUFLLElBQUlJLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBR1AsS0FBSyxDQUFDRyxNQUFNLEVBQUUsRUFBRUksQ0FBQyxFQUFFO1VBQ3JDLElBQUksQ0FBQyxJQUFJLENBQUN2RCxNQUFNLENBQUNnRCxLQUFLLENBQUNPLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDMUIsSUFBSSxDQUFDdkQsTUFBTSxDQUFDZ0QsS0FBSyxDQUFDTyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUU7VUFDNUI7VUFDQSxJQUFJLENBQUN2RCxNQUFNLENBQUNnRCxLQUFLLENBQUNPLENBQUMsQ0FBQyxDQUFDLENBQUNDLElBQUksQ0FBQ2hCLE1BQU0sQ0FBQztRQUNwQztNQUNGLENBQUMsTUFBTTtRQUNMLElBQUksQ0FBQyxJQUFJLENBQUN4QyxNQUFNLENBQUNpRCxJQUFJLENBQUMsRUFBRTtVQUN0QixJQUFJLENBQUNqRCxNQUFNLENBQUNpRCxJQUFJLENBQUMsR0FBRyxFQUFFO1FBQ3hCO1FBQ0EsSUFBSSxDQUFDakQsTUFBTSxDQUFDaUQsSUFBSSxDQUFDLENBQUNPLElBQUksQ0FBQ2hCLE1BQU0sQ0FBQztNQUNoQztJQUNGO0VBQUM7SUFBQWhDLEdBQUE7SUFBQUMsS0FBQSxFQUdELFNBQUFnRCxXQUFXQyxPQUFPLEVBQUU7TUFDbEIsSUFBSSxDQUFDekQsU0FBUyxDQUFDdUQsSUFBSSxDQUFDOUMsTUFBTSxDQUFDQyxDQUFDLENBQUMrQyxPQUFPLENBQUNBLE9BQU8sQ0FBQyxDQUFDdEMsS0FBSyxDQUFDLElBQUksQ0FBQ3JCLElBQUksQ0FBQyxDQUFDO0lBQ2pFO0VBQUM7RUFBQSxPQUFBTCxHQUFBO0FBQUE7QUFNSCxpRUFBZUEsR0FBRzs7Ozs7Ozs7Ozs7Ozs7QUMzR2xCLGlFQUFlaUUsTUFBTSxDQUFDQyxNQUFNLENBQUM7RUFDM0JDLFVBQVUsRUFBRSxJQUFJbkQsTUFBTSxDQUFDQyxDQUFDLENBQUNtRCxJQUFJLENBQUM7SUFDNUJDLE9BQU8sRUFBRSxrQ0FBa0M7SUFDM0NDLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDbEJDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFdBQVcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUNyQkMsU0FBUyxFQUFFLHFDQUFxQztJQUNoREMsVUFBVSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUNwQkMsWUFBWSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUU7RUFDdkIsQ0FBQyxDQUFDO0VBQ0ZDLEdBQUcsRUFBRSxJQUFJNUQsTUFBTSxDQUFDQyxDQUFDLENBQUNtRCxJQUFJLENBQUM7SUFDckJDLE9BQU8sRUFBRSwyQkFBMkI7SUFDcENDLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDbEJDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFdBQVcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUNyQkMsU0FBUyxFQUFFLHFDQUFxQztJQUNoREMsVUFBVSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUNwQkMsWUFBWSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUU7RUFDdkIsQ0FBQyxDQUFDO0VBQ0ZFLE9BQU8sRUFBRSxJQUFJN0QsTUFBTSxDQUFDQyxDQUFDLENBQUNtRCxJQUFJLENBQUM7SUFDekJDLE9BQU8sRUFBRSwrQkFBK0I7SUFDeENDLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDbEJDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFdBQVcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUNyQkMsU0FBUyxFQUFFLHFDQUFxQztJQUNoREMsVUFBVSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUNwQkMsWUFBWSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUU7RUFDdkIsQ0FBQyxDQUFDO0VBQ0ZHLE1BQU0sRUFBRSxJQUFJOUQsTUFBTSxDQUFDQyxDQUFDLENBQUNtRCxJQUFJLENBQUM7SUFDeEJDLE9BQU8sRUFBRSw4QkFBOEI7SUFDdkNDLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDbEJDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFdBQVcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUNyQkMsU0FBUyxFQUFFLHFDQUFxQztJQUNoREMsVUFBVSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUNwQkMsWUFBWSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUU7RUFDdkIsQ0FBQyxDQUFDO0VBQ0ZJLEtBQUssRUFBRSxJQUFJL0QsTUFBTSxDQUFDQyxDQUFDLENBQUNtRCxJQUFJLENBQUM7SUFDdkJDLE9BQU8sRUFBRSw2QkFBNkI7SUFDdENDLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDbEJDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFdBQVcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUNyQkMsU0FBUyxFQUFFLHFDQUFxQztJQUNoREMsVUFBVSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUNwQkMsWUFBWSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUU7RUFDdkIsQ0FBQyxDQUFDO0VBQ0ZLLElBQUksRUFBRSxJQUFJaEUsTUFBTSxDQUFDQyxDQUFDLENBQUNtRCxJQUFJLENBQUM7SUFDdEJDLE9BQU8sRUFBRSw0QkFBNEI7SUFDckNDLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDbEJDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFdBQVcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUNyQkMsU0FBUyxFQUFFLHFDQUFxQztJQUNoREMsVUFBVSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUNwQkMsWUFBWSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUU7RUFDdkIsQ0FBQyxDQUFDO0VBQ0ZNLFFBQVEsRUFBRSxJQUFJakUsTUFBTSxDQUFDQyxDQUFDLENBQUNtRCxJQUFJLENBQUM7SUFDMUJDLE9BQU8sRUFBRSxnQ0FBZ0M7SUFDekNDLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDbEJDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFdBQVcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUNyQkMsU0FBUyxFQUFFLHFDQUFxQztJQUNoREMsVUFBVSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUNwQkMsWUFBWSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUU7RUFDdkIsQ0FBQyxDQUFDO0VBQ0ZPLEtBQUssRUFBRSxJQUFJbEUsTUFBTSxDQUFDQyxDQUFDLENBQUNtRCxJQUFJLENBQUM7SUFDdkJDLE9BQU8sRUFBRSw2QkFBNkI7SUFDdENDLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDbEJDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFdBQVcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUNyQkMsU0FBUyxFQUFFLHFDQUFxQztJQUNoREMsVUFBVSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUNwQkMsWUFBWSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUU7RUFDdkIsQ0FBQyxDQUFDO0VBQ0ZRLE1BQU0sRUFBRSxJQUFJbkUsTUFBTSxDQUFDQyxDQUFDLENBQUNtRCxJQUFJLENBQUM7SUFDeEJDLE9BQU8sRUFBRSw4QkFBOEI7SUFDdkNDLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDbEJDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFdBQVcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUNyQkMsU0FBUyxFQUFFLHFDQUFxQztJQUNoREMsVUFBVSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUNwQkMsWUFBWSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUU7RUFDdkIsQ0FBQyxDQUFDO0VBQ0ZTLEdBQUcsRUFBRSxJQUFJcEUsTUFBTSxDQUFDQyxDQUFDLENBQUNtRCxJQUFJLENBQUM7SUFDckJDLE9BQU8sRUFBRSwyQkFBMkI7SUFDcENDLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDbEJDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFdBQVcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUNyQkMsU0FBUyxFQUFFLHFDQUFxQztJQUNoREMsVUFBVSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUNwQkMsWUFBWSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUU7RUFDdkIsQ0FBQyxDQUFDO0VBQ0ZVLEdBQUcsRUFBRSxJQUFJckUsTUFBTSxDQUFDQyxDQUFDLENBQUNtRCxJQUFJLENBQUM7SUFDckJDLE9BQU8sRUFBRSwyQkFBMkI7SUFDcENDLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDbEJDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFdBQVcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUNyQkMsU0FBUyxFQUFFLHFDQUFxQztJQUNoREMsVUFBVSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUNwQkMsWUFBWSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUU7RUFDdkIsQ0FBQyxDQUFDO0VBQ0ZXLE1BQU0sRUFBRSxJQUFJdEUsTUFBTSxDQUFDQyxDQUFDLENBQUNtRCxJQUFJLENBQUM7SUFDeEJDLE9BQU8sRUFBRSw4QkFBOEI7SUFDdkNDLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDbEJDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFdBQVcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUNyQkMsU0FBUyxFQUFFLHFDQUFxQztJQUNoREMsVUFBVSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUNwQkMsWUFBWSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUU7RUFDdkIsQ0FBQyxDQUFDO0VBQ0ZZLElBQUksRUFBRSxJQUFJdkUsTUFBTSxDQUFDQyxDQUFDLENBQUNtRCxJQUFJLENBQUM7SUFDdEJDLE9BQU8sRUFBRSw0QkFBNEI7SUFDckNDLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDbEJDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFdBQVcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUNyQkMsU0FBUyxFQUFFLHFDQUFxQztJQUNoREMsVUFBVSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUNwQkMsWUFBWSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUU7RUFDdkIsQ0FBQyxDQUFDO0VBQ0ZhLE9BQU8sRUFBRSxJQUFJeEUsTUFBTSxDQUFDQyxDQUFDLENBQUNtRCxJQUFJLENBQUM7SUFDekJDLE9BQU8sRUFBRSwrQkFBK0I7SUFDeENDLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDbEJDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFdBQVcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUNyQkMsU0FBUyxFQUFFLHFDQUFxQztJQUNoREMsVUFBVSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUNwQkMsWUFBWSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUU7RUFDdkIsQ0FBQyxDQUFDO0VBQ0ZjLGNBQWMsRUFBRSxJQUFJekUsTUFBTSxDQUFDQyxDQUFDLENBQUNtRCxJQUFJLENBQUM7SUFDaENDLE9BQU8sRUFBRSxzQ0FBc0M7SUFDL0NDLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDbEJDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFdBQVcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUNyQkMsU0FBUyxFQUFFLHFDQUFxQztJQUNoREMsVUFBVSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUNwQkMsWUFBWSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUU7RUFDdkIsQ0FBQyxDQUFDO0VBQ0ZlLElBQUksRUFBRSxJQUFJMUUsTUFBTSxDQUFDQyxDQUFDLENBQUNtRCxJQUFJLENBQUM7SUFDdEJDLE9BQU8sRUFBRSw0QkFBNEI7SUFDckNDLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDbEJDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFdBQVcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUNyQkMsU0FBUyxFQUFFLHFDQUFxQztJQUNoREMsVUFBVSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUNwQkMsWUFBWSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUU7RUFDdkIsQ0FBQyxDQUFDO0VBQ0ZnQixPQUFPLEVBQUUsSUFBSTNFLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDbUQsSUFBSSxDQUFDO0lBQ3pCQyxPQUFPLEVBQUUsK0JBQStCO0lBQ3hDQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xCQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BCQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGaUIsSUFBSSxFQUFFLElBQUk1RSxNQUFNLENBQUNDLENBQUMsQ0FBQ21ELElBQUksQ0FBQztJQUN0QkMsT0FBTyxFQUFFLDRCQUE0QjtJQUNyQ0MsUUFBUSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUNsQkMsVUFBVSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUNwQkMsV0FBVyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0lBQ3JCQyxTQUFTLEVBQUUscUNBQXFDO0lBQ2hEQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BCQyxZQUFZLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRTtFQUN2QixDQUFDLENBQUM7RUFDRjlCLElBQUksRUFBRSxJQUFJN0IsTUFBTSxDQUFDQyxDQUFDLENBQUNtRCxJQUFJLENBQUM7SUFDdEJDLE9BQU8sRUFBRSw0QkFBNEI7SUFDckNDLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDbEJDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFdBQVcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUNyQkMsU0FBUyxFQUFFLHFDQUFxQztJQUNoREMsVUFBVSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUNwQkMsWUFBWSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUU7RUFDdkIsQ0FBQyxDQUFDO0VBQ0ZrQixRQUFRLEVBQUUsSUFBSTdFLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDbUQsSUFBSSxDQUFDO0lBQzFCQyxPQUFPLEVBQUUsc0NBQXNDO0lBQy9DQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xCQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BCQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUM7QUFDSCxDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7O0FDckxGLElBQU1tQix3QkFBd0IsR0FBRyxTQUEzQkEsd0JBQXdCQSxDQUFJQyxJQUFJLEVBQUVDLEVBQUUsRUFBSztFQUM3QztFQUNBLElBQU1DLElBQUksR0FBSUYsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHRyxJQUFJLENBQUNDLEVBQUUsR0FBSSxHQUFHO0lBQ3BDQyxJQUFJLEdBQUlMLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBR0csSUFBSSxDQUFDQyxFQUFFLEdBQUksR0FBRztJQUNoQ0UsSUFBSSxHQUFJTCxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUdFLElBQUksQ0FBQ0MsRUFBRSxHQUFJLEdBQUc7SUFDOUJHLElBQUksR0FBSU4sRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHRSxJQUFJLENBQUNDLEVBQUUsR0FBSSxHQUFHO0VBRWhDLElBQU1JLFFBQVEsR0FBR0QsSUFBSSxHQUFHRixJQUFJO0VBQzVCLElBQU1JLFFBQVEsR0FBR0gsSUFBSSxHQUFHSixJQUFJO0VBRTVCLElBQU1RLENBQUMsR0FBR1AsSUFBSSxDQUFDUSxHQUFHLENBQUNSLElBQUksQ0FBQ1MsR0FBRyxDQUFDSixRQUFRLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUdMLElBQUksQ0FBQ1UsR0FBRyxDQUFDUixJQUFJLENBQUMsR0FBR0YsSUFBSSxDQUFDVSxHQUFHLENBQUNOLElBQUksQ0FBQyxHQUFHSixJQUFJLENBQUNRLEdBQUcsQ0FBQ1IsSUFBSSxDQUFDUyxHQUFHLENBQUNILFFBQVEsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDckgsSUFBTUssQ0FBQyxHQUFHLENBQUMsR0FBR1gsSUFBSSxDQUFDWSxJQUFJLENBQUNaLElBQUksQ0FBQ2EsSUFBSSxDQUFDTixDQUFDLENBQUMsQ0FBQztFQUNyQyxPQUFPSSxDQUFDLEdBQUcsSUFBSSxHQUFHLElBQUk7QUFDeEIsQ0FBQztBQUdELElBQU1HLHVCQUF1QixHQUFHLFNBQTFCQSx1QkFBdUJBLENBQUdDLFFBQVEsRUFBSTtFQUMxQyxJQUFJQSxRQUFRLEdBQUcsSUFBSSxFQUFFO0lBQ25CQSxRQUFRLE1BQUF2RCxNQUFBLENBQU13RCxjQUFjLENBQUNELFFBQVEsR0FBRyxJQUFJLEVBQUUsQ0FBQyxDQUFDLE9BQUk7RUFDdEQsQ0FBQyxNQUFNO0lBQ0xBLFFBQVEsTUFBQXZELE1BQUEsQ0FBTXdELGNBQWMsQ0FBQ0QsUUFBUSxFQUFFLENBQUMsQ0FBQyxNQUFHO0VBQzlDO0VBQ0EsT0FBT0EsUUFBUTtBQUNqQixDQUFDO0FBR0QsSUFBTUUsZ0JBQWdCLEdBQUcsU0FBbkJBLGdCQUFnQkEsQ0FBR0YsUUFBUSxFQUFJO0VBQ25DLElBQUlHLFVBQVUsR0FBRyxDQUFDO0VBQ2xCLElBQUlDLFVBQVUsR0FBRyxDQUFDO0VBRWxCLElBQUlKLFFBQVEsR0FBRyxLQUFLLEVBQUU7SUFDcEI7SUFDQUcsVUFBVSxHQUFJSCxRQUFRLEdBQUcsTUFBTSxHQUFJLEVBQUU7RUFDdkMsQ0FBQyxNQUFNLElBQUlBLFFBQVEsR0FBRyxLQUFLLEVBQUU7SUFDM0I7SUFDQUcsVUFBVSxHQUFJSCxRQUFRLEdBQUcsS0FBSyxHQUFJLEVBQUU7RUFDdEMsQ0FBQyxNQUFNO0lBQ0w7SUFDQUcsVUFBVSxHQUFJSCxRQUFRLEdBQUcsS0FBSyxHQUFJLEVBQUU7RUFDdEM7RUFFQUksVUFBVSxHQUFHRCxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUM7RUFDN0JBLFVBQVUsR0FBR2xCLElBQUksQ0FBQ29CLEtBQUssQ0FBQ0YsVUFBVSxDQUFDLENBQUMsQ0FBQzs7RUFFckMsSUFBSUEsVUFBVSxHQUFHLEVBQUUsRUFBRTtJQUNuQkEsVUFBVSxNQUFBMUQsTUFBQSxDQUFNd0MsSUFBSSxDQUFDb0IsS0FBSyxDQUFDRixVQUFVLEdBQUcsRUFBRSxDQUFDLFFBQUExRCxNQUFBLENBQUswRCxVQUFVLEdBQUcsRUFBRSxNQUFHO0VBQ3BFLENBQUMsTUFBTTtJQUNMQSxVQUFVLE1BQUExRCxNQUFBLENBQU0wRCxVQUFVLE1BQUc7RUFDL0I7RUFFQSxJQUFJRyxXQUFXLEdBQUlOLFFBQVEsR0FBRyxJQUFJLEdBQUksRUFBRTtFQUN4QyxJQUFJTyxXQUFXLEdBQUdELFdBQVcsR0FBRyxDQUFDO0VBQ2pDQSxXQUFXLEdBQUdyQixJQUFJLENBQUNvQixLQUFLLENBQUNDLFdBQVcsQ0FBQyxDQUFDLENBQUM7O0VBRXZDLElBQUlBLFdBQVcsR0FBRyxFQUFFLEVBQUU7SUFDcEJBLFdBQVcsTUFBQTdELE1BQUEsQ0FBTXdDLElBQUksQ0FBQ29CLEtBQUssQ0FBQ0MsV0FBVyxHQUFHLEVBQUUsQ0FBQyxRQUFBN0QsTUFBQSxDQUFLNkQsV0FBVyxHQUFHLEVBQUUsTUFBRztFQUN2RSxDQUFDLE1BQU07SUFDTEEsV0FBVyxNQUFBN0QsTUFBQSxDQUFNNkQsV0FBVyxNQUFHO0VBQ2pDO0VBRUEsT0FBTztJQUNMbkMsR0FBRyxLQUFBMUIsTUFBQSxDQUFLMEQsVUFBVSxPQUFBMUQsTUFBQSxDQUFJd0MsSUFBSSxDQUFDb0IsS0FBSyxDQUFDSixjQUFjLENBQUVHLFVBQVUsR0FBRyxHQUFHLEdBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFHO0lBQ3JGSSxJQUFJLEtBQUEvRCxNQUFBLENBQUs2RCxXQUFXLE9BQUE3RCxNQUFBLENBQUl3QyxJQUFJLENBQUNvQixLQUFLLENBQUNKLGNBQWMsQ0FBRU0sV0FBVyxHQUFHLEdBQUcsR0FBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0VBQ3ZGLENBQUM7QUFDSCxDQUFDO0FBR0QsSUFBTU4sY0FBYyxHQUFHLFNBQWpCQSxjQUFjQSxDQUFJbkcsS0FBSyxFQUFFMkcsU0FBUyxFQUFLO0VBQzNDLElBQU1DLFVBQVUsR0FBR3pCLElBQUksQ0FBQ1EsR0FBRyxDQUFDLEVBQUUsRUFBRWdCLFNBQVMsSUFBSSxDQUFDLENBQUM7RUFDL0MsT0FBT3hCLElBQUksQ0FBQzBCLEtBQUssQ0FBQzdHLEtBQUssR0FBRzRHLFVBQVUsQ0FBQyxHQUFHQSxVQUFVO0FBQ3BELENBQUM7QUFHRCxpRUFBZTtFQUNidEcsV0FBVyxFQUFFO0lBQ1hDLEdBQUcsRUFBRSxpQkFBaUI7SUFDdEJDLEdBQUcsRUFBRTtFQUNQLENBQUM7RUFDREssVUFBVSxFQUFFWixNQUFNLENBQUNDLENBQUMsQ0FBQzRHLFlBQVksQ0FDL0I3RyxNQUFNLENBQUNDLENBQUMsQ0FBQzZHLE1BQU0sQ0FBQyxrQkFBa0IsRUFBRSxrQkFBa0IsQ0FBQyxFQUN2RDlHLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDNkcsTUFBTSxDQUFDLGlCQUFpQixFQUFFLGlCQUFpQixDQUN0RCxDQUFDO0VBQ0RqRyxTQUFTLEVBQUViLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDOEcsU0FBUyxDQUFDLG9EQUFvRCxFQUFFO0lBQ2xGQyxXQUFXLEVBQUUsNEVBQTRFO0lBQ3pGQyxPQUFPLEVBQUUsRUFBRTtJQUNYQyxPQUFPLEVBQUU7RUFDWCxDQUFDLENBQUM7RUFDRnBHLFVBQVUsRUFBRWQsTUFBTSxDQUFDQyxDQUFDLENBQUM4RyxTQUFTLENBQUMsK0ZBQStGLEVBQUU7SUFDOUhDLFdBQVcsRUFBRSw2R0FBNkc7SUFDMUhDLE9BQU8sRUFBRSxFQUFFO0lBQ1hDLE9BQU8sRUFBRTtFQUNYLENBQUMsQ0FBQztFQUNGcEMsd0JBQXdCLEVBQUVBLHdCQUF3QjtFQUNsRGtCLHVCQUF1QixFQUFFQSx1QkFBdUI7RUFDaERHLGdCQUFnQixFQUFFQSxnQkFBZ0I7RUFDbENELGNBQWMsRUFBRUE7QUFDbEIsQ0FBQzs7Ozs7Ozs7Ozs7QUNoR0Q7Ozs7Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOcUM7QUFDSjtBQUNJO0FBQUEsSUFHL0JpQixjQUFjO0VBR2xCLFNBQUFBLGVBQUEsRUFBYztJQUFBakksZUFBQSxPQUFBaUksY0FBQTtJQUNaLElBQUksQ0FBQzlILElBQUksR0FBRyxJQUFJO0lBQ2hCLElBQUksQ0FBQ0csT0FBTyxHQUFHLENBQUMsQ0FBQztJQUNqQixJQUFJLENBQUM0SCxLQUFLLEdBQUcsSUFBSTtJQUVqQixJQUFJLENBQUNDLEtBQUssR0FBRztNQUNYdEYsR0FBRyxFQUFFaEQsdURBQUssQ0FBQ3VJLFFBQVE7TUFDbkJ0RixHQUFHLEVBQUVqRCx1REFBSyxDQUFDd0ksUUFBUTtNQUNuQkMsUUFBUSxFQUFFLENBQUM7TUFDWDFGLE1BQU0sRUFBRTtJQUNWLENBQUM7SUFFRDlCLE1BQU0sQ0FBQ3lILElBQUksR0FBRyxFQUFFO0lBRWhCLElBQUksQ0FBQ0MsZ0JBQWdCLENBQUMsQ0FBQyxDQUNwQkMsSUFBSSxDQUFDLElBQUksQ0FBQ0MsYUFBYSxDQUFDeEcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQ25DdUcsSUFBSSxDQUFDLElBQUksQ0FBQ0UsUUFBUSxDQUFDekcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQzlCdUcsSUFBSSxDQUFDLElBQUksQ0FBQ0csV0FBVyxDQUFDMUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQ2pDdUcsSUFBSSxDQUFDLElBQUksQ0FBQ0ksYUFBYSxDQUFDM0csSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQ25DdUcsSUFBSSxDQUFDLElBQUksQ0FBQ0ssY0FBYyxDQUFDNUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0VBQ3pDO0VBQUN2QixZQUFBLENBQUFzSCxjQUFBO0lBQUFySCxHQUFBO0lBQUFDLEtBQUEsRUFHRCxTQUFBMkgsaUJBQUEsRUFBbUI7TUFBQSxJQUFBekcsS0FBQTtNQUNqQixPQUFPLElBQUlnSCxPQUFPLENBQUMsVUFBQUMsT0FBTyxFQUFJO1FBQy9CLElBQUksYUFBYSxJQUFJQyxTQUFTLEVBQUU7VUFDL0IsSUFBTWxKLE9BQU8sR0FBRztZQUNWbUosa0JBQWtCLEVBQUUsSUFBSTtZQUFFO1lBQzFCQyxVQUFVLEVBQUUsSUFBSTtZQUFFO1lBQ2xCQyxPQUFPLEVBQUUsR0FBRyxDQUFFO1VBQ2hCLENBQUM7O1VBQ0xySCxLQUFJLENBQUNzSCxRQUFRLEdBQUdKLFNBQVMsQ0FBQ0ssV0FBVyxDQUFDQyxhQUFhLENBQUMsVUFBQXpILFFBQVEsRUFBSTtZQUMvRDtZQUNBQyxLQUFJLENBQUNvRyxLQUFLLENBQUN0RixHQUFHLEdBQUdmLFFBQVEsQ0FBQzBILE1BQU0sQ0FBQ0MsUUFBUTtZQUN6QzFILEtBQUksQ0FBQ29HLEtBQUssQ0FBQ3JGLEdBQUcsR0FBR2hCLFFBQVEsQ0FBQzBILE1BQU0sQ0FBQ0UsU0FBUztZQUMxQzNILEtBQUksQ0FBQ29HLEtBQUssQ0FBQ0csUUFBUSxHQUFHeEcsUUFBUSxDQUFDMEgsTUFBTSxDQUFDbEIsUUFBUTtZQUM5QztZQUNBLElBQUl2RyxLQUFJLENBQUM1QixJQUFJLEVBQUU7Y0FDUjRCLEtBQUksQ0FBQzVCLElBQUksQ0FBQ3NDLGNBQWMsQ0FBQyxDQUFDO1lBQzVCO1lBQ0x1RyxPQUFPLENBQUMsQ0FBQztVQUNWLENBQUMsRUFBRUEsT0FBTyxFQUFFakosT0FBTyxDQUFDO1FBQ2xCLENBQUMsTUFBTTtVQUNUaUosT0FBTyxDQUFDLENBQUM7UUFDVjtNQUNELENBQUMsQ0FBQztJQUNGO0VBQUM7SUFBQXBJLEdBQUE7SUFBQUMsS0FBQSxFQUdELFNBQUE2SCxjQUFBLEVBQWdCO01BQUEsSUFBQXZGLE1BQUE7TUFDZCxPQUFPLElBQUk0RixPQUFPLENBQUMsVUFBQUMsT0FBTyxFQUFJO1FBQzVCVyxLQUFLLDRCQUE0QixDQUFDLENBQUNsQixJQUFJLENBQUMsVUFBQW1CLElBQUksRUFBSTtVQUM5Q0EsSUFBSSxDQUFDQyxJQUFJLENBQUMsQ0FBQyxDQUFDcEIsSUFBSSxDQUFDLFVBQUFxQixRQUFRLEVBQUk7WUFDM0IzRyxNQUFJLENBQUMrRSxLQUFLLEdBQUc0QixRQUFRO1lBQ3JCZCxPQUFPLENBQUMsQ0FBQztVQUNYLENBQUMsQ0FBQyxTQUFNLENBQUNBLE9BQU8sQ0FBQztRQUNuQixDQUFDLENBQUMsU0FBTSxDQUFDQSxPQUFPLENBQUM7TUFDbkIsQ0FBQyxDQUFDO0lBQ0o7RUFBQztJQUFBcEksR0FBQTtJQUFBQyxLQUFBLEVBR0QsU0FBQThILFNBQUEsRUFBVztNQUFBLElBQUFvQixNQUFBO01BQ1QsT0FBTyxJQUFJaEIsT0FBTyxDQUFDLFVBQUFDLE9BQU8sRUFBSTtRQUM1QmUsTUFBSSxDQUFDNUosSUFBSSxHQUFHLElBQUlMLHFEQUFHLENBQUM7VUFDbEJJLFFBQVEsRUFBRTtRQUNaLENBQUMsQ0FBQztRQUNGOEksT0FBTyxDQUFDLENBQUM7TUFDWCxDQUFDLENBQUM7SUFDSjtFQUFDO0lBQUFwSSxHQUFBO0lBQUFDLEtBQUEsRUFHRCxTQUFBK0gsWUFBQSxFQUFjO01BQUEsSUFBQW9CLE1BQUE7TUFDWixPQUFPLElBQUlqQixPQUFPLENBQUMsVUFBQUMsT0FBTyxFQUFJO1FBQzVCO1FBQ0FpQixRQUFRLENBQUNDLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQ0MsZ0JBQWdCLENBQUMsT0FBTyxFQUFFSCxNQUFJLENBQUNJLFVBQVUsQ0FBQ2xJLElBQUksQ0FBQzhILE1BQUksQ0FBQyxDQUFDO1FBQzlGaEIsT0FBTyxDQUFDLENBQUM7TUFDWCxDQUFDLENBQUM7SUFDSjtFQUFDO0lBQUFwSSxHQUFBO0lBQUFDLEtBQUEsRUFHRCxTQUFBZ0ksY0FBQSxFQUFnQjtNQUFBLElBQUF3QixNQUFBO01BQ2QsT0FBTyxJQUFJdEIsT0FBTyxDQUFDLFVBQUFDLE9BQU8sRUFBSTtRQUM1QixJQUFNc0IsSUFBSSxHQUFHdkcsTUFBTSxDQUFDdUcsSUFBSSxDQUFDRCxNQUFJLENBQUNuQyxLQUFLLENBQUNxQyxPQUFPLENBQUM7UUFDNUMsS0FBSyxJQUFJNUcsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHMkcsSUFBSSxDQUFDL0csTUFBTSxFQUFFLEVBQUVJLENBQUMsRUFBRTtVQUNwQyxLQUFLLElBQUk2RyxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUdILE1BQUksQ0FBQ25DLEtBQUssQ0FBQ3FDLE9BQU8sQ0FBQ0QsSUFBSSxDQUFDM0csQ0FBQyxDQUFDLENBQUMsQ0FBQ0osTUFBTSxFQUFFLEVBQUVpSCxDQUFDLEVBQUU7WUFDM0RILE1BQUksQ0FBQ2xLLElBQUksQ0FBQzhDLE9BQU8sQ0FBQ29ILE1BQUksQ0FBQ25DLEtBQUssQ0FBQ3FDLE9BQU8sQ0FBQ0QsSUFBSSxDQUFDM0csQ0FBQyxDQUFDLENBQUMsQ0FBQzZHLENBQUMsQ0FBQyxFQUFFSCxNQUFJLENBQUNJLGtCQUFrQixDQUFDdkksSUFBSSxDQUFDbUksTUFBSSxDQUFDLENBQUM7VUFDdkY7UUFDRjtRQUNBckIsT0FBTyxDQUFDLENBQUM7TUFDWCxDQUFDLENBQUM7SUFDSjtFQUFDO0lBQUFwSSxHQUFBO0lBQUFDLEtBQUEsRUFHRCxTQUFBaUksZUFBQSxFQUFpQjtNQUFBLElBQUE0QixNQUFBO01BQ2YsT0FBTyxJQUFJM0IsT0FBTyxDQUFDLFVBQUFDLE9BQU8sRUFBSTtRQUM1QixJQUFNc0IsSUFBSSxHQUFHdkcsTUFBTSxDQUFDdUcsSUFBSSxDQUFDSSxNQUFJLENBQUN4QyxLQUFLLENBQUN5QyxVQUFVLENBQUM7UUFDL0MsS0FBSyxJQUFJaEgsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHMkcsSUFBSSxDQUFDL0csTUFBTSxFQUFFLEVBQUVJLENBQUMsRUFBRTtVQUNwQytHLE1BQUksQ0FBQ3ZLLElBQUksQ0FBQzBELFVBQVUsQ0FBQzZHLE1BQUksQ0FBQ3hDLEtBQUssQ0FBQ3lDLFVBQVUsQ0FBQ0wsSUFBSSxDQUFDM0csQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0RDtRQUNBcUYsT0FBTyxDQUFDLENBQUM7TUFDWCxDQUFDLENBQUM7SUFDSjs7SUFHQTtFQUFBO0lBQUFwSSxHQUFBO0lBQUFDLEtBQUEsRUFHQSxTQUFBNEosbUJBQW1CcEksSUFBSSxFQUFFO01BQ3ZCLElBQU11SSxHQUFHLEdBQUdYLFFBQVEsQ0FBQ1ksYUFBYSxDQUFDLEtBQUssQ0FBQztNQUN6QyxJQUFNQyxLQUFLLEdBQUdiLFFBQVEsQ0FBQ1ksYUFBYSxDQUFDLElBQUksQ0FBQztNQUMxQyxJQUFNRSxPQUFPLEdBQUdkLFFBQVEsQ0FBQ1ksYUFBYSxDQUFDLEdBQUcsQ0FBQztNQUMzQyxJQUFNRyxJQUFJLEdBQUdmLFFBQVEsQ0FBQ1ksYUFBYSxDQUFDLEdBQUcsQ0FBQztNQUN4QyxJQUFNSSxLQUFLLEdBQUdoQixRQUFRLENBQUNZLGFBQWEsQ0FBQyxHQUFHLENBQUM7TUFDekMsSUFBTUssT0FBTyxHQUFHakIsUUFBUSxDQUFDWSxhQUFhLENBQUMsR0FBRyxDQUFDO01BQzNDLElBQU1NLElBQUksR0FBR2xCLFFBQVEsQ0FBQ1ksYUFBYSxDQUFDLEdBQUcsQ0FBQztNQUN4QyxJQUFNTyxRQUFRLEdBQUduQixRQUFRLENBQUNZLGFBQWEsQ0FBQyxHQUFHLENBQUM7TUFFNUNELEdBQUcsQ0FBQ1MsU0FBUyxDQUFDQyxHQUFHLENBQUMsY0FBYyxDQUFDO01BQ2pDUixLQUFLLENBQUNTLFNBQVMsR0FBR2xKLElBQUksQ0FBQ21KLElBQUk7TUFDM0JULE9BQU8sQ0FBQ1EsU0FBUyxHQUFHbEosSUFBSSxDQUFDMEksT0FBTztNQUNoQ0MsSUFBSSxDQUFDTyxTQUFTLEdBQUdsSixJQUFJLENBQUMySSxJQUFJO01BQzFCQyxLQUFLLENBQUNRLElBQUksVUFBQWpJLE1BQUEsQ0FBVW5CLElBQUksQ0FBQzRJLEtBQUssQ0FBRTtNQUNoQ0EsS0FBSyxDQUFDTSxTQUFTLDhDQUFBL0gsTUFBQSxDQUE0Q25CLElBQUksQ0FBQzRJLEtBQUssQ0FBRTtNQUN2RUMsT0FBTyxDQUFDTyxJQUFJLEdBQUdwSixJQUFJLENBQUM2SSxPQUFPO01BQzNCQSxPQUFPLENBQUNLLFNBQVMsR0FBRyx1REFBdUQ7TUFDM0VMLE9BQU8sQ0FBQ1EsWUFBWSxDQUFDLEtBQUssRUFBRSxxQkFBcUIsQ0FBQztNQUNsRFIsT0FBTyxDQUFDUSxZQUFZLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQztNQUN4Q1AsSUFBSSxDQUFDSSxTQUFTLEdBQUdsSixJQUFJLENBQUM4SSxJQUFJO01BQzFCQyxRQUFRLENBQUNLLElBQUksVUFBQWpJLE1BQUEsQ0FBVW5CLElBQUksQ0FBQ1EsR0FBRyxPQUFBVyxNQUFBLENBQUluQixJQUFJLENBQUNTLEdBQUcsQ0FBRTtNQUM3Q3NJLFFBQVEsQ0FBQ0csU0FBUyxHQUFHLHdEQUF3RDtNQUU3RVgsR0FBRyxDQUFDZSxXQUFXLENBQUNiLEtBQUssQ0FBQztNQUN0QkYsR0FBRyxDQUFDZSxXQUFXLENBQUNaLE9BQU8sQ0FBQztNQUN4QkgsR0FBRyxDQUFDZSxXQUFXLENBQUNYLElBQUksQ0FBQztNQUVyQixJQUFNWSxNQUFNLEdBQUcsSUFBSSxDQUFDQyxrQkFBa0IsQ0FBQ3hKLElBQUksQ0FBQ3lKLFNBQVMsQ0FBQztNQUN0RGxCLEdBQUcsQ0FBQ2UsV0FBVyxDQUFDQyxNQUFNLENBQUM7TUFFdkIsSUFBSXZKLElBQUksQ0FBQ3lKLFNBQVMsQ0FBQ3ZJLE1BQU0sR0FBRyxDQUFDLEVBQUU7UUFDN0JxSSxNQUFNLENBQUN6QixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDNEIsZUFBZSxDQUFDN0osSUFBSSxDQUFDLElBQUksRUFBRUcsSUFBSSxDQUFDLENBQUM7TUFDekU7TUFFQSxJQUFJQSxJQUFJLENBQUM4SSxJQUFJLEtBQUssRUFBRSxFQUFFO1FBQ3BCUCxHQUFHLENBQUNlLFdBQVcsQ0FBQ1IsSUFBSSxDQUFDO01BQ3ZCO01BRUEsSUFBSTlJLElBQUksQ0FBQzRJLEtBQUssS0FBSyxFQUFFLEVBQUU7UUFDckJMLEdBQUcsQ0FBQ2UsV0FBVyxDQUFDVixLQUFLLENBQUM7TUFDeEI7TUFFQSxJQUFJNUksSUFBSSxDQUFDNkksT0FBTyxLQUFLLEVBQUUsRUFBRTtRQUN2Qk4sR0FBRyxDQUFDZSxXQUFXLENBQUNULE9BQU8sQ0FBQztNQUMxQjtNQUVBTixHQUFHLENBQUNlLFdBQVcsQ0FBQ1AsUUFBUSxDQUFDO01BRXpCLE9BQU9SLEdBQUc7SUFDWjtFQUFDO0lBQUFoSyxHQUFBO0lBQUFDLEtBQUEsRUFHRCxTQUFBZ0wsbUJBQW1CQyxTQUFTLEVBQUU7TUFDNUIsSUFBTWxCLEdBQUcsR0FBR1gsUUFBUSxDQUFDWSxhQUFhLENBQUMsS0FBSyxDQUFDO01BQ3pDLElBQU1tQixLQUFLLEdBQUcvQixRQUFRLENBQUNZLGFBQWEsQ0FBQyxJQUFJLENBQUM7TUFDMUMsSUFBTW9CLElBQUksR0FBR2hDLFFBQVEsQ0FBQ1ksYUFBYSxDQUFDLEdBQUcsQ0FBQztNQUN4Q0QsR0FBRyxDQUFDUyxTQUFTLENBQUNDLEdBQUcsQ0FBQyxlQUFlLENBQUM7TUFDbENWLEdBQUcsQ0FBQ2UsV0FBVyxDQUFDSyxLQUFLLENBQUM7TUFDdEJwQixHQUFHLENBQUNlLFdBQVcsQ0FBQ00sSUFBSSxDQUFDO01BRXJCLElBQUlILFNBQVMsQ0FBQ3ZJLE1BQU0sRUFBRTtRQUNwQjBJLElBQUksQ0FBQ1YsU0FBUyxHQUFHLG1CQUFtQjtRQUNwQyxJQUFJLENBQUNXLFVBQVUsQ0FBQ0osU0FBUyxFQUFFbEIsR0FBRyxDQUFDO1FBQy9CdUIsV0FBVyxDQUFDLElBQUksQ0FBQ0QsVUFBVSxDQUFDaEssSUFBSSxDQUFDLElBQUksRUFBRTRKLFNBQVMsRUFBRWxCLEdBQUcsQ0FBQyxFQUFFLEtBQUssQ0FBQztNQUNoRSxDQUFDLE1BQU07UUFDTCxJQUFJLENBQUN3QixlQUFlLENBQUN4QixHQUFHLEVBQUUsSUFBSSxDQUFDO1FBQy9CcUIsSUFBSSxDQUFDVixTQUFTLEdBQUcsaUJBQWlCO01BQ3BDO01BRUEsT0FBT1gsR0FBRztJQUNaO0VBQUM7SUFBQWhLLEdBQUE7SUFBQUMsS0FBQSxFQUdELFNBQUFxTCxXQUFXSixTQUFTLEVBQUVsQixHQUFHLEVBQUU7TUFDekIsSUFBTXlCLEdBQUcsR0FBRyxJQUFJQyxJQUFJLENBQUMsQ0FBQztNQUN0QixJQUFJQyxJQUFJLEdBQUdGLEdBQUcsQ0FBQ0csUUFBUSxDQUFDLENBQUM7TUFDekIsSUFBSUMsT0FBTyxHQUFHSixHQUFHLENBQUNLLFVBQVUsQ0FBQyxDQUFDO01BQzlCLElBQUlELE9BQU8sR0FBRyxFQUFFLEVBQUU7UUFDaEJBLE9BQU8sT0FBQWpKLE1BQUEsQ0FBT2lKLE9BQU8sQ0FBRTtNQUN6QjtNQUVBLElBQU1FLFNBQVMsR0FBR04sR0FBRyxDQUFDTyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUM7TUFDbEMsSUFBTUMsV0FBVyxHQUFHQyxRQUFRLElBQUF0SixNQUFBLENBQUlzSSxTQUFTLENBQUNhLFNBQVMsQ0FBQyxDQUFDSSxJQUFJLENBQUNDLENBQUMsRUFBQXhKLE1BQUEsQ0FBR3NJLFNBQVMsQ0FBQ2EsU0FBUyxDQUFDLENBQUNJLElBQUksQ0FBQ0UsQ0FBQyxDQUFFLENBQUM7TUFDNUYsSUFBTUMsV0FBVyxHQUFHSixRQUFRLElBQUF0SixNQUFBLENBQUlzSSxTQUFTLENBQUNhLFNBQVMsQ0FBQyxDQUFDUSxLQUFLLENBQUNILENBQUMsRUFBQXhKLE1BQUEsQ0FBR3NJLFNBQVMsQ0FBQ2EsU0FBUyxDQUFDLENBQUNRLEtBQUssQ0FBQ0YsQ0FBQyxDQUFFLENBQUM7TUFDOUYsSUFBTUcsV0FBVyxHQUFHTixRQUFRLElBQUF0SixNQUFBLENBQUkrSSxJQUFJLEVBQUEvSSxNQUFBLENBQUdpSixPQUFPLENBQUUsQ0FBQztNQUNqRDtNQUNBLElBQUlYLFNBQVMsQ0FBQ2EsU0FBUyxDQUFDLENBQUNVLE1BQU0sSUFBSUMsS0FBSyxDQUFDVCxXQUFXLENBQUMsRUFBRTtRQUFFO1FBQ3ZELElBQUksQ0FBQ1QsZUFBZSxDQUFDeEIsR0FBRyxFQUFFLElBQUksQ0FBQztNQUNqQyxDQUFDLE1BQU0sSUFBSWtCLFNBQVMsQ0FBQ2EsU0FBUyxDQUFDLENBQUNVLE1BQU0sSUFBSUQsV0FBVyxJQUFJUCxXQUFXLElBQUlPLFdBQVcsR0FBR0YsV0FBVyxFQUFFO1FBQ2pHLElBQUlwQixTQUFTLENBQUNhLFNBQVMsQ0FBQyxTQUFNLENBQUNZLFFBQVEsRUFBRTtVQUN2QyxJQUFNQyxnQkFBZ0IsR0FBR1YsUUFBUSxJQUFBdEosTUFBQSxDQUFJc0ksU0FBUyxDQUFDYSxTQUFTLENBQUMsU0FBTSxDQUFDYyxHQUFHLENBQUNULENBQUMsRUFBQXhKLE1BQUEsQ0FBR3NJLFNBQVMsQ0FBQ2EsU0FBUyxDQUFDLFNBQU0sQ0FBQ2MsR0FBRyxDQUFDUixDQUFDLENBQUUsQ0FBQztVQUMzRyxJQUFNUyxnQkFBZ0IsR0FBR1osUUFBUSxJQUFBdEosTUFBQSxDQUFJc0ksU0FBUyxDQUFDYSxTQUFTLENBQUMsU0FBTSxDQUFDZ0IsS0FBSyxDQUFDWCxDQUFDLEVBQUF4SixNQUFBLENBQUdzSSxTQUFTLENBQUNhLFNBQVMsQ0FBQyxTQUFNLENBQUNnQixLQUFLLENBQUNWLENBQUMsQ0FBRSxDQUFDO1VBQy9HLElBQUlHLFdBQVcsSUFBSU0sZ0JBQWdCLElBQUlOLFdBQVcsR0FBR0ksZ0JBQWdCLEVBQUU7WUFDckUsSUFBSSxDQUFDSSxlQUFlLENBQUNoRCxHQUFHLENBQUM7VUFDM0IsQ0FBQyxNQUFNO1lBQ0wsSUFBSSxDQUFDd0IsZUFBZSxDQUFDeEIsR0FBRyxDQUFDO1VBQzNCO1FBQ0YsQ0FBQyxNQUFNO1VBQ0wsSUFBSSxDQUFDd0IsZUFBZSxDQUFDeEIsR0FBRyxDQUFDO1FBQzNCO01BQ0YsQ0FBQyxNQUFNO1FBQ0wsSUFBSSxDQUFDZ0QsZUFBZSxDQUFDaEQsR0FBRyxDQUFDO01BQzNCO0lBQ0Y7RUFBQztJQUFBaEssR0FBQTtJQUFBQyxLQUFBLEVBR0QsU0FBQXVMLGdCQUFnQnhCLEdBQUcsRUFBRWlELFlBQVksRUFBRTtNQUNqQ2pELEdBQUcsQ0FBQ2tELFVBQVUsQ0FBQ3ZDLFNBQVMsV0FBVztNQUNuQyxJQUFJc0MsWUFBWSxLQUFLLElBQUksRUFBRTtRQUN6QmpELEdBQUcsQ0FBQ21ELFNBQVMsQ0FBQ3hDLFNBQVMscUJBQXFCO01BQzlDO01BQ0FYLEdBQUcsQ0FBQ1MsU0FBUyxDQUFDQyxHQUFHLENBQUMsUUFBUSxDQUFDO0lBQzdCO0VBQUM7SUFBQTFLLEdBQUE7SUFBQUMsS0FBQSxFQUdELFNBQUErTSxnQkFBZ0JoRCxHQUFHLEVBQUU7TUFDbkJBLEdBQUcsQ0FBQ2tELFVBQVUsQ0FBQ3ZDLFNBQVMsYUFBVTtNQUNsQ1gsR0FBRyxDQUFDbUQsU0FBUyxDQUFDeEMsU0FBUyxzQkFBc0I7TUFDN0NYLEdBQUcsQ0FBQ1MsU0FBUyxDQUFDMkMsTUFBTSxDQUFDLFFBQVEsQ0FBQztJQUNoQztFQUFDO0lBQUFwTixHQUFBO0lBQUFDLEtBQUEsRUFHRCxTQUFBa0wsZ0JBQWdCMUosSUFBSSxFQUFFO01BQUEsSUFBQTRMLE1BQUE7TUFDcEIsSUFBSSxDQUFDQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsQ0FBQ3pGLElBQUksQ0FBQyxVQUFBbUMsR0FBRyxFQUFJO1FBQzVDO1FBQ0FBLEdBQUcsQ0FBQ3VELGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQzVDLFNBQVMsR0FBR2xKLElBQUksQ0FBQ21KLElBQUk7UUFDckRaLEdBQUcsQ0FBQ3VELGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQzVDLFNBQVMsTUFBQS9ILE1BQUEsQ0FBTW5CLElBQUksQ0FBQzBJLE9BQU8sUUFBQXZILE1BQUEsQ0FBS25CLElBQUksQ0FBQzJJLElBQUksQ0FBRTtRQUM5RSxJQUFNakUsUUFBUSxHQUFHbEgsdURBQUssQ0FBQytGLHdCQUF3QixDQUFDLENBQUN2RCxJQUFJLENBQUNRLEdBQUcsRUFBRVIsSUFBSSxDQUFDUyxHQUFHLENBQUMsRUFBRSxDQUFDbUwsTUFBSSxDQUFDOUYsS0FBSyxDQUFDdEYsR0FBRyxFQUFFb0wsTUFBSSxDQUFDOUYsS0FBSyxDQUFDckYsR0FBRyxDQUFDLENBQUM7UUFDdkc4SCxHQUFHLENBQUN1RCxhQUFhLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzVDLFNBQVMsZ0NBQUEvSCxNQUFBLENBQTBCM0QsdURBQUssQ0FBQ2lILHVCQUF1QixDQUFDQyxRQUFRLENBQUMsYUFBQXZELE1BQUEsQ0FBVW5CLElBQUksQ0FBQ21KLElBQUksMkJBQXFCO1FBQ3RKLElBQU00QyxHQUFHLEdBQUd2Tyx1REFBSyxDQUFDb0gsZ0JBQWdCLENBQUNGLFFBQVEsQ0FBQztRQUM1QzZELEdBQUcsQ0FBQ3VELGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQzVDLFNBQVMsbUNBQUEvSCxNQUFBLENBQWdDNEssR0FBRyxDQUFDbEosR0FBRyxzQkFBQTFCLE1BQUEsQ0FBbUI0SyxHQUFHLENBQUM3RyxJQUFJLGdCQUFVO1FBQ3BIcUQsR0FBRyxDQUFDdUQsYUFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFDeEMsV0FBVyxDQUFDc0MsTUFBSSxDQUFDcEMsa0JBQWtCLENBQUN4SixJQUFJLENBQUN5SixTQUFTLENBQUMsQ0FBQztRQUNyRjtRQUNBLElBQU1PLEdBQUcsR0FBRyxJQUFJQyxJQUFJLENBQUMsQ0FBQztRQUN0QixJQUFNSyxTQUFTLEdBQUdOLEdBQUcsQ0FBQ08sTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ2xDLEtBQUssSUFBSWpKLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBR3RCLElBQUksQ0FBQ3lKLFNBQVMsQ0FBQ3ZJLE1BQU0sRUFBRSxFQUFFSSxDQUFDLEVBQUU7VUFDOUMsSUFBTTBLLE1BQU0sR0FBR3pELEdBQUcsQ0FBQ3VELGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQ0csUUFBUSxDQUFDM0ssQ0FBQyxDQUFDO1VBQzFELElBQUl0QixJQUFJLENBQUN5SixTQUFTLENBQUNuSSxDQUFDLENBQUMsQ0FBQzBKLE1BQU0sS0FBSyxJQUFJLEVBQUU7WUFDckMsSUFBTWtCLE9BQU8sR0FBR0YsTUFBTSxDQUFDRyxnQkFBZ0IsQ0FBQ0MsaUJBQWlCO1lBQ3pELElBQU1DLFNBQVMsR0FBR0wsTUFBTSxDQUFDRyxnQkFBZ0IsQ0FBQ0EsZ0JBQWdCO1lBQzFELElBQUluTSxJQUFJLENBQUN5SixTQUFTLENBQUNuSSxDQUFDLENBQUMsU0FBTSxJQUFJdEIsSUFBSSxDQUFDeUosU0FBUyxDQUFDbkksQ0FBQyxDQUFDLFNBQU0sQ0FBQzRKLFFBQVEsS0FBSyxJQUFJLEVBQUU7Y0FDeEVnQixPQUFPLENBQUNoRCxTQUFTLFNBQUEvSCxNQUFBLENBQVNuQixJQUFJLENBQUN5SixTQUFTLENBQUNuSSxDQUFDLENBQUMsQ0FBQ29KLElBQUksQ0FBQ0MsQ0FBQyxPQUFBeEosTUFBQSxDQUFJbkIsSUFBSSxDQUFDeUosU0FBUyxDQUFDbkksQ0FBQyxDQUFDLENBQUNvSixJQUFJLENBQUNFLENBQUMsY0FBQXpKLE1BQUEsQ0FBTW5CLElBQUksQ0FBQ3lKLFNBQVMsQ0FBQ25JLENBQUMsQ0FBQyxTQUFNLENBQUNnSyxLQUFLLENBQUNYLENBQUMsT0FBQXhKLE1BQUEsQ0FBSW5CLElBQUksQ0FBQ3lKLFNBQVMsQ0FBQ25JLENBQUMsQ0FBQyxTQUFNLENBQUNnSyxLQUFLLENBQUNWLENBQUMsU0FBTTtjQUM1SnNCLE9BQU8sQ0FBQ2xELFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Y0FDakNpRCxPQUFPLENBQUNsRCxTQUFTLENBQUNDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2NBQ2xDb0QsU0FBUyxDQUFDbkQsU0FBUyxTQUFBL0gsTUFBQSxDQUFTbkIsSUFBSSxDQUFDeUosU0FBUyxDQUFDbkksQ0FBQyxDQUFDLFNBQU0sQ0FBQzhKLEdBQUcsQ0FBQ1QsQ0FBQyxPQUFBeEosTUFBQSxDQUFJbkIsSUFBSSxDQUFDeUosU0FBUyxDQUFDbkksQ0FBQyxDQUFDLFNBQU0sQ0FBQzhKLEdBQUcsQ0FBQ1IsQ0FBQyxjQUFBekosTUFBQSxDQUFNbkIsSUFBSSxDQUFDeUosU0FBUyxDQUFDbkksQ0FBQyxDQUFDLENBQUN3SixLQUFLLENBQUNILENBQUMsT0FBQXhKLE1BQUEsQ0FBSW5CLElBQUksQ0FBQ3lKLFNBQVMsQ0FBQ25JLENBQUMsQ0FBQyxDQUFDd0osS0FBSyxDQUFDRixDQUFDLFNBQU07Y0FDNUp5QixTQUFTLENBQUNyRCxTQUFTLENBQUNDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2NBQ25Db0QsU0FBUyxDQUFDckQsU0FBUyxDQUFDQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUN0QyxDQUFDLE1BQU0sSUFBSWpKLElBQUksQ0FBQ3lKLFNBQVMsQ0FBQ25JLENBQUMsQ0FBQyxDQUFDb0osSUFBSSxDQUFDQyxDQUFDLElBQUkzSyxJQUFJLENBQUN5SixTQUFTLENBQUNuSSxDQUFDLENBQUMsQ0FBQ3dKLEtBQUssQ0FBQ0gsQ0FBQyxFQUFFO2NBQ2hFdUIsT0FBTyxDQUFDaEQsU0FBUyxTQUFBL0gsTUFBQSxDQUFTbkIsSUFBSSxDQUFDeUosU0FBUyxDQUFDbkksQ0FBQyxDQUFDLENBQUNvSixJQUFJLENBQUNDLENBQUMsT0FBQXhKLE1BQUEsQ0FBSW5CLElBQUksQ0FBQ3lKLFNBQVMsQ0FBQ25JLENBQUMsQ0FBQyxDQUFDb0osSUFBSSxDQUFDRSxDQUFDLFNBQU07Y0FDcEZzQixPQUFPLENBQUNsRCxTQUFTLENBQUNDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2NBQ2pDb0QsU0FBUyxDQUFDbkQsU0FBUyxTQUFBL0gsTUFBQSxDQUFTbkIsSUFBSSxDQUFDeUosU0FBUyxDQUFDbkksQ0FBQyxDQUFDLENBQUN3SixLQUFLLENBQUNILENBQUMsT0FBQXhKLE1BQUEsQ0FBSW5CLElBQUksQ0FBQ3lKLFNBQVMsQ0FBQ25JLENBQUMsQ0FBQyxDQUFDd0osS0FBSyxDQUFDRixDQUFDLFNBQU07Y0FDeEZ5QixTQUFTLENBQUNyRCxTQUFTLENBQUNDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLENBQUMsTUFBTTtjQUNMaUQsT0FBTyxDQUFDaEQsU0FBUyxpQkFBaUI7Y0FDbENnRCxPQUFPLENBQUNsRCxTQUFTLENBQUNDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2NBQ2pDb0QsU0FBUyxDQUFDbkQsU0FBUyxpQkFBaUI7Y0FDcENtRCxTQUFTLENBQUNyRCxTQUFTLENBQUNDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ3JDO1VBQ0YsQ0FBQyxNQUFNO1lBQ0wrQyxNQUFNLENBQUNHLGdCQUFnQixDQUFDakQsU0FBUyxnREFBMkM7VUFDOUU7VUFDQTtVQUNBLElBQUk1SCxDQUFDLEtBQUtnSixTQUFTLEVBQUU7WUFDbkIwQixNQUFNLENBQUNoRCxTQUFTLENBQUNDLEdBQUcsQ0FBQyxPQUFPLENBQUM7VUFDL0I7UUFDRjtRQUVBckIsUUFBUSxDQUFDQyxjQUFjLENBQUMsZUFBZSxDQUFDLENBQUN5QixXQUFXLENBQUNmLEdBQUcsQ0FBQztRQUN6RFgsUUFBUSxDQUFDQyxjQUFjLENBQUMsZUFBZSxDQUFDLENBQUN5RSxLQUFLLENBQUNDLE9BQU8sR0FBRyxNQUFNO1FBQ2xFQyxVQUFVLENBQUM7VUFBQSxPQUFNNUUsUUFBUSxDQUFDQyxjQUFjLENBQUMsZUFBZSxDQUFDLENBQUN5RSxLQUFLLENBQUNHLE9BQU8sR0FBRyxDQUFDO1FBQUEsR0FBRSxFQUFFLENBQUM7TUFDL0UsQ0FBQyxDQUFDO0lBQ0o7O0lBRUY7O0lBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7SUFFRTtFQUFBO0lBQUFsTyxHQUFBO0lBQUFDLEtBQUEsRUFFQSxTQUFBcU4sV0FBV2EsR0FBRyxFQUFFO01BQ2QsT0FBTyxJQUFJaEcsT0FBTyxDQUFDLFVBQUFDLE9BQU8sRUFBSTtRQUM1QlcsS0FBSyxpQkFBQW5HLE1BQUEsQ0FBaUJ1TCxHQUFHLFVBQU8sQ0FBQyxDQUFDdEcsSUFBSSxDQUFDLFVBQUFtQixJQUFJLEVBQUk7VUFDN0NBLElBQUksQ0FBQ29GLElBQUksQ0FBQyxDQUFDLENBQUN2RyxJQUFJLENBQUMsVUFBQXdHLElBQUksRUFBSTtZQUN2QmpHLE9BQU8sQ0FBQ2lCLFFBQVEsQ0FBQ2lGLFdBQVcsQ0FBQyxDQUFDLENBQUNDLHdCQUF3QixDQUFDRixJQUFJLENBQUMsQ0FBQztVQUNoRSxDQUFDLENBQUM7UUFDSixDQUFDLENBQUM7TUFDSixDQUFDLENBQUM7SUFDSjtFQUFDO0lBQUFyTyxHQUFBO0lBQUFDLEtBQUEsRUFHRCxTQUFBdUosV0FBV2dGLEtBQUssRUFBRUMsS0FBSyxFQUFFO01BQ3pCLElBQUlBLEtBQUssS0FBSyxJQUFJLElBQUlELEtBQUssQ0FBQ0UsTUFBTSxDQUFDQyxFQUFFLEtBQUssZUFBZSxJQUFJSCxLQUFLLENBQUNFLE1BQU0sQ0FBQ0MsRUFBRSxDQUFDQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDbEd2RixRQUFRLENBQUNDLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQ3lFLEtBQUssQ0FBQ0csT0FBTyxHQUFHLENBQUM7UUFDMURELFVBQVUsQ0FBQyxZQUFNO1VBQ2Y1RSxRQUFRLENBQUNDLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQ3lFLEtBQUssQ0FBQ0MsT0FBTyxHQUFHLE1BQU07VUFDL0QzRSxRQUFRLENBQUNDLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQ3FCLFNBQVMsR0FBRyxFQUFFO1FBQ3pELENBQUMsRUFBRSxHQUFHLENBQUM7TUFDVDtJQUNGO0VBQUM7SUFBQTNLLEdBQUE7SUFBQTZPLEdBQUEsRUFHRCxTQUFBQSxJQUFBLEVBQVc7TUFDVCxPQUFPLElBQUksQ0FBQ3RILEtBQUs7SUFDbkI7RUFBQztFQUFBLE9BQUFGLGNBQUE7QUFBQTtBQUtILGlFQUFlQSxjQUFjLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Nb25Eb3VyZGFubmFpcy8uL3NyYy9qcy91dGlscy9NYXAuanMiLCJ3ZWJwYWNrOi8vTW9uRG91cmRhbm5haXMvLi9zcmMvanMvdXRpbHMvTWFya2VyRW51bS5qcyIsIndlYnBhY2s6Ly9Nb25Eb3VyZGFubmFpcy8uL3NyYy9qcy91dGlscy9VdGlscy5qcyIsIndlYnBhY2s6Ly9Nb25Eb3VyZGFubmFpcy8uL3NyYy9zY3NzL01vbkRvdXJkYW5uYWlzLnNjc3MiLCJ3ZWJwYWNrOi8vTW9uRG91cmRhbm5haXMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vTW9uRG91cmRhbm5haXMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL01vbkRvdXJkYW5uYWlzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vTW9uRG91cmRhbm5haXMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9Nb25Eb3VyZGFubmFpcy8uL3NyYy9qcy9Nb25Eb3VyZGFubmFpcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTWFya2VycyBmcm9tICcuL01hcmtlckVudW0uanMnO1xyXG5pbXBvcnQgVXRpbHMgZnJvbSAnLi9VdGlscy5qcyc7XHJcblxyXG5cclxuY2xhc3MgTWFwIHtcclxuXHJcblxyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuICAgIHRoaXMuX2lkID0gb3B0aW9ucy50YXJnZXRJZDtcclxuICAgIHRoaXMuX21hcCA9IG51bGw7XHJcbiAgICB0aGlzLl9tYXJrcyA9IHt9O1xyXG4gICAgdGhpcy5fcG9seWdvbnMgPSBbXTtcclxuICAgIHRoaXMuX2xheWVycyA9IHtcclxuICAgICAgQ2FydGU6IG51bGwsXHJcbiAgICAgIFNhdGVsbGl0ZTogbnVsbFxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLl9pbml0KCk7XHJcbiAgICB0aGlzLl9ldmVudHMoKTtcclxuICB9XHJcblxyXG5cclxuICBfaW5pdCgpIHtcclxuICAgIC8vIFVzZSBtYWluIGRpdiB0byBpbmplY3QgT1NNIGludG9cclxuICAgIHRoaXMuX21hcCA9IHdpbmRvdy5MLm1hcCh0aGlzLl9pZCwge1xyXG4gICAgICB6b29tQ29udHJvbDogZmFsc2UsXHJcbiAgICB9KS5zZXRWaWV3KFtVdGlscy5DQ0RIX0NFTlRFUi5MQVQsIFV0aWxzLkNDREhfQ0VOVEVSLkxOR10sIDEyKTtcclxuICAgIC8vIEFkZCBtZXRlciBhbmQgZmVldCBzY2FsZSBvbiBtYXBcclxuICAgIHdpbmRvdy5MLmNvbnRyb2wuc2NhbGUoKS5hZGRUbyh0aGlzLl9tYXApO1xyXG4gICAgLy8gUHJldmVudCBwYW5uaW5nIG91dHNpZGUgb2YgdGhlIG1hcCBib3VuZHMgZGVmaW5pbmVkIGluIHV0aWxzXHJcbiAgICB0aGlzLl9tYXAuc2V0TWF4Qm91bmRzKFV0aWxzLk1BUF9CT1VORFMpO1xyXG4gICAgLy8gQWRkIGxheWVyIGdyb3VwIHRvIGludGVyZmFjZSBhbmQgc3RhcnQgbWFwIHdpdGggb3NtIGRlZmF1bHRcclxuICAgIHRoaXMuX2xheWVycy5DYXJ0ZSA9IFV0aWxzLk9TTV9MQVlFUjtcclxuICAgIHRoaXMuX2xheWVycy5TYXRlbGxpdGUgPSBVdGlscy5FU1JJX0xBWUVSO1xyXG4gICAgdGhpcy5fbGF5ZXJzLkNhcnRlLmFkZFRvKHRoaXMuX21hcCk7XHJcbiAgICAvLyBBZGQgbGF5ZXIgc3dpdGNoIHJhZGlvIG9uIGJvdHRvbSByaWdodCBvZiB0aGUgbWFwXHJcbiAgICB3aW5kb3cuTC5jb250cm9sLmxheWVycyh0aGlzLl9sYXllcnMsIHt9LCB7IHBvc2l0aW9uOiAnYm90dG9tcmlnaHQnIH0pLmFkZFRvKHRoaXMuX21hcCk7XHJcbiAgfVxyXG5cclxuXHJcbiAgX2V2ZW50cygpIHtcclxuICAgIC8vIFN1YnNjcmliZSB0byBjbGljayBldmVudCBvbiBtYXAgdG8gcmVhY3RcclxuICAgIHRoaXMuX21hcC5vbignY2xpY2snLCB0aGlzLl9tYXBDbGlja2VkLmJpbmQodGhpcykpO1xyXG4gICAgLy8gTWFwIGlzIGRyYWdnZWQgYnkgdXNlciBtb3VzZS9maW5nZXJcclxuICAgIHRoaXMuX21hcC5vbignZHJhZycsICgpID0+IHtcclxuICAgICAgLy8gQ29uc3RyYWluIHBhbiB0byB0aGUgbWFwIGJvdW5kc1xyXG4gICAgICB0aGlzLl9tYXAucGFuSW5zaWRlQm91bmRzKFV0aWxzLk1BUF9CT1VORFMsIHsgYW5pbWF0ZTogdHJ1ZSB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG4gIF9tYXBDbGlja2VkKG9wdHMpIHtcclxuICAgIGNvbnNvbGUubG9nKG9wdHMubGF0bG5nKTtcclxuICB9XHJcblxyXG5cclxuICBkcmF3VXNlck1hcmtlcigpIHtcclxuICAgIGlmICghd2luZG93Lm1kLnVzZXIubWFya2VyKSB7XHJcbiAgICAgIHdpbmRvdy5tZC51c2VyLm1hcmtlciA9IHdpbmRvdy5MLm1hcmtlcihbd2luZG93Lm1kLnVzZXIubGF0LCB3aW5kb3cubWQudXNlci5sbmddLCB7XHJcbiAgICAgICAgaWNvbjogTWFya2Vycy51c2VyXHJcbiAgICAgIH0pO1xyXG4gICAgICB3aW5kb3cubWQudXNlci5tYXJrZXIuYWRkVG8odGhpcy5fbWFwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHdpbmRvdy5tZC51c2VyLm1hcmtlci5zZXRMYXRMbmcod2luZG93Lm1kLnVzZXIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIGFkZE1hcmsob3B0cywgY3JlYXRlUG9wdXApIHtcclxuICAgIGxldCB0eXBlcyA9IG9wdHMudHlwZS5zcGxpdCgnLycpO1xyXG4gICAgbGV0IHR5cGUgPSBvcHRzLnR5cGU7XHJcbiAgICBpZiAodHlwZXMubGVuZ3RoID4gMSkge1xyXG4gICAgICB0eXBlID0gYCR7dHlwZXNbMF19JHt0eXBlc1sxXX1gO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG1hcmtlciA9IHdpbmRvdy5MLm1hcmtlcihbb3B0cy5sYXQsIG9wdHMubG5nXSwgeyBcclxuICAgICAgaWNvbjogTWFya2Vyc1t0eXBlXVxyXG4gICAgfSkub24oJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLl9tYXAuZmx5VG8oW29wdHMubGF0LCBvcHRzLmxuZ10sIDE4KTtcclxuICAgIH0pO1xyXG5cclxuICAgIG1hcmtlci5iaW5kUG9wdXAoY3JlYXRlUG9wdXAob3B0cykpO1xyXG4gICAgbWFya2VyLmFkZFRvKHRoaXMuX21hcCk7XHJcbiAgICBpZiAodHlwZXMubGVuZ3RoID4gMSkge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHR5cGVzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9tYXJrc1t0eXBlc1tpXV0pIHtcclxuICAgICAgICAgIHRoaXMuX21hcmtzW3R5cGVzW2ldXSA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9tYXJrc1t0eXBlc1tpXV0ucHVzaChtYXJrZXIpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoIXRoaXMuX21hcmtzW3R5cGVdKSB7XHJcbiAgICAgICAgdGhpcy5fbWFya3NbdHlwZV0gPSBbXTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLl9tYXJrc1t0eXBlXS5wdXNoKG1hcmtlcik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcbiAgYWRkUG9seWdvbihwb2x5Z29uKSB7XHJcbiAgICB0aGlzLl9wb2x5Z29ucy5wdXNoKHdpbmRvdy5MLnBvbHlnb24ocG9seWdvbikuYWRkVG8odGhpcy5fbWFwKSk7XHJcbiAgfVxyXG5cclxuXHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBNYXA7XHJcbiIsImV4cG9ydCBkZWZhdWx0IE9iamVjdC5mcmVlemUoe1xyXG4gIHJlc3RhdXJhbnQ6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9yZXN0YXVyYW50LnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBiYXI6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9iYXIuc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIHRvYmFjY286IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci90b2JhY2NvLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBjZWxsYXI6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9jZWxsYXIuc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIHN0b3JlOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvc3RvcmUuc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIGJvb2s6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9ib29rLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBsYW5kbWFyazogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL2xhbmRtYXJrLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBjcmFmdDogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL2NyYWZ0LnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBnYXJkZW46IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9nYXJkZW4uc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIGNhcjogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL2Nhci5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgZ2FzOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvZ2FzLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBhbmltYWw6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9hbmltYWwuc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIG1haWw6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYWlsLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICByZWN5Y2xlOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvcmVjeWNsZS5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgYWRtaW5pc3RyYXRpb246IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9hZG1pbmlzdHJhdGlvbi5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgYmFuazogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL2Jhbmsuc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIG1lZGljYWw6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9tZWRpY2FsLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBkZWNvOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvZGVjby5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksICBcclxuICB1c2VyOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvdXNlci5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF1cclxuICB9KSxcclxuICBiYXJzdG9yZTogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21peGVkL2JhcnN0b3JlLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXVxyXG4gIH0pLFxyXG59KTtcclxuIiwiY29uc3QgZ2V0RGlzdGFuY2VCZXR3ZWVuQ29vcmRzID0gKGZyb20sIHRvKSA9PiB7XHJcbiAgLy8gUmV0dXJuIGRpc3RhbmNlIGluIG1ldGVyc1xyXG4gIGNvbnN0IGxvbjEgPSAoZnJvbVsxXSAqIE1hdGguUEkpIC8gMTgwLFxyXG4gICAgbGF0MSA9IChmcm9tWzBdICogTWF0aC5QSSkgLyAxODAsXHJcbiAgICBsb24yID0gKHRvWzFdICogTWF0aC5QSSkgLyAxODAsXHJcbiAgICBsYXQyID0gKHRvWzBdICogTWF0aC5QSSkgLyAxODA7XHJcblxyXG4gIGNvbnN0IGRlbHRhTGF0ID0gbGF0MiAtIGxhdDE7XHJcbiAgY29uc3QgZGVsdGFMb24gPSBsb24yIC0gbG9uMTtcclxuXHJcbiAgY29uc3QgYSA9IE1hdGgucG93KE1hdGguc2luKGRlbHRhTGF0IC8gMiksIDIpICsgTWF0aC5jb3MobGF0MSkgKiBNYXRoLmNvcyhsYXQyKSAqIE1hdGgucG93KE1hdGguc2luKGRlbHRhTG9uIC8gMiksIDIpO1xyXG4gIGNvbnN0IGMgPSAyICogTWF0aC5hc2luKE1hdGguc3FydChhKSk7XHJcbiAgcmV0dXJuIGMgKiA2MzcxICogMTAwMDtcclxufTtcclxuXHJcblxyXG5jb25zdCBjb252ZXJ0RGlzdGFuY2VUb1N0cmluZyA9IGRpc3RhbmNlID0+IHtcclxuICBpZiAoZGlzdGFuY2UgPiAxMDAwKSB7XHJcbiAgICBkaXN0YW5jZSA9IGAke3ByZWNpc2lvblJvdW5kKGRpc3RhbmNlIC8gMTAwMCwgMil9a21gO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBkaXN0YW5jZSA9IGAke3ByZWNpc2lvblJvdW5kKGRpc3RhbmNlLCAyKX1tYDtcclxuICB9XHJcbiAgcmV0dXJuIGRpc3RhbmNlO1xyXG59O1xyXG5cclxuXHJcbmNvbnN0IGJ1aWxkRGlzdGFuY2VFVEEgPSBkaXN0YW5jZSA9PiB7XHJcbiAgbGV0IGNhck1pbnV0ZXMgPSAwO1xyXG4gIGxldCBjYXJTZWNvbmRzID0gMDtcclxuXHJcbiAgaWYgKGRpc3RhbmNlID4gNTAwMDApIHtcclxuICAgIC8vIE92ZXIgNTBrbSwgd2UgdXNlIGF2ZXJhZ2Ugc3BlZWQgb2YgMTAwa21oXHJcbiAgICBjYXJNaW51dGVzID0gKGRpc3RhbmNlIC8gMTAwMDAwKSAqIDYwO1xyXG4gIH0gZWxzZSBpZiAoZGlzdGFuY2UgPiAxMDAwMCkge1xyXG4gICAgLy8gT3ZlciAxMGttLCB3ZSB1c2UgYXZlcmFnZSBzcGVlZCBvZiA2MGttL2hcclxuICAgIGNhck1pbnV0ZXMgPSAoZGlzdGFuY2UgLyA2MDAwMCkgKiA2MDtcclxuICB9IGVsc2Uge1xyXG4gICAgLy8gVW5kZXIgMTBrbSB3ZSB1c2VyIGF2ZXJhZ2Ugc3BlZWQgb2YgMzBrbS9oXHJcbiAgICBjYXJNaW51dGVzID0gKGRpc3RhbmNlIC8gMzAwMDApICogNjA7XHJcbiAgfVxyXG5cclxuICBjYXJTZWNvbmRzID0gY2FyTWludXRlcyAlIDE7IC8vIEtlZXAgZmxvYXRpbmcgdmFsdWUgZm9yIHNlY29uZHMgY29tcHV0aW5nXHJcbiAgY2FyTWludXRlcyA9IE1hdGguZmxvb3IoY2FyTWludXRlcyk7IC8vIFJlbW92ZSBmbG9hdGluZyB2YWx1ZVxyXG5cclxuICBpZiAoY2FyTWludXRlcyA+IDYwKSB7XHJcbiAgICBjYXJNaW51dGVzID0gYCR7TWF0aC5mbG9vcihjYXJNaW51dGVzIC8gNjApfWggJHtjYXJNaW51dGVzICUgNjB9bWA7XHJcbiAgfSBlbHNlIHtcclxuICAgIGNhck1pbnV0ZXMgPSBgJHtjYXJNaW51dGVzfW1gO1xyXG4gIH1cclxuXHJcbiAgbGV0IHdhbGtNaW51dGVzID0gKGRpc3RhbmNlIC8gNTAwMCkgKiA2MDtcclxuICBsZXQgd2Fsa1NlY29uZHMgPSB3YWxrTWludXRlcyAlIDE7XHJcbiAgd2Fsa01pbnV0ZXMgPSBNYXRoLmZsb29yKHdhbGtNaW51dGVzKTsgLy8gUmVtb3ZlIGZsb2F0aW5nIHZhbHVlXHJcblxyXG4gIGlmICh3YWxrTWludXRlcyA+IDYwKSB7XHJcbiAgICB3YWxrTWludXRlcyA9IGAke01hdGguZmxvb3Iod2Fsa01pbnV0ZXMgLyA2MCl9aCAke3dhbGtNaW51dGVzICUgNjB9bWA7XHJcbiAgfSBlbHNlIHtcclxuICAgIHdhbGtNaW51dGVzID0gYCR7d2Fsa01pbnV0ZXN9bWA7XHJcbiAgfSAgXHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBjYXI6IGAke2Nhck1pbnV0ZXN9ICR7TWF0aC5mbG9vcihwcmVjaXNpb25Sb3VuZCgoY2FyU2Vjb25kcyAvIDEwMCkgKiA2MCwgMikgKiAxMDApfXNgLFxyXG4gICAgd2FsazogYCR7d2Fsa01pbnV0ZXN9ICR7TWF0aC5mbG9vcihwcmVjaXNpb25Sb3VuZCgod2Fsa1NlY29uZHMgLyAxMDApICogNjAsIDIpICogMTAwKX1zYCxcclxuICB9O1xyXG59O1xyXG5cclxuXHJcbmNvbnN0IHByZWNpc2lvblJvdW5kID0gKHZhbHVlLCBwcmVjaXNpb24pID0+IHtcclxuICBjb25zdCBtdWx0aXBsaWVyID0gTWF0aC5wb3coMTAsIHByZWNpc2lvbiB8fCAwKTtcclxuICByZXR1cm4gTWF0aC5yb3VuZCh2YWx1ZSAqIG11bHRpcGxpZXIpIC8gbXVsdGlwbGllcjtcclxufTtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgQ0NESF9DRU5URVI6IHtcclxuICAgIExBVDogNDguNTMxODM5MDY0NDE5NjIsXHJcbiAgICBMTkc6IDIuMDUzNzU2NzEzODY3MTg4XHJcbiAgfSxcclxuICBNQVBfQk9VTkRTOiB3aW5kb3cuTC5sYXRMbmdCb3VuZHMoXHJcbiAgICB3aW5kb3cuTC5sYXRMbmcoNDguNjc5NDAwNzE1OTYzODk0LCAxLjczOTA2MDY2ODk0NTMxMjcpLFxyXG4gICAgd2luZG93LkwubGF0TG5nKDQ4LjM4NDM5MDc0MTUxODY2LCAyLjM0MzM5NTk5NjA5Mzc1MClcclxuICApLFxyXG4gIE9TTV9MQVlFUjogd2luZG93LkwudGlsZUxheWVyKCdodHRwczovL3tzfS50aWxlLm9wZW5zdHJlZXRtYXAub3JnL3t6fS97eH0ve3l9LnBuZycsIHtcclxuICAgIGF0dHJpYnV0aW9uOiAnJmNvcHk7IDxhIGhyZWY9XCJodHRwczovL3d3dy5vcGVuc3RyZWV0bWFwLm9yZy9jb3B5cmlnaHRcIj5PcGVuU3RyZWV0TWFwPC9hPicsXHJcbiAgICBtYXhab29tOiAyMSxcclxuICAgIG1pblpvb206IDEyXHJcbiAgfSksXHJcbiAgRVNSSV9MQVlFUjogd2luZG93LkwudGlsZUxheWVyKCdodHRwczovL3NlcnZlci5hcmNnaXNvbmxpbmUuY29tL0FyY0dJUy9yZXN0L3NlcnZpY2VzL1dvcmxkX0ltYWdlcnkvTWFwU2VydmVyL3RpbGUve3p9L3t5fS97eH0nLCB7XHJcbiAgICBhdHRyaWJ1dGlvbjogJyZjb3B5OyA8YSBocmVmPVwiaHR0cHM6Ly93d3cuYXJjZ2lzLmNvbS9ob21lL2l0ZW0uaHRtbD9pZD0xMGRmMjI3OWY5Njg0ZTRhOWY2YTdmMDhmZWJhYzJhOVwiPkVzcmkgSW1hZ2VyeTwvYT4nLFxyXG4gICAgbWF4Wm9vbTogMjEsXHJcbiAgICBtaW5ab29tOiAxMlxyXG4gIH0pLFxyXG4gIGdldERpc3RhbmNlQmV0d2VlbkNvb3JkczogZ2V0RGlzdGFuY2VCZXR3ZWVuQ29vcmRzLFxyXG4gIGNvbnZlcnREaXN0YW5jZVRvU3RyaW5nOiBjb252ZXJ0RGlzdGFuY2VUb1N0cmluZyxcclxuICBidWlsZERpc3RhbmNlRVRBOiBidWlsZERpc3RhbmNlRVRBLFxyXG4gIHByZWNpc2lvblJvdW5kOiBwcmVjaXNpb25Sb3VuZFxyXG59O1xyXG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAnLi4vc2Nzcy9Nb25Eb3VyZGFubmFpcy5zY3NzJztcclxuaW1wb3J0IE1hcCBmcm9tICcuL3V0aWxzL01hcC5qcyc7XHJcbmltcG9ydCBVdGlscyBmcm9tICcuL3V0aWxzL1V0aWxzLmpzJztcclxuXHJcblxyXG5jbGFzcyBNb25Eb3VyZGFubmFpcyB7XHJcblxyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuX21hcCA9IG51bGw7XHJcbiAgICB0aGlzLl9sYXllcnMgPSB7fTtcclxuICAgIHRoaXMuX2RhdGEgPSBudWxsO1xyXG5cclxuICAgIHRoaXMuX3VzZXIgPSB7XHJcbiAgICAgIGxhdDogVXRpbHMuSE9NRV9MQVQsXHJcbiAgICAgIGxuZzogVXRpbHMuSE9NRV9MTkcsXHJcbiAgICAgIGFjY3VyYWN5OiAwLFxyXG4gICAgICBtYXJrZXI6IG51bGxcclxuICAgIH07XHJcblxyXG4gICAgd2luZG93Ll90bXAgPSBbXTtcclxuXHJcbiAgICB0aGlzLl9pbml0R2VvbG9jYXRpb24oKVxyXG4gICAgICAudGhlbih0aGlzLl9mZXRjaE1hcmtlcnMuYmluZCh0aGlzKSlcclxuICAgICAgLnRoZW4odGhpcy5faW5pdE1hcC5iaW5kKHRoaXMpKVxyXG4gICAgICAudGhlbih0aGlzLl9pbml0RXZlbnRzLmJpbmQodGhpcykpXHJcbiAgICAgIC50aGVuKHRoaXMuX2J1aWxkTWFya2Vycy5iaW5kKHRoaXMpKVxyXG4gICAgICAudGhlbih0aGlzLl9idWlsZFBvbHlnb25zLmJpbmQodGhpcykpO1xyXG4gIH1cclxuXHJcblxyXG4gIF9pbml0R2VvbG9jYXRpb24oKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcblx0XHRcdGlmICgnZ2VvbG9jYXRpb24nIGluIG5hdmlnYXRvcikge1xyXG5cdFx0XHRcdGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICBlbmFibGVIaWdoQWNjdXJhY3k6IHRydWUsIC8vIE1vcmUgY29uc3VwdGlvbiwgYmV0dGVyIHBvc2l0aW9uXHJcbiAgICAgICAgICBtYXhpbXVtQWdlOiAxMDAwLCAvLyBBIHBvc2l0aW9uIHdpbGwgbGFzdCAxcyBtYXhpbXVtXHJcbiAgICAgICAgICB0aW1lb3V0OiA5MDAsIC8vIEEgcG9zaXRpb24gaXMgdXBkYXRlZCBpbiAwLjlzIG1heGltdW1cclxuICAgICAgICB9O1xyXG5cdFx0XHRcdHRoaXMuX3dhdGNoSWQgPSBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24ud2F0Y2hQb3NpdGlvbihwb3NpdGlvbiA9PiB7XHJcblx0XHRcdFx0XHQvLyBVcGRhdGUgc2F2ZWQgdXNlciBwb3NpdGlvblxyXG5cdFx0XHRcdFx0dGhpcy5fdXNlci5sYXQgPSBwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGU7XHJcblx0XHRcdFx0XHR0aGlzLl91c2VyLmxuZyA9IHBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGU7XHJcblx0XHRcdFx0XHR0aGlzLl91c2VyLmFjY3VyYWN5ID0gcG9zaXRpb24uY29vcmRzLmFjY3VyYWN5O1xyXG5cdFx0XHRcdFx0Ly8gT25seSBkcmF3IG1hcmtlciBpZiBtYXAgaXMgYWxyZWFkeSBjcmVhdGVkXHJcblx0XHRcdFx0XHRpZiAodGhpcy5fbWFwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21hcC5kcmF3VXNlck1hcmtlcigpO1xyXG4gICAgICAgICAgfVxyXG5cdFx0XHRcdFx0cmVzb2x2ZSgpO1xyXG5cdFx0XHRcdH0sIHJlc29sdmUsIG9wdGlvbnMpO1xyXG4gICAgICB9IGVsc2Uge1xyXG5cdFx0XHRcdHJlc29sdmUoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgX2ZldGNoTWFya2VycygpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuICAgICAgZmV0Y2goYC9hc3NldHMvanNvbi9NYXBEYXRhLmpzb25gKS50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgIGRhdGEuanNvbigpLnRoZW4oanNvbkRhdGEgPT4ge1xyXG4gICAgICAgICAgdGhpcy5fZGF0YSA9IGpzb25EYXRhO1xyXG4gICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgIH0pLmNhdGNoKHJlc29sdmUpO1xyXG4gICAgICB9KS5jYXRjaChyZXNvbHZlKTtcclxuICAgIH0pO1xyXG4gIH0gIFxyXG5cclxuXHJcbiAgX2luaXRNYXAoKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICAgIHRoaXMuX21hcCA9IG5ldyBNYXAoe1xyXG4gICAgICAgIHRhcmdldElkOiAnc2FybWF0ZXMtbGFuZCdcclxuICAgICAgfSk7XHJcbiAgICAgIHJlc29sdmUoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG4gIF9pbml0RXZlbnRzKCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xyXG4gICAgICAvLyBMaXN0ZW5pbmcgdG8gbW9kYWwgZXZlbnRcclxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsLW92ZXJsYXknKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuY2xvc2VNb2RhbC5iaW5kKHRoaXMpKTtcclxuICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgX2J1aWxkTWFya2VycygpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMuX2RhdGEubWFya2Vycyk7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5fZGF0YS5tYXJrZXJzW2tleXNbaV1dLmxlbmd0aDsgKytqKSB7XHJcbiAgICAgICAgICB0aGlzLl9tYXAuYWRkTWFyayh0aGlzLl9kYXRhLm1hcmtlcnNba2V5c1tpXV1bal0sIHRoaXMuX2NyZWF0ZU1hcmtlclBvcHVwLmJpbmQodGhpcykpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXNvbHZlKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG5cclxuICBfYnVpbGRQb2x5Z29ucygpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMuX2RhdGEuY2l0eUJvdW5kcyk7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgIHRoaXMuX21hcC5hZGRQb2x5Z29uKHRoaXMuX2RhdGEuY2l0eUJvdW5kc1trZXlzW2ldXSk7XHJcbiAgICAgIH1cclxuICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLyogTWFwIFV0aWxzICovXHJcblxyXG5cclxuICBfY3JlYXRlTWFya2VyUG9wdXAob3B0cykge1xyXG4gICAgY29uc3QgZG9tID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XHJcbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0gzJyk7XHJcbiAgICBjb25zdCBhZGRyZXNzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnSScpO1xyXG4gICAgY29uc3QgdG93biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0knKTtcclxuICAgIGNvbnN0IHBob25lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnQScpO1xyXG4gICAgY29uc3Qgd2Vic2l0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0EnKTtcclxuICAgIGNvbnN0IGluZm8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdQJyk7XHJcbiAgICBjb25zdCBvcGVuV2l0aCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0EnKTtcclxuXHJcbiAgICBkb20uY2xhc3NMaXN0LmFkZCgnbWFya2VyLXBvcHVwJyk7XHJcbiAgICB0aXRsZS5pbm5lckhUTUwgPSBvcHRzLm5hbWU7XHJcbiAgICBhZGRyZXNzLmlubmVySFRNTCA9IG9wdHMuYWRkcmVzcztcclxuICAgIHRvd24uaW5uZXJIVE1MID0gb3B0cy50b3duO1xyXG4gICAgcGhvbmUuaHJlZiA9IGB0ZWw6JHtvcHRzLnBob25lfWA7XHJcbiAgICBwaG9uZS5pbm5lckhUTUwgPSBgPGltZyBzcmM9XCIvYXNzZXRzL2ltZy9pY29uL3Bob25lLnN2Z1wiPiR7b3B0cy5waG9uZX1gO1xyXG4gICAgd2Vic2l0ZS5ocmVmID0gb3B0cy53ZWJzaXRlO1xyXG4gICAgd2Vic2l0ZS5pbm5lckhUTUwgPSAnPGltZyBzcmM9XCIvYXNzZXRzL2ltZy9pY29uL3dlYi5zdmdcIj5Db25zdWx0ZXIgbGUgc2l0ZSc7XHJcbiAgICB3ZWJzaXRlLnNldEF0dHJpYnV0ZSgncmVsJywgJ25vb3BlbmVyIG5vcmVmZXJyZXInKTtcclxuICAgIHdlYnNpdGUuc2V0QXR0cmlidXRlKCd0YXJnZXQnLCAnX2JsYW5rJyk7XHJcbiAgICBpbmZvLmlubmVySFRNTCA9IG9wdHMuaW5mbztcclxuICAgIG9wZW5XaXRoLmhyZWYgPSBgZ2VvOiR7b3B0cy5sYXR9LCR7b3B0cy5sbmd9YDtcclxuICAgIG9wZW5XaXRoLmlubmVySFRNTCA9ICc8aW1nIHNyYz1cIi9hc3NldHMvaW1nL2ljb24vcGluLnN2Z1wiPk91dnJpciBkYW5zIGxlIEdQUyc7XHJcblxyXG4gICAgZG9tLmFwcGVuZENoaWxkKHRpdGxlKTtcclxuICAgIGRvbS5hcHBlbmRDaGlsZChhZGRyZXNzKTtcclxuICAgIGRvbS5hcHBlbmRDaGlsZCh0b3duKTtcclxuXHJcbiAgICBjb25zdCBidXR0b24gPSB0aGlzLl9tYXJrZXJPcGVuZWRTdGF0ZShvcHRzLnRpbWV0YWJsZSk7XHJcbiAgICBkb20uYXBwZW5kQ2hpbGQoYnV0dG9uKTtcclxuXHJcbiAgICBpZiAob3B0cy50aW1ldGFibGUubGVuZ3RoID4gMCkge1xyXG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl90aW1ldGJhbGVNb2RhbC5iaW5kKHRoaXMsIG9wdHMpKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgaWYgKG9wdHMuaW5mbyAhPT0gJycpIHtcclxuICAgICAgZG9tLmFwcGVuZENoaWxkKGluZm8pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChvcHRzLnBob25lICE9PSAnJykge1xyXG4gICAgICBkb20uYXBwZW5kQ2hpbGQocGhvbmUpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChvcHRzLndlYnNpdGUgIT09ICcnKSB7XHJcbiAgICAgIGRvbS5hcHBlbmRDaGlsZCh3ZWJzaXRlKTtcclxuICAgIH0gICAgXHJcbiAgICBcclxuICAgIGRvbS5hcHBlbmRDaGlsZChvcGVuV2l0aCk7XHJcblxyXG4gICAgcmV0dXJuIGRvbTtcclxuICB9XHJcblxyXG5cclxuICBfbWFya2VyT3BlbmVkU3RhdGUodGltZXRhYmxlKSB7XHJcbiAgICBjb25zdCBkb20gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcclxuICAgIGNvbnN0IHN0YXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnSDUnKTtcclxuICAgIGNvbnN0IG1vcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdJJyk7XHJcbiAgICBkb20uY2xhc3NMaXN0LmFkZCgnbWFya2VyLW9wZW5lZCcpO1xyXG4gICAgZG9tLmFwcGVuZENoaWxkKHN0YXRlKTtcclxuICAgIGRvbS5hcHBlbmRDaGlsZChtb3JlKTtcclxuICAgIFxyXG4gICAgaWYgKHRpbWV0YWJsZS5sZW5ndGgpIHtcclxuICAgICAgbW9yZS5pbm5lckhUTUwgPSAnVm9pciBsZXMgaG9yYWlyZXMnO1xyXG4gICAgICB0aGlzLl9jaGVja1RpbWUodGltZXRhYmxlLCBkb20pO1xyXG4gICAgICBzZXRJbnRlcnZhbCh0aGlzLl9jaGVja1RpbWUuYmluZCh0aGlzLCB0aW1ldGFibGUsIGRvbSksIDMwMDAwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuX21hcmtlcklzT3BlbmVkKGRvbSwgdHJ1ZSk7XHJcbiAgICAgIG1vcmUuaW5uZXJIVE1MID0gJ1RvdWpvdXJzIG91dmVydCc7ICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGRvbTtcclxuICB9XHJcblxyXG5cclxuICBfY2hlY2tUaW1lKHRpbWV0YWJsZSwgZG9tKSB7XHJcbiAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xyXG4gICAgbGV0IGhvdXIgPSBub3cuZ2V0SG91cnMoKTtcclxuICAgIGxldCBtaW51dGVzID0gbm93LmdldE1pbnV0ZXMoKTtcclxuICAgIGlmIChtaW51dGVzIDwgMTApIHtcclxuICAgICAgbWludXRlcyA9IGAwJHttaW51dGVzfWA7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZGF5T2ZXZWVrID0gbm93LmdldERheSgpIC0gMTtcclxuICAgIGNvbnN0IG9wZW5pbmdUaW1lID0gcGFyc2VJbnQoYCR7dGltZXRhYmxlW2RheU9mV2Vla10ub3Blbi5ofSR7dGltZXRhYmxlW2RheU9mV2Vla10ub3Blbi5tfWApO1xyXG4gICAgY29uc3QgY2xvc2luZ1RpbWUgPSBwYXJzZUludChgJHt0aW1ldGFibGVbZGF5T2ZXZWVrXS5jbG9zZS5ofSR7dGltZXRhYmxlW2RheU9mV2Vla10uY2xvc2UubX1gKTtcclxuICAgIGNvbnN0IGN1cnJlbnRUaW1lID0gcGFyc2VJbnQoYCR7aG91cn0ke21pbnV0ZXN9YCk7XHJcbiAgICAvLyBXb24ndCB3b3JrIGlmIHRpbWV0YWJsZSBvcGVuL2Nsb3NlIGhvdXJzIGFyZW4ndCBvbiB0aGUgc2FtZSBkYXlcclxuICAgIGlmICh0aW1ldGFibGVbZGF5T2ZXZWVrXS5pc09wZW4gJiYgaXNOYU4ob3BlbmluZ1RpbWUpKSB7IC8vIDI0Lzcgb3BlbmluZ1xyXG4gICAgICB0aGlzLl9tYXJrZXJJc09wZW5lZChkb20sIHRydWUpO1xyXG4gICAgfSBlbHNlIGlmICh0aW1ldGFibGVbZGF5T2ZXZWVrXS5pc09wZW4gJiYgY3VycmVudFRpbWUgPj0gb3BlbmluZ1RpbWUgJiYgY3VycmVudFRpbWUgPCBjbG9zaW5nVGltZSkge1xyXG4gICAgICBpZiAodGltZXRhYmxlW2RheU9mV2Vla10uYnJlYWsuaGFzQnJlYWspIHtcclxuICAgICAgICBjb25zdCBicmVha09wZW5pbmdUaW1lID0gcGFyc2VJbnQoYCR7dGltZXRhYmxlW2RheU9mV2Vla10uYnJlYWsuZW5kLmh9JHt0aW1ldGFibGVbZGF5T2ZXZWVrXS5icmVhay5lbmQubX1gKTtcclxuICAgICAgICBjb25zdCBicmVha0Nsb3NpbmdUaW1lID0gcGFyc2VJbnQoYCR7dGltZXRhYmxlW2RheU9mV2Vla10uYnJlYWsuc3RhcnQuaH0ke3RpbWV0YWJsZVtkYXlPZldlZWtdLmJyZWFrLnN0YXJ0Lm19YCk7XHJcbiAgICAgICAgaWYgKGN1cnJlbnRUaW1lID49IGJyZWFrQ2xvc2luZ1RpbWUgJiYgY3VycmVudFRpbWUgPCBicmVha09wZW5pbmdUaW1lKSB7XHJcbiAgICAgICAgICB0aGlzLl9tYXJrZXJJc0Nsb3NlZChkb20pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLl9tYXJrZXJJc09wZW5lZChkb20pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLl9tYXJrZXJJc09wZW5lZChkb20pO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgeyAgICAgIFxyXG4gICAgICB0aGlzLl9tYXJrZXJJc0Nsb3NlZChkb20pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIF9tYXJrZXJJc09wZW5lZChkb20sIGFsd2F5c09wZW5lZCkge1xyXG4gICAgZG9tLmZpcnN0Q2hpbGQuaW5uZXJIVE1MID0gYE91dmVydGA7XHJcbiAgICBpZiAoYWx3YXlzT3BlbmVkID09PSB0cnVlKSB7XHJcbiAgICAgIGRvbS5sYXN0Q2hpbGQuaW5uZXJIVE1MID0gYDI0aC8yNGggZXQgN2ovN2pgO1xyXG4gICAgfVxyXG4gICAgZG9tLmNsYXNzTGlzdC5hZGQoJ29wZW5lZCcpO1xyXG4gIH1cclxuXHJcblxyXG4gIF9tYXJrZXJJc0Nsb3NlZChkb20pIHtcclxuICAgIGRvbS5maXJzdENoaWxkLmlubmVySFRNTCA9IGBGZXJtw6lgO1xyXG4gICAgZG9tLmxhc3RDaGlsZC5pbm5lckhUTUwgPSBgVm9pciBsZXMgaG9yYWlyZXNgO1xyXG4gICAgZG9tLmNsYXNzTGlzdC5yZW1vdmUoJ29wZW5lZCcpO1xyXG4gIH1cclxuXHJcblxyXG4gIF90aW1ldGJhbGVNb2RhbChvcHRzKSB7XHJcbiAgICB0aGlzLmZldGNoTW9kYWwoJ3RpbWV0YWJsZW1vZGFsJykudGhlbihkb20gPT4ge1xyXG4gICAgICAvLyBVcGRhdGluZyBtb2RhbCBoZWFkZXIgYW5kIGluZm9cclxuICAgICAgZG9tLnF1ZXJ5U2VsZWN0b3IoJyNtYXJrLW5hbWUnKS5pbm5lckhUTUwgPSBvcHRzLm5hbWU7XHJcbiAgICAgIGRvbS5xdWVyeVNlbGVjdG9yKCcjbWFyay1hZGRyZXNzJykuaW5uZXJIVE1MID0gYCR7b3B0cy5hZGRyZXNzfSwgJHtvcHRzLnRvd259YDtcclxuICAgICAgY29uc3QgZGlzdGFuY2UgPSBVdGlscy5nZXREaXN0YW5jZUJldHdlZW5Db29yZHMoW29wdHMubGF0LCBvcHRzLmxuZ10sIFt0aGlzLl91c2VyLmxhdCwgdGhpcy5fdXNlci5sbmddKTtcclxuICAgICAgZG9tLnF1ZXJ5U2VsZWN0b3IoJyNtYXJrLWRpc3RhbmNlJykuaW5uZXJIVE1MID0gYFZvdXMgw6h0ZXMgw6AgZW52aXJvbiAke1V0aWxzLmNvbnZlcnREaXN0YW5jZVRvU3RyaW5nKGRpc3RhbmNlKX0gZGUgPGI+JHtvcHRzLm5hbWV9PC9iPiDDoCB2b2wgZCdvaXNlYXVgO1xyXG4gICAgICBjb25zdCBldGEgPSBVdGlscy5idWlsZERpc3RhbmNlRVRBKGRpc3RhbmNlKTtcclxuICAgICAgZG9tLnF1ZXJ5U2VsZWN0b3IoJyNtYXJrLWV0YScpLmlubmVySFRNTCA9IGBDZSBxdWkgcmVwcsOpc2VudGUgZW52aXJvbiAke2V0YS5jYXJ9IGVuIHZvaXR1cmUsIG91ICR7ZXRhLndhbGt9IMOgIHBpZWQuYDtcclxuICAgICAgZG9tLnF1ZXJ5U2VsZWN0b3IoJyNtYXJrLXN0YXRlJykuYXBwZW5kQ2hpbGQodGhpcy5fbWFya2VyT3BlbmVkU3RhdGUob3B0cy50aW1ldGFibGUpKTtcclxuICAgICAgLy8gTm93IHVwZGF0ZSBkYXkgYnkgZGF5XHJcbiAgICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XHJcbiAgICAgIGNvbnN0IGRheU9mV2VlayA9IG5vdy5nZXREYXkoKSAtIDE7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3B0cy50aW1ldGFibGUubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICBjb25zdCBkYXlEb20gPSBkb20ucXVlcnlTZWxlY3RvcignI3RpbWV0YWJsZScpLmNoaWxkcmVuW2ldO1xyXG4gICAgICAgIGlmIChvcHRzLnRpbWV0YWJsZVtpXS5pc09wZW4gPT09IHRydWUpIHtcclxuICAgICAgICAgIGNvbnN0IG1vcm5pbmcgPSBkYXlEb20ubGFzdEVsZW1lbnRDaGlsZC5maXJzdEVsZW1lbnRDaGlsZDtcclxuICAgICAgICAgIGNvbnN0IGFmdGVybm9vbiA9IGRheURvbS5sYXN0RWxlbWVudENoaWxkLmxhc3RFbGVtZW50Q2hpbGQ7XHJcbiAgICAgICAgICBpZiAob3B0cy50aW1ldGFibGVbaV0uYnJlYWsgJiYgb3B0cy50aW1ldGFibGVbaV0uYnJlYWsuaGFzQnJlYWsgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgbW9ybmluZy5pbm5lckhUTUwgPSBgPHA+JHtvcHRzLnRpbWV0YWJsZVtpXS5vcGVuLmh9OiR7b3B0cy50aW1ldGFibGVbaV0ub3Blbi5tfSDigJIgJHtvcHRzLnRpbWV0YWJsZVtpXS5icmVhay5zdGFydC5ofToke29wdHMudGltZXRhYmxlW2ldLmJyZWFrLnN0YXJ0Lm19PC9wPmA7XHJcbiAgICAgICAgICAgIG1vcm5pbmcuY2xhc3NMaXN0LmFkZCgnZmlsbGVkJyk7IC8vIE1vcm5pbmdcclxuICAgICAgICAgICAgbW9ybmluZy5jbGFzc0xpc3QuYWRkKCdzcGxpdGVkJyk7IC8vIE1vcm5pbmdcclxuICAgICAgICAgICAgYWZ0ZXJub29uLmlubmVySFRNTCA9IGA8cD4ke29wdHMudGltZXRhYmxlW2ldLmJyZWFrLmVuZC5ofToke29wdHMudGltZXRhYmxlW2ldLmJyZWFrLmVuZC5tfSDigJIgJHtvcHRzLnRpbWV0YWJsZVtpXS5jbG9zZS5ofToke29wdHMudGltZXRhYmxlW2ldLmNsb3NlLm19PC9wPmA7XHJcbiAgICAgICAgICAgIGFmdGVybm9vbi5jbGFzc0xpc3QuYWRkKCdmaWxsZWQnKTsgLy8gQWZ0ZXJub29uXHJcbiAgICAgICAgICAgIGFmdGVybm9vbi5jbGFzc0xpc3QuYWRkKCdzcGxpdGVkJyk7IC8vIEFmdGVybm9vblxyXG4gICAgICAgICAgfSBlbHNlIGlmIChvcHRzLnRpbWV0YWJsZVtpXS5vcGVuLmggJiYgb3B0cy50aW1ldGFibGVbaV0uY2xvc2UuaCkge1xyXG4gICAgICAgICAgICBtb3JuaW5nLmlubmVySFRNTCA9IGA8cD4ke29wdHMudGltZXRhYmxlW2ldLm9wZW4uaH06JHtvcHRzLnRpbWV0YWJsZVtpXS5vcGVuLm19PC9wPmA7XHJcbiAgICAgICAgICAgIG1vcm5pbmcuY2xhc3NMaXN0LmFkZCgnZmlsbGVkJyk7IC8vIE1vcm5pbmdcclxuICAgICAgICAgICAgYWZ0ZXJub29uLmlubmVySFRNTCA9IGA8cD4ke29wdHMudGltZXRhYmxlW2ldLmNsb3NlLmh9OiR7b3B0cy50aW1ldGFibGVbaV0uY2xvc2UubX08L3A+YDtcclxuICAgICAgICAgICAgYWZ0ZXJub29uLmNsYXNzTGlzdC5hZGQoJ2ZpbGxlZCcpOyAvLyBBZnRlcm5vb25cclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG1vcm5pbmcuaW5uZXJIVE1MID0gYDxwPjAwOjAwPC9wPmA7XHJcbiAgICAgICAgICAgIG1vcm5pbmcuY2xhc3NMaXN0LmFkZCgnZmlsbGVkJyk7IC8vIE1vcm5pbmdcclxuICAgICAgICAgICAgYWZ0ZXJub29uLmlubmVySFRNTCA9IGA8cD4yNDowMDwvcD5gO1xyXG4gICAgICAgICAgICBhZnRlcm5vb24uY2xhc3NMaXN0LmFkZCgnZmlsbGVkJyk7IC8vIEFmdGVybm9vblxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBkYXlEb20ubGFzdEVsZW1lbnRDaGlsZC5pbm5lckhUTUwgPSBgPGRpdiBjbGFzcz1cImNsb3NlZFwiPjxwPkZlcm3DqTwvcD48L2Rpdj5gOyAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gTWF0Y2hpbmcgdG9kYXkncyBkYXlcclxuICAgICAgICBpZiAoaSA9PT0gZGF5T2ZXZWVrKSB7XHJcbiAgICAgICAgICBkYXlEb20uY2xhc3NMaXN0LmFkZCgndG9kYXknKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RhbC1vdmVybGF5JykuYXBwZW5kQ2hpbGQoZG9tKTtcclxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsLW92ZXJsYXknKS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG5cdFx0XHRzZXRUaW1lb3V0KCgpID0+IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RhbC1vdmVybGF5Jykuc3R5bGUub3BhY2l0eSA9IDEsIDUwKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbi8qIFNlYXJjaCBtb2RhbCBtZXRob2RzICovXHJcblxyXG4vKlxyXG4gIF9zZWFyY2hNb2RhbCgpIHtcclxuICAgIHRoaXMuX2ZldGNoTW9kYWwoJ3NlYXJjaG1vZGFsJykudGhlbihkb20gPT4ge1xyXG4gICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXModGhpcy5fbWFya3MpO1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICBkb20uZmlyc3RFbGVtZW50Q2hpbGQuYXBwZW5kQ2hpbGQodGhpcy5fY3JlYXRlTWFya0NhdGVnb3J5U2VhcmNoSWNvbihrZXlzW2ldKSk7XHJcbiAgICAgIH1cclxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsLW92ZXJsYXknKS5hcHBlbmRDaGlsZChkb20pO1xyXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWwtb3ZlcmxheScpLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XHJcblx0XHRcdHNldFRpbWVvdXQoKCkgPT4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsLW92ZXJsYXknKS5zdHlsZS5vcGFjaXR5ID0gMSwgNTApO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgX2NyZWF0ZU1hcmtDYXRlZ29yeVNlYXJjaEljb24odHlwZSkge1xyXG4gICAgY29uc3QgZG9tID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XHJcbiAgICBjb25zdCBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdJTUcnKTtcclxuICAgIGNvbnN0IGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnUCcpO1xyXG4gICAgZG9tLmNsYXNzTGlzdC5hZGQoJ2ZpbHRlcmluZy1lbGVtZW50Jyk7XHJcbiAgICBpbWcuc3JjID0gYC9hc3NldHMvaW1nL21hcmtlci8ke3R5cGV9LnN2Z2A7XHJcbiAgICBsYWJlbC5pbm5lckhUTUwgPSB0eXBlO1xyXG4gICAgZG9tLmFwcGVuZENoaWxkKGltZyk7XHJcbiAgICBkb20uYXBwZW5kQ2hpbGQobGFiZWwpO1xyXG4gICAgcmV0dXJuIGRvbTtcclxuICB9XHJcbiovXHJcblxyXG4gIC8qIE1vZGFsIG1ldGhvZHMgKi9cclxuXHJcbiAgZmV0Y2hNb2RhbCh1cmwpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuICAgICAgZmV0Y2goYC9hc3NldHMvaHRtbC8ke3VybH0uaHRtbGApLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgZGF0YS50ZXh0KCkudGhlbihodG1sID0+IHtcclxuICAgICAgICAgIHJlc29sdmUoZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKS5jcmVhdGVDb250ZXh0dWFsRnJhZ21lbnQoaHRtbCkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG4gIGNsb3NlTW9kYWwoZXZlbnQsIGZvcmNlKSB7XHJcblx0XHRpZiAoZm9yY2UgPT09IHRydWUgfHwgZXZlbnQudGFyZ2V0LmlkID09PSAnbW9kYWwtb3ZlcmxheScgfHwgZXZlbnQudGFyZ2V0LmlkLmluZGV4T2YoJ2Nsb3NlJykgIT09IC0xKSB7XHJcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RhbC1vdmVybGF5Jykuc3R5bGUub3BhY2l0eSA9IDA7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RhbC1vdmVybGF5Jykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWwtb3ZlcmxheScpLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICB9LCAzMDApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIGdldCB1c2VyKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3VzZXI7XHJcbiAgfVxyXG5cclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1vbkRvdXJkYW5uYWlzO1xyXG4iXSwibmFtZXMiOlsiTWFya2VycyIsIlV0aWxzIiwiTWFwIiwib3B0aW9ucyIsIl9jbGFzc0NhbGxDaGVjayIsIl9pZCIsInRhcmdldElkIiwiX21hcCIsIl9tYXJrcyIsIl9wb2x5Z29ucyIsIl9sYXllcnMiLCJDYXJ0ZSIsIlNhdGVsbGl0ZSIsIl9pbml0IiwiX2V2ZW50cyIsIl9jcmVhdGVDbGFzcyIsImtleSIsInZhbHVlIiwid2luZG93IiwiTCIsIm1hcCIsInpvb21Db250cm9sIiwic2V0VmlldyIsIkNDREhfQ0VOVEVSIiwiTEFUIiwiTE5HIiwiY29udHJvbCIsInNjYWxlIiwiYWRkVG8iLCJzZXRNYXhCb3VuZHMiLCJNQVBfQk9VTkRTIiwiT1NNX0xBWUVSIiwiRVNSSV9MQVlFUiIsImxheWVycyIsInBvc2l0aW9uIiwiX3RoaXMiLCJvbiIsIl9tYXBDbGlja2VkIiwiYmluZCIsInBhbkluc2lkZUJvdW5kcyIsImFuaW1hdGUiLCJvcHRzIiwiY29uc29sZSIsImxvZyIsImxhdGxuZyIsImRyYXdVc2VyTWFya2VyIiwibWQiLCJ1c2VyIiwibWFya2VyIiwibGF0IiwibG5nIiwiaWNvbiIsInNldExhdExuZyIsImFkZE1hcmsiLCJjcmVhdGVQb3B1cCIsIl90aGlzMiIsInR5cGVzIiwidHlwZSIsInNwbGl0IiwibGVuZ3RoIiwiY29uY2F0IiwiZmx5VG8iLCJiaW5kUG9wdXAiLCJpIiwicHVzaCIsImFkZFBvbHlnb24iLCJwb2x5Z29uIiwiT2JqZWN0IiwiZnJlZXplIiwicmVzdGF1cmFudCIsIkljb24iLCJpY29uVXJsIiwiaWNvblNpemUiLCJpY29uQW5jaG9yIiwicG9wdXBBbmNob3IiLCJzaGFkb3dVcmwiLCJzaGFkb3dTaXplIiwic2hhZG93QW5jaG9yIiwiYmFyIiwidG9iYWNjbyIsImNlbGxhciIsInN0b3JlIiwiYm9vayIsImxhbmRtYXJrIiwiY3JhZnQiLCJnYXJkZW4iLCJjYXIiLCJnYXMiLCJhbmltYWwiLCJtYWlsIiwicmVjeWNsZSIsImFkbWluaXN0cmF0aW9uIiwiYmFuayIsIm1lZGljYWwiLCJkZWNvIiwiYmFyc3RvcmUiLCJnZXREaXN0YW5jZUJldHdlZW5Db29yZHMiLCJmcm9tIiwidG8iLCJsb24xIiwiTWF0aCIsIlBJIiwibGF0MSIsImxvbjIiLCJsYXQyIiwiZGVsdGFMYXQiLCJkZWx0YUxvbiIsImEiLCJwb3ciLCJzaW4iLCJjb3MiLCJjIiwiYXNpbiIsInNxcnQiLCJjb252ZXJ0RGlzdGFuY2VUb1N0cmluZyIsImRpc3RhbmNlIiwicHJlY2lzaW9uUm91bmQiLCJidWlsZERpc3RhbmNlRVRBIiwiY2FyTWludXRlcyIsImNhclNlY29uZHMiLCJmbG9vciIsIndhbGtNaW51dGVzIiwid2Fsa1NlY29uZHMiLCJ3YWxrIiwicHJlY2lzaW9uIiwibXVsdGlwbGllciIsInJvdW5kIiwibGF0TG5nQm91bmRzIiwibGF0TG5nIiwidGlsZUxheWVyIiwiYXR0cmlidXRpb24iLCJtYXhab29tIiwibWluWm9vbSIsIk1vbkRvdXJkYW5uYWlzIiwiX2RhdGEiLCJfdXNlciIsIkhPTUVfTEFUIiwiSE9NRV9MTkciLCJhY2N1cmFjeSIsIl90bXAiLCJfaW5pdEdlb2xvY2F0aW9uIiwidGhlbiIsIl9mZXRjaE1hcmtlcnMiLCJfaW5pdE1hcCIsIl9pbml0RXZlbnRzIiwiX2J1aWxkTWFya2VycyIsIl9idWlsZFBvbHlnb25zIiwiUHJvbWlzZSIsInJlc29sdmUiLCJuYXZpZ2F0b3IiLCJlbmFibGVIaWdoQWNjdXJhY3kiLCJtYXhpbXVtQWdlIiwidGltZW91dCIsIl93YXRjaElkIiwiZ2VvbG9jYXRpb24iLCJ3YXRjaFBvc2l0aW9uIiwiY29vcmRzIiwibGF0aXR1ZGUiLCJsb25naXR1ZGUiLCJmZXRjaCIsImRhdGEiLCJqc29uIiwianNvbkRhdGEiLCJfdGhpczMiLCJfdGhpczQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNsb3NlTW9kYWwiLCJfdGhpczUiLCJrZXlzIiwibWFya2VycyIsImoiLCJfY3JlYXRlTWFya2VyUG9wdXAiLCJfdGhpczYiLCJjaXR5Qm91bmRzIiwiZG9tIiwiY3JlYXRlRWxlbWVudCIsInRpdGxlIiwiYWRkcmVzcyIsInRvd24iLCJwaG9uZSIsIndlYnNpdGUiLCJpbmZvIiwib3BlbldpdGgiLCJjbGFzc0xpc3QiLCJhZGQiLCJpbm5lckhUTUwiLCJuYW1lIiwiaHJlZiIsInNldEF0dHJpYnV0ZSIsImFwcGVuZENoaWxkIiwiYnV0dG9uIiwiX21hcmtlck9wZW5lZFN0YXRlIiwidGltZXRhYmxlIiwiX3RpbWV0YmFsZU1vZGFsIiwic3RhdGUiLCJtb3JlIiwiX2NoZWNrVGltZSIsInNldEludGVydmFsIiwiX21hcmtlcklzT3BlbmVkIiwibm93IiwiRGF0ZSIsImhvdXIiLCJnZXRIb3VycyIsIm1pbnV0ZXMiLCJnZXRNaW51dGVzIiwiZGF5T2ZXZWVrIiwiZ2V0RGF5Iiwib3BlbmluZ1RpbWUiLCJwYXJzZUludCIsIm9wZW4iLCJoIiwibSIsImNsb3NpbmdUaW1lIiwiY2xvc2UiLCJjdXJyZW50VGltZSIsImlzT3BlbiIsImlzTmFOIiwiaGFzQnJlYWsiLCJicmVha09wZW5pbmdUaW1lIiwiZW5kIiwiYnJlYWtDbG9zaW5nVGltZSIsInN0YXJ0IiwiX21hcmtlcklzQ2xvc2VkIiwiYWx3YXlzT3BlbmVkIiwiZmlyc3RDaGlsZCIsImxhc3RDaGlsZCIsInJlbW92ZSIsIl90aGlzNyIsImZldGNoTW9kYWwiLCJxdWVyeVNlbGVjdG9yIiwiZXRhIiwiZGF5RG9tIiwiY2hpbGRyZW4iLCJtb3JuaW5nIiwibGFzdEVsZW1lbnRDaGlsZCIsImZpcnN0RWxlbWVudENoaWxkIiwiYWZ0ZXJub29uIiwic3R5bGUiLCJkaXNwbGF5Iiwic2V0VGltZW91dCIsIm9wYWNpdHkiLCJ1cmwiLCJ0ZXh0IiwiaHRtbCIsImNyZWF0ZVJhbmdlIiwiY3JlYXRlQ29udGV4dHVhbEZyYWdtZW50IiwiZXZlbnQiLCJmb3JjZSIsInRhcmdldCIsImlkIiwiaW5kZXhPZiIsImdldCJdLCJzb3VyY2VSb290IjoiIn0=
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
  grocery: new window.L.Icon({
    iconUrl: 'assets/img/marker/grocery.svg',
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
  bakery: new window.L.Icon({
    iconUrl: 'assets/img/marker/bread.svg',
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDbEJDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFdBQVcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUNyQkMsU0FBUyxFQUFFLHFDQUFxQztJQUNoREMsVUFBVSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUNwQkMsWUFBWSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUU7RUFDdkIsQ0FBQyxDQUFDO0VBQ0ZLLEtBQUssRUFBRSxJQUFJbEUsTUFBTSxDQUFDQyxDQUFDLENBQUNxRCxJQUFJLENBQUM7SUFDdkJDLE9BQU8sRUFBRSw2QkFBNkI7SUFDdENDLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDbEJDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFdBQVcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUNyQkMsU0FBUyxFQUFFLHFDQUFxQztJQUNoREMsVUFBVSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUNwQkMsWUFBWSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUU7RUFDdkIsQ0FBQyxDQUFDO0VBQ0ZNLE1BQU0sRUFBRSxJQUFJbkUsTUFBTSxDQUFDQyxDQUFDLENBQUNxRCxJQUFJLENBQUM7SUFDeEJDLE9BQU8sRUFBRSw2QkFBNkI7SUFDdENDLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDbEJDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFdBQVcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUNyQkMsU0FBUyxFQUFFLHFDQUFxQztJQUNoREMsVUFBVSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUNwQkMsWUFBWSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUU7RUFDdkIsQ0FBQyxDQUFDO0VB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QW1CLElBQUksRUFBSTtVQUM3Q0EsSUFBSSxDQUFDb0YsSUFBSSxDQUFDLENBQUMsQ0FBQ3ZHLElBQUksQ0FBQyxVQUFBd0csSUFBSSxFQUFJO1lBQ3ZCakcsT0FBTyxDQUFDaUIsUUFBUSxDQUFDaUYsV0FBVyxDQUFDLENBQUMsQ0FBQ0Msd0JBQXdCLENBQUNGLElBQUksQ0FBQyxDQUFDO1VBQ2hFLENBQUMsQ0FBQztRQUNKLENBQUMsQ0FBQztNQUNKLENBQUMsQ0FBQztJQUNKO0VBQUM7SUFBQTFPLEdBQUE7SUFBQUMsS0FBQSxFQUdELFNBQUE0SixXQUFXZ0YsS0FBSyxFQUFFQyxLQUFLLEVBQUU7TUFDekIsSUFBSUEsS0FBSyxLQUFLLElBQUksSUFBSUQsS0FBSyxDQUFDRSxNQUFNLENBQUNDLEVBQUUsS0FBSyxlQUFlLElBQUlILEtBQUssQ0FBQ0UsTUFBTSxDQUFDQyxFQUFFLENBQUNDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUNsR3ZGLFFBQVEsQ0FBQ0MsY0FBYyxDQUFDLGVBQWUsQ0FBQyxDQUFDeUUsS0FBSyxDQUFDRyxPQUFPLEdBQUcsQ0FBQztRQUMxREQsVUFBVSxDQUFDLFlBQU07VUFDZjVFLFFBQVEsQ0FBQ0MsY0FBYyxDQUFDLGVBQWUsQ0FBQyxDQUFDeUUsS0FBSyxDQUFDQyxPQUFPLEdBQUcsTUFBTTtVQUMvRDNFLFFBQVEsQ0FBQ0MsY0FBYyxDQUFDLGVBQWUsQ0FBQyxDQUFDcUIsU0FBUyxHQUFHLEVBQUU7UUFDekQsQ0FBQyxFQUFFLEdBQUcsQ0FBQztNQUNUO0lBQ0Y7RUFBQztJQUFBaEwsR0FBQTtJQUFBa1AsR0FBQSxFQUdELFNBQUFBLElBQUEsRUFBVztNQUNULE9BQU8sSUFBSSxDQUFDckgsS0FBSztJQUNuQjtFQUFDO0VBQUEsT0FBQUYsY0FBQTtBQUFBO0FBS0gsaUVBQWVBLGNBQWMsRSIsInNvdXJjZXMiOlsid2VicGFjazovL01vbkRvdXJkYW5uYWlzLy4vc3JjL2pzL3V0aWxzL01hcC5qcyIsIndlYnBhY2s6Ly9Nb25Eb3VyZGFubmFpcy8uL3NyYy9qcy91dGlscy9NYXJrZXJFbnVtLmpzIiwid2VicGFjazovL01vbkRvdXJkYW5uYWlzLy4vc3JjL2pzL3V0aWxzL1V0aWxzLmpzIiwid2VicGFjazovL01vbkRvdXJkYW5uYWlzLy4vc3JjL3Njc3MvTW9uRG91cmRhbm5haXMuc2NzcyIsIndlYnBhY2s6Ly9Nb25Eb3VyZGFubmFpcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9Nb25Eb3VyZGFubmFpcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vTW9uRG91cmRhbm5haXMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9Nb25Eb3VyZGFubmFpcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL01vbkRvdXJkYW5uYWlzLy4vc3JjL2pzL01vbkRvdXJkYW5uYWlzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBNYXJrZXJzIGZyb20gJy4vTWFya2VyRW51bS5qcyc7XHJcbmltcG9ydCBVdGlscyBmcm9tICcuL1V0aWxzLmpzJztcclxuXHJcblxyXG5jbGFzcyBNYXAge1xyXG5cclxuXHJcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xyXG4gICAgdGhpcy5faWQgPSBvcHRpb25zLnRhcmdldElkO1xyXG4gICAgdGhpcy5fbWFwID0gbnVsbDtcclxuICAgIHRoaXMuX21hcmtzID0ge307XHJcbiAgICB0aGlzLl9wb2x5Z29ucyA9IFtdO1xyXG4gICAgdGhpcy5fbGF5ZXJzID0ge1xyXG4gICAgICBDYXJ0ZTogbnVsbCxcclxuICAgICAgU2F0ZWxsaXRlOiBudWxsXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuX2luaXQoKTtcclxuICAgIHRoaXMuX2V2ZW50cygpO1xyXG4gIH1cclxuXHJcblxyXG4gIF9pbml0KCkge1xyXG4gICAgLy8gVXNlIG1haW4gZGl2IHRvIGluamVjdCBPU00gaW50b1xyXG4gICAgdGhpcy5fbWFwID0gd2luZG93LkwubWFwKHRoaXMuX2lkLCB7XHJcbiAgICAgIHpvb21Db250cm9sOiBmYWxzZSxcclxuICAgIH0pLnNldFZpZXcoW1V0aWxzLkNDREhfQ0VOVEVSLkxBVCwgVXRpbHMuQ0NESF9DRU5URVIuTE5HXSwgMTIpO1xyXG4gICAgLy8gQWRkIG1ldGVyIGFuZCBmZWV0IHNjYWxlIG9uIG1hcFxyXG4gICAgd2luZG93LkwuY29udHJvbC5zY2FsZSgpLmFkZFRvKHRoaXMuX21hcCk7XHJcbiAgICAvLyBQcmV2ZW50IHBhbm5pbmcgb3V0c2lkZSBvZiB0aGUgbWFwIGJvdW5kcyBkZWZpbmluZWQgaW4gdXRpbHNcclxuICAgIHRoaXMuX21hcC5zZXRNYXhCb3VuZHMoVXRpbHMuTUFQX0JPVU5EUyk7XHJcbiAgICAvLyBBZGQgbGF5ZXIgZ3JvdXAgdG8gaW50ZXJmYWNlIGFuZCBzdGFydCBtYXAgd2l0aCBvc20gZGVmYXVsdFxyXG4gICAgdGhpcy5fbGF5ZXJzLkNhcnRlID0gVXRpbHMuT1NNX0xBWUVSO1xyXG4gICAgdGhpcy5fbGF5ZXJzLlNhdGVsbGl0ZSA9IFV0aWxzLkVTUklfTEFZRVI7XHJcbiAgICB0aGlzLl9sYXllcnMuQ2FydGUuYWRkVG8odGhpcy5fbWFwKTtcclxuICAgIC8vIEFkZCBsYXllciBzd2l0Y2ggcmFkaW8gb24gYm90dG9tIHJpZ2h0IG9mIHRoZSBtYXBcclxuICAgIHdpbmRvdy5MLmNvbnRyb2wubGF5ZXJzKHRoaXMuX2xheWVycywge30sIHsgcG9zaXRpb246ICdib3R0b21yaWdodCcgfSkuYWRkVG8odGhpcy5fbWFwKTtcclxuICB9XHJcblxyXG5cclxuICBfZXZlbnRzKCkge1xyXG4gICAgLy8gU3Vic2NyaWJlIHRvIGNsaWNrIGV2ZW50IG9uIG1hcCB0byByZWFjdFxyXG4gICAgdGhpcy5fbWFwLm9uKCdjbGljaycsIHRoaXMuX21hcENsaWNrZWQuYmluZCh0aGlzKSk7XHJcbiAgICAvLyBNYXAgaXMgZHJhZ2dlZCBieSB1c2VyIG1vdXNlL2ZpbmdlclxyXG4gICAgdGhpcy5fbWFwLm9uKCdkcmFnJywgKCkgPT4ge1xyXG4gICAgICAvLyBDb25zdHJhaW4gcGFuIHRvIHRoZSBtYXAgYm91bmRzXHJcbiAgICAgIHRoaXMuX21hcC5wYW5JbnNpZGVCb3VuZHMoVXRpbHMuTUFQX0JPVU5EUywgeyBhbmltYXRlOiB0cnVlIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgX21hcENsaWNrZWQob3B0cykge1xyXG4gICAgY29uc29sZS5sb2cob3B0cy5sYXRsbmcsIEpTT04uc3RyaW5naWZ5KG9wdHMubGF0bG5nLmxhdCArICcsICcgKyBvcHRzLmxhdGxuZy5sbmcpKTtcclxuICB9XHJcblxyXG5cclxuICBkcmF3VXNlck1hcmtlcigpIHtcclxuICAgIGlmICghd2luZG93Lm1kLnVzZXIubWFya2VyKSB7XHJcbiAgICAgIHdpbmRvdy5tZC51c2VyLm1hcmtlciA9IHdpbmRvdy5MLm1hcmtlcihbd2luZG93Lm1kLnVzZXIubGF0LCB3aW5kb3cubWQudXNlci5sbmddLCB7XHJcbiAgICAgICAgaWNvbjogTWFya2Vycy51c2VyXHJcbiAgICAgIH0pO1xyXG4gICAgICB3aW5kb3cubWQudXNlci5tYXJrZXIuYWRkVG8odGhpcy5fbWFwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHdpbmRvdy5tZC51c2VyLm1hcmtlci5zZXRMYXRMbmcod2luZG93Lm1kLnVzZXIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIGFkZE1hcmsob3B0cywgY3JlYXRlUG9wdXApIHtcclxuICAgIGxldCB0eXBlcyA9IG9wdHMudHlwZS5zcGxpdCgnLycpO1xyXG4gICAgbGV0IHR5cGUgPSBvcHRzLnR5cGU7XHJcbiAgICBpZiAodHlwZXMubGVuZ3RoID4gMSkge1xyXG4gICAgICB0eXBlID0gYCR7dHlwZXNbMF19JHt0eXBlc1sxXX1gO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG1hcmtlciA9IHdpbmRvdy5MLm1hcmtlcihbb3B0cy5sYXQsIG9wdHMubG5nXSwgeyBcclxuICAgICAgaWNvbjogTWFya2Vyc1t0eXBlXVxyXG4gICAgfSkub24oJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLl9tYXAuZmx5VG8oW29wdHMubGF0LCBvcHRzLmxuZ10sIDE4KTtcclxuICAgIH0pO1xyXG5cclxuICAgIG1hcmtlci5iaW5kUG9wdXAoY3JlYXRlUG9wdXAob3B0cykpO1xyXG4gICAgbWFya2VyLmFkZFRvKHRoaXMuX21hcCk7XHJcbiAgICBpZiAodHlwZXMubGVuZ3RoID4gMSkge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHR5cGVzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9tYXJrc1t0eXBlc1tpXV0pIHtcclxuICAgICAgICAgIHRoaXMuX21hcmtzW3R5cGVzW2ldXSA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9tYXJrc1t0eXBlc1tpXV0ucHVzaChtYXJrZXIpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoIXRoaXMuX21hcmtzW3R5cGVdKSB7XHJcbiAgICAgICAgdGhpcy5fbWFya3NbdHlwZV0gPSBbXTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLl9tYXJrc1t0eXBlXS5wdXNoKG1hcmtlcik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcbiAgYWRkUG9seWdvbihwb2x5Z29uKSB7XHJcbiAgICB0aGlzLl9wb2x5Z29ucy5wdXNoKHdpbmRvdy5MLnBvbHlnb24ocG9seWdvbikuYWRkVG8odGhpcy5fbWFwKSk7XHJcbiAgfVxyXG5cclxuXHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBNYXA7XHJcbiIsImV4cG9ydCBkZWZhdWx0IE9iamVjdC5mcmVlemUoe1xyXG4gIHJlc3RhdXJhbnQ6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9yZXN0YXVyYW50LnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBiYXI6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9iYXIuc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIHRvYmFjY286IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci90b2JhY2NvLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBjZWxsYXI6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9jZWxsYXIuc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIGdyb2Nlcnk6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9ncm9jZXJ5LnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBzcG9ydDogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL3Nwb3J0LnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBiYWtlcnk6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9icmVhZC5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgc3RvcmU6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9zdG9yZS5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgYm9vazogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL2Jvb2suc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIGxhbmRtYXJrOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbGFuZG1hcmsuc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIGNyYWZ0OiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvY3JhZnQuc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIGdhcmRlbjogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL2dhcmRlbi5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgY2FyOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvY2FyLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBnYXM6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9nYXMuc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIGFuaW1hbDogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL2FuaW1hbC5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgbWFpbDogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21haWwuc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIHBhcms6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9wYXJrLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICByZWN5Y2xlOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvcmVjeWNsZS5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgYWRtaW5pc3RyYXRpb246IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9hZG1pbmlzdHJhdGlvbi5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgYmFuazogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL2Jhbmsuc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIG1lZGljYWw6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9tZWRpY2FsLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBkZWNvOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvZGVjby5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksICBcclxuICB1c2VyOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvdXNlci5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF1cclxuICB9KSxcclxuICBiYXJzdG9yZTogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21peGVkL2JhcnN0b3JlLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXVxyXG4gIH0pLFxyXG59KTtcclxuIiwiY29uc3QgZ2V0RGlzdGFuY2VCZXR3ZWVuQ29vcmRzID0gKGZyb20sIHRvKSA9PiB7XHJcbiAgLy8gUmV0dXJuIGRpc3RhbmNlIGluIG1ldGVyc1xyXG4gIGNvbnN0IGxvbjEgPSAoZnJvbVsxXSAqIE1hdGguUEkpIC8gMTgwLFxyXG4gICAgbGF0MSA9IChmcm9tWzBdICogTWF0aC5QSSkgLyAxODAsXHJcbiAgICBsb24yID0gKHRvWzFdICogTWF0aC5QSSkgLyAxODAsXHJcbiAgICBsYXQyID0gKHRvWzBdICogTWF0aC5QSSkgLyAxODA7XHJcblxyXG4gIGNvbnN0IGRlbHRhTGF0ID0gbGF0MiAtIGxhdDE7XHJcbiAgY29uc3QgZGVsdGFMb24gPSBsb24yIC0gbG9uMTtcclxuXHJcbiAgY29uc3QgYSA9IE1hdGgucG93KE1hdGguc2luKGRlbHRhTGF0IC8gMiksIDIpICsgTWF0aC5jb3MobGF0MSkgKiBNYXRoLmNvcyhsYXQyKSAqIE1hdGgucG93KE1hdGguc2luKGRlbHRhTG9uIC8gMiksIDIpO1xyXG4gIGNvbnN0IGMgPSAyICogTWF0aC5hc2luKE1hdGguc3FydChhKSk7XHJcbiAgcmV0dXJuIGMgKiA2MzcxICogMTAwMDtcclxufTtcclxuXHJcblxyXG5jb25zdCBjb252ZXJ0RGlzdGFuY2VUb1N0cmluZyA9IGRpc3RhbmNlID0+IHtcclxuICBpZiAoZGlzdGFuY2UgPiAxMDAwKSB7XHJcbiAgICBkaXN0YW5jZSA9IGAke3ByZWNpc2lvblJvdW5kKGRpc3RhbmNlIC8gMTAwMCwgMil9a21gO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBkaXN0YW5jZSA9IGAke3ByZWNpc2lvblJvdW5kKGRpc3RhbmNlLCAyKX1tYDtcclxuICB9XHJcbiAgcmV0dXJuIGRpc3RhbmNlO1xyXG59O1xyXG5cclxuXHJcbmNvbnN0IGJ1aWxkRGlzdGFuY2VFVEEgPSBkaXN0YW5jZSA9PiB7XHJcbiAgbGV0IGNhck1pbnV0ZXMgPSAwO1xyXG4gIGxldCBjYXJTZWNvbmRzID0gMDtcclxuXHJcbiAgaWYgKGRpc3RhbmNlID4gNTAwMDApIHtcclxuICAgIC8vIE92ZXIgNTBrbSwgd2UgdXNlIGF2ZXJhZ2Ugc3BlZWQgb2YgMTAwa21oXHJcbiAgICBjYXJNaW51dGVzID0gKGRpc3RhbmNlIC8gMTAwMDAwKSAqIDYwO1xyXG4gIH0gZWxzZSBpZiAoZGlzdGFuY2UgPiAxMDAwMCkge1xyXG4gICAgLy8gT3ZlciAxMGttLCB3ZSB1c2UgYXZlcmFnZSBzcGVlZCBvZiA2MGttL2hcclxuICAgIGNhck1pbnV0ZXMgPSAoZGlzdGFuY2UgLyA2MDAwMCkgKiA2MDtcclxuICB9IGVsc2Uge1xyXG4gICAgLy8gVW5kZXIgMTBrbSB3ZSB1c2VyIGF2ZXJhZ2Ugc3BlZWQgb2YgMzBrbS9oXHJcbiAgICBjYXJNaW51dGVzID0gKGRpc3RhbmNlIC8gMzAwMDApICogNjA7XHJcbiAgfVxyXG5cclxuICBjYXJTZWNvbmRzID0gY2FyTWludXRlcyAlIDE7IC8vIEtlZXAgZmxvYXRpbmcgdmFsdWUgZm9yIHNlY29uZHMgY29tcHV0aW5nXHJcbiAgY2FyTWludXRlcyA9IE1hdGguZmxvb3IoY2FyTWludXRlcyk7IC8vIFJlbW92ZSBmbG9hdGluZyB2YWx1ZVxyXG5cclxuICBpZiAoY2FyTWludXRlcyA+IDYwKSB7XHJcbiAgICBjYXJNaW51dGVzID0gYCR7TWF0aC5mbG9vcihjYXJNaW51dGVzIC8gNjApfWggJHtjYXJNaW51dGVzICUgNjB9bWA7XHJcbiAgfSBlbHNlIHtcclxuICAgIGNhck1pbnV0ZXMgPSBgJHtjYXJNaW51dGVzfW1gO1xyXG4gIH1cclxuXHJcbiAgbGV0IHdhbGtNaW51dGVzID0gKGRpc3RhbmNlIC8gNTAwMCkgKiA2MDtcclxuICBsZXQgd2Fsa1NlY29uZHMgPSB3YWxrTWludXRlcyAlIDE7XHJcbiAgd2Fsa01pbnV0ZXMgPSBNYXRoLmZsb29yKHdhbGtNaW51dGVzKTsgLy8gUmVtb3ZlIGZsb2F0aW5nIHZhbHVlXHJcblxyXG4gIGlmICh3YWxrTWludXRlcyA+IDYwKSB7XHJcbiAgICB3YWxrTWludXRlcyA9IGAke01hdGguZmxvb3Iod2Fsa01pbnV0ZXMgLyA2MCl9aCAke3dhbGtNaW51dGVzICUgNjB9bWA7XHJcbiAgfSBlbHNlIHtcclxuICAgIHdhbGtNaW51dGVzID0gYCR7d2Fsa01pbnV0ZXN9bWA7XHJcbiAgfSAgXHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBjYXI6IGAke2Nhck1pbnV0ZXN9ICR7TWF0aC5mbG9vcihwcmVjaXNpb25Sb3VuZCgoY2FyU2Vjb25kcyAvIDEwMCkgKiA2MCwgMikgKiAxMDApfXNgLFxyXG4gICAgd2FsazogYCR7d2Fsa01pbnV0ZXN9ICR7TWF0aC5mbG9vcihwcmVjaXNpb25Sb3VuZCgod2Fsa1NlY29uZHMgLyAxMDApICogNjAsIDIpICogMTAwKX1zYCxcclxuICB9O1xyXG59O1xyXG5cclxuXHJcbmNvbnN0IHByZWNpc2lvblJvdW5kID0gKHZhbHVlLCBwcmVjaXNpb24pID0+IHtcclxuICBjb25zdCBtdWx0aXBsaWVyID0gTWF0aC5wb3coMTAsIHByZWNpc2lvbiB8fCAwKTtcclxuICByZXR1cm4gTWF0aC5yb3VuZCh2YWx1ZSAqIG11bHRpcGxpZXIpIC8gbXVsdGlwbGllcjtcclxufTtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgQ0NESF9DRU5URVI6IHtcclxuICAgIExBVDogNDguNTMxODM5MDY0NDE5NjIsXHJcbiAgICBMTkc6IDIuMDUzNzU2NzEzODY3MTg4XHJcbiAgfSxcclxuICBNQVBfQk9VTkRTOiB3aW5kb3cuTC5sYXRMbmdCb3VuZHMoXHJcbiAgICB3aW5kb3cuTC5sYXRMbmcoNDguNjc5NDAwNzE1OTYzODk0LCAxLjczOTA2MDY2ODk0NTMxMjcpLFxyXG4gICAgd2luZG93LkwubGF0TG5nKDQ4LjM4NDM5MDc0MTUxODY2LCAyLjM0MzM5NTk5NjA5Mzc1MClcclxuICApLFxyXG4gIE9TTV9MQVlFUjogd2luZG93LkwudGlsZUxheWVyKCdodHRwczovL3tzfS50aWxlLm9wZW5zdHJlZXRtYXAub3JnL3t6fS97eH0ve3l9LnBuZycsIHtcclxuICAgIGF0dHJpYnV0aW9uOiAnJmNvcHk7IDxhIGhyZWY9XCJodHRwczovL3d3dy5vcGVuc3RyZWV0bWFwLm9yZy9jb3B5cmlnaHRcIj5PcGVuU3RyZWV0TWFwPC9hPicsXHJcbiAgICBtYXhab29tOiAxOSxcclxuICAgIG1pblpvb206IDEyXHJcbiAgfSksXHJcbiAgRVNSSV9MQVlFUjogd2luZG93LkwudGlsZUxheWVyKCdodHRwczovL3NlcnZlci5hcmNnaXNvbmxpbmUuY29tL0FyY0dJUy9yZXN0L3NlcnZpY2VzL1dvcmxkX0ltYWdlcnkvTWFwU2VydmVyL3RpbGUve3p9L3t5fS97eH0nLCB7XHJcbiAgICBhdHRyaWJ1dGlvbjogJyZjb3B5OyA8YSBocmVmPVwiaHR0cHM6Ly93d3cuYXJjZ2lzLmNvbS9ob21lL2l0ZW0uaHRtbD9pZD0xMGRmMjI3OWY5Njg0ZTRhOWY2YTdmMDhmZWJhYzJhOVwiPkVzcmkgSW1hZ2VyeTwvYT4nLFxyXG4gICAgbWF4Wm9vbTogMTksXHJcbiAgICBtaW5ab29tOiAxMlxyXG4gIH0pLFxyXG4gIGdldERpc3RhbmNlQmV0d2VlbkNvb3JkczogZ2V0RGlzdGFuY2VCZXR3ZWVuQ29vcmRzLFxyXG4gIGNvbnZlcnREaXN0YW5jZVRvU3RyaW5nOiBjb252ZXJ0RGlzdGFuY2VUb1N0cmluZyxcclxuICBidWlsZERpc3RhbmNlRVRBOiBidWlsZERpc3RhbmNlRVRBLFxyXG4gIHByZWNpc2lvblJvdW5kOiBwcmVjaXNpb25Sb3VuZFxyXG59O1xyXG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAnLi4vc2Nzcy9Nb25Eb3VyZGFubmFpcy5zY3NzJztcclxuaW1wb3J0IE1hcCBmcm9tICcuL3V0aWxzL01hcC5qcyc7XHJcbmltcG9ydCBVdGlscyBmcm9tICcuL3V0aWxzL1V0aWxzLmpzJztcclxuXHJcblxyXG5jbGFzcyBNb25Eb3VyZGFubmFpcyB7XHJcblxyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuX21hcCA9IG51bGw7XHJcbiAgICB0aGlzLl9sYXllcnMgPSB7fTtcclxuICAgIHRoaXMuX2RhdGEgPSBudWxsO1xyXG5cclxuICAgIHRoaXMuX3VzZXIgPSB7XHJcbiAgICAgIGxhdDogVXRpbHMuSE9NRV9MQVQsXHJcbiAgICAgIGxuZzogVXRpbHMuSE9NRV9MTkcsXHJcbiAgICAgIGFjY3VyYWN5OiAwLFxyXG4gICAgICBtYXJrZXI6IG51bGxcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5faW5pdEdlb2xvY2F0aW9uKClcclxuICAgICAgLnRoZW4odGhpcy5fZmV0Y2hNYXJrZXJzLmJpbmQodGhpcykpXHJcbiAgICAgIC50aGVuKHRoaXMuX2luaXRNYXAuYmluZCh0aGlzKSlcclxuICAgICAgLnRoZW4odGhpcy5faW5pdEV2ZW50cy5iaW5kKHRoaXMpKVxyXG4gICAgICAudGhlbih0aGlzLl9idWlsZE1hcmtlcnMuYmluZCh0aGlzKSlcclxuICAgICAgLnRoZW4odGhpcy5fYnVpbGRQb2x5Z29ucy5iaW5kKHRoaXMpKTtcclxuICB9XHJcblxyXG5cclxuICBfaW5pdEdlb2xvY2F0aW9uKCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xyXG5cdFx0XHRpZiAoJ2dlb2xvY2F0aW9uJyBpbiBuYXZpZ2F0b3IpIHtcclxuXHRcdFx0XHRjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgZW5hYmxlSGlnaEFjY3VyYWN5OiB0cnVlLCAvLyBNb3JlIGNvbnN1cHRpb24sIGJldHRlciBwb3NpdGlvblxyXG4gICAgICAgICAgbWF4aW11bUFnZTogMTAwMCwgLy8gQSBwb3NpdGlvbiB3aWxsIGxhc3QgMXMgbWF4aW11bVxyXG4gICAgICAgICAgdGltZW91dDogOTAwLCAvLyBBIHBvc2l0aW9uIGlzIHVwZGF0ZWQgaW4gMC45cyBtYXhpbXVtXHJcbiAgICAgICAgfTtcclxuXHRcdFx0XHR0aGlzLl93YXRjaElkID0gbmF2aWdhdG9yLmdlb2xvY2F0aW9uLndhdGNoUG9zaXRpb24ocG9zaXRpb24gPT4ge1xyXG5cdFx0XHRcdFx0Ly8gVXBkYXRlIHNhdmVkIHVzZXIgcG9zaXRpb25cclxuXHRcdFx0XHRcdHRoaXMuX3VzZXIubGF0ID0gcG9zaXRpb24uY29vcmRzLmxhdGl0dWRlO1xyXG5cdFx0XHRcdFx0dGhpcy5fdXNlci5sbmcgPSBwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlO1xyXG5cdFx0XHRcdFx0dGhpcy5fdXNlci5hY2N1cmFjeSA9IHBvc2l0aW9uLmNvb3Jkcy5hY2N1cmFjeTtcclxuXHRcdFx0XHRcdC8vIE9ubHkgZHJhdyBtYXJrZXIgaWYgbWFwIGlzIGFscmVhZHkgY3JlYXRlZFxyXG5cdFx0XHRcdFx0aWYgKHRoaXMuX21hcCkge1xyXG4gICAgICAgICAgICB0aGlzLl9tYXAuZHJhd1VzZXJNYXJrZXIoKTtcclxuICAgICAgICAgIH1cclxuXHRcdFx0XHRcdHJlc29sdmUoKTtcclxuXHRcdFx0XHR9LCByZXNvbHZlLCBvcHRpb25zKTtcclxuICAgICAgfSBlbHNlIHtcclxuXHRcdFx0XHRyZXNvbHZlKCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG4gIH1cclxuXHJcblxyXG4gIF9mZXRjaE1hcmtlcnMoKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICAgIGZldGNoKGAvYXNzZXRzL2pzb24vTWFwRGF0YS5qc29uYCkudGhlbihkYXRhID0+IHtcclxuICAgICAgICBkYXRhLmpzb24oKS50aGVuKGpzb25EYXRhID0+IHtcclxuICAgICAgICAgIHRoaXMuX2RhdGEgPSBqc29uRGF0YTtcclxuICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICB9KS5jYXRjaChyZXNvbHZlKTtcclxuICAgICAgfSkuY2F0Y2gocmVzb2x2ZSk7XHJcbiAgICB9KTtcclxuICB9ICBcclxuXHJcblxyXG4gIF9pbml0TWFwKCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xyXG4gICAgICB0aGlzLl9tYXAgPSBuZXcgTWFwKHtcclxuICAgICAgICB0YXJnZXRJZDogJ3Nhcm1hdGVzLWxhbmQnXHJcbiAgICAgIH0pO1xyXG4gICAgICByZXNvbHZlKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG5cclxuICBfaW5pdEV2ZW50cygpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuICAgICAgLy8gTGlzdGVuaW5nIHRvIG1vZGFsIGV2ZW50XHJcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RhbC1vdmVybGF5JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsb3NlTW9kYWwuYmluZCh0aGlzKSk7XHJcbiAgICAgIHJlc29sdmUoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG4gIF9idWlsZE1hcmtlcnMoKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyh0aGlzLl9kYXRhLm1hcmtlcnMpO1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuX2RhdGEubWFya2Vyc1trZXlzW2ldXS5sZW5ndGg7ICsraikge1xyXG4gICAgICAgICAgdGhpcy5fbWFwLmFkZE1hcmsodGhpcy5fZGF0YS5tYXJrZXJzW2tleXNbaV1dW2pdLCB0aGlzLl9jcmVhdGVNYXJrZXJQb3B1cC5iaW5kKHRoaXMpKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgX2J1aWxkUG9seWdvbnMoKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyh0aGlzLl9kYXRhLmNpdHlCb3VuZHMpO1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICB0aGlzLl9tYXAuYWRkUG9seWdvbih0aGlzLl9kYXRhLmNpdHlCb3VuZHNba2V5c1tpXV0pO1xyXG4gICAgICB9XHJcbiAgICAgIHJlc29sdmUoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qIE1hcCBVdGlscyAqL1xyXG5cclxuXHJcbiAgX2NyZWF0ZU1hcmtlclBvcHVwKG9wdHMpIHtcclxuICAgIGNvbnN0IGRvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xyXG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdIMycpO1xyXG4gICAgY29uc3QgYWRkcmVzcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0knKTtcclxuICAgIGNvbnN0IHRvd24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdJJyk7XHJcbiAgICBjb25zdCBwaG9uZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0EnKTtcclxuICAgIGNvbnN0IHdlYnNpdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdBJyk7XHJcbiAgICBjb25zdCBpbmZvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnUCcpO1xyXG4gICAgY29uc3Qgb3BlbldpdGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdBJyk7XHJcblxyXG4gICAgZG9tLmNsYXNzTGlzdC5hZGQoJ21hcmtlci1wb3B1cCcpO1xyXG4gICAgdGl0bGUuaW5uZXJIVE1MID0gb3B0cy5uYW1lO1xyXG4gICAgYWRkcmVzcy5pbm5lckhUTUwgPSBvcHRzLmFkZHJlc3M7XHJcbiAgICB0b3duLmlubmVySFRNTCA9IG9wdHMudG93bjtcclxuICAgIHBob25lLmhyZWYgPSBgdGVsOiR7b3B0cy5waG9uZX1gO1xyXG4gICAgcGhvbmUuaW5uZXJIVE1MID0gYDxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvaWNvbi9waG9uZS5zdmdcIj4ke29wdHMucGhvbmV9YDtcclxuICAgIHdlYnNpdGUuaHJlZiA9IG9wdHMud2Vic2l0ZTtcclxuICAgIHdlYnNpdGUuaW5uZXJIVE1MID0gJzxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvaWNvbi93ZWIuc3ZnXCI+Q29uc3VsdGVyIGxlIHNpdGUnO1xyXG4gICAgd2Vic2l0ZS5zZXRBdHRyaWJ1dGUoJ3JlbCcsICdub29wZW5lciBub3JlZmVycmVyJyk7XHJcbiAgICB3ZWJzaXRlLnNldEF0dHJpYnV0ZSgndGFyZ2V0JywgJ19ibGFuaycpO1xyXG4gICAgaW5mby5pbm5lckhUTUwgPSBvcHRzLmluZm87XHJcbiAgICBvcGVuV2l0aC5ocmVmID0gYGdlbzoke29wdHMubGF0fSwke29wdHMubG5nfWA7XHJcbiAgICBvcGVuV2l0aC5pbm5lckhUTUwgPSAnPGltZyBzcmM9XCIvYXNzZXRzL2ltZy9pY29uL3Bpbi5zdmdcIj5PdXZyaXIgZGFucyBsZSBHUFMnO1xyXG5cclxuICAgIGRvbS5hcHBlbmRDaGlsZCh0aXRsZSk7XHJcbiAgICBkb20uYXBwZW5kQ2hpbGQoYWRkcmVzcyk7XHJcbiAgICBkb20uYXBwZW5kQ2hpbGQodG93bik7XHJcblxyXG4gICAgY29uc3QgYnV0dG9uID0gdGhpcy5fbWFya2VyT3BlbmVkU3RhdGUob3B0cy50aW1ldGFibGUpO1xyXG4gICAgZG9tLmFwcGVuZENoaWxkKGJ1dHRvbik7XHJcblxyXG4gICAgaWYgKG9wdHMudGltZXRhYmxlLmxlbmd0aCA+IDApIHtcclxuICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fdGltZXRiYWxlTW9kYWwuYmluZCh0aGlzLCBvcHRzKSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGlmIChvcHRzLmluZm8gIT09ICcnKSB7XHJcbiAgICAgIGRvbS5hcHBlbmRDaGlsZChpbmZvKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAob3B0cy5waG9uZSAhPT0gJycpIHtcclxuICAgICAgZG9tLmFwcGVuZENoaWxkKHBob25lKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAob3B0cy53ZWJzaXRlICE9PSAnJykge1xyXG4gICAgICBkb20uYXBwZW5kQ2hpbGQod2Vic2l0ZSk7XHJcbiAgICB9ICAgIFxyXG4gICAgXHJcbiAgICBkb20uYXBwZW5kQ2hpbGQob3BlbldpdGgpO1xyXG5cclxuICAgIHJldHVybiBkb207XHJcbiAgfVxyXG5cclxuXHJcbiAgX21hcmtlck9wZW5lZFN0YXRlKHRpbWV0YWJsZSkge1xyXG4gICAgY29uc3QgZG9tID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XHJcbiAgICBjb25zdCBzdGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0g1Jyk7XHJcbiAgICBjb25zdCBtb3JlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnSScpO1xyXG4gICAgZG9tLmNsYXNzTGlzdC5hZGQoJ21hcmtlci1vcGVuZWQnKTtcclxuICAgIGRvbS5hcHBlbmRDaGlsZChzdGF0ZSk7XHJcbiAgICBkb20uYXBwZW5kQ2hpbGQobW9yZSk7XHJcbiAgICBcclxuICAgIGlmICh0aW1ldGFibGUubGVuZ3RoKSB7XHJcbiAgICAgIG1vcmUuaW5uZXJIVE1MID0gJ1ZvaXIgbGVzIGhvcmFpcmVzJztcclxuICAgICAgdGhpcy5fY2hlY2tUaW1lKHRpbWV0YWJsZSwgZG9tKTtcclxuICAgICAgc2V0SW50ZXJ2YWwodGhpcy5fY2hlY2tUaW1lLmJpbmQodGhpcywgdGltZXRhYmxlLCBkb20pLCAzMDAwMCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLl9tYXJrZXJJc09wZW5lZChkb20sIHRydWUpO1xyXG4gICAgICBtb3JlLmlubmVySFRNTCA9ICdUb3Vqb3VycyBvdXZlcnQnOyAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBkb207XHJcbiAgfVxyXG5cclxuXHJcbiAgX2NoZWNrVGltZSh0aW1ldGFibGUsIGRvbSkge1xyXG4gICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcclxuICAgIGxldCBob3VyID0gbm93LmdldEhvdXJzKCk7XHJcbiAgICBsZXQgbWludXRlcyA9IG5vdy5nZXRNaW51dGVzKCk7XHJcbiAgICBpZiAobWludXRlcyA8IDEwKSB7XHJcbiAgICAgIG1pbnV0ZXMgPSBgMCR7bWludXRlc31gO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGRheU9mV2VlayA9IG5vdy5nZXREYXkoKSAtIDE7XHJcbiAgICBjb25zdCBvcGVuaW5nVGltZSA9IHBhcnNlSW50KGAke3RpbWV0YWJsZVtkYXlPZldlZWtdLm9wZW4uaH0ke3RpbWV0YWJsZVtkYXlPZldlZWtdLm9wZW4ubX1gKTtcclxuICAgIGNvbnN0IGNsb3NpbmdUaW1lID0gcGFyc2VJbnQoYCR7dGltZXRhYmxlW2RheU9mV2Vla10uY2xvc2UuaH0ke3RpbWV0YWJsZVtkYXlPZldlZWtdLmNsb3NlLm19YCk7XHJcbiAgICBjb25zdCBjdXJyZW50VGltZSA9IHBhcnNlSW50KGAke2hvdXJ9JHttaW51dGVzfWApO1xyXG4gICAgLy8gV29uJ3Qgd29yayBpZiB0aW1ldGFibGUgb3Blbi9jbG9zZSBob3VycyBhcmVuJ3Qgb24gdGhlIHNhbWUgZGF5XHJcbiAgICBpZiAodGltZXRhYmxlW2RheU9mV2Vla10uaXNPcGVuICYmIGlzTmFOKG9wZW5pbmdUaW1lKSkgeyAvLyAyNC83IG9wZW5pbmdcclxuICAgICAgdGhpcy5fbWFya2VySXNPcGVuZWQoZG9tLCB0cnVlKTtcclxuICAgIH0gZWxzZSBpZiAodGltZXRhYmxlW2RheU9mV2Vla10uaXNPcGVuICYmIGN1cnJlbnRUaW1lID49IG9wZW5pbmdUaW1lICYmIGN1cnJlbnRUaW1lIDwgY2xvc2luZ1RpbWUpIHtcclxuICAgICAgaWYgKHRpbWV0YWJsZVtkYXlPZldlZWtdLmJyZWFrLmhhc0JyZWFrKSB7XHJcbiAgICAgICAgY29uc3QgYnJlYWtPcGVuaW5nVGltZSA9IHBhcnNlSW50KGAke3RpbWV0YWJsZVtkYXlPZldlZWtdLmJyZWFrLmVuZC5ofSR7dGltZXRhYmxlW2RheU9mV2Vla10uYnJlYWsuZW5kLm19YCk7XHJcbiAgICAgICAgY29uc3QgYnJlYWtDbG9zaW5nVGltZSA9IHBhcnNlSW50KGAke3RpbWV0YWJsZVtkYXlPZldlZWtdLmJyZWFrLnN0YXJ0Lmh9JHt0aW1ldGFibGVbZGF5T2ZXZWVrXS5icmVhay5zdGFydC5tfWApO1xyXG4gICAgICAgIGlmIChjdXJyZW50VGltZSA+PSBicmVha0Nsb3NpbmdUaW1lICYmIGN1cnJlbnRUaW1lIDwgYnJlYWtPcGVuaW5nVGltZSkge1xyXG4gICAgICAgICAgdGhpcy5fbWFya2VySXNDbG9zZWQoZG9tKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5fbWFya2VySXNPcGVuZWQoZG9tKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5fbWFya2VySXNPcGVuZWQoZG9tKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHsgICAgICBcclxuICAgICAgdGhpcy5fbWFya2VySXNDbG9zZWQoZG9tKTtcclxuICAgIH1cclxuICB9XHJcblxyXG5cclxuICBfbWFya2VySXNPcGVuZWQoZG9tLCBhbHdheXNPcGVuZWQpIHtcclxuICAgIGRvbS5maXJzdENoaWxkLmlubmVySFRNTCA9IGBPdXZlcnRgO1xyXG4gICAgaWYgKGFsd2F5c09wZW5lZCA9PT0gdHJ1ZSkge1xyXG4gICAgICBkb20ubGFzdENoaWxkLmlubmVySFRNTCA9IGAyNGgvMjRoIGV0IDdqLzdqYDtcclxuICAgIH1cclxuICAgIGRvbS5jbGFzc0xpc3QuYWRkKCdvcGVuZWQnKTtcclxuICB9XHJcblxyXG5cclxuICBfbWFya2VySXNDbG9zZWQoZG9tKSB7XHJcbiAgICBkb20uZmlyc3RDaGlsZC5pbm5lckhUTUwgPSBgRmVybcOpYDtcclxuICAgIGRvbS5sYXN0Q2hpbGQuaW5uZXJIVE1MID0gYFZvaXIgbGVzIGhvcmFpcmVzYDtcclxuICAgIGRvbS5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuZWQnKTtcclxuICB9XHJcblxyXG5cclxuICBfdGltZXRiYWxlTW9kYWwob3B0cykge1xyXG4gICAgdGhpcy5mZXRjaE1vZGFsKCd0aW1ldGFibGVtb2RhbCcpLnRoZW4oZG9tID0+IHtcclxuICAgICAgLy8gVXBkYXRpbmcgbW9kYWwgaGVhZGVyIGFuZCBpbmZvXHJcbiAgICAgIGRvbS5xdWVyeVNlbGVjdG9yKCcjbWFyay1uYW1lJykuaW5uZXJIVE1MID0gb3B0cy5uYW1lO1xyXG4gICAgICBkb20ucXVlcnlTZWxlY3RvcignI21hcmstYWRkcmVzcycpLmlubmVySFRNTCA9IGAke29wdHMuYWRkcmVzc30sICR7b3B0cy50b3dufWA7XHJcbiAgICAgIGNvbnN0IGRpc3RhbmNlID0gVXRpbHMuZ2V0RGlzdGFuY2VCZXR3ZWVuQ29vcmRzKFtvcHRzLmxhdCwgb3B0cy5sbmddLCBbdGhpcy5fdXNlci5sYXQsIHRoaXMuX3VzZXIubG5nXSk7XHJcbiAgICAgIGRvbS5xdWVyeVNlbGVjdG9yKCcjbWFyay1kaXN0YW5jZScpLmlubmVySFRNTCA9IGBWb3VzIMOodGVzIMOgIGVudmlyb24gJHtVdGlscy5jb252ZXJ0RGlzdGFuY2VUb1N0cmluZyhkaXN0YW5jZSl9IGRlIDxiPiR7b3B0cy5uYW1lfTwvYj4gw6Agdm9sIGQnb2lzZWF1YDtcclxuICAgICAgY29uc3QgZXRhID0gVXRpbHMuYnVpbGREaXN0YW5jZUVUQShkaXN0YW5jZSk7XHJcbiAgICAgIGRvbS5xdWVyeVNlbGVjdG9yKCcjbWFyay1ldGEnKS5pbm5lckhUTUwgPSBgQ2UgcXVpIHJlcHLDqXNlbnRlIGVudmlyb24gJHtldGEuY2FyfSBlbiB2b2l0dXJlLCBvdSAke2V0YS53YWxrfSDDoCBwaWVkLmA7XHJcbiAgICAgIGRvbS5xdWVyeVNlbGVjdG9yKCcjbWFyay1zdGF0ZScpLmFwcGVuZENoaWxkKHRoaXMuX21hcmtlck9wZW5lZFN0YXRlKG9wdHMudGltZXRhYmxlKSk7XHJcbiAgICAgIC8vIE5vdyB1cGRhdGUgZGF5IGJ5IGRheVxyXG4gICAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICBjb25zdCBkYXlPZldlZWsgPSBub3cuZ2V0RGF5KCkgLSAxO1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9wdHMudGltZXRhYmxlLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgY29uc3QgZGF5RG9tID0gZG9tLnF1ZXJ5U2VsZWN0b3IoJyN0aW1ldGFibGUnKS5jaGlsZHJlbltpXTtcclxuICAgICAgICBpZiAob3B0cy50aW1ldGFibGVbaV0uaXNPcGVuID09PSB0cnVlKSB7XHJcbiAgICAgICAgICBjb25zdCBtb3JuaW5nID0gZGF5RG9tLmxhc3RFbGVtZW50Q2hpbGQuZmlyc3RFbGVtZW50Q2hpbGQ7XHJcbiAgICAgICAgICBjb25zdCBhZnRlcm5vb24gPSBkYXlEb20ubGFzdEVsZW1lbnRDaGlsZC5sYXN0RWxlbWVudENoaWxkO1xyXG4gICAgICAgICAgaWYgKG9wdHMudGltZXRhYmxlW2ldLmJyZWFrICYmIG9wdHMudGltZXRhYmxlW2ldLmJyZWFrLmhhc0JyZWFrID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIG1vcm5pbmcuaW5uZXJIVE1MID0gYDxwPiR7b3B0cy50aW1ldGFibGVbaV0ub3Blbi5ofToke29wdHMudGltZXRhYmxlW2ldLm9wZW4ubX0g4oCSICR7b3B0cy50aW1ldGFibGVbaV0uYnJlYWsuc3RhcnQuaH06JHtvcHRzLnRpbWV0YWJsZVtpXS5icmVhay5zdGFydC5tfTwvcD5gO1xyXG4gICAgICAgICAgICBtb3JuaW5nLmNsYXNzTGlzdC5hZGQoJ2ZpbGxlZCcpOyAvLyBNb3JuaW5nXHJcbiAgICAgICAgICAgIG1vcm5pbmcuY2xhc3NMaXN0LmFkZCgnc3BsaXRlZCcpOyAvLyBNb3JuaW5nXHJcbiAgICAgICAgICAgIGFmdGVybm9vbi5pbm5lckhUTUwgPSBgPHA+JHtvcHRzLnRpbWV0YWJsZVtpXS5icmVhay5lbmQuaH06JHtvcHRzLnRpbWV0YWJsZVtpXS5icmVhay5lbmQubX0g4oCSICR7b3B0cy50aW1ldGFibGVbaV0uY2xvc2UuaH06JHtvcHRzLnRpbWV0YWJsZVtpXS5jbG9zZS5tfTwvcD5gO1xyXG4gICAgICAgICAgICBhZnRlcm5vb24uY2xhc3NMaXN0LmFkZCgnZmlsbGVkJyk7IC8vIEFmdGVybm9vblxyXG4gICAgICAgICAgICBhZnRlcm5vb24uY2xhc3NMaXN0LmFkZCgnc3BsaXRlZCcpOyAvLyBBZnRlcm5vb25cclxuICAgICAgICAgIH0gZWxzZSBpZiAob3B0cy50aW1ldGFibGVbaV0ub3Blbi5oICYmIG9wdHMudGltZXRhYmxlW2ldLmNsb3NlLmgpIHtcclxuICAgICAgICAgICAgbW9ybmluZy5pbm5lckhUTUwgPSBgPHA+JHtvcHRzLnRpbWV0YWJsZVtpXS5vcGVuLmh9OiR7b3B0cy50aW1ldGFibGVbaV0ub3Blbi5tfTwvcD5gO1xyXG4gICAgICAgICAgICBtb3JuaW5nLmNsYXNzTGlzdC5hZGQoJ2ZpbGxlZCcpOyAvLyBNb3JuaW5nXHJcbiAgICAgICAgICAgIGFmdGVybm9vbi5pbm5lckhUTUwgPSBgPHA+JHtvcHRzLnRpbWV0YWJsZVtpXS5jbG9zZS5ofToke29wdHMudGltZXRhYmxlW2ldLmNsb3NlLm19PC9wPmA7XHJcbiAgICAgICAgICAgIGFmdGVybm9vbi5jbGFzc0xpc3QuYWRkKCdmaWxsZWQnKTsgLy8gQWZ0ZXJub29uXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBtb3JuaW5nLmlubmVySFRNTCA9IGA8cD4wMDowMDwvcD5gO1xyXG4gICAgICAgICAgICBtb3JuaW5nLmNsYXNzTGlzdC5hZGQoJ2ZpbGxlZCcpOyAvLyBNb3JuaW5nXHJcbiAgICAgICAgICAgIGFmdGVybm9vbi5pbm5lckhUTUwgPSBgPHA+MjQ6MDA8L3A+YDtcclxuICAgICAgICAgICAgYWZ0ZXJub29uLmNsYXNzTGlzdC5hZGQoJ2ZpbGxlZCcpOyAvLyBBZnRlcm5vb25cclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZGF5RG9tLmxhc3RFbGVtZW50Q2hpbGQuaW5uZXJIVE1MID0gYDxkaXYgY2xhc3M9XCJjbG9zZWRcIj48cD5GZXJtw6k8L3A+PC9kaXY+YDsgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIE1hdGNoaW5nIHRvZGF5J3MgZGF5XHJcbiAgICAgICAgaWYgKGkgPT09IGRheU9mV2Vlaykge1xyXG4gICAgICAgICAgZGF5RG9tLmNsYXNzTGlzdC5hZGQoJ3RvZGF5Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIFxyXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWwtb3ZlcmxheScpLmFwcGVuZENoaWxkKGRvbSk7XHJcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RhbC1vdmVybGF5Jykuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcclxuXHRcdFx0c2V0VGltZW91dCgoKSA9PiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWwtb3ZlcmxheScpLnN0eWxlLm9wYWNpdHkgPSAxLCA1MCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4vKiBTZWFyY2ggbW9kYWwgbWV0aG9kcyAqL1xyXG5cclxuLypcclxuICBfc2VhcmNoTW9kYWwoKSB7XHJcbiAgICB0aGlzLl9mZXRjaE1vZGFsKCdzZWFyY2htb2RhbCcpLnRoZW4oZG9tID0+IHtcclxuICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMuX21hcmtzKTtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgZG9tLmZpcnN0RWxlbWVudENoaWxkLmFwcGVuZENoaWxkKHRoaXMuX2NyZWF0ZU1hcmtDYXRlZ29yeVNlYXJjaEljb24oa2V5c1tpXSkpO1xyXG4gICAgICB9XHJcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RhbC1vdmVybGF5JykuYXBwZW5kQ2hpbGQoZG9tKTtcclxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsLW92ZXJsYXknKS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG5cdFx0XHRzZXRUaW1lb3V0KCgpID0+IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RhbC1vdmVybGF5Jykuc3R5bGUub3BhY2l0eSA9IDEsIDUwKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG4gIF9jcmVhdGVNYXJrQ2F0ZWdvcnlTZWFyY2hJY29uKHR5cGUpIHtcclxuICAgIGNvbnN0IGRvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xyXG4gICAgY29uc3QgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnSU1HJyk7XHJcbiAgICBjb25zdCBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ1AnKTtcclxuICAgIGRvbS5jbGFzc0xpc3QuYWRkKCdmaWx0ZXJpbmctZWxlbWVudCcpO1xyXG4gICAgaW1nLnNyYyA9IGAvYXNzZXRzL2ltZy9tYXJrZXIvJHt0eXBlfS5zdmdgO1xyXG4gICAgbGFiZWwuaW5uZXJIVE1MID0gdHlwZTtcclxuICAgIGRvbS5hcHBlbmRDaGlsZChpbWcpO1xyXG4gICAgZG9tLmFwcGVuZENoaWxkKGxhYmVsKTtcclxuICAgIHJldHVybiBkb207XHJcbiAgfVxyXG4qL1xyXG5cclxuICAvKiBNb2RhbCBtZXRob2RzICovXHJcblxyXG4gIGZldGNoTW9kYWwodXJsKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICAgIGZldGNoKGAvYXNzZXRzL2h0bWwvJHt1cmx9Lmh0bWxgKS50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgIGRhdGEudGV4dCgpLnRoZW4oaHRtbCA9PiB7XHJcbiAgICAgICAgICByZXNvbHZlKGRvY3VtZW50LmNyZWF0ZVJhbmdlKCkuY3JlYXRlQ29udGV4dHVhbEZyYWdtZW50KGh0bWwpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG5cclxuICBjbG9zZU1vZGFsKGV2ZW50LCBmb3JjZSkge1xyXG5cdFx0aWYgKGZvcmNlID09PSB0cnVlIHx8IGV2ZW50LnRhcmdldC5pZCA9PT0gJ21vZGFsLW92ZXJsYXknIHx8IGV2ZW50LnRhcmdldC5pZC5pbmRleE9mKCdjbG9zZScpICE9PSAtMSkge1xyXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWwtb3ZlcmxheScpLnN0eWxlLm9wYWNpdHkgPSAwO1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWwtb3ZlcmxheScpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsLW92ZXJsYXknKS5pbm5lckhUTUwgPSAnJztcclxuICAgICAgfSwgMzAwKTtcclxuICAgIH1cclxuICB9XHJcblxyXG5cclxuICBnZXQgdXNlcigpIHtcclxuICAgIHJldHVybiB0aGlzLl91c2VyO1xyXG4gIH1cclxuXHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBNb25Eb3VyZGFubmFpcztcclxuIl0sIm5hbWVzIjpbIk1hcmtlcnMiLCJVdGlscyIsIk1hcCIsIm9wdGlvbnMiLCJfY2xhc3NDYWxsQ2hlY2siLCJfaWQiLCJ0YXJnZXRJZCIsIl9tYXAiLCJfbWFya3MiLCJfcG9seWdvbnMiLCJfbGF5ZXJzIiwiQ2FydGUiLCJTYXRlbGxpdGUiLCJfaW5pdCIsIl9ldmVudHMiLCJfY3JlYXRlQ2xhc3MiLCJrZXkiLCJ2YWx1ZSIsIndpbmRvdyIsIkwiLCJtYXAiLCJ6b29tQ29udHJvbCIsInNldFZpZXciLCJDQ0RIX0NFTlRFUiIsIkxBVCIsIkxORyIsImNvbnRyb2wiLCJzY2FsZSIsImFkZFRvIiwic2V0TWF4Qm91bmRzIiwiTUFQX0JPVU5EUyIsIk9TTV9MQVlFUiIsIkVTUklfTEFZRVIiLCJsYXllcnMiLCJwb3NpdGlvbiIsIl90aGlzIiwib24iLCJfbWFwQ2xpY2tlZCIsImJpbmQiLCJwYW5JbnNpZGVCb3VuZHMiLCJhbmltYXRlIiwib3B0cyIsImNvbnNvbGUiLCJsb2ciLCJsYXRsbmciLCJKU09OIiwic3RyaW5naWZ5IiwibGF0IiwibG5nIiwiZHJhd1VzZXJNYXJrZXIiLCJtZCIsInVzZXIiLCJtYXJrZXIiLCJpY29uIiwic2V0TGF0TG5nIiwiYWRkTWFyayIsImNyZWF0ZVBvcHVwIiwiX3RoaXMyIiwidHlwZXMiLCJ0eXBlIiwic3BsaXQiLCJsZW5ndGgiLCJjb25jYXQiLCJmbHlUbyIsImJpbmRQb3B1cCIsImkiLCJwdXNoIiwiYWRkUG9seWdvbiIsInBvbHlnb24iLCJPYmplY3QiLCJmcmVlemUiLCJyZXN0YXVyYW50IiwiSWNvbiIsImljb25VcmwiLCJpY29uU2l6ZSIsImljb25BbmNob3IiLCJwb3B1cEFuY2hvciIsInNoYWRvd1VybCIsInNoYWRvd1NpemUiLCJzaGFkb3dBbmNob3IiLCJiYXIiLCJ0b2JhY2NvIiwiY2VsbGFyIiwiZ3JvY2VyeSIsInNwb3J0IiwiYmFrZXJ5Iiwic3RvcmUiLCJib29rIiwibGFuZG1hcmsiLCJjcmFmdCIsImdhcmRlbiIsImNhciIsImdhcyIsImFuaW1hbCIsIm1haWwiLCJwYXJrIiwicmVjeWNsZSIsImFkbWluaXN0cmF0aW9uIiwiYmFuayIsIm1lZGljYWwiLCJkZWNvIiwiYmFyc3RvcmUiLCJnZXREaXN0YW5jZUJldHdlZW5Db29yZHMiLCJmcm9tIiwidG8iLCJsb24xIiwiTWF0aCIsIlBJIiwibGF0MSIsImxvbjIiLCJsYXQyIiwiZGVsdGFMYXQiLCJkZWx0YUxvbiIsImEiLCJwb3ciLCJzaW4iLCJjb3MiLCJjIiwiYXNpbiIsInNxcnQiLCJjb252ZXJ0RGlzdGFuY2VUb1N0cmluZyIsImRpc3RhbmNlIiwicHJlY2lzaW9uUm91bmQiLCJidWlsZERpc3RhbmNlRVRBIiwiY2FyTWludXRlcyIsImNhclNlY29uZHMiLCJmbG9vciIsIndhbGtNaW51dGVzIiwid2Fsa1NlY29uZHMiLCJ3YWxrIiwicHJlY2lzaW9uIiwibXVsdGlwbGllciIsInJvdW5kIiwibGF0TG5nQm91bmRzIiwibGF0TG5nIiwidGlsZUxheWVyIiwiYXR0cmlidXRpb24iLCJtYXhab29tIiwibWluWm9vbSIsIk1vbkRvdXJkYW5uYWlzIiwiX2RhdGEiLCJfdXNlciIsIkhPTUVfTEFUIiwiSE9NRV9MTkciLCJhY2N1cmFjeSIsIl9pbml0R2VvbG9jYXRpb24iLCJ0aGVuIiwiX2ZldGNoTWFya2VycyIsIl9pbml0TWFwIiwiX2luaXRFdmVudHMiLCJfYnVpbGRNYXJrZXJzIiwiX2J1aWxkUG9seWdvbnMiLCJQcm9taXNlIiwicmVzb2x2ZSIsIm5hdmlnYXRvciIsImVuYWJsZUhpZ2hBY2N1cmFjeSIsIm1heGltdW1BZ2UiLCJ0aW1lb3V0IiwiX3dhdGNoSWQiLCJnZW9sb2NhdGlvbiIsIndhdGNoUG9zaXRpb24iLCJjb29yZHMiLCJsYXRpdHVkZSIsImxvbmdpdHVkZSIsImZldGNoIiwiZGF0YSIsImpzb24iLCJqc29uRGF0YSIsIl90aGlzMyIsIl90aGlzNCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJhZGRFdmVudExpc3RlbmVyIiwiY2xvc2VNb2RhbCIsIl90aGlzNSIsImtleXMiLCJtYXJrZXJzIiwiaiIsIl9jcmVhdGVNYXJrZXJQb3B1cCIsIl90aGlzNiIsImNpdHlCb3VuZHMiLCJkb20iLCJjcmVhdGVFbGVtZW50IiwidGl0bGUiLCJhZGRyZXNzIiwidG93biIsInBob25lIiwid2Vic2l0ZSIsImluZm8iLCJvcGVuV2l0aCIsImNsYXNzTGlzdCIsImFkZCIsImlubmVySFRNTCIsIm5hbWUiLCJocmVmIiwic2V0QXR0cmlidXRlIiwiYXBwZW5kQ2hpbGQiLCJidXR0b24iLCJfbWFya2VyT3BlbmVkU3RhdGUiLCJ0aW1ldGFibGUiLCJfdGltZXRiYWxlTW9kYWwiLCJzdGF0ZSIsIm1vcmUiLCJfY2hlY2tUaW1lIiwic2V0SW50ZXJ2YWwiLCJfbWFya2VySXNPcGVuZWQiLCJub3ciLCJEYXRlIiwiaG91ciIsImdldEhvdXJzIiwibWludXRlcyIsImdldE1pbnV0ZXMiLCJkYXlPZldlZWsiLCJnZXREYXkiLCJvcGVuaW5nVGltZSIsInBhcnNlSW50Iiwib3BlbiIsImgiLCJtIiwiY2xvc2luZ1RpbWUiLCJjbG9zZSIsImN1cnJlbnRUaW1lIiwiaXNPcGVuIiwiaXNOYU4iLCJoYXNCcmVhayIsImJyZWFrT3BlbmluZ1RpbWUiLCJlbmQiLCJicmVha0Nsb3NpbmdUaW1lIiwic3RhcnQiLCJfbWFya2VySXNDbG9zZWQiLCJhbHdheXNPcGVuZWQiLCJmaXJzdENoaWxkIiwibGFzdENoaWxkIiwicmVtb3ZlIiwiX3RoaXM3IiwiZmV0Y2hNb2RhbCIsInF1ZXJ5U2VsZWN0b3IiLCJldGEiLCJkYXlEb20iLCJjaGlsZHJlbiIsIm1vcm5pbmciLCJsYXN0RWxlbWVudENoaWxkIiwiZmlyc3RFbGVtZW50Q2hpbGQiLCJhZnRlcm5vb24iLCJzdHlsZSIsImRpc3BsYXkiLCJzZXRUaW1lb3V0Iiwib3BhY2l0eSIsInVybCIsInRleHQiLCJodG1sIiwiY3JlYXRlUmFuZ2UiLCJjcmVhdGVDb250ZXh0dWFsRnJhZ21lbnQiLCJldmVudCIsImZvcmNlIiwidGFyZ2V0IiwiaWQiLCJpbmRleE9mIiwiZ2V0Il0sInNvdXJjZVJvb3QiOiIifQ==
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
  defibrillator: new window.L.Icon({
    iconUrl: 'assets/img/marker/defibrillator.svg',
    iconSize: [26, 26],
    iconAnchor: [13, 13],
    popupAnchor: [0, -13],
    shadowUrl: 'assets/img/marker/marker-shadow.png',
    shadowSize: [42, 42],
    shadowAnchor: [20, 20]
  }),
  cemetery: new window.L.Icon({
    iconUrl: 'assets/img/marker/cemetery.svg',
    iconSize: [26, 26],
    iconAnchor: [13, 13],
    popupAnchor: [0, -13],
    shadowUrl: 'assets/img/marker/marker-shadow.png',
    shadowSize: [42, 42],
    shadowAnchor: [20, 20]
  }),
  firefighter: new window.L.Icon({
    iconUrl: 'assets/img/marker/firefighter.svg',
    iconSize: [26, 26],
    iconAnchor: [13, 13],
    popupAnchor: [0, -13],
    shadowUrl: 'assets/img/marker/marker-shadow.png',
    shadowSize: [42, 42],
    shadowAnchor: [20, 20]
  }),
  police: new window.L.Icon({
    iconUrl: 'assets/img/marker/police.svg',
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGRSxNQUFNLEVBQUUsSUFBSS9ELE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lBQ3hCQyxPQUFPLEVBQUUsOEJBQThCO0lBQ3ZDQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xCQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BCQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGRyxPQUFPLEVBQUUsSUFBSWhFLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lBQ3pCQyxPQUFPLEVBQUUsK0JBQStCO0lBQ3hDQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xCQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BCQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGSSxJQUFJLEVBQUUsSUFBSWpFLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lBQ3RCQyxPQUFPLEVBQUUsNEJBQTRCO0lBQ3JDQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xCQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BCQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGSyxLQUFLLEVBQUUsSUFBSWxFLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lBQ3ZCQyxPQUFPLEVBQUUsNkJBQTZCO0lBQ3RDQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xCQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BCQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGTSxRQUFRLEVBQUUsSUFBSW5FLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lBQzFCQyxPQUFPLEVBQUUsZ0NBQWdDO0lBQ3pDQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xCQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BCQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGTyxLQUFLLEVBQUUsSUFBSXBFLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lBQ3ZCQyxPQUFPLEVBQUUsNkJBQTZCO0lBQ3RDQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xCQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BCQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGUSxNQUFNLEVBQUUsSUFBSXJFLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lBQ3hCQyxPQUFPLEVBQUUsOEJBQThCO0lBQ3ZDQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xCQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BCQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGUyxNQUFNLEVBQUUsSUFBSXRFLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lBQ3hCQyxPQUFPLEVBQUUsNkJBQTZCO0lBQ3RDQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xCQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BCQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGVSxJQUFJLEVBQUUsSUFBSXZFLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lBQ3RCQyxPQUFPLEVBQUUsNEJBQTRCO0lBQ3JDQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xCQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BCQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGVyxRQUFRLEVBQUUsSUFBSXhFLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lBQzFCQyxPQUFPLEVBQUUsZ0NBQWdDO0lBQ3pDQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xCQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BCQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGWSxNQUFNLEVBQUUsSUFBSXpFLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lBQ3hCQyxPQUFPLEVBQUUsOEJBQThCO0lBQ3ZDQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xCQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BCQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGYSxNQUFNLEVBQUUsSUFBSTFFLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lBQ3hCQyxPQUFPLEVBQUUsOEJBQThCO0lBQ3ZDQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xCQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BCQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGYyxNQUFNLEVBQUUsSUFBSTNFLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lBQ3hCQyxPQUFPLEVBQUUsOEJBQThCO0lBQ3ZDQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xCQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BCQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGZSxHQUFHLEVBQUUsSUFBSTVFLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lB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QSxFQUFXO01BQ1QsT0FBTyxJQUFJLENBQUNqSSxLQUFLO0lBQ25CO0VBQUM7RUFBQSxPQUFBRixrQkFBQTtBQUFBO0FBS0gsaUVBQWVBLGtCQUFrQixFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vRG91cmRhbm5haXNFeHBsb3JlLy4vc3JjL2pzL3V0aWxzL01hcC5qcyIsIndlYnBhY2s6Ly9Eb3VyZGFubmFpc0V4cGxvcmUvLi9zcmMvanMvdXRpbHMvTWFya2VyRW51bS5qcyIsIndlYnBhY2s6Ly9Eb3VyZGFubmFpc0V4cGxvcmUvLi9zcmMvanMvdXRpbHMvVXRpbHMuanMiLCJ3ZWJwYWNrOi8vRG91cmRhbm5haXNFeHBsb3JlLy4vc3JjL3Njc3MvRG91cmRhbm5haXNFeHBsb3JlLnNjc3MiLCJ3ZWJwYWNrOi8vRG91cmRhbm5haXNFeHBsb3JlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0RvdXJkYW5uYWlzRXhwbG9yZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vRG91cmRhbm5haXNFeHBsb3JlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vRG91cmRhbm5haXNFeHBsb3JlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vRG91cmRhbm5haXNFeHBsb3JlLy4vc3JjL2pzL0RvdXJkYW5uYWlzRXhwbG9yZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTWFya2VycyBmcm9tICcuL01hcmtlckVudW0uanMnO1xyXG5pbXBvcnQgVXRpbHMgZnJvbSAnLi9VdGlscy5qcyc7XHJcblxyXG5cclxuY2xhc3MgTWFwIHtcclxuXHJcblxyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuICAgIHRoaXMuX2lkID0gb3B0aW9ucy50YXJnZXRJZDtcclxuICAgIHRoaXMuX21hcCA9IG51bGw7XHJcbiAgICB0aGlzLl9tYXJrcyA9IHt9O1xyXG4gICAgdGhpcy5fcG9seWdvbnMgPSBbXTtcclxuICAgIHRoaXMuX2xheWVycyA9IHtcclxuICAgICAgQ2FydGU6IG51bGwsXHJcbiAgICAgIFNhdGVsbGl0ZTogbnVsbFxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLl9pbml0KCk7XHJcbiAgICB0aGlzLl9ldmVudHMoKTtcclxuICB9XHJcblxyXG5cclxuICBfaW5pdCgpIHtcclxuICAgIC8vIFVzZSBtYWluIGRpdiB0byBpbmplY3QgT1NNIGludG9cclxuICAgIHRoaXMuX21hcCA9IHdpbmRvdy5MLm1hcCh0aGlzLl9pZCwge1xyXG4gICAgICB6b29tQ29udHJvbDogZmFsc2UsXHJcbiAgICB9KS5zZXRWaWV3KFtVdGlscy5DQ0RIX0NFTlRFUi5MQVQsIFV0aWxzLkNDREhfQ0VOVEVSLkxOR10sIDEyKTtcclxuICAgIC8vIEFkZCBtZXRlciBhbmQgZmVldCBzY2FsZSBvbiBtYXBcclxuICAgIHdpbmRvdy5MLmNvbnRyb2wuc2NhbGUoKS5hZGRUbyh0aGlzLl9tYXApO1xyXG4gICAgLy8gUHJldmVudCBwYW5uaW5nIG91dHNpZGUgb2YgdGhlIG1hcCBib3VuZHMgZGVmaW5pbmVkIGluIHV0aWxzXHJcbiAgICB0aGlzLl9tYXAuc2V0TWF4Qm91bmRzKFV0aWxzLk1BUF9CT1VORFMpO1xyXG4gICAgLy8gQWRkIGxheWVyIGdyb3VwIHRvIGludGVyZmFjZSBhbmQgc3RhcnQgbWFwIHdpdGggb3NtIGRlZmF1bHRcclxuICAgIHRoaXMuX2xheWVycy5DYXJ0ZSA9IFV0aWxzLk9TTV9MQVlFUjtcclxuICAgIHRoaXMuX2xheWVycy5TYXRlbGxpdGUgPSBVdGlscy5FU1JJX0xBWUVSO1xyXG4gICAgdGhpcy5fbGF5ZXJzLkNhcnRlLmFkZFRvKHRoaXMuX21hcCk7XHJcbiAgICAvLyBBZGQgbGF5ZXIgc3dpdGNoIHJhZGlvIG9uIGJvdHRvbSByaWdodCBvZiB0aGUgbWFwXHJcbiAgICB3aW5kb3cuTC5jb250cm9sLmxheWVycyh0aGlzLl9sYXllcnMsIHt9LCB7IHBvc2l0aW9uOiAnYm90dG9tcmlnaHQnIH0pLmFkZFRvKHRoaXMuX21hcCk7XHJcbiAgfVxyXG5cclxuXHJcbiAgX2V2ZW50cygpIHtcclxuICAgIC8vIFN1YnNjcmliZSB0byBjbGljayBldmVudCBvbiBtYXAgdG8gcmVhY3RcclxuICAgIHRoaXMuX21hcC5vbignY2xpY2snLCB0aGlzLl9tYXBDbGlja2VkLmJpbmQodGhpcykpO1xyXG4gICAgLy8gTWFwIGlzIGRyYWdnZWQgYnkgdXNlciBtb3VzZS9maW5nZXJcclxuICAgIHRoaXMuX21hcC5vbignZHJhZycsICgpID0+IHtcclxuICAgICAgLy8gQ29uc3RyYWluIHBhbiB0byB0aGUgbWFwIGJvdW5kc1xyXG4gICAgICB0aGlzLl9tYXAucGFuSW5zaWRlQm91bmRzKFV0aWxzLk1BUF9CT1VORFMsIHsgYW5pbWF0ZTogdHJ1ZSB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG4gIF9tYXBDbGlja2VkKG9wdHMpIHtcclxuICAgIGNvbnNvbGUubG9nKG9wdHMubGF0bG5nLCBKU09OLnN0cmluZ2lmeShvcHRzLmxhdGxuZy5sYXQgKyAnLCAnICsgb3B0cy5sYXRsbmcubG5nKSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgZHJhd1VzZXJNYXJrZXIoKSB7XHJcbiAgICBpZiAoIXdpbmRvdy5keC51c2VyLm1hcmtlcikge1xyXG4gICAgICB3aW5kb3cuZHgudXNlci5tYXJrZXIgPSB3aW5kb3cuTC5tYXJrZXIoW3dpbmRvdy5keC51c2VyLmxhdCwgd2luZG93LmR4LnVzZXIubG5nXSwge1xyXG4gICAgICAgIGljb246IE1hcmtlcnMudXNlclxyXG4gICAgICB9KTtcclxuICAgICAgd2luZG93LmR4LnVzZXIubWFya2VyLmFkZFRvKHRoaXMuX21hcCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB3aW5kb3cuZHgudXNlci5tYXJrZXIuc2V0TGF0TG5nKHdpbmRvdy5keC51c2VyKTtcclxuICAgIH1cclxuICB9XHJcblxyXG5cclxuICBhZGRNYXJrKG9wdHMsIGNyZWF0ZVBvcHVwKSB7XHJcbiAgICBsZXQgdHlwZXMgPSBvcHRzLnR5cGUuc3BsaXQoJy8nKTtcclxuICAgIGxldCB0eXBlID0gb3B0cy50eXBlO1xyXG4gICAgaWYgKHR5cGVzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgdHlwZSA9IGAke3R5cGVzWzBdfSR7dHlwZXNbMV19YDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBtYXJrZXIgPSB3aW5kb3cuTC5tYXJrZXIoW29wdHMubGF0LCBvcHRzLmxuZ10sIHsgXHJcbiAgICAgIGljb246IE1hcmtlcnNbdHlwZV1cclxuICAgIH0pLm9uKCdjbGljaycsICgpID0+IHtcclxuICAgICAgdGhpcy5fbWFwLmZseVRvKFtvcHRzLmxhdCwgb3B0cy5sbmddLCAxOCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBtYXJrZXIuYmluZFBvcHVwKGNyZWF0ZVBvcHVwKG9wdHMpKTtcclxuICAgIG1hcmtlci5hZGRUbyh0aGlzLl9tYXApO1xyXG4gICAgaWYgKHR5cGVzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0eXBlcy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgIGlmICghdGhpcy5fbWFya3NbdHlwZXNbaV1dKSB7XHJcbiAgICAgICAgICB0aGlzLl9tYXJrc1t0eXBlc1tpXV0gPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbWFya3NbdHlwZXNbaV1dLnB1c2gobWFya2VyKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKCF0aGlzLl9tYXJrc1t0eXBlXSkge1xyXG4gICAgICAgIHRoaXMuX21hcmtzW3R5cGVdID0gW107XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5fbWFya3NbdHlwZV0ucHVzaChtYXJrZXIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIGFkZFBvbHlnb24ocG9seWdvbikge1xyXG4gICAgdGhpcy5fcG9seWdvbnMucHVzaCh3aW5kb3cuTC5wb2x5Z29uKHBvbHlnb24pLmFkZFRvKHRoaXMuX21hcCkpO1xyXG4gIH1cclxuXHJcblxyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTWFwO1xyXG4iLCJleHBvcnQgZGVmYXVsdCBPYmplY3QuZnJlZXplKHtcclxuICByZXN0YXVyYW50OiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvcmVzdGF1cmFudC5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgYmFyOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvYmFyLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBjZWxsYXI6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9jZWxsYXIuc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIGdyb2Nlcnk6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9ncm9jZXJ5LnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBmb290OiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvZm9vdC5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgcnVnYnk6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9ydWdieS5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgcGluZ3Bvbmc6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9waW5ncG9uZy5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgYm9jY2U6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9ib2NjZS5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgdGVubmlzOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvdGVubmlzLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBiYWtlcnk6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9icmVhZC5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgYm9vazogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL2Jvb2suc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIGxhbmRtYXJrOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbGFuZG1hcmsuc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIGNhc3RsZTogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL2Nhc3RsZS5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgY2h1cmNoOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvY2h1cmNoLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBnYXJkZW46IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9nYXJkZW4uc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIGNhcjogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL2Nhci5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgdHJhaW46IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci90cmFpbi5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgYW5pbWFsOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvYW5pbWFsLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBkZW50YWw6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9kZW50YWwuc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIHBoYXJtYWN5OiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvcGhhcm1hY3kuc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIGRlZmlicmlsbGF0b3I6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9kZWZpYnJpbGxhdG9yLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBjZW1ldGVyeTogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL2NlbWV0ZXJ5LnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBmaXJlZmlnaHRlcjogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL2ZpcmVmaWdodGVyLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBwb2xpY2U6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9wb2xpY2Uuc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIG1haWw6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYWlsLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBwYXJrOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvcGFyay5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgcmVjeWNsZTogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL3JlY3ljbGUuc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIGFkbWluaXN0cmF0aW9uOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvYWRtaW5pc3RyYXRpb24uc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIHNjaG9vbDogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL3NjaG9vbC5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgdXNlcjogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL3VzZXIuc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdXHJcbiAgfSlcclxufSk7XHJcbiIsImNvbnN0IGdldERpc3RhbmNlQmV0d2VlbkNvb3JkcyA9IChmcm9tLCB0bykgPT4ge1xyXG4gIC8vIFJldHVybiBkaXN0YW5jZSBpbiBtZXRlcnNcclxuICBjb25zdCBsb24xID0gKGZyb21bMV0gKiBNYXRoLlBJKSAvIDE4MCxcclxuICAgIGxhdDEgPSAoZnJvbVswXSAqIE1hdGguUEkpIC8gMTgwLFxyXG4gICAgbG9uMiA9ICh0b1sxXSAqIE1hdGguUEkpIC8gMTgwLFxyXG4gICAgbGF0MiA9ICh0b1swXSAqIE1hdGguUEkpIC8gMTgwO1xyXG5cclxuICBjb25zdCBkZWx0YUxhdCA9IGxhdDIgLSBsYXQxO1xyXG4gIGNvbnN0IGRlbHRhTG9uID0gbG9uMiAtIGxvbjE7XHJcblxyXG4gIGNvbnN0IGEgPSBNYXRoLnBvdyhNYXRoLnNpbihkZWx0YUxhdCAvIDIpLCAyKSArIE1hdGguY29zKGxhdDEpICogTWF0aC5jb3MobGF0MikgKiBNYXRoLnBvdyhNYXRoLnNpbihkZWx0YUxvbiAvIDIpLCAyKTtcclxuICBjb25zdCBjID0gMiAqIE1hdGguYXNpbihNYXRoLnNxcnQoYSkpO1xyXG4gIHJldHVybiBjICogNjM3MSAqIDEwMDA7XHJcbn07XHJcblxyXG5cclxuY29uc3QgY29udmVydERpc3RhbmNlVG9TdHJpbmcgPSBkaXN0YW5jZSA9PiB7XHJcbiAgaWYgKGRpc3RhbmNlID4gMTAwMCkge1xyXG4gICAgZGlzdGFuY2UgPSBgJHtwcmVjaXNpb25Sb3VuZChkaXN0YW5jZSAvIDEwMDAsIDIpfWttYDtcclxuICB9IGVsc2Uge1xyXG4gICAgZGlzdGFuY2UgPSBgJHtwcmVjaXNpb25Sb3VuZChkaXN0YW5jZSwgMil9bWA7XHJcbiAgfVxyXG4gIHJldHVybiBkaXN0YW5jZTtcclxufTtcclxuXHJcblxyXG5jb25zdCBidWlsZERpc3RhbmNlRVRBID0gZGlzdGFuY2UgPT4ge1xyXG4gIGxldCBjYXJNaW51dGVzID0gMDtcclxuICBsZXQgY2FyU2Vjb25kcyA9IDA7XHJcblxyXG4gIGlmIChkaXN0YW5jZSA+IDUwMDAwKSB7XHJcbiAgICAvLyBPdmVyIDUwa20sIHdlIHVzZSBhdmVyYWdlIHNwZWVkIG9mIDEwMGttaFxyXG4gICAgY2FyTWludXRlcyA9IChkaXN0YW5jZSAvIDEwMDAwMCkgKiA2MDtcclxuICB9IGVsc2UgaWYgKGRpc3RhbmNlID4gMTAwMDApIHtcclxuICAgIC8vIE92ZXIgMTBrbSwgd2UgdXNlIGF2ZXJhZ2Ugc3BlZWQgb2YgNjBrbS9oXHJcbiAgICBjYXJNaW51dGVzID0gKGRpc3RhbmNlIC8gNjAwMDApICogNjA7XHJcbiAgfSBlbHNlIHtcclxuICAgIC8vIFVuZGVyIDEwa20gd2UgdXNlciBhdmVyYWdlIHNwZWVkIG9mIDMwa20vaFxyXG4gICAgY2FyTWludXRlcyA9IChkaXN0YW5jZSAvIDMwMDAwKSAqIDYwO1xyXG4gIH1cclxuXHJcbiAgY2FyU2Vjb25kcyA9IGNhck1pbnV0ZXMgJSAxOyAvLyBLZWVwIGZsb2F0aW5nIHZhbHVlIGZvciBzZWNvbmRzIGNvbXB1dGluZ1xyXG4gIGNhck1pbnV0ZXMgPSBNYXRoLmZsb29yKGNhck1pbnV0ZXMpOyAvLyBSZW1vdmUgZmxvYXRpbmcgdmFsdWVcclxuXHJcbiAgaWYgKGNhck1pbnV0ZXMgPiA2MCkge1xyXG4gICAgY2FyTWludXRlcyA9IGAke01hdGguZmxvb3IoY2FyTWludXRlcyAvIDYwKX1oICR7Y2FyTWludXRlcyAlIDYwfW1gO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBjYXJNaW51dGVzID0gYCR7Y2FyTWludXRlc31tYDtcclxuICB9XHJcblxyXG4gIGxldCB3YWxrTWludXRlcyA9IChkaXN0YW5jZSAvIDUwMDApICogNjA7XHJcbiAgbGV0IHdhbGtTZWNvbmRzID0gd2Fsa01pbnV0ZXMgJSAxO1xyXG4gIHdhbGtNaW51dGVzID0gTWF0aC5mbG9vcih3YWxrTWludXRlcyk7IC8vIFJlbW92ZSBmbG9hdGluZyB2YWx1ZVxyXG5cclxuICBpZiAod2Fsa01pbnV0ZXMgPiA2MCkge1xyXG4gICAgd2Fsa01pbnV0ZXMgPSBgJHtNYXRoLmZsb29yKHdhbGtNaW51dGVzIC8gNjApfWggJHt3YWxrTWludXRlcyAlIDYwfW1gO1xyXG4gIH0gZWxzZSB7XHJcbiAgICB3YWxrTWludXRlcyA9IGAke3dhbGtNaW51dGVzfW1gO1xyXG4gIH0gIFxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgY2FyOiBgJHtjYXJNaW51dGVzfSAke01hdGguZmxvb3IocHJlY2lzaW9uUm91bmQoKGNhclNlY29uZHMgLyAxMDApICogNjAsIDIpICogMTAwKX1zYCxcclxuICAgIHdhbGs6IGAke3dhbGtNaW51dGVzfSAke01hdGguZmxvb3IocHJlY2lzaW9uUm91bmQoKHdhbGtTZWNvbmRzIC8gMTAwKSAqIDYwLCAyKSAqIDEwMCl9c2AsXHJcbiAgfTtcclxufTtcclxuXHJcblxyXG5jb25zdCBwcmVjaXNpb25Sb3VuZCA9ICh2YWx1ZSwgcHJlY2lzaW9uKSA9PiB7XHJcbiAgY29uc3QgbXVsdGlwbGllciA9IE1hdGgucG93KDEwLCBwcmVjaXNpb24gfHwgMCk7XHJcbiAgcmV0dXJuIE1hdGgucm91bmQodmFsdWUgKiBtdWx0aXBsaWVyKSAvIG11bHRpcGxpZXI7XHJcbn07XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIENDREhfQ0VOVEVSOiB7XHJcbiAgICBMQVQ6IDQ4LjUzMTgzOTA2NDQxOTYyLFxyXG4gICAgTE5HOiAyLjA1Mzc1NjcxMzg2NzE4OFxyXG4gIH0sXHJcbiAgQ0NESF9DSVRJRVM6IFsnQlJYJywgJ0NPUicsICdEUkQnLCAnTEZSJywgJ0xHUicsICdSSUMnLCAnUk9WJywgJ1NDRCcsICdTRVInLCAnU1RDJywgJ1ZTRyddLFxyXG4gIE1BUF9CT1VORFM6IHdpbmRvdy5MLmxhdExuZ0JvdW5kcyhcclxuICAgIHdpbmRvdy5MLmxhdExuZyg0OC42Nzk0MDA3MTU5NjM4OTQsIDEuNzM5MDYwNjY4OTQ1MzEyNyksXHJcbiAgICB3aW5kb3cuTC5sYXRMbmcoNDguMzg0MzkwNzQxNTE4NjYsIDIuMzQzMzk1OTk2MDkzNzUwKVxyXG4gICksXHJcbiAgT1NNX0xBWUVSOiB3aW5kb3cuTC50aWxlTGF5ZXIoJ2h0dHBzOi8ve3N9LnRpbGUub3BlbnN0cmVldG1hcC5vcmcve3p9L3t4fS97eX0ucG5nJywge1xyXG4gICAgYXR0cmlidXRpb246ICcmY29weTsgPGEgaHJlZj1cImh0dHBzOi8vd3d3Lm9wZW5zdHJlZXRtYXAub3JnL2NvcHlyaWdodFwiPk9wZW5TdHJlZXRNYXA8L2E+JyxcclxuICAgIG1heFpvb206IDE5LFxyXG4gICAgbWluWm9vbTogMTJcclxuICB9KSxcclxuICBFU1JJX0xBWUVSOiB3aW5kb3cuTC50aWxlTGF5ZXIoJ2h0dHBzOi8vc2VydmVyLmFyY2dpc29ubGluZS5jb20vQXJjR0lTL3Jlc3Qvc2VydmljZXMvV29ybGRfSW1hZ2VyeS9NYXBTZXJ2ZXIvdGlsZS97en0ve3l9L3t4fScsIHtcclxuICAgIGF0dHJpYnV0aW9uOiAnJmNvcHk7IDxhIGhyZWY9XCJodHRwczovL3d3dy5hcmNnaXMuY29tL2hvbWUvaXRlbS5odG1sP2lkPTEwZGYyMjc5Zjk2ODRlNGE5ZjZhN2YwOGZlYmFjMmE5XCI+RXNyaSBJbWFnZXJ5PC9hPicsXHJcbiAgICBtYXhab29tOiAxOSxcclxuICAgIG1pblpvb206IDEyXHJcbiAgfSksXHJcbiAgZ2V0RGlzdGFuY2VCZXR3ZWVuQ29vcmRzOiBnZXREaXN0YW5jZUJldHdlZW5Db29yZHMsXHJcbiAgY29udmVydERpc3RhbmNlVG9TdHJpbmc6IGNvbnZlcnREaXN0YW5jZVRvU3RyaW5nLFxyXG4gIGJ1aWxkRGlzdGFuY2VFVEE6IGJ1aWxkRGlzdGFuY2VFVEEsXHJcbiAgcHJlY2lzaW9uUm91bmQ6IHByZWNpc2lvblJvdW5kXHJcbn07XHJcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICcuLi9zY3NzL0RvdXJkYW5uYWlzRXhwbG9yZS5zY3NzJztcclxuaW1wb3J0IE1hcCBmcm9tICcuL3V0aWxzL01hcC5qcyc7XHJcbmltcG9ydCBVdGlscyBmcm9tICcuL3V0aWxzL1V0aWxzLmpzJztcclxuXHJcblxyXG5jbGFzcyBEb3VyZGFubmFpc0V4cGxvcmUge1xyXG5cclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAvLyBNYXAgaW50ZXJuYWxzXHJcbiAgICB0aGlzLl9tYXAgPSBudWxsO1xyXG4gICAgdGhpcy5fbGF5ZXJzID0ge307XHJcblxyXG4gICAgLy8gRGF0YSBvYmplY3RcclxuICAgIHRoaXMuX2RhdGEgPSB7fTtcclxuXHJcbiAgICB0aGlzLl91c2VyID0ge1xyXG4gICAgICBnZW9sb2NhdGlvbkFsbG93ZWQ6IGZhbHNlLFxyXG4gICAgICBsYXQ6IFV0aWxzLkhPTUVfTEFULFxyXG4gICAgICBsbmc6IFV0aWxzLkhPTUVfTE5HLFxyXG4gICAgICBhY2N1cmFjeTogMCxcclxuICAgICAgbWFya2VyOiBudWxsXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuX2luaXRHZW9sb2NhdGlvbigpXHJcbiAgICAgIC50aGVuKHRoaXMuX2luaXRNYXAuYmluZCh0aGlzKSlcclxuICAgICAgLnRoZW4odGhpcy5faW5pdEV2ZW50cy5iaW5kKHRoaXMpKVxyXG4gICAgICAudGhlbih0aGlzLl9mZXRjaE1hcmtlcnMuYmluZCh0aGlzKSlcclxuICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCd3ZSBhcmUgZG9uZScpXHJcbiAgICAgIH0pO1xyXG4vLyAgICAgIC50aGVuKHRoaXMuX2J1aWxkTWFya2Vycy5iaW5kKHRoaXMpKVxyXG4vLyAgICAgIC50aGVuKHRoaXMuX2J1aWxkUG9seWdvbnMuYmluZCh0aGlzKSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLyogSW5pdCBzZXF1ZW5jZSAqL1xyXG5cclxuXHJcbiAgX2luaXRHZW9sb2NhdGlvbigpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuXHRcdFx0aWYgKCdnZW9sb2NhdGlvbicgaW4gbmF2aWdhdG9yKSB7XHJcbiAgICAgICAgLy8gVE9ETyA6IGluIG5leHQgdmVyc2lvbiwgbWFrZSB0aGlzIGEgcHJlZiBsb3cvaGlnaCAodG9nZ2xlKVxyXG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICBlbmFibGVIaWdoQWNjdXJhY3k6IHRydWUsIC8vIE1vcmUgY29uc3VwdGlvbiwgYmV0dGVyIHBvc2l0aW9uXHJcbiAgICAgICAgICBtYXhpbXVtQWdlOiAxMDAwLCAvLyBBIHBvc2l0aW9uIHdpbGwgbGFzdCAxcyBtYXhpbXVtXHJcbiAgICAgICAgICB0aW1lb3V0OiA5MDAsIC8vIEEgcG9zaXRpb24gaXMgdXBkYXRlZCBpbiAwLjlzIG1heGltdW1cclxuICAgICAgICB9O1xyXG4gICAgICAgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24odGhpcy5fcG9zaXRpb25Jbml0aWFsaXplZC5iaW5kKHRoaXMpLCBudWxsLCBvcHRpb25zKTtcclxuXHRcdFx0XHR0aGlzLl93YXRjaElkID0gbmF2aWdhdG9yLmdlb2xvY2F0aW9uLndhdGNoUG9zaXRpb24odGhpcy5fcG9zaXRpb25VcGRhdGUuYmluZCh0aGlzKSwgbnVsbCwgb3B0aW9ucyk7XHJcbiAgICAgIH1cclxuICAgICAgLy8gRG9uJ3QgbG9jayBpbml0aWFsaXphdGlvbiB3YWl0aW5nIGZvciBwb3NcclxuICAgICAgcmVzb2x2ZSgpO1xyXG5cdFx0fSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgX2luaXRNYXAoKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICAgIHRoaXMuX21hcCA9IG5ldyBNYXAoe1xyXG4gICAgICAgIHRhcmdldElkOiAnc2FybWF0ZXMtbGFuZCdcclxuICAgICAgfSk7XHJcbiAgICAgIHJlc29sdmUoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG4gIF9pbml0RXZlbnRzKCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xyXG4gICAgICAvLyBMaXN0ZW5pbmcgdG8gbW9kYWwgZXZlbnRcclxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsLW92ZXJsYXknKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuY2xvc2VNb2RhbC5iaW5kKHRoaXMpKTtcclxuICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgX2ZldGNoTWFya2VycygpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuICAgICAgY29uc3QgcHJvbWlzZXMgPSBbXTtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBVdGlscy5DQ0RIX0NJVElFUy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgIHByb21pc2VzLnB1c2gobmV3IFByb21pc2UocmVzb2x2ZUxvY2FsID0+IHtcclxuICAgICAgICAgIGZldGNoKGAuL2Fzc2V0cy9qc29uLyR7VXRpbHMuQ0NESF9DSVRJRVNbaV19Lmpzb25gKS50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBkYXRhLmpzb24oKS50aGVuKGpzb25EYXRhID0+IHtcclxuICAgICAgICAgICAgICB0aGlzLl9kYXRhW1V0aWxzLkNDREhfQ0lUSUVTW2ldXSA9IGpzb25EYXRhO1xyXG4gICAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9idWlsZFBvbHlnb25zKHRoaXMuX2RhdGFbVXRpbHMuQ0NESF9DSVRJRVNbaV1dLmJvdW5kcykudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYnVpbGRNYXJrZXJzKHRoaXMuX2RhdGFbVXRpbHMuQ0NESF9DSVRJRVNbaV1dLnBvaXMpLnRoZW4ocmVzb2x2ZUxvY2FsKTtcclxuICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChyZXNvbHZlTG9jYWwpO1xyXG4gICAgICAgICAgfSkuY2F0Y2gocmVzb2x2ZUxvY2FsKTtcclxuICAgICAgICB9KSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKHJlc29sdmUpO1xyXG4vKlxyXG4gICAgICBmZXRjaChgLi9hc3NldHMvanNvbi9NYXBEYXRhLmpzb25gKS50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgIGRhdGEuanNvbigpLnRoZW4oanNvbkRhdGEgPT4ge1xyXG4gICAgICAgICAgdGhpcy5fZGF0YSA9IGpzb25EYXRhO1xyXG4gICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgIH0pLmNhdGNoKHJlc29sdmUpO1xyXG4gICAgICB9KS5jYXRjaChyZXNvbHZlKTtcclxuKi9cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG4gIF9idWlsZE1hcmtlcnMobWFya2Vycykge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xyXG4gICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMobWFya2Vycyk7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbWFya2Vyc1trZXlzW2ldXS5sZW5ndGg7ICsraikge1xyXG4gICAgICAgICAgdGhpcy5fbWFwLmFkZE1hcmsobWFya2Vyc1trZXlzW2ldXVtqXSwgdGhpcy5fY3JlYXRlTWFya2VyUG9wdXAuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJlc29sdmUoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG4gIF9idWlsZFBvbHlnb25zKGNpdHlCb3VuZHMpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuICAgICAgdGhpcy5fbWFwLmFkZFBvbHlnb24oY2l0eUJvdW5kcyk7XHJcbiAgICAgIC8qXHJcbiAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhjaXR5Qm91bmRzKTtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgdGhpcy5fbWFwLmFkZFBvbHlnb24oY2l0eUJvdW5kc1trZXlzW2ldXSk7XHJcbiAgICAgIH1cclxuICAgICAgKi9cclxuICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLyogR2VvbG9jIGNhbGxiYWNrcyAqL1xyXG5cclxuXHJcbiAgX3Bvc2l0aW9uSW5pdGlhbGl6ZWQoKSB7XHJcbiAgICB0aGlzLl91c2VyLmdlb2xvY2F0aW9uQWxsb3dlZCA9IHRydWU7XHJcbiAgfVxyXG5cclxuXHJcbiAgX3Bvc2l0aW9uVXBkYXRlKHBvc2l0aW9uKSB7XHJcbiAgICAvLyBPbmx5IGlmIHVzZXIgYWxsb3dlZCBnZW9sb2NhdGlvbjtcclxuICAgIC8vIFNob3VsZCBuZXZlciBiZSBmYWxzZSB3aGVuIGNhbGxlZCBiYWNrXHJcbiAgICBpZiAodGhpcy5fdXNlci5nZW9sb2NhdGlvbkFsbG93ZWQgPT09IHRydWUpIHtcclxuICAgICAgLy8gVXBkYXRlIHNhdmVkIHVzZXIgcG9zaXRpb25cclxuICAgICAgdGhpcy5fdXNlci5sYXQgPSBwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGU7XHJcbiAgICAgIHRoaXMuX3VzZXIubG5nID0gcG9zaXRpb24uY29vcmRzLmxvbmdpdHVkZTtcclxuICAgICAgdGhpcy5fdXNlci5hY2N1cmFjeSA9IHBvc2l0aW9uLmNvb3Jkcy5hY2N1cmFjeTtcclxuICAgICAgLy8gT25seSBkcmF3IG1hcmtlciBpZiBtYXAgaXMgYWxyZWFkeSBjcmVhdGVkXHJcbiAgICAgIGlmICh0aGlzLl9tYXApIHtcclxuICAgICAgICB0aGlzLl9tYXAuZHJhd1VzZXJNYXJrZXIoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIC8qIE1hcCBVdGlscyAqL1xyXG5cclxuXHJcbiAgX2NyZWF0ZU1hcmtlclBvcHVwKG9wdHMpIHtcclxuICAgIGNvbnN0IGRvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xyXG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdIMycpO1xyXG4gICAgY29uc3QgYWRkcmVzcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0knKTtcclxuICAgIGNvbnN0IHRvd24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdJJyk7XHJcbiAgICBjb25zdCBwaG9uZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0EnKTtcclxuICAgIGNvbnN0IHdlYnNpdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdBJyk7XHJcbiAgICBjb25zdCBpbmZvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnUCcpO1xyXG4gICAgY29uc3Qgb3BlbldpdGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdBJyk7XHJcblxyXG4gICAgZG9tLmNsYXNzTGlzdC5hZGQoJ21hcmtlci1wb3B1cCcpO1xyXG4gICAgdGl0bGUuaW5uZXJIVE1MID0gb3B0cy5uYW1lO1xyXG4gICAgYWRkcmVzcy5pbm5lckhUTUwgPSBvcHRzLmFkZHJlc3M7XHJcbiAgICB0b3duLmlubmVySFRNTCA9IG9wdHMudG93bjtcclxuICAgIHBob25lLmhyZWYgPSBgdGVsOiR7b3B0cy5waG9uZX1gO1xyXG4gICAgcGhvbmUuaW5uZXJIVE1MID0gYDxpbWcgc3JjPVwiLi9hc3NldHMvaW1nL2ljb24vcGhvbmUuc3ZnXCI+JHtvcHRzLnBob25lfWA7XHJcbiAgICB3ZWJzaXRlLmhyZWYgPSBvcHRzLndlYnNpdGU7XHJcbiAgICB3ZWJzaXRlLmlubmVySFRNTCA9ICc8aW1nIHNyYz1cIi4vYXNzZXRzL2ltZy9pY29uL3dlYi5zdmdcIj5Db25zdWx0ZXIgbGUgc2l0ZSc7XHJcbiAgICB3ZWJzaXRlLnNldEF0dHJpYnV0ZSgncmVsJywgJ25vb3BlbmVyIG5vcmVmZXJyZXInKTtcclxuICAgIHdlYnNpdGUuc2V0QXR0cmlidXRlKCd0YXJnZXQnLCAnX2JsYW5rJyk7XHJcbiAgICBpbmZvLmlubmVySFRNTCA9IG9wdHMuaW5mbztcclxuICAgIG9wZW5XaXRoLmhyZWYgPSBgZ2VvOiR7b3B0cy5sYXR9LCR7b3B0cy5sbmd9YDtcclxuICAgIG9wZW5XaXRoLmlubmVySFRNTCA9ICc8aW1nIHNyYz1cIi4vYXNzZXRzL2ltZy9pY29uL3Bpbi5zdmdcIj5PdXZyaXIgZGFucyBsZSBHUFMnO1xyXG5cclxuICAgIGRvbS5hcHBlbmRDaGlsZCh0aXRsZSk7XHJcbiAgICBkb20uYXBwZW5kQ2hpbGQoYWRkcmVzcyk7XHJcbiAgICBkb20uYXBwZW5kQ2hpbGQodG93bik7XHJcblxyXG4gICAgY29uc3QgYnV0dG9uID0gdGhpcy5fbWFya2VyT3BlbmVkU3RhdGUob3B0cy50aW1ldGFibGUpO1xyXG4gICAgZG9tLmFwcGVuZENoaWxkKGJ1dHRvbik7XHJcblxyXG4gICAgbGV0IGFsd2F5c0Nsb3NlZCA9IHRydWU7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9wdHMudGltZXRhYmxlLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgIGlmIChvcHRzLnRpbWV0YWJsZVtpXS5pc09wZW4gPT09IHRydWUpIHtcclxuICAgICAgICBhbHdheXNDbG9zZWQgPSBmYWxzZTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gQWxsb3cgbW9kYWwgb25seSBpZiBwb2kgaGFzIHRpbWV0YWJsZSBhbmQgaXMgbm90IGFsd2F5cyBjbG9zZWRcclxuICAgIGlmIChvcHRzLnRpbWV0YWJsZS5sZW5ndGggPiAwICYmIGFsd2F5c0Nsb3NlZCA9PT0gZmFsc2UpIHtcclxuICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fdGltZXRiYWxlTW9kYWwuYmluZCh0aGlzLCBvcHRzKSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGlmIChvcHRzLmluZm8gIT09ICcnKSB7XHJcbiAgICAgIGRvbS5hcHBlbmRDaGlsZChpbmZvKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAob3B0cy5waG9uZSAhPT0gJycpIHtcclxuICAgICAgZG9tLmFwcGVuZENoaWxkKHBob25lKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAob3B0cy53ZWJzaXRlICE9PSAnJykge1xyXG4gICAgICBkb20uYXBwZW5kQ2hpbGQod2Vic2l0ZSk7XHJcbiAgICB9ICAgIFxyXG4gICAgXHJcbiAgICBkb20uYXBwZW5kQ2hpbGQob3BlbldpdGgpO1xyXG5cclxuICAgIHJldHVybiBkb207XHJcbiAgfVxyXG5cclxuXHJcbiAgX21hcmtlck9wZW5lZFN0YXRlKHRpbWV0YWJsZSkge1xyXG4gICAgY29uc3QgZG9tID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XHJcbiAgICBjb25zdCBzdGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0g1Jyk7XHJcbiAgICBjb25zdCBtb3JlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnSScpO1xyXG4gICAgZG9tLmNsYXNzTGlzdC5hZGQoJ21hcmtlci1vcGVuZWQnKTtcclxuICAgIGRvbS5hcHBlbmRDaGlsZChzdGF0ZSk7XHJcbiAgICBkb20uYXBwZW5kQ2hpbGQobW9yZSk7XHJcbiAgICBcclxuICAgIGlmICh0aW1ldGFibGUubGVuZ3RoKSB7XHJcbiAgICAgIGxldCBhbHdheXNDbG9zZWQgPSB0cnVlO1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRpbWV0YWJsZS5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgIGlmICh0aW1ldGFibGVbaV0uaXNPcGVuID09PSB0cnVlKSB7XHJcbiAgICAgICAgICBhbHdheXNDbG9zZWQgPSBmYWxzZTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGFsd2F5c0Nsb3NlZCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIHRoaXMuX21hcmtlcklzQ2xvc2VkKGRvbSwgdHJ1ZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5fY2hlY2tUaW1lKHRpbWV0YWJsZSwgZG9tKTtcclxuICAgICAgICAvLyBVcGRhdGUgZWFjaCBtaW51dGVzXHJcbiAgICAgICAgLy8gVE9ETyBzdG9yZSBpbnRlcnZhbCBpZiB0byBiZSByZWFkeSB0byBjYW5jZWwgd2hlbiBvdGhlciBuYXZpZ2F0aW9uIG1vZGUgYXZhaWxhYmxlXHJcbiAgICAgICAgc2V0SW50ZXJ2YWwodGhpcy5fY2hlY2tUaW1lLmJpbmQodGhpcywgdGltZXRhYmxlLCBkb20pLCA2MDAwMCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuX21hcmtlcklzT3BlbmVkKGRvbSwgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGRvbTtcclxuICB9XHJcblxyXG5cclxuICBfY2hlY2tUaW1lKHRpbWV0YWJsZSwgZG9tKSB7XHJcbiAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xyXG4gICAgbGV0IGhvdXIgPSBub3cuZ2V0SG91cnMoKTtcclxuICAgIGxldCBtaW51dGVzID0gbm93LmdldE1pbnV0ZXMoKTtcclxuICAgIGlmIChtaW51dGVzIDwgMTApIHtcclxuICAgICAgbWludXRlcyA9IGAwJHttaW51dGVzfWA7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZGF5T2ZXZWVrID0gbm93LmdldERheSgpIC0gMTtcclxuICAgIGNvbnN0IG9wZW5pbmdUaW1lID0gcGFyc2VJbnQoYCR7dGltZXRhYmxlW2RheU9mV2Vla10ub3Blbi5ofSR7dGltZXRhYmxlW2RheU9mV2Vla10ub3Blbi5tfWApO1xyXG4gICAgY29uc3QgY2xvc2luZ1RpbWUgPSBwYXJzZUludChgJHt0aW1ldGFibGVbZGF5T2ZXZWVrXS5jbG9zZS5ofSR7dGltZXRhYmxlW2RheU9mV2Vla10uY2xvc2UubX1gKTtcclxuICAgIGNvbnN0IGN1cnJlbnRUaW1lID0gcGFyc2VJbnQoYCR7aG91cn0ke21pbnV0ZXN9YCk7XHJcbiAgICAvLyBXb24ndCB3b3JrIGlmIHRpbWV0YWJsZSBvcGVuL2Nsb3NlIGhvdXJzIGFyZW4ndCBvbiB0aGUgc2FtZSBkYXlcclxuICAgIGlmICh0aW1ldGFibGVbZGF5T2ZXZWVrXS5pc09wZW4gJiYgaXNOYU4ob3BlbmluZ1RpbWUpKSB7IC8vIDI0Lzcgb3BlbmluZ1xyXG4gICAgICB0aGlzLl9tYXJrZXJJc09wZW5lZChkb20sIHRydWUpO1xyXG4gICAgfSBlbHNlIGlmICh0aW1ldGFibGVbZGF5T2ZXZWVrXS5pc09wZW4gJiYgY3VycmVudFRpbWUgPj0gb3BlbmluZ1RpbWUgJiYgY3VycmVudFRpbWUgPCBjbG9zaW5nVGltZSkge1xyXG4gICAgICBpZiAodGltZXRhYmxlW2RheU9mV2Vla10uYnJlYWsuaGFzQnJlYWspIHtcclxuICAgICAgICBjb25zdCBicmVha09wZW5pbmdUaW1lID0gcGFyc2VJbnQoYCR7dGltZXRhYmxlW2RheU9mV2Vla10uYnJlYWsuZW5kLmh9JHt0aW1ldGFibGVbZGF5T2ZXZWVrXS5icmVhay5lbmQubX1gKTtcclxuICAgICAgICBjb25zdCBicmVha0Nsb3NpbmdUaW1lID0gcGFyc2VJbnQoYCR7dGltZXRhYmxlW2RheU9mV2Vla10uYnJlYWsuc3RhcnQuaH0ke3RpbWV0YWJsZVtkYXlPZldlZWtdLmJyZWFrLnN0YXJ0Lm19YCk7XHJcbiAgICAgICAgaWYgKGN1cnJlbnRUaW1lID49IGJyZWFrQ2xvc2luZ1RpbWUgJiYgY3VycmVudFRpbWUgPCBicmVha09wZW5pbmdUaW1lKSB7XHJcbiAgICAgICAgICB0aGlzLl9tYXJrZXJJc0Nsb3NlZChkb20pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLl9tYXJrZXJJc09wZW5lZChkb20pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLl9tYXJrZXJJc09wZW5lZChkb20pO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgeyAgICAgIFxyXG4gICAgICB0aGlzLl9tYXJrZXJJc0Nsb3NlZChkb20pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIF9tYXJrZXJJc09wZW5lZChkb20sIGFsd2F5c09wZW5lZCkge1xyXG4gICAgZG9tLmZpcnN0Q2hpbGQuaW5uZXJIVE1MID0gYE91dmVydGA7XHJcbiAgICBpZiAoYWx3YXlzT3BlbmVkID09PSB0cnVlKSB7XHJcbiAgICAgIGRvbS5sYXN0Q2hpbGQuaW5uZXJIVE1MID0gYFRvdWpvdXJzIG91dmVydGA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkb20ubGFzdENoaWxkLmlubmVySFRNTCA9IGBWb2lyIGxlcyBob3JhaXJlc2A7XHJcbiAgICB9XHJcbiAgICBkb20uY2xhc3NMaXN0LmFkZCgnb3BlbmVkJyk7XHJcbiAgfVxyXG5cclxuXHJcbiAgX21hcmtlcklzQ2xvc2VkKGRvbSwgYWx3YXlzQ2xvc2VkKSB7XHJcbiAgICBkb20uZmlyc3RDaGlsZC5pbm5lckhUTUwgPSBgRmVybcOpYDtcclxuICAgIGlmIChhbHdheXNDbG9zZWQpIHtcclxuICAgICAgZG9tLmxhc3RDaGlsZC5pbm5lckhUTUwgPSAnVG91am91cnMgZmVybcOpJztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGRvbS5sYXN0Q2hpbGQuaW5uZXJIVE1MID0gYFZvaXIgbGVzIGhvcmFpcmVzYDtcclxuICAgIH1cclxuICAgIGRvbS5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuZWQnKTtcclxuICB9XHJcblxyXG5cclxuICBfdGltZXRiYWxlTW9kYWwob3B0cykge1xyXG4gICAgdGhpcy5mZXRjaE1vZGFsKCd0aW1ldGFibGVtb2RhbCcpLnRoZW4oZG9tID0+IHtcclxuICAgICAgLy8gVXBkYXRpbmcgbW9kYWwgaGVhZGVyIGFuZCBpbmZvXHJcbiAgICAgIGRvbS5xdWVyeVNlbGVjdG9yKCcjbWFyay1uYW1lJykuaW5uZXJIVE1MID0gb3B0cy5uYW1lO1xyXG4gICAgICBkb20ucXVlcnlTZWxlY3RvcignI21hcmstYWRkcmVzcycpLmlubmVySFRNTCA9IGAke29wdHMuYWRkcmVzc30sICR7b3B0cy50b3dufWA7XHJcbiAgICAgIGNvbnN0IGRpc3RhbmNlID0gVXRpbHMuZ2V0RGlzdGFuY2VCZXR3ZWVuQ29vcmRzKFtvcHRzLmxhdCwgb3B0cy5sbmddLCBbdGhpcy5fdXNlci5sYXQsIHRoaXMuX3VzZXIubG5nXSk7XHJcbiAgICAgIGRvbS5xdWVyeVNlbGVjdG9yKCcjbWFyay1kaXN0YW5jZScpLmlubmVySFRNTCA9IGBWb3VzIMOodGVzIMOgIGVudmlyb24gJHtVdGlscy5jb252ZXJ0RGlzdGFuY2VUb1N0cmluZyhkaXN0YW5jZSl9IGRlIDxiPiR7b3B0cy5uYW1lfTwvYj4gw6Agdm9sIGQnb2lzZWF1YDtcclxuICAgICAgY29uc3QgZXRhID0gVXRpbHMuYnVpbGREaXN0YW5jZUVUQShkaXN0YW5jZSk7XHJcbiAgICAgIGRvbS5xdWVyeVNlbGVjdG9yKCcjbWFyay1ldGEnKS5pbm5lckhUTUwgPSBgQ2UgcXVpIHJlcHLDqXNlbnRlIGVudmlyb24gJHtldGEuY2FyfSBlbiB2b2l0dXJlLCBvdSAke2V0YS53YWxrfSDDoCBwaWVkLmA7XHJcbiAgICAgIGRvbS5xdWVyeVNlbGVjdG9yKCcjbWFyay1zdGF0ZScpLmFwcGVuZENoaWxkKHRoaXMuX21hcmtlck9wZW5lZFN0YXRlKG9wdHMudGltZXRhYmxlKSk7XHJcbiAgICAgIC8vIE5vdyB1cGRhdGUgZGF5IGJ5IGRheVxyXG4gICAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICBjb25zdCBkYXlPZldlZWsgPSBub3cuZ2V0RGF5KCkgLSAxO1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9wdHMudGltZXRhYmxlLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgY29uc3QgZGF5RG9tID0gZG9tLnF1ZXJ5U2VsZWN0b3IoJyN0aW1ldGFibGUnKS5jaGlsZHJlbltpXTtcclxuICAgICAgICBpZiAob3B0cy50aW1ldGFibGVbaV0uaXNPcGVuID09PSB0cnVlKSB7XHJcbiAgICAgICAgICBjb25zdCBtb3JuaW5nID0gZGF5RG9tLmxhc3RFbGVtZW50Q2hpbGQuZmlyc3RFbGVtZW50Q2hpbGQ7XHJcbiAgICAgICAgICBjb25zdCBhZnRlcm5vb24gPSBkYXlEb20ubGFzdEVsZW1lbnRDaGlsZC5sYXN0RWxlbWVudENoaWxkO1xyXG4gICAgICAgICAgaWYgKG9wdHMudGltZXRhYmxlW2ldLmJyZWFrICYmIG9wdHMudGltZXRhYmxlW2ldLmJyZWFrLmhhc0JyZWFrID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIG1vcm5pbmcuaW5uZXJIVE1MID0gYDxwPiR7b3B0cy50aW1ldGFibGVbaV0ub3Blbi5ofToke29wdHMudGltZXRhYmxlW2ldLm9wZW4ubX0g4oCSICR7b3B0cy50aW1ldGFibGVbaV0uYnJlYWsuc3RhcnQuaH06JHtvcHRzLnRpbWV0YWJsZVtpXS5icmVhay5zdGFydC5tfTwvcD5gO1xyXG4gICAgICAgICAgICBtb3JuaW5nLmNsYXNzTGlzdC5hZGQoJ2ZpbGxlZCcpOyAvLyBNb3JuaW5nXHJcbiAgICAgICAgICAgIG1vcm5pbmcuY2xhc3NMaXN0LmFkZCgnc3BsaXRlZCcpOyAvLyBNb3JuaW5nXHJcbiAgICAgICAgICAgIGFmdGVybm9vbi5pbm5lckhUTUwgPSBgPHA+JHtvcHRzLnRpbWV0YWJsZVtpXS5icmVhay5lbmQuaH06JHtvcHRzLnRpbWV0YWJsZVtpXS5icmVhay5lbmQubX0g4oCSICR7b3B0cy50aW1ldGFibGVbaV0uY2xvc2UuaH06JHtvcHRzLnRpbWV0YWJsZVtpXS5jbG9zZS5tfTwvcD5gO1xyXG4gICAgICAgICAgICBhZnRlcm5vb24uY2xhc3NMaXN0LmFkZCgnZmlsbGVkJyk7IC8vIEFmdGVybm9vblxyXG4gICAgICAgICAgICBhZnRlcm5vb24uY2xhc3NMaXN0LmFkZCgnc3BsaXRlZCcpOyAvLyBBZnRlcm5vb25cclxuICAgICAgICAgIH0gZWxzZSBpZiAob3B0cy50aW1ldGFibGVbaV0ub3Blbi5oICYmIG9wdHMudGltZXRhYmxlW2ldLmNsb3NlLmgpIHtcclxuICAgICAgICAgICAgbW9ybmluZy5pbm5lckhUTUwgPSBgPHA+JHtvcHRzLnRpbWV0YWJsZVtpXS5vcGVuLmh9OiR7b3B0cy50aW1ldGFibGVbaV0ub3Blbi5tfTwvcD5gO1xyXG4gICAgICAgICAgICBtb3JuaW5nLmNsYXNzTGlzdC5hZGQoJ2ZpbGxlZCcpOyAvLyBNb3JuaW5nXHJcbiAgICAgICAgICAgIGFmdGVybm9vbi5pbm5lckhUTUwgPSBgPHA+JHtvcHRzLnRpbWV0YWJsZVtpXS5jbG9zZS5ofToke29wdHMudGltZXRhYmxlW2ldLmNsb3NlLm19PC9wPmA7XHJcbiAgICAgICAgICAgIGFmdGVybm9vbi5jbGFzc0xpc3QuYWRkKCdmaWxsZWQnKTsgLy8gQWZ0ZXJub29uXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBtb3JuaW5nLmlubmVySFRNTCA9IGA8cD4wMDowMDwvcD5gO1xyXG4gICAgICAgICAgICBtb3JuaW5nLmNsYXNzTGlzdC5hZGQoJ2ZpbGxlZCcpOyAvLyBNb3JuaW5nXHJcbiAgICAgICAgICAgIGFmdGVybm9vbi5pbm5lckhUTUwgPSBgPHA+MjQ6MDA8L3A+YDtcclxuICAgICAgICAgICAgYWZ0ZXJub29uLmNsYXNzTGlzdC5hZGQoJ2ZpbGxlZCcpOyAvLyBBZnRlcm5vb25cclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZGF5RG9tLmxhc3RFbGVtZW50Q2hpbGQuaW5uZXJIVE1MID0gYDxkaXYgY2xhc3M9XCJjbG9zZWRcIj48cD5GZXJtw6k8L3A+PC9kaXY+YDsgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIE1hdGNoaW5nIHRvZGF5J3MgZGF5XHJcbiAgICAgICAgaWYgKGkgPT09IGRheU9mV2Vlaykge1xyXG4gICAgICAgICAgZGF5RG9tLmNsYXNzTGlzdC5hZGQoJ3RvZGF5Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIFxyXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWwtb3ZlcmxheScpLmFwcGVuZENoaWxkKGRvbSk7XHJcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RhbC1vdmVybGF5Jykuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcclxuXHRcdFx0c2V0VGltZW91dCgoKSA9PiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWwtb3ZlcmxheScpLnN0eWxlLm9wYWNpdHkgPSAxLCA1MCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4vKiBTZWFyY2ggbW9kYWwgbWV0aG9kcyAqL1xyXG5cclxuLypcclxuICBfc2VhcmNoTW9kYWwoKSB7XHJcbiAgICB0aGlzLl9mZXRjaE1vZGFsKCdzZWFyY2htb2RhbCcpLnRoZW4oZG9tID0+IHtcclxuICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMuX21hcmtzKTtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgZG9tLmZpcnN0RWxlbWVudENoaWxkLmFwcGVuZENoaWxkKHRoaXMuX2NyZWF0ZU1hcmtDYXRlZ29yeVNlYXJjaEljb24oa2V5c1tpXSkpO1xyXG4gICAgICB9XHJcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RhbC1vdmVybGF5JykuYXBwZW5kQ2hpbGQoZG9tKTtcclxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsLW92ZXJsYXknKS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG5cdFx0XHRzZXRUaW1lb3V0KCgpID0+IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RhbC1vdmVybGF5Jykuc3R5bGUub3BhY2l0eSA9IDEsIDUwKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG4gIF9jcmVhdGVNYXJrQ2F0ZWdvcnlTZWFyY2hJY29uKHR5cGUpIHtcclxuICAgIGNvbnN0IGRvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xyXG4gICAgY29uc3QgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnSU1HJyk7XHJcbiAgICBjb25zdCBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ1AnKTtcclxuICAgIGRvbS5jbGFzc0xpc3QuYWRkKCdmaWx0ZXJpbmctZWxlbWVudCcpO1xyXG4gICAgaW1nLnNyYyA9IGAvYXNzZXRzL2ltZy9tYXJrZXIvJHt0eXBlfS5zdmdgO1xyXG4gICAgbGFiZWwuaW5uZXJIVE1MID0gdHlwZTtcclxuICAgIGRvbS5hcHBlbmRDaGlsZChpbWcpO1xyXG4gICAgZG9tLmFwcGVuZENoaWxkKGxhYmVsKTtcclxuICAgIHJldHVybiBkb207XHJcbiAgfVxyXG4qL1xyXG5cclxuICAvKiBNb2RhbCBtZXRob2RzICovXHJcblxyXG4gIGZldGNoTW9kYWwodXJsKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICAgIGZldGNoKGAuL2Fzc2V0cy9odG1sLyR7dXJsfS5odG1sYCkudGhlbihkYXRhID0+IHtcclxuICAgICAgICBkYXRhLnRleHQoKS50aGVuKGh0bWwgPT4ge1xyXG4gICAgICAgICAgcmVzb2x2ZShkb2N1bWVudC5jcmVhdGVSYW5nZSgpLmNyZWF0ZUNvbnRleHR1YWxGcmFnbWVudChodG1sKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgY2xvc2VNb2RhbChldmVudCwgZm9yY2UpIHtcclxuXHRcdGlmIChmb3JjZSA9PT0gdHJ1ZSB8fCBldmVudC50YXJnZXQuaWQgPT09ICdtb2RhbC1vdmVybGF5JyB8fCBldmVudC50YXJnZXQuaWQuaW5kZXhPZignY2xvc2UnKSAhPT0gLTEpIHtcclxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsLW92ZXJsYXknKS5zdHlsZS5vcGFjaXR5ID0gMDtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsLW92ZXJsYXknKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RhbC1vdmVybGF5JykuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgIH0sIDMwMCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcbiAgZ2V0IHVzZXIoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fdXNlcjtcclxuICB9XHJcblxyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRG91cmRhbm5haXNFeHBsb3JlO1xyXG4iXSwibmFtZXMiOlsiTWFya2VycyIsIlV0aWxzIiwiTWFwIiwib3B0aW9ucyIsIl9jbGFzc0NhbGxDaGVjayIsIl9pZCIsInRhcmdldElkIiwiX21hcCIsIl9tYXJrcyIsIl9wb2x5Z29ucyIsIl9sYXllcnMiLCJDYXJ0ZSIsIlNhdGVsbGl0ZSIsIl9pbml0IiwiX2V2ZW50cyIsIl9jcmVhdGVDbGFzcyIsImtleSIsInZhbHVlIiwid2luZG93IiwiTCIsIm1hcCIsInpvb21Db250cm9sIiwic2V0VmlldyIsIkNDREhfQ0VOVEVSIiwiTEFUIiwiTE5HIiwiY29udHJvbCIsInNjYWxlIiwiYWRkVG8iLCJzZXRNYXhCb3VuZHMiLCJNQVBfQk9VTkRTIiwiT1NNX0xBWUVSIiwiRVNSSV9MQVlFUiIsImxheWVycyIsInBvc2l0aW9uIiwiX3RoaXMiLCJvbiIsIl9tYXBDbGlja2VkIiwiYmluZCIsInBhbkluc2lkZUJvdW5kcyIsImFuaW1hdGUiLCJvcHRzIiwiY29uc29sZSIsImxvZyIsImxhdGxuZyIsIkpTT04iLCJzdHJpbmdpZnkiLCJsYXQiLCJsbmciLCJkcmF3VXNlck1hcmtlciIsImR4IiwidXNlciIsIm1hcmtlciIsImljb24iLCJzZXRMYXRMbmciLCJhZGRNYXJrIiwiY3JlYXRlUG9wdXAiLCJfdGhpczIiLCJ0eXBlcyIsInR5cGUiLCJzcGxpdCIsImxlbmd0aCIsImNvbmNhdCIsImZseVRvIiwiYmluZFBvcHVwIiwiaSIsInB1c2giLCJhZGRQb2x5Z29uIiwicG9seWdvbiIsIk9iamVjdCIsImZyZWV6ZSIsInJlc3RhdXJhbnQiLCJJY29uIiwiaWNvblVybCIsImljb25TaXplIiwiaWNvbkFuY2hvciIsInBvcHVwQW5jaG9yIiwic2hhZG93VXJsIiwic2hhZG93U2l6ZSIsInNoYWRvd0FuY2hvciIsImJhciIsImNlbGxhciIsImdyb2NlcnkiLCJmb290IiwicnVnYnkiLCJwaW5ncG9uZyIsImJvY2NlIiwidGVubmlzIiwiYmFrZXJ5IiwiYm9vayIsImxhbmRtYXJrIiwiY2FzdGxlIiwiY2h1cmNoIiwiZ2FyZGVuIiwiY2FyIiwidHJhaW4iLCJhbmltYWwiLCJkZW50YWwiLCJwaGFybWFjeSIsImRlZmlicmlsbGF0b3IiLCJjZW1ldGVyeSIsImZpcmVmaWdodGVyIiwicG9saWNlIiwibWFpbCIsInBhcmsiLCJyZWN5Y2xlIiwiYWRtaW5pc3RyYXRpb24iLCJzY2hvb2wiLCJnZXREaXN0YW5jZUJldHdlZW5Db29yZHMiLCJmcm9tIiwidG8iLCJsb24xIiwiTWF0aCIsIlBJIiwibGF0MSIsImxvbjIiLCJsYXQyIiwiZGVsdGFMYXQiLCJkZWx0YUxvbiIsImEiLCJwb3ciLCJzaW4iLCJjb3MiLCJjIiwiYXNpbiIsInNxcnQiLCJjb252ZXJ0RGlzdGFuY2VUb1N0cmluZyIsImRpc3RhbmNlIiwicHJlY2lzaW9uUm91bmQiLCJidWlsZERpc3RhbmNlRVRBIiwiY2FyTWludXRlcyIsImNhclNlY29uZHMiLCJmbG9vciIsIndhbGtNaW51dGVzIiwid2Fsa1NlY29uZHMiLCJ3YWxrIiwicHJlY2lzaW9uIiwibXVsdGlwbGllciIsInJvdW5kIiwiQ0NESF9DSVRJRVMiLCJsYXRMbmdCb3VuZHMiLCJsYXRMbmciLCJ0aWxlTGF5ZXIiLCJhdHRyaWJ1dGlvbiIsIm1heFpvb20iLCJtaW5ab29tIiwiRG91cmRhbm5haXNFeHBsb3JlIiwiX2RhdGEiLCJfdXNlciIsImdlb2xvY2F0aW9uQWxsb3dlZCIsIkhPTUVfTEFUIiwiSE9NRV9MTkciLCJhY2N1cmFjeSIsIl9pbml0R2VvbG9jYXRpb24iLCJ0aGVuIiwiX2luaXRNYXAiLCJfaW5pdEV2ZW50cyIsIl9mZXRjaE1hcmtlcnMiLCJQcm9taXNlIiwicmVzb2x2ZSIsIm5hdmlnYXRvciIsImVuYWJsZUhpZ2hBY2N1cmFjeSIsIm1heGltdW1BZ2UiLCJ0aW1lb3V0IiwiZ2VvbG9jYXRpb24iLCJnZXRDdXJyZW50UG9zaXRpb24iLCJfcG9zaXRpb25Jbml0aWFsaXplZCIsIl93YXRjaElkIiwid2F0Y2hQb3NpdGlvbiIsIl9wb3NpdGlvblVwZGF0ZSIsIl90aGlzMyIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJhZGRFdmVudExpc3RlbmVyIiwiY2xvc2VNb2RhbCIsIl90aGlzNCIsInByb21pc2VzIiwiX2xvb3AiLCJyZXNvbHZlTG9jYWwiLCJmZXRjaCIsImRhdGEiLCJqc29uIiwianNvbkRhdGEiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJfYnVpbGRQb2x5Z29ucyIsImJvdW5kcyIsIl9idWlsZE1hcmtlcnMiLCJwb2lzIiwiYWxsIiwibWFya2VycyIsIl90aGlzNSIsImtleXMiLCJqIiwiX2NyZWF0ZU1hcmtlclBvcHVwIiwiY2l0eUJvdW5kcyIsIl90aGlzNiIsImNvb3JkcyIsImxhdGl0dWRlIiwibG9uZ2l0dWRlIiwiZG9tIiwiY3JlYXRlRWxlbWVudCIsInRpdGxlIiwiYWRkcmVzcyIsInRvd24iLCJwaG9uZSIsIndlYnNpdGUiLCJpbmZvIiwib3BlbldpdGgiLCJjbGFzc0xpc3QiLCJhZGQiLCJpbm5lckhUTUwiLCJuYW1lIiwiaHJlZiIsInNldEF0dHJpYnV0ZSIsImFwcGVuZENoaWxkIiwiYnV0dG9uIiwiX21hcmtlck9wZW5lZFN0YXRlIiwidGltZXRhYmxlIiwiYWx3YXlzQ2xvc2VkIiwiaXNPcGVuIiwiX3RpbWV0YmFsZU1vZGFsIiwic3RhdGUiLCJtb3JlIiwiX21hcmtlcklzQ2xvc2VkIiwiX2NoZWNrVGltZSIsInNldEludGVydmFsIiwiX21hcmtlcklzT3BlbmVkIiwibm93IiwiRGF0ZSIsImhvdXIiLCJnZXRIb3VycyIsIm1pbnV0ZXMiLCJnZXRNaW51dGVzIiwiZGF5T2ZXZWVrIiwiZ2V0RGF5Iiwib3BlbmluZ1RpbWUiLCJwYXJzZUludCIsIm9wZW4iLCJoIiwibSIsImNsb3NpbmdUaW1lIiwiY2xvc2UiLCJjdXJyZW50VGltZSIsImlzTmFOIiwiaGFzQnJlYWsiLCJicmVha09wZW5pbmdUaW1lIiwiZW5kIiwiYnJlYWtDbG9zaW5nVGltZSIsInN0YXJ0IiwiYWx3YXlzT3BlbmVkIiwiZmlyc3RDaGlsZCIsImxhc3RDaGlsZCIsInJlbW92ZSIsIl90aGlzNyIsImZldGNoTW9kYWwiLCJxdWVyeVNlbGVjdG9yIiwiZXRhIiwiZGF5RG9tIiwiY2hpbGRyZW4iLCJtb3JuaW5nIiwibGFzdEVsZW1lbnRDaGlsZCIsImZpcnN0RWxlbWVudENoaWxkIiwiYWZ0ZXJub29uIiwic3R5bGUiLCJkaXNwbGF5Iiwic2V0VGltZW91dCIsIm9wYWNpdHkiLCJ1cmwiLCJ0ZXh0IiwiaHRtbCIsImNyZWF0ZVJhbmdlIiwiY3JlYXRlQ29udGV4dHVhbEZyYWdtZW50IiwiZXZlbnQiLCJmb3JjZSIsInRhcmdldCIsImlkIiwiaW5kZXhPZiIsImdldCJdLCJzb3VyY2VSb290IjoiIn0=
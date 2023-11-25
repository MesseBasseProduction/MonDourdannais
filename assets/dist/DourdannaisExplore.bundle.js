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
  diy: new window.L.Icon({
    iconUrl: 'assets/img/marker/diy.svg',
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
  museum: new window.L.Icon({
    iconUrl: 'assets/img/marker/museum.svg',
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xCQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BCQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGSyxJQUFJLEVBQUUsSUFBSWxFLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lBQ3RCQyxPQUFPLEVBQUUsNEJBQTRCO0lBQ3JDQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xCQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BCQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGTSxLQUFLLEVBQUUsSUFBSW5FLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lBQ3ZCQyxPQUFPLEVBQUUsNkJBQTZCO0lBQ3RDQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xCQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BCQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGTyxRQUFRLEVBQUUsSUFBSXBFLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lBQzFCQyxPQUFPLEVBQUUsZ0NBQWdDO0lBQ3pDQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xCQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BCQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGUSxLQUFLLEVBQUUsSUFBSXJFLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lBQ3ZCQyxPQUFPLEVBQUUsNkJBQTZCO0lBQ3RDQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xCQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BCQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGUyxNQUFNLEVBQUUsSUFBSXRFLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lBQ3hCQyxPQUFPLEVBQUUsOEJBQThCO0lBQ3ZDQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xCQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BCQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGVSxNQUFNLEVBQUUsSUFBSXZFLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lBQ3hCQyxPQUFPLEVBQUUsNkJBQTZCO0lBQ3RDQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xCQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BCQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGVyxJQUFJLEVBQUUsSUFBSXhFLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lBQ3RCQyxPQUFPLEVBQUUsNEJBQTRCO0lBQ3JDQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xCQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BCQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGWSxRQUFRLEVBQUUsSUFBSXpFLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lBQzFCQyxPQUFPLEVBQUUsZ0NBQWdDO0lBQ3pDQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xCQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BCQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGYSxNQUFNLEVBQUUsSUFBSTFFLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lBQ3hCQyxPQUFPLEVBQUUsOEJBQThCO0lBQ3ZDQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xCQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BCQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGYyxNQUFNLEVBQUUsSUFBSTNFLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lBQ3hCQyxPQUFPLEVBQUUsOEJBQThCO0lBQ3ZDQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xCQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BCQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGZSxNQUFNLEVBQUUsSUFBSTVFLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lB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QUFJLEVBQUk7WUFDdkI5RyxPQUFPLENBQUNZLFFBQVEsQ0FBQ21HLFdBQVcsQ0FBQyxDQUFDLENBQUNDLHdCQUF3QixDQUFDRixJQUFJLENBQUMsQ0FBQztVQUNoRSxDQUFDLENBQUM7UUFDSixDQUFDLENBQUM7TUFDSixDQUFDLENBQUM7SUFDSjtFQUFDO0lBQUEvUCxHQUFBO0lBQUFDLEtBQUEsRUFHRCxTQUFBK0osV0FBV2tHLEtBQUssRUFBRUMsS0FBSyxFQUFFO01BQ3pCLElBQUlBLEtBQUssS0FBSyxJQUFJLElBQUlELEtBQUssQ0FBQ0UsTUFBTSxDQUFDQyxFQUFFLEtBQUssZUFBZSxJQUFJSCxLQUFLLENBQUNFLE1BQU0sQ0FBQ0MsRUFBRSxDQUFDQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDbEd6RyxRQUFRLENBQUNDLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQzJGLEtBQUssQ0FBQ0csT0FBTyxHQUFHLENBQUM7UUFDMURELFVBQVUsQ0FBQyxZQUFNO1VBQ2Y5RixRQUFRLENBQUNDLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQzJGLEtBQUssQ0FBQ0MsT0FBTyxHQUFHLE1BQU07VUFDL0Q3RixRQUFRLENBQUNDLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQ3NDLFNBQVMsR0FBRyxFQUFFO1FBQ3pELENBQUMsRUFBRSxHQUFHLENBQUM7TUFDVDtJQUNGO0VBQUM7SUFBQXBNLEdBQUE7SUFBQXVRLEdBQUEsRUFHRCxTQUFBQSxJQUFBLEVBQVc7TUFDVCxPQUFPLElBQUksQ0FBQ2pJLEtBQUs7SUFDbkI7RUFBQztFQUFBLE9BQUFGLGtCQUFBO0FBQUE7QUFLSCxpRUFBZUEsa0JBQWtCLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Eb3VyZGFubmFpc0V4cGxvcmUvLi9zcmMvanMvdXRpbHMvTWFwLmpzIiwid2VicGFjazovL0RvdXJkYW5uYWlzRXhwbG9yZS8uL3NyYy9qcy91dGlscy9NYXJrZXJFbnVtLmpzIiwid2VicGFjazovL0RvdXJkYW5uYWlzRXhwbG9yZS8uL3NyYy9qcy91dGlscy9VdGlscy5qcyIsIndlYnBhY2s6Ly9Eb3VyZGFubmFpc0V4cGxvcmUvLi9zcmMvc2Nzcy9Eb3VyZGFubmFpc0V4cGxvcmUuc2NzcyIsIndlYnBhY2s6Ly9Eb3VyZGFubmFpc0V4cGxvcmUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vRG91cmRhbm5haXNFeHBsb3JlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9Eb3VyZGFubmFpc0V4cGxvcmUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9Eb3VyZGFubmFpc0V4cGxvcmUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9Eb3VyZGFubmFpc0V4cGxvcmUvLi9zcmMvanMvRG91cmRhbm5haXNFeHBsb3JlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBNYXJrZXJzIGZyb20gJy4vTWFya2VyRW51bS5qcyc7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi9VdGlscy5qcyc7XG5cblxuY2xhc3MgTWFwIHtcblxuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICB0aGlzLl9pZCA9IG9wdGlvbnMudGFyZ2V0SWQ7XG4gICAgdGhpcy5fbWFwID0gbnVsbDtcbiAgICB0aGlzLl9tYXJrcyA9IHt9O1xuICAgIHRoaXMuX3BvbHlnb25zID0gW107XG4gICAgdGhpcy5fbGF5ZXJzID0ge1xuICAgICAgQ2FydGU6IG51bGwsXG4gICAgICBTYXRlbGxpdGU6IG51bGxcbiAgICB9O1xuXG4gICAgdGhpcy5faW5pdCgpO1xuICAgIHRoaXMuX2V2ZW50cygpO1xuICB9XG5cblxuICBfaW5pdCgpIHtcbiAgICAvLyBVc2UgbWFpbiBkaXYgdG8gaW5qZWN0IE9TTSBpbnRvXG4gICAgdGhpcy5fbWFwID0gd2luZG93LkwubWFwKHRoaXMuX2lkLCB7XG4gICAgICB6b29tQ29udHJvbDogZmFsc2UsXG4gICAgfSkuc2V0VmlldyhbVXRpbHMuQ0NESF9DRU5URVIuTEFULCBVdGlscy5DQ0RIX0NFTlRFUi5MTkddLCAxMik7XG4gICAgLy8gQWRkIG1ldGVyIGFuZCBmZWV0IHNjYWxlIG9uIG1hcFxuICAgIHdpbmRvdy5MLmNvbnRyb2wuc2NhbGUoKS5hZGRUbyh0aGlzLl9tYXApO1xuICAgIC8vIFByZXZlbnQgcGFubmluZyBvdXRzaWRlIG9mIHRoZSBtYXAgYm91bmRzIGRlZmluaW5lZCBpbiB1dGlsc1xuICAgIHRoaXMuX21hcC5zZXRNYXhCb3VuZHMoVXRpbHMuTUFQX0JPVU5EUyk7XG4gICAgLy8gQWRkIGxheWVyIGdyb3VwIHRvIGludGVyZmFjZSBhbmQgc3RhcnQgbWFwIHdpdGggb3NtIGRlZmF1bHRcbiAgICB0aGlzLl9sYXllcnMuQ2FydGUgPSBVdGlscy5PU01fTEFZRVI7XG4gICAgdGhpcy5fbGF5ZXJzLlNhdGVsbGl0ZSA9IFV0aWxzLkVTUklfTEFZRVI7XG4gICAgdGhpcy5fbGF5ZXJzLkNhcnRlLmFkZFRvKHRoaXMuX21hcCk7XG4gICAgLy8gQWRkIGxheWVyIHN3aXRjaCByYWRpbyBvbiBib3R0b20gcmlnaHQgb2YgdGhlIG1hcFxuICAgIHdpbmRvdy5MLmNvbnRyb2wubGF5ZXJzKHRoaXMuX2xheWVycywge30sIHsgcG9zaXRpb246ICdib3R0b21yaWdodCcgfSkuYWRkVG8odGhpcy5fbWFwKTtcbiAgfVxuXG5cbiAgX2V2ZW50cygpIHtcbiAgICAvLyBTdWJzY3JpYmUgdG8gY2xpY2sgZXZlbnQgb24gbWFwIHRvIHJlYWN0XG4gICAgdGhpcy5fbWFwLm9uKCdjbGljaycsIHRoaXMuX21hcENsaWNrZWQuYmluZCh0aGlzKSk7XG4gICAgLy8gTWFwIGlzIGRyYWdnZWQgYnkgdXNlciBtb3VzZS9maW5nZXJcbiAgICB0aGlzLl9tYXAub24oJ2RyYWcnLCAoKSA9PiB7XG4gICAgICAvLyBDb25zdHJhaW4gcGFuIHRvIHRoZSBtYXAgYm91bmRzXG4gICAgICB0aGlzLl9tYXAucGFuSW5zaWRlQm91bmRzKFV0aWxzLk1BUF9CT1VORFMsIHsgYW5pbWF0ZTogdHJ1ZSB9KTtcbiAgICB9KTtcbiAgfVxuXG5cbiAgX21hcENsaWNrZWQob3B0cykge1xuICAgIGNvbnNvbGUubG9nKG9wdHMubGF0bG5nLCBKU09OLnN0cmluZ2lmeShvcHRzLmxhdGxuZy5sYXQgKyAnLCAnICsgb3B0cy5sYXRsbmcubG5nKSk7XG4gIH1cblxuXG4gIGRyYXdVc2VyTWFya2VyKCkge1xuICAgIGlmICghd2luZG93LmR4LnVzZXIubWFya2VyKSB7XG4gICAgICB3aW5kb3cuZHgudXNlci5tYXJrZXIgPSB3aW5kb3cuTC5tYXJrZXIoW3dpbmRvdy5keC51c2VyLmxhdCwgd2luZG93LmR4LnVzZXIubG5nXSwge1xuICAgICAgICBpY29uOiBNYXJrZXJzLnVzZXJcbiAgICAgIH0pO1xuICAgICAgd2luZG93LmR4LnVzZXIubWFya2VyLmFkZFRvKHRoaXMuX21hcCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdpbmRvdy5keC51c2VyLm1hcmtlci5zZXRMYXRMbmcod2luZG93LmR4LnVzZXIpO1xuICAgIH1cbiAgfVxuXG5cbiAgYWRkTWFyayhvcHRzLCBjcmVhdGVQb3B1cCkge1xuICAgIGxldCB0eXBlcyA9IG9wdHMudHlwZS5zcGxpdCgnLycpO1xuICAgIGxldCB0eXBlID0gb3B0cy50eXBlO1xuICAgIGlmICh0eXBlcy5sZW5ndGggPiAxKSB7XG4gICAgICB0eXBlID0gYCR7dHlwZXNbMF19JHt0eXBlc1sxXX1gO1xuICAgIH1cblxuICAgIGNvbnN0IG1hcmtlciA9IHdpbmRvdy5MLm1hcmtlcihbb3B0cy5sYXQsIG9wdHMubG5nXSwgeyBcbiAgICAgIGljb246IE1hcmtlcnNbdHlwZV1cbiAgICB9KS5vbignY2xpY2snLCAoKSA9PiB7XG4gICAgICB0aGlzLl9tYXAuZmx5VG8oW29wdHMubGF0LCBvcHRzLmxuZ10sIDE4KTtcbiAgICB9KTtcblxuICAgIG1hcmtlci5iaW5kUG9wdXAoY3JlYXRlUG9wdXAob3B0cykpO1xuICAgIG1hcmtlci5hZGRUbyh0aGlzLl9tYXApO1xuICAgIGlmICh0eXBlcy5sZW5ndGggPiAxKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHR5cGVzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmICghdGhpcy5fbWFya3NbdHlwZXNbaV1dKSB7XG4gICAgICAgICAgdGhpcy5fbWFya3NbdHlwZXNbaV1dID0gW107XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbWFya3NbdHlwZXNbaV1dLnB1c2gobWFya2VyKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCF0aGlzLl9tYXJrc1t0eXBlXSkge1xuICAgICAgICB0aGlzLl9tYXJrc1t0eXBlXSA9IFtdO1xuICAgICAgfVxuICAgICAgdGhpcy5fbWFya3NbdHlwZV0ucHVzaChtYXJrZXIpO1xuICAgIH1cbiAgfVxuXG5cbiAgYWRkUG9seWdvbihwb2x5Z29uKSB7XG4gICAgdGhpcy5fcG9seWdvbnMucHVzaCh3aW5kb3cuTC5wb2x5Z29uKHBvbHlnb24pLmFkZFRvKHRoaXMuX21hcCkpO1xuICB9XG5cblxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IE1hcDtcbiIsImV4cG9ydCBkZWZhdWx0IE9iamVjdC5mcmVlemUoe1xuICByZXN0YXVyYW50OiBuZXcgd2luZG93LkwuSWNvbih7XG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL3Jlc3RhdXJhbnQuc3ZnJyxcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxuICB9KSxcbiAgYmFyOiBuZXcgd2luZG93LkwuSWNvbih7XG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL2Jhci5zdmcnLFxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXG4gIH0pLFxuICBjZWxsYXI6IG5ldyB3aW5kb3cuTC5JY29uKHtcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvY2VsbGFyLnN2ZycsXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcbiAgfSksXG4gIGdyb2Nlcnk6IG5ldyB3aW5kb3cuTC5JY29uKHtcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvZ3JvY2VyeS5zdmcnLFxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXG4gIH0pLFxuICBkaXk6IG5ldyB3aW5kb3cuTC5JY29uKHtcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvZGl5LnN2ZycsXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcbiAgfSksXG4gIGZvb3Q6IG5ldyB3aW5kb3cuTC5JY29uKHtcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvZm9vdC5zdmcnLFxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXG4gIH0pLFxuICBydWdieTogbmV3IHdpbmRvdy5MLkljb24oe1xuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9ydWdieS5zdmcnLFxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXG4gIH0pLFxuICBwaW5ncG9uZzogbmV3IHdpbmRvdy5MLkljb24oe1xuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9waW5ncG9uZy5zdmcnLFxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXG4gIH0pLFxuICBib2NjZTogbmV3IHdpbmRvdy5MLkljb24oe1xuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9ib2NjZS5zdmcnLFxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXG4gIH0pLFxuICB0ZW5uaXM6IG5ldyB3aW5kb3cuTC5JY29uKHtcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvdGVubmlzLnN2ZycsXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcbiAgfSksXG4gIGJha2VyeTogbmV3IHdpbmRvdy5MLkljb24oe1xuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9icmVhZC5zdmcnLFxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXG4gIH0pLFxuICBib29rOiBuZXcgd2luZG93LkwuSWNvbih7XG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL2Jvb2suc3ZnJyxcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxuICB9KSxcbiAgbGFuZG1hcms6IG5ldyB3aW5kb3cuTC5JY29uKHtcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbGFuZG1hcmsuc3ZnJyxcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxuICB9KSxcbiAgY2FzdGxlOiBuZXcgd2luZG93LkwuSWNvbih7XG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL2Nhc3RsZS5zdmcnLFxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXG4gIH0pLFxuICBjaHVyY2g6IG5ldyB3aW5kb3cuTC5JY29uKHtcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvY2h1cmNoLnN2ZycsXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcbiAgfSksXG4gIG11c2V1bTogbmV3IHdpbmRvdy5MLkljb24oe1xuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9tdXNldW0uc3ZnJyxcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxuICB9KSxcbiAgZ2FyZGVuOiBuZXcgd2luZG93LkwuSWNvbih7XG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL2dhcmRlbi5zdmcnLFxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXG4gIH0pLFxuICBjYXI6IG5ldyB3aW5kb3cuTC5JY29uKHtcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvY2FyLnN2ZycsXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcbiAgfSksXG4gIHRyYWluOiBuZXcgd2luZG93LkwuSWNvbih7XG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL3RyYWluLnN2ZycsXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcbiAgfSksXG4gIGFuaW1hbDogbmV3IHdpbmRvdy5MLkljb24oe1xuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9hbmltYWwuc3ZnJyxcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxuICB9KSxcbiAgZGVudGFsOiBuZXcgd2luZG93LkwuSWNvbih7XG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL2RlbnRhbC5zdmcnLFxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXG4gIH0pLFxuICBwaGFybWFjeTogbmV3IHdpbmRvdy5MLkljb24oe1xuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9waGFybWFjeS5zdmcnLFxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXG4gIH0pLFxuICBkZWZpYnJpbGxhdG9yOiBuZXcgd2luZG93LkwuSWNvbih7XG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL2RlZmlicmlsbGF0b3Iuc3ZnJyxcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxuICB9KSxcbiAgY2VtZXRlcnk6IG5ldyB3aW5kb3cuTC5JY29uKHtcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvY2VtZXRlcnkuc3ZnJyxcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxuICB9KSxcbiAgZmlyZWZpZ2h0ZXI6IG5ldyB3aW5kb3cuTC5JY29uKHtcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvZmlyZWZpZ2h0ZXIuc3ZnJyxcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxuICB9KSxcbiAgcG9saWNlOiBuZXcgd2luZG93LkwuSWNvbih7XG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL3BvbGljZS5zdmcnLFxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXG4gIH0pLFxuICBtYWlsOiBuZXcgd2luZG93LkwuSWNvbih7XG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21haWwuc3ZnJyxcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxuICB9KSxcbiAgcGFyazogbmV3IHdpbmRvdy5MLkljb24oe1xuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9wYXJrLnN2ZycsXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcbiAgfSksXG4gIHJlY3ljbGU6IG5ldyB3aW5kb3cuTC5JY29uKHtcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvcmVjeWNsZS5zdmcnLFxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXG4gIH0pLFxuICBhZG1pbmlzdHJhdGlvbjogbmV3IHdpbmRvdy5MLkljb24oe1xuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9hZG1pbmlzdHJhdGlvbi5zdmcnLFxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXG4gIH0pLFxuICBzY2hvb2w6IG5ldyB3aW5kb3cuTC5JY29uKHtcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvc2Nob29sLnN2ZycsXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcbiAgfSksXG4gIHVzZXI6IG5ldyB3aW5kb3cuTC5JY29uKHtcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvdXNlci5zdmcnLFxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF1cbiAgfSlcbn0pO1xuIiwiY29uc3QgZ2V0RGlzdGFuY2VCZXR3ZWVuQ29vcmRzID0gKGZyb20sIHRvKSA9PiB7XG4gIC8vIFJldHVybiBkaXN0YW5jZSBpbiBtZXRlcnNcbiAgY29uc3QgbG9uMSA9IChmcm9tWzFdICogTWF0aC5QSSkgLyAxODAsXG4gICAgbGF0MSA9IChmcm9tWzBdICogTWF0aC5QSSkgLyAxODAsXG4gICAgbG9uMiA9ICh0b1sxXSAqIE1hdGguUEkpIC8gMTgwLFxuICAgIGxhdDIgPSAodG9bMF0gKiBNYXRoLlBJKSAvIDE4MDtcblxuICBjb25zdCBkZWx0YUxhdCA9IGxhdDIgLSBsYXQxO1xuICBjb25zdCBkZWx0YUxvbiA9IGxvbjIgLSBsb24xO1xuXG4gIGNvbnN0IGEgPSBNYXRoLnBvdyhNYXRoLnNpbihkZWx0YUxhdCAvIDIpLCAyKSArIE1hdGguY29zKGxhdDEpICogTWF0aC5jb3MobGF0MikgKiBNYXRoLnBvdyhNYXRoLnNpbihkZWx0YUxvbiAvIDIpLCAyKTtcbiAgY29uc3QgYyA9IDIgKiBNYXRoLmFzaW4oTWF0aC5zcXJ0KGEpKTtcbiAgcmV0dXJuIGMgKiA2MzcxICogMTAwMDtcbn07XG5cblxuY29uc3QgY29udmVydERpc3RhbmNlVG9TdHJpbmcgPSBkaXN0YW5jZSA9PiB7XG4gIGlmIChkaXN0YW5jZSA+IDEwMDApIHtcbiAgICBkaXN0YW5jZSA9IGAke3ByZWNpc2lvblJvdW5kKGRpc3RhbmNlIC8gMTAwMCwgMil9a21gO1xuICB9IGVsc2Uge1xuICAgIGRpc3RhbmNlID0gYCR7cHJlY2lzaW9uUm91bmQoZGlzdGFuY2UsIDIpfW1gO1xuICB9XG4gIHJldHVybiBkaXN0YW5jZTtcbn07XG5cblxuY29uc3QgYnVpbGREaXN0YW5jZUVUQSA9IGRpc3RhbmNlID0+IHtcbiAgbGV0IGNhck1pbnV0ZXMgPSAwO1xuICBsZXQgY2FyU2Vjb25kcyA9IDA7XG5cbiAgaWYgKGRpc3RhbmNlID4gNTAwMDApIHtcbiAgICAvLyBPdmVyIDUwa20sIHdlIHVzZSBhdmVyYWdlIHNwZWVkIG9mIDEwMGttaFxuICAgIGNhck1pbnV0ZXMgPSAoZGlzdGFuY2UgLyAxMDAwMDApICogNjA7XG4gIH0gZWxzZSBpZiAoZGlzdGFuY2UgPiAxMDAwMCkge1xuICAgIC8vIE92ZXIgMTBrbSwgd2UgdXNlIGF2ZXJhZ2Ugc3BlZWQgb2YgNjBrbS9oXG4gICAgY2FyTWludXRlcyA9IChkaXN0YW5jZSAvIDYwMDAwKSAqIDYwO1xuICB9IGVsc2Uge1xuICAgIC8vIFVuZGVyIDEwa20gd2UgdXNlciBhdmVyYWdlIHNwZWVkIG9mIDMwa20vaFxuICAgIGNhck1pbnV0ZXMgPSAoZGlzdGFuY2UgLyAzMDAwMCkgKiA2MDtcbiAgfVxuXG4gIGNhclNlY29uZHMgPSBjYXJNaW51dGVzICUgMTsgLy8gS2VlcCBmbG9hdGluZyB2YWx1ZSBmb3Igc2Vjb25kcyBjb21wdXRpbmdcbiAgY2FyTWludXRlcyA9IE1hdGguZmxvb3IoY2FyTWludXRlcyk7IC8vIFJlbW92ZSBmbG9hdGluZyB2YWx1ZVxuXG4gIGlmIChjYXJNaW51dGVzID4gNjApIHtcbiAgICBjYXJNaW51dGVzID0gYCR7TWF0aC5mbG9vcihjYXJNaW51dGVzIC8gNjApfWggJHtjYXJNaW51dGVzICUgNjB9bWA7XG4gIH0gZWxzZSB7XG4gICAgY2FyTWludXRlcyA9IGAke2Nhck1pbnV0ZXN9bWA7XG4gIH1cblxuICBsZXQgd2Fsa01pbnV0ZXMgPSAoZGlzdGFuY2UgLyA1MDAwKSAqIDYwO1xuICBsZXQgd2Fsa1NlY29uZHMgPSB3YWxrTWludXRlcyAlIDE7XG4gIHdhbGtNaW51dGVzID0gTWF0aC5mbG9vcih3YWxrTWludXRlcyk7IC8vIFJlbW92ZSBmbG9hdGluZyB2YWx1ZVxuXG4gIGlmICh3YWxrTWludXRlcyA+IDYwKSB7XG4gICAgd2Fsa01pbnV0ZXMgPSBgJHtNYXRoLmZsb29yKHdhbGtNaW51dGVzIC8gNjApfWggJHt3YWxrTWludXRlcyAlIDYwfW1gO1xuICB9IGVsc2Uge1xuICAgIHdhbGtNaW51dGVzID0gYCR7d2Fsa01pbnV0ZXN9bWA7XG4gIH0gIFxuXG4gIHJldHVybiB7XG4gICAgY2FyOiBgJHtjYXJNaW51dGVzfSAke01hdGguZmxvb3IocHJlY2lzaW9uUm91bmQoKGNhclNlY29uZHMgLyAxMDApICogNjAsIDIpICogMTAwKX1zYCxcbiAgICB3YWxrOiBgJHt3YWxrTWludXRlc30gJHtNYXRoLmZsb29yKHByZWNpc2lvblJvdW5kKCh3YWxrU2Vjb25kcyAvIDEwMCkgKiA2MCwgMikgKiAxMDApfXNgLFxuICB9O1xufTtcblxuXG5jb25zdCBwcmVjaXNpb25Sb3VuZCA9ICh2YWx1ZSwgcHJlY2lzaW9uKSA9PiB7XG4gIGNvbnN0IG11bHRpcGxpZXIgPSBNYXRoLnBvdygxMCwgcHJlY2lzaW9uIHx8IDApO1xuICByZXR1cm4gTWF0aC5yb3VuZCh2YWx1ZSAqIG11bHRpcGxpZXIpIC8gbXVsdGlwbGllcjtcbn07XG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICBDQ0RIX0NFTlRFUjoge1xuICAgIExBVDogNDguNTMxODM5MDY0NDE5NjIsXG4gICAgTE5HOiAyLjA1Mzc1NjcxMzg2NzE4OFxuICB9LFxuICBDQ0RIX0NJVElFUzogWydCUlgnLCAnQ09SJywgJ0RSRCcsICdMRlInLCAnTEdSJywgJ1JJQycsICdST1YnLCAnU0NEJywgJ1NFUicsICdTVEMnLCAnVlNHJ10sXG4gIE1BUF9CT1VORFM6IHdpbmRvdy5MLmxhdExuZ0JvdW5kcyhcbiAgICB3aW5kb3cuTC5sYXRMbmcoNDguNjc5NDAwNzE1OTYzODk0LCAxLjczOTA2MDY2ODk0NTMxMjcpLFxuICAgIHdpbmRvdy5MLmxhdExuZyg0OC4zODQzOTA3NDE1MTg2NiwgMi4zNDMzOTU5OTYwOTM3NTApXG4gICksXG4gIE9TTV9MQVlFUjogd2luZG93LkwudGlsZUxheWVyKCdodHRwczovL3tzfS50aWxlLm9wZW5zdHJlZXRtYXAub3JnL3t6fS97eH0ve3l9LnBuZycsIHtcbiAgICBhdHRyaWJ1dGlvbjogJyZjb3B5OyA8YSBocmVmPVwiaHR0cHM6Ly93d3cub3BlbnN0cmVldG1hcC5vcmcvY29weXJpZ2h0XCI+T3BlblN0cmVldE1hcDwvYT4nLFxuICAgIG1heFpvb206IDE5LFxuICAgIG1pblpvb206IDEyXG4gIH0pLFxuICBFU1JJX0xBWUVSOiB3aW5kb3cuTC50aWxlTGF5ZXIoJ2h0dHBzOi8vc2VydmVyLmFyY2dpc29ubGluZS5jb20vQXJjR0lTL3Jlc3Qvc2VydmljZXMvV29ybGRfSW1hZ2VyeS9NYXBTZXJ2ZXIvdGlsZS97en0ve3l9L3t4fScsIHtcbiAgICBhdHRyaWJ1dGlvbjogJyZjb3B5OyA8YSBocmVmPVwiaHR0cHM6Ly93d3cuYXJjZ2lzLmNvbS9ob21lL2l0ZW0uaHRtbD9pZD0xMGRmMjI3OWY5Njg0ZTRhOWY2YTdmMDhmZWJhYzJhOVwiPkVzcmkgSW1hZ2VyeTwvYT4nLFxuICAgIG1heFpvb206IDE5LFxuICAgIG1pblpvb206IDEyXG4gIH0pLFxuICBnZXREaXN0YW5jZUJldHdlZW5Db29yZHM6IGdldERpc3RhbmNlQmV0d2VlbkNvb3JkcyxcbiAgY29udmVydERpc3RhbmNlVG9TdHJpbmc6IGNvbnZlcnREaXN0YW5jZVRvU3RyaW5nLFxuICBidWlsZERpc3RhbmNlRVRBOiBidWlsZERpc3RhbmNlRVRBLFxuICBwcmVjaXNpb25Sb3VuZDogcHJlY2lzaW9uUm91bmRcbn07XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAnLi4vc2Nzcy9Eb3VyZGFubmFpc0V4cGxvcmUuc2Nzcyc7XG5pbXBvcnQgTWFwIGZyb20gJy4vdXRpbHMvTWFwLmpzJztcbmltcG9ydCBVdGlscyBmcm9tICcuL3V0aWxzL1V0aWxzLmpzJztcblxuXG5jbGFzcyBEb3VyZGFubmFpc0V4cGxvcmUge1xuXG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgLy8gTWFwIGludGVybmFsc1xuICAgIHRoaXMuX21hcCA9IG51bGw7XG4gICAgdGhpcy5fbGF5ZXJzID0ge307XG5cbiAgICAvLyBEYXRhIG9iamVjdFxuICAgIHRoaXMuX2RhdGEgPSB7fTtcblxuICAgIHRoaXMuX3VzZXIgPSB7XG4gICAgICBnZW9sb2NhdGlvbkFsbG93ZWQ6IGZhbHNlLFxuICAgICAgbGF0OiBVdGlscy5IT01FX0xBVCxcbiAgICAgIGxuZzogVXRpbHMuSE9NRV9MTkcsXG4gICAgICBhY2N1cmFjeTogMCxcbiAgICAgIG1hcmtlcjogbnVsbFxuICAgIH07XG5cbiAgICB0aGlzLl9pbml0R2VvbG9jYXRpb24oKVxuICAgICAgLnRoZW4odGhpcy5faW5pdE1hcC5iaW5kKHRoaXMpKVxuICAgICAgLnRoZW4odGhpcy5faW5pdEV2ZW50cy5iaW5kKHRoaXMpKVxuICAgICAgLnRoZW4odGhpcy5fZmV0Y2hNYXJrZXJzLmJpbmQodGhpcykpXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCd3ZSBhcmUgZG9uZScpXG4gICAgICB9KTtcbi8vICAgICAgLnRoZW4odGhpcy5fYnVpbGRNYXJrZXJzLmJpbmQodGhpcykpXG4vLyAgICAgIC50aGVuKHRoaXMuX2J1aWxkUG9seWdvbnMuYmluZCh0aGlzKSk7XG4gIH1cblxuXG4gIC8qIEluaXQgc2VxdWVuY2UgKi9cblxuXG4gIF9pbml0R2VvbG9jYXRpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuXHRcdFx0aWYgKCdnZW9sb2NhdGlvbicgaW4gbmF2aWdhdG9yKSB7XG4gICAgICAgIC8vIFRPRE8gOiBpbiBuZXh0IHZlcnNpb24sIG1ha2UgdGhpcyBhIHByZWYgbG93L2hpZ2ggKHRvZ2dsZSlcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgICBlbmFibGVIaWdoQWNjdXJhY3k6IHRydWUsIC8vIE1vcmUgY29uc3VwdGlvbiwgYmV0dGVyIHBvc2l0aW9uXG4gICAgICAgICAgbWF4aW11bUFnZTogMTAwMCwgLy8gQSBwb3NpdGlvbiB3aWxsIGxhc3QgMXMgbWF4aW11bVxuICAgICAgICAgIHRpbWVvdXQ6IDkwMCwgLy8gQSBwb3NpdGlvbiBpcyB1cGRhdGVkIGluIDAuOXMgbWF4aW11bVxuICAgICAgICB9O1xuICAgICAgICBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKHRoaXMuX3Bvc2l0aW9uSW5pdGlhbGl6ZWQuYmluZCh0aGlzKSwgbnVsbCwgb3B0aW9ucyk7XG5cdFx0XHRcdHRoaXMuX3dhdGNoSWQgPSBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24ud2F0Y2hQb3NpdGlvbih0aGlzLl9wb3NpdGlvblVwZGF0ZS5iaW5kKHRoaXMpLCBudWxsLCBvcHRpb25zKTtcbiAgICAgIH1cbiAgICAgIC8vIERvbid0IGxvY2sgaW5pdGlhbGl6YXRpb24gd2FpdGluZyBmb3IgcG9zXG4gICAgICByZXNvbHZlKCk7XG5cdFx0fSk7XG4gIH1cblxuXG4gIF9pbml0TWFwKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIHRoaXMuX21hcCA9IG5ldyBNYXAoe1xuICAgICAgICB0YXJnZXRJZDogJ3Nhcm1hdGVzLWxhbmQnXG4gICAgICB9KTtcbiAgICAgIHJlc29sdmUoKTtcbiAgICB9KTtcbiAgfVxuXG5cbiAgX2luaXRFdmVudHMoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgLy8gTGlzdGVuaW5nIHRvIG1vZGFsIGV2ZW50XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWwtb3ZlcmxheScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5jbG9zZU1vZGFsLmJpbmQodGhpcykpO1xuICAgICAgcmVzb2x2ZSgpO1xuICAgIH0pO1xuICB9XG5cblxuICBfZmV0Y2hNYXJrZXJzKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIGNvbnN0IHByb21pc2VzID0gW107XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IFV0aWxzLkNDREhfQ0lUSUVTLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHByb21pc2VzLnB1c2gobmV3IFByb21pc2UocmVzb2x2ZUxvY2FsID0+IHtcbiAgICAgICAgICBmZXRjaChgLi9hc3NldHMvanNvbi8ke1V0aWxzLkNDREhfQ0lUSUVTW2ldfS5qc29uYCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIGRhdGEuanNvbigpLnRoZW4oanNvbkRhdGEgPT4ge1xuICAgICAgICAgICAgICB0aGlzLl9kYXRhW1V0aWxzLkNDREhfQ0lUSUVTW2ldXSA9IGpzb25EYXRhO1xuICAgICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX2J1aWxkUG9seWdvbnModGhpcy5fZGF0YVtVdGlscy5DQ0RIX0NJVElFU1tpXV0uYm91bmRzKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2J1aWxkTWFya2Vycyh0aGlzLl9kYXRhW1V0aWxzLkNDREhfQ0lUSUVTW2ldXS5wb2lzKS50aGVuKHJlc29sdmVMb2NhbCk7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pLmNhdGNoKHJlc29sdmVMb2NhbCk7XG4gICAgICAgICAgfSkuY2F0Y2gocmVzb2x2ZUxvY2FsKTtcbiAgICAgICAgfSkpO1xuICAgICAgfVxuXG4gICAgICBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbihyZXNvbHZlKTtcbi8qXG4gICAgICBmZXRjaChgLi9hc3NldHMvanNvbi9NYXBEYXRhLmpzb25gKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICBkYXRhLmpzb24oKS50aGVuKGpzb25EYXRhID0+IHtcbiAgICAgICAgICB0aGlzLl9kYXRhID0ganNvbkRhdGE7XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9KS5jYXRjaChyZXNvbHZlKTtcbiAgICAgIH0pLmNhdGNoKHJlc29sdmUpO1xuKi9cbiAgICB9KTtcbiAgfVxuXG5cbiAgX2J1aWxkTWFya2VycyhtYXJrZXJzKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKG1hcmtlcnMpO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbWFya2Vyc1trZXlzW2ldXS5sZW5ndGg7ICsraikge1xuICAgICAgICAgIHRoaXMuX21hcC5hZGRNYXJrKG1hcmtlcnNba2V5c1tpXV1bal0sIHRoaXMuX2NyZWF0ZU1hcmtlclBvcHVwLmJpbmQodGhpcykpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXNvbHZlKCk7XG4gICAgfSk7XG4gIH1cblxuXG4gIF9idWlsZFBvbHlnb25zKGNpdHlCb3VuZHMpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICB0aGlzLl9tYXAuYWRkUG9seWdvbihjaXR5Qm91bmRzKTtcbiAgICAgIC8qXG4gICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoY2l0eUJvdW5kcyk7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdGhpcy5fbWFwLmFkZFBvbHlnb24oY2l0eUJvdW5kc1trZXlzW2ldXSk7XG4gICAgICB9XG4gICAgICAqL1xuICAgICAgcmVzb2x2ZSgpO1xuICAgIH0pO1xuICB9XG5cblxuICAvKiBHZW9sb2MgY2FsbGJhY2tzICovXG5cblxuICBfcG9zaXRpb25Jbml0aWFsaXplZCgpIHtcbiAgICB0aGlzLl91c2VyLmdlb2xvY2F0aW9uQWxsb3dlZCA9IHRydWU7XG4gIH1cblxuXG4gIF9wb3NpdGlvblVwZGF0ZShwb3NpdGlvbikge1xuICAgIC8vIE9ubHkgaWYgdXNlciBhbGxvd2VkIGdlb2xvY2F0aW9uO1xuICAgIC8vIFNob3VsZCBuZXZlciBiZSBmYWxzZSB3aGVuIGNhbGxlZCBiYWNrXG4gICAgaWYgKHRoaXMuX3VzZXIuZ2VvbG9jYXRpb25BbGxvd2VkID09PSB0cnVlKSB7XG4gICAgICAvLyBVcGRhdGUgc2F2ZWQgdXNlciBwb3NpdGlvblxuICAgICAgdGhpcy5fdXNlci5sYXQgPSBwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGU7XG4gICAgICB0aGlzLl91c2VyLmxuZyA9IHBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGU7XG4gICAgICB0aGlzLl91c2VyLmFjY3VyYWN5ID0gcG9zaXRpb24uY29vcmRzLmFjY3VyYWN5O1xuICAgICAgLy8gT25seSBkcmF3IG1hcmtlciBpZiBtYXAgaXMgYWxyZWFkeSBjcmVhdGVkXG4gICAgICBpZiAodGhpcy5fbWFwKSB7XG4gICAgICAgIHRoaXMuX21hcC5kcmF3VXNlck1hcmtlcigpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG5cbiAgLyogTWFwIFV0aWxzICovXG5cblxuICBfY3JlYXRlTWFya2VyUG9wdXAob3B0cykge1xuICAgIGNvbnN0IGRvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnSDMnKTtcbiAgICBjb25zdCBhZGRyZXNzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnSScpO1xuICAgIGNvbnN0IHRvd24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdJJyk7XG4gICAgY29uc3QgcGhvbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdBJyk7XG4gICAgY29uc3Qgd2Vic2l0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0EnKTtcbiAgICBjb25zdCBpbmZvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnUCcpO1xuICAgIGNvbnN0IG9wZW5XaXRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnQScpO1xuXG4gICAgZG9tLmNsYXNzTGlzdC5hZGQoJ21hcmtlci1wb3B1cCcpO1xuICAgIHRpdGxlLmlubmVySFRNTCA9IG9wdHMubmFtZTtcbiAgICBhZGRyZXNzLmlubmVySFRNTCA9IG9wdHMuYWRkcmVzcztcbiAgICB0b3duLmlubmVySFRNTCA9IG9wdHMudG93bjtcbiAgICBwaG9uZS5ocmVmID0gYHRlbDoke29wdHMucGhvbmV9YDtcbiAgICBwaG9uZS5pbm5lckhUTUwgPSBgPGltZyBzcmM9XCIuL2Fzc2V0cy9pbWcvaWNvbi9waG9uZS5zdmdcIj4ke29wdHMucGhvbmV9YDtcbiAgICB3ZWJzaXRlLmhyZWYgPSBvcHRzLndlYnNpdGU7XG4gICAgd2Vic2l0ZS5pbm5lckhUTUwgPSAnPGltZyBzcmM9XCIuL2Fzc2V0cy9pbWcvaWNvbi93ZWIuc3ZnXCI+Q29uc3VsdGVyIGxlIHNpdGUnO1xuICAgIHdlYnNpdGUuc2V0QXR0cmlidXRlKCdyZWwnLCAnbm9vcGVuZXIgbm9yZWZlcnJlcicpO1xuICAgIHdlYnNpdGUuc2V0QXR0cmlidXRlKCd0YXJnZXQnLCAnX2JsYW5rJyk7XG4gICAgaW5mby5pbm5lckhUTUwgPSBvcHRzLmluZm87XG4gICAgb3BlbldpdGguaHJlZiA9IGBnZW86JHtvcHRzLmxhdH0sJHtvcHRzLmxuZ31gO1xuICAgIG9wZW5XaXRoLmlubmVySFRNTCA9ICc8aW1nIHNyYz1cIi4vYXNzZXRzL2ltZy9pY29uL3Bpbi5zdmdcIj5PdXZyaXIgZGFucyBsZSBHUFMnO1xuXG4gICAgZG9tLmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgICBkb20uYXBwZW5kQ2hpbGQoYWRkcmVzcyk7XG4gICAgZG9tLmFwcGVuZENoaWxkKHRvd24pO1xuXG4gICAgY29uc3QgYnV0dG9uID0gdGhpcy5fbWFya2VyT3BlbmVkU3RhdGUob3B0cy50aW1ldGFibGUpO1xuICAgIGRvbS5hcHBlbmRDaGlsZChidXR0b24pO1xuXG4gICAgbGV0IGFsd2F5c0Nsb3NlZCA9IHRydWU7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvcHRzLnRpbWV0YWJsZS5sZW5ndGg7ICsraSkge1xuICAgICAgaWYgKG9wdHMudGltZXRhYmxlW2ldLmlzT3BlbiA9PT0gdHJ1ZSkge1xuICAgICAgICBhbHdheXNDbG9zZWQgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIEFsbG93IG1vZGFsIG9ubHkgaWYgcG9pIGhhcyB0aW1ldGFibGUgYW5kIGlzIG5vdCBhbHdheXMgY2xvc2VkXG4gICAgaWYgKG9wdHMudGltZXRhYmxlLmxlbmd0aCA+IDAgJiYgYWx3YXlzQ2xvc2VkID09PSBmYWxzZSkge1xuICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fdGltZXRiYWxlTW9kYWwuYmluZCh0aGlzLCBvcHRzKSk7XG4gICAgfVxuICAgIFxuICAgIGlmIChvcHRzLmluZm8gIT09ICcnKSB7XG4gICAgICBkb20uYXBwZW5kQ2hpbGQoaW5mbyk7XG4gICAgfVxuXG4gICAgaWYgKG9wdHMucGhvbmUgIT09ICcnKSB7XG4gICAgICBkb20uYXBwZW5kQ2hpbGQocGhvbmUpO1xuICAgIH1cblxuICAgIGlmIChvcHRzLndlYnNpdGUgIT09ICcnKSB7XG4gICAgICBkb20uYXBwZW5kQ2hpbGQod2Vic2l0ZSk7XG4gICAgfSAgICBcbiAgICBcbiAgICBkb20uYXBwZW5kQ2hpbGQob3BlbldpdGgpO1xuXG4gICAgcmV0dXJuIGRvbTtcbiAgfVxuXG5cbiAgX21hcmtlck9wZW5lZFN0YXRlKHRpbWV0YWJsZSkge1xuICAgIGNvbnN0IGRvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xuICAgIGNvbnN0IHN0YXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnSDUnKTtcbiAgICBjb25zdCBtb3JlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnSScpO1xuICAgIGRvbS5jbGFzc0xpc3QuYWRkKCdtYXJrZXItb3BlbmVkJyk7XG4gICAgZG9tLmFwcGVuZENoaWxkKHN0YXRlKTtcbiAgICBkb20uYXBwZW5kQ2hpbGQobW9yZSk7XG4gICAgXG4gICAgaWYgKHRpbWV0YWJsZS5sZW5ndGgpIHtcbiAgICAgIGxldCBhbHdheXNDbG9zZWQgPSB0cnVlO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aW1ldGFibGUubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYgKHRpbWV0YWJsZVtpXS5pc09wZW4gPT09IHRydWUpIHtcbiAgICAgICAgICBhbHdheXNDbG9zZWQgPSBmYWxzZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoYWx3YXlzQ2xvc2VkID09PSB0cnVlKSB7XG4gICAgICAgIHRoaXMuX21hcmtlcklzQ2xvc2VkKGRvbSwgdHJ1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9jaGVja1RpbWUodGltZXRhYmxlLCBkb20pO1xuICAgICAgICAvLyBVcGRhdGUgZWFjaCBtaW51dGVzXG4gICAgICAgIC8vIFRPRE8gc3RvcmUgaW50ZXJ2YWwgaWYgdG8gYmUgcmVhZHkgdG8gY2FuY2VsIHdoZW4gb3RoZXIgbmF2aWdhdGlvbiBtb2RlIGF2YWlsYWJsZVxuICAgICAgICBzZXRJbnRlcnZhbCh0aGlzLl9jaGVja1RpbWUuYmluZCh0aGlzLCB0aW1ldGFibGUsIGRvbSksIDYwMDAwKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fbWFya2VySXNPcGVuZWQoZG9tLCB0cnVlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZG9tO1xuICB9XG5cblxuICBfY2hlY2tUaW1lKHRpbWV0YWJsZSwgZG9tKSB7XG4gICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbiAgICBsZXQgaG91ciA9IG5vdy5nZXRIb3VycygpO1xuICAgIGxldCBtaW51dGVzID0gbm93LmdldE1pbnV0ZXMoKTtcbiAgICBpZiAobWludXRlcyA8IDEwKSB7XG4gICAgICBtaW51dGVzID0gYDAke21pbnV0ZXN9YDtcbiAgICB9XG5cbiAgICBjb25zdCBkYXlPZldlZWsgPSBub3cuZ2V0RGF5KCkgLSAxO1xuICAgIGNvbnN0IG9wZW5pbmdUaW1lID0gcGFyc2VJbnQoYCR7dGltZXRhYmxlW2RheU9mV2Vla10ub3Blbi5ofSR7dGltZXRhYmxlW2RheU9mV2Vla10ub3Blbi5tfWApO1xuICAgIGNvbnN0IGNsb3NpbmdUaW1lID0gcGFyc2VJbnQoYCR7dGltZXRhYmxlW2RheU9mV2Vla10uY2xvc2UuaH0ke3RpbWV0YWJsZVtkYXlPZldlZWtdLmNsb3NlLm19YCk7XG4gICAgY29uc3QgY3VycmVudFRpbWUgPSBwYXJzZUludChgJHtob3VyfSR7bWludXRlc31gKTtcbiAgICAvLyBXb24ndCB3b3JrIGlmIHRpbWV0YWJsZSBvcGVuL2Nsb3NlIGhvdXJzIGFyZW4ndCBvbiB0aGUgc2FtZSBkYXlcbiAgICBpZiAodGltZXRhYmxlW2RheU9mV2Vla10uaXNPcGVuICYmIGlzTmFOKG9wZW5pbmdUaW1lKSkgeyAvLyAyNC83IG9wZW5pbmdcbiAgICAgIHRoaXMuX21hcmtlcklzT3BlbmVkKGRvbSwgdHJ1ZSk7XG4gICAgfSBlbHNlIGlmICh0aW1ldGFibGVbZGF5T2ZXZWVrXS5pc09wZW4gJiYgY3VycmVudFRpbWUgPj0gb3BlbmluZ1RpbWUgJiYgY3VycmVudFRpbWUgPCBjbG9zaW5nVGltZSkge1xuICAgICAgaWYgKHRpbWV0YWJsZVtkYXlPZldlZWtdLmJyZWFrLmhhc0JyZWFrKSB7XG4gICAgICAgIGNvbnN0IGJyZWFrT3BlbmluZ1RpbWUgPSBwYXJzZUludChgJHt0aW1ldGFibGVbZGF5T2ZXZWVrXS5icmVhay5lbmQuaH0ke3RpbWV0YWJsZVtkYXlPZldlZWtdLmJyZWFrLmVuZC5tfWApO1xuICAgICAgICBjb25zdCBicmVha0Nsb3NpbmdUaW1lID0gcGFyc2VJbnQoYCR7dGltZXRhYmxlW2RheU9mV2Vla10uYnJlYWsuc3RhcnQuaH0ke3RpbWV0YWJsZVtkYXlPZldlZWtdLmJyZWFrLnN0YXJ0Lm19YCk7XG4gICAgICAgIGlmIChjdXJyZW50VGltZSA+PSBicmVha0Nsb3NpbmdUaW1lICYmIGN1cnJlbnRUaW1lIDwgYnJlYWtPcGVuaW5nVGltZSkge1xuICAgICAgICAgIHRoaXMuX21hcmtlcklzQ2xvc2VkKGRvbSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5fbWFya2VySXNPcGVuZWQoZG9tKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fbWFya2VySXNPcGVuZWQoZG9tKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgeyAgICAgIFxuICAgICAgdGhpcy5fbWFya2VySXNDbG9zZWQoZG9tKTtcbiAgICB9XG4gIH1cblxuXG4gIF9tYXJrZXJJc09wZW5lZChkb20sIGFsd2F5c09wZW5lZCkge1xuICAgIGRvbS5maXJzdENoaWxkLmlubmVySFRNTCA9IGBPdXZlcnRgO1xuICAgIGlmIChhbHdheXNPcGVuZWQgPT09IHRydWUpIHtcbiAgICAgIGRvbS5sYXN0Q2hpbGQuaW5uZXJIVE1MID0gYFRvdWpvdXJzIG91dmVydGA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRvbS5sYXN0Q2hpbGQuaW5uZXJIVE1MID0gYFZvaXIgbGVzIGhvcmFpcmVzYDtcbiAgICB9XG4gICAgZG9tLmNsYXNzTGlzdC5hZGQoJ29wZW5lZCcpO1xuICB9XG5cblxuICBfbWFya2VySXNDbG9zZWQoZG9tLCBhbHdheXNDbG9zZWQpIHtcbiAgICBkb20uZmlyc3RDaGlsZC5pbm5lckhUTUwgPSBgRmVybcOpYDtcbiAgICBpZiAoYWx3YXlzQ2xvc2VkKSB7XG4gICAgICBkb20ubGFzdENoaWxkLmlubmVySFRNTCA9ICdUb3Vqb3VycyBmZXJtw6knO1xuICAgIH0gZWxzZSB7XG4gICAgICBkb20ubGFzdENoaWxkLmlubmVySFRNTCA9IGBWb2lyIGxlcyBob3JhaXJlc2A7XG4gICAgfVxuICAgIGRvbS5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuZWQnKTtcbiAgfVxuXG5cbiAgX3RpbWV0YmFsZU1vZGFsKG9wdHMpIHtcbiAgICB0aGlzLmZldGNoTW9kYWwoJ3RpbWV0YWJsZW1vZGFsJykudGhlbihkb20gPT4ge1xuICAgICAgLy8gVXBkYXRpbmcgbW9kYWwgaGVhZGVyIGFuZCBpbmZvXG4gICAgICBkb20ucXVlcnlTZWxlY3RvcignI21hcmstbmFtZScpLmlubmVySFRNTCA9IG9wdHMubmFtZTtcbiAgICAgIGRvbS5xdWVyeVNlbGVjdG9yKCcjbWFyay1hZGRyZXNzJykuaW5uZXJIVE1MID0gYCR7b3B0cy5hZGRyZXNzfSwgJHtvcHRzLnRvd259YDtcbiAgICAgIGNvbnN0IGRpc3RhbmNlID0gVXRpbHMuZ2V0RGlzdGFuY2VCZXR3ZWVuQ29vcmRzKFtvcHRzLmxhdCwgb3B0cy5sbmddLCBbdGhpcy5fdXNlci5sYXQsIHRoaXMuX3VzZXIubG5nXSk7XG4gICAgICBkb20ucXVlcnlTZWxlY3RvcignI21hcmstZGlzdGFuY2UnKS5pbm5lckhUTUwgPSBgVm91cyDDqHRlcyDDoCBlbnZpcm9uICR7VXRpbHMuY29udmVydERpc3RhbmNlVG9TdHJpbmcoZGlzdGFuY2UpfSBkZSA8Yj4ke29wdHMubmFtZX08L2I+IMOgIHZvbCBkJ29pc2VhdWA7XG4gICAgICBjb25zdCBldGEgPSBVdGlscy5idWlsZERpc3RhbmNlRVRBKGRpc3RhbmNlKTtcbiAgICAgIGRvbS5xdWVyeVNlbGVjdG9yKCcjbWFyay1ldGEnKS5pbm5lckhUTUwgPSBgQ2UgcXVpIHJlcHLDqXNlbnRlIGVudmlyb24gJHtldGEuY2FyfSBlbiB2b2l0dXJlLCBvdSAke2V0YS53YWxrfSDDoCBwaWVkLmA7XG4gICAgICBkb20ucXVlcnlTZWxlY3RvcignI21hcmstc3RhdGUnKS5hcHBlbmRDaGlsZCh0aGlzLl9tYXJrZXJPcGVuZWRTdGF0ZShvcHRzLnRpbWV0YWJsZSkpO1xuICAgICAgLy8gTm93IHVwZGF0ZSBkYXkgYnkgZGF5XG4gICAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuICAgICAgY29uc3QgZGF5T2ZXZWVrID0gbm93LmdldERheSgpIC0gMTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3B0cy50aW1ldGFibGUubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgY29uc3QgZGF5RG9tID0gZG9tLnF1ZXJ5U2VsZWN0b3IoJyN0aW1ldGFibGUnKS5jaGlsZHJlbltpXTtcbiAgICAgICAgaWYgKG9wdHMudGltZXRhYmxlW2ldLmlzT3BlbiA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGNvbnN0IG1vcm5pbmcgPSBkYXlEb20ubGFzdEVsZW1lbnRDaGlsZC5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgICBjb25zdCBhZnRlcm5vb24gPSBkYXlEb20ubGFzdEVsZW1lbnRDaGlsZC5sYXN0RWxlbWVudENoaWxkO1xuICAgICAgICAgIGlmIChvcHRzLnRpbWV0YWJsZVtpXS5icmVhayAmJiBvcHRzLnRpbWV0YWJsZVtpXS5icmVhay5oYXNCcmVhayA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgbW9ybmluZy5pbm5lckhUTUwgPSBgPHA+JHtvcHRzLnRpbWV0YWJsZVtpXS5vcGVuLmh9OiR7b3B0cy50aW1ldGFibGVbaV0ub3Blbi5tfSDigJIgJHtvcHRzLnRpbWV0YWJsZVtpXS5icmVhay5zdGFydC5ofToke29wdHMudGltZXRhYmxlW2ldLmJyZWFrLnN0YXJ0Lm19PC9wPmA7XG4gICAgICAgICAgICBtb3JuaW5nLmNsYXNzTGlzdC5hZGQoJ2ZpbGxlZCcpOyAvLyBNb3JuaW5nXG4gICAgICAgICAgICBtb3JuaW5nLmNsYXNzTGlzdC5hZGQoJ3NwbGl0ZWQnKTsgLy8gTW9ybmluZ1xuICAgICAgICAgICAgYWZ0ZXJub29uLmlubmVySFRNTCA9IGA8cD4ke29wdHMudGltZXRhYmxlW2ldLmJyZWFrLmVuZC5ofToke29wdHMudGltZXRhYmxlW2ldLmJyZWFrLmVuZC5tfSDigJIgJHtvcHRzLnRpbWV0YWJsZVtpXS5jbG9zZS5ofToke29wdHMudGltZXRhYmxlW2ldLmNsb3NlLm19PC9wPmA7XG4gICAgICAgICAgICBhZnRlcm5vb24uY2xhc3NMaXN0LmFkZCgnZmlsbGVkJyk7IC8vIEFmdGVybm9vblxuICAgICAgICAgICAgYWZ0ZXJub29uLmNsYXNzTGlzdC5hZGQoJ3NwbGl0ZWQnKTsgLy8gQWZ0ZXJub29uXG4gICAgICAgICAgfSBlbHNlIGlmIChvcHRzLnRpbWV0YWJsZVtpXS5vcGVuLmggJiYgb3B0cy50aW1ldGFibGVbaV0uY2xvc2UuaCkge1xuICAgICAgICAgICAgbW9ybmluZy5pbm5lckhUTUwgPSBgPHA+JHtvcHRzLnRpbWV0YWJsZVtpXS5vcGVuLmh9OiR7b3B0cy50aW1ldGFibGVbaV0ub3Blbi5tfTwvcD5gO1xuICAgICAgICAgICAgbW9ybmluZy5jbGFzc0xpc3QuYWRkKCdmaWxsZWQnKTsgLy8gTW9ybmluZ1xuICAgICAgICAgICAgYWZ0ZXJub29uLmlubmVySFRNTCA9IGA8cD4ke29wdHMudGltZXRhYmxlW2ldLmNsb3NlLmh9OiR7b3B0cy50aW1ldGFibGVbaV0uY2xvc2UubX08L3A+YDtcbiAgICAgICAgICAgIGFmdGVybm9vbi5jbGFzc0xpc3QuYWRkKCdmaWxsZWQnKTsgLy8gQWZ0ZXJub29uXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1vcm5pbmcuaW5uZXJIVE1MID0gYDxwPjAwOjAwPC9wPmA7XG4gICAgICAgICAgICBtb3JuaW5nLmNsYXNzTGlzdC5hZGQoJ2ZpbGxlZCcpOyAvLyBNb3JuaW5nXG4gICAgICAgICAgICBhZnRlcm5vb24uaW5uZXJIVE1MID0gYDxwPjI0OjAwPC9wPmA7XG4gICAgICAgICAgICBhZnRlcm5vb24uY2xhc3NMaXN0LmFkZCgnZmlsbGVkJyk7IC8vIEFmdGVybm9vblxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkYXlEb20ubGFzdEVsZW1lbnRDaGlsZC5pbm5lckhUTUwgPSBgPGRpdiBjbGFzcz1cImNsb3NlZFwiPjxwPkZlcm3DqTwvcD48L2Rpdj5gOyAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICAvLyBNYXRjaGluZyB0b2RheSdzIGRheVxuICAgICAgICBpZiAoaSA9PT0gZGF5T2ZXZWVrKSB7XG4gICAgICAgICAgZGF5RG9tLmNsYXNzTGlzdC5hZGQoJ3RvZGF5Jyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIFxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsLW92ZXJsYXknKS5hcHBlbmRDaGlsZChkb20pO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsLW92ZXJsYXknKS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuXHRcdFx0c2V0VGltZW91dCgoKSA9PiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWwtb3ZlcmxheScpLnN0eWxlLm9wYWNpdHkgPSAxLCA1MCk7XG4gICAgfSk7XG4gIH1cblxuLyogU2VhcmNoIG1vZGFsIG1ldGhvZHMgKi9cblxuLypcbiAgX3NlYXJjaE1vZGFsKCkge1xuICAgIHRoaXMuX2ZldGNoTW9kYWwoJ3NlYXJjaG1vZGFsJykudGhlbihkb20gPT4ge1xuICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMuX21hcmtzKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICBkb20uZmlyc3RFbGVtZW50Q2hpbGQuYXBwZW5kQ2hpbGQodGhpcy5fY3JlYXRlTWFya0NhdGVnb3J5U2VhcmNoSWNvbihrZXlzW2ldKSk7XG4gICAgICB9XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWwtb3ZlcmxheScpLmFwcGVuZENoaWxkKGRvbSk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWwtb3ZlcmxheScpLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG5cdFx0XHRzZXRUaW1lb3V0KCgpID0+IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RhbC1vdmVybGF5Jykuc3R5bGUub3BhY2l0eSA9IDEsIDUwKTtcbiAgICB9KTtcbiAgfVxuXG5cbiAgX2NyZWF0ZU1hcmtDYXRlZ29yeVNlYXJjaEljb24odHlwZSkge1xuICAgIGNvbnN0IGRvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xuICAgIGNvbnN0IGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0lNRycpO1xuICAgIGNvbnN0IGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnUCcpO1xuICAgIGRvbS5jbGFzc0xpc3QuYWRkKCdmaWx0ZXJpbmctZWxlbWVudCcpO1xuICAgIGltZy5zcmMgPSBgL2Fzc2V0cy9pbWcvbWFya2VyLyR7dHlwZX0uc3ZnYDtcbiAgICBsYWJlbC5pbm5lckhUTUwgPSB0eXBlO1xuICAgIGRvbS5hcHBlbmRDaGlsZChpbWcpO1xuICAgIGRvbS5hcHBlbmRDaGlsZChsYWJlbCk7XG4gICAgcmV0dXJuIGRvbTtcbiAgfVxuKi9cblxuICAvKiBNb2RhbCBtZXRob2RzICovXG5cbiAgZmV0Y2hNb2RhbCh1cmwpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICBmZXRjaChgLi9hc3NldHMvaHRtbC8ke3VybH0uaHRtbGApLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgIGRhdGEudGV4dCgpLnRoZW4oaHRtbCA9PiB7XG4gICAgICAgICAgcmVzb2x2ZShkb2N1bWVudC5jcmVhdGVSYW5nZSgpLmNyZWF0ZUNvbnRleHR1YWxGcmFnbWVudChodG1sKSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuXG4gIGNsb3NlTW9kYWwoZXZlbnQsIGZvcmNlKSB7XG5cdFx0aWYgKGZvcmNlID09PSB0cnVlIHx8IGV2ZW50LnRhcmdldC5pZCA9PT0gJ21vZGFsLW92ZXJsYXknIHx8IGV2ZW50LnRhcmdldC5pZC5pbmRleE9mKCdjbG9zZScpICE9PSAtMSkge1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsLW92ZXJsYXknKS5zdHlsZS5vcGFjaXR5ID0gMDtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWwtb3ZlcmxheScpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RhbC1vdmVybGF5JykuaW5uZXJIVE1MID0gJyc7XG4gICAgICB9LCAzMDApO1xuICAgIH1cbiAgfVxuXG5cbiAgZ2V0IHVzZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3VzZXI7XG4gIH1cblxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IERvdXJkYW5uYWlzRXhwbG9yZTtcbiJdLCJuYW1lcyI6WyJNYXJrZXJzIiwiVXRpbHMiLCJNYXAiLCJvcHRpb25zIiwiX2NsYXNzQ2FsbENoZWNrIiwiX2lkIiwidGFyZ2V0SWQiLCJfbWFwIiwiX21hcmtzIiwiX3BvbHlnb25zIiwiX2xheWVycyIsIkNhcnRlIiwiU2F0ZWxsaXRlIiwiX2luaXQiLCJfZXZlbnRzIiwiX2NyZWF0ZUNsYXNzIiwia2V5IiwidmFsdWUiLCJ3aW5kb3ciLCJMIiwibWFwIiwiem9vbUNvbnRyb2wiLCJzZXRWaWV3IiwiQ0NESF9DRU5URVIiLCJMQVQiLCJMTkciLCJjb250cm9sIiwic2NhbGUiLCJhZGRUbyIsInNldE1heEJvdW5kcyIsIk1BUF9CT1VORFMiLCJPU01fTEFZRVIiLCJFU1JJX0xBWUVSIiwibGF5ZXJzIiwicG9zaXRpb24iLCJfdGhpcyIsIm9uIiwiX21hcENsaWNrZWQiLCJiaW5kIiwicGFuSW5zaWRlQm91bmRzIiwiYW5pbWF0ZSIsIm9wdHMiLCJjb25zb2xlIiwibG9nIiwibGF0bG5nIiwiSlNPTiIsInN0cmluZ2lmeSIsImxhdCIsImxuZyIsImRyYXdVc2VyTWFya2VyIiwiZHgiLCJ1c2VyIiwibWFya2VyIiwiaWNvbiIsInNldExhdExuZyIsImFkZE1hcmsiLCJjcmVhdGVQb3B1cCIsIl90aGlzMiIsInR5cGVzIiwidHlwZSIsInNwbGl0IiwibGVuZ3RoIiwiY29uY2F0IiwiZmx5VG8iLCJiaW5kUG9wdXAiLCJpIiwicHVzaCIsImFkZFBvbHlnb24iLCJwb2x5Z29uIiwiT2JqZWN0IiwiZnJlZXplIiwicmVzdGF1cmFudCIsIkljb24iLCJpY29uVXJsIiwiaWNvblNpemUiLCJpY29uQW5jaG9yIiwicG9wdXBBbmNob3IiLCJzaGFkb3dVcmwiLCJzaGFkb3dTaXplIiwic2hhZG93QW5jaG9yIiwiYmFyIiwiY2VsbGFyIiwiZ3JvY2VyeSIsImRpeSIsImZvb3QiLCJydWdieSIsInBpbmdwb25nIiwiYm9jY2UiLCJ0ZW5uaXMiLCJiYWtlcnkiLCJib29rIiwibGFuZG1hcmsiLCJjYXN0bGUiLCJjaHVyY2giLCJtdXNldW0iLCJnYXJkZW4iLCJjYXIiLCJ0cmFpbiIsImFuaW1hbCIsImRlbnRhbCIsInBoYXJtYWN5IiwiZGVmaWJyaWxsYXRvciIsImNlbWV0ZXJ5IiwiZmlyZWZpZ2h0ZXIiLCJwb2xpY2UiLCJtYWlsIiwicGFyayIsInJlY3ljbGUiLCJhZG1pbmlzdHJhdGlvbiIsInNjaG9vbCIsImdldERpc3RhbmNlQmV0d2VlbkNvb3JkcyIsImZyb20iLCJ0byIsImxvbjEiLCJNYXRoIiwiUEkiLCJsYXQxIiwibG9uMiIsImxhdDIiLCJkZWx0YUxhdCIsImRlbHRhTG9uIiwiYSIsInBvdyIsInNpbiIsImNvcyIsImMiLCJhc2luIiwic3FydCIsImNvbnZlcnREaXN0YW5jZVRvU3RyaW5nIiwiZGlzdGFuY2UiLCJwcmVjaXNpb25Sb3VuZCIsImJ1aWxkRGlzdGFuY2VFVEEiLCJjYXJNaW51dGVzIiwiY2FyU2Vjb25kcyIsImZsb29yIiwid2Fsa01pbnV0ZXMiLCJ3YWxrU2Vjb25kcyIsIndhbGsiLCJwcmVjaXNpb24iLCJtdWx0aXBsaWVyIiwicm91bmQiLCJDQ0RIX0NJVElFUyIsImxhdExuZ0JvdW5kcyIsImxhdExuZyIsInRpbGVMYXllciIsImF0dHJpYnV0aW9uIiwibWF4Wm9vbSIsIm1pblpvb20iLCJEb3VyZGFubmFpc0V4cGxvcmUiLCJfZGF0YSIsIl91c2VyIiwiZ2VvbG9jYXRpb25BbGxvd2VkIiwiSE9NRV9MQVQiLCJIT01FX0xORyIsImFjY3VyYWN5IiwiX2luaXRHZW9sb2NhdGlvbiIsInRoZW4iLCJfaW5pdE1hcCIsIl9pbml0RXZlbnRzIiwiX2ZldGNoTWFya2VycyIsIlByb21pc2UiLCJyZXNvbHZlIiwibmF2aWdhdG9yIiwiZW5hYmxlSGlnaEFjY3VyYWN5IiwibWF4aW11bUFnZSIsInRpbWVvdXQiLCJnZW9sb2NhdGlvbiIsImdldEN1cnJlbnRQb3NpdGlvbiIsIl9wb3NpdGlvbkluaXRpYWxpemVkIiwiX3dhdGNoSWQiLCJ3YXRjaFBvc2l0aW9uIiwiX3Bvc2l0aW9uVXBkYXRlIiwiX3RoaXMzIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJjbG9zZU1vZGFsIiwiX3RoaXM0IiwicHJvbWlzZXMiLCJfbG9vcCIsInJlc29sdmVMb2NhbCIsImZldGNoIiwiZGF0YSIsImpzb24iLCJqc29uRGF0YSIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsIl9idWlsZFBvbHlnb25zIiwiYm91bmRzIiwiX2J1aWxkTWFya2VycyIsInBvaXMiLCJhbGwiLCJtYXJrZXJzIiwiX3RoaXM1Iiwia2V5cyIsImoiLCJfY3JlYXRlTWFya2VyUG9wdXAiLCJjaXR5Qm91bmRzIiwiX3RoaXM2IiwiY29vcmRzIiwibGF0aXR1ZGUiLCJsb25naXR1ZGUiLCJkb20iLCJjcmVhdGVFbGVtZW50IiwidGl0bGUiLCJhZGRyZXNzIiwidG93biIsInBob25lIiwid2Vic2l0ZSIsImluZm8iLCJvcGVuV2l0aCIsImNsYXNzTGlzdCIsImFkZCIsImlubmVySFRNTCIsIm5hbWUiLCJocmVmIiwic2V0QXR0cmlidXRlIiwiYXBwZW5kQ2hpbGQiLCJidXR0b24iLCJfbWFya2VyT3BlbmVkU3RhdGUiLCJ0aW1ldGFibGUiLCJhbHdheXNDbG9zZWQiLCJpc09wZW4iLCJfdGltZXRiYWxlTW9kYWwiLCJzdGF0ZSIsIm1vcmUiLCJfbWFya2VySXNDbG9zZWQiLCJfY2hlY2tUaW1lIiwic2V0SW50ZXJ2YWwiLCJfbWFya2VySXNPcGVuZWQiLCJub3ciLCJEYXRlIiwiaG91ciIsImdldEhvdXJzIiwibWludXRlcyIsImdldE1pbnV0ZXMiLCJkYXlPZldlZWsiLCJnZXREYXkiLCJvcGVuaW5nVGltZSIsInBhcnNlSW50Iiwib3BlbiIsImgiLCJtIiwiY2xvc2luZ1RpbWUiLCJjbG9zZSIsImN1cnJlbnRUaW1lIiwiaXNOYU4iLCJoYXNCcmVhayIsImJyZWFrT3BlbmluZ1RpbWUiLCJlbmQiLCJicmVha0Nsb3NpbmdUaW1lIiwic3RhcnQiLCJhbHdheXNPcGVuZWQiLCJmaXJzdENoaWxkIiwibGFzdENoaWxkIiwicmVtb3ZlIiwiX3RoaXM3IiwiZmV0Y2hNb2RhbCIsInF1ZXJ5U2VsZWN0b3IiLCJldGEiLCJkYXlEb20iLCJjaGlsZHJlbiIsIm1vcm5pbmciLCJsYXN0RWxlbWVudENoaWxkIiwiZmlyc3RFbGVtZW50Q2hpbGQiLCJhZnRlcm5vb24iLCJzdHlsZSIsImRpc3BsYXkiLCJzZXRUaW1lb3V0Iiwib3BhY2l0eSIsInVybCIsInRleHQiLCJodG1sIiwiY3JlYXRlUmFuZ2UiLCJjcmVhdGVDb250ZXh0dWFsRnJhZ21lbnQiLCJldmVudCIsImZvcmNlIiwidGFyZ2V0IiwiaWQiLCJpbmRleE9mIiwiZ2V0Il0sInNvdXJjZVJvb3QiOiIifQ==
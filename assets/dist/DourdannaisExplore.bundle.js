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
  tobacco: new window.L.Icon({
    iconUrl: 'assets/img/marker/tobacco.svg',
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
  skate: new window.L.Icon({
    iconUrl: 'assets/img/marker/skate.svg',
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
  fish: new window.L.Icon({
    iconUrl: 'assets/img/marker/fish.svg',
    iconSize: [26, 26],
    iconAnchor: [13, 13],
    popupAnchor: [0, -13],
    shadowUrl: 'assets/img/marker/marker-shadow.png',
    shadowSize: [42, 42],
    shadowAnchor: [20, 20]
  }),
  butcher: new window.L.Icon({
    iconUrl: 'assets/img/marker/butcher.svg',
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
  medic: new window.L.Icon({
    iconUrl: 'assets/img/marker/medic.svg',
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
  bank: new window.L.Icon({
    iconUrl: 'assets/img/marker/bank.svg',
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
    minZoom: 11
  }),
  ESRI_LAYER: window.L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: '&copy; <a href="https://www.arcgis.com/home/item.html?id=10df2279f9684e4a9f6a7f08febac2a9">Esri Imagery</a>',
    maxZoom: 19,
    minZoom: 11
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGRSxNQUFNLEVBQUUsSUFBSS9ELE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lBQ3hCQyxPQUFPLEVBQUUsOEJBQThCO0lBQ3ZDQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xCQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BCQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGRyxPQUFPLEVBQUUsSUFBSWhFLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lBQ3pCQyxPQUFPLEVBQUUsK0JBQStCO0lBQ3hDQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xCQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BCQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGSSxPQUFPLEVBQUUsSUFBSWpFLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lBQ3pCQyxPQUFPLEVBQUUsK0JBQStCO0lBQ3hDQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xCQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BCQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGSyxHQUFHLEVBQUUsSUFBSWxFLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lBQ3JCQyxPQUFPLEVBQUUsMkJBQTJCO0lBQ3BDQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xCQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BCQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGTSxJQUFJLEVBQUUsSUFBSW5FLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lBQ3RCQyxPQUFPLEVBQUUsNEJBQTRCO0lBQ3JDQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xCQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BCQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGTyxLQUFLLEVBQUUsSUFBSXBFLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lBQ3ZCQyxPQUFPLEVBQUUsNkJBQTZCO0lBQ3RDQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xCQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BCQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGUSxRQUFRLEVBQUUsSUFBSXJFLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lBQzFCQyxPQUFPLEVBQUUsZ0NBQWdDO0lBQ3pDQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xCQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BCQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGUyxLQUFLLEVBQUUsSUFBSXRFLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lBQ3ZCQyxPQUFPLEVBQUUsNkJBQTZCO0lBQ3RDQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xCQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BCQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGVSxLQUFLLEVBQUUsSUFBSXZFLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lBQ3ZCQyxPQUFPLEVBQUUsNkJBQTZCO0lBQ3RDQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xCQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BCQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGVyxNQUFNLEVBQUUsSUFBSXhFLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lBQ3hCQyxPQUFPLEVBQUUsOEJBQThCO0lBQ3ZDQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xCQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BCQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGWSxNQUFNLEVBQUUsSUFBSXpFLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lBQ3hCQyxPQUFPLEVBQUUsNkJBQTZCO0lBQ3RDQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xCQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BCQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGYSxJQUFJLEVBQUUsSUFBSTFFLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lBQ3RCQyxPQUFPLEVBQUUsNEJBQTRCO0lBQ3JDQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xCQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BCQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGYyxPQUFPLEVBQUUsSUFBSTNFLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lBQ3pCQyxPQUFPLEVBQUUsK0JBQStCO0lBQ3hDQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xCQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BCQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGZSxJQUFJLEVBQUUsSUFBSTVFLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lB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QUYsa0JBQUE7QUFBQTtBQUtILGlFQUFlQSxrQkFBa0IsRSIsInNvdXJjZXMiOlsid2VicGFjazovL0RvdXJkYW5uYWlzRXhwbG9yZS8uL3NyYy9qcy91dGlscy9NYXAuanMiLCJ3ZWJwYWNrOi8vRG91cmRhbm5haXNFeHBsb3JlLy4vc3JjL2pzL3V0aWxzL01hcmtlckVudW0uanMiLCJ3ZWJwYWNrOi8vRG91cmRhbm5haXNFeHBsb3JlLy4vc3JjL2pzL3V0aWxzL1V0aWxzLmpzIiwid2VicGFjazovL0RvdXJkYW5uYWlzRXhwbG9yZS8uL3NyYy9zY3NzL0RvdXJkYW5uYWlzRXhwbG9yZS5zY3NzPzczYzQiLCJ3ZWJwYWNrOi8vRG91cmRhbm5haXNFeHBsb3JlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0RvdXJkYW5uYWlzRXhwbG9yZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vRG91cmRhbm5haXNFeHBsb3JlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vRG91cmRhbm5haXNFeHBsb3JlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vRG91cmRhbm5haXNFeHBsb3JlLy4vc3JjL2pzL0RvdXJkYW5uYWlzRXhwbG9yZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTWFya2VycyBmcm9tICcuL01hcmtlckVudW0uanMnO1xyXG5pbXBvcnQgVXRpbHMgZnJvbSAnLi9VdGlscy5qcyc7XHJcblxyXG5cclxuY2xhc3MgTWFwIHtcclxuXHJcblxyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuICAgIHRoaXMuX2lkID0gb3B0aW9ucy50YXJnZXRJZDtcclxuICAgIHRoaXMuX21hcCA9IG51bGw7XHJcbiAgICB0aGlzLl9tYXJrcyA9IHt9O1xyXG4gICAgdGhpcy5fcG9seWdvbnMgPSBbXTtcclxuICAgIHRoaXMuX2xheWVycyA9IHtcclxuICAgICAgQ2FydGU6IG51bGwsXHJcbiAgICAgIFNhdGVsbGl0ZTogbnVsbFxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLl9pbml0KCk7XHJcbiAgICB0aGlzLl9ldmVudHMoKTtcclxuICB9XHJcblxyXG5cclxuICBfaW5pdCgpIHtcclxuICAgIC8vIFVzZSBtYWluIGRpdiB0byBpbmplY3QgT1NNIGludG9cclxuICAgIHRoaXMuX21hcCA9IHdpbmRvdy5MLm1hcCh0aGlzLl9pZCwge1xyXG4gICAgICB6b29tQ29udHJvbDogZmFsc2UsXHJcbiAgICB9KS5zZXRWaWV3KFtVdGlscy5DQ0RIX0NFTlRFUi5MQVQsIFV0aWxzLkNDREhfQ0VOVEVSLkxOR10sIDEyKTtcclxuICAgIC8vIEFkZCBtZXRlciBhbmQgZmVldCBzY2FsZSBvbiBtYXBcclxuICAgIHdpbmRvdy5MLmNvbnRyb2wuc2NhbGUoKS5hZGRUbyh0aGlzLl9tYXApO1xyXG4gICAgLy8gUHJldmVudCBwYW5uaW5nIG91dHNpZGUgb2YgdGhlIG1hcCBib3VuZHMgZGVmaW5pbmVkIGluIHV0aWxzXHJcbiAgICB0aGlzLl9tYXAuc2V0TWF4Qm91bmRzKFV0aWxzLk1BUF9CT1VORFMpO1xyXG4gICAgLy8gQWRkIGxheWVyIGdyb3VwIHRvIGludGVyZmFjZSBhbmQgc3RhcnQgbWFwIHdpdGggb3NtIGRlZmF1bHRcclxuICAgIHRoaXMuX2xheWVycy5DYXJ0ZSA9IFV0aWxzLk9TTV9MQVlFUjtcclxuICAgIHRoaXMuX2xheWVycy5TYXRlbGxpdGUgPSBVdGlscy5FU1JJX0xBWUVSO1xyXG4gICAgdGhpcy5fbGF5ZXJzLkNhcnRlLmFkZFRvKHRoaXMuX21hcCk7XHJcbiAgICAvLyBBZGQgbGF5ZXIgc3dpdGNoIHJhZGlvIG9uIGJvdHRvbSByaWdodCBvZiB0aGUgbWFwXHJcbiAgICB3aW5kb3cuTC5jb250cm9sLmxheWVycyh0aGlzLl9sYXllcnMsIHt9LCB7IHBvc2l0aW9uOiAnYm90dG9tcmlnaHQnIH0pLmFkZFRvKHRoaXMuX21hcCk7XHJcbiAgfVxyXG5cclxuXHJcbiAgX2V2ZW50cygpIHtcclxuICAgIC8vIFN1YnNjcmliZSB0byBjbGljayBldmVudCBvbiBtYXAgdG8gcmVhY3RcclxuICAgIHRoaXMuX21hcC5vbignY2xpY2snLCB0aGlzLl9tYXBDbGlja2VkLmJpbmQodGhpcykpO1xyXG4gICAgLy8gTWFwIGlzIGRyYWdnZWQgYnkgdXNlciBtb3VzZS9maW5nZXJcclxuICAgIHRoaXMuX21hcC5vbignZHJhZycsICgpID0+IHtcclxuICAgICAgLy8gQ29uc3RyYWluIHBhbiB0byB0aGUgbWFwIGJvdW5kc1xyXG4gICAgICB0aGlzLl9tYXAucGFuSW5zaWRlQm91bmRzKFV0aWxzLk1BUF9CT1VORFMsIHsgYW5pbWF0ZTogdHJ1ZSB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG4gIF9tYXBDbGlja2VkKG9wdHMpIHtcclxuICAgIGNvbnNvbGUubG9nKG9wdHMubGF0bG5nLCBKU09OLnN0cmluZ2lmeShvcHRzLmxhdGxuZy5sYXQgKyAnLCAnICsgb3B0cy5sYXRsbmcubG5nKSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgZHJhd1VzZXJNYXJrZXIoKSB7XHJcbiAgICBpZiAoIXdpbmRvdy5keC51c2VyLm1hcmtlcikge1xyXG4gICAgICB3aW5kb3cuZHgudXNlci5tYXJrZXIgPSB3aW5kb3cuTC5tYXJrZXIoW3dpbmRvdy5keC51c2VyLmxhdCwgd2luZG93LmR4LnVzZXIubG5nXSwge1xyXG4gICAgICAgIGljb246IE1hcmtlcnMudXNlclxyXG4gICAgICB9KTtcclxuICAgICAgd2luZG93LmR4LnVzZXIubWFya2VyLmFkZFRvKHRoaXMuX21hcCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB3aW5kb3cuZHgudXNlci5tYXJrZXIuc2V0TGF0TG5nKHdpbmRvdy5keC51c2VyKTtcclxuICAgIH1cclxuICB9XHJcblxyXG5cclxuICBhZGRNYXJrKG9wdHMsIGNyZWF0ZVBvcHVwKSB7XHJcbiAgICBsZXQgdHlwZXMgPSBvcHRzLnR5cGUuc3BsaXQoJy8nKTtcclxuICAgIGxldCB0eXBlID0gb3B0cy50eXBlO1xyXG4gICAgaWYgKHR5cGVzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgdHlwZSA9IGAke3R5cGVzWzBdfSR7dHlwZXNbMV19YDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBtYXJrZXIgPSB3aW5kb3cuTC5tYXJrZXIoW29wdHMubGF0LCBvcHRzLmxuZ10sIHsgXHJcbiAgICAgIGljb246IE1hcmtlcnNbdHlwZV1cclxuICAgIH0pLm9uKCdjbGljaycsICgpID0+IHtcclxuICAgICAgdGhpcy5fbWFwLmZseVRvKFtvcHRzLmxhdCwgb3B0cy5sbmddLCAxOCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBtYXJrZXIuYmluZFBvcHVwKGNyZWF0ZVBvcHVwKG9wdHMpKTtcclxuICAgIG1hcmtlci5hZGRUbyh0aGlzLl9tYXApO1xyXG4gICAgaWYgKHR5cGVzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0eXBlcy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgIGlmICghdGhpcy5fbWFya3NbdHlwZXNbaV1dKSB7XHJcbiAgICAgICAgICB0aGlzLl9tYXJrc1t0eXBlc1tpXV0gPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbWFya3NbdHlwZXNbaV1dLnB1c2gobWFya2VyKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKCF0aGlzLl9tYXJrc1t0eXBlXSkge1xyXG4gICAgICAgIHRoaXMuX21hcmtzW3R5cGVdID0gW107XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5fbWFya3NbdHlwZV0ucHVzaChtYXJrZXIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIGFkZFBvbHlnb24ocG9seWdvbikge1xyXG4gICAgdGhpcy5fcG9seWdvbnMucHVzaCh3aW5kb3cuTC5wb2x5Z29uKHBvbHlnb24pLmFkZFRvKHRoaXMuX21hcCkpO1xyXG4gIH1cclxuXHJcblxyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTWFwO1xyXG4iLCJleHBvcnQgZGVmYXVsdCBPYmplY3QuZnJlZXplKHtcclxuICByZXN0YXVyYW50OiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvcmVzdGF1cmFudC5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgYmFyOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvYmFyLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBjZWxsYXI6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9jZWxsYXIuc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIHRvYmFjY286IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci90b2JhY2NvLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBncm9jZXJ5OiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvZ3JvY2VyeS5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgZGl5OiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvZGl5LnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBmb290OiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvZm9vdC5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgcnVnYnk6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9ydWdieS5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgcGluZ3Bvbmc6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9waW5ncG9uZy5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgc2thdGU6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9za2F0ZS5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgYm9jY2U6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9ib2NjZS5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgdGVubmlzOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvdGVubmlzLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBiYWtlcnk6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9icmVhZC5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgZmlzaDogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL2Zpc2guc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIGJ1dGNoZXI6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9idXRjaGVyLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBib29rOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvYm9vay5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgbGFuZG1hcms6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9sYW5kbWFyay5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgY2FzdGxlOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvY2FzdGxlLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBjaHVyY2g6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9jaHVyY2guc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIG11c2V1bTogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL211c2V1bS5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgZ2FyZGVuOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvZ2FyZGVuLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBjYXI6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9jYXIuc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIHRyYWluOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvdHJhaW4uc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIGFuaW1hbDogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL2FuaW1hbC5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgZGVudGFsOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvZGVudGFsLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBwaGFybWFjeTogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL3BoYXJtYWN5LnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBtZWRpYzogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21lZGljLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBkZWZpYnJpbGxhdG9yOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvZGVmaWJyaWxsYXRvci5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgY2VtZXRlcnk6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9jZW1ldGVyeS5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgZmlyZWZpZ2h0ZXI6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9maXJlZmlnaHRlci5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgcG9saWNlOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvcG9saWNlLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBtYWlsOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFpbC5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgYmFuazogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL2Jhbmsuc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIHBhcms6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9wYXJrLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICByZWN5Y2xlOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvcmVjeWNsZS5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgYWRtaW5pc3RyYXRpb246IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9hZG1pbmlzdHJhdGlvbi5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgc2Nob29sOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvc2Nob29sLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICB1c2VyOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvdXNlci5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF1cclxuICB9KVxyXG59KTtcclxuIiwiY29uc3QgZ2V0RGlzdGFuY2VCZXR3ZWVuQ29vcmRzID0gKGZyb20sIHRvKSA9PiB7XHJcbiAgLy8gUmV0dXJuIGRpc3RhbmNlIGluIG1ldGVyc1xyXG4gIGNvbnN0IGxvbjEgPSAoZnJvbVsxXSAqIE1hdGguUEkpIC8gMTgwLFxyXG4gICAgbGF0MSA9IChmcm9tWzBdICogTWF0aC5QSSkgLyAxODAsXHJcbiAgICBsb24yID0gKHRvWzFdICogTWF0aC5QSSkgLyAxODAsXHJcbiAgICBsYXQyID0gKHRvWzBdICogTWF0aC5QSSkgLyAxODA7XHJcblxyXG4gIGNvbnN0IGRlbHRhTGF0ID0gbGF0MiAtIGxhdDE7XHJcbiAgY29uc3QgZGVsdGFMb24gPSBsb24yIC0gbG9uMTtcclxuXHJcbiAgY29uc3QgYSA9IE1hdGgucG93KE1hdGguc2luKGRlbHRhTGF0IC8gMiksIDIpICsgTWF0aC5jb3MobGF0MSkgKiBNYXRoLmNvcyhsYXQyKSAqIE1hdGgucG93KE1hdGguc2luKGRlbHRhTG9uIC8gMiksIDIpO1xyXG4gIGNvbnN0IGMgPSAyICogTWF0aC5hc2luKE1hdGguc3FydChhKSk7XHJcbiAgcmV0dXJuIGMgKiA2MzcxICogMTAwMDtcclxufTtcclxuXHJcblxyXG5jb25zdCBjb252ZXJ0RGlzdGFuY2VUb1N0cmluZyA9IGRpc3RhbmNlID0+IHtcclxuICBpZiAoZGlzdGFuY2UgPiAxMDAwKSB7XHJcbiAgICBkaXN0YW5jZSA9IGAke3ByZWNpc2lvblJvdW5kKGRpc3RhbmNlIC8gMTAwMCwgMil9a21gO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBkaXN0YW5jZSA9IGAke3ByZWNpc2lvblJvdW5kKGRpc3RhbmNlLCAyKX1tYDtcclxuICB9XHJcbiAgcmV0dXJuIGRpc3RhbmNlO1xyXG59O1xyXG5cclxuXHJcbmNvbnN0IGJ1aWxkRGlzdGFuY2VFVEEgPSBkaXN0YW5jZSA9PiB7XHJcbiAgbGV0IGNhck1pbnV0ZXMgPSAwO1xyXG4gIGxldCBjYXJTZWNvbmRzID0gMDtcclxuXHJcbiAgaWYgKGRpc3RhbmNlID4gNTAwMDApIHtcclxuICAgIC8vIE92ZXIgNTBrbSwgd2UgdXNlIGF2ZXJhZ2Ugc3BlZWQgb2YgMTAwa21oXHJcbiAgICBjYXJNaW51dGVzID0gKGRpc3RhbmNlIC8gMTAwMDAwKSAqIDYwO1xyXG4gIH0gZWxzZSBpZiAoZGlzdGFuY2UgPiAxMDAwMCkge1xyXG4gICAgLy8gT3ZlciAxMGttLCB3ZSB1c2UgYXZlcmFnZSBzcGVlZCBvZiA2MGttL2hcclxuICAgIGNhck1pbnV0ZXMgPSAoZGlzdGFuY2UgLyA2MDAwMCkgKiA2MDtcclxuICB9IGVsc2Uge1xyXG4gICAgLy8gVW5kZXIgMTBrbSB3ZSB1c2VyIGF2ZXJhZ2Ugc3BlZWQgb2YgMzBrbS9oXHJcbiAgICBjYXJNaW51dGVzID0gKGRpc3RhbmNlIC8gMzAwMDApICogNjA7XHJcbiAgfVxyXG5cclxuICBjYXJTZWNvbmRzID0gY2FyTWludXRlcyAlIDE7IC8vIEtlZXAgZmxvYXRpbmcgdmFsdWUgZm9yIHNlY29uZHMgY29tcHV0aW5nXHJcbiAgY2FyTWludXRlcyA9IE1hdGguZmxvb3IoY2FyTWludXRlcyk7IC8vIFJlbW92ZSBmbG9hdGluZyB2YWx1ZVxyXG5cclxuICBpZiAoY2FyTWludXRlcyA+IDYwKSB7XHJcbiAgICBjYXJNaW51dGVzID0gYCR7TWF0aC5mbG9vcihjYXJNaW51dGVzIC8gNjApfWggJHtjYXJNaW51dGVzICUgNjB9bWA7XHJcbiAgfSBlbHNlIHtcclxuICAgIGNhck1pbnV0ZXMgPSBgJHtjYXJNaW51dGVzfW1gO1xyXG4gIH1cclxuXHJcbiAgbGV0IHdhbGtNaW51dGVzID0gKGRpc3RhbmNlIC8gNTAwMCkgKiA2MDtcclxuICBsZXQgd2Fsa1NlY29uZHMgPSB3YWxrTWludXRlcyAlIDE7XHJcbiAgd2Fsa01pbnV0ZXMgPSBNYXRoLmZsb29yKHdhbGtNaW51dGVzKTsgLy8gUmVtb3ZlIGZsb2F0aW5nIHZhbHVlXHJcblxyXG4gIGlmICh3YWxrTWludXRlcyA+IDYwKSB7XHJcbiAgICB3YWxrTWludXRlcyA9IGAke01hdGguZmxvb3Iod2Fsa01pbnV0ZXMgLyA2MCl9aCAke3dhbGtNaW51dGVzICUgNjB9bWA7XHJcbiAgfSBlbHNlIHtcclxuICAgIHdhbGtNaW51dGVzID0gYCR7d2Fsa01pbnV0ZXN9bWA7XHJcbiAgfSAgXHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBjYXI6IGAke2Nhck1pbnV0ZXN9ICR7TWF0aC5mbG9vcihwcmVjaXNpb25Sb3VuZCgoY2FyU2Vjb25kcyAvIDEwMCkgKiA2MCwgMikgKiAxMDApfXNgLFxyXG4gICAgd2FsazogYCR7d2Fsa01pbnV0ZXN9ICR7TWF0aC5mbG9vcihwcmVjaXNpb25Sb3VuZCgod2Fsa1NlY29uZHMgLyAxMDApICogNjAsIDIpICogMTAwKX1zYCxcclxuICB9O1xyXG59O1xyXG5cclxuXHJcbmNvbnN0IHByZWNpc2lvblJvdW5kID0gKHZhbHVlLCBwcmVjaXNpb24pID0+IHtcclxuICBjb25zdCBtdWx0aXBsaWVyID0gTWF0aC5wb3coMTAsIHByZWNpc2lvbiB8fCAwKTtcclxuICByZXR1cm4gTWF0aC5yb3VuZCh2YWx1ZSAqIG11bHRpcGxpZXIpIC8gbXVsdGlwbGllcjtcclxufTtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgQ0NESF9DRU5URVI6IHtcclxuICAgIExBVDogNDguNTMxODM5MDY0NDE5NjIsXHJcbiAgICBMTkc6IDIuMDUzNzU2NzEzODY3MTg4XHJcbiAgfSxcclxuICBDQ0RIX0NJVElFUzogWydCUlgnLCAnQ09SJywgJ0RSRCcsICdMRlInLCAnTEdSJywgJ1JJQycsICdST1YnLCAnU0NEJywgJ1NFUicsICdTVEMnLCAnVlNHJ10sXHJcbiAgTUFQX0JPVU5EUzogd2luZG93LkwubGF0TG5nQm91bmRzKFxyXG4gICAgd2luZG93LkwubGF0TG5nKDQ4LjY3OTQwMDcxNTk2Mzg5NCwgMS43MzkwNjA2Njg5NDUzMTI3KSxcclxuICAgIHdpbmRvdy5MLmxhdExuZyg0OC4zODQzOTA3NDE1MTg2NiwgMi4zNDMzOTU5OTYwOTM3NTApXHJcbiAgKSxcclxuICBPU01fTEFZRVI6IHdpbmRvdy5MLnRpbGVMYXllcignaHR0cHM6Ly97c30udGlsZS5vcGVuc3RyZWV0bWFwLm9yZy97en0ve3h9L3t5fS5wbmcnLCB7XHJcbiAgICBhdHRyaWJ1dGlvbjogJyZjb3B5OyA8YSBocmVmPVwiaHR0cHM6Ly93d3cub3BlbnN0cmVldG1hcC5vcmcvY29weXJpZ2h0XCI+T3BlblN0cmVldE1hcDwvYT4nLFxyXG4gICAgbWF4Wm9vbTogMTksXHJcbiAgICBtaW5ab29tOiAxMVxyXG4gIH0pLFxyXG4gIEVTUklfTEFZRVI6IHdpbmRvdy5MLnRpbGVMYXllcignaHR0cHM6Ly9zZXJ2ZXIuYXJjZ2lzb25saW5lLmNvbS9BcmNHSVMvcmVzdC9zZXJ2aWNlcy9Xb3JsZF9JbWFnZXJ5L01hcFNlcnZlci90aWxlL3t6fS97eX0ve3h9Jywge1xyXG4gICAgYXR0cmlidXRpb246ICcmY29weTsgPGEgaHJlZj1cImh0dHBzOi8vd3d3LmFyY2dpcy5jb20vaG9tZS9pdGVtLmh0bWw/aWQ9MTBkZjIyNzlmOTY4NGU0YTlmNmE3ZjA4ZmViYWMyYTlcIj5Fc3JpIEltYWdlcnk8L2E+JyxcclxuICAgIG1heFpvb206IDE5LFxyXG4gICAgbWluWm9vbTogMTFcclxuICB9KSxcclxuICBnZXREaXN0YW5jZUJldHdlZW5Db29yZHM6IGdldERpc3RhbmNlQmV0d2VlbkNvb3JkcyxcclxuICBjb252ZXJ0RGlzdGFuY2VUb1N0cmluZzogY29udmVydERpc3RhbmNlVG9TdHJpbmcsXHJcbiAgYnVpbGREaXN0YW5jZUVUQTogYnVpbGREaXN0YW5jZUVUQSxcclxuICBwcmVjaXNpb25Sb3VuZDogcHJlY2lzaW9uUm91bmRcclxufTtcclxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgJy4uL3Njc3MvRG91cmRhbm5haXNFeHBsb3JlLnNjc3MnO1xyXG5pbXBvcnQgTWFwIGZyb20gJy4vdXRpbHMvTWFwLmpzJztcclxuaW1wb3J0IFV0aWxzIGZyb20gJy4vdXRpbHMvVXRpbHMuanMnO1xyXG5cclxuXHJcbmNsYXNzIERvdXJkYW5uYWlzRXhwbG9yZSB7XHJcblxyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIC8vIE1hcCBpbnRlcm5hbHNcclxuICAgIHRoaXMuX21hcCA9IG51bGw7XHJcbiAgICB0aGlzLl9sYXllcnMgPSB7fTtcclxuXHJcbiAgICAvLyBEYXRhIG9iamVjdFxyXG4gICAgdGhpcy5fZGF0YSA9IHt9O1xyXG5cclxuICAgIHRoaXMuX3VzZXIgPSB7XHJcbiAgICAgIGdlb2xvY2F0aW9uQWxsb3dlZDogZmFsc2UsXHJcbiAgICAgIGxhdDogVXRpbHMuSE9NRV9MQVQsXHJcbiAgICAgIGxuZzogVXRpbHMuSE9NRV9MTkcsXHJcbiAgICAgIGFjY3VyYWN5OiAwLFxyXG4gICAgICBtYXJrZXI6IG51bGxcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5faW5pdEdlb2xvY2F0aW9uKClcclxuICAgICAgLnRoZW4odGhpcy5faW5pdE1hcC5iaW5kKHRoaXMpKVxyXG4gICAgICAudGhlbih0aGlzLl9pbml0RXZlbnRzLmJpbmQodGhpcykpXHJcbiAgICAgIC50aGVuKHRoaXMuX2ZldGNoTWFya2Vycy5iaW5kKHRoaXMpKVxyXG4gICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3dlIGFyZSBkb25lJylcclxuICAgICAgfSk7XHJcbi8vICAgICAgLnRoZW4odGhpcy5fYnVpbGRNYXJrZXJzLmJpbmQodGhpcykpXHJcbi8vICAgICAgLnRoZW4odGhpcy5fYnVpbGRQb2x5Z29ucy5iaW5kKHRoaXMpKTtcclxuICB9XHJcblxyXG5cclxuICAvKiBJbml0IHNlcXVlbmNlICovXHJcblxyXG5cclxuICBfaW5pdEdlb2xvY2F0aW9uKCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xyXG5cdFx0XHRpZiAoJ2dlb2xvY2F0aW9uJyBpbiBuYXZpZ2F0b3IpIHtcclxuICAgICAgICAvLyBUT0RPIDogaW4gbmV4dCB2ZXJzaW9uLCBtYWtlIHRoaXMgYSBwcmVmIGxvdy9oaWdoICh0b2dnbGUpXHJcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgICAgIGVuYWJsZUhpZ2hBY2N1cmFjeTogdHJ1ZSwgLy8gTW9yZSBjb25zdXB0aW9uLCBiZXR0ZXIgcG9zaXRpb25cclxuICAgICAgICAgIG1heGltdW1BZ2U6IDEwMDAsIC8vIEEgcG9zaXRpb24gd2lsbCBsYXN0IDFzIG1heGltdW1cclxuICAgICAgICAgIHRpbWVvdXQ6IDkwMCwgLy8gQSBwb3NpdGlvbiBpcyB1cGRhdGVkIGluIDAuOXMgbWF4aW11bVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbih0aGlzLl9wb3NpdGlvbkluaXRpYWxpemVkLmJpbmQodGhpcyksIG51bGwsIG9wdGlvbnMpO1xyXG5cdFx0XHRcdHRoaXMuX3dhdGNoSWQgPSBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24ud2F0Y2hQb3NpdGlvbih0aGlzLl9wb3NpdGlvblVwZGF0ZS5iaW5kKHRoaXMpLCBudWxsLCBvcHRpb25zKTtcclxuICAgICAgfVxyXG4gICAgICAvLyBEb24ndCBsb2NrIGluaXRpYWxpemF0aW9uIHdhaXRpbmcgZm9yIHBvc1xyXG4gICAgICByZXNvbHZlKCk7XHJcblx0XHR9KTtcclxuICB9XHJcblxyXG5cclxuICBfaW5pdE1hcCgpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuICAgICAgdGhpcy5fbWFwID0gbmV3IE1hcCh7XHJcbiAgICAgICAgdGFyZ2V0SWQ6ICdzYXJtYXRlcy1sYW5kJ1xyXG4gICAgICB9KTtcclxuICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgX2luaXRFdmVudHMoKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICAgIC8vIExpc3RlbmluZyB0byBtb2RhbCBldmVudFxyXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWwtb3ZlcmxheScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5jbG9zZU1vZGFsLmJpbmQodGhpcykpO1xyXG4gICAgICByZXNvbHZlKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG5cclxuICBfZmV0Y2hNYXJrZXJzKCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xyXG4gICAgICBjb25zdCBwcm9taXNlcyA9IFtdO1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IFV0aWxzLkNDREhfQ0lUSUVTLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgcHJvbWlzZXMucHVzaChuZXcgUHJvbWlzZShyZXNvbHZlTG9jYWwgPT4ge1xyXG4gICAgICAgICAgZmV0Y2goYC4vYXNzZXRzL2pzb24vJHtVdGlscy5DQ0RIX0NJVElFU1tpXX0uanNvbmApLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGRhdGEuanNvbigpLnRoZW4oanNvbkRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgIHRoaXMuX2RhdGFbVXRpbHMuQ0NESF9DSVRJRVNbaV1dID0ganNvbkRhdGE7XHJcbiAgICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2J1aWxkUG9seWdvbnModGhpcy5fZGF0YVtVdGlscy5DQ0RIX0NJVElFU1tpXV0uYm91bmRzKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9idWlsZE1hcmtlcnModGhpcy5fZGF0YVtVdGlscy5DQ0RIX0NJVElFU1tpXV0ucG9pcykudGhlbihyZXNvbHZlTG9jYWwpO1xyXG4gICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKHJlc29sdmVMb2NhbCk7XHJcbiAgICAgICAgICB9KS5jYXRjaChyZXNvbHZlTG9jYWwpO1xyXG4gICAgICAgIH0pKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4ocmVzb2x2ZSk7XHJcbi8qXHJcbiAgICAgIGZldGNoKGAuL2Fzc2V0cy9qc29uL01hcERhdGEuanNvbmApLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgZGF0YS5qc29uKCkudGhlbihqc29uRGF0YSA9PiB7XHJcbiAgICAgICAgICB0aGlzLl9kYXRhID0ganNvbkRhdGE7XHJcbiAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgfSkuY2F0Y2gocmVzb2x2ZSk7XHJcbiAgICAgIH0pLmNhdGNoKHJlc29sdmUpO1xyXG4qL1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgX2J1aWxkTWFya2VycyhtYXJrZXJzKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhtYXJrZXJzKTtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBtYXJrZXJzW2tleXNbaV1dLmxlbmd0aDsgKytqKSB7XHJcbiAgICAgICAgICB0aGlzLl9tYXAuYWRkTWFyayhtYXJrZXJzW2tleXNbaV1dW2pdLCB0aGlzLl9jcmVhdGVNYXJrZXJQb3B1cC5iaW5kKHRoaXMpKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgX2J1aWxkUG9seWdvbnMoY2l0eUJvdW5kcykge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xyXG4gICAgICB0aGlzLl9tYXAuYWRkUG9seWdvbihjaXR5Qm91bmRzKTtcclxuICAgICAgLypcclxuICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGNpdHlCb3VuZHMpO1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICB0aGlzLl9tYXAuYWRkUG9seWdvbihjaXR5Qm91bmRzW2tleXNbaV1dKTtcclxuICAgICAgfVxyXG4gICAgICAqL1xyXG4gICAgICByZXNvbHZlKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG5cclxuICAvKiBHZW9sb2MgY2FsbGJhY2tzICovXHJcblxyXG5cclxuICBfcG9zaXRpb25Jbml0aWFsaXplZCgpIHtcclxuICAgIHRoaXMuX3VzZXIuZ2VvbG9jYXRpb25BbGxvd2VkID0gdHJ1ZTtcclxuICB9XHJcblxyXG5cclxuICBfcG9zaXRpb25VcGRhdGUocG9zaXRpb24pIHtcclxuICAgIC8vIE9ubHkgaWYgdXNlciBhbGxvd2VkIGdlb2xvY2F0aW9uO1xyXG4gICAgLy8gU2hvdWxkIG5ldmVyIGJlIGZhbHNlIHdoZW4gY2FsbGVkIGJhY2tcclxuICAgIGlmICh0aGlzLl91c2VyLmdlb2xvY2F0aW9uQWxsb3dlZCA9PT0gdHJ1ZSkge1xyXG4gICAgICAvLyBVcGRhdGUgc2F2ZWQgdXNlciBwb3NpdGlvblxyXG4gICAgICB0aGlzLl91c2VyLmxhdCA9IHBvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZTtcclxuICAgICAgdGhpcy5fdXNlci5sbmcgPSBwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlO1xyXG4gICAgICB0aGlzLl91c2VyLmFjY3VyYWN5ID0gcG9zaXRpb24uY29vcmRzLmFjY3VyYWN5O1xyXG4gICAgICAvLyBPbmx5IGRyYXcgbWFya2VyIGlmIG1hcCBpcyBhbHJlYWR5IGNyZWF0ZWRcclxuICAgICAgaWYgKHRoaXMuX21hcCkge1xyXG4gICAgICAgIHRoaXMuX21hcC5kcmF3VXNlck1hcmtlcigpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcbiAgLyogTWFwIFV0aWxzICovXHJcblxyXG5cclxuICBfY3JlYXRlTWFya2VyUG9wdXAob3B0cykge1xyXG4gICAgY29uc3QgZG9tID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XHJcbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0gzJyk7XHJcbiAgICBjb25zdCBhZGRyZXNzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnSScpO1xyXG4gICAgY29uc3QgdG93biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0knKTtcclxuICAgIGNvbnN0IHBob25lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnQScpO1xyXG4gICAgY29uc3Qgd2Vic2l0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0EnKTtcclxuICAgIGNvbnN0IGluZm8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdQJyk7XHJcbiAgICBjb25zdCBvcGVuV2l0aCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0EnKTtcclxuXHJcbiAgICBkb20uY2xhc3NMaXN0LmFkZCgnbWFya2VyLXBvcHVwJyk7XHJcbiAgICB0aXRsZS5pbm5lckhUTUwgPSBvcHRzLm5hbWU7XHJcbiAgICBhZGRyZXNzLmlubmVySFRNTCA9IG9wdHMuYWRkcmVzcztcclxuICAgIHRvd24uaW5uZXJIVE1MID0gb3B0cy50b3duO1xyXG4gICAgcGhvbmUuaHJlZiA9IGB0ZWw6JHtvcHRzLnBob25lfWA7XHJcbiAgICBwaG9uZS5pbm5lckhUTUwgPSBgPGltZyBzcmM9XCIuL2Fzc2V0cy9pbWcvaWNvbi9waG9uZS5zdmdcIj4ke29wdHMucGhvbmV9YDtcclxuICAgIHdlYnNpdGUuaHJlZiA9IG9wdHMud2Vic2l0ZTtcclxuICAgIHdlYnNpdGUuaW5uZXJIVE1MID0gJzxpbWcgc3JjPVwiLi9hc3NldHMvaW1nL2ljb24vd2ViLnN2Z1wiPkNvbnN1bHRlciBsZSBzaXRlJztcclxuICAgIHdlYnNpdGUuc2V0QXR0cmlidXRlKCdyZWwnLCAnbm9vcGVuZXIgbm9yZWZlcnJlcicpO1xyXG4gICAgd2Vic2l0ZS5zZXRBdHRyaWJ1dGUoJ3RhcmdldCcsICdfYmxhbmsnKTtcclxuICAgIGluZm8uaW5uZXJIVE1MID0gb3B0cy5pbmZvO1xyXG4gICAgb3BlbldpdGguaHJlZiA9IGBnZW86JHtvcHRzLmxhdH0sJHtvcHRzLmxuZ31gO1xyXG4gICAgb3BlbldpdGguaW5uZXJIVE1MID0gJzxpbWcgc3JjPVwiLi9hc3NldHMvaW1nL2ljb24vcGluLnN2Z1wiPk91dnJpciBkYW5zIGxlIEdQUyc7XHJcblxyXG4gICAgZG9tLmFwcGVuZENoaWxkKHRpdGxlKTtcclxuICAgIGRvbS5hcHBlbmRDaGlsZChhZGRyZXNzKTtcclxuICAgIGRvbS5hcHBlbmRDaGlsZCh0b3duKTtcclxuXHJcbiAgICBjb25zdCBidXR0b24gPSB0aGlzLl9tYXJrZXJPcGVuZWRTdGF0ZShvcHRzLnRpbWV0YWJsZSk7XHJcbiAgICBkb20uYXBwZW5kQ2hpbGQoYnV0dG9uKTtcclxuXHJcbiAgICBsZXQgYWx3YXlzQ2xvc2VkID0gdHJ1ZTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3B0cy50aW1ldGFibGUubGVuZ3RoOyArK2kpIHtcclxuICAgICAgaWYgKG9wdHMudGltZXRhYmxlW2ldLmlzT3BlbiA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIGFsd2F5c0Nsb3NlZCA9IGZhbHNlO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBBbGxvdyBtb2RhbCBvbmx5IGlmIHBvaSBoYXMgdGltZXRhYmxlIGFuZCBpcyBub3QgYWx3YXlzIGNsb3NlZFxyXG4gICAgaWYgKG9wdHMudGltZXRhYmxlLmxlbmd0aCA+IDAgJiYgYWx3YXlzQ2xvc2VkID09PSBmYWxzZSkge1xyXG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl90aW1ldGJhbGVNb2RhbC5iaW5kKHRoaXMsIG9wdHMpKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgaWYgKG9wdHMuaW5mbyAhPT0gJycpIHtcclxuICAgICAgZG9tLmFwcGVuZENoaWxkKGluZm8pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChvcHRzLnBob25lICE9PSAnJykge1xyXG4gICAgICBkb20uYXBwZW5kQ2hpbGQocGhvbmUpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChvcHRzLndlYnNpdGUgIT09ICcnKSB7XHJcbiAgICAgIGRvbS5hcHBlbmRDaGlsZCh3ZWJzaXRlKTtcclxuICAgIH0gICAgXHJcbiAgICBcclxuICAgIGRvbS5hcHBlbmRDaGlsZChvcGVuV2l0aCk7XHJcblxyXG4gICAgcmV0dXJuIGRvbTtcclxuICB9XHJcblxyXG5cclxuICBfbWFya2VyT3BlbmVkU3RhdGUodGltZXRhYmxlKSB7XHJcbiAgICBjb25zdCBkb20gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcclxuICAgIGNvbnN0IHN0YXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnSDUnKTtcclxuICAgIGNvbnN0IG1vcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdJJyk7XHJcbiAgICBkb20uY2xhc3NMaXN0LmFkZCgnbWFya2VyLW9wZW5lZCcpO1xyXG4gICAgZG9tLmFwcGVuZENoaWxkKHN0YXRlKTtcclxuICAgIGRvbS5hcHBlbmRDaGlsZChtb3JlKTtcclxuICAgIFxyXG4gICAgaWYgKHRpbWV0YWJsZS5sZW5ndGgpIHtcclxuICAgICAgbGV0IGFsd2F5c0Nsb3NlZCA9IHRydWU7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGltZXRhYmxlLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgaWYgKHRpbWV0YWJsZVtpXS5pc09wZW4gPT09IHRydWUpIHtcclxuICAgICAgICAgIGFsd2F5c0Nsb3NlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoYWx3YXlzQ2xvc2VkID09PSB0cnVlKSB7XHJcbiAgICAgICAgdGhpcy5fbWFya2VySXNDbG9zZWQoZG9tLCB0cnVlKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLl9jaGVja1RpbWUodGltZXRhYmxlLCBkb20pO1xyXG4gICAgICAgIC8vIFVwZGF0ZSBlYWNoIG1pbnV0ZXNcclxuICAgICAgICAvLyBUT0RPIHN0b3JlIGludGVydmFsIGlmIHRvIGJlIHJlYWR5IHRvIGNhbmNlbCB3aGVuIG90aGVyIG5hdmlnYXRpb24gbW9kZSBhdmFpbGFibGVcclxuICAgICAgICBzZXRJbnRlcnZhbCh0aGlzLl9jaGVja1RpbWUuYmluZCh0aGlzLCB0aW1ldGFibGUsIGRvbSksIDYwMDAwKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5fbWFya2VySXNPcGVuZWQoZG9tLCB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZG9tO1xyXG4gIH1cclxuXHJcblxyXG4gIF9jaGVja1RpbWUodGltZXRhYmxlLCBkb20pIHtcclxuICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XHJcbiAgICBsZXQgaG91ciA9IG5vdy5nZXRIb3VycygpO1xyXG4gICAgbGV0IG1pbnV0ZXMgPSBub3cuZ2V0TWludXRlcygpO1xyXG4gICAgaWYgKG1pbnV0ZXMgPCAxMCkge1xyXG4gICAgICBtaW51dGVzID0gYDAke21pbnV0ZXN9YDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBkYXlPZldlZWsgPSBub3cuZ2V0RGF5KCkgLSAxO1xyXG4gICAgY29uc3Qgb3BlbmluZ1RpbWUgPSBwYXJzZUludChgJHt0aW1ldGFibGVbZGF5T2ZXZWVrXS5vcGVuLmh9JHt0aW1ldGFibGVbZGF5T2ZXZWVrXS5vcGVuLm19YCk7XHJcbiAgICBjb25zdCBjbG9zaW5nVGltZSA9IHBhcnNlSW50KGAke3RpbWV0YWJsZVtkYXlPZldlZWtdLmNsb3NlLmh9JHt0aW1ldGFibGVbZGF5T2ZXZWVrXS5jbG9zZS5tfWApO1xyXG4gICAgY29uc3QgY3VycmVudFRpbWUgPSBwYXJzZUludChgJHtob3VyfSR7bWludXRlc31gKTtcclxuICAgIC8vIFdvbid0IHdvcmsgaWYgdGltZXRhYmxlIG9wZW4vY2xvc2UgaG91cnMgYXJlbid0IG9uIHRoZSBzYW1lIGRheVxyXG4gICAgaWYgKHRpbWV0YWJsZVtkYXlPZldlZWtdLmlzT3BlbiAmJiBpc05hTihvcGVuaW5nVGltZSkpIHsgLy8gMjQvNyBvcGVuaW5nXHJcbiAgICAgIHRoaXMuX21hcmtlcklzT3BlbmVkKGRvbSwgdHJ1ZSk7XHJcbiAgICB9IGVsc2UgaWYgKHRpbWV0YWJsZVtkYXlPZldlZWtdLmlzT3BlbiAmJiBjdXJyZW50VGltZSA+PSBvcGVuaW5nVGltZSAmJiBjdXJyZW50VGltZSA8IGNsb3NpbmdUaW1lKSB7XHJcbiAgICAgIGlmICh0aW1ldGFibGVbZGF5T2ZXZWVrXS5icmVhay5oYXNCcmVhaykge1xyXG4gICAgICAgIGNvbnN0IGJyZWFrT3BlbmluZ1RpbWUgPSBwYXJzZUludChgJHt0aW1ldGFibGVbZGF5T2ZXZWVrXS5icmVhay5lbmQuaH0ke3RpbWV0YWJsZVtkYXlPZldlZWtdLmJyZWFrLmVuZC5tfWApO1xyXG4gICAgICAgIGNvbnN0IGJyZWFrQ2xvc2luZ1RpbWUgPSBwYXJzZUludChgJHt0aW1ldGFibGVbZGF5T2ZXZWVrXS5icmVhay5zdGFydC5ofSR7dGltZXRhYmxlW2RheU9mV2Vla10uYnJlYWsuc3RhcnQubX1gKTtcclxuICAgICAgICBpZiAoY3VycmVudFRpbWUgPj0gYnJlYWtDbG9zaW5nVGltZSAmJiBjdXJyZW50VGltZSA8IGJyZWFrT3BlbmluZ1RpbWUpIHtcclxuICAgICAgICAgIHRoaXMuX21hcmtlcklzQ2xvc2VkKGRvbSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuX21hcmtlcklzT3BlbmVkKGRvbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuX21hcmtlcklzT3BlbmVkKGRvbSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7ICAgICAgXHJcbiAgICAgIHRoaXMuX21hcmtlcklzQ2xvc2VkKGRvbSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcbiAgX21hcmtlcklzT3BlbmVkKGRvbSwgYWx3YXlzT3BlbmVkKSB7XHJcbiAgICBkb20uZmlyc3RDaGlsZC5pbm5lckhUTUwgPSBgT3V2ZXJ0YDtcclxuICAgIGlmIChhbHdheXNPcGVuZWQgPT09IHRydWUpIHtcclxuICAgICAgZG9tLmxhc3RDaGlsZC5pbm5lckhUTUwgPSBgVG91am91cnMgb3V2ZXJ0YDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGRvbS5sYXN0Q2hpbGQuaW5uZXJIVE1MID0gYFZvaXIgbGVzIGhvcmFpcmVzYDtcclxuICAgIH1cclxuICAgIGRvbS5jbGFzc0xpc3QuYWRkKCdvcGVuZWQnKTtcclxuICB9XHJcblxyXG5cclxuICBfbWFya2VySXNDbG9zZWQoZG9tLCBhbHdheXNDbG9zZWQpIHtcclxuICAgIGRvbS5maXJzdENoaWxkLmlubmVySFRNTCA9IGBGZXJtw6lgO1xyXG4gICAgaWYgKGFsd2F5c0Nsb3NlZCkge1xyXG4gICAgICBkb20ubGFzdENoaWxkLmlubmVySFRNTCA9ICdUb3Vqb3VycyBmZXJtw6knO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZG9tLmxhc3RDaGlsZC5pbm5lckhUTUwgPSBgVm9pciBsZXMgaG9yYWlyZXNgO1xyXG4gICAgfVxyXG4gICAgZG9tLmNsYXNzTGlzdC5yZW1vdmUoJ29wZW5lZCcpO1xyXG4gIH1cclxuXHJcblxyXG4gIF90aW1ldGJhbGVNb2RhbChvcHRzKSB7XHJcbiAgICB0aGlzLmZldGNoTW9kYWwoJ3RpbWV0YWJsZW1vZGFsJykudGhlbihkb20gPT4ge1xyXG4gICAgICAvLyBVcGRhdGluZyBtb2RhbCBoZWFkZXIgYW5kIGluZm9cclxuICAgICAgZG9tLnF1ZXJ5U2VsZWN0b3IoJyNtYXJrLW5hbWUnKS5pbm5lckhUTUwgPSBvcHRzLm5hbWU7XHJcbiAgICAgIGRvbS5xdWVyeVNlbGVjdG9yKCcjbWFyay1hZGRyZXNzJykuaW5uZXJIVE1MID0gYCR7b3B0cy5hZGRyZXNzfSwgJHtvcHRzLnRvd259YDtcclxuICAgICAgY29uc3QgZGlzdGFuY2UgPSBVdGlscy5nZXREaXN0YW5jZUJldHdlZW5Db29yZHMoW29wdHMubGF0LCBvcHRzLmxuZ10sIFt0aGlzLl91c2VyLmxhdCwgdGhpcy5fdXNlci5sbmddKTtcclxuICAgICAgZG9tLnF1ZXJ5U2VsZWN0b3IoJyNtYXJrLWRpc3RhbmNlJykuaW5uZXJIVE1MID0gYFZvdXMgw6h0ZXMgw6AgZW52aXJvbiAke1V0aWxzLmNvbnZlcnREaXN0YW5jZVRvU3RyaW5nKGRpc3RhbmNlKX0gZGUgPGI+JHtvcHRzLm5hbWV9PC9iPiDDoCB2b2wgZCdvaXNlYXVgO1xyXG4gICAgICBjb25zdCBldGEgPSBVdGlscy5idWlsZERpc3RhbmNlRVRBKGRpc3RhbmNlKTtcclxuICAgICAgZG9tLnF1ZXJ5U2VsZWN0b3IoJyNtYXJrLWV0YScpLmlubmVySFRNTCA9IGBDZSBxdWkgcmVwcsOpc2VudGUgZW52aXJvbiAke2V0YS5jYXJ9IGVuIHZvaXR1cmUsIG91ICR7ZXRhLndhbGt9IMOgIHBpZWQuYDtcclxuICAgICAgZG9tLnF1ZXJ5U2VsZWN0b3IoJyNtYXJrLXN0YXRlJykuYXBwZW5kQ2hpbGQodGhpcy5fbWFya2VyT3BlbmVkU3RhdGUob3B0cy50aW1ldGFibGUpKTtcclxuICAgICAgLy8gTm93IHVwZGF0ZSBkYXkgYnkgZGF5XHJcbiAgICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XHJcbiAgICAgIGNvbnN0IGRheU9mV2VlayA9IG5vdy5nZXREYXkoKSAtIDE7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3B0cy50aW1ldGFibGUubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICBjb25zdCBkYXlEb20gPSBkb20ucXVlcnlTZWxlY3RvcignI3RpbWV0YWJsZScpLmNoaWxkcmVuW2ldO1xyXG4gICAgICAgIGlmIChvcHRzLnRpbWV0YWJsZVtpXS5pc09wZW4gPT09IHRydWUpIHtcclxuICAgICAgICAgIGNvbnN0IG1vcm5pbmcgPSBkYXlEb20ubGFzdEVsZW1lbnRDaGlsZC5maXJzdEVsZW1lbnRDaGlsZDtcclxuICAgICAgICAgIGNvbnN0IGFmdGVybm9vbiA9IGRheURvbS5sYXN0RWxlbWVudENoaWxkLmxhc3RFbGVtZW50Q2hpbGQ7XHJcbiAgICAgICAgICBpZiAob3B0cy50aW1ldGFibGVbaV0uYnJlYWsgJiYgb3B0cy50aW1ldGFibGVbaV0uYnJlYWsuaGFzQnJlYWsgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgbW9ybmluZy5pbm5lckhUTUwgPSBgPHA+JHtvcHRzLnRpbWV0YWJsZVtpXS5vcGVuLmh9OiR7b3B0cy50aW1ldGFibGVbaV0ub3Blbi5tfSDigJIgJHtvcHRzLnRpbWV0YWJsZVtpXS5icmVhay5zdGFydC5ofToke29wdHMudGltZXRhYmxlW2ldLmJyZWFrLnN0YXJ0Lm19PC9wPmA7XHJcbiAgICAgICAgICAgIG1vcm5pbmcuY2xhc3NMaXN0LmFkZCgnZmlsbGVkJyk7IC8vIE1vcm5pbmdcclxuICAgICAgICAgICAgbW9ybmluZy5jbGFzc0xpc3QuYWRkKCdzcGxpdGVkJyk7IC8vIE1vcm5pbmdcclxuICAgICAgICAgICAgYWZ0ZXJub29uLmlubmVySFRNTCA9IGA8cD4ke29wdHMudGltZXRhYmxlW2ldLmJyZWFrLmVuZC5ofToke29wdHMudGltZXRhYmxlW2ldLmJyZWFrLmVuZC5tfSDigJIgJHtvcHRzLnRpbWV0YWJsZVtpXS5jbG9zZS5ofToke29wdHMudGltZXRhYmxlW2ldLmNsb3NlLm19PC9wPmA7XHJcbiAgICAgICAgICAgIGFmdGVybm9vbi5jbGFzc0xpc3QuYWRkKCdmaWxsZWQnKTsgLy8gQWZ0ZXJub29uXHJcbiAgICAgICAgICAgIGFmdGVybm9vbi5jbGFzc0xpc3QuYWRkKCdzcGxpdGVkJyk7IC8vIEFmdGVybm9vblxyXG4gICAgICAgICAgfSBlbHNlIGlmIChvcHRzLnRpbWV0YWJsZVtpXS5vcGVuLmggJiYgb3B0cy50aW1ldGFibGVbaV0uY2xvc2UuaCkge1xyXG4gICAgICAgICAgICBtb3JuaW5nLmlubmVySFRNTCA9IGA8cD4ke29wdHMudGltZXRhYmxlW2ldLm9wZW4uaH06JHtvcHRzLnRpbWV0YWJsZVtpXS5vcGVuLm19PC9wPmA7XHJcbiAgICAgICAgICAgIG1vcm5pbmcuY2xhc3NMaXN0LmFkZCgnZmlsbGVkJyk7IC8vIE1vcm5pbmdcclxuICAgICAgICAgICAgYWZ0ZXJub29uLmlubmVySFRNTCA9IGA8cD4ke29wdHMudGltZXRhYmxlW2ldLmNsb3NlLmh9OiR7b3B0cy50aW1ldGFibGVbaV0uY2xvc2UubX08L3A+YDtcclxuICAgICAgICAgICAgYWZ0ZXJub29uLmNsYXNzTGlzdC5hZGQoJ2ZpbGxlZCcpOyAvLyBBZnRlcm5vb25cclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG1vcm5pbmcuaW5uZXJIVE1MID0gYDxwPjAwOjAwPC9wPmA7XHJcbiAgICAgICAgICAgIG1vcm5pbmcuY2xhc3NMaXN0LmFkZCgnZmlsbGVkJyk7IC8vIE1vcm5pbmdcclxuICAgICAgICAgICAgYWZ0ZXJub29uLmlubmVySFRNTCA9IGA8cD4yNDowMDwvcD5gO1xyXG4gICAgICAgICAgICBhZnRlcm5vb24uY2xhc3NMaXN0LmFkZCgnZmlsbGVkJyk7IC8vIEFmdGVybm9vblxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBkYXlEb20ubGFzdEVsZW1lbnRDaGlsZC5pbm5lckhUTUwgPSBgPGRpdiBjbGFzcz1cImNsb3NlZFwiPjxwPkZlcm3DqTwvcD48L2Rpdj5gOyAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gTWF0Y2hpbmcgdG9kYXkncyBkYXlcclxuICAgICAgICBpZiAoaSA9PT0gZGF5T2ZXZWVrKSB7XHJcbiAgICAgICAgICBkYXlEb20uY2xhc3NMaXN0LmFkZCgndG9kYXknKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RhbC1vdmVybGF5JykuYXBwZW5kQ2hpbGQoZG9tKTtcclxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsLW92ZXJsYXknKS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG5cdFx0XHRzZXRUaW1lb3V0KCgpID0+IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RhbC1vdmVybGF5Jykuc3R5bGUub3BhY2l0eSA9IDEsIDUwKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbi8qIFNlYXJjaCBtb2RhbCBtZXRob2RzICovXHJcblxyXG4vKlxyXG4gIF9zZWFyY2hNb2RhbCgpIHtcclxuICAgIHRoaXMuX2ZldGNoTW9kYWwoJ3NlYXJjaG1vZGFsJykudGhlbihkb20gPT4ge1xyXG4gICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXModGhpcy5fbWFya3MpO1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICBkb20uZmlyc3RFbGVtZW50Q2hpbGQuYXBwZW5kQ2hpbGQodGhpcy5fY3JlYXRlTWFya0NhdGVnb3J5U2VhcmNoSWNvbihrZXlzW2ldKSk7XHJcbiAgICAgIH1cclxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsLW92ZXJsYXknKS5hcHBlbmRDaGlsZChkb20pO1xyXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWwtb3ZlcmxheScpLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XHJcblx0XHRcdHNldFRpbWVvdXQoKCkgPT4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsLW92ZXJsYXknKS5zdHlsZS5vcGFjaXR5ID0gMSwgNTApO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgX2NyZWF0ZU1hcmtDYXRlZ29yeVNlYXJjaEljb24odHlwZSkge1xyXG4gICAgY29uc3QgZG9tID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XHJcbiAgICBjb25zdCBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdJTUcnKTtcclxuICAgIGNvbnN0IGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnUCcpO1xyXG4gICAgZG9tLmNsYXNzTGlzdC5hZGQoJ2ZpbHRlcmluZy1lbGVtZW50Jyk7XHJcbiAgICBpbWcuc3JjID0gYC9hc3NldHMvaW1nL21hcmtlci8ke3R5cGV9LnN2Z2A7XHJcbiAgICBsYWJlbC5pbm5lckhUTUwgPSB0eXBlO1xyXG4gICAgZG9tLmFwcGVuZENoaWxkKGltZyk7XHJcbiAgICBkb20uYXBwZW5kQ2hpbGQobGFiZWwpO1xyXG4gICAgcmV0dXJuIGRvbTtcclxuICB9XHJcbiovXHJcblxyXG4gIC8qIE1vZGFsIG1ldGhvZHMgKi9cclxuXHJcbiAgZmV0Y2hNb2RhbCh1cmwpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuICAgICAgZmV0Y2goYC4vYXNzZXRzL2h0bWwvJHt1cmx9Lmh0bWxgKS50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgIGRhdGEudGV4dCgpLnRoZW4oaHRtbCA9PiB7XHJcbiAgICAgICAgICByZXNvbHZlKGRvY3VtZW50LmNyZWF0ZVJhbmdlKCkuY3JlYXRlQ29udGV4dHVhbEZyYWdtZW50KGh0bWwpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG5cclxuICBjbG9zZU1vZGFsKGV2ZW50LCBmb3JjZSkge1xyXG5cdFx0aWYgKGZvcmNlID09PSB0cnVlIHx8IGV2ZW50LnRhcmdldC5pZCA9PT0gJ21vZGFsLW92ZXJsYXknIHx8IGV2ZW50LnRhcmdldC5pZC5pbmRleE9mKCdjbG9zZScpICE9PSAtMSkge1xyXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWwtb3ZlcmxheScpLnN0eWxlLm9wYWNpdHkgPSAwO1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWwtb3ZlcmxheScpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsLW92ZXJsYXknKS5pbm5lckhUTUwgPSAnJztcclxuICAgICAgfSwgMzAwKTtcclxuICAgIH1cclxuICB9XHJcblxyXG5cclxuICBnZXQgdXNlcigpIHtcclxuICAgIHJldHVybiB0aGlzLl91c2VyO1xyXG4gIH1cclxuXHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBEb3VyZGFubmFpc0V4cGxvcmU7XHJcbiJdLCJuYW1lcyI6WyJNYXJrZXJzIiwiVXRpbHMiLCJNYXAiLCJvcHRpb25zIiwiX2NsYXNzQ2FsbENoZWNrIiwiX2lkIiwidGFyZ2V0SWQiLCJfbWFwIiwiX21hcmtzIiwiX3BvbHlnb25zIiwiX2xheWVycyIsIkNhcnRlIiwiU2F0ZWxsaXRlIiwiX2luaXQiLCJfZXZlbnRzIiwiX2NyZWF0ZUNsYXNzIiwia2V5IiwidmFsdWUiLCJ3aW5kb3ciLCJMIiwibWFwIiwiem9vbUNvbnRyb2wiLCJzZXRWaWV3IiwiQ0NESF9DRU5URVIiLCJMQVQiLCJMTkciLCJjb250cm9sIiwic2NhbGUiLCJhZGRUbyIsInNldE1heEJvdW5kcyIsIk1BUF9CT1VORFMiLCJPU01fTEFZRVIiLCJFU1JJX0xBWUVSIiwibGF5ZXJzIiwicG9zaXRpb24iLCJfdGhpcyIsIm9uIiwiX21hcENsaWNrZWQiLCJiaW5kIiwicGFuSW5zaWRlQm91bmRzIiwiYW5pbWF0ZSIsIm9wdHMiLCJjb25zb2xlIiwibG9nIiwibGF0bG5nIiwiSlNPTiIsInN0cmluZ2lmeSIsImxhdCIsImxuZyIsImRyYXdVc2VyTWFya2VyIiwiZHgiLCJ1c2VyIiwibWFya2VyIiwiaWNvbiIsInNldExhdExuZyIsImFkZE1hcmsiLCJjcmVhdGVQb3B1cCIsIl90aGlzMiIsInR5cGVzIiwidHlwZSIsInNwbGl0IiwibGVuZ3RoIiwiY29uY2F0IiwiZmx5VG8iLCJiaW5kUG9wdXAiLCJpIiwicHVzaCIsImFkZFBvbHlnb24iLCJwb2x5Z29uIiwiT2JqZWN0IiwiZnJlZXplIiwicmVzdGF1cmFudCIsIkljb24iLCJpY29uVXJsIiwiaWNvblNpemUiLCJpY29uQW5jaG9yIiwicG9wdXBBbmNob3IiLCJzaGFkb3dVcmwiLCJzaGFkb3dTaXplIiwic2hhZG93QW5jaG9yIiwiYmFyIiwiY2VsbGFyIiwidG9iYWNjbyIsImdyb2NlcnkiLCJkaXkiLCJmb290IiwicnVnYnkiLCJwaW5ncG9uZyIsInNrYXRlIiwiYm9jY2UiLCJ0ZW5uaXMiLCJiYWtlcnkiLCJmaXNoIiwiYnV0Y2hlciIsImJvb2siLCJsYW5kbWFyayIsImNhc3RsZSIsImNodXJjaCIsIm11c2V1bSIsImdhcmRlbiIsImNhciIsInRyYWluIiwiYW5pbWFsIiwiZGVudGFsIiwicGhhcm1hY3kiLCJtZWRpYyIsImRlZmlicmlsbGF0b3IiLCJjZW1ldGVyeSIsImZpcmVmaWdodGVyIiwicG9saWNlIiwibWFpbCIsImJhbmsiLCJwYXJrIiwicmVjeWNsZSIsImFkbWluaXN0cmF0aW9uIiwic2Nob29sIiwiZ2V0RGlzdGFuY2VCZXR3ZWVuQ29vcmRzIiwiZnJvbSIsInRvIiwibG9uMSIsIk1hdGgiLCJQSSIsImxhdDEiLCJsb24yIiwibGF0MiIsImRlbHRhTGF0IiwiZGVsdGFMb24iLCJhIiwicG93Iiwic2luIiwiY29zIiwiYyIsImFzaW4iLCJzcXJ0IiwiY29udmVydERpc3RhbmNlVG9TdHJpbmciLCJkaXN0YW5jZSIsInByZWNpc2lvblJvdW5kIiwiYnVpbGREaXN0YW5jZUVUQSIsImNhck1pbnV0ZXMiLCJjYXJTZWNvbmRzIiwiZmxvb3IiLCJ3YWxrTWludXRlcyIsIndhbGtTZWNvbmRzIiwid2FsayIsInByZWNpc2lvbiIsIm11bHRpcGxpZXIiLCJyb3VuZCIsIkNDREhfQ0lUSUVTIiwibGF0TG5nQm91bmRzIiwibGF0TG5nIiwidGlsZUxheWVyIiwiYXR0cmlidXRpb24iLCJtYXhab29tIiwibWluWm9vbSIsIkRvdXJkYW5uYWlzRXhwbG9yZSIsIl9kYXRhIiwiX3VzZXIiLCJnZW9sb2NhdGlvbkFsbG93ZWQiLCJIT01FX0xBVCIsIkhPTUVfTE5HIiwiYWNjdXJhY3kiLCJfaW5pdEdlb2xvY2F0aW9uIiwidGhlbiIsIl9pbml0TWFwIiwiX2luaXRFdmVudHMiLCJfZmV0Y2hNYXJrZXJzIiwiUHJvbWlzZSIsInJlc29sdmUiLCJuYXZpZ2F0b3IiLCJlbmFibGVIaWdoQWNjdXJhY3kiLCJtYXhpbXVtQWdlIiwidGltZW91dCIsImdlb2xvY2F0aW9uIiwiZ2V0Q3VycmVudFBvc2l0aW9uIiwiX3Bvc2l0aW9uSW5pdGlhbGl6ZWQiLCJfd2F0Y2hJZCIsIndhdGNoUG9zaXRpb24iLCJfcG9zaXRpb25VcGRhdGUiLCJfdGhpczMiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNsb3NlTW9kYWwiLCJfdGhpczQiLCJwcm9taXNlcyIsIl9sb29wIiwicmVzb2x2ZUxvY2FsIiwiZmV0Y2giLCJkYXRhIiwianNvbiIsImpzb25EYXRhIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiX2J1aWxkUG9seWdvbnMiLCJib3VuZHMiLCJfYnVpbGRNYXJrZXJzIiwicG9pcyIsImFsbCIsIm1hcmtlcnMiLCJfdGhpczUiLCJrZXlzIiwiaiIsIl9jcmVhdGVNYXJrZXJQb3B1cCIsImNpdHlCb3VuZHMiLCJfdGhpczYiLCJjb29yZHMiLCJsYXRpdHVkZSIsImxvbmdpdHVkZSIsImRvbSIsImNyZWF0ZUVsZW1lbnQiLCJ0aXRsZSIsImFkZHJlc3MiLCJ0b3duIiwicGhvbmUiLCJ3ZWJzaXRlIiwiaW5mbyIsIm9wZW5XaXRoIiwiY2xhc3NMaXN0IiwiYWRkIiwiaW5uZXJIVE1MIiwibmFtZSIsImhyZWYiLCJzZXRBdHRyaWJ1dGUiLCJhcHBlbmRDaGlsZCIsImJ1dHRvbiIsIl9tYXJrZXJPcGVuZWRTdGF0ZSIsInRpbWV0YWJsZSIsImFsd2F5c0Nsb3NlZCIsImlzT3BlbiIsIl90aW1ldGJhbGVNb2RhbCIsInN0YXRlIiwibW9yZSIsIl9tYXJrZXJJc0Nsb3NlZCIsIl9jaGVja1RpbWUiLCJzZXRJbnRlcnZhbCIsIl9tYXJrZXJJc09wZW5lZCIsIm5vdyIsIkRhdGUiLCJob3VyIiwiZ2V0SG91cnMiLCJtaW51dGVzIiwiZ2V0TWludXRlcyIsImRheU9mV2VlayIsImdldERheSIsIm9wZW5pbmdUaW1lIiwicGFyc2VJbnQiLCJvcGVuIiwiaCIsIm0iLCJjbG9zaW5nVGltZSIsImNsb3NlIiwiY3VycmVudFRpbWUiLCJpc05hTiIsImhhc0JyZWFrIiwiYnJlYWtPcGVuaW5nVGltZSIsImVuZCIsImJyZWFrQ2xvc2luZ1RpbWUiLCJzdGFydCIsImFsd2F5c09wZW5lZCIsImZpcnN0Q2hpbGQiLCJsYXN0Q2hpbGQiLCJyZW1vdmUiLCJfdGhpczciLCJmZXRjaE1vZGFsIiwicXVlcnlTZWxlY3RvciIsImV0YSIsImRheURvbSIsImNoaWxkcmVuIiwibW9ybmluZyIsImxhc3RFbGVtZW50Q2hpbGQiLCJmaXJzdEVsZW1lbnRDaGlsZCIsImFmdGVybm9vbiIsInN0eWxlIiwiZGlzcGxheSIsInNldFRpbWVvdXQiLCJvcGFjaXR5IiwidXJsIiwidGV4dCIsImh0bWwiLCJjcmVhdGVSYW5nZSIsImNyZWF0ZUNvbnRleHR1YWxGcmFnbWVudCIsImV2ZW50IiwiZm9yY2UiLCJ0YXJnZXQiLCJpZCIsImluZGV4T2YiLCJnZXQiXSwic291cmNlUm9vdCI6IiJ9
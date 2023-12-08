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
  beauty: new window.L.Icon({
    iconUrl: 'assets/img/marker/beauty.svg',
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
  basket: new window.L.Icon({
    iconUrl: 'assets/img/marker/basket.svg',
    iconSize: [26, 26],
    iconAnchor: [13, 13],
    popupAnchor: [0, -13],
    shadowUrl: 'assets/img/marker/marker-shadow.png',
    shadowSize: [42, 42],
    shadowAnchor: [20, 20]
  }),
  pool: new window.L.Icon({
    iconUrl: 'assets/img/marker/pool.svg',
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
  music: new window.L.Icon({
    iconUrl: 'assets/img/marker/music.svg',
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
  tourism: new window.L.Icon({
    iconUrl: 'assets/img/marker/tourism.svg',
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
  gas: new window.L.Icon({
    iconUrl: 'assets/img/marker/gas.svg',
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
  lab: new window.L.Icon({
    iconUrl: 'assets/img/marker/lab.svg',
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
        // Check for day breaks
        if (timetable[dayOfWeek]["break"].hasBreak) {
          // In case of several day breaks
          if (timetable[dayOfWeek]["break"].several) {
            var isClosed = false;
            for (var i = 0; i < timetable[dayOfWeek]["break"].several.length; ++i) {
              var breakOpeningTime = parseInt("".concat(timetable[dayOfWeek]["break"].several[i].end.h).concat(timetable[dayOfWeek]["break"].several[i].end.m));
              var breakClosingTime = parseInt("".concat(timetable[dayOfWeek]["break"].several[i].start.h).concat(timetable[dayOfWeek]["break"].several[i].start.m));
              if (currentTime >= breakClosingTime && currentTime < breakOpeningTime) {
                this._markerIsClosed(dom);
                isClosed = true;
                break;
              }
              if (!isClosed) {
                this._markerIsOpened(dom);
              }
            }
          } else {
            var _breakOpeningTime = parseInt("".concat(timetable[dayOfWeek]["break"].end.h).concat(timetable[dayOfWeek]["break"].end.m));
            var _breakClosingTime = parseInt("".concat(timetable[dayOfWeek]["break"].start.h).concat(timetable[dayOfWeek]["break"].start.m));
            if (currentTime >= _breakClosingTime && currentTime < _breakOpeningTime) {
              this._markerIsClosed(dom);
            } else {
              this._markerIsOpened(dom);
            }
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
              if (opts.timetable[i]["break"].several) {
                morning.innerHTML = "<p>".concat(opts.timetable[i].open.h, ":").concat(opts.timetable[i].open.m, " \u2012 ").concat(opts.timetable[i]["break"].several[0].start.h, ":").concat(opts.timetable[i]["break"].several[0].start.m, "</p>");
                morning.classList.add('filled'); // Morning
                morning.classList.add('splited'); // Morning
                for (var j = 0; j < opts.timetable[i]["break"].several.length - 1; ++j) {
                  var div = document.createElement('DIV');
                  div.innerHTML = "<p>".concat(opts.timetable[i]["break"].several[j].end.h, ":").concat(opts.timetable[i]["break"].several[j].end.m, " \u2012 ").concat(opts.timetable[i]["break"].several[j + 1].start.h, ":").concat(opts.timetable[i]["break"].several[j + 1].start.m, "</p>");
                  div.classList.add('filled');
                  div.classList.add('splited');
                  div.style.borderRadius = '.5rem';
                  div.style.justifyContent = 'center';
                  dayDom.lastElementChild.insertBefore(div, dayDom.lastElementChild.lastElementChild);
                }
                afternoon.innerHTML = "<p>".concat(opts.timetable[i]["break"].several[opts.timetable[i]["break"].several.length - 1].end.h, ":").concat(opts.timetable[i]["break"].several[opts.timetable[i]["break"].several.length - 1].end.m, " \u2012 ").concat(opts.timetable[i].close.h, ":").concat(opts.timetable[i].close.m, "</p>");
                afternoon.classList.add('filled'); // Afternoon
                afternoon.classList.add('splited'); // Afternoon
              } else {
                morning.innerHTML = "<p>".concat(opts.timetable[i].open.h, ":").concat(opts.timetable[i].open.m, " \u2012 ").concat(opts.timetable[i]["break"].start.h, ":").concat(opts.timetable[i]["break"].start.m, "</p>");
                morning.classList.add('filled'); // Morning
                morning.classList.add('splited'); // Morning
                afternoon.innerHTML = "<p>".concat(opts.timetable[i]["break"].end.h, ":").concat(opts.timetable[i]["break"].end.m, " \u2012 ").concat(opts.timetable[i].close.h, ":").concat(opts.timetable[i].close.m, "</p>");
                afternoon.classList.add('filled'); // Afternoon
                afternoon.classList.add('splited'); // Afternoon
              }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGRSxNQUFNLEVBQUUsSUFBSS9ELE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lBQ3hCQyxPQUFPLEVBQUUsOEJBQThCO0lBQ3ZDQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xCQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BCQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGRyxPQUFPLEVBQUUsSUFBSWhFLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lBQ3pCQyxPQUFPLEVBQUUsK0JBQStCO0lBQ3hDQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xCQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BCQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGSSxPQUFPLEVBQUUsSUFBSWpFLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lBQ3pCQyxPQUFPLEVBQUUsK0JBQStCO0lBQ3hDQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xCQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BCQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGSyxHQUFHLEVBQUUsSUFBSWxFLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lBQ3JCQyxPQUFPLEVBQUUsMkJBQTJCO0lBQ3BDQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xCQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BCQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGTSxNQUFNLEVBQUUsSUFBSW5FLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lBQ3hCQyxPQUFPLEVBQUUsOEJBQThCO0lBQ3ZDQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xCQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BCQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGTyxJQUFJLEVBQUUsSUFBSXBFLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lBQ3RCQyxPQUFPLEVBQUUsNEJBQTRCO0lBQ3JDQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xCQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BCQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGUSxLQUFLLEVBQUUsSUFBSXJFLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lBQ3ZCQyxPQUFPLEVBQUUsNkJBQTZCO0lBQ3RDQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xCQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BCQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGUyxNQUFNLEVBQUUsSUFBSXRFLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lBQ3hCQyxPQUFPLEVBQUUsOEJBQThCO0lBQ3ZDQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xCQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BCQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGVSxJQUFJLEVBQUUsSUFBSXZFLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lBQ3RCQyxPQUFPLEVBQUUsNEJBQTRCO0lBQ3JDQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xCQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BCQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGVyxRQUFRLEVBQUUsSUFBSXhFLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lBQzFCQyxPQUFPLEVBQUUsZ0NBQWdDO0lBQ3pDQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xCQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BCQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGWSxLQUFLLEVBQUUsSUFBSXpFLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lBQ3ZCQyxPQUFPLEVBQUUsNkJBQTZCO0lBQ3RDQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xCQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BCQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGYSxLQUFLLEVBQUUsSUFBSTFFLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lBQ3ZCQyxPQUFPLEVBQUUsNkJBQTZCO0lBQ3RDQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xCQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BCQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGYyxNQUFNLEVBQUUsSUFBSTNFLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lBQ3hCQyxPQUFPLEVBQUUsOEJBQThCO0lBQ3ZDQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xCQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BCQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGZSxNQUFNLEVBQUUsSUFBSTVFLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lB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O0lBQ0Y7RUFBQztJQUFBak4sR0FBQTtJQUFBMFIsR0FBQSxFQUdELFNBQUFBLElBQUEsRUFBVztNQUNULE9BQU8sSUFBSSxDQUFDdkksS0FBSztJQUNuQjtFQUFDO0VBQUEsT0FBQUYsa0JBQUE7QUFBQTtBQUtILGlFQUFlQSxrQkFBa0IsRSIsInNvdXJjZXMiOlsid2VicGFjazovL0RvdXJkYW5uYWlzRXhwbG9yZS8uL3NyYy9qcy91dGlscy9NYXAuanMiLCJ3ZWJwYWNrOi8vRG91cmRhbm5haXNFeHBsb3JlLy4vc3JjL2pzL3V0aWxzL01hcmtlckVudW0uanMiLCJ3ZWJwYWNrOi8vRG91cmRhbm5haXNFeHBsb3JlLy4vc3JjL2pzL3V0aWxzL1V0aWxzLmpzIiwid2VicGFjazovL0RvdXJkYW5uYWlzRXhwbG9yZS8uL3NyYy9zY3NzL0RvdXJkYW5uYWlzRXhwbG9yZS5zY3NzIiwid2VicGFjazovL0RvdXJkYW5uYWlzRXhwbG9yZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9Eb3VyZGFubmFpc0V4cGxvcmUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL0RvdXJkYW5uYWlzRXhwbG9yZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL0RvdXJkYW5uYWlzRXhwbG9yZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL0RvdXJkYW5uYWlzRXhwbG9yZS8uL3NyYy9qcy9Eb3VyZGFubmFpc0V4cGxvcmUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE1hcmtlcnMgZnJvbSAnLi9NYXJrZXJFbnVtLmpzJztcclxuaW1wb3J0IFV0aWxzIGZyb20gJy4vVXRpbHMuanMnO1xyXG5cclxuXHJcbmNsYXNzIE1hcCB7XHJcblxyXG5cclxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcbiAgICB0aGlzLl9pZCA9IG9wdGlvbnMudGFyZ2V0SWQ7XHJcbiAgICB0aGlzLl9tYXAgPSBudWxsO1xyXG4gICAgdGhpcy5fbWFya3MgPSB7fTtcclxuICAgIHRoaXMuX3BvbHlnb25zID0gW107XHJcbiAgICB0aGlzLl9sYXllcnMgPSB7XHJcbiAgICAgIENhcnRlOiBudWxsLFxyXG4gICAgICBTYXRlbGxpdGU6IG51bGxcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5faW5pdCgpO1xyXG4gICAgdGhpcy5fZXZlbnRzKCk7XHJcbiAgfVxyXG5cclxuXHJcbiAgX2luaXQoKSB7XHJcbiAgICAvLyBVc2UgbWFpbiBkaXYgdG8gaW5qZWN0IE9TTSBpbnRvXHJcbiAgICB0aGlzLl9tYXAgPSB3aW5kb3cuTC5tYXAodGhpcy5faWQsIHtcclxuICAgICAgem9vbUNvbnRyb2w6IGZhbHNlLFxyXG4gICAgfSkuc2V0VmlldyhbVXRpbHMuQ0NESF9DRU5URVIuTEFULCBVdGlscy5DQ0RIX0NFTlRFUi5MTkddLCAxMik7XHJcbiAgICAvLyBBZGQgbWV0ZXIgYW5kIGZlZXQgc2NhbGUgb24gbWFwXHJcbiAgICB3aW5kb3cuTC5jb250cm9sLnNjYWxlKCkuYWRkVG8odGhpcy5fbWFwKTtcclxuICAgIC8vIFByZXZlbnQgcGFubmluZyBvdXRzaWRlIG9mIHRoZSBtYXAgYm91bmRzIGRlZmluaW5lZCBpbiB1dGlsc1xyXG4gICAgdGhpcy5fbWFwLnNldE1heEJvdW5kcyhVdGlscy5NQVBfQk9VTkRTKTtcclxuICAgIC8vIEFkZCBsYXllciBncm91cCB0byBpbnRlcmZhY2UgYW5kIHN0YXJ0IG1hcCB3aXRoIG9zbSBkZWZhdWx0XHJcbiAgICB0aGlzLl9sYXllcnMuQ2FydGUgPSBVdGlscy5PU01fTEFZRVI7XHJcbiAgICB0aGlzLl9sYXllcnMuU2F0ZWxsaXRlID0gVXRpbHMuRVNSSV9MQVlFUjtcclxuICAgIHRoaXMuX2xheWVycy5DYXJ0ZS5hZGRUbyh0aGlzLl9tYXApO1xyXG4gICAgLy8gQWRkIGxheWVyIHN3aXRjaCByYWRpbyBvbiBib3R0b20gcmlnaHQgb2YgdGhlIG1hcFxyXG4gICAgd2luZG93LkwuY29udHJvbC5sYXllcnModGhpcy5fbGF5ZXJzLCB7fSwgeyBwb3NpdGlvbjogJ2JvdHRvbXJpZ2h0JyB9KS5hZGRUbyh0aGlzLl9tYXApO1xyXG4gIH1cclxuXHJcblxyXG4gIF9ldmVudHMoKSB7XHJcbiAgICAvLyBTdWJzY3JpYmUgdG8gY2xpY2sgZXZlbnQgb24gbWFwIHRvIHJlYWN0XHJcbiAgICB0aGlzLl9tYXAub24oJ2NsaWNrJywgdGhpcy5fbWFwQ2xpY2tlZC5iaW5kKHRoaXMpKTtcclxuICAgIC8vIE1hcCBpcyBkcmFnZ2VkIGJ5IHVzZXIgbW91c2UvZmluZ2VyXHJcbiAgICB0aGlzLl9tYXAub24oJ2RyYWcnLCAoKSA9PiB7XHJcbiAgICAgIC8vIENvbnN0cmFpbiBwYW4gdG8gdGhlIG1hcCBib3VuZHNcclxuICAgICAgdGhpcy5fbWFwLnBhbkluc2lkZUJvdW5kcyhVdGlscy5NQVBfQk9VTkRTLCB7IGFuaW1hdGU6IHRydWUgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG5cclxuICBfbWFwQ2xpY2tlZChvcHRzKSB7XHJcbiAgICBjb25zb2xlLmxvZyhvcHRzLmxhdGxuZywgSlNPTi5zdHJpbmdpZnkob3B0cy5sYXRsbmcubGF0ICsgJywgJyArIG9wdHMubGF0bG5nLmxuZykpO1xyXG4gIH1cclxuXHJcblxyXG4gIGRyYXdVc2VyTWFya2VyKCkge1xyXG4gICAgaWYgKCF3aW5kb3cuZHgudXNlci5tYXJrZXIpIHtcclxuICAgICAgd2luZG93LmR4LnVzZXIubWFya2VyID0gd2luZG93LkwubWFya2VyKFt3aW5kb3cuZHgudXNlci5sYXQsIHdpbmRvdy5keC51c2VyLmxuZ10sIHtcclxuICAgICAgICBpY29uOiBNYXJrZXJzLnVzZXJcclxuICAgICAgfSk7XHJcbiAgICAgIHdpbmRvdy5keC51c2VyLm1hcmtlci5hZGRUbyh0aGlzLl9tYXApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgd2luZG93LmR4LnVzZXIubWFya2VyLnNldExhdExuZyh3aW5kb3cuZHgudXNlcik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcbiAgYWRkTWFyayhvcHRzLCBjcmVhdGVQb3B1cCkge1xyXG4gICAgbGV0IHR5cGVzID0gb3B0cy50eXBlLnNwbGl0KCcvJyk7XHJcbiAgICBsZXQgdHlwZSA9IG9wdHMudHlwZTtcclxuICAgIGlmICh0eXBlcy5sZW5ndGggPiAxKSB7XHJcbiAgICAgIHR5cGUgPSBgJHt0eXBlc1swXX0ke3R5cGVzWzFdfWA7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbWFya2VyID0gd2luZG93LkwubWFya2VyKFtvcHRzLmxhdCwgb3B0cy5sbmddLCB7IFxyXG4gICAgICBpY29uOiBNYXJrZXJzW3R5cGVdXHJcbiAgICB9KS5vbignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMuX21hcC5mbHlUbyhbb3B0cy5sYXQsIG9wdHMubG5nXSwgMTgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgbWFya2VyLmJpbmRQb3B1cChjcmVhdGVQb3B1cChvcHRzKSk7XHJcbiAgICBtYXJrZXIuYWRkVG8odGhpcy5fbWFwKTtcclxuICAgIGlmICh0eXBlcy5sZW5ndGggPiAxKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdHlwZXMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX21hcmtzW3R5cGVzW2ldXSkge1xyXG4gICAgICAgICAgdGhpcy5fbWFya3NbdHlwZXNbaV1dID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX21hcmtzW3R5cGVzW2ldXS5wdXNoKG1hcmtlcik7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICghdGhpcy5fbWFya3NbdHlwZV0pIHtcclxuICAgICAgICB0aGlzLl9tYXJrc1t0eXBlXSA9IFtdO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuX21hcmtzW3R5cGVdLnB1c2gobWFya2VyKTtcclxuICAgIH1cclxuICB9XHJcblxyXG5cclxuICBhZGRQb2x5Z29uKHBvbHlnb24pIHtcclxuICAgIHRoaXMuX3BvbHlnb25zLnB1c2god2luZG93LkwucG9seWdvbihwb2x5Z29uKS5hZGRUbyh0aGlzLl9tYXApKTtcclxuICB9XHJcblxyXG5cclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1hcDtcclxuIiwiZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmZyZWV6ZSh7XHJcbiAgcmVzdGF1cmFudDogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL3Jlc3RhdXJhbnQuc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIGJhcjogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL2Jhci5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgY2VsbGFyOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvY2VsbGFyLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICB0b2JhY2NvOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvdG9iYWNjby5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgZ3JvY2VyeTogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL2dyb2Nlcnkuc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIGRpeTogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL2RpeS5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgYmVhdXR5OiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvYmVhdXR5LnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBmb290OiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvZm9vdC5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgcnVnYnk6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9ydWdieS5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgYmFza2V0OiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvYmFza2V0LnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBwb29sOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvcG9vbC5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgcGluZ3Bvbmc6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9waW5ncG9uZy5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgc2thdGU6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9za2F0ZS5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgYm9jY2U6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9ib2NjZS5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgdGVubmlzOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvdGVubmlzLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBiYWtlcnk6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9icmVhZC5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgZmlzaDogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL2Zpc2guc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIGJ1dGNoZXI6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9idXRjaGVyLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBib29rOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvYm9vay5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgbXVzaWM6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9tdXNpYy5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgbGFuZG1hcms6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9sYW5kbWFyay5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgY2FzdGxlOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvY2FzdGxlLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBjaHVyY2g6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9jaHVyY2guc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIHRvdXJpc206IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci90b3VyaXNtLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBtdXNldW06IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9tdXNldW0uc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIGdhcmRlbjogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL2dhcmRlbi5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgY2FyOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvY2FyLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBnYXM6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9nYXMuc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIHRyYWluOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvdHJhaW4uc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIGFuaW1hbDogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL2FuaW1hbC5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgZGVudGFsOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvZGVudGFsLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBwaGFybWFjeTogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL3BoYXJtYWN5LnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBtZWRpYzogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21lZGljLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBsYWI6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9sYWIuc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIGRlZmlicmlsbGF0b3I6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9kZWZpYnJpbGxhdG9yLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBjZW1ldGVyeTogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL2NlbWV0ZXJ5LnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBmaXJlZmlnaHRlcjogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL2ZpcmVmaWdodGVyLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBwb2xpY2U6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9wb2xpY2Uuc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIG1haWw6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYWlsLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBiYW5rOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvYmFuay5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgcGFyazogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL3Bhcmsuc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIHJlY3ljbGU6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9yZWN5Y2xlLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBhZG1pbmlzdHJhdGlvbjogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL2FkbWluaXN0cmF0aW9uLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBzY2hvb2w6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9zY2hvb2wuc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIHVzZXI6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci91c2VyLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXVxyXG4gIH0pXHJcbn0pO1xyXG4iLCJjb25zdCBnZXREaXN0YW5jZUJldHdlZW5Db29yZHMgPSAoZnJvbSwgdG8pID0+IHtcclxuICAvLyBSZXR1cm4gZGlzdGFuY2UgaW4gbWV0ZXJzXHJcbiAgY29uc3QgbG9uMSA9IChmcm9tWzFdICogTWF0aC5QSSkgLyAxODAsXHJcbiAgICBsYXQxID0gKGZyb21bMF0gKiBNYXRoLlBJKSAvIDE4MCxcclxuICAgIGxvbjIgPSAodG9bMV0gKiBNYXRoLlBJKSAvIDE4MCxcclxuICAgIGxhdDIgPSAodG9bMF0gKiBNYXRoLlBJKSAvIDE4MDtcclxuXHJcbiAgY29uc3QgZGVsdGFMYXQgPSBsYXQyIC0gbGF0MTtcclxuICBjb25zdCBkZWx0YUxvbiA9IGxvbjIgLSBsb24xO1xyXG5cclxuICBjb25zdCBhID0gTWF0aC5wb3coTWF0aC5zaW4oZGVsdGFMYXQgLyAyKSwgMikgKyBNYXRoLmNvcyhsYXQxKSAqIE1hdGguY29zKGxhdDIpICogTWF0aC5wb3coTWF0aC5zaW4oZGVsdGFMb24gLyAyKSwgMik7XHJcbiAgY29uc3QgYyA9IDIgKiBNYXRoLmFzaW4oTWF0aC5zcXJ0KGEpKTtcclxuICByZXR1cm4gYyAqIDYzNzEgKiAxMDAwO1xyXG59O1xyXG5cclxuXHJcbmNvbnN0IGNvbnZlcnREaXN0YW5jZVRvU3RyaW5nID0gZGlzdGFuY2UgPT4ge1xyXG4gIGlmIChkaXN0YW5jZSA+IDEwMDApIHtcclxuICAgIGRpc3RhbmNlID0gYCR7cHJlY2lzaW9uUm91bmQoZGlzdGFuY2UgLyAxMDAwLCAyKX1rbWA7XHJcbiAgfSBlbHNlIHtcclxuICAgIGRpc3RhbmNlID0gYCR7cHJlY2lzaW9uUm91bmQoZGlzdGFuY2UsIDIpfW1gO1xyXG4gIH1cclxuICByZXR1cm4gZGlzdGFuY2U7XHJcbn07XHJcblxyXG5cclxuY29uc3QgYnVpbGREaXN0YW5jZUVUQSA9IGRpc3RhbmNlID0+IHtcclxuICBsZXQgY2FyTWludXRlcyA9IDA7XHJcbiAgbGV0IGNhclNlY29uZHMgPSAwO1xyXG5cclxuICBpZiAoZGlzdGFuY2UgPiA1MDAwMCkge1xyXG4gICAgLy8gT3ZlciA1MGttLCB3ZSB1c2UgYXZlcmFnZSBzcGVlZCBvZiAxMDBrbWhcclxuICAgIGNhck1pbnV0ZXMgPSAoZGlzdGFuY2UgLyAxMDAwMDApICogNjA7XHJcbiAgfSBlbHNlIGlmIChkaXN0YW5jZSA+IDEwMDAwKSB7XHJcbiAgICAvLyBPdmVyIDEwa20sIHdlIHVzZSBhdmVyYWdlIHNwZWVkIG9mIDYwa20vaFxyXG4gICAgY2FyTWludXRlcyA9IChkaXN0YW5jZSAvIDYwMDAwKSAqIDYwO1xyXG4gIH0gZWxzZSB7XHJcbiAgICAvLyBVbmRlciAxMGttIHdlIHVzZXIgYXZlcmFnZSBzcGVlZCBvZiAzMGttL2hcclxuICAgIGNhck1pbnV0ZXMgPSAoZGlzdGFuY2UgLyAzMDAwMCkgKiA2MDtcclxuICB9XHJcblxyXG4gIGNhclNlY29uZHMgPSBjYXJNaW51dGVzICUgMTsgLy8gS2VlcCBmbG9hdGluZyB2YWx1ZSBmb3Igc2Vjb25kcyBjb21wdXRpbmdcclxuICBjYXJNaW51dGVzID0gTWF0aC5mbG9vcihjYXJNaW51dGVzKTsgLy8gUmVtb3ZlIGZsb2F0aW5nIHZhbHVlXHJcblxyXG4gIGlmIChjYXJNaW51dGVzID4gNjApIHtcclxuICAgIGNhck1pbnV0ZXMgPSBgJHtNYXRoLmZsb29yKGNhck1pbnV0ZXMgLyA2MCl9aCAke2Nhck1pbnV0ZXMgJSA2MH1tYDtcclxuICB9IGVsc2Uge1xyXG4gICAgY2FyTWludXRlcyA9IGAke2Nhck1pbnV0ZXN9bWA7XHJcbiAgfVxyXG5cclxuICBsZXQgd2Fsa01pbnV0ZXMgPSAoZGlzdGFuY2UgLyA1MDAwKSAqIDYwO1xyXG4gIGxldCB3YWxrU2Vjb25kcyA9IHdhbGtNaW51dGVzICUgMTtcclxuICB3YWxrTWludXRlcyA9IE1hdGguZmxvb3Iod2Fsa01pbnV0ZXMpOyAvLyBSZW1vdmUgZmxvYXRpbmcgdmFsdWVcclxuXHJcbiAgaWYgKHdhbGtNaW51dGVzID4gNjApIHtcclxuICAgIHdhbGtNaW51dGVzID0gYCR7TWF0aC5mbG9vcih3YWxrTWludXRlcyAvIDYwKX1oICR7d2Fsa01pbnV0ZXMgJSA2MH1tYDtcclxuICB9IGVsc2Uge1xyXG4gICAgd2Fsa01pbnV0ZXMgPSBgJHt3YWxrTWludXRlc31tYDtcclxuICB9ICBcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGNhcjogYCR7Y2FyTWludXRlc30gJHtNYXRoLmZsb29yKHByZWNpc2lvblJvdW5kKChjYXJTZWNvbmRzIC8gMTAwKSAqIDYwLCAyKSAqIDEwMCl9c2AsXHJcbiAgICB3YWxrOiBgJHt3YWxrTWludXRlc30gJHtNYXRoLmZsb29yKHByZWNpc2lvblJvdW5kKCh3YWxrU2Vjb25kcyAvIDEwMCkgKiA2MCwgMikgKiAxMDApfXNgLFxyXG4gIH07XHJcbn07XHJcblxyXG5cclxuY29uc3QgcHJlY2lzaW9uUm91bmQgPSAodmFsdWUsIHByZWNpc2lvbikgPT4ge1xyXG4gIGNvbnN0IG11bHRpcGxpZXIgPSBNYXRoLnBvdygxMCwgcHJlY2lzaW9uIHx8IDApO1xyXG4gIHJldHVybiBNYXRoLnJvdW5kKHZhbHVlICogbXVsdGlwbGllcikgLyBtdWx0aXBsaWVyO1xyXG59O1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBDQ0RIX0NFTlRFUjoge1xyXG4gICAgTEFUOiA0OC41MzE4MzkwNjQ0MTk2MixcclxuICAgIExORzogMi4wNTM3NTY3MTM4NjcxODhcclxuICB9LFxyXG4gIENDREhfQ0lUSUVTOiBbJ0JSWCcsICdDT1InLCAnRFJEJywgJ0xGUicsICdMR1InLCAnUklDJywgJ1JPVicsICdTQ0QnLCAnU0VSJywgJ1NUQycsICdWU0cnXSxcclxuICBNQVBfQk9VTkRTOiB3aW5kb3cuTC5sYXRMbmdCb3VuZHMoXHJcbiAgICB3aW5kb3cuTC5sYXRMbmcoNDguNjc5NDAwNzE1OTYzODk0LCAxLjczOTA2MDY2ODk0NTMxMjcpLFxyXG4gICAgd2luZG93LkwubGF0TG5nKDQ4LjM4NDM5MDc0MTUxODY2LCAyLjM0MzM5NTk5NjA5Mzc1MClcclxuICApLFxyXG4gIE9TTV9MQVlFUjogd2luZG93LkwudGlsZUxheWVyKCdodHRwczovL3tzfS50aWxlLm9wZW5zdHJlZXRtYXAub3JnL3t6fS97eH0ve3l9LnBuZycsIHtcclxuICAgIGF0dHJpYnV0aW9uOiAnJmNvcHk7IDxhIGhyZWY9XCJodHRwczovL3d3dy5vcGVuc3RyZWV0bWFwLm9yZy9jb3B5cmlnaHRcIj5PcGVuU3RyZWV0TWFwPC9hPicsXHJcbiAgICBtYXhab29tOiAxOSxcclxuICAgIG1pblpvb206IDExXHJcbiAgfSksXHJcbiAgRVNSSV9MQVlFUjogd2luZG93LkwudGlsZUxheWVyKCdodHRwczovL3NlcnZlci5hcmNnaXNvbmxpbmUuY29tL0FyY0dJUy9yZXN0L3NlcnZpY2VzL1dvcmxkX0ltYWdlcnkvTWFwU2VydmVyL3RpbGUve3p9L3t5fS97eH0nLCB7XHJcbiAgICBhdHRyaWJ1dGlvbjogJyZjb3B5OyA8YSBocmVmPVwiaHR0cHM6Ly93d3cuYXJjZ2lzLmNvbS9ob21lL2l0ZW0uaHRtbD9pZD0xMGRmMjI3OWY5Njg0ZTRhOWY2YTdmMDhmZWJhYzJhOVwiPkVzcmkgSW1hZ2VyeTwvYT4nLFxyXG4gICAgbWF4Wm9vbTogMTksXHJcbiAgICBtaW5ab29tOiAxMVxyXG4gIH0pLFxyXG4gIGdldERpc3RhbmNlQmV0d2VlbkNvb3JkczogZ2V0RGlzdGFuY2VCZXR3ZWVuQ29vcmRzLFxyXG4gIGNvbnZlcnREaXN0YW5jZVRvU3RyaW5nOiBjb252ZXJ0RGlzdGFuY2VUb1N0cmluZyxcclxuICBidWlsZERpc3RhbmNlRVRBOiBidWlsZERpc3RhbmNlRVRBLFxyXG4gIHByZWNpc2lvblJvdW5kOiBwcmVjaXNpb25Sb3VuZFxyXG59O1xyXG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAnLi4vc2Nzcy9Eb3VyZGFubmFpc0V4cGxvcmUuc2Nzcyc7XHJcbmltcG9ydCBNYXAgZnJvbSAnLi91dGlscy9NYXAuanMnO1xyXG5pbXBvcnQgVXRpbHMgZnJvbSAnLi91dGlscy9VdGlscy5qcyc7XHJcblxyXG5cclxuY2xhc3MgRG91cmRhbm5haXNFeHBsb3JlIHtcclxuXHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgLy8gTWFwIGludGVybmFsc1xyXG4gICAgdGhpcy5fbWFwID0gbnVsbDtcclxuICAgIHRoaXMuX2xheWVycyA9IHt9O1xyXG5cclxuICAgIC8vIERhdGEgb2JqZWN0XHJcbiAgICB0aGlzLl9kYXRhID0ge307XHJcblxyXG4gICAgdGhpcy5fdXNlciA9IHtcclxuICAgICAgZ2VvbG9jYXRpb25BbGxvd2VkOiBmYWxzZSxcclxuICAgICAgbGF0OiBVdGlscy5IT01FX0xBVCxcclxuICAgICAgbG5nOiBVdGlscy5IT01FX0xORyxcclxuICAgICAgYWNjdXJhY3k6IDAsXHJcbiAgICAgIG1hcmtlcjogbnVsbFxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLl9pbml0R2VvbG9jYXRpb24oKVxyXG4gICAgICAudGhlbih0aGlzLl9pbml0TWFwLmJpbmQodGhpcykpXHJcbiAgICAgIC50aGVuKHRoaXMuX2luaXRFdmVudHMuYmluZCh0aGlzKSlcclxuICAgICAgLnRoZW4odGhpcy5fZmV0Y2hNYXJrZXJzLmJpbmQodGhpcykpXHJcbiAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZygnd2UgYXJlIGRvbmUnKVxyXG4gICAgICB9KTtcclxuLy8gICAgICAudGhlbih0aGlzLl9idWlsZE1hcmtlcnMuYmluZCh0aGlzKSlcclxuLy8gICAgICAudGhlbih0aGlzLl9idWlsZFBvbHlnb25zLmJpbmQodGhpcykpO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qIEluaXQgc2VxdWVuY2UgKi9cclxuXHJcblxyXG4gIF9pbml0R2VvbG9jYXRpb24oKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcblx0XHRcdGlmICgnZ2VvbG9jYXRpb24nIGluIG5hdmlnYXRvcikge1xyXG4gICAgICAgIC8vIFRPRE8gOiBpbiBuZXh0IHZlcnNpb24sIG1ha2UgdGhpcyBhIHByZWYgbG93L2hpZ2ggKHRvZ2dsZSlcclxuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgZW5hYmxlSGlnaEFjY3VyYWN5OiB0cnVlLCAvLyBNb3JlIGNvbnN1cHRpb24sIGJldHRlciBwb3NpdGlvblxyXG4gICAgICAgICAgbWF4aW11bUFnZTogMTAwMCwgLy8gQSBwb3NpdGlvbiB3aWxsIGxhc3QgMXMgbWF4aW11bVxyXG4gICAgICAgICAgdGltZW91dDogOTAwLCAvLyBBIHBvc2l0aW9uIGlzIHVwZGF0ZWQgaW4gMC45cyBtYXhpbXVtXHJcbiAgICAgICAgfTtcclxuICAgICAgICBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKHRoaXMuX3Bvc2l0aW9uSW5pdGlhbGl6ZWQuYmluZCh0aGlzKSwgbnVsbCwgb3B0aW9ucyk7XHJcblx0XHRcdFx0dGhpcy5fd2F0Y2hJZCA9IG5hdmlnYXRvci5nZW9sb2NhdGlvbi53YXRjaFBvc2l0aW9uKHRoaXMuX3Bvc2l0aW9uVXBkYXRlLmJpbmQodGhpcyksIG51bGwsIG9wdGlvbnMpO1xyXG4gICAgICB9XHJcbiAgICAgIC8vIERvbid0IGxvY2sgaW5pdGlhbGl6YXRpb24gd2FpdGluZyBmb3IgcG9zXHJcbiAgICAgIHJlc29sdmUoKTtcclxuXHRcdH0pO1xyXG4gIH1cclxuXHJcblxyXG4gIF9pbml0TWFwKCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xyXG4gICAgICB0aGlzLl9tYXAgPSBuZXcgTWFwKHtcclxuICAgICAgICB0YXJnZXRJZDogJ3Nhcm1hdGVzLWxhbmQnXHJcbiAgICAgIH0pO1xyXG4gICAgICByZXNvbHZlKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG5cclxuICBfaW5pdEV2ZW50cygpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuICAgICAgLy8gTGlzdGVuaW5nIHRvIG1vZGFsIGV2ZW50XHJcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RhbC1vdmVybGF5JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsb3NlTW9kYWwuYmluZCh0aGlzKSk7XHJcbiAgICAgIHJlc29sdmUoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG4gIF9mZXRjaE1hcmtlcnMoKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICAgIGNvbnN0IHByb21pc2VzID0gW107XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgVXRpbHMuQ0NESF9DSVRJRVMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICBwcm9taXNlcy5wdXNoKG5ldyBQcm9taXNlKHJlc29sdmVMb2NhbCA9PiB7XHJcbiAgICAgICAgICBmZXRjaChgLi9hc3NldHMvanNvbi8ke1V0aWxzLkNDREhfQ0lUSUVTW2ldfS5qc29uYCkudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgZGF0YS5qc29uKCkudGhlbihqc29uRGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgdGhpcy5fZGF0YVtVdGlscy5DQ0RIX0NJVElFU1tpXV0gPSBqc29uRGF0YTtcclxuICAgICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYnVpbGRQb2x5Z29ucyh0aGlzLl9kYXRhW1V0aWxzLkNDREhfQ0lUSUVTW2ldXS5ib3VuZHMpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2J1aWxkTWFya2Vycyh0aGlzLl9kYXRhW1V0aWxzLkNDREhfQ0lUSUVTW2ldXS5wb2lzKS50aGVuKHJlc29sdmVMb2NhbCk7XHJcbiAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSkuY2F0Y2gocmVzb2x2ZUxvY2FsKTtcclxuICAgICAgICAgIH0pLmNhdGNoKHJlc29sdmVMb2NhbCk7XHJcbiAgICAgICAgfSkpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbihyZXNvbHZlKTtcclxuLypcclxuICAgICAgZmV0Y2goYC4vYXNzZXRzL2pzb24vTWFwRGF0YS5qc29uYCkudGhlbihkYXRhID0+IHtcclxuICAgICAgICBkYXRhLmpzb24oKS50aGVuKGpzb25EYXRhID0+IHtcclxuICAgICAgICAgIHRoaXMuX2RhdGEgPSBqc29uRGF0YTtcclxuICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICB9KS5jYXRjaChyZXNvbHZlKTtcclxuICAgICAgfSkuY2F0Y2gocmVzb2x2ZSk7XHJcbiovXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG5cclxuICBfYnVpbGRNYXJrZXJzKG1hcmtlcnMpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKG1hcmtlcnMpO1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG1hcmtlcnNba2V5c1tpXV0ubGVuZ3RoOyArK2opIHtcclxuICAgICAgICAgIHRoaXMuX21hcC5hZGRNYXJrKG1hcmtlcnNba2V5c1tpXV1bal0sIHRoaXMuX2NyZWF0ZU1hcmtlclBvcHVwLmJpbmQodGhpcykpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXNvbHZlKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG5cclxuICBfYnVpbGRQb2x5Z29ucyhjaXR5Qm91bmRzKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICAgIHRoaXMuX21hcC5hZGRQb2x5Z29uKGNpdHlCb3VuZHMpO1xyXG4gICAgICAvKlxyXG4gICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoY2l0eUJvdW5kcyk7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgIHRoaXMuX21hcC5hZGRQb2x5Z29uKGNpdHlCb3VuZHNba2V5c1tpXV0pO1xyXG4gICAgICB9XHJcbiAgICAgICovXHJcbiAgICAgIHJlc29sdmUoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qIEdlb2xvYyBjYWxsYmFja3MgKi9cclxuXHJcblxyXG4gIF9wb3NpdGlvbkluaXRpYWxpemVkKCkge1xyXG4gICAgdGhpcy5fdXNlci5nZW9sb2NhdGlvbkFsbG93ZWQgPSB0cnVlO1xyXG4gIH1cclxuXHJcblxyXG4gIF9wb3NpdGlvblVwZGF0ZShwb3NpdGlvbikge1xyXG4gICAgLy8gT25seSBpZiB1c2VyIGFsbG93ZWQgZ2VvbG9jYXRpb247XHJcbiAgICAvLyBTaG91bGQgbmV2ZXIgYmUgZmFsc2Ugd2hlbiBjYWxsZWQgYmFja1xyXG4gICAgaWYgKHRoaXMuX3VzZXIuZ2VvbG9jYXRpb25BbGxvd2VkID09PSB0cnVlKSB7XHJcbiAgICAgIC8vIFVwZGF0ZSBzYXZlZCB1c2VyIHBvc2l0aW9uXHJcbiAgICAgIHRoaXMuX3VzZXIubGF0ID0gcG9zaXRpb24uY29vcmRzLmxhdGl0dWRlO1xyXG4gICAgICB0aGlzLl91c2VyLmxuZyA9IHBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGU7XHJcbiAgICAgIHRoaXMuX3VzZXIuYWNjdXJhY3kgPSBwb3NpdGlvbi5jb29yZHMuYWNjdXJhY3k7XHJcbiAgICAgIC8vIE9ubHkgZHJhdyBtYXJrZXIgaWYgbWFwIGlzIGFscmVhZHkgY3JlYXRlZFxyXG4gICAgICBpZiAodGhpcy5fbWFwKSB7XHJcbiAgICAgICAgdGhpcy5fbWFwLmRyYXdVc2VyTWFya2VyKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG5cclxuICAvKiBNYXAgVXRpbHMgKi9cclxuXHJcblxyXG4gIF9jcmVhdGVNYXJrZXJQb3B1cChvcHRzKSB7XHJcbiAgICBjb25zdCBkb20gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcclxuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnSDMnKTtcclxuICAgIGNvbnN0IGFkZHJlc3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdJJyk7XHJcbiAgICBjb25zdCB0b3duID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnSScpO1xyXG4gICAgY29uc3QgcGhvbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdBJyk7XHJcbiAgICBjb25zdCB3ZWJzaXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnQScpO1xyXG4gICAgY29uc3QgaW5mbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ1AnKTtcclxuICAgIGNvbnN0IG9wZW5XaXRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnQScpO1xyXG5cclxuICAgIGRvbS5jbGFzc0xpc3QuYWRkKCdtYXJrZXItcG9wdXAnKTtcclxuICAgIHRpdGxlLmlubmVySFRNTCA9IG9wdHMubmFtZTtcclxuICAgIGFkZHJlc3MuaW5uZXJIVE1MID0gb3B0cy5hZGRyZXNzO1xyXG4gICAgdG93bi5pbm5lckhUTUwgPSBvcHRzLnRvd247XHJcbiAgICBwaG9uZS5ocmVmID0gYHRlbDoke29wdHMucGhvbmV9YDtcclxuICAgIHBob25lLmlubmVySFRNTCA9IGA8aW1nIHNyYz1cIi4vYXNzZXRzL2ltZy9pY29uL3Bob25lLnN2Z1wiPiR7b3B0cy5waG9uZX1gO1xyXG4gICAgd2Vic2l0ZS5ocmVmID0gb3B0cy53ZWJzaXRlO1xyXG4gICAgd2Vic2l0ZS5pbm5lckhUTUwgPSAnPGltZyBzcmM9XCIuL2Fzc2V0cy9pbWcvaWNvbi93ZWIuc3ZnXCI+Q29uc3VsdGVyIGxlIHNpdGUnO1xyXG4gICAgd2Vic2l0ZS5zZXRBdHRyaWJ1dGUoJ3JlbCcsICdub29wZW5lciBub3JlZmVycmVyJyk7XHJcbiAgICB3ZWJzaXRlLnNldEF0dHJpYnV0ZSgndGFyZ2V0JywgJ19ibGFuaycpO1xyXG4gICAgaW5mby5pbm5lckhUTUwgPSBvcHRzLmluZm87XHJcbiAgICBvcGVuV2l0aC5ocmVmID0gYGdlbzoke29wdHMubGF0fSwke29wdHMubG5nfWA7XHJcbiAgICBvcGVuV2l0aC5pbm5lckhUTUwgPSAnPGltZyBzcmM9XCIuL2Fzc2V0cy9pbWcvaWNvbi9waW4uc3ZnXCI+T3V2cmlyIGRhbnMgbGUgR1BTJztcclxuXHJcbiAgICBkb20uYXBwZW5kQ2hpbGQodGl0bGUpO1xyXG4gICAgZG9tLmFwcGVuZENoaWxkKGFkZHJlc3MpO1xyXG4gICAgZG9tLmFwcGVuZENoaWxkKHRvd24pO1xyXG5cclxuICAgIGNvbnN0IGJ1dHRvbiA9IHRoaXMuX21hcmtlck9wZW5lZFN0YXRlKG9wdHMudGltZXRhYmxlKTtcclxuICAgIGRvbS5hcHBlbmRDaGlsZChidXR0b24pO1xyXG5cclxuICAgIGxldCBhbHdheXNDbG9zZWQgPSB0cnVlO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvcHRzLnRpbWV0YWJsZS5sZW5ndGg7ICsraSkge1xyXG4gICAgICBpZiAob3B0cy50aW1ldGFibGVbaV0uaXNPcGVuID09PSB0cnVlKSB7XHJcbiAgICAgICAgYWx3YXlzQ2xvc2VkID0gZmFsc2U7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIEFsbG93IG1vZGFsIG9ubHkgaWYgcG9pIGhhcyB0aW1ldGFibGUgYW5kIGlzIG5vdCBhbHdheXMgY2xvc2VkXHJcbiAgICBpZiAob3B0cy50aW1ldGFibGUubGVuZ3RoID4gMCAmJiBhbHdheXNDbG9zZWQgPT09IGZhbHNlKSB7XHJcbiAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX3RpbWV0YmFsZU1vZGFsLmJpbmQodGhpcywgb3B0cykpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBpZiAob3B0cy5pbmZvICE9PSAnJykge1xyXG4gICAgICBkb20uYXBwZW5kQ2hpbGQoaW5mbyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG9wdHMucGhvbmUgIT09ICcnKSB7XHJcbiAgICAgIGRvbS5hcHBlbmRDaGlsZChwaG9uZSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG9wdHMud2Vic2l0ZSAhPT0gJycpIHtcclxuICAgICAgZG9tLmFwcGVuZENoaWxkKHdlYnNpdGUpO1xyXG4gICAgfSAgICBcclxuICAgIFxyXG4gICAgZG9tLmFwcGVuZENoaWxkKG9wZW5XaXRoKTtcclxuXHJcbiAgICByZXR1cm4gZG9tO1xyXG4gIH1cclxuXHJcblxyXG4gIF9tYXJrZXJPcGVuZWRTdGF0ZSh0aW1ldGFibGUpIHtcclxuICAgIGNvbnN0IGRvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xyXG4gICAgY29uc3Qgc3RhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdINScpO1xyXG4gICAgY29uc3QgbW9yZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0knKTtcclxuICAgIGRvbS5jbGFzc0xpc3QuYWRkKCdtYXJrZXItb3BlbmVkJyk7XHJcbiAgICBkb20uYXBwZW5kQ2hpbGQoc3RhdGUpO1xyXG4gICAgZG9tLmFwcGVuZENoaWxkKG1vcmUpO1xyXG4gICAgXHJcbiAgICBpZiAodGltZXRhYmxlLmxlbmd0aCkge1xyXG4gICAgICBsZXQgYWx3YXlzQ2xvc2VkID0gdHJ1ZTtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aW1ldGFibGUubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICBpZiAodGltZXRhYmxlW2ldLmlzT3BlbiA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgYWx3YXlzQ2xvc2VkID0gZmFsc2U7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChhbHdheXNDbG9zZWQgPT09IHRydWUpIHtcclxuICAgICAgICB0aGlzLl9tYXJrZXJJc0Nsb3NlZChkb20sIHRydWUpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuX2NoZWNrVGltZSh0aW1ldGFibGUsIGRvbSk7XHJcbiAgICAgICAgLy8gVXBkYXRlIGVhY2ggbWludXRlc1xyXG4gICAgICAgIC8vIFRPRE8gc3RvcmUgaW50ZXJ2YWwgaWYgdG8gYmUgcmVhZHkgdG8gY2FuY2VsIHdoZW4gb3RoZXIgbmF2aWdhdGlvbiBtb2RlIGF2YWlsYWJsZVxyXG4gICAgICAgIHNldEludGVydmFsKHRoaXMuX2NoZWNrVGltZS5iaW5kKHRoaXMsIHRpbWV0YWJsZSwgZG9tKSwgNjAwMDApO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLl9tYXJrZXJJc09wZW5lZChkb20sIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBkb207XHJcbiAgfVxyXG5cclxuXHJcbiAgX2NoZWNrVGltZSh0aW1ldGFibGUsIGRvbSkge1xyXG4gICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcclxuICAgIGxldCBob3VyID0gbm93LmdldEhvdXJzKCk7XHJcbiAgICBsZXQgbWludXRlcyA9IG5vdy5nZXRNaW51dGVzKCk7XHJcbiAgICBpZiAobWludXRlcyA8IDEwKSB7XHJcbiAgICAgIG1pbnV0ZXMgPSBgMCR7bWludXRlc31gO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGRheU9mV2VlayA9IG5vdy5nZXREYXkoKSAtIDE7XHJcbiAgICBjb25zdCBvcGVuaW5nVGltZSA9IHBhcnNlSW50KGAke3RpbWV0YWJsZVtkYXlPZldlZWtdLm9wZW4uaH0ke3RpbWV0YWJsZVtkYXlPZldlZWtdLm9wZW4ubX1gKTtcclxuICAgIGNvbnN0IGNsb3NpbmdUaW1lID0gcGFyc2VJbnQoYCR7dGltZXRhYmxlW2RheU9mV2Vla10uY2xvc2UuaH0ke3RpbWV0YWJsZVtkYXlPZldlZWtdLmNsb3NlLm19YCk7XHJcbiAgICBjb25zdCBjdXJyZW50VGltZSA9IHBhcnNlSW50KGAke2hvdXJ9JHttaW51dGVzfWApO1xyXG4gICAgLy8gV29uJ3Qgd29yayBpZiB0aW1ldGFibGUgb3Blbi9jbG9zZSBob3VycyBhcmVuJ3Qgb24gdGhlIHNhbWUgZGF5XHJcbiAgICBpZiAodGltZXRhYmxlW2RheU9mV2Vla10uaXNPcGVuICYmIGlzTmFOKG9wZW5pbmdUaW1lKSkgeyAvLyAyNC83IG9wZW5pbmdcclxuICAgICAgdGhpcy5fbWFya2VySXNPcGVuZWQoZG9tLCB0cnVlKTtcclxuICAgIH0gZWxzZSBpZiAodGltZXRhYmxlW2RheU9mV2Vla10uaXNPcGVuICYmIGN1cnJlbnRUaW1lID49IG9wZW5pbmdUaW1lICYmIGN1cnJlbnRUaW1lIDwgY2xvc2luZ1RpbWUpIHtcclxuICAgICAgLy8gQ2hlY2sgZm9yIGRheSBicmVha3NcclxuICAgICAgaWYgKHRpbWV0YWJsZVtkYXlPZldlZWtdLmJyZWFrLmhhc0JyZWFrKSB7XHJcbiAgICAgICAgLy8gSW4gY2FzZSBvZiBzZXZlcmFsIGRheSBicmVha3NcclxuICAgICAgICBpZiAodGltZXRhYmxlW2RheU9mV2Vla10uYnJlYWsuc2V2ZXJhbCkge1xyXG4gICAgICAgICAgbGV0IGlzQ2xvc2VkID0gZmFsc2U7XHJcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRpbWV0YWJsZVtkYXlPZldlZWtdLmJyZWFrLnNldmVyYWwubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgY29uc3QgYnJlYWtPcGVuaW5nVGltZSA9IHBhcnNlSW50KGAke3RpbWV0YWJsZVtkYXlPZldlZWtdLmJyZWFrLnNldmVyYWxbaV0uZW5kLmh9JHt0aW1ldGFibGVbZGF5T2ZXZWVrXS5icmVhay5zZXZlcmFsW2ldLmVuZC5tfWApO1xyXG4gICAgICAgICAgICBjb25zdCBicmVha0Nsb3NpbmdUaW1lID0gcGFyc2VJbnQoYCR7dGltZXRhYmxlW2RheU9mV2Vla10uYnJlYWsuc2V2ZXJhbFtpXS5zdGFydC5ofSR7dGltZXRhYmxlW2RheU9mV2Vla10uYnJlYWsuc2V2ZXJhbFtpXS5zdGFydC5tfWApO1xyXG4gICAgICAgICAgICBpZiAoY3VycmVudFRpbWUgPj0gYnJlYWtDbG9zaW5nVGltZSAmJiBjdXJyZW50VGltZSA8IGJyZWFrT3BlbmluZ1RpbWUpIHtcclxuICAgICAgICAgICAgICB0aGlzLl9tYXJrZXJJc0Nsb3NlZChkb20pO1xyXG4gICAgICAgICAgICAgIGlzQ2xvc2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCFpc0Nsb3NlZCkge1xyXG4gICAgICAgICAgICAgIHRoaXMuX21hcmtlcklzT3BlbmVkKGRvbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29uc3QgYnJlYWtPcGVuaW5nVGltZSA9IHBhcnNlSW50KGAke3RpbWV0YWJsZVtkYXlPZldlZWtdLmJyZWFrLmVuZC5ofSR7dGltZXRhYmxlW2RheU9mV2Vla10uYnJlYWsuZW5kLm19YCk7XHJcbiAgICAgICAgICBjb25zdCBicmVha0Nsb3NpbmdUaW1lID0gcGFyc2VJbnQoYCR7dGltZXRhYmxlW2RheU9mV2Vla10uYnJlYWsuc3RhcnQuaH0ke3RpbWV0YWJsZVtkYXlPZldlZWtdLmJyZWFrLnN0YXJ0Lm19YCk7XHJcbiAgICAgICAgICBpZiAoY3VycmVudFRpbWUgPj0gYnJlYWtDbG9zaW5nVGltZSAmJiBjdXJyZW50VGltZSA8IGJyZWFrT3BlbmluZ1RpbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5fbWFya2VySXNDbG9zZWQoZG9tKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21hcmtlcklzT3BlbmVkKGRvbSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuX21hcmtlcklzT3BlbmVkKGRvbSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7ICAgICAgXHJcbiAgICAgIHRoaXMuX21hcmtlcklzQ2xvc2VkKGRvbSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcbiAgX21hcmtlcklzT3BlbmVkKGRvbSwgYWx3YXlzT3BlbmVkKSB7XHJcbiAgICBkb20uZmlyc3RDaGlsZC5pbm5lckhUTUwgPSBgT3V2ZXJ0YDtcclxuICAgIGlmIChhbHdheXNPcGVuZWQgPT09IHRydWUpIHtcclxuICAgICAgZG9tLmxhc3RDaGlsZC5pbm5lckhUTUwgPSBgVG91am91cnMgb3V2ZXJ0YDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGRvbS5sYXN0Q2hpbGQuaW5uZXJIVE1MID0gYFZvaXIgbGVzIGhvcmFpcmVzYDtcclxuICAgIH1cclxuICAgIGRvbS5jbGFzc0xpc3QuYWRkKCdvcGVuZWQnKTtcclxuICB9XHJcblxyXG5cclxuICBfbWFya2VySXNDbG9zZWQoZG9tLCBhbHdheXNDbG9zZWQpIHtcclxuICAgIGRvbS5maXJzdENoaWxkLmlubmVySFRNTCA9IGBGZXJtw6lgO1xyXG4gICAgaWYgKGFsd2F5c0Nsb3NlZCkge1xyXG4gICAgICBkb20ubGFzdENoaWxkLmlubmVySFRNTCA9ICdUb3Vqb3VycyBmZXJtw6knO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZG9tLmxhc3RDaGlsZC5pbm5lckhUTUwgPSBgVm9pciBsZXMgaG9yYWlyZXNgO1xyXG4gICAgfVxyXG4gICAgZG9tLmNsYXNzTGlzdC5yZW1vdmUoJ29wZW5lZCcpO1xyXG4gIH1cclxuXHJcblxyXG4gIF90aW1ldGJhbGVNb2RhbChvcHRzKSB7XHJcbiAgICB0aGlzLmZldGNoTW9kYWwoJ3RpbWV0YWJsZW1vZGFsJykudGhlbihkb20gPT4ge1xyXG4gICAgICAvLyBVcGRhdGluZyBtb2RhbCBoZWFkZXIgYW5kIGluZm9cclxuICAgICAgZG9tLnF1ZXJ5U2VsZWN0b3IoJyNtYXJrLW5hbWUnKS5pbm5lckhUTUwgPSBvcHRzLm5hbWU7XHJcbiAgICAgIGRvbS5xdWVyeVNlbGVjdG9yKCcjbWFyay1hZGRyZXNzJykuaW5uZXJIVE1MID0gYCR7b3B0cy5hZGRyZXNzfSwgJHtvcHRzLnRvd259YDtcclxuICAgICAgY29uc3QgZGlzdGFuY2UgPSBVdGlscy5nZXREaXN0YW5jZUJldHdlZW5Db29yZHMoW29wdHMubGF0LCBvcHRzLmxuZ10sIFt0aGlzLl91c2VyLmxhdCwgdGhpcy5fdXNlci5sbmddKTtcclxuICAgICAgZG9tLnF1ZXJ5U2VsZWN0b3IoJyNtYXJrLWRpc3RhbmNlJykuaW5uZXJIVE1MID0gYFZvdXMgw6h0ZXMgw6AgZW52aXJvbiAke1V0aWxzLmNvbnZlcnREaXN0YW5jZVRvU3RyaW5nKGRpc3RhbmNlKX0gZGUgPGI+JHtvcHRzLm5hbWV9PC9iPiDDoCB2b2wgZCdvaXNlYXVgO1xyXG4gICAgICBjb25zdCBldGEgPSBVdGlscy5idWlsZERpc3RhbmNlRVRBKGRpc3RhbmNlKTtcclxuICAgICAgZG9tLnF1ZXJ5U2VsZWN0b3IoJyNtYXJrLWV0YScpLmlubmVySFRNTCA9IGBDZSBxdWkgcmVwcsOpc2VudGUgZW52aXJvbiAke2V0YS5jYXJ9IGVuIHZvaXR1cmUsIG91ICR7ZXRhLndhbGt9IMOgIHBpZWQuYDtcclxuICAgICAgZG9tLnF1ZXJ5U2VsZWN0b3IoJyNtYXJrLXN0YXRlJykuYXBwZW5kQ2hpbGQodGhpcy5fbWFya2VyT3BlbmVkU3RhdGUob3B0cy50aW1ldGFibGUpKTtcclxuICAgICAgLy8gTm93IHVwZGF0ZSBkYXkgYnkgZGF5XHJcbiAgICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XHJcbiAgICAgIGNvbnN0IGRheU9mV2VlayA9IG5vdy5nZXREYXkoKSAtIDE7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3B0cy50aW1ldGFibGUubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICBjb25zdCBkYXlEb20gPSBkb20ucXVlcnlTZWxlY3RvcignI3RpbWV0YWJsZScpLmNoaWxkcmVuW2ldO1xyXG4gICAgICAgIGlmIChvcHRzLnRpbWV0YWJsZVtpXS5pc09wZW4gPT09IHRydWUpIHtcclxuICAgICAgICAgIGNvbnN0IG1vcm5pbmcgPSBkYXlEb20ubGFzdEVsZW1lbnRDaGlsZC5maXJzdEVsZW1lbnRDaGlsZDtcclxuICAgICAgICAgIGNvbnN0IGFmdGVybm9vbiA9IGRheURvbS5sYXN0RWxlbWVudENoaWxkLmxhc3RFbGVtZW50Q2hpbGQ7XHJcbiAgICAgICAgICBpZiAob3B0cy50aW1ldGFibGVbaV0uYnJlYWsgJiYgb3B0cy50aW1ldGFibGVbaV0uYnJlYWsuaGFzQnJlYWsgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgaWYgKG9wdHMudGltZXRhYmxlW2ldLmJyZWFrLnNldmVyYWwpIHtcclxuICAgICAgICAgICAgICBtb3JuaW5nLmlubmVySFRNTCA9IGA8cD4ke29wdHMudGltZXRhYmxlW2ldLm9wZW4uaH06JHtvcHRzLnRpbWV0YWJsZVtpXS5vcGVuLm19IOKAkiAke29wdHMudGltZXRhYmxlW2ldLmJyZWFrLnNldmVyYWxbMF0uc3RhcnQuaH06JHtvcHRzLnRpbWV0YWJsZVtpXS5icmVhay5zZXZlcmFsWzBdLnN0YXJ0Lm19PC9wPmA7XHJcbiAgICAgICAgICAgICAgbW9ybmluZy5jbGFzc0xpc3QuYWRkKCdmaWxsZWQnKTsgLy8gTW9ybmluZ1xyXG4gICAgICAgICAgICAgIG1vcm5pbmcuY2xhc3NMaXN0LmFkZCgnc3BsaXRlZCcpOyAvLyBNb3JuaW5nXHJcbiAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBvcHRzLnRpbWV0YWJsZVtpXS5icmVhay5zZXZlcmFsLmxlbmd0aCAtIDE7ICsraikge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XHJcbiAgICAgICAgICAgICAgICBkaXYuaW5uZXJIVE1MID0gYDxwPiR7b3B0cy50aW1ldGFibGVbaV0uYnJlYWsuc2V2ZXJhbFtqXS5lbmQuaH06JHtvcHRzLnRpbWV0YWJsZVtpXS5icmVhay5zZXZlcmFsW2pdLmVuZC5tfSDigJIgJHtvcHRzLnRpbWV0YWJsZVtpXS5icmVhay5zZXZlcmFsW2ogKyAxXS5zdGFydC5ofToke29wdHMudGltZXRhYmxlW2ldLmJyZWFrLnNldmVyYWxbaiArIDFdLnN0YXJ0Lm19PC9wPmA7XHJcbiAgICAgICAgICAgICAgICBkaXYuY2xhc3NMaXN0LmFkZCgnZmlsbGVkJyk7XHJcbiAgICAgICAgICAgICAgICBkaXYuY2xhc3NMaXN0LmFkZCgnc3BsaXRlZCcpO1xyXG4gICAgICAgICAgICAgICAgZGl2LnN0eWxlLmJvcmRlclJhZGl1cyA9ICcuNXJlbSc7XHJcbiAgICAgICAgICAgICAgICBkaXYuc3R5bGUuanVzdGlmeUNvbnRlbnQgPSAnY2VudGVyJztcclxuICAgICAgICAgICAgICAgIGRheURvbS5sYXN0RWxlbWVudENoaWxkLmluc2VydEJlZm9yZShkaXYsIGRheURvbS5sYXN0RWxlbWVudENoaWxkLmxhc3RFbGVtZW50Q2hpbGQpO1xyXG4gICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgYWZ0ZXJub29uLmlubmVySFRNTCA9IGA8cD4ke29wdHMudGltZXRhYmxlW2ldLmJyZWFrLnNldmVyYWxbb3B0cy50aW1ldGFibGVbaV0uYnJlYWsuc2V2ZXJhbC5sZW5ndGggLSAxXS5lbmQuaH06JHtvcHRzLnRpbWV0YWJsZVtpXS5icmVhay5zZXZlcmFsW29wdHMudGltZXRhYmxlW2ldLmJyZWFrLnNldmVyYWwubGVuZ3RoIC0gMV0uZW5kLm19IOKAkiAke29wdHMudGltZXRhYmxlW2ldLmNsb3NlLmh9OiR7b3B0cy50aW1ldGFibGVbaV0uY2xvc2UubX08L3A+YDtcclxuICAgICAgICAgICAgICBhZnRlcm5vb24uY2xhc3NMaXN0LmFkZCgnZmlsbGVkJyk7IC8vIEFmdGVybm9vblxyXG4gICAgICAgICAgICAgIGFmdGVybm9vbi5jbGFzc0xpc3QuYWRkKCdzcGxpdGVkJyk7IC8vIEFmdGVybm9vblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIG1vcm5pbmcuaW5uZXJIVE1MID0gYDxwPiR7b3B0cy50aW1ldGFibGVbaV0ub3Blbi5ofToke29wdHMudGltZXRhYmxlW2ldLm9wZW4ubX0g4oCSICR7b3B0cy50aW1ldGFibGVbaV0uYnJlYWsuc3RhcnQuaH06JHtvcHRzLnRpbWV0YWJsZVtpXS5icmVhay5zdGFydC5tfTwvcD5gO1xyXG4gICAgICAgICAgICAgIG1vcm5pbmcuY2xhc3NMaXN0LmFkZCgnZmlsbGVkJyk7IC8vIE1vcm5pbmdcclxuICAgICAgICAgICAgICBtb3JuaW5nLmNsYXNzTGlzdC5hZGQoJ3NwbGl0ZWQnKTsgLy8gTW9ybmluZ1xyXG4gICAgICAgICAgICAgIGFmdGVybm9vbi5pbm5lckhUTUwgPSBgPHA+JHtvcHRzLnRpbWV0YWJsZVtpXS5icmVhay5lbmQuaH06JHtvcHRzLnRpbWV0YWJsZVtpXS5icmVhay5lbmQubX0g4oCSICR7b3B0cy50aW1ldGFibGVbaV0uY2xvc2UuaH06JHtvcHRzLnRpbWV0YWJsZVtpXS5jbG9zZS5tfTwvcD5gO1xyXG4gICAgICAgICAgICAgIGFmdGVybm9vbi5jbGFzc0xpc3QuYWRkKCdmaWxsZWQnKTsgLy8gQWZ0ZXJub29uXHJcbiAgICAgICAgICAgICAgYWZ0ZXJub29uLmNsYXNzTGlzdC5hZGQoJ3NwbGl0ZWQnKTsgLy8gQWZ0ZXJub29uXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSBpZiAob3B0cy50aW1ldGFibGVbaV0ub3Blbi5oICYmIG9wdHMudGltZXRhYmxlW2ldLmNsb3NlLmgpIHtcclxuICAgICAgICAgICAgbW9ybmluZy5pbm5lckhUTUwgPSBgPHA+JHtvcHRzLnRpbWV0YWJsZVtpXS5vcGVuLmh9OiR7b3B0cy50aW1ldGFibGVbaV0ub3Blbi5tfTwvcD5gO1xyXG4gICAgICAgICAgICBtb3JuaW5nLmNsYXNzTGlzdC5hZGQoJ2ZpbGxlZCcpOyAvLyBNb3JuaW5nXHJcbiAgICAgICAgICAgIGFmdGVybm9vbi5pbm5lckhUTUwgPSBgPHA+JHtvcHRzLnRpbWV0YWJsZVtpXS5jbG9zZS5ofToke29wdHMudGltZXRhYmxlW2ldLmNsb3NlLm19PC9wPmA7XHJcbiAgICAgICAgICAgIGFmdGVybm9vbi5jbGFzc0xpc3QuYWRkKCdmaWxsZWQnKTsgLy8gQWZ0ZXJub29uXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBtb3JuaW5nLmlubmVySFRNTCA9IGA8cD4wMDowMDwvcD5gO1xyXG4gICAgICAgICAgICBtb3JuaW5nLmNsYXNzTGlzdC5hZGQoJ2ZpbGxlZCcpOyAvLyBNb3JuaW5nXHJcbiAgICAgICAgICAgIGFmdGVybm9vbi5pbm5lckhUTUwgPSBgPHA+MjQ6MDA8L3A+YDtcclxuICAgICAgICAgICAgYWZ0ZXJub29uLmNsYXNzTGlzdC5hZGQoJ2ZpbGxlZCcpOyAvLyBBZnRlcm5vb25cclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZGF5RG9tLmxhc3RFbGVtZW50Q2hpbGQuaW5uZXJIVE1MID0gYDxkaXYgY2xhc3M9XCJjbG9zZWRcIj48cD5GZXJtw6k8L3A+PC9kaXY+YDsgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIE1hdGNoaW5nIHRvZGF5J3MgZGF5XHJcbiAgICAgICAgaWYgKGkgPT09IGRheU9mV2Vlaykge1xyXG4gICAgICAgICAgZGF5RG9tLmNsYXNzTGlzdC5hZGQoJ3RvZGF5Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIFxyXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWwtb3ZlcmxheScpLmFwcGVuZENoaWxkKGRvbSk7XHJcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RhbC1vdmVybGF5Jykuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcclxuXHRcdFx0c2V0VGltZW91dCgoKSA9PiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWwtb3ZlcmxheScpLnN0eWxlLm9wYWNpdHkgPSAxLCA1MCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4vKiBTZWFyY2ggbW9kYWwgbWV0aG9kcyAqL1xyXG5cclxuLypcclxuICBfc2VhcmNoTW9kYWwoKSB7XHJcbiAgICB0aGlzLl9mZXRjaE1vZGFsKCdzZWFyY2htb2RhbCcpLnRoZW4oZG9tID0+IHtcclxuICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMuX21hcmtzKTtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgZG9tLmZpcnN0RWxlbWVudENoaWxkLmFwcGVuZENoaWxkKHRoaXMuX2NyZWF0ZU1hcmtDYXRlZ29yeVNlYXJjaEljb24oa2V5c1tpXSkpO1xyXG4gICAgICB9XHJcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RhbC1vdmVybGF5JykuYXBwZW5kQ2hpbGQoZG9tKTtcclxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsLW92ZXJsYXknKS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG5cdFx0XHRzZXRUaW1lb3V0KCgpID0+IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RhbC1vdmVybGF5Jykuc3R5bGUub3BhY2l0eSA9IDEsIDUwKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG4gIF9jcmVhdGVNYXJrQ2F0ZWdvcnlTZWFyY2hJY29uKHR5cGUpIHtcclxuICAgIGNvbnN0IGRvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xyXG4gICAgY29uc3QgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnSU1HJyk7XHJcbiAgICBjb25zdCBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ1AnKTtcclxuICAgIGRvbS5jbGFzc0xpc3QuYWRkKCdmaWx0ZXJpbmctZWxlbWVudCcpO1xyXG4gICAgaW1nLnNyYyA9IGAvYXNzZXRzL2ltZy9tYXJrZXIvJHt0eXBlfS5zdmdgO1xyXG4gICAgbGFiZWwuaW5uZXJIVE1MID0gdHlwZTtcclxuICAgIGRvbS5hcHBlbmRDaGlsZChpbWcpO1xyXG4gICAgZG9tLmFwcGVuZENoaWxkKGxhYmVsKTtcclxuICAgIHJldHVybiBkb207XHJcbiAgfVxyXG4qL1xyXG5cclxuICAvKiBNb2RhbCBtZXRob2RzICovXHJcblxyXG4gIGZldGNoTW9kYWwodXJsKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICAgIGZldGNoKGAuL2Fzc2V0cy9odG1sLyR7dXJsfS5odG1sYCkudGhlbihkYXRhID0+IHtcclxuICAgICAgICBkYXRhLnRleHQoKS50aGVuKGh0bWwgPT4ge1xyXG4gICAgICAgICAgcmVzb2x2ZShkb2N1bWVudC5jcmVhdGVSYW5nZSgpLmNyZWF0ZUNvbnRleHR1YWxGcmFnbWVudChodG1sKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgY2xvc2VNb2RhbChldmVudCwgZm9yY2UpIHtcclxuXHRcdGlmIChmb3JjZSA9PT0gdHJ1ZSB8fCBldmVudC50YXJnZXQuaWQgPT09ICdtb2RhbC1vdmVybGF5JyB8fCBldmVudC50YXJnZXQuaWQuaW5kZXhPZignY2xvc2UnKSAhPT0gLTEpIHtcclxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsLW92ZXJsYXknKS5zdHlsZS5vcGFjaXR5ID0gMDtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsLW92ZXJsYXknKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RhbC1vdmVybGF5JykuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgIH0sIDMwMCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcbiAgZ2V0IHVzZXIoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fdXNlcjtcclxuICB9XHJcblxyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRG91cmRhbm5haXNFeHBsb3JlO1xyXG4iXSwibmFtZXMiOlsiTWFya2VycyIsIlV0aWxzIiwiTWFwIiwib3B0aW9ucyIsIl9jbGFzc0NhbGxDaGVjayIsIl9pZCIsInRhcmdldElkIiwiX21hcCIsIl9tYXJrcyIsIl9wb2x5Z29ucyIsIl9sYXllcnMiLCJDYXJ0ZSIsIlNhdGVsbGl0ZSIsIl9pbml0IiwiX2V2ZW50cyIsIl9jcmVhdGVDbGFzcyIsImtleSIsInZhbHVlIiwid2luZG93IiwiTCIsIm1hcCIsInpvb21Db250cm9sIiwic2V0VmlldyIsIkNDREhfQ0VOVEVSIiwiTEFUIiwiTE5HIiwiY29udHJvbCIsInNjYWxlIiwiYWRkVG8iLCJzZXRNYXhCb3VuZHMiLCJNQVBfQk9VTkRTIiwiT1NNX0xBWUVSIiwiRVNSSV9MQVlFUiIsImxheWVycyIsInBvc2l0aW9uIiwiX3RoaXMiLCJvbiIsIl9tYXBDbGlja2VkIiwiYmluZCIsInBhbkluc2lkZUJvdW5kcyIsImFuaW1hdGUiLCJvcHRzIiwiY29uc29sZSIsImxvZyIsImxhdGxuZyIsIkpTT04iLCJzdHJpbmdpZnkiLCJsYXQiLCJsbmciLCJkcmF3VXNlck1hcmtlciIsImR4IiwidXNlciIsIm1hcmtlciIsImljb24iLCJzZXRMYXRMbmciLCJhZGRNYXJrIiwiY3JlYXRlUG9wdXAiLCJfdGhpczIiLCJ0eXBlcyIsInR5cGUiLCJzcGxpdCIsImxlbmd0aCIsImNvbmNhdCIsImZseVRvIiwiYmluZFBvcHVwIiwiaSIsInB1c2giLCJhZGRQb2x5Z29uIiwicG9seWdvbiIsIk9iamVjdCIsImZyZWV6ZSIsInJlc3RhdXJhbnQiLCJJY29uIiwiaWNvblVybCIsImljb25TaXplIiwiaWNvbkFuY2hvciIsInBvcHVwQW5jaG9yIiwic2hhZG93VXJsIiwic2hhZG93U2l6ZSIsInNoYWRvd0FuY2hvciIsImJhciIsImNlbGxhciIsInRvYmFjY28iLCJncm9jZXJ5IiwiZGl5IiwiYmVhdXR5IiwiZm9vdCIsInJ1Z2J5IiwiYmFza2V0IiwicG9vbCIsInBpbmdwb25nIiwic2thdGUiLCJib2NjZSIsInRlbm5pcyIsImJha2VyeSIsImZpc2giLCJidXRjaGVyIiwiYm9vayIsIm11c2ljIiwibGFuZG1hcmsiLCJjYXN0bGUiLCJjaHVyY2giLCJ0b3VyaXNtIiwibXVzZXVtIiwiZ2FyZGVuIiwiY2FyIiwiZ2FzIiwidHJhaW4iLCJhbmltYWwiLCJkZW50YWwiLCJwaGFybWFjeSIsIm1lZGljIiwibGFiIiwiZGVmaWJyaWxsYXRvciIsImNlbWV0ZXJ5IiwiZmlyZWZpZ2h0ZXIiLCJwb2xpY2UiLCJtYWlsIiwiYmFuayIsInBhcmsiLCJyZWN5Y2xlIiwiYWRtaW5pc3RyYXRpb24iLCJzY2hvb2wiLCJnZXREaXN0YW5jZUJldHdlZW5Db29yZHMiLCJmcm9tIiwidG8iLCJsb24xIiwiTWF0aCIsIlBJIiwibGF0MSIsImxvbjIiLCJsYXQyIiwiZGVsdGFMYXQiLCJkZWx0YUxvbiIsImEiLCJwb3ciLCJzaW4iLCJjb3MiLCJjIiwiYXNpbiIsInNxcnQiLCJjb252ZXJ0RGlzdGFuY2VUb1N0cmluZyIsImRpc3RhbmNlIiwicHJlY2lzaW9uUm91bmQiLCJidWlsZERpc3RhbmNlRVRBIiwiY2FyTWludXRlcyIsImNhclNlY29uZHMiLCJmbG9vciIsIndhbGtNaW51dGVzIiwid2Fsa1NlY29uZHMiLCJ3YWxrIiwicHJlY2lzaW9uIiwibXVsdGlwbGllciIsInJvdW5kIiwiQ0NESF9DSVRJRVMiLCJsYXRMbmdCb3VuZHMiLCJsYXRMbmciLCJ0aWxlTGF5ZXIiLCJhdHRyaWJ1dGlvbiIsIm1heFpvb20iLCJtaW5ab29tIiwiRG91cmRhbm5haXNFeHBsb3JlIiwiX2RhdGEiLCJfdXNlciIsImdlb2xvY2F0aW9uQWxsb3dlZCIsIkhPTUVfTEFUIiwiSE9NRV9MTkciLCJhY2N1cmFjeSIsIl9pbml0R2VvbG9jYXRpb24iLCJ0aGVuIiwiX2luaXRNYXAiLCJfaW5pdEV2ZW50cyIsIl9mZXRjaE1hcmtlcnMiLCJQcm9taXNlIiwicmVzb2x2ZSIsIm5hdmlnYXRvciIsImVuYWJsZUhpZ2hBY2N1cmFjeSIsIm1heGltdW1BZ2UiLCJ0aW1lb3V0IiwiZ2VvbG9jYXRpb24iLCJnZXRDdXJyZW50UG9zaXRpb24iLCJfcG9zaXRpb25Jbml0aWFsaXplZCIsIl93YXRjaElkIiwid2F0Y2hQb3NpdGlvbiIsIl9wb3NpdGlvblVwZGF0ZSIsIl90aGlzMyIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJhZGRFdmVudExpc3RlbmVyIiwiY2xvc2VNb2RhbCIsIl90aGlzNCIsInByb21pc2VzIiwiX2xvb3AiLCJyZXNvbHZlTG9jYWwiLCJmZXRjaCIsImRhdGEiLCJqc29uIiwianNvbkRhdGEiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJfYnVpbGRQb2x5Z29ucyIsImJvdW5kcyIsIl9idWlsZE1hcmtlcnMiLCJwb2lzIiwiYWxsIiwibWFya2VycyIsIl90aGlzNSIsImtleXMiLCJqIiwiX2NyZWF0ZU1hcmtlclBvcHVwIiwiY2l0eUJvdW5kcyIsIl90aGlzNiIsImNvb3JkcyIsImxhdGl0dWRlIiwibG9uZ2l0dWRlIiwiZG9tIiwiY3JlYXRlRWxlbWVudCIsInRpdGxlIiwiYWRkcmVzcyIsInRvd24iLCJwaG9uZSIsIndlYnNpdGUiLCJpbmZvIiwib3BlbldpdGgiLCJjbGFzc0xpc3QiLCJhZGQiLCJpbm5lckhUTUwiLCJuYW1lIiwiaHJlZiIsInNldEF0dHJpYnV0ZSIsImFwcGVuZENoaWxkIiwiYnV0dG9uIiwiX21hcmtlck9wZW5lZFN0YXRlIiwidGltZXRhYmxlIiwiYWx3YXlzQ2xvc2VkIiwiaXNPcGVuIiwiX3RpbWV0YmFsZU1vZGFsIiwic3RhdGUiLCJtb3JlIiwiX21hcmtlcklzQ2xvc2VkIiwiX2NoZWNrVGltZSIsInNldEludGVydmFsIiwiX21hcmtlcklzT3BlbmVkIiwibm93IiwiRGF0ZSIsImhvdXIiLCJnZXRIb3VycyIsIm1pbnV0ZXMiLCJnZXRNaW51dGVzIiwiZGF5T2ZXZWVrIiwiZ2V0RGF5Iiwib3BlbmluZ1RpbWUiLCJwYXJzZUludCIsIm9wZW4iLCJoIiwibSIsImNsb3NpbmdUaW1lIiwiY2xvc2UiLCJjdXJyZW50VGltZSIsImlzTmFOIiwiaGFzQnJlYWsiLCJzZXZlcmFsIiwiaXNDbG9zZWQiLCJicmVha09wZW5pbmdUaW1lIiwiZW5kIiwiYnJlYWtDbG9zaW5nVGltZSIsInN0YXJ0IiwiYWx3YXlzT3BlbmVkIiwiZmlyc3RDaGlsZCIsImxhc3RDaGlsZCIsInJlbW92ZSIsIl90aGlzNyIsImZldGNoTW9kYWwiLCJxdWVyeVNlbGVjdG9yIiwiZXRhIiwiZGF5RG9tIiwiY2hpbGRyZW4iLCJtb3JuaW5nIiwibGFzdEVsZW1lbnRDaGlsZCIsImZpcnN0RWxlbWVudENoaWxkIiwiYWZ0ZXJub29uIiwiZGl2Iiwic3R5bGUiLCJib3JkZXJSYWRpdXMiLCJqdXN0aWZ5Q29udGVudCIsImluc2VydEJlZm9yZSIsImRpc3BsYXkiLCJzZXRUaW1lb3V0Iiwib3BhY2l0eSIsInVybCIsInRleHQiLCJodG1sIiwiY3JlYXRlUmFuZ2UiLCJjcmVhdGVDb250ZXh0dWFsRnJhZ21lbnQiLCJldmVudCIsImZvcmNlIiwidGFyZ2V0IiwiaWQiLCJpbmRleE9mIiwiZ2V0Il0sInNvdXJjZVJvb3QiOiIifQ==
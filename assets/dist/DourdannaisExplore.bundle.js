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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGRSxNQUFNLEVBQUUsSUFBSS9ELE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lBQ3hCQyxPQUFPLEVBQUUsOEJBQThCO0lBQ3ZDQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xCQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BCQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGRyxPQUFPLEVBQUUsSUFBSWhFLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lBQ3pCQyxPQUFPLEVBQUUsK0JBQStCO0lBQ3hDQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xCQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BCQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGSSxPQUFPLEVBQUUsSUFBSWpFLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lBQ3pCQyxPQUFPLEVBQUUsK0JBQStCO0lBQ3hDQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xCQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BCQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGSyxHQUFHLEVBQUUsSUFBSWxFLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lBQ3JCQyxPQUFPLEVBQUUsMkJBQTJCO0lBQ3BDQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xCQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BCQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGTSxJQUFJLEVBQUUsSUFBSW5FLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lBQ3RCQyxPQUFPLEVBQUUsNEJBQTRCO0lBQ3JDQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xCQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BCQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGTyxLQUFLLEVBQUUsSUFBSXBFLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lBQ3ZCQyxPQUFPLEVBQUUsNkJBQTZCO0lBQ3RDQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xCQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BCQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGUSxRQUFRLEVBQUUsSUFBSXJFLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lBQzFCQyxPQUFPLEVBQUUsZ0NBQWdDO0lBQ3pDQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xCQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BCQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGUyxLQUFLLEVBQUUsSUFBSXRFLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lBQ3ZCQyxPQUFPLEVBQUUsNkJBQTZCO0lBQ3RDQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xCQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BCQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGVSxLQUFLLEVBQUUsSUFBSXZFLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lBQ3ZCQyxPQUFPLEVBQUUsNkJBQTZCO0lBQ3RDQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xCQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BCQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGVyxNQUFNLEVBQUUsSUFBSXhFLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lBQ3hCQyxPQUFPLEVBQUUsOEJBQThCO0lBQ3ZDQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xCQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BCQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGWSxNQUFNLEVBQUUsSUFBSXpFLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lBQ3hCQyxPQUFPLEVBQUUsNkJBQTZCO0lBQ3RDQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xCQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BCQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGYSxJQUFJLEVBQUUsSUFBSTFFLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lBQ3RCQyxPQUFPLEVBQUUsNEJBQTRCO0lBQ3JDQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xCQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BCQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGYyxPQUFPLEVBQUUsSUFBSTNFLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lBQ3pCQyxPQUFPLEVBQUUsK0JBQStCO0lBQ3hDQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xCQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BCQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckJDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEJDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0VBQ3ZCLENBQUMsQ0FBQztFQUNGZSxJQUFJLEVBQUUsSUFBSTVFLE1BQU0sQ0FBQ0MsQ0FBQyxDQUFDcUQsSUFBSSxDQUFDO0lB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QztJQUFBN00sR0FBQTtJQUFBZ1IsR0FBQSxFQUdELFNBQUFBLElBQUEsRUFBVztNQUNULE9BQU8sSUFBSSxDQUFDakksS0FBSztJQUNuQjtFQUFDO0VBQUEsT0FBQUYsa0JBQUE7QUFBQTtBQUtILGlFQUFlQSxrQkFBa0IsRSIsInNvdXJjZXMiOlsid2VicGFjazovL0RvdXJkYW5uYWlzRXhwbG9yZS8uL3NyYy9qcy91dGlscy9NYXAuanMiLCJ3ZWJwYWNrOi8vRG91cmRhbm5haXNFeHBsb3JlLy4vc3JjL2pzL3V0aWxzL01hcmtlckVudW0uanMiLCJ3ZWJwYWNrOi8vRG91cmRhbm5haXNFeHBsb3JlLy4vc3JjL2pzL3V0aWxzL1V0aWxzLmpzIiwid2VicGFjazovL0RvdXJkYW5uYWlzRXhwbG9yZS8uL3NyYy9zY3NzL0RvdXJkYW5uYWlzRXhwbG9yZS5zY3NzIiwid2VicGFjazovL0RvdXJkYW5uYWlzRXhwbG9yZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9Eb3VyZGFubmFpc0V4cGxvcmUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL0RvdXJkYW5uYWlzRXhwbG9yZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL0RvdXJkYW5uYWlzRXhwbG9yZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL0RvdXJkYW5uYWlzRXhwbG9yZS8uL3NyYy9qcy9Eb3VyZGFubmFpc0V4cGxvcmUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE1hcmtlcnMgZnJvbSAnLi9NYXJrZXJFbnVtLmpzJztcclxuaW1wb3J0IFV0aWxzIGZyb20gJy4vVXRpbHMuanMnO1xyXG5cclxuXHJcbmNsYXNzIE1hcCB7XHJcblxyXG5cclxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcbiAgICB0aGlzLl9pZCA9IG9wdGlvbnMudGFyZ2V0SWQ7XHJcbiAgICB0aGlzLl9tYXAgPSBudWxsO1xyXG4gICAgdGhpcy5fbWFya3MgPSB7fTtcclxuICAgIHRoaXMuX3BvbHlnb25zID0gW107XHJcbiAgICB0aGlzLl9sYXllcnMgPSB7XHJcbiAgICAgIENhcnRlOiBudWxsLFxyXG4gICAgICBTYXRlbGxpdGU6IG51bGxcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5faW5pdCgpO1xyXG4gICAgdGhpcy5fZXZlbnRzKCk7XHJcbiAgfVxyXG5cclxuXHJcbiAgX2luaXQoKSB7XHJcbiAgICAvLyBVc2UgbWFpbiBkaXYgdG8gaW5qZWN0IE9TTSBpbnRvXHJcbiAgICB0aGlzLl9tYXAgPSB3aW5kb3cuTC5tYXAodGhpcy5faWQsIHtcclxuICAgICAgem9vbUNvbnRyb2w6IGZhbHNlLFxyXG4gICAgfSkuc2V0VmlldyhbVXRpbHMuQ0NESF9DRU5URVIuTEFULCBVdGlscy5DQ0RIX0NFTlRFUi5MTkddLCAxMik7XHJcbiAgICAvLyBBZGQgbWV0ZXIgYW5kIGZlZXQgc2NhbGUgb24gbWFwXHJcbiAgICB3aW5kb3cuTC5jb250cm9sLnNjYWxlKCkuYWRkVG8odGhpcy5fbWFwKTtcclxuICAgIC8vIFByZXZlbnQgcGFubmluZyBvdXRzaWRlIG9mIHRoZSBtYXAgYm91bmRzIGRlZmluaW5lZCBpbiB1dGlsc1xyXG4gICAgdGhpcy5fbWFwLnNldE1heEJvdW5kcyhVdGlscy5NQVBfQk9VTkRTKTtcclxuICAgIC8vIEFkZCBsYXllciBncm91cCB0byBpbnRlcmZhY2UgYW5kIHN0YXJ0IG1hcCB3aXRoIG9zbSBkZWZhdWx0XHJcbiAgICB0aGlzLl9sYXllcnMuQ2FydGUgPSBVdGlscy5PU01fTEFZRVI7XHJcbiAgICB0aGlzLl9sYXllcnMuU2F0ZWxsaXRlID0gVXRpbHMuRVNSSV9MQVlFUjtcclxuICAgIHRoaXMuX2xheWVycy5DYXJ0ZS5hZGRUbyh0aGlzLl9tYXApO1xyXG4gICAgLy8gQWRkIGxheWVyIHN3aXRjaCByYWRpbyBvbiBib3R0b20gcmlnaHQgb2YgdGhlIG1hcFxyXG4gICAgd2luZG93LkwuY29udHJvbC5sYXllcnModGhpcy5fbGF5ZXJzLCB7fSwgeyBwb3NpdGlvbjogJ2JvdHRvbXJpZ2h0JyB9KS5hZGRUbyh0aGlzLl9tYXApO1xyXG4gIH1cclxuXHJcblxyXG4gIF9ldmVudHMoKSB7XHJcbiAgICAvLyBTdWJzY3JpYmUgdG8gY2xpY2sgZXZlbnQgb24gbWFwIHRvIHJlYWN0XHJcbiAgICB0aGlzLl9tYXAub24oJ2NsaWNrJywgdGhpcy5fbWFwQ2xpY2tlZC5iaW5kKHRoaXMpKTtcclxuICAgIC8vIE1hcCBpcyBkcmFnZ2VkIGJ5IHVzZXIgbW91c2UvZmluZ2VyXHJcbiAgICB0aGlzLl9tYXAub24oJ2RyYWcnLCAoKSA9PiB7XHJcbiAgICAgIC8vIENvbnN0cmFpbiBwYW4gdG8gdGhlIG1hcCBib3VuZHNcclxuICAgICAgdGhpcy5fbWFwLnBhbkluc2lkZUJvdW5kcyhVdGlscy5NQVBfQk9VTkRTLCB7IGFuaW1hdGU6IHRydWUgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG5cclxuICBfbWFwQ2xpY2tlZChvcHRzKSB7XHJcbiAgICBjb25zb2xlLmxvZyhvcHRzLmxhdGxuZywgSlNPTi5zdHJpbmdpZnkob3B0cy5sYXRsbmcubGF0ICsgJywgJyArIG9wdHMubGF0bG5nLmxuZykpO1xyXG4gIH1cclxuXHJcblxyXG4gIGRyYXdVc2VyTWFya2VyKCkge1xyXG4gICAgaWYgKCF3aW5kb3cuZHgudXNlci5tYXJrZXIpIHtcclxuICAgICAgd2luZG93LmR4LnVzZXIubWFya2VyID0gd2luZG93LkwubWFya2VyKFt3aW5kb3cuZHgudXNlci5sYXQsIHdpbmRvdy5keC51c2VyLmxuZ10sIHtcclxuICAgICAgICBpY29uOiBNYXJrZXJzLnVzZXJcclxuICAgICAgfSk7XHJcbiAgICAgIHdpbmRvdy5keC51c2VyLm1hcmtlci5hZGRUbyh0aGlzLl9tYXApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgd2luZG93LmR4LnVzZXIubWFya2VyLnNldExhdExuZyh3aW5kb3cuZHgudXNlcik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcbiAgYWRkTWFyayhvcHRzLCBjcmVhdGVQb3B1cCkge1xyXG4gICAgbGV0IHR5cGVzID0gb3B0cy50eXBlLnNwbGl0KCcvJyk7XHJcbiAgICBsZXQgdHlwZSA9IG9wdHMudHlwZTtcclxuICAgIGlmICh0eXBlcy5sZW5ndGggPiAxKSB7XHJcbiAgICAgIHR5cGUgPSBgJHt0eXBlc1swXX0ke3R5cGVzWzFdfWA7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbWFya2VyID0gd2luZG93LkwubWFya2VyKFtvcHRzLmxhdCwgb3B0cy5sbmddLCB7IFxyXG4gICAgICBpY29uOiBNYXJrZXJzW3R5cGVdXHJcbiAgICB9KS5vbignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMuX21hcC5mbHlUbyhbb3B0cy5sYXQsIG9wdHMubG5nXSwgMTgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgbWFya2VyLmJpbmRQb3B1cChjcmVhdGVQb3B1cChvcHRzKSk7XHJcbiAgICBtYXJrZXIuYWRkVG8odGhpcy5fbWFwKTtcclxuICAgIGlmICh0eXBlcy5sZW5ndGggPiAxKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdHlwZXMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX21hcmtzW3R5cGVzW2ldXSkge1xyXG4gICAgICAgICAgdGhpcy5fbWFya3NbdHlwZXNbaV1dID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX21hcmtzW3R5cGVzW2ldXS5wdXNoKG1hcmtlcik7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICghdGhpcy5fbWFya3NbdHlwZV0pIHtcclxuICAgICAgICB0aGlzLl9tYXJrc1t0eXBlXSA9IFtdO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuX21hcmtzW3R5cGVdLnB1c2gobWFya2VyKTtcclxuICAgIH1cclxuICB9XHJcblxyXG5cclxuICBhZGRQb2x5Z29uKHBvbHlnb24pIHtcclxuICAgIHRoaXMuX3BvbHlnb25zLnB1c2god2luZG93LkwucG9seWdvbihwb2x5Z29uKS5hZGRUbyh0aGlzLl9tYXApKTtcclxuICB9XHJcblxyXG5cclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1hcDtcclxuIiwiZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmZyZWV6ZSh7XHJcbiAgcmVzdGF1cmFudDogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL3Jlc3RhdXJhbnQuc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIGJhcjogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL2Jhci5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgY2VsbGFyOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvY2VsbGFyLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICB0b2JhY2NvOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvdG9iYWNjby5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgZ3JvY2VyeTogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL2dyb2Nlcnkuc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIGRpeTogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL2RpeS5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgZm9vdDogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL2Zvb3Quc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIHJ1Z2J5OiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvcnVnYnkuc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIHBpbmdwb25nOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvcGluZ3Bvbmcuc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIHNrYXRlOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvc2thdGUuc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIGJvY2NlOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvYm9jY2Uuc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIHRlbm5pczogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL3Rlbm5pcy5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgYmFrZXJ5OiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvYnJlYWQuc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIGZpc2g6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9maXNoLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBidXRjaGVyOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvYnV0Y2hlci5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgYm9vazogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL2Jvb2suc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIG11c2ljOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbXVzaWMuc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIGxhbmRtYXJrOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbGFuZG1hcmsuc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIGNhc3RsZTogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL2Nhc3RsZS5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgY2h1cmNoOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvY2h1cmNoLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICB0b3VyaXNtOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvdG91cmlzbS5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgbXVzZXVtOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbXVzZXVtLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBnYXJkZW46IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9nYXJkZW4uc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIGNhcjogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL2Nhci5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgZ2FzOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvZ2FzLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICB0cmFpbjogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL3RyYWluLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBhbmltYWw6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9hbmltYWwuc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIGRlbnRhbDogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL2RlbnRhbC5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgcGhhcm1hY3k6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9waGFybWFjeS5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgbWVkaWM6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9tZWRpYy5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgZGVmaWJyaWxsYXRvcjogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL2RlZmlicmlsbGF0b3Iuc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIGNlbWV0ZXJ5OiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvY2VtZXRlcnkuc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIGZpcmVmaWdodGVyOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvZmlyZWZpZ2h0ZXIuc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIHBvbGljZTogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL3BvbGljZS5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgbWFpbDogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21haWwuc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIGJhbms6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9iYW5rLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBwYXJrOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvcGFyay5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgcmVjeWNsZTogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL3JlY3ljbGUuc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIGFkbWluaXN0cmF0aW9uOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvYWRtaW5pc3RyYXRpb24uc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIHNjaG9vbDogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL3NjaG9vbC5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgdXNlcjogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL3VzZXIuc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdXHJcbiAgfSlcclxufSk7XHJcbiIsImNvbnN0IGdldERpc3RhbmNlQmV0d2VlbkNvb3JkcyA9IChmcm9tLCB0bykgPT4ge1xyXG4gIC8vIFJldHVybiBkaXN0YW5jZSBpbiBtZXRlcnNcclxuICBjb25zdCBsb24xID0gKGZyb21bMV0gKiBNYXRoLlBJKSAvIDE4MCxcclxuICAgIGxhdDEgPSAoZnJvbVswXSAqIE1hdGguUEkpIC8gMTgwLFxyXG4gICAgbG9uMiA9ICh0b1sxXSAqIE1hdGguUEkpIC8gMTgwLFxyXG4gICAgbGF0MiA9ICh0b1swXSAqIE1hdGguUEkpIC8gMTgwO1xyXG5cclxuICBjb25zdCBkZWx0YUxhdCA9IGxhdDIgLSBsYXQxO1xyXG4gIGNvbnN0IGRlbHRhTG9uID0gbG9uMiAtIGxvbjE7XHJcblxyXG4gIGNvbnN0IGEgPSBNYXRoLnBvdyhNYXRoLnNpbihkZWx0YUxhdCAvIDIpLCAyKSArIE1hdGguY29zKGxhdDEpICogTWF0aC5jb3MobGF0MikgKiBNYXRoLnBvdyhNYXRoLnNpbihkZWx0YUxvbiAvIDIpLCAyKTtcclxuICBjb25zdCBjID0gMiAqIE1hdGguYXNpbihNYXRoLnNxcnQoYSkpO1xyXG4gIHJldHVybiBjICogNjM3MSAqIDEwMDA7XHJcbn07XHJcblxyXG5cclxuY29uc3QgY29udmVydERpc3RhbmNlVG9TdHJpbmcgPSBkaXN0YW5jZSA9PiB7XHJcbiAgaWYgKGRpc3RhbmNlID4gMTAwMCkge1xyXG4gICAgZGlzdGFuY2UgPSBgJHtwcmVjaXNpb25Sb3VuZChkaXN0YW5jZSAvIDEwMDAsIDIpfWttYDtcclxuICB9IGVsc2Uge1xyXG4gICAgZGlzdGFuY2UgPSBgJHtwcmVjaXNpb25Sb3VuZChkaXN0YW5jZSwgMil9bWA7XHJcbiAgfVxyXG4gIHJldHVybiBkaXN0YW5jZTtcclxufTtcclxuXHJcblxyXG5jb25zdCBidWlsZERpc3RhbmNlRVRBID0gZGlzdGFuY2UgPT4ge1xyXG4gIGxldCBjYXJNaW51dGVzID0gMDtcclxuICBsZXQgY2FyU2Vjb25kcyA9IDA7XHJcblxyXG4gIGlmIChkaXN0YW5jZSA+IDUwMDAwKSB7XHJcbiAgICAvLyBPdmVyIDUwa20sIHdlIHVzZSBhdmVyYWdlIHNwZWVkIG9mIDEwMGttaFxyXG4gICAgY2FyTWludXRlcyA9IChkaXN0YW5jZSAvIDEwMDAwMCkgKiA2MDtcclxuICB9IGVsc2UgaWYgKGRpc3RhbmNlID4gMTAwMDApIHtcclxuICAgIC8vIE92ZXIgMTBrbSwgd2UgdXNlIGF2ZXJhZ2Ugc3BlZWQgb2YgNjBrbS9oXHJcbiAgICBjYXJNaW51dGVzID0gKGRpc3RhbmNlIC8gNjAwMDApICogNjA7XHJcbiAgfSBlbHNlIHtcclxuICAgIC8vIFVuZGVyIDEwa20gd2UgdXNlciBhdmVyYWdlIHNwZWVkIG9mIDMwa20vaFxyXG4gICAgY2FyTWludXRlcyA9IChkaXN0YW5jZSAvIDMwMDAwKSAqIDYwO1xyXG4gIH1cclxuXHJcbiAgY2FyU2Vjb25kcyA9IGNhck1pbnV0ZXMgJSAxOyAvLyBLZWVwIGZsb2F0aW5nIHZhbHVlIGZvciBzZWNvbmRzIGNvbXB1dGluZ1xyXG4gIGNhck1pbnV0ZXMgPSBNYXRoLmZsb29yKGNhck1pbnV0ZXMpOyAvLyBSZW1vdmUgZmxvYXRpbmcgdmFsdWVcclxuXHJcbiAgaWYgKGNhck1pbnV0ZXMgPiA2MCkge1xyXG4gICAgY2FyTWludXRlcyA9IGAke01hdGguZmxvb3IoY2FyTWludXRlcyAvIDYwKX1oICR7Y2FyTWludXRlcyAlIDYwfW1gO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBjYXJNaW51dGVzID0gYCR7Y2FyTWludXRlc31tYDtcclxuICB9XHJcblxyXG4gIGxldCB3YWxrTWludXRlcyA9IChkaXN0YW5jZSAvIDUwMDApICogNjA7XHJcbiAgbGV0IHdhbGtTZWNvbmRzID0gd2Fsa01pbnV0ZXMgJSAxO1xyXG4gIHdhbGtNaW51dGVzID0gTWF0aC5mbG9vcih3YWxrTWludXRlcyk7IC8vIFJlbW92ZSBmbG9hdGluZyB2YWx1ZVxyXG5cclxuICBpZiAod2Fsa01pbnV0ZXMgPiA2MCkge1xyXG4gICAgd2Fsa01pbnV0ZXMgPSBgJHtNYXRoLmZsb29yKHdhbGtNaW51dGVzIC8gNjApfWggJHt3YWxrTWludXRlcyAlIDYwfW1gO1xyXG4gIH0gZWxzZSB7XHJcbiAgICB3YWxrTWludXRlcyA9IGAke3dhbGtNaW51dGVzfW1gO1xyXG4gIH0gIFxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgY2FyOiBgJHtjYXJNaW51dGVzfSAke01hdGguZmxvb3IocHJlY2lzaW9uUm91bmQoKGNhclNlY29uZHMgLyAxMDApICogNjAsIDIpICogMTAwKX1zYCxcclxuICAgIHdhbGs6IGAke3dhbGtNaW51dGVzfSAke01hdGguZmxvb3IocHJlY2lzaW9uUm91bmQoKHdhbGtTZWNvbmRzIC8gMTAwKSAqIDYwLCAyKSAqIDEwMCl9c2AsXHJcbiAgfTtcclxufTtcclxuXHJcblxyXG5jb25zdCBwcmVjaXNpb25Sb3VuZCA9ICh2YWx1ZSwgcHJlY2lzaW9uKSA9PiB7XHJcbiAgY29uc3QgbXVsdGlwbGllciA9IE1hdGgucG93KDEwLCBwcmVjaXNpb24gfHwgMCk7XHJcbiAgcmV0dXJuIE1hdGgucm91bmQodmFsdWUgKiBtdWx0aXBsaWVyKSAvIG11bHRpcGxpZXI7XHJcbn07XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIENDREhfQ0VOVEVSOiB7XHJcbiAgICBMQVQ6IDQ4LjUzMTgzOTA2NDQxOTYyLFxyXG4gICAgTE5HOiAyLjA1Mzc1NjcxMzg2NzE4OFxyXG4gIH0sXHJcbiAgQ0NESF9DSVRJRVM6IFsnQlJYJywgJ0NPUicsICdEUkQnLCAnTEZSJywgJ0xHUicsICdSSUMnLCAnUk9WJywgJ1NDRCcsICdTRVInLCAnU1RDJywgJ1ZTRyddLFxyXG4gIE1BUF9CT1VORFM6IHdpbmRvdy5MLmxhdExuZ0JvdW5kcyhcclxuICAgIHdpbmRvdy5MLmxhdExuZyg0OC42Nzk0MDA3MTU5NjM4OTQsIDEuNzM5MDYwNjY4OTQ1MzEyNyksXHJcbiAgICB3aW5kb3cuTC5sYXRMbmcoNDguMzg0MzkwNzQxNTE4NjYsIDIuMzQzMzk1OTk2MDkzNzUwKVxyXG4gICksXHJcbiAgT1NNX0xBWUVSOiB3aW5kb3cuTC50aWxlTGF5ZXIoJ2h0dHBzOi8ve3N9LnRpbGUub3BlbnN0cmVldG1hcC5vcmcve3p9L3t4fS97eX0ucG5nJywge1xyXG4gICAgYXR0cmlidXRpb246ICcmY29weTsgPGEgaHJlZj1cImh0dHBzOi8vd3d3Lm9wZW5zdHJlZXRtYXAub3JnL2NvcHlyaWdodFwiPk9wZW5TdHJlZXRNYXA8L2E+JyxcclxuICAgIG1heFpvb206IDE5LFxyXG4gICAgbWluWm9vbTogMTFcclxuICB9KSxcclxuICBFU1JJX0xBWUVSOiB3aW5kb3cuTC50aWxlTGF5ZXIoJ2h0dHBzOi8vc2VydmVyLmFyY2dpc29ubGluZS5jb20vQXJjR0lTL3Jlc3Qvc2VydmljZXMvV29ybGRfSW1hZ2VyeS9NYXBTZXJ2ZXIvdGlsZS97en0ve3l9L3t4fScsIHtcclxuICAgIGF0dHJpYnV0aW9uOiAnJmNvcHk7IDxhIGhyZWY9XCJodHRwczovL3d3dy5hcmNnaXMuY29tL2hvbWUvaXRlbS5odG1sP2lkPTEwZGYyMjc5Zjk2ODRlNGE5ZjZhN2YwOGZlYmFjMmE5XCI+RXNyaSBJbWFnZXJ5PC9hPicsXHJcbiAgICBtYXhab29tOiAxOSxcclxuICAgIG1pblpvb206IDExXHJcbiAgfSksXHJcbiAgZ2V0RGlzdGFuY2VCZXR3ZWVuQ29vcmRzOiBnZXREaXN0YW5jZUJldHdlZW5Db29yZHMsXHJcbiAgY29udmVydERpc3RhbmNlVG9TdHJpbmc6IGNvbnZlcnREaXN0YW5jZVRvU3RyaW5nLFxyXG4gIGJ1aWxkRGlzdGFuY2VFVEE6IGJ1aWxkRGlzdGFuY2VFVEEsXHJcbiAgcHJlY2lzaW9uUm91bmQ6IHByZWNpc2lvblJvdW5kXHJcbn07XHJcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICcuLi9zY3NzL0RvdXJkYW5uYWlzRXhwbG9yZS5zY3NzJztcclxuaW1wb3J0IE1hcCBmcm9tICcuL3V0aWxzL01hcC5qcyc7XHJcbmltcG9ydCBVdGlscyBmcm9tICcuL3V0aWxzL1V0aWxzLmpzJztcclxuXHJcblxyXG5jbGFzcyBEb3VyZGFubmFpc0V4cGxvcmUge1xyXG5cclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAvLyBNYXAgaW50ZXJuYWxzXHJcbiAgICB0aGlzLl9tYXAgPSBudWxsO1xyXG4gICAgdGhpcy5fbGF5ZXJzID0ge307XHJcblxyXG4gICAgLy8gRGF0YSBvYmplY3RcclxuICAgIHRoaXMuX2RhdGEgPSB7fTtcclxuXHJcbiAgICB0aGlzLl91c2VyID0ge1xyXG4gICAgICBnZW9sb2NhdGlvbkFsbG93ZWQ6IGZhbHNlLFxyXG4gICAgICBsYXQ6IFV0aWxzLkhPTUVfTEFULFxyXG4gICAgICBsbmc6IFV0aWxzLkhPTUVfTE5HLFxyXG4gICAgICBhY2N1cmFjeTogMCxcclxuICAgICAgbWFya2VyOiBudWxsXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuX2luaXRHZW9sb2NhdGlvbigpXHJcbiAgICAgIC50aGVuKHRoaXMuX2luaXRNYXAuYmluZCh0aGlzKSlcclxuICAgICAgLnRoZW4odGhpcy5faW5pdEV2ZW50cy5iaW5kKHRoaXMpKVxyXG4gICAgICAudGhlbih0aGlzLl9mZXRjaE1hcmtlcnMuYmluZCh0aGlzKSlcclxuICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCd3ZSBhcmUgZG9uZScpXHJcbiAgICAgIH0pO1xyXG4vLyAgICAgIC50aGVuKHRoaXMuX2J1aWxkTWFya2Vycy5iaW5kKHRoaXMpKVxyXG4vLyAgICAgIC50aGVuKHRoaXMuX2J1aWxkUG9seWdvbnMuYmluZCh0aGlzKSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLyogSW5pdCBzZXF1ZW5jZSAqL1xyXG5cclxuXHJcbiAgX2luaXRHZW9sb2NhdGlvbigpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuXHRcdFx0aWYgKCdnZW9sb2NhdGlvbicgaW4gbmF2aWdhdG9yKSB7XHJcbiAgICAgICAgLy8gVE9ETyA6IGluIG5leHQgdmVyc2lvbiwgbWFrZSB0aGlzIGEgcHJlZiBsb3cvaGlnaCAodG9nZ2xlKVxyXG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICBlbmFibGVIaWdoQWNjdXJhY3k6IHRydWUsIC8vIE1vcmUgY29uc3VwdGlvbiwgYmV0dGVyIHBvc2l0aW9uXHJcbiAgICAgICAgICBtYXhpbXVtQWdlOiAxMDAwLCAvLyBBIHBvc2l0aW9uIHdpbGwgbGFzdCAxcyBtYXhpbXVtXHJcbiAgICAgICAgICB0aW1lb3V0OiA5MDAsIC8vIEEgcG9zaXRpb24gaXMgdXBkYXRlZCBpbiAwLjlzIG1heGltdW1cclxuICAgICAgICB9O1xyXG4gICAgICAgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24odGhpcy5fcG9zaXRpb25Jbml0aWFsaXplZC5iaW5kKHRoaXMpLCBudWxsLCBvcHRpb25zKTtcclxuXHRcdFx0XHR0aGlzLl93YXRjaElkID0gbmF2aWdhdG9yLmdlb2xvY2F0aW9uLndhdGNoUG9zaXRpb24odGhpcy5fcG9zaXRpb25VcGRhdGUuYmluZCh0aGlzKSwgbnVsbCwgb3B0aW9ucyk7XHJcbiAgICAgIH1cclxuICAgICAgLy8gRG9uJ3QgbG9jayBpbml0aWFsaXphdGlvbiB3YWl0aW5nIGZvciBwb3NcclxuICAgICAgcmVzb2x2ZSgpO1xyXG5cdFx0fSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgX2luaXRNYXAoKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICAgIHRoaXMuX21hcCA9IG5ldyBNYXAoe1xyXG4gICAgICAgIHRhcmdldElkOiAnc2FybWF0ZXMtbGFuZCdcclxuICAgICAgfSk7XHJcbiAgICAgIHJlc29sdmUoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG4gIF9pbml0RXZlbnRzKCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xyXG4gICAgICAvLyBMaXN0ZW5pbmcgdG8gbW9kYWwgZXZlbnRcclxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsLW92ZXJsYXknKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuY2xvc2VNb2RhbC5iaW5kKHRoaXMpKTtcclxuICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgX2ZldGNoTWFya2VycygpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuICAgICAgY29uc3QgcHJvbWlzZXMgPSBbXTtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBVdGlscy5DQ0RIX0NJVElFUy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgIHByb21pc2VzLnB1c2gobmV3IFByb21pc2UocmVzb2x2ZUxvY2FsID0+IHtcclxuICAgICAgICAgIGZldGNoKGAuL2Fzc2V0cy9qc29uLyR7VXRpbHMuQ0NESF9DSVRJRVNbaV19Lmpzb25gKS50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBkYXRhLmpzb24oKS50aGVuKGpzb25EYXRhID0+IHtcclxuICAgICAgICAgICAgICB0aGlzLl9kYXRhW1V0aWxzLkNDREhfQ0lUSUVTW2ldXSA9IGpzb25EYXRhO1xyXG4gICAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9idWlsZFBvbHlnb25zKHRoaXMuX2RhdGFbVXRpbHMuQ0NESF9DSVRJRVNbaV1dLmJvdW5kcykudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYnVpbGRNYXJrZXJzKHRoaXMuX2RhdGFbVXRpbHMuQ0NESF9DSVRJRVNbaV1dLnBvaXMpLnRoZW4ocmVzb2x2ZUxvY2FsKTtcclxuICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChyZXNvbHZlTG9jYWwpO1xyXG4gICAgICAgICAgfSkuY2F0Y2gocmVzb2x2ZUxvY2FsKTtcclxuICAgICAgICB9KSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKHJlc29sdmUpO1xyXG4vKlxyXG4gICAgICBmZXRjaChgLi9hc3NldHMvanNvbi9NYXBEYXRhLmpzb25gKS50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgIGRhdGEuanNvbigpLnRoZW4oanNvbkRhdGEgPT4ge1xyXG4gICAgICAgICAgdGhpcy5fZGF0YSA9IGpzb25EYXRhO1xyXG4gICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgIH0pLmNhdGNoKHJlc29sdmUpO1xyXG4gICAgICB9KS5jYXRjaChyZXNvbHZlKTtcclxuKi9cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG4gIF9idWlsZE1hcmtlcnMobWFya2Vycykge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xyXG4gICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMobWFya2Vycyk7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbWFya2Vyc1trZXlzW2ldXS5sZW5ndGg7ICsraikge1xyXG4gICAgICAgICAgdGhpcy5fbWFwLmFkZE1hcmsobWFya2Vyc1trZXlzW2ldXVtqXSwgdGhpcy5fY3JlYXRlTWFya2VyUG9wdXAuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJlc29sdmUoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG4gIF9idWlsZFBvbHlnb25zKGNpdHlCb3VuZHMpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuICAgICAgdGhpcy5fbWFwLmFkZFBvbHlnb24oY2l0eUJvdW5kcyk7XHJcbiAgICAgIC8qXHJcbiAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhjaXR5Qm91bmRzKTtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgdGhpcy5fbWFwLmFkZFBvbHlnb24oY2l0eUJvdW5kc1trZXlzW2ldXSk7XHJcbiAgICAgIH1cclxuICAgICAgKi9cclxuICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLyogR2VvbG9jIGNhbGxiYWNrcyAqL1xyXG5cclxuXHJcbiAgX3Bvc2l0aW9uSW5pdGlhbGl6ZWQoKSB7XHJcbiAgICB0aGlzLl91c2VyLmdlb2xvY2F0aW9uQWxsb3dlZCA9IHRydWU7XHJcbiAgfVxyXG5cclxuXHJcbiAgX3Bvc2l0aW9uVXBkYXRlKHBvc2l0aW9uKSB7XHJcbiAgICAvLyBPbmx5IGlmIHVzZXIgYWxsb3dlZCBnZW9sb2NhdGlvbjtcclxuICAgIC8vIFNob3VsZCBuZXZlciBiZSBmYWxzZSB3aGVuIGNhbGxlZCBiYWNrXHJcbiAgICBpZiAodGhpcy5fdXNlci5nZW9sb2NhdGlvbkFsbG93ZWQgPT09IHRydWUpIHtcclxuICAgICAgLy8gVXBkYXRlIHNhdmVkIHVzZXIgcG9zaXRpb25cclxuICAgICAgdGhpcy5fdXNlci5sYXQgPSBwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGU7XHJcbiAgICAgIHRoaXMuX3VzZXIubG5nID0gcG9zaXRpb24uY29vcmRzLmxvbmdpdHVkZTtcclxuICAgICAgdGhpcy5fdXNlci5hY2N1cmFjeSA9IHBvc2l0aW9uLmNvb3Jkcy5hY2N1cmFjeTtcclxuICAgICAgLy8gT25seSBkcmF3IG1hcmtlciBpZiBtYXAgaXMgYWxyZWFkeSBjcmVhdGVkXHJcbiAgICAgIGlmICh0aGlzLl9tYXApIHtcclxuICAgICAgICB0aGlzLl9tYXAuZHJhd1VzZXJNYXJrZXIoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIC8qIE1hcCBVdGlscyAqL1xyXG5cclxuXHJcbiAgX2NyZWF0ZU1hcmtlclBvcHVwKG9wdHMpIHtcclxuICAgIGNvbnN0IGRvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xyXG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdIMycpO1xyXG4gICAgY29uc3QgYWRkcmVzcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0knKTtcclxuICAgIGNvbnN0IHRvd24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdJJyk7XHJcbiAgICBjb25zdCBwaG9uZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0EnKTtcclxuICAgIGNvbnN0IHdlYnNpdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdBJyk7XHJcbiAgICBjb25zdCBpbmZvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnUCcpO1xyXG4gICAgY29uc3Qgb3BlbldpdGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdBJyk7XHJcblxyXG4gICAgZG9tLmNsYXNzTGlzdC5hZGQoJ21hcmtlci1wb3B1cCcpO1xyXG4gICAgdGl0bGUuaW5uZXJIVE1MID0gb3B0cy5uYW1lO1xyXG4gICAgYWRkcmVzcy5pbm5lckhUTUwgPSBvcHRzLmFkZHJlc3M7XHJcbiAgICB0b3duLmlubmVySFRNTCA9IG9wdHMudG93bjtcclxuICAgIHBob25lLmhyZWYgPSBgdGVsOiR7b3B0cy5waG9uZX1gO1xyXG4gICAgcGhvbmUuaW5uZXJIVE1MID0gYDxpbWcgc3JjPVwiLi9hc3NldHMvaW1nL2ljb24vcGhvbmUuc3ZnXCI+JHtvcHRzLnBob25lfWA7XHJcbiAgICB3ZWJzaXRlLmhyZWYgPSBvcHRzLndlYnNpdGU7XHJcbiAgICB3ZWJzaXRlLmlubmVySFRNTCA9ICc8aW1nIHNyYz1cIi4vYXNzZXRzL2ltZy9pY29uL3dlYi5zdmdcIj5Db25zdWx0ZXIgbGUgc2l0ZSc7XHJcbiAgICB3ZWJzaXRlLnNldEF0dHJpYnV0ZSgncmVsJywgJ25vb3BlbmVyIG5vcmVmZXJyZXInKTtcclxuICAgIHdlYnNpdGUuc2V0QXR0cmlidXRlKCd0YXJnZXQnLCAnX2JsYW5rJyk7XHJcbiAgICBpbmZvLmlubmVySFRNTCA9IG9wdHMuaW5mbztcclxuICAgIG9wZW5XaXRoLmhyZWYgPSBgZ2VvOiR7b3B0cy5sYXR9LCR7b3B0cy5sbmd9YDtcclxuICAgIG9wZW5XaXRoLmlubmVySFRNTCA9ICc8aW1nIHNyYz1cIi4vYXNzZXRzL2ltZy9pY29uL3Bpbi5zdmdcIj5PdXZyaXIgZGFucyBsZSBHUFMnO1xyXG5cclxuICAgIGRvbS5hcHBlbmRDaGlsZCh0aXRsZSk7XHJcbiAgICBkb20uYXBwZW5kQ2hpbGQoYWRkcmVzcyk7XHJcbiAgICBkb20uYXBwZW5kQ2hpbGQodG93bik7XHJcblxyXG4gICAgY29uc3QgYnV0dG9uID0gdGhpcy5fbWFya2VyT3BlbmVkU3RhdGUob3B0cy50aW1ldGFibGUpO1xyXG4gICAgZG9tLmFwcGVuZENoaWxkKGJ1dHRvbik7XHJcblxyXG4gICAgbGV0IGFsd2F5c0Nsb3NlZCA9IHRydWU7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9wdHMudGltZXRhYmxlLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgIGlmIChvcHRzLnRpbWV0YWJsZVtpXS5pc09wZW4gPT09IHRydWUpIHtcclxuICAgICAgICBhbHdheXNDbG9zZWQgPSBmYWxzZTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gQWxsb3cgbW9kYWwgb25seSBpZiBwb2kgaGFzIHRpbWV0YWJsZSBhbmQgaXMgbm90IGFsd2F5cyBjbG9zZWRcclxuICAgIGlmIChvcHRzLnRpbWV0YWJsZS5sZW5ndGggPiAwICYmIGFsd2F5c0Nsb3NlZCA9PT0gZmFsc2UpIHtcclxuICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fdGltZXRiYWxlTW9kYWwuYmluZCh0aGlzLCBvcHRzKSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGlmIChvcHRzLmluZm8gIT09ICcnKSB7XHJcbiAgICAgIGRvbS5hcHBlbmRDaGlsZChpbmZvKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAob3B0cy5waG9uZSAhPT0gJycpIHtcclxuICAgICAgZG9tLmFwcGVuZENoaWxkKHBob25lKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAob3B0cy53ZWJzaXRlICE9PSAnJykge1xyXG4gICAgICBkb20uYXBwZW5kQ2hpbGQod2Vic2l0ZSk7XHJcbiAgICB9ICAgIFxyXG4gICAgXHJcbiAgICBkb20uYXBwZW5kQ2hpbGQob3BlbldpdGgpO1xyXG5cclxuICAgIHJldHVybiBkb207XHJcbiAgfVxyXG5cclxuXHJcbiAgX21hcmtlck9wZW5lZFN0YXRlKHRpbWV0YWJsZSkge1xyXG4gICAgY29uc3QgZG9tID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XHJcbiAgICBjb25zdCBzdGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0g1Jyk7XHJcbiAgICBjb25zdCBtb3JlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnSScpO1xyXG4gICAgZG9tLmNsYXNzTGlzdC5hZGQoJ21hcmtlci1vcGVuZWQnKTtcclxuICAgIGRvbS5hcHBlbmRDaGlsZChzdGF0ZSk7XHJcbiAgICBkb20uYXBwZW5kQ2hpbGQobW9yZSk7XHJcbiAgICBcclxuICAgIGlmICh0aW1ldGFibGUubGVuZ3RoKSB7XHJcbiAgICAgIGxldCBhbHdheXNDbG9zZWQgPSB0cnVlO1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRpbWV0YWJsZS5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgIGlmICh0aW1ldGFibGVbaV0uaXNPcGVuID09PSB0cnVlKSB7XHJcbiAgICAgICAgICBhbHdheXNDbG9zZWQgPSBmYWxzZTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGFsd2F5c0Nsb3NlZCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIHRoaXMuX21hcmtlcklzQ2xvc2VkKGRvbSwgdHJ1ZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5fY2hlY2tUaW1lKHRpbWV0YWJsZSwgZG9tKTtcclxuICAgICAgICAvLyBVcGRhdGUgZWFjaCBtaW51dGVzXHJcbiAgICAgICAgLy8gVE9ETyBzdG9yZSBpbnRlcnZhbCBpZiB0byBiZSByZWFkeSB0byBjYW5jZWwgd2hlbiBvdGhlciBuYXZpZ2F0aW9uIG1vZGUgYXZhaWxhYmxlXHJcbiAgICAgICAgc2V0SW50ZXJ2YWwodGhpcy5fY2hlY2tUaW1lLmJpbmQodGhpcywgdGltZXRhYmxlLCBkb20pLCA2MDAwMCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuX21hcmtlcklzT3BlbmVkKGRvbSwgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGRvbTtcclxuICB9XHJcblxyXG5cclxuICBfY2hlY2tUaW1lKHRpbWV0YWJsZSwgZG9tKSB7XHJcbiAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xyXG4gICAgbGV0IGhvdXIgPSBub3cuZ2V0SG91cnMoKTtcclxuICAgIGxldCBtaW51dGVzID0gbm93LmdldE1pbnV0ZXMoKTtcclxuICAgIGlmIChtaW51dGVzIDwgMTApIHtcclxuICAgICAgbWludXRlcyA9IGAwJHttaW51dGVzfWA7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZGF5T2ZXZWVrID0gbm93LmdldERheSgpIC0gMTtcclxuICAgIGNvbnN0IG9wZW5pbmdUaW1lID0gcGFyc2VJbnQoYCR7dGltZXRhYmxlW2RheU9mV2Vla10ub3Blbi5ofSR7dGltZXRhYmxlW2RheU9mV2Vla10ub3Blbi5tfWApO1xyXG4gICAgY29uc3QgY2xvc2luZ1RpbWUgPSBwYXJzZUludChgJHt0aW1ldGFibGVbZGF5T2ZXZWVrXS5jbG9zZS5ofSR7dGltZXRhYmxlW2RheU9mV2Vla10uY2xvc2UubX1gKTtcclxuICAgIGNvbnN0IGN1cnJlbnRUaW1lID0gcGFyc2VJbnQoYCR7aG91cn0ke21pbnV0ZXN9YCk7XHJcbiAgICAvLyBXb24ndCB3b3JrIGlmIHRpbWV0YWJsZSBvcGVuL2Nsb3NlIGhvdXJzIGFyZW4ndCBvbiB0aGUgc2FtZSBkYXlcclxuICAgIGlmICh0aW1ldGFibGVbZGF5T2ZXZWVrXS5pc09wZW4gJiYgaXNOYU4ob3BlbmluZ1RpbWUpKSB7IC8vIDI0Lzcgb3BlbmluZ1xyXG4gICAgICB0aGlzLl9tYXJrZXJJc09wZW5lZChkb20sIHRydWUpO1xyXG4gICAgfSBlbHNlIGlmICh0aW1ldGFibGVbZGF5T2ZXZWVrXS5pc09wZW4gJiYgY3VycmVudFRpbWUgPj0gb3BlbmluZ1RpbWUgJiYgY3VycmVudFRpbWUgPCBjbG9zaW5nVGltZSkge1xyXG4gICAgICBpZiAodGltZXRhYmxlW2RheU9mV2Vla10uYnJlYWsuaGFzQnJlYWspIHtcclxuICAgICAgICBjb25zdCBicmVha09wZW5pbmdUaW1lID0gcGFyc2VJbnQoYCR7dGltZXRhYmxlW2RheU9mV2Vla10uYnJlYWsuZW5kLmh9JHt0aW1ldGFibGVbZGF5T2ZXZWVrXS5icmVhay5lbmQubX1gKTtcclxuICAgICAgICBjb25zdCBicmVha0Nsb3NpbmdUaW1lID0gcGFyc2VJbnQoYCR7dGltZXRhYmxlW2RheU9mV2Vla10uYnJlYWsuc3RhcnQuaH0ke3RpbWV0YWJsZVtkYXlPZldlZWtdLmJyZWFrLnN0YXJ0Lm19YCk7XHJcbiAgICAgICAgaWYgKGN1cnJlbnRUaW1lID49IGJyZWFrQ2xvc2luZ1RpbWUgJiYgY3VycmVudFRpbWUgPCBicmVha09wZW5pbmdUaW1lKSB7XHJcbiAgICAgICAgICB0aGlzLl9tYXJrZXJJc0Nsb3NlZChkb20pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLl9tYXJrZXJJc09wZW5lZChkb20pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLl9tYXJrZXJJc09wZW5lZChkb20pO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgeyAgICAgIFxyXG4gICAgICB0aGlzLl9tYXJrZXJJc0Nsb3NlZChkb20pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIF9tYXJrZXJJc09wZW5lZChkb20sIGFsd2F5c09wZW5lZCkge1xyXG4gICAgZG9tLmZpcnN0Q2hpbGQuaW5uZXJIVE1MID0gYE91dmVydGA7XHJcbiAgICBpZiAoYWx3YXlzT3BlbmVkID09PSB0cnVlKSB7XHJcbiAgICAgIGRvbS5sYXN0Q2hpbGQuaW5uZXJIVE1MID0gYFRvdWpvdXJzIG91dmVydGA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkb20ubGFzdENoaWxkLmlubmVySFRNTCA9IGBWb2lyIGxlcyBob3JhaXJlc2A7XHJcbiAgICB9XHJcbiAgICBkb20uY2xhc3NMaXN0LmFkZCgnb3BlbmVkJyk7XHJcbiAgfVxyXG5cclxuXHJcbiAgX21hcmtlcklzQ2xvc2VkKGRvbSwgYWx3YXlzQ2xvc2VkKSB7XHJcbiAgICBkb20uZmlyc3RDaGlsZC5pbm5lckhUTUwgPSBgRmVybcOpYDtcclxuICAgIGlmIChhbHdheXNDbG9zZWQpIHtcclxuICAgICAgZG9tLmxhc3RDaGlsZC5pbm5lckhUTUwgPSAnVG91am91cnMgZmVybcOpJztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGRvbS5sYXN0Q2hpbGQuaW5uZXJIVE1MID0gYFZvaXIgbGVzIGhvcmFpcmVzYDtcclxuICAgIH1cclxuICAgIGRvbS5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuZWQnKTtcclxuICB9XHJcblxyXG5cclxuICBfdGltZXRiYWxlTW9kYWwob3B0cykge1xyXG4gICAgdGhpcy5mZXRjaE1vZGFsKCd0aW1ldGFibGVtb2RhbCcpLnRoZW4oZG9tID0+IHtcclxuICAgICAgLy8gVXBkYXRpbmcgbW9kYWwgaGVhZGVyIGFuZCBpbmZvXHJcbiAgICAgIGRvbS5xdWVyeVNlbGVjdG9yKCcjbWFyay1uYW1lJykuaW5uZXJIVE1MID0gb3B0cy5uYW1lO1xyXG4gICAgICBkb20ucXVlcnlTZWxlY3RvcignI21hcmstYWRkcmVzcycpLmlubmVySFRNTCA9IGAke29wdHMuYWRkcmVzc30sICR7b3B0cy50b3dufWA7XHJcbiAgICAgIGNvbnN0IGRpc3RhbmNlID0gVXRpbHMuZ2V0RGlzdGFuY2VCZXR3ZWVuQ29vcmRzKFtvcHRzLmxhdCwgb3B0cy5sbmddLCBbdGhpcy5fdXNlci5sYXQsIHRoaXMuX3VzZXIubG5nXSk7XHJcbiAgICAgIGRvbS5xdWVyeVNlbGVjdG9yKCcjbWFyay1kaXN0YW5jZScpLmlubmVySFRNTCA9IGBWb3VzIMOodGVzIMOgIGVudmlyb24gJHtVdGlscy5jb252ZXJ0RGlzdGFuY2VUb1N0cmluZyhkaXN0YW5jZSl9IGRlIDxiPiR7b3B0cy5uYW1lfTwvYj4gw6Agdm9sIGQnb2lzZWF1YDtcclxuICAgICAgY29uc3QgZXRhID0gVXRpbHMuYnVpbGREaXN0YW5jZUVUQShkaXN0YW5jZSk7XHJcbiAgICAgIGRvbS5xdWVyeVNlbGVjdG9yKCcjbWFyay1ldGEnKS5pbm5lckhUTUwgPSBgQ2UgcXVpIHJlcHLDqXNlbnRlIGVudmlyb24gJHtldGEuY2FyfSBlbiB2b2l0dXJlLCBvdSAke2V0YS53YWxrfSDDoCBwaWVkLmA7XHJcbiAgICAgIGRvbS5xdWVyeVNlbGVjdG9yKCcjbWFyay1zdGF0ZScpLmFwcGVuZENoaWxkKHRoaXMuX21hcmtlck9wZW5lZFN0YXRlKG9wdHMudGltZXRhYmxlKSk7XHJcbiAgICAgIC8vIE5vdyB1cGRhdGUgZGF5IGJ5IGRheVxyXG4gICAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICBjb25zdCBkYXlPZldlZWsgPSBub3cuZ2V0RGF5KCkgLSAxO1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9wdHMudGltZXRhYmxlLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgY29uc3QgZGF5RG9tID0gZG9tLnF1ZXJ5U2VsZWN0b3IoJyN0aW1ldGFibGUnKS5jaGlsZHJlbltpXTtcclxuICAgICAgICBpZiAob3B0cy50aW1ldGFibGVbaV0uaXNPcGVuID09PSB0cnVlKSB7XHJcbiAgICAgICAgICBjb25zdCBtb3JuaW5nID0gZGF5RG9tLmxhc3RFbGVtZW50Q2hpbGQuZmlyc3RFbGVtZW50Q2hpbGQ7XHJcbiAgICAgICAgICBjb25zdCBhZnRlcm5vb24gPSBkYXlEb20ubGFzdEVsZW1lbnRDaGlsZC5sYXN0RWxlbWVudENoaWxkO1xyXG4gICAgICAgICAgaWYgKG9wdHMudGltZXRhYmxlW2ldLmJyZWFrICYmIG9wdHMudGltZXRhYmxlW2ldLmJyZWFrLmhhc0JyZWFrID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIG1vcm5pbmcuaW5uZXJIVE1MID0gYDxwPiR7b3B0cy50aW1ldGFibGVbaV0ub3Blbi5ofToke29wdHMudGltZXRhYmxlW2ldLm9wZW4ubX0g4oCSICR7b3B0cy50aW1ldGFibGVbaV0uYnJlYWsuc3RhcnQuaH06JHtvcHRzLnRpbWV0YWJsZVtpXS5icmVhay5zdGFydC5tfTwvcD5gO1xyXG4gICAgICAgICAgICBtb3JuaW5nLmNsYXNzTGlzdC5hZGQoJ2ZpbGxlZCcpOyAvLyBNb3JuaW5nXHJcbiAgICAgICAgICAgIG1vcm5pbmcuY2xhc3NMaXN0LmFkZCgnc3BsaXRlZCcpOyAvLyBNb3JuaW5nXHJcbiAgICAgICAgICAgIGFmdGVybm9vbi5pbm5lckhUTUwgPSBgPHA+JHtvcHRzLnRpbWV0YWJsZVtpXS5icmVhay5lbmQuaH06JHtvcHRzLnRpbWV0YWJsZVtpXS5icmVhay5lbmQubX0g4oCSICR7b3B0cy50aW1ldGFibGVbaV0uY2xvc2UuaH06JHtvcHRzLnRpbWV0YWJsZVtpXS5jbG9zZS5tfTwvcD5gO1xyXG4gICAgICAgICAgICBhZnRlcm5vb24uY2xhc3NMaXN0LmFkZCgnZmlsbGVkJyk7IC8vIEFmdGVybm9vblxyXG4gICAgICAgICAgICBhZnRlcm5vb24uY2xhc3NMaXN0LmFkZCgnc3BsaXRlZCcpOyAvLyBBZnRlcm5vb25cclxuICAgICAgICAgIH0gZWxzZSBpZiAob3B0cy50aW1ldGFibGVbaV0ub3Blbi5oICYmIG9wdHMudGltZXRhYmxlW2ldLmNsb3NlLmgpIHtcclxuICAgICAgICAgICAgbW9ybmluZy5pbm5lckhUTUwgPSBgPHA+JHtvcHRzLnRpbWV0YWJsZVtpXS5vcGVuLmh9OiR7b3B0cy50aW1ldGFibGVbaV0ub3Blbi5tfTwvcD5gO1xyXG4gICAgICAgICAgICBtb3JuaW5nLmNsYXNzTGlzdC5hZGQoJ2ZpbGxlZCcpOyAvLyBNb3JuaW5nXHJcbiAgICAgICAgICAgIGFmdGVybm9vbi5pbm5lckhUTUwgPSBgPHA+JHtvcHRzLnRpbWV0YWJsZVtpXS5jbG9zZS5ofToke29wdHMudGltZXRhYmxlW2ldLmNsb3NlLm19PC9wPmA7XHJcbiAgICAgICAgICAgIGFmdGVybm9vbi5jbGFzc0xpc3QuYWRkKCdmaWxsZWQnKTsgLy8gQWZ0ZXJub29uXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBtb3JuaW5nLmlubmVySFRNTCA9IGA8cD4wMDowMDwvcD5gO1xyXG4gICAgICAgICAgICBtb3JuaW5nLmNsYXNzTGlzdC5hZGQoJ2ZpbGxlZCcpOyAvLyBNb3JuaW5nXHJcbiAgICAgICAgICAgIGFmdGVybm9vbi5pbm5lckhUTUwgPSBgPHA+MjQ6MDA8L3A+YDtcclxuICAgICAgICAgICAgYWZ0ZXJub29uLmNsYXNzTGlzdC5hZGQoJ2ZpbGxlZCcpOyAvLyBBZnRlcm5vb25cclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZGF5RG9tLmxhc3RFbGVtZW50Q2hpbGQuaW5uZXJIVE1MID0gYDxkaXYgY2xhc3M9XCJjbG9zZWRcIj48cD5GZXJtw6k8L3A+PC9kaXY+YDsgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIE1hdGNoaW5nIHRvZGF5J3MgZGF5XHJcbiAgICAgICAgaWYgKGkgPT09IGRheU9mV2Vlaykge1xyXG4gICAgICAgICAgZGF5RG9tLmNsYXNzTGlzdC5hZGQoJ3RvZGF5Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIFxyXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWwtb3ZlcmxheScpLmFwcGVuZENoaWxkKGRvbSk7XHJcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RhbC1vdmVybGF5Jykuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcclxuXHRcdFx0c2V0VGltZW91dCgoKSA9PiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWwtb3ZlcmxheScpLnN0eWxlLm9wYWNpdHkgPSAxLCA1MCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4vKiBTZWFyY2ggbW9kYWwgbWV0aG9kcyAqL1xyXG5cclxuLypcclxuICBfc2VhcmNoTW9kYWwoKSB7XHJcbiAgICB0aGlzLl9mZXRjaE1vZGFsKCdzZWFyY2htb2RhbCcpLnRoZW4oZG9tID0+IHtcclxuICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMuX21hcmtzKTtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgZG9tLmZpcnN0RWxlbWVudENoaWxkLmFwcGVuZENoaWxkKHRoaXMuX2NyZWF0ZU1hcmtDYXRlZ29yeVNlYXJjaEljb24oa2V5c1tpXSkpO1xyXG4gICAgICB9XHJcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RhbC1vdmVybGF5JykuYXBwZW5kQ2hpbGQoZG9tKTtcclxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsLW92ZXJsYXknKS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG5cdFx0XHRzZXRUaW1lb3V0KCgpID0+IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RhbC1vdmVybGF5Jykuc3R5bGUub3BhY2l0eSA9IDEsIDUwKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG4gIF9jcmVhdGVNYXJrQ2F0ZWdvcnlTZWFyY2hJY29uKHR5cGUpIHtcclxuICAgIGNvbnN0IGRvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xyXG4gICAgY29uc3QgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnSU1HJyk7XHJcbiAgICBjb25zdCBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ1AnKTtcclxuICAgIGRvbS5jbGFzc0xpc3QuYWRkKCdmaWx0ZXJpbmctZWxlbWVudCcpO1xyXG4gICAgaW1nLnNyYyA9IGAvYXNzZXRzL2ltZy9tYXJrZXIvJHt0eXBlfS5zdmdgO1xyXG4gICAgbGFiZWwuaW5uZXJIVE1MID0gdHlwZTtcclxuICAgIGRvbS5hcHBlbmRDaGlsZChpbWcpO1xyXG4gICAgZG9tLmFwcGVuZENoaWxkKGxhYmVsKTtcclxuICAgIHJldHVybiBkb207XHJcbiAgfVxyXG4qL1xyXG5cclxuICAvKiBNb2RhbCBtZXRob2RzICovXHJcblxyXG4gIGZldGNoTW9kYWwodXJsKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICAgIGZldGNoKGAuL2Fzc2V0cy9odG1sLyR7dXJsfS5odG1sYCkudGhlbihkYXRhID0+IHtcclxuICAgICAgICBkYXRhLnRleHQoKS50aGVuKGh0bWwgPT4ge1xyXG4gICAgICAgICAgcmVzb2x2ZShkb2N1bWVudC5jcmVhdGVSYW5nZSgpLmNyZWF0ZUNvbnRleHR1YWxGcmFnbWVudChodG1sKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgY2xvc2VNb2RhbChldmVudCwgZm9yY2UpIHtcclxuXHRcdGlmIChmb3JjZSA9PT0gdHJ1ZSB8fCBldmVudC50YXJnZXQuaWQgPT09ICdtb2RhbC1vdmVybGF5JyB8fCBldmVudC50YXJnZXQuaWQuaW5kZXhPZignY2xvc2UnKSAhPT0gLTEpIHtcclxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsLW92ZXJsYXknKS5zdHlsZS5vcGFjaXR5ID0gMDtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsLW92ZXJsYXknKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RhbC1vdmVybGF5JykuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgIH0sIDMwMCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcbiAgZ2V0IHVzZXIoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fdXNlcjtcclxuICB9XHJcblxyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRG91cmRhbm5haXNFeHBsb3JlO1xyXG4iXSwibmFtZXMiOlsiTWFya2VycyIsIlV0aWxzIiwiTWFwIiwib3B0aW9ucyIsIl9jbGFzc0NhbGxDaGVjayIsIl9pZCIsInRhcmdldElkIiwiX21hcCIsIl9tYXJrcyIsIl9wb2x5Z29ucyIsIl9sYXllcnMiLCJDYXJ0ZSIsIlNhdGVsbGl0ZSIsIl9pbml0IiwiX2V2ZW50cyIsIl9jcmVhdGVDbGFzcyIsImtleSIsInZhbHVlIiwid2luZG93IiwiTCIsIm1hcCIsInpvb21Db250cm9sIiwic2V0VmlldyIsIkNDREhfQ0VOVEVSIiwiTEFUIiwiTE5HIiwiY29udHJvbCIsInNjYWxlIiwiYWRkVG8iLCJzZXRNYXhCb3VuZHMiLCJNQVBfQk9VTkRTIiwiT1NNX0xBWUVSIiwiRVNSSV9MQVlFUiIsImxheWVycyIsInBvc2l0aW9uIiwiX3RoaXMiLCJvbiIsIl9tYXBDbGlja2VkIiwiYmluZCIsInBhbkluc2lkZUJvdW5kcyIsImFuaW1hdGUiLCJvcHRzIiwiY29uc29sZSIsImxvZyIsImxhdGxuZyIsIkpTT04iLCJzdHJpbmdpZnkiLCJsYXQiLCJsbmciLCJkcmF3VXNlck1hcmtlciIsImR4IiwidXNlciIsIm1hcmtlciIsImljb24iLCJzZXRMYXRMbmciLCJhZGRNYXJrIiwiY3JlYXRlUG9wdXAiLCJfdGhpczIiLCJ0eXBlcyIsInR5cGUiLCJzcGxpdCIsImxlbmd0aCIsImNvbmNhdCIsImZseVRvIiwiYmluZFBvcHVwIiwiaSIsInB1c2giLCJhZGRQb2x5Z29uIiwicG9seWdvbiIsIk9iamVjdCIsImZyZWV6ZSIsInJlc3RhdXJhbnQiLCJJY29uIiwiaWNvblVybCIsImljb25TaXplIiwiaWNvbkFuY2hvciIsInBvcHVwQW5jaG9yIiwic2hhZG93VXJsIiwic2hhZG93U2l6ZSIsInNoYWRvd0FuY2hvciIsImJhciIsImNlbGxhciIsInRvYmFjY28iLCJncm9jZXJ5IiwiZGl5IiwiZm9vdCIsInJ1Z2J5IiwicGluZ3BvbmciLCJza2F0ZSIsImJvY2NlIiwidGVubmlzIiwiYmFrZXJ5IiwiZmlzaCIsImJ1dGNoZXIiLCJib29rIiwibXVzaWMiLCJsYW5kbWFyayIsImNhc3RsZSIsImNodXJjaCIsInRvdXJpc20iLCJtdXNldW0iLCJnYXJkZW4iLCJjYXIiLCJnYXMiLCJ0cmFpbiIsImFuaW1hbCIsImRlbnRhbCIsInBoYXJtYWN5IiwibWVkaWMiLCJkZWZpYnJpbGxhdG9yIiwiY2VtZXRlcnkiLCJmaXJlZmlnaHRlciIsInBvbGljZSIsIm1haWwiLCJiYW5rIiwicGFyayIsInJlY3ljbGUiLCJhZG1pbmlzdHJhdGlvbiIsInNjaG9vbCIsImdldERpc3RhbmNlQmV0d2VlbkNvb3JkcyIsImZyb20iLCJ0byIsImxvbjEiLCJNYXRoIiwiUEkiLCJsYXQxIiwibG9uMiIsImxhdDIiLCJkZWx0YUxhdCIsImRlbHRhTG9uIiwiYSIsInBvdyIsInNpbiIsImNvcyIsImMiLCJhc2luIiwic3FydCIsImNvbnZlcnREaXN0YW5jZVRvU3RyaW5nIiwiZGlzdGFuY2UiLCJwcmVjaXNpb25Sb3VuZCIsImJ1aWxkRGlzdGFuY2VFVEEiLCJjYXJNaW51dGVzIiwiY2FyU2Vjb25kcyIsImZsb29yIiwid2Fsa01pbnV0ZXMiLCJ3YWxrU2Vjb25kcyIsIndhbGsiLCJwcmVjaXNpb24iLCJtdWx0aXBsaWVyIiwicm91bmQiLCJDQ0RIX0NJVElFUyIsImxhdExuZ0JvdW5kcyIsImxhdExuZyIsInRpbGVMYXllciIsImF0dHJpYnV0aW9uIiwibWF4Wm9vbSIsIm1pblpvb20iLCJEb3VyZGFubmFpc0V4cGxvcmUiLCJfZGF0YSIsIl91c2VyIiwiZ2VvbG9jYXRpb25BbGxvd2VkIiwiSE9NRV9MQVQiLCJIT01FX0xORyIsImFjY3VyYWN5IiwiX2luaXRHZW9sb2NhdGlvbiIsInRoZW4iLCJfaW5pdE1hcCIsIl9pbml0RXZlbnRzIiwiX2ZldGNoTWFya2VycyIsIlByb21pc2UiLCJyZXNvbHZlIiwibmF2aWdhdG9yIiwiZW5hYmxlSGlnaEFjY3VyYWN5IiwibWF4aW11bUFnZSIsInRpbWVvdXQiLCJnZW9sb2NhdGlvbiIsImdldEN1cnJlbnRQb3NpdGlvbiIsIl9wb3NpdGlvbkluaXRpYWxpemVkIiwiX3dhdGNoSWQiLCJ3YXRjaFBvc2l0aW9uIiwiX3Bvc2l0aW9uVXBkYXRlIiwiX3RoaXMzIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJjbG9zZU1vZGFsIiwiX3RoaXM0IiwicHJvbWlzZXMiLCJfbG9vcCIsInJlc29sdmVMb2NhbCIsImZldGNoIiwiZGF0YSIsImpzb24iLCJqc29uRGF0YSIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsIl9idWlsZFBvbHlnb25zIiwiYm91bmRzIiwiX2J1aWxkTWFya2VycyIsInBvaXMiLCJhbGwiLCJtYXJrZXJzIiwiX3RoaXM1Iiwia2V5cyIsImoiLCJfY3JlYXRlTWFya2VyUG9wdXAiLCJjaXR5Qm91bmRzIiwiX3RoaXM2IiwiY29vcmRzIiwibGF0aXR1ZGUiLCJsb25naXR1ZGUiLCJkb20iLCJjcmVhdGVFbGVtZW50IiwidGl0bGUiLCJhZGRyZXNzIiwidG93biIsInBob25lIiwid2Vic2l0ZSIsImluZm8iLCJvcGVuV2l0aCIsImNsYXNzTGlzdCIsImFkZCIsImlubmVySFRNTCIsIm5hbWUiLCJocmVmIiwic2V0QXR0cmlidXRlIiwiYXBwZW5kQ2hpbGQiLCJidXR0b24iLCJfbWFya2VyT3BlbmVkU3RhdGUiLCJ0aW1ldGFibGUiLCJhbHdheXNDbG9zZWQiLCJpc09wZW4iLCJfdGltZXRiYWxlTW9kYWwiLCJzdGF0ZSIsIm1vcmUiLCJfbWFya2VySXNDbG9zZWQiLCJfY2hlY2tUaW1lIiwic2V0SW50ZXJ2YWwiLCJfbWFya2VySXNPcGVuZWQiLCJub3ciLCJEYXRlIiwiaG91ciIsImdldEhvdXJzIiwibWludXRlcyIsImdldE1pbnV0ZXMiLCJkYXlPZldlZWsiLCJnZXREYXkiLCJvcGVuaW5nVGltZSIsInBhcnNlSW50Iiwib3BlbiIsImgiLCJtIiwiY2xvc2luZ1RpbWUiLCJjbG9zZSIsImN1cnJlbnRUaW1lIiwiaXNOYU4iLCJoYXNCcmVhayIsImJyZWFrT3BlbmluZ1RpbWUiLCJlbmQiLCJicmVha0Nsb3NpbmdUaW1lIiwic3RhcnQiLCJhbHdheXNPcGVuZWQiLCJmaXJzdENoaWxkIiwibGFzdENoaWxkIiwicmVtb3ZlIiwiX3RoaXM3IiwiZmV0Y2hNb2RhbCIsInF1ZXJ5U2VsZWN0b3IiLCJldGEiLCJkYXlEb20iLCJjaGlsZHJlbiIsIm1vcm5pbmciLCJsYXN0RWxlbWVudENoaWxkIiwiZmlyc3RFbGVtZW50Q2hpbGQiLCJhZnRlcm5vb24iLCJzdHlsZSIsImRpc3BsYXkiLCJzZXRUaW1lb3V0Iiwib3BhY2l0eSIsInVybCIsInRleHQiLCJodG1sIiwiY3JlYXRlUmFuZ2UiLCJjcmVhdGVDb250ZXh0dWFsRnJhZ21lbnQiLCJldmVudCIsImZvcmNlIiwidGFyZ2V0IiwiaWQiLCJpbmRleE9mIiwiZ2V0Il0sInNvdXJjZVJvb3QiOiIifQ==
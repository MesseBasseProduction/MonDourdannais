/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/map/Map.js":
/*!***************************!*\
  !*** ./src/js/map/Map.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _map_MapFactory_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../map/MapFactory.js */ "./src/js/map/MapFactory.js");
/* harmony import */ var _utils_MarkerEnum_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/MarkerEnum.js */ "./src/js/utils/MarkerEnum.js");
/* harmony import */ var _utils_Utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/Utils.js */ "./src/js/utils/Utils.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }



window.tmp = [];
var Map = /*#__PURE__*/function () {
  function Map(options) {
    _classCallCheck(this, Map);
    this._id = options.targetId;
    this._map = null;
    this._layers = {
      Carte: null,
      Satellite: null
    };
    this._marks = {};
    this._polygons = {};
    this._lines = [];
    this._init();
    this._events();
  }
  _createClass(Map, [{
    key: "_init",
    value: function _init() {
      // Use main div to inject OSM into
      this._map = window.L.map(this._id, {
        zoomControl: false
      }).setView([_utils_Utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].CCDH_CENTER.LAT, _utils_Utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].CCDH_CENTER.LNG], 12);
      // Add meter and feet scale on map
      window.L.control.scale().addTo(this._map);
      // Prevent panning outside of the map bounds definined in utils
      this._map.setMaxBounds(_utils_Utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].MAP_BOUNDS);
      // Add layer group to interface and start map with osm default
      this._layers.Carte = _utils_Utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].OSM_LAYER;
      this._layers.Satellite = _utils_Utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].ESRI_LAYER;
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
        _this._map.panInsideBounds(_utils_Utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].MAP_BOUNDS, {
          animate: true
        });
      });
    }
  }, {
    key: "_mapClicked",
    value: function _mapClicked(opts) {
      console.log(opts.latlng, JSON.stringify(opts.latlng.lat + ', ' + opts.latlng.lng));
      window.tmp.push([opts.latlng.lat, opts.latlng.lng]);
      console.log(JSON.stringify(window.tmp));
    }
  }, {
    key: "drawUserMarker",
    value: function drawUserMarker() {
      if (!window.dx.user.marker) {
        window.dx.user.marker = window.L.marker([window.dx.user.lat, window.dx.user.lng], {
          icon: _utils_MarkerEnum_js__WEBPACK_IMPORTED_MODULE_1__["default"].user
        });
        window.dx.user.marker.addTo(this._map);
      } else {
        window.dx.user.marker.setLatLng(window.dx.user);
      }
    }
  }, {
    key: "addPolygon",
    value: function addPolygon(input, id) {
      var _this2 = this;
      return new Promise(function (resolve) {
        var polygon = window.L.polygon(input);
        polygon.addTo(_this2._map);
        _this2._polygons[id] = polygon;
        resolve();
      });
    }
  }, {
    key: "addMarker",
    value: function addMarker(opts) {
      var _this3 = this;
      return new Promise(function (resolve) {
        var type = opts.mark.type;
        var marker = window.L.marker([opts.mark.lat, opts.mark.lng], {
          icon: _utils_MarkerEnum_js__WEBPACK_IMPORTED_MODULE_1__["default"][type]
        }).on('click', function () {
          _this3._map.flyTo([opts.mark.lat, opts.mark.lng], 18);
        });
        marker.bindPopup(_map_MapFactory_js__WEBPACK_IMPORTED_MODULE_0__["default"].createMarkerPopup(opts));
        marker.addTo(_this3._map);
        if (opts.mark.subtypes.length > 0) {
          for (var i = 0; i < opts.mark.subtypes.length; ++i) {
            if (!_this3._marks[opts.mark.subtypes[i]]) {
              _this3._marks[opts.mark.subtypes[i]] = [];
            }
            _this3._marks[opts.mark.subtypes[i]].push(marker);
          }
        } else {
          if (!_this3._marks[type]) {
            _this3._marks[type] = [];
          }
          _this3._marks[type].push(marker);
        }
        resolve();
      });
    }
  }, {
    key: "addTransportationStop",
    value: function addTransportationStop(opts) {
      var _this4 = this;
      return new Promise(function (resolve) {
        var type = opts.stop.type;
        var marker = window.L.marker([opts.stop.lat, opts.stop.lng], {
          icon: _utils_MarkerEnum_js__WEBPACK_IMPORTED_MODULE_1__["default"][type]
        }).on('click', function () {
          _this4._map.flyTo([opts.stop.lat, opts.stop.lng], 18);
        });
        var line = window.L.polyline(opts.data.path, {
          color: opts.data.color,
          weight: 5,
          smoothFactor: 1
        });
        marker.bindPopup(_map_MapFactory_js__WEBPACK_IMPORTED_MODULE_0__["default"].createStopMarkerPopup(opts)).on('popupopen', function () {
          line.addTo(_this4._map);
        }).on('popupclose', function () {
          line.removeFrom(_this4._map);
        });
        marker.addTo(_this4._map);
        if (!_this4._marks[type]) {
          _this4._marks[type] = [];
        }
        _this4._marks[type].push(marker);
        resolve();
      });
    }
  }, {
    key: "addLine",
    value: function addLine(points, options) {
      this._lines.push(window.L.polyline(points, options).addTo(this._map));
    }
  }]);
  return Map;
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Map);

/***/ }),

/***/ "./src/js/map/MapFactory.js":
/*!**********************************!*\
  !*** ./src/js/map/MapFactory.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_Utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Utils.js */ "./src/js/utils/Utils.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

var MapFactory = /*#__PURE__*/function () {
  function MapFactory() {
    _classCallCheck(this, MapFactory);
  }
  _createClass(MapFactory, null, [{
    key: "createMarkerPopup",
    value: function createMarkerPopup(opts) {
      var dom = document.createElement('DIV');
      var title = document.createElement('H3');
      var address = document.createElement('I');
      var town = document.createElement('I');
      var phone = document.createElement('A');
      var website = document.createElement('A');
      var info = document.createElement('P');
      var openWith = document.createElement('A');
      dom.classList.add('marker-popup');
      title.innerHTML = opts.mark.name;
      address.innerHTML = opts.mark.address;
      town.innerHTML = opts.mark.town;
      phone.href = "tel:".concat(opts.mark.phone);
      phone.innerHTML = "<img src=\"./assets/img/icon/phone.svg\">".concat(opts.mark.phone);
      website.href = opts.mark.website;
      website.innerHTML = '<img src="./assets/img/icon/web.svg">Consulter le site';
      website.setAttribute('rel', 'noopener noreferrer');
      website.setAttribute('target', '_blank');
      info.innerHTML = opts.mark.info;
      openWith.href = "geo:".concat(opts.mark.lat, ",").concat(opts.mark.lng);
      openWith.innerHTML = '<img src="./assets/img/icon/pin.svg">Ouvrir dans le GPS';
      dom.appendChild(title);
      dom.appendChild(address);
      dom.appendChild(town);
      var button = this.markerOpenedState(opts.mark.timetable);
      dom.appendChild(button);
      var alwaysClosed = true;
      for (var i = 0; i < opts.mark.timetable.length; ++i) {
        if (opts.mark.timetable[i].isOpen === true) {
          alwaysClosed = false;
          break;
        }
      }
      // Allow modal only if poi has timetable and is not always closed
      if (opts.mark.timetable.length > 0 && alwaysClosed === false) {
        button.addEventListener('click', this.timetableModal.bind(this, opts.mark, opts.user));
      }
      if (opts.mark.info !== '') {
        dom.appendChild(info);
      }
      if (opts.mark.phone !== '') {
        dom.appendChild(phone);
      }
      if (opts.mark.website !== '') {
        dom.appendChild(website);
      }
      dom.appendChild(openWith);
      return dom;
    }
  }, {
    key: "createStopMarkerPopup",
    value: function createStopMarkerPopup(opts) {
      var dom = document.createElement('DIV');
      var logo = document.createElement('IMG');
      var title = document.createElement('H3');
      var dir = document.createElement('H4');
      var address = document.createElement('I');
      var town = document.createElement('I');
      var website = document.createElement('A');
      var info = document.createElement('A');
      var dl = document.createElement('A');
      var openWith = document.createElement('A');
      dom.classList.add('marker-popup');
      logo.src = "./assets/img/transportation/".concat(opts.data.name, ".png");
      title.innerHTML = opts.stop.name;
      if (opts.stop.terminus === true) {
        dir.innerHTML = "Terminus de la ligne";
      } else {
        dir.innerHTML = "Direction ".concat(opts.stop.dir);
      }
      address.innerHTML = opts.stop.address;
      town.innerHTML = opts.stop.town;
      website.href = opts.stop.website;
      website.innerHTML = '<img src="./assets/img/icon/web.svg">Consulter le site';
      website.setAttribute('rel', 'noopener noreferrer');
      website.setAttribute('target', '_blank');
      info.href = opts.stop.info;
      info.innerHTML = '<img src="./assets/img/icon/info.svg">Informations';
      info.setAttribute('rel', 'noopener noreferrer');
      info.setAttribute('target', '_blank');
      dl.href = "./assets/pdf/".concat(opts.data.name, ".pdf");
      dl.innerHTML = '<img src="./assets/img/icon/download.svg">Télécharger les horaires';
      dl.setAttribute('rel', 'noopener noreferrer');
      dl.setAttribute('target', '_blank');
      openWith.href = "geo:".concat(opts.stop.lat, ",").concat(opts.stop.lng);
      openWith.innerHTML = '<img src="./assets/img/icon/pin.svg">Ouvrir dans le GPS';
      dom.appendChild(logo);
      dom.appendChild(title);
      dom.appendChild(dir);
      dom.appendChild(address);
      dom.appendChild(town);
      if (opts.stop.info !== '') {
        dom.appendChild(info);
      }
      if (opts.stop.website !== '') {
        dom.appendChild(website);
      }
      dom.appendChild(dl);
      dom.appendChild(openWith);
      return dom;
    }

    /* Marker timetable and open/closed state */
  }, {
    key: "markerOpenedState",
    value: function markerOpenedState(timetable) {
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
          this.markerIsClosed(dom, true);
        } else {
          this.checkTime(timetable, dom);
          // Update each minutes
          // TODO store interval if to be ready to cancel when other navigation mode available
          setInterval(this.checkTime.bind(this, timetable, dom), 60000);
        }
      } else {
        this.markerIsOpened(dom, true);
      }
      return dom;
    }
  }, {
    key: "checkTime",
    value: function checkTime(timetable, dom) {
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
        this.markerIsOpened(dom, true);
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
                this.markerIsClosed(dom);
                isClosed = true;
                break;
              }
              if (!isClosed) {
                this.markerIsOpened(dom);
              }
            }
          } else {
            var _breakOpeningTime = parseInt("".concat(timetable[dayOfWeek]["break"].end.h).concat(timetable[dayOfWeek]["break"].end.m));
            var _breakClosingTime = parseInt("".concat(timetable[dayOfWeek]["break"].start.h).concat(timetable[dayOfWeek]["break"].start.m));
            if (currentTime >= _breakClosingTime && currentTime < _breakOpeningTime) {
              this.markerIsClosed(dom);
            } else {
              this.markerIsOpened(dom);
            }
          }
        } else {
          this.markerIsOpened(dom);
        }
      } else {
        this.markerIsClosed(dom);
      }
    }
  }, {
    key: "markerIsOpened",
    value: function markerIsOpened(dom, alwaysOpened) {
      dom.firstChild.innerHTML = "Ouvert";
      if (alwaysOpened === true) {
        dom.lastChild.innerHTML = "Toujours ouvert";
      } else {
        dom.lastChild.innerHTML = "Voir les horaires";
      }
      dom.classList.add('opened');
    }
  }, {
    key: "markerIsClosed",
    value: function markerIsClosed(dom, alwaysClosed) {
      dom.firstChild.innerHTML = "Ferm\xE9";
      if (alwaysClosed) {
        dom.lastChild.innerHTML = 'Toujours fermé';
      } else {
        dom.lastChild.innerHTML = "Voir les horaires";
      }
      dom.classList.remove('opened');
    }
  }, {
    key: "timetableModal",
    value: function timetableModal(opts, user) {
      var _this = this;
      _utils_Utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].fetchModal('timetablemodal').then(function (dom) {
        // Updating modal header and info
        dom.querySelector('#mark-name').innerHTML = opts.name;
        dom.querySelector('#mark-address').innerHTML = "".concat(opts.address, ", ").concat(opts.town);
        var distance = _utils_Utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].getDistanceBetweenCoords([opts.lat, opts.lng], [user.lat, user.lng]);
        dom.querySelector('#mark-distance').innerHTML = "Vous \xE8tes \xE0 environ ".concat(_utils_Utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].convertDistanceToString(distance), " de <b>").concat(opts.name, "</b> \xE0 vol d'oiseau");
        var eta = _utils_Utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].buildDistanceETA(distance);
        dom.querySelector('#mark-eta').innerHTML = "Ce qui repr\xE9sente environ ".concat(eta.car, " en voiture, ou ").concat(eta.walk, " \xE0 pied.");
        dom.querySelector('#mark-state').appendChild(_this.markerOpenedState(opts.timetable));
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
  }]);
  return MapFactory;
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MapFactory);

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
  bus: new window.L.Icon({
    iconUrl: 'assets/img/marker/bus.svg',
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
var fetchModal = function fetchModal(url) {
  return new Promise(function (resolve) {
    fetch("./assets/html/".concat(url, ".html")).then(function (data) {
      data.text().then(function (html) {
        resolve(document.createRange().createContextualFragment(html));
      });
    });
  });
};
var closeModal = function closeModal(event, force) {
  if (force === true || event.target.id === 'modal-overlay' || event.target.id.indexOf('close') !== -1) {
    document.getElementById('modal-overlay').style.opacity = 0;
    setTimeout(function () {
      document.getElementById('modal-overlay').style.display = 'none';
      document.getElementById('modal-overlay').innerHTML = '';
    }, 300);
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  CCDH_CENTER: {
    LAT: 48.53183906441962,
    LNG: 2.053756713867188
  },
  CCDH_CITIES: ['BRX', 'COR', 'DRD', 'LFR', 'LGR', 'RIC', 'ROV', 'SCD', 'SER', 'STC', 'VSG'],
  MAP_BOUNDS: window.L.latLngBounds(window.L.latLng(4.679400715963894, 1.7390606689453127), window.L.latLng(98.38439074151866, 2.343395996093750)),
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
  precisionRound: precisionRound,
  fetchModal: fetchModal,
  closeModal: closeModal
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
/* harmony import */ var _map_Map_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./map/Map.js */ "./src/js/map/Map.js");
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
    // Data object
    this._cityBounds = {};
    this._cityMarkers = {};
    this._transportationLines = {};
    // User object
    this._user = {
      geolocationAllowed: false,
      lat: _utils_Utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].HOME_LAT,
      lng: _utils_Utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].HOME_LNG,
      accuracy: 0,
      marker: null
    };
    // Init app
    this._init();
  }
  _createClass(DourdannaisExplore, [{
    key: "_init",
    value: function _init() {
      var _this = this;
      this._initGeolocation().then(this._initMap.bind(this)).then(this._initEvents.bind(this)).then(this._fetchCityBounds.bind(this)) // Fetch city bounds
      .then(this._buildCityBounds.bind(this)) // Build city bounds
      .then(this._fetchCityMarkers.bind(this)) // Fetch city markers
      .then(this._buildCityMarkers.bind(this)) // Build city markers
      .then(this._fetchTransportationLines.bind(this)) // Fetch transportation lines
      .then(this._buildTransportationLines.bind(this)) // Build transportation lines
      .then(function () {
        console.log('we are done', _this);
      });
    }

    /* App initialization sequence */
  }, {
    key: "_initGeolocation",
    value: function _initGeolocation() {
      var _this2 = this;
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
          navigator.geolocation.getCurrentPosition(_this2._positionInitialized.bind(_this2), null, options);
          _this2._watchId = navigator.geolocation.watchPosition(_this2._positionUpdate.bind(_this2), null, options);
        }
        // Don't lock initialization waiting for pos
        resolve();
      });
    }
  }, {
    key: "_initMap",
    value: function _initMap() {
      var _this3 = this;
      return new Promise(function (resolve) {
        _this3._map = new _map_Map_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
          targetId: 'ccdh-map'
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
        document.getElementById('modal-overlay').addEventListener('click', _utils_Utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].closeModal.bind(_this4));
        resolve();
      });
    }
  }, {
    key: "_fetchCityBounds",
    value: function _fetchCityBounds() {
      var _this5 = this;
      return new Promise(function (resolve) {
        var promises = [];
        var _loop = function _loop(i) {
          promises.push(new Promise(function (resolveLocal) {
            fetch("./assets/json/citybounds/".concat(_utils_Utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].CCDH_CITIES[i], ".json")).then(function (data) {
              data.json().then(function (jsonData) {
                _this5._cityBounds[_utils_Utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].CCDH_CITIES[i]] = jsonData;
                resolveLocal();
              })["catch"](resolveLocal);
            })["catch"](resolveLocal);
          }));
        };
        for (var i = 0; i < _utils_Utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].CCDH_CITIES.length; ++i) {
          _loop(i);
        }
        // Going to next step once all bounds are loaded and saved
        Promise.all(promises).then(resolve);
      });
    }
  }, {
    key: "_buildCityBounds",
    value: function _buildCityBounds() {
      var _this6 = this;
      return new Promise(function (resolve) {
        var promises = [];
        var _loop2 = function _loop2(i) {
          promises.push(new Promise(function (resolveLocal) {
            _this6._map.addPolygon(_this6._cityBounds[_utils_Utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].CCDH_CITIES[i]].bounds, _utils_Utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].CCDH_CITIES[i]).then(function () {
              requestAnimationFrame(resolveLocal);
            });
          }));
        };
        for (var i = 0; i < _utils_Utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].CCDH_CITIES.length; ++i) {
          _loop2(i);
        }
        // Going to next step once all bounds are drawn on map
        Promise.all(promises).then(resolve);
      });
    }
  }, {
    key: "_fetchCityMarkers",
    value: function _fetchCityMarkers() {
      var _this7 = this;
      return new Promise(function (resolve) {
        var promises = [];
        var _loop3 = function _loop3(i) {
          promises.push(new Promise(function (resolveLocal) {
            fetch("./assets/json/citymarkers/".concat(_utils_Utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].CCDH_CITIES[i], ".json")).then(function (data) {
              data.json().then(function (jsonData) {
                _this7._cityMarkers[_utils_Utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].CCDH_CITIES[i]] = jsonData.markers;
                resolveLocal();
              })["catch"](resolveLocal);
            })["catch"](resolveLocal);
          }));
        };
        for (var i = 0; i < _utils_Utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].CCDH_CITIES.length; ++i) {
          _loop3(i);
        }
        // Going to next step once all markers are loaded and saved
        Promise.all(promises).then(resolve);
      });
    }
  }, {
    key: "_buildCityMarkers",
    value: function _buildCityMarkers() {
      var _this8 = this;
      return new Promise(function (resolve) {
        var promises = [];
        // Iterate over CCDH cities
        for (var i = 0; i < _utils_Utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].CCDH_CITIES.length; ++i) {
          // Iterate over city markers categories
          var categories = _this8._cityMarkers[_utils_Utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].CCDH_CITIES[i]];
          var keys = Object.keys(categories);
          var _loop4 = function _loop4() {
            // Iterate over city's markers
            var markers = categories[keys[j]];
            var _loop5 = function _loop5(k) {
              promises.push(new Promise(function (resolveLocal) {
                _this8._map.addMarker({
                  mark: markers[k],
                  user: _this8._user
                }).then(function () {
                  requestAnimationFrame(resolveLocal);
                });
              }));
            };
            for (var k = 0; k < markers.length; ++k) {
              _loop5(k);
            }
          };
          for (var j = 0; j < keys.length; ++j) {
            _loop4();
          }
        }
        // Going to next step once all markers are drawn on map
        Promise.all(promises).then(resolve);
      });
    }
  }, {
    key: "_fetchTransportationLines",
    value: function _fetchTransportationLines() {
      var _this9 = this;
      return new Promise(function (resolve) {
        fetch("./assets/json/transportation/transportation.json").then(function (data) {
          data.json().then(function (jsonData) {
            _this9._transportationLines = jsonData;
            resolve();
          })["catch"](resolve);
        })["catch"](resolve);
      });
    }
  }, {
    key: "_buildTransportationLines",
    value: function _buildTransportationLines() {
      var _this10 = this;
      return new Promise(function (resolve) {
        var promises = [];
        var keys = Object.keys(_this10._transportationLines);
        var _loop6 = function _loop6(i) {
          promises.push(new Promise(function (resolveLocal) {
            var line = _this10._transportationLines[keys[i]];
            for (var j = 0; j < line.stops.length; ++j) {
              _this10._map.addTransportationStop({
                data: line,
                stop: line.stops[j]
              }).then(function () {
                requestAnimationFrame(resolveLocal);
              });
            }
          }));
        };
        for (var i = 0; i < keys.length; ++i) {
          _loop6(i);
        }
        // Going to next step once all markers are drawn on map
        Promise.all(promises).then(resolve);
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
    */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LGtCQUFrQixLQUFLLElBQUksRUFBRTtRQUMxQztRQUNBLElBQUksQ0FBQ0QsS0FBSyxDQUFDeE8sR0FBRyxHQUFHYixRQUFRLENBQUNxUyxNQUFNLENBQUNDLFFBQVE7UUFDekMsSUFBSSxDQUFDakQsS0FBSyxDQUFDdk8sR0FBRyxHQUFHZCxRQUFRLENBQUNxUyxNQUFNLENBQUNFLFNBQVM7UUFDMUMsSUFBSSxDQUFDbEQsS0FBSyxDQUFDSSxRQUFRLEdBQUd6UCxRQUFRLENBQUNxUyxNQUFNLENBQUM1QyxRQUFRO1FBQzlDO1FBQ0EsSUFBSSxJQUFJLENBQUNwUixJQUFJLEVBQUU7VUFDYixJQUFJLENBQUNBLElBQUksQ0FBQzJDLGNBQWMsQ0FBQyxDQUFDO1FBQzVCO01BQ0Y7SUFDRjs7SUFHRjs7SUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtFQVpBO0lBQUFqQyxHQUFBO0lBQUF5VCxHQUFBLEVBZUUsU0FBQUEsSUFBQSxFQUFXO01BQ1QsT0FBTyxJQUFJLENBQUNuRCxLQUFLO0lBQ25CO0VBQUM7RUFBQSxPQUFBSixrQkFBQTtBQUFBO0FBS0gsaUVBQWVBLGtCQUFrQixFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vRG91cmRhbm5haXNFeHBsb3JlLy4vc3JjL2pzL21hcC9NYXAuanMiLCJ3ZWJwYWNrOi8vRG91cmRhbm5haXNFeHBsb3JlLy4vc3JjL2pzL21hcC9NYXBGYWN0b3J5LmpzIiwid2VicGFjazovL0RvdXJkYW5uYWlzRXhwbG9yZS8uL3NyYy9qcy91dGlscy9NYXJrZXJFbnVtLmpzIiwid2VicGFjazovL0RvdXJkYW5uYWlzRXhwbG9yZS8uL3NyYy9qcy91dGlscy9VdGlscy5qcyIsIndlYnBhY2s6Ly9Eb3VyZGFubmFpc0V4cGxvcmUvLi9zcmMvc2Nzcy9Eb3VyZGFubmFpc0V4cGxvcmUuc2NzcyIsIndlYnBhY2s6Ly9Eb3VyZGFubmFpc0V4cGxvcmUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vRG91cmRhbm5haXNFeHBsb3JlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9Eb3VyZGFubmFpc0V4cGxvcmUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9Eb3VyZGFubmFpc0V4cGxvcmUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9Eb3VyZGFubmFpc0V4cGxvcmUvLi9zcmMvanMvRG91cmRhbm5haXNFeHBsb3JlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBNYXBGYWN0b3J5IGZyb20gJy4uL21hcC9NYXBGYWN0b3J5LmpzJztcclxuaW1wb3J0IE1hcmtlcnMgZnJvbSAnLi4vdXRpbHMvTWFya2VyRW51bS5qcyc7XHJcbmltcG9ydCBVdGlscyBmcm9tICcuLi91dGlscy9VdGlscy5qcyc7XHJcbndpbmRvdy50bXA9IFtdO1xyXG5cclxuY2xhc3MgTWFwIHtcclxuXHJcblxyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuICAgIHRoaXMuX2lkID0gb3B0aW9ucy50YXJnZXRJZDtcclxuICAgIHRoaXMuX21hcCA9IG51bGxcclxuXHJcbiAgICB0aGlzLl9sYXllcnMgPSB7XHJcbiAgICAgIENhcnRlOiBudWxsLFxyXG4gICAgICBTYXRlbGxpdGU6IG51bGxcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5fbWFya3MgPSB7fTtcclxuICAgIHRoaXMuX3BvbHlnb25zID0ge307XHJcbiAgICB0aGlzLl9saW5lcyA9IFtdO1xyXG5cclxuICAgIHRoaXMuX2luaXQoKTtcclxuICAgIHRoaXMuX2V2ZW50cygpO1xyXG4gIH1cclxuXHJcblxyXG4gIF9pbml0KCkge1xyXG4gICAgLy8gVXNlIG1haW4gZGl2IHRvIGluamVjdCBPU00gaW50b1xyXG4gICAgdGhpcy5fbWFwID0gd2luZG93LkwubWFwKHRoaXMuX2lkLCB7XHJcbiAgICAgIHpvb21Db250cm9sOiBmYWxzZSxcclxuICAgIH0pLnNldFZpZXcoW1V0aWxzLkNDREhfQ0VOVEVSLkxBVCwgVXRpbHMuQ0NESF9DRU5URVIuTE5HXSwgMTIpO1xyXG4gICAgLy8gQWRkIG1ldGVyIGFuZCBmZWV0IHNjYWxlIG9uIG1hcFxyXG4gICAgd2luZG93LkwuY29udHJvbC5zY2FsZSgpLmFkZFRvKHRoaXMuX21hcCk7XHJcbiAgICAvLyBQcmV2ZW50IHBhbm5pbmcgb3V0c2lkZSBvZiB0aGUgbWFwIGJvdW5kcyBkZWZpbmluZWQgaW4gdXRpbHNcclxuICAgIHRoaXMuX21hcC5zZXRNYXhCb3VuZHMoVXRpbHMuTUFQX0JPVU5EUyk7XHJcbiAgICAvLyBBZGQgbGF5ZXIgZ3JvdXAgdG8gaW50ZXJmYWNlIGFuZCBzdGFydCBtYXAgd2l0aCBvc20gZGVmYXVsdFxyXG4gICAgdGhpcy5fbGF5ZXJzLkNhcnRlID0gVXRpbHMuT1NNX0xBWUVSO1xyXG4gICAgdGhpcy5fbGF5ZXJzLlNhdGVsbGl0ZSA9IFV0aWxzLkVTUklfTEFZRVI7XHJcbiAgICB0aGlzLl9sYXllcnMuQ2FydGUuYWRkVG8odGhpcy5fbWFwKTtcclxuICAgIC8vIEFkZCBsYXllciBzd2l0Y2ggcmFkaW8gb24gYm90dG9tIHJpZ2h0IG9mIHRoZSBtYXBcclxuICAgIHdpbmRvdy5MLmNvbnRyb2wubGF5ZXJzKHRoaXMuX2xheWVycywge30sIHsgcG9zaXRpb246ICdib3R0b21yaWdodCcgfSkuYWRkVG8odGhpcy5fbWFwKTtcclxuICB9XHJcblxyXG5cclxuICBfZXZlbnRzKCkge1xyXG4gICAgLy8gU3Vic2NyaWJlIHRvIGNsaWNrIGV2ZW50IG9uIG1hcCB0byByZWFjdFxyXG4gICAgdGhpcy5fbWFwLm9uKCdjbGljaycsIHRoaXMuX21hcENsaWNrZWQuYmluZCh0aGlzKSk7XHJcbiAgICAvLyBNYXAgaXMgZHJhZ2dlZCBieSB1c2VyIG1vdXNlL2ZpbmdlclxyXG4gICAgdGhpcy5fbWFwLm9uKCdkcmFnJywgKCkgPT4ge1xyXG4gICAgICAvLyBDb25zdHJhaW4gcGFuIHRvIHRoZSBtYXAgYm91bmRzXHJcbiAgICAgIHRoaXMuX21hcC5wYW5JbnNpZGVCb3VuZHMoVXRpbHMuTUFQX0JPVU5EUywgeyBhbmltYXRlOiB0cnVlIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgX21hcENsaWNrZWQob3B0cykge1xyXG4gICAgY29uc29sZS5sb2cob3B0cy5sYXRsbmcsIEpTT04uc3RyaW5naWZ5KG9wdHMubGF0bG5nLmxhdCArICcsICcgKyBvcHRzLmxhdGxuZy5sbmcpKTtcclxuICAgIHdpbmRvdy50bXAucHVzaChbb3B0cy5sYXRsbmcubGF0LCBvcHRzLmxhdGxuZy5sbmddKTtcclxuICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHdpbmRvdy50bXApKVxyXG4gIH1cclxuXHJcblxyXG4gIGRyYXdVc2VyTWFya2VyKCkge1xyXG4gICAgaWYgKCF3aW5kb3cuZHgudXNlci5tYXJrZXIpIHtcclxuICAgICAgd2luZG93LmR4LnVzZXIubWFya2VyID0gd2luZG93LkwubWFya2VyKFt3aW5kb3cuZHgudXNlci5sYXQsIHdpbmRvdy5keC51c2VyLmxuZ10sIHtcclxuICAgICAgICBpY29uOiBNYXJrZXJzLnVzZXJcclxuICAgICAgfSk7XHJcbiAgICAgIHdpbmRvdy5keC51c2VyLm1hcmtlci5hZGRUbyh0aGlzLl9tYXApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgd2luZG93LmR4LnVzZXIubWFya2VyLnNldExhdExuZyh3aW5kb3cuZHgudXNlcik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcbiAgYWRkUG9seWdvbihpbnB1dCwgaWQpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuICAgICAgY29uc3QgcG9seWdvbiA9IHdpbmRvdy5MLnBvbHlnb24oaW5wdXQpO1xyXG4gICAgICBwb2x5Z29uLmFkZFRvKHRoaXMuX21hcCk7XHJcbiAgICAgIHRoaXMuX3BvbHlnb25zW2lkXSA9IHBvbHlnb247XHJcbiAgICAgIHJlc29sdmUoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG4gIGFkZE1hcmtlcihvcHRzKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICAgIGxldCB0eXBlID0gb3B0cy5tYXJrLnR5cGU7XHJcbiAgICAgIGNvbnN0IG1hcmtlciA9IHdpbmRvdy5MLm1hcmtlcihbb3B0cy5tYXJrLmxhdCwgb3B0cy5tYXJrLmxuZ10sIHsgXHJcbiAgICAgICAgaWNvbjogTWFya2Vyc1t0eXBlXVxyXG4gICAgICB9KS5vbignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5fbWFwLmZseVRvKFtvcHRzLm1hcmsubGF0LCBvcHRzLm1hcmsubG5nXSwgMTgpO1xyXG4gICAgICB9KTtcclxuICBcclxuICAgICAgbWFya2VyLmJpbmRQb3B1cChNYXBGYWN0b3J5LmNyZWF0ZU1hcmtlclBvcHVwKG9wdHMpKTtcclxuICAgICAgbWFya2VyLmFkZFRvKHRoaXMuX21hcCk7XHJcbiAgICAgIGlmIChvcHRzLm1hcmsuc3VidHlwZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3B0cy5tYXJrLnN1YnR5cGVzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICBpZiAoIXRoaXMuX21hcmtzW29wdHMubWFyay5zdWJ0eXBlc1tpXV0pIHtcclxuICAgICAgICAgICAgdGhpcy5fbWFya3Nbb3B0cy5tYXJrLnN1YnR5cGVzW2ldXSA9IFtdO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpcy5fbWFya3Nbb3B0cy5tYXJrLnN1YnR5cGVzW2ldXS5wdXNoKG1hcmtlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmICghdGhpcy5fbWFya3NbdHlwZV0pIHtcclxuICAgICAgICAgIHRoaXMuX21hcmtzW3R5cGVdID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX21hcmtzW3R5cGVdLnB1c2gobWFya2VyKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgYWRkVHJhbnNwb3J0YXRpb25TdG9wKG9wdHMpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuICAgICAgY29uc3QgdHlwZSA9IG9wdHMuc3RvcC50eXBlO1xyXG4gICAgICBjb25zdCBtYXJrZXIgPSB3aW5kb3cuTC5tYXJrZXIoW29wdHMuc3RvcC5sYXQsIG9wdHMuc3RvcC5sbmddLCB7IFxyXG4gICAgICAgIGljb246IE1hcmtlcnNbdHlwZV1cclxuICAgICAgfSkub24oJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuX21hcC5mbHlUbyhbb3B0cy5zdG9wLmxhdCwgb3B0cy5zdG9wLmxuZ10sIDE4KTtcclxuICAgICAgfSk7XHJcbiAgXHJcbiAgICAgIGNvbnN0IGxpbmUgPSB3aW5kb3cuTC5wb2x5bGluZShvcHRzLmRhdGEucGF0aCwge1xyXG4gICAgICAgIGNvbG9yOiBvcHRzLmRhdGEuY29sb3IsXHJcbiAgICAgICAgd2VpZ2h0OiA1LFxyXG4gICAgICAgIHNtb290aEZhY3RvcjogMVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIG1hcmtlci5iaW5kUG9wdXAoTWFwRmFjdG9yeS5jcmVhdGVTdG9wTWFya2VyUG9wdXAob3B0cykpLm9uKCdwb3B1cG9wZW4nLCAoKSA9PiB7XHJcbiAgICAgICAgbGluZS5hZGRUbyh0aGlzLl9tYXApO1xyXG4gICAgICB9KS5vbigncG9wdXBjbG9zZScsICgpID0+IHtcclxuICAgICAgICBsaW5lLnJlbW92ZUZyb20odGhpcy5fbWFwKTtcclxuICAgICAgfSk7XHJcbiAgICAgIFxyXG4gICAgICBtYXJrZXIuYWRkVG8odGhpcy5fbWFwKTtcclxuICBcclxuICAgICAgaWYgKCF0aGlzLl9tYXJrc1t0eXBlXSkge1xyXG4gICAgICAgIHRoaXMuX21hcmtzW3R5cGVdID0gW107XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5fbWFya3NbdHlwZV0ucHVzaChtYXJrZXIpO1xyXG5cclxuICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgYWRkTGluZShwb2ludHMsIG9wdGlvbnMpIHtcclxuICAgIHRoaXMuX2xpbmVzLnB1c2god2luZG93LkwucG9seWxpbmUocG9pbnRzLCBvcHRpb25zKS5hZGRUbyh0aGlzLl9tYXApKTtcclxuICB9XHJcblxyXG5cclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1hcDtcclxuIiwiaW1wb3J0IFV0aWxzIGZyb20gJy4uL3V0aWxzL1V0aWxzLmpzJztcclxuXHJcblxyXG5jbGFzcyBNYXBGYWN0b3J5IHtcclxuXHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge31cclxuXHJcblxyXG4gIHN0YXRpYyBjcmVhdGVNYXJrZXJQb3B1cChvcHRzKSB7XHJcbiAgICBjb25zdCBkb20gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcclxuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnSDMnKTtcclxuICAgIGNvbnN0IGFkZHJlc3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdJJyk7XHJcbiAgICBjb25zdCB0b3duID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnSScpO1xyXG4gICAgY29uc3QgcGhvbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdBJyk7XHJcbiAgICBjb25zdCB3ZWJzaXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnQScpO1xyXG4gICAgY29uc3QgaW5mbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ1AnKTtcclxuICAgIGNvbnN0IG9wZW5XaXRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnQScpO1xyXG5cclxuICAgIGRvbS5jbGFzc0xpc3QuYWRkKCdtYXJrZXItcG9wdXAnKTtcclxuICAgIHRpdGxlLmlubmVySFRNTCA9IG9wdHMubWFyay5uYW1lO1xyXG4gICAgYWRkcmVzcy5pbm5lckhUTUwgPSBvcHRzLm1hcmsuYWRkcmVzcztcclxuICAgIHRvd24uaW5uZXJIVE1MID0gb3B0cy5tYXJrLnRvd247XHJcbiAgICBwaG9uZS5ocmVmID0gYHRlbDoke29wdHMubWFyay5waG9uZX1gO1xyXG4gICAgcGhvbmUuaW5uZXJIVE1MID0gYDxpbWcgc3JjPVwiLi9hc3NldHMvaW1nL2ljb24vcGhvbmUuc3ZnXCI+JHtvcHRzLm1hcmsucGhvbmV9YDtcclxuICAgIHdlYnNpdGUuaHJlZiA9IG9wdHMubWFyay53ZWJzaXRlO1xyXG4gICAgd2Vic2l0ZS5pbm5lckhUTUwgPSAnPGltZyBzcmM9XCIuL2Fzc2V0cy9pbWcvaWNvbi93ZWIuc3ZnXCI+Q29uc3VsdGVyIGxlIHNpdGUnO1xyXG4gICAgd2Vic2l0ZS5zZXRBdHRyaWJ1dGUoJ3JlbCcsICdub29wZW5lciBub3JlZmVycmVyJyk7XHJcbiAgICB3ZWJzaXRlLnNldEF0dHJpYnV0ZSgndGFyZ2V0JywgJ19ibGFuaycpO1xyXG4gICAgaW5mby5pbm5lckhUTUwgPSBvcHRzLm1hcmsuaW5mbztcclxuICAgIG9wZW5XaXRoLmhyZWYgPSBgZ2VvOiR7b3B0cy5tYXJrLmxhdH0sJHtvcHRzLm1hcmsubG5nfWA7XHJcbiAgICBvcGVuV2l0aC5pbm5lckhUTUwgPSAnPGltZyBzcmM9XCIuL2Fzc2V0cy9pbWcvaWNvbi9waW4uc3ZnXCI+T3V2cmlyIGRhbnMgbGUgR1BTJztcclxuXHJcbiAgICBkb20uYXBwZW5kQ2hpbGQodGl0bGUpO1xyXG4gICAgZG9tLmFwcGVuZENoaWxkKGFkZHJlc3MpO1xyXG4gICAgZG9tLmFwcGVuZENoaWxkKHRvd24pO1xyXG5cclxuICAgIGNvbnN0IGJ1dHRvbiA9IHRoaXMubWFya2VyT3BlbmVkU3RhdGUob3B0cy5tYXJrLnRpbWV0YWJsZSk7XHJcbiAgICBkb20uYXBwZW5kQ2hpbGQoYnV0dG9uKTtcclxuXHJcbiAgICBsZXQgYWx3YXlzQ2xvc2VkID0gdHJ1ZTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3B0cy5tYXJrLnRpbWV0YWJsZS5sZW5ndGg7ICsraSkge1xyXG4gICAgICBpZiAob3B0cy5tYXJrLnRpbWV0YWJsZVtpXS5pc09wZW4gPT09IHRydWUpIHtcclxuICAgICAgICBhbHdheXNDbG9zZWQgPSBmYWxzZTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gQWxsb3cgbW9kYWwgb25seSBpZiBwb2kgaGFzIHRpbWV0YWJsZSBhbmQgaXMgbm90IGFsd2F5cyBjbG9zZWRcclxuICAgIGlmIChvcHRzLm1hcmsudGltZXRhYmxlLmxlbmd0aCA+IDAgJiYgYWx3YXlzQ2xvc2VkID09PSBmYWxzZSkge1xyXG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnRpbWV0YWJsZU1vZGFsLmJpbmQodGhpcywgb3B0cy5tYXJrLCBvcHRzLnVzZXIpKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgaWYgKG9wdHMubWFyay5pbmZvICE9PSAnJykge1xyXG4gICAgICBkb20uYXBwZW5kQ2hpbGQoaW5mbyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG9wdHMubWFyay5waG9uZSAhPT0gJycpIHtcclxuICAgICAgZG9tLmFwcGVuZENoaWxkKHBob25lKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAob3B0cy5tYXJrLndlYnNpdGUgIT09ICcnKSB7XHJcbiAgICAgIGRvbS5hcHBlbmRDaGlsZCh3ZWJzaXRlKTtcclxuICAgIH0gICAgXHJcbiAgICBcclxuICAgIGRvbS5hcHBlbmRDaGlsZChvcGVuV2l0aCk7XHJcblxyXG4gICAgcmV0dXJuIGRvbTtcclxuICB9XHJcblxyXG5cclxuICBzdGF0aWMgY3JlYXRlU3RvcE1hcmtlclBvcHVwKG9wdHMpIHtcclxuICAgIGNvbnN0IGRvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xyXG4gICAgY29uc3QgbG9nbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0lNRycpO1xyXG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdIMycpO1xyXG4gICAgY29uc3QgZGlyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnSDQnKTtcclxuICAgIGNvbnN0IGFkZHJlc3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdJJyk7XHJcbiAgICBjb25zdCB0b3duID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnSScpO1xyXG4gICAgY29uc3Qgd2Vic2l0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0EnKTtcclxuICAgIGNvbnN0IGluZm8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdBJyk7XHJcbiAgICBjb25zdCBkbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0EnKTtcclxuICAgIGNvbnN0IG9wZW5XaXRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnQScpO1xyXG5cclxuICAgIGRvbS5jbGFzc0xpc3QuYWRkKCdtYXJrZXItcG9wdXAnKTtcclxuICAgIGxvZ28uc3JjID0gYC4vYXNzZXRzL2ltZy90cmFuc3BvcnRhdGlvbi8ke29wdHMuZGF0YS5uYW1lfS5wbmdgO1xyXG4gICAgdGl0bGUuaW5uZXJIVE1MID0gb3B0cy5zdG9wLm5hbWU7XHJcbiAgICBpZiAob3B0cy5zdG9wLnRlcm1pbnVzID09PSB0cnVlKSB7XHJcbiAgICAgIGRpci5pbm5lckhUTUwgPSBgVGVybWludXMgZGUgbGEgbGlnbmVgO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZGlyLmlubmVySFRNTCA9IGBEaXJlY3Rpb24gJHtvcHRzLnN0b3AuZGlyfWA7XHJcbiAgICB9XHJcbiAgICBhZGRyZXNzLmlubmVySFRNTCA9IG9wdHMuc3RvcC5hZGRyZXNzO1xyXG4gICAgdG93bi5pbm5lckhUTUwgPSBvcHRzLnN0b3AudG93bjtcclxuICAgIHdlYnNpdGUuaHJlZiA9IG9wdHMuc3RvcC53ZWJzaXRlO1xyXG4gICAgd2Vic2l0ZS5pbm5lckhUTUwgPSAnPGltZyBzcmM9XCIuL2Fzc2V0cy9pbWcvaWNvbi93ZWIuc3ZnXCI+Q29uc3VsdGVyIGxlIHNpdGUnO1xyXG4gICAgd2Vic2l0ZS5zZXRBdHRyaWJ1dGUoJ3JlbCcsICdub29wZW5lciBub3JlZmVycmVyJyk7XHJcbiAgICB3ZWJzaXRlLnNldEF0dHJpYnV0ZSgndGFyZ2V0JywgJ19ibGFuaycpO1xyXG4gICAgaW5mby5ocmVmID0gb3B0cy5zdG9wLmluZm87XHJcbiAgICBpbmZvLmlubmVySFRNTCA9ICc8aW1nIHNyYz1cIi4vYXNzZXRzL2ltZy9pY29uL2luZm8uc3ZnXCI+SW5mb3JtYXRpb25zJztcclxuICAgIGluZm8uc2V0QXR0cmlidXRlKCdyZWwnLCAnbm9vcGVuZXIgbm9yZWZlcnJlcicpO1xyXG4gICAgaW5mby5zZXRBdHRyaWJ1dGUoJ3RhcmdldCcsICdfYmxhbmsnKTtcclxuICAgIGRsLmhyZWYgPSBgLi9hc3NldHMvcGRmLyR7b3B0cy5kYXRhLm5hbWV9LnBkZmA7XHJcbiAgICBkbC5pbm5lckhUTUwgPSAnPGltZyBzcmM9XCIuL2Fzc2V0cy9pbWcvaWNvbi9kb3dubG9hZC5zdmdcIj5Uw6lsw6ljaGFyZ2VyIGxlcyBob3JhaXJlcyc7XHJcbiAgICBkbC5zZXRBdHRyaWJ1dGUoJ3JlbCcsICdub29wZW5lciBub3JlZmVycmVyJyk7XHJcbiAgICBkbC5zZXRBdHRyaWJ1dGUoJ3RhcmdldCcsICdfYmxhbmsnKTtcclxuICAgIG9wZW5XaXRoLmhyZWYgPSBgZ2VvOiR7b3B0cy5zdG9wLmxhdH0sJHtvcHRzLnN0b3AubG5nfWA7XHJcbiAgICBvcGVuV2l0aC5pbm5lckhUTUwgPSAnPGltZyBzcmM9XCIuL2Fzc2V0cy9pbWcvaWNvbi9waW4uc3ZnXCI+T3V2cmlyIGRhbnMgbGUgR1BTJztcclxuXHJcbiAgICBkb20uYXBwZW5kQ2hpbGQobG9nbyk7XHJcbiAgICBkb20uYXBwZW5kQ2hpbGQodGl0bGUpO1xyXG4gICAgZG9tLmFwcGVuZENoaWxkKGRpcik7XHJcbiAgICBkb20uYXBwZW5kQ2hpbGQoYWRkcmVzcyk7XHJcbiAgICBkb20uYXBwZW5kQ2hpbGQodG93bik7XHJcbiAgICBcclxuICAgIGlmIChvcHRzLnN0b3AuaW5mbyAhPT0gJycpIHtcclxuICAgICAgZG9tLmFwcGVuZENoaWxkKGluZm8pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChvcHRzLnN0b3Aud2Vic2l0ZSAhPT0gJycpIHtcclxuICAgICAgZG9tLmFwcGVuZENoaWxkKHdlYnNpdGUpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBkb20uYXBwZW5kQ2hpbGQoZGwpO1xyXG4gICAgZG9tLmFwcGVuZENoaWxkKG9wZW5XaXRoKTtcclxuXHJcbiAgICByZXR1cm4gZG9tO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qIE1hcmtlciB0aW1ldGFibGUgYW5kIG9wZW4vY2xvc2VkIHN0YXRlICovXHJcblxyXG5cclxuICBzdGF0aWMgbWFya2VyT3BlbmVkU3RhdGUodGltZXRhYmxlKSB7XHJcbiAgICBjb25zdCBkb20gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcclxuICAgIGNvbnN0IHN0YXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnSDUnKTtcclxuICAgIGNvbnN0IG1vcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdJJyk7XHJcbiAgICBkb20uY2xhc3NMaXN0LmFkZCgnbWFya2VyLW9wZW5lZCcpO1xyXG4gICAgZG9tLmFwcGVuZENoaWxkKHN0YXRlKTtcclxuICAgIGRvbS5hcHBlbmRDaGlsZChtb3JlKTtcclxuICAgIFxyXG4gICAgaWYgKHRpbWV0YWJsZS5sZW5ndGgpIHtcclxuICAgICAgbGV0IGFsd2F5c0Nsb3NlZCA9IHRydWU7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGltZXRhYmxlLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgaWYgKHRpbWV0YWJsZVtpXS5pc09wZW4gPT09IHRydWUpIHtcclxuICAgICAgICAgIGFsd2F5c0Nsb3NlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoYWx3YXlzQ2xvc2VkID09PSB0cnVlKSB7XHJcbiAgICAgICAgdGhpcy5tYXJrZXJJc0Nsb3NlZChkb20sIHRydWUpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuY2hlY2tUaW1lKHRpbWV0YWJsZSwgZG9tKTtcclxuICAgICAgICAvLyBVcGRhdGUgZWFjaCBtaW51dGVzXHJcbiAgICAgICAgLy8gVE9ETyBzdG9yZSBpbnRlcnZhbCBpZiB0byBiZSByZWFkeSB0byBjYW5jZWwgd2hlbiBvdGhlciBuYXZpZ2F0aW9uIG1vZGUgYXZhaWxhYmxlXHJcbiAgICAgICAgc2V0SW50ZXJ2YWwodGhpcy5jaGVja1RpbWUuYmluZCh0aGlzLCB0aW1ldGFibGUsIGRvbSksIDYwMDAwKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5tYXJrZXJJc09wZW5lZChkb20sIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBkb207XHJcbiAgfVxyXG5cclxuXHJcbiAgc3RhdGljIGNoZWNrVGltZSh0aW1ldGFibGUsIGRvbSkge1xyXG4gICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcclxuICAgIGxldCBob3VyID0gbm93LmdldEhvdXJzKCk7XHJcbiAgICBsZXQgbWludXRlcyA9IG5vdy5nZXRNaW51dGVzKCk7XHJcbiAgICBpZiAobWludXRlcyA8IDEwKSB7XHJcbiAgICAgIG1pbnV0ZXMgPSBgMCR7bWludXRlc31gO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGRheU9mV2VlayA9IG5vdy5nZXREYXkoKSAtIDE7XHJcbiAgICBjb25zdCBvcGVuaW5nVGltZSA9IHBhcnNlSW50KGAke3RpbWV0YWJsZVtkYXlPZldlZWtdLm9wZW4uaH0ke3RpbWV0YWJsZVtkYXlPZldlZWtdLm9wZW4ubX1gKTtcclxuICAgIGNvbnN0IGNsb3NpbmdUaW1lID0gcGFyc2VJbnQoYCR7dGltZXRhYmxlW2RheU9mV2Vla10uY2xvc2UuaH0ke3RpbWV0YWJsZVtkYXlPZldlZWtdLmNsb3NlLm19YCk7XHJcbiAgICBjb25zdCBjdXJyZW50VGltZSA9IHBhcnNlSW50KGAke2hvdXJ9JHttaW51dGVzfWApO1xyXG4gICAgLy8gV29uJ3Qgd29yayBpZiB0aW1ldGFibGUgb3Blbi9jbG9zZSBob3VycyBhcmVuJ3Qgb24gdGhlIHNhbWUgZGF5XHJcbiAgICBpZiAodGltZXRhYmxlW2RheU9mV2Vla10uaXNPcGVuICYmIGlzTmFOKG9wZW5pbmdUaW1lKSkgeyAvLyAyNC83IG9wZW5pbmdcclxuICAgICAgdGhpcy5tYXJrZXJJc09wZW5lZChkb20sIHRydWUpO1xyXG4gICAgfSBlbHNlIGlmICh0aW1ldGFibGVbZGF5T2ZXZWVrXS5pc09wZW4gJiYgY3VycmVudFRpbWUgPj0gb3BlbmluZ1RpbWUgJiYgY3VycmVudFRpbWUgPCBjbG9zaW5nVGltZSkge1xyXG4gICAgICAvLyBDaGVjayBmb3IgZGF5IGJyZWFrc1xyXG4gICAgICBpZiAodGltZXRhYmxlW2RheU9mV2Vla10uYnJlYWsuaGFzQnJlYWspIHtcclxuICAgICAgICAvLyBJbiBjYXNlIG9mIHNldmVyYWwgZGF5IGJyZWFrc1xyXG4gICAgICAgIGlmICh0aW1ldGFibGVbZGF5T2ZXZWVrXS5icmVhay5zZXZlcmFsKSB7XHJcbiAgICAgICAgICBsZXQgaXNDbG9zZWQgPSBmYWxzZTtcclxuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGltZXRhYmxlW2RheU9mV2Vla10uYnJlYWsuc2V2ZXJhbC5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICBjb25zdCBicmVha09wZW5pbmdUaW1lID0gcGFyc2VJbnQoYCR7dGltZXRhYmxlW2RheU9mV2Vla10uYnJlYWsuc2V2ZXJhbFtpXS5lbmQuaH0ke3RpbWV0YWJsZVtkYXlPZldlZWtdLmJyZWFrLnNldmVyYWxbaV0uZW5kLm19YCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGJyZWFrQ2xvc2luZ1RpbWUgPSBwYXJzZUludChgJHt0aW1ldGFibGVbZGF5T2ZXZWVrXS5icmVhay5zZXZlcmFsW2ldLnN0YXJ0Lmh9JHt0aW1ldGFibGVbZGF5T2ZXZWVrXS5icmVhay5zZXZlcmFsW2ldLnN0YXJ0Lm19YCk7XHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50VGltZSA+PSBicmVha0Nsb3NpbmdUaW1lICYmIGN1cnJlbnRUaW1lIDwgYnJlYWtPcGVuaW5nVGltZSkge1xyXG4gICAgICAgICAgICAgIHRoaXMubWFya2VySXNDbG9zZWQoZG9tKTtcclxuICAgICAgICAgICAgICBpc0Nsb3NlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICghaXNDbG9zZWQpIHtcclxuICAgICAgICAgICAgICB0aGlzLm1hcmtlcklzT3BlbmVkKGRvbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29uc3QgYnJlYWtPcGVuaW5nVGltZSA9IHBhcnNlSW50KGAke3RpbWV0YWJsZVtkYXlPZldlZWtdLmJyZWFrLmVuZC5ofSR7dGltZXRhYmxlW2RheU9mV2Vla10uYnJlYWsuZW5kLm19YCk7XHJcbiAgICAgICAgICBjb25zdCBicmVha0Nsb3NpbmdUaW1lID0gcGFyc2VJbnQoYCR7dGltZXRhYmxlW2RheU9mV2Vla10uYnJlYWsuc3RhcnQuaH0ke3RpbWV0YWJsZVtkYXlPZldlZWtdLmJyZWFrLnN0YXJ0Lm19YCk7XHJcbiAgICAgICAgICBpZiAoY3VycmVudFRpbWUgPj0gYnJlYWtDbG9zaW5nVGltZSAmJiBjdXJyZW50VGltZSA8IGJyZWFrT3BlbmluZ1RpbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5tYXJrZXJJc0Nsb3NlZChkb20pO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5tYXJrZXJJc09wZW5lZChkb20pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLm1hcmtlcklzT3BlbmVkKGRvbSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7ICAgICAgXHJcbiAgICAgIHRoaXMubWFya2VySXNDbG9zZWQoZG9tKTtcclxuICAgIH1cclxuICB9XHJcblxyXG5cclxuICBzdGF0aWMgbWFya2VySXNPcGVuZWQoZG9tLCBhbHdheXNPcGVuZWQpIHtcclxuICAgIGRvbS5maXJzdENoaWxkLmlubmVySFRNTCA9IGBPdXZlcnRgO1xyXG4gICAgaWYgKGFsd2F5c09wZW5lZCA9PT0gdHJ1ZSkge1xyXG4gICAgICBkb20ubGFzdENoaWxkLmlubmVySFRNTCA9IGBUb3Vqb3VycyBvdXZlcnRgO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZG9tLmxhc3RDaGlsZC5pbm5lckhUTUwgPSBgVm9pciBsZXMgaG9yYWlyZXNgO1xyXG4gICAgfVxyXG4gICAgZG9tLmNsYXNzTGlzdC5hZGQoJ29wZW5lZCcpO1xyXG4gIH1cclxuXHJcblxyXG4gIHN0YXRpYyBtYXJrZXJJc0Nsb3NlZChkb20sIGFsd2F5c0Nsb3NlZCkge1xyXG4gICAgZG9tLmZpcnN0Q2hpbGQuaW5uZXJIVE1MID0gYEZlcm3DqWA7XHJcbiAgICBpZiAoYWx3YXlzQ2xvc2VkKSB7XHJcbiAgICAgIGRvbS5sYXN0Q2hpbGQuaW5uZXJIVE1MID0gJ1RvdWpvdXJzIGZlcm3DqSc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkb20ubGFzdENoaWxkLmlubmVySFRNTCA9IGBWb2lyIGxlcyBob3JhaXJlc2A7XHJcbiAgICB9XHJcbiAgICBkb20uY2xhc3NMaXN0LnJlbW92ZSgnb3BlbmVkJyk7XHJcbiAgfVxyXG5cclxuXHJcbiAgc3RhdGljIHRpbWV0YWJsZU1vZGFsKG9wdHMsIHVzZXIpIHtcclxuICAgIFV0aWxzLmZldGNoTW9kYWwoJ3RpbWV0YWJsZW1vZGFsJykudGhlbihkb20gPT4ge1xyXG4gICAgICAvLyBVcGRhdGluZyBtb2RhbCBoZWFkZXIgYW5kIGluZm9cclxuICAgICAgZG9tLnF1ZXJ5U2VsZWN0b3IoJyNtYXJrLW5hbWUnKS5pbm5lckhUTUwgPSBvcHRzLm5hbWU7XHJcbiAgICAgIGRvbS5xdWVyeVNlbGVjdG9yKCcjbWFyay1hZGRyZXNzJykuaW5uZXJIVE1MID0gYCR7b3B0cy5hZGRyZXNzfSwgJHtvcHRzLnRvd259YDtcclxuICAgICAgY29uc3QgZGlzdGFuY2UgPSBVdGlscy5nZXREaXN0YW5jZUJldHdlZW5Db29yZHMoW29wdHMubGF0LCBvcHRzLmxuZ10sIFt1c2VyLmxhdCwgdXNlci5sbmddKTtcclxuICAgICAgZG9tLnF1ZXJ5U2VsZWN0b3IoJyNtYXJrLWRpc3RhbmNlJykuaW5uZXJIVE1MID0gYFZvdXMgw6h0ZXMgw6AgZW52aXJvbiAke1V0aWxzLmNvbnZlcnREaXN0YW5jZVRvU3RyaW5nKGRpc3RhbmNlKX0gZGUgPGI+JHtvcHRzLm5hbWV9PC9iPiDDoCB2b2wgZCdvaXNlYXVgO1xyXG4gICAgICBjb25zdCBldGEgPSBVdGlscy5idWlsZERpc3RhbmNlRVRBKGRpc3RhbmNlKTtcclxuICAgICAgZG9tLnF1ZXJ5U2VsZWN0b3IoJyNtYXJrLWV0YScpLmlubmVySFRNTCA9IGBDZSBxdWkgcmVwcsOpc2VudGUgZW52aXJvbiAke2V0YS5jYXJ9IGVuIHZvaXR1cmUsIG91ICR7ZXRhLndhbGt9IMOgIHBpZWQuYDtcclxuICAgICAgZG9tLnF1ZXJ5U2VsZWN0b3IoJyNtYXJrLXN0YXRlJykuYXBwZW5kQ2hpbGQodGhpcy5tYXJrZXJPcGVuZWRTdGF0ZShvcHRzLnRpbWV0YWJsZSkpO1xyXG4gICAgICAvLyBOb3cgdXBkYXRlIGRheSBieSBkYXlcclxuICAgICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcclxuICAgICAgY29uc3QgZGF5T2ZXZWVrID0gbm93LmdldERheSgpIC0gMTtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvcHRzLnRpbWV0YWJsZS5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgIGNvbnN0IGRheURvbSA9IGRvbS5xdWVyeVNlbGVjdG9yKCcjdGltZXRhYmxlJykuY2hpbGRyZW5baV07XHJcbiAgICAgICAgaWYgKG9wdHMudGltZXRhYmxlW2ldLmlzT3BlbiA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgY29uc3QgbW9ybmluZyA9IGRheURvbS5sYXN0RWxlbWVudENoaWxkLmZpcnN0RWxlbWVudENoaWxkO1xyXG4gICAgICAgICAgY29uc3QgYWZ0ZXJub29uID0gZGF5RG9tLmxhc3RFbGVtZW50Q2hpbGQubGFzdEVsZW1lbnRDaGlsZDtcclxuICAgICAgICAgIGlmIChvcHRzLnRpbWV0YWJsZVtpXS5icmVhayAmJiBvcHRzLnRpbWV0YWJsZVtpXS5icmVhay5oYXNCcmVhayA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBpZiAob3B0cy50aW1ldGFibGVbaV0uYnJlYWsuc2V2ZXJhbCkge1xyXG4gICAgICAgICAgICAgIG1vcm5pbmcuaW5uZXJIVE1MID0gYDxwPiR7b3B0cy50aW1ldGFibGVbaV0ub3Blbi5ofToke29wdHMudGltZXRhYmxlW2ldLm9wZW4ubX0g4oCSICR7b3B0cy50aW1ldGFibGVbaV0uYnJlYWsuc2V2ZXJhbFswXS5zdGFydC5ofToke29wdHMudGltZXRhYmxlW2ldLmJyZWFrLnNldmVyYWxbMF0uc3RhcnQubX08L3A+YDtcclxuICAgICAgICAgICAgICBtb3JuaW5nLmNsYXNzTGlzdC5hZGQoJ2ZpbGxlZCcpOyAvLyBNb3JuaW5nXHJcbiAgICAgICAgICAgICAgbW9ybmluZy5jbGFzc0xpc3QuYWRkKCdzcGxpdGVkJyk7IC8vIE1vcm5pbmdcclxuICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG9wdHMudGltZXRhYmxlW2ldLmJyZWFrLnNldmVyYWwubGVuZ3RoIC0gMTsgKytqKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcclxuICAgICAgICAgICAgICAgIGRpdi5pbm5lckhUTUwgPSBgPHA+JHtvcHRzLnRpbWV0YWJsZVtpXS5icmVhay5zZXZlcmFsW2pdLmVuZC5ofToke29wdHMudGltZXRhYmxlW2ldLmJyZWFrLnNldmVyYWxbal0uZW5kLm19IOKAkiAke29wdHMudGltZXRhYmxlW2ldLmJyZWFrLnNldmVyYWxbaiArIDFdLnN0YXJ0Lmh9OiR7b3B0cy50aW1ldGFibGVbaV0uYnJlYWsuc2V2ZXJhbFtqICsgMV0uc3RhcnQubX08L3A+YDtcclxuICAgICAgICAgICAgICAgIGRpdi5jbGFzc0xpc3QuYWRkKCdmaWxsZWQnKTtcclxuICAgICAgICAgICAgICAgIGRpdi5jbGFzc0xpc3QuYWRkKCdzcGxpdGVkJyk7XHJcbiAgICAgICAgICAgICAgICBkaXYuc3R5bGUuYm9yZGVyUmFkaXVzID0gJy41cmVtJztcclxuICAgICAgICAgICAgICAgIGRpdi5zdHlsZS5qdXN0aWZ5Q29udGVudCA9ICdjZW50ZXInO1xyXG4gICAgICAgICAgICAgICAgZGF5RG9tLmxhc3RFbGVtZW50Q2hpbGQuaW5zZXJ0QmVmb3JlKGRpdiwgZGF5RG9tLmxhc3RFbGVtZW50Q2hpbGQubGFzdEVsZW1lbnRDaGlsZCk7XHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICBhZnRlcm5vb24uaW5uZXJIVE1MID0gYDxwPiR7b3B0cy50aW1ldGFibGVbaV0uYnJlYWsuc2V2ZXJhbFtvcHRzLnRpbWV0YWJsZVtpXS5icmVhay5zZXZlcmFsLmxlbmd0aCAtIDFdLmVuZC5ofToke29wdHMudGltZXRhYmxlW2ldLmJyZWFrLnNldmVyYWxbb3B0cy50aW1ldGFibGVbaV0uYnJlYWsuc2V2ZXJhbC5sZW5ndGggLSAxXS5lbmQubX0g4oCSICR7b3B0cy50aW1ldGFibGVbaV0uY2xvc2UuaH06JHtvcHRzLnRpbWV0YWJsZVtpXS5jbG9zZS5tfTwvcD5gO1xyXG4gICAgICAgICAgICAgIGFmdGVybm9vbi5jbGFzc0xpc3QuYWRkKCdmaWxsZWQnKTsgLy8gQWZ0ZXJub29uXHJcbiAgICAgICAgICAgICAgYWZ0ZXJub29uLmNsYXNzTGlzdC5hZGQoJ3NwbGl0ZWQnKTsgLy8gQWZ0ZXJub29uXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgbW9ybmluZy5pbm5lckhUTUwgPSBgPHA+JHtvcHRzLnRpbWV0YWJsZVtpXS5vcGVuLmh9OiR7b3B0cy50aW1ldGFibGVbaV0ub3Blbi5tfSDigJIgJHtvcHRzLnRpbWV0YWJsZVtpXS5icmVhay5zdGFydC5ofToke29wdHMudGltZXRhYmxlW2ldLmJyZWFrLnN0YXJ0Lm19PC9wPmA7XHJcbiAgICAgICAgICAgICAgbW9ybmluZy5jbGFzc0xpc3QuYWRkKCdmaWxsZWQnKTsgLy8gTW9ybmluZ1xyXG4gICAgICAgICAgICAgIG1vcm5pbmcuY2xhc3NMaXN0LmFkZCgnc3BsaXRlZCcpOyAvLyBNb3JuaW5nXHJcbiAgICAgICAgICAgICAgYWZ0ZXJub29uLmlubmVySFRNTCA9IGA8cD4ke29wdHMudGltZXRhYmxlW2ldLmJyZWFrLmVuZC5ofToke29wdHMudGltZXRhYmxlW2ldLmJyZWFrLmVuZC5tfSDigJIgJHtvcHRzLnRpbWV0YWJsZVtpXS5jbG9zZS5ofToke29wdHMudGltZXRhYmxlW2ldLmNsb3NlLm19PC9wPmA7XHJcbiAgICAgICAgICAgICAgYWZ0ZXJub29uLmNsYXNzTGlzdC5hZGQoJ2ZpbGxlZCcpOyAvLyBBZnRlcm5vb25cclxuICAgICAgICAgICAgICBhZnRlcm5vb24uY2xhc3NMaXN0LmFkZCgnc3BsaXRlZCcpOyAvLyBBZnRlcm5vb25cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIGlmIChvcHRzLnRpbWV0YWJsZVtpXS5vcGVuLmggJiYgb3B0cy50aW1ldGFibGVbaV0uY2xvc2UuaCkge1xyXG4gICAgICAgICAgICBtb3JuaW5nLmlubmVySFRNTCA9IGA8cD4ke29wdHMudGltZXRhYmxlW2ldLm9wZW4uaH06JHtvcHRzLnRpbWV0YWJsZVtpXS5vcGVuLm19PC9wPmA7XHJcbiAgICAgICAgICAgIG1vcm5pbmcuY2xhc3NMaXN0LmFkZCgnZmlsbGVkJyk7IC8vIE1vcm5pbmdcclxuICAgICAgICAgICAgYWZ0ZXJub29uLmlubmVySFRNTCA9IGA8cD4ke29wdHMudGltZXRhYmxlW2ldLmNsb3NlLmh9OiR7b3B0cy50aW1ldGFibGVbaV0uY2xvc2UubX08L3A+YDtcclxuICAgICAgICAgICAgYWZ0ZXJub29uLmNsYXNzTGlzdC5hZGQoJ2ZpbGxlZCcpOyAvLyBBZnRlcm5vb25cclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG1vcm5pbmcuaW5uZXJIVE1MID0gYDxwPjAwOjAwPC9wPmA7XHJcbiAgICAgICAgICAgIG1vcm5pbmcuY2xhc3NMaXN0LmFkZCgnZmlsbGVkJyk7IC8vIE1vcm5pbmdcclxuICAgICAgICAgICAgYWZ0ZXJub29uLmlubmVySFRNTCA9IGA8cD4yNDowMDwvcD5gO1xyXG4gICAgICAgICAgICBhZnRlcm5vb24uY2xhc3NMaXN0LmFkZCgnZmlsbGVkJyk7IC8vIEFmdGVybm9vblxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBkYXlEb20ubGFzdEVsZW1lbnRDaGlsZC5pbm5lckhUTUwgPSBgPGRpdiBjbGFzcz1cImNsb3NlZFwiPjxwPkZlcm3DqTwvcD48L2Rpdj5gOyAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gTWF0Y2hpbmcgdG9kYXkncyBkYXlcclxuICAgICAgICBpZiAoaSA9PT0gZGF5T2ZXZWVrKSB7XHJcbiAgICAgICAgICBkYXlEb20uY2xhc3NMaXN0LmFkZCgndG9kYXknKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RhbC1vdmVybGF5JykuYXBwZW5kQ2hpbGQoZG9tKTtcclxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsLW92ZXJsYXknKS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG5cdFx0XHRzZXRUaW1lb3V0KCgpID0+IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RhbC1vdmVybGF5Jykuc3R5bGUub3BhY2l0eSA9IDEsIDUwKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNYXBGYWN0b3J5O1xyXG4iLCJleHBvcnQgZGVmYXVsdCBPYmplY3QuZnJlZXplKHtcclxuICByZXN0YXVyYW50OiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvcmVzdGF1cmFudC5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgYmFyOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvYmFyLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBjZWxsYXI6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9jZWxsYXIuc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIHRvYmFjY286IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci90b2JhY2NvLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBncm9jZXJ5OiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvZ3JvY2VyeS5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgZGl5OiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvZGl5LnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBiZWF1dHk6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9iZWF1dHkuc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIGZvb3Q6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9mb290LnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBydWdieTogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL3J1Z2J5LnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBiYXNrZXQ6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9iYXNrZXQuc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIHBvb2w6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9wb29sLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBwaW5ncG9uZzogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL3Bpbmdwb25nLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBza2F0ZTogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL3NrYXRlLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBib2NjZTogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL2JvY2NlLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICB0ZW5uaXM6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci90ZW5uaXMuc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIGJha2VyeTogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL2JyZWFkLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBmaXNoOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvZmlzaC5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgYnV0Y2hlcjogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL2J1dGNoZXIuc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIGJvb2s6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9ib29rLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBtdXNpYzogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL211c2ljLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBsYW5kbWFyazogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL2xhbmRtYXJrLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBjYXN0bGU6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9jYXN0bGUuc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIGNodXJjaDogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL2NodXJjaC5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgdG91cmlzbTogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL3RvdXJpc20uc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIG11c2V1bTogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL211c2V1bS5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgZ2FyZGVuOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvZ2FyZGVuLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBjYXI6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9jYXIuc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIGdhczogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL2dhcy5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgdHJhaW46IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci90cmFpbi5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgYnVzOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvYnVzLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBhbmltYWw6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9hbmltYWwuc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIGRlbnRhbDogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL2RlbnRhbC5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgcGhhcm1hY3k6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9waGFybWFjeS5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgbWVkaWM6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9tZWRpYy5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgbGFiOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbGFiLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBkZWZpYnJpbGxhdG9yOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvZGVmaWJyaWxsYXRvci5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgY2VtZXRlcnk6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9jZW1ldGVyeS5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgZmlyZWZpZ2h0ZXI6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9maXJlZmlnaHRlci5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgcG9saWNlOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvcG9saWNlLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICBtYWlsOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFpbC5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgYmFuazogbmV3IHdpbmRvdy5MLkljb24oe1xyXG4gICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL2Jhbmsuc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjYsIDI2XSxcclxuICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxyXG4gICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxyXG4gICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXHJcbiAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxyXG4gIH0pLFxyXG4gIHBhcms6IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9wYXJrLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICByZWN5Y2xlOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvcmVjeWNsZS5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgYWRtaW5pc3RyYXRpb246IG5ldyB3aW5kb3cuTC5JY29uKHtcclxuICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9hZG1pbmlzdHJhdGlvbi5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXHJcbiAgfSksXHJcbiAgc2Nob29sOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvc2Nob29sLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI2LCAyNl0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcclxuICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcclxuICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxyXG4gICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcclxuICB9KSxcclxuICB1c2VyOiBuZXcgd2luZG93LkwuSWNvbih7XHJcbiAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvdXNlci5zdmcnLFxyXG4gICAgaWNvblNpemU6IFsyNiwgMjZdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXHJcbiAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXHJcbiAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcclxuICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF1cclxuICB9KVxyXG59KTtcclxuIiwiY29uc3QgZ2V0RGlzdGFuY2VCZXR3ZWVuQ29vcmRzID0gKGZyb20sIHRvKSA9PiB7XHJcbiAgLy8gUmV0dXJuIGRpc3RhbmNlIGluIG1ldGVyc1xyXG4gIGNvbnN0IGxvbjEgPSAoZnJvbVsxXSAqIE1hdGguUEkpIC8gMTgwLFxyXG4gICAgbGF0MSA9IChmcm9tWzBdICogTWF0aC5QSSkgLyAxODAsXHJcbiAgICBsb24yID0gKHRvWzFdICogTWF0aC5QSSkgLyAxODAsXHJcbiAgICBsYXQyID0gKHRvWzBdICogTWF0aC5QSSkgLyAxODA7XHJcblxyXG4gIGNvbnN0IGRlbHRhTGF0ID0gbGF0MiAtIGxhdDE7XHJcbiAgY29uc3QgZGVsdGFMb24gPSBsb24yIC0gbG9uMTtcclxuXHJcbiAgY29uc3QgYSA9IE1hdGgucG93KE1hdGguc2luKGRlbHRhTGF0IC8gMiksIDIpICsgTWF0aC5jb3MobGF0MSkgKiBNYXRoLmNvcyhsYXQyKSAqIE1hdGgucG93KE1hdGguc2luKGRlbHRhTG9uIC8gMiksIDIpO1xyXG4gIGNvbnN0IGMgPSAyICogTWF0aC5hc2luKE1hdGguc3FydChhKSk7XHJcbiAgcmV0dXJuIGMgKiA2MzcxICogMTAwMDtcclxufTtcclxuXHJcblxyXG5jb25zdCBjb252ZXJ0RGlzdGFuY2VUb1N0cmluZyA9IGRpc3RhbmNlID0+IHtcclxuICBpZiAoZGlzdGFuY2UgPiAxMDAwKSB7XHJcbiAgICBkaXN0YW5jZSA9IGAke3ByZWNpc2lvblJvdW5kKGRpc3RhbmNlIC8gMTAwMCwgMil9a21gO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBkaXN0YW5jZSA9IGAke3ByZWNpc2lvblJvdW5kKGRpc3RhbmNlLCAyKX1tYDtcclxuICB9XHJcbiAgcmV0dXJuIGRpc3RhbmNlO1xyXG59O1xyXG5cclxuXHJcbmNvbnN0IGJ1aWxkRGlzdGFuY2VFVEEgPSBkaXN0YW5jZSA9PiB7XHJcbiAgbGV0IGNhck1pbnV0ZXMgPSAwO1xyXG4gIGxldCBjYXJTZWNvbmRzID0gMDtcclxuXHJcbiAgaWYgKGRpc3RhbmNlID4gNTAwMDApIHtcclxuICAgIC8vIE92ZXIgNTBrbSwgd2UgdXNlIGF2ZXJhZ2Ugc3BlZWQgb2YgMTAwa21oXHJcbiAgICBjYXJNaW51dGVzID0gKGRpc3RhbmNlIC8gMTAwMDAwKSAqIDYwO1xyXG4gIH0gZWxzZSBpZiAoZGlzdGFuY2UgPiAxMDAwMCkge1xyXG4gICAgLy8gT3ZlciAxMGttLCB3ZSB1c2UgYXZlcmFnZSBzcGVlZCBvZiA2MGttL2hcclxuICAgIGNhck1pbnV0ZXMgPSAoZGlzdGFuY2UgLyA2MDAwMCkgKiA2MDtcclxuICB9IGVsc2Uge1xyXG4gICAgLy8gVW5kZXIgMTBrbSB3ZSB1c2VyIGF2ZXJhZ2Ugc3BlZWQgb2YgMzBrbS9oXHJcbiAgICBjYXJNaW51dGVzID0gKGRpc3RhbmNlIC8gMzAwMDApICogNjA7XHJcbiAgfVxyXG5cclxuICBjYXJTZWNvbmRzID0gY2FyTWludXRlcyAlIDE7IC8vIEtlZXAgZmxvYXRpbmcgdmFsdWUgZm9yIHNlY29uZHMgY29tcHV0aW5nXHJcbiAgY2FyTWludXRlcyA9IE1hdGguZmxvb3IoY2FyTWludXRlcyk7IC8vIFJlbW92ZSBmbG9hdGluZyB2YWx1ZVxyXG5cclxuICBpZiAoY2FyTWludXRlcyA+IDYwKSB7XHJcbiAgICBjYXJNaW51dGVzID0gYCR7TWF0aC5mbG9vcihjYXJNaW51dGVzIC8gNjApfWggJHtjYXJNaW51dGVzICUgNjB9bWA7XHJcbiAgfSBlbHNlIHtcclxuICAgIGNhck1pbnV0ZXMgPSBgJHtjYXJNaW51dGVzfW1gO1xyXG4gIH1cclxuXHJcbiAgbGV0IHdhbGtNaW51dGVzID0gKGRpc3RhbmNlIC8gNTAwMCkgKiA2MDtcclxuICBsZXQgd2Fsa1NlY29uZHMgPSB3YWxrTWludXRlcyAlIDE7XHJcbiAgd2Fsa01pbnV0ZXMgPSBNYXRoLmZsb29yKHdhbGtNaW51dGVzKTsgLy8gUmVtb3ZlIGZsb2F0aW5nIHZhbHVlXHJcblxyXG4gIGlmICh3YWxrTWludXRlcyA+IDYwKSB7XHJcbiAgICB3YWxrTWludXRlcyA9IGAke01hdGguZmxvb3Iod2Fsa01pbnV0ZXMgLyA2MCl9aCAke3dhbGtNaW51dGVzICUgNjB9bWA7XHJcbiAgfSBlbHNlIHtcclxuICAgIHdhbGtNaW51dGVzID0gYCR7d2Fsa01pbnV0ZXN9bWA7XHJcbiAgfSAgXHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBjYXI6IGAke2Nhck1pbnV0ZXN9ICR7TWF0aC5mbG9vcihwcmVjaXNpb25Sb3VuZCgoY2FyU2Vjb25kcyAvIDEwMCkgKiA2MCwgMikgKiAxMDApfXNgLFxyXG4gICAgd2FsazogYCR7d2Fsa01pbnV0ZXN9ICR7TWF0aC5mbG9vcihwcmVjaXNpb25Sb3VuZCgod2Fsa1NlY29uZHMgLyAxMDApICogNjAsIDIpICogMTAwKX1zYCxcclxuICB9O1xyXG59O1xyXG5cclxuXHJcbmNvbnN0IHByZWNpc2lvblJvdW5kID0gKHZhbHVlLCBwcmVjaXNpb24pID0+IHtcclxuICBjb25zdCBtdWx0aXBsaWVyID0gTWF0aC5wb3coMTAsIHByZWNpc2lvbiB8fCAwKTtcclxuICByZXR1cm4gTWF0aC5yb3VuZCh2YWx1ZSAqIG11bHRpcGxpZXIpIC8gbXVsdGlwbGllcjtcclxufTtcclxuXHJcblxyXG5jb25zdCBmZXRjaE1vZGFsID0gKHVybCkgPT4ge1xyXG4gIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuICAgIGZldGNoKGAuL2Fzc2V0cy9odG1sLyR7dXJsfS5odG1sYCkudGhlbihkYXRhID0+IHtcclxuICAgICAgZGF0YS50ZXh0KCkudGhlbihodG1sID0+IHtcclxuICAgICAgICByZXNvbHZlKGRvY3VtZW50LmNyZWF0ZVJhbmdlKCkuY3JlYXRlQ29udGV4dHVhbEZyYWdtZW50KGh0bWwpKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9KTtcclxufTtcclxuXHJcblxyXG5jb25zdCBjbG9zZU1vZGFsID0gKGV2ZW50LCBmb3JjZSkgPT4ge1xyXG4gIGlmIChmb3JjZSA9PT0gdHJ1ZSB8fCBldmVudC50YXJnZXQuaWQgPT09ICdtb2RhbC1vdmVybGF5JyB8fCBldmVudC50YXJnZXQuaWQuaW5kZXhPZignY2xvc2UnKSAhPT0gLTEpIHtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RhbC1vdmVybGF5Jykuc3R5bGUub3BhY2l0eSA9IDA7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsLW92ZXJsYXknKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWwtb3ZlcmxheScpLmlubmVySFRNTCA9ICcnO1xyXG4gICAgfSwgMzAwKTtcclxuICB9XHJcbn07XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIENDREhfQ0VOVEVSOiB7XHJcbiAgICBMQVQ6IDQ4LjUzMTgzOTA2NDQxOTYyLFxyXG4gICAgTE5HOiAyLjA1Mzc1NjcxMzg2NzE4OFxyXG4gIH0sXHJcbiAgQ0NESF9DSVRJRVM6IFsnQlJYJywgJ0NPUicsICdEUkQnLCAnTEZSJywgJ0xHUicsICdSSUMnLCAnUk9WJywgJ1NDRCcsICdTRVInLCAnU1RDJywgJ1ZTRyddLFxyXG4gIE1BUF9CT1VORFM6IHdpbmRvdy5MLmxhdExuZ0JvdW5kcyhcclxuICAgIHdpbmRvdy5MLmxhdExuZyg0LjY3OTQwMDcxNTk2Mzg5NCwgMS43MzkwNjA2Njg5NDUzMTI3KSxcclxuICAgIHdpbmRvdy5MLmxhdExuZyg5OC4zODQzOTA3NDE1MTg2NiwgMi4zNDMzOTU5OTYwOTM3NTApXHJcbiAgKSxcclxuICBPU01fTEFZRVI6IHdpbmRvdy5MLnRpbGVMYXllcignaHR0cHM6Ly97c30udGlsZS5vcGVuc3RyZWV0bWFwLm9yZy97en0ve3h9L3t5fS5wbmcnLCB7XHJcbiAgICBhdHRyaWJ1dGlvbjogJyZjb3B5OyA8YSBocmVmPVwiaHR0cHM6Ly93d3cub3BlbnN0cmVldG1hcC5vcmcvY29weXJpZ2h0XCI+T3BlblN0cmVldE1hcDwvYT4nLFxyXG4gICAgbWF4Wm9vbTogMTksXHJcbiAgICBtaW5ab29tOiAxMVxyXG4gIH0pLFxyXG4gIEVTUklfTEFZRVI6IHdpbmRvdy5MLnRpbGVMYXllcignaHR0cHM6Ly9zZXJ2ZXIuYXJjZ2lzb25saW5lLmNvbS9BcmNHSVMvcmVzdC9zZXJ2aWNlcy9Xb3JsZF9JbWFnZXJ5L01hcFNlcnZlci90aWxlL3t6fS97eX0ve3h9Jywge1xyXG4gICAgYXR0cmlidXRpb246ICcmY29weTsgPGEgaHJlZj1cImh0dHBzOi8vd3d3LmFyY2dpcy5jb20vaG9tZS9pdGVtLmh0bWw/aWQ9MTBkZjIyNzlmOTY4NGU0YTlmNmE3ZjA4ZmViYWMyYTlcIj5Fc3JpIEltYWdlcnk8L2E+JyxcclxuICAgIG1heFpvb206IDE5LFxyXG4gICAgbWluWm9vbTogMTFcclxuICB9KSxcclxuICBnZXREaXN0YW5jZUJldHdlZW5Db29yZHM6IGdldERpc3RhbmNlQmV0d2VlbkNvb3JkcyxcclxuICBjb252ZXJ0RGlzdGFuY2VUb1N0cmluZzogY29udmVydERpc3RhbmNlVG9TdHJpbmcsXHJcbiAgYnVpbGREaXN0YW5jZUVUQTogYnVpbGREaXN0YW5jZUVUQSxcclxuICBwcmVjaXNpb25Sb3VuZDogcHJlY2lzaW9uUm91bmQsXHJcbiAgZmV0Y2hNb2RhbDogZmV0Y2hNb2RhbCxcclxuICBjbG9zZU1vZGFsOiBjbG9zZU1vZGFsXHJcbn07XHJcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICcuLi9zY3NzL0RvdXJkYW5uYWlzRXhwbG9yZS5zY3NzJztcclxuaW1wb3J0IE1hcCBmcm9tICcuL21hcC9NYXAuanMnO1xyXG5pbXBvcnQgVXRpbHMgZnJvbSAnLi91dGlscy9VdGlscy5qcyc7XHJcblxyXG5cclxuY2xhc3MgRG91cmRhbm5haXNFeHBsb3JlIHtcclxuXHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgLy8gTWFwIGludGVybmFsc1xyXG4gICAgdGhpcy5fbWFwID0gbnVsbDtcclxuICAgIC8vIERhdGEgb2JqZWN0XHJcbiAgICB0aGlzLl9jaXR5Qm91bmRzID0ge307XHJcbiAgICB0aGlzLl9jaXR5TWFya2VycyA9IHt9O1xyXG4gICAgdGhpcy5fdHJhbnNwb3J0YXRpb25MaW5lcyA9IHt9O1xyXG4gICAgLy8gVXNlciBvYmplY3RcclxuICAgIHRoaXMuX3VzZXIgPSB7XHJcbiAgICAgIGdlb2xvY2F0aW9uQWxsb3dlZDogZmFsc2UsXHJcbiAgICAgIGxhdDogVXRpbHMuSE9NRV9MQVQsXHJcbiAgICAgIGxuZzogVXRpbHMuSE9NRV9MTkcsXHJcbiAgICAgIGFjY3VyYWN5OiAwLFxyXG4gICAgICBtYXJrZXI6IG51bGxcclxuICAgIH07XHJcbiAgICAvLyBJbml0IGFwcFxyXG4gICAgdGhpcy5faW5pdCgpO1xyXG4gIH1cclxuXHJcblxyXG4gIF9pbml0KCkge1xyXG4gICAgdGhpcy5faW5pdEdlb2xvY2F0aW9uKClcclxuICAgICAgLnRoZW4odGhpcy5faW5pdE1hcC5iaW5kKHRoaXMpKVxyXG4gICAgICAudGhlbih0aGlzLl9pbml0RXZlbnRzLmJpbmQodGhpcykpXHJcbiAgICAgIC50aGVuKHRoaXMuX2ZldGNoQ2l0eUJvdW5kcy5iaW5kKHRoaXMpKSAvLyBGZXRjaCBjaXR5IGJvdW5kc1xyXG4gICAgICAudGhlbih0aGlzLl9idWlsZENpdHlCb3VuZHMuYmluZCh0aGlzKSkgLy8gQnVpbGQgY2l0eSBib3VuZHNcclxuICAgICAgLnRoZW4odGhpcy5fZmV0Y2hDaXR5TWFya2Vycy5iaW5kKHRoaXMpKSAvLyBGZXRjaCBjaXR5IG1hcmtlcnNcclxuICAgICAgLnRoZW4odGhpcy5fYnVpbGRDaXR5TWFya2Vycy5iaW5kKHRoaXMpKSAvLyBCdWlsZCBjaXR5IG1hcmtlcnNcclxuICAgICAgLnRoZW4odGhpcy5fZmV0Y2hUcmFuc3BvcnRhdGlvbkxpbmVzLmJpbmQodGhpcykpIC8vIEZldGNoIHRyYW5zcG9ydGF0aW9uIGxpbmVzXHJcbiAgICAgIC50aGVuKHRoaXMuX2J1aWxkVHJhbnNwb3J0YXRpb25MaW5lcy5iaW5kKHRoaXMpKSAvLyBCdWlsZCB0cmFuc3BvcnRhdGlvbiBsaW5lc1xyXG4gICAgICAudGhlbigoKSA9PiB7IGNvbnNvbGUubG9nKCd3ZSBhcmUgZG9uZScsIHRoaXMpIH0pOyAgICBcclxuICB9XHJcblxyXG5cclxuICAvKiBBcHAgaW5pdGlhbGl6YXRpb24gc2VxdWVuY2UgKi9cclxuXHJcblxyXG4gIF9pbml0R2VvbG9jYXRpb24oKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcblx0XHRcdGlmICgnZ2VvbG9jYXRpb24nIGluIG5hdmlnYXRvcikge1xyXG4gICAgICAgIC8vIFRPRE8gOiBpbiBuZXh0IHZlcnNpb24sIG1ha2UgdGhpcyBhIHByZWYgbG93L2hpZ2ggKHRvZ2dsZSlcclxuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgZW5hYmxlSGlnaEFjY3VyYWN5OiB0cnVlLCAvLyBNb3JlIGNvbnN1cHRpb24sIGJldHRlciBwb3NpdGlvblxyXG4gICAgICAgICAgbWF4aW11bUFnZTogMTAwMCwgLy8gQSBwb3NpdGlvbiB3aWxsIGxhc3QgMXMgbWF4aW11bVxyXG4gICAgICAgICAgdGltZW91dDogOTAwLCAvLyBBIHBvc2l0aW9uIGlzIHVwZGF0ZWQgaW4gMC45cyBtYXhpbXVtXHJcbiAgICAgICAgfTtcclxuICAgICAgICBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKHRoaXMuX3Bvc2l0aW9uSW5pdGlhbGl6ZWQuYmluZCh0aGlzKSwgbnVsbCwgb3B0aW9ucyk7XHJcblx0XHRcdFx0dGhpcy5fd2F0Y2hJZCA9IG5hdmlnYXRvci5nZW9sb2NhdGlvbi53YXRjaFBvc2l0aW9uKHRoaXMuX3Bvc2l0aW9uVXBkYXRlLmJpbmQodGhpcyksIG51bGwsIG9wdGlvbnMpO1xyXG4gICAgICB9XHJcbiAgICAgIC8vIERvbid0IGxvY2sgaW5pdGlhbGl6YXRpb24gd2FpdGluZyBmb3IgcG9zXHJcbiAgICAgIHJlc29sdmUoKTtcclxuXHRcdH0pO1xyXG4gIH1cclxuXHJcblxyXG4gIF9pbml0TWFwKCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xyXG4gICAgICB0aGlzLl9tYXAgPSBuZXcgTWFwKHtcclxuICAgICAgICB0YXJnZXRJZDogJ2NjZGgtbWFwJ1xyXG4gICAgICB9KTtcclxuICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgX2luaXRFdmVudHMoKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICAgIC8vIExpc3RlbmluZyB0byBtb2RhbCBldmVudFxyXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWwtb3ZlcmxheScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgVXRpbHMuY2xvc2VNb2RhbC5iaW5kKHRoaXMpKTtcclxuICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgX2ZldGNoQ2l0eUJvdW5kcygpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuICAgICAgY29uc3QgcHJvbWlzZXMgPSBbXTtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBVdGlscy5DQ0RIX0NJVElFUy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgIHByb21pc2VzLnB1c2gobmV3IFByb21pc2UocmVzb2x2ZUxvY2FsID0+IHtcclxuICAgICAgICAgIGZldGNoKGAuL2Fzc2V0cy9qc29uL2NpdHlib3VuZHMvJHtVdGlscy5DQ0RIX0NJVElFU1tpXX0uanNvbmApLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGRhdGEuanNvbigpLnRoZW4oanNvbkRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgIHRoaXMuX2NpdHlCb3VuZHNbVXRpbHMuQ0NESF9DSVRJRVNbaV1dID0ganNvbkRhdGE7XHJcbiAgICAgICAgICAgICAgcmVzb2x2ZUxvY2FsKCk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKHJlc29sdmVMb2NhbCk7XHJcbiAgICAgICAgICB9KS5jYXRjaChyZXNvbHZlTG9jYWwpO1xyXG4gICAgICAgIH0pKTtcclxuICAgICAgfVxyXG4gICAgICAvLyBHb2luZyB0byBuZXh0IHN0ZXAgb25jZSBhbGwgYm91bmRzIGFyZSBsb2FkZWQgYW5kIHNhdmVkXHJcbiAgICAgIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKHJlc29sdmUpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgX2J1aWxkQ2l0eUJvdW5kcygpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuICAgICAgY29uc3QgcHJvbWlzZXMgPSBbXTtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBVdGlscy5DQ0RIX0NJVElFUy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgIHByb21pc2VzLnB1c2gobmV3IFByb21pc2UocmVzb2x2ZUxvY2FsID0+IHtcclxuICAgICAgICAgIHRoaXMuX21hcC5hZGRQb2x5Z29uKHRoaXMuX2NpdHlCb3VuZHNbVXRpbHMuQ0NESF9DSVRJRVNbaV1dLmJvdW5kcywgVXRpbHMuQ0NESF9DSVRJRVNbaV0pLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVzb2x2ZUxvY2FsKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pKTtcclxuICAgICAgfVxyXG4gICAgICAvLyBHb2luZyB0byBuZXh0IHN0ZXAgb25jZSBhbGwgYm91bmRzIGFyZSBkcmF3biBvbiBtYXBcclxuICAgICAgUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4ocmVzb2x2ZSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG5cclxuICBfZmV0Y2hDaXR5TWFya2VycygpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuICAgICAgY29uc3QgcHJvbWlzZXMgPSBbXTtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBVdGlscy5DQ0RIX0NJVElFUy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgIHByb21pc2VzLnB1c2gobmV3IFByb21pc2UocmVzb2x2ZUxvY2FsID0+IHtcclxuICAgICAgICAgIGZldGNoKGAuL2Fzc2V0cy9qc29uL2NpdHltYXJrZXJzLyR7VXRpbHMuQ0NESF9DSVRJRVNbaV19Lmpzb25gKS50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBkYXRhLmpzb24oKS50aGVuKGpzb25EYXRhID0+IHtcclxuICAgICAgICAgICAgICB0aGlzLl9jaXR5TWFya2Vyc1tVdGlscy5DQ0RIX0NJVElFU1tpXV0gPSBqc29uRGF0YS5tYXJrZXJzO1xyXG4gICAgICAgICAgICAgIHJlc29sdmVMb2NhbCgpO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChyZXNvbHZlTG9jYWwpO1xyXG4gICAgICAgICAgfSkuY2F0Y2gocmVzb2x2ZUxvY2FsKTtcclxuICAgICAgICB9KSk7XHJcbiAgICAgIH1cclxuICAgICAgLy8gR29pbmcgdG8gbmV4dCBzdGVwIG9uY2UgYWxsIG1hcmtlcnMgYXJlIGxvYWRlZCBhbmQgc2F2ZWRcclxuICAgICAgUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4ocmVzb2x2ZSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG5cclxuICBfYnVpbGRDaXR5TWFya2VycygpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuICAgICAgY29uc3QgcHJvbWlzZXMgPSBbXTtcclxuICAgICAgLy8gSXRlcmF0ZSBvdmVyIENDREggY2l0aWVzXHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgVXRpbHMuQ0NESF9DSVRJRVMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAvLyBJdGVyYXRlIG92ZXIgY2l0eSBtYXJrZXJzIGNhdGVnb3JpZXNcclxuICAgICAgICBjb25zdCBjYXRlZ29yaWVzID0gdGhpcy5fY2l0eU1hcmtlcnNbVXRpbHMuQ0NESF9DSVRJRVNbaV1dO1xyXG4gICAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhjYXRlZ29yaWVzKTtcclxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGtleXMubGVuZ3RoOyArK2opIHtcclxuICAgICAgICAgIC8vIEl0ZXJhdGUgb3ZlciBjaXR5J3MgbWFya2Vyc1xyXG4gICAgICAgICAgY29uc3QgbWFya2VycyA9IGNhdGVnb3JpZXNba2V5c1tqXV07XHJcbiAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IG1hcmtlcnMubGVuZ3RoOyArK2spIHtcclxuICAgICAgICAgICAgcHJvbWlzZXMucHVzaChuZXcgUHJvbWlzZShyZXNvbHZlTG9jYWwgPT4ge1xyXG4gICAgICAgICAgICAgIHRoaXMuX21hcC5hZGRNYXJrZXIoe1xyXG4gICAgICAgICAgICAgICAgbWFyazogbWFya2Vyc1trXSxcclxuICAgICAgICAgICAgICAgIHVzZXI6IHRoaXMuX3VzZXJcclxuICAgICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZXNvbHZlTG9jYWwpO1xyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIC8vIEdvaW5nIHRvIG5leHQgc3RlcCBvbmNlIGFsbCBtYXJrZXJzIGFyZSBkcmF3biBvbiBtYXBcclxuICAgICAgUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4ocmVzb2x2ZSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG5cclxuICBfZmV0Y2hUcmFuc3BvcnRhdGlvbkxpbmVzKCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xyXG4gICAgICBmZXRjaChgLi9hc3NldHMvanNvbi90cmFuc3BvcnRhdGlvbi90cmFuc3BvcnRhdGlvbi5qc29uYCkudGhlbihkYXRhID0+IHtcclxuICAgICAgICBkYXRhLmpzb24oKS50aGVuKGpzb25EYXRhID0+IHtcclxuICAgICAgICAgIHRoaXMuX3RyYW5zcG9ydGF0aW9uTGluZXMgPSBqc29uRGF0YTtcclxuICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICB9KS5jYXRjaChyZXNvbHZlKTtcclxuICAgICAgfSkuY2F0Y2gocmVzb2x2ZSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIFxyXG4gIF9idWlsZFRyYW5zcG9ydGF0aW9uTGluZXMoKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICAgIGNvbnN0IHByb21pc2VzID0gW107XHJcbiAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyh0aGlzLl90cmFuc3BvcnRhdGlvbkxpbmVzKTtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgcHJvbWlzZXMucHVzaChuZXcgUHJvbWlzZShyZXNvbHZlTG9jYWwgPT4ge1xyXG4gICAgICAgICAgY29uc3QgbGluZSA9IHRoaXMuX3RyYW5zcG9ydGF0aW9uTGluZXNba2V5c1tpXV07XHJcbiAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGxpbmUuc3RvcHMubGVuZ3RoOyArK2opIHtcclxuICAgICAgICAgICAgdGhpcy5fbWFwLmFkZFRyYW5zcG9ydGF0aW9uU3RvcCh7XHJcbiAgICAgICAgICAgICAgZGF0YTogbGluZSxcclxuICAgICAgICAgICAgICBzdG9wOiBsaW5lLnN0b3BzW2pdXHJcbiAgICAgICAgICAgIH0pLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZXNvbHZlTG9jYWwpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KSk7XHJcbiAgICAgIH1cclxuICAgICAgLy8gR29pbmcgdG8gbmV4dCBzdGVwIG9uY2UgYWxsIG1hcmtlcnMgYXJlIGRyYXduIG9uIG1hcFxyXG4gICAgICBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbihyZXNvbHZlKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qIEdlb2xvYyBjYWxsYmFja3MgKi9cclxuXHJcblxyXG4gIF9wb3NpdGlvbkluaXRpYWxpemVkKCkge1xyXG4gICAgdGhpcy5fdXNlci5nZW9sb2NhdGlvbkFsbG93ZWQgPSB0cnVlO1xyXG4gIH1cclxuXHJcblxyXG4gIF9wb3NpdGlvblVwZGF0ZShwb3NpdGlvbikge1xyXG4gICAgLy8gT25seSBpZiB1c2VyIGFsbG93ZWQgZ2VvbG9jYXRpb247XHJcbiAgICAvLyBTaG91bGQgbmV2ZXIgYmUgZmFsc2Ugd2hlbiBjYWxsZWQgYmFja1xyXG4gICAgaWYgKHRoaXMuX3VzZXIuZ2VvbG9jYXRpb25BbGxvd2VkID09PSB0cnVlKSB7XHJcbiAgICAgIC8vIFVwZGF0ZSBzYXZlZCB1c2VyIHBvc2l0aW9uXHJcbiAgICAgIHRoaXMuX3VzZXIubGF0ID0gcG9zaXRpb24uY29vcmRzLmxhdGl0dWRlO1xyXG4gICAgICB0aGlzLl91c2VyLmxuZyA9IHBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGU7XHJcbiAgICAgIHRoaXMuX3VzZXIuYWNjdXJhY3kgPSBwb3NpdGlvbi5jb29yZHMuYWNjdXJhY3k7XHJcbiAgICAgIC8vIE9ubHkgZHJhdyBtYXJrZXIgaWYgbWFwIGlzIGFscmVhZHkgY3JlYXRlZFxyXG4gICAgICBpZiAodGhpcy5fbWFwKSB7XHJcbiAgICAgICAgdGhpcy5fbWFwLmRyYXdVc2VyTWFya2VyKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG5cclxuLyogU2VhcmNoIG1vZGFsIG1ldGhvZHMgKi9cclxuXHJcbi8qXHJcbiAgX3NlYXJjaE1vZGFsKCkge1xyXG4gICAgdGhpcy5fZmV0Y2hNb2RhbCgnc2VhcmNobW9kYWwnKS50aGVuKGRvbSA9PiB7XHJcbiAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyh0aGlzLl9tYXJrcyk7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgIGRvbS5maXJzdEVsZW1lbnRDaGlsZC5hcHBlbmRDaGlsZCh0aGlzLl9jcmVhdGVNYXJrQ2F0ZWdvcnlTZWFyY2hJY29uKGtleXNbaV0pKTtcclxuICAgICAgfVxyXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWwtb3ZlcmxheScpLmFwcGVuZENoaWxkKGRvbSk7XHJcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RhbC1vdmVybGF5Jykuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcclxuXHRcdFx0c2V0VGltZW91dCgoKSA9PiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWwtb3ZlcmxheScpLnN0eWxlLm9wYWNpdHkgPSAxLCA1MCk7XHJcbiAgICB9KTtcclxuICB9XHJcbiovXHJcblxyXG5cclxuICBnZXQgdXNlcigpIHtcclxuICAgIHJldHVybiB0aGlzLl91c2VyO1xyXG4gIH1cclxuXHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBEb3VyZGFubmFpc0V4cGxvcmU7XHJcbiJdLCJuYW1lcyI6WyJNYXBGYWN0b3J5IiwiTWFya2VycyIsIlV0aWxzIiwid2luZG93IiwidG1wIiwiTWFwIiwib3B0aW9ucyIsIl9jbGFzc0NhbGxDaGVjayIsIl9pZCIsInRhcmdldElkIiwiX21hcCIsIl9sYXllcnMiLCJDYXJ0ZSIsIlNhdGVsbGl0ZSIsIl9tYXJrcyIsIl9wb2x5Z29ucyIsIl9saW5lcyIsIl9pbml0IiwiX2V2ZW50cyIsIl9jcmVhdGVDbGFzcyIsImtleSIsInZhbHVlIiwiTCIsIm1hcCIsInpvb21Db250cm9sIiwic2V0VmlldyIsIkNDREhfQ0VOVEVSIiwiTEFUIiwiTE5HIiwiY29udHJvbCIsInNjYWxlIiwiYWRkVG8iLCJzZXRNYXhCb3VuZHMiLCJNQVBfQk9VTkRTIiwiT1NNX0xBWUVSIiwiRVNSSV9MQVlFUiIsImxheWVycyIsInBvc2l0aW9uIiwiX3RoaXMiLCJvbiIsIl9tYXBDbGlja2VkIiwiYmluZCIsInBhbkluc2lkZUJvdW5kcyIsImFuaW1hdGUiLCJvcHRzIiwiY29uc29sZSIsImxvZyIsImxhdGxuZyIsIkpTT04iLCJzdHJpbmdpZnkiLCJsYXQiLCJsbmciLCJwdXNoIiwiZHJhd1VzZXJNYXJrZXIiLCJkeCIsInVzZXIiLCJtYXJrZXIiLCJpY29uIiwic2V0TGF0TG5nIiwiYWRkUG9seWdvbiIsImlucHV0IiwiaWQiLCJfdGhpczIiLCJQcm9taXNlIiwicmVzb2x2ZSIsInBvbHlnb24iLCJhZGRNYXJrZXIiLCJfdGhpczMiLCJ0eXBlIiwibWFyayIsImZseVRvIiwiYmluZFBvcHVwIiwiY3JlYXRlTWFya2VyUG9wdXAiLCJzdWJ0eXBlcyIsImxlbmd0aCIsImkiLCJhZGRUcmFuc3BvcnRhdGlvblN0b3AiLCJfdGhpczQiLCJzdG9wIiwibGluZSIsInBvbHlsaW5lIiwiZGF0YSIsInBhdGgiLCJjb2xvciIsIndlaWdodCIsInNtb290aEZhY3RvciIsImNyZWF0ZVN0b3BNYXJrZXJQb3B1cCIsInJlbW92ZUZyb20iLCJhZGRMaW5lIiwicG9pbnRzIiwiZG9tIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwidGl0bGUiLCJhZGRyZXNzIiwidG93biIsInBob25lIiwid2Vic2l0ZSIsImluZm8iLCJvcGVuV2l0aCIsImNsYXNzTGlzdCIsImFkZCIsImlubmVySFRNTCIsIm5hbWUiLCJocmVmIiwiY29uY2F0Iiwic2V0QXR0cmlidXRlIiwiYXBwZW5kQ2hpbGQiLCJidXR0b24iLCJtYXJrZXJPcGVuZWRTdGF0ZSIsInRpbWV0YWJsZSIsImFsd2F5c0Nsb3NlZCIsImlzT3BlbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJ0aW1ldGFibGVNb2RhbCIsImxvZ28iLCJkaXIiLCJkbCIsInNyYyIsInRlcm1pbnVzIiwic3RhdGUiLCJtb3JlIiwibWFya2VySXNDbG9zZWQiLCJjaGVja1RpbWUiLCJzZXRJbnRlcnZhbCIsIm1hcmtlcklzT3BlbmVkIiwibm93IiwiRGF0ZSIsImhvdXIiLCJnZXRIb3VycyIsIm1pbnV0ZXMiLCJnZXRNaW51dGVzIiwiZGF5T2ZXZWVrIiwiZ2V0RGF5Iiwib3BlbmluZ1RpbWUiLCJwYXJzZUludCIsIm9wZW4iLCJoIiwibSIsImNsb3NpbmdUaW1lIiwiY2xvc2UiLCJjdXJyZW50VGltZSIsImlzTmFOIiwiaGFzQnJlYWsiLCJzZXZlcmFsIiwiaXNDbG9zZWQiLCJicmVha09wZW5pbmdUaW1lIiwiZW5kIiwiYnJlYWtDbG9zaW5nVGltZSIsInN0YXJ0IiwiYWx3YXlzT3BlbmVkIiwiZmlyc3RDaGlsZCIsImxhc3RDaGlsZCIsInJlbW92ZSIsImZldGNoTW9kYWwiLCJ0aGVuIiwicXVlcnlTZWxlY3RvciIsImRpc3RhbmNlIiwiZ2V0RGlzdGFuY2VCZXR3ZWVuQ29vcmRzIiwiY29udmVydERpc3RhbmNlVG9TdHJpbmciLCJldGEiLCJidWlsZERpc3RhbmNlRVRBIiwiY2FyIiwid2FsayIsImRheURvbSIsImNoaWxkcmVuIiwibW9ybmluZyIsImxhc3RFbGVtZW50Q2hpbGQiLCJmaXJzdEVsZW1lbnRDaGlsZCIsImFmdGVybm9vbiIsImoiLCJkaXYiLCJzdHlsZSIsImJvcmRlclJhZGl1cyIsImp1c3RpZnlDb250ZW50IiwiaW5zZXJ0QmVmb3JlIiwiZ2V0RWxlbWVudEJ5SWQiLCJkaXNwbGF5Iiwic2V0VGltZW91dCIsIm9wYWNpdHkiLCJPYmplY3QiLCJmcmVlemUiLCJyZXN0YXVyYW50IiwiSWNvbiIsImljb25VcmwiLCJpY29uU2l6ZSIsImljb25BbmNob3IiLCJwb3B1cEFuY2hvciIsInNoYWRvd1VybCIsInNoYWRvd1NpemUiLCJzaGFkb3dBbmNob3IiLCJiYXIiLCJjZWxsYXIiLCJ0b2JhY2NvIiwiZ3JvY2VyeSIsImRpeSIsImJlYXV0eSIsImZvb3QiLCJydWdieSIsImJhc2tldCIsInBvb2wiLCJwaW5ncG9uZyIsInNrYXRlIiwiYm9jY2UiLCJ0ZW5uaXMiLCJiYWtlcnkiLCJmaXNoIiwiYnV0Y2hlciIsImJvb2siLCJtdXNpYyIsImxhbmRtYXJrIiwiY2FzdGxlIiwiY2h1cmNoIiwidG91cmlzbSIsIm11c2V1bSIsImdhcmRlbiIsImdhcyIsInRyYWluIiwiYnVzIiwiYW5pbWFsIiwiZGVudGFsIiwicGhhcm1hY3kiLCJtZWRpYyIsImxhYiIsImRlZmlicmlsbGF0b3IiLCJjZW1ldGVyeSIsImZpcmVmaWdodGVyIiwicG9saWNlIiwibWFpbCIsImJhbmsiLCJwYXJrIiwicmVjeWNsZSIsImFkbWluaXN0cmF0aW9uIiwic2Nob29sIiwiZnJvbSIsInRvIiwibG9uMSIsIk1hdGgiLCJQSSIsImxhdDEiLCJsb24yIiwibGF0MiIsImRlbHRhTGF0IiwiZGVsdGFMb24iLCJhIiwicG93Iiwic2luIiwiY29zIiwiYyIsImFzaW4iLCJzcXJ0IiwicHJlY2lzaW9uUm91bmQiLCJjYXJNaW51dGVzIiwiY2FyU2Vjb25kcyIsImZsb29yIiwid2Fsa01pbnV0ZXMiLCJ3YWxrU2Vjb25kcyIsInByZWNpc2lvbiIsIm11bHRpcGxpZXIiLCJyb3VuZCIsInVybCIsImZldGNoIiwidGV4dCIsImh0bWwiLCJjcmVhdGVSYW5nZSIsImNyZWF0ZUNvbnRleHR1YWxGcmFnbWVudCIsImNsb3NlTW9kYWwiLCJldmVudCIsImZvcmNlIiwidGFyZ2V0IiwiaW5kZXhPZiIsIkNDREhfQ0lUSUVTIiwibGF0TG5nQm91bmRzIiwibGF0TG5nIiwidGlsZUxheWVyIiwiYXR0cmlidXRpb24iLCJtYXhab29tIiwibWluWm9vbSIsIkRvdXJkYW5uYWlzRXhwbG9yZSIsIl9jaXR5Qm91bmRzIiwiX2NpdHlNYXJrZXJzIiwiX3RyYW5zcG9ydGF0aW9uTGluZXMiLCJfdXNlciIsImdlb2xvY2F0aW9uQWxsb3dlZCIsIkhPTUVfTEFUIiwiSE9NRV9MTkciLCJhY2N1cmFjeSIsIl9pbml0R2VvbG9jYXRpb24iLCJfaW5pdE1hcCIsIl9pbml0RXZlbnRzIiwiX2ZldGNoQ2l0eUJvdW5kcyIsIl9idWlsZENpdHlCb3VuZHMiLCJfZmV0Y2hDaXR5TWFya2VycyIsIl9idWlsZENpdHlNYXJrZXJzIiwiX2ZldGNoVHJhbnNwb3J0YXRpb25MaW5lcyIsIl9idWlsZFRyYW5zcG9ydGF0aW9uTGluZXMiLCJuYXZpZ2F0b3IiLCJlbmFibGVIaWdoQWNjdXJhY3kiLCJtYXhpbXVtQWdlIiwidGltZW91dCIsImdlb2xvY2F0aW9uIiwiZ2V0Q3VycmVudFBvc2l0aW9uIiwiX3Bvc2l0aW9uSW5pdGlhbGl6ZWQiLCJfd2F0Y2hJZCIsIndhdGNoUG9zaXRpb24iLCJfcG9zaXRpb25VcGRhdGUiLCJfdGhpczUiLCJwcm9taXNlcyIsIl9sb29wIiwicmVzb2x2ZUxvY2FsIiwianNvbiIsImpzb25EYXRhIiwiYWxsIiwiX3RoaXM2IiwiX2xvb3AyIiwiYm91bmRzIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiX3RoaXM3IiwiX2xvb3AzIiwibWFya2VycyIsIl90aGlzOCIsImNhdGVnb3JpZXMiLCJrZXlzIiwiX2xvb3A0IiwiX2xvb3A1IiwiayIsIl90aGlzOSIsIl90aGlzMTAiLCJfbG9vcDYiLCJzdG9wcyIsImNvb3JkcyIsImxhdGl0dWRlIiwibG9uZ2l0dWRlIiwiZ2V0Il0sInNvdXJjZVJvb3QiOiIifQ==
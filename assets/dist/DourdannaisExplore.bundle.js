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
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }



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
          icon: _utils_MarkerEnum_js__WEBPACK_IMPORTED_MODULE_1__["default"].subtypes.user
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
    key: "createMarker",
    value: function createMarker(opts) {
      var _this3 = this;
      return new Promise(function (resolve) {
        var type = opts.mark.type;
        var marker = window.L.marker([opts.mark.lat, opts.mark.lng], {
          icon: _utils_MarkerEnum_js__WEBPACK_IMPORTED_MODULE_1__["default"].subtypes[type]
        }).on('click', function () {
          _this3._map.flyTo([opts.mark.lat, opts.mark.lng], 18);
        });
        marker.bindPopup(_map_MapFactory_js__WEBPACK_IMPORTED_MODULE_0__["default"].createMarkerPopup(opts));
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
    key: "showCategory",
    value: function showCategory(category) {
      var subCategories = _utils_MarkerEnum_js__WEBPACK_IMPORTED_MODULE_1__["default"].types[category];
      for (var i = 0; i < subCategories.length; ++i) {
        this.showSubCategory(subCategories[i]);
      }
    }
  }, {
    key: "showSubCategory",
    value: function showSubCategory(subCategory) {
      var marks = this._marks[subCategory];
      if (marks) {
        for (var i = 0; i < marks.length; ++i) {
          marks[i].addTo(this._map);
        }
      }
    }
  }, {
    key: "hideCategory",
    value: function hideCategory(category) {
      var subCategories = _utils_MarkerEnum_js__WEBPACK_IMPORTED_MODULE_1__["default"].types[category];
      for (var i = 0; i < subCategories.length; ++i) {
        this.hideSubCategory(subCategories[i]);
      }
    }
  }, {
    key: "hideSubCategory",
    value: function hideSubCategory(subCategory) {
      var marks = this._marks[subCategory];
      if (marks) {
        for (var i = 0; i < marks.length; ++i) {
          marks[i].removeFrom(this._map);
        }
      }
    }
  }, {
    key: "addTransportationStop",
    value: function addTransportationStop(opts) {
      var _this4 = this;
      return new Promise(function (resolve) {
        var type = opts.stop.type;
        var marker = window.L.marker([opts.stop.lat, opts.stop.lng], {
          icon: _utils_MarkerEnum_js__WEBPACK_IMPORTED_MODULE_1__["default"].subtypes[type]
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

        //marker.addTo(this._map);

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
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

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

/***/ "./src/js/utils/Evts.js":
/*!******************************!*\
  !*** ./src/js/utils/Evts.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Evts = /*#__PURE__*/function () {
  /** @summary <h1>JavaScript regular and custom events abstraction</h1>
   * @author Arthur Beaulieu
   * @since June 2020
   * @description <blockquote>The Evts class provides an abstraction of JavaScript event listener, to allow
   * easy binding and removing those events. It also provides an interface to register custom events. This class is
   * meant to be used on all scopes you need ; module or global. Refer to each public method for detailed features.
   * For source code, please go to <a href="https://github.com/ArthurBeaulieu/Evts.js" alt="custom-events-js">
   * https://github.com/ArthurBeaulieu/Evts.js</a></blockquote>
   * @param {boolean} [debug=false] - Debug flag ; when true, logs will be output in JavaScript console at each event */
  function Evts() {
    var debug = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    _classCallCheck(this, Evts);
    // Prevent wrong type for debug
    if (typeof debug !== 'boolean') {
      debug = false;
    }
    /** @private
     * @member {boolean} - Internal logging flag from constructor options, allow to output each event action */
    this._debug = debug;
    /** @private
     * @member {number} - Start the ID incrementer at pseudo random value, used for both regular and custom events */
    this._idIncrementor = Math.floor(Math.random() * Math.floor(256)) * 5678;
    /** @private
     * @member {any[]} - We store classical event listeners in array of objects containing all their information */
    this._regularEvents = [];
    /** @private
     * @member {object} - We store custom events by name as key, each key stores an Array of subscribed events */
    this._customEvents = {};
    /** @public
     * @member {string} - Component version */
    this.version = '1.2.1';
  }

  /** @method
   * @name destroy
   * @public
   * @memberof Evts
   * @description <blockquote>Evts destructor. Will remove all event listeners and keys in instance.</blockquote> */
  _createClass(Evts, [{
    key: "destroy",
    value: function destroy() {
      var _this = this;
      // Debug logging
      this._raise('log', 'Evts.destroy');
      // Remove all existing eventListener
      this.removeAllEvents();
      // Delete object attributes
      Object.keys(this).forEach(function (key) {
        delete _this[key];
      });
    }

    /*  --------------------------------------------------------------------------------------------------------------- */
    /*  --------------------------------------  CLASSIC JS EVENTS OVERRIDE  ------------------------------------------  */
    /*                                                                                                                  */
    /*  The following methods are made to abstract the event listeners from the JavaScript layer, so you can easily     */
    /*  remove them when done using, without bothering with binding usual business for them. 'addEvent/removeEvent'     */
    /*  method replace the initial ones. 'removeAllEvents' clears all instance event listeners ; nice for destroy       */
    /*  --------------------------------------------------------------------------------------------------------------- */

    /** @method
     * @name addEvent
     * @public
     * @memberof Evts
     * @description <blockquote><code>addEvent</code> method abstracts the <code>addEventListener</code> method to easily
     * remove it when needed, also to set a custom scope on callback.</blockquote>
     * @param {string} eventName - The event name to fire (mousemove, click, context etc.)
     * @param {object} element - The DOM element to attach the listener to
     * @param {function} callback - The callback function to execute when event is realised
     * @param {object} [scope=element] - The event scope to apply to the callback (optional, default to DOM element)
     * @param {object|boolean} [options=false] - The event options (useCapture and else)
     * @returns {number|boolean} - The event ID to use to manually remove an event, false if arguments are invalid */
  }, {
    key: "addEvent",
    value: function addEvent(eventName, element, callback) {
      var _this2 = this;
      var scope = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : element;
      var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      // Debug logging
      this._raise('log', "Evts.addEvent: ".concat(eventName, " ").concat(element, " ").concat(callback, " ").concat(scope, " ").concat(options));
      // Missing mandatory arguments
      if (eventName === null || eventName === undefined || element === null || element === undefined || callback === null || callback === undefined) {
        this._raise('error', 'Evts.addEvent: Missing mandatory arguments');
        return false;
      }
      // Prevent wrong type for arguments (mandatory and optional)
      var err = function err() {
        _this2._raise('error', 'Evts.addEvent: Wrong type for argument');
      };
      // Test argument validity for further process
      if (typeof eventName !== 'string' || _typeof(element) !== 'object' || typeof callback !== 'function') {
        err();
        return false;
      }
      if (scope !== null && scope !== undefined && _typeof(scope) !== 'object') {
        err();
        return false;
      }
      if (options !== null && options !== undefined && _typeof(options) !== 'object' && typeof options !== 'boolean') {
        err();
        return false;
      }
      // Save scope to callback function, default scope is DOM target object
      callback = callback.bind(scope);
      // Add event to internal array and keep all its data
      this._regularEvents.push({
        id: this._idIncrementor,
        element: element,
        eventName: eventName,
        scope: scope,
        callback: callback,
        options: options
      });
      // Add event listener with options
      element.addEventListener(eventName, callback, options);
      // Post increment to return the true event entry id, then update the incrementer
      return this._idIncrementor++;
    }

    /** @method
     * @name removeEvent
     * @public
     * @memberof Evts
     * @description <blockquote><code>removeEvent</code> method abstracts the <code>removeEventListener</code> method to
     * really remove event listeners.</blockquote>
     * @param {number} eventId - The event ID to remove listener from. Returned when addEvent is called
     * @returns {boolean} - The method status ; true for success, false for non-existing event */
  }, {
    key: "removeEvent",
    value: function removeEvent(eventId) {
      // Debug logging
      this._raise('log', "Events.removeEvent: ".concat(eventId));
      // Missing mandatory arguments
      if (eventId === null || eventId === undefined) {
        this._raise('error', 'Evts.removeEvent: Missing mandatory arguments');
        return false;
      }
      // Prevent wrong type for arguments (mandatory)
      if (typeof eventId !== 'number') {
        this._raise('error', 'Evts.removeEvent: Wrong type for argument');
        return false;
      }
      // Returned value
      var statusCode = false; // Not found status code by default (false)
      // Iterate over saved listeners, reverse order for proper splicing
      for (var i = this._regularEvents.length - 1; i >= 0; --i) {
        // If an event ID match in saved ones, we remove it and update saved listeners
        if (this._regularEvents[i].id === eventId) {
          // Update status code
          statusCode = true; // Found and removed event listener status code (true)
          this._clearRegularEvent(i);
        }
      }
      // Return with status code
      return statusCode;
    }

    /** @method
     * @name removeAllEvents
     * @public
     * @memberof Evts
     * @description <blockquote>Clear all event listener registered through this class object.</blockquote>
     * @returns {boolean} - The method status ; true for success, false for not removed any event */
  }, {
    key: "removeAllEvents",
    value: function removeAllEvents() {
      // Debug logging
      this._raise('log', 'Evts.removeAllEvents');
      // Returned value
      var statusCode = false; // Didn't removed any status code by default (false)
      // Flag to know if there was any previously stored event listeners
      var hadEvents = this._regularEvents.length > 0;
      // Iterate over saved listeners, reverse order for proper splicing
      for (var i = this._regularEvents.length - 1; i >= 0; --i) {
        this._clearRegularEvent(i);
      }
      // If all events where removed, update statusCode to success
      if (this._regularEvents.length === 0 && hadEvents) {
        // Update status code
        statusCode = true; // Found and removed all events listener status code (true)
      }
      // Return with status code
      return statusCode;
    }

    /** @method
     * @name _clearRegularEvent
     * @private
     * @memberof Evts
     * @description <blockquote><code>_clearRegularEvent</code> method remove the saved event listener for a
     * given index in regularEvents array range.</blockquote>
     * @param {number} index - The regular event index to remove from class attributes
     * @return {boolean} - The method status ; true for success, false for not cleared any event */
  }, {
    key: "_clearRegularEvent",
    value: function _clearRegularEvent(index) {
      // Debug logging
      this._raise('log', "Evts._clearRegularEvent: ".concat(index));
      // Missing mandatory arguments
      if (index === null || index === undefined) {
        this._raise('error', 'Evts._clearRegularEvent: Missing mandatory argument');
        return false;
      }
      // Prevent wrong type for arguments (mandatory)
      if (typeof index !== 'number') {
        this._raise('error', 'Evts._clearRegularEvent: Wrong type for argument');
        return false;
      }
      // Check if index match an existing event in attributes
      if (this._regularEvents[index]) {
        // Remove its event listener and update regularEvents array
        var evt = this._regularEvents[index];
        evt.element.removeEventListener(evt.eventName, evt.callback, evt.options);
        this._regularEvents.splice(index, 1);
        return true;
      }
      return false;
    }

    /*  --------------------------------------------------------------------------------------------------------------- */
    /*  -------------------------------------------  CUSTOM JS EVENTS  -----------------------------------------------  */
    /*                                                                                                                  */
    /*  The three following methods (subscribe, unsubscribe, publish) are designed to reference an event by its name    */
    /*  and handle as many subscriptions as you want. When subscribing, you get an ID you can use to unsubscribe your   */
    /*  event later. Just publish with the event name to callback all its registered subscriptions.                     */
    /*  --------------------------------------------------------------------------------------------------------------- */

    /** @method
     * @name subscribe
     * @public
     * @memberof Evts
     * @description <blockquote>Subscribe method allow you to listen to an event and react when it occurs.</blockquote>
     * @param {string} eventName - Event name (the one to use to publish)
     * @param {function} callback - The callback to execute when event is published
     * @param {boolean} [oneShot=false] - One shot : to remove subscription the first time callback is fired
     * @returns {number|boolean} - The event id, to be used when manually unsubscribing */
  }, {
    key: "subscribe",
    value: function subscribe(eventName, callback) {
      var _this3 = this;
      var oneShot = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      // Debug logging
      this._raise('log', "Evts.subscribe: ".concat(eventName, " ").concat(callback, " ").concat(oneShot));
      // Missing mandatory arguments
      if (eventName === null || eventName === undefined || callback === null || callback === undefined) {
        this._raise('error', 'Evts.subscribe', 'Missing mandatory arguments');
        return false;
      }
      // Prevent wrong type for arguments (mandatory and optional)
      var err = function err() {
        _this3._raise('error', 'Evts.subscribe: Wrong type for argument');
      };
      if (typeof eventName !== 'string' || typeof callback !== 'function') {
        err();
        return false;
      }
      if (oneShot !== null && oneShot !== undefined && typeof oneShot !== 'boolean') {
        err();
        return false;
      }
      // Create event entry if not already existing in the registered events
      if (!this._customEvents[eventName]) {
        this._customEvents[eventName] = []; // Set empty array for new event subscriptions
      }
      // Push new subscription for event name
      this._customEvents[eventName].push({
        id: this._idIncrementor,
        name: eventName,
        os: oneShot,
        callback: callback
      });
      // Post increment to return the true event entry id, then update the incrementer
      return this._idIncrementor++;
    }

    /** @method
     * @name unsubscribe
     * @public
     * @memberof Evts
     * @description <blockquote>Unsubscribe method allow you to revoke an event subscription from its string name.</blockquote>
     * @param {number} eventId - The subscription id returned when subscribing to an event name
     * @returns {boolean} - The method status ; true for success, false for non-existing subscription **/
  }, {
    key: "unsubscribe",
    value: function unsubscribe(eventId) {
      // Debug logging
      this._raise('log', "Evts.unsubscribe: ".concat(eventId));
      // Missing mandatory arguments
      if (eventId === null || eventId === undefined) {
        this._raise('error', 'Evts.unsubscribe: Missing mandatory arguments');
        return false;
      }
      // Prevent wrong type for arguments (mandatory)
      if (typeof eventId !== 'number') {
        this._raise('error', 'Evts.unsubscribe: Wrong type for argument');
        return false;
      }
      // Returned value
      var statusCode = false; // Not found status code by default (false)
      // Save event keys to iterate properly on this._events Object
      var keys = Object.keys(this._customEvents);
      // Reverse events iteration to properly splice without messing with iteration order
      for (var i = keys.length - 1; i >= 0; --i) {
        // Get event subscriptions
        var subs = this._customEvents[keys[i]];
        // Iterate over events subscriptions to find the one with given id
        for (var j = 0; j < subs.length; ++j) {
          // In case we got a subscription for this events
          if (subs[j].id === eventId) {
            // Debug logging
            this._raise('log', "Evts.unsubscribe: subscription found\n", subs[j], "\nSubscription n\xB0".concat(eventId, " for ").concat(subs.name, " has been removed"));
            // Update status code
            statusCode = true; // Found and unsubscribed status code (true)
            // Remove subscription from event Array
            subs.splice(j, 1);
            // Remove event name if no remaining subscriptions
            if (subs.length === 0) {
              delete this._customEvents[keys[i]];
            }
            // Break since id are unique and no other subscription can be found after
            break;
          }
        }
      }
      // Return with status code
      return statusCode;
    }

    /** @method
     * @name unsubscribeAllFor
     * @public
     * @memberof Evts
     * @description <blockquote><code>unsubscribeAllFor</code> method clear all subscriptions registered for given event name.</blockquote>
     * @param {string} eventName - The event to clear subscription from
     * @returns {boolean} - The method status ; true for success, false for non-existing event **/
  }, {
    key: "unsubscribeAllFor",
    value: function unsubscribeAllFor(eventName) {
      // Debug logging
      this._raise('log', "Evts.unsubscribeAllFor: ".concat(eventName));
      // Missing mandatory arguments
      if (eventName === null || eventName === undefined) {
        this._raise('error', 'Evts.unsubscribeAllFor: Missing mandatory arguments');
        return false;
      }
      // Prevent wrong type for arguments (mandatory and optional)
      if (typeof eventName !== 'string') {
        this._raise('error', 'Evts.unsubscribeAllFor: Wrong type for argument');
        return false;
      }
      // Returned value
      var statusCode = false; // Not found status code by default (false)
      // Save event keys to iterate properly on this._events Object
      var keys = Object.keys(this._customEvents);
      // Iterate through custom event keys to find matching event to remove
      for (var i = 0; i < keys.length; ++i) {
        if (keys[i] === eventName) {
          // Get event subscriptions
          var subs = this._customEvents[keys[i]];
          // Iterate over events subscriptions to find the one with given id, reverse iteration to properly splice without messing with iteration order
          for (var j = subs.length - 1; j >= 0; --j) {
            // Update status code
            statusCode = true; // Found and unsubscribed all status code (true)
            // Remove subscription from event Array
            subs.splice(j, 1);
            // Remove event name if no remaining subscriptions
            if (subs.length === 0) {
              delete this._customEvents[keys[i]];
            }
          }
        }
      }
      // Return with status code
      return statusCode;
    }

    /** @method
     * @name publish
     * @public
     * @memberof Evts
     * @description <blockquote><code>Publish</code> method allow you to fire an event by name and trigger all its subscription by callbacks./blockquote>
     * @param {string} eventName - Event name (the one to use to publish)
     * @param {object} [data=undefined] - The data object to sent through the custom event
     * @returns {boolean} - The method status ; true for success, false for non-existing event **/
  }, {
    key: "publish",
    value: function publish(eventName) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      // Debug logging
      this._raise('log', "Evts.publish: ".concat(eventName, " ").concat(data));
      // Missing mandatory arguments
      if (eventName === null || eventName === undefined) {
        this._raise('error', 'Evts.publish: Missing mandatory arguments');
        return false;
      }
      // Prevent wrong type for arguments (mandatory and optional)
      if (typeof eventName !== 'string' || data !== undefined && _typeof(data) !== 'object') {
        this._raise('error', 'Evts.publish: Wrong type for argument');
        return false;
      }
      // Returned value
      var statusCode = false; // Not found status code by default (false)
      // Save event keys to iterate properly on this._events Object
      var keys = Object.keys(this._customEvents);
      // Iterate over saved custom events
      for (var i = 0; i < keys.length; ++i) {
        // If published name match an existing events, we iterate its subscriptions. First subscribed, first served
        if (keys[i] === eventName) {
          // Update status code
          statusCode = true; // Found and published status code (true)
          // Get event subscriptions
          var subs = this._customEvents[keys[i]];
          // Iterate over events subscriptions to find the one with given id
          // Reverse subscriptions iteration to properly splice without messing with iteration order
          for (var j = subs.length - 1; j >= 0; --j) {
            // Debug logging
            this._raise('log', "Evts.publish: fire callback for ".concat(eventName, ", subscription n\xB0").concat(subs[j].id), subs[j]);
            // Fire saved callback
            subs[j].callback(data);
            // Remove oneShot listener from event entry
            if (subs[j].os) {
              // Debug logging
              this._raise('log', 'Evts.publish: remove subscription because one shot usage is done');
              subs.splice(j, 1);
              // Remove event name if no remaining subscriptions
              if (subs.length === 0) {
                delete this._customEvents[keys[i]];
              }
            }
          }
        }
      }
      // Return with status code
      return statusCode;
    }

    /*  --------------------------------------------------------------------------------------------------------------- */
    /*  --------------------------------------------  COMPONENT UTILS  -----------------------------------------------  */
    /*  --------------------------------------------------------------------------------------------------------------- */

    /** @method
     * @name _raise
     * @private
     * @memberof Evts
     * @description <blockquote>Internal method to abstract console wrapped in debug flag./blockquote>
     * @param {string} level - The console method to call
     * @param {string} errorValue - The error value to display in console method **/
  }, {
    key: "_raise",
    value: function _raise(level, errorValue) {
      if (this._debug) {
        console[level](errorValue);
      }
    }
  }]);
  return Evts;
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Evts);

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
  types: {
    service: ['administration', 'bank', 'book', 'cemetery', 'firefighter', 'mail', 'music', 'police', 'school'],
    care: ['animal', 'defibrillator', 'dental', 'lab', 'medic', 'pharmacy'],
    catering: ['bar', 'cellar', 'restaurant', 'tobacco'],
    sport: ['basket', 'bocce', 'foot', 'pingpong', 'pool', 'rugby', 'skate', 'tennis'],
    shop: ['beauty', 'bakery', 'butcher', 'diy', 'fish', 'garden', 'grocery'],
    nature: ['park', 'recycle'],
    transport: ['bus', 'car', 'gas', 'train'],
    tourism: ['castle', 'church', 'landmark', 'museum', 'tourism']
  },
  subtypes: {
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
      iconUrl: 'assets/img/marker/bakery.svg',
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
  }
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
/* harmony import */ var _utils_MarkerEnum_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/MarkerEnum.js */ "./src/js/utils/MarkerEnum.js");
/* harmony import */ var _map_Map_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./map/Map.js */ "./src/js/map/Map.js");
/* harmony import */ var _utils_Evts_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/Evts.js */ "./src/js/utils/Evts.js");
/* harmony import */ var _utils_Utils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/Utils.js */ "./src/js/utils/Utils.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }





window.Evts = new _utils_Evts_js__WEBPACK_IMPORTED_MODULE_3__["default"]();
var DourdannaisExplore = /*#__PURE__*/function () {
  function DourdannaisExplore() {
    _classCallCheck(this, DourdannaisExplore);
    // Map internals
    this._map = null;
    // Data object
    this._cityBounds = {};
    this._cityMarkers = {};
    this._transportationLines = {};
    // Used for markers
    this._displayedCategories = [];
    this._markerTokens = [];
    // User object
    this._user = {
      geolocationAllowed: false,
      lat: _utils_Utils_js__WEBPACK_IMPORTED_MODULE_4__["default"].HOME_LAT,
      lng: _utils_Utils_js__WEBPACK_IMPORTED_MODULE_4__["default"].HOME_LNG,
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
        _this3._map = new _map_Map_js__WEBPACK_IMPORTED_MODULE_2__["default"]({
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
        document.getElementById('clear-filters').addEventListener('click', _this4._clearFilters.bind(_this4));
        document.getElementById('modal-overlay').addEventListener('click', _utils_Utils_js__WEBPACK_IMPORTED_MODULE_4__["default"].closeModal.bind(_this4));
        var items = document.getElementById('marker-selector').children;
        for (var i = 0; i < items.length; ++i) {
          items[i].addEventListener('click', _this4._markerCategoryClicked.bind(_this4, items[i]));
        }
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
            fetch("./assets/json/citybounds/".concat(_utils_Utils_js__WEBPACK_IMPORTED_MODULE_4__["default"].CCDH_CITIES[i], ".json")).then(function (data) {
              data.json().then(function (jsonData) {
                _this5._cityBounds[_utils_Utils_js__WEBPACK_IMPORTED_MODULE_4__["default"].CCDH_CITIES[i]] = jsonData;
                resolveLocal();
              })["catch"](resolveLocal);
            })["catch"](resolveLocal);
          }));
        };
        for (var i = 0; i < _utils_Utils_js__WEBPACK_IMPORTED_MODULE_4__["default"].CCDH_CITIES.length; ++i) {
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
            _this6._map.addPolygon(_this6._cityBounds[_utils_Utils_js__WEBPACK_IMPORTED_MODULE_4__["default"].CCDH_CITIES[i]].bounds, _utils_Utils_js__WEBPACK_IMPORTED_MODULE_4__["default"].CCDH_CITIES[i]).then(function () {
              requestAnimationFrame(resolveLocal);
            });
          }));
        };
        for (var i = 0; i < _utils_Utils_js__WEBPACK_IMPORTED_MODULE_4__["default"].CCDH_CITIES.length; ++i) {
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
            fetch("./assets/json/citymarkers/".concat(_utils_Utils_js__WEBPACK_IMPORTED_MODULE_4__["default"].CCDH_CITIES[i], ".json")).then(function (data) {
              data.json().then(function (jsonData) {
                _this7._cityMarkers[_utils_Utils_js__WEBPACK_IMPORTED_MODULE_4__["default"].CCDH_CITIES[i]] = jsonData.markers;
                resolveLocal();
              })["catch"](resolveLocal);
            })["catch"](resolveLocal);
          }));
        };
        for (var i = 0; i < _utils_Utils_js__WEBPACK_IMPORTED_MODULE_4__["default"].CCDH_CITIES.length; ++i) {
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
        for (var i = 0; i < _utils_Utils_js__WEBPACK_IMPORTED_MODULE_4__["default"].CCDH_CITIES.length; ++i) {
          // Iterate over city markers categories
          var categories = _this8._cityMarkers[_utils_Utils_js__WEBPACK_IMPORTED_MODULE_4__["default"].CCDH_CITIES[i]];
          var keys = Object.keys(categories);
          var _loop4 = function _loop4() {
            // Iterate over city's markers
            var markers = categories[keys[j]];
            var _loop5 = function _loop5(k) {
              promises.push(new Promise(function (resolveLocal) {
                _this8._map.createMarker({
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

    /* Marker toggling clicked */
  }, {
    key: "_markerCategoryClicked",
    value: function _markerCategoryClicked(e) {
      e.classList.toggle('activated');
      if (e.classList.contains('activated')) {
        this._showCategory(e.dataset.type);
      } else {
        this._hideCategory(e.dataset.type);
      }
    }
  }, {
    key: "_showCategory",
    value: function _showCategory(category) {
      this._map.showCategory(category);
      var subcategories = _utils_MarkerEnum_js__WEBPACK_IMPORTED_MODULE_1__["default"].types[category];
      for (var i = 0; i < subcategories.length; ++i) {
        var element = document.createElement('IMG');
        element.src = "./assets/img/marker/".concat(subcategories[i], ".svg");
        element.dataset.type = subcategories[i];
        document.getElementById('subitems-wrapper').appendChild(element);
        this._markerTokens.push(window.Evts.addEvent('click', element, this._markerTypeClicked, {
          scope: this,
          element: element
        }));
      }
      // Append global category to displayed array
      this._displayedCategories.push(category);
      document.getElementById('subitems-wrapper').classList.add('show');
      document.getElementById('clear-filters').classList.add('active');
    }
  }, {
    key: "_hideCategory",
    value: function _hideCategory(category) {
      this._map.hideCategory(category);
      this._displayedCategories.splice(this._displayedCategories.indexOf(category), 1);
      if (this._displayedCategories.length === 0) {
        document.getElementById('subitems-wrapper').classList.remove('show');
        for (var i = 0; i < this._markerTokens.length; ++i) {
          window.Evts.removeEvent(this._markerTokens[i]);
        }
        document.getElementById('clear-filters').classList.remove('active');
      }
      this._clearSpecificMarkers(category);
    }
  }, {
    key: "_markerTypeClicked",
    value: function _markerTypeClicked() {
      // Specific binding of this, see caller
      var e = this.element;
      e.classList.toggle('deactivated');
      if (e.classList.contains('deactivated')) {
        this.scope._map.hideSubCategory(e.dataset.type);
      } else {
        this.scope._map.showSubCategory(e.dataset.type);
      }
    }

    // Method to remove items from navbar
  }, {
    key: "_clearSpecificMarkers",
    value: function _clearSpecificMarkers(type) {
      var children = document.getElementById('subitems-wrapper').children;
      for (var i = children.length - 1; i >= 0; --i) {
        if (_utils_MarkerEnum_js__WEBPACK_IMPORTED_MODULE_1__["default"].types[type].indexOf(children[i].dataset.type) !== -1) {
          document.getElementById('subitems-wrapper').removeChild(children[i]);
        }
      }
    }
  }, {
    key: "_clearFilters",
    value: function _clearFilters() {
      if (document.getElementById('clear-filters').classList.contains('active')) {
        document.getElementById('clear-filters').classList.remove('active');
        var keys = Object.keys(_utils_MarkerEnum_js__WEBPACK_IMPORTED_MODULE_1__["default"].types);
        for (var i = 0; i < keys.length; ++i) {
          this._hideCategory(keys[i]);
        }
        var items = document.getElementById('marker-selector').children;
        for (var _i = 0; _i < items.length; ++_i) {
          items[_i].classList.remove('activated');
        }
      }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VSxJQUFJLEVBQUU7VUFDYixJQUFJLENBQUNBLElBQUksQ0FBQzJDLGNBQWMsQ0FBQyxDQUFDO1FBQzVCO01BQ0Y7SUFDRjs7SUFHRjs7SUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtFQVpBO0lBQUFqQyxHQUFBO0lBQUFnWSxHQUFBLEVBZUUsU0FBQUEsSUFBQSxFQUFXO01BQ1QsT0FBTyxJQUFJLENBQUMvRCxLQUFLO0lBQ25CO0VBQUM7RUFBQSxPQUFBTixrQkFBQTtBQUFBO0FBS0gsaUVBQWVBLGtCQUFrQixFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vRG91cmRhbm5haXNFeHBsb3JlLy4vc3JjL2pzL21hcC9NYXAuanMiLCJ3ZWJwYWNrOi8vRG91cmRhbm5haXNFeHBsb3JlLy4vc3JjL2pzL21hcC9NYXBGYWN0b3J5LmpzIiwid2VicGFjazovL0RvdXJkYW5uYWlzRXhwbG9yZS8uL3NyYy9qcy91dGlscy9FdnRzLmpzIiwid2VicGFjazovL0RvdXJkYW5uYWlzRXhwbG9yZS8uL3NyYy9qcy91dGlscy9NYXJrZXJFbnVtLmpzIiwid2VicGFjazovL0RvdXJkYW5uYWlzRXhwbG9yZS8uL3NyYy9qcy91dGlscy9VdGlscy5qcyIsIndlYnBhY2s6Ly9Eb3VyZGFubmFpc0V4cGxvcmUvLi9zcmMvc2Nzcy9Eb3VyZGFubmFpc0V4cGxvcmUuc2NzcyIsIndlYnBhY2s6Ly9Eb3VyZGFubmFpc0V4cGxvcmUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vRG91cmRhbm5haXNFeHBsb3JlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9Eb3VyZGFubmFpc0V4cGxvcmUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9Eb3VyZGFubmFpc0V4cGxvcmUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9Eb3VyZGFubmFpc0V4cGxvcmUvLi9zcmMvanMvRG91cmRhbm5haXNFeHBsb3JlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBNYXBGYWN0b3J5IGZyb20gJy4uL21hcC9NYXBGYWN0b3J5LmpzJztcbmltcG9ydCBNYXJrZXJzIGZyb20gJy4uL3V0aWxzL01hcmtlckVudW0uanMnO1xuaW1wb3J0IFV0aWxzIGZyb20gJy4uL3V0aWxzL1V0aWxzLmpzJztcbndpbmRvdy50bXA9IFtdO1xuXG5jbGFzcyBNYXAge1xuXG5cbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHRoaXMuX2lkID0gb3B0aW9ucy50YXJnZXRJZDtcbiAgICB0aGlzLl9tYXAgPSBudWxsXG5cbiAgICB0aGlzLl9sYXllcnMgPSB7XG4gICAgICBDYXJ0ZTogbnVsbCxcbiAgICAgIFNhdGVsbGl0ZTogbnVsbFxuICAgIH07XG5cbiAgICB0aGlzLl9tYXJrcyA9IHt9O1xuICAgIHRoaXMuX3BvbHlnb25zID0ge307XG4gICAgdGhpcy5fbGluZXMgPSBbXTtcblxuICAgIHRoaXMuX2luaXQoKTtcbiAgICB0aGlzLl9ldmVudHMoKTtcbiAgfVxuXG5cbiAgX2luaXQoKSB7XG4gICAgLy8gVXNlIG1haW4gZGl2IHRvIGluamVjdCBPU00gaW50b1xuICAgIHRoaXMuX21hcCA9IHdpbmRvdy5MLm1hcCh0aGlzLl9pZCwge1xuICAgICAgem9vbUNvbnRyb2w6IGZhbHNlLFxuICAgIH0pLnNldFZpZXcoW1V0aWxzLkNDREhfQ0VOVEVSLkxBVCwgVXRpbHMuQ0NESF9DRU5URVIuTE5HXSwgMTIpO1xuICAgIC8vIEFkZCBtZXRlciBhbmQgZmVldCBzY2FsZSBvbiBtYXBcbiAgICB3aW5kb3cuTC5jb250cm9sLnNjYWxlKCkuYWRkVG8odGhpcy5fbWFwKTtcbiAgICAvLyBQcmV2ZW50IHBhbm5pbmcgb3V0c2lkZSBvZiB0aGUgbWFwIGJvdW5kcyBkZWZpbmluZWQgaW4gdXRpbHNcbiAgICB0aGlzLl9tYXAuc2V0TWF4Qm91bmRzKFV0aWxzLk1BUF9CT1VORFMpO1xuICAgIC8vIEFkZCBsYXllciBncm91cCB0byBpbnRlcmZhY2UgYW5kIHN0YXJ0IG1hcCB3aXRoIG9zbSBkZWZhdWx0XG4gICAgdGhpcy5fbGF5ZXJzLkNhcnRlID0gVXRpbHMuT1NNX0xBWUVSO1xuICAgIHRoaXMuX2xheWVycy5TYXRlbGxpdGUgPSBVdGlscy5FU1JJX0xBWUVSO1xuICAgIHRoaXMuX2xheWVycy5DYXJ0ZS5hZGRUbyh0aGlzLl9tYXApO1xuICAgIC8vIEFkZCBsYXllciBzd2l0Y2ggcmFkaW8gb24gYm90dG9tIHJpZ2h0IG9mIHRoZSBtYXBcbiAgICB3aW5kb3cuTC5jb250cm9sLmxheWVycyh0aGlzLl9sYXllcnMsIHt9LCB7IHBvc2l0aW9uOiAnYm90dG9tcmlnaHQnIH0pLmFkZFRvKHRoaXMuX21hcCk7XG4gIH1cblxuXG4gIF9ldmVudHMoKSB7XG4gICAgLy8gU3Vic2NyaWJlIHRvIGNsaWNrIGV2ZW50IG9uIG1hcCB0byByZWFjdFxuICAgIHRoaXMuX21hcC5vbignY2xpY2snLCB0aGlzLl9tYXBDbGlja2VkLmJpbmQodGhpcykpO1xuICAgIC8vIE1hcCBpcyBkcmFnZ2VkIGJ5IHVzZXIgbW91c2UvZmluZ2VyXG4gICAgdGhpcy5fbWFwLm9uKCdkcmFnJywgKCkgPT4ge1xuICAgICAgLy8gQ29uc3RyYWluIHBhbiB0byB0aGUgbWFwIGJvdW5kc1xuICAgICAgdGhpcy5fbWFwLnBhbkluc2lkZUJvdW5kcyhVdGlscy5NQVBfQk9VTkRTLCB7IGFuaW1hdGU6IHRydWUgfSk7XG4gICAgfSk7XG4gIH1cblxuXG4gIF9tYXBDbGlja2VkKG9wdHMpIHtcbiAgICBjb25zb2xlLmxvZyhvcHRzLmxhdGxuZywgSlNPTi5zdHJpbmdpZnkob3B0cy5sYXRsbmcubGF0ICsgJywgJyArIG9wdHMubGF0bG5nLmxuZykpO1xuICAgIHdpbmRvdy50bXAucHVzaChbb3B0cy5sYXRsbmcubGF0LCBvcHRzLmxhdGxuZy5sbmddKTtcbiAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh3aW5kb3cudG1wKSlcbiAgfVxuXG5cbiAgZHJhd1VzZXJNYXJrZXIoKSB7XG4gICAgaWYgKCF3aW5kb3cuZHgudXNlci5tYXJrZXIpIHtcbiAgICAgIHdpbmRvdy5keC51c2VyLm1hcmtlciA9IHdpbmRvdy5MLm1hcmtlcihbd2luZG93LmR4LnVzZXIubGF0LCB3aW5kb3cuZHgudXNlci5sbmddLCB7XG4gICAgICAgIGljb246IE1hcmtlcnMuc3VidHlwZXMudXNlclxuICAgICAgfSk7XG4gICAgICB3aW5kb3cuZHgudXNlci5tYXJrZXIuYWRkVG8odGhpcy5fbWFwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgd2luZG93LmR4LnVzZXIubWFya2VyLnNldExhdExuZyh3aW5kb3cuZHgudXNlcik7XG4gICAgfVxuICB9XG5cblxuICBhZGRQb2x5Z29uKGlucHV0LCBpZCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIGNvbnN0IHBvbHlnb24gPSB3aW5kb3cuTC5wb2x5Z29uKGlucHV0KTtcbiAgICAgIHBvbHlnb24uYWRkVG8odGhpcy5fbWFwKTtcbiAgICAgIHRoaXMuX3BvbHlnb25zW2lkXSA9IHBvbHlnb247XG4gICAgICByZXNvbHZlKCk7XG4gICAgfSk7XG4gIH1cblxuXG4gIGNyZWF0ZU1hcmtlcihvcHRzKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgbGV0IHR5cGUgPSBvcHRzLm1hcmsudHlwZTtcbiAgICAgIGNvbnN0IG1hcmtlciA9IHdpbmRvdy5MLm1hcmtlcihbb3B0cy5tYXJrLmxhdCwgb3B0cy5tYXJrLmxuZ10sIHsgXG4gICAgICAgIGljb246IE1hcmtlcnMuc3VidHlwZXNbdHlwZV1cbiAgICAgIH0pLm9uKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgdGhpcy5fbWFwLmZseVRvKFtvcHRzLm1hcmsubGF0LCBvcHRzLm1hcmsubG5nXSwgMTgpO1xuICAgICAgfSk7XG4gIFxuICAgICAgbWFya2VyLmJpbmRQb3B1cChNYXBGYWN0b3J5LmNyZWF0ZU1hcmtlclBvcHVwKG9wdHMpKTtcbiAgICAgIGlmIChvcHRzLm1hcmsuc3VidHlwZXMubGVuZ3RoID4gMCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9wdHMubWFyay5zdWJ0eXBlcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgIGlmICghdGhpcy5fbWFya3Nbb3B0cy5tYXJrLnN1YnR5cGVzW2ldXSkge1xuICAgICAgICAgICAgdGhpcy5fbWFya3Nbb3B0cy5tYXJrLnN1YnR5cGVzW2ldXSA9IFtdO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLl9tYXJrc1tvcHRzLm1hcmsuc3VidHlwZXNbaV1dLnB1c2gobWFya2VyKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKCF0aGlzLl9tYXJrc1t0eXBlXSkge1xuICAgICAgICAgIHRoaXMuX21hcmtzW3R5cGVdID0gW107XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbWFya3NbdHlwZV0ucHVzaChtYXJrZXIpO1xuICAgICAgfVxuXG4gICAgICByZXNvbHZlKCk7XG4gICAgfSk7XG4gIH1cblxuXG4gIHNob3dDYXRlZ29yeShjYXRlZ29yeSkge1xuICAgIGNvbnN0IHN1YkNhdGVnb3JpZXMgPSBNYXJrZXJzLnR5cGVzW2NhdGVnb3J5XTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN1YkNhdGVnb3JpZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgIHRoaXMuc2hvd1N1YkNhdGVnb3J5KHN1YkNhdGVnb3JpZXNbaV0pO1xuICAgIH1cbiAgfVxuXG5cbiAgc2hvd1N1YkNhdGVnb3J5KHN1YkNhdGVnb3J5KSB7XG4gICAgY29uc3QgbWFya3MgPSB0aGlzLl9tYXJrc1tzdWJDYXRlZ29yeV07XG4gICAgaWYgKG1hcmtzKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1hcmtzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIG1hcmtzW2ldLmFkZFRvKHRoaXMuX21hcCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cblxuICBoaWRlQ2F0ZWdvcnkoY2F0ZWdvcnkpIHtcbiAgICBjb25zdCBzdWJDYXRlZ29yaWVzID0gTWFya2Vycy50eXBlc1tjYXRlZ29yeV07XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdWJDYXRlZ29yaWVzLmxlbmd0aDsgKytpKSB7XG4gICAgICB0aGlzLmhpZGVTdWJDYXRlZ29yeShzdWJDYXRlZ29yaWVzW2ldKTtcbiAgICB9XG4gIH1cblxuXG4gIGhpZGVTdWJDYXRlZ29yeShzdWJDYXRlZ29yeSkge1xuICAgIGNvbnN0IG1hcmtzID0gdGhpcy5fbWFya3Nbc3ViQ2F0ZWdvcnldO1xuICAgIGlmIChtYXJrcykge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXJrcy5sZW5ndGg7ICsraSkge1xuICAgICAgICBtYXJrc1tpXS5yZW1vdmVGcm9tKHRoaXMuX21hcCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cblxuICBhZGRUcmFuc3BvcnRhdGlvblN0b3Aob3B0cykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIGNvbnN0IHR5cGUgPSBvcHRzLnN0b3AudHlwZTtcbiAgICAgIGNvbnN0IG1hcmtlciA9IHdpbmRvdy5MLm1hcmtlcihbb3B0cy5zdG9wLmxhdCwgb3B0cy5zdG9wLmxuZ10sIHsgXG4gICAgICAgIGljb246IE1hcmtlcnMuc3VidHlwZXNbdHlwZV1cbiAgICAgIH0pLm9uKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgdGhpcy5fbWFwLmZseVRvKFtvcHRzLnN0b3AubGF0LCBvcHRzLnN0b3AubG5nXSwgMTgpO1xuICAgICAgfSk7XG4gIFxuICAgICAgY29uc3QgbGluZSA9IHdpbmRvdy5MLnBvbHlsaW5lKG9wdHMuZGF0YS5wYXRoLCB7XG4gICAgICAgIGNvbG9yOiBvcHRzLmRhdGEuY29sb3IsXG4gICAgICAgIHdlaWdodDogNSxcbiAgICAgICAgc21vb3RoRmFjdG9yOiAxXG4gICAgICB9KTtcblxuICAgICAgbWFya2VyLmJpbmRQb3B1cChNYXBGYWN0b3J5LmNyZWF0ZVN0b3BNYXJrZXJQb3B1cChvcHRzKSkub24oJ3BvcHVwb3BlbicsICgpID0+IHtcbiAgICAgICAgbGluZS5hZGRUbyh0aGlzLl9tYXApO1xuICAgICAgfSkub24oJ3BvcHVwY2xvc2UnLCAoKSA9PiB7XG4gICAgICAgIGxpbmUucmVtb3ZlRnJvbSh0aGlzLl9tYXApO1xuICAgICAgfSk7XG4gICAgICBcbiAgICAgIC8vbWFya2VyLmFkZFRvKHRoaXMuX21hcCk7XG4gIFxuICAgICAgaWYgKCF0aGlzLl9tYXJrc1t0eXBlXSkge1xuICAgICAgICB0aGlzLl9tYXJrc1t0eXBlXSA9IFtdO1xuICAgICAgfVxuICAgICAgdGhpcy5fbWFya3NbdHlwZV0ucHVzaChtYXJrZXIpO1xuXG4gICAgICByZXNvbHZlKCk7XG4gICAgfSk7XG4gIH1cblxuXG4gIGFkZExpbmUocG9pbnRzLCBvcHRpb25zKSB7XG4gICAgdGhpcy5fbGluZXMucHVzaCh3aW5kb3cuTC5wb2x5bGluZShwb2ludHMsIG9wdGlvbnMpLmFkZFRvKHRoaXMuX21hcCkpO1xuICB9XG5cblxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IE1hcDtcbiIsImltcG9ydCBVdGlscyBmcm9tICcuLi91dGlscy9VdGlscy5qcyc7XG5cblxuY2xhc3MgTWFwRmFjdG9yeSB7XG5cblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cblxuICBzdGF0aWMgY3JlYXRlTWFya2VyUG9wdXAob3B0cykge1xuICAgIGNvbnN0IGRvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnSDMnKTtcbiAgICBjb25zdCBhZGRyZXNzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnSScpO1xuICAgIGNvbnN0IHRvd24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdJJyk7XG4gICAgY29uc3QgcGhvbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdBJyk7XG4gICAgY29uc3Qgd2Vic2l0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0EnKTtcbiAgICBjb25zdCBpbmZvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnUCcpO1xuICAgIGNvbnN0IG9wZW5XaXRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnQScpO1xuXG4gICAgZG9tLmNsYXNzTGlzdC5hZGQoJ21hcmtlci1wb3B1cCcpO1xuICAgIHRpdGxlLmlubmVySFRNTCA9IG9wdHMubWFyay5uYW1lO1xuICAgIGFkZHJlc3MuaW5uZXJIVE1MID0gb3B0cy5tYXJrLmFkZHJlc3M7XG4gICAgdG93bi5pbm5lckhUTUwgPSBvcHRzLm1hcmsudG93bjtcbiAgICBwaG9uZS5ocmVmID0gYHRlbDoke29wdHMubWFyay5waG9uZX1gO1xuICAgIHBob25lLmlubmVySFRNTCA9IGA8aW1nIHNyYz1cIi4vYXNzZXRzL2ltZy9pY29uL3Bob25lLnN2Z1wiPiR7b3B0cy5tYXJrLnBob25lfWA7XG4gICAgd2Vic2l0ZS5ocmVmID0gb3B0cy5tYXJrLndlYnNpdGU7XG4gICAgd2Vic2l0ZS5pbm5lckhUTUwgPSAnPGltZyBzcmM9XCIuL2Fzc2V0cy9pbWcvaWNvbi93ZWIuc3ZnXCI+Q29uc3VsdGVyIGxlIHNpdGUnO1xuICAgIHdlYnNpdGUuc2V0QXR0cmlidXRlKCdyZWwnLCAnbm9vcGVuZXIgbm9yZWZlcnJlcicpO1xuICAgIHdlYnNpdGUuc2V0QXR0cmlidXRlKCd0YXJnZXQnLCAnX2JsYW5rJyk7XG4gICAgaW5mby5pbm5lckhUTUwgPSBvcHRzLm1hcmsuaW5mbztcbiAgICBvcGVuV2l0aC5ocmVmID0gYGdlbzoke29wdHMubWFyay5sYXR9LCR7b3B0cy5tYXJrLmxuZ31gO1xuICAgIG9wZW5XaXRoLmlubmVySFRNTCA9ICc8aW1nIHNyYz1cIi4vYXNzZXRzL2ltZy9pY29uL3Bpbi5zdmdcIj5PdXZyaXIgZGFucyBsZSBHUFMnO1xuXG4gICAgZG9tLmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgICBkb20uYXBwZW5kQ2hpbGQoYWRkcmVzcyk7XG4gICAgZG9tLmFwcGVuZENoaWxkKHRvd24pO1xuXG4gICAgY29uc3QgYnV0dG9uID0gdGhpcy5tYXJrZXJPcGVuZWRTdGF0ZShvcHRzLm1hcmsudGltZXRhYmxlKTtcbiAgICBkb20uYXBwZW5kQ2hpbGQoYnV0dG9uKTtcblxuICAgIGxldCBhbHdheXNDbG9zZWQgPSB0cnVlO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3B0cy5tYXJrLnRpbWV0YWJsZS5sZW5ndGg7ICsraSkge1xuICAgICAgaWYgKG9wdHMubWFyay50aW1ldGFibGVbaV0uaXNPcGVuID09PSB0cnVlKSB7XG4gICAgICAgIGFsd2F5c0Nsb3NlZCA9IGZhbHNlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gQWxsb3cgbW9kYWwgb25seSBpZiBwb2kgaGFzIHRpbWV0YWJsZSBhbmQgaXMgbm90IGFsd2F5cyBjbG9zZWRcbiAgICBpZiAob3B0cy5tYXJrLnRpbWV0YWJsZS5sZW5ndGggPiAwICYmIGFsd2F5c0Nsb3NlZCA9PT0gZmFsc2UpIHtcbiAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMudGltZXRhYmxlTW9kYWwuYmluZCh0aGlzLCBvcHRzLm1hcmssIG9wdHMudXNlcikpO1xuICAgIH1cbiAgICBcbiAgICBpZiAob3B0cy5tYXJrLmluZm8gIT09ICcnKSB7XG4gICAgICBkb20uYXBwZW5kQ2hpbGQoaW5mbyk7XG4gICAgfVxuXG4gICAgaWYgKG9wdHMubWFyay5waG9uZSAhPT0gJycpIHtcbiAgICAgIGRvbS5hcHBlbmRDaGlsZChwaG9uZSk7XG4gICAgfVxuXG4gICAgaWYgKG9wdHMubWFyay53ZWJzaXRlICE9PSAnJykge1xuICAgICAgZG9tLmFwcGVuZENoaWxkKHdlYnNpdGUpO1xuICAgIH0gICAgXG4gICAgXG4gICAgZG9tLmFwcGVuZENoaWxkKG9wZW5XaXRoKTtcblxuICAgIHJldHVybiBkb207XG4gIH1cblxuXG4gIHN0YXRpYyBjcmVhdGVTdG9wTWFya2VyUG9wdXAob3B0cykge1xuICAgIGNvbnN0IGRvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xuICAgIGNvbnN0IGxvZ28gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdJTUcnKTtcbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0gzJyk7XG4gICAgY29uc3QgZGlyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnSDQnKTtcbiAgICBjb25zdCBhZGRyZXNzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnSScpO1xuICAgIGNvbnN0IHRvd24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdJJyk7XG4gICAgY29uc3Qgd2Vic2l0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0EnKTtcbiAgICBjb25zdCBpbmZvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnQScpO1xuICAgIGNvbnN0IGRsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnQScpO1xuICAgIGNvbnN0IG9wZW5XaXRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnQScpO1xuXG4gICAgZG9tLmNsYXNzTGlzdC5hZGQoJ21hcmtlci1wb3B1cCcpO1xuICAgIGxvZ28uc3JjID0gYC4vYXNzZXRzL2ltZy90cmFuc3BvcnRhdGlvbi8ke29wdHMuZGF0YS5uYW1lfS5wbmdgO1xuICAgIHRpdGxlLmlubmVySFRNTCA9IG9wdHMuc3RvcC5uYW1lO1xuICAgIGlmIChvcHRzLnN0b3AudGVybWludXMgPT09IHRydWUpIHtcbiAgICAgIGRpci5pbm5lckhUTUwgPSBgVGVybWludXMgZGUgbGEgbGlnbmVgO1xuICAgIH0gZWxzZSB7XG4gICAgICBkaXIuaW5uZXJIVE1MID0gYERpcmVjdGlvbiAke29wdHMuc3RvcC5kaXJ9YDtcbiAgICB9XG4gICAgYWRkcmVzcy5pbm5lckhUTUwgPSBvcHRzLnN0b3AuYWRkcmVzcztcbiAgICB0b3duLmlubmVySFRNTCA9IG9wdHMuc3RvcC50b3duO1xuICAgIHdlYnNpdGUuaHJlZiA9IG9wdHMuc3RvcC53ZWJzaXRlO1xuICAgIHdlYnNpdGUuaW5uZXJIVE1MID0gJzxpbWcgc3JjPVwiLi9hc3NldHMvaW1nL2ljb24vd2ViLnN2Z1wiPkNvbnN1bHRlciBsZSBzaXRlJztcbiAgICB3ZWJzaXRlLnNldEF0dHJpYnV0ZSgncmVsJywgJ25vb3BlbmVyIG5vcmVmZXJyZXInKTtcbiAgICB3ZWJzaXRlLnNldEF0dHJpYnV0ZSgndGFyZ2V0JywgJ19ibGFuaycpO1xuICAgIGluZm8uaHJlZiA9IG9wdHMuc3RvcC5pbmZvO1xuICAgIGluZm8uaW5uZXJIVE1MID0gJzxpbWcgc3JjPVwiLi9hc3NldHMvaW1nL2ljb24vaW5mby5zdmdcIj5JbmZvcm1hdGlvbnMnO1xuICAgIGluZm8uc2V0QXR0cmlidXRlKCdyZWwnLCAnbm9vcGVuZXIgbm9yZWZlcnJlcicpO1xuICAgIGluZm8uc2V0QXR0cmlidXRlKCd0YXJnZXQnLCAnX2JsYW5rJyk7XG4gICAgZGwuaHJlZiA9IGAuL2Fzc2V0cy9wZGYvJHtvcHRzLmRhdGEubmFtZX0ucGRmYDtcbiAgICBkbC5pbm5lckhUTUwgPSAnPGltZyBzcmM9XCIuL2Fzc2V0cy9pbWcvaWNvbi9kb3dubG9hZC5zdmdcIj5Uw6lsw6ljaGFyZ2VyIGxlcyBob3JhaXJlcyc7XG4gICAgZGwuc2V0QXR0cmlidXRlKCdyZWwnLCAnbm9vcGVuZXIgbm9yZWZlcnJlcicpO1xuICAgIGRsLnNldEF0dHJpYnV0ZSgndGFyZ2V0JywgJ19ibGFuaycpO1xuICAgIG9wZW5XaXRoLmhyZWYgPSBgZ2VvOiR7b3B0cy5zdG9wLmxhdH0sJHtvcHRzLnN0b3AubG5nfWA7XG4gICAgb3BlbldpdGguaW5uZXJIVE1MID0gJzxpbWcgc3JjPVwiLi9hc3NldHMvaW1nL2ljb24vcGluLnN2Z1wiPk91dnJpciBkYW5zIGxlIEdQUyc7XG5cbiAgICBkb20uYXBwZW5kQ2hpbGQobG9nbyk7XG4gICAgZG9tLmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgICBkb20uYXBwZW5kQ2hpbGQoZGlyKTtcbiAgICBkb20uYXBwZW5kQ2hpbGQoYWRkcmVzcyk7XG4gICAgZG9tLmFwcGVuZENoaWxkKHRvd24pO1xuICAgIFxuICAgIGlmIChvcHRzLnN0b3AuaW5mbyAhPT0gJycpIHtcbiAgICAgIGRvbS5hcHBlbmRDaGlsZChpbmZvKTtcbiAgICB9XG5cbiAgICBpZiAob3B0cy5zdG9wLndlYnNpdGUgIT09ICcnKSB7XG4gICAgICBkb20uYXBwZW5kQ2hpbGQod2Vic2l0ZSk7XG4gICAgfVxuICAgIFxuICAgIGRvbS5hcHBlbmRDaGlsZChkbCk7XG4gICAgZG9tLmFwcGVuZENoaWxkKG9wZW5XaXRoKTtcblxuICAgIHJldHVybiBkb207XG4gIH1cblxuXG4gIC8qIE1hcmtlciB0aW1ldGFibGUgYW5kIG9wZW4vY2xvc2VkIHN0YXRlICovXG5cblxuICBzdGF0aWMgbWFya2VyT3BlbmVkU3RhdGUodGltZXRhYmxlKSB7XG4gICAgY29uc3QgZG9tID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XG4gICAgY29uc3Qgc3RhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdINScpO1xuICAgIGNvbnN0IG1vcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdJJyk7XG4gICAgZG9tLmNsYXNzTGlzdC5hZGQoJ21hcmtlci1vcGVuZWQnKTtcbiAgICBkb20uYXBwZW5kQ2hpbGQoc3RhdGUpO1xuICAgIGRvbS5hcHBlbmRDaGlsZChtb3JlKTtcbiAgICBcbiAgICBpZiAodGltZXRhYmxlLmxlbmd0aCkge1xuICAgICAgbGV0IGFsd2F5c0Nsb3NlZCA9IHRydWU7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRpbWV0YWJsZS5sZW5ndGg7ICsraSkge1xuICAgICAgICBpZiAodGltZXRhYmxlW2ldLmlzT3BlbiA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGFsd2F5c0Nsb3NlZCA9IGZhbHNlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChhbHdheXNDbG9zZWQgPT09IHRydWUpIHtcbiAgICAgICAgdGhpcy5tYXJrZXJJc0Nsb3NlZChkb20sIHRydWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jaGVja1RpbWUodGltZXRhYmxlLCBkb20pO1xuICAgICAgICAvLyBVcGRhdGUgZWFjaCBtaW51dGVzXG4gICAgICAgIC8vIFRPRE8gc3RvcmUgaW50ZXJ2YWwgaWYgdG8gYmUgcmVhZHkgdG8gY2FuY2VsIHdoZW4gb3RoZXIgbmF2aWdhdGlvbiBtb2RlIGF2YWlsYWJsZVxuICAgICAgICBzZXRJbnRlcnZhbCh0aGlzLmNoZWNrVGltZS5iaW5kKHRoaXMsIHRpbWV0YWJsZSwgZG9tKSwgNjAwMDApO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1hcmtlcklzT3BlbmVkKGRvbSwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRvbTtcbiAgfVxuXG5cbiAgc3RhdGljIGNoZWNrVGltZSh0aW1ldGFibGUsIGRvbSkge1xuICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgbGV0IGhvdXIgPSBub3cuZ2V0SG91cnMoKTtcbiAgICBsZXQgbWludXRlcyA9IG5vdy5nZXRNaW51dGVzKCk7XG4gICAgaWYgKG1pbnV0ZXMgPCAxMCkge1xuICAgICAgbWludXRlcyA9IGAwJHttaW51dGVzfWA7XG4gICAgfVxuXG4gICAgY29uc3QgZGF5T2ZXZWVrID0gbm93LmdldERheSgpIC0gMTtcbiAgICBjb25zdCBvcGVuaW5nVGltZSA9IHBhcnNlSW50KGAke3RpbWV0YWJsZVtkYXlPZldlZWtdLm9wZW4uaH0ke3RpbWV0YWJsZVtkYXlPZldlZWtdLm9wZW4ubX1gKTtcbiAgICBjb25zdCBjbG9zaW5nVGltZSA9IHBhcnNlSW50KGAke3RpbWV0YWJsZVtkYXlPZldlZWtdLmNsb3NlLmh9JHt0aW1ldGFibGVbZGF5T2ZXZWVrXS5jbG9zZS5tfWApO1xuICAgIGNvbnN0IGN1cnJlbnRUaW1lID0gcGFyc2VJbnQoYCR7aG91cn0ke21pbnV0ZXN9YCk7XG4gICAgLy8gV29uJ3Qgd29yayBpZiB0aW1ldGFibGUgb3Blbi9jbG9zZSBob3VycyBhcmVuJ3Qgb24gdGhlIHNhbWUgZGF5XG4gICAgaWYgKHRpbWV0YWJsZVtkYXlPZldlZWtdLmlzT3BlbiAmJiBpc05hTihvcGVuaW5nVGltZSkpIHsgLy8gMjQvNyBvcGVuaW5nXG4gICAgICB0aGlzLm1hcmtlcklzT3BlbmVkKGRvbSwgdHJ1ZSk7XG4gICAgfSBlbHNlIGlmICh0aW1ldGFibGVbZGF5T2ZXZWVrXS5pc09wZW4gJiYgY3VycmVudFRpbWUgPj0gb3BlbmluZ1RpbWUgJiYgY3VycmVudFRpbWUgPCBjbG9zaW5nVGltZSkge1xuICAgICAgLy8gQ2hlY2sgZm9yIGRheSBicmVha3NcbiAgICAgIGlmICh0aW1ldGFibGVbZGF5T2ZXZWVrXS5icmVhay5oYXNCcmVhaykge1xuICAgICAgICAvLyBJbiBjYXNlIG9mIHNldmVyYWwgZGF5IGJyZWFrc1xuICAgICAgICBpZiAodGltZXRhYmxlW2RheU9mV2Vla10uYnJlYWsuc2V2ZXJhbCkge1xuICAgICAgICAgIGxldCBpc0Nsb3NlZCA9IGZhbHNlO1xuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGltZXRhYmxlW2RheU9mV2Vla10uYnJlYWsuc2V2ZXJhbC5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgY29uc3QgYnJlYWtPcGVuaW5nVGltZSA9IHBhcnNlSW50KGAke3RpbWV0YWJsZVtkYXlPZldlZWtdLmJyZWFrLnNldmVyYWxbaV0uZW5kLmh9JHt0aW1ldGFibGVbZGF5T2ZXZWVrXS5icmVhay5zZXZlcmFsW2ldLmVuZC5tfWApO1xuICAgICAgICAgICAgY29uc3QgYnJlYWtDbG9zaW5nVGltZSA9IHBhcnNlSW50KGAke3RpbWV0YWJsZVtkYXlPZldlZWtdLmJyZWFrLnNldmVyYWxbaV0uc3RhcnQuaH0ke3RpbWV0YWJsZVtkYXlPZldlZWtdLmJyZWFrLnNldmVyYWxbaV0uc3RhcnQubX1gKTtcbiAgICAgICAgICAgIGlmIChjdXJyZW50VGltZSA+PSBicmVha0Nsb3NpbmdUaW1lICYmIGN1cnJlbnRUaW1lIDwgYnJlYWtPcGVuaW5nVGltZSkge1xuICAgICAgICAgICAgICB0aGlzLm1hcmtlcklzQ2xvc2VkKGRvbSk7XG4gICAgICAgICAgICAgIGlzQ2xvc2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghaXNDbG9zZWQpIHtcbiAgICAgICAgICAgICAgdGhpcy5tYXJrZXJJc09wZW5lZChkb20pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBicmVha09wZW5pbmdUaW1lID0gcGFyc2VJbnQoYCR7dGltZXRhYmxlW2RheU9mV2Vla10uYnJlYWsuZW5kLmh9JHt0aW1ldGFibGVbZGF5T2ZXZWVrXS5icmVhay5lbmQubX1gKTtcbiAgICAgICAgICBjb25zdCBicmVha0Nsb3NpbmdUaW1lID0gcGFyc2VJbnQoYCR7dGltZXRhYmxlW2RheU9mV2Vla10uYnJlYWsuc3RhcnQuaH0ke3RpbWV0YWJsZVtkYXlPZldlZWtdLmJyZWFrLnN0YXJ0Lm19YCk7XG4gICAgICAgICAgaWYgKGN1cnJlbnRUaW1lID49IGJyZWFrQ2xvc2luZ1RpbWUgJiYgY3VycmVudFRpbWUgPCBicmVha09wZW5pbmdUaW1lKSB7XG4gICAgICAgICAgICB0aGlzLm1hcmtlcklzQ2xvc2VkKGRvbSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubWFya2VySXNPcGVuZWQoZG9tKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubWFya2VySXNPcGVuZWQoZG9tKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgeyAgICAgIFxuICAgICAgdGhpcy5tYXJrZXJJc0Nsb3NlZChkb20pO1xuICAgIH1cbiAgfVxuXG5cbiAgc3RhdGljIG1hcmtlcklzT3BlbmVkKGRvbSwgYWx3YXlzT3BlbmVkKSB7XG4gICAgZG9tLmZpcnN0Q2hpbGQuaW5uZXJIVE1MID0gYE91dmVydGA7XG4gICAgaWYgKGFsd2F5c09wZW5lZCA9PT0gdHJ1ZSkge1xuICAgICAgZG9tLmxhc3RDaGlsZC5pbm5lckhUTUwgPSBgVG91am91cnMgb3V2ZXJ0YDtcbiAgICB9IGVsc2Uge1xuICAgICAgZG9tLmxhc3RDaGlsZC5pbm5lckhUTUwgPSBgVm9pciBsZXMgaG9yYWlyZXNgO1xuICAgIH1cbiAgICBkb20uY2xhc3NMaXN0LmFkZCgnb3BlbmVkJyk7XG4gIH1cblxuXG4gIHN0YXRpYyBtYXJrZXJJc0Nsb3NlZChkb20sIGFsd2F5c0Nsb3NlZCkge1xuICAgIGRvbS5maXJzdENoaWxkLmlubmVySFRNTCA9IGBGZXJtw6lgO1xuICAgIGlmIChhbHdheXNDbG9zZWQpIHtcbiAgICAgIGRvbS5sYXN0Q2hpbGQuaW5uZXJIVE1MID0gJ1RvdWpvdXJzIGZlcm3DqSc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRvbS5sYXN0Q2hpbGQuaW5uZXJIVE1MID0gYFZvaXIgbGVzIGhvcmFpcmVzYDtcbiAgICB9XG4gICAgZG9tLmNsYXNzTGlzdC5yZW1vdmUoJ29wZW5lZCcpO1xuICB9XG5cblxuICBzdGF0aWMgdGltZXRhYmxlTW9kYWwob3B0cywgdXNlcikge1xuICAgIFV0aWxzLmZldGNoTW9kYWwoJ3RpbWV0YWJsZW1vZGFsJykudGhlbihkb20gPT4ge1xuICAgICAgLy8gVXBkYXRpbmcgbW9kYWwgaGVhZGVyIGFuZCBpbmZvXG4gICAgICBkb20ucXVlcnlTZWxlY3RvcignI21hcmstbmFtZScpLmlubmVySFRNTCA9IG9wdHMubmFtZTtcbiAgICAgIGRvbS5xdWVyeVNlbGVjdG9yKCcjbWFyay1hZGRyZXNzJykuaW5uZXJIVE1MID0gYCR7b3B0cy5hZGRyZXNzfSwgJHtvcHRzLnRvd259YDtcbiAgICAgIGNvbnN0IGRpc3RhbmNlID0gVXRpbHMuZ2V0RGlzdGFuY2VCZXR3ZWVuQ29vcmRzKFtvcHRzLmxhdCwgb3B0cy5sbmddLCBbdXNlci5sYXQsIHVzZXIubG5nXSk7XG4gICAgICBkb20ucXVlcnlTZWxlY3RvcignI21hcmstZGlzdGFuY2UnKS5pbm5lckhUTUwgPSBgVm91cyDDqHRlcyDDoCBlbnZpcm9uICR7VXRpbHMuY29udmVydERpc3RhbmNlVG9TdHJpbmcoZGlzdGFuY2UpfSBkZSA8Yj4ke29wdHMubmFtZX08L2I+IMOgIHZvbCBkJ29pc2VhdWA7XG4gICAgICBjb25zdCBldGEgPSBVdGlscy5idWlsZERpc3RhbmNlRVRBKGRpc3RhbmNlKTtcbiAgICAgIGRvbS5xdWVyeVNlbGVjdG9yKCcjbWFyay1ldGEnKS5pbm5lckhUTUwgPSBgQ2UgcXVpIHJlcHLDqXNlbnRlIGVudmlyb24gJHtldGEuY2FyfSBlbiB2b2l0dXJlLCBvdSAke2V0YS53YWxrfSDDoCBwaWVkLmA7XG4gICAgICBkb20ucXVlcnlTZWxlY3RvcignI21hcmstc3RhdGUnKS5hcHBlbmRDaGlsZCh0aGlzLm1hcmtlck9wZW5lZFN0YXRlKG9wdHMudGltZXRhYmxlKSk7XG4gICAgICAvLyBOb3cgdXBkYXRlIGRheSBieSBkYXlcbiAgICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgICBjb25zdCBkYXlPZldlZWsgPSBub3cuZ2V0RGF5KCkgLSAxO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvcHRzLnRpbWV0YWJsZS5sZW5ndGg7ICsraSkge1xuICAgICAgICBjb25zdCBkYXlEb20gPSBkb20ucXVlcnlTZWxlY3RvcignI3RpbWV0YWJsZScpLmNoaWxkcmVuW2ldO1xuICAgICAgICBpZiAob3B0cy50aW1ldGFibGVbaV0uaXNPcGVuID09PSB0cnVlKSB7XG4gICAgICAgICAgY29uc3QgbW9ybmluZyA9IGRheURvbS5sYXN0RWxlbWVudENoaWxkLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAgIGNvbnN0IGFmdGVybm9vbiA9IGRheURvbS5sYXN0RWxlbWVudENoaWxkLmxhc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgICAgaWYgKG9wdHMudGltZXRhYmxlW2ldLmJyZWFrICYmIG9wdHMudGltZXRhYmxlW2ldLmJyZWFrLmhhc0JyZWFrID09PSB0cnVlKSB7XG4gICAgICAgICAgICBpZiAob3B0cy50aW1ldGFibGVbaV0uYnJlYWsuc2V2ZXJhbCkge1xuICAgICAgICAgICAgICBtb3JuaW5nLmlubmVySFRNTCA9IGA8cD4ke29wdHMudGltZXRhYmxlW2ldLm9wZW4uaH06JHtvcHRzLnRpbWV0YWJsZVtpXS5vcGVuLm19IOKAkiAke29wdHMudGltZXRhYmxlW2ldLmJyZWFrLnNldmVyYWxbMF0uc3RhcnQuaH06JHtvcHRzLnRpbWV0YWJsZVtpXS5icmVhay5zZXZlcmFsWzBdLnN0YXJ0Lm19PC9wPmA7XG4gICAgICAgICAgICAgIG1vcm5pbmcuY2xhc3NMaXN0LmFkZCgnZmlsbGVkJyk7IC8vIE1vcm5pbmdcbiAgICAgICAgICAgICAgbW9ybmluZy5jbGFzc0xpc3QuYWRkKCdzcGxpdGVkJyk7IC8vIE1vcm5pbmdcbiAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBvcHRzLnRpbWV0YWJsZVtpXS5icmVhay5zZXZlcmFsLmxlbmd0aCAtIDE7ICsraikge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xuICAgICAgICAgICAgICAgIGRpdi5pbm5lckhUTUwgPSBgPHA+JHtvcHRzLnRpbWV0YWJsZVtpXS5icmVhay5zZXZlcmFsW2pdLmVuZC5ofToke29wdHMudGltZXRhYmxlW2ldLmJyZWFrLnNldmVyYWxbal0uZW5kLm19IOKAkiAke29wdHMudGltZXRhYmxlW2ldLmJyZWFrLnNldmVyYWxbaiArIDFdLnN0YXJ0Lmh9OiR7b3B0cy50aW1ldGFibGVbaV0uYnJlYWsuc2V2ZXJhbFtqICsgMV0uc3RhcnQubX08L3A+YDtcbiAgICAgICAgICAgICAgICBkaXYuY2xhc3NMaXN0LmFkZCgnZmlsbGVkJyk7XG4gICAgICAgICAgICAgICAgZGl2LmNsYXNzTGlzdC5hZGQoJ3NwbGl0ZWQnKTtcbiAgICAgICAgICAgICAgICBkaXYuc3R5bGUuYm9yZGVyUmFkaXVzID0gJy41cmVtJztcbiAgICAgICAgICAgICAgICBkaXYuc3R5bGUuanVzdGlmeUNvbnRlbnQgPSAnY2VudGVyJztcbiAgICAgICAgICAgICAgICBkYXlEb20ubGFzdEVsZW1lbnRDaGlsZC5pbnNlcnRCZWZvcmUoZGl2LCBkYXlEb20ubGFzdEVsZW1lbnRDaGlsZC5sYXN0RWxlbWVudENoaWxkKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGFmdGVybm9vbi5pbm5lckhUTUwgPSBgPHA+JHtvcHRzLnRpbWV0YWJsZVtpXS5icmVhay5zZXZlcmFsW29wdHMudGltZXRhYmxlW2ldLmJyZWFrLnNldmVyYWwubGVuZ3RoIC0gMV0uZW5kLmh9OiR7b3B0cy50aW1ldGFibGVbaV0uYnJlYWsuc2V2ZXJhbFtvcHRzLnRpbWV0YWJsZVtpXS5icmVhay5zZXZlcmFsLmxlbmd0aCAtIDFdLmVuZC5tfSDigJIgJHtvcHRzLnRpbWV0YWJsZVtpXS5jbG9zZS5ofToke29wdHMudGltZXRhYmxlW2ldLmNsb3NlLm19PC9wPmA7XG4gICAgICAgICAgICAgIGFmdGVybm9vbi5jbGFzc0xpc3QuYWRkKCdmaWxsZWQnKTsgLy8gQWZ0ZXJub29uXG4gICAgICAgICAgICAgIGFmdGVybm9vbi5jbGFzc0xpc3QuYWRkKCdzcGxpdGVkJyk7IC8vIEFmdGVybm9vblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbW9ybmluZy5pbm5lckhUTUwgPSBgPHA+JHtvcHRzLnRpbWV0YWJsZVtpXS5vcGVuLmh9OiR7b3B0cy50aW1ldGFibGVbaV0ub3Blbi5tfSDigJIgJHtvcHRzLnRpbWV0YWJsZVtpXS5icmVhay5zdGFydC5ofToke29wdHMudGltZXRhYmxlW2ldLmJyZWFrLnN0YXJ0Lm19PC9wPmA7XG4gICAgICAgICAgICAgIG1vcm5pbmcuY2xhc3NMaXN0LmFkZCgnZmlsbGVkJyk7IC8vIE1vcm5pbmdcbiAgICAgICAgICAgICAgbW9ybmluZy5jbGFzc0xpc3QuYWRkKCdzcGxpdGVkJyk7IC8vIE1vcm5pbmdcbiAgICAgICAgICAgICAgYWZ0ZXJub29uLmlubmVySFRNTCA9IGA8cD4ke29wdHMudGltZXRhYmxlW2ldLmJyZWFrLmVuZC5ofToke29wdHMudGltZXRhYmxlW2ldLmJyZWFrLmVuZC5tfSDigJIgJHtvcHRzLnRpbWV0YWJsZVtpXS5jbG9zZS5ofToke29wdHMudGltZXRhYmxlW2ldLmNsb3NlLm19PC9wPmA7XG4gICAgICAgICAgICAgIGFmdGVybm9vbi5jbGFzc0xpc3QuYWRkKCdmaWxsZWQnKTsgLy8gQWZ0ZXJub29uXG4gICAgICAgICAgICAgIGFmdGVybm9vbi5jbGFzc0xpc3QuYWRkKCdzcGxpdGVkJyk7IC8vIEFmdGVybm9vblxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAob3B0cy50aW1ldGFibGVbaV0ub3Blbi5oICYmIG9wdHMudGltZXRhYmxlW2ldLmNsb3NlLmgpIHtcbiAgICAgICAgICAgIG1vcm5pbmcuaW5uZXJIVE1MID0gYDxwPiR7b3B0cy50aW1ldGFibGVbaV0ub3Blbi5ofToke29wdHMudGltZXRhYmxlW2ldLm9wZW4ubX08L3A+YDtcbiAgICAgICAgICAgIG1vcm5pbmcuY2xhc3NMaXN0LmFkZCgnZmlsbGVkJyk7IC8vIE1vcm5pbmdcbiAgICAgICAgICAgIGFmdGVybm9vbi5pbm5lckhUTUwgPSBgPHA+JHtvcHRzLnRpbWV0YWJsZVtpXS5jbG9zZS5ofToke29wdHMudGltZXRhYmxlW2ldLmNsb3NlLm19PC9wPmA7XG4gICAgICAgICAgICBhZnRlcm5vb24uY2xhc3NMaXN0LmFkZCgnZmlsbGVkJyk7IC8vIEFmdGVybm9vblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtb3JuaW5nLmlubmVySFRNTCA9IGA8cD4wMDowMDwvcD5gO1xuICAgICAgICAgICAgbW9ybmluZy5jbGFzc0xpc3QuYWRkKCdmaWxsZWQnKTsgLy8gTW9ybmluZ1xuICAgICAgICAgICAgYWZ0ZXJub29uLmlubmVySFRNTCA9IGA8cD4yNDowMDwvcD5gO1xuICAgICAgICAgICAgYWZ0ZXJub29uLmNsYXNzTGlzdC5hZGQoJ2ZpbGxlZCcpOyAvLyBBZnRlcm5vb25cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZGF5RG9tLmxhc3RFbGVtZW50Q2hpbGQuaW5uZXJIVE1MID0gYDxkaXYgY2xhc3M9XCJjbG9zZWRcIj48cD5GZXJtw6k8L3A+PC9kaXY+YDsgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgLy8gTWF0Y2hpbmcgdG9kYXkncyBkYXlcbiAgICAgICAgaWYgKGkgPT09IGRheU9mV2Vlaykge1xuICAgICAgICAgIGRheURvbS5jbGFzc0xpc3QuYWRkKCd0b2RheScpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RhbC1vdmVybGF5JykuYXBwZW5kQ2hpbGQoZG9tKTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RhbC1vdmVybGF5Jykuc3R5bGUuZGlzcGxheSA9ICdmbGV4Jztcblx0XHRcdHNldFRpbWVvdXQoKCkgPT4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsLW92ZXJsYXknKS5zdHlsZS5vcGFjaXR5ID0gMSwgNTApO1xuICAgIH0pO1xuICB9XG5cblxufVxuXG5leHBvcnQgZGVmYXVsdCBNYXBGYWN0b3J5O1xuIiwiY2xhc3MgRXZ0cyB7XG5cblxuICAvKiogQHN1bW1hcnkgPGgxPkphdmFTY3JpcHQgcmVndWxhciBhbmQgY3VzdG9tIGV2ZW50cyBhYnN0cmFjdGlvbjwvaDE+XG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBKdW5lIDIwMjBcbiAgICogQGRlc2NyaXB0aW9uIDxibG9ja3F1b3RlPlRoZSBFdnRzIGNsYXNzIHByb3ZpZGVzIGFuIGFic3RyYWN0aW9uIG9mIEphdmFTY3JpcHQgZXZlbnQgbGlzdGVuZXIsIHRvIGFsbG93XG4gICAqIGVhc3kgYmluZGluZyBhbmQgcmVtb3ZpbmcgdGhvc2UgZXZlbnRzLiBJdCBhbHNvIHByb3ZpZGVzIGFuIGludGVyZmFjZSB0byByZWdpc3RlciBjdXN0b20gZXZlbnRzLiBUaGlzIGNsYXNzIGlzXG4gICAqIG1lYW50IHRvIGJlIHVzZWQgb24gYWxsIHNjb3BlcyB5b3UgbmVlZCA7IG1vZHVsZSBvciBnbG9iYWwuIFJlZmVyIHRvIGVhY2ggcHVibGljIG1ldGhvZCBmb3IgZGV0YWlsZWQgZmVhdHVyZXMuXG4gICAqIEZvciBzb3VyY2UgY29kZSwgcGxlYXNlIGdvIHRvIDxhIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vQXJ0aHVyQmVhdWxpZXUvRXZ0cy5qc1wiIGFsdD1cImN1c3RvbS1ldmVudHMtanNcIj5cbiAgICogaHR0cHM6Ly9naXRodWIuY29tL0FydGh1ckJlYXVsaWV1L0V2dHMuanM8L2E+PC9ibG9ja3F1b3RlPlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtkZWJ1Zz1mYWxzZV0gLSBEZWJ1ZyBmbGFnIDsgd2hlbiB0cnVlLCBsb2dzIHdpbGwgYmUgb3V0cHV0IGluIEphdmFTY3JpcHQgY29uc29sZSBhdCBlYWNoIGV2ZW50ICovXG4gIGNvbnN0cnVjdG9yKGRlYnVnID0gZmFsc2UpIHtcbiAgICAvLyBQcmV2ZW50IHdyb25nIHR5cGUgZm9yIGRlYnVnXG4gICAgaWYgKHR5cGVvZiBkZWJ1ZyAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgICBkZWJ1ZyA9IGZhbHNlO1xuICAgIH1cbiAgICAvKiogQHByaXZhdGVcbiAgICAgKiBAbWVtYmVyIHtib29sZWFufSAtIEludGVybmFsIGxvZ2dpbmcgZmxhZyBmcm9tIGNvbnN0cnVjdG9yIG9wdGlvbnMsIGFsbG93IHRvIG91dHB1dCBlYWNoIGV2ZW50IGFjdGlvbiAqL1xuICAgIHRoaXMuX2RlYnVnID0gZGVidWc7XG4gICAgLyoqIEBwcml2YXRlXG4gICAgICogQG1lbWJlciB7bnVtYmVyfSAtIFN0YXJ0IHRoZSBJRCBpbmNyZW1lbnRlciBhdCBwc2V1ZG8gcmFuZG9tIHZhbHVlLCB1c2VkIGZvciBib3RoIHJlZ3VsYXIgYW5kIGN1c3RvbSBldmVudHMgKi9cbiAgICB0aGlzLl9pZEluY3JlbWVudG9yID0gKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIE1hdGguZmxvb3IoMjU2KSkgKiA1Njc4KTtcbiAgICAvKiogQHByaXZhdGVcbiAgICAgKiBAbWVtYmVyIHthbnlbXX0gLSBXZSBzdG9yZSBjbGFzc2ljYWwgZXZlbnQgbGlzdGVuZXJzIGluIGFycmF5IG9mIG9iamVjdHMgY29udGFpbmluZyBhbGwgdGhlaXIgaW5mb3JtYXRpb24gKi9cbiAgICB0aGlzLl9yZWd1bGFyRXZlbnRzID0gW107XG4gICAgLyoqIEBwcml2YXRlXG4gICAgICogQG1lbWJlciB7b2JqZWN0fSAtIFdlIHN0b3JlIGN1c3RvbSBldmVudHMgYnkgbmFtZSBhcyBrZXksIGVhY2gga2V5IHN0b3JlcyBhbiBBcnJheSBvZiBzdWJzY3JpYmVkIGV2ZW50cyAqL1xuICAgIHRoaXMuX2N1c3RvbUV2ZW50cyA9IHt9O1xuICAgIC8qKiBAcHVibGljXG4gICAgICogQG1lbWJlciB7c3RyaW5nfSAtIENvbXBvbmVudCB2ZXJzaW9uICovXG4gICAgdGhpcy52ZXJzaW9uID0gJzEuMi4xJztcbiAgfVxuXG5cbiAgLyoqIEBtZXRob2RcbiAgICogQG5hbWUgZGVzdHJveVxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBFdnRzXG4gICAqIEBkZXNjcmlwdGlvbiA8YmxvY2txdW90ZT5FdnRzIGRlc3RydWN0b3IuIFdpbGwgcmVtb3ZlIGFsbCBldmVudCBsaXN0ZW5lcnMgYW5kIGtleXMgaW4gaW5zdGFuY2UuPC9ibG9ja3F1b3RlPiAqL1xuICBkZXN0cm95KCkge1xuICAgIC8vIERlYnVnIGxvZ2dpbmdcbiAgICB0aGlzLl9yYWlzZSgnbG9nJywgJ0V2dHMuZGVzdHJveScpO1xuICAgIC8vIFJlbW92ZSBhbGwgZXhpc3RpbmcgZXZlbnRMaXN0ZW5lclxuICAgIHRoaXMucmVtb3ZlQWxsRXZlbnRzKCk7XG4gICAgLy8gRGVsZXRlIG9iamVjdCBhdHRyaWJ1dGVzXG4gICAgT2JqZWN0LmtleXModGhpcykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgZGVsZXRlIHRoaXNba2V5XTtcbiAgICB9KTtcbiAgfVxuXG5cbiAgLyogIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuICAvKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIENMQVNTSUMgSlMgRVZFTlRTIE9WRVJSSURFICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gICovXG4gIC8qICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbiAgLyogIFRoZSBmb2xsb3dpbmcgbWV0aG9kcyBhcmUgbWFkZSB0byBhYnN0cmFjdCB0aGUgZXZlbnQgbGlzdGVuZXJzIGZyb20gdGhlIEphdmFTY3JpcHQgbGF5ZXIsIHNvIHlvdSBjYW4gZWFzaWx5ICAgICAqL1xuICAvKiAgcmVtb3ZlIHRoZW0gd2hlbiBkb25lIHVzaW5nLCB3aXRob3V0IGJvdGhlcmluZyB3aXRoIGJpbmRpbmcgdXN1YWwgYnVzaW5lc3MgZm9yIHRoZW0uICdhZGRFdmVudC9yZW1vdmVFdmVudCcgICAgICovXG4gIC8qICBtZXRob2QgcmVwbGFjZSB0aGUgaW5pdGlhbCBvbmVzLiAncmVtb3ZlQWxsRXZlbnRzJyBjbGVhcnMgYWxsIGluc3RhbmNlIGV2ZW50IGxpc3RlbmVycyA7IG5pY2UgZm9yIGRlc3Ryb3kgICAgICAgKi9cbiAgLyogIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5cbiAgLyoqIEBtZXRob2RcbiAgICogQG5hbWUgYWRkRXZlbnRcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgRXZ0c1xuICAgKiBAZGVzY3JpcHRpb24gPGJsb2NrcXVvdGU+PGNvZGU+YWRkRXZlbnQ8L2NvZGU+IG1ldGhvZCBhYnN0cmFjdHMgdGhlIDxjb2RlPmFkZEV2ZW50TGlzdGVuZXI8L2NvZGU+IG1ldGhvZCB0byBlYXNpbHlcbiAgICogcmVtb3ZlIGl0IHdoZW4gbmVlZGVkLCBhbHNvIHRvIHNldCBhIGN1c3RvbSBzY29wZSBvbiBjYWxsYmFjay48L2Jsb2NrcXVvdGU+XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWUgLSBUaGUgZXZlbnQgbmFtZSB0byBmaXJlIChtb3VzZW1vdmUsIGNsaWNrLCBjb250ZXh0IGV0Yy4pXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBlbGVtZW50IC0gVGhlIERPTSBlbGVtZW50IHRvIGF0dGFjaCB0aGUgbGlzdGVuZXIgdG9cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgLSBUaGUgY2FsbGJhY2sgZnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIGV2ZW50IGlzIHJlYWxpc2VkXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBbc2NvcGU9ZWxlbWVudF0gLSBUaGUgZXZlbnQgc2NvcGUgdG8gYXBwbHkgdG8gdGhlIGNhbGxiYWNrIChvcHRpb25hbCwgZGVmYXVsdCB0byBET00gZWxlbWVudClcbiAgICogQHBhcmFtIHtvYmplY3R8Ym9vbGVhbn0gW29wdGlvbnM9ZmFsc2VdIC0gVGhlIGV2ZW50IG9wdGlvbnMgKHVzZUNhcHR1cmUgYW5kIGVsc2UpXG4gICAqIEByZXR1cm5zIHtudW1iZXJ8Ym9vbGVhbn0gLSBUaGUgZXZlbnQgSUQgdG8gdXNlIHRvIG1hbnVhbGx5IHJlbW92ZSBhbiBldmVudCwgZmFsc2UgaWYgYXJndW1lbnRzIGFyZSBpbnZhbGlkICovXG4gIGFkZEV2ZW50KGV2ZW50TmFtZSwgZWxlbWVudCwgY2FsbGJhY2ssIHNjb3BlID0gZWxlbWVudCwgb3B0aW9ucyA9IGZhbHNlKSB7XG4gICAgLy8gRGVidWcgbG9nZ2luZ1xuICAgIHRoaXMuX3JhaXNlKCdsb2cnLCBgRXZ0cy5hZGRFdmVudDogJHtldmVudE5hbWV9ICR7ZWxlbWVudH0gJHtjYWxsYmFja30gJHtzY29wZX0gJHtvcHRpb25zfWApO1xuICAgIC8vIE1pc3NpbmcgbWFuZGF0b3J5IGFyZ3VtZW50c1xuICAgIGlmIChldmVudE5hbWUgPT09IG51bGwgfHwgZXZlbnROYW1lID09PSB1bmRlZmluZWQgfHxcbiAgICAgIGVsZW1lbnQgPT09IG51bGwgfHwgZWxlbWVudCA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICBjYWxsYmFjayA9PT0gbnVsbCB8fCBjYWxsYmFjayA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLl9yYWlzZSgnZXJyb3InLCAnRXZ0cy5hZGRFdmVudDogTWlzc2luZyBtYW5kYXRvcnkgYXJndW1lbnRzJyk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8vIFByZXZlbnQgd3JvbmcgdHlwZSBmb3IgYXJndW1lbnRzIChtYW5kYXRvcnkgYW5kIG9wdGlvbmFsKVxuICAgIGNvbnN0IGVyciA9ICgpID0+IHtcbiAgICAgIHRoaXMuX3JhaXNlKCdlcnJvcicsICdFdnRzLmFkZEV2ZW50OiBXcm9uZyB0eXBlIGZvciBhcmd1bWVudCcpO1xuICAgIH07XG4gICAgLy8gVGVzdCBhcmd1bWVudCB2YWxpZGl0eSBmb3IgZnVydGhlciBwcm9jZXNzXG4gICAgaWYgKHR5cGVvZiBldmVudE5hbWUgIT09ICdzdHJpbmcnIHx8IHR5cGVvZiBlbGVtZW50ICE9PSAnb2JqZWN0JyB8fCB0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGVycigpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoKHNjb3BlICE9PSBudWxsICYmIHNjb3BlICE9PSB1bmRlZmluZWQpICYmIHR5cGVvZiBzY29wZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgIGVycigpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoKG9wdGlvbnMgIT09IG51bGwgJiYgb3B0aW9ucyAhPT0gdW5kZWZpbmVkKSAmJiAodHlwZW9mIG9wdGlvbnMgIT09ICdvYmplY3QnICYmIHR5cGVvZiBvcHRpb25zICE9PSAnYm9vbGVhbicpKSB7XG4gICAgICBlcnIoKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy8gU2F2ZSBzY29wZSB0byBjYWxsYmFjayBmdW5jdGlvbiwgZGVmYXVsdCBzY29wZSBpcyBET00gdGFyZ2V0IG9iamVjdFxuICAgIGNhbGxiYWNrID0gY2FsbGJhY2suYmluZChzY29wZSk7XG4gICAgLy8gQWRkIGV2ZW50IHRvIGludGVybmFsIGFycmF5IGFuZCBrZWVwIGFsbCBpdHMgZGF0YVxuICAgIHRoaXMuX3JlZ3VsYXJFdmVudHMucHVzaCh7XG4gICAgICBpZDogdGhpcy5faWRJbmNyZW1lbnRvcixcbiAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXG4gICAgICBldmVudE5hbWU6IGV2ZW50TmFtZSxcbiAgICAgIHNjb3BlOiBzY29wZSxcbiAgICAgIGNhbGxiYWNrOiBjYWxsYmFjayxcbiAgICAgIG9wdGlvbnM6IG9wdGlvbnNcbiAgICB9KTtcbiAgICAvLyBBZGQgZXZlbnQgbGlzdGVuZXIgd2l0aCBvcHRpb25zXG4gICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgY2FsbGJhY2ssIG9wdGlvbnMpO1xuICAgIC8vIFBvc3QgaW5jcmVtZW50IHRvIHJldHVybiB0aGUgdHJ1ZSBldmVudCBlbnRyeSBpZCwgdGhlbiB1cGRhdGUgdGhlIGluY3JlbWVudGVyXG4gICAgcmV0dXJuIHRoaXMuX2lkSW5jcmVtZW50b3IrKztcbiAgfVxuXG5cbiAgLyoqIEBtZXRob2RcbiAgICogQG5hbWUgcmVtb3ZlRXZlbnRcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgRXZ0c1xuICAgKiBAZGVzY3JpcHRpb24gPGJsb2NrcXVvdGU+PGNvZGU+cmVtb3ZlRXZlbnQ8L2NvZGU+IG1ldGhvZCBhYnN0cmFjdHMgdGhlIDxjb2RlPnJlbW92ZUV2ZW50TGlzdGVuZXI8L2NvZGU+IG1ldGhvZCB0b1xuICAgKiByZWFsbHkgcmVtb3ZlIGV2ZW50IGxpc3RlbmVycy48L2Jsb2NrcXVvdGU+XG4gICAqIEBwYXJhbSB7bnVtYmVyfSBldmVudElkIC0gVGhlIGV2ZW50IElEIHRvIHJlbW92ZSBsaXN0ZW5lciBmcm9tLiBSZXR1cm5lZCB3aGVuIGFkZEV2ZW50IGlzIGNhbGxlZFxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gLSBUaGUgbWV0aG9kIHN0YXR1cyA7IHRydWUgZm9yIHN1Y2Nlc3MsIGZhbHNlIGZvciBub24tZXhpc3RpbmcgZXZlbnQgKi9cbiAgcmVtb3ZlRXZlbnQoZXZlbnRJZCkge1xuICAgIC8vIERlYnVnIGxvZ2dpbmdcbiAgICB0aGlzLl9yYWlzZSgnbG9nJywgYEV2ZW50cy5yZW1vdmVFdmVudDogJHtldmVudElkfWApO1xuICAgIC8vIE1pc3NpbmcgbWFuZGF0b3J5IGFyZ3VtZW50c1xuICAgIGlmIChldmVudElkID09PSBudWxsIHx8IGV2ZW50SWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5fcmFpc2UoJ2Vycm9yJywgJ0V2dHMucmVtb3ZlRXZlbnQ6IE1pc3NpbmcgbWFuZGF0b3J5IGFyZ3VtZW50cycpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvLyBQcmV2ZW50IHdyb25nIHR5cGUgZm9yIGFyZ3VtZW50cyAobWFuZGF0b3J5KVxuICAgIGlmICh0eXBlb2YgZXZlbnRJZCAhPT0gJ251bWJlcicpIHtcbiAgICAgIHRoaXMuX3JhaXNlKCdlcnJvcicsICdFdnRzLnJlbW92ZUV2ZW50OiBXcm9uZyB0eXBlIGZvciBhcmd1bWVudCcpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvLyBSZXR1cm5lZCB2YWx1ZVxuICAgIGxldCBzdGF0dXNDb2RlID0gZmFsc2U7IC8vIE5vdCBmb3VuZCBzdGF0dXMgY29kZSBieSBkZWZhdWx0IChmYWxzZSlcbiAgICAvLyBJdGVyYXRlIG92ZXIgc2F2ZWQgbGlzdGVuZXJzLCByZXZlcnNlIG9yZGVyIGZvciBwcm9wZXIgc3BsaWNpbmdcbiAgICBmb3IgKGxldCBpID0gKHRoaXMuX3JlZ3VsYXJFdmVudHMubGVuZ3RoIC0gMSk7IGkgPj0gMCA7IC0taSkge1xuICAgICAgLy8gSWYgYW4gZXZlbnQgSUQgbWF0Y2ggaW4gc2F2ZWQgb25lcywgd2UgcmVtb3ZlIGl0IGFuZCB1cGRhdGUgc2F2ZWQgbGlzdGVuZXJzXG4gICAgICBpZiAodGhpcy5fcmVndWxhckV2ZW50c1tpXS5pZCA9PT0gZXZlbnRJZCkge1xuICAgICAgICAvLyBVcGRhdGUgc3RhdHVzIGNvZGVcbiAgICAgICAgc3RhdHVzQ29kZSA9IHRydWU7IC8vIEZvdW5kIGFuZCByZW1vdmVkIGV2ZW50IGxpc3RlbmVyIHN0YXR1cyBjb2RlICh0cnVlKVxuICAgICAgICB0aGlzLl9jbGVhclJlZ3VsYXJFdmVudChpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gUmV0dXJuIHdpdGggc3RhdHVzIGNvZGVcbiAgICByZXR1cm4gc3RhdHVzQ29kZTtcbiAgfVxuXG5cbiAgLyoqIEBtZXRob2RcbiAgICogQG5hbWUgcmVtb3ZlQWxsRXZlbnRzXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIEV2dHNcbiAgICogQGRlc2NyaXB0aW9uIDxibG9ja3F1b3RlPkNsZWFyIGFsbCBldmVudCBsaXN0ZW5lciByZWdpc3RlcmVkIHRocm91Z2ggdGhpcyBjbGFzcyBvYmplY3QuPC9ibG9ja3F1b3RlPlxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gLSBUaGUgbWV0aG9kIHN0YXR1cyA7IHRydWUgZm9yIHN1Y2Nlc3MsIGZhbHNlIGZvciBub3QgcmVtb3ZlZCBhbnkgZXZlbnQgKi9cbiAgcmVtb3ZlQWxsRXZlbnRzKCkge1xuICAgIC8vIERlYnVnIGxvZ2dpbmdcbiAgICB0aGlzLl9yYWlzZSgnbG9nJywgJ0V2dHMucmVtb3ZlQWxsRXZlbnRzJyk7XG4gICAgLy8gUmV0dXJuZWQgdmFsdWVcbiAgICBsZXQgc3RhdHVzQ29kZSA9IGZhbHNlOyAvLyBEaWRuJ3QgcmVtb3ZlZCBhbnkgc3RhdHVzIGNvZGUgYnkgZGVmYXVsdCAoZmFsc2UpXG4gICAgLy8gRmxhZyB0byBrbm93IGlmIHRoZXJlIHdhcyBhbnkgcHJldmlvdXNseSBzdG9yZWQgZXZlbnQgbGlzdGVuZXJzXG4gICAgY29uc3QgaGFkRXZlbnRzID0gKHRoaXMuX3JlZ3VsYXJFdmVudHMubGVuZ3RoID4gMCk7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIHNhdmVkIGxpc3RlbmVycywgcmV2ZXJzZSBvcmRlciBmb3IgcHJvcGVyIHNwbGljaW5nXG4gICAgZm9yIChsZXQgaSA9ICh0aGlzLl9yZWd1bGFyRXZlbnRzLmxlbmd0aCAtIDEpOyBpID49IDA7IC0taSkge1xuICAgICAgdGhpcy5fY2xlYXJSZWd1bGFyRXZlbnQoaSk7XG4gICAgfVxuICAgIC8vIElmIGFsbCBldmVudHMgd2hlcmUgcmVtb3ZlZCwgdXBkYXRlIHN0YXR1c0NvZGUgdG8gc3VjY2Vzc1xuICAgIGlmICh0aGlzLl9yZWd1bGFyRXZlbnRzLmxlbmd0aCA9PT0gMCAmJiBoYWRFdmVudHMpIHtcbiAgICAgIC8vIFVwZGF0ZSBzdGF0dXMgY29kZVxuICAgICAgc3RhdHVzQ29kZSA9IHRydWU7IC8vIEZvdW5kIGFuZCByZW1vdmVkIGFsbCBldmVudHMgbGlzdGVuZXIgc3RhdHVzIGNvZGUgKHRydWUpXG4gICAgfVxuICAgIC8vIFJldHVybiB3aXRoIHN0YXR1cyBjb2RlXG4gICAgcmV0dXJuIHN0YXR1c0NvZGU7XG4gIH1cblxuXG4gIC8qKiBAbWV0aG9kXG4gICAqIEBuYW1lIF9jbGVhclJlZ3VsYXJFdmVudFxuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgRXZ0c1xuICAgKiBAZGVzY3JpcHRpb24gPGJsb2NrcXVvdGU+PGNvZGU+X2NsZWFyUmVndWxhckV2ZW50PC9jb2RlPiBtZXRob2QgcmVtb3ZlIHRoZSBzYXZlZCBldmVudCBsaXN0ZW5lciBmb3IgYVxuICAgKiBnaXZlbiBpbmRleCBpbiByZWd1bGFyRXZlbnRzIGFycmF5IHJhbmdlLjwvYmxvY2txdW90ZT5cbiAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IC0gVGhlIHJlZ3VsYXIgZXZlbnQgaW5kZXggdG8gcmVtb3ZlIGZyb20gY2xhc3MgYXR0cmlidXRlc1xuICAgKiBAcmV0dXJuIHtib29sZWFufSAtIFRoZSBtZXRob2Qgc3RhdHVzIDsgdHJ1ZSBmb3Igc3VjY2VzcywgZmFsc2UgZm9yIG5vdCBjbGVhcmVkIGFueSBldmVudCAqL1xuICBfY2xlYXJSZWd1bGFyRXZlbnQoaW5kZXgpIHtcbiAgICAvLyBEZWJ1ZyBsb2dnaW5nXG4gICAgdGhpcy5fcmFpc2UoJ2xvZycsIGBFdnRzLl9jbGVhclJlZ3VsYXJFdmVudDogJHtpbmRleH1gKTtcbiAgICAvLyBNaXNzaW5nIG1hbmRhdG9yeSBhcmd1bWVudHNcbiAgICBpZiAoaW5kZXggPT09IG51bGwgfHwgaW5kZXggPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5fcmFpc2UoJ2Vycm9yJywgJ0V2dHMuX2NsZWFyUmVndWxhckV2ZW50OiBNaXNzaW5nIG1hbmRhdG9yeSBhcmd1bWVudCcpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvLyBQcmV2ZW50IHdyb25nIHR5cGUgZm9yIGFyZ3VtZW50cyAobWFuZGF0b3J5KVxuICAgIGlmICh0eXBlb2YgaW5kZXggIT09ICdudW1iZXInKSB7XG4gICAgICB0aGlzLl9yYWlzZSgnZXJyb3InLCAnRXZ0cy5fY2xlYXJSZWd1bGFyRXZlbnQ6IFdyb25nIHR5cGUgZm9yIGFyZ3VtZW50Jyk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8vIENoZWNrIGlmIGluZGV4IG1hdGNoIGFuIGV4aXN0aW5nIGV2ZW50IGluIGF0dHJpYnV0ZXNcbiAgICBpZiAodGhpcy5fcmVndWxhckV2ZW50c1tpbmRleF0pIHtcbiAgICAgIC8vIFJlbW92ZSBpdHMgZXZlbnQgbGlzdGVuZXIgYW5kIHVwZGF0ZSByZWd1bGFyRXZlbnRzIGFycmF5XG4gICAgICBjb25zdCBldnQgPSB0aGlzLl9yZWd1bGFyRXZlbnRzW2luZGV4XTtcbiAgICAgIGV2dC5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0LmV2ZW50TmFtZSwgZXZ0LmNhbGxiYWNrLCBldnQub3B0aW9ucyk7XG4gICAgICB0aGlzLl9yZWd1bGFyRXZlbnRzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuXG4gIC8qICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbiAgLyogIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIENVU1RPTSBKUyBFVkVOVFMgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICAqL1xuICAvKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4gIC8qICBUaGUgdGhyZWUgZm9sbG93aW5nIG1ldGhvZHMgKHN1YnNjcmliZSwgdW5zdWJzY3JpYmUsIHB1Ymxpc2gpIGFyZSBkZXNpZ25lZCB0byByZWZlcmVuY2UgYW4gZXZlbnQgYnkgaXRzIG5hbWUgICAgKi9cbiAgLyogIGFuZCBoYW5kbGUgYXMgbWFueSBzdWJzY3JpcHRpb25zIGFzIHlvdSB3YW50LiBXaGVuIHN1YnNjcmliaW5nLCB5b3UgZ2V0IGFuIElEIHlvdSBjYW4gdXNlIHRvIHVuc3Vic2NyaWJlIHlvdXIgICAqL1xuICAvKiAgZXZlbnQgbGF0ZXIuIEp1c3QgcHVibGlzaCB3aXRoIHRoZSBldmVudCBuYW1lIHRvIGNhbGxiYWNrIGFsbCBpdHMgcmVnaXN0ZXJlZCBzdWJzY3JpcHRpb25zLiAgICAgICAgICAgICAgICAgICAgICovXG4gIC8qICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuXG4gIC8qKiBAbWV0aG9kXG4gICAqIEBuYW1lIHN1YnNjcmliZVxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBFdnRzXG4gICAqIEBkZXNjcmlwdGlvbiA8YmxvY2txdW90ZT5TdWJzY3JpYmUgbWV0aG9kIGFsbG93IHlvdSB0byBsaXN0ZW4gdG8gYW4gZXZlbnQgYW5kIHJlYWN0IHdoZW4gaXQgb2NjdXJzLjwvYmxvY2txdW90ZT5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50TmFtZSAtIEV2ZW50IG5hbWUgKHRoZSBvbmUgdG8gdXNlIHRvIHB1Ymxpc2gpXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIC0gVGhlIGNhbGxiYWNrIHRvIGV4ZWN1dGUgd2hlbiBldmVudCBpcyBwdWJsaXNoZWRcbiAgICogQHBhcmFtIHtib29sZWFufSBbb25lU2hvdD1mYWxzZV0gLSBPbmUgc2hvdCA6IHRvIHJlbW92ZSBzdWJzY3JpcHRpb24gdGhlIGZpcnN0IHRpbWUgY2FsbGJhY2sgaXMgZmlyZWRcbiAgICogQHJldHVybnMge251bWJlcnxib29sZWFufSAtIFRoZSBldmVudCBpZCwgdG8gYmUgdXNlZCB3aGVuIG1hbnVhbGx5IHVuc3Vic2NyaWJpbmcgKi9cbiAgc3Vic2NyaWJlKGV2ZW50TmFtZSwgY2FsbGJhY2ssIG9uZVNob3QgPSBmYWxzZSkge1xuICAgIC8vIERlYnVnIGxvZ2dpbmdcbiAgICB0aGlzLl9yYWlzZSgnbG9nJywgYEV2dHMuc3Vic2NyaWJlOiAke2V2ZW50TmFtZX0gJHtjYWxsYmFja30gJHtvbmVTaG90fWApO1xuICAgIC8vIE1pc3NpbmcgbWFuZGF0b3J5IGFyZ3VtZW50c1xuICAgIGlmIChldmVudE5hbWUgPT09IG51bGwgfHwgZXZlbnROYW1lID09PSB1bmRlZmluZWQgfHxcbiAgICAgIGNhbGxiYWNrID09PSBudWxsIHx8IGNhbGxiYWNrID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuX3JhaXNlKCdlcnJvcicsICdFdnRzLnN1YnNjcmliZScsICdNaXNzaW5nIG1hbmRhdG9yeSBhcmd1bWVudHMnKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy8gUHJldmVudCB3cm9uZyB0eXBlIGZvciBhcmd1bWVudHMgKG1hbmRhdG9yeSBhbmQgb3B0aW9uYWwpXG4gICAgY29uc3QgZXJyID0gKCkgPT4ge1xuICAgICAgdGhpcy5fcmFpc2UoJ2Vycm9yJywgJ0V2dHMuc3Vic2NyaWJlOiBXcm9uZyB0eXBlIGZvciBhcmd1bWVudCcpO1xuICAgIH07XG4gICAgaWYgKHR5cGVvZiBldmVudE5hbWUgIT09ICdzdHJpbmcnIHx8IHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgZXJyKCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICgob25lU2hvdCAhPT0gbnVsbCAmJiBvbmVTaG90ICE9PSB1bmRlZmluZWQpICYmIHR5cGVvZiBvbmVTaG90ICE9PSAnYm9vbGVhbicpIHtcbiAgICAgIGVycigpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvLyBDcmVhdGUgZXZlbnQgZW50cnkgaWYgbm90IGFscmVhZHkgZXhpc3RpbmcgaW4gdGhlIHJlZ2lzdGVyZWQgZXZlbnRzXG4gICAgaWYgKCF0aGlzLl9jdXN0b21FdmVudHNbZXZlbnROYW1lXSkge1xuICAgICAgdGhpcy5fY3VzdG9tRXZlbnRzW2V2ZW50TmFtZV0gPSBbXTsgLy8gU2V0IGVtcHR5IGFycmF5IGZvciBuZXcgZXZlbnQgc3Vic2NyaXB0aW9uc1xuICAgIH1cbiAgICAvLyBQdXNoIG5ldyBzdWJzY3JpcHRpb24gZm9yIGV2ZW50IG5hbWVcbiAgICB0aGlzLl9jdXN0b21FdmVudHNbZXZlbnROYW1lXS5wdXNoKHtcbiAgICAgIGlkOiB0aGlzLl9pZEluY3JlbWVudG9yLFxuICAgICAgbmFtZTogZXZlbnROYW1lLFxuICAgICAgb3M6IG9uZVNob3QsXG4gICAgICBjYWxsYmFjazogY2FsbGJhY2tcbiAgICB9KTtcbiAgICAvLyBQb3N0IGluY3JlbWVudCB0byByZXR1cm4gdGhlIHRydWUgZXZlbnQgZW50cnkgaWQsIHRoZW4gdXBkYXRlIHRoZSBpbmNyZW1lbnRlclxuICAgIHJldHVybiB0aGlzLl9pZEluY3JlbWVudG9yKys7XG4gIH1cblxuXG4gIC8qKiBAbWV0aG9kXG4gICAqIEBuYW1lIHVuc3Vic2NyaWJlXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIEV2dHNcbiAgICogQGRlc2NyaXB0aW9uIDxibG9ja3F1b3RlPlVuc3Vic2NyaWJlIG1ldGhvZCBhbGxvdyB5b3UgdG8gcmV2b2tlIGFuIGV2ZW50IHN1YnNjcmlwdGlvbiBmcm9tIGl0cyBzdHJpbmcgbmFtZS48L2Jsb2NrcXVvdGU+XG4gICAqIEBwYXJhbSB7bnVtYmVyfSBldmVudElkIC0gVGhlIHN1YnNjcmlwdGlvbiBpZCByZXR1cm5lZCB3aGVuIHN1YnNjcmliaW5nIHRvIGFuIGV2ZW50IG5hbWVcbiAgICogQHJldHVybnMge2Jvb2xlYW59IC0gVGhlIG1ldGhvZCBzdGF0dXMgOyB0cnVlIGZvciBzdWNjZXNzLCBmYWxzZSBmb3Igbm9uLWV4aXN0aW5nIHN1YnNjcmlwdGlvbiAqKi9cbiAgdW5zdWJzY3JpYmUoZXZlbnRJZCkge1xuICAgIC8vIERlYnVnIGxvZ2dpbmdcbiAgICB0aGlzLl9yYWlzZSgnbG9nJywgYEV2dHMudW5zdWJzY3JpYmU6ICR7ZXZlbnRJZH1gKTtcbiAgICAvLyBNaXNzaW5nIG1hbmRhdG9yeSBhcmd1bWVudHNcbiAgICBpZiAoZXZlbnRJZCA9PT0gbnVsbCB8fCBldmVudElkID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuX3JhaXNlKCdlcnJvcicsICdFdnRzLnVuc3Vic2NyaWJlOiBNaXNzaW5nIG1hbmRhdG9yeSBhcmd1bWVudHMnKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy8gUHJldmVudCB3cm9uZyB0eXBlIGZvciBhcmd1bWVudHMgKG1hbmRhdG9yeSlcbiAgICBpZiAodHlwZW9mIGV2ZW50SWQgIT09ICdudW1iZXInKSB7XG4gICAgICB0aGlzLl9yYWlzZSgnZXJyb3InLCAnRXZ0cy51bnN1YnNjcmliZTogV3JvbmcgdHlwZSBmb3IgYXJndW1lbnQnKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy8gUmV0dXJuZWQgdmFsdWVcbiAgICBsZXQgc3RhdHVzQ29kZSA9IGZhbHNlOyAvLyBOb3QgZm91bmQgc3RhdHVzIGNvZGUgYnkgZGVmYXVsdCAoZmFsc2UpXG4gICAgLy8gU2F2ZSBldmVudCBrZXlzIHRvIGl0ZXJhdGUgcHJvcGVybHkgb24gdGhpcy5fZXZlbnRzIE9iamVjdFxuICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyh0aGlzLl9jdXN0b21FdmVudHMpO1xuICAgIC8vIFJldmVyc2UgZXZlbnRzIGl0ZXJhdGlvbiB0byBwcm9wZXJseSBzcGxpY2Ugd2l0aG91dCBtZXNzaW5nIHdpdGggaXRlcmF0aW9uIG9yZGVyXG4gICAgZm9yIChsZXQgaSA9IChrZXlzLmxlbmd0aCAtIDEpOyBpID49IDA7IC0taSkge1xuICAgICAgLy8gR2V0IGV2ZW50IHN1YnNjcmlwdGlvbnNcbiAgICAgIGNvbnN0IHN1YnMgPSB0aGlzLl9jdXN0b21FdmVudHNba2V5c1tpXV07XG4gICAgICAvLyBJdGVyYXRlIG92ZXIgZXZlbnRzIHN1YnNjcmlwdGlvbnMgdG8gZmluZCB0aGUgb25lIHdpdGggZ2l2ZW4gaWRcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgc3Vicy5sZW5ndGg7ICsraikge1xuICAgICAgICAvLyBJbiBjYXNlIHdlIGdvdCBhIHN1YnNjcmlwdGlvbiBmb3IgdGhpcyBldmVudHNcbiAgICAgICAgaWYgKHN1YnNbal0uaWQgPT09IGV2ZW50SWQpIHtcbiAgICAgICAgICAvLyBEZWJ1ZyBsb2dnaW5nXG4gICAgICAgICAgdGhpcy5fcmFpc2UoJ2xvZycsIGBFdnRzLnVuc3Vic2NyaWJlOiBzdWJzY3JpcHRpb24gZm91bmRcXG5gLCBzdWJzW2pdLCBgXFxuU3Vic2NyaXB0aW9uIG7CsCR7ZXZlbnRJZH0gZm9yICR7c3Vicy5uYW1lfSBoYXMgYmVlbiByZW1vdmVkYCk7XG4gICAgICAgICAgLy8gVXBkYXRlIHN0YXR1cyBjb2RlXG4gICAgICAgICAgc3RhdHVzQ29kZSA9IHRydWU7IC8vIEZvdW5kIGFuZCB1bnN1YnNjcmliZWQgc3RhdHVzIGNvZGUgKHRydWUpXG4gICAgICAgICAgLy8gUmVtb3ZlIHN1YnNjcmlwdGlvbiBmcm9tIGV2ZW50IEFycmF5XG4gICAgICAgICAgc3Vicy5zcGxpY2UoaiwgMSk7XG4gICAgICAgICAgLy8gUmVtb3ZlIGV2ZW50IG5hbWUgaWYgbm8gcmVtYWluaW5nIHN1YnNjcmlwdGlvbnNcbiAgICAgICAgICBpZiAoc3Vicy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9jdXN0b21FdmVudHNba2V5c1tpXV07XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIEJyZWFrIHNpbmNlIGlkIGFyZSB1bmlxdWUgYW5kIG5vIG90aGVyIHN1YnNjcmlwdGlvbiBjYW4gYmUgZm91bmQgYWZ0ZXJcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICAvLyBSZXR1cm4gd2l0aCBzdGF0dXMgY29kZVxuICAgIHJldHVybiBzdGF0dXNDb2RlO1xuICB9XG5cblxuICAvKiogQG1ldGhvZFxuICAgKiBAbmFtZSB1bnN1YnNjcmliZUFsbEZvclxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBFdnRzXG4gICAqIEBkZXNjcmlwdGlvbiA8YmxvY2txdW90ZT48Y29kZT51bnN1YnNjcmliZUFsbEZvcjwvY29kZT4gbWV0aG9kIGNsZWFyIGFsbCBzdWJzY3JpcHRpb25zIHJlZ2lzdGVyZWQgZm9yIGdpdmVuIGV2ZW50IG5hbWUuPC9ibG9ja3F1b3RlPlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnROYW1lIC0gVGhlIGV2ZW50IHRvIGNsZWFyIHN1YnNjcmlwdGlvbiBmcm9tXG4gICAqIEByZXR1cm5zIHtib29sZWFufSAtIFRoZSBtZXRob2Qgc3RhdHVzIDsgdHJ1ZSBmb3Igc3VjY2VzcywgZmFsc2UgZm9yIG5vbi1leGlzdGluZyBldmVudCAqKi9cbiAgdW5zdWJzY3JpYmVBbGxGb3IoZXZlbnROYW1lKSB7XG4gICAgLy8gRGVidWcgbG9nZ2luZ1xuICAgIHRoaXMuX3JhaXNlKCdsb2cnLCBgRXZ0cy51bnN1YnNjcmliZUFsbEZvcjogJHtldmVudE5hbWV9YCk7XG4gICAgLy8gTWlzc2luZyBtYW5kYXRvcnkgYXJndW1lbnRzXG4gICAgaWYgKGV2ZW50TmFtZSA9PT0gbnVsbCB8fCBldmVudE5hbWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5fcmFpc2UoJ2Vycm9yJywgJ0V2dHMudW5zdWJzY3JpYmVBbGxGb3I6IE1pc3NpbmcgbWFuZGF0b3J5IGFyZ3VtZW50cycpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvLyBQcmV2ZW50IHdyb25nIHR5cGUgZm9yIGFyZ3VtZW50cyAobWFuZGF0b3J5IGFuZCBvcHRpb25hbClcbiAgICBpZiAodHlwZW9mIGV2ZW50TmFtZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRoaXMuX3JhaXNlKCdlcnJvcicsICdFdnRzLnVuc3Vic2NyaWJlQWxsRm9yOiBXcm9uZyB0eXBlIGZvciBhcmd1bWVudCcpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvLyBSZXR1cm5lZCB2YWx1ZVxuICAgIGxldCBzdGF0dXNDb2RlID0gZmFsc2U7IC8vIE5vdCBmb3VuZCBzdGF0dXMgY29kZSBieSBkZWZhdWx0IChmYWxzZSlcbiAgICAvLyBTYXZlIGV2ZW50IGtleXMgdG8gaXRlcmF0ZSBwcm9wZXJseSBvbiB0aGlzLl9ldmVudHMgT2JqZWN0XG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMuX2N1c3RvbUV2ZW50cyk7XG4gICAgLy8gSXRlcmF0ZSB0aHJvdWdoIGN1c3RvbSBldmVudCBrZXlzIHRvIGZpbmQgbWF0Y2hpbmcgZXZlbnQgdG8gcmVtb3ZlXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICBpZiAoa2V5c1tpXSA9PT0gZXZlbnROYW1lKSB7XG4gICAgICAgIC8vIEdldCBldmVudCBzdWJzY3JpcHRpb25zXG4gICAgICAgIGNvbnN0IHN1YnMgPSB0aGlzLl9jdXN0b21FdmVudHNba2V5c1tpXV07XG4gICAgICAgIC8vIEl0ZXJhdGUgb3ZlciBldmVudHMgc3Vic2NyaXB0aW9ucyB0byBmaW5kIHRoZSBvbmUgd2l0aCBnaXZlbiBpZCwgcmV2ZXJzZSBpdGVyYXRpb24gdG8gcHJvcGVybHkgc3BsaWNlIHdpdGhvdXQgbWVzc2luZyB3aXRoIGl0ZXJhdGlvbiBvcmRlclxuICAgICAgICBmb3IgKGxldCBqID0gKHN1YnMubGVuZ3RoIC0gMSk7IGogPj0gMDsgLS1qKSB7XG4gICAgICAgICAgLy8gVXBkYXRlIHN0YXR1cyBjb2RlXG4gICAgICAgICAgc3RhdHVzQ29kZSA9IHRydWU7IC8vIEZvdW5kIGFuZCB1bnN1YnNjcmliZWQgYWxsIHN0YXR1cyBjb2RlICh0cnVlKVxuICAgICAgICAgIC8vIFJlbW92ZSBzdWJzY3JpcHRpb24gZnJvbSBldmVudCBBcnJheVxuICAgICAgICAgIHN1YnMuc3BsaWNlKGosIDEpO1xuICAgICAgICAgIC8vIFJlbW92ZSBldmVudCBuYW1lIGlmIG5vIHJlbWFpbmluZyBzdWJzY3JpcHRpb25zXG4gICAgICAgICAgaWYgKHN1YnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5fY3VzdG9tRXZlbnRzW2tleXNbaV1dO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICAvLyBSZXR1cm4gd2l0aCBzdGF0dXMgY29kZVxuICAgIHJldHVybiBzdGF0dXNDb2RlO1xuICB9XG5cblxuICAvKiogQG1ldGhvZFxuICAgKiBAbmFtZSBwdWJsaXNoXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIEV2dHNcbiAgICogQGRlc2NyaXB0aW9uIDxibG9ja3F1b3RlPjxjb2RlPlB1Ymxpc2g8L2NvZGU+IG1ldGhvZCBhbGxvdyB5b3UgdG8gZmlyZSBhbiBldmVudCBieSBuYW1lIGFuZCB0cmlnZ2VyIGFsbCBpdHMgc3Vic2NyaXB0aW9uIGJ5IGNhbGxiYWNrcy4vYmxvY2txdW90ZT5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50TmFtZSAtIEV2ZW50IG5hbWUgKHRoZSBvbmUgdG8gdXNlIHRvIHB1Ymxpc2gpXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBbZGF0YT11bmRlZmluZWRdIC0gVGhlIGRhdGEgb2JqZWN0IHRvIHNlbnQgdGhyb3VnaCB0aGUgY3VzdG9tIGV2ZW50XG4gICAqIEByZXR1cm5zIHtib29sZWFufSAtIFRoZSBtZXRob2Qgc3RhdHVzIDsgdHJ1ZSBmb3Igc3VjY2VzcywgZmFsc2UgZm9yIG5vbi1leGlzdGluZyBldmVudCAqKi9cbiAgcHVibGlzaChldmVudE5hbWUsIGRhdGEgPSBudWxsKSB7XG4gICAgLy8gRGVidWcgbG9nZ2luZ1xuICAgIHRoaXMuX3JhaXNlKCdsb2cnLCBgRXZ0cy5wdWJsaXNoOiAke2V2ZW50TmFtZX0gJHtkYXRhfWApO1xuICAgIC8vIE1pc3NpbmcgbWFuZGF0b3J5IGFyZ3VtZW50c1xuICAgIGlmIChldmVudE5hbWUgPT09IG51bGwgfHwgZXZlbnROYW1lID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuX3JhaXNlKCdlcnJvcicsICdFdnRzLnB1Ymxpc2g6IE1pc3NpbmcgbWFuZGF0b3J5IGFyZ3VtZW50cycpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvLyBQcmV2ZW50IHdyb25nIHR5cGUgZm9yIGFyZ3VtZW50cyAobWFuZGF0b3J5IGFuZCBvcHRpb25hbClcbiAgICBpZiAodHlwZW9mIGV2ZW50TmFtZSAhPT0gJ3N0cmluZycgfHwgKGRhdGEgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgZGF0YSAhPT0gJ29iamVjdCcpKSB7XG4gICAgICB0aGlzLl9yYWlzZSgnZXJyb3InLCAnRXZ0cy5wdWJsaXNoOiBXcm9uZyB0eXBlIGZvciBhcmd1bWVudCcpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvLyBSZXR1cm5lZCB2YWx1ZVxuICAgIGxldCBzdGF0dXNDb2RlID0gZmFsc2U7IC8vIE5vdCBmb3VuZCBzdGF0dXMgY29kZSBieSBkZWZhdWx0IChmYWxzZSlcbiAgICAvLyBTYXZlIGV2ZW50IGtleXMgdG8gaXRlcmF0ZSBwcm9wZXJseSBvbiB0aGlzLl9ldmVudHMgT2JqZWN0XG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMuX2N1c3RvbUV2ZW50cyk7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIHNhdmVkIGN1c3RvbSBldmVudHNcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgIC8vIElmIHB1Ymxpc2hlZCBuYW1lIG1hdGNoIGFuIGV4aXN0aW5nIGV2ZW50cywgd2UgaXRlcmF0ZSBpdHMgc3Vic2NyaXB0aW9ucy4gRmlyc3Qgc3Vic2NyaWJlZCwgZmlyc3Qgc2VydmVkXG4gICAgICBpZiAoa2V5c1tpXSA9PT0gZXZlbnROYW1lKSB7XG4gICAgICAgIC8vIFVwZGF0ZSBzdGF0dXMgY29kZVxuICAgICAgICBzdGF0dXNDb2RlID0gdHJ1ZTsgLy8gRm91bmQgYW5kIHB1Ymxpc2hlZCBzdGF0dXMgY29kZSAodHJ1ZSlcbiAgICAgICAgLy8gR2V0IGV2ZW50IHN1YnNjcmlwdGlvbnNcbiAgICAgICAgY29uc3Qgc3VicyA9IHRoaXMuX2N1c3RvbUV2ZW50c1trZXlzW2ldXTtcbiAgICAgICAgLy8gSXRlcmF0ZSBvdmVyIGV2ZW50cyBzdWJzY3JpcHRpb25zIHRvIGZpbmQgdGhlIG9uZSB3aXRoIGdpdmVuIGlkXG4gICAgICAgIC8vIFJldmVyc2Ugc3Vic2NyaXB0aW9ucyBpdGVyYXRpb24gdG8gcHJvcGVybHkgc3BsaWNlIHdpdGhvdXQgbWVzc2luZyB3aXRoIGl0ZXJhdGlvbiBvcmRlclxuICAgICAgICBmb3IgKGxldCBqID0gKHN1YnMubGVuZ3RoIC0gMSk7IGogPj0gMDsgLS1qKSB7XG4gICAgICAgICAgLy8gRGVidWcgbG9nZ2luZ1xuICAgICAgICAgIHRoaXMuX3JhaXNlKCdsb2cnLCBgRXZ0cy5wdWJsaXNoOiBmaXJlIGNhbGxiYWNrIGZvciAke2V2ZW50TmFtZX0sIHN1YnNjcmlwdGlvbiBuwrAke3N1YnNbal0uaWR9YCwgc3Vic1tqXSk7XG4gICAgICAgICAgLy8gRmlyZSBzYXZlZCBjYWxsYmFja1xuICAgICAgICAgIHN1YnNbal0uY2FsbGJhY2soZGF0YSk7XG4gICAgICAgICAgLy8gUmVtb3ZlIG9uZVNob3QgbGlzdGVuZXIgZnJvbSBldmVudCBlbnRyeVxuICAgICAgICAgIGlmIChzdWJzW2pdLm9zKSB7XG4gICAgICAgICAgICAvLyBEZWJ1ZyBsb2dnaW5nXG4gICAgICAgICAgICB0aGlzLl9yYWlzZSgnbG9nJywgJ0V2dHMucHVibGlzaDogcmVtb3ZlIHN1YnNjcmlwdGlvbiBiZWNhdXNlIG9uZSBzaG90IHVzYWdlIGlzIGRvbmUnKTtcbiAgICAgICAgICAgIHN1YnMuc3BsaWNlKGosIDEpO1xuICAgICAgICAgICAgLy8gUmVtb3ZlIGV2ZW50IG5hbWUgaWYgbm8gcmVtYWluaW5nIHN1YnNjcmlwdGlvbnNcbiAgICAgICAgICAgIGlmIChzdWJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fY3VzdG9tRXZlbnRzW2tleXNbaV1dO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICAvLyBSZXR1cm4gd2l0aCBzdGF0dXMgY29kZVxuICAgIHJldHVybiBzdGF0dXNDb2RlO1xuICB9XG5cblxuICAvKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4gIC8qICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgQ09NUE9ORU5UIFVUSUxTICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgKi9cbiAgLyogIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5cbiAgLyoqIEBtZXRob2RcbiAgICogQG5hbWUgX3JhaXNlXG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBFdnRzXG4gICAqIEBkZXNjcmlwdGlvbiA8YmxvY2txdW90ZT5JbnRlcm5hbCBtZXRob2QgdG8gYWJzdHJhY3QgY29uc29sZSB3cmFwcGVkIGluIGRlYnVnIGZsYWcuL2Jsb2NrcXVvdGU+XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBsZXZlbCAtIFRoZSBjb25zb2xlIG1ldGhvZCB0byBjYWxsXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBlcnJvclZhbHVlIC0gVGhlIGVycm9yIHZhbHVlIHRvIGRpc3BsYXkgaW4gY29uc29sZSBtZXRob2QgKiovXG4gIF9yYWlzZShsZXZlbCwgZXJyb3JWYWx1ZSkge1xuICAgIGlmICh0aGlzLl9kZWJ1Zykge1xuICAgICAgY29uc29sZVtsZXZlbF0oZXJyb3JWYWx1ZSk7XG4gICAgfVxuICB9XG5cblxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IEV2dHM7XG4iLCJleHBvcnQgZGVmYXVsdCBPYmplY3QuZnJlZXplKHtcbiAgdHlwZXM6IHtcbiAgICBzZXJ2aWNlOiBbJ2FkbWluaXN0cmF0aW9uJywgJ2JhbmsnLCAnYm9vaycsICdjZW1ldGVyeScsICdmaXJlZmlnaHRlcicsICdtYWlsJywgJ211c2ljJywgJ3BvbGljZScsICdzY2hvb2wnXSxcbiAgICBjYXJlOiBbJ2FuaW1hbCcsICdkZWZpYnJpbGxhdG9yJywgJ2RlbnRhbCcsICdsYWInLCAnbWVkaWMnLCAncGhhcm1hY3knXSxcbiAgICBjYXRlcmluZzogWydiYXInLCAnY2VsbGFyJywgJ3Jlc3RhdXJhbnQnLCAndG9iYWNjbyddLFxuICAgIHNwb3J0OiBbJ2Jhc2tldCcsICdib2NjZScsICdmb290JywgJ3Bpbmdwb25nJywgJ3Bvb2wnLCAncnVnYnknLCAnc2thdGUnLCAndGVubmlzJ10sXG4gICAgc2hvcDogWydiZWF1dHknLCAnYmFrZXJ5JywgJ2J1dGNoZXInLCAnZGl5JywgJ2Zpc2gnLCAnZ2FyZGVuJywgJ2dyb2NlcnknXSxcbiAgICBuYXR1cmU6IFsncGFyaycsICdyZWN5Y2xlJ10sXG4gICAgdHJhbnNwb3J0OiBbJ2J1cycsICdjYXInLCAnZ2FzJywgJ3RyYWluJ10sXG4gICAgdG91cmlzbTogWydjYXN0bGUnLCAnY2h1cmNoJywgJ2xhbmRtYXJrJywgJ211c2V1bScsICd0b3VyaXNtJ11cbiAgfSxcbiAgc3VidHlwZXM6IHtcbiAgICByZXN0YXVyYW50OiBuZXcgd2luZG93LkwuSWNvbih7XG4gICAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvcmVzdGF1cmFudC5zdmcnLFxuICAgICAgaWNvblNpemU6IFsyNiwgMjZdLFxuICAgICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXG4gICAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXG4gICAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXG4gICAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcbiAgICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXG4gICAgfSksXG4gICAgYmFyOiBuZXcgd2luZG93LkwuSWNvbih7XG4gICAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvYmFyLnN2ZycsXG4gICAgICBpY29uU2l6ZTogWzI2LCAyNl0sXG4gICAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcbiAgICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcbiAgICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcbiAgICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxuICAgICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcbiAgICB9KSxcbiAgICBjZWxsYXI6IG5ldyB3aW5kb3cuTC5JY29uKHtcbiAgICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9jZWxsYXIuc3ZnJyxcbiAgICAgIGljb25TaXplOiBbMjYsIDI2XSxcbiAgICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxuICAgICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxuICAgICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxuICAgICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXG4gICAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxuICAgIH0pLFxuICAgIHRvYmFjY286IG5ldyB3aW5kb3cuTC5JY29uKHtcbiAgICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci90b2JhY2NvLnN2ZycsXG4gICAgICBpY29uU2l6ZTogWzI2LCAyNl0sXG4gICAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcbiAgICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcbiAgICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcbiAgICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxuICAgICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcbiAgICB9KSxcbiAgICBncm9jZXJ5OiBuZXcgd2luZG93LkwuSWNvbih7XG4gICAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvZ3JvY2VyeS5zdmcnLFxuICAgICAgaWNvblNpemU6IFsyNiwgMjZdLFxuICAgICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXG4gICAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXG4gICAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXG4gICAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcbiAgICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXG4gICAgfSksXG4gICAgZGl5OiBuZXcgd2luZG93LkwuSWNvbih7XG4gICAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvZGl5LnN2ZycsXG4gICAgICBpY29uU2l6ZTogWzI2LCAyNl0sXG4gICAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcbiAgICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcbiAgICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcbiAgICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxuICAgICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcbiAgICB9KSxcbiAgICBiZWF1dHk6IG5ldyB3aW5kb3cuTC5JY29uKHtcbiAgICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9iZWF1dHkuc3ZnJyxcbiAgICAgIGljb25TaXplOiBbMjYsIDI2XSxcbiAgICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxuICAgICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxuICAgICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxuICAgICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXG4gICAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxuICAgIH0pLFxuICAgIGZvb3Q6IG5ldyB3aW5kb3cuTC5JY29uKHtcbiAgICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9mb290LnN2ZycsXG4gICAgICBpY29uU2l6ZTogWzI2LCAyNl0sXG4gICAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcbiAgICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcbiAgICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcbiAgICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxuICAgICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcbiAgICB9KSxcbiAgICBydWdieTogbmV3IHdpbmRvdy5MLkljb24oe1xuICAgICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL3J1Z2J5LnN2ZycsXG4gICAgICBpY29uU2l6ZTogWzI2LCAyNl0sXG4gICAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcbiAgICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcbiAgICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcbiAgICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxuICAgICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcbiAgICB9KSxcbiAgICBiYXNrZXQ6IG5ldyB3aW5kb3cuTC5JY29uKHtcbiAgICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9iYXNrZXQuc3ZnJyxcbiAgICAgIGljb25TaXplOiBbMjYsIDI2XSxcbiAgICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxuICAgICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxuICAgICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxuICAgICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXG4gICAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxuICAgIH0pLFxuICAgIHBvb2w6IG5ldyB3aW5kb3cuTC5JY29uKHtcbiAgICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9wb29sLnN2ZycsXG4gICAgICBpY29uU2l6ZTogWzI2LCAyNl0sXG4gICAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcbiAgICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcbiAgICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcbiAgICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxuICAgICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcbiAgICB9KSxcbiAgICBwaW5ncG9uZzogbmV3IHdpbmRvdy5MLkljb24oe1xuICAgICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL3Bpbmdwb25nLnN2ZycsXG4gICAgICBpY29uU2l6ZTogWzI2LCAyNl0sXG4gICAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcbiAgICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcbiAgICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcbiAgICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxuICAgICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcbiAgICB9KSxcbiAgICBza2F0ZTogbmV3IHdpbmRvdy5MLkljb24oe1xuICAgICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL3NrYXRlLnN2ZycsXG4gICAgICBpY29uU2l6ZTogWzI2LCAyNl0sXG4gICAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcbiAgICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcbiAgICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcbiAgICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxuICAgICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcbiAgICB9KSxcbiAgICBib2NjZTogbmV3IHdpbmRvdy5MLkljb24oe1xuICAgICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL2JvY2NlLnN2ZycsXG4gICAgICBpY29uU2l6ZTogWzI2LCAyNl0sXG4gICAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcbiAgICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcbiAgICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcbiAgICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxuICAgICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcbiAgICB9KSxcbiAgICB0ZW5uaXM6IG5ldyB3aW5kb3cuTC5JY29uKHtcbiAgICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci90ZW5uaXMuc3ZnJyxcbiAgICAgIGljb25TaXplOiBbMjYsIDI2XSxcbiAgICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxuICAgICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxuICAgICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxuICAgICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXG4gICAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxuICAgIH0pLFxuICAgIGJha2VyeTogbmV3IHdpbmRvdy5MLkljb24oe1xuICAgICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL2Jha2VyeS5zdmcnLFxuICAgICAgaWNvblNpemU6IFsyNiwgMjZdLFxuICAgICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXG4gICAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXG4gICAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXG4gICAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcbiAgICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXG4gICAgfSksXG4gICAgZmlzaDogbmV3IHdpbmRvdy5MLkljb24oe1xuICAgICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL2Zpc2guc3ZnJyxcbiAgICAgIGljb25TaXplOiBbMjYsIDI2XSxcbiAgICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxuICAgICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxuICAgICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxuICAgICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXG4gICAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxuICAgIH0pLFxuICAgIGJ1dGNoZXI6IG5ldyB3aW5kb3cuTC5JY29uKHtcbiAgICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9idXRjaGVyLnN2ZycsXG4gICAgICBpY29uU2l6ZTogWzI2LCAyNl0sXG4gICAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcbiAgICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcbiAgICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcbiAgICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxuICAgICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcbiAgICB9KSxcbiAgICBib29rOiBuZXcgd2luZG93LkwuSWNvbih7XG4gICAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvYm9vay5zdmcnLFxuICAgICAgaWNvblNpemU6IFsyNiwgMjZdLFxuICAgICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXG4gICAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXG4gICAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXG4gICAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcbiAgICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXG4gICAgfSksXG4gICAgbXVzaWM6IG5ldyB3aW5kb3cuTC5JY29uKHtcbiAgICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9tdXNpYy5zdmcnLFxuICAgICAgaWNvblNpemU6IFsyNiwgMjZdLFxuICAgICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXG4gICAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXG4gICAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXG4gICAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcbiAgICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXG4gICAgfSksXG4gICAgbGFuZG1hcms6IG5ldyB3aW5kb3cuTC5JY29uKHtcbiAgICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9sYW5kbWFyay5zdmcnLFxuICAgICAgaWNvblNpemU6IFsyNiwgMjZdLFxuICAgICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXG4gICAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXG4gICAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXG4gICAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcbiAgICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXG4gICAgfSksXG4gICAgY2FzdGxlOiBuZXcgd2luZG93LkwuSWNvbih7XG4gICAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvY2FzdGxlLnN2ZycsXG4gICAgICBpY29uU2l6ZTogWzI2LCAyNl0sXG4gICAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcbiAgICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcbiAgICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcbiAgICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxuICAgICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcbiAgICB9KSxcbiAgICBjaHVyY2g6IG5ldyB3aW5kb3cuTC5JY29uKHtcbiAgICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9jaHVyY2guc3ZnJyxcbiAgICAgIGljb25TaXplOiBbMjYsIDI2XSxcbiAgICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxuICAgICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxuICAgICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxuICAgICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXG4gICAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxuICAgIH0pLFxuICAgIHRvdXJpc206IG5ldyB3aW5kb3cuTC5JY29uKHtcbiAgICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci90b3VyaXNtLnN2ZycsXG4gICAgICBpY29uU2l6ZTogWzI2LCAyNl0sXG4gICAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcbiAgICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcbiAgICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcbiAgICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxuICAgICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcbiAgICB9KSxcbiAgICBtdXNldW06IG5ldyB3aW5kb3cuTC5JY29uKHtcbiAgICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9tdXNldW0uc3ZnJyxcbiAgICAgIGljb25TaXplOiBbMjYsIDI2XSxcbiAgICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxuICAgICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxuICAgICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxuICAgICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXG4gICAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxuICAgIH0pLFxuICAgIGdhcmRlbjogbmV3IHdpbmRvdy5MLkljb24oe1xuICAgICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL2dhcmRlbi5zdmcnLFxuICAgICAgaWNvblNpemU6IFsyNiwgMjZdLFxuICAgICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXG4gICAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXG4gICAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXG4gICAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcbiAgICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXG4gICAgfSksXG4gICAgY2FyOiBuZXcgd2luZG93LkwuSWNvbih7XG4gICAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvY2FyLnN2ZycsXG4gICAgICBpY29uU2l6ZTogWzI2LCAyNl0sXG4gICAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcbiAgICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcbiAgICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcbiAgICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxuICAgICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcbiAgICB9KSxcbiAgICBnYXM6IG5ldyB3aW5kb3cuTC5JY29uKHtcbiAgICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9nYXMuc3ZnJyxcbiAgICAgIGljb25TaXplOiBbMjYsIDI2XSxcbiAgICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxuICAgICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxuICAgICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxuICAgICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXG4gICAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxuICAgIH0pLFxuICAgIHRyYWluOiBuZXcgd2luZG93LkwuSWNvbih7XG4gICAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvdHJhaW4uc3ZnJyxcbiAgICAgIGljb25TaXplOiBbMjYsIDI2XSxcbiAgICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxuICAgICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxuICAgICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxuICAgICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXG4gICAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxuICAgIH0pLFxuICAgIGJ1czogbmV3IHdpbmRvdy5MLkljb24oe1xuICAgICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL2J1cy5zdmcnLFxuICAgICAgaWNvblNpemU6IFsyNiwgMjZdLFxuICAgICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXG4gICAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXG4gICAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXG4gICAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcbiAgICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXG4gICAgfSksXG4gICAgYW5pbWFsOiBuZXcgd2luZG93LkwuSWNvbih7XG4gICAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvYW5pbWFsLnN2ZycsXG4gICAgICBpY29uU2l6ZTogWzI2LCAyNl0sXG4gICAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcbiAgICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcbiAgICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcbiAgICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxuICAgICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcbiAgICB9KSxcbiAgICBkZW50YWw6IG5ldyB3aW5kb3cuTC5JY29uKHtcbiAgICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9kZW50YWwuc3ZnJyxcbiAgICAgIGljb25TaXplOiBbMjYsIDI2XSxcbiAgICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxuICAgICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxuICAgICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxuICAgICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXG4gICAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxuICAgIH0pLFxuICAgIHBoYXJtYWN5OiBuZXcgd2luZG93LkwuSWNvbih7XG4gICAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvcGhhcm1hY3kuc3ZnJyxcbiAgICAgIGljb25TaXplOiBbMjYsIDI2XSxcbiAgICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxuICAgICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxuICAgICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxuICAgICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXG4gICAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxuICAgIH0pLFxuICAgIG1lZGljOiBuZXcgd2luZG93LkwuSWNvbih7XG4gICAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWVkaWMuc3ZnJyxcbiAgICAgIGljb25TaXplOiBbMjYsIDI2XSxcbiAgICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxuICAgICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxuICAgICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxuICAgICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXG4gICAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxuICAgIH0pLFxuICAgIGxhYjogbmV3IHdpbmRvdy5MLkljb24oe1xuICAgICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL2xhYi5zdmcnLFxuICAgICAgaWNvblNpemU6IFsyNiwgMjZdLFxuICAgICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXG4gICAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXG4gICAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXG4gICAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcbiAgICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXG4gICAgfSksXG4gICAgZGVmaWJyaWxsYXRvcjogbmV3IHdpbmRvdy5MLkljb24oe1xuICAgICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL2RlZmlicmlsbGF0b3Iuc3ZnJyxcbiAgICAgIGljb25TaXplOiBbMjYsIDI2XSxcbiAgICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxuICAgICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxuICAgICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxuICAgICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXG4gICAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxuICAgIH0pLFxuICAgIGNlbWV0ZXJ5OiBuZXcgd2luZG93LkwuSWNvbih7XG4gICAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvY2VtZXRlcnkuc3ZnJyxcbiAgICAgIGljb25TaXplOiBbMjYsIDI2XSxcbiAgICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxuICAgICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxuICAgICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxuICAgICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXG4gICAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxuICAgIH0pLFxuICAgIGZpcmVmaWdodGVyOiBuZXcgd2luZG93LkwuSWNvbih7XG4gICAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvZmlyZWZpZ2h0ZXIuc3ZnJyxcbiAgICAgIGljb25TaXplOiBbMjYsIDI2XSxcbiAgICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxuICAgICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxuICAgICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxuICAgICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXG4gICAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxuICAgIH0pLFxuICAgIHBvbGljZTogbmV3IHdpbmRvdy5MLkljb24oe1xuICAgICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL3BvbGljZS5zdmcnLFxuICAgICAgaWNvblNpemU6IFsyNiwgMjZdLFxuICAgICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXG4gICAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXG4gICAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXG4gICAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcbiAgICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXG4gICAgfSksXG4gICAgbWFpbDogbmV3IHdpbmRvdy5MLkljb24oe1xuICAgICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21haWwuc3ZnJyxcbiAgICAgIGljb25TaXplOiBbMjYsIDI2XSxcbiAgICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxuICAgICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxuICAgICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxuICAgICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXG4gICAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxuICAgIH0pLFxuICAgIGJhbms6IG5ldyB3aW5kb3cuTC5JY29uKHtcbiAgICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9iYW5rLnN2ZycsXG4gICAgICBpY29uU2l6ZTogWzI2LCAyNl0sXG4gICAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcbiAgICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcbiAgICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcbiAgICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxuICAgICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcbiAgICB9KSxcbiAgICBwYXJrOiBuZXcgd2luZG93LkwuSWNvbih7XG4gICAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvcGFyay5zdmcnLFxuICAgICAgaWNvblNpemU6IFsyNiwgMjZdLFxuICAgICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXG4gICAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXG4gICAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXG4gICAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcbiAgICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXG4gICAgfSksXG4gICAgcmVjeWNsZTogbmV3IHdpbmRvdy5MLkljb24oe1xuICAgICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL3JlY3ljbGUuc3ZnJyxcbiAgICAgIGljb25TaXplOiBbMjYsIDI2XSxcbiAgICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxuICAgICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxuICAgICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxuICAgICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXG4gICAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxuICAgIH0pLFxuICAgIGFkbWluaXN0cmF0aW9uOiBuZXcgd2luZG93LkwuSWNvbih7XG4gICAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvYWRtaW5pc3RyYXRpb24uc3ZnJyxcbiAgICAgIGljb25TaXplOiBbMjYsIDI2XSxcbiAgICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxuICAgICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxuICAgICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxuICAgICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXG4gICAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxuICAgIH0pLFxuICAgIHNjaG9vbDogbmV3IHdpbmRvdy5MLkljb24oe1xuICAgICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL3NjaG9vbC5zdmcnLFxuICAgICAgaWNvblNpemU6IFsyNiwgMjZdLFxuICAgICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXG4gICAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXG4gICAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXG4gICAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcbiAgICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXG4gICAgfSksXG4gICAgdXNlcjogbmV3IHdpbmRvdy5MLkljb24oe1xuICAgICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL3VzZXIuc3ZnJyxcbiAgICAgIGljb25TaXplOiBbMjYsIDI2XSxcbiAgICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxuICAgICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxuICAgICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxuICAgICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXG4gICAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdXG4gICAgfSlcbiAgfVxufSk7XG4iLCJjb25zdCBnZXREaXN0YW5jZUJldHdlZW5Db29yZHMgPSAoZnJvbSwgdG8pID0+IHtcbiAgLy8gUmV0dXJuIGRpc3RhbmNlIGluIG1ldGVyc1xuICBjb25zdCBsb24xID0gKGZyb21bMV0gKiBNYXRoLlBJKSAvIDE4MCxcbiAgICBsYXQxID0gKGZyb21bMF0gKiBNYXRoLlBJKSAvIDE4MCxcbiAgICBsb24yID0gKHRvWzFdICogTWF0aC5QSSkgLyAxODAsXG4gICAgbGF0MiA9ICh0b1swXSAqIE1hdGguUEkpIC8gMTgwO1xuXG4gIGNvbnN0IGRlbHRhTGF0ID0gbGF0MiAtIGxhdDE7XG4gIGNvbnN0IGRlbHRhTG9uID0gbG9uMiAtIGxvbjE7XG5cbiAgY29uc3QgYSA9IE1hdGgucG93KE1hdGguc2luKGRlbHRhTGF0IC8gMiksIDIpICsgTWF0aC5jb3MobGF0MSkgKiBNYXRoLmNvcyhsYXQyKSAqIE1hdGgucG93KE1hdGguc2luKGRlbHRhTG9uIC8gMiksIDIpO1xuICBjb25zdCBjID0gMiAqIE1hdGguYXNpbihNYXRoLnNxcnQoYSkpO1xuICByZXR1cm4gYyAqIDYzNzEgKiAxMDAwO1xufTtcblxuXG5jb25zdCBjb252ZXJ0RGlzdGFuY2VUb1N0cmluZyA9IGRpc3RhbmNlID0+IHtcbiAgaWYgKGRpc3RhbmNlID4gMTAwMCkge1xuICAgIGRpc3RhbmNlID0gYCR7cHJlY2lzaW9uUm91bmQoZGlzdGFuY2UgLyAxMDAwLCAyKX1rbWA7XG4gIH0gZWxzZSB7XG4gICAgZGlzdGFuY2UgPSBgJHtwcmVjaXNpb25Sb3VuZChkaXN0YW5jZSwgMil9bWA7XG4gIH1cbiAgcmV0dXJuIGRpc3RhbmNlO1xufTtcblxuXG5jb25zdCBidWlsZERpc3RhbmNlRVRBID0gZGlzdGFuY2UgPT4ge1xuICBsZXQgY2FyTWludXRlcyA9IDA7XG4gIGxldCBjYXJTZWNvbmRzID0gMDtcblxuICBpZiAoZGlzdGFuY2UgPiA1MDAwMCkge1xuICAgIC8vIE92ZXIgNTBrbSwgd2UgdXNlIGF2ZXJhZ2Ugc3BlZWQgb2YgMTAwa21oXG4gICAgY2FyTWludXRlcyA9IChkaXN0YW5jZSAvIDEwMDAwMCkgKiA2MDtcbiAgfSBlbHNlIGlmIChkaXN0YW5jZSA+IDEwMDAwKSB7XG4gICAgLy8gT3ZlciAxMGttLCB3ZSB1c2UgYXZlcmFnZSBzcGVlZCBvZiA2MGttL2hcbiAgICBjYXJNaW51dGVzID0gKGRpc3RhbmNlIC8gNjAwMDApICogNjA7XG4gIH0gZWxzZSB7XG4gICAgLy8gVW5kZXIgMTBrbSB3ZSB1c2VyIGF2ZXJhZ2Ugc3BlZWQgb2YgMzBrbS9oXG4gICAgY2FyTWludXRlcyA9IChkaXN0YW5jZSAvIDMwMDAwKSAqIDYwO1xuICB9XG5cbiAgY2FyU2Vjb25kcyA9IGNhck1pbnV0ZXMgJSAxOyAvLyBLZWVwIGZsb2F0aW5nIHZhbHVlIGZvciBzZWNvbmRzIGNvbXB1dGluZ1xuICBjYXJNaW51dGVzID0gTWF0aC5mbG9vcihjYXJNaW51dGVzKTsgLy8gUmVtb3ZlIGZsb2F0aW5nIHZhbHVlXG5cbiAgaWYgKGNhck1pbnV0ZXMgPiA2MCkge1xuICAgIGNhck1pbnV0ZXMgPSBgJHtNYXRoLmZsb29yKGNhck1pbnV0ZXMgLyA2MCl9aCAke2Nhck1pbnV0ZXMgJSA2MH1tYDtcbiAgfSBlbHNlIHtcbiAgICBjYXJNaW51dGVzID0gYCR7Y2FyTWludXRlc31tYDtcbiAgfVxuXG4gIGxldCB3YWxrTWludXRlcyA9IChkaXN0YW5jZSAvIDUwMDApICogNjA7XG4gIGxldCB3YWxrU2Vjb25kcyA9IHdhbGtNaW51dGVzICUgMTtcbiAgd2Fsa01pbnV0ZXMgPSBNYXRoLmZsb29yKHdhbGtNaW51dGVzKTsgLy8gUmVtb3ZlIGZsb2F0aW5nIHZhbHVlXG5cbiAgaWYgKHdhbGtNaW51dGVzID4gNjApIHtcbiAgICB3YWxrTWludXRlcyA9IGAke01hdGguZmxvb3Iod2Fsa01pbnV0ZXMgLyA2MCl9aCAke3dhbGtNaW51dGVzICUgNjB9bWA7XG4gIH0gZWxzZSB7XG4gICAgd2Fsa01pbnV0ZXMgPSBgJHt3YWxrTWludXRlc31tYDtcbiAgfSAgXG5cbiAgcmV0dXJuIHtcbiAgICBjYXI6IGAke2Nhck1pbnV0ZXN9ICR7TWF0aC5mbG9vcihwcmVjaXNpb25Sb3VuZCgoY2FyU2Vjb25kcyAvIDEwMCkgKiA2MCwgMikgKiAxMDApfXNgLFxuICAgIHdhbGs6IGAke3dhbGtNaW51dGVzfSAke01hdGguZmxvb3IocHJlY2lzaW9uUm91bmQoKHdhbGtTZWNvbmRzIC8gMTAwKSAqIDYwLCAyKSAqIDEwMCl9c2AsXG4gIH07XG59O1xuXG5cbmNvbnN0IHByZWNpc2lvblJvdW5kID0gKHZhbHVlLCBwcmVjaXNpb24pID0+IHtcbiAgY29uc3QgbXVsdGlwbGllciA9IE1hdGgucG93KDEwLCBwcmVjaXNpb24gfHwgMCk7XG4gIHJldHVybiBNYXRoLnJvdW5kKHZhbHVlICogbXVsdGlwbGllcikgLyBtdWx0aXBsaWVyO1xufTtcblxuXG5jb25zdCBmZXRjaE1vZGFsID0gKHVybCkgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgZmV0Y2goYC4vYXNzZXRzL2h0bWwvJHt1cmx9Lmh0bWxgKS50aGVuKGRhdGEgPT4ge1xuICAgICAgZGF0YS50ZXh0KCkudGhlbihodG1sID0+IHtcbiAgICAgICAgcmVzb2x2ZShkb2N1bWVudC5jcmVhdGVSYW5nZSgpLmNyZWF0ZUNvbnRleHR1YWxGcmFnbWVudChodG1sKSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59O1xuXG5cbmNvbnN0IGNsb3NlTW9kYWwgPSAoZXZlbnQsIGZvcmNlKSA9PiB7XG4gIGlmIChmb3JjZSA9PT0gdHJ1ZSB8fCBldmVudC50YXJnZXQuaWQgPT09ICdtb2RhbC1vdmVybGF5JyB8fCBldmVudC50YXJnZXQuaWQuaW5kZXhPZignY2xvc2UnKSAhPT0gLTEpIHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWwtb3ZlcmxheScpLnN0eWxlLm9wYWNpdHkgPSAwO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsLW92ZXJsYXknKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsLW92ZXJsYXknKS5pbm5lckhUTUwgPSAnJztcbiAgICB9LCAzMDApO1xuICB9XG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgQ0NESF9DRU5URVI6IHtcbiAgICBMQVQ6IDQ4LjUzMTgzOTA2NDQxOTYyLFxuICAgIExORzogMi4wNTM3NTY3MTM4NjcxODhcbiAgfSxcbiAgQ0NESF9DSVRJRVM6IFsnQlJYJywgJ0NPUicsICdEUkQnLCAnTEZSJywgJ0xHUicsICdSSUMnLCAnUk9WJywgJ1NDRCcsICdTRVInLCAnU1RDJywgJ1ZTRyddLFxuICBNQVBfQk9VTkRTOiB3aW5kb3cuTC5sYXRMbmdCb3VuZHMoXG4gICAgd2luZG93LkwubGF0TG5nKDQuNjc5NDAwNzE1OTYzODk0LCAxLjczOTA2MDY2ODk0NTMxMjcpLFxuICAgIHdpbmRvdy5MLmxhdExuZyg5OC4zODQzOTA3NDE1MTg2NiwgMi4zNDMzOTU5OTYwOTM3NTApXG4gICksXG4gIE9TTV9MQVlFUjogd2luZG93LkwudGlsZUxheWVyKCdodHRwczovL3tzfS50aWxlLm9wZW5zdHJlZXRtYXAub3JnL3t6fS97eH0ve3l9LnBuZycsIHtcbiAgICBhdHRyaWJ1dGlvbjogJyZjb3B5OyA8YSBocmVmPVwiaHR0cHM6Ly93d3cub3BlbnN0cmVldG1hcC5vcmcvY29weXJpZ2h0XCI+T3BlblN0cmVldE1hcDwvYT4nLFxuICAgIG1heFpvb206IDE5LFxuICAgIG1pblpvb206IDExXG4gIH0pLFxuICBFU1JJX0xBWUVSOiB3aW5kb3cuTC50aWxlTGF5ZXIoJ2h0dHBzOi8vc2VydmVyLmFyY2dpc29ubGluZS5jb20vQXJjR0lTL3Jlc3Qvc2VydmljZXMvV29ybGRfSW1hZ2VyeS9NYXBTZXJ2ZXIvdGlsZS97en0ve3l9L3t4fScsIHtcbiAgICBhdHRyaWJ1dGlvbjogJyZjb3B5OyA8YSBocmVmPVwiaHR0cHM6Ly93d3cuYXJjZ2lzLmNvbS9ob21lL2l0ZW0uaHRtbD9pZD0xMGRmMjI3OWY5Njg0ZTRhOWY2YTdmMDhmZWJhYzJhOVwiPkVzcmkgSW1hZ2VyeTwvYT4nLFxuICAgIG1heFpvb206IDE5LFxuICAgIG1pblpvb206IDExXG4gIH0pLFxuICBnZXREaXN0YW5jZUJldHdlZW5Db29yZHM6IGdldERpc3RhbmNlQmV0d2VlbkNvb3JkcyxcbiAgY29udmVydERpc3RhbmNlVG9TdHJpbmc6IGNvbnZlcnREaXN0YW5jZVRvU3RyaW5nLFxuICBidWlsZERpc3RhbmNlRVRBOiBidWlsZERpc3RhbmNlRVRBLFxuICBwcmVjaXNpb25Sb3VuZDogcHJlY2lzaW9uUm91bmQsXG4gIGZldGNoTW9kYWw6IGZldGNoTW9kYWwsXG4gIGNsb3NlTW9kYWw6IGNsb3NlTW9kYWxcbn07XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAnLi4vc2Nzcy9Eb3VyZGFubmFpc0V4cGxvcmUuc2Nzcyc7XG5pbXBvcnQgTWFya2VycyBmcm9tICcuL3V0aWxzL01hcmtlckVudW0uanMnO1xuaW1wb3J0IE1hcCBmcm9tICcuL21hcC9NYXAuanMnO1xuaW1wb3J0IEV2ZW50cyBmcm9tICcuL3V0aWxzL0V2dHMuanMnO1xuaW1wb3J0IFV0aWxzIGZyb20gJy4vdXRpbHMvVXRpbHMuanMnO1xuXG5cbndpbmRvdy5FdnRzID0gbmV3IEV2ZW50cygpO1xuXG5cbmNsYXNzIERvdXJkYW5uYWlzRXhwbG9yZSB7XG5cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICAvLyBNYXAgaW50ZXJuYWxzXG4gICAgdGhpcy5fbWFwID0gbnVsbDtcbiAgICAvLyBEYXRhIG9iamVjdFxuICAgIHRoaXMuX2NpdHlCb3VuZHMgPSB7fTtcbiAgICB0aGlzLl9jaXR5TWFya2VycyA9IHt9O1xuICAgIHRoaXMuX3RyYW5zcG9ydGF0aW9uTGluZXMgPSB7fTtcbiAgICAvLyBVc2VkIGZvciBtYXJrZXJzXG4gICAgdGhpcy5fZGlzcGxheWVkQ2F0ZWdvcmllcyA9IFtdO1xuICAgIHRoaXMuX21hcmtlclRva2VucyA9IFtdO1xuICAgIC8vIFVzZXIgb2JqZWN0XG4gICAgdGhpcy5fdXNlciA9IHtcbiAgICAgIGdlb2xvY2F0aW9uQWxsb3dlZDogZmFsc2UsXG4gICAgICBsYXQ6IFV0aWxzLkhPTUVfTEFULFxuICAgICAgbG5nOiBVdGlscy5IT01FX0xORyxcbiAgICAgIGFjY3VyYWN5OiAwLFxuICAgICAgbWFya2VyOiBudWxsXG4gICAgfTtcbiAgICAvLyBJbml0IGFwcFxuICAgIHRoaXMuX2luaXQoKTtcbiAgfVxuXG5cbiAgX2luaXQoKSB7XG4gICAgdGhpcy5faW5pdEdlb2xvY2F0aW9uKClcbiAgICAgIC50aGVuKHRoaXMuX2luaXRNYXAuYmluZCh0aGlzKSlcbiAgICAgIC50aGVuKHRoaXMuX2luaXRFdmVudHMuYmluZCh0aGlzKSlcbiAgICAgIC50aGVuKHRoaXMuX2ZldGNoQ2l0eUJvdW5kcy5iaW5kKHRoaXMpKSAvLyBGZXRjaCBjaXR5IGJvdW5kc1xuICAgICAgLnRoZW4odGhpcy5fYnVpbGRDaXR5Qm91bmRzLmJpbmQodGhpcykpIC8vIEJ1aWxkIGNpdHkgYm91bmRzXG4gICAgICAudGhlbih0aGlzLl9mZXRjaENpdHlNYXJrZXJzLmJpbmQodGhpcykpIC8vIEZldGNoIGNpdHkgbWFya2Vyc1xuICAgICAgLnRoZW4odGhpcy5fYnVpbGRDaXR5TWFya2Vycy5iaW5kKHRoaXMpKSAvLyBCdWlsZCBjaXR5IG1hcmtlcnNcbiAgICAgIC50aGVuKHRoaXMuX2ZldGNoVHJhbnNwb3J0YXRpb25MaW5lcy5iaW5kKHRoaXMpKSAvLyBGZXRjaCB0cmFuc3BvcnRhdGlvbiBsaW5lc1xuICAgICAgLnRoZW4odGhpcy5fYnVpbGRUcmFuc3BvcnRhdGlvbkxpbmVzLmJpbmQodGhpcykpIC8vIEJ1aWxkIHRyYW5zcG9ydGF0aW9uIGxpbmVzXG4gICAgICAudGhlbigoKSA9PiB7IGNvbnNvbGUubG9nKCd3ZSBhcmUgZG9uZScsIHRoaXMpIH0pOyAgICBcbiAgfVxuXG5cbiAgLyogQXBwIGluaXRpYWxpemF0aW9uIHNlcXVlbmNlICovXG5cblxuICBfaW5pdEdlb2xvY2F0aW9uKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcblx0XHRcdGlmICgnZ2VvbG9jYXRpb24nIGluIG5hdmlnYXRvcikge1xuICAgICAgICAvLyBUT0RPIDogaW4gbmV4dCB2ZXJzaW9uLCBtYWtlIHRoaXMgYSBwcmVmIGxvdy9oaWdoICh0b2dnbGUpXG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgZW5hYmxlSGlnaEFjY3VyYWN5OiB0cnVlLCAvLyBNb3JlIGNvbnN1cHRpb24sIGJldHRlciBwb3NpdGlvblxuICAgICAgICAgIG1heGltdW1BZ2U6IDEwMDAsIC8vIEEgcG9zaXRpb24gd2lsbCBsYXN0IDFzIG1heGltdW1cbiAgICAgICAgICB0aW1lb3V0OiA5MDAsIC8vIEEgcG9zaXRpb24gaXMgdXBkYXRlZCBpbiAwLjlzIG1heGltdW1cbiAgICAgICAgfTtcbiAgICAgICAgbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbih0aGlzLl9wb3NpdGlvbkluaXRpYWxpemVkLmJpbmQodGhpcyksIG51bGwsIG9wdGlvbnMpO1xuXHRcdFx0XHR0aGlzLl93YXRjaElkID0gbmF2aWdhdG9yLmdlb2xvY2F0aW9uLndhdGNoUG9zaXRpb24odGhpcy5fcG9zaXRpb25VcGRhdGUuYmluZCh0aGlzKSwgbnVsbCwgb3B0aW9ucyk7XG4gICAgICB9XG4gICAgICAvLyBEb24ndCBsb2NrIGluaXRpYWxpemF0aW9uIHdhaXRpbmcgZm9yIHBvc1xuICAgICAgcmVzb2x2ZSgpO1xuXHRcdH0pO1xuICB9XG5cblxuICBfaW5pdE1hcCgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICB0aGlzLl9tYXAgPSBuZXcgTWFwKHtcbiAgICAgICAgdGFyZ2V0SWQ6ICdjY2RoLW1hcCdcbiAgICAgIH0pO1xuICAgICAgcmVzb2x2ZSgpO1xuICAgIH0pO1xuICB9XG5cblxuICBfaW5pdEV2ZW50cygpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xlYXItZmlsdGVycycpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fY2xlYXJGaWx0ZXJzLmJpbmQodGhpcykpO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsLW92ZXJsYXknKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIFV0aWxzLmNsb3NlTW9kYWwuYmluZCh0aGlzKSk7XG4gICAgICBjb25zdCBpdGVtcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXJrZXItc2VsZWN0b3InKS5jaGlsZHJlbjtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaXRlbXNbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9tYXJrZXJDYXRlZ29yeUNsaWNrZWQuYmluZCh0aGlzLCBpdGVtc1tpXSkpOyAgICAgICAgXG4gICAgICB9XG5cbiAgICAgIHJlc29sdmUoKTtcbiAgICB9KTtcbiAgfVxuXG5cbiAgX2ZldGNoQ2l0eUJvdW5kcygpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICBjb25zdCBwcm9taXNlcyA9IFtdO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBVdGlscy5DQ0RIX0NJVElFUy5sZW5ndGg7ICsraSkge1xuICAgICAgICBwcm9taXNlcy5wdXNoKG5ldyBQcm9taXNlKHJlc29sdmVMb2NhbCA9PiB7XG4gICAgICAgICAgZmV0Y2goYC4vYXNzZXRzL2pzb24vY2l0eWJvdW5kcy8ke1V0aWxzLkNDREhfQ0lUSUVTW2ldfS5qc29uYCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIGRhdGEuanNvbigpLnRoZW4oanNvbkRhdGEgPT4ge1xuICAgICAgICAgICAgICB0aGlzLl9jaXR5Qm91bmRzW1V0aWxzLkNDREhfQ0lUSUVTW2ldXSA9IGpzb25EYXRhO1xuICAgICAgICAgICAgICByZXNvbHZlTG9jYWwoKTtcbiAgICAgICAgICAgIH0pLmNhdGNoKHJlc29sdmVMb2NhbCk7XG4gICAgICAgICAgfSkuY2F0Y2gocmVzb2x2ZUxvY2FsKTtcbiAgICAgICAgfSkpO1xuICAgICAgfVxuICAgICAgLy8gR29pbmcgdG8gbmV4dCBzdGVwIG9uY2UgYWxsIGJvdW5kcyBhcmUgbG9hZGVkIGFuZCBzYXZlZFxuICAgICAgUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4ocmVzb2x2ZSk7XG4gICAgfSk7XG4gIH1cblxuXG4gIF9idWlsZENpdHlCb3VuZHMoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgY29uc3QgcHJvbWlzZXMgPSBbXTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgVXRpbHMuQ0NESF9DSVRJRVMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgcHJvbWlzZXMucHVzaChuZXcgUHJvbWlzZShyZXNvbHZlTG9jYWwgPT4ge1xuICAgICAgICAgIHRoaXMuX21hcC5hZGRQb2x5Z29uKHRoaXMuX2NpdHlCb3VuZHNbVXRpbHMuQ0NESF9DSVRJRVNbaV1dLmJvdW5kcywgVXRpbHMuQ0NESF9DSVRJRVNbaV0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlc29sdmVMb2NhbCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pKTtcbiAgICAgIH1cbiAgICAgIC8vIEdvaW5nIHRvIG5leHQgc3RlcCBvbmNlIGFsbCBib3VuZHMgYXJlIGRyYXduIG9uIG1hcFxuICAgICAgUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4ocmVzb2x2ZSk7XG4gICAgfSk7XG4gIH1cblxuXG4gIF9mZXRjaENpdHlNYXJrZXJzKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIGNvbnN0IHByb21pc2VzID0gW107XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IFV0aWxzLkNDREhfQ0lUSUVTLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHByb21pc2VzLnB1c2gobmV3IFByb21pc2UocmVzb2x2ZUxvY2FsID0+IHtcbiAgICAgICAgICBmZXRjaChgLi9hc3NldHMvanNvbi9jaXR5bWFya2Vycy8ke1V0aWxzLkNDREhfQ0lUSUVTW2ldfS5qc29uYCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIGRhdGEuanNvbigpLnRoZW4oanNvbkRhdGEgPT4ge1xuICAgICAgICAgICAgICB0aGlzLl9jaXR5TWFya2Vyc1tVdGlscy5DQ0RIX0NJVElFU1tpXV0gPSBqc29uRGF0YS5tYXJrZXJzO1xuICAgICAgICAgICAgICByZXNvbHZlTG9jYWwoKTtcbiAgICAgICAgICAgIH0pLmNhdGNoKHJlc29sdmVMb2NhbCk7XG4gICAgICAgICAgfSkuY2F0Y2gocmVzb2x2ZUxvY2FsKTtcbiAgICAgICAgfSkpO1xuICAgICAgfVxuICAgICAgLy8gR29pbmcgdG8gbmV4dCBzdGVwIG9uY2UgYWxsIG1hcmtlcnMgYXJlIGxvYWRlZCBhbmQgc2F2ZWRcbiAgICAgIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKHJlc29sdmUpO1xuICAgIH0pO1xuICB9XG5cblxuICBfYnVpbGRDaXR5TWFya2VycygpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICBjb25zdCBwcm9taXNlcyA9IFtdO1xuICAgICAgLy8gSXRlcmF0ZSBvdmVyIENDREggY2l0aWVzXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IFV0aWxzLkNDREhfQ0lUSUVTLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIC8vIEl0ZXJhdGUgb3ZlciBjaXR5IG1hcmtlcnMgY2F0ZWdvcmllc1xuICAgICAgICBjb25zdCBjYXRlZ29yaWVzID0gdGhpcy5fY2l0eU1hcmtlcnNbVXRpbHMuQ0NESF9DSVRJRVNbaV1dO1xuICAgICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoY2F0ZWdvcmllcyk7XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwga2V5cy5sZW5ndGg7ICsraikge1xuICAgICAgICAgIC8vIEl0ZXJhdGUgb3ZlciBjaXR5J3MgbWFya2Vyc1xuICAgICAgICAgIGNvbnN0IG1hcmtlcnMgPSBjYXRlZ29yaWVzW2tleXNbal1dO1xuICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgbWFya2Vycy5sZW5ndGg7ICsraykge1xuICAgICAgICAgICAgcHJvbWlzZXMucHVzaChuZXcgUHJvbWlzZShyZXNvbHZlTG9jYWwgPT4ge1xuICAgICAgICAgICAgICB0aGlzLl9tYXAuY3JlYXRlTWFya2VyKHtcbiAgICAgICAgICAgICAgICBtYXJrOiBtYXJrZXJzW2tdLFxuICAgICAgICAgICAgICAgIHVzZXI6IHRoaXMuX3VzZXJcbiAgICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlc29sdmVMb2NhbCk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gR29pbmcgdG8gbmV4dCBzdGVwIG9uY2UgYWxsIG1hcmtlcnMgYXJlIGRyYXduIG9uIG1hcFxuICAgICAgUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4ocmVzb2x2ZSk7XG4gICAgfSk7XG4gIH1cblxuXG4gIF9mZXRjaFRyYW5zcG9ydGF0aW9uTGluZXMoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgZmV0Y2goYC4vYXNzZXRzL2pzb24vdHJhbnNwb3J0YXRpb24vdHJhbnNwb3J0YXRpb24uanNvbmApLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgIGRhdGEuanNvbigpLnRoZW4oanNvbkRhdGEgPT4ge1xuICAgICAgICAgIHRoaXMuX3RyYW5zcG9ydGF0aW9uTGluZXMgPSBqc29uRGF0YTtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pLmNhdGNoKHJlc29sdmUpO1xuICAgICAgfSkuY2F0Y2gocmVzb2x2ZSk7XG4gICAgfSk7XG4gIH1cblxuICBcbiAgX2J1aWxkVHJhbnNwb3J0YXRpb25MaW5lcygpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICBjb25zdCBwcm9taXNlcyA9IFtdO1xuICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMuX3RyYW5zcG9ydGF0aW9uTGluZXMpO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHByb21pc2VzLnB1c2gobmV3IFByb21pc2UocmVzb2x2ZUxvY2FsID0+IHtcbiAgICAgICAgICBjb25zdCBsaW5lID0gdGhpcy5fdHJhbnNwb3J0YXRpb25MaW5lc1trZXlzW2ldXTtcbiAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGxpbmUuc3RvcHMubGVuZ3RoOyArK2opIHtcbiAgICAgICAgICAgIHRoaXMuX21hcC5hZGRUcmFuc3BvcnRhdGlvblN0b3Aoe1xuICAgICAgICAgICAgICBkYXRhOiBsaW5lLFxuICAgICAgICAgICAgICBzdG9wOiBsaW5lLnN0b3BzW2pdXG4gICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlc29sdmVMb2NhbCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICAgIH1cbiAgICAgIC8vIEdvaW5nIHRvIG5leHQgc3RlcCBvbmNlIGFsbCBtYXJrZXJzIGFyZSBkcmF3biBvbiBtYXBcbiAgICAgIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKHJlc29sdmUpO1xuICAgIH0pO1xuICB9XG5cblxuICAvKiBNYXJrZXIgdG9nZ2xpbmcgY2xpY2tlZCAqL1xuXG5cbiAgX21hcmtlckNhdGVnb3J5Q2xpY2tlZChlKSB7XG4gICAgZS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmF0ZWQnKTtcbiAgICBpZiAoZS5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2YXRlZCcpKSB7XG4gICAgICB0aGlzLl9zaG93Q2F0ZWdvcnkoZS5kYXRhc2V0LnR5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9oaWRlQ2F0ZWdvcnkoZS5kYXRhc2V0LnR5cGUpO1xuICAgIH1cbiAgfVxuXG5cbiAgX3Nob3dDYXRlZ29yeShjYXRlZ29yeSkge1xuICAgIHRoaXMuX21hcC5zaG93Q2F0ZWdvcnkoY2F0ZWdvcnkpO1xuICAgIGNvbnN0IHN1YmNhdGVnb3JpZXMgPSBNYXJrZXJzLnR5cGVzW2NhdGVnb3J5XTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN1YmNhdGVnb3JpZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdJTUcnKTtcbiAgICAgIGVsZW1lbnQuc3JjID0gYC4vYXNzZXRzL2ltZy9tYXJrZXIvJHtzdWJjYXRlZ29yaWVzW2ldfS5zdmdgO1xuICAgICAgZWxlbWVudC5kYXRhc2V0LnR5cGUgPSBzdWJjYXRlZ29yaWVzW2ldO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1Yml0ZW1zLXdyYXBwZXInKS5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICAgIHRoaXMuX21hcmtlclRva2Vucy5wdXNoKHdpbmRvdy5FdnRzLmFkZEV2ZW50KCdjbGljaycsIGVsZW1lbnQsIHRoaXMuX21hcmtlclR5cGVDbGlja2VkLCB7IHNjb3BlOiB0aGlzLCBlbGVtZW50OiBlbGVtZW50IH0pKTtcbiAgICB9XG4gICAgLy8gQXBwZW5kIGdsb2JhbCBjYXRlZ29yeSB0byBkaXNwbGF5ZWQgYXJyYXlcbiAgICB0aGlzLl9kaXNwbGF5ZWRDYXRlZ29yaWVzLnB1c2goY2F0ZWdvcnkpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdWJpdGVtcy13cmFwcGVyJykuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjbGVhci1maWx0ZXJzJykuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gIH1cblxuXG4gIF9oaWRlQ2F0ZWdvcnkoY2F0ZWdvcnkpIHtcbiAgICB0aGlzLl9tYXAuaGlkZUNhdGVnb3J5KGNhdGVnb3J5KTtcbiAgICB0aGlzLl9kaXNwbGF5ZWRDYXRlZ29yaWVzLnNwbGljZSh0aGlzLl9kaXNwbGF5ZWRDYXRlZ29yaWVzLmluZGV4T2YoY2F0ZWdvcnkpLCAxKTtcblxuICAgIGlmICh0aGlzLl9kaXNwbGF5ZWRDYXRlZ29yaWVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1Yml0ZW1zLXdyYXBwZXInKS5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX21hcmtlclRva2Vucy5sZW5ndGg7ICsraSkge1xuICAgICAgICB3aW5kb3cuRXZ0cy5yZW1vdmVFdmVudCh0aGlzLl9tYXJrZXJUb2tlbnNbaV0pO1xuICAgICAgfVxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NsZWFyLWZpbHRlcnMnKS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICB9XG5cbiAgICB0aGlzLl9jbGVhclNwZWNpZmljTWFya2VycyhjYXRlZ29yeSk7XG4gIH1cblxuXG4gIF9tYXJrZXJUeXBlQ2xpY2tlZCgpIHtcbiAgICAvLyBTcGVjaWZpYyBiaW5kaW5nIG9mIHRoaXMsIHNlZSBjYWxsZXJcbiAgICBjb25zdCBlID0gdGhpcy5lbGVtZW50O1xuICAgIGUuY2xhc3NMaXN0LnRvZ2dsZSgnZGVhY3RpdmF0ZWQnKTtcbiAgICBpZiAoZS5jbGFzc0xpc3QuY29udGFpbnMoJ2RlYWN0aXZhdGVkJykpIHtcbiAgICAgIHRoaXMuc2NvcGUuX21hcC5oaWRlU3ViQ2F0ZWdvcnkoZS5kYXRhc2V0LnR5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNjb3BlLl9tYXAuc2hvd1N1YkNhdGVnb3J5KGUuZGF0YXNldC50eXBlKTtcbiAgICB9XG4gIH1cblxuXG4gIC8vIE1ldGhvZCB0byByZW1vdmUgaXRlbXMgZnJvbSBuYXZiYXJcbiAgX2NsZWFyU3BlY2lmaWNNYXJrZXJzKHR5cGUpIHtcbiAgICBjb25zdCBjaGlsZHJlbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdWJpdGVtcy13cmFwcGVyJykuY2hpbGRyZW47XG4gICAgZm9yIChsZXQgaSA9IGNoaWxkcmVuLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICBpZiAoTWFya2Vycy50eXBlc1t0eXBlXS5pbmRleE9mKGNoaWxkcmVuW2ldLmRhdGFzZXQudHlwZSkgIT09IC0xKSB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdWJpdGVtcy13cmFwcGVyJykucmVtb3ZlQ2hpbGQoY2hpbGRyZW5baV0pO1xuICAgICAgfVxuICAgIH0gICAgICAgIFxuICB9XG5cblxuICBfY2xlYXJGaWx0ZXJzKCkge1xuICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xlYXItZmlsdGVycycpLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjbGVhci1maWx0ZXJzJykuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoTWFya2Vycy50eXBlcyk7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdGhpcy5faGlkZUNhdGVnb3J5KGtleXNbaV0pO1xuICAgICAgfVxuICAgICAgY29uc3QgaXRlbXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFya2VyLXNlbGVjdG9yJykuY2hpbGRyZW47XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGl0ZW1zW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2YXRlZCcpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gXG4gIC8qIEdlb2xvYyBjYWxsYmFja3MgKi9cblxuXG4gIF9wb3NpdGlvbkluaXRpYWxpemVkKCkge1xuICAgIHRoaXMuX3VzZXIuZ2VvbG9jYXRpb25BbGxvd2VkID0gdHJ1ZTtcbiAgfVxuXG5cbiAgX3Bvc2l0aW9uVXBkYXRlKHBvc2l0aW9uKSB7XG4gICAgLy8gT25seSBpZiB1c2VyIGFsbG93ZWQgZ2VvbG9jYXRpb247XG4gICAgLy8gU2hvdWxkIG5ldmVyIGJlIGZhbHNlIHdoZW4gY2FsbGVkIGJhY2tcbiAgICBpZiAodGhpcy5fdXNlci5nZW9sb2NhdGlvbkFsbG93ZWQgPT09IHRydWUpIHtcbiAgICAgIC8vIFVwZGF0ZSBzYXZlZCB1c2VyIHBvc2l0aW9uXG4gICAgICB0aGlzLl91c2VyLmxhdCA9IHBvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZTtcbiAgICAgIHRoaXMuX3VzZXIubG5nID0gcG9zaXRpb24uY29vcmRzLmxvbmdpdHVkZTtcbiAgICAgIHRoaXMuX3VzZXIuYWNjdXJhY3kgPSBwb3NpdGlvbi5jb29yZHMuYWNjdXJhY3k7XG4gICAgICAvLyBPbmx5IGRyYXcgbWFya2VyIGlmIG1hcCBpcyBhbHJlYWR5IGNyZWF0ZWRcbiAgICAgIGlmICh0aGlzLl9tYXApIHtcbiAgICAgICAgdGhpcy5fbWFwLmRyYXdVc2VyTWFya2VyKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cblxuLyogU2VhcmNoIG1vZGFsIG1ldGhvZHMgKi9cblxuLypcbiAgX3NlYXJjaE1vZGFsKCkge1xuICAgIHRoaXMuX2ZldGNoTW9kYWwoJ3NlYXJjaG1vZGFsJykudGhlbihkb20gPT4ge1xuICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMuX21hcmtzKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICBkb20uZmlyc3RFbGVtZW50Q2hpbGQuYXBwZW5kQ2hpbGQodGhpcy5fY3JlYXRlTWFya0NhdGVnb3J5U2VhcmNoSWNvbihrZXlzW2ldKSk7XG4gICAgICB9XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWwtb3ZlcmxheScpLmFwcGVuZENoaWxkKGRvbSk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWwtb3ZlcmxheScpLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG5cdFx0XHRzZXRUaW1lb3V0KCgpID0+IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RhbC1vdmVybGF5Jykuc3R5bGUub3BhY2l0eSA9IDEsIDUwKTtcbiAgICB9KTtcbiAgfVxuKi9cblxuXG4gIGdldCB1c2VyKCkge1xuICAgIHJldHVybiB0aGlzLl91c2VyO1xuICB9XG5cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBEb3VyZGFubmFpc0V4cGxvcmU7XG4iXSwibmFtZXMiOlsiTWFwRmFjdG9yeSIsIk1hcmtlcnMiLCJVdGlscyIsIndpbmRvdyIsInRtcCIsIk1hcCIsIm9wdGlvbnMiLCJfY2xhc3NDYWxsQ2hlY2siLCJfaWQiLCJ0YXJnZXRJZCIsIl9tYXAiLCJfbGF5ZXJzIiwiQ2FydGUiLCJTYXRlbGxpdGUiLCJfbWFya3MiLCJfcG9seWdvbnMiLCJfbGluZXMiLCJfaW5pdCIsIl9ldmVudHMiLCJfY3JlYXRlQ2xhc3MiLCJrZXkiLCJ2YWx1ZSIsIkwiLCJtYXAiLCJ6b29tQ29udHJvbCIsInNldFZpZXciLCJDQ0RIX0NFTlRFUiIsIkxBVCIsIkxORyIsImNvbnRyb2wiLCJzY2FsZSIsImFkZFRvIiwic2V0TWF4Qm91bmRzIiwiTUFQX0JPVU5EUyIsIk9TTV9MQVlFUiIsIkVTUklfTEFZRVIiLCJsYXllcnMiLCJwb3NpdGlvbiIsIl90aGlzIiwib24iLCJfbWFwQ2xpY2tlZCIsImJpbmQiLCJwYW5JbnNpZGVCb3VuZHMiLCJhbmltYXRlIiwib3B0cyIsImNvbnNvbGUiLCJsb2ciLCJsYXRsbmciLCJKU09OIiwic3RyaW5naWZ5IiwibGF0IiwibG5nIiwicHVzaCIsImRyYXdVc2VyTWFya2VyIiwiZHgiLCJ1c2VyIiwibWFya2VyIiwiaWNvbiIsInN1YnR5cGVzIiwic2V0TGF0TG5nIiwiYWRkUG9seWdvbiIsImlucHV0IiwiaWQiLCJfdGhpczIiLCJQcm9taXNlIiwicmVzb2x2ZSIsInBvbHlnb24iLCJjcmVhdGVNYXJrZXIiLCJfdGhpczMiLCJ0eXBlIiwibWFyayIsImZseVRvIiwiYmluZFBvcHVwIiwiY3JlYXRlTWFya2VyUG9wdXAiLCJsZW5ndGgiLCJpIiwic2hvd0NhdGVnb3J5IiwiY2F0ZWdvcnkiLCJzdWJDYXRlZ29yaWVzIiwidHlwZXMiLCJzaG93U3ViQ2F0ZWdvcnkiLCJzdWJDYXRlZ29yeSIsIm1hcmtzIiwiaGlkZUNhdGVnb3J5IiwiaGlkZVN1YkNhdGVnb3J5IiwicmVtb3ZlRnJvbSIsImFkZFRyYW5zcG9ydGF0aW9uU3RvcCIsIl90aGlzNCIsInN0b3AiLCJsaW5lIiwicG9seWxpbmUiLCJkYXRhIiwicGF0aCIsImNvbG9yIiwid2VpZ2h0Iiwic21vb3RoRmFjdG9yIiwiY3JlYXRlU3RvcE1hcmtlclBvcHVwIiwiYWRkTGluZSIsInBvaW50cyIsImRvbSIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInRpdGxlIiwiYWRkcmVzcyIsInRvd24iLCJwaG9uZSIsIndlYnNpdGUiLCJpbmZvIiwib3BlbldpdGgiLCJjbGFzc0xpc3QiLCJhZGQiLCJpbm5lckhUTUwiLCJuYW1lIiwiaHJlZiIsImNvbmNhdCIsInNldEF0dHJpYnV0ZSIsImFwcGVuZENoaWxkIiwiYnV0dG9uIiwibWFya2VyT3BlbmVkU3RhdGUiLCJ0aW1ldGFibGUiLCJhbHdheXNDbG9zZWQiLCJpc09wZW4iLCJhZGRFdmVudExpc3RlbmVyIiwidGltZXRhYmxlTW9kYWwiLCJsb2dvIiwiZGlyIiwiZGwiLCJzcmMiLCJ0ZXJtaW51cyIsInN0YXRlIiwibW9yZSIsIm1hcmtlcklzQ2xvc2VkIiwiY2hlY2tUaW1lIiwic2V0SW50ZXJ2YWwiLCJtYXJrZXJJc09wZW5lZCIsIm5vdyIsIkRhdGUiLCJob3VyIiwiZ2V0SG91cnMiLCJtaW51dGVzIiwiZ2V0TWludXRlcyIsImRheU9mV2VlayIsImdldERheSIsIm9wZW5pbmdUaW1lIiwicGFyc2VJbnQiLCJvcGVuIiwiaCIsIm0iLCJjbG9zaW5nVGltZSIsImNsb3NlIiwiY3VycmVudFRpbWUiLCJpc05hTiIsImhhc0JyZWFrIiwic2V2ZXJhbCIsImlzQ2xvc2VkIiwiYnJlYWtPcGVuaW5nVGltZSIsImVuZCIsImJyZWFrQ2xvc2luZ1RpbWUiLCJzdGFydCIsImFsd2F5c09wZW5lZCIsImZpcnN0Q2hpbGQiLCJsYXN0Q2hpbGQiLCJyZW1vdmUiLCJmZXRjaE1vZGFsIiwidGhlbiIsInF1ZXJ5U2VsZWN0b3IiLCJkaXN0YW5jZSIsImdldERpc3RhbmNlQmV0d2VlbkNvb3JkcyIsImNvbnZlcnREaXN0YW5jZVRvU3RyaW5nIiwiZXRhIiwiYnVpbGREaXN0YW5jZUVUQSIsImNhciIsIndhbGsiLCJkYXlEb20iLCJjaGlsZHJlbiIsIm1vcm5pbmciLCJsYXN0RWxlbWVudENoaWxkIiwiZmlyc3RFbGVtZW50Q2hpbGQiLCJhZnRlcm5vb24iLCJqIiwiZGl2Iiwic3R5bGUiLCJib3JkZXJSYWRpdXMiLCJqdXN0aWZ5Q29udGVudCIsImluc2VydEJlZm9yZSIsImdldEVsZW1lbnRCeUlkIiwiZGlzcGxheSIsInNldFRpbWVvdXQiLCJvcGFjaXR5IiwiRXZ0cyIsImRlYnVnIiwiYXJndW1lbnRzIiwidW5kZWZpbmVkIiwiX2RlYnVnIiwiX2lkSW5jcmVtZW50b3IiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJfcmVndWxhckV2ZW50cyIsIl9jdXN0b21FdmVudHMiLCJ2ZXJzaW9uIiwiZGVzdHJveSIsIl9yYWlzZSIsInJlbW92ZUFsbEV2ZW50cyIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwiYWRkRXZlbnQiLCJldmVudE5hbWUiLCJlbGVtZW50IiwiY2FsbGJhY2siLCJzY29wZSIsImVyciIsIl90eXBlb2YiLCJyZW1vdmVFdmVudCIsImV2ZW50SWQiLCJzdGF0dXNDb2RlIiwiX2NsZWFyUmVndWxhckV2ZW50IiwiaGFkRXZlbnRzIiwiaW5kZXgiLCJldnQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwic3BsaWNlIiwic3Vic2NyaWJlIiwib25lU2hvdCIsIm9zIiwidW5zdWJzY3JpYmUiLCJzdWJzIiwidW5zdWJzY3JpYmVBbGxGb3IiLCJwdWJsaXNoIiwibGV2ZWwiLCJlcnJvclZhbHVlIiwiZnJlZXplIiwic2VydmljZSIsImNhcmUiLCJjYXRlcmluZyIsInNwb3J0Iiwic2hvcCIsIm5hdHVyZSIsInRyYW5zcG9ydCIsInRvdXJpc20iLCJyZXN0YXVyYW50IiwiSWNvbiIsImljb25VcmwiLCJpY29uU2l6ZSIsImljb25BbmNob3IiLCJwb3B1cEFuY2hvciIsInNoYWRvd1VybCIsInNoYWRvd1NpemUiLCJzaGFkb3dBbmNob3IiLCJiYXIiLCJjZWxsYXIiLCJ0b2JhY2NvIiwiZ3JvY2VyeSIsImRpeSIsImJlYXV0eSIsImZvb3QiLCJydWdieSIsImJhc2tldCIsInBvb2wiLCJwaW5ncG9uZyIsInNrYXRlIiwiYm9jY2UiLCJ0ZW5uaXMiLCJiYWtlcnkiLCJmaXNoIiwiYnV0Y2hlciIsImJvb2siLCJtdXNpYyIsImxhbmRtYXJrIiwiY2FzdGxlIiwiY2h1cmNoIiwibXVzZXVtIiwiZ2FyZGVuIiwiZ2FzIiwidHJhaW4iLCJidXMiLCJhbmltYWwiLCJkZW50YWwiLCJwaGFybWFjeSIsIm1lZGljIiwibGFiIiwiZGVmaWJyaWxsYXRvciIsImNlbWV0ZXJ5IiwiZmlyZWZpZ2h0ZXIiLCJwb2xpY2UiLCJtYWlsIiwiYmFuayIsInBhcmsiLCJyZWN5Y2xlIiwiYWRtaW5pc3RyYXRpb24iLCJzY2hvb2wiLCJmcm9tIiwidG8iLCJsb24xIiwiUEkiLCJsYXQxIiwibG9uMiIsImxhdDIiLCJkZWx0YUxhdCIsImRlbHRhTG9uIiwiYSIsInBvdyIsInNpbiIsImNvcyIsImMiLCJhc2luIiwic3FydCIsInByZWNpc2lvblJvdW5kIiwiY2FyTWludXRlcyIsImNhclNlY29uZHMiLCJ3YWxrTWludXRlcyIsIndhbGtTZWNvbmRzIiwicHJlY2lzaW9uIiwibXVsdGlwbGllciIsInJvdW5kIiwidXJsIiwiZmV0Y2giLCJ0ZXh0IiwiaHRtbCIsImNyZWF0ZVJhbmdlIiwiY3JlYXRlQ29udGV4dHVhbEZyYWdtZW50IiwiY2xvc2VNb2RhbCIsImV2ZW50IiwiZm9yY2UiLCJ0YXJnZXQiLCJpbmRleE9mIiwiQ0NESF9DSVRJRVMiLCJsYXRMbmdCb3VuZHMiLCJsYXRMbmciLCJ0aWxlTGF5ZXIiLCJhdHRyaWJ1dGlvbiIsIm1heFpvb20iLCJtaW5ab29tIiwiRXZlbnRzIiwiRG91cmRhbm5haXNFeHBsb3JlIiwiX2NpdHlCb3VuZHMiLCJfY2l0eU1hcmtlcnMiLCJfdHJhbnNwb3J0YXRpb25MaW5lcyIsIl9kaXNwbGF5ZWRDYXRlZ29yaWVzIiwiX21hcmtlclRva2VucyIsIl91c2VyIiwiZ2VvbG9jYXRpb25BbGxvd2VkIiwiSE9NRV9MQVQiLCJIT01FX0xORyIsImFjY3VyYWN5IiwiX2luaXRHZW9sb2NhdGlvbiIsIl9pbml0TWFwIiwiX2luaXRFdmVudHMiLCJfZmV0Y2hDaXR5Qm91bmRzIiwiX2J1aWxkQ2l0eUJvdW5kcyIsIl9mZXRjaENpdHlNYXJrZXJzIiwiX2J1aWxkQ2l0eU1hcmtlcnMiLCJfZmV0Y2hUcmFuc3BvcnRhdGlvbkxpbmVzIiwiX2J1aWxkVHJhbnNwb3J0YXRpb25MaW5lcyIsIm5hdmlnYXRvciIsImVuYWJsZUhpZ2hBY2N1cmFjeSIsIm1heGltdW1BZ2UiLCJ0aW1lb3V0IiwiZ2VvbG9jYXRpb24iLCJnZXRDdXJyZW50UG9zaXRpb24iLCJfcG9zaXRpb25Jbml0aWFsaXplZCIsIl93YXRjaElkIiwid2F0Y2hQb3NpdGlvbiIsIl9wb3NpdGlvblVwZGF0ZSIsIl9jbGVhckZpbHRlcnMiLCJpdGVtcyIsIl9tYXJrZXJDYXRlZ29yeUNsaWNrZWQiLCJfdGhpczUiLCJwcm9taXNlcyIsIl9sb29wIiwicmVzb2x2ZUxvY2FsIiwianNvbiIsImpzb25EYXRhIiwiYWxsIiwiX3RoaXM2IiwiX2xvb3AyIiwiYm91bmRzIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiX3RoaXM3IiwiX2xvb3AzIiwibWFya2VycyIsIl90aGlzOCIsImNhdGVnb3JpZXMiLCJfbG9vcDQiLCJfbG9vcDUiLCJrIiwiX3RoaXM5IiwiX3RoaXMxMCIsIl9sb29wNiIsInN0b3BzIiwiZSIsInRvZ2dsZSIsImNvbnRhaW5zIiwiX3Nob3dDYXRlZ29yeSIsImRhdGFzZXQiLCJfaGlkZUNhdGVnb3J5Iiwic3ViY2F0ZWdvcmllcyIsIl9tYXJrZXJUeXBlQ2xpY2tlZCIsIl9jbGVhclNwZWNpZmljTWFya2VycyIsInJlbW92ZUNoaWxkIiwiY29vcmRzIiwibGF0aXR1ZGUiLCJsb25naXR1ZGUiLCJnZXQiXSwic291cmNlUm9vdCI6IiJ9
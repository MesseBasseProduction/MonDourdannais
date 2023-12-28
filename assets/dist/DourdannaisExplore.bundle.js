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
    service: ['administration', 'bank', 'book', 'cemetery', 'firefighter', 'mail', 'music', 'police', 'school', 'recycle'],
    care: ['animal', 'defibrillator', 'dental', 'lab', 'medic', 'pharmacy'],
    catering: ['bar', 'cellar', 'restaurant', 'tobacco'],
    sport: ['basket', 'bocce', 'foot', 'pingpong', 'pool', 'rugby', 'skate', 'tennis'],
    shop: ['beauty', 'bakery', 'butcher', 'diy', 'fish', 'garden', 'grocery'],
    nature: ['park'],
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
    this._displayedTypes = [];
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
        // Listening to modal event
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
        this._map.showCategory(e.dataset.type);
        var markers = _utils_MarkerEnum_js__WEBPACK_IMPORTED_MODULE_1__["default"].types[e.dataset.type];
        for (var i = 0; i < markers.length; ++i) {
          var element = document.createElement('IMG');
          element.src = "./assets/img/marker/".concat(markers[i], ".svg");
          element.dataset.type = markers[i];
          document.getElementById('subitems-wrapper').appendChild(element);
          this._markerTokens.push(window.Evts.addEvent('click', element, this._markerTypeClicked, {
            scope: this,
            element: element
          }));
        }
        this._displayedTypes.push(e.dataset.type);
      } else {
        this._map.hideCategory(e.dataset.type);
        this._displayedTypes.splice(this._displayedTypes.indexOf(e.dataset.type), 1);
        var children = document.getElementById('subitems-wrapper').children;
        for (var _i = children.length - 1; _i >= 0; --_i) {
          if (_utils_MarkerEnum_js__WEBPACK_IMPORTED_MODULE_1__["default"].types[e.dataset.type].indexOf(children[_i].dataset.type) !== -1) {
            document.getElementById('subitems-wrapper').removeChild(children[_i]);
          }
        }
      }
      if (this._displayedTypes.length === 0) {
        document.getElementById('subitems-wrapper').classList.remove('show');
      } else {
        document.getElementById('subitems-wrapper').classList.add('show');
      }
    }
  }, {
    key: "_markerTypeClicked",
    value: function _markerTypeClicked() {
      var e = this.element;
      e.classList.toggle('deactivated');
      if (e.classList.contains('deactivated')) {
        this.scope._map.hideSubCategory(e.dataset.type);
      } else {
        this.scope._map.showSubCategory(e.dataset.type);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QSxTQUFBb1YscUJBQUEsRUFBdUI7TUFDckIsSUFBSSxDQUFDcEIsS0FBSyxDQUFDQyxrQkFBa0IsR0FBRyxJQUFJO0lBQ3RDO0VBQUM7SUFBQWxVLEdBQUE7SUFBQUMsS0FBQSxFQUdELFNBQUF1VixnQkFBZ0J2VSxRQUFRLEVBQUU7TUFDeEI7TUFDQTtNQUNBLElBQUksSUFBSSxDQUFDZ1QsS0FBSyxDQUFDQyxrQkFBa0IsS0FBSyxJQUFJLEVBQUU7UUFDMUM7UUFDQSxJQUFJLENBQUNELEtBQUssQ0FBQ25TLEdBQUcsR0FBR2IsUUFBUSxDQUFDdVcsTUFBTSxDQUFDQyxRQUFRO1FBQ3pDLElBQUksQ0FBQ3hELEtBQUssQ0FBQ2xTLEdBQUcsR0FBR2QsUUFBUSxDQUFDdVcsTUFBTSxDQUFDRSxTQUFTO1FBQzFDLElBQUksQ0FBQ3pELEtBQUssQ0FBQ0ksUUFBUSxHQUFHcFQsUUFBUSxDQUFDdVcsTUFBTSxDQUFDbkQsUUFBUTtRQUM5QztRQUNBLElBQUksSUFBSSxDQUFDL1UsSUFBSSxFQUFFO1VBQ2IsSUFBSSxDQUFDQSxJQUFJLENBQUMyQyxjQUFjLENBQUMsQ0FBQztRQUM1QjtNQUNGO0lBQ0Y7O0lBR0Y7O0lBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7RUFaQTtJQUFBakMsR0FBQTtJQUFBMlgsR0FBQSxFQWVFLFNBQUFBLElBQUEsRUFBVztNQUNULE9BQU8sSUFBSSxDQUFDMUQsS0FBSztJQUNuQjtFQUFDO0VBQUEsT0FBQU4sa0JBQUE7QUFBQTtBQUtILGlFQUFlQSxrQkFBa0IsRSIsInNvdXJjZXMiOlsid2VicGFjazovL0RvdXJkYW5uYWlzRXhwbG9yZS8uL3NyYy9qcy9tYXAvTWFwLmpzIiwid2VicGFjazovL0RvdXJkYW5uYWlzRXhwbG9yZS8uL3NyYy9qcy9tYXAvTWFwRmFjdG9yeS5qcyIsIndlYnBhY2s6Ly9Eb3VyZGFubmFpc0V4cGxvcmUvLi9zcmMvanMvdXRpbHMvRXZ0cy5qcyIsIndlYnBhY2s6Ly9Eb3VyZGFubmFpc0V4cGxvcmUvLi9zcmMvanMvdXRpbHMvTWFya2VyRW51bS5qcyIsIndlYnBhY2s6Ly9Eb3VyZGFubmFpc0V4cGxvcmUvLi9zcmMvanMvdXRpbHMvVXRpbHMuanMiLCJ3ZWJwYWNrOi8vRG91cmRhbm5haXNFeHBsb3JlLy4vc3JjL3Njc3MvRG91cmRhbm5haXNFeHBsb3JlLnNjc3MiLCJ3ZWJwYWNrOi8vRG91cmRhbm5haXNFeHBsb3JlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0RvdXJkYW5uYWlzRXhwbG9yZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vRG91cmRhbm5haXNFeHBsb3JlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vRG91cmRhbm5haXNFeHBsb3JlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vRG91cmRhbm5haXNFeHBsb3JlLy4vc3JjL2pzL0RvdXJkYW5uYWlzRXhwbG9yZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTWFwRmFjdG9yeSBmcm9tICcuLi9tYXAvTWFwRmFjdG9yeS5qcyc7XG5pbXBvcnQgTWFya2VycyBmcm9tICcuLi91dGlscy9NYXJrZXJFbnVtLmpzJztcbmltcG9ydCBVdGlscyBmcm9tICcuLi91dGlscy9VdGlscy5qcyc7XG53aW5kb3cudG1wPSBbXTtcblxuY2xhc3MgTWFwIHtcblxuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICB0aGlzLl9pZCA9IG9wdGlvbnMudGFyZ2V0SWQ7XG4gICAgdGhpcy5fbWFwID0gbnVsbFxuXG4gICAgdGhpcy5fbGF5ZXJzID0ge1xuICAgICAgQ2FydGU6IG51bGwsXG4gICAgICBTYXRlbGxpdGU6IG51bGxcbiAgICB9O1xuXG4gICAgdGhpcy5fbWFya3MgPSB7fTtcbiAgICB0aGlzLl9wb2x5Z29ucyA9IHt9O1xuICAgIHRoaXMuX2xpbmVzID0gW107XG5cbiAgICB0aGlzLl9pbml0KCk7XG4gICAgdGhpcy5fZXZlbnRzKCk7XG4gIH1cblxuXG4gIF9pbml0KCkge1xuICAgIC8vIFVzZSBtYWluIGRpdiB0byBpbmplY3QgT1NNIGludG9cbiAgICB0aGlzLl9tYXAgPSB3aW5kb3cuTC5tYXAodGhpcy5faWQsIHtcbiAgICAgIHpvb21Db250cm9sOiBmYWxzZSxcbiAgICB9KS5zZXRWaWV3KFtVdGlscy5DQ0RIX0NFTlRFUi5MQVQsIFV0aWxzLkNDREhfQ0VOVEVSLkxOR10sIDEyKTtcbiAgICAvLyBBZGQgbWV0ZXIgYW5kIGZlZXQgc2NhbGUgb24gbWFwXG4gICAgd2luZG93LkwuY29udHJvbC5zY2FsZSgpLmFkZFRvKHRoaXMuX21hcCk7XG4gICAgLy8gUHJldmVudCBwYW5uaW5nIG91dHNpZGUgb2YgdGhlIG1hcCBib3VuZHMgZGVmaW5pbmVkIGluIHV0aWxzXG4gICAgdGhpcy5fbWFwLnNldE1heEJvdW5kcyhVdGlscy5NQVBfQk9VTkRTKTtcbiAgICAvLyBBZGQgbGF5ZXIgZ3JvdXAgdG8gaW50ZXJmYWNlIGFuZCBzdGFydCBtYXAgd2l0aCBvc20gZGVmYXVsdFxuICAgIHRoaXMuX2xheWVycy5DYXJ0ZSA9IFV0aWxzLk9TTV9MQVlFUjtcbiAgICB0aGlzLl9sYXllcnMuU2F0ZWxsaXRlID0gVXRpbHMuRVNSSV9MQVlFUjtcbiAgICB0aGlzLl9sYXllcnMuQ2FydGUuYWRkVG8odGhpcy5fbWFwKTtcbiAgICAvLyBBZGQgbGF5ZXIgc3dpdGNoIHJhZGlvIG9uIGJvdHRvbSByaWdodCBvZiB0aGUgbWFwXG4gICAgd2luZG93LkwuY29udHJvbC5sYXllcnModGhpcy5fbGF5ZXJzLCB7fSwgeyBwb3NpdGlvbjogJ2JvdHRvbXJpZ2h0JyB9KS5hZGRUbyh0aGlzLl9tYXApO1xuICB9XG5cblxuICBfZXZlbnRzKCkge1xuICAgIC8vIFN1YnNjcmliZSB0byBjbGljayBldmVudCBvbiBtYXAgdG8gcmVhY3RcbiAgICB0aGlzLl9tYXAub24oJ2NsaWNrJywgdGhpcy5fbWFwQ2xpY2tlZC5iaW5kKHRoaXMpKTtcbiAgICAvLyBNYXAgaXMgZHJhZ2dlZCBieSB1c2VyIG1vdXNlL2ZpbmdlclxuICAgIHRoaXMuX21hcC5vbignZHJhZycsICgpID0+IHtcbiAgICAgIC8vIENvbnN0cmFpbiBwYW4gdG8gdGhlIG1hcCBib3VuZHNcbiAgICAgIHRoaXMuX21hcC5wYW5JbnNpZGVCb3VuZHMoVXRpbHMuTUFQX0JPVU5EUywgeyBhbmltYXRlOiB0cnVlIH0pO1xuICAgIH0pO1xuICB9XG5cblxuICBfbWFwQ2xpY2tlZChvcHRzKSB7XG4gICAgY29uc29sZS5sb2cob3B0cy5sYXRsbmcsIEpTT04uc3RyaW5naWZ5KG9wdHMubGF0bG5nLmxhdCArICcsICcgKyBvcHRzLmxhdGxuZy5sbmcpKTtcbiAgICB3aW5kb3cudG1wLnB1c2goW29wdHMubGF0bG5nLmxhdCwgb3B0cy5sYXRsbmcubG5nXSk7XG4gICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkod2luZG93LnRtcCkpXG4gIH1cblxuXG4gIGRyYXdVc2VyTWFya2VyKCkge1xuICAgIGlmICghd2luZG93LmR4LnVzZXIubWFya2VyKSB7XG4gICAgICB3aW5kb3cuZHgudXNlci5tYXJrZXIgPSB3aW5kb3cuTC5tYXJrZXIoW3dpbmRvdy5keC51c2VyLmxhdCwgd2luZG93LmR4LnVzZXIubG5nXSwge1xuICAgICAgICBpY29uOiBNYXJrZXJzLnN1YnR5cGVzLnVzZXJcbiAgICAgIH0pO1xuICAgICAgd2luZG93LmR4LnVzZXIubWFya2VyLmFkZFRvKHRoaXMuX21hcCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdpbmRvdy5keC51c2VyLm1hcmtlci5zZXRMYXRMbmcod2luZG93LmR4LnVzZXIpO1xuICAgIH1cbiAgfVxuXG5cbiAgYWRkUG9seWdvbihpbnB1dCwgaWQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICBjb25zdCBwb2x5Z29uID0gd2luZG93LkwucG9seWdvbihpbnB1dCk7XG4gICAgICBwb2x5Z29uLmFkZFRvKHRoaXMuX21hcCk7XG4gICAgICB0aGlzLl9wb2x5Z29uc1tpZF0gPSBwb2x5Z29uO1xuICAgICAgcmVzb2x2ZSgpO1xuICAgIH0pO1xuICB9XG5cblxuICBjcmVhdGVNYXJrZXIob3B0cykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIGxldCB0eXBlID0gb3B0cy5tYXJrLnR5cGU7XG4gICAgICBjb25zdCBtYXJrZXIgPSB3aW5kb3cuTC5tYXJrZXIoW29wdHMubWFyay5sYXQsIG9wdHMubWFyay5sbmddLCB7IFxuICAgICAgICBpY29uOiBNYXJrZXJzLnN1YnR5cGVzW3R5cGVdXG4gICAgICB9KS5vbignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuX21hcC5mbHlUbyhbb3B0cy5tYXJrLmxhdCwgb3B0cy5tYXJrLmxuZ10sIDE4KTtcbiAgICAgIH0pO1xuICBcbiAgICAgIG1hcmtlci5iaW5kUG9wdXAoTWFwRmFjdG9yeS5jcmVhdGVNYXJrZXJQb3B1cChvcHRzKSk7XG4gICAgICBpZiAob3B0cy5tYXJrLnN1YnR5cGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvcHRzLm1hcmsuc3VidHlwZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICBpZiAoIXRoaXMuX21hcmtzW29wdHMubWFyay5zdWJ0eXBlc1tpXV0pIHtcbiAgICAgICAgICAgIHRoaXMuX21hcmtzW29wdHMubWFyay5zdWJ0eXBlc1tpXV0gPSBbXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5fbWFya3Nbb3B0cy5tYXJrLnN1YnR5cGVzW2ldXS5wdXNoKG1hcmtlcik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICghdGhpcy5fbWFya3NbdHlwZV0pIHtcbiAgICAgICAgICB0aGlzLl9tYXJrc1t0eXBlXSA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX21hcmtzW3R5cGVdLnB1c2gobWFya2VyKTtcbiAgICAgIH1cblxuICAgICAgcmVzb2x2ZSgpO1xuICAgIH0pO1xuICB9XG5cblxuICBzaG93Q2F0ZWdvcnkoY2F0ZWdvcnkpIHtcbiAgICBjb25zdCBzdWJDYXRlZ29yaWVzID0gTWFya2Vycy50eXBlc1tjYXRlZ29yeV07XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdWJDYXRlZ29yaWVzLmxlbmd0aDsgKytpKSB7XG4gICAgICB0aGlzLnNob3dTdWJDYXRlZ29yeShzdWJDYXRlZ29yaWVzW2ldKTtcbiAgICB9XG4gIH1cblxuXG4gIHNob3dTdWJDYXRlZ29yeShzdWJDYXRlZ29yeSkge1xuICAgIGNvbnN0IG1hcmtzID0gdGhpcy5fbWFya3Nbc3ViQ2F0ZWdvcnldO1xuICAgIGlmIChtYXJrcykge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXJrcy5sZW5ndGg7ICsraSkge1xuICAgICAgICBtYXJrc1tpXS5hZGRUbyh0aGlzLl9tYXApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG5cbiAgaGlkZUNhdGVnb3J5KGNhdGVnb3J5KSB7XG4gICAgY29uc3Qgc3ViQ2F0ZWdvcmllcyA9IE1hcmtlcnMudHlwZXNbY2F0ZWdvcnldO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3ViQ2F0ZWdvcmllcy5sZW5ndGg7ICsraSkge1xuICAgICAgdGhpcy5oaWRlU3ViQ2F0ZWdvcnkoc3ViQ2F0ZWdvcmllc1tpXSk7XG4gICAgfVxuICB9XG5cblxuICBoaWRlU3ViQ2F0ZWdvcnkoc3ViQ2F0ZWdvcnkpIHtcbiAgICBjb25zdCBtYXJrcyA9IHRoaXMuX21hcmtzW3N1YkNhdGVnb3J5XTtcbiAgICBpZiAobWFya3MpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWFya3MubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgbWFya3NbaV0ucmVtb3ZlRnJvbSh0aGlzLl9tYXApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG5cbiAgYWRkVHJhbnNwb3J0YXRpb25TdG9wKG9wdHMpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICBjb25zdCB0eXBlID0gb3B0cy5zdG9wLnR5cGU7XG4gICAgICBjb25zdCBtYXJrZXIgPSB3aW5kb3cuTC5tYXJrZXIoW29wdHMuc3RvcC5sYXQsIG9wdHMuc3RvcC5sbmddLCB7IFxuICAgICAgICBpY29uOiBNYXJrZXJzLnN1YnR5cGVzW3R5cGVdXG4gICAgICB9KS5vbignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuX21hcC5mbHlUbyhbb3B0cy5zdG9wLmxhdCwgb3B0cy5zdG9wLmxuZ10sIDE4KTtcbiAgICAgIH0pO1xuICBcbiAgICAgIGNvbnN0IGxpbmUgPSB3aW5kb3cuTC5wb2x5bGluZShvcHRzLmRhdGEucGF0aCwge1xuICAgICAgICBjb2xvcjogb3B0cy5kYXRhLmNvbG9yLFxuICAgICAgICB3ZWlnaHQ6IDUsXG4gICAgICAgIHNtb290aEZhY3RvcjogMVxuICAgICAgfSk7XG5cbiAgICAgIG1hcmtlci5iaW5kUG9wdXAoTWFwRmFjdG9yeS5jcmVhdGVTdG9wTWFya2VyUG9wdXAob3B0cykpLm9uKCdwb3B1cG9wZW4nLCAoKSA9PiB7XG4gICAgICAgIGxpbmUuYWRkVG8odGhpcy5fbWFwKTtcbiAgICAgIH0pLm9uKCdwb3B1cGNsb3NlJywgKCkgPT4ge1xuICAgICAgICBsaW5lLnJlbW92ZUZyb20odGhpcy5fbWFwKTtcbiAgICAgIH0pO1xuICAgICAgXG4gICAgICAvL21hcmtlci5hZGRUbyh0aGlzLl9tYXApO1xuICBcbiAgICAgIGlmICghdGhpcy5fbWFya3NbdHlwZV0pIHtcbiAgICAgICAgdGhpcy5fbWFya3NbdHlwZV0gPSBbXTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX21hcmtzW3R5cGVdLnB1c2gobWFya2VyKTtcblxuICAgICAgcmVzb2x2ZSgpO1xuICAgIH0pO1xuICB9XG5cblxuICBhZGRMaW5lKHBvaW50cywgb3B0aW9ucykge1xuICAgIHRoaXMuX2xpbmVzLnB1c2god2luZG93LkwucG9seWxpbmUocG9pbnRzLCBvcHRpb25zKS5hZGRUbyh0aGlzLl9tYXApKTtcbiAgfVxuXG5cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBNYXA7XG4iLCJpbXBvcnQgVXRpbHMgZnJvbSAnLi4vdXRpbHMvVXRpbHMuanMnO1xuXG5cbmNsYXNzIE1hcEZhY3Rvcnkge1xuXG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG5cbiAgc3RhdGljIGNyZWF0ZU1hcmtlclBvcHVwKG9wdHMpIHtcbiAgICBjb25zdCBkb20gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0gzJyk7XG4gICAgY29uc3QgYWRkcmVzcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0knKTtcbiAgICBjb25zdCB0b3duID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnSScpO1xuICAgIGNvbnN0IHBob25lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnQScpO1xuICAgIGNvbnN0IHdlYnNpdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdBJyk7XG4gICAgY29uc3QgaW5mbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ1AnKTtcbiAgICBjb25zdCBvcGVuV2l0aCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0EnKTtcblxuICAgIGRvbS5jbGFzc0xpc3QuYWRkKCdtYXJrZXItcG9wdXAnKTtcbiAgICB0aXRsZS5pbm5lckhUTUwgPSBvcHRzLm1hcmsubmFtZTtcbiAgICBhZGRyZXNzLmlubmVySFRNTCA9IG9wdHMubWFyay5hZGRyZXNzO1xuICAgIHRvd24uaW5uZXJIVE1MID0gb3B0cy5tYXJrLnRvd247XG4gICAgcGhvbmUuaHJlZiA9IGB0ZWw6JHtvcHRzLm1hcmsucGhvbmV9YDtcbiAgICBwaG9uZS5pbm5lckhUTUwgPSBgPGltZyBzcmM9XCIuL2Fzc2V0cy9pbWcvaWNvbi9waG9uZS5zdmdcIj4ke29wdHMubWFyay5waG9uZX1gO1xuICAgIHdlYnNpdGUuaHJlZiA9IG9wdHMubWFyay53ZWJzaXRlO1xuICAgIHdlYnNpdGUuaW5uZXJIVE1MID0gJzxpbWcgc3JjPVwiLi9hc3NldHMvaW1nL2ljb24vd2ViLnN2Z1wiPkNvbnN1bHRlciBsZSBzaXRlJztcbiAgICB3ZWJzaXRlLnNldEF0dHJpYnV0ZSgncmVsJywgJ25vb3BlbmVyIG5vcmVmZXJyZXInKTtcbiAgICB3ZWJzaXRlLnNldEF0dHJpYnV0ZSgndGFyZ2V0JywgJ19ibGFuaycpO1xuICAgIGluZm8uaW5uZXJIVE1MID0gb3B0cy5tYXJrLmluZm87XG4gICAgb3BlbldpdGguaHJlZiA9IGBnZW86JHtvcHRzLm1hcmsubGF0fSwke29wdHMubWFyay5sbmd9YDtcbiAgICBvcGVuV2l0aC5pbm5lckhUTUwgPSAnPGltZyBzcmM9XCIuL2Fzc2V0cy9pbWcvaWNvbi9waW4uc3ZnXCI+T3V2cmlyIGRhbnMgbGUgR1BTJztcblxuICAgIGRvbS5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gICAgZG9tLmFwcGVuZENoaWxkKGFkZHJlc3MpO1xuICAgIGRvbS5hcHBlbmRDaGlsZCh0b3duKTtcblxuICAgIGNvbnN0IGJ1dHRvbiA9IHRoaXMubWFya2VyT3BlbmVkU3RhdGUob3B0cy5tYXJrLnRpbWV0YWJsZSk7XG4gICAgZG9tLmFwcGVuZENoaWxkKGJ1dHRvbik7XG5cbiAgICBsZXQgYWx3YXlzQ2xvc2VkID0gdHJ1ZTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9wdHMubWFyay50aW1ldGFibGUubGVuZ3RoOyArK2kpIHtcbiAgICAgIGlmIChvcHRzLm1hcmsudGltZXRhYmxlW2ldLmlzT3BlbiA9PT0gdHJ1ZSkge1xuICAgICAgICBhbHdheXNDbG9zZWQgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIEFsbG93IG1vZGFsIG9ubHkgaWYgcG9pIGhhcyB0aW1ldGFibGUgYW5kIGlzIG5vdCBhbHdheXMgY2xvc2VkXG4gICAgaWYgKG9wdHMubWFyay50aW1ldGFibGUubGVuZ3RoID4gMCAmJiBhbHdheXNDbG9zZWQgPT09IGZhbHNlKSB7XG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnRpbWV0YWJsZU1vZGFsLmJpbmQodGhpcywgb3B0cy5tYXJrLCBvcHRzLnVzZXIpKTtcbiAgICB9XG4gICAgXG4gICAgaWYgKG9wdHMubWFyay5pbmZvICE9PSAnJykge1xuICAgICAgZG9tLmFwcGVuZENoaWxkKGluZm8pO1xuICAgIH1cblxuICAgIGlmIChvcHRzLm1hcmsucGhvbmUgIT09ICcnKSB7XG4gICAgICBkb20uYXBwZW5kQ2hpbGQocGhvbmUpO1xuICAgIH1cblxuICAgIGlmIChvcHRzLm1hcmsud2Vic2l0ZSAhPT0gJycpIHtcbiAgICAgIGRvbS5hcHBlbmRDaGlsZCh3ZWJzaXRlKTtcbiAgICB9ICAgIFxuICAgIFxuICAgIGRvbS5hcHBlbmRDaGlsZChvcGVuV2l0aCk7XG5cbiAgICByZXR1cm4gZG9tO1xuICB9XG5cblxuICBzdGF0aWMgY3JlYXRlU3RvcE1hcmtlclBvcHVwKG9wdHMpIHtcbiAgICBjb25zdCBkb20gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcbiAgICBjb25zdCBsb2dvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnSU1HJyk7XG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdIMycpO1xuICAgIGNvbnN0IGRpciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0g0Jyk7XG4gICAgY29uc3QgYWRkcmVzcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0knKTtcbiAgICBjb25zdCB0b3duID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnSScpO1xuICAgIGNvbnN0IHdlYnNpdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdBJyk7XG4gICAgY29uc3QgaW5mbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0EnKTtcbiAgICBjb25zdCBkbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0EnKTtcbiAgICBjb25zdCBvcGVuV2l0aCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0EnKTtcblxuICAgIGRvbS5jbGFzc0xpc3QuYWRkKCdtYXJrZXItcG9wdXAnKTtcbiAgICBsb2dvLnNyYyA9IGAuL2Fzc2V0cy9pbWcvdHJhbnNwb3J0YXRpb24vJHtvcHRzLmRhdGEubmFtZX0ucG5nYDtcbiAgICB0aXRsZS5pbm5lckhUTUwgPSBvcHRzLnN0b3AubmFtZTtcbiAgICBpZiAob3B0cy5zdG9wLnRlcm1pbnVzID09PSB0cnVlKSB7XG4gICAgICBkaXIuaW5uZXJIVE1MID0gYFRlcm1pbnVzIGRlIGxhIGxpZ25lYDtcbiAgICB9IGVsc2Uge1xuICAgICAgZGlyLmlubmVySFRNTCA9IGBEaXJlY3Rpb24gJHtvcHRzLnN0b3AuZGlyfWA7XG4gICAgfVxuICAgIGFkZHJlc3MuaW5uZXJIVE1MID0gb3B0cy5zdG9wLmFkZHJlc3M7XG4gICAgdG93bi5pbm5lckhUTUwgPSBvcHRzLnN0b3AudG93bjtcbiAgICB3ZWJzaXRlLmhyZWYgPSBvcHRzLnN0b3Aud2Vic2l0ZTtcbiAgICB3ZWJzaXRlLmlubmVySFRNTCA9ICc8aW1nIHNyYz1cIi4vYXNzZXRzL2ltZy9pY29uL3dlYi5zdmdcIj5Db25zdWx0ZXIgbGUgc2l0ZSc7XG4gICAgd2Vic2l0ZS5zZXRBdHRyaWJ1dGUoJ3JlbCcsICdub29wZW5lciBub3JlZmVycmVyJyk7XG4gICAgd2Vic2l0ZS5zZXRBdHRyaWJ1dGUoJ3RhcmdldCcsICdfYmxhbmsnKTtcbiAgICBpbmZvLmhyZWYgPSBvcHRzLnN0b3AuaW5mbztcbiAgICBpbmZvLmlubmVySFRNTCA9ICc8aW1nIHNyYz1cIi4vYXNzZXRzL2ltZy9pY29uL2luZm8uc3ZnXCI+SW5mb3JtYXRpb25zJztcbiAgICBpbmZvLnNldEF0dHJpYnV0ZSgncmVsJywgJ25vb3BlbmVyIG5vcmVmZXJyZXInKTtcbiAgICBpbmZvLnNldEF0dHJpYnV0ZSgndGFyZ2V0JywgJ19ibGFuaycpO1xuICAgIGRsLmhyZWYgPSBgLi9hc3NldHMvcGRmLyR7b3B0cy5kYXRhLm5hbWV9LnBkZmA7XG4gICAgZGwuaW5uZXJIVE1MID0gJzxpbWcgc3JjPVwiLi9hc3NldHMvaW1nL2ljb24vZG93bmxvYWQuc3ZnXCI+VMOpbMOpY2hhcmdlciBsZXMgaG9yYWlyZXMnO1xuICAgIGRsLnNldEF0dHJpYnV0ZSgncmVsJywgJ25vb3BlbmVyIG5vcmVmZXJyZXInKTtcbiAgICBkbC5zZXRBdHRyaWJ1dGUoJ3RhcmdldCcsICdfYmxhbmsnKTtcbiAgICBvcGVuV2l0aC5ocmVmID0gYGdlbzoke29wdHMuc3RvcC5sYXR9LCR7b3B0cy5zdG9wLmxuZ31gO1xuICAgIG9wZW5XaXRoLmlubmVySFRNTCA9ICc8aW1nIHNyYz1cIi4vYXNzZXRzL2ltZy9pY29uL3Bpbi5zdmdcIj5PdXZyaXIgZGFucyBsZSBHUFMnO1xuXG4gICAgZG9tLmFwcGVuZENoaWxkKGxvZ28pO1xuICAgIGRvbS5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gICAgZG9tLmFwcGVuZENoaWxkKGRpcik7XG4gICAgZG9tLmFwcGVuZENoaWxkKGFkZHJlc3MpO1xuICAgIGRvbS5hcHBlbmRDaGlsZCh0b3duKTtcbiAgICBcbiAgICBpZiAob3B0cy5zdG9wLmluZm8gIT09ICcnKSB7XG4gICAgICBkb20uYXBwZW5kQ2hpbGQoaW5mbyk7XG4gICAgfVxuXG4gICAgaWYgKG9wdHMuc3RvcC53ZWJzaXRlICE9PSAnJykge1xuICAgICAgZG9tLmFwcGVuZENoaWxkKHdlYnNpdGUpO1xuICAgIH1cbiAgICBcbiAgICBkb20uYXBwZW5kQ2hpbGQoZGwpO1xuICAgIGRvbS5hcHBlbmRDaGlsZChvcGVuV2l0aCk7XG5cbiAgICByZXR1cm4gZG9tO1xuICB9XG5cblxuICAvKiBNYXJrZXIgdGltZXRhYmxlIGFuZCBvcGVuL2Nsb3NlZCBzdGF0ZSAqL1xuXG5cbiAgc3RhdGljIG1hcmtlck9wZW5lZFN0YXRlKHRpbWV0YWJsZSkge1xuICAgIGNvbnN0IGRvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xuICAgIGNvbnN0IHN0YXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnSDUnKTtcbiAgICBjb25zdCBtb3JlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnSScpO1xuICAgIGRvbS5jbGFzc0xpc3QuYWRkKCdtYXJrZXItb3BlbmVkJyk7XG4gICAgZG9tLmFwcGVuZENoaWxkKHN0YXRlKTtcbiAgICBkb20uYXBwZW5kQ2hpbGQobW9yZSk7XG4gICAgXG4gICAgaWYgKHRpbWV0YWJsZS5sZW5ndGgpIHtcbiAgICAgIGxldCBhbHdheXNDbG9zZWQgPSB0cnVlO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aW1ldGFibGUubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYgKHRpbWV0YWJsZVtpXS5pc09wZW4gPT09IHRydWUpIHtcbiAgICAgICAgICBhbHdheXNDbG9zZWQgPSBmYWxzZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoYWx3YXlzQ2xvc2VkID09PSB0cnVlKSB7XG4gICAgICAgIHRoaXMubWFya2VySXNDbG9zZWQoZG9tLCB0cnVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY2hlY2tUaW1lKHRpbWV0YWJsZSwgZG9tKTtcbiAgICAgICAgLy8gVXBkYXRlIGVhY2ggbWludXRlc1xuICAgICAgICAvLyBUT0RPIHN0b3JlIGludGVydmFsIGlmIHRvIGJlIHJlYWR5IHRvIGNhbmNlbCB3aGVuIG90aGVyIG5hdmlnYXRpb24gbW9kZSBhdmFpbGFibGVcbiAgICAgICAgc2V0SW50ZXJ2YWwodGhpcy5jaGVja1RpbWUuYmluZCh0aGlzLCB0aW1ldGFibGUsIGRvbSksIDYwMDAwKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tYXJrZXJJc09wZW5lZChkb20sIHRydWUpO1xuICAgIH1cblxuICAgIHJldHVybiBkb207XG4gIH1cblxuXG4gIHN0YXRpYyBjaGVja1RpbWUodGltZXRhYmxlLCBkb20pIHtcbiAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuICAgIGxldCBob3VyID0gbm93LmdldEhvdXJzKCk7XG4gICAgbGV0IG1pbnV0ZXMgPSBub3cuZ2V0TWludXRlcygpO1xuICAgIGlmIChtaW51dGVzIDwgMTApIHtcbiAgICAgIG1pbnV0ZXMgPSBgMCR7bWludXRlc31gO1xuICAgIH1cblxuICAgIGNvbnN0IGRheU9mV2VlayA9IG5vdy5nZXREYXkoKSAtIDE7XG4gICAgY29uc3Qgb3BlbmluZ1RpbWUgPSBwYXJzZUludChgJHt0aW1ldGFibGVbZGF5T2ZXZWVrXS5vcGVuLmh9JHt0aW1ldGFibGVbZGF5T2ZXZWVrXS5vcGVuLm19YCk7XG4gICAgY29uc3QgY2xvc2luZ1RpbWUgPSBwYXJzZUludChgJHt0aW1ldGFibGVbZGF5T2ZXZWVrXS5jbG9zZS5ofSR7dGltZXRhYmxlW2RheU9mV2Vla10uY2xvc2UubX1gKTtcbiAgICBjb25zdCBjdXJyZW50VGltZSA9IHBhcnNlSW50KGAke2hvdXJ9JHttaW51dGVzfWApO1xuICAgIC8vIFdvbid0IHdvcmsgaWYgdGltZXRhYmxlIG9wZW4vY2xvc2UgaG91cnMgYXJlbid0IG9uIHRoZSBzYW1lIGRheVxuICAgIGlmICh0aW1ldGFibGVbZGF5T2ZXZWVrXS5pc09wZW4gJiYgaXNOYU4ob3BlbmluZ1RpbWUpKSB7IC8vIDI0Lzcgb3BlbmluZ1xuICAgICAgdGhpcy5tYXJrZXJJc09wZW5lZChkb20sIHRydWUpO1xuICAgIH0gZWxzZSBpZiAodGltZXRhYmxlW2RheU9mV2Vla10uaXNPcGVuICYmIGN1cnJlbnRUaW1lID49IG9wZW5pbmdUaW1lICYmIGN1cnJlbnRUaW1lIDwgY2xvc2luZ1RpbWUpIHtcbiAgICAgIC8vIENoZWNrIGZvciBkYXkgYnJlYWtzXG4gICAgICBpZiAodGltZXRhYmxlW2RheU9mV2Vla10uYnJlYWsuaGFzQnJlYWspIHtcbiAgICAgICAgLy8gSW4gY2FzZSBvZiBzZXZlcmFsIGRheSBicmVha3NcbiAgICAgICAgaWYgKHRpbWV0YWJsZVtkYXlPZldlZWtdLmJyZWFrLnNldmVyYWwpIHtcbiAgICAgICAgICBsZXQgaXNDbG9zZWQgPSBmYWxzZTtcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRpbWV0YWJsZVtkYXlPZldlZWtdLmJyZWFrLnNldmVyYWwubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGNvbnN0IGJyZWFrT3BlbmluZ1RpbWUgPSBwYXJzZUludChgJHt0aW1ldGFibGVbZGF5T2ZXZWVrXS5icmVhay5zZXZlcmFsW2ldLmVuZC5ofSR7dGltZXRhYmxlW2RheU9mV2Vla10uYnJlYWsuc2V2ZXJhbFtpXS5lbmQubX1gKTtcbiAgICAgICAgICAgIGNvbnN0IGJyZWFrQ2xvc2luZ1RpbWUgPSBwYXJzZUludChgJHt0aW1ldGFibGVbZGF5T2ZXZWVrXS5icmVhay5zZXZlcmFsW2ldLnN0YXJ0Lmh9JHt0aW1ldGFibGVbZGF5T2ZXZWVrXS5icmVhay5zZXZlcmFsW2ldLnN0YXJ0Lm19YCk7XG4gICAgICAgICAgICBpZiAoY3VycmVudFRpbWUgPj0gYnJlYWtDbG9zaW5nVGltZSAmJiBjdXJyZW50VGltZSA8IGJyZWFrT3BlbmluZ1RpbWUpIHtcbiAgICAgICAgICAgICAgdGhpcy5tYXJrZXJJc0Nsb3NlZChkb20pO1xuICAgICAgICAgICAgICBpc0Nsb3NlZCA9IHRydWU7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIWlzQ2xvc2VkKSB7XG4gICAgICAgICAgICAgIHRoaXMubWFya2VySXNPcGVuZWQoZG9tKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgYnJlYWtPcGVuaW5nVGltZSA9IHBhcnNlSW50KGAke3RpbWV0YWJsZVtkYXlPZldlZWtdLmJyZWFrLmVuZC5ofSR7dGltZXRhYmxlW2RheU9mV2Vla10uYnJlYWsuZW5kLm19YCk7XG4gICAgICAgICAgY29uc3QgYnJlYWtDbG9zaW5nVGltZSA9IHBhcnNlSW50KGAke3RpbWV0YWJsZVtkYXlPZldlZWtdLmJyZWFrLnN0YXJ0Lmh9JHt0aW1ldGFibGVbZGF5T2ZXZWVrXS5icmVhay5zdGFydC5tfWApO1xuICAgICAgICAgIGlmIChjdXJyZW50VGltZSA+PSBicmVha0Nsb3NpbmdUaW1lICYmIGN1cnJlbnRUaW1lIDwgYnJlYWtPcGVuaW5nVGltZSkge1xuICAgICAgICAgICAgdGhpcy5tYXJrZXJJc0Nsb3NlZChkb20pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm1hcmtlcklzT3BlbmVkKGRvbSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm1hcmtlcklzT3BlbmVkKGRvbSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHsgICAgICBcbiAgICAgIHRoaXMubWFya2VySXNDbG9zZWQoZG9tKTtcbiAgICB9XG4gIH1cblxuXG4gIHN0YXRpYyBtYXJrZXJJc09wZW5lZChkb20sIGFsd2F5c09wZW5lZCkge1xuICAgIGRvbS5maXJzdENoaWxkLmlubmVySFRNTCA9IGBPdXZlcnRgO1xuICAgIGlmIChhbHdheXNPcGVuZWQgPT09IHRydWUpIHtcbiAgICAgIGRvbS5sYXN0Q2hpbGQuaW5uZXJIVE1MID0gYFRvdWpvdXJzIG91dmVydGA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRvbS5sYXN0Q2hpbGQuaW5uZXJIVE1MID0gYFZvaXIgbGVzIGhvcmFpcmVzYDtcbiAgICB9XG4gICAgZG9tLmNsYXNzTGlzdC5hZGQoJ29wZW5lZCcpO1xuICB9XG5cblxuICBzdGF0aWMgbWFya2VySXNDbG9zZWQoZG9tLCBhbHdheXNDbG9zZWQpIHtcbiAgICBkb20uZmlyc3RDaGlsZC5pbm5lckhUTUwgPSBgRmVybcOpYDtcbiAgICBpZiAoYWx3YXlzQ2xvc2VkKSB7XG4gICAgICBkb20ubGFzdENoaWxkLmlubmVySFRNTCA9ICdUb3Vqb3VycyBmZXJtw6knO1xuICAgIH0gZWxzZSB7XG4gICAgICBkb20ubGFzdENoaWxkLmlubmVySFRNTCA9IGBWb2lyIGxlcyBob3JhaXJlc2A7XG4gICAgfVxuICAgIGRvbS5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuZWQnKTtcbiAgfVxuXG5cbiAgc3RhdGljIHRpbWV0YWJsZU1vZGFsKG9wdHMsIHVzZXIpIHtcbiAgICBVdGlscy5mZXRjaE1vZGFsKCd0aW1ldGFibGVtb2RhbCcpLnRoZW4oZG9tID0+IHtcbiAgICAgIC8vIFVwZGF0aW5nIG1vZGFsIGhlYWRlciBhbmQgaW5mb1xuICAgICAgZG9tLnF1ZXJ5U2VsZWN0b3IoJyNtYXJrLW5hbWUnKS5pbm5lckhUTUwgPSBvcHRzLm5hbWU7XG4gICAgICBkb20ucXVlcnlTZWxlY3RvcignI21hcmstYWRkcmVzcycpLmlubmVySFRNTCA9IGAke29wdHMuYWRkcmVzc30sICR7b3B0cy50b3dufWA7XG4gICAgICBjb25zdCBkaXN0YW5jZSA9IFV0aWxzLmdldERpc3RhbmNlQmV0d2VlbkNvb3Jkcyhbb3B0cy5sYXQsIG9wdHMubG5nXSwgW3VzZXIubGF0LCB1c2VyLmxuZ10pO1xuICAgICAgZG9tLnF1ZXJ5U2VsZWN0b3IoJyNtYXJrLWRpc3RhbmNlJykuaW5uZXJIVE1MID0gYFZvdXMgw6h0ZXMgw6AgZW52aXJvbiAke1V0aWxzLmNvbnZlcnREaXN0YW5jZVRvU3RyaW5nKGRpc3RhbmNlKX0gZGUgPGI+JHtvcHRzLm5hbWV9PC9iPiDDoCB2b2wgZCdvaXNlYXVgO1xuICAgICAgY29uc3QgZXRhID0gVXRpbHMuYnVpbGREaXN0YW5jZUVUQShkaXN0YW5jZSk7XG4gICAgICBkb20ucXVlcnlTZWxlY3RvcignI21hcmstZXRhJykuaW5uZXJIVE1MID0gYENlIHF1aSByZXByw6lzZW50ZSBlbnZpcm9uICR7ZXRhLmNhcn0gZW4gdm9pdHVyZSwgb3UgJHtldGEud2Fsa30gw6AgcGllZC5gO1xuICAgICAgZG9tLnF1ZXJ5U2VsZWN0b3IoJyNtYXJrLXN0YXRlJykuYXBwZW5kQ2hpbGQodGhpcy5tYXJrZXJPcGVuZWRTdGF0ZShvcHRzLnRpbWV0YWJsZSkpO1xuICAgICAgLy8gTm93IHVwZGF0ZSBkYXkgYnkgZGF5XG4gICAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuICAgICAgY29uc3QgZGF5T2ZXZWVrID0gbm93LmdldERheSgpIC0gMTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3B0cy50aW1ldGFibGUubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgY29uc3QgZGF5RG9tID0gZG9tLnF1ZXJ5U2VsZWN0b3IoJyN0aW1ldGFibGUnKS5jaGlsZHJlbltpXTtcbiAgICAgICAgaWYgKG9wdHMudGltZXRhYmxlW2ldLmlzT3BlbiA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGNvbnN0IG1vcm5pbmcgPSBkYXlEb20ubGFzdEVsZW1lbnRDaGlsZC5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgICBjb25zdCBhZnRlcm5vb24gPSBkYXlEb20ubGFzdEVsZW1lbnRDaGlsZC5sYXN0RWxlbWVudENoaWxkO1xuICAgICAgICAgIGlmIChvcHRzLnRpbWV0YWJsZVtpXS5icmVhayAmJiBvcHRzLnRpbWV0YWJsZVtpXS5icmVhay5oYXNCcmVhayA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgaWYgKG9wdHMudGltZXRhYmxlW2ldLmJyZWFrLnNldmVyYWwpIHtcbiAgICAgICAgICAgICAgbW9ybmluZy5pbm5lckhUTUwgPSBgPHA+JHtvcHRzLnRpbWV0YWJsZVtpXS5vcGVuLmh9OiR7b3B0cy50aW1ldGFibGVbaV0ub3Blbi5tfSDigJIgJHtvcHRzLnRpbWV0YWJsZVtpXS5icmVhay5zZXZlcmFsWzBdLnN0YXJ0Lmh9OiR7b3B0cy50aW1ldGFibGVbaV0uYnJlYWsuc2V2ZXJhbFswXS5zdGFydC5tfTwvcD5gO1xuICAgICAgICAgICAgICBtb3JuaW5nLmNsYXNzTGlzdC5hZGQoJ2ZpbGxlZCcpOyAvLyBNb3JuaW5nXG4gICAgICAgICAgICAgIG1vcm5pbmcuY2xhc3NMaXN0LmFkZCgnc3BsaXRlZCcpOyAvLyBNb3JuaW5nXG4gICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgb3B0cy50aW1ldGFibGVbaV0uYnJlYWsuc2V2ZXJhbC5sZW5ndGggLSAxOyArK2opIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcbiAgICAgICAgICAgICAgICBkaXYuaW5uZXJIVE1MID0gYDxwPiR7b3B0cy50aW1ldGFibGVbaV0uYnJlYWsuc2V2ZXJhbFtqXS5lbmQuaH06JHtvcHRzLnRpbWV0YWJsZVtpXS5icmVhay5zZXZlcmFsW2pdLmVuZC5tfSDigJIgJHtvcHRzLnRpbWV0YWJsZVtpXS5icmVhay5zZXZlcmFsW2ogKyAxXS5zdGFydC5ofToke29wdHMudGltZXRhYmxlW2ldLmJyZWFrLnNldmVyYWxbaiArIDFdLnN0YXJ0Lm19PC9wPmA7XG4gICAgICAgICAgICAgICAgZGl2LmNsYXNzTGlzdC5hZGQoJ2ZpbGxlZCcpO1xuICAgICAgICAgICAgICAgIGRpdi5jbGFzc0xpc3QuYWRkKCdzcGxpdGVkJyk7XG4gICAgICAgICAgICAgICAgZGl2LnN0eWxlLmJvcmRlclJhZGl1cyA9ICcuNXJlbSc7XG4gICAgICAgICAgICAgICAgZGl2LnN0eWxlLmp1c3RpZnlDb250ZW50ID0gJ2NlbnRlcic7XG4gICAgICAgICAgICAgICAgZGF5RG9tLmxhc3RFbGVtZW50Q2hpbGQuaW5zZXJ0QmVmb3JlKGRpdiwgZGF5RG9tLmxhc3RFbGVtZW50Q2hpbGQubGFzdEVsZW1lbnRDaGlsZCk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBhZnRlcm5vb24uaW5uZXJIVE1MID0gYDxwPiR7b3B0cy50aW1ldGFibGVbaV0uYnJlYWsuc2V2ZXJhbFtvcHRzLnRpbWV0YWJsZVtpXS5icmVhay5zZXZlcmFsLmxlbmd0aCAtIDFdLmVuZC5ofToke29wdHMudGltZXRhYmxlW2ldLmJyZWFrLnNldmVyYWxbb3B0cy50aW1ldGFibGVbaV0uYnJlYWsuc2V2ZXJhbC5sZW5ndGggLSAxXS5lbmQubX0g4oCSICR7b3B0cy50aW1ldGFibGVbaV0uY2xvc2UuaH06JHtvcHRzLnRpbWV0YWJsZVtpXS5jbG9zZS5tfTwvcD5gO1xuICAgICAgICAgICAgICBhZnRlcm5vb24uY2xhc3NMaXN0LmFkZCgnZmlsbGVkJyk7IC8vIEFmdGVybm9vblxuICAgICAgICAgICAgICBhZnRlcm5vb24uY2xhc3NMaXN0LmFkZCgnc3BsaXRlZCcpOyAvLyBBZnRlcm5vb25cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIG1vcm5pbmcuaW5uZXJIVE1MID0gYDxwPiR7b3B0cy50aW1ldGFibGVbaV0ub3Blbi5ofToke29wdHMudGltZXRhYmxlW2ldLm9wZW4ubX0g4oCSICR7b3B0cy50aW1ldGFibGVbaV0uYnJlYWsuc3RhcnQuaH06JHtvcHRzLnRpbWV0YWJsZVtpXS5icmVhay5zdGFydC5tfTwvcD5gO1xuICAgICAgICAgICAgICBtb3JuaW5nLmNsYXNzTGlzdC5hZGQoJ2ZpbGxlZCcpOyAvLyBNb3JuaW5nXG4gICAgICAgICAgICAgIG1vcm5pbmcuY2xhc3NMaXN0LmFkZCgnc3BsaXRlZCcpOyAvLyBNb3JuaW5nXG4gICAgICAgICAgICAgIGFmdGVybm9vbi5pbm5lckhUTUwgPSBgPHA+JHtvcHRzLnRpbWV0YWJsZVtpXS5icmVhay5lbmQuaH06JHtvcHRzLnRpbWV0YWJsZVtpXS5icmVhay5lbmQubX0g4oCSICR7b3B0cy50aW1ldGFibGVbaV0uY2xvc2UuaH06JHtvcHRzLnRpbWV0YWJsZVtpXS5jbG9zZS5tfTwvcD5gO1xuICAgICAgICAgICAgICBhZnRlcm5vb24uY2xhc3NMaXN0LmFkZCgnZmlsbGVkJyk7IC8vIEFmdGVybm9vblxuICAgICAgICAgICAgICBhZnRlcm5vb24uY2xhc3NMaXN0LmFkZCgnc3BsaXRlZCcpOyAvLyBBZnRlcm5vb25cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKG9wdHMudGltZXRhYmxlW2ldLm9wZW4uaCAmJiBvcHRzLnRpbWV0YWJsZVtpXS5jbG9zZS5oKSB7XG4gICAgICAgICAgICBtb3JuaW5nLmlubmVySFRNTCA9IGA8cD4ke29wdHMudGltZXRhYmxlW2ldLm9wZW4uaH06JHtvcHRzLnRpbWV0YWJsZVtpXS5vcGVuLm19PC9wPmA7XG4gICAgICAgICAgICBtb3JuaW5nLmNsYXNzTGlzdC5hZGQoJ2ZpbGxlZCcpOyAvLyBNb3JuaW5nXG4gICAgICAgICAgICBhZnRlcm5vb24uaW5uZXJIVE1MID0gYDxwPiR7b3B0cy50aW1ldGFibGVbaV0uY2xvc2UuaH06JHtvcHRzLnRpbWV0YWJsZVtpXS5jbG9zZS5tfTwvcD5gO1xuICAgICAgICAgICAgYWZ0ZXJub29uLmNsYXNzTGlzdC5hZGQoJ2ZpbGxlZCcpOyAvLyBBZnRlcm5vb25cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbW9ybmluZy5pbm5lckhUTUwgPSBgPHA+MDA6MDA8L3A+YDtcbiAgICAgICAgICAgIG1vcm5pbmcuY2xhc3NMaXN0LmFkZCgnZmlsbGVkJyk7IC8vIE1vcm5pbmdcbiAgICAgICAgICAgIGFmdGVybm9vbi5pbm5lckhUTUwgPSBgPHA+MjQ6MDA8L3A+YDtcbiAgICAgICAgICAgIGFmdGVybm9vbi5jbGFzc0xpc3QuYWRkKCdmaWxsZWQnKTsgLy8gQWZ0ZXJub29uXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRheURvbS5sYXN0RWxlbWVudENoaWxkLmlubmVySFRNTCA9IGA8ZGl2IGNsYXNzPVwiY2xvc2VkXCI+PHA+RmVybcOpPC9wPjwvZGl2PmA7ICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIC8vIE1hdGNoaW5nIHRvZGF5J3MgZGF5XG4gICAgICAgIGlmIChpID09PSBkYXlPZldlZWspIHtcbiAgICAgICAgICBkYXlEb20uY2xhc3NMaXN0LmFkZCgndG9kYXknKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWwtb3ZlcmxheScpLmFwcGVuZENoaWxkKGRvbSk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWwtb3ZlcmxheScpLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG5cdFx0XHRzZXRUaW1lb3V0KCgpID0+IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RhbC1vdmVybGF5Jykuc3R5bGUub3BhY2l0eSA9IDEsIDUwKTtcbiAgICB9KTtcbiAgfVxuXG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgTWFwRmFjdG9yeTtcbiIsImNsYXNzIEV2dHMge1xuXG5cbiAgLyoqIEBzdW1tYXJ5IDxoMT5KYXZhU2NyaXB0IHJlZ3VsYXIgYW5kIGN1c3RvbSBldmVudHMgYWJzdHJhY3Rpb248L2gxPlxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgSnVuZSAyMDIwXG4gICAqIEBkZXNjcmlwdGlvbiA8YmxvY2txdW90ZT5UaGUgRXZ0cyBjbGFzcyBwcm92aWRlcyBhbiBhYnN0cmFjdGlvbiBvZiBKYXZhU2NyaXB0IGV2ZW50IGxpc3RlbmVyLCB0byBhbGxvd1xuICAgKiBlYXN5IGJpbmRpbmcgYW5kIHJlbW92aW5nIHRob3NlIGV2ZW50cy4gSXQgYWxzbyBwcm92aWRlcyBhbiBpbnRlcmZhY2UgdG8gcmVnaXN0ZXIgY3VzdG9tIGV2ZW50cy4gVGhpcyBjbGFzcyBpc1xuICAgKiBtZWFudCB0byBiZSB1c2VkIG9uIGFsbCBzY29wZXMgeW91IG5lZWQgOyBtb2R1bGUgb3IgZ2xvYmFsLiBSZWZlciB0byBlYWNoIHB1YmxpYyBtZXRob2QgZm9yIGRldGFpbGVkIGZlYXR1cmVzLlxuICAgKiBGb3Igc291cmNlIGNvZGUsIHBsZWFzZSBnbyB0byA8YSBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL0FydGh1ckJlYXVsaWV1L0V2dHMuanNcIiBhbHQ9XCJjdXN0b20tZXZlbnRzLWpzXCI+XG4gICAqIGh0dHBzOi8vZ2l0aHViLmNvbS9BcnRodXJCZWF1bGlldS9FdnRzLmpzPC9hPjwvYmxvY2txdW90ZT5cbiAgICogQHBhcmFtIHtib29sZWFufSBbZGVidWc9ZmFsc2VdIC0gRGVidWcgZmxhZyA7IHdoZW4gdHJ1ZSwgbG9ncyB3aWxsIGJlIG91dHB1dCBpbiBKYXZhU2NyaXB0IGNvbnNvbGUgYXQgZWFjaCBldmVudCAqL1xuICBjb25zdHJ1Y3RvcihkZWJ1ZyA9IGZhbHNlKSB7XG4gICAgLy8gUHJldmVudCB3cm9uZyB0eXBlIGZvciBkZWJ1Z1xuICAgIGlmICh0eXBlb2YgZGVidWcgIT09ICdib29sZWFuJykge1xuICAgICAgZGVidWcgPSBmYWxzZTtcbiAgICB9XG4gICAgLyoqIEBwcml2YXRlXG4gICAgICogQG1lbWJlciB7Ym9vbGVhbn0gLSBJbnRlcm5hbCBsb2dnaW5nIGZsYWcgZnJvbSBjb25zdHJ1Y3RvciBvcHRpb25zLCBhbGxvdyB0byBvdXRwdXQgZWFjaCBldmVudCBhY3Rpb24gKi9cbiAgICB0aGlzLl9kZWJ1ZyA9IGRlYnVnO1xuICAgIC8qKiBAcHJpdmF0ZVxuICAgICAqIEBtZW1iZXIge251bWJlcn0gLSBTdGFydCB0aGUgSUQgaW5jcmVtZW50ZXIgYXQgcHNldWRvIHJhbmRvbSB2YWx1ZSwgdXNlZCBmb3IgYm90aCByZWd1bGFyIGFuZCBjdXN0b20gZXZlbnRzICovXG4gICAgdGhpcy5faWRJbmNyZW1lbnRvciA9IChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBNYXRoLmZsb29yKDI1NikpICogNTY3OCk7XG4gICAgLyoqIEBwcml2YXRlXG4gICAgICogQG1lbWJlciB7YW55W119IC0gV2Ugc3RvcmUgY2xhc3NpY2FsIGV2ZW50IGxpc3RlbmVycyBpbiBhcnJheSBvZiBvYmplY3RzIGNvbnRhaW5pbmcgYWxsIHRoZWlyIGluZm9ybWF0aW9uICovXG4gICAgdGhpcy5fcmVndWxhckV2ZW50cyA9IFtdO1xuICAgIC8qKiBAcHJpdmF0ZVxuICAgICAqIEBtZW1iZXIge29iamVjdH0gLSBXZSBzdG9yZSBjdXN0b20gZXZlbnRzIGJ5IG5hbWUgYXMga2V5LCBlYWNoIGtleSBzdG9yZXMgYW4gQXJyYXkgb2Ygc3Vic2NyaWJlZCBldmVudHMgKi9cbiAgICB0aGlzLl9jdXN0b21FdmVudHMgPSB7fTtcbiAgICAvKiogQHB1YmxpY1xuICAgICAqIEBtZW1iZXIge3N0cmluZ30gLSBDb21wb25lbnQgdmVyc2lvbiAqL1xuICAgIHRoaXMudmVyc2lvbiA9ICcxLjIuMSc7XG4gIH1cblxuXG4gIC8qKiBAbWV0aG9kXG4gICAqIEBuYW1lIGRlc3Ryb3lcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgRXZ0c1xuICAgKiBAZGVzY3JpcHRpb24gPGJsb2NrcXVvdGU+RXZ0cyBkZXN0cnVjdG9yLiBXaWxsIHJlbW92ZSBhbGwgZXZlbnQgbGlzdGVuZXJzIGFuZCBrZXlzIGluIGluc3RhbmNlLjwvYmxvY2txdW90ZT4gKi9cbiAgZGVzdHJveSgpIHtcbiAgICAvLyBEZWJ1ZyBsb2dnaW5nXG4gICAgdGhpcy5fcmFpc2UoJ2xvZycsICdFdnRzLmRlc3Ryb3knKTtcbiAgICAvLyBSZW1vdmUgYWxsIGV4aXN0aW5nIGV2ZW50TGlzdGVuZXJcbiAgICB0aGlzLnJlbW92ZUFsbEV2ZW50cygpO1xuICAgIC8vIERlbGV0ZSBvYmplY3QgYXR0cmlidXRlc1xuICAgIE9iamVjdC5rZXlzKHRoaXMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIGRlbGV0ZSB0aGlzW2tleV07XG4gICAgfSk7XG4gIH1cblxuXG4gIC8qICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbiAgLyogIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICBDTEFTU0lDIEpTIEVWRU5UUyBPVkVSUklERSAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICAqL1xuICAvKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4gIC8qICBUaGUgZm9sbG93aW5nIG1ldGhvZHMgYXJlIG1hZGUgdG8gYWJzdHJhY3QgdGhlIGV2ZW50IGxpc3RlbmVycyBmcm9tIHRoZSBKYXZhU2NyaXB0IGxheWVyLCBzbyB5b3UgY2FuIGVhc2lseSAgICAgKi9cbiAgLyogIHJlbW92ZSB0aGVtIHdoZW4gZG9uZSB1c2luZywgd2l0aG91dCBib3RoZXJpbmcgd2l0aCBiaW5kaW5nIHVzdWFsIGJ1c2luZXNzIGZvciB0aGVtLiAnYWRkRXZlbnQvcmVtb3ZlRXZlbnQnICAgICAqL1xuICAvKiAgbWV0aG9kIHJlcGxhY2UgdGhlIGluaXRpYWwgb25lcy4gJ3JlbW92ZUFsbEV2ZW50cycgY2xlYXJzIGFsbCBpbnN0YW5jZSBldmVudCBsaXN0ZW5lcnMgOyBuaWNlIGZvciBkZXN0cm95ICAgICAgICovXG4gIC8qICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuXG4gIC8qKiBAbWV0aG9kXG4gICAqIEBuYW1lIGFkZEV2ZW50XG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIEV2dHNcbiAgICogQGRlc2NyaXB0aW9uIDxibG9ja3F1b3RlPjxjb2RlPmFkZEV2ZW50PC9jb2RlPiBtZXRob2QgYWJzdHJhY3RzIHRoZSA8Y29kZT5hZGRFdmVudExpc3RlbmVyPC9jb2RlPiBtZXRob2QgdG8gZWFzaWx5XG4gICAqIHJlbW92ZSBpdCB3aGVuIG5lZWRlZCwgYWxzbyB0byBzZXQgYSBjdXN0b20gc2NvcGUgb24gY2FsbGJhY2suPC9ibG9ja3F1b3RlPlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnROYW1lIC0gVGhlIGV2ZW50IG5hbWUgdG8gZmlyZSAobW91c2Vtb3ZlLCBjbGljaywgY29udGV4dCBldGMuKVxuICAgKiBAcGFyYW0ge29iamVjdH0gZWxlbWVudCAtIFRoZSBET00gZWxlbWVudCB0byBhdHRhY2ggdGhlIGxpc3RlbmVyIHRvXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIC0gVGhlIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiBldmVudCBpcyByZWFsaXNlZFxuICAgKiBAcGFyYW0ge29iamVjdH0gW3Njb3BlPWVsZW1lbnRdIC0gVGhlIGV2ZW50IHNjb3BlIHRvIGFwcGx5IHRvIHRoZSBjYWxsYmFjayAob3B0aW9uYWwsIGRlZmF1bHQgdG8gRE9NIGVsZW1lbnQpXG4gICAqIEBwYXJhbSB7b2JqZWN0fGJvb2xlYW59IFtvcHRpb25zPWZhbHNlXSAtIFRoZSBldmVudCBvcHRpb25zICh1c2VDYXB0dXJlIGFuZCBlbHNlKVxuICAgKiBAcmV0dXJucyB7bnVtYmVyfGJvb2xlYW59IC0gVGhlIGV2ZW50IElEIHRvIHVzZSB0byBtYW51YWxseSByZW1vdmUgYW4gZXZlbnQsIGZhbHNlIGlmIGFyZ3VtZW50cyBhcmUgaW52YWxpZCAqL1xuICBhZGRFdmVudChldmVudE5hbWUsIGVsZW1lbnQsIGNhbGxiYWNrLCBzY29wZSA9IGVsZW1lbnQsIG9wdGlvbnMgPSBmYWxzZSkge1xuICAgIC8vIERlYnVnIGxvZ2dpbmdcbiAgICB0aGlzLl9yYWlzZSgnbG9nJywgYEV2dHMuYWRkRXZlbnQ6ICR7ZXZlbnROYW1lfSAke2VsZW1lbnR9ICR7Y2FsbGJhY2t9ICR7c2NvcGV9ICR7b3B0aW9uc31gKTtcbiAgICAvLyBNaXNzaW5nIG1hbmRhdG9yeSBhcmd1bWVudHNcbiAgICBpZiAoZXZlbnROYW1lID09PSBudWxsIHx8IGV2ZW50TmFtZSA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICBlbGVtZW50ID09PSBudWxsIHx8IGVsZW1lbnQgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgY2FsbGJhY2sgPT09IG51bGwgfHwgY2FsbGJhY2sgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5fcmFpc2UoJ2Vycm9yJywgJ0V2dHMuYWRkRXZlbnQ6IE1pc3NpbmcgbWFuZGF0b3J5IGFyZ3VtZW50cycpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvLyBQcmV2ZW50IHdyb25nIHR5cGUgZm9yIGFyZ3VtZW50cyAobWFuZGF0b3J5IGFuZCBvcHRpb25hbClcbiAgICBjb25zdCBlcnIgPSAoKSA9PiB7XG4gICAgICB0aGlzLl9yYWlzZSgnZXJyb3InLCAnRXZ0cy5hZGRFdmVudDogV3JvbmcgdHlwZSBmb3IgYXJndW1lbnQnKTtcbiAgICB9O1xuICAgIC8vIFRlc3QgYXJndW1lbnQgdmFsaWRpdHkgZm9yIGZ1cnRoZXIgcHJvY2Vzc1xuICAgIGlmICh0eXBlb2YgZXZlbnROYW1lICE9PSAnc3RyaW5nJyB8fCB0eXBlb2YgZWxlbWVudCAhPT0gJ29iamVjdCcgfHwgdHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICBlcnIoKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKChzY29wZSAhPT0gbnVsbCAmJiBzY29wZSAhPT0gdW5kZWZpbmVkKSAmJiB0eXBlb2Ygc2NvcGUgIT09ICdvYmplY3QnKSB7XG4gICAgICBlcnIoKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKChvcHRpb25zICE9PSBudWxsICYmIG9wdGlvbnMgIT09IHVuZGVmaW5lZCkgJiYgKHR5cGVvZiBvcHRpb25zICE9PSAnb2JqZWN0JyAmJiB0eXBlb2Ygb3B0aW9ucyAhPT0gJ2Jvb2xlYW4nKSkge1xuICAgICAgZXJyKCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8vIFNhdmUgc2NvcGUgdG8gY2FsbGJhY2sgZnVuY3Rpb24sIGRlZmF1bHQgc2NvcGUgaXMgRE9NIHRhcmdldCBvYmplY3RcbiAgICBjYWxsYmFjayA9IGNhbGxiYWNrLmJpbmQoc2NvcGUpO1xuICAgIC8vIEFkZCBldmVudCB0byBpbnRlcm5hbCBhcnJheSBhbmQga2VlcCBhbGwgaXRzIGRhdGFcbiAgICB0aGlzLl9yZWd1bGFyRXZlbnRzLnB1c2goe1xuICAgICAgaWQ6IHRoaXMuX2lkSW5jcmVtZW50b3IsXG4gICAgICBlbGVtZW50OiBlbGVtZW50LFxuICAgICAgZXZlbnROYW1lOiBldmVudE5hbWUsXG4gICAgICBzY29wZTogc2NvcGUsXG4gICAgICBjYWxsYmFjazogY2FsbGJhY2ssXG4gICAgICBvcHRpb25zOiBvcHRpb25zXG4gICAgfSk7XG4gICAgLy8gQWRkIGV2ZW50IGxpc3RlbmVyIHdpdGggb3B0aW9uc1xuICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGNhbGxiYWNrLCBvcHRpb25zKTtcbiAgICAvLyBQb3N0IGluY3JlbWVudCB0byByZXR1cm4gdGhlIHRydWUgZXZlbnQgZW50cnkgaWQsIHRoZW4gdXBkYXRlIHRoZSBpbmNyZW1lbnRlclxuICAgIHJldHVybiB0aGlzLl9pZEluY3JlbWVudG9yKys7XG4gIH1cblxuXG4gIC8qKiBAbWV0aG9kXG4gICAqIEBuYW1lIHJlbW92ZUV2ZW50XG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIEV2dHNcbiAgICogQGRlc2NyaXB0aW9uIDxibG9ja3F1b3RlPjxjb2RlPnJlbW92ZUV2ZW50PC9jb2RlPiBtZXRob2QgYWJzdHJhY3RzIHRoZSA8Y29kZT5yZW1vdmVFdmVudExpc3RlbmVyPC9jb2RlPiBtZXRob2QgdG9cbiAgICogcmVhbGx5IHJlbW92ZSBldmVudCBsaXN0ZW5lcnMuPC9ibG9ja3F1b3RlPlxuICAgKiBAcGFyYW0ge251bWJlcn0gZXZlbnRJZCAtIFRoZSBldmVudCBJRCB0byByZW1vdmUgbGlzdGVuZXIgZnJvbS4gUmV0dXJuZWQgd2hlbiBhZGRFdmVudCBpcyBjYWxsZWRcbiAgICogQHJldHVybnMge2Jvb2xlYW59IC0gVGhlIG1ldGhvZCBzdGF0dXMgOyB0cnVlIGZvciBzdWNjZXNzLCBmYWxzZSBmb3Igbm9uLWV4aXN0aW5nIGV2ZW50ICovXG4gIHJlbW92ZUV2ZW50KGV2ZW50SWQpIHtcbiAgICAvLyBEZWJ1ZyBsb2dnaW5nXG4gICAgdGhpcy5fcmFpc2UoJ2xvZycsIGBFdmVudHMucmVtb3ZlRXZlbnQ6ICR7ZXZlbnRJZH1gKTtcbiAgICAvLyBNaXNzaW5nIG1hbmRhdG9yeSBhcmd1bWVudHNcbiAgICBpZiAoZXZlbnRJZCA9PT0gbnVsbCB8fCBldmVudElkID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuX3JhaXNlKCdlcnJvcicsICdFdnRzLnJlbW92ZUV2ZW50OiBNaXNzaW5nIG1hbmRhdG9yeSBhcmd1bWVudHMnKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy8gUHJldmVudCB3cm9uZyB0eXBlIGZvciBhcmd1bWVudHMgKG1hbmRhdG9yeSlcbiAgICBpZiAodHlwZW9mIGV2ZW50SWQgIT09ICdudW1iZXInKSB7XG4gICAgICB0aGlzLl9yYWlzZSgnZXJyb3InLCAnRXZ0cy5yZW1vdmVFdmVudDogV3JvbmcgdHlwZSBmb3IgYXJndW1lbnQnKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy8gUmV0dXJuZWQgdmFsdWVcbiAgICBsZXQgc3RhdHVzQ29kZSA9IGZhbHNlOyAvLyBOb3QgZm91bmQgc3RhdHVzIGNvZGUgYnkgZGVmYXVsdCAoZmFsc2UpXG4gICAgLy8gSXRlcmF0ZSBvdmVyIHNhdmVkIGxpc3RlbmVycywgcmV2ZXJzZSBvcmRlciBmb3IgcHJvcGVyIHNwbGljaW5nXG4gICAgZm9yIChsZXQgaSA9ICh0aGlzLl9yZWd1bGFyRXZlbnRzLmxlbmd0aCAtIDEpOyBpID49IDAgOyAtLWkpIHtcbiAgICAgIC8vIElmIGFuIGV2ZW50IElEIG1hdGNoIGluIHNhdmVkIG9uZXMsIHdlIHJlbW92ZSBpdCBhbmQgdXBkYXRlIHNhdmVkIGxpc3RlbmVyc1xuICAgICAgaWYgKHRoaXMuX3JlZ3VsYXJFdmVudHNbaV0uaWQgPT09IGV2ZW50SWQpIHtcbiAgICAgICAgLy8gVXBkYXRlIHN0YXR1cyBjb2RlXG4gICAgICAgIHN0YXR1c0NvZGUgPSB0cnVlOyAvLyBGb3VuZCBhbmQgcmVtb3ZlZCBldmVudCBsaXN0ZW5lciBzdGF0dXMgY29kZSAodHJ1ZSlcbiAgICAgICAgdGhpcy5fY2xlYXJSZWd1bGFyRXZlbnQoaSk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIFJldHVybiB3aXRoIHN0YXR1cyBjb2RlXG4gICAgcmV0dXJuIHN0YXR1c0NvZGU7XG4gIH1cblxuXG4gIC8qKiBAbWV0aG9kXG4gICAqIEBuYW1lIHJlbW92ZUFsbEV2ZW50c1xuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBFdnRzXG4gICAqIEBkZXNjcmlwdGlvbiA8YmxvY2txdW90ZT5DbGVhciBhbGwgZXZlbnQgbGlzdGVuZXIgcmVnaXN0ZXJlZCB0aHJvdWdoIHRoaXMgY2xhc3Mgb2JqZWN0LjwvYmxvY2txdW90ZT5cbiAgICogQHJldHVybnMge2Jvb2xlYW59IC0gVGhlIG1ldGhvZCBzdGF0dXMgOyB0cnVlIGZvciBzdWNjZXNzLCBmYWxzZSBmb3Igbm90IHJlbW92ZWQgYW55IGV2ZW50ICovXG4gIHJlbW92ZUFsbEV2ZW50cygpIHtcbiAgICAvLyBEZWJ1ZyBsb2dnaW5nXG4gICAgdGhpcy5fcmFpc2UoJ2xvZycsICdFdnRzLnJlbW92ZUFsbEV2ZW50cycpO1xuICAgIC8vIFJldHVybmVkIHZhbHVlXG4gICAgbGV0IHN0YXR1c0NvZGUgPSBmYWxzZTsgLy8gRGlkbid0IHJlbW92ZWQgYW55IHN0YXR1cyBjb2RlIGJ5IGRlZmF1bHQgKGZhbHNlKVxuICAgIC8vIEZsYWcgdG8ga25vdyBpZiB0aGVyZSB3YXMgYW55IHByZXZpb3VzbHkgc3RvcmVkIGV2ZW50IGxpc3RlbmVyc1xuICAgIGNvbnN0IGhhZEV2ZW50cyA9ICh0aGlzLl9yZWd1bGFyRXZlbnRzLmxlbmd0aCA+IDApO1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBzYXZlZCBsaXN0ZW5lcnMsIHJldmVyc2Ugb3JkZXIgZm9yIHByb3BlciBzcGxpY2luZ1xuICAgIGZvciAobGV0IGkgPSAodGhpcy5fcmVndWxhckV2ZW50cy5sZW5ndGggLSAxKTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgIHRoaXMuX2NsZWFyUmVndWxhckV2ZW50KGkpO1xuICAgIH1cbiAgICAvLyBJZiBhbGwgZXZlbnRzIHdoZXJlIHJlbW92ZWQsIHVwZGF0ZSBzdGF0dXNDb2RlIHRvIHN1Y2Nlc3NcbiAgICBpZiAodGhpcy5fcmVndWxhckV2ZW50cy5sZW5ndGggPT09IDAgJiYgaGFkRXZlbnRzKSB7XG4gICAgICAvLyBVcGRhdGUgc3RhdHVzIGNvZGVcbiAgICAgIHN0YXR1c0NvZGUgPSB0cnVlOyAvLyBGb3VuZCBhbmQgcmVtb3ZlZCBhbGwgZXZlbnRzIGxpc3RlbmVyIHN0YXR1cyBjb2RlICh0cnVlKVxuICAgIH1cbiAgICAvLyBSZXR1cm4gd2l0aCBzdGF0dXMgY29kZVxuICAgIHJldHVybiBzdGF0dXNDb2RlO1xuICB9XG5cblxuICAvKiogQG1ldGhvZFxuICAgKiBAbmFtZSBfY2xlYXJSZWd1bGFyRXZlbnRcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIEV2dHNcbiAgICogQGRlc2NyaXB0aW9uIDxibG9ja3F1b3RlPjxjb2RlPl9jbGVhclJlZ3VsYXJFdmVudDwvY29kZT4gbWV0aG9kIHJlbW92ZSB0aGUgc2F2ZWQgZXZlbnQgbGlzdGVuZXIgZm9yIGFcbiAgICogZ2l2ZW4gaW5kZXggaW4gcmVndWxhckV2ZW50cyBhcnJheSByYW5nZS48L2Jsb2NrcXVvdGU+XG4gICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCAtIFRoZSByZWd1bGFyIGV2ZW50IGluZGV4IHRvIHJlbW92ZSBmcm9tIGNsYXNzIGF0dHJpYnV0ZXNcbiAgICogQHJldHVybiB7Ym9vbGVhbn0gLSBUaGUgbWV0aG9kIHN0YXR1cyA7IHRydWUgZm9yIHN1Y2Nlc3MsIGZhbHNlIGZvciBub3QgY2xlYXJlZCBhbnkgZXZlbnQgKi9cbiAgX2NsZWFyUmVndWxhckV2ZW50KGluZGV4KSB7XG4gICAgLy8gRGVidWcgbG9nZ2luZ1xuICAgIHRoaXMuX3JhaXNlKCdsb2cnLCBgRXZ0cy5fY2xlYXJSZWd1bGFyRXZlbnQ6ICR7aW5kZXh9YCk7XG4gICAgLy8gTWlzc2luZyBtYW5kYXRvcnkgYXJndW1lbnRzXG4gICAgaWYgKGluZGV4ID09PSBudWxsIHx8IGluZGV4ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuX3JhaXNlKCdlcnJvcicsICdFdnRzLl9jbGVhclJlZ3VsYXJFdmVudDogTWlzc2luZyBtYW5kYXRvcnkgYXJndW1lbnQnKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy8gUHJldmVudCB3cm9uZyB0eXBlIGZvciBhcmd1bWVudHMgKG1hbmRhdG9yeSlcbiAgICBpZiAodHlwZW9mIGluZGV4ICE9PSAnbnVtYmVyJykge1xuICAgICAgdGhpcy5fcmFpc2UoJ2Vycm9yJywgJ0V2dHMuX2NsZWFyUmVndWxhckV2ZW50OiBXcm9uZyB0eXBlIGZvciBhcmd1bWVudCcpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvLyBDaGVjayBpZiBpbmRleCBtYXRjaCBhbiBleGlzdGluZyBldmVudCBpbiBhdHRyaWJ1dGVzXG4gICAgaWYgKHRoaXMuX3JlZ3VsYXJFdmVudHNbaW5kZXhdKSB7XG4gICAgICAvLyBSZW1vdmUgaXRzIGV2ZW50IGxpc3RlbmVyIGFuZCB1cGRhdGUgcmVndWxhckV2ZW50cyBhcnJheVxuICAgICAgY29uc3QgZXZ0ID0gdGhpcy5fcmVndWxhckV2ZW50c1tpbmRleF07XG4gICAgICBldnQuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2dC5ldmVudE5hbWUsIGV2dC5jYWxsYmFjaywgZXZ0Lm9wdGlvbnMpO1xuICAgICAgdGhpcy5fcmVndWxhckV2ZW50cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cblxuICAvKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4gIC8qICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICBDVVNUT00gSlMgRVZFTlRTICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgKi9cbiAgLyogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuICAvKiAgVGhlIHRocmVlIGZvbGxvd2luZyBtZXRob2RzIChzdWJzY3JpYmUsIHVuc3Vic2NyaWJlLCBwdWJsaXNoKSBhcmUgZGVzaWduZWQgdG8gcmVmZXJlbmNlIGFuIGV2ZW50IGJ5IGl0cyBuYW1lICAgICovXG4gIC8qICBhbmQgaGFuZGxlIGFzIG1hbnkgc3Vic2NyaXB0aW9ucyBhcyB5b3Ugd2FudC4gV2hlbiBzdWJzY3JpYmluZywgeW91IGdldCBhbiBJRCB5b3UgY2FuIHVzZSB0byB1bnN1YnNjcmliZSB5b3VyICAgKi9cbiAgLyogIGV2ZW50IGxhdGVyLiBKdXN0IHB1Ymxpc2ggd2l0aCB0aGUgZXZlbnQgbmFtZSB0byBjYWxsYmFjayBhbGwgaXRzIHJlZ2lzdGVyZWQgc3Vic2NyaXB0aW9ucy4gICAgICAgICAgICAgICAgICAgICAqL1xuICAvKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cblxuICAvKiogQG1ldGhvZFxuICAgKiBAbmFtZSBzdWJzY3JpYmVcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgRXZ0c1xuICAgKiBAZGVzY3JpcHRpb24gPGJsb2NrcXVvdGU+U3Vic2NyaWJlIG1ldGhvZCBhbGxvdyB5b3UgdG8gbGlzdGVuIHRvIGFuIGV2ZW50IGFuZCByZWFjdCB3aGVuIGl0IG9jY3Vycy48L2Jsb2NrcXVvdGU+XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWUgLSBFdmVudCBuYW1lICh0aGUgb25lIHRvIHVzZSB0byBwdWJsaXNoKVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayAtIFRoZSBjYWxsYmFjayB0byBleGVjdXRlIHdoZW4gZXZlbnQgaXMgcHVibGlzaGVkXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29uZVNob3Q9ZmFsc2VdIC0gT25lIHNob3QgOiB0byByZW1vdmUgc3Vic2NyaXB0aW9uIHRoZSBmaXJzdCB0aW1lIGNhbGxiYWNrIGlzIGZpcmVkXG4gICAqIEByZXR1cm5zIHtudW1iZXJ8Ym9vbGVhbn0gLSBUaGUgZXZlbnQgaWQsIHRvIGJlIHVzZWQgd2hlbiBtYW51YWxseSB1bnN1YnNjcmliaW5nICovXG4gIHN1YnNjcmliZShldmVudE5hbWUsIGNhbGxiYWNrLCBvbmVTaG90ID0gZmFsc2UpIHtcbiAgICAvLyBEZWJ1ZyBsb2dnaW5nXG4gICAgdGhpcy5fcmFpc2UoJ2xvZycsIGBFdnRzLnN1YnNjcmliZTogJHtldmVudE5hbWV9ICR7Y2FsbGJhY2t9ICR7b25lU2hvdH1gKTtcbiAgICAvLyBNaXNzaW5nIG1hbmRhdG9yeSBhcmd1bWVudHNcbiAgICBpZiAoZXZlbnROYW1lID09PSBudWxsIHx8IGV2ZW50TmFtZSA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICBjYWxsYmFjayA9PT0gbnVsbCB8fCBjYWxsYmFjayA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLl9yYWlzZSgnZXJyb3InLCAnRXZ0cy5zdWJzY3JpYmUnLCAnTWlzc2luZyBtYW5kYXRvcnkgYXJndW1lbnRzJyk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8vIFByZXZlbnQgd3JvbmcgdHlwZSBmb3IgYXJndW1lbnRzIChtYW5kYXRvcnkgYW5kIG9wdGlvbmFsKVxuICAgIGNvbnN0IGVyciA9ICgpID0+IHtcbiAgICAgIHRoaXMuX3JhaXNlKCdlcnJvcicsICdFdnRzLnN1YnNjcmliZTogV3JvbmcgdHlwZSBmb3IgYXJndW1lbnQnKTtcbiAgICB9O1xuICAgIGlmICh0eXBlb2YgZXZlbnROYW1lICE9PSAnc3RyaW5nJyB8fCB0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGVycigpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoKG9uZVNob3QgIT09IG51bGwgJiYgb25lU2hvdCAhPT0gdW5kZWZpbmVkKSAmJiB0eXBlb2Ygb25lU2hvdCAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgICBlcnIoKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy8gQ3JlYXRlIGV2ZW50IGVudHJ5IGlmIG5vdCBhbHJlYWR5IGV4aXN0aW5nIGluIHRoZSByZWdpc3RlcmVkIGV2ZW50c1xuICAgIGlmICghdGhpcy5fY3VzdG9tRXZlbnRzW2V2ZW50TmFtZV0pIHtcbiAgICAgIHRoaXMuX2N1c3RvbUV2ZW50c1tldmVudE5hbWVdID0gW107IC8vIFNldCBlbXB0eSBhcnJheSBmb3IgbmV3IGV2ZW50IHN1YnNjcmlwdGlvbnNcbiAgICB9XG4gICAgLy8gUHVzaCBuZXcgc3Vic2NyaXB0aW9uIGZvciBldmVudCBuYW1lXG4gICAgdGhpcy5fY3VzdG9tRXZlbnRzW2V2ZW50TmFtZV0ucHVzaCh7XG4gICAgICBpZDogdGhpcy5faWRJbmNyZW1lbnRvcixcbiAgICAgIG5hbWU6IGV2ZW50TmFtZSxcbiAgICAgIG9zOiBvbmVTaG90LFxuICAgICAgY2FsbGJhY2s6IGNhbGxiYWNrXG4gICAgfSk7XG4gICAgLy8gUG9zdCBpbmNyZW1lbnQgdG8gcmV0dXJuIHRoZSB0cnVlIGV2ZW50IGVudHJ5IGlkLCB0aGVuIHVwZGF0ZSB0aGUgaW5jcmVtZW50ZXJcbiAgICByZXR1cm4gdGhpcy5faWRJbmNyZW1lbnRvcisrO1xuICB9XG5cblxuICAvKiogQG1ldGhvZFxuICAgKiBAbmFtZSB1bnN1YnNjcmliZVxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBFdnRzXG4gICAqIEBkZXNjcmlwdGlvbiA8YmxvY2txdW90ZT5VbnN1YnNjcmliZSBtZXRob2QgYWxsb3cgeW91IHRvIHJldm9rZSBhbiBldmVudCBzdWJzY3JpcHRpb24gZnJvbSBpdHMgc3RyaW5nIG5hbWUuPC9ibG9ja3F1b3RlPlxuICAgKiBAcGFyYW0ge251bWJlcn0gZXZlbnRJZCAtIFRoZSBzdWJzY3JpcHRpb24gaWQgcmV0dXJuZWQgd2hlbiBzdWJzY3JpYmluZyB0byBhbiBldmVudCBuYW1lXG4gICAqIEByZXR1cm5zIHtib29sZWFufSAtIFRoZSBtZXRob2Qgc3RhdHVzIDsgdHJ1ZSBmb3Igc3VjY2VzcywgZmFsc2UgZm9yIG5vbi1leGlzdGluZyBzdWJzY3JpcHRpb24gKiovXG4gIHVuc3Vic2NyaWJlKGV2ZW50SWQpIHtcbiAgICAvLyBEZWJ1ZyBsb2dnaW5nXG4gICAgdGhpcy5fcmFpc2UoJ2xvZycsIGBFdnRzLnVuc3Vic2NyaWJlOiAke2V2ZW50SWR9YCk7XG4gICAgLy8gTWlzc2luZyBtYW5kYXRvcnkgYXJndW1lbnRzXG4gICAgaWYgKGV2ZW50SWQgPT09IG51bGwgfHwgZXZlbnRJZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLl9yYWlzZSgnZXJyb3InLCAnRXZ0cy51bnN1YnNjcmliZTogTWlzc2luZyBtYW5kYXRvcnkgYXJndW1lbnRzJyk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8vIFByZXZlbnQgd3JvbmcgdHlwZSBmb3IgYXJndW1lbnRzIChtYW5kYXRvcnkpXG4gICAgaWYgKHR5cGVvZiBldmVudElkICE9PSAnbnVtYmVyJykge1xuICAgICAgdGhpcy5fcmFpc2UoJ2Vycm9yJywgJ0V2dHMudW5zdWJzY3JpYmU6IFdyb25nIHR5cGUgZm9yIGFyZ3VtZW50Jyk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8vIFJldHVybmVkIHZhbHVlXG4gICAgbGV0IHN0YXR1c0NvZGUgPSBmYWxzZTsgLy8gTm90IGZvdW5kIHN0YXR1cyBjb2RlIGJ5IGRlZmF1bHQgKGZhbHNlKVxuICAgIC8vIFNhdmUgZXZlbnQga2V5cyB0byBpdGVyYXRlIHByb3Blcmx5IG9uIHRoaXMuX2V2ZW50cyBPYmplY3RcbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXModGhpcy5fY3VzdG9tRXZlbnRzKTtcbiAgICAvLyBSZXZlcnNlIGV2ZW50cyBpdGVyYXRpb24gdG8gcHJvcGVybHkgc3BsaWNlIHdpdGhvdXQgbWVzc2luZyB3aXRoIGl0ZXJhdGlvbiBvcmRlclxuICAgIGZvciAobGV0IGkgPSAoa2V5cy5sZW5ndGggLSAxKTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgIC8vIEdldCBldmVudCBzdWJzY3JpcHRpb25zXG4gICAgICBjb25zdCBzdWJzID0gdGhpcy5fY3VzdG9tRXZlbnRzW2tleXNbaV1dO1xuICAgICAgLy8gSXRlcmF0ZSBvdmVyIGV2ZW50cyBzdWJzY3JpcHRpb25zIHRvIGZpbmQgdGhlIG9uZSB3aXRoIGdpdmVuIGlkXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHN1YnMubGVuZ3RoOyArK2opIHtcbiAgICAgICAgLy8gSW4gY2FzZSB3ZSBnb3QgYSBzdWJzY3JpcHRpb24gZm9yIHRoaXMgZXZlbnRzXG4gICAgICAgIGlmIChzdWJzW2pdLmlkID09PSBldmVudElkKSB7XG4gICAgICAgICAgLy8gRGVidWcgbG9nZ2luZ1xuICAgICAgICAgIHRoaXMuX3JhaXNlKCdsb2cnLCBgRXZ0cy51bnN1YnNjcmliZTogc3Vic2NyaXB0aW9uIGZvdW5kXFxuYCwgc3Vic1tqXSwgYFxcblN1YnNjcmlwdGlvbiBuwrAke2V2ZW50SWR9IGZvciAke3N1YnMubmFtZX0gaGFzIGJlZW4gcmVtb3ZlZGApO1xuICAgICAgICAgIC8vIFVwZGF0ZSBzdGF0dXMgY29kZVxuICAgICAgICAgIHN0YXR1c0NvZGUgPSB0cnVlOyAvLyBGb3VuZCBhbmQgdW5zdWJzY3JpYmVkIHN0YXR1cyBjb2RlICh0cnVlKVxuICAgICAgICAgIC8vIFJlbW92ZSBzdWJzY3JpcHRpb24gZnJvbSBldmVudCBBcnJheVxuICAgICAgICAgIHN1YnMuc3BsaWNlKGosIDEpO1xuICAgICAgICAgIC8vIFJlbW92ZSBldmVudCBuYW1lIGlmIG5vIHJlbWFpbmluZyBzdWJzY3JpcHRpb25zXG4gICAgICAgICAgaWYgKHN1YnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5fY3VzdG9tRXZlbnRzW2tleXNbaV1dO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBCcmVhayBzaW5jZSBpZCBhcmUgdW5pcXVlIGFuZCBubyBvdGhlciBzdWJzY3JpcHRpb24gY2FuIGJlIGZvdW5kIGFmdGVyXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgLy8gUmV0dXJuIHdpdGggc3RhdHVzIGNvZGVcbiAgICByZXR1cm4gc3RhdHVzQ29kZTtcbiAgfVxuXG5cbiAgLyoqIEBtZXRob2RcbiAgICogQG5hbWUgdW5zdWJzY3JpYmVBbGxGb3JcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgRXZ0c1xuICAgKiBAZGVzY3JpcHRpb24gPGJsb2NrcXVvdGU+PGNvZGU+dW5zdWJzY3JpYmVBbGxGb3I8L2NvZGU+IG1ldGhvZCBjbGVhciBhbGwgc3Vic2NyaXB0aW9ucyByZWdpc3RlcmVkIGZvciBnaXZlbiBldmVudCBuYW1lLjwvYmxvY2txdW90ZT5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50TmFtZSAtIFRoZSBldmVudCB0byBjbGVhciBzdWJzY3JpcHRpb24gZnJvbVxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gLSBUaGUgbWV0aG9kIHN0YXR1cyA7IHRydWUgZm9yIHN1Y2Nlc3MsIGZhbHNlIGZvciBub24tZXhpc3RpbmcgZXZlbnQgKiovXG4gIHVuc3Vic2NyaWJlQWxsRm9yKGV2ZW50TmFtZSkge1xuICAgIC8vIERlYnVnIGxvZ2dpbmdcbiAgICB0aGlzLl9yYWlzZSgnbG9nJywgYEV2dHMudW5zdWJzY3JpYmVBbGxGb3I6ICR7ZXZlbnROYW1lfWApO1xuICAgIC8vIE1pc3NpbmcgbWFuZGF0b3J5IGFyZ3VtZW50c1xuICAgIGlmIChldmVudE5hbWUgPT09IG51bGwgfHwgZXZlbnROYW1lID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuX3JhaXNlKCdlcnJvcicsICdFdnRzLnVuc3Vic2NyaWJlQWxsRm9yOiBNaXNzaW5nIG1hbmRhdG9yeSBhcmd1bWVudHMnKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy8gUHJldmVudCB3cm9uZyB0eXBlIGZvciBhcmd1bWVudHMgKG1hbmRhdG9yeSBhbmQgb3B0aW9uYWwpXG4gICAgaWYgKHR5cGVvZiBldmVudE5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLl9yYWlzZSgnZXJyb3InLCAnRXZ0cy51bnN1YnNjcmliZUFsbEZvcjogV3JvbmcgdHlwZSBmb3IgYXJndW1lbnQnKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy8gUmV0dXJuZWQgdmFsdWVcbiAgICBsZXQgc3RhdHVzQ29kZSA9IGZhbHNlOyAvLyBOb3QgZm91bmQgc3RhdHVzIGNvZGUgYnkgZGVmYXVsdCAoZmFsc2UpXG4gICAgLy8gU2F2ZSBldmVudCBrZXlzIHRvIGl0ZXJhdGUgcHJvcGVybHkgb24gdGhpcy5fZXZlbnRzIE9iamVjdFxuICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyh0aGlzLl9jdXN0b21FdmVudHMpO1xuICAgIC8vIEl0ZXJhdGUgdGhyb3VnaCBjdXN0b20gZXZlbnQga2V5cyB0byBmaW5kIG1hdGNoaW5nIGV2ZW50IHRvIHJlbW92ZVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgaWYgKGtleXNbaV0gPT09IGV2ZW50TmFtZSkge1xuICAgICAgICAvLyBHZXQgZXZlbnQgc3Vic2NyaXB0aW9uc1xuICAgICAgICBjb25zdCBzdWJzID0gdGhpcy5fY3VzdG9tRXZlbnRzW2tleXNbaV1dO1xuICAgICAgICAvLyBJdGVyYXRlIG92ZXIgZXZlbnRzIHN1YnNjcmlwdGlvbnMgdG8gZmluZCB0aGUgb25lIHdpdGggZ2l2ZW4gaWQsIHJldmVyc2UgaXRlcmF0aW9uIHRvIHByb3Blcmx5IHNwbGljZSB3aXRob3V0IG1lc3Npbmcgd2l0aCBpdGVyYXRpb24gb3JkZXJcbiAgICAgICAgZm9yIChsZXQgaiA9IChzdWJzLmxlbmd0aCAtIDEpOyBqID49IDA7IC0taikge1xuICAgICAgICAgIC8vIFVwZGF0ZSBzdGF0dXMgY29kZVxuICAgICAgICAgIHN0YXR1c0NvZGUgPSB0cnVlOyAvLyBGb3VuZCBhbmQgdW5zdWJzY3JpYmVkIGFsbCBzdGF0dXMgY29kZSAodHJ1ZSlcbiAgICAgICAgICAvLyBSZW1vdmUgc3Vic2NyaXB0aW9uIGZyb20gZXZlbnQgQXJyYXlcbiAgICAgICAgICBzdWJzLnNwbGljZShqLCAxKTtcbiAgICAgICAgICAvLyBSZW1vdmUgZXZlbnQgbmFtZSBpZiBubyByZW1haW5pbmcgc3Vic2NyaXB0aW9uc1xuICAgICAgICAgIGlmIChzdWJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2N1c3RvbUV2ZW50c1trZXlzW2ldXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgLy8gUmV0dXJuIHdpdGggc3RhdHVzIGNvZGVcbiAgICByZXR1cm4gc3RhdHVzQ29kZTtcbiAgfVxuXG5cbiAgLyoqIEBtZXRob2RcbiAgICogQG5hbWUgcHVibGlzaFxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBFdnRzXG4gICAqIEBkZXNjcmlwdGlvbiA8YmxvY2txdW90ZT48Y29kZT5QdWJsaXNoPC9jb2RlPiBtZXRob2QgYWxsb3cgeW91IHRvIGZpcmUgYW4gZXZlbnQgYnkgbmFtZSBhbmQgdHJpZ2dlciBhbGwgaXRzIHN1YnNjcmlwdGlvbiBieSBjYWxsYmFja3MuL2Jsb2NrcXVvdGU+XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWUgLSBFdmVudCBuYW1lICh0aGUgb25lIHRvIHVzZSB0byBwdWJsaXNoKVxuICAgKiBAcGFyYW0ge29iamVjdH0gW2RhdGE9dW5kZWZpbmVkXSAtIFRoZSBkYXRhIG9iamVjdCB0byBzZW50IHRocm91Z2ggdGhlIGN1c3RvbSBldmVudFxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gLSBUaGUgbWV0aG9kIHN0YXR1cyA7IHRydWUgZm9yIHN1Y2Nlc3MsIGZhbHNlIGZvciBub24tZXhpc3RpbmcgZXZlbnQgKiovXG4gIHB1Ymxpc2goZXZlbnROYW1lLCBkYXRhID0gbnVsbCkge1xuICAgIC8vIERlYnVnIGxvZ2dpbmdcbiAgICB0aGlzLl9yYWlzZSgnbG9nJywgYEV2dHMucHVibGlzaDogJHtldmVudE5hbWV9ICR7ZGF0YX1gKTtcbiAgICAvLyBNaXNzaW5nIG1hbmRhdG9yeSBhcmd1bWVudHNcbiAgICBpZiAoZXZlbnROYW1lID09PSBudWxsIHx8IGV2ZW50TmFtZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLl9yYWlzZSgnZXJyb3InLCAnRXZ0cy5wdWJsaXNoOiBNaXNzaW5nIG1hbmRhdG9yeSBhcmd1bWVudHMnKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy8gUHJldmVudCB3cm9uZyB0eXBlIGZvciBhcmd1bWVudHMgKG1hbmRhdG9yeSBhbmQgb3B0aW9uYWwpXG4gICAgaWYgKHR5cGVvZiBldmVudE5hbWUgIT09ICdzdHJpbmcnIHx8IChkYXRhICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIGRhdGEgIT09ICdvYmplY3QnKSkge1xuICAgICAgdGhpcy5fcmFpc2UoJ2Vycm9yJywgJ0V2dHMucHVibGlzaDogV3JvbmcgdHlwZSBmb3IgYXJndW1lbnQnKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy8gUmV0dXJuZWQgdmFsdWVcbiAgICBsZXQgc3RhdHVzQ29kZSA9IGZhbHNlOyAvLyBOb3QgZm91bmQgc3RhdHVzIGNvZGUgYnkgZGVmYXVsdCAoZmFsc2UpXG4gICAgLy8gU2F2ZSBldmVudCBrZXlzIHRvIGl0ZXJhdGUgcHJvcGVybHkgb24gdGhpcy5fZXZlbnRzIE9iamVjdFxuICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyh0aGlzLl9jdXN0b21FdmVudHMpO1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBzYXZlZCBjdXN0b20gZXZlbnRzXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAvLyBJZiBwdWJsaXNoZWQgbmFtZSBtYXRjaCBhbiBleGlzdGluZyBldmVudHMsIHdlIGl0ZXJhdGUgaXRzIHN1YnNjcmlwdGlvbnMuIEZpcnN0IHN1YnNjcmliZWQsIGZpcnN0IHNlcnZlZFxuICAgICAgaWYgKGtleXNbaV0gPT09IGV2ZW50TmFtZSkge1xuICAgICAgICAvLyBVcGRhdGUgc3RhdHVzIGNvZGVcbiAgICAgICAgc3RhdHVzQ29kZSA9IHRydWU7IC8vIEZvdW5kIGFuZCBwdWJsaXNoZWQgc3RhdHVzIGNvZGUgKHRydWUpXG4gICAgICAgIC8vIEdldCBldmVudCBzdWJzY3JpcHRpb25zXG4gICAgICAgIGNvbnN0IHN1YnMgPSB0aGlzLl9jdXN0b21FdmVudHNba2V5c1tpXV07XG4gICAgICAgIC8vIEl0ZXJhdGUgb3ZlciBldmVudHMgc3Vic2NyaXB0aW9ucyB0byBmaW5kIHRoZSBvbmUgd2l0aCBnaXZlbiBpZFxuICAgICAgICAvLyBSZXZlcnNlIHN1YnNjcmlwdGlvbnMgaXRlcmF0aW9uIHRvIHByb3Blcmx5IHNwbGljZSB3aXRob3V0IG1lc3Npbmcgd2l0aCBpdGVyYXRpb24gb3JkZXJcbiAgICAgICAgZm9yIChsZXQgaiA9IChzdWJzLmxlbmd0aCAtIDEpOyBqID49IDA7IC0taikge1xuICAgICAgICAgIC8vIERlYnVnIGxvZ2dpbmdcbiAgICAgICAgICB0aGlzLl9yYWlzZSgnbG9nJywgYEV2dHMucHVibGlzaDogZmlyZSBjYWxsYmFjayBmb3IgJHtldmVudE5hbWV9LCBzdWJzY3JpcHRpb24gbsKwJHtzdWJzW2pdLmlkfWAsIHN1YnNbal0pO1xuICAgICAgICAgIC8vIEZpcmUgc2F2ZWQgY2FsbGJhY2tcbiAgICAgICAgICBzdWJzW2pdLmNhbGxiYWNrKGRhdGEpO1xuICAgICAgICAgIC8vIFJlbW92ZSBvbmVTaG90IGxpc3RlbmVyIGZyb20gZXZlbnQgZW50cnlcbiAgICAgICAgICBpZiAoc3Vic1tqXS5vcykge1xuICAgICAgICAgICAgLy8gRGVidWcgbG9nZ2luZ1xuICAgICAgICAgICAgdGhpcy5fcmFpc2UoJ2xvZycsICdFdnRzLnB1Ymxpc2g6IHJlbW92ZSBzdWJzY3JpcHRpb24gYmVjYXVzZSBvbmUgc2hvdCB1c2FnZSBpcyBkb25lJyk7XG4gICAgICAgICAgICBzdWJzLnNwbGljZShqLCAxKTtcbiAgICAgICAgICAgIC8vIFJlbW92ZSBldmVudCBuYW1lIGlmIG5vIHJlbWFpbmluZyBzdWJzY3JpcHRpb25zXG4gICAgICAgICAgICBpZiAoc3Vicy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2N1c3RvbUV2ZW50c1trZXlzW2ldXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgLy8gUmV0dXJuIHdpdGggc3RhdHVzIGNvZGVcbiAgICByZXR1cm4gc3RhdHVzQ29kZTtcbiAgfVxuXG5cbiAgLyogIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuICAvKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIENPTVBPTkVOVCBVVElMUyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gICovXG4gIC8qICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuXG4gIC8qKiBAbWV0aG9kXG4gICAqIEBuYW1lIF9yYWlzZVxuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgRXZ0c1xuICAgKiBAZGVzY3JpcHRpb24gPGJsb2NrcXVvdGU+SW50ZXJuYWwgbWV0aG9kIHRvIGFic3RyYWN0IGNvbnNvbGUgd3JhcHBlZCBpbiBkZWJ1ZyBmbGFnLi9ibG9ja3F1b3RlPlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbGV2ZWwgLSBUaGUgY29uc29sZSBtZXRob2QgdG8gY2FsbFxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXJyb3JWYWx1ZSAtIFRoZSBlcnJvciB2YWx1ZSB0byBkaXNwbGF5IGluIGNvbnNvbGUgbWV0aG9kICoqL1xuICBfcmFpc2UobGV2ZWwsIGVycm9yVmFsdWUpIHtcbiAgICBpZiAodGhpcy5fZGVidWcpIHtcbiAgICAgIGNvbnNvbGVbbGV2ZWxdKGVycm9yVmFsdWUpO1xuICAgIH1cbiAgfVxuXG5cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBFdnRzO1xuIiwiZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmZyZWV6ZSh7XG4gIHR5cGVzOiB7XG4gICAgc2VydmljZTogWydhZG1pbmlzdHJhdGlvbicsICdiYW5rJywgJ2Jvb2snLCAnY2VtZXRlcnknLCAnZmlyZWZpZ2h0ZXInLCAnbWFpbCcsICdtdXNpYycsICdwb2xpY2UnLCAnc2Nob29sJywgJ3JlY3ljbGUnXSxcbiAgICBjYXJlOiBbJ2FuaW1hbCcsICdkZWZpYnJpbGxhdG9yJywgJ2RlbnRhbCcsICdsYWInLCAnbWVkaWMnLCAncGhhcm1hY3knXSxcbiAgICBjYXRlcmluZzogWydiYXInLCAnY2VsbGFyJywgJ3Jlc3RhdXJhbnQnLCAndG9iYWNjbyddLFxuICAgIHNwb3J0OiBbJ2Jhc2tldCcsICdib2NjZScsICdmb290JywgJ3Bpbmdwb25nJywgJ3Bvb2wnLCAncnVnYnknLCAnc2thdGUnLCAndGVubmlzJ10sXG4gICAgc2hvcDogWydiZWF1dHknLCAnYmFrZXJ5JywgJ2J1dGNoZXInLCAnZGl5JywgJ2Zpc2gnLCAnZ2FyZGVuJywgJ2dyb2NlcnknXSxcbiAgICBuYXR1cmU6IFsncGFyayddLFxuICAgIHRyYW5zcG9ydDogWydidXMnLCAnY2FyJywgJ2dhcycsICd0cmFpbiddLFxuICAgIHRvdXJpc206IFsnY2FzdGxlJywgJ2NodXJjaCcsICdsYW5kbWFyaycsICdtdXNldW0nLCAndG91cmlzbSddXG4gIH0sXG4gIHN1YnR5cGVzOiB7XG4gICAgcmVzdGF1cmFudDogbmV3IHdpbmRvdy5MLkljb24oe1xuICAgICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL3Jlc3RhdXJhbnQuc3ZnJyxcbiAgICAgIGljb25TaXplOiBbMjYsIDI2XSxcbiAgICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxuICAgICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxuICAgICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxuICAgICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXG4gICAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxuICAgIH0pLFxuICAgIGJhcjogbmV3IHdpbmRvdy5MLkljb24oe1xuICAgICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL2Jhci5zdmcnLFxuICAgICAgaWNvblNpemU6IFsyNiwgMjZdLFxuICAgICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXG4gICAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXG4gICAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXG4gICAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcbiAgICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXG4gICAgfSksXG4gICAgY2VsbGFyOiBuZXcgd2luZG93LkwuSWNvbih7XG4gICAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvY2VsbGFyLnN2ZycsXG4gICAgICBpY29uU2l6ZTogWzI2LCAyNl0sXG4gICAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcbiAgICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcbiAgICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcbiAgICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxuICAgICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcbiAgICB9KSxcbiAgICB0b2JhY2NvOiBuZXcgd2luZG93LkwuSWNvbih7XG4gICAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvdG9iYWNjby5zdmcnLFxuICAgICAgaWNvblNpemU6IFsyNiwgMjZdLFxuICAgICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXG4gICAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXG4gICAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXG4gICAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcbiAgICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXG4gICAgfSksXG4gICAgZ3JvY2VyeTogbmV3IHdpbmRvdy5MLkljb24oe1xuICAgICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL2dyb2Nlcnkuc3ZnJyxcbiAgICAgIGljb25TaXplOiBbMjYsIDI2XSxcbiAgICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxuICAgICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxuICAgICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxuICAgICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXG4gICAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxuICAgIH0pLFxuICAgIGRpeTogbmV3IHdpbmRvdy5MLkljb24oe1xuICAgICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL2RpeS5zdmcnLFxuICAgICAgaWNvblNpemU6IFsyNiwgMjZdLFxuICAgICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXG4gICAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXG4gICAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXG4gICAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcbiAgICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXG4gICAgfSksXG4gICAgYmVhdXR5OiBuZXcgd2luZG93LkwuSWNvbih7XG4gICAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvYmVhdXR5LnN2ZycsXG4gICAgICBpY29uU2l6ZTogWzI2LCAyNl0sXG4gICAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcbiAgICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcbiAgICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcbiAgICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxuICAgICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcbiAgICB9KSxcbiAgICBmb290OiBuZXcgd2luZG93LkwuSWNvbih7XG4gICAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvZm9vdC5zdmcnLFxuICAgICAgaWNvblNpemU6IFsyNiwgMjZdLFxuICAgICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXG4gICAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXG4gICAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXG4gICAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcbiAgICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXG4gICAgfSksXG4gICAgcnVnYnk6IG5ldyB3aW5kb3cuTC5JY29uKHtcbiAgICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9ydWdieS5zdmcnLFxuICAgICAgaWNvblNpemU6IFsyNiwgMjZdLFxuICAgICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXG4gICAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXG4gICAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXG4gICAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcbiAgICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXG4gICAgfSksXG4gICAgYmFza2V0OiBuZXcgd2luZG93LkwuSWNvbih7XG4gICAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvYmFza2V0LnN2ZycsXG4gICAgICBpY29uU2l6ZTogWzI2LCAyNl0sXG4gICAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcbiAgICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcbiAgICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcbiAgICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxuICAgICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcbiAgICB9KSxcbiAgICBwb29sOiBuZXcgd2luZG93LkwuSWNvbih7XG4gICAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvcG9vbC5zdmcnLFxuICAgICAgaWNvblNpemU6IFsyNiwgMjZdLFxuICAgICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXG4gICAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXG4gICAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXG4gICAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcbiAgICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXG4gICAgfSksXG4gICAgcGluZ3Bvbmc6IG5ldyB3aW5kb3cuTC5JY29uKHtcbiAgICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9waW5ncG9uZy5zdmcnLFxuICAgICAgaWNvblNpemU6IFsyNiwgMjZdLFxuICAgICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXG4gICAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXG4gICAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXG4gICAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcbiAgICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXG4gICAgfSksXG4gICAgc2thdGU6IG5ldyB3aW5kb3cuTC5JY29uKHtcbiAgICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9za2F0ZS5zdmcnLFxuICAgICAgaWNvblNpemU6IFsyNiwgMjZdLFxuICAgICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXG4gICAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXG4gICAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXG4gICAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcbiAgICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXG4gICAgfSksXG4gICAgYm9jY2U6IG5ldyB3aW5kb3cuTC5JY29uKHtcbiAgICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9ib2NjZS5zdmcnLFxuICAgICAgaWNvblNpemU6IFsyNiwgMjZdLFxuICAgICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXG4gICAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXG4gICAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXG4gICAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcbiAgICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXG4gICAgfSksXG4gICAgdGVubmlzOiBuZXcgd2luZG93LkwuSWNvbih7XG4gICAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvdGVubmlzLnN2ZycsXG4gICAgICBpY29uU2l6ZTogWzI2LCAyNl0sXG4gICAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcbiAgICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcbiAgICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcbiAgICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxuICAgICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcbiAgICB9KSxcbiAgICBiYWtlcnk6IG5ldyB3aW5kb3cuTC5JY29uKHtcbiAgICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9iYWtlcnkuc3ZnJyxcbiAgICAgIGljb25TaXplOiBbMjYsIDI2XSxcbiAgICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxuICAgICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxuICAgICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxuICAgICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXG4gICAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxuICAgIH0pLFxuICAgIGZpc2g6IG5ldyB3aW5kb3cuTC5JY29uKHtcbiAgICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9maXNoLnN2ZycsXG4gICAgICBpY29uU2l6ZTogWzI2LCAyNl0sXG4gICAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcbiAgICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcbiAgICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcbiAgICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxuICAgICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcbiAgICB9KSxcbiAgICBidXRjaGVyOiBuZXcgd2luZG93LkwuSWNvbih7XG4gICAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvYnV0Y2hlci5zdmcnLFxuICAgICAgaWNvblNpemU6IFsyNiwgMjZdLFxuICAgICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXG4gICAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXG4gICAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXG4gICAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcbiAgICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXG4gICAgfSksXG4gICAgYm9vazogbmV3IHdpbmRvdy5MLkljb24oe1xuICAgICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL2Jvb2suc3ZnJyxcbiAgICAgIGljb25TaXplOiBbMjYsIDI2XSxcbiAgICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxuICAgICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxuICAgICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxuICAgICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXG4gICAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxuICAgIH0pLFxuICAgIG11c2ljOiBuZXcgd2luZG93LkwuSWNvbih7XG4gICAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbXVzaWMuc3ZnJyxcbiAgICAgIGljb25TaXplOiBbMjYsIDI2XSxcbiAgICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxuICAgICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxuICAgICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxuICAgICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXG4gICAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxuICAgIH0pLFxuICAgIGxhbmRtYXJrOiBuZXcgd2luZG93LkwuSWNvbih7XG4gICAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbGFuZG1hcmsuc3ZnJyxcbiAgICAgIGljb25TaXplOiBbMjYsIDI2XSxcbiAgICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxuICAgICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxuICAgICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxuICAgICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXG4gICAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxuICAgIH0pLFxuICAgIGNhc3RsZTogbmV3IHdpbmRvdy5MLkljb24oe1xuICAgICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL2Nhc3RsZS5zdmcnLFxuICAgICAgaWNvblNpemU6IFsyNiwgMjZdLFxuICAgICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXG4gICAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXG4gICAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXG4gICAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcbiAgICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXG4gICAgfSksXG4gICAgY2h1cmNoOiBuZXcgd2luZG93LkwuSWNvbih7XG4gICAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvY2h1cmNoLnN2ZycsXG4gICAgICBpY29uU2l6ZTogWzI2LCAyNl0sXG4gICAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcbiAgICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcbiAgICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcbiAgICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxuICAgICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcbiAgICB9KSxcbiAgICB0b3VyaXNtOiBuZXcgd2luZG93LkwuSWNvbih7XG4gICAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvdG91cmlzbS5zdmcnLFxuICAgICAgaWNvblNpemU6IFsyNiwgMjZdLFxuICAgICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXG4gICAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXG4gICAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXG4gICAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcbiAgICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXG4gICAgfSksXG4gICAgbXVzZXVtOiBuZXcgd2luZG93LkwuSWNvbih7XG4gICAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbXVzZXVtLnN2ZycsXG4gICAgICBpY29uU2l6ZTogWzI2LCAyNl0sXG4gICAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcbiAgICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcbiAgICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcbiAgICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxuICAgICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcbiAgICB9KSxcbiAgICBnYXJkZW46IG5ldyB3aW5kb3cuTC5JY29uKHtcbiAgICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9nYXJkZW4uc3ZnJyxcbiAgICAgIGljb25TaXplOiBbMjYsIDI2XSxcbiAgICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxuICAgICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxuICAgICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxuICAgICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXG4gICAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxuICAgIH0pLFxuICAgIGNhcjogbmV3IHdpbmRvdy5MLkljb24oe1xuICAgICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL2Nhci5zdmcnLFxuICAgICAgaWNvblNpemU6IFsyNiwgMjZdLFxuICAgICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXG4gICAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXG4gICAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXG4gICAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcbiAgICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXG4gICAgfSksXG4gICAgZ2FzOiBuZXcgd2luZG93LkwuSWNvbih7XG4gICAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvZ2FzLnN2ZycsXG4gICAgICBpY29uU2l6ZTogWzI2LCAyNl0sXG4gICAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcbiAgICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcbiAgICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcbiAgICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxuICAgICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcbiAgICB9KSxcbiAgICB0cmFpbjogbmV3IHdpbmRvdy5MLkljb24oe1xuICAgICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL3RyYWluLnN2ZycsXG4gICAgICBpY29uU2l6ZTogWzI2LCAyNl0sXG4gICAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcbiAgICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcbiAgICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcbiAgICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxuICAgICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcbiAgICB9KSxcbiAgICBidXM6IG5ldyB3aW5kb3cuTC5JY29uKHtcbiAgICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9idXMuc3ZnJyxcbiAgICAgIGljb25TaXplOiBbMjYsIDI2XSxcbiAgICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxuICAgICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxuICAgICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxuICAgICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXG4gICAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxuICAgIH0pLFxuICAgIGFuaW1hbDogbmV3IHdpbmRvdy5MLkljb24oe1xuICAgICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL2FuaW1hbC5zdmcnLFxuICAgICAgaWNvblNpemU6IFsyNiwgMjZdLFxuICAgICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXG4gICAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXG4gICAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXG4gICAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcbiAgICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXG4gICAgfSksXG4gICAgZGVudGFsOiBuZXcgd2luZG93LkwuSWNvbih7XG4gICAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvZGVudGFsLnN2ZycsXG4gICAgICBpY29uU2l6ZTogWzI2LCAyNl0sXG4gICAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcbiAgICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcbiAgICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcbiAgICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxuICAgICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcbiAgICB9KSxcbiAgICBwaGFybWFjeTogbmV3IHdpbmRvdy5MLkljb24oe1xuICAgICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL3BoYXJtYWN5LnN2ZycsXG4gICAgICBpY29uU2l6ZTogWzI2LCAyNl0sXG4gICAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcbiAgICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcbiAgICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcbiAgICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxuICAgICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcbiAgICB9KSxcbiAgICBtZWRpYzogbmV3IHdpbmRvdy5MLkljb24oe1xuICAgICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21lZGljLnN2ZycsXG4gICAgICBpY29uU2l6ZTogWzI2LCAyNl0sXG4gICAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcbiAgICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcbiAgICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcbiAgICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxuICAgICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcbiAgICB9KSxcbiAgICBsYWI6IG5ldyB3aW5kb3cuTC5JY29uKHtcbiAgICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9sYWIuc3ZnJyxcbiAgICAgIGljb25TaXplOiBbMjYsIDI2XSxcbiAgICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxuICAgICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxuICAgICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxuICAgICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXG4gICAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxuICAgIH0pLFxuICAgIGRlZmlicmlsbGF0b3I6IG5ldyB3aW5kb3cuTC5JY29uKHtcbiAgICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9kZWZpYnJpbGxhdG9yLnN2ZycsXG4gICAgICBpY29uU2l6ZTogWzI2LCAyNl0sXG4gICAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcbiAgICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcbiAgICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcbiAgICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxuICAgICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcbiAgICB9KSxcbiAgICBjZW1ldGVyeTogbmV3IHdpbmRvdy5MLkljb24oe1xuICAgICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL2NlbWV0ZXJ5LnN2ZycsXG4gICAgICBpY29uU2l6ZTogWzI2LCAyNl0sXG4gICAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcbiAgICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcbiAgICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcbiAgICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxuICAgICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcbiAgICB9KSxcbiAgICBmaXJlZmlnaHRlcjogbmV3IHdpbmRvdy5MLkljb24oe1xuICAgICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL2ZpcmVmaWdodGVyLnN2ZycsXG4gICAgICBpY29uU2l6ZTogWzI2LCAyNl0sXG4gICAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcbiAgICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcbiAgICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcbiAgICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxuICAgICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcbiAgICB9KSxcbiAgICBwb2xpY2U6IG5ldyB3aW5kb3cuTC5JY29uKHtcbiAgICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9wb2xpY2Uuc3ZnJyxcbiAgICAgIGljb25TaXplOiBbMjYsIDI2XSxcbiAgICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxuICAgICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxuICAgICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxuICAgICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXG4gICAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxuICAgIH0pLFxuICAgIG1haWw6IG5ldyB3aW5kb3cuTC5JY29uKHtcbiAgICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYWlsLnN2ZycsXG4gICAgICBpY29uU2l6ZTogWzI2LCAyNl0sXG4gICAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcbiAgICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcbiAgICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcbiAgICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxuICAgICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcbiAgICB9KSxcbiAgICBiYW5rOiBuZXcgd2luZG93LkwuSWNvbih7XG4gICAgICBpY29uVXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvYmFuay5zdmcnLFxuICAgICAgaWNvblNpemU6IFsyNiwgMjZdLFxuICAgICAgaWNvbkFuY2hvcjogWzEzLCAxM10sXG4gICAgICBwb3B1cEFuY2hvcjogWzAsIC0xM10sXG4gICAgICBzaGFkb3dVcmw6ICdhc3NldHMvaW1nL21hcmtlci9tYXJrZXItc2hhZG93LnBuZycsXG4gICAgICBzaGFkb3dTaXplOiBbNDIsIDQyXSxcbiAgICAgIHNoYWRvd0FuY2hvcjogWzIwLCAyMF0sXG4gICAgfSksXG4gICAgcGFyazogbmV3IHdpbmRvdy5MLkljb24oe1xuICAgICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL3Bhcmsuc3ZnJyxcbiAgICAgIGljb25TaXplOiBbMjYsIDI2XSxcbiAgICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxuICAgICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxuICAgICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxuICAgICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXG4gICAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxuICAgIH0pLFxuICAgIHJlY3ljbGU6IG5ldyB3aW5kb3cuTC5JY29uKHtcbiAgICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9yZWN5Y2xlLnN2ZycsXG4gICAgICBpY29uU2l6ZTogWzI2LCAyNl0sXG4gICAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcbiAgICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcbiAgICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcbiAgICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxuICAgICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcbiAgICB9KSxcbiAgICBhZG1pbmlzdHJhdGlvbjogbmV3IHdpbmRvdy5MLkljb24oe1xuICAgICAgaWNvblVybDogJ2Fzc2V0cy9pbWcvbWFya2VyL2FkbWluaXN0cmF0aW9uLnN2ZycsXG4gICAgICBpY29uU2l6ZTogWzI2LCAyNl0sXG4gICAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcbiAgICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcbiAgICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcbiAgICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxuICAgICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXSxcbiAgICB9KSxcbiAgICBzY2hvb2w6IG5ldyB3aW5kb3cuTC5JY29uKHtcbiAgICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci9zY2hvb2wuc3ZnJyxcbiAgICAgIGljb25TaXplOiBbMjYsIDI2XSxcbiAgICAgIGljb25BbmNob3I6IFsxMywgMTNdLFxuICAgICAgcG9wdXBBbmNob3I6IFswLCAtMTNdLFxuICAgICAgc2hhZG93VXJsOiAnYXNzZXRzL2ltZy9tYXJrZXIvbWFya2VyLXNoYWRvdy5wbmcnLFxuICAgICAgc2hhZG93U2l6ZTogWzQyLCA0Ml0sXG4gICAgICBzaGFkb3dBbmNob3I6IFsyMCwgMjBdLFxuICAgIH0pLFxuICAgIHVzZXI6IG5ldyB3aW5kb3cuTC5JY29uKHtcbiAgICAgIGljb25Vcmw6ICdhc3NldHMvaW1nL21hcmtlci91c2VyLnN2ZycsXG4gICAgICBpY29uU2l6ZTogWzI2LCAyNl0sXG4gICAgICBpY29uQW5jaG9yOiBbMTMsIDEzXSxcbiAgICAgIHBvcHVwQW5jaG9yOiBbMCwgLTEzXSxcbiAgICAgIHNoYWRvd1VybDogJ2Fzc2V0cy9pbWcvbWFya2VyL21hcmtlci1zaGFkb3cucG5nJyxcbiAgICAgIHNoYWRvd1NpemU6IFs0MiwgNDJdLFxuICAgICAgc2hhZG93QW5jaG9yOiBbMjAsIDIwXVxuICAgIH0pXG4gIH1cbn0pO1xuIiwiY29uc3QgZ2V0RGlzdGFuY2VCZXR3ZWVuQ29vcmRzID0gKGZyb20sIHRvKSA9PiB7XG4gIC8vIFJldHVybiBkaXN0YW5jZSBpbiBtZXRlcnNcbiAgY29uc3QgbG9uMSA9IChmcm9tWzFdICogTWF0aC5QSSkgLyAxODAsXG4gICAgbGF0MSA9IChmcm9tWzBdICogTWF0aC5QSSkgLyAxODAsXG4gICAgbG9uMiA9ICh0b1sxXSAqIE1hdGguUEkpIC8gMTgwLFxuICAgIGxhdDIgPSAodG9bMF0gKiBNYXRoLlBJKSAvIDE4MDtcblxuICBjb25zdCBkZWx0YUxhdCA9IGxhdDIgLSBsYXQxO1xuICBjb25zdCBkZWx0YUxvbiA9IGxvbjIgLSBsb24xO1xuXG4gIGNvbnN0IGEgPSBNYXRoLnBvdyhNYXRoLnNpbihkZWx0YUxhdCAvIDIpLCAyKSArIE1hdGguY29zKGxhdDEpICogTWF0aC5jb3MobGF0MikgKiBNYXRoLnBvdyhNYXRoLnNpbihkZWx0YUxvbiAvIDIpLCAyKTtcbiAgY29uc3QgYyA9IDIgKiBNYXRoLmFzaW4oTWF0aC5zcXJ0KGEpKTtcbiAgcmV0dXJuIGMgKiA2MzcxICogMTAwMDtcbn07XG5cblxuY29uc3QgY29udmVydERpc3RhbmNlVG9TdHJpbmcgPSBkaXN0YW5jZSA9PiB7XG4gIGlmIChkaXN0YW5jZSA+IDEwMDApIHtcbiAgICBkaXN0YW5jZSA9IGAke3ByZWNpc2lvblJvdW5kKGRpc3RhbmNlIC8gMTAwMCwgMil9a21gO1xuICB9IGVsc2Uge1xuICAgIGRpc3RhbmNlID0gYCR7cHJlY2lzaW9uUm91bmQoZGlzdGFuY2UsIDIpfW1gO1xuICB9XG4gIHJldHVybiBkaXN0YW5jZTtcbn07XG5cblxuY29uc3QgYnVpbGREaXN0YW5jZUVUQSA9IGRpc3RhbmNlID0+IHtcbiAgbGV0IGNhck1pbnV0ZXMgPSAwO1xuICBsZXQgY2FyU2Vjb25kcyA9IDA7XG5cbiAgaWYgKGRpc3RhbmNlID4gNTAwMDApIHtcbiAgICAvLyBPdmVyIDUwa20sIHdlIHVzZSBhdmVyYWdlIHNwZWVkIG9mIDEwMGttaFxuICAgIGNhck1pbnV0ZXMgPSAoZGlzdGFuY2UgLyAxMDAwMDApICogNjA7XG4gIH0gZWxzZSBpZiAoZGlzdGFuY2UgPiAxMDAwMCkge1xuICAgIC8vIE92ZXIgMTBrbSwgd2UgdXNlIGF2ZXJhZ2Ugc3BlZWQgb2YgNjBrbS9oXG4gICAgY2FyTWludXRlcyA9IChkaXN0YW5jZSAvIDYwMDAwKSAqIDYwO1xuICB9IGVsc2Uge1xuICAgIC8vIFVuZGVyIDEwa20gd2UgdXNlciBhdmVyYWdlIHNwZWVkIG9mIDMwa20vaFxuICAgIGNhck1pbnV0ZXMgPSAoZGlzdGFuY2UgLyAzMDAwMCkgKiA2MDtcbiAgfVxuXG4gIGNhclNlY29uZHMgPSBjYXJNaW51dGVzICUgMTsgLy8gS2VlcCBmbG9hdGluZyB2YWx1ZSBmb3Igc2Vjb25kcyBjb21wdXRpbmdcbiAgY2FyTWludXRlcyA9IE1hdGguZmxvb3IoY2FyTWludXRlcyk7IC8vIFJlbW92ZSBmbG9hdGluZyB2YWx1ZVxuXG4gIGlmIChjYXJNaW51dGVzID4gNjApIHtcbiAgICBjYXJNaW51dGVzID0gYCR7TWF0aC5mbG9vcihjYXJNaW51dGVzIC8gNjApfWggJHtjYXJNaW51dGVzICUgNjB9bWA7XG4gIH0gZWxzZSB7XG4gICAgY2FyTWludXRlcyA9IGAke2Nhck1pbnV0ZXN9bWA7XG4gIH1cblxuICBsZXQgd2Fsa01pbnV0ZXMgPSAoZGlzdGFuY2UgLyA1MDAwKSAqIDYwO1xuICBsZXQgd2Fsa1NlY29uZHMgPSB3YWxrTWludXRlcyAlIDE7XG4gIHdhbGtNaW51dGVzID0gTWF0aC5mbG9vcih3YWxrTWludXRlcyk7IC8vIFJlbW92ZSBmbG9hdGluZyB2YWx1ZVxuXG4gIGlmICh3YWxrTWludXRlcyA+IDYwKSB7XG4gICAgd2Fsa01pbnV0ZXMgPSBgJHtNYXRoLmZsb29yKHdhbGtNaW51dGVzIC8gNjApfWggJHt3YWxrTWludXRlcyAlIDYwfW1gO1xuICB9IGVsc2Uge1xuICAgIHdhbGtNaW51dGVzID0gYCR7d2Fsa01pbnV0ZXN9bWA7XG4gIH0gIFxuXG4gIHJldHVybiB7XG4gICAgY2FyOiBgJHtjYXJNaW51dGVzfSAke01hdGguZmxvb3IocHJlY2lzaW9uUm91bmQoKGNhclNlY29uZHMgLyAxMDApICogNjAsIDIpICogMTAwKX1zYCxcbiAgICB3YWxrOiBgJHt3YWxrTWludXRlc30gJHtNYXRoLmZsb29yKHByZWNpc2lvblJvdW5kKCh3YWxrU2Vjb25kcyAvIDEwMCkgKiA2MCwgMikgKiAxMDApfXNgLFxuICB9O1xufTtcblxuXG5jb25zdCBwcmVjaXNpb25Sb3VuZCA9ICh2YWx1ZSwgcHJlY2lzaW9uKSA9PiB7XG4gIGNvbnN0IG11bHRpcGxpZXIgPSBNYXRoLnBvdygxMCwgcHJlY2lzaW9uIHx8IDApO1xuICByZXR1cm4gTWF0aC5yb3VuZCh2YWx1ZSAqIG11bHRpcGxpZXIpIC8gbXVsdGlwbGllcjtcbn07XG5cblxuY29uc3QgZmV0Y2hNb2RhbCA9ICh1cmwpID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgIGZldGNoKGAuL2Fzc2V0cy9odG1sLyR7dXJsfS5odG1sYCkudGhlbihkYXRhID0+IHtcbiAgICAgIGRhdGEudGV4dCgpLnRoZW4oaHRtbCA9PiB7XG4gICAgICAgIHJlc29sdmUoZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKS5jcmVhdGVDb250ZXh0dWFsRnJhZ21lbnQoaHRtbCkpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufTtcblxuXG5jb25zdCBjbG9zZU1vZGFsID0gKGV2ZW50LCBmb3JjZSkgPT4ge1xuICBpZiAoZm9yY2UgPT09IHRydWUgfHwgZXZlbnQudGFyZ2V0LmlkID09PSAnbW9kYWwtb3ZlcmxheScgfHwgZXZlbnQudGFyZ2V0LmlkLmluZGV4T2YoJ2Nsb3NlJykgIT09IC0xKSB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsLW92ZXJsYXknKS5zdHlsZS5vcGFjaXR5ID0gMDtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RhbC1vdmVybGF5Jykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RhbC1vdmVybGF5JykuaW5uZXJIVE1MID0gJyc7XG4gICAgfSwgMzAwKTtcbiAgfVxufTtcblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIENDREhfQ0VOVEVSOiB7XG4gICAgTEFUOiA0OC41MzE4MzkwNjQ0MTk2MixcbiAgICBMTkc6IDIuMDUzNzU2NzEzODY3MTg4XG4gIH0sXG4gIENDREhfQ0lUSUVTOiBbJ0JSWCcsICdDT1InLCAnRFJEJywgJ0xGUicsICdMR1InLCAnUklDJywgJ1JPVicsICdTQ0QnLCAnU0VSJywgJ1NUQycsICdWU0cnXSxcbiAgTUFQX0JPVU5EUzogd2luZG93LkwubGF0TG5nQm91bmRzKFxuICAgIHdpbmRvdy5MLmxhdExuZyg0LjY3OTQwMDcxNTk2Mzg5NCwgMS43MzkwNjA2Njg5NDUzMTI3KSxcbiAgICB3aW5kb3cuTC5sYXRMbmcoOTguMzg0MzkwNzQxNTE4NjYsIDIuMzQzMzk1OTk2MDkzNzUwKVxuICApLFxuICBPU01fTEFZRVI6IHdpbmRvdy5MLnRpbGVMYXllcignaHR0cHM6Ly97c30udGlsZS5vcGVuc3RyZWV0bWFwLm9yZy97en0ve3h9L3t5fS5wbmcnLCB7XG4gICAgYXR0cmlidXRpb246ICcmY29weTsgPGEgaHJlZj1cImh0dHBzOi8vd3d3Lm9wZW5zdHJlZXRtYXAub3JnL2NvcHlyaWdodFwiPk9wZW5TdHJlZXRNYXA8L2E+JyxcbiAgICBtYXhab29tOiAxOSxcbiAgICBtaW5ab29tOiAxMVxuICB9KSxcbiAgRVNSSV9MQVlFUjogd2luZG93LkwudGlsZUxheWVyKCdodHRwczovL3NlcnZlci5hcmNnaXNvbmxpbmUuY29tL0FyY0dJUy9yZXN0L3NlcnZpY2VzL1dvcmxkX0ltYWdlcnkvTWFwU2VydmVyL3RpbGUve3p9L3t5fS97eH0nLCB7XG4gICAgYXR0cmlidXRpb246ICcmY29weTsgPGEgaHJlZj1cImh0dHBzOi8vd3d3LmFyY2dpcy5jb20vaG9tZS9pdGVtLmh0bWw/aWQ9MTBkZjIyNzlmOTY4NGU0YTlmNmE3ZjA4ZmViYWMyYTlcIj5Fc3JpIEltYWdlcnk8L2E+JyxcbiAgICBtYXhab29tOiAxOSxcbiAgICBtaW5ab29tOiAxMVxuICB9KSxcbiAgZ2V0RGlzdGFuY2VCZXR3ZWVuQ29vcmRzOiBnZXREaXN0YW5jZUJldHdlZW5Db29yZHMsXG4gIGNvbnZlcnREaXN0YW5jZVRvU3RyaW5nOiBjb252ZXJ0RGlzdGFuY2VUb1N0cmluZyxcbiAgYnVpbGREaXN0YW5jZUVUQTogYnVpbGREaXN0YW5jZUVUQSxcbiAgcHJlY2lzaW9uUm91bmQ6IHByZWNpc2lvblJvdW5kLFxuICBmZXRjaE1vZGFsOiBmZXRjaE1vZGFsLFxuICBjbG9zZU1vZGFsOiBjbG9zZU1vZGFsXG59O1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgJy4uL3Njc3MvRG91cmRhbm5haXNFeHBsb3JlLnNjc3MnO1xuaW1wb3J0IE1hcmtlcnMgZnJvbSAnLi91dGlscy9NYXJrZXJFbnVtLmpzJztcbmltcG9ydCBNYXAgZnJvbSAnLi9tYXAvTWFwLmpzJztcbmltcG9ydCBFdmVudHMgZnJvbSAnLi91dGlscy9FdnRzLmpzJztcbmltcG9ydCBVdGlscyBmcm9tICcuL3V0aWxzL1V0aWxzLmpzJztcblxuXG53aW5kb3cuRXZ0cyA9IG5ldyBFdmVudHMoKTtcblxuXG5jbGFzcyBEb3VyZGFubmFpc0V4cGxvcmUge1xuXG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgLy8gTWFwIGludGVybmFsc1xuICAgIHRoaXMuX21hcCA9IG51bGw7XG4gICAgLy8gRGF0YSBvYmplY3RcbiAgICB0aGlzLl9jaXR5Qm91bmRzID0ge307XG4gICAgdGhpcy5fY2l0eU1hcmtlcnMgPSB7fTtcbiAgICB0aGlzLl90cmFuc3BvcnRhdGlvbkxpbmVzID0ge307XG4gICAgLy8gVXNlZCBmb3IgbWFya2Vyc1xuICAgIHRoaXMuX2Rpc3BsYXllZFR5cGVzID0gW107XG4gICAgdGhpcy5fbWFya2VyVG9rZW5zID0gW107XG4gICAgLy8gVXNlciBvYmplY3RcbiAgICB0aGlzLl91c2VyID0ge1xuICAgICAgZ2VvbG9jYXRpb25BbGxvd2VkOiBmYWxzZSxcbiAgICAgIGxhdDogVXRpbHMuSE9NRV9MQVQsXG4gICAgICBsbmc6IFV0aWxzLkhPTUVfTE5HLFxuICAgICAgYWNjdXJhY3k6IDAsXG4gICAgICBtYXJrZXI6IG51bGxcbiAgICB9O1xuICAgIC8vIEluaXQgYXBwXG4gICAgdGhpcy5faW5pdCgpO1xuICB9XG5cblxuICBfaW5pdCgpIHtcbiAgICB0aGlzLl9pbml0R2VvbG9jYXRpb24oKVxuICAgICAgLnRoZW4odGhpcy5faW5pdE1hcC5iaW5kKHRoaXMpKVxuICAgICAgLnRoZW4odGhpcy5faW5pdEV2ZW50cy5iaW5kKHRoaXMpKVxuICAgICAgLnRoZW4odGhpcy5fZmV0Y2hDaXR5Qm91bmRzLmJpbmQodGhpcykpIC8vIEZldGNoIGNpdHkgYm91bmRzXG4gICAgICAudGhlbih0aGlzLl9idWlsZENpdHlCb3VuZHMuYmluZCh0aGlzKSkgLy8gQnVpbGQgY2l0eSBib3VuZHNcbiAgICAgIC50aGVuKHRoaXMuX2ZldGNoQ2l0eU1hcmtlcnMuYmluZCh0aGlzKSkgLy8gRmV0Y2ggY2l0eSBtYXJrZXJzXG4gICAgICAudGhlbih0aGlzLl9idWlsZENpdHlNYXJrZXJzLmJpbmQodGhpcykpIC8vIEJ1aWxkIGNpdHkgbWFya2Vyc1xuICAgICAgLnRoZW4odGhpcy5fZmV0Y2hUcmFuc3BvcnRhdGlvbkxpbmVzLmJpbmQodGhpcykpIC8vIEZldGNoIHRyYW5zcG9ydGF0aW9uIGxpbmVzXG4gICAgICAudGhlbih0aGlzLl9idWlsZFRyYW5zcG9ydGF0aW9uTGluZXMuYmluZCh0aGlzKSkgLy8gQnVpbGQgdHJhbnNwb3J0YXRpb24gbGluZXNcbiAgICAgIC50aGVuKCgpID0+IHsgY29uc29sZS5sb2coJ3dlIGFyZSBkb25lJywgdGhpcykgfSk7ICAgIFxuICB9XG5cblxuICAvKiBBcHAgaW5pdGlhbGl6YXRpb24gc2VxdWVuY2UgKi9cblxuXG4gIF9pbml0R2VvbG9jYXRpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuXHRcdFx0aWYgKCdnZW9sb2NhdGlvbicgaW4gbmF2aWdhdG9yKSB7XG4gICAgICAgIC8vIFRPRE8gOiBpbiBuZXh0IHZlcnNpb24sIG1ha2UgdGhpcyBhIHByZWYgbG93L2hpZ2ggKHRvZ2dsZSlcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgICBlbmFibGVIaWdoQWNjdXJhY3k6IHRydWUsIC8vIE1vcmUgY29uc3VwdGlvbiwgYmV0dGVyIHBvc2l0aW9uXG4gICAgICAgICAgbWF4aW11bUFnZTogMTAwMCwgLy8gQSBwb3NpdGlvbiB3aWxsIGxhc3QgMXMgbWF4aW11bVxuICAgICAgICAgIHRpbWVvdXQ6IDkwMCwgLy8gQSBwb3NpdGlvbiBpcyB1cGRhdGVkIGluIDAuOXMgbWF4aW11bVxuICAgICAgICB9O1xuICAgICAgICBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKHRoaXMuX3Bvc2l0aW9uSW5pdGlhbGl6ZWQuYmluZCh0aGlzKSwgbnVsbCwgb3B0aW9ucyk7XG5cdFx0XHRcdHRoaXMuX3dhdGNoSWQgPSBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24ud2F0Y2hQb3NpdGlvbih0aGlzLl9wb3NpdGlvblVwZGF0ZS5iaW5kKHRoaXMpLCBudWxsLCBvcHRpb25zKTtcbiAgICAgIH1cbiAgICAgIC8vIERvbid0IGxvY2sgaW5pdGlhbGl6YXRpb24gd2FpdGluZyBmb3IgcG9zXG4gICAgICByZXNvbHZlKCk7XG5cdFx0fSk7XG4gIH1cblxuXG4gIF9pbml0TWFwKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIHRoaXMuX21hcCA9IG5ldyBNYXAoe1xuICAgICAgICB0YXJnZXRJZDogJ2NjZGgtbWFwJ1xuICAgICAgfSk7XG4gICAgICByZXNvbHZlKCk7XG4gICAgfSk7XG4gIH1cblxuXG4gIF9pbml0RXZlbnRzKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIC8vIExpc3RlbmluZyB0byBtb2RhbCBldmVudFxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsLW92ZXJsYXknKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIFV0aWxzLmNsb3NlTW9kYWwuYmluZCh0aGlzKSk7XG4gICAgICBjb25zdCBpdGVtcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXJrZXItc2VsZWN0b3InKS5jaGlsZHJlbjtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaXRlbXNbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9tYXJrZXJDYXRlZ29yeUNsaWNrZWQuYmluZCh0aGlzLCBpdGVtc1tpXSkpOyAgICAgICAgXG4gICAgICB9XG5cbiAgICAgIHJlc29sdmUoKTtcbiAgICB9KTtcbiAgfVxuXG5cbiAgX2ZldGNoQ2l0eUJvdW5kcygpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICBjb25zdCBwcm9taXNlcyA9IFtdO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBVdGlscy5DQ0RIX0NJVElFUy5sZW5ndGg7ICsraSkge1xuICAgICAgICBwcm9taXNlcy5wdXNoKG5ldyBQcm9taXNlKHJlc29sdmVMb2NhbCA9PiB7XG4gICAgICAgICAgZmV0Y2goYC4vYXNzZXRzL2pzb24vY2l0eWJvdW5kcy8ke1V0aWxzLkNDREhfQ0lUSUVTW2ldfS5qc29uYCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIGRhdGEuanNvbigpLnRoZW4oanNvbkRhdGEgPT4ge1xuICAgICAgICAgICAgICB0aGlzLl9jaXR5Qm91bmRzW1V0aWxzLkNDREhfQ0lUSUVTW2ldXSA9IGpzb25EYXRhO1xuICAgICAgICAgICAgICByZXNvbHZlTG9jYWwoKTtcbiAgICAgICAgICAgIH0pLmNhdGNoKHJlc29sdmVMb2NhbCk7XG4gICAgICAgICAgfSkuY2F0Y2gocmVzb2x2ZUxvY2FsKTtcbiAgICAgICAgfSkpO1xuICAgICAgfVxuICAgICAgLy8gR29pbmcgdG8gbmV4dCBzdGVwIG9uY2UgYWxsIGJvdW5kcyBhcmUgbG9hZGVkIGFuZCBzYXZlZFxuICAgICAgUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4ocmVzb2x2ZSk7XG4gICAgfSk7XG4gIH1cblxuXG4gIF9idWlsZENpdHlCb3VuZHMoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgY29uc3QgcHJvbWlzZXMgPSBbXTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgVXRpbHMuQ0NESF9DSVRJRVMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgcHJvbWlzZXMucHVzaChuZXcgUHJvbWlzZShyZXNvbHZlTG9jYWwgPT4ge1xuICAgICAgICAgIHRoaXMuX21hcC5hZGRQb2x5Z29uKHRoaXMuX2NpdHlCb3VuZHNbVXRpbHMuQ0NESF9DSVRJRVNbaV1dLmJvdW5kcywgVXRpbHMuQ0NESF9DSVRJRVNbaV0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlc29sdmVMb2NhbCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pKTtcbiAgICAgIH1cbiAgICAgIC8vIEdvaW5nIHRvIG5leHQgc3RlcCBvbmNlIGFsbCBib3VuZHMgYXJlIGRyYXduIG9uIG1hcFxuICAgICAgUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4ocmVzb2x2ZSk7XG4gICAgfSk7XG4gIH1cblxuXG4gIF9mZXRjaENpdHlNYXJrZXJzKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIGNvbnN0IHByb21pc2VzID0gW107XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IFV0aWxzLkNDREhfQ0lUSUVTLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHByb21pc2VzLnB1c2gobmV3IFByb21pc2UocmVzb2x2ZUxvY2FsID0+IHtcbiAgICAgICAgICBmZXRjaChgLi9hc3NldHMvanNvbi9jaXR5bWFya2Vycy8ke1V0aWxzLkNDREhfQ0lUSUVTW2ldfS5qc29uYCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIGRhdGEuanNvbigpLnRoZW4oanNvbkRhdGEgPT4ge1xuICAgICAgICAgICAgICB0aGlzLl9jaXR5TWFya2Vyc1tVdGlscy5DQ0RIX0NJVElFU1tpXV0gPSBqc29uRGF0YS5tYXJrZXJzO1xuICAgICAgICAgICAgICByZXNvbHZlTG9jYWwoKTtcbiAgICAgICAgICAgIH0pLmNhdGNoKHJlc29sdmVMb2NhbCk7XG4gICAgICAgICAgfSkuY2F0Y2gocmVzb2x2ZUxvY2FsKTtcbiAgICAgICAgfSkpO1xuICAgICAgfVxuICAgICAgLy8gR29pbmcgdG8gbmV4dCBzdGVwIG9uY2UgYWxsIG1hcmtlcnMgYXJlIGxvYWRlZCBhbmQgc2F2ZWRcbiAgICAgIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKHJlc29sdmUpO1xuICAgIH0pO1xuICB9XG5cblxuICBfYnVpbGRDaXR5TWFya2VycygpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICBjb25zdCBwcm9taXNlcyA9IFtdO1xuICAgICAgLy8gSXRlcmF0ZSBvdmVyIENDREggY2l0aWVzXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IFV0aWxzLkNDREhfQ0lUSUVTLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIC8vIEl0ZXJhdGUgb3ZlciBjaXR5IG1hcmtlcnMgY2F0ZWdvcmllc1xuICAgICAgICBjb25zdCBjYXRlZ29yaWVzID0gdGhpcy5fY2l0eU1hcmtlcnNbVXRpbHMuQ0NESF9DSVRJRVNbaV1dO1xuICAgICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoY2F0ZWdvcmllcyk7XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwga2V5cy5sZW5ndGg7ICsraikge1xuICAgICAgICAgIC8vIEl0ZXJhdGUgb3ZlciBjaXR5J3MgbWFya2Vyc1xuICAgICAgICAgIGNvbnN0IG1hcmtlcnMgPSBjYXRlZ29yaWVzW2tleXNbal1dO1xuICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgbWFya2Vycy5sZW5ndGg7ICsraykge1xuICAgICAgICAgICAgcHJvbWlzZXMucHVzaChuZXcgUHJvbWlzZShyZXNvbHZlTG9jYWwgPT4ge1xuICAgICAgICAgICAgICB0aGlzLl9tYXAuY3JlYXRlTWFya2VyKHtcbiAgICAgICAgICAgICAgICBtYXJrOiBtYXJrZXJzW2tdLFxuICAgICAgICAgICAgICAgIHVzZXI6IHRoaXMuX3VzZXJcbiAgICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlc29sdmVMb2NhbCk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gR29pbmcgdG8gbmV4dCBzdGVwIG9uY2UgYWxsIG1hcmtlcnMgYXJlIGRyYXduIG9uIG1hcFxuICAgICAgUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4ocmVzb2x2ZSk7XG4gICAgfSk7XG4gIH1cblxuXG4gIF9mZXRjaFRyYW5zcG9ydGF0aW9uTGluZXMoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgZmV0Y2goYC4vYXNzZXRzL2pzb24vdHJhbnNwb3J0YXRpb24vdHJhbnNwb3J0YXRpb24uanNvbmApLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgIGRhdGEuanNvbigpLnRoZW4oanNvbkRhdGEgPT4ge1xuICAgICAgICAgIHRoaXMuX3RyYW5zcG9ydGF0aW9uTGluZXMgPSBqc29uRGF0YTtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pLmNhdGNoKHJlc29sdmUpO1xuICAgICAgfSkuY2F0Y2gocmVzb2x2ZSk7XG4gICAgfSk7XG4gIH1cblxuICBcbiAgX2J1aWxkVHJhbnNwb3J0YXRpb25MaW5lcygpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICBjb25zdCBwcm9taXNlcyA9IFtdO1xuICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMuX3RyYW5zcG9ydGF0aW9uTGluZXMpO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHByb21pc2VzLnB1c2gobmV3IFByb21pc2UocmVzb2x2ZUxvY2FsID0+IHtcbiAgICAgICAgICBjb25zdCBsaW5lID0gdGhpcy5fdHJhbnNwb3J0YXRpb25MaW5lc1trZXlzW2ldXTtcbiAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGxpbmUuc3RvcHMubGVuZ3RoOyArK2opIHtcbiAgICAgICAgICAgIHRoaXMuX21hcC5hZGRUcmFuc3BvcnRhdGlvblN0b3Aoe1xuICAgICAgICAgICAgICBkYXRhOiBsaW5lLFxuICAgICAgICAgICAgICBzdG9wOiBsaW5lLnN0b3BzW2pdXG4gICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlc29sdmVMb2NhbCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICAgIH1cbiAgICAgIC8vIEdvaW5nIHRvIG5leHQgc3RlcCBvbmNlIGFsbCBtYXJrZXJzIGFyZSBkcmF3biBvbiBtYXBcbiAgICAgIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKHJlc29sdmUpO1xuICAgIH0pO1xuICB9XG5cblxuICAvKiBNYXJrZXIgdG9nZ2xpbmcgY2xpY2tlZCAqL1xuXG5cbiAgX21hcmtlckNhdGVnb3J5Q2xpY2tlZChlKSB7XG4gICAgZS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmF0ZWQnKTtcbiAgICBpZiAoZS5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2YXRlZCcpKSB7XG4gICAgICB0aGlzLl9tYXAuc2hvd0NhdGVnb3J5KGUuZGF0YXNldC50eXBlKTtcbiAgICAgIGNvbnN0IG1hcmtlcnMgPSBNYXJrZXJzLnR5cGVzW2UuZGF0YXNldC50eXBlXTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWFya2Vycy5sZW5ndGg7ICsraSkge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnSU1HJyk7XG4gICAgICAgIGVsZW1lbnQuc3JjID0gYC4vYXNzZXRzL2ltZy9tYXJrZXIvJHttYXJrZXJzW2ldfS5zdmdgO1xuICAgICAgICBlbGVtZW50LmRhdGFzZXQudHlwZSA9IG1hcmtlcnNbaV07XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdWJpdGVtcy13cmFwcGVyJykuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gICAgICAgIHRoaXMuX21hcmtlclRva2Vucy5wdXNoKHdpbmRvdy5FdnRzLmFkZEV2ZW50KCdjbGljaycsIGVsZW1lbnQsIHRoaXMuX21hcmtlclR5cGVDbGlja2VkLCB7IHNjb3BlOiB0aGlzLCBlbGVtZW50OiBlbGVtZW50IH0pKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2Rpc3BsYXllZFR5cGVzLnB1c2goZS5kYXRhc2V0LnR5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9tYXAuaGlkZUNhdGVnb3J5KGUuZGF0YXNldC50eXBlKTtcbiAgICAgIHRoaXMuX2Rpc3BsYXllZFR5cGVzLnNwbGljZSh0aGlzLl9kaXNwbGF5ZWRUeXBlcy5pbmRleE9mKGUuZGF0YXNldC50eXBlKSwgMSk7XG4gICAgICBjb25zdCBjaGlsZHJlbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdWJpdGVtcy13cmFwcGVyJykuY2hpbGRyZW47XG4gICAgICBmb3IgKGxldCBpID0gY2hpbGRyZW4ubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgaWYgKE1hcmtlcnMudHlwZXNbZS5kYXRhc2V0LnR5cGVdLmluZGV4T2YoY2hpbGRyZW5baV0uZGF0YXNldC50eXBlKSAhPT0gLTEpIHtcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3ViaXRlbXMtd3JhcHBlcicpLnJlbW92ZUNoaWxkKGNoaWxkcmVuW2ldKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBpZiAodGhpcy5fZGlzcGxheWVkVHlwZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3ViaXRlbXMtd3JhcHBlcicpLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1Yml0ZW1zLXdyYXBwZXInKS5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7ICAgICAgXG4gICAgfVxuICB9XG5cblxuICBfbWFya2VyVHlwZUNsaWNrZWQoKSB7XG4gICAgY29uc3QgZSA9IHRoaXMuZWxlbWVudDtcbiAgICBlLmNsYXNzTGlzdC50b2dnbGUoJ2RlYWN0aXZhdGVkJyk7XG4gICAgaWYgKGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdkZWFjdGl2YXRlZCcpKSB7XG4gICAgICB0aGlzLnNjb3BlLl9tYXAuaGlkZVN1YkNhdGVnb3J5KGUuZGF0YXNldC50eXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zY29wZS5fbWFwLnNob3dTdWJDYXRlZ29yeShlLmRhdGFzZXQudHlwZSk7XG4gICAgfVxuICB9XG5cbiBcbiAgLyogR2VvbG9jIGNhbGxiYWNrcyAqL1xuXG5cbiAgX3Bvc2l0aW9uSW5pdGlhbGl6ZWQoKSB7XG4gICAgdGhpcy5fdXNlci5nZW9sb2NhdGlvbkFsbG93ZWQgPSB0cnVlO1xuICB9XG5cblxuICBfcG9zaXRpb25VcGRhdGUocG9zaXRpb24pIHtcbiAgICAvLyBPbmx5IGlmIHVzZXIgYWxsb3dlZCBnZW9sb2NhdGlvbjtcbiAgICAvLyBTaG91bGQgbmV2ZXIgYmUgZmFsc2Ugd2hlbiBjYWxsZWQgYmFja1xuICAgIGlmICh0aGlzLl91c2VyLmdlb2xvY2F0aW9uQWxsb3dlZCA9PT0gdHJ1ZSkge1xuICAgICAgLy8gVXBkYXRlIHNhdmVkIHVzZXIgcG9zaXRpb25cbiAgICAgIHRoaXMuX3VzZXIubGF0ID0gcG9zaXRpb24uY29vcmRzLmxhdGl0dWRlO1xuICAgICAgdGhpcy5fdXNlci5sbmcgPSBwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlO1xuICAgICAgdGhpcy5fdXNlci5hY2N1cmFjeSA9IHBvc2l0aW9uLmNvb3Jkcy5hY2N1cmFjeTtcbiAgICAgIC8vIE9ubHkgZHJhdyBtYXJrZXIgaWYgbWFwIGlzIGFscmVhZHkgY3JlYXRlZFxuICAgICAgaWYgKHRoaXMuX21hcCkge1xuICAgICAgICB0aGlzLl9tYXAuZHJhd1VzZXJNYXJrZXIoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuXG4vKiBTZWFyY2ggbW9kYWwgbWV0aG9kcyAqL1xuXG4vKlxuICBfc2VhcmNoTW9kYWwoKSB7XG4gICAgdGhpcy5fZmV0Y2hNb2RhbCgnc2VhcmNobW9kYWwnKS50aGVuKGRvbSA9PiB7XG4gICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXModGhpcy5fbWFya3MpO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGRvbS5maXJzdEVsZW1lbnRDaGlsZC5hcHBlbmRDaGlsZCh0aGlzLl9jcmVhdGVNYXJrQ2F0ZWdvcnlTZWFyY2hJY29uKGtleXNbaV0pKTtcbiAgICAgIH1cbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RhbC1vdmVybGF5JykuYXBwZW5kQ2hpbGQoZG9tKTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RhbC1vdmVybGF5Jykuc3R5bGUuZGlzcGxheSA9ICdmbGV4Jztcblx0XHRcdHNldFRpbWVvdXQoKCkgPT4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsLW92ZXJsYXknKS5zdHlsZS5vcGFjaXR5ID0gMSwgNTApO1xuICAgIH0pO1xuICB9XG4qL1xuXG5cbiAgZ2V0IHVzZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3VzZXI7XG4gIH1cblxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IERvdXJkYW5uYWlzRXhwbG9yZTtcbiJdLCJuYW1lcyI6WyJNYXBGYWN0b3J5IiwiTWFya2VycyIsIlV0aWxzIiwid2luZG93IiwidG1wIiwiTWFwIiwib3B0aW9ucyIsIl9jbGFzc0NhbGxDaGVjayIsIl9pZCIsInRhcmdldElkIiwiX21hcCIsIl9sYXllcnMiLCJDYXJ0ZSIsIlNhdGVsbGl0ZSIsIl9tYXJrcyIsIl9wb2x5Z29ucyIsIl9saW5lcyIsIl9pbml0IiwiX2V2ZW50cyIsIl9jcmVhdGVDbGFzcyIsImtleSIsInZhbHVlIiwiTCIsIm1hcCIsInpvb21Db250cm9sIiwic2V0VmlldyIsIkNDREhfQ0VOVEVSIiwiTEFUIiwiTE5HIiwiY29udHJvbCIsInNjYWxlIiwiYWRkVG8iLCJzZXRNYXhCb3VuZHMiLCJNQVBfQk9VTkRTIiwiT1NNX0xBWUVSIiwiRVNSSV9MQVlFUiIsImxheWVycyIsInBvc2l0aW9uIiwiX3RoaXMiLCJvbiIsIl9tYXBDbGlja2VkIiwiYmluZCIsInBhbkluc2lkZUJvdW5kcyIsImFuaW1hdGUiLCJvcHRzIiwiY29uc29sZSIsImxvZyIsImxhdGxuZyIsIkpTT04iLCJzdHJpbmdpZnkiLCJsYXQiLCJsbmciLCJwdXNoIiwiZHJhd1VzZXJNYXJrZXIiLCJkeCIsInVzZXIiLCJtYXJrZXIiLCJpY29uIiwic3VidHlwZXMiLCJzZXRMYXRMbmciLCJhZGRQb2x5Z29uIiwiaW5wdXQiLCJpZCIsIl90aGlzMiIsIlByb21pc2UiLCJyZXNvbHZlIiwicG9seWdvbiIsImNyZWF0ZU1hcmtlciIsIl90aGlzMyIsInR5cGUiLCJtYXJrIiwiZmx5VG8iLCJiaW5kUG9wdXAiLCJjcmVhdGVNYXJrZXJQb3B1cCIsImxlbmd0aCIsImkiLCJzaG93Q2F0ZWdvcnkiLCJjYXRlZ29yeSIsInN1YkNhdGVnb3JpZXMiLCJ0eXBlcyIsInNob3dTdWJDYXRlZ29yeSIsInN1YkNhdGVnb3J5IiwibWFya3MiLCJoaWRlQ2F0ZWdvcnkiLCJoaWRlU3ViQ2F0ZWdvcnkiLCJyZW1vdmVGcm9tIiwiYWRkVHJhbnNwb3J0YXRpb25TdG9wIiwiX3RoaXM0Iiwic3RvcCIsImxpbmUiLCJwb2x5bGluZSIsImRhdGEiLCJwYXRoIiwiY29sb3IiLCJ3ZWlnaHQiLCJzbW9vdGhGYWN0b3IiLCJjcmVhdGVTdG9wTWFya2VyUG9wdXAiLCJhZGRMaW5lIiwicG9pbnRzIiwiZG9tIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwidGl0bGUiLCJhZGRyZXNzIiwidG93biIsInBob25lIiwid2Vic2l0ZSIsImluZm8iLCJvcGVuV2l0aCIsImNsYXNzTGlzdCIsImFkZCIsImlubmVySFRNTCIsIm5hbWUiLCJocmVmIiwiY29uY2F0Iiwic2V0QXR0cmlidXRlIiwiYXBwZW5kQ2hpbGQiLCJidXR0b24iLCJtYXJrZXJPcGVuZWRTdGF0ZSIsInRpbWV0YWJsZSIsImFsd2F5c0Nsb3NlZCIsImlzT3BlbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJ0aW1ldGFibGVNb2RhbCIsImxvZ28iLCJkaXIiLCJkbCIsInNyYyIsInRlcm1pbnVzIiwic3RhdGUiLCJtb3JlIiwibWFya2VySXNDbG9zZWQiLCJjaGVja1RpbWUiLCJzZXRJbnRlcnZhbCIsIm1hcmtlcklzT3BlbmVkIiwibm93IiwiRGF0ZSIsImhvdXIiLCJnZXRIb3VycyIsIm1pbnV0ZXMiLCJnZXRNaW51dGVzIiwiZGF5T2ZXZWVrIiwiZ2V0RGF5Iiwib3BlbmluZ1RpbWUiLCJwYXJzZUludCIsIm9wZW4iLCJoIiwibSIsImNsb3NpbmdUaW1lIiwiY2xvc2UiLCJjdXJyZW50VGltZSIsImlzTmFOIiwiaGFzQnJlYWsiLCJzZXZlcmFsIiwiaXNDbG9zZWQiLCJicmVha09wZW5pbmdUaW1lIiwiZW5kIiwiYnJlYWtDbG9zaW5nVGltZSIsInN0YXJ0IiwiYWx3YXlzT3BlbmVkIiwiZmlyc3RDaGlsZCIsImxhc3RDaGlsZCIsInJlbW92ZSIsImZldGNoTW9kYWwiLCJ0aGVuIiwicXVlcnlTZWxlY3RvciIsImRpc3RhbmNlIiwiZ2V0RGlzdGFuY2VCZXR3ZWVuQ29vcmRzIiwiY29udmVydERpc3RhbmNlVG9TdHJpbmciLCJldGEiLCJidWlsZERpc3RhbmNlRVRBIiwiY2FyIiwid2FsayIsImRheURvbSIsImNoaWxkcmVuIiwibW9ybmluZyIsImxhc3RFbGVtZW50Q2hpbGQiLCJmaXJzdEVsZW1lbnRDaGlsZCIsImFmdGVybm9vbiIsImoiLCJkaXYiLCJzdHlsZSIsImJvcmRlclJhZGl1cyIsImp1c3RpZnlDb250ZW50IiwiaW5zZXJ0QmVmb3JlIiwiZ2V0RWxlbWVudEJ5SWQiLCJkaXNwbGF5Iiwic2V0VGltZW91dCIsIm9wYWNpdHkiLCJFdnRzIiwiZGVidWciLCJhcmd1bWVudHMiLCJ1bmRlZmluZWQiLCJfZGVidWciLCJfaWRJbmNyZW1lbnRvciIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsIl9yZWd1bGFyRXZlbnRzIiwiX2N1c3RvbUV2ZW50cyIsInZlcnNpb24iLCJkZXN0cm95IiwiX3JhaXNlIiwicmVtb3ZlQWxsRXZlbnRzIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJhZGRFdmVudCIsImV2ZW50TmFtZSIsImVsZW1lbnQiLCJjYWxsYmFjayIsInNjb3BlIiwiZXJyIiwiX3R5cGVvZiIsInJlbW92ZUV2ZW50IiwiZXZlbnRJZCIsInN0YXR1c0NvZGUiLCJfY2xlYXJSZWd1bGFyRXZlbnQiLCJoYWRFdmVudHMiLCJpbmRleCIsImV2dCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJzcGxpY2UiLCJzdWJzY3JpYmUiLCJvbmVTaG90Iiwib3MiLCJ1bnN1YnNjcmliZSIsInN1YnMiLCJ1bnN1YnNjcmliZUFsbEZvciIsInB1Ymxpc2giLCJsZXZlbCIsImVycm9yVmFsdWUiLCJmcmVlemUiLCJzZXJ2aWNlIiwiY2FyZSIsImNhdGVyaW5nIiwic3BvcnQiLCJzaG9wIiwibmF0dXJlIiwidHJhbnNwb3J0IiwidG91cmlzbSIsInJlc3RhdXJhbnQiLCJJY29uIiwiaWNvblVybCIsImljb25TaXplIiwiaWNvbkFuY2hvciIsInBvcHVwQW5jaG9yIiwic2hhZG93VXJsIiwic2hhZG93U2l6ZSIsInNoYWRvd0FuY2hvciIsImJhciIsImNlbGxhciIsInRvYmFjY28iLCJncm9jZXJ5IiwiZGl5IiwiYmVhdXR5IiwiZm9vdCIsInJ1Z2J5IiwiYmFza2V0IiwicG9vbCIsInBpbmdwb25nIiwic2thdGUiLCJib2NjZSIsInRlbm5pcyIsImJha2VyeSIsImZpc2giLCJidXRjaGVyIiwiYm9vayIsIm11c2ljIiwibGFuZG1hcmsiLCJjYXN0bGUiLCJjaHVyY2giLCJtdXNldW0iLCJnYXJkZW4iLCJnYXMiLCJ0cmFpbiIsImJ1cyIsImFuaW1hbCIsImRlbnRhbCIsInBoYXJtYWN5IiwibWVkaWMiLCJsYWIiLCJkZWZpYnJpbGxhdG9yIiwiY2VtZXRlcnkiLCJmaXJlZmlnaHRlciIsInBvbGljZSIsIm1haWwiLCJiYW5rIiwicGFyayIsInJlY3ljbGUiLCJhZG1pbmlzdHJhdGlvbiIsInNjaG9vbCIsImZyb20iLCJ0byIsImxvbjEiLCJQSSIsImxhdDEiLCJsb24yIiwibGF0MiIsImRlbHRhTGF0IiwiZGVsdGFMb24iLCJhIiwicG93Iiwic2luIiwiY29zIiwiYyIsImFzaW4iLCJzcXJ0IiwicHJlY2lzaW9uUm91bmQiLCJjYXJNaW51dGVzIiwiY2FyU2Vjb25kcyIsIndhbGtNaW51dGVzIiwid2Fsa1NlY29uZHMiLCJwcmVjaXNpb24iLCJtdWx0aXBsaWVyIiwicm91bmQiLCJ1cmwiLCJmZXRjaCIsInRleHQiLCJodG1sIiwiY3JlYXRlUmFuZ2UiLCJjcmVhdGVDb250ZXh0dWFsRnJhZ21lbnQiLCJjbG9zZU1vZGFsIiwiZXZlbnQiLCJmb3JjZSIsInRhcmdldCIsImluZGV4T2YiLCJDQ0RIX0NJVElFUyIsImxhdExuZ0JvdW5kcyIsImxhdExuZyIsInRpbGVMYXllciIsImF0dHJpYnV0aW9uIiwibWF4Wm9vbSIsIm1pblpvb20iLCJFdmVudHMiLCJEb3VyZGFubmFpc0V4cGxvcmUiLCJfY2l0eUJvdW5kcyIsIl9jaXR5TWFya2VycyIsIl90cmFuc3BvcnRhdGlvbkxpbmVzIiwiX2Rpc3BsYXllZFR5cGVzIiwiX21hcmtlclRva2VucyIsIl91c2VyIiwiZ2VvbG9jYXRpb25BbGxvd2VkIiwiSE9NRV9MQVQiLCJIT01FX0xORyIsImFjY3VyYWN5IiwiX2luaXRHZW9sb2NhdGlvbiIsIl9pbml0TWFwIiwiX2luaXRFdmVudHMiLCJfZmV0Y2hDaXR5Qm91bmRzIiwiX2J1aWxkQ2l0eUJvdW5kcyIsIl9mZXRjaENpdHlNYXJrZXJzIiwiX2J1aWxkQ2l0eU1hcmtlcnMiLCJfZmV0Y2hUcmFuc3BvcnRhdGlvbkxpbmVzIiwiX2J1aWxkVHJhbnNwb3J0YXRpb25MaW5lcyIsIm5hdmlnYXRvciIsImVuYWJsZUhpZ2hBY2N1cmFjeSIsIm1heGltdW1BZ2UiLCJ0aW1lb3V0IiwiZ2VvbG9jYXRpb24iLCJnZXRDdXJyZW50UG9zaXRpb24iLCJfcG9zaXRpb25Jbml0aWFsaXplZCIsIl93YXRjaElkIiwid2F0Y2hQb3NpdGlvbiIsIl9wb3NpdGlvblVwZGF0ZSIsIml0ZW1zIiwiX21hcmtlckNhdGVnb3J5Q2xpY2tlZCIsIl90aGlzNSIsInByb21pc2VzIiwiX2xvb3AiLCJyZXNvbHZlTG9jYWwiLCJqc29uIiwianNvbkRhdGEiLCJhbGwiLCJfdGhpczYiLCJfbG9vcDIiLCJib3VuZHMiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJfdGhpczciLCJfbG9vcDMiLCJtYXJrZXJzIiwiX3RoaXM4IiwiY2F0ZWdvcmllcyIsIl9sb29wNCIsIl9sb29wNSIsImsiLCJfdGhpczkiLCJfdGhpczEwIiwiX2xvb3A2Iiwic3RvcHMiLCJlIiwidG9nZ2xlIiwiY29udGFpbnMiLCJkYXRhc2V0IiwiX21hcmtlclR5cGVDbGlja2VkIiwicmVtb3ZlQ2hpbGQiLCJjb29yZHMiLCJsYXRpdHVkZSIsImxvbmdpdHVkZSIsImdldCJdLCJzb3VyY2VSb290IjoiIn0=
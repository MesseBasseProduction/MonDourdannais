import Markers from './MarkerEnum.js';
import Utils from './Utils.js';


class Map {


  constructor(options) {
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


  _init() {
    // Use main div to inject OSM into
    this._map = window.L.map(this._id, {
      zoomControl: false,
    }).setView([Utils.HOME_LAT, Utils.HOME_LNG], 13);
    // Add meter and feet scale on map
    window.L.control.scale().addTo(this._map);
    // Prevent panning outside of the map bounds definined in utils
    this._map.setMaxBounds(Utils.MAP_BOUNDS);
    // Add layer group to interface and start map with osm default
    this._layers.Carte = Utils.OSM_LAYER;
    this._layers.Satellite = Utils.ESRI_LAYER;
    this._layers.Carte.addTo(this._map);
    // Add layer switch radio on bottom right of the map
    window.L.control.layers(this._layers, {}, { position: 'bottomright' }).addTo(this._map);
  }


  _events() {
    // Subscribe to click event on map to react
    this._map.on('click', this._mapClicked.bind(this));
    // Map is dragged by user mouse/finger
    this._map.on('drag', () => {
      // Constrain pan to the map bounds
      this._map.panInsideBounds(Utils.MAP_BOUNDS, { animate: true });
    });
  }


  _mapClicked(opts) {
    console.log(opts.latlng);
    console.log(this._map.getBounds());
    window._tmp.push([opts.latlng.lat, opts.latlng.lng]);
    console.log(JSON.stringify(window._tmp));
  }


  drawUserMarker() {
    if (!window.hm.user.marker) {
      window.hm.user.marker = window.L.marker([window.hm.user.lat, window.hm.user.lng], {
        icon: Markers.user
      });
      window.hm.user.marker.addTo(this._map);
    } else {
      window.hm.user.marker.setLatLng(window.hm.user);
    }
  }


  addMark(opts, createPopup) {
    let types = opts.type.split('/');
    let type = opts.type;
    if (types.length > 1) {
      type = `${types[0]}${types[1]}`;
    }

    const marker = window.L.marker([opts.lat, opts.lng], { 
      icon: Markers[type]
    }).on('click', () => {
      this._map.flyTo([opts.lat, opts.lng], 18);
    });

    marker.bindPopup(createPopup(opts));
    marker.addTo(this._map);
    if (types.length > 1) {
      for (let i = 0; i < types.length; ++i) {
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


  addPolygon(polygon) {
    this._polygons.push(window.L.polygon(polygon).addTo(this._map));
  }


}


export default Map;

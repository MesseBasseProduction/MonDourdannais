import MapFactory from '../map/MapFactory.js';
import Markers from '../utils/MarkerEnum.js';
import Utils from '../utils/Utils.js';
window.tmp= [];

class Map {


  constructor(options) {
    this._id = options.targetId;
    this._map = null

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


  _init() {
    // Use main div to inject OSM into
    this._map = window.L.map(this._id, {
      zoomControl: false,
    }).setView([Utils.CCDH_CENTER.LAT, Utils.CCDH_CENTER.LNG], 12);
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
    console.log(opts.latlng, JSON.stringify(opts.latlng.lat + ', ' + opts.latlng.lng));
    window.tmp.push([opts.latlng.lat, opts.latlng.lng]);
    console.log(JSON.stringify(window.tmp))
  }


  drawUserMarker() {
    if (!window.dx.user.marker) {
      window.dx.user.marker = window.L.marker([window.dx.user.lat, window.dx.user.lng], {
        icon: Markers.user
      });
      window.dx.user.marker.addTo(this._map);
    } else {
      window.dx.user.marker.setLatLng(window.dx.user);
    }
  }


  addPolygon(input, id) {
    return new Promise(resolve => {
      const polygon = window.L.polygon(input);
      polygon.addTo(this._map);
      this._polygons[id] = polygon;
      resolve();
    });
  }


  addMarker(opts) {
    return new Promise(resolve => {
      let type = opts.mark.type;
      const marker = window.L.marker([opts.mark.lat, opts.mark.lng], { 
        icon: Markers[type]
      }).on('click', () => {
        this._map.flyTo([opts.mark.lat, opts.mark.lng], 18);
      });
  
      marker.bindPopup(MapFactory.createMarkerPopup(opts));
      marker.addTo(this._map);
      if (opts.mark.subtypes.length > 0) {
        for (let i = 0; i < opts.mark.subtypes.length; ++i) {
          if (!this._marks[opts.mark.subtypes[i]]) {
            this._marks[opts.mark.subtypes[i]] = [];
          }
          this._marks[opts.mark.subtypes[i]].push(marker);
        }
      } else {
        if (!this._marks[type]) {
          this._marks[type] = [];
        }
        this._marks[type].push(marker);
      }

      resolve();
    });
  }


  addTransportationStop(opts) {
    return new Promise(resolve => {
      const type = opts.stop.type;
      const marker = window.L.marker([opts.stop.lat, opts.stop.lng], { 
        icon: Markers[type]
      }).on('click', () => {
        this._map.flyTo([opts.stop.lat, opts.stop.lng], 18);
      });
  
      const line = window.L.polyline(opts.data.path, {
        color: opts.data.color,
        weight: 5,
        smoothFactor: 1
      });

      marker.bindPopup(MapFactory.createStopMarkerPopup(opts)).on('popupopen', () => {
        line.addTo(this._map);
      }).on('popupclose', () => {
        line.removeFrom(this._map);
      });
      
      marker.addTo(this._map);
  
      if (!this._marks[type]) {
        this._marks[type] = [];
      }
      this._marks[type].push(marker);

      resolve();
    });
  }


  addLine(points, options) {
    this._lines.push(window.L.polyline(points, options).addTo(this._map));
  }


}


export default Map;

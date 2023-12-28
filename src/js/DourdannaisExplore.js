import '../scss/DourdannaisExplore.scss';
import Markers from './utils/MarkerEnum.js';
import Map from './map/Map.js';
import Events from './utils/Evts.js';
import Utils from './utils/Utils.js';


window.Evts = new Events();


class DourdannaisExplore {


  constructor() {
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
      lat: Utils.HOME_LAT,
      lng: Utils.HOME_LNG,
      accuracy: 0,
      marker: null
    };
    // Init app
    this._init();
  }


  _init() {
    this._initGeolocation()
      .then(this._initMap.bind(this))
      .then(this._initEvents.bind(this))
      .then(this._fetchCityBounds.bind(this)) // Fetch city bounds
      .then(this._buildCityBounds.bind(this)) // Build city bounds
      .then(this._fetchCityMarkers.bind(this)) // Fetch city markers
      .then(this._buildCityMarkers.bind(this)) // Build city markers
      .then(this._fetchTransportationLines.bind(this)) // Fetch transportation lines
      .then(this._buildTransportationLines.bind(this)) // Build transportation lines
      .then(() => { console.log('we are done', this) });    
  }


  /* App initialization sequence */


  _initGeolocation() {
    return new Promise(resolve => {
			if ('geolocation' in navigator) {
        // TODO : in next version, make this a pref low/high (toggle)
        const options = {
          enableHighAccuracy: true, // More consuption, better position
          maximumAge: 1000, // A position will last 1s maximum
          timeout: 900, // A position is updated in 0.9s maximum
        };
        navigator.geolocation.getCurrentPosition(this._positionInitialized.bind(this), null, options);
				this._watchId = navigator.geolocation.watchPosition(this._positionUpdate.bind(this), null, options);
      }
      // Don't lock initialization waiting for pos
      resolve();
		});
  }


  _initMap() {
    return new Promise(resolve => {
      this._map = new Map({
        targetId: 'ccdh-map'
      });
      resolve();
    });
  }


  _initEvents() {
    return new Promise(resolve => {
      // Listening to modal event
      document.getElementById('modal-overlay').addEventListener('click', Utils.closeModal.bind(this));
      const items = document.getElementById('marker-selector').children;
      for (let i = 0; i < items.length; ++i) {
        items[i].addEventListener('click', this._markerCategoryClicked.bind(this, items[i]));        
      }

      resolve();
    });
  }


  _fetchCityBounds() {
    return new Promise(resolve => {
      const promises = [];
      for (let i = 0; i < Utils.CCDH_CITIES.length; ++i) {
        promises.push(new Promise(resolveLocal => {
          fetch(`./assets/json/citybounds/${Utils.CCDH_CITIES[i]}.json`).then(data => {
            data.json().then(jsonData => {
              this._cityBounds[Utils.CCDH_CITIES[i]] = jsonData;
              resolveLocal();
            }).catch(resolveLocal);
          }).catch(resolveLocal);
        }));
      }
      // Going to next step once all bounds are loaded and saved
      Promise.all(promises).then(resolve);
    });
  }


  _buildCityBounds() {
    return new Promise(resolve => {
      const promises = [];
      for (let i = 0; i < Utils.CCDH_CITIES.length; ++i) {
        promises.push(new Promise(resolveLocal => {
          this._map.addPolygon(this._cityBounds[Utils.CCDH_CITIES[i]].bounds, Utils.CCDH_CITIES[i]).then(() => {
            requestAnimationFrame(resolveLocal);
          });
        }));
      }
      // Going to next step once all bounds are drawn on map
      Promise.all(promises).then(resolve);
    });
  }


  _fetchCityMarkers() {
    return new Promise(resolve => {
      const promises = [];
      for (let i = 0; i < Utils.CCDH_CITIES.length; ++i) {
        promises.push(new Promise(resolveLocal => {
          fetch(`./assets/json/citymarkers/${Utils.CCDH_CITIES[i]}.json`).then(data => {
            data.json().then(jsonData => {
              this._cityMarkers[Utils.CCDH_CITIES[i]] = jsonData.markers;
              resolveLocal();
            }).catch(resolveLocal);
          }).catch(resolveLocal);
        }));
      }
      // Going to next step once all markers are loaded and saved
      Promise.all(promises).then(resolve);
    });
  }


  _buildCityMarkers() {
    return new Promise(resolve => {
      const promises = [];
      // Iterate over CCDH cities
      for (let i = 0; i < Utils.CCDH_CITIES.length; ++i) {
        // Iterate over city markers categories
        const categories = this._cityMarkers[Utils.CCDH_CITIES[i]];
        const keys = Object.keys(categories);
        for (let j = 0; j < keys.length; ++j) {
          // Iterate over city's markers
          const markers = categories[keys[j]];
          for (let k = 0; k < markers.length; ++k) {
            promises.push(new Promise(resolveLocal => {
              this._map.createMarker({
                mark: markers[k],
                user: this._user
              }).then(() => {
                requestAnimationFrame(resolveLocal);
              });
            }));
          }
        }
      }
      // Going to next step once all markers are drawn on map
      Promise.all(promises).then(resolve);
    });
  }


  _fetchTransportationLines() {
    return new Promise(resolve => {
      fetch(`./assets/json/transportation/transportation.json`).then(data => {
        data.json().then(jsonData => {
          this._transportationLines = jsonData;
          resolve();
        }).catch(resolve);
      }).catch(resolve);
    });
  }

  
  _buildTransportationLines() {
    return new Promise(resolve => {
      const promises = [];
      const keys = Object.keys(this._transportationLines);
      for (let i = 0; i < keys.length; ++i) {
        promises.push(new Promise(resolveLocal => {
          const line = this._transportationLines[keys[i]];
          for (let j = 0; j < line.stops.length; ++j) {
            this._map.addTransportationStop({
              data: line,
              stop: line.stops[j]
            }).then(() => {
              requestAnimationFrame(resolveLocal);
            });
          }
        }));
      }
      // Going to next step once all markers are drawn on map
      Promise.all(promises).then(resolve);
    });
  }


  /* Marker toggling clicked */


  _markerCategoryClicked(e) {
    e.classList.toggle('activated');
    if (e.classList.contains('activated')) {
      this._map.showCategory(e.dataset.type);
      const markers = Markers.types[e.dataset.type];
      for (let i = 0; i < markers.length; ++i) {
        const element = document.createElement('IMG');
        element.src = `./assets/img/marker/${markers[i]}.svg`;
        element.dataset.type = markers[i];
        document.getElementById('subitems-wrapper').appendChild(element);
        this._markerTokens.push(window.Evts.addEvent('click', element, this._markerTypeClicked, { scope: this, element: element }));
      }
      this._displayedTypes.push(e.dataset.type);
    } else {
      this._map.hideCategory(e.dataset.type);
      this._displayedTypes.splice(this._displayedTypes.indexOf(e.dataset.type), 1);
      const children = document.getElementById('subitems-wrapper').children;
      for (let i = children.length - 1; i >= 0; --i) {
        if (Markers.types[e.dataset.type].indexOf(children[i].dataset.type) !== -1) {
          document.getElementById('subitems-wrapper').removeChild(children[i]);
        }
      }
    }
    
    if (this._displayedTypes.length === 0) {
      document.getElementById('subitems-wrapper').classList.remove('show');
    } else {
      document.getElementById('subitems-wrapper').classList.add('show');      
    }
  }


  _markerTypeClicked() {
    const e = this.element;
    e.classList.toggle('deactivated');
    if (e.classList.contains('deactivated')) {
      this.scope._map.hideSubCategory(e.dataset.type);
    } else {
      this.scope._map.showSubCategory(e.dataset.type);
    }
  }

 
  /* Geoloc callbacks */


  _positionInitialized() {
    this._user.geolocationAllowed = true;
  }


  _positionUpdate(position) {
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


  get user() {
    return this._user;
  }

}


export default DourdannaisExplore;

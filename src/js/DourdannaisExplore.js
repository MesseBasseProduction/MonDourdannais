import '../scss/DourdannaisExplore.scss';
import Map from './utils/Map.js';
import Utils from './utils/Utils.js';


class DourdannaisExplore {


  constructor() {
    // Map internals
    this._map = null;
    this._layers = {};

    // Data object
    this._data = {};

    this._user = {
      geolocationAllowed: false,
      lat: Utils.HOME_LAT,
      lng: Utils.HOME_LNG,
      accuracy: 0,
      marker: null
    };

    this._initGeolocation()
      .then(this._initMap.bind(this))
      .then(this._initEvents.bind(this))
      .then(this._fetchMarkers.bind(this))
      .then(() => {
        console.log('we are done')
      });
//      .then(this._buildMarkers.bind(this))
//      .then(this._buildPolygons.bind(this));
  }


  /* Init sequence */


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
        targetId: 'sarmates-land'
      });
      resolve();
    });
  }


  _initEvents() {
    return new Promise(resolve => {
      // Listening to modal event
      document.getElementById('modal-overlay').addEventListener('click', this.closeModal.bind(this));
      resolve();
    });
  }


  _fetchMarkers() {
    return new Promise(resolve => {
      const promises = [];
      for (let i = 0; i < Utils.CCDH_CITIES.length; ++i) {
        promises.push(new Promise(resolveLocal => {
          fetch(`./assets/json/${Utils.CCDH_CITIES[i]}.json`).then(data => {
            data.json().then(jsonData => {
              this._data[Utils.CCDH_CITIES[i]] = jsonData;
              requestAnimationFrame(() => {
                this._buildPolygons(this._data[Utils.CCDH_CITIES[i]].bounds).then(() => {
                  requestAnimationFrame(() => {
                    this._buildMarkers(this._data[Utils.CCDH_CITIES[i]].pois).then(resolveLocal);
                  });
                })
              });
            }).catch(resolveLocal);
          }).catch(resolveLocal);
        }));
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


  _buildMarkers(markers) {
    return new Promise(resolve => {
      const keys = Object.keys(markers);
      for (let i = 0; i < keys.length; ++i) {
        for (let j = 0; j < markers[keys[i]].length; ++j) {
          this._map.addMark(markers[keys[i]][j], this._createMarkerPopup.bind(this));
        }
      }
      resolve();
    });
  }


  _buildPolygons(cityBounds) {
    return new Promise(resolve => {
      this._map.addPolygon(cityBounds);
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


  /* Map Utils */


  _createMarkerPopup(opts) {
    const dom = document.createElement('DIV');
    const title = document.createElement('H3');
    const address = document.createElement('I');
    const town = document.createElement('I');
    const phone = document.createElement('A');
    const website = document.createElement('A');
    const info = document.createElement('P');
    const openWith = document.createElement('A');

    dom.classList.add('marker-popup');
    title.innerHTML = opts.name;
    address.innerHTML = opts.address;
    town.innerHTML = opts.town;
    phone.href = `tel:${opts.phone}`;
    phone.innerHTML = `<img src="./assets/img/icon/phone.svg">${opts.phone}`;
    website.href = opts.website;
    website.innerHTML = '<img src="./assets/img/icon/web.svg">Consulter le site';
    website.setAttribute('rel', 'noopener noreferrer');
    website.setAttribute('target', '_blank');
    info.innerHTML = opts.info;
    openWith.href = `geo:${opts.lat},${opts.lng}`;
    openWith.innerHTML = '<img src="./assets/img/icon/pin.svg">Ouvrir dans le GPS';

    dom.appendChild(title);
    dom.appendChild(address);
    dom.appendChild(town);

    const button = this._markerOpenedState(opts.timetable);
    dom.appendChild(button);

    let alwaysClosed = true;
    for (let i = 0; i < opts.timetable.length; ++i) {
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


  _markerOpenedState(timetable) {
    const dom = document.createElement('DIV');
    const state = document.createElement('H5');
    const more = document.createElement('I');
    dom.classList.add('marker-opened');
    dom.appendChild(state);
    dom.appendChild(more);
    
    if (timetable.length) {
      let alwaysClosed = true;
      for (let i = 0; i < timetable.length; ++i) {
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


  _checkTime(timetable, dom) {
    const now = new Date();
    let hour = now.getHours();
    let minutes = now.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }

    const dayOfWeek = now.getDay() - 1;
    const openingTime = parseInt(`${timetable[dayOfWeek].open.h}${timetable[dayOfWeek].open.m}`);
    const closingTime = parseInt(`${timetable[dayOfWeek].close.h}${timetable[dayOfWeek].close.m}`);
    const currentTime = parseInt(`${hour}${minutes}`);
    // Won't work if timetable open/close hours aren't on the same day
    if (timetable[dayOfWeek].isOpen && isNaN(openingTime)) { // 24/7 opening
      this._markerIsOpened(dom, true);
    } else if (timetable[dayOfWeek].isOpen && currentTime >= openingTime && currentTime < closingTime) {
      // Check for day breaks
      if (timetable[dayOfWeek].break.hasBreak) {
        // In case of several day breaks
        if (timetable[dayOfWeek].break.several) {
          let isClosed = false;
          for (let i = 0; i < timetable[dayOfWeek].break.several.length; ++i) {
            const breakOpeningTime = parseInt(`${timetable[dayOfWeek].break.several[i].end.h}${timetable[dayOfWeek].break.several[i].end.m}`);
            const breakClosingTime = parseInt(`${timetable[dayOfWeek].break.several[i].start.h}${timetable[dayOfWeek].break.several[i].start.m}`);
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
          const breakOpeningTime = parseInt(`${timetable[dayOfWeek].break.end.h}${timetable[dayOfWeek].break.end.m}`);
          const breakClosingTime = parseInt(`${timetable[dayOfWeek].break.start.h}${timetable[dayOfWeek].break.start.m}`);
          if (currentTime >= breakClosingTime && currentTime < breakOpeningTime) {
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


  _markerIsOpened(dom, alwaysOpened) {
    dom.firstChild.innerHTML = `Ouvert`;
    if (alwaysOpened === true) {
      dom.lastChild.innerHTML = `Toujours ouvert`;
    } else {
      dom.lastChild.innerHTML = `Voir les horaires`;
    }
    dom.classList.add('opened');
  }


  _markerIsClosed(dom, alwaysClosed) {
    dom.firstChild.innerHTML = `Fermé`;
    if (alwaysClosed) {
      dom.lastChild.innerHTML = 'Toujours fermé';
    } else {
      dom.lastChild.innerHTML = `Voir les horaires`;
    }
    dom.classList.remove('opened');
  }


  _timetbaleModal(opts) {
    this.fetchModal('timetablemodal').then(dom => {
      // Updating modal header and info
      dom.querySelector('#mark-name').innerHTML = opts.name;
      dom.querySelector('#mark-address').innerHTML = `${opts.address}, ${opts.town}`;
      const distance = Utils.getDistanceBetweenCoords([opts.lat, opts.lng], [this._user.lat, this._user.lng]);
      dom.querySelector('#mark-distance').innerHTML = `Vous ètes à environ ${Utils.convertDistanceToString(distance)} de <b>${opts.name}</b> à vol d'oiseau`;
      const eta = Utils.buildDistanceETA(distance);
      dom.querySelector('#mark-eta').innerHTML = `Ce qui représente environ ${eta.car} en voiture, ou ${eta.walk} à pied.`;
      dom.querySelector('#mark-state').appendChild(this._markerOpenedState(opts.timetable));
      // Now update day by day
      const now = new Date();
      const dayOfWeek = now.getDay() - 1;
      for (let i = 0; i < opts.timetable.length; ++i) {
        const dayDom = dom.querySelector('#timetable').children[i];
        if (opts.timetable[i].isOpen === true) {
          const morning = dayDom.lastElementChild.firstElementChild;
          const afternoon = dayDom.lastElementChild.lastElementChild;
          if (opts.timetable[i].break && opts.timetable[i].break.hasBreak === true) {
            if (opts.timetable[i].break.several) {
              morning.innerHTML = `<p>${opts.timetable[i].open.h}:${opts.timetable[i].open.m} ‒ ${opts.timetable[i].break.several[0].start.h}:${opts.timetable[i].break.several[0].start.m}</p>`;
              morning.classList.add('filled'); // Morning
              morning.classList.add('splited'); // Morning
              for (let j = 0; j < opts.timetable[i].break.several.length - 1; ++j) {
                const div = document.createElement('DIV');
                div.innerHTML = `<p>${opts.timetable[i].break.several[j].end.h}:${opts.timetable[i].break.several[j].end.m} ‒ ${opts.timetable[i].break.several[j + 1].start.h}:${opts.timetable[i].break.several[j + 1].start.m}</p>`;
                div.classList.add('filled');
                div.classList.add('splited');
                div.style.borderRadius = '.5rem';
                div.style.justifyContent = 'center';
                dayDom.lastElementChild.insertBefore(div, dayDom.lastElementChild.lastElementChild);
              }

              afternoon.innerHTML = `<p>${opts.timetable[i].break.several[opts.timetable[i].break.several.length - 1].end.h}:${opts.timetable[i].break.several[opts.timetable[i].break.several.length - 1].end.m} ‒ ${opts.timetable[i].close.h}:${opts.timetable[i].close.m}</p>`;
              afternoon.classList.add('filled'); // Afternoon
              afternoon.classList.add('splited'); // Afternoon
            } else {
              morning.innerHTML = `<p>${opts.timetable[i].open.h}:${opts.timetable[i].open.m} ‒ ${opts.timetable[i].break.start.h}:${opts.timetable[i].break.start.m}</p>`;
              morning.classList.add('filled'); // Morning
              morning.classList.add('splited'); // Morning
              afternoon.innerHTML = `<p>${opts.timetable[i].break.end.h}:${opts.timetable[i].break.end.m} ‒ ${opts.timetable[i].close.h}:${opts.timetable[i].close.m}</p>`;
              afternoon.classList.add('filled'); // Afternoon
              afternoon.classList.add('splited'); // Afternoon
            }
          } else if (opts.timetable[i].open.h && opts.timetable[i].close.h) {
            morning.innerHTML = `<p>${opts.timetable[i].open.h}:${opts.timetable[i].open.m}</p>`;
            morning.classList.add('filled'); // Morning
            afternoon.innerHTML = `<p>${opts.timetable[i].close.h}:${opts.timetable[i].close.m}</p>`;
            afternoon.classList.add('filled'); // Afternoon
          } else {
            morning.innerHTML = `<p>00:00</p>`;
            morning.classList.add('filled'); // Morning
            afternoon.innerHTML = `<p>24:00</p>`;
            afternoon.classList.add('filled'); // Afternoon
          }
        } else {
          dayDom.lastElementChild.innerHTML = `<div class="closed"><p>Fermé</p></div>`;          
        }
        // Matching today's day
        if (i === dayOfWeek) {
          dayDom.classList.add('today');
        }
      }
      
      document.getElementById('modal-overlay').appendChild(dom);
      document.getElementById('modal-overlay').style.display = 'flex';
			setTimeout(() => document.getElementById('modal-overlay').style.opacity = 1, 50);
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

  fetchModal(url) {
    return new Promise(resolve => {
      fetch(`./assets/html/${url}.html`).then(data => {
        data.text().then(html => {
          resolve(document.createRange().createContextualFragment(html));
        });
      });
    });
  }


  closeModal(event, force) {
		if (force === true || event.target.id === 'modal-overlay' || event.target.id.indexOf('close') !== -1) {
      document.getElementById('modal-overlay').style.opacity = 0;
      setTimeout(() => {
        document.getElementById('modal-overlay').style.display = 'none';
        document.getElementById('modal-overlay').innerHTML = '';
      }, 300);
    }
  }


  get user() {
    return this._user;
  }

}


export default DourdannaisExplore;

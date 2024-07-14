import Utils from '../utils/Utils.js';


class MapFactory {


  constructor() {}


  static createMarkerPopup(opts) {
    const dom = document.createElement('DIV');
    const title = document.createElement('H3');
    const address = document.createElement('I');
    const town = document.createElement('I');
    const phone = document.createElement('A');
    const website = document.createElement('A');
    const info = document.createElement('P');
    const openWith = document.createElement('A');

    dom.classList.add('marker-popup');
    title.innerHTML = opts.mark.name;
    address.innerHTML = opts.mark.address;
    town.innerHTML = opts.mark.town;
    phone.href = `tel:${opts.mark.phone}`;
    phone.innerHTML = `<img src="./assets/images/icon/phone.svg">${opts.mark.phone}`;
    website.href = opts.mark.website;
    website.innerHTML = '<img src="./assets/images/icon/web.svg">Consulter le site';
    website.setAttribute('rel', 'noopener noreferrer');
    website.setAttribute('target', '_blank');
    info.innerHTML = opts.mark.info;
    openWith.href = `geo:${opts.mark.lat},${opts.mark.lng}`;
    openWith.innerHTML = '<img src="./assets/images/icon/pin.svg">Ouvrir dans le GPS';

    dom.appendChild(title);
    dom.appendChild(address);
    dom.appendChild(town);

    const button = this.markerOpenedState(opts.mark.timetable);
    dom.appendChild(button);

    let alwaysClosed = true;
    for (let i = 0; i < opts.mark.timetable.length; ++i) {
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


  static createStopMarkerPopup(opts) {
    const dom = document.createElement('DIV');
    const logo = document.createElement('IMG');
    const title = document.createElement('H3');
    const dir = document.createElement('H4');
    const address = document.createElement('I');
    const town = document.createElement('I');
    const website = document.createElement('A');
    const info = document.createElement('A');
    const dl = document.createElement('A');
    const openWith = document.createElement('A');

    dom.classList.add('marker-popup');
    logo.src = `./assets/images/transportation/${opts.data.name}.png`;
    title.innerHTML = opts.stop.name;
    if (opts.stop.terminus === true) {
      dir.innerHTML = `Terminus de la ligne`;
    } else {
      dir.innerHTML = `Direction ${opts.stop.dir}`;
    }
    address.innerHTML = opts.stop.address;
    town.innerHTML = opts.stop.town;
    website.href = opts.stop.website;
    website.innerHTML = '<img src="./assets/images/icon/web.svg">Consulter le site';
    website.setAttribute('rel', 'noopener noreferrer');
    website.setAttribute('target', '_blank');
    info.href = opts.stop.info;
    info.innerHTML = '<img src="./assets/images/icon/info.svg">Informations';
    info.setAttribute('rel', 'noopener noreferrer');
    info.setAttribute('target', '_blank');
    dl.href = `./assets/pdf/${opts.data.name}.pdf`;
    dl.innerHTML = '<img src="./assets/images/icon/download.svg">Télécharger les horaires';
    dl.setAttribute('rel', 'noopener noreferrer');
    dl.setAttribute('target', '_blank');
    openWith.href = `geo:${opts.stop.lat},${opts.stop.lng}`;
    openWith.innerHTML = '<img src="./assets/images/icon/pin.svg">Ouvrir dans le GPS';

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


  static markerOpenedState(timetable) {
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


  static checkTime(timetable, dom) {
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
      this.markerIsOpened(dom, true);
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
              this.markerIsClosed(dom);
              isClosed = true;
              break;
            }

            if (!isClosed) {
              this.markerIsOpened(dom);
            }
          }
        } else {
          const breakOpeningTime = parseInt(`${timetable[dayOfWeek].break.end.h}${timetable[dayOfWeek].break.end.m}`);
          const breakClosingTime = parseInt(`${timetable[dayOfWeek].break.start.h}${timetable[dayOfWeek].break.start.m}`);
          if (currentTime >= breakClosingTime && currentTime < breakOpeningTime) {
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


  static markerIsOpened(dom, alwaysOpened) {
    dom.firstChild.innerHTML = `Ouvert`;
    if (alwaysOpened === true) {
      dom.lastChild.innerHTML = `Toujours ouvert`;
    } else {
      dom.lastChild.innerHTML = `Voir les horaires`;
    }
    dom.classList.add('opened');
  }


  static markerIsClosed(dom, alwaysClosed) {
    dom.firstChild.innerHTML = `Fermé`;
    if (alwaysClosed) {
      dom.lastChild.innerHTML = 'Toujours fermé';
    } else {
      dom.lastChild.innerHTML = `Voir les horaires`;
    }
    dom.classList.remove('opened');
  }


  static timetableModal(opts, user) {
    Utils.fetchModal('timetablemodal').then(dom => {
      // Updating modal header and info
      dom.querySelector('#mark-name').innerHTML = opts.name;
      dom.querySelector('#mark-address').innerHTML = `${opts.address}, ${opts.town}`;
      const distance = Utils.getDistanceBetweenCoords([opts.lat, opts.lng], [user.lat, user.lng]);
      dom.querySelector('#mark-distance').innerHTML = `Vous ètes à environ ${Utils.convertDistanceToString(distance)} de <b>${opts.name}</b> à vol d'oiseau`;
      const eta = Utils.buildDistanceETA(distance);
      dom.querySelector('#mark-eta').innerHTML = `Ce qui représente environ ${eta.car} en voiture, ou ${eta.walk} à pied.`;
      dom.querySelector('#mark-state').appendChild(this.markerOpenedState(opts.timetable));
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


}

export default MapFactory;

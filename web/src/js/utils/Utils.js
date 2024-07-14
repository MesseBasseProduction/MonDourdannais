const getDistanceBetweenCoords = (from, to) => {
  // Return distance in meters
  const lon1 = (from[1] * Math.PI) / 180,
    lat1 = (from[0] * Math.PI) / 180,
    lon2 = (to[1] * Math.PI) / 180,
    lat2 = (to[0] * Math.PI) / 180;

  const deltaLat = lat2 - lat1;
  const deltaLon = lon2 - lon1;

  const a = Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon / 2), 2);
  const c = 2 * Math.asin(Math.sqrt(a));
  return c * 6371 * 1000;
};


const convertDistanceToString = distance => {
  if (distance > 1000) {
    distance = `${precisionRound(distance / 1000, 2)}km`;
  } else {
    distance = `${precisionRound(distance, 2)}m`;
  }
  return distance;
};


const buildDistanceETA = distance => {
  let carMinutes = 0;
  let carSeconds = 0;

  if (distance > 50000) {
    // Over 50km, we use average speed of 100kmh
    carMinutes = (distance / 100000) * 60;
  } else if (distance > 10000) {
    // Over 10km, we use average speed of 60km/h
    carMinutes = (distance / 60000) * 60;
  } else {
    // Under 10km we user average speed of 30km/h
    carMinutes = (distance / 30000) * 60;
  }

  carSeconds = carMinutes % 1; // Keep floating value for seconds computing
  carMinutes = Math.floor(carMinutes); // Remove floating value

  if (carMinutes > 60) {
    carMinutes = `${Math.floor(carMinutes / 60)}h ${carMinutes % 60}m`;
  } else {
    carMinutes = `${carMinutes}m`;
  }

  let walkMinutes = (distance / 5000) * 60;
  let walkSeconds = walkMinutes % 1;
  walkMinutes = Math.floor(walkMinutes); // Remove floating value

  if (walkMinutes > 60) {
    walkMinutes = `${Math.floor(walkMinutes / 60)}h ${walkMinutes % 60}m`;
  } else {
    walkMinutes = `${walkMinutes}m`;
  }  

  return {
    car: `${carMinutes} ${Math.floor(precisionRound((carSeconds / 100) * 60, 2) * 100)}s`,
    walk: `${walkMinutes} ${Math.floor(precisionRound((walkSeconds / 100) * 60, 2) * 100)}s`,
  };
};


const precisionRound = (value, precision) => {
  const multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
};


const fetchModal = (url) => {
  return new Promise(resolve => {
    fetch(`./assets/html/${url}.html`).then(data => {
      data.text().then(html => {
        resolve(document.createRange().createContextualFragment(html));
      });
    });
  });
};


const closeModal = (event, force) => {
  if (force === true || event.target.id === 'modal-overlay' || event.target.id.indexOf('close') !== -1) {
    document.getElementById('modal-overlay').style.opacity = 0;
    setTimeout(() => {
      document.getElementById('modal-overlay').style.display = 'none';
      document.getElementById('modal-overlay').innerHTML = '';
    }, 300);
  }
};


export default {
  CCDH_CENTER: {
    LAT: 48.53183906441962,
    LNG: 2.053756713867188
  },
  CCDH_CITIES: ['BRX', 'COR', 'DRD', 'LFR', 'LGR', 'RIC', 'ROV', 'SCD', 'SER', 'STC', 'VSG'],
  MAP_BOUNDS: window.L.latLngBounds(
    window.L.latLng(4.679400715963894, 1.7390606689453127),
    window.L.latLng(98.38439074151866, 2.343395996093750)
  ),
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
};

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const { public: { GOOGLE_MAPS_API_KEY } } = config

  let mapLoaded = false;
  let mapWaiting = null;

  addScript();
  nuxtApp.provide('maps', { showMap });

  function addScript() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&callback=initMap`;
    script.async = true;
    window.initMap = initMap;
    document.head.appendChild(script);
  }

  function initMap() {
    mapLoaded = true;
    if (mapWaiting) {
      const { canvas, lat, lng } = mapWaiting;
      renderMap(canvas, lat, lng);
      mapWaiting = null;
    }
  }

  function showMap(canvas, lat, lng) {
    if (mapLoaded) {
      renderMap(canvas, lat, lng);
    } else {
      mapWaiting = { canvas, lat, lng };
    }
  }

  function renderMap(canvas, lat, lng) {
    const mapOptions = {
      zoom: 10,
      center: new window.google.maps.LatLng(lat, lng),
      disableDefaultUI: true,
      zoomControl: true,
    };
    const map = new window.google.maps.Map(canvas, mapOptions);
    const position = new window.google.maps.LatLng(lat, lng);
    const marker = new window.google.maps.Marker({ position, map });
    marker.setMap(map);
    
  }
});
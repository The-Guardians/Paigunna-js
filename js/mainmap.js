import {findCurrentLocation} from './findmylocate';
import {seach} from './seachbox';
import {nearbyRes,nearbyHostel} from './nearby';

var map, infowindow;

export function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 13.7248936, lng: 100.4930262 },
    zoom: 17,
    disableDefaultUI: true,
    zoomControl: true
  });
findCurrentLocation(map);
seach(map);
return map;
}
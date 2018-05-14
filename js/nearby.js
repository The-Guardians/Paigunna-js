import { findCurrentLocation } from './findmylocate';
import { initMap } from './mainmap';

var radius = '2000';

export function nearbyHostel() {
    let map = initMap();
    let myCurrentLocate = findCurrentLocation(map);
    let request = {
        location: myCurrentLocate,
        radius: radius,
        type: ['store']
    };
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
}

export function nearbyTour() {
    let map = initMap();
    var myCurrentLocate = findCurrentLocation(map);
    var request = {
        location: myCurrentLocate,
        radius: radius,
        type: ['restaurant']
    };
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
}

export function nearbyRes() {
    let map = initMap();
    let myCurrentLocate = findCurrentLocation(map);
    let request = {
        location: myCurrentLocate,
        radius: radius,
        type: ['store']
    };
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
}

function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            var place = results[i];
            createMarker(results[i]);
        }
    }
}
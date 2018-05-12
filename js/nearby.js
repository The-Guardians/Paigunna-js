import { findCurrentLocation } from './findmylocate';
import { initMap } from './mainmap';

function nearbyRes() {
    let map = initMap();
    var pyrmont = findCurrentLocation(map);

    var request = {
        location: pyrmont,
        radius: '2000',
        type: ['restaurant']
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
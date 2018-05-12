import { findCurrentLocation } from './findmylocate';
import { initMap } from './mainmap';

export function nearbyTour() {
    let map = initMap();
    var pyrmont = findCurrentLocation(map);

    var request = {
        location: pyrmont,
        radius: '2000',
        type: ['zoo','shopping_mall','museum','movie_theater','aquarium','amusement_park','night_club'
    ,'park']
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
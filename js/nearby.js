// import { geoLocation } from './geoLocation';
// import { initMap } from './autocomplete';

// var radius = '2000';
// var service;
// var infowindow;

// export function nearbyHostel() {
//     let map = initMap();
//     let myCurrentLocate = geoLocation(map);
//     let request = {
//         location: myCurrentLocate,
//         radius: radius,
//         type: ['lodging']
//     };
//     service = new google.maps.places.PlacesService(map);
//     service.nearbySearch(request, callback);
// }

//  export function nearbyTour() {
//     let map = initMap();
//     var myCurrentLocate = geoLocation(map);
//     var request = {
//         location: myCurrentLocate,
//         radius: radius,
//         type: ['amusement_park','aquarium','art_gallery','movie_theater','museum','night_club','park'
//     ,'shopping_mall','zoo']
//     };
//     service = new google.maps.places.PlacesService(map);
//     service.nearbySearch(request, callback);
// }

// export function nearbyRes() {
//     let map = initMap();
//     let myCurrentLocate = geoLocation(map);
//     let request = {
//         location: myCurrentLocate,
//         radius: radius,
//         type: ['restaurant']
//     };
//     service = new google.maps.places.PlacesService(map);
//     service.nearbySearch(request, callback);
// }

// function callback(results, status) {
//     if (status == google.maps.places.PlacesServiceStatus.OK) {
//         for (var i = 0; i < results.length; i++) {
//             var place = results[i];
//             createMarker(results[i]);
//         }
//     }
// }
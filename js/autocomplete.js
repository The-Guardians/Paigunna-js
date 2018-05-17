var map, infowindow, pos;
var markers = [];
var mapOption = {
    center: { lat: 13.7248936, lng: 100.4930262 },
    zoom: 16,
    disableDefaultUI: true,
    zoomControl: true
};

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), mapOption);
    infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
    geoLocation(map);
    infowindow = searchBox(map, infowindow);

}

function getRoute() {
    setMapOnAll(null);
    var source = pos;
    var destination = document.getElementById("searchInput").value;
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer({
        draggable: true,
        map: map,
        panel: document.getElementById('right-panel')
    });
    directionsDisplay.addListener('directions_changed', function () {
        computeTotalDistance(directionsDisplay.getDirections());
    });
    displayRoute(source, destination, directionsService, directionsDisplay);
}

function geoLocation(map) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            var marker = new google.maps.Marker({
                position: pos,
                map: map,
                title: "Your Location"
            });
            markers.push(marker);
            console.log(pos);
            infoWindow.open(map);
            map.setCenter(pos);
        }, function () {
            // handleLocationError(true, infoWindow, map.getCenter());
            infoWindow.setPosition(map.getCenter());
            infoWindow.setContent(true ?
                'Error: The Geolocation service failed.' :
                'Error: Your browser doesn\'t support geolocation.');
            infoWindow.open(map);
        });
    }
    else {
        // Browser doesn't support Geolocation
        // handleLocationError(false, infoWindow, map.getCenter());
        infoWindow.setPosition(map.getCenter());
        infoWindow.setContent(false ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
    }
}

function searchBox(map, infowindow) {
    var input = document.getElementById('searchInput');
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);
    infowindow = new google.maps.InfoWindow();
    var marker = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29)
    });
    markers.push(marker);
    autocomplete.addListener('place_changed', function () {
        infowindow.close();
        marker.setVisible(false);
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            window.alert("Autocomplete's returned place contains no geometry");
            return;
        }
        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        }
        else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
        }
        marker.setIcon(({
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(35, 35)
        }));
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);
        var address = '';
        if (place.address_components) {
            address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                (place.address_components[1] && place.address_components[1].short_name || ''),
                (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
        }
        infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
        infowindow.open(map, marker);
        //Location details
        for (var i = 0; i < place.address_components.length; i++) {
            if (place.address_components[i].types[0] == 'postal_code') {
                document.getElementById('postal_code').innerHTML = place.address_components[i].long_name;
            }
            if (place.address_components[i].types[0] == 'country') {
                document.getElementById('country').innerHTML = place.address_components[i].long_name;
            }
        }
        document.getElementById('location').innerHTML = place.formatted_address;
        document.getElementById('lat').innerHTML = place.geometry.location.lat();
        document.getElementById('lon').innerHTML = place.geometry.location.lng();
    });
    return infowindow;
}

var radius = '3000';
var service;

function nearbyHostel() {
    let myCurrentLocate = new google.maps.LatLng(pos);
    let request = {
        location: myCurrentLocate,
        radius: radius,
        type: ['lodging']
    };
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
}

function nearbyTourShop() {
    var myCurrentLocate = new google.maps.LatLng(pos);
    var request = {
        location: myCurrentLocate,
        radius: radius,
        type: ['shopping_mall']
    };
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
}
function nearbyTourPark() {
    var myCurrentLocate = new google.maps.LatLng(pos);
    var request = {
        location: myCurrentLocate,
        radius: radius,
        type: ['park']
    };
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
}
function nearbyTourMovie() {
    var myCurrentLocate = new google.maps.LatLng(pos);
    var request = {
        location: myCurrentLocate,
        radius: radius,
        type: ['movie_theater']
    };
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
}

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
}
function nearbyTour() {
    var myCurrentLocate = new google.maps.LatLng(pos);
    var request = {
        location: myCurrentLocate,
        radius: radius,
        type: ['amusement_park']
    };
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
}


function nearbyRes() {
    let myCurrentLocate = new google.maps.LatLng(pos);
    let request = {
        location: myCurrentLocate,
        radius: radius,
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

function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });
    markers.push(marker);
    google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
}
//
function displayRoute(origin, destination, service, display) {
    service.route({
        origin: origin,
        destination: destination,
        //   waypoints: [{location: 'Adelaide, SA'}, {location: 'Broken Hill, NSW'}],
        travelMode: 'DRIVING',
        avoidTolls: true
    },
        function (response, status) {
            if (status === 'OK') {
                display.setDirections(response);
            } else {
                alert('Could not display directions due to: ' + status);
            }
        });
}

function computeTotalDistance(result) {
    var total = 0;
    var myroute = result.routes[0];
    for (var i = 0; i < myroute.legs.length; i++) {
        total += myroute.legs[i].distance.value;
    }
    total = total / 1000;
    document.getElementById('total').innerHTML = total + ' km';
}

function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }

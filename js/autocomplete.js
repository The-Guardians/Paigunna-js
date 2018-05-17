var map, infowindow, pos;
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

var radius = '2000';
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

function nearbyTour() {
    var myCurrentLocate = new google.maps.LatLng(pos);
    var request = {
        location: myCurrentLocate,
        radius: radius,
        type: ['movie_theater','shopping_mall']
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

    google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
}

/*------*/

var source, destination;
var directionsDisplay;
var directionsService = new google.maps.DirectionsService;
google.maps.event.addDomListener(window, 'load', function () {
    new google.maps.places.SearchBox(document.getElementById('searchInput'));
    directionsDisplay = new google.maps.DirectionsRenderer({ 'draggable': true });
});
 
function GetRoute() {
    // directionsDisplay.setMap(map);
    //*********DIRECTIONS AND ROUTE**********************//
    source = pos;
    destination = document.getElementById("searchInput").value;
    console.log(source);
    console.log(destination);
 
    var request = {
        origin: source,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING
    };

    google.maps.DirectionsService.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        }
    });

    // directionsService.route(request, function (response, status) {
    //     if (status == google.maps.DirectionsStatus.OK) {
    //         directionsDisplay.setDirections(response);
    //     }
    // });
 
    //*********DISTANCE AND DURATION**********************//
    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix({
        origins: [source],
        destinations: [destination],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
    }, function (response, status) {
        if (status == google.maps.DistanceMatrixStatus.OK && response.rows[0].elements[0].status != "ZERO_RESULTS") {
            var distance = response.rows[0].elements[0].distance.text;
            var duration = response.rows[0].elements[0].duration.text;
            var dvDistance = document.getElementById("dvDistance");
           dvDistance.innerHTML = "";
            dvDistance.innerHTML += "Distance: " + distance + "<br />";
            dvDistance.innerHTML += "Duration:" + duration;
 
        } else {
            alert("Unable to find the distance via road.");
        }
    });
}
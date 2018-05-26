var map, infowindow, pos, panel, source, destination, directionsService, directionsDisplay,
    radius = '4000', service, desName, type, rate, pricemotor, amount, totalDistance, placeName;
var markers = [];
var mapOption = {
    center: { lat: 13.7248936, lng: 100.4930262 },
    zoom: 16,
    disableDefaultUI: true,
    zoomControl: true
};
var test1,test2;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), mapOption);
    infoWindow = new google.maps.InfoWindow;
    // Try HTML5 geolocation.
    geoLocation(map);
    infowindow = searchBox(map, infowindow);
    if (panel == "") {
        document.getElementById('select').disabled = true;
    }
}

function getRoute() {

    if (markers != null) {
        setMapOnAll(null);
    }
    if (directionsDisplay != null) {
        directionsDisplay.setMap(null);
        panel = document.getElementById('route-panel').innerHTML = "";
        document.getElementById('itemPay').style.display = 'none';
        document.getElementById('price').style.display = 'none';
        document.getElementById('call').style.display = 'none';
    }
    panel = document.getElementById('route-panel');
    source = pos;
    destination = document.getElementById("searchInput").value;
    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer({
        draggable: true,
        map: map,
        panel: panel
    });
    directionsDisplay.addListener('directions_changed', function () {
        computeTotalDistance(directionsDisplay.getDirections());
    });
    displayRoute(source, destination, directionsService, directionsDisplay);
    if (panel != "") {
        document.getElementById('select').disabled = false;
    }
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
                title: "Your Location",
                icon: "https://www.picz.in.th/images/2018/05/23/zDdx4a.png"
            });
            marker.setAnimation(google.maps.Animation.BOUNCE);
            markers.push(marker);
            infoWindow.open(map);
            map.setCenter(pos);
            console.log('Current location => lat : ' + position.coords.latitude + ' lng : ' + position.coords.longitude)
            
            
            
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
            if (directionsDisplay == null) {
                document.getElementById('select').disabled = true;
            }
            getRoute();
            desName = input.value;
            placeName = place.name;
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
        infowindow.setContent('<div><strong>' + place.name + '</strong></div>');
        // infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
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

function nearbyHostel() {
    document.getElementById('select').disabled = true;
    setMapOnAll(null);
    geoLocation(map);
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
    document.getElementById('select').disabled = true;
    setMapOnAll(null);
    geoLocation(map);
    var myCurrentLocate = new google.maps.LatLng(pos);
    var requestShop = {
        location: myCurrentLocate,
        radius: radius,
        type: ['shopping_mall']
    };
    var requestPark = {
        location: myCurrentLocate,
        radius: radius,
        type: ['park']
    };
    var requestMovie = {
        location: myCurrentLocate,
        radius: radius,
        type: ['movie_theater']
    };
    var requestNight = {
        location: myCurrentLocate,
        radius: radius,
        type: ['night_club']
    };
    var requestAmuusement = {
        location: myCurrentLocate,
        radius: radius,
        type: ['amusement_park']
    };
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(requestShop, callback);
    service.nearbySearch(requestPark, callback);
    service.nearbySearch(requestMovie, callback);
    service.nearbySearch(requestNight, callback);
    service.nearbySearch(requestAmuusement, callback);
}

function nearbyRes() {
    document.getElementById('select').disabled = true;
    setMapOnAll(null);
    geoLocation(map);
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

    marker.setAnimation(google.maps.Animation.DROP);
    if (directionsDisplay != null) {
        directionsDisplay.setMap(null);
        panel = document.getElementById('route-panel').innerHTML = "";
        document.getElementById('itemPay').style.display = 'none';
        document.getElementById('price').style.display = 'none';
        document.getElementById('call').style.display = 'none';
    }
    marker.addListener('click', function () {
        marker.setAnimation(google.maps.Animation.BOUNCE);
        var markerPos = marker.getPosition();
        console.log('Locatoin on click => lat : ' + markerPos.lat() + ' lng : ' + markerPos.lng());
        getRouteSearch(markerPos, place);
        placeName = place.name;
    });

    markers.push(marker);
    google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
}
function getRouteSearch(markerPos, place) {
    if (markers != null) {
        setMapOnAll(null);
    }
    panel = document.getElementById('route-panel');
    source = pos;
    destination = new google.maps.LatLng(markerPos.lat(), markerPos.lng());
    desName = place.name;
    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer({
        draggable: true,
        map: map,
        panel: panel
    });
    directionsDisplay.addListener('directions_changed', function () {
        computeTotalDistance(directionsDisplay.getDirections());
    });
    displayRoute(source, destination, directionsService, directionsDisplay);
    if (panel != "") {
        document.getElementById('select').disabled = false;
    }
}

//  route detail
function displayRoute(origin, destination, service, display) {
    service.route({
        origin: origin,
        destination: destination,
        travelMode: 'DRIVING',
        avoidTolls: true
    },
        function (response, status) {
            var index = 0;
            if (status === 'OK') {
                var route = response.routes[0];
                var km, kmSplit;
                display.setDirections(response);
                km = route.legs[0].distance.text;
                kmSplit = km.split(" ");
                totalDistance = kmSplit[0];
            } else {
                alert('Could not display directions due to: ' + status);
            }
        });
}

function computeTotalDistance(result) {
    var myroute = result.routes[0];
    for (var i = 0; i < myroute.legs.length; i++) {
        total += myroute.legs[i].distance.value;
    }
    total = total / 1000;
}

function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

function setTypeMotor() {
    type = "motor";
    if (totalDistance <= 1.0) {
        pricemotor = 10;
    } else if (totalDistance <= 1.3) {
        pricemotor = 15;
    } else if (totalDistance <= 1.6) {
        pricemotor = 20;
    } else if (totalDistance <= 2.0) {
        pricemotor = 25;
    } else if (totalDistance <= 3.0) {
        pricemotor = 30;
    } else if (totalDistance <= 4.0) {
        pricemotor = 35;
    } else if (totalDistance <= 5.0) {
        pricemotor = 40;
    } else if (totalDistance > 5.0) {
        rate = 10;
    }
    calPrice(0, rate, type);
}

function setTypeTaxi() {
    type = "taxi";
    if (totalDistance <= 1.0) {
        rate = 0;
    } else if (totalDistance > 1.0 && totalDistance <= 10.0) {
        rate = 5.5;
    } else if (totalDistance > 10.0 && totalDistance <= 20.0) {
        rate = 6.5;
    } else if (totalDistance > 20.0 && totalDistance <= 40.0) {
        rate = 7.5;
    } else if (totalDistance > 40.0 && totalDistance <= 60.0) {
        rate = 8.0;
    } else if (totalDistance > 60.0 && totalDistance <= 80.0) {
        rate = 9.0;
    } else if (totalDistance > 80.0) {
        rate = 10.5;
    }
    calPrice(35, rate, type);
}

function calPrice(start, rate, type) {
    var price1, price2, totalAmount, textTotalAmount;
    price1 = document.getElementById('price1');
    price2 = document.getElementById('price2');
    textTotalAmount = document.getElementById('totalAmount');
    if (price1 != "") {
        price1.innerHTML = "";
    }
    if (price2 != "") {
        price2.innerHTML = "";
    }
    if (textTotalAmount != "") {
        textTotalAmount.innerHTML = "";
    }
    if (type == "motor" && totalDistance <= 5.0) {
        amount = pricemotor;
    } else {
        amount = ((totalDistance * rate) + start);
    }
    totalAmount = (((0.0365) * amount) + amount).toFixed(2);
    price1.innerHTML = 'Price : ' + amount + ' &#3647';
    price2.innerHTML = 'Price : ' + amount + ' &#3647';
    textTotalAmount.innerHTML = 'Price(' + amount + ' &#3647) + Charge(3.65%)' + ' = ' + totalAmount + ' &#3647';
    document.getElementById('total').innerHTML = totalDistance + ' km';
    document.getElementById('totalTravel').innerHTML = 'item #1 (  ' + totalDistance + ' km)';
    document.getElementById('destination').innerHTML = desName;
    document.getElementById('myLocation').innerHTML = 'Price : '+ amount +' &#3647' + ' ,Distance : ' + totalDistance +' km' + ' ,Destination : '+ placeName;
}

var map, infowindow;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 13.7248936, lng: 100.4930262},
          zoom: 17,
          disableDefaultUI: true,
          zoomControl: true
        });
        infoWindow = new google.maps.InfoWindow;

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            var marker = new google.maps.Marker(
                {
            position: pos,
            map: map,
            title: "My Location"
        });
            console.log(pos);
            infoWindow.open(map);
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
        
      }
    //   export function getmap() {
    //     initMap();
    //   }

       
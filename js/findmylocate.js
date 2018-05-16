
export function findCurrentLocation(map) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
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
      map.setCenter(pos);

      return pos;
    }, function () {

    });
  }
}

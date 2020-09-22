
          
var mapObj = {

     _currLat:37.5569954,
     _currLng:126.9785898,

     _marker : {},


     init : function(mapId, lat, lng, zoom)
     {
          var _map = new google.maps.Map(document.getElementById(mapId), {
               center: {
                    lat: lat,
                    lng: lng
                    },
               zoom: zoom
          });

          var infoWindow;
          infoWindow = new google.maps.InfoWindow;
          
         // Try HTML5 geolocation.
          if (navigator.geolocation) {
               navigator.geolocation.getCurrentPosition(function(position) {
                    var pos = {
                         lat: position.coords.latitude,
                         lng: position.coords.longitude
                    };
                    //console.log(pos);
                    document.getElementById("currLocation").innerHTML = pos.lat +"," + pos.lng;

                    //infoWindow.setPosition(pos);
                    infoWindow.setContent('Location found.');
                    infoWindow.open(_map);
                    _map.setCenter(pos);
                    mapObj.addMarker(_map);
                    }, function() {
                    //handleLocationError(true, infoWindow, mapObj.getCenter());
               });
          } else {
               // Browser doesn't support Geolocation
               //handleLocationError(false, infoWindow, mapObj.getCenter());
          }
          
          google.maps.event.addListener(_map, 'zoom_changed', function() {
               console.log('zoom_changed');
               
               console.log(_map.getCenter().lat());
               console.log(_map.getCenter().lng());
		});

          google.maps.event.addListener(_map, 'dragend', function() {
               console.log('dragend');
               
               var lat =_map.getCenter().lat();
               var lng =_map.getCenter().lat();
               console.log(lat);
               console.log(lng);

               mapObj.deleteMarker();
               mapObj.addMarker(_map);
               document.getElementById("currLocation").innerHTML = lat +"," + lng;
		});
     },

     addMarker: function(map){
          mapObj._marker = new google.maps.Marker({
               position:map.getCenter(),
               });
             
               mapObj._marker.setMap(map);
     },

     deleteMarker: function()
     {
          mapObj._marker.setMap(null);
     }
};




 function handleLocationError(browserHasGeolocation, infoWindow, pos) {
   infoWindow.setPosition(pos);
   infoWindow.setContent(browserHasGeolocation ?
                         'Error: The Geolocation service failed.' :
                         'Error: Your browser doesn\'t support geolocation.');
   infoWindow.open(map);
 }


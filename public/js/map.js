

var mapObj = {

     _currLat:37.5569954,
     _currLng:126.9785898,

     init : function(mapId, lat, lng, zoom)
     {
          mapObj = new google.maps.Map(document.getElementById(mapId), {
               center: {
                    lat: lat,
                    lng: lng
                    },
               zoom: zoom
          });
     }

};



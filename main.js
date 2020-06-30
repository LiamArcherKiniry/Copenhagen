
var coffeeShops = [
{
	latitude:55.6796409,
	longitude:12.5839917,
	title:"Llama"
},

{
	latitude:55.6692255,
	longitude:12.5587692,
	title:"Bio Mio"
},

{
	latitude:55.6727069,
	longitude:12.5531287,
	title:"Madklubben Vesterbro"
},

{
	latitude:55.6691696,
	longitude:12.5586246,
	title:"Paté Paté"
},

{
	latitude:55.6730335,
	longitude:12.5599346,
	title:"Høst"
},

{
	latitude:55.6836899,
	longitude:12.5697655,
	title:"Torvehallerne"
},

{
	latitude:55.6937104,
	longitude:12.6093596,
	title:"Reffen"
},

{
	latitude:55.6828259,
	longitude:12.6104808,
	title:"Noma"
}

];
  /*creates info window*/
var infowindow;
      function makeInfoWindow(map,position,msg){
      // Close old InfoWindow if it exists
      if(infowindow) infowindow.close();
      // Make a new InfoWindow
      infowindow = new google.maps.InfoWindow({
        map: map,
        position: position,
        content: "<b>" + msg + "</b>"
      });
    }
  /*function to add marker to map*/
    function addMarker(latitude,longitude,title,map) {
        var position = {lat:latitude,lng:longitude};
        var marker = new google.maps.Marker({
            position: position, 
            map:map,
            icon:  {
                      path: google.maps.SymbolPath.CIRCLE,
                      scale: 5,
                      fillColor:"#d84f33",
                      fillOpacity: 1,
                      strokeWeight: 1,
                      strokeColor: "#ffffff"
                    },
            html:"<h3>"+ title +"</h3>"
        });
        marker.setTitle(title);
        // Add a listener for the click event
        google.maps.event.addListener(marker, 'click', function(e){
          makeInfoWindow(map, this.position, title);
        });
    }    
  
    function initMap() {
    
      var copenhagen = new google.maps.LatLng(55.6760968 , 12.5683372),
          pointToMoveTo, 
          first = true,
          curMarker = new google.maps.Marker({}),
          $el;
      
      var myOptions = {
          zoom: 12,
          center: copenhagen,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        /*icon settings*/
      var icon = {
            url: "images/marker.png", // url
            scaledSize: new google.maps.Size(50, 50), // scaled size
            origin: new google.maps.Point(0,0), // origin
            anchor: new google.maps.Point(0, 0) // anchor
        };
      
      var map = new google.maps.Map($("#map_canvas")[0], myOptions);
    /*loop through json and add markers*/
            for(var i=0; i< coffeeShops.length; i++) {
                         addMarker(coffeeShops[i].latitude, coffeeShops[i].longitude, coffeeShops[i].title, map);
                        console.log(coffeeShops[i].title);


                }
      /*when restaurant name is clicked move point to its location*/
      $("#locations li").click(function() {
      
        $el = $(this);
                
        if (!$el.hasClass("focus")) {
        
          $("#locations li").removeClass("focus");
          $el.addClass("focus");
        
          if (!first) { 
            
            // Clear current marker
            curMarker.setMap(); 
            
            // Set zoom back to copenhagen level
            // map.setZoom(10);
          }
          
          // Move (pan) map to new location
          pointToMoveTo = new google.maps.LatLng($el.attr("data-geo-lat"), $el.attr("data-geo-long"));
          map.panTo(pointToMoveTo);
          
          // Add new marker
          curMarker = new google.maps.Marker({
              position: pointToMoveTo,
              map: map
          });
            
          
          // On click, zoom map
          google.maps.event.addListener(curMarker, 'click', function() {
             map.setZoom(14);
          });
          
          // Fill more info area
          $("#more-info")
            .find("h2")
              .html($el.find("h3").html())
              .end()
            .find("div")
              .html($el.find(".longdesc").html())
                .end()
            .find("li")
                .html($el.find(".tag").html());
            
            
    
          // No longer the first time through (re: marker clearing)        
          first = false; 
        }

      });
      
      $("#locations li:first").trigger("click");
              
    };
      
      
      $(document).ready(function() {
          initMap();
            setTimeout(function() {
                $("#main").removeClass("is-loading");
            }, 100)
        });





var alldata = [
{
	latitude:55.6796409,
	longitude:12.5839917,
	title:"Llama",
    type: "Restaurant",
    color: "#fff70f",
},
{
	latitude:55.6692255,
	longitude:12.5587692,
	title:"Bio Mio",
    type: "Restaurant",
    color: "#fff70f"
},

{
	latitude:55.6727069,
	longitude:12.5531287,
	title:"Madklubben Vesterbro",
    type: "Restaurant",
    color: "#fff70f"
},

{
	latitude:55.6691696,
	longitude:12.5586246,
	title:"Paté Paté",
    type: "Restaurant",
    color: "#fff70f"
},

{
	latitude:55.6730335,
	longitude:12.5599346,
	title:"Høst",
    type: "Restaurant",
    color: "#fff70f"
},

{
	latitude:55.6836899,
	longitude:12.5697655,
	title:"Torvehallerne",
    type: "Restaurant",
    color: "#fff70f"
},

{
	latitude:55.6937104,
	longitude:12.6093596,
	title:"Reffen",
    type: "Restaurant",
    color: "#fff70f"
},

{
	latitude:55.6828259,
	longitude:12.6104808,
	title:"Noma",
    type: "Restaurant",
    color: "#fff70f"
},

{
	latitude:55.6736841,
	longitude:12.5681471,
	title:"Tivoli Gardens",
    type: "place",
    color: "#ff430f"
},
{
	latitude:55.6865563,
	longitude:55.6865563,
	title:"Design Museum Danmark",
    type: "place",
    color: "#ff430f"
},
{
	latitude:55.6733821,
	longitude:12.596705,
	title:"Christiania",
    type: "place",
    color: "#ff430f"
},
{
	latitude:55.6794587,
	longitude:12.5862154,
	title:"The Royal Danish Theatre",
    type: "place",
    color: "#ff430f"
},
{
	latitude:55.6858274,
	longitude:12.5772697,
	title:"Rosenborg Castle",
    type: "place",
    color: "#ff430f"
},
{
	latitude:55.9692178,
	longitude:12.5423368,
	title:"Louisiana Museum of Modern Art",
    type: "excursion",
    color: "#0fb7ff"
},
{
	latitude:56.0390142,
	longitude:12.6211551,
	title:"Kronborg Castle",
    type: "excursion",
    color: "#0fb7ff"
},
{
	latitude:55.604981,
	longitude:13.003822,
	title:"Malmö",
    type: "excursion",
    color: "#0fb7ff"
},

];      
/*
open menu
*/     
    $('#toggle').click(function() {
       $(this).toggleClass('active');
       $('#overlay').toggleClass('open');
      }); 
    
/*map js */
    
        var infowindow;
        var markersArray = [];		// create array to hold markers
 
	var selectedMarkers =[];
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
  /*adds marker with information about type color and map so it can be selected later*/
    function addMarker(latitude,longitude,title,atype,color, map) {
        var position = {lat:latitude,lng:longitude};
        var marker = new google.maps.Marker({
            position: position, 
            map:map,
            type: atype,
            icon:  {
                      path: google.maps.SymbolPath.CIRCLE,
                      scale: 7,
                      fillColor:color,
                      fillOpacity: 1,
                      strokeWeight: 1,
                      strokeColor: color,
                    },
            html:"<h3>"+ title +"</h3>"
        });
        marker.setTitle(title);
        // Add a listener for the click event
        markersArray.push(marker);
	    selectedMarkers = markersArray.slice(0,125);
        google.maps.event.addListener(marker, 'click', function(e){
          makeInfoWindow(map, this.position, title);
             map.setZoom(14);
        });
    }    
  
    function initMap(){
    
      var copenhagen = new google.maps.LatLng(55.6760968 , 12.5683372),
          pointToMoveTo, 
          first = true,
          curMarker = new google.maps.Marker({}),
          $el;
      
      var myOptions = {
          zoom: 9,
          center: copenhagen,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
      
      var icon = {
            url: "images/marker.png", // url
            scaledSize: new google.maps.Size(50, 50), // scaled size
            origin: new google.maps.Point(0,0), // origin
            anchor: new google.maps.Point(0, 0) // anchor
        };
      
      var map = new google.maps.Map($("#all-map")[0], myOptions);
    
            for(var i=0; i< alldata.length; i++) {
                         addMarker(alldata[i].latitude, alldata[i].longitude,alldata[i].title,alldata[i].type,alldata[i].color, map);
                        console.log(alldata[i].title);


                }
    };
    
  /*filter data*/
        function filterData(typea) {
		instanceMarkers = [];
              /*loop through array of markers and hide those with a different type than was selected*/
            for(var i=0; i< markersArray.length; i++) {
                if (markersArray[i].type != typea){
                    markersArray[i].setIcon({
                        path: google.maps.SymbolPath.CIRCLE,
                        scale: markersArray[i].icon.scale,
                        fillColor: markersArray[i].icon.fillColor,
                        fillOpacity: 0.01,
                        strokeWeight: 0.01,
                    })} else {
                    markersArray[i].setIcon({
                        path: google.maps.SymbolPath.CIRCLE,
                        scale: markersArray[i].icon.scale,
                        fillColor: markersArray[i].icon.fillColor,
                        fillOpacity: 1,
                        strokeWeight: 1,
                        strokeColor: "#333333",
                    })
			
                }
            
        }}
     /*show all the markers*/
        function filterAll() {
		instanceMarkers = [];
            for(var i=0; i< markersArray.length; i++) {
            /*set the markers back to their original styline*/
                    markersArray[i].setIcon({
                        path: google.maps.SymbolPath.CIRCLE,
                        scale: markersArray[i].icon.scale,
                        fillColor: markersArray[i].icon.fillColor,
                        fillOpacity: 0.8,
                        strokeWeight: 1,
                    })
            
        }}

      $(document).ready(function() {
          initMap();

        });
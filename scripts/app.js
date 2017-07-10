// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";
var map;
$(document).ready(function() {
  console.log("Let's get coding!");
  // CODE IN HERE!
createmap();

  $.ajax({
    method: "GET",
    url: weekly_quakes_endpoint,
    dataType: "json",
    success: onSuccess
  });

  //
  // $('#map').append(function onSuccess(responseData)){
  //   return responseData;
  // })
});

function onSuccess(responseData){
  

  let quakeFeatures = responseData.features;

  console.log(responseData);
  console.log(quakeFeatures[0].properties.title);
  quakeFeatures.forEach(function(quakeFeaturesData){
    var featuresTitle = quakeFeaturesData.properties.title;
    var quakeHoursAgo = Math.round((Date.now() - quakeFeaturesData.properties.time) / (1000*60*60));
$("#info").append(`<p> ${featuresTitle} (${quakeHoursAgo} hours ago) </p> <hr>`);
var longitude = quakeFeaturesData.geometry.coordinates[0];
var lattitude = quakeFeaturesData.geometry.coordinates[1];
new google.maps.Marker({
  position: new google.maps.LatLng(lattitude, longitude),
  map: map,
  title: featuresTitle
});

  });
}


function createmap(){
  map = new google.maps.Map(document.getElementById("map"),{
    center: {lat: 37.7749, lng: -122.4194},
    zoom: 1
  });
}

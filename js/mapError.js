// Handle Error if Google Maps fails to load
function errorLoadingMap(){
	console.log("IM ERRROROROING");
  var app = document.getElementById('map');
  map.innerHTML = '<div class="error">'+ '<p>Unfortunately we were not able to load the map. Please try again later.</p><img src="img/logo-3.jpg"></div>';
}
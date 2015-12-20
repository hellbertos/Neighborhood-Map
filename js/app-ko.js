/**
 ** Fogbelt Neighborhood Map App with Knockout - Udacity FEND Lesson 5
**/


window.onload = function() {
	// Set Up Data Model: The places to show on the map

	// Shorten Icon paths w/ a variable
	var eyeIcon = "img/icon-eye.png"; // Point of Interest
	var dineIcon = "img/icon-dine.png";
	var surfIcon = "img/icon-surf.png";
	var drinkIcon = "img/icon-drink.png";

	// Add all the places in their own object
	var localCoords = [
		{title: 'Sutro Baths',
		latLng: {
			lat: 37.780109,
		 	lng: -122.513965
		 },
		 icon: eyeIcon,
		 animation: null,
		 description: 'The ruins of the former salt water fed bath house from the turn of the former century.'
		},
		{title: 'Wise Surfboards',
		latLng: {
			lat: 37.772765,
		 	lng: -122.510714
		 },
		 icon: surfIcon,
		 animation: null,
		 description: 'The oldest surviving surf shop in the city with views of the first peaks regularly surfed in San Francisco.'
		},
		{title: 'The Beach Chalet',
		latLng: {
			lat: 37.769517,
		 	lng: -122.510263
		 },
		 icon: dineIcon,
		 animation: null,
		 description: 'Come for the tasty food, stay for the tasty craft beers.'
		},
		{title: 'La Playa Taqueria',
		latLng: {
			lat: 37.752834,
		 	lng: -122.504720
		 },
		 icon: dineIcon,
		 animation: null,
		 description: 'Argueably the best breakfast burritos in the fogbelt.'
		},
		{title: 'Ocean Beach',
		latLng: {
			lat: 37.765166,
		 	lng: -122.512592
		 },
		 icon: eyeIcon,
		 animation: null,
		 description: 'Part of the Federal Parks Service, Ocean Beach is an awesome, natural experience of beach and ocean.'
		},
		{title: 'Aqua Surf Shop',
		latLng: {
			lat: 37.760314,
		 	lng: -122.503595
		 },
		 icon: surfIcon,
		 animation: null,
		 description: 'Locally owned and operated. Staffed with top-quality gear and experts to help you make the right purchase or rental.'
		},
		{title: 'The Rip Tide Lounge',
		latLng: {
			lat: 37.741580,
		 	lng: -122.505349
		 },
		 icon: drinkIcon,
		 animation: null,
		 description: 'The local place to grab a cold drink after a day Ocean Beach.'
		},
		{title: 'San Francisco Zoo',
		latLng: {
			lat: 37.733201,
		 	lng: -122.502764
		 },
		 icon: eyeIcon,
		 animation: null,
		 description: 'The San Francisco Zoo is a world renowned exibit of live animals, conservation effort and research facility.'
		}
	];

	// Constructor to create new markers
	var Marker = function (latLng, title, icon, map) {
	    return new google.maps.Marker({
	      position: latLng,
	      map: map,
	      icon: icon,
	      title: title
	    });


	 };



	//Set up the view model
	var ViewModel = function() {
		var modelCxt = this;

		modelCxt.placeList = ko.observableArray();

		// Initialize Google Map with correct coordinates and options
		var mapCanvas = document.getElementById('map');
		// Add Latitude and Longitude options and zoom level
		var mapOptions = {
				center: new google.maps.LatLng(37.770191, -122.502345),
				zoom: 14,
				mapTypeId: google.maps.MapTypeId.ROADMAP
		}
		// Load up the map to its container element
		modelCxt.map = new google.maps.Map(mapCanvas, mapOptions);

		// Create global infoWindow object which will be reused for each location as per Google Maps Docs
		modelCxt.infoWindow = new google.maps.InfoWindow();


		//Create the markers
		for(var i = 0; i < localCoords.length; i++ ) {
			locale = localCoords[i];
			//console.log("Lat ling is: "+locale.title)
			modelCxt.placeList.push( new Marker(locale.latLng, locale.title, locale.icon, modelCxt.map) );
		}
		//console.info("OBsAry item is "+modelCtx.placeList()[0].title);


		//TEST Method
		modelCxt.resetMarker = function(marker) {
				console.info("YAAAY my naem is "+this.title);

				this.animation = 'BOUNCE';
				console.log("Animate: "+this.animation+"\n"+this.title);
				//setUpMarkers();

			}

	} // END VIEW MODEL


	ko.applyBindings(new ViewModel());
}
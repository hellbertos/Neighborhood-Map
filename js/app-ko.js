/**
 ** Fogbelt Neighborhood Map App with Knockout - Udacity FEND Lesson 5
**/

/**
	ADD CUSTOM BINDING HANDLER -- Example

	ko.bindingHandlers.showOrNo = {
    init: function(element, valueAccessor) {
        // Start visible/invisible according to initial value
        var shouldDisplay = valueAccessor();
        $(element).toggle(shouldDisplay);
    },
    update: function(element, valueAccessor) {
        // On update, fade in/out
        var shouldDisplay = valueAccessor();
        shouldDisplay ? $(element).fadeIn() : $(element).fadeOut();
    }
};
/************************************************/


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
		{title: 'La Playa Taqueria',
		latLng: {
			lat: 37.752834,
		 	lng: -122.504720
		 },
		 icon: dineIcon,
		 animation: null,
		 description: 'Argueably the best breakfast burritos in the fogbelt.'
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
	var Marker = function (latLng, title, icon, description, map) {
	    return new google.maps.Marker({
	      position: latLng,
	      map: map,
	      icon: icon,
	      title: title,
	      description: description
	    });

	 };



	//Set up the view model
	var ViewModel = function() {
		var modelCxt = this;

		modelCxt.placeList = ko.observableArray();

		// Set up in failed attempt to bind css class to a boolean
		modelCxt.activeClass = ko.observable('true');

		// Initialize Google Map with correct coordinates and options
		var mapCanvas = document.getElementById('map');
		// Add Latitude and Longitude options and zoom level
		var mapOptions = {
				center: new google.maps.LatLng(37.760191, -122.502345),
				zoom: 14,
				mapTypeId: google.maps.MapTypeId.ROADMAP
		}
		// Load up the map to its container element
		modelCxt.map = new google.maps.Map(mapCanvas, mapOptions);

		// Create global infoWindow object which will be reused for each location as per Google Maps Docs
		modelCxt.infoWindow = new google.maps.InfoWindow({maxWidth: 260});

		//Create the markers
		for(var i = 0; i < localCoords.length; i++ ) {
			locale = localCoords[i];

			// create the new markers
			var marker = (new Marker(locale.latLng, locale.title, locale.icon, locale.description, modelCxt.map) );
			marker.show = ko.observable(true);
			// Add the markers to an observable array
			modelCxt.placeList.push(marker);

			/*google.maps.event.addListener(marker, 'click', function() {
        		modelCxt.resetMarker(marker);
        	});**/

			// Add the clickable event to the marker
			(function(marker) {
				google.maps.event.addListener(marker, 'click', function() {
					modelCxt.selectMarker(marker);
				})
			})(marker);

		}
		//console.info("OBsAry item is "+modelCtx.placeList()[0].title);


		//Show the marker as selected
		modelCxt.selectMarker = function(marker) {
				//console.log("Animate: "+marker.animation+"\n"+marker.title);

				// Bounce Marker
				marker.setAnimation(google.maps.Animation.BOUNCE);

				// Stop bounce
				setTimeout(function () {
			          marker.setAnimation(null);
			      }, 2150);
				//console.info('THEE DESCRIPTION: '+marker.description);

				// Get marker description and open info window
				modelCxt.infoWindow.setContent(marker.description);
				modelCxt.infoWindow.open(marker.get('map'), marker);

				// Move map center to clicked marker
				modelCxt.map.panTo(marker.getPosition());

			}

		// Filter input for available markers

		// Set up observable for input field and watch for change
		modelCxt.searchString = ko.observable();

		modelCxt.searchIt = function(marker) {
			var query = modelCxt.searchString().toLowerCase();

			//console.info('JUST TESTING THE TITLE:'+marker.title+' \n');

			var theTest = function(list) {

			    testTitle = list.title.toLowerCase();
			    if( testTitle.indexOf(query) >= 0 ) {
			    	list.setVisible(true);
			    	//modelCxt.isVisible(true);
			    	list.show= true;
			    	} else {
			    	list.setVisible(false);
			    	list.show= false;
			    	//console.info("Show is: "+list.show+" for "+list.title);
			    	//modelCxt.isVisible(false);
			    	//modelCxt.isActive(list, false);
			    	}
			    	console.log(list);
			    //console.log("The index of "+testTitle.indexOf(query)+" is "+testTitle);
			    //return
			}

			//this.yep = modelCxt.placeList.filter(this.theTest);
			//console.info(modelCxt.placeList()[4].title);
			modelCxt.placeList().filter(theTest);

		}

		// Set up visible class

		modelCxt.isActive = function(data, test) {
			if(test === true) {
				//return true;
				modelCxt.activeClass(true);
				console.info("ACTIVE!! "+modelCxt.activeClass() );
			} else {
				//return false;
				modelCxt.activeClass(false);
				console.info("NOT!! "+modelCxt.activeClass() );
			}


		}

		/**
		modelCxt.isVisible = function(test){
			//console.log("This is the "+obj.title+"\n and I am "+test);

			if(test === true) {
				//modelCxt.activeClass('visible');
				console.info("Active CLASS: "+modelCxt.activeClass() );
				//modelCxt.activeClass('true');
			} else {
				//modelCxt.activeClass('notVisible');
				//modelCxt.activeClass('false');
			}
		}**/

		/**modelCxt.showOrNo = function(elem) {
			if (elem === true ) {
				console.log("I AM TRUE "+elem);
				return true;
			} else {
				console.info("I AM FALSE "+elem);
				return false;
			}
		}
		**/


	} // END VIEW MODEL


	ko.applyBindings(new ViewModel());
}
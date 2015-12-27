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
		 fsid: '4a05e6dbf964a52098721fe3',
		 zip: '94121',
		 description: 'The ruins of the former salt water fed bath house from the turn of the former century. Great visitors center and lots of hiking trails make it a must do!'
		},
		{title: 'Wise Surfboards',
		latLng: {
			lat: 37.772765,
		 	lng: -122.510714
		 },
		 icon: surfIcon,
		 animation: null,
		 fsid: '4a6d0b27f964a52065d21fe3',
		 zip: '94121',
		 description: 'The oldest surviving surf shop in the city with views of the first peaks regularly surfed in San Francisco. They carry many of the top brands of boards and wetsuits.'
		},
		{title: 'The Beach Chalet',
		latLng: {
			lat: 37.769517,
		 	lng: -122.510263
		 },
		 icon: dineIcon,
		 animation: null,
		 fsid: '43cc06a3f964a520c72d1fe3',
		 zip: '94121',
		 description: 'Come for the great sunsets, stay for the tasty craft beers. Incredible views of the Pacific Ocean, a fantastic menu as well as well as beers brewed in-house. Great after a day at the beach.'
		},
		{title: 'Ocean Beach',
		latLng: {
			lat: 37.765166,
		 	lng: -122.512592
		 },
		 icon: eyeIcon,
		 animation: null,
		 fsid: '409ad180f964a520eef21ee3',
		 zip: '94122',
		 description: 'Part of the Federal Parks Service, Ocean Beach is an awesome, natural experience of beach and ocean. Bonfires are allowed in the rings provided.'
		},
		{title: 'Aqua Surf Shop',
		latLng: {
			lat: 37.760314,
		 	lng: -122.503595
		 },
		 icon: surfIcon,
		 animation: null,
		 fsid: '4ad0f5e0f964a52084db20e3',
		 zip: '94122',
		 description: 'Locally owned and operated. Staffed with top-quality gear and experts to help you make the right purchase. Aqua also runs the only surfboard rental service in the area.'
		},
		{title: 'La Playa Taqueria',
		latLng: {
			lat: 37.752834,
		 	lng: -122.504720
		 },
		 icon: dineIcon,
		 animation: null,
		 fsid: '4a664abcf964a52056c81fe3',
		 zip: '94116',
		 description: 'Argueably the best breakfast burritos in the fogbelt. An extensive menu of traditional Mexican food from dinner plates to venerable burritos',
		},
		{title: 'The Rip Tide Lounge',
		latLng: {
			lat: 37.741580,
		 	lng: -122.505349
		 },
		 icon: drinkIcon,
		 animation: null,
		 fsid: '4d3c6a863ec9a35dfd644881',
		 zip: '94116',
		 description: 'The local place to grab a cold drink after a day Ocean Beach. Live music, great beers on tap, drink specials and a fire place to warm up next to!'
		},
		{title: 'San Francisco Zoo',
		latLng: {
			lat: 37.733201,
		 	lng: -122.502764
		 },
		 icon: eyeIcon,
		 animation: null,
		 fsid: '49ca9423f964a520c0581fe3',
		 zip: '94132',
		 description: 'The San Francisco Zoo is a world renowned exibit of live animals, conservation effort and research facility.'
		}
	];

	//AJAX FUNCTION FOR FOUR SQUARE
	var fourSqrCall = function(passedTitle) {

		var placeFsId = null;

		// Loop through the original array and get the foursquare ID of the venue
		for(var s = 0; s < localCoords.length; s++ ) {
			if(localCoords[s].title === passedTitle) {
				placeFsId = localCoords[s].fsid;
				console.info("The IDDD of "+localCoords[s].title+" is "+localCoords[s].fsid);
			}
		}

		// Set Request string with correct info
		var fsRequest = 'https://api.foursquare.com/v2/venues/'+placeFsId+'?client_id=TPXYNVAKFZ3ZO55KQBFIUEBKQWHSGFL3EPG10VS0SAZZ2O51&client_secret=AY30L1ITLWN3A0MVJHZBICG1WTX1FFQFGB52EIEYIRDNBQEU&v=20130815&limit=3';

		// AJAX Call to foursquare
		var fourSqrData = $.ajax({
			url: fsRequest,
			data: {
				format: 'json'
			},
			error: function(jqXHR, testStatus, errorThrown) {
				console.log("AJAX Error! "+errorThrown);
				var stringToSend = '<div>Sorry, we do not have a picture for this location.</div>';
				$('#fsHere').append(stringToSend);
			},
			//dataType: 'jsonp',
			success: function(data) {

				// Get a picture to display from the photos offered by foursquare.
				// See how many array entries (how many pictures) to choose from
				var delimiter = data.response.venue.photos.groups[0].items.length;

				// Get a random number for corresponding picture to display
				var randomnumber = Math.floor(Math.random() * (delimiter - 1));

				// Set up the source URL
				var testRandPhoto = data.response.venue.photos.groups[0].items[randomnumber].prefix+'175x175'+data.response.venue.photos.groups[0].items[randomnumber].suffix;

				// Set up the string w/ data and append to div in info window
				var stringToSend = '<div><img src="'+data.response.venue.photos.groups[0].items[randomnumber].prefix+"150x150"+data.response.venue.photos.groups[0].items[randomnumber].suffix+'"></div>';
				$('#fs-here').append(stringToSend);
				console.log(data);
				console.info(data.response.venue.photos.groups[0].items[randomnumber].prefix);

			}
		});
	};

	//AJAX CALL to YELP --
	var yelpCall = function(passedTitle) {

		var zip;
		// Get the zip code for the selected title
		for(var t = 0; t < localCoords.length; t++ ) {
			if(localCoords[t].title === passedTitle) {
				zip = localCoords[t].zip;
			}
		}

		var searchOn = 'food';

		var auth = {
		    consumerKey : "JXePW9urpn9rtM0EbzaZmg",
		    consumerSecret : "tAaubaecdRrxjVjlUcnVH1QQWdo",
		    accessToken : "ehhl-T6l4g5QarL6BP6WxhN4PTu3mCqH",
		    accessTokenSecret : "nRFrxQ5KM1i7LfUMFVC4VHq6JZc",
		    serviceProvider : {
		        signatureMethod : "HMAC-SHA1"
		    }
		};

		var terms = searchOn;
		var near = zip;

		var accessor = {
		    consumerSecret : auth.consumerSecret,
		    tokenSecret : auth.accessTokenSecret
		};
		parameters = [];
		parameters.push(['term', terms]);
		parameters.push(['location', near]);
		parameters.push(['callback', 'cb']);
		parameters.push(['oauth_consumer_key', auth.consumerKey]);
		//parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
		parameters.push(['oauth_token', auth.accessToken]);
		//parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

		var message = {
		    'action' : 'http://api.yelp.com/v2/search',
		    'method' : 'GET',
		    'parameters' : parameters
		};

		OAuth.setTimestampAndNonce(message);
		OAuth.SignatureMethod.sign(message, accessor);

		var parameterMap = OAuth.getParameterMap(message.parameters);

		$.ajax({
		    'url' : message.action,
		    'data' : parameterMap,
		    'dataType' : 'jsonp',
		    'jsonpCallback' : 'cb',
		    'cache': true,
		    'success' : function(data, textStats, XMLHttpRequest) {
		        console.log(data);

		        // Select a random venue from yelp's returned list
		        var delimiter = data.businesses.length;

				// Get a random number for corresponding picture to display
				var randomBiz = Math.floor(Math.random() * (delimiter - 1));

		            if(data) {
		            	var stringToSend = '<h3>Dining Suggestion:</h3><div><strong>'+data.businesses[randomBiz].name+'</strong><ul><li>Yelp Rating: '+data.businesses[randomBiz].rating+'</li><li>Phone: '+data.businesses[randomBiz].display_phone+'</li><li>Address: '+data.businesses[randomBiz].location.address[0]+'</li><ul>';
		            	$('#yelpHere').append(stringToSend);
		            }
		    },
		    'error' : function(error) {
		    	$('#yelpHere').append('Sorry, Yelp is not responding right now. Please try again later');
		    }
		});


	};

	// Constructor to create new markers; adding them to the map at time of creation
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

		// Declare an observable array so the static data above can be 'watched' by Knockout
		// and we can use it in the UI
		modelCxt.placeList = ko.observableArray();

		// Declare an observable variable to keep track of the sidebar nav's 'drawer' visibility
		// so the nav can slide on and off screen; mainly for mobile users
		modelCxt.drawerVisible = ko.observable(false);

		// Get screen width on first load to attempt to offer small-screen users a better experience by hiding the sidebar
		var screenWidth = screen.width;

		// Select side-bar element for manipulation here and in toggleDrawer function
		var sidebar = document.getElementById('nav-bar');

		// Force the sidebar into the window if user's screen size is larger than 600px
		if( screenWidth > 600 ) {
			sidebar.style.transform = "translateX(200px)";
			modelCxt.drawerVisible(true);
		}


		// Initialize Google Map with correct coordinates and options
		var mapCanvas = document.getElementById('map');

		// Add Latitude and Longitude options and zoom level
		var mapOptions = {
				center: new google.maps.LatLng(37.760191, -122.512345),
				zoom: 14,
				mapTypeId: google.maps.MapTypeId.ROADMAP
		};

		// Load up the map to its container element
		modelCxt.map = new google.maps.Map(mapCanvas, mapOptions);

		// Create global infoWindow object which will be reused for each location as per Google Maps Docs
		modelCxt.infoWindow = new google.maps.InfoWindow({maxWidth: 300});

		//Create the markers
		for(var i = 0; i < localCoords.length; i++ ) {
			locale = localCoords[i];

			// create the new markers using google maps Marker constructor
			var marker = (new Marker(locale.latLng, locale.title, locale.icon, locale.description, modelCxt.map) );

			// Add an observable variable to test for change in visibility status of the list element in side bar nav
			marker.show = ko.observable(true);

			// Add the markers to an observable array
			modelCxt.placeList.push(marker);

			// Add the clickable event to the marker -- Use closure so each item gets
			// its own individual event
			(function(marker) {
				google.maps.event.addListener(marker, 'click', function() {
					modelCxt.selectMarker(marker);
				});
			})(marker);

		}

		//Show the marker as selected
		modelCxt.selectMarker = function(marker) {
			// Bounce Marker
			marker.setAnimation(google.maps.Animation.BOUNCE);

			// Stop bounce
			setTimeout(function () {
		          marker.setAnimation(null);
		      }, 2150);

			// Set up a div to display stored content and API requested content
			var placeContent = '<div id="info-win-interior"><h1 class="info-win-title">'+marker.title+'</h1><div id="fs-container"><div id="fs-here"></div>'+marker.description+'</div><div id="yelpHere"></div></div>';

			// Set up instance of info window
			modelCxt.infoWindow.setContent(placeContent);
			modelCxt.infoWindow.open(marker.get('map'), marker);

			// Call API's after window open so infoWindow elements can be populated
			var fsInsert = fourSqrCall(marker.title);
			var yelpInsert = yelpCall(marker.title);

			// Move map center to clicked marker
			modelCxt.map.panTo(marker.getPosition());
			//console.info("getPosition is"+marker.getPosition());

		};

		// Filter input for available markers

		// Set up observable for input field and watch for change
		modelCxt.searchString = ko.observable();

		modelCxt.searchIt = function(marker) {
			// Force query entry to lower case
			var query = modelCxt.searchString().toLowerCase();

			var theTest = function(list) {

				// Force title testing against to lowercase
				var testTitle = list.title.toLowerCase();

			    if( testTitle.indexOf(query) >= 0 ) {
			    	// setVisible shows and hides marker on map
			    	// show(true) sets observable variable to show and hid nav list item

			    	list.setVisible(true);
			    	list.show(true);
			    	} else {
			    	list.setVisible(false);
			    	list.show(false);
			    	}
			};

			// Run through each list item w/ filter method to test whether its visible
			modelCxt.placeList().filter(theTest);
		};

		// Toggle the sidebar menu on-screen visibility
		modelCxt.toggleDrawer = function(){

			if( modelCxt.drawerVisible() === true) {
				sidebar.style.transform = "translateX(0)";
				modelCxt.drawerVisible(false);
			} else {
				sidebar.style.transform = "translateX(200px)";
				modelCxt.drawerVisible(true);
			}


		};


	}; // END VIEW MODEL

	ko.applyBindings(new ViewModel());
};
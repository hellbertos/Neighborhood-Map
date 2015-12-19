/**
 ** Fogbelt Neighborhood Map App with Knockout - Udacity FEND Lesson 5
**/


window.onload = function() {
	var eyeIcon = "img/icon-eye.png"; // Point of Interest
		var dineIcon = "img/icon-dine.png";
		var surfIcon = "img/icon-surf.png";
		var drinkIcon = "img/icon-drink.png";

		var localCoords = [

			{lat: 37.780109,
			 lng: -122.513965,
			 title: 'Sutro Baths',
			 icon: eyeIcon,
			 animation: null,
			 description: 'The ruins of the former salt water fed bath house from the turn of the former century.'
			},
			{lat: 37.772765,
			 lng: -122.510714,
			 title: 'Wise Surfboards',
			 icon: surfIcon,
			 animation: null,
			 description: 'The oldest surviving surf shop in the city with views of the first peaks regularly surfed in San Francisco.'
			},
			{lat: 37.769517,
			 lng: -122.510263,
			 title: 'The Beach Chalet',
			 icon: dineIcon,
			 animation: null,
			 description: 'Come for the tasty food, stay for the tasty craft beers.'
			},
			{lat: 37.752834,
			 lng: -122.504720,
			 title: 'La Playa Taqueria',
			 icon: dineIcon,
			 animation: null,
			 description: 'Argueably the best breakfast burritos in the fogbelt.'
			},
			{lat: 37.765166,
			 lng: -122.512592,
			 title: 'Ocean Beach',
			 icon: eyeIcon,
			 animation: null,
			 description: 'Part of the Federal Parks Service, Ocean Beach is an awesome, natural experience of beach and ocean.'
			},
			{lat: 37.760314,
			 lng: -122.503595,
			 title: 'Aqua Surf Shop',
			 icon: surfIcon,
			 animation: null,
			 description: 'Locally owned and operated. Staffed with top-quality gear and experts to help you make the right purchase or rental.'
			},
			{lat: 37.741580,
			 lng: -122.505349,
			 title: 'The Rip Tide Lounge',
			 icon: drinkIcon,
			 animation: null,
			 description: 'The local place to grab a cold drink after a day Ocean Beach.'
			},
			{lat: 37.733201,
			 lng: -122.502764,
			 title: 'San Francisco Zoo',
			 icon: eyeIcon,
			 animation: null,
			 description: 'The San Francisco Zoo is a world renowned exibit of live animals, conservation effort and research facility.'
			}
		];
}
window.onload=function(){var e="img/icon-eye.png",a="img/icon-dine.png",t="img/icon-surf.png",n="img/icon-drink.png",i=[{title:"Sutro Baths",latLng:{lat:37.780109,lng:-122.513965},icon:e,animation:null,fsid:"4a05e6dbf964a52098721fe3",zip:"94121",description:"The ruins of the former salt water fed bath house from the turn of the former century. Great visitors center and lots of hiking trails make it a must do!"},{title:"Wise Surfboards",latLng:{lat:37.772765,lng:-122.510714},icon:t,animation:null,fsid:"4a6d0b27f964a52065d21fe3",zip:"94121",description:"The oldest surviving surf shop in the city with views of the first peaks regularly surfed in San Francisco. They carry many of the top brands of boards and wetsuits."},{title:"The Beach Chalet",latLng:{lat:37.769517,lng:-122.510263},icon:a,animation:null,fsid:"43cc06a3f964a520c72d1fe3",zip:"94121",description:"Come for the great sunsets, stay for the tasty craft beers. Incredible views of the Pacific Ocean, a fantastic menu as well as well as beers brewed in-house. Great after a day at the beach."},{title:"Ocean Beach",latLng:{lat:37.765166,lng:-122.512592},icon:e,animation:null,fsid:"409ad180f964a520eef21ee3",zip:"94122",description:"Part of the Federal Parks Service, Ocean Beach is an awesome, natural experience of beach and ocean. Bonfires are allowed in the rings provided."},{title:"Aqua Surf Shop",latLng:{lat:37.760314,lng:-122.503595},icon:t,animation:null,fsid:"4ad0f5e0f964a52084db20e3",zip:"94122",description:"Locally owned and operated. Staffed with experts to help you make the right purchase. Aqua also runs the only surfboard rental service in the area."},{title:"La Playa Taqueria",latLng:{lat:37.752834,lng:-122.50472},icon:a,animation:null,fsid:"4a664abcf964a52056c81fe3",zip:"94116",description:"Argueably the best breakfast burritos in the fogbelt. An extensive menu of traditional Mexican food from dinner plates to venerable burritos"},{title:"The Rip Tide Lounge",latLng:{lat:37.74158,lng:-122.505349},icon:n,animation:null,fsid:"4d3c6a863ec9a35dfd644881",zip:"94116",description:"The local place to grab a cold drink after a day Ocean Beach. Live music, great beers on tap, drink specials and a fire place to warm up next to!"},{title:"San Francisco Zoo",latLng:{lat:37.733201,lng:-122.502764},icon:e,animation:null,fsid:"49ca9423f964a520c0581fe3",zip:"94132",description:"The San Francisco Zoo is a world renowned exibit of live animals, conservation effort and research facility."}],o=function(e){for(var a=null,t=0;t<i.length;t++)i[t].title===e&&(a=i[t].fsid);{var n="https://api.foursquare.com/v2/venues/"+a+"?client_id=TPXYNVAKFZ3ZO55KQBFIUEBKQWHSGFL3EPG10VS0SAZZ2O51&client_secret=AY30L1ITLWN3A0MVJHZBICG1WTX1FFQFGB52EIEYIRDNBQEU&v=20130815&limit=3";$.ajax({url:n,data:{format:"json"},error:function(){var e="<div>Sorry, we do not have a picture for this location.</div>";$("#fsHere").append(e)},success:function(e){var a=e.response.venue.photos.groups[0].items.length,t=Math.floor(Math.random()*(a-1)),n=(e.response.venue.photos.groups[0].items[t].prefix+"175x175"+e.response.venue.photos.groups[0].items[t].suffix,'<div><img src="'+e.response.venue.photos.groups[0].items[t].prefix+"150x150"+e.response.venue.photos.groups[0].items[t].suffix+'"></div>');$("#fs-here").append(n)}})}},r=function(e){for(var a,t=0;t<i.length;t++)i[t].title===e&&(a=i[t].zip);var n="food",o={consumerKey:"JXePW9urpn9rtM0EbzaZmg",consumerSecret:"tAaubaecdRrxjVjlUcnVH1QQWdo",accessToken:"ehhl-T6l4g5QarL6BP6WxhN4PTu3mCqH",accessTokenSecret:"nRFrxQ5KM1i7LfUMFVC4VHq6JZc",serviceProvider:{signatureMethod:"HMAC-SHA1"}},r=n,s=a,l={consumerSecret:o.consumerSecret,tokenSecret:o.accessTokenSecret};parameters=[],parameters.push(["term",r]),parameters.push(["location",s]),parameters.push(["callback","cb"]),parameters.push(["oauth_consumer_key",o.consumerKey]),parameters.push(["oauth_token",o.accessToken]);var c={action:"http://api.yelp.com/v2/search",method:"GET",parameters:parameters};OAuth.setTimestampAndNonce(c),OAuth.SignatureMethod.sign(c,l);var d=OAuth.getParameterMap(c.parameters);$.ajax({url:c.action,data:d,dataType:"jsonp",jsonpCallback:"cb",cache:!0,success:function(e){var a=e.businesses.length,t=Math.floor(Math.random()*(a-1));if(e){var n="<h3>Dining Suggestion:</h3><div><strong>"+e.businesses[t].name+"</strong><ul><li>Yelp Rating: "+e.businesses[t].rating+"</li><li>Phone: "+e.businesses[t].display_phone+"</li><li>Address: "+e.businesses[t].location.address[0]+"</li><ul>";$("#yelpHere").append(n)}},error:function(){$("#yelpHere").append("Sorry, Yelp is not responding right now. Please try again later")}})},s=function(e,a,t,n,i){return new google.maps.Marker({position:e,map:i,icon:t,title:a,description:n})},l=function(){var e=this;e.placeList=ko.observableArray(),e.drawerVisible=ko.observable(!1);var a=screen.width,t=document.getElementById("nav-bar");a>600&&(t.style.transform="translateX(200px)",e.drawerVisible(!0));var n=document.getElementById("map"),l={center:new google.maps.LatLng(37.760191,-122.512345),zoom:14,mapTypeId:google.maps.MapTypeId.ROADMAP};e.map=new google.maps.Map(n,l),e.infoWindow=new google.maps.InfoWindow({maxWidth:300});for(var c=0;c<i.length;c++){locale=i[c];var d=new s(locale.latLng,locale.title,locale.icon,locale.description,e.map);d.show=ko.observable(!0),e.placeList.push(d),function(a){google.maps.event.addListener(a,"click",function(){e.selectMarker(a)})}(d)}e.selectMarker=function(a){a.setAnimation(google.maps.Animation.BOUNCE),setTimeout(function(){a.setAnimation(null)},2150);var t='<div id="info-win-interior"><h1 class="info-win-title">'+a.title+'</h1><div id="fs-container"><div id="fs-here"></div>'+a.description+'</div><div id="yelpHere"></div></div>';e.infoWindow.setContent(t),e.infoWindow.open(a.get("map"),a);o(a.title),r(a.title);e.map.panTo(a.getPosition())},e.searchString=ko.observable(),e.searchIt=function(){var a=e.searchString().toLowerCase(),t=function(e){var t=e.title.toLowerCase();t.indexOf(a)<0?(e.setVisible(!1),e.show(!1)):(e.setVisible(!0),e.show(!0))};e.placeList().filter(t)},e.toggleDrawer=function(){e.drawerVisible()===!0?(t.style.transform="translateX(0)",e.drawerVisible(!1)):(t.style.transform="translateX(200px)",e.drawerVisible(!0))}};ko.applyBindings(new l)};
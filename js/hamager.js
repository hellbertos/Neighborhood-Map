(function(){
	$(document).ready(function() {
		// Get necessary elements - Left side bar and hamburger button
		var slidey = $('#nav-bar');
		var slideyXPos = slidey.offset();
		var hamager = $('.hamager');

		// Get window width
		var winWidth = $(window).width();

		// Detect window width on load and show sidebar automatically if not a phone
		if (winWidth > 601) {
			slidey.animate({left: 0}, 200, function() {slideyXPos = slidey.offset()});
		}

		// Set listener on hamburger
		$('.hamager').click(function(){
			//console.log("left pos is"+slideyXPos.left);

			// Move sidebar into view
			if( slideyXPos.left === -200) {
				slidey.animate({
					left: '0'
	            }, 200, function() {
	            	slideyXPos = slidey.offset();
				    console.log("NEW POS "+slideyXPos.left);
				  });
			}
			// Move sidebar out of the way
			if (slideyXPos.left === 0) {
					slidey.animate({
						left: '-200'
	            	}, 200, function() {
	            	slideyXPos = slidey.offset();
				    console.log("NEWER POS "+slideyXPos.left);
				  });
				}
		});

	});

})();
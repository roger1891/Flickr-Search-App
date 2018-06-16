$(document).ready(function(){
	$('form').submit(function(evt){
		evt.preventDefault();
		var $searchField = $('#search');
		var $submitButton = $("#submit");
		
		$searchField.prop("disabled", true);
		$submitButton.attr("disabled", true).val("Searching...");
		//AJAX part
		var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
		var searchTerm = $searchField.val();
		var flickrOptions = {
			tags: searchTerm, // tags and format were obtained from flickr website
			format: "json"			
		};
		function displayPhotos(data) {//data received
			var photoHTML = '<ul>';
			$.each(data.items, function(i, photo){ //array, function(i, item)
				photoHTML += '<li class="grid-25 tablet-grid-50">';
				photoHTML += '<a href="' + photo.link + '" class="image">';
				photoHTML += '<img src="'  + photo.media.m + '"></a></li>';
				
			}); //end of loop
			photoHTML += '</ul>';
			$("#photos").html(photoHTML);
			$searchField.prop("disabled", false);
			$submitButton.attr("disabled", false).val("Search");			
		}
		$.getJSON(flickerAPI, flickrOptions, displayPhotos); // url, data to be sent to server -> flickr, call back function
	});
}); //end ready
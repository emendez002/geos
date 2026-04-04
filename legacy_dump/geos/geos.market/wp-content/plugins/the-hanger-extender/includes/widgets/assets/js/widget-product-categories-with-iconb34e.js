jQuery(function($) {

	"use strict";

	$('.product-categories-with-icon').on('click', '.cat-parent .dropdown_icon', function() {
		$(this).parent().toggleClass('active-item');
		$(this).siblings("ul.children").slideToggle('300', function() {
		});
	});

	// If there is more than 8 categories than add scroll class
	// If the user is inside the category, keep the widget category open
	
	$('.product-categories-with-icon .cat-item').each(function() {

		var max_subcategory_nr 		= 8
		var subcategory_nr 			= $(this).find("ul.children").find('li').length;

		if ( subcategory_nr > max_subcategory_nr ) {
			$(this).find("ul.children").addClass('add_scroll');
		} 

		if ( $(this).hasClass('current-cat') ) {
			$(this).addClass('active-item');
			$(this).find("ul.children").show();
		}

		if ( $(this).hasClass('current-cat-parent') ) {
			$(this).addClass('active-item');
			$(this).find("ul.children").show();
		}

		if ( $(this).hasClass('cat-parent') ) {
			if ( ! $(this).find('i').length ) {
				$(this).addClass('no-icon');
			}
		}
		
	});

});
jQuery(function($) {

	"use strict";

	function th_generate_slider_unique_ID() {
		return Math.round(new Date().getTime() + (Math.random() * 100));
	}

	$('.gbt_18_th_slider_container').each(function() {

		var data_id = th_generate_slider_unique_ID();
		$(this).addClass( 'swiper-' + data_id );

		var autoplay = $(this).find('.swiper-slide').length > 1 ? { delay: 4000 } : false;
		var loop = $(this).find('.swiper-slide').length > 1 ? true : false;
		var pagination = $(this).find('.swiper-slide').length > 1 ? { el: '.swiper-' + data_id + ' .gbt_18_th_slider_pagination', clickable: true } : false;

		var mySwiper = new Swiper( '.swiper-' + data_id, {

			// Optional parameters
		    direction: 'horizontal',
		    grabCursor: true,
			preventClicks: true,
			preventClicksPropagation: true,

		    autoplay: autoplay,
			loop: loop,

		    speed: 600,
			effect: 'slide',

		    // // If we need pagination
		    pagination: pagination,
		    parallax: true,
		});
	});
});

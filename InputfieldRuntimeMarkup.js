/*Use this file for scripts (js) for your renderend Markup in the page edit in admin, i.e. in the rendered InputfieldRuntimeMarkup*/

	/**
	 * Setup fancybox for page edits
	 */
	var h = $(window).height()-65;
    var w = $(window).width() > 1150 ? 1150 : $(window).width()-100;
	
	$('.batcher_edit').fancybox({
		type : 'iframe',
		frameWidth : w,
		frameHeight : h
	});
jQuery(document).ready(function($) {

	$('.section_tree ul').each(function() {
		// this - pointer to the current list
		var ul$ = $(this);
		var li$ = ul$.prev('li');
		li$.find('input:first').remove();
		li$.find('label').prepend('<i class="fa fa-plus" aria-hidden="true"></i>');
		var visible = false;
		li$.click(function() {
			if (visible == false) {
				ul$.show();
				$(this).find('i').removeClass('fa-plus').addClass('fa-minus');
				visible = true;
			}
			else {
				ul$.hide();
				$(this).find('i').removeClass('fa-minus').addClass('fa-plus');
				visible = false;
			}
		});
		ul$.hide();
	});

	$('.section_tree input[type="radio"], input[type="checkbox"]').change(function() {
		show_checked_elements();
	});

	// show the tree
	$('.section_tree > ul').show();
	show_checked_elements();


	function show_checked_elements() {
		//$(this).closest('.tree').siblings('.selected_tree_item').children('.selected_tree_item_label').html($(this).closest('label').text());
		var checked_items = [];
        $('.section_tree li.active').removeClass('active');
		$('.section_tree input[type="checkbox"]:checked, .section_tree input[type="radio"]:checked').each(function(){
            $(this).parents().filter('ul').prev('li').addClass('active');
			checked_items.push( $.trim($(this).closest('label').text()) );
		}).promise().done(function(){
			$('.selected_tree_item_label').html(checked_items.join('; '));
		});
		delete checked_items;
	}


});

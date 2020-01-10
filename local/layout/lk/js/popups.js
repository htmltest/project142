$(document).ready(function() {

    $('body').on('click', '.riepp-request-affiliated-select-value', function() {
        var curSelect = $(this).parent();
        var curIndex = $('.riepp-request-affiliated-select').index(curSelect);
        $('.riepp-request-affiliated-select').each(function() {
            var newIndex = $('.riepp-request-affiliated-select').index($(this));
            if (newIndex != curIndex) {
                $(this).removeClass('open');
            }
        });
    });

    $('body').on('click', '.riepp-request-affiliated-select-list label', function() {
        if ($(this).find('input[type="radio"]').length > 0) {
            $(this).parents().filter('.riepp-request-affiliated-select').removeClass('open');
        }
    });

    window.setInterval(function() {
        $('.window .riepp-request-affiliated-select-list, .table_edit .riepp-request-affiliated-select-list').each(function() {
            var curList = $(this);
            curList.mCustomScrollbar({
                axis: 'y'
            });
        });
    }, 100);

});
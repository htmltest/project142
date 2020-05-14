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

    $('.form-select select').each(function() {
        var curSelect = $(this);
        var options = {
            minimumResultsForSearch: 20
        }

        curSelect.select2(options);

        if (curSelect.find('option:selected').legnth > 0 || curSelect.find('option').legnth == 1 || curSelect.find('option:first').html() != '') {
            curSelect.trigger({type: 'select2:select'})
        }
    });

    $('.form-select-ajax select').each(function() {
        var curSelect = $(this);
        var options = {
            ajax: {
                url: curSelect.parent().attr('data-link'),
                dataType: 'json'
            },
            minimumInputLength: 3,
            placeholder: curSelect.parent().attr('data-placeholder')
        }

        curSelect.select2(options);
    });

});
jQuery(document).ready(function($) {

	$('.top_user').hover(
	function() {
		$(this).find('ul').fadeIn(100);
	},
	function() {
		$(this).find('ul').fadeOut(100);
	});

	$('ul.tabs__caption').on('click', 'li:not(.active)', function() {
		$(this)
		.addClass('active').siblings().removeClass('active')
		.closest('div.tabs').find('div.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
        $('.tabs-menu-open').removeClass('tabs-menu-open');
        $('.tabs__current').html($(this).html());
	});

	// Табы
	$('body').on('click','.tab .but:not(.active)', function(e){
	 var ind=$(this).index();
		$(this).addClass('active').siblings().removeClass('active');
		$('div.pages').find('div.page').removeClass('active').eq($(this).index()).addClass('active');
	});


	$('body').on('click','.window-link', function(e){
		windowOpen($(this).attr('href'));
		return false;
	});

	$('body').on('submit','.window-form', function(e){
/*
		if($('.order-service').length>0)
		$('.order-service').validate({
  highlight: function(element, errorClass, validClass) {
	console.log('test: ' + $(element).val());
  },
  unhighlight: function(element, errorClass, validClass) {
	console.log('test2: ' + $(element).val());
  }

		});
*/
		windowOpen($(this).attr('action')+'?'+$(this).serialize());
		return false;
	});

	$('body').on('submit','.window-form-file', function(e){
		var form_ok=true;
		$(this).find('.riepp-request-affiliated-select').each(function(ind) {
		var select_ok=false;
		$(this).find('input:checked.required').each(function( index ) {
		if ($(this).prop('checked'))select_ok=true;

		});
		if(!select_ok){$(this).find('.riepp-request-affiliated-select-value').html('<font color="red">Выберите значение!</font>');
		form_ok=false;
		}
		});
		if (!form_ok)
		{
			return false;
		}

		windowOpenFile(this);
		return false;
	});

	$('form').on('submit', function(e){

		if($(this).find('input[name="orchid"]').val())
		{
			orchid_ok=false;
			$.ajax({
            type: 'GET',
            url: 'get_orchid.php?orchid='+$(this).find('input[name="orchid"]').val(),
            dataType: "html",
            cache: false,
			 crossDomain: true,
           async: false,
            success: function(res) {
			if(res=='1')orchid_ok=true;

			},
			error: function(XMLHttpRequest, textStatus, errorThrown)
			{
            //$('#text').val('ERROR'+ XMLHttpRequest +" "+ errorThrown)
            //alert(textStatus);
			//alert('ERROR'+ XMLHttpRequest +" "+ errorThrown);},

			}
			});

		if (!orchid_ok)
		{
			alert('Неверный ORCHID');
			return false;
		}else{
			return true;
		}
		}
	});



    $('body').on( 'click','.riepp-request-affiliated-select-value', function(e) {
        var curSelect = $(this).parent();
        if (curSelect.hasClass('open')) {
            curSelect.removeClass('open');
        } else {
            curSelect.addClass('open');
        }
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.riepp-request-affiliated-select').length == 0) {
            $('.riepp-request-affiliated-select.open').removeClass('open');
        }
    });

    $('body').on('change','.riepp-request-affiliated-select-list label input', function() {
        var newHTML = '';
        $(this).closest('.riepp-request-affiliated-select').find('.riepp-request-affiliated-select-list label input:checked').each(function() {
            if (newHTML != '') {
                newHTML += ', ';
            }
            newHTML += $(this).parent().find('span').html();
        });
        if (newHTML == '') {
            newHTML = $(this).closest('.riepp-request-affiliated-select').find('.riepp-request-affiliated-select-value').data('placeholder');
        }
        $(this).closest('.riepp-request-affiliated-select').find('.riepp-request-affiliated-select-value').html(newHTML);
        $(this).closest('.riepp-request-affiliated-select').find('.riepp-request-affiliated-select-value').attr('title', newHTML);
    });


    $('body').on('click', '.window-close', function(e) {
        windowClose();
        e.preventDefault();
    });

    $('body').on('keyup', function(e) {
        if (e.keyCode == 27) {
            windowClose();
        }
    });

    $('body').on('mousedown', '.window', function(e) {
        if (e.target !== this) {
            $('.window').data('mousedown', false);
        } else {
            $('.window').data('mousedown', true);
        }
    });

    $('body').on('mouseup', '.window', function(e) {
        if (e.target !== this) {
            $('.window').data('mousedown', false);
        } else {
            if ($('.window').data('mousedown')) {
                windowClose();
            }
        }
    });

    $('.input-date input').attr('autocomplete', 'off');
    $('.input-date input').mask('00.00.0000');

    $('.input-date input').on('change', function() {
        var curValue = $(this).val();
        if (curValue.match(/^[0-9]{2}\.[0-9]{2}\.[0-9]{4}$/)) {
            var myDatepicker = $(this).data('datepicker');
            if (myDatepicker) {
                var curValueArray = curValue.split('.');
                myDatepicker.selectDate(new Date(Number(curValueArray[2]), Number(curValueArray[1]) - 1, Number(curValueArray[0])));
            }
        } else {
            var myDatepicker = $(this).data('datepicker');
            if (myDatepicker) {
                myDatepicker.clear();
            }
        }
    });

    $('.input-date input').on('keyup', function() {
        var curValue = $(this).val();
        if (curValue.match(/^[0-9]{2}\.[0-9]{2}\.[0-9]{4}$/)) {
            var myDatepicker = $(this).data('datepicker');
            if (myDatepicker) {
                var curValueArray = curValue.split('.');
                myDatepicker.selectDate(new Date(Number(curValueArray[2]), Number(curValueArray[1]) - 1, Number(curValueArray[0])));
                myDatepicker.show();
                $(this).focus();
            }
        }
    });

    $('.input-date input').each(function() {
        var startDate = new Date();
        if (typeof ($(this).attr('value')) != 'undefined') {
            var curValue = $(this).val();
            if (curValue != '') {
                var startDateArray = curValue.split('.');
                startDate = new Date(Number(startDateArray[2]), Number(startDateArray[1]) - 1 , Number(startDateArray[0]));
            }
        }
        $(this).datepicker({
            language: 'ru',
            startDate: startDate,
            autoClose: true,
            toggleSelected: false
        });
        if (typeof ($(this).attr('value')) != 'undefined') {
            var curValue = $(this).val();
            if (curValue != '') {
                var startDateArray = curValue.split('.');
                startDate = new Date(Number(startDateArray[2]), Number(startDateArray[1]) - 1 , Number(startDateArray[0]));
                $(this).data('datepicker').selectDate(startDate);
            }
        }
    });


    $('.success_info-close').click(function(e) {
        $(this).parent().fadeOut();
        e.preventDefault();
    });

    $('.show_nav').click(function(e) {
        $('html').toggleClass('mobile-menu-open');
    });

    $('.tabs__current').click(function(e) {
        $('.tabs').toggleClass('tabs-menu-open');
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.request_tabs').length == 0) {
            $('.tabs').removeClass('tabs-menu-open');
        }
    })

});//jQuery

$(window).on('load resize', function() {

    if ($(window).width() > 1199) {
        $('.footer-logos .wrap').each(function() {
            var curList = $(this);
            if (curList.hasClass('slick-slider')) {
                curList.slick('unslick');
            }
        });
    } else {
        $('.footer-logos .wrap').each(function() {
            var curList = $(this);
            if (!curList.hasClass('slick-slider')) {
                curList.slick({
                    infinite: false,
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    arrows: false,
                    dots: true
                });
            }
        });
    }

});

function upd_span(href, name){
    jQuery(document).ready(function($) {
		$.ajax({
			type: "POST",
			url: href,
			dataType: "html",
			cache: false,
			async: true,
			success: function(res) {
			$("body").find("span."+name).html(res);
			}
		});
	});
	return false;
};

function windowOpen(data_ckp) {
    jQuery(document).ready(function($) {
        var i=0,html;
        $.ajax({
            type: 'POST',
            url: data_ckp,
            dataType: 'html',
            cache: false,
            async: true,
            success: function(res) {
                html='<div class="analitics">'+res+'</div>';

                $('html').addClass('window-open');

                if ($('.window').length > 0) {
                    $('.window').remove();
                }

                $('body').append('<div class="window"></div>')

                $('.window').append('<div class="window-container window-container-load"><div class="window-content">' + html + '<a href="#" class="window-close"></a></div></div>')
                $('.graf-onoff').hide();
                if ($('.select-period').val())
                    $('.select-period').change();
                if ($('.s2').length>0)
				{
                $(".s2").select2({
                            language: "ru",

                });
				$('.select2-selection').css('border-radius','0px');
				$('.select2-container').children().css('border-radius','0px');
				}
                if (!$('.face').val())
                {
                    $('.add-service input, .add-service select').attr('disabled','disabled');
                    $('.add-service .face').removeAttr('disabled');
                }

				$('body').css('overflow','hidden');
            },
            error: function (jqXHR, exception) {
                console.log('Error: ' + jqXHR['statusText']);
                }
        });//ajax
    });//jQuery
}


function windowOpenFile(data_ckp) {
    jQuery(document).ready(function($) {
//		alert($(data_ckp).parent().find('form').attr('action'));
        var i=0,html,action=$(data_ckp).attr('action'),fd=new FormData(data_ckp);
//		for (var pair of fd.entries()) {
//			console.log(pair[0]+ ', ' + pair[1]);
//		}
        $.ajax({
            type: 'POST',
            url: action,
			data: fd,
			cache: false,
			processData: false,
			contentType: false,
            dataType : "html",

			success: function(res,s) {
                html='<div class="analitics">'+res+'</div>';

                $('html').addClass('window-open');

                if ($('.window').length > 0) {
                    $('.window').remove();
                }

                $('body').append('<div class="window"></div>')

                $('.window').append('<div class="window-container window-container-load"><div class="window-content">' + html + '<a href="#" class="window-close"></a></div></div>')
                $('.graf-onoff').hide();
                if ($('.select-period').val())
                    $('.select-period').change();
                if ($('.s2').length>0)
				{
                $(".s2").select2({
                            language: "ru",
                });
				$('.select2-selection').css('border-radius','0px');
				$('.select2-container').children().css('border-radius','0px');
				}
                if (!$('.face').val())
                {
                    $('.add-service input, .add-service select').attr('disabled','disabled');
                    $('.add-service .face').removeAttr('disabled');
                }
            },
            error: function (jqXHR, exception) {
                console.log('Error: ' + jqXHR['statusText']);
                }
        });//ajax

        $('body').on('click', '.window-close', function(e) {
            windowClose();
            e.preventDefault();
        });

        $('body').on('keyup', function(e) {
            if (e.keyCode == 27) {
                windowClose();
            }
        });

        $(document).click(function(e) {
            if ($(e.target).hasClass('window')) {
                windowClose();
            }
        });
    });//jQuery
}


function windowClose() {
    jQuery(document).ready(function($) {
        if ($('.window').length > 0) {
            $('.window').remove();
            $('html').removeClass('window-open');
            $('body').css({'margin-right': 0});
        }
		$('body').css('overflow','auto');
    });//jQuery
}


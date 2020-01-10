jQuery(document).ready(function($) {
//$(document).ready(function() {
$('a.ch_pass').on('click',function(){
	$('form.change_pass').show();	
	var destination = $('form.change_pass').offset().top;
	$('html, body').animate({ scrollTop: destination }, 600);
	return false;
});

$('form.change_pass').on('submit', function(){
	$('form.change_pass').find('.err1').html('');
	$('form.change_pass').find('.err2').html('');
	if($('form.change_pass').find('input[name="change1"]').val()==$('form.change_pass').find('input[name="change2"]').val() && $('form.change_pass').find('input[name="change1"]').val()!='')
	{
		$.ajax({
		  url: '/personal/change_pass.php',
			data: $(this).serialize(),
		  success: function(data){
			if(data=='ok')
			{
			
				$('.change_pass_ok').html('<font color="green">Пароль успешно изменен</font>');
				$('form.change_pass').hide();	
				var destination = $('.change_pass_ok').offset().top;
				$('html, body').animate({ scrollTop: destination }, 600);

			}
			else
			{
				$('form.change_pass').find('.err1').html('<label class="error">'+data+'</label>');
				//$('form.change_pass').find('.err1').html('<font color="red">'+data+'</font>');
			}
		  }
		});
	}else{
		if ($('form.change_pass').find('input[name="change1"]').val()=='')
		{

		$('form.change_pass').find('.err2').html('<label class="error">Введите новый пароль</label>');

		//$('form.change_pass').find('.err2').html('<font color="red">Введите новый пароль</font>');

		}
		else
		{
		$('form.change_pass').find('.err2').html('<label class="error">Пароли не совпадают</label>');

		//$('form.change_pass').find('.err2').html('<font color="red">Пароли не совпадают</font>');
		}
	}
return false;
});
//});

});
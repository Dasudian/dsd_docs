$(function(){
	var a=true;
	$(".tract").click(function(){
		if($(window).width()<768){
			if(a){
				$(this).css({"left":"auto","right":"-5px"});
				$(".side_left").animate({left:'0'});
				a=false;
			}else{
				$(this).css({"left":"-5px","right":"auto"});
				$(".side_left").animate({left:'-100%'});
				a=true;
			}
		}
	})
})

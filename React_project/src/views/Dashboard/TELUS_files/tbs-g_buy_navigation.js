// JavaScript Document
$(document).ready(function(){

	/*Submit form that adds a commerce item*/
	$(".tbs-g_addCommerceItemButton").click(function(){
		$(this).closest("form").submit();
	});

	/*Submit form with Next button*/
	$("div#tbs-g_nextButton").click(function(){
		if (!$(this).hasClass("tbs-g_cancelBtn")) {
			$(this).closest("form#fm_checkout").submit();
		}
	});

	/*Submit form with Cancel button*/
	$("div#tbs-g_cancelButton").click(function(){
		$("form#fm_cancelCheckout").submit();
	});

	/*Submit form with Previous button*/
	$("#tbs-g_previousButton").click(function(){
		$("form#fm_previousCheckout").submit();
	});

	/* Handle "Cancel" link onclick event */
	$('a#tbs-g_cancelLnk').click(function() {
		$('input#tbs-g_cancelHdn').removeAttr('disabled');
		$('form#fm_checkout').submit();
		return true;
	});	
});

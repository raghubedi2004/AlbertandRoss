$(document).ready(function(){	
    
		$('input[id^="email"]').blur(function (evt){
		
		var emailInputArray = $("input[id^='email']");
		var hasEmailErrors = false;
		var isNewAdminRegistration =  $("#newAdminRegistration").length;
		
		if(isNewAdminRegistration == 0){
			$.each(emailInputArray, function(idx, emailInput){
				var emailElement = $("#"+emailInput.id);
				if (!emailElement.is('[disabled=disabled]')) {
					if(!validateEmail(emailInput.value)){
						if(!emailElement.hasClass("frg-icon-email-error-border")){
							emailElement.addClass("frg-icon-email-error-border");
						}
						hasEmailErrors = true;
					}else{
						if(emailElement.hasClass("frg-icon-email-error-border")){
							emailElement.removeClass("frg-icon-email-error-border");
						}
					}
				} else {
					if(emailElement.hasClass("frg-icon-email-error-border")){
						emailElement.removeClass("frg-icon-email-error-border");
					}
				}
			});
			
			var isSubmitDisabled = $("input[type=submit]").hasClass("state-disabled");
			
			if(hasEmailErrors && !isSubmitDisabled){
				$("input[type=submit]").addClass("state-disabled");				
			}
			else if(!hasEmailErrors && isSubmitDisabled){
				$("input[type=submit]").removeClass("state-disabled");	
			}
		}
	});
	
	$('input[id^="email"]').mouseleave(function (){
		$('input[id^="email"]').trigger("blur");
	});
	
	$( ".voiceMailBubble" ).mouseenter(function() {
		$(".voiceReceipt").blur();
	});
	$( ".rollingDeletionBubble" ).mouseenter(function() {
		$(".rolling").blur();
	});
	$( ".audioFileBubble" ).mouseenter(function() {
		$(".audio").blur();
	});
	
	jQuery('.voiceReceipt').each(function(i,ce) {	     
	     var index = ce.id.toString().replace('voicemailReceipt__','');
	     grayOutAudioField(ce,index);	
	});


	$(".voiceReceipt").change(function(e) {
		var index = e.currentTarget.id.toString().replace('voicemailReceipt__','');
		grayOutAudioField(e.currentTarget,index);
	});

  	function grayOutAudioField(selector,index){
		if(selector.selectedIndex == 0){
		  $("#audio__"+index).css("background-color","#EBEBE4");
		     }else{
		       $("#audio__"+index).css("background-color","");
			    $("#email_"+index).prop('disabled', false);
		       $("#email_"+index).trigger("blur");
		       $("#email_"+index).trigger("focus");
		 }
  	}
    
    
	$('.change_subs_name').on('paste', function(e) {
    e.preventDefault();
    var text = '';
    if (e.clipboardData || e.originalEvent.clipboardData) {
      text = (e.originalEvent || e).clipboardData.getData('text/plain');
    } else if (window.clipboardData) {
      text = window.clipboardData.getData('Text');
    }
    if (document.queryCommandSupported('insertText')) {
      document.execCommand('insertText', false, text);
    } else {
      document.execCommand('paste', false, text);
    }
	console.log($(this).text().length);
			if($(this).text().length>50){
				$(this).text($(this).text().substring(0,48));
			} 

	});

	$('.edit_sub_button').click(function(e){

  	    var phoneNumber = $(this).prop("id").toString().replace("button_","");

  	    var lastName =	$('#div_lname' +phoneNumber);
  	    var firstName =	$('#div_fname' +phoneNumber);  
  	    
  	    firstName.text(firstName.text().trim().replace(/\d+/g, ''));
  	    lastName.text(lastName.text().trim().replace(/\d+/g, ''));	


		if(firstName.text().length <=0 || lastName.text().length <=0){
  	    	return false;		
  	    }

  	    var ban = $('#ban').val();	
  	    var orderId = $('#orderid').val();	


  	    if(ban.toString().trim() =='' || phoneNumber.toString().trim() ==''
  	       || orderId.toString().trim() ==''){
  	    	console.log("order"+orderId+"ban"+ban+"phoneNumber"+phoneNumber);
  	       return;	
  	    } 	

       	toogleField(lastName);
       	toogleField(firstName);

       	if($(firstName).hasClass('editable')  || $(lastName).hasClass('editable') ){
 	      	$('.subs_name_cell').css("width", "28%");
        }else{
        	$('.subs_name_cell').css("width", "20%");

        	console.log("last name" +lastName.text())	
        	console.log("first name" +firstName.text())	

  	 		JAG.start();
			var contextPath = $('#contextPath').val();
			console.log("path"+contextPath);
			$.ajax({
				url: contextPath + "/upgrade/subscribers/updateUpgradeSubscriberName.jsp?" + encodeURI("firstname=" + firstName.text().trim().toLowerCase()
				+"&lastname=" + lastName.text().trim().toLowerCase() +"&phonenumber=" + phoneNumber +"&ban="+ban +"&orderid=" + orderId)
				,
				type: "get",
				dataType: "json",
				contentType: "application/x-www-form-urlencoded;charset=UTF-8",
				success:function(data){
					
					lastName.text(lastName.text().toUpperCase());				  		
					firstName.text(firstName.text().toUpperCase());

		  			console.log("success");
		  			console.log(data);
		  			JAG.stop();
				},
				error:function(data){

					console.log("error");
		  			console.log(data);
					JAG.stop();
				}				
			});	
        }
	}); 
	
	

		(function () {
		var previous;

		$('[id^="serviceCategoryDrpDwn"]').focus(function () {
			// Store the offer currently selected
			previous = this.value;
		}).change(function() {
			//if they are different remove checks from all offers
			if(previous!=this.value && previous!=undefined){
				$('#seletedOffer').val('').change();
				//clear all checks for offer
				//if no offer selected clear everything
				var availableDeviceOffers = $('.frg-checkbox-acquisition');
				availableDeviceOffers.each( function( ) {
					currentDeviceOffer = $( this ).find('input').eq(0).attr('id');
					document.getElementById(currentDeviceOffer).checked=false;
				});
				$("#upgradeSimDrpDwn").change();
				//assign right prices
				$("#simDrpDwn").change();

				
			}
			previous = this.value;
		});
	})();

	(function () {
		var previous_upgrade;

		$('[id^="serviceCatDrpDwn_"]').focus(function () {
			// Store the offer currently selected
			previous_upgrade = this.value;
		}).change(function() {
			//if they are different remove checks from all offers
			if(previous_upgrade!=this.value && previous_upgrade!=undefined){
				/*$('#seletedOffer').val('').change();
				//clear all checks for offer
				//if no offer selected clear everything
				var availableDeviceOffers = $('.frg-checkbox-acquisition');
				availableDeviceOffers.each( function( ) {
					currentDeviceOffer = $( this ).find('input').eq(0).attr('id');
					document.getElementById(currentDeviceOffer).checked=false;
				});*/
				$("#upgradeSimDrpDwn").change();
				

				
			}
			previous_upgrade = this.value;
		});
	})();

	$('.change_subs_name').on('keydown', function(e) {   
    // trap the return key being pressed
	   console.log("enter" + $(this).text().length );
	   var phoneNumber = $(this).prop("id").toString().replace("div_lname","").replace("div_fname","");
 		console.log(phoneNumber);

        if($(this).text().length>=50){
        	$(this).text($(this).text().substring(0,48));
        }
        
        if($(this).text().length>49){
        	return false;
        }

	    if (e.keyCode === 13) {
	      // insert 2 br tags (if only one br tag is inserted the cursor won't go to the next line)
	       $("#button_"+phoneNumber).trigger("click");   
	      // prevent the default behaviour of return key pressed
	      return false;
	    }
  	});


  	$('.change_subs_name').on('blur', function(e) {   
  	   e.preventDefault();
	   var phoneNumber = $(this).prop("id").toString().replace("div_lname","").replace("div_fname","");
	  
	   //get element that was trigger in case second textbox is trigger or first
	   var cliked = e.relatedTarget;
	   if(cliked && cliked!=null){
	   		cliked = cliked.id;  
		   //ie 11 compability
		   if(cliked.indexOf(phoneNumber)==-1){

		        if($(this).text().length>=50){
		        	$(this).text($(this).text().substring(0,48));
		        }
		        
		        if($(this).text().length>49){
		        	return false;
		        }
		        //wehn subscriber clicks out of the box
			    $("#button_"+phoneNumber).trigger("click");   
		    }
		}else if($(this).attr('contenteditable') == "true"){
			//update field only if field is editable
			$("#button_"+phoneNumber).trigger("click");
		}
	     
  	});


    function toogleField(field){        
  	    var $div=field, isEditable=$div.is('.editable');  	 	 
   	 	field.prop('contenteditable',!isEditable).toggleClass('editable');   	 	    	   	    	     
	    console.log("click")
    }
 


	var isPlanSubmited =false;
	$("#planBodyForm").submit(function (e) {    
        if(isPlanSubmited){
        	e.preventDefault();
        }
       		isPlanSubmited = true;
    	});		

		//EOFR-7104 - Add it to populate fields for simOnly
	$("select[id^='simDrpDwnByod']").change(function(){
		id = $(this).attr('id').replace('simDrpDwnByod', '');
		prodId = $(this).children(":selected").attr("id");
		sim = $(this).children(":selected").val();
		if($('#simDrpDwnByod'+id).find(":selected").attr('class') != undefined) {
			simPrice = $('#simDrpDwnByod'+id).find(":selected").attr('class');
		}
		else{
			simPrice = 0;
		}
		if(sim == 'myOwnSim'){
			$("#productId"+id).val("");
			$("#catalogRefId"+id).val("${SelectPlanSku}");
			$("#dueNowPrice"+id).val(simPrice);
		}else{
			$("#simProdId"+id).val(prodId);
			$("#productId"+id).val(prodId);
			$("#catalogRefId"+id).val(sim);
			$("#dueNowPrice"+id).val(simPrice);

		}

	});	
	//END EOFR-7104

	//EOFR-8122
	var version = detectIE();
	if((version === false) && (document.getElementById('accessoryFlag') !== null)){
		isIE();
	}
	//END EOFR-8122

	$( '.js-submit-only-once' ).click( function () {
		$(".js-submit-only-once").addClass( 'state-disabled' );
	});
	
	$( '.js-byod-quantity' ).keyup( function () {
		
		if (this.value != this.value.replace(/[^0-9\.]/g, '')) {
			this.value = this.value.replace(/[^0-9\.]/g, '');
		} else {
			var quantity_field = $( this ),
			entered_value = quantity_field.val(),
			status = quantity_field.closest( '.status' ),
			plan_atc = status.closest( '.plan' ).find( '.frg-button.color-green' ),
			max_allowed_quantity = parseInt($('#maxSubscribersPerGroup').val());
		
			if ( $.isNumeric( entered_value ) ) {
				var languages = $('#languages').val();
				if(languages == "fr"){
					if (entered_value > max_allowed_quantity ) {
						var tooltip_message = 'Maximum ' + max_allowed_quantity + ' abonnés  par groupe';

						status.removeClass( 'positive' ).addClass( 'negative' ).find( '.tooltip_bubble span' ).text("").text( tooltip_message );

						device_atc.addClass( 'state-disabled' );
					} else {
						status.removeClass( 'negative' ).addClass( 'positive' );
						plan_atc.removeClass( 'state-disabled' );
					}
				} else {
					if (entered_value > max_allowed_quantity ) {
						var tooltip_message = 'Maximum ' + max_allowed_quantity + ' subscribers per group';

						status.removeClass( 'positive' ).addClass( 'negative' ).find( '.tooltip_bubble span' ).text("").text( tooltip_message );

						plan_atc.addClass( 'state-disabled' );
					} else {
						status.removeClass( 'negative' ).addClass( 'positive' );
						plan_atc.removeClass( 'state-disabled' );
					}
				}
			}
		}
	});
	
	//activation device details script -start	
	$( '.frg-checkbox-acquisition input' ).click( function () {
        
        var clicked = $( this ).closest('div.frg-checkbox-acquisition'),
		price = clicked.find( '.value' ).attr( 'data-value' ),
		monthlyPrice = clicked.find( '.value' ).attr( 'data-monthlyFinanceAmt' ),
		quantity_txt = $( '.js-quantity' ),
		quantity = quantity_txt.val(),
		total = null;
		var mscAmount = clicked.find( '.mscAmount' ).text();
		var selectedSimId = $('#simDrpDwn').val();
		var simPrice = 0;
		if('NOTERM' == mscAmount.trim())
		{
			$('#simDrpDwn').val('');
		}else{
			if($('#simDrpDwn').find(":selected").attr('class') != undefined) {
				simPrice = $('#simDrpDwn').find(":selected").attr('class');
			}
		}
		if(price != undefined){
			var languages = $('#languages').val();

			var warrantyPrice = 0;
			var skuId = $("#selectedSkuIdValue").val();
			var warrantyItem = $('.warrantyItems_' + skuId).find("input:radio[name=warrantySkuId]:radio:checked");
			if(warrantyItem != undefined) {
				warrantyPrice = warrantyItem.attr('data-price') != undefined ? parseFloat( warrantyItem.attr('data-price')) : 0;
			}
			
			if ( $.isNumeric( quantity ) ) {
				total = ( quantity * price ) + ( quantity * simPrice );
				monthlyTotal = ( quantity * monthlyPrice ) + (quantity * warrantyPrice);
			} else {
				// Fix for EOFR-6949
				if (simPrice != "") {
					total = parseFloat(price) + parseFloat(simPrice);
				} else {
					total = parseFloat(price);
				}
				//total = parseFloat( price + simPrice);
				monthlyTotal = monthlyPrice + warrantyPrice;
			}
			var dueNow = $( '.total' );
			if(languages == 'fr'){
				
				dueNow.text(parseFloat( total, 10 ).toFixed( 2 ).replace( /(\d)(?=(\d{3})+\.)/g, "$1," ).toString().replace(".",",")+ '$');
			}else{
			dueNow.text( '$'+parseFloat( total, 10 ).toFixed( 2 ).replace( /(\d)(?=(\d{3})+\.)/g, "$1," ).toString() );
			}
			var dueMonthly = $( '.monthlytotal' );
			if(languages == 'fr'){
				
				dueMonthly.text( parseFloat( monthlyTotal, 10 ).toFixed( 2 ).replace( /(\d)(?=(\d{3})+\.)/g, "$1," ).toString().replace(".",",")+ '$');
			}else{
			dueMonthly.text( '$'+parseFloat( monthlyTotal, 10 ).toFixed( 2 ).replace( /(\d)(?=(\d{3})+\.)/g, "$1," ).toString() );
			}
			var flow = $('#flow').val();
			 if(flow == 'bundle'){
				 $('#bundleDueMonthlyPrice').val(monthlyTotal);
				 $('#bundleDueNowPrice').val(total);
			 }
			if('NOTERM' == mscAmount.trim())
			{
				if(document.getElementById('mscDetails') != null) {
					document.getElementById('mscDetails').style.display="none";
				}
				$('.frg-checkbox-portIn').find('input[id=rdPortInNo]').attr("checked", true);
				$('.frg-checkbox-portIn').find('input[type=radio]').attr("disabled", true);
			}else{
				if(document.getElementById('mscDetails') != null) {
					document.getElementById('mscDetails').style.display="block";
				}
				$('.mscAmountTxt').text( mscAmount );
				$('.frg-checkbox-portIn').find('input[type=radio]').attr("disabled", false);
			}
		}
	});
	
	$( '.frg-checkbox-upgrade input' ).click( function () {
	var clicked = $(this).closest('div.frg-checkbox-upgrade'),
		price = clicked.find( '.value' ).attr( 'data-value' ),
		monthlyPrice = clicked.find( '.value' ).attr( 'data-monthlyFinanceAmt' ),
		quantity = parseFloat(document.getElementById('noOfSubscribers').value),
		total = null;
		var devicePrice=null;
		var simPrice = 0;
		if($('#upgradeSimDrpDwn').find(":selected").attr('class') != undefined) {
			simPrice = $('#upgradeSimDrpDwn').find(":selected").attr('class');
		}

		var skuId = $("#selectedSkuIdValue").val();
		var warrantyPrice = 0;
		var warrantyItem = $('.upgradeWarrantyItems_' + skuId).find("input:radio[name=warrantySkuId]:radio:checked");
		if(warrantyItem != undefined) {
			warrantyPrice = warrantyItem.attr('data-price') != undefined ? parseFloat( warrantyItem.attr('data-price')) : 0;
		}
		var deviceDueNow_input = document.getElementById('deviceDueNow');
		var isUpdateItemWarraty = document.getElementById('isUpdateItemWarraty');
		var deviceDueMonthly_input = document.getElementById('deviceDueMonthly');
		var deviceDueMonthly = 0;
		var deviceDueNow = 0;
		if(isUpdateItemWarraty!=undefined){
			if(isUpdateItemWarraty.value == 'false'){
				if(deviceDueMonthly_input!=undefined && deviceDueMonthly_input.value!=""){
					deviceDueMonthly = parseFloat(deviceDueMonthly_input.value);
				}else{
					deviceDueMonthly = parseFloat(0);
				}
				if(deviceDueNow_input!=undefined && deviceDueNow_input.value!=""){
					deviceDueNow = parseFloat(deviceDueNow_input.value);
				}else{
					deviceDueNow = parseFloat(0);
				}
			}
		}
		if(price != undefined){
			var oldDueNow = parseFloat(document.getElementById('orderDueNow').value);
			var oldDueMonthly = parseFloat(document.getElementById('orderDueMonthly').value);
			
			if ( $.isNumeric( quantity ) ) {
				devicePrice = ( quantity * price ) + ( quantity * simPrice )
				total = oldDueNow + ( quantity * price ) + ( quantity * simPrice )-deviceDueNow;
				monthlyTotal = oldDueMonthly + ( quantity * monthlyPrice ) + ( quantity * warrantyPrice )-deviceDueMonthly;
			} else {
				total = oldDueNow + parseFloat( price + simPrice)-deviceDueNow;
				monthlyTotal = oldDueMonthly + parseFloat(monthlyPrice + warrantyPrice)-deviceDueMonthly;
			}
			var dueNow = $( '.now' );
			var dueMonthly = $( '.monthly' );
			var languages = $('#languages').val();
			//var devPrice = $('.devPrice');
			if(languages == 'fr'){
				//devPrice.text( parseFloat( devicePrice, 10 ).toFixed( 2 ).replace( /(\d)(?=(\d{3})+\.)/g, "$1," ).toString().replace(".",",")+ '$');
				dueNow.text( parseFloat( total, 10 ).toFixed( 2 ).replace( /(\d)(?=(\d{3})+\.)/g, "$1," ).toString().replace(".",",")+ '$');
				dueMonthly.text( parseFloat( monthlyTotal, 10 ).toFixed( 2 ).replace( /(\d)(?=(\d{3})+\.)/g, "$1," ).toString().replace(".",",")+ '$');
			}else{
				//devPrice.text( '$'+parseFloat( devicePrice, 10 ).toFixed( 2 ).replace( /(\d)(?=(\d{3})+\.)/g, "$1," ).toString() );
				dueNow.text( '$'+parseFloat( total, 10 ).toFixed( 2 ).replace( /(\d)(?=(\d{3})+\.)/g, "$1," ).toString() );
				dueMonthly.text( '$'+parseFloat( monthlyTotal, 10 ).toFixed( 2 ).replace( /(\d)(?=(\d{3})+\.)/g, "$1," ).toString() );
			}
			/*dueNow.text( '$'+parseFloat( total, 10 ).toFixed( 2 ).replace( /(\d)(?=(\d{3})+\.)/g, "$1," ).toString() );
			dueMonthly.text( '$'+parseFloat( monthlyTotal, 10 ).toFixed( 2 ).replace( /(\d)(?=(\d{3})+\.)/g, "$1," ).toString() );*/
			var flow = $('#flow').val();
			 if(flow == 'bundle'){
				 $('#bundleDueMonthlyPrice').val(monthlyTotal);
				 $('#bundleDueNowPrice').val(total);
			 }
		}
		//setUpdateDeviceItemInfoForRenewal();
	});
	$( '#simDrpDwn' ).change( function () {
		
		var selectedId = $("input:radio[name=option]:radio:checked").attr('id');
		var myLabel = $('label[for="label'+ selectedId +'"]');
		
		price = myLabel.find( '.value' ).attr( 'data-value' ),
		quantity_txt = $( '.js-quantity' ),
		quantity = quantity_txt.val(),
		total = null;
		
		var selectedSimId = $('#simDrpDwn').val();
		var simPrice = 0;
		if($('#simDrpDwn').find(":selected").attr('class') != undefined) {
			simPrice = $('#simDrpDwn').find(":selected").attr('class');
		}
		
		if(price == undefined){
			var offeeTermId=document.getElementById('updateOfferingTermId').value;
			if(offeeTermId != '')
			{
				var chkBxDivId="div"+offeeTermId;
				clicked=$(document.getElementById(chkBxDivId));
				price = clicked.find( '.value' ).attr( 'data-value' );
			}else{
				// Added below code to fix the defect EOFR-4274
				price = 0;
			}
		}
		if ( $.isNumeric( quantity ) ) {
			total = ( quantity * price ) + ( quantity * simPrice );
		} else {
			// Fix for EOFR-6949
			if (simPrice != "") {
				total = parseFloat(price) + parseFloat(simPrice);
			} else {
				total = parseFloat(price);
			}
			//total = parseFloat( price + simPrice);
		}
		var dueNow = $( '.total' );
		var languages = $('#languages').val();
		if(languages == 'fr'){
			dueNow.text( parseFloat( total, 10 ).toFixed( 2 ).replace( /(\d)(?=(\d{3})+\.)/g, "$1," ).toString().replace(".",",")+ '$');
		}else{
			dueNow.text( '$'+parseFloat( total, 10 ).toFixed( 2 ).replace( /(\d)(?=(\d{3})+\.)/g, "$1," ).toString() );
		}
		var flow = $('#flow').val();
		 if(flow == 'bundle'){
			isOfferSelected = $('.frg-checkbox-acquisition').find('input').is(':checked');
			 if(!isOfferSelected){
				mTotal=0;
				var dueMonthly = $( '.monthlytotal' );
				$('#bundleDueMonthlyPrice').val(0);
				//reset due monthly if nothing selected
				if(languages == 'fr'){
					dueMonthly.text( parseFloat( mTotal, 10 ).toFixed( 2 ).replace( /(\d)(?=(\d{3})+\.)/g, "$1," ).toString().replace(".",",")+ '$');
				}else{
					dueMonthly.text( '$'+parseFloat( mTotal, 10 ).toFixed( 2 ).replace( /(\d)(?=(\d{3})+\.)/g, "$1," ).toString() );
				}
			 }
			 $('#bundleDueNowPrice').val(total);
		 }
	});
	
	$('#cancelOrderText').keyup(function () {
		if(this.value==""){
			$('#cancelbutton').addClass('state-disabled');
		}else{
			$('#cancelbutton').removeClass('state-disabled');
		}
		
	});
	
	$('#rejectOrderText').keyup(function () {
		if(this.value==""){
			$('#rejectbutton').addClass('state-disabled');
		}else{
			$('#rejectbutton').removeClass('state-disabled');
		}
		
	});
	
	$('#deviceQty').keyup(function () {
		if (this.value != this.value.replace(/[^0-9\.]/g, '')) {
			this.value = this.value.replace(/[^0-9\.]/g, '');
		} else {
			var selectedId = $("input:radio[name=option]:radio:checked").attr('id');
			var myLabel = $('label[for="label'+ selectedId +'"]');
			
			price = myLabel.find( '.value' ).attr( 'data-value' ),
			monthlyPrice = myLabel.find( '.value' ).attr( 'data-monthlyFinanceAmt' ),
			quantity_txt = $( '.js-quantity' ),
			quantity = quantity_txt.val(),
			monthlyTotal = null,
			skuAvailability =  $( '#skuAvailability' ),
			total = null;
			if(price == undefined){
				var offeeTermId=document.getElementById('updateOfferingTermId').value;
				if(offeeTermId != '')
				{
					var chkBxDivId="div"+offeeTermId;
					clicked=$(document.getElementById(chkBxDivId));
					price = clicked.find( '.value' ).attr( 'data-value' );
				}else{
					price = 0; 
				}
			}
			
			if(monthlyPrice == undefined){
				monthlyPrice = 0; 
			}
			
			if(skuAvailability.val() == 'false'){
				var disable = $(".js-submit-only-once").hasClass( 'state-disabled' );
			
				if(disable == 'false'){
					$(".js-submit-only-once").addClass( 'state-disabled' );
				}
			}
			var selectedSimId = $('#simDrpDwn').val();
			var simPrice = 0;
			//dont get price of select option
			if(selectedSimId!= "" && $('#simDrpDwn').find(":selected").attr('class') != undefined) {
				simPrice = $('#simDrpDwn').find(":selected").attr('class');
			}
			
			var warrantyPrice = 0;
			var skuId = $("#selectedSkuIdValue").val();
			var warrantyItem = $('.warrantyItems_' + skuId).find("input:radio[name=warrantySkuId]:radio:checked");
			if(warrantyItem != undefined) {
				warrantyPrice = warrantyItem.attr('data-price') != undefined ? parseFloat( warrantyItem.attr('data-price')) : 0;
			}
			
			if ( $.isNumeric( quantity ) ) {
				total = ( quantity * price ) + ( quantity * simPrice );
				monthlyTotal = ( quantity * monthlyPrice ) + (quantity * warrantyPrice );
			} else {
				total = parseFloat( price + simPrice);
				monthlyTotal = monthlyPrice + warrantyPrice;
			}
			var dueNow = $( '.total' );
			var dueMonthly = $( '.monthlytotal' );
			var languages = $('#languages').val();
			if(languages == 'fr'){
				
				dueNow.text( parseFloat( total, 10 ).toFixed( 2 ).replace( /(\d)(?=(\d{3})+\.)/g, "$1," ).toString().replace(".",",")+ '$');
				dueMonthly.text( parseFloat( monthlyTotal, 10 ).toFixed( 2 ).replace( /(\d)(?=(\d{3})+\.)/g, "$1," ).toString().replace(".",",")+ '$');
			}else{
				dueNow.text( '$'+parseFloat( total, 10 ).toFixed( 2 ).replace( /(\d)(?=(\d{3})+\.)/g, "$1," ).toString() );
				dueMonthly.text( '$'+parseFloat( monthlyTotal, 10 ).toFixed( 2 ).replace( /(\d)(?=(\d{3})+\.)/g, "$1," ).toString() );
			}
			var flow = $('#flow').val();
			 if(flow == 'bundle'){
				 $('#bundleDueMonthlyPrice').val(monthlyTotal);
				 $('#bundleDueNowPrice').val(total);
			 }
			//dueNow.text( '$'+parseFloat( total, 10 ).toFixed( 2 ).replace( /(\d)(?=(\d{3})+\.)/g, "$1," ).toString() );
			//dueMonthly.text( '$'+parseFloat( monthlyTotal, 10 ).toFixed( 2 ).replace( /(\d)(?=(\d{3})+\.)/g, "$1," ).toString() );
		}
	});
	//activation device details script -end
	
	//upgrade device details required field validations -start
	$( '.upgrade-js-required' ).keyup( function ( e ) {
		checkUpgradeRequiredField( e );
	}).change( function ( e ) {
		checkUpgradeRequiredField( e );
	});	
	//upgrade device details required field validations -end		
	
	$( '.js-sort-by' ).change( function () {

		$("#mscDetailsText").text($("#mscDetailsText").text().trim());
		var mscAmount = $( this ).find(":selected").data('msc');
		var languages = $('#languages').val();
		if(languages == 'fr'){
				
				if(mscAmount == '' || mscAmount == undefined ){
				$('.mscAmountTxt').text('0,00$' );
				}else{
					mscAmount = mscAmount.replace(".",",");
					$('.mscAmountTxt').text(parseFloat( mscAmount, 10 ).toFixed( 2 ).replace( /(\d)(?=(\d{3})+\.)/g, "$1," ).toString()+ '$'  );
				}
			}else{
				if(mscAmount == '' || mscAmount == undefined){
					$('.mscAmountTxt').text('$0.00' );
					}else{
						$('.mscAmountTxt').text( '$'+parseFloat( mscAmount, 10 ).toFixed( 2 ).replace( /(\d)(?=(\d{3})+\.)/g, "$1," ).toString()  );
					}
			}
	});

	$('.hover_warranty_yes').mouseover(

	    function () {
	       $('.ban_not_selected').show();
	    }
	).mouseleave(function() {
    		$('.ban_not_selected').hide();
  	});
	$( '.plan .select' ).click( function () {
			var clicked = $( this ),
			plans = $( '.plan' ),
			selects = $( '.plan .frg-button.select' ),
			plan = clicked.closest( '.plan' ),
			select = plan.find( '.frg-button.select' ),
			price = plan.find( 'input[name=price_per_month]' ).val(),
			planSkuId = plan.find( 'input[name=planSkuId]' ).val(),
			parentProductId = plan.find( 'input[name=parentProductId]' ).val(),
			commerceItemType = plan.find( 'input[name=commerceItemType]' ).val(),
			socList = plan.find( 'input[name=socList]' ).val(),
			monthly = $( '.monthly' ),
			devices = $( 'input[name=nbr_device]' ).val();
			var languages = $('#languages').val();
			var flowName = $("#flowName").val();
			
			// EOFR-9016 fix - below price is device monthly price for Finance
			var currentDeviceMonthlyPrice = plan.find( 'input[name=currentDeviceMonthlyPrice]' ).val();
			currentDeviceMonthlyPrice = parseFloat(currentDeviceMonthlyPrice);
			if(flowName == 'bundle'){ 

			// EOFR-8370: If a plan it is selected, then it will be deducted in Due Now 
				// When browsering to a previous page, this find the selected Price Plan
				// and deduct it to the current Due Now, if no plan is selected then value will be 0
				selectedPrevPlan = $('a[class*="current"]').parent().children('input[name="price_per_month"]').val();
				if (selectedPrevPlan === undefined) {
					selectedPrevPlan = 0;
				}
                
				var planMonthlyPriceValFrmDevicePage = $("#planMonthlyPriceValFrmDevicePage").val();
				var dueMonthlyVal = $("#dueMonthlyPrice").val();
                var totalMonthlyPrice = parseFloat(price) + parseFloat(currentDeviceMonthlyPrice);
				$("#dueMonthlyPrice").val(totalMonthlyPrice);
				$("#updatedMonthlyPrice").val(totalMonthlyPrice);
				if(languages == 'fr'){	
					totalMonthlyPrice = parseFloat( totalMonthlyPrice, 10 ).toFixed( 2 ).replace( /(\d)(?=(\d{3})+\.)/g, "$1," ).toString().replace(".",",")+ '$';
				}else{
					totalMonthlyPrice = '$'+parseFloat( totalMonthlyPrice, 10 ).toFixed( 2 ).replace( /(\d)(?=(\d{3})+\.)/g, "$1," ).toString();
				}
				$("#dueMonthlyPriceVal").html(totalMonthlyPrice);
			}
			var currentMonthlyPrice = plan.find( 'input[name=orderMonthlyTotal]' ).val();
			currentMonthlyPrice = parseFloat(currentMonthlyPrice);
			//var currentDeviceMonthlyPrice = plan.find( 'input[name=currentDeviceMonthlyPrice]' ).val();
			//currentDeviceMonthlyPrice = parseFloat(currentDeviceMonthlyPrice);
			if(flowName != 'bundle' || flowName == undefined){
	         	var monthly_balance = currentMonthlyPrice + (price * devices.trim()) - currentDeviceMonthlyPrice; 
			} 
			//var monthly_balance = currentMonthlyPrice + (price * devices.trim()); changes for EOFR-4646
			$('#catalogRefId').attr("value", planSkuId) ;
			$('#productId').attr("value", parentProductId) ;
			$('#commerceItemType').attr("value", commerceItemType) ;
			$('#socList').attr("value", socList) ;
			var selectLabelValue=$('#selectLabelValue').val();
			var selectedLabelValue=$('#selectedLabelValue').val();
			
			selects.removeClass( 'current' ).text(selectLabelValue);
			select.addClass( 'current' ).text( selectedLabelValue );
			if (flowName != 'bundle') {
				if(languages == 'fr'){
					
					monthly.text( parseFloat( monthly_balance, 10 ).toFixed( 2 ).replace( /(\d)(?=(\d{3})+\.)/g, "$1," ).toString().replace(".",",")+ '$');
				}else{
					monthly.text( '$'+parseFloat( monthly_balance, 10 ).toFixed( 2 ).replace( /(\d)(?=(\d{3})+\.)/g, "$1," ).toString() );
				}
			} // EOFR-6719 - set the correct due monthly price for bundle flow
			else if (flowName == 'bundle') {
				monthly.text( totalMonthlyPrice);
			}
			/*monthly_balance = '$' + parseFloat( monthly_balance, 10 ).toFixed( 2 ).replace( /(\d)(?=(\d{3})+\.)/g, "$1," ).toString();

			monthly.text( monthly_balance);*/
		});
	
	$( '.js-bundle-upgrade-offer' ).change( function (eve, param1) {
		var dropdown = $( this ),
			deviceBalance = dropdown.closest( 'tr' ).find( '.deviceBalance' ),
			dueNow = dropdown.closest( 'tr' ).find( '.dueNow' ),
			quotaInContract = $('#quota-in-contract'),
			balanceQuota = $('.col-sm-4 .left .circle');
		
		if ( dropdown.val() !== null && dropdown.val().toLowerCase() !== 'select' ) {
			if(dropdown.val().toLowerCase() === 'regularrenewal') {
				dueNow.text(deviceBalance.text());
			if(param1 !== 'pageLoad') {
					usedQuotaCounter--;
				}
			} else if(dropdown.val().toLowerCase() === 'allotment' || dropdown.val().toLowerCase() === 'float' || dropdown.val().toLowerCase() === 'hpp') {
				var languages = $('#languages').val();
				if(languages == "fr"){
					dueNow.text('Ne sera pas factur\xE9');
				}else{
				dueNow.text('Waived');
				}
				if( dropdown.val().toLowerCase() != 'hpp'){
					usedQuotaCounter++;
					}
			} else {
				var languages = $('#languages').val();
				if(languages == "fr"){
					dueNow.text('Ne sera pas factur\xE9');
				}else{
					dueNow.text('Waived');
				}
			}
		}
		//console.log(usedQuotaCounter);
		var counter = 0;
		$( '.js-bundle-upgrade-offer' ).each(function() {
			var selectedOffer = $(this).val();
			if(selectedOffer == 'float' || selectedOffer == 'allotment') {
				counter ++;
			}
		});
		//console.log(usedQuotaCounter);
		balanceQuota.text(quotaInContract.val()-counter);
	});

		var usedQuotaCounter = 0;
		$( '.js-upgrade-offer' ).change( function (eve, param1) {
			var dropdown = $( this ),
				action_button_choose = $('.operations .chooseBundle'),
				status = dropdown.closest( 'tr' ).find( '.status' ),
				deviceBalance = dropdown.closest( 'tr' ).find( '.deviceBalance' ),
				dueNow = dropdown.closest( 'tr' ).find( '.dueNow' ),
				quotaInContract = $('#quota-in-contract'),
				renewalType = $('#txt_renewalType').val(),
				balanceQuota = $('.col-sm-4 .left .circle');
				$('#noUpgradeBunbles').hide();
				$('#allotmentBundlesError').hide();
				$( '.renewalBundleMessage' ).hide();

			if ( dropdown.val().toLowerCase() !== 'select' ) {
				if ( status.text().toLowerCase().indexOf('complete') == -1 && status.text().toLowerCase().indexOf('termin')== -1) {
					var languages = $('#languages').val();
					if(languages == "fr"){
						status.text( 'Dispositif en attente et le plan' );
					}else{
					status.text( 'Pending device & plan' );
					}
				}
				if(dropdown.val().toLowerCase() === 'regularrenewal') {
					dueNow.text(deviceBalance.text());
					if(param1 !== 'pageLoad') {
						usedQuotaCounter--;
					}
					if(param1 !== 'pageLoad' && (status.text().toLowerCase().indexOf('complete') > -1 &&  status.text().toLowerCase().indexOf('termin'))){
						UPGRADE_OFFER_AJAX.updateDeviceTransferInfo(dropdown,deviceBalance);
					}
				} else if(dropdown.val().toLowerCase() === 'allotment' || dropdown.val().toLowerCase() === 'float' || dropdown.val().toLowerCase() === 'hpp') {
					var languages = $('#languages').val();
					if(languages == "fr"){
						dueNow.text('Ne sera pas factur\xE9');
					}else{
					dueNow.text('Waived');
					}
					usedQuotaCounter++;
					if(param1 !== 'pageLoad' && (status.text().toLowerCase().indexOf('complete') > -1 && status.text().toLowerCase().indexOf('termin'))){
						UPGRADE_OFFER_AJAX.updateDeviceTransferInfo(dropdown,deviceBalance);
					}
				} else {
					var languages = $('#languages').val();
					if(languages == "fr"){
						dueNow.text('Ne sera pas factur\xE9');
					}else{
					dueNow.text('Waived');
					}
					
					//usedQuotaCounter--;
				}
			} else {
				if ( status.text().toLowerCase().indexOf('complete') > -1 && status.text().toLowerCase().indexOf('termin')== -1) {
					var languages = $('#languages').val();
					if(languages == "fr"){
						status.text( 'Dans l\'attente de l\'offre de mise 	\xE0 niveau' );
					}else{
					status.text( 'Pending upgrade offer' );
					}
				}
			}
			//console.log(usedQuotaCounter);
			if(renewalType == 'float' || renewalType == 'allotment') {
				balanceQuota.text(quotaInContract.val()-usedQuotaCounter);
			}
			
			var action_button_add = $( '.operations .addButton' ),
			action_button_remove = $( '.operations .removeButton' ),
			checkboxes = $( 'input[type=checkbox]' ),
			hasUpgradeBundles = $( '#hasUpgradeBundles' ).val(),
			atleastOneComplete=0,
			atleastOneAllotmentSelected=false,
			enableAdd = false,
			enableRemove = false,
			offerTypeSelected = $(this).closest( 'tr' ).find( '.js-upgrade-offer').val(),
			selectedCheckbox = $(this).closest( 'tr' )
				.find( '.frg-checkbox input[type=checkbox]' ),
			icon = $(this).closest( 'tr' ).find( '.icon .frg-icon' );
			
			if(renewalType == 'float' || renewalType == 'allotment') {
				var pendingQuota =  quotaInContract.val() - usedQuotaCounter,
			    usedQuota = 0;
				
				if(pendingQuota <= 0) {
					// EOFR-10151
					// $('#quotaFullyUsedWarning').show();
					$( '.js-upgrade-offer' ).each( function () {
						if(!($(this).val() == 'float' || $(this).val() == 'allotment') || usedQuota == quotaInContract.val()) {
							$(this).find("option[value*='float']").attr("disabled","disabled");
							$(this).find("option[value*='float']").next('option').attr('selected', 'selected');
							
							$(this).find("option[value*='allotment']").attr("disabled","disabled");
							$(this).find("option[value*='allotment']").next('option').attr('selected', 'selected');
							
						} else {
							usedQuota++;
						}
					});
				} else {
					$('#quotaFullyUsedWarning').hide();
					var floatDropdowns = $(".js-upgrade-offer option[value='float']"),
					allomentDropdowns = $(".js-upgrade-offer option[value='allotment']");
					if(floatDropdowns != null && floatDropdowns.length > 0) {
						floatDropdowns.removeAttr("disabled");
					}
					
					if(allomentDropdowns != null && allomentDropdowns.length > 0) {
						allomentDropdowns.removeAttr("disabled");
					}
				}
			}

		var isAllotmentSelected =0;	
		checkboxes.each( function () {
			var checkbox = $( this );
			currentcheckboxofferTypeSelected = checkbox.closest( 'tr' ).find( '.js-upgrade-offer').val();
			if(currentcheckboxofferTypeSelected === 'allotment') {
				atleastOneAllotmentSelected = true;
			}
			
			if(checkbox.is( ':checked' ) &&	currentcheckboxofferTypeSelected === 'allotment'){
					isAllotmentSelected++;
			}
				
			if(selectedCheckbox.is( ':checked' ) || icon.hasClass( 'icon-checkmark' )) {
				currentcheckboxofferTypeSelected = checkbox.closest( 'tr' ).find( '.js-upgrade-offer').val();
				if(offerTypeSelected === 'allotment' && currentcheckboxofferTypeSelected === offerTypeSelected) {
					if(checkbox.val() === selectedCheckbox.val() ) {
						checkbox.attr("disabled", false);
					} else {
						checkbox.attr("disabled", true);
						checkbox.closest(".frg-checkbox").find(".icon .frg-icon").removeClass( "icon-checkmark" );
					}
				}
				if(offerTypeSelected === 'float') {
						checkboxofferTypeSelected = checkbox.closest( 'tr' ).find( '.js-upgrade-offer').val();
						if(checkboxofferTypeSelected === 'float'){
							checkbox.attr("disabled", false);
						}else{
							checkbox.attr("disabled", true);
							checkbox.closest(".frg-checkbox").find(".icon .frg-icon").removeClass( "icon-checkmark" );
						}
				}if(offerTypeSelected === 'hpp' && currentcheckboxofferTypeSelected === offerTypeSelected) {
					if(checkbox.val() === selectedCheckbox.val() ) {
						checkbox.attr("disabled", false);
					} else {
						checkbox.attr("disabled", true);
						checkbox.closest(".frg-checkbox").find(".icon .frg-icon").removeClass( "icon-checkmark" );
					}
				}else{
					checkboxofferTypeSelected = checkbox.closest( 'tr' ).find( '.js-upgrade-offer').val();
					if(checkboxofferTypeSelected === 'regularRenewal'){
						checkbox.attr("disabled", false);
					}else{
						checkbox.attr("disabled", true);
						checkbox.closest(".frg-checkbox").find(".icon .frg-icon").removeClass( "icon-checkmark" );
					}
				}
			
			} else {
				checkbox.attr("disabled", false);
			}
			
			
			if ( checkbox.is( ':checked' ) ) {
				enableRemove = true;
				
				var status = checkbox.closest( 'tr' ).find( '.status' );
				if ( status.text().toLowerCase().indexOf('complete') > -1 ) {
					atleastOneComplete = atleastOneComplete +1;
				} else {
					enableAdd = true;
				}
				
			}
		});
		chooseBundle_position = $( ".chooseBundle" ).position().left;
		//change bundle message position when french
		var chooseButton = $('.chooseBundle').val();
		if(chooseButton == "Choisir un ensemble"){
			$(".upgradeBunblesMessage").css("margin","50px 0 0 -15px")
			$(".renewalBundleMessage").css("width","219px");
		}else{
			$(".upgradeBunblesMessage").css("margin","50px 0 0 -35px")
			$(".renewalBundleMessage").css("width","174.81px");
		}
		$(".renewalBundleMessage").css("left", chooseBundle_position);
		if ( enableAdd && atleastOneComplete == 0) {
			action_button_add.removeClass( 'state-disabled' );
			if(dropdown.val().toLowerCase() !== 'allotment'){
					if(hasUpgradeBundles == 'true'){
							action_button_choose.removeClass( 'state-disabled' );
							$( '.renewalBundleMessage' ).hide();

					}
					else{
						action_button_choose.addClass( 'state-disabled' );
						//show message bundles
						$('#noUpgradeBunbles').show();
						$( '.renewalBundleMessage' ).show();
					}
				}else{
					action_button_choose.addClass( 'state-disabled' );
					//show message of allotment
					$('#allotmentBundlesError').show();
					$( '.renewalBundleMessage' ).show();
				}
		} else {
			action_button_add.addClass( 'state-disabled' );
			action_button_choose.addClass( 'state-disabled' );
			$( '.renewalBundleMessage' ).show();
		}
		if ( enableRemove ) {
			action_button_remove.removeClass( 'state-disabled' );
		} else {
			action_button_remove.addClass( 'state-disabled' );
		}
			if(isAllotmentSelected>0){
			action_button_choose.addClass( 'state-disabled' );
			}	
		});
		
		var UPGRADE_OFFER_AJAX = { updateDeviceTransferInfo: function (dropdown, deviceBal) {
			JAG.start();
				var contextPath = $('#contextPath').val(),
				orderId = $('#orderId').val(),
				deviceItemId = $('#deviceItemId').val();
				transInfoId = $('#transferInfoId').val();
			$.ajax({
				url: contextPath + "/store/jaguar/upgrade/subscribers/updateUpgradeOfferTypeAjaxReq.jsp",
				type: "post",
				data: {orderId: orderId, deviceCommerceItemId: deviceItemId, transferInfoId: transInfoId, offerType: dropdown.val(), deviceBalance: deviceBal.text()},
				success : function (data,status,xhr) {
					JAG.stop();
				},
				error: function(data,status,xhr){
					console.log("error in update offer type ajax call");
					JAG.stop();
				}
				
			});
		}
		}
		
		$( '.upgrades_subscriber input[type=checkbox]' ).click( function () {
			var action_button_add = $( '.operations .addButton' ),
				action_button_remove = $( '.operations .removeButton' ),
				action_button_choose = $('.operations .chooseBundle'),
				checkboxes = $( 'input[type=checkbox]' ),
				hasUpgradeBundles = $( '#hasUpgradeBundles' ).val(),
				atleastOneComplete=0,
				enableAdd = false,
				enableRemove = false,
				offerTypeSelected = $(this).closest( 'tr' ).find( '.js-upgrade-offer').val(),
				selectedCheckbox = $(this);
				submit_button = $('input.frg-button.color-green');
1
			
			$('#noUpgradeBunbles').hide();
			$('#allotmentBundlesError').hide();
			if(submit_button.hasClass('state-disabled'))
			{
				submit_button.removeClass('state-disabled');
			}
			checkboxes.each( function () {
				var checkbox = $( this );
				if(selectedCheckbox.is( ':checked' )) {
					currentcheckboxofferTypeSelected = checkbox.closest( 'tr' ).find( '.js-upgrade-offer').val();
					
					if(offerTypeSelected === 'allotment') {
						if(checkbox.val() === selectedCheckbox.val() ) {
							checkbox.attr("disabled", false);
						} else {
							checkbox.attr("disabled", true);
							checkbox.closest(".frg-checkbox").find(".icon .frg-icon").removeClass( "icon-checkmark" );
						}
					}else if(offerTypeSelected === 'float') {
							checkboxofferTypeSelected = checkbox.closest( 'tr' ).find( '.js-upgrade-offer').val();
							if(checkboxofferTypeSelected === 'float' || checkboxofferTypeSelected === 'regularRenewal'){
								checkbox.attr("disabled", false);
							}else{
								checkbox.attr("disabled", true);
								checkbox.closest(".frg-checkbox").find(".icon .frg-icon").removeClass( "icon-checkmark" );
							}
					}else if(offerTypeSelected === 'hpp') {
						var hppCounter = $('#hppCounterAvailable').val();
						if(checkboxes.filter(':checked').length <= hppCounter){
							checkboxofferTypeSelected = checkbox.closest( 'tr' ).find( '.js-upgrade-offer').val();
							if(checkboxofferTypeSelected === 'hpp'){
								checkbox.attr("disabled", false);
							}else{
								checkbox.attr("disabled", true);
								checkbox.closest(".frg-checkbox").find(".icon .frg-icon").removeClass( "icon-checkmark" );
							}
						}else{
							if(!submit_button.hasClass('state-disabled'))
							{
								submit_button.addClass('state-disabled');
							}
							text_hpp_error=$('#hppFullyUsedError').find('.resourceBundleDebug').text();
							if(hppCounter>0){
									$('#hppFullyUsedError').find('.resourceBundleDebug').text(text_hpp_error+" "+hppCounter);
									$('#hppFullyUsedError').show();
							}else{
									$('#hppFullyUsedError').show();
							}
							
						}
						
					}else if(offerTypeSelected === 'regularRenewal') {
						checkboxofferTypeSelected = checkbox.closest( 'tr' ).find( '.js-upgrade-offer').val();
						if(checkboxofferTypeSelected === 'regularRenewal' || checkboxofferTypeSelected === 'float'){
							checkbox.attr("disabled", false);
						}else{
							checkbox.attr("disabled", true);
							checkbox.closest(".frg-checkbox").find(".icon .frg-icon").removeClass( "icon-checkmark" );
						}
					}
				} else {
					checkbox.attr("disabled", false);
					if(offerTypeSelected === 'hpp') {
						$('#hppFullyUsedError').hide();
					}
				}
				
				if ( checkbox.is( ':checked' ) ) {
					enableRemove = true;
					
					var status = checkbox.closest( 'tr' ).find( '.status' );
					if ( status.text().toLowerCase().indexOf('complete') > -1 ) {
						atleastOneComplete = atleastOneComplete +1;
					} else {
						enableAdd = true;
					}
					
				}
				
			});
			
			var chooseButton = $('.chooseBundle').val();
			if(chooseButton == "Choisir un ensemble"){
				$(".upgradeBunblesMessage").css("margin","50px 0 0 -15px")
				$(".renewalBundleMessage").css("width","219px");
			}else{
				$(".upgradeBunblesMessage").css("margin","50px 0 0 -35px")
				$(".renewalBundleMessage").css("width","174.81px");
			}
			if(chooseButton!=undefined){
				chooseBundle_position = $( ".chooseBundle" ).position().left;
				$(".renewalBundleMessage").css("left", chooseBundle_position);
			}
			
			if ( enableAdd && atleastOneComplete == 0) {
				action_button_add.removeClass( 'state-disabled' );
				if(offerTypeSelected !== 'allotment'){
					if(hasUpgradeBundles == 'true'){
							action_button_choose.removeClass( 'state-disabled' );
							$( '.renewalBundleMessage' ).hide();

					}
					else{
						//show message bundles
						$('#noUpgradeBunbles').show();
					}
				}else{
					//show message of allotment
					$('#allotmentBundlesError').show();
				}
			} else {
				action_button_add.addClass( 'state-disabled' );
				action_button_choose.addClass( 'state-disabled' );
				$( '.renewalBundleMessage' ).show();
			}
			if ( enableRemove ) {
				action_button_remove.removeClass( 'state-disabled' );
			} else {
				action_button_remove.addClass( 'state-disabled' );
			}
		});
		$(".renewalBundleMessage").hover(function(){
			$("#renewalBundleMessage").show();
		});
																
		$(".renewalBundleMessage").mouseleave(function(){			
			$("#renewalBundleMessage").hide();
		});

		$('.upgradeFlow').on('click', function(event){
		    	isMissingAvailable = $('.missingAddons_dialog_modal');
		    	if(isMissingAvailable.length>0 && event.originalEvent !== undefined){
					event.preventDefault();
					$('#select_missingAddons_modal').modal({
		                keyboard: false,
		                backdrop: 'static'
		            });
					$('#select_missingAddons_modal').css({ 'display': "block" });
				}
			});
		
		$('#noMissingAddonsFlow').on('click', function (){
			$('.saveContinue').click();
			$('#select_missingAddons_modal').modal('hide');
		});

		$('#yesMissingAddonsFlow').on('click', function (){
			deviceCommerceItemId = $('.deviceCommerceItemId').val();
			v_lang = $('.v_lang').val();
			chooseBundle = $('.chooseBundle').val();
			$('.nextSuccessURL').val('/upgrade/missingAddons.jsp?deviceCommerceItemId='+deviceCommerceItemId+'&lang='+v_lang+'&chooseBundle='+chooseBundle);
			$('.saveContinue').click();
			$('#select_missingAddons_modal').modal('hide');
		});

		$('.nextPage').click(function() {
			var prodId = $(this).attr('prodId');
			var scId = $('#serviceCategoryDropDown').val();
			var tabSelected=$('.filter_nav .current').attr('data-filter');
			var nextPageURL = $(this).prop('href');
			if(nextPageURL.indexOf('&serviceCategoryId=')>=0)
			{
				URL=nextPageURL.split('&serviceCategoryId=');
				nextPageURL=URL[0];

			}else if(nextPageURL.indexOf('?serviceCategoryId=')>=0){
						URL=URL.split('?serviceCategoryId=');
						URL=URL[0];
			}
			if(tabSelected=="recent"){
				var nextPageURL = $(this).prop('href');
			}
			else{
				tabSelected=$('.filter_nav .current').text().trim();
				filter_by=$('.js-sort-by').val().trim();
				if(tabSelected.indexOf('&')>=0){
					tabSelected = tabSelected.replace(/&/g, "-38");
				}
				if(filter_by.indexOf('&')>=0){
					filter_by = filter_by.replace(/&/g, "-38");
				}

				var nextPageURL = $(this).prop('href') + '&serviceCategoryId=' + scId + '&tabSelected=' + tabSelected + '&filter=' + filter_by ;
			}
			//Need it for IE
			var isExplorer = !!navigator.userAgent.match(/Trident/g) || !!navigator.userAgent.match(/MSIE/g);

			if (isExplorer)
			{
				localStorage.setItem("previousUrl", window.location.href);
			}
			//end IE
			$(this).attr('href',nextPageURL);
		});

		$(document).on('click', '.warrantyItems_rd', function() {
			var skuId = $("#selectedSkuIdValue").val();
			var warrantyItem = $('.warrantyItems_' + skuId).find("input:radio[name=warrantySkuId]:radio:checked"),
			warrantySku = warrantyItem.val(),
			warrantyPrice = warrantyItem.attr('data-price'),
			warrantyPriceDetails = warrantyItem.attr('data-priceDetails');
			$("#txt_warrantyPrice").val(warrantyPrice);
			$("#txt_warrantySkuId").val(warrantySku);
			$("#txt_warrantyPriceDetails").val(warrantyPriceDetails);
			
			$('#deviceQty').keyup();
		});
		
		$(document).on('click', '.upgradeWarrantyItems_rd', function() {
			isUpdateItemWarraty = $('#isUpdateItemWarraty').val();
			
				var skuId = $("#selectedSkuIdValue").val();
				var warrantyItem = $('.upgradeWarrantyItems_' + skuId).find("input:radio[name=warrantySkuId]:radio:checked"),
				warrantySku = warrantyItem.val(),
				warrantyPrice = warrantyItem.attr('data-price'),
				warrantyPriceDetails = warrantyItem.attr('data-priceDetails');
				$("#txt_warrantyPrice").val(warrantyPrice);
				$("#txt_warrantySkuId").val(warrantySku);
				$("#txt_warrantyPriceDetails").val(warrantyPriceDetails);
			if(isUpdateItemWarraty=='false'){	
				onSelectSim();
			}
		});

		$(document).on('click', '#warrantyTermsCheckbox', function() {			
			var clicked = $( this ).closest( '.frg-checkbox' ),
			checkbox = $( this ),
			icon = clicked.find( '.icon .frg-icon' );		
			if ( icon.hasClass( 'icon-checkmark' ) ) {
				icon.removeClass( 'icon-checkmark' );
				checkbox.val("");
			} else {
				icon.addClass( 'icon-checkmark' );
				checkbox.val("Yes");
			}			
			$( '.upgrade-js-required' ).keyup();
		});
		
		$(document).on('click', '#upgradeWarrantyTermsCheckbox', function() {			
			var clicked = $( this ).closest( '.frg-checkbox' ),
			icon = clicked.find( '.icon .frg-icon' );		
			if ( icon.hasClass( 'icon-checkmark' ) ) {
				icon.removeClass( 'icon-checkmark' );
			} else {
				icon.addClass( 'icon-checkmark' );
			}	
			
			var selectedBundle = $("input:radio[name=option]:radio:checked"),
			bundleType = selectedBundle.closest('tr').find('#bundleType').val();
			var upgradeCheckbox = document.getElementById("upgradeWarrantyTermsCheckbox");
			if(bundleType == 'Upgrade' && $("#banDrpDwn").val() != "" && upgradeCheckbox != null && upgradeCheckbox.checked == true) {
				$('.bundleContinueBtn').attr("disabled", false);
			} else {
				$('.bundleContinueBtn').attr("disabled", true);
			}
		});

		$(document).ready(function($) {

		  if (window.history && window.history.pushState) {
		  	devicePage = window.location.href;
		  	if(devicePage.indexOf('deviceDetails')!=-1 || devicePage.indexOf('devicesListing')!=-1 || devicePage.indexOf('bundleDevicesListing')!=-1){
			    window.history.pushState('forward', null, null);

			    $(window).on('popstate', function() {

			    	
			    	scId = getVariableURL('serviceCategoryId');
				    tabSelected=getVariableURL('tabSelected');
				    filter_by=getVariableURL('filter');
			    	if( devicePage.indexOf('deviceDetails')!=-1 && tabSelected){
				    	//Need it for IE
						var isExplorer = !!navigator.userAgent.match(/Trident/g) || !!navigator.userAgent.match(/MSIE/g);
				    	if (isExplorer && localStorage.getItem("previousUrl")!='null')
						{
							URL = localStorage.getItem("previousUrl");
						}
						else
						{
				    		URL =window.document.referrer;
				    	}
				    	if(URL.indexOf('&serviceCategoryId=')>=0)
						{
							URL=URL.split('&serviceCategoryId=');
							URL=URL[0];
						}else if(URL.indexOf('?serviceCategoryId=')>=0){
							URL=URL.split('?serviceCategoryId=');
							URL=URL[0];
						}
				    	if(URL.indexOf("?")>=0){
				    		var URL = URL + '&serviceCategoryId=' + scId + '&tabSelected=' + tabSelected + '&filter=' + filter_by;
				    	}else{
				    		var URL = URL + '?serviceCategoryId=' + scId + '&tabSelected=' + tabSelected + '&filter=' + filter_by;	
				    	}
				    	$(location).attr('href', URL);
				    }else if(devicePage.indexOf('deviceDetails')!=-1 && !tabSelected){
				    	//Need it for IE
						var isExplorer = !!navigator.userAgent.match(/Trident/g) || !!navigator.userAgent.match(/MSIE/g);
				    	if (isExplorer && localStorage.getItem("previousUrl")!='null')
						{
							URL = localStorage.getItem("previousUrl");
						}
						else
						{
				    		URL =window.document.referrer;
				    	}
				    	if(URL.indexOf('&serviceCategoryId=')>=0)
						{
							URL=URL.split('&serviceCategoryId=');
							URL=URL[0];
						}else if(URL.indexOf('?serviceCategoryId=')>=0){
							URL=URL.split('?serviceCategoryId=');
							URL=URL[0];
						}
						$(location).attr('href', URL);
				    }else if(devicePage.indexOf('devicesListing')!=-1 || devicePage.indexOf('bundleDevicesListing')!=-1 ){
				    	URL = devicePage;
				    	if(URL.indexOf('bundleDevicesListing')!=-1){
				    		tempUrl = URL.split('/createBundle/');
				    		URL = tempUrl[0]+"/createBundle/bundlesListing.jsp";
				    	}else if(URL.indexOf('acquisition')!=-1){
				    		URL = $(".logo.block").attr('href');
				    	}else if(URL.indexOf('upgrade')!=-1){
				    		tempUrl = URL.split('upgrade/');
				    		URL = tempUrl[0]+"upgrade/subscribers.jsp";
				    	}
				    	$(location).attr('href', URL);
				    }
				});
		  	}
		  }	
		});
		function getVariableURL (varible){
			var url = window.location.search.substring(1);
			var params = url.split("&");
			for(var i=0; i<params.length;i++){
				var check = params[i].split("=");
				if(check[0]==varible){return check[1]}
			}
			return (false);
		}
		$('.editSubscriber').click(function() {
			var clicked = $(this);
			var offerType = clicked.closest( 'tr' ).find( '.editOfferType' ).val();
			var nextPageURL = $(this).attr('href') + offerType;
			$(this).attr('href',nextPageURL);
		});
		
		$( '.js-sort-by-sc' ).change( function () {
			var sort_value = $( this ).val();
		
			$( 'nav.filter_nav_sc' ).addClass( 'hide' );
			$( 'nav.filter_nav_sc.' + sort_value ).removeClass( 'hide' );
			$( 'nav.filter_nav_sc.' + 'finance' ).removeClass( 'hide' );
			$( 'nav.filter_nav_sc.' + sort_value ).each(function () {
				var clicked = $( this );
				var skuId = clicked.find('#skuId').text();
				var prodId = clicked.find('#prodId').text();
				if(document.getElementById(prodId) != null) {
					document.getElementById(prodId).value = skuId;
				}
			});
		});
		
		//on load subscriber setup page - toggle port related fields
		var page_name = $("#page-name");
		if(page_name.val() !== null && page_name.val() === 'subscriberSetup'){
			$( '.port select' ).each( function () {
			var clicked = $( this ),
				tr = clicked.closest( 'tr' ),
				account_empty_box = tr.find( '.account_nbr' ).find( '.empty' ),
				account_inputbox = tr.find( '.account_nbr' ).find( 'input' ),
				phone_empty_box = tr.find( '.existing_phone_nbr' ).find( '.empty' ),
				phone_inputbox = tr.find( '.existing_phone_nbr' ).find( '.status' ),				
				calling_city_empty_box = tr.find( '.js-calling-city' ).find( '.empty' ),
				calling_city_inputbox = tr.find( '.js-calling-city' ).find( 'input' ),
				area_codes_empty_box = tr.find( '.js-preferred-area-code' ).find( '.empty' ),
				area_codes_inputbox = tr.find( '.js-preferred-area-code' ).find( '.frg-select-container' );

			if ( clicked.val() === 'yes' ) {
				$( '.account_nbr' ).removeClass( 'hide' );
				$( '.existing_phone_nbr' ).removeClass( 'hide' );
				account_empty_box.addClass( 'hide' );
				phone_empty_box.addClass( 'hide' );
				account_inputbox.removeClass( 'hide' );
				phone_inputbox.removeClass( 'hide' );
				calling_city_empty_box.removeClass( 'hide' );
				calling_city_inputbox.addClass( 'hide' );
				area_codes_empty_box.removeClass( 'hide' );
				area_codes_inputbox.addClass( 'hide' );
			} else if ( clicked.val() === 'no' ) {
				account_empty_box.removeClass( 'hide' );
				phone_empty_box.removeClass( 'hide' );
				account_inputbox.addClass( 'hide' );
				phone_inputbox.addClass( 'hide' );
				calling_city_empty_box.addClass( 'hide' );
				calling_city_inputbox.removeClass( 'hide' );
				area_codes_empty_box.addClass( 'hide' );
				area_codes_inputbox.removeClass( 'hide' );
			}
			});
		}
		
		// added below scripts for return check box functionality in client orderdetails page
		$( '.frg-checkbox.parent input[type=checkbox]' ).click( function () {
			 var parent_checkbox = $( this ), 
			 	checked = parent_checkbox.is( ':checked' ),
			 	child_checkboxes = parent_checkbox
			 						.closest( 'tr' )
			 						.next()
			 						.find( '.frg-checkbox input[type=checkbox]' );

			 child_checkboxes.each( function () {
			 	var checkbox = $( this );
			 	if ( checked ) {
			 		if ( !checkbox.is( ':checked' ) ) {
			 			checkbox
						.prop( 'checked', true )
						.closest( '.inner' )
						.find( '.frg-icon' )
						.addClass( 'icon-checkmark' );
					}
			 	} else {
			 		if ( checkbox.is( ':checked' ) ) {
			 			checkbox
						.prop( 'checked', false )
						.closest( '.inner' )
						.find( '.frg-icon' )
						.removeClass( 'icon-checkmark' );
					}
			 	}
			 });
		});
		//added below scripts for return check box functionality in client orderdetails page
		$( '.frg-checkbox.regular input[type=checkbox]' ).click( function () {
			 var clicked_child_checkbox = $( this ),
			 	selectedCount = 0,
			    all_child_checkboxes = clicked_child_checkbox.closest( 'tr' ).closest( 'tr .subscriber_list' ).find( '.frg-checkbox input[type=checkbox]' ),
			    subscr_section_tr = clicked_child_checkbox.closest( 'tr' ).closest( '.subscriber_list' ).closest('tr'),
			 	parent_checkbox = subscr_section_tr.prev().find( '.frg-checkbox input[type=checkbox]' );
			 	
			 	
			 
				 all_child_checkboxes.each( function () {
					 var checkbox = $( this );
						if(checkbox.is( ':checked' )){
							selectedCount++;
						}
				 });
			 if (all_child_checkboxes.length === selectedCount) {
					if ( !parent_checkbox.is( ':checked' ) ) {
						parent_checkbox
						.prop( 'checked', true )
						.closest( '.inner' )
						.find( '.frg-icon' )
						.addClass( 'icon-checkmark' );
					}
				
			    }else{
					if ( parent_checkbox.is( ':checked' ) ) {
						parent_checkbox
						.prop( 'checked', false )
						.closest( '.inner' )
						.find( '.frg-icon' )
						.removeClass( 'icon-checkmark' );
					}
				
			    }
			 showHideReturnQtySection($( this ));
		});
		
		$('.js-accessory_qty').click( function () {
				var linkId = $( this ).attr("id");
				if(linkId!=undefined){
					var itemId=linkId.replace('lnk','');
					var qtyTextId="#txt"+itemId;
					if(qtyTextId!=undefined){
						$(qtyTextId).parent().removeClass('invisible');
						$('.js-qty_lable_'+itemId).addClass('invisible');
						$( this ).removeClass('margin-left-70');
					}
				}
			});
		
		$(document).on('change', '.js-accessory_qty_text', function() {
			var clicked = $( this ),
			value = clicked.val(),
			txtId = clicked.attr("id"),
			status = clicked.closest( '.status' ),
			itemId=txtId.replace('txt','');
			
			showHideTooltipBubble(value,clicked,status);
			
			$("#hiddenTxtQtyToBeReturned"+itemId).val(itemId+'-'+value);
			
		});
		

		$( '#banDrpDwn' ).change( function () { 
			var ban =$( "#banDrpDwn" ).val();
			var billing_txt = $("#billing_account_msg").text().trim();
			$("#fm_paymentAccount [value*='airtimeAccount']").remove();
			if(ban != '') {
				var availableBanCount = $('#availableBanCount').val();
				if(availableBanCount > 0) {
					$("#fm_paymentAccount").prepend('<option value="airtimeAccount-'  + ban + '">' + billing_txt + ' - ' + ban +'</option>');
					$("#fm_paymentAccount").val($("#fm_paymentAccount option:first").val());
				}
				$("#paymentOptions").show();
			} else {
				$("#paymentOptions").hide();
			}
				
		});

		/*$('.js-return_order').click( function () {
			var inputData = {
				returnAccessoriesDetail: []
			};
			
			$('.frg-checkbox.regular input[type=checkbox]').each( function () {
				 var checkbox = $( this );
					if(checkbox.is( ':checked' )){
						var itemId=$( this ).val();
						var qtyTextId="#txt"+itemId;
						var qty=$(qtyTextId).val();
						
						inputData.returnAccessoriesDetail.push({ 
					        "itemId"		:itemId,
						    "returnQuantity":qty
					    });	
					}
			});
			
			var inputData=JSON.stringify(inputData);
			$('#returnAccessoriesDetail').val(inputData);
			console.log("JSON Input String "+inputData);
		});*/
		
		$('.frg-checkbox.regular input[type=checkbox]').each( function () {
				 var checkbox = $( this );
				 var itemId=checkbox.val();
				 
				 showHideReturnQtySection(checkbox);
				 if($("#hiddenTxtQtyToBeReturned"+itemId)!=undefined){
					 var hiddenTxtQtyToBeReturnedValue=$("#hiddenTxtQtyToBeReturned"+itemId).val();
					 if(hiddenTxtQtyToBeReturnedValue!=undefined && hiddenTxtQtyToBeReturnedValue!=""){
						var enteredReturnQty=hiddenTxtQtyToBeReturnedValue.split('-')[1];
						$("#txt"+itemId).val(enteredReturnQty);
						var status = $("#txt"+itemId).closest( '.status' );
						showHideTooltipBubble(enteredReturnQty,checkbox,status);
					 }
				 }
			});
		
		$('.offerSkuLabel').each( function() {   	 
			var thatHTML = $( this ).html(); 
			var newHTML ='';
			var languages = $('#languages').val();
			if(languages == 'fr'){
				for (var i = 0, len = thatHTML.length; i < len; i++) {
					if(thatHTML[i]=='$'){
						newHTML=newHTML+" $ ";
					}else{
						newHTML=newHTML+thatHTML[i];
					}
				}
				$(this).html(newHTML);
			}
		});
		
		//TODO: add select / deselect all functionality
		$( '.js-subcheck-all' ).click( function () {
			var clicked = $( this ),
			action_button_add = $( '.operations .addButton' ),
			action_button_remove = $( '.operations .removeButton' ),
			action_button_choose = $('.operations .chooseBundle'),
			checkboxes = $( 'input[type=checkbox]' ),
			frgcheckboxes = $( '.frg-checkbox' ),
			hasUpgradeBundles = $( '#hasUpgradeBundles' ).val(),
			atleastOneComplete=0,
			enableAdd = false,
			enableRemove = false,
			offerTypeSelected = $(this).closest( 'tr' ).find( '.js-upgrade-offer').val(),
			selectedCheckbox = $(this),
			isFloat=false,
			isAllotment = false,
			isRenewal=false;

			if ( clicked.hasClass('selecteAllClicked')) {
				clicked.removeClass('selecteAllClicked');
				checkboxes.prop('checked',true);
				frgcheckboxes.find( '.frg-icon' ).addClass( 'icon-checkmark' );

			} else {
				clicked.addClass('selecteAllClicked');
				checkboxes.prop('checked',false);
				frgcheckboxes.find( '.frg-icon' ).removeClass( 'icon-checkmark' );
			}

			$('#noUpgradeBunbles').hide();
			$('#allotmentBundlesError').hide();

			checkboxes.each( function () {
				var checkbox = $( this );
				var checkboxvalue = $( this ).prop('checked');
				offerTypeSelected=checkbox.closest( 'tr' ).find( '.js-upgrade-offer').val();
				if(offerTypeSelected === 'allotment') {
					checkbox.attr("disabled", false);
					isAllotment=true;
				}else if(offerTypeSelected === 'float'){
					isFloat=true;
				}else{
					isRenewal=true;
				}
				if ( checkbox.is( ':checked' ) ) {
					enableRemove = true;
					var status = checkbox.closest( 'tr' ).find( '.status' );
					if ( status.text().toLowerCase().indexOf('complete') > -1 ) {
						atleastOneComplete = atleastOneComplete +1;
					} else {
						enableAdd = true;
					}
				}
			});
			/*if(isFloat && isRenewal){
				enableAdd = false;
			}else if(isAllotment && isRenewal){
				enableAdd= false;
			}else{
				enableAdd=true;
			}*/
			var chooseButton = $('.chooseBundle').val();
			if(chooseButton == "Choisir un ensemble"){
				$(".upgradeBunblesMessage").css("margin","50px 0 0 -15px")
				$(".renewalBundleMessage").css("width","219px");
			}else{
				$(".upgradeBunblesMessage").css("margin","50px 0 0 -35px")
				$(".renewalBundleMessage").css("width","174.81px");
			}
			if(chooseButton!=undefined){
				chooseBundle_position = $( ".chooseBundle" ).position().left;
				$(".renewalBundleMessage").css("left", chooseBundle_position);
			}

			if ( enableAdd && atleastOneComplete == 0) {
				action_button_add.removeClass( 'state-disabled' );
				if(offerTypeSelected !== 'allotment'){
					if(hasUpgradeBundles == 'true'){
						action_button_choose.removeClass( 'state-disabled' );
						$( '.renewalBundleMessage' ).hide();
					}
					else{
						//show message bundles
						$('#noUpgradeBunbles').show();
					}
				}else{
					//show message of allotment
					$('#allotmentBundlesError').show();
				}
			} else {
				action_button_add.addClass( 'state-disabled' );
				action_button_choose.addClass( 'state-disabled' );
				$( '.renewalBundleMessage' ).show();
			}
			if ( enableRemove ) {
				action_button_remove.removeClass( 'state-disabled' );
			} else {
				action_button_remove.addClass( 'state-disabled' );
			}
		});
});

function showHideTooltipBubble(value,checkbox,status){
	
	var tooltip_bubble = status.find( '.tooltip_bubble span' );
	if(checkbox!=undefined){
		var itemId=checkbox.val();
		
		var frg_icon = $(checkbox).closest( '.inner' ).find('.icon span');
		 
		var remainingQty=$("#hiddenTxtRemainingQty"+itemId).val();
				
		var returnedQtyBlankMsg=$('#returnedQtyBlankMsg').val();
		var returnedQtyMoreMsg=$('#returnedQtyMoreMsg').val();
		
		if(value==undefined || value==""){
			status.removeClass( 'positive' ).addClass( 'negative' );
			tooltip_bubble.text(returnedQtyBlankMsg);
			frg_icon.addClass('icon-checkmark');
		}else if(parseInt(value)>parseInt(remainingQty)){
			status.removeClass( 'positive' ).addClass( 'negative' );
			tooltip_bubble.text(returnedQtyMoreMsg);
			frg_icon.addClass('icon-checkmark');
		}else {
			status.removeClass( 'negative' ).addClass( 'positive' );
		}
	}
}
//When accessory check box is selected then display return quantity section 
function showHideReturnQtySection(checkboxObj){
	var accCommItemId=checkboxObj.val();
	var show=checkboxObj.is( ':checked' )
	var selectSpan=".js-qty_return_section_"+accCommItemId;
	if(show){
		$(selectSpan).removeClass('invisible');
	}else {
		$(selectSpan).addClass('invisible');	
	}	
}

//When accessory check box is selected then display href to edit accessory quantity
function showHideEditQtyLink(accCommItemId,show){
	var linkId="#lnk"+accCommItemId;
	var qtyTextId="#txt"+accCommItemId;
	if($(linkId)!=undefined){
		if(show){
			$(linkId).removeClass('invisible');
			$(linkId).addClass('margin-left-70');
		}else {
			$(linkId).addClass('invisible');
			if(qtyTextId!=undefined){
				$(qtyTextId).parent().addClass('invisible');
				$('.js-qty_lable_'+accCommItemId).removeClass('invisible');
				$(linkId).removeClass('margin-left-70');
			}
		}
	}
}
//activation device details script -start

function onSelectColor(colorSelected) {
	
	JAG.start();
	$('.frg-checkbox-extendWarranty').find("input[id^=" + 'extendWarrantyNo_' + "]").attr("checked", true);
	$('.frg-checkbox-extendWarranty.hide').removeClass('hide');	
	$('#warrantyProducts').hide();
	$('#warrantyProducts').empty();
	storeBrowserBackButtonOffer = $('#seletedOfferId').val();
	resetSimNumber = false;
	browserBackChecked = false;
	setTimeout( function () {
		
	
		if(colorSelected.indexOf("-")!=-1)
		{
			var skuInfo=colorSelected.split("-");
			var skuId = skuInfo[0];
			var skuType = skuInfo[1];
			
			var currentSkuDivId= 'sku_' + skuId;
			var prevSelectedSkuDivId = 'sku_' + document.getElementById('selectedSkuIdValue').value;
			//load diff image when browser back
			if(prevSelectedSkuDivId == currentSkuDivId){
				availableDropDowns = $('[id^="sku_sku"]');
				if(availableDropDowns.length>=2){
					//If present selectedSkuId and CurrentId are the same we will hide everything and show the correct one
					availableDropDowns.each( function( ) {
						currentImage = $( this ).attr('id');
						document.getElementById(currentImage).style.display = "none";
						browserBackChecked=true;
					});
						
				}else{
					document.getElementById(prevSelectedSkuDivId).style.display = "none";
				}
			}else{
				document.getElementById(prevSelectedSkuDivId).style.display = "none";
				$('#depAcctDrpDwn').val('dontEnrollmentInDep');
				$('#seletedOffer').val('').change();
				//default no port in when diff color selected
				$( "input[name='portInoption_"+skuId+"']" ).eq(1).click();
				//reset sim selection
				resetSimNumber = true;
				document.getElementById('updateOfferingTermId').value = "";
				$("#simDrpDwn").val("");
				var contextPath = $('#contextPath').val();
				if(document.getElementById('flow') != null) {
					var url=contextPath+"/createBundle/activation/deviceDetails/fetchCompatibleSims.jsp?skuId="+skuId;
				}
				else{
					var url=contextPath+"/acquisition/deviceDetails/fetchCompatibleSims.jsp?skuId="+skuId;
				}			
				$("#simDrpDwn").load(url);
				//clear all checks since we changed color
				var availableDeviceOffers = $('.frg-checkbox-acquisition');
				availableDeviceOffers.each( function( ) {
					currentDeviceOffer = $( this ).find('input').eq(0).attr('id');
					document.getElementById(currentDeviceOffer).checked=false;
				});
				//get service category selected and keep it, if not found change next one
				prevServiceCategory = $('#'+prevSelectedSkuDivId+' #serviceCategoryDrpDwn').val();
				hasCurrentServiceCategory = $('#'+currentSkuDivId+' #serviceCategoryDrpDwn option[value='+prevServiceCategory+']').length;
				if(hasCurrentServiceCategory>0){
					$('#'+currentSkuDivId+' #serviceCategoryDrpDwn').val(prevServiceCategory);
				}else{
					$('#'+currentSkuDivId+' #serviceCategoryDrpDwn option:first-child').attr("selected", "selected");
				}
				resetOfferWhenDeviceOnly();
				//trigger change in order to set price to 0
				$("#simDrpDwn").change();
			}
			document.getElementById(currentSkuDivId).style.display = "block";
			
			var currentSkuImgDivId= 'skuImage_' + skuId;
			var prevSelectedSkuImgDivId = 'skuImage_' + document.getElementById('selectedSkuIdValue').value;
			//load diff image when browser back
			if(prevSelectedSkuImgDivId == currentSkuImgDivId){
				availableImages = $('[id^="skuImage_sku"]');
				if(availableImages.length>=2){
					//If they are two or more dropdowns we will iterate for the correct one.
					availableImages.each( function( ) {
						currentImage = $( this ).attr('id');
						document.getElementById(currentImage).style.display = "none";
						browserBackChecked=true;
					});
						
				}else{
					document.getElementById(prevSelectedSkuImgDivId).style.display = "none";
				}
			}else{
				document.getElementById(prevSelectedSkuImgDivId).style.display = "none";
			}
			document.getElementById(currentSkuImgDivId).style.display = "block";
			
			document.getElementById('selectedSkuIdValue').value = skuId;
			if($('#flow').length <= 0 || $('#flow').val()!='bundle'){
				document.getElementById('selectedSkuType').value = skuType;
			}
			var maxQtySkuId="maxSkuQtyAllowed_"+ skuId;
			document.getElementById('max_quantity').value = document.getElementById(maxQtySkuId).value;
			var etaMsg="etaMsg_"+ skuId;
			if($('#flow').length <= 0 || $('#flow').val()!='bundle'){
				document.getElementById('invtagMsg').value = document.getElementById(etaMsg).value; 
			}
			
			var enableAllocationId="enableAllocation_"+skuId;
			if($('#flow').length <= 0 || $('#flow').val()!='bundle'){
				document.getElementById('enableAllocationVal').value = document.getElementById(enableAllocationId).value;
			}
			$('#deviceQty').keyup();
			
			$('.js-sort-by' ).each( function () {
				var sc = $( this );
				if(sc.attr('class').indexOf(skuId) > -1){
					$( this ).change();
				}
			});
		}
		
		
		var isUpdateCommerceItem = $('#updateDeviceCommItemId').length;
		if(browserBackChecked && storeBrowserBackButtonOffer != "" && isUpdateCommerceItem <= 0){
			//check the portin selecte prev
			selectedOfferValues = storeBrowserBackButtonOffer.split("-");
			if(storeBrowserBackButtonOffer.indexOf("portInYes")>=0){
				$( "input[name='portInoption_"+skuId+"']" ).eq(0).click();
			}else{
				$( "input[name='portInoption_"+skuId+"']" ).eq(1).click();
			}
			document.getElementById(storeBrowserBackButtonOffer).click();
		}
		var prevSelectedRadioButton = $('#seletedOfferId').val();
		if(prevSelectedRadioButton == ""){
		//if no offer selected clear everything
			var availableDeviceOffers = $('.frg-checkbox-acquisition');
			availableDeviceOffers.each( function( ) {
				currentDeviceOffer = $( this ).find('input').eq(0).attr('id');
				
				document.getElementById(currentDeviceOffer).checked=false;
			});
			
		}
		JAG.stop();
	}, 3000);
}
function onSelectExistingAddress(param){
	
	
	
	 var firstName =$("#firstName_"+param.value).text();
	 	 var lastName =$("#lastName_"+param.value).text();
		 	 var companyName =$("#companyName_"+param.value).text();
			 	 var address1 =$("#address1_"+param.value).text();
				 			 	 var address3 =$("#address3_"+param.value).text();
				 			 	 var city =$("#city_"+param.value).text();
								 var province =$("#province_"+param.value).text();
								 var postalCode =$("#postalCode_"+param.value).text();
								 var phoneNumber =$("#phoneNumber_"+param.value).text();



	document.getElementById("firstName").value=firstName;
	document.getElementById("lastName").value=lastName;
	document.getElementById("companyName").value=companyName;
	document.getElementById("address1").value=address1;
	document.getElementById("address3").value=address3;
	document.getElementById("city").value=city;
	document.getElementById("province").value=province;
	document.getElementById("postalCode").value=postalCode;
	document.getElementById("phoneNumber").value=phoneNumber;

		var address1 = $('#address1').val();
		var address3 = $('#address3').val()+"-";
		if(address1.indexOf(address3)>=0){
			$('#address1').val(address1.replace(address3,''));
		}	
}


function showShippingContinueButton(){
  var save_continue = $( '.frg-button' );

	var fName=document.getElementById("firstName").value;
	if ( fName.length>0 ) {
			save_continue.removeClass( 'state-disabled' );
		} else {
			save_continue.addClass( 'state-disabled' );
		}

}
function resetOfferWhenDeviceOnly() {
	
		var stuff_to_hide = $( '.js-hide-not-device-only' ),
			stuff_to_show = $( '.js-show-not-device-only' ),
			changeling = $( '.changeling' ),
			hidden_required_stuff = stuff_to_hide.find( '.js-required' ),
			hidden_required_hold_stuff = stuff_to_hide.find( '.js-required-hold' );
			if(document.getElementById('mscDetails') != null) {
				document.getElementById('mscDetails').style.display="block";
			}
			//$('.mscAmountTxt').text( mscAmount );
			$('.frg-checkbox-portIn').find('input[type=radio]').attr("disabled", false);
				
			stuff_to_hide.show();
			stuff_to_show.addClass( 'hide' );

			changeling
				.removeClass( 'full_width' )
				.addClass( 'halfwidth' );

			// Not Sure if below is required
			hidden_required_stuff
				.addClass( 'js-required' )
				.removeClass( 'js-required-hold' );
			
			hidden_required_hold_stuff
				.addClass( 'js-required' )
				.removeClass( 'js-required-hold' );

}
function onSelectOffer(offerSelected,field) {
	if(offerSelected.indexOf("_")!=-1)
	{
		offerSelected=offerSelected.substring( 0, offerSelected.indexOf("_"));
		if(offerSelected.indexOf("_")!=-1)
		{
			offerSelected=offerSelected.replace('_','');
		}
		$('#seletedOffer').val(offerSelected).change();
		$('#seletedOfferId').val(field.id);
		
        var toChangePortIn = field.id.substring(field.id.indexOf("portIn"));
		var skuId = field.id.substring( 0, field.id.indexOf("_"));	
		if(toChangePortIn!=null && toChangePortIn!=undefined && toChangePortIn!="undefined" && toChangePortIn!='')
		{
				$('input[name=portInoption_'+skuId+'][value='+toChangePortIn+']').prop("checked",true);
		}
		var offerTermInfo=field.value.split("__");
		if(offerTermInfo.length == 2 && (offerTermInfo[1] == null || offerTermInfo[1] == ""))
		{	
			$('#simDrpDwn').val("");
		}

		//reset hidden input
		if($('#updateOfferingTermId').length>0){
			$('#updateOfferingTermId').val("");
		}
	} else {
		$("#warrantyProducts").html('');
		$('#warrantyProducts').hide();
		$('#deviceQty').keyup();
	}
}
function changeWarranty() {
	var skuId = $("#selectedSkuIdValue").val();
	var warrantyCheckbox = $('.frg-checkbox-extendWarranty input:checked').val();
	var ban = $("#banDrpDwn").val();
	if (warrantyCheckbox == 'extendWarrantyYes') {
		$('#warrantyProducts').show();
		JAG.start();
		var contextPath = $('#contextPath').val();

		$.ajax({
			url : contextPath+"/acquisition/deviceDetails/warrantyProducts.jsp",
			type : "post",
			data : { skuId : skuId, ban : ban },
			success : function(data, status, xhr) {
				$("#warrantyProducts").html(data);
				JAG.stop();
			},
			error : function(data, status, xhr) {
				console.log("Error in warranty products ajax call");
				JAG.stop();
			}

		});
	} else {
		$("#warrantyProducts").html('');
		$('#warrantyProducts').hide();
		$('#deviceQty').keyup();
	}
}
function changeUpgradeWarranty() {
	var skuId = $("#selectedSkuIdValue").val();
	var warrantyCheckbox = $('.frg-checkbox-extendWarranty input:checked').val();
	var ban = $("#ban").val();
	var prevSelectedWarranty = $("input[id*='selectedWarranty']");
	isUpdateItemWarraty = $('#isUpdateItemWarraty').val();
	if (warrantyCheckbox == 'extendWarrantyYes') {
		$('#warrantyProducts').show();
		JAG.start();
		var contextPath = $('#contextPath').val();

		$.ajax({
			url : contextPath+"/upgrade/deviceDetails/warrantyProducts.jsp",
			type : "post",
			data : { skuId : skuId, ban : ban },
			success : function(data, status, xhr) {
				$("#warrantyProducts").html(data);
				if(prevSelectedWarranty.length!=0 && isUpdateItemWarraty=='true'){
					var warrantyAvailable = $("input[class*='upgradeWarrantyItems_rd']");
					warrantyAvailable.each( function () {
						var warrantyAvailableValue = $( this ).val();
						var tempWarraty = $( this );
						prevSelectedWarranty.each( function () {
							var prevSelectedWarrantyValue = $( this ).val();
							if(prevSelectedWarrantyValue==warrantyAvailableValue){
								tempWarraty.click();
							}else{
								if(tempWarraty.is( ":checked" )){
									tempWarraty.attr('checked', false);
								}
							}
						});
					});
					$('#isUpdateItemWarraty').val('false');
				}
				JAG.stop();
			},
			error : function(data, status, xhr) {
				console.log("Error in upgrade warranty products ajax call");
				JAG.stop();
			}

		});
	} else {
		$("#warrantyProducts").html('');
		$('#warrantyProducts').hide();
		onSelectSim();
		$( '.upgrade-js-required' ).keyup();
	}
}

function warrantyHover(banInput) {
    var ban = banInput.value;
    var skuId = $("#selectedSkuIdValue").val();
   
    if($('.frg-checkbox-extendWarranty.hide').length>0){
    	$('.frg-checkbox-extendWarranty.hide').removeClass('hide');	
    }
    if (ban == '') {
          $('#warrantyProducts').hide();
		  $('.extendWarrantyBanChange').click();
          $('.frg-checkbox-extendWarranty').find("input[id^=" + 'extendWarrantyNo_' + "]").attr("checked", true);
          $('.frg-checkbox-extendWarranty').find('input[type=radio]').attr("disabled", true);
    } else {
		  $('#warrantyProducts').hide();
		  $('.extendWarrantyBanChange').click();	
          $('.frg-checkbox-extendWarranty').find('input[type=radio]').attr("disabled", false);
    }
}
function warrantyHoverBundle(banInput) {
    var ban = banInput.value;
    var skuId = $("#selectedSkuIdValue").val();

    if($('.frg-checkbox-extendWarranty.hide').length>0){
    	$('.frg-checkbox-extendWarranty.hide').removeClass('hide');	
    }
    if (ban == '') {
          $('#warrantyProducts').hide();
          $('.frg-checkbox-extendWarranty').find('input[id=extendWarrantyNo_sku]').attr("checked", true);
          $('.frg-checkbox-extendWarranty').find('input[type=radio]').attr("disabled", true);
          $('.bundleContinueBtn').attr("disabled", true);
          $('.hover_warranty_yes').show();
    } else {
		  $('.frg-checkbox-extendWarranty').find('input[id=extendWarrantyNo_sku]').click();
          $('.frg-checkbox-extendWarranty').find('input[type=radio]').attr("disabled", false);
          $('.bundleContinueBtn').attr("disabled", false);
          $('.hover_warranty_yes').hide();
    }
}
function changeWarrantyBundles() {
	var skuId = $("#selectedSkuIdValue").val();
	var type = $("#warrantyFlowType").val();
	var warrantyCheckbox = $('.frg-checkbox-extendWarranty input:checked').val();
	var ban = $("#banDrpDwn").val();
	$("#extendWarrantySelected").val(warrantyCheckbox);
	if(type=="Device"){
		flowType = "ACTIVATION";
	}else{
		flowType = "RENEWAL";
	}

	if (warrantyCheckbox == 'extendWarrantyYes') {
		$('#warrantyProducts').show();
		JAG.start();
		$("#select-ban-dep-modal").css({ 'z-index': "100" });
		$(".loadingoverlay").css('z-index', '200');
		$(".spinner2").css('z-index', '300');
		var contextPath = $('#contextPath').val();

		$.ajax({
			url : contextPath+"/common/deviceDetails/warrantyProductsBundles.jsp",
			type : "post",
			data : { skuId : skuId, ban : ban, flowType : flowType },
			success : function(data, status, xhr) {
				$("#warrantyProducts").html(data); 
				if(type!="Upgrade"){
					$('.bundleContinueBtn').attr("disabled", false);
				}
				JAG.stop();
			},
			error : function(data, status, xhr) {
				console.log("Error in warranty products ajax call");
				JAG.stop();
				
			}

		});
	} else {
		$("#warrantyProducts").html('');
		$('#warrantyProducts').hide();
		if(type=="Upgrade"){
			$('.bundleContinueBtn').attr("disabled", false);
		}
	}
}

function onSelectPayTerm(payTermValue,field) {
	if(payTermValue.indexOf("_")!=-1)
	{
		payTermValue=payTermValue.substring( 0, payTermValue.indexOf("_"));
		if(payTermValue.indexOf("_")!=-1)
		{
			payTermValue=payTermValue.replace('_','');
		}
		$('#seletedPayTerm').val(payTermValue).change();	
	}
}

function setUpdateDeviceItemInfo() {
	var offeeTermId=document.getElementById('updateOfferingTermId').value;
	var offeringTermRdId=document.getElementById('updateOfferingTermRdBtnId').value;
	var simPrice = 0;
	document.getElementById(offeringTermRdId).click();
	document.getElementById(offeringTermRdId).setAttribute("checked","checked");
	var chkBxDivId="div"+offeeTermId;
	//clicked=$(document.getElementById(chkBxDivId));
	//as part of EOFR-4808
    var labelStr = "label"+offeringTermRdId;
    clicked = $('label[for="'+ labelStr +'"]');

	icon = clicked.find( '.icon .frg-icon' );
	if ( icon.hasClass( 'icon-checkmark' ) ) {
		icon.removeClass( 'icon-checkmark' );
	} else {
		icon.addClass( 'icon-checkmark' );
	}	
	price = clicked.find( '.value' ).attr( 'data-value' ),
	quantity_txt = $( '.js-quantity' ),
	quantity = quantity_txt.val(),
	total = null;
	if(price != undefined){
		
		if($('#simDrpDwn').find(":selected").attr('class') != undefined) {
			simPrice = $('#simDrpDwn').find(":selected").attr('class');
		}
		
		if ( $.isNumeric( quantity ) ) {
			total = ( quantity * price ) + ( quantity * parseFloat(simPrice)) ;
		} else {
			total = parseFloat( price ) + parseFloat(simPrice);
		}
		
		var dueNow = $( '.total' );
		dueNow.text( '$'+parseFloat( total, 10 ).toFixed( 2 ).replace( /(\d)(?=(\d{3})+\.)/g, "$1," ).toString() );

		var mscAmount = clicked.find( '.mscAmount' ).text();
		if('NOTERM' == mscAmount.trim())
		{
			if(document.getElementById('mscDetails') != null) {
				document.getElementById('mscDetails').style.display="none";
			}
		}else{
			if(document.getElementById('mscDetails') != null) {
				document.getElementById('mscDetails').style.display="block";
			}
			$('.mscAmountTxt').text( mscAmount );
		}
	}
	
	var button = $( '.frg-button' );
	button.removeClass( 'state-disabled' );
}

function setUpdateDeviceItemInfoForRenewal() {
	var button = $( '.frg-button' );
	button.removeClass( 'state-disabled' );
}

//activation device details script -end

//upgrade device details script -start

function onSelectSkuColor(colorSelected) {
	$('.frg-checkbox-extendWarranty').find("input[id^=" + 'extendWarrantyNo_' + "]").attr("checked", true);
	$('.frg-checkbox-extendWarranty.hide').removeClass('hide');	
	$('#warrantyProducts').hide();
	$('#warrantyProducts').empty();
	if(colorSelected.indexOf("-")!=-1)
	{
		var skuInfo=colorSelected.split("-");
		var skuId = skuInfo[0];
		var skuType = skuInfo[1];
		
		var currentSkuDivId= 'sku_' + skuId;
		var prevSelectedSkuDivId = 'sku_' + document.getElementById('selectedSkuIdValue').value;
		var oldSkuSelected = document.getElementById('selectedSkuIdValue').value;
		document.getElementById(prevSelectedSkuDivId).style.display = "none";
		document.getElementById(currentSkuDivId).style.display = "block";
		
		var currentSkuImgDivId= 'skuImage_' + skuId;
		var prevSelectedSkuImgDivId = 'skuImage_' + document.getElementById('selectedSkuIdValue').value;
		//load diff image when browser back
		if(prevSelectedSkuImgDivId == currentSkuImgDivId){
			if($('#serviceCatDrpDwn_'+ skuId).length>0){
				onSelectServiceCategory($('#serviceCatDrpDwn_'+ skuId).val(),$('select#serviceCatDrpDwn_'+ skuId).get(0));
			}
			availableImages = $('[id^="skuImage_sku"]');
			if(availableImages.length>=2){
				//If they are two or more dropdowns we will iterate for the correct one.
				availableImages.each( function( ) {
					currentImage = $( this ).attr('id');
					document.getElementById(currentImage).style.display = "none";
				});
					
			}else{
				document.getElementById(prevSelectedSkuImgDivId).style.display = "none";
			}
		}else{
			document.getElementById(prevSelectedSkuImgDivId).style.display = "none";
			$('#upgradeSimDrpDwn').val("");
			var contextPath = $('#contextPath').val();
			var url=contextPath+"/upgrade/deviceDetails/fetchCompatibleSims.jsp?skuId="+skuId;	   	
			$("#upgradeSimDrpDwn").load(url);
			//clear all checks since we changed color
			var availableDeviceOffers = $('.frg-checkbox-upgrade');
			availableDeviceOffers.each( function( ) {
				currentDeviceOffer = $( this ).find('input').eq(0).attr('id');
				document.getElementById(currentDeviceOffer).checked=false;
			});
			//get service category selected and keep it, if not found change next one
			prevServiceCategory = $('#serviceCatDrpDwn_'+oldSkuSelected).val();
			hasCurrentServiceCategory = $('#serviceCatDrpDwn_'+skuId+' option[value='+prevServiceCategory+']').length;
			if(hasCurrentServiceCategory>0){
				$('#serviceCatDrpDwn_'+skuId).val(prevServiceCategory);
			}else{
				$('#serviceCatDrpDwn_'+skuId+' option:first-child').attr("selected", "selected");
			}
			//trigger change in order to set price to 0
			$("#upgradeSimDrpDwn").change();
		}
		document.getElementById(currentSkuImgDivId).style.display = "block";
		
		document.getElementById('selectedSkuIdValue').value = skuId;
		document.getElementById('selectedSkuType').value = skuType;
		//update inventory status -start
		var maxQtySkuId="maxSkuQtyAllowed_"+ skuId;
		document.getElementById('max_quantity').value = document.getElementById(maxQtySkuId).value;
		var max_quantity = document.getElementById('max_quantity').value;
		var etaMsg="etaMsg_"+ skuId;
		document.getElementById('invtagMsg').value = document.getElementById(etaMsg).value;
		
		var enableAllocationId="enableAllocation_"+skuId;
		var enableAllocation = document.getElementById(enableAllocationId).value;
		document.getElementById('enableAllocationVal').value = enableAllocation;
		
		var inMsg=document.getElementById('invtagMsg').value;
		var allocationMsg=inMsg;
		if(inMsg ==undefined || inMsg===''){
			invtagMsg='';
			allocationMsg='';
		}else{
			inMsg='('+inMsg+')';
		}
		var deviceQty=document.getElementById('updDeviceQty').value;
		var availability = $( 'span.status' );
		if ( $.isNumeric( deviceQty ) ) {
			if ( deviceQty > max_quantity) {
				var txtMsg='Back Order'+inMsg;
				if(enableAllocation!=undefined && enableAllocation!='' && (enableAllocation == true || enableAllocation == "true"))
				{
					if(allocationMsg ==undefined || allocationMsg===''){
						allocationMsg="On Allocation";
					}
					txtMsg='Back Order'+'('+allocationMsg+')';
				}
				var tooltip_message = ( max_quantity === 0 ) ? 'sorry, this item is not available at the moment' : 'The quantity you are trying to order is on back order. Please try reducing the quantity until the indicator changes to available';
				$('#skuAvailability').removeClass('positive');
				$('#skuAvailability').addClass('negative');
				availability
				.removeClass( 'positive' )
				.addClass( 'negative' )
				.text(txtMsg);
				$('#updQty').val('deviceQty');
			} else {
				if(enableAllocation!=undefined && enableAllocation!='' && (enableAllocation == true || enableAllocation == "true"))
				{
					if(allocationMsg ==undefined || allocationMsg===''){
						allocationMsg="On Allocation";
						allocationMsg='Back Order'+'('+allocationMsg+')';
					}
					$('#skuAvailability').removeClass('positive');
					$('#skuAvailability').addClass('negative');
					availability
					.removeClass( 'positive' )
					.addClass( 'negative' )
					.text(allocationMsg);
				} else {
					$('#skuAvailability').removeClass('negative');
					$('#skuAvailability').addClass('positive');
					availability
					.removeClass( 'negative' )
					.addClass( 'positive' )
					.text( 'Available' );
				}
				$('#updQty').val(deviceQty);
			}
		}
		$('#updQty').change();
		//update inventory status -end
		if($("#seletedPayTerm").length > 0) {
		$('#seletedPayTerm').val("").change();
		}
		var contextPath = $('#contextPath').val();
		var serviceCatDrpDwnId='serviceCatDrpDwn_'+skuId;
		if(document.getElementById(serviceCatDrpDwnId) != null) {
		document.getElementById(serviceCatDrpDwnId).selectedIndex = 0;
		onSelectServiceCategory(document.getElementById(serviceCatDrpDwnId).value,document.getElementById(serviceCatDrpDwnId));
	}
}
}

function onSelectServiceCategory(offerSelected,drpDwn) {
	var sort_value = offerSelected;
	var selectedSku = $('#selectedSkuIdValue').val();
    
	$( 'nav.filter_nav' ).addClass( 'hide' );
	if(selectedSku != undefined && selectedSku != ""){
		
	  $( 'nav.filter_nav.' + sort_value + "." + selectedSku).removeClass( 'hide' );
	} 
	else{
		
	 $( 'nav.filter_nav.' + sort_value ).removeClass( 'hide' );
	 $( 'nav.filter_nav.' + sort_value + ' a').first().click();
	}
	var radios = document.getElementsByName('option');
	for(var i = 0; i < radios.length; i++){
	    if(radios[i].checked){
	        radios[i].checked=false;
	    }
	}
	$('input[name=option]').attr('checked', false);
	$( '.upgrade-js-required' ).keyup();
	var languages = $('#languages').val();
	/*var devPrice = $('.devPrice');
	if(languages == 'fr'){
		devPrice.text('0,00$');
	}else{
		devPrice.text('$0.00');
	}*/
	if($('#selectedOfferId').length > 0){
		document.getElementById('selectedOfferId').value = offerSelected;
	}
	//remove NaN
	priceHideSelected = drpDwn[drpDwn.selectedIndex].id;
	if(priceHideSelected==""){
		var price=parseFloat(0);
	}else{
		var price=parseFloat(drpDwn[drpDwn.selectedIndex].id);
	}
	
	var skuId = document.getElementById('selectedSkuIdValue').value;
	var dueNowLbl = $( '.now' );
	var simPrice = $('#upgradeSimDrpDwn').find(":selected").attr('class');
	var qty=parseFloat(document.getElementById('noOfSubscribers').value);
	var totalDevicePrice = price * qty;
	if(simPrice != undefined && simPrice!="undefined" && simPrice!="") {
		simPrice = parseFloat($('#upgradeSimDrpDwn').find(":selected").attr('class'));
	}else{
		simPrice = 0;
	}
	
	simPrice = parseFloat(simPrice) * qty;
	var orderDueNow = parseFloat(document.getElementById('orderDueNow').value) + totalDevicePrice + parseFloat(simPrice);
	var dueNow = '$' + parseFloat( orderDueNow, 10 ).toFixed( 2 ).replace( /(\d)(?=(\d{3})+\.)/g, "$1," ).toString();
	dueNowLbl.text( dueNow);
	
	var flow = $('#flow').val();

	if(flow == 'bundle'){
		$('#bundleDueMonthlyPrice').val('0');	
		$('#bundleDueNowPrice').val(orderDueNow);
	}
	
	var formattedPrice = '$' + parseFloat( price, 10 ).toFixed( 2 ).replace( /(\d)(?=(\d{3})+\.)/g, "$1," ).toString();
	//$('#priceSpan').text( formattedPrice )
	var skuId = document.getElementById('selectedSkuIdValue').value;
	if($('#priceSpan_'+skuId).length > 0){
		document.getElementById('priceSpan_'+skuId).innerText = formattedPrice;
	}
	
	
	var billCreditMsg,
		hasBillCredit = $('#serviceCatDrpDwn_' + skuId).find(":selected").attr('data-hasBillCredit'),
		reccuringCount = $('#serviceCatDrpDwn_' + skuId).find(":selected").attr('data-reccuringCount'),
		formattedCreditAmt = $('#serviceCatDrpDwn_' + skuId).find(":selected").attr('data-formattedCreditAmt');
	$('#billCreditSpan_' + skuId ).text("");
	if(hasBillCredit == 'true' || hasBillCredit == true) {
		if(languages == "fr"){
			if(reccuringCount == 1) {
				billCreditMsg = "Un crï¿½dit de " + formattedCreditAmt + " sera portï¿½ ï¿½ votre premiï¿½re facture";
			} else {
				billCreditMsg = "A " + formattedCreditAmt + " sera portï¿½ ï¿½ vos " + reccuringCount + " premiï¿½res factures mensuelles";
			}
		} else {
			if(reccuringCount == 1) {
				billCreditMsg = "A " + formattedCreditAmt + " credit will be applied to your first bill";
			} else {
				billCreditMsg = "A " + formattedCreditAmt + " credit will be applied to your bill for the first " + reccuringCount + " months";
			}
		}
	
		$('#billCreditSpan_' + skuId ).text(billCreditMsg);
	}
}

function onSelectSim() {
	var simPrice = $('#upgradeSimDrpDwn').find(":selected").attr('class');
	var qty=parseFloat(document.getElementById('noOfSubscribers').value);
	var isEasyPay = document.getElementById('isEasyPay').value;
	if(simPrice != undefined && simPrice!="undefined" && simPrice!="") {
		simPrice = parseFloat($('#upgradeSimDrpDwn').find(":selected").attr('class'));	
	}else{
		simPrice = 0;
	}
	//var price = $('#priceSpan').text().trim();
	var skuId = document.getElementById('selectedSkuIdValue').value;
	var monthlyPrice = 0;
	var price = 0;
	if(isEasyPay == 'true') {
		var selectedId = $("input:radio[name=option]:radio:checked").attr('id');
		var myLabel = $('label[for="'+ selectedId +'"]');
		
		price = myLabel.find( '.value' ).attr( 'data-value' );
		monthlyPrice = myLabel.find( '.value' ).attr( 'data-monthlyFinanceAmt' );
	} else {
	//price = document.getElementById('priceSpan_'+skuId).innerText.trim();
		//price = $('#priceSpan_' + skuId).attr( 'data-price' );
		var selectedId = $("input:radio[name=option]:radio:checked").attr('id');
		var myLabel = $('label[for="'+ selectedId +'"]');
		
		price = myLabel.find( '.value' ).attr( 'data-value' );
	}

	var warrantyPrice = 0;
	var warrantyItem = $('.upgradeWarrantyItems_' + skuId).find("input:radio[name=warrantySkuId]:radio:checked");
	if(warrantyItem != undefined) {
		warrantyPrice = warrantyItem.attr('data-price') != undefined ? parseFloat( warrantyItem.attr('data-price')) : 0;
	}

	if(price != undefined){
	if(price.indexOf(",")!=-1)
	{
		price = price.replace(",","");
	}
	}
	//price = parseFloat(price.substring(1, price.length));
	var languages = $('#languages').val();
	var oldDueNow = parseFloat(document.getElementById('orderDueNow').value);
	var oldDueMonthly = parseFloat(document.getElementById('orderDueMonthly').value);
	var deviceDueNow_input = document.getElementById('deviceDueNow');
	var isUpdateItemWarraty = document.getElementById('isUpdateItemWarraty');
	var deviceDueMonthly_input = document.getElementById('deviceDueMonthly');
	var hasNoWarrantyAtLoad = document.getElementById('hasNoWarrantyAtLoad');
	var deviceDueMonthly = 0;
	var deviceDueNow = 0;
	if(isUpdateItemWarraty!=undefined && hasNoWarrantyAtLoad == undefined){
		if(isUpdateItemWarraty.value == 'false'){
			if(deviceDueMonthly_input!=undefined && deviceDueMonthly_input.value!=""){
				deviceDueMonthly = parseFloat(deviceDueMonthly_input.value);
			}else{
				deviceDueMonthly = parseFloat(0);
			}
			if(deviceDueNow_input!=undefined && deviceDueNow_input.value!=""){
				deviceDueNow = parseFloat(deviceDueNow_input.value);
			}else{
				deviceDueNow = parseFloat(0);
			}
		}
	}
	simPrice = parseFloat(simPrice) * qty ;
	var orderDueNow = 0;
	if(price != undefined){
		orderDueNow = oldDueNow + parseFloat(simPrice)+ (price * qty)-deviceDueNow;
	}else{
		if(isUpdateItemWarraty!=undefined){
			if(isUpdateItemWarraty.value == 'true'|| hasNoWarrantyAtLoad != undefined){
				orderDueNow = oldDueNow;
			}else{
				orderDueNow = oldDueNow + parseFloat(simPrice) - deviceDueNow ;
			}
		}else{
			orderDueNow = oldDueNow + parseFloat(simPrice) - deviceDueNow ;
		}
		
			
	}
	if(hasNoWarrantyAtLoad != undefined){
		hasNoWarrantyAtLoad.remove();
	}
	var flow = $('#flow').val();
	if(flow == 'bundle'){
	  $('#bundleDueNowPrice').val(orderDueNow);
	}
	if(languages == 'fr'){
		orderDueNow = parseFloat( orderDueNow, 10 ).toFixed( 2 ).toString().replace(".",",")+ '$';
    }else{
    	orderDueNow = '$' + parseFloat( orderDueNow, 10 ).toFixed( 2 ).toString();
    }
	$( '.now' ).text(orderDueNow);
	var orderDueMonthly =0;
	if(monthlyPrice == undefined){
		monthlyPrice = 0;
	}
	orderDueMonthly = oldDueMonthly + (monthlyPrice * qty ) + (warrantyPrice * qty)-deviceDueMonthly;
	if(flow == 'bundle'){
	  $('#bundleDueMonthlyPrice').val(orderDueMonthly);
	}
	if(languages == 'fr'){
		orderDueMonthly = parseFloat( orderDueMonthly, 10 ).toFixed( 2 ).toString().replace(".",",")+ '$';
    }else{
    	orderDueMonthly = '$' + parseFloat( orderDueMonthly, 10 ).toFixed( 2 ).toString();
    }
	$( '.monthly' ).text(orderDueMonthly);
}
//upgrade device details script -end

//cart validations -start
  var myVar = setInterval(
 	function(){ 
	  clearJAG();
  }, 4000);
 
 function clearJAG(){
  if ($.active == 0 && $(".spinner2").html() !=null &&
        $(".spinner2").html().toString().length>0) {
        JAG.stop();
		if ($( '.spinner2' ).get( 1 ) != null) {
			$( '.spinner2' ).get( 1 ).remove();
		}
  }
 }


function validateDeviceItem(checkBox)
{
	var submitButton = $( '.js-submit' );
	if(!submitButton.hasClass('state-disabled'))
	{		
		submitButton.addClass( 'state-disabled' );
	}	
	var commerceItemId=checkBox.value;	
	var hwOnlyId="hwOnly_"+commerceItemId;
	var hwOnly =document.getElementById(hwOnlyId).value;
	var hwOnlyDEP =document.getElementById("hwOnlyDEP_"+commerceItemId).value;
	var deviceCartErrId="deviceCartErr_"+commerceItemId;
	var hwPoolCartErrId="hardwarePoolErr_"+commerceItemId;
	var planCartErrId="planCartErr_"+commerceItemId;
	var addonCartErrId="addonCartErr_"+commerceItemId;
	var accessoriesCartErrId="accessoriesCartErr_"+commerceItemId;
	var subsCartErrId="subsCartErr_"+commerceItemId;
	if(document.getElementById(deviceCartErrId)!=null){
		document.getElementById(deviceCartErrId).innerHTML = "";
	}
	
	if(document.getElementById(hwPoolCartErrId)!=null){
		document.getElementById(hwPoolCartErrId).innerHTML = "";
	}
	
	if(hwOnly == false || hwOnly == "false")
	{
		var actOnlyId="actOnly_"+commerceItemId;
		var actOnly =document.getElementById(actOnlyId).value;
		if(actOnly == false || actOnly == "false")
		{
			document.getElementById(planCartErrId).innerHTML = "";
		}
		document.getElementById(addonCartErrId).innerHTML = "";
		document.getElementById(subsCartErrId).innerHTML = "";
	}
		
	if(checkBox.checked){
		var inventoryId="inventory_"+commerceItemId;
		var inventory =document.getElementById(inventoryId).value;
	
		JAG.start();
		var contextPath = $('#contextPath').val();
		$.ajax({
			url: contextPath + "/checkout/cartReview/validateDeviceItem.jsp?deviceCommerceItemId=" + commerceItemId,
			type: "get",
			dataType: "json",
			success:function(data){
				var validationFailedCnt = data.result[0].validationFailedCnt;
				var validationFailedMsg = data.result[0].validationFailedMsg;
				var itemErroMsg = data.result[0].itemErroMsg;
				if(validationFailedCnt!=undefined && validationFailedCnt != "" && validationFailedCnt != "undefined" && parseInt(validationFailedCnt, 10) > 0){
	  				
					var validationFailedMsg = html_entity_decode(validationFailedMsg);
	  				 
					document.getElementById("cart_error_message").style.display="block";
					document.getElementById("err-msg-div-device").style.display="block";
					document.getElementById("isValidDeviceGroup_"+commerceItemId).value = "false";
	  				
					if(document.getElementById("errorMessageForUpgrade").innerHTML.toString().indexOf( validationFailedMsg!=null ? validationFailedMsg.toString() : "")<0){
				 	  document.getElementById("errorMessageForDevice").innerHTML = validationFailedMsg;
					} else {
						document.getElementById("err-msg-div-device").style.display="none";
					}


					var failedCnt=parseInt(validationFailedCnt,10);
	  				switch (failedCnt) 
	  				{
		  			    case 1:
		  			    case 3:
		  			    	document.getElementById(deviceCartErrId).innerHTML = html_entity_decode(itemErroMsg);
		  			        break;
		  			    case 2:
		  			    	document.getElementById(accessoriesCartErrId).innerHTML = html_entity_decode(itemErroMsg);
		  			        break;    
		  			    case 5:
		  			    case 6:
		  			    case 7:
		  			    	document.getElementById(planCartErrId).innerHTML = html_entity_decode(itemErroMsg);
		  			        break;
		  			    case 8:
		  			    case 9:
		  			    	document.getElementById(addonCartErrId).innerHTML = html_entity_decode(itemErroMsg);
		  			        break;
		  			    case 10:
		  			    case 11:
		  			    case 17:
		  			    case 18:
		  			    	document.getElementById(subsCartErrId).innerHTML = html_entity_decode(itemErroMsg);
		  			        break;
		  			    case 19:
		  			    	if(document.getElementById(hwPoolCartErrId)!=null){
		  			    		document.getElementById(hwPoolCartErrId).innerHTML = html_entity_decode(itemErroMsg);
		  			    	}
		  			    	break;		  			   
	  				}						
					
					
	  			} else {
	  				document.getElementById("isValidDeviceGroup_"+commerceItemId).value = "true";
	  			}
	  			validateCheckoutButton();
	  			JAG.stop();
			},
			error:function(data){
				JAG.stop();
			}				
		});
		
	}else{
		document.getElementById("isValidDeviceGroup_"+commerceItemId).value = "true";
		validateCheckoutButton();
	}
	
}



function validateUpgradeDeviceItem(checkBox)
{
	var submitButton = $( '.js-submit' );
	if(!submitButton.hasClass('state-disabled'))
	{		
		submitButton.addClass( 'state-disabled' );
	}	
	var commerceItemId=checkBox.value;
	var commerceItemFloatCntId="floatCnt_"+commerceItemId;
	var commerceItemFloatCnt=parseFloat(document.getElementById(commerceItemFloatCntId).value);
	var deviceCartErrId="deviceCartErr_"+commerceItemId;
	var hwPoolCartErrId="hardwarePoolErr_"+commerceItemId;
	var planCartErrId="planCartErr_"+commerceItemId;
	var addonCartErrId="addonCartErr_"+commerceItemId;
	var accessoriesCartErrId="accessoriesCartErr_"+commerceItemId;
	var subsCartErrId="subsCartErr_"+commerceItemId;
	
	document.getElementById(deviceCartErrId).innerHTML = "";
	if(document.getElementById(planCartErrId)!=null){
		document.getElementById(planCartErrId).innerHTML = "";
	}
	if(document.getElementById(planCartErrId)!=null){
		document.getElementById(addonCartErrId).innerHTML = "";
	}
	
	if(document.getElementById(hwPoolCartErrId)!=null){
		document.getElementById(hwPoolCartErrId).innerHTML = "";
	}

	var isQuotaExceeded=false;
	if(checkBox.checked){
		var inventoryId="inventory_"+commerceItemId;
		var inventory =document.getElementById(inventoryId).value;
		
		if(parseFloat(commerceItemFloatCnt)>0)
		{
			var quota = document.getElementById("quota").value;
			var checkboxes = document.getElementsByClassName("upgrade-checkbox");
			var floatUsed=0;
			for (var i = 0; i < checkboxes.length; i++){
				var chkbox = checkboxes[i];
				if (chkbox.checked) {
					var floatCntId="floatCnt_"+chkbox.value;
					var floatCnt=parseFloat(document.getElementById(floatCntId).value);
					if(floatCnt>0)
					{
						floatUsed = parseFloat(floatUsed + floatCnt);
					}
				} 
			}
			if(parseFloat(floatUsed)>parseFloat(quota))
			{
				isQuotaExceeded = true;
			}
		}
		if(isQuotaExceeded)
		{
			var quotaExceededErrMsg = document.getElementById("quotaExceededErrMsg").value;
			document.getElementById("errorMessageForUpgrade").innerHTML = html_entity_decode(quotaExceededErrMsg);
			document.getElementById("cart_error_message").style.display="block";
			document.getElementById("err-msg-div-upgrade").style.display="block";
			document.getElementById("isValidDeviceGroup_"+commerceItemId).value = "false";
		}else
		{
			JAG.start();
			var contextPath = $('#contextPath').val();
			$.ajax({
				url: contextPath + "/checkout/cartReview/validateDeviceItem.jsp?deviceCommerceItemId=" + commerceItemId,
				type: "get",
				dataType: "json",
				success:function(data){
					var validationFailedCnt = data.result[0].validationFailedCnt;
					var validationFailedMsg = data.result[0].validationFailedMsg;
					var itemErroMsg = data.result[0].itemErroMsg;
					if(validationFailedCnt!=undefined && validationFailedCnt != "" && validationFailedCnt != "undefined" && parseInt(validationFailedCnt, 10) > 0){
		  				var validationFailedMsg = html_entity_decode(validationFailedMsg);
						
						document.getElementById("cart_error_message").style.display="block";
						document.getElementById("err-msg-div-upgrade").style.display="block";
						document.getElementById("isValidDeviceGroup_"+commerceItemId).value = "false";
						
						if(document.getElementById("errorMessageForDevice").innerHTML.toString().indexOf( validationFailedMsg!=null ? validationFailedMsg.toString() : "")<0){
						  document.getElementById("errorMessageForUpgrade").innerHTML = validationFailedMsg;
						}else{
							document.getElementById("err-msg-div-upgrade").style.display="none";
						}

		  				var failedCnt=parseInt(validationFailedCnt,10);
		  				switch (failedCnt) 
		  				{
			  			    case 1:
			  			    case 3:
			  			    case 15:
			  			    	document.getElementById(deviceCartErrId).innerHTML = html_entity_decode(itemErroMsg);
			  			        break;
			  			    case 2:
			  			    	document.getElementById(accessoriesCartErrId).innerHTML = html_entity_decode(itemErroMsg);
			  			        break;
			  			    case 5:
			  			    case 6:
			  			    case 7:
			  			    	document.getElementById(planCartErrId).innerHTML = html_entity_decode(itemErroMsg);
			  			        break;
			  			    case 8:
			  			    case 9:
			  			    	document.getElementById(addonCartErrId).innerHTML = html_entity_decode(itemErroMsg);
			  			        break;
			  			    case 10:
			  			    case 11:
			  			    case 17:
			  			    case 18:
			  			    	document.getElementById(subsCartErrId).innerHTML = html_entity_decode(itemErroMsg);
			  			        break;	
						    case 19:
		  				    	if(document.getElementById(hwPoolCartErrId)!=null){
		  				    		document.getElementById(hwPoolCartErrId).innerHTML = html_entity_decode(itemErroMsg);
		  			    		}
		  			    		break;							  			   
		  				}
						
						
		  			} else {
		  				document.getElementById("isValidDeviceGroup_"+commerceItemId).value = "true";
		  			}			  		
		  			validateCheckoutButton();
		  			JAG.stop();
				},
				error:function(data){
					JAG.stop();
				}				
			});
		}
			
	}else {
		document.getElementById("isValidDeviceGroup_"+commerceItemId).value = "true";
		validateCheckoutButton();
	}	
}


function validateAccessoryItem(checkBox)
{
	var submitButton = $( '.js-submit' );
	if(!submitButton.hasClass('state-disabled'))
	{		
		submitButton.addClass( 'state-disabled' );
	}	
	var commerceItemId=checkBox.value;
	var accCartErrId="accCartErr_"+commerceItemId;
	
	if(checkBox.checked){
		var inventoryId="inventory_"+commerceItemId;
		var inventory =document.getElementById(inventoryId).value;
		if(inventory !='accInstock')
		{
			document.getElementById("isValidAccessoriesGroup_"+commerceItemId).value = "false";
		}
		else
		{
			JAG.start();
			var contextPath = $('#contextPath').val();
			$.ajax({
				url: contextPath + "/checkout/cartReview/validateAccessoryItem.jsp?accessoryCommItemId=" + commerceItemId,
				type: "get",
				dataType: "json",
				success:function(data){
					var validationFailedCnt = data.result[0].accValidationFailedCnt;
					var validationFailedMsg = data.result[0].accValidationFailedMsg;
					var itemErroMsg = data.result[0].accItemErroMsg;
		  			if(validationFailedCnt!=undefined && validationFailedCnt != "" && validationFailedCnt != "undefined" && parseInt(validationFailedCnt, 10) > 0){
		  				document.getElementById("errorMessageForAcc").innerHTML = html_entity_decode(validationFailedMsg);
						document.getElementById("cart_error_message").style.display="block";
						document.getElementById("err-msg-div-acc").style.display="block";
						document.getElementById("isValidAccessoriesGroup_"+commerceItemId).value = "false";
		  				document.getElementById(accCartErrId).innerHTML = html_entity_decode(itemErroMsg);
		  			}else {
		  				document.getElementById("isValidAccessoriesGroup_"+commerceItemId).value = "true";
		  			}
		  			validateCheckoutButton();
		  			JAG.stop();
				},
				error:function(data){
					JAG.stop();
				}				
			});	
		}
	}else {
		document.getElementById("isValidAccessoriesGroup_"+commerceItemId).value = "true";
		validateCheckoutButton();
	}	
}
function html_entity_decode(s) {
	  var t=document.createElement('textarea');
	  t.innerHTML = s;
	  var v = t.value;
	  return v;
	}

function validateCheckoutButton() {
	var checkboxes = $( '.js-select-at-least-one' ),
		submitButton = $( '.js-submit' ),
		activate = false,
		altestOneInvalid = 0;
	checkboxes.each( function () {
		var checkbox = $( this );
		var isValidGroup = checkbox.find( '.isValidGroup' ).val();
		if ( checkbox.find( '.frg-icon' ).hasClass( 'icon-checkmark' )) {
			if((isValidGroup == true || isValidGroup == 'true')) {
				activate = true;
			} else {
				altestOneInvalid = altestOneInvalid + 1;
			}
		} 
	});
	if ( activate && altestOneInvalid == 0) {
		submitButton.removeClass( 'state-disabled' );
	} else {
		submitButton.addClass( 'state-disabled' );
	}
}
//cart validations -end
//upgrade device details required field validations -start
function checkUpgradeRequiredField ( el ) {
	var	form = $( el.target ).closest( '.js-all-required-fields' ),
		fields = form.find( '.upgrade-js-required' ),				
		valid = true,
		radios = form.find( 'input[type=radio].upgrade-js-required' ),
		radios_valid = ( radios.length > 0 ) ? false : true;
	var button = $( '.js-submit' );
	var sim_selected= $('#upgradeSimDrpDwn').val();
	fields.each( function () {
		var field = $( this );

		radios.each( function () {
			if ( $( this ).is( ':checked' ) ) {
				radios_valid = true;
			}
		});
		if ( field.val() === '' || field.val().toLowerCase() === 'select') {
			valid = false;
		} else if ( field.hasClass( 'js-quantity' ) && field.parent().hasClass( 'status' ) && field.parent().hasClass( 'negative' ) ) {
			valid = false;
		}
	});
	
	if ( !( valid && radios_valid && sim_selected!="") ) {
		button.addClass( 'state-disabled' );
	} else {
		button.removeClass( 'state-disabled' );
	}
		
	return self;
}
//upgrade device details required field validations -end

function validateCheckbox(){
	var checkboxesq = $( '.frg-checkbox' );
	oneUnselect = 'false';
	var er =new Array();
	checkboxesq.each( function () {
		var checkbox = $( this ),
		actual_checkbox = checkbox.find( 'input[type=checkbox]' ),
		checked = actual_checkbox.is( ':checked' );
		if (!checked) {
			er.push(actual_checkbox.val());
			oneUnselect = 'true';
		} 
	});
	$('#unCheckedCommerceIds').val(er);
	if(oneUnselect === 'true'){
		$('#clearUnSelectCart').modal();	
		$( '.js-confirm-clearUnSelect' ).click( function () {
			$("#clearUnSelectCartForm").submit();
		});
	}else{
		$("#clearUnSelectCartForm").submit();
	}
} 

function submitPayment(){
	var submitButton = $( '.frg-button');
	submitButton.addClass( 'state-disabled' );
} 

function validateSerialNumber()
{
	var serialNumber=document.getElementById("serialNumber").value;
	document.getElementById("serialNumberErrorMsg").style.display="none";
	JAG.start();
	var contextPath = $('#contextPath').val();
	$.ajax({
		url: contextPath + "/index/validateSerialNumber.jsp?serialNumber=" + serialNumber,
		type: "get",
		dataType: "json",
		success:function(data){
			var isValid = data.result[0].isValid;
			if(isValid!=undefined && isValid != "" && isValid != "undefined" && isValid == "true"){
				document.getElementById("serialNumberErrorMsg").style.display="none";
				window.location=contextPath+"/repair/itemDetails.jsp";
			}else{
				document.getElementById("serialNumberErrorMsg").style.display="block";
			}
  			JAG.stop();
		},
		error:function(data){
			document.getElementById("serialNumberErrorMsg").style.display="block";
			JAG.stop();
		}				
	});
}
//EOFR-6025:Accessory only flow - ban selection on payment page, if user selects pay by hw account
function onSelectPaymentAccount()
{
	var paymentAccntVal = document.getElementById('fm_paymentAccount').value;
	if(paymentAccntVal.indexOf("-")!=-1)
	{
		var pymtAccountTypes=paymentAccntVal.split("-");
		var type = pymtAccountTypes[0];
		if('account' ==type)
		{
			if(document.getElementById('ban_div') !== null){
				document.getElementById('ban_div').style.display="block";
			}			
			document.getElementById('poNumberDiv').style.display="block";
		}else{
			if(document.getElementById('ban_div') !== null){
				document.getElementById('ban_div').style.display="none";
			}			
			document.getElementById('poNumberDiv').style.display="none";
		}
	}
}
//EOFR-7595-Print functionality for ClientOM
function printPage(divName) {
	var checkboxes = document.getElementsByClassName("frg-checkbox ");
	var divHeader = document.getElementById("divHeaderPrint");
     var printContents = document.getElementById(divName).innerHTML;
     var originalContents = document.body.innerHTML;

     document.body.innerHTML = printContents;
     var logo = document.getElementById("logo1");
     [].forEach.call(document.querySelectorAll('.frg-checkbox'), function (el) {
    	  el.style.visibility = 'hidden';
    	});
     [].forEach.call(document.querySelectorAll('.js-show_list'), function (el) {
    	  el.style.visibility = 'hidden';
    	});
   $('#divHeaderPrint').show();
   //$('#divFooterPrint').show();
   	logo1.style.display= "block";
     window.print();
   $('#divHeaderPrint').hide();
   //$('#divFooterPrint').hide();
     document.body.innerHTML = originalContents;
     $( '.menu' ).dropit().find( '.hide' ).removeClass( 'hide' );
     logo1.style.display= 'none';
     [].forEach.call(document.querySelectorAll('.frg-checkbox'), function (el) {
    	  el.style.visibility = 'visible';
    	});
     [].forEach.call(document.querySelectorAll('.js-show_list'), function (el) {
    	  el.style.visibility = 'visible';
    	});
	
}

function isIE() {
	var links = document.getElementsByClassName('accessoryLink');
	for(var i = 0; i < links.length; i++)
	{
		links[i].style.paddingLeft="115px";
	} 
}

function detectIE() {
	  var ua = window.navigator.userAgent;


	  var msie = ua.indexOf('MSIE ');
	  if (msie > 0) {
	    return true;
	  }

	  var trident = ua.indexOf('Trident/');
	  if (trident > 0) {
	    var rv = ua.indexOf('rv:');
	    return true;
	  }

	  var edge = ua.indexOf('Edge/');
	  if (edge > 0) {
	    return true;
	  }

	  // other browser
	  return false;
}

function validateEmail(email){
	var filter = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+(([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,})){2,}\.?$/i;
	if (!filter.test(email)) {
		return false;
	} else{
		return true;
	}
}

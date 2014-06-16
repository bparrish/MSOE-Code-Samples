/** Settings.js Sample Code **/
 onLoad : function() {
	AppTite.page.settings.SettingsPage.superclass.onLoad.call(this);
	var self = this;

	var restId = eval(sessionStorage.authUsr).rest_id;

	$.ajax({
			url: $servletContext + '/SettingsServlet',
			type: 'GET',
			dataType: 'text',
			data: {
					Command : 'getRestaurantSettings',
					restId : restId
			},
			success : function(data) {
					if(data === "FAILURE"){

					}else{
							console.log(data);
							self.displayData(eval(data));                                   
					}
			}
	});
	$('#previewBtn').on("click", function(event){
			$.fancybox({
					autoScale : true,
					type : 'iframe',
					padding : 0,
					href: 'https://<SERVER_URL:PORT_NO>/AppTite/Settings?Command=getMenu&rid='+restId
			});
	});
},
onReady : function(){
	//Form submit
	$('#settingsForm').on("submit", function(event){
		var valid = true;

		var address1 = $('#address1').val();
		if(!(address1.length > 0)
						|| address1.indexOf('\'') > 0 
						|| address1.indexOf('"') > 0) {
				valid = false;
				$("#address1").css("background-color", "yellow");
		}

		var address2 = $('#address2').val();
		if(address2.indexOf('\'') > 0 
						|| address2.indexOf('"') > 0) {
				valid = false;
				$("#address2").css("background-color", "yellow");
		}

		var city = $('#city').val();
		if(!(city.length > 0)
						|| city.indexOf('\'') > 0 
						|| city.indexOf('"') > 0) {
				valid = false;
				$("#city").css("background-color", "yellow");
		}

		var state = $('#state').val();
		if(!(state.length > 0)
						|| state.indexOf('\'') > 0 
						|| state.indexOf('"') > 0) {
				valid = false;
				$("#state").css("background-color", "yellow");
		}

		var zip = $('#zip').val();
		if(!(zip.length > 0)
						|| zip.indexOf('\'') > 0 
						|| zip.indexOf('"') > 0) {
				valid = false;
				$("#zip").css("background-color", "yellow");
		}

		var companyPhone = $('#phone').val();
		if(!(companyPhone.length > 0)
						|| companyPhone.indexOf('\'') > 0 
						|| companyPhone.indexOf('"') > 0) {
				valid = false;
				$("#phone").css("background-color", "yellow");
		}

		var sundayOpen = $('#sunday_open').val();
		if(!(sundayOpen.length > 0)
						|| sundayOpen.indexOf('\'') > 0 
						|| sundayOpen.indexOf('"') > 0) {
				valid = false;
				$("#sunday_open").css("background-color", "yellow");
		}

		var sundayClose = $('#sunday_close').val();
		if(!(sundayClose.length > 0)
						|| sundayClose.indexOf('\'') > 0 
						|| sundayClose.indexOf('"') > 0) {
				valid = false;
				$("#sunday_close").css("background-color", "yellow");
		}

		var mondayOpen = $('#monday_open').val();
		if(!(mondayOpen.length > 0)
						|| mondayOpen.indexOf('\'') > 0 
						|| mondayOpen.indexOf('"') > 0) {
				valid = false;
				$("#monday_open").css("background-color", "yellow");
		}

		var mondayClose = $('#monday_close').val();
		if(!(mondayClose.length > 0)
						|| mondayClose.indexOf('\'') > 0 
						|| mondayClose.indexOf('"') > 0) {
				valid = false;
				$("#monday_close").css("background-color", "yellow");
		}

		var tuesdayOpen = $('#tuesday_open').val();
		if(!(tuesdayOpen.length > 0)
						|| tuesdayOpen.indexOf('\'') > 0 
						|| tuesdayOpen.indexOf('"') > 0) {
				valid = false;
				$("#tuesday_open").css("background-color", "yellow");
		}

		var tuesdayClose = $('#tuesday_close').val();
		if(!(tuesdayClose.length > 0)
						|| tuesdayClose.indexOf('\'') > 0 
						|| tuesdayClose.indexOf('"') > 0) {
				valid = false;
				$("#tuesday_close").css("background-color", "yellow");
		}

		var wednesdayOpen = $('#wednesday_open').val();
		if(!(wednesdayOpen.length > 0)
						|| wednesdayOpen.indexOf('\'') > 0 
						|| wednesdayOpen.indexOf('"') > 0) {
				valid = false;
				$("#wednesday_open").css("background-color", "yellow");
		}

		var wednesdayClose = $('#wednesday_close').val();
		if(!(wednesdayClose.length > 0)
						|| wednesdayClose.indexOf('\'') > 0 
						|| wednesdayClose.indexOf('"') > 0) {
				valid = false;
				$("#wednesday_close").css("background-color", "yellow");
		}

		var thursdayOpen = $('#thursday_open').val();
		if(!(thursdayOpen.length > 0)
						|| thursdayOpen.indexOf('\'') > 0 
						|| thursdayOpen.indexOf('"') > 0) {
				valid = false;
				$("#thursday_open").css("background-color", "yellow");
		}

		var thursdayClose = $('#thursday_close').val();
		if(!(thursdayClose.length > 0)
						|| thursdayClose.indexOf('\'') > 0 
						|| thursdayClose.indexOf('"') > 0) {
				valid = false;
				$("#thursday_close").css("background-color", "yellow");
		}

		var fridayOpen = $('#friday_open').val();
		if(!(fridayOpen.length > 0)
						|| fridayOpen.indexOf('\'') > 0 
						|| fridayOpen.indexOf('"') > 0) {
				valid = false;
				$("#friday_open").css("background-color", "yellow");
		}

		var fridayClose = $('#friday_close').val();
		if(!(fridayClose.length > 0)
						|| fridayClose.indexOf('\'') > 0 
						|| fridayClose.indexOf('"') > 0) {
				valid = false;
				$("#friday_close").css("background-color", "yellow");
		}

		var saturdayOpen = $('#saturday_open').val();
		if(!(saturdayOpen.length > 0)
						|| saturdayOpen.indexOf('\'') > 0 
						|| saturdayOpen.indexOf('"') > 0) {
				valid = false;
				$("#saturday_open").css("background-color", "yellow");
		}

		var saturdayClose = $('#saturday_close').val();
		if(!(saturdayClose.length > 0)
						|| saturdayClose.indexOf('\'') > 0 
						|| saturdayClose.indexOf('"') > 0) {
				valid = false;
				$("#saturday_close").css("background-color", "yellow");
		}

		var delivery = $('#delivery').val();
		if(!(delivery.length > 0)
						|| delivery.indexOf('\'') > 0 
						|| delivery.indexOf('"') > 0) {
				valid = false;
				$("#delivery").css("background-color", "yellow");
		}

		var tax = $('#tax').val();
		if(!(tax.length > 0)
						|| tax.indexOf('\'') > 0 
						|| tax.indexOf('"') > 0) {
				valid = false;
				$("#tax").css("background-color", "yellow");
		}

		if(valid) {
				// Send the info to the servlet
				$.ajax({
						url: $servletContext + '/SettingsServlet',
						type: 'POST',
						datatype: 'text',
						data: {
								Command : 'saveRestaurantSettings',
								Company_Address1 : address1,
								Company_Address2 : address2,
								City : city,
								State : state,
								Zip : zip,
								Company_Phone : companyPhone,
								SundayOpen : sundayOpen,
								SundayClose : sundayClose,
								MondayOpen : mondayOpen,
								MondayClose : mondayClose,
								TuesdayOpen : tuesdayOpen,
								TuesdayClose : tuesdayClose,
								WednesdayOpen : wednesdayOpen,
								WednesdayClose : wednesdayClose,
								ThursdayOpen : thursdayClose,
								ThursdayClose : thursdayClose,
								FridayOpen : fridayOpen,
								FridayClose : fridayClose,
								SaturdayOpen : saturdayOpen,
								SaturdayClose : saturdayClose,
								Delivery : delivery,
								Tax : tax,
								restId : restId
						},
						success : function(data){
								console.log("data: " + data);
								if(data == "False"){

								}else if(data == "True"){
										// This might need to change to display in a div on the page
										alert("Settings Saved Successfully!");
								}
						}, error : function(){
								console.log("error");
						}
				});
				event.preventDefault();
				return false;
		}
});
// Upload the menu to the server
                // Set the active menu 
                $('#uploadBtn').on('click', function(){
                        console.log("Upload Button Click... test...");


                        // Get the property 'files' and then gets the first file
                        var $myfile = $('#menuUpload').prop('files')[0];
                        //File Object Javascript: http://help.dottoro.com/ljbnqsqf.php

                        //// This follows an example from http://www.technicaladvices.com/2011/12/10/ajax-file-upload-to-a-java-servlet-in-html5/
                        var formdata = new FormData();
                        formdata.append("Command", "uploadMenu");
                        formdata.append("file", $myfile);
                        var xhr = new XMLHttpRequest();
                        xhr.open("POST", $servletContext +"/SettingsServlet?Command=uploadMenu&restId="+restId);
                        xhr.send(formdata);
                        xhr.onload = function(e){
                                if(this.status == 200){
                                        console.log(this.responseText);
                                }
                        };

                });
        },

        displayData : function(settings){

                var item = settings[0];

                // Set the address
                $('#address1').val(item.adrln1);
                $('#address2').val(item.adrln2);
                $('#city').val(item.city);
                $('#state').val(item.state);
                $('#zip').val(item.zip_code);
                $('#phone').val(item.phnum);
                if(item.tax === "None"){
                        $('#tax').val("0.00");
                }else{
                        $('#tax').val(item.tax);
                }
                if(item.deliver === "None"){
                        $('#delivery').val("0.00");
                }else{
                        $('#delivery').val(item.delivery);
                }
                // Set each day's open and close time
                for(var i=0; i<settings.length; i++){
                        item = settings[i];
                        if(item.day === "Sunday"){
                                $('#sunday_open').val(item.open_time);
                                $('#sunday_close').val(item.close_time);
                        }else if(item.day === "Monday"){
                                $('#monday_open').val(item.open_time);
                                $('#monday_close').val(item.close_time);
                        }else if(item.day === "Tuesday"){
                                $('#tuesday_open').val(item.open_time);
                                $('#tuesday_close').val(item.close_time);
                        }else if(item.day === "Wednesday"){
                                $('#wednesday_open').val(item.open_time);
                                $('#wednesday_close').val(item.close_time);
                        }else if(item.day === "Thursday"){
                                $('#thursday_open').val(item.open_time);
                                $('#thursday_close').val(item.close_time);
                        }else if(item.day === "Friday"){
                                $('#friday_open').val(item.open_time);
                                $('#friday_close').val(item.close_time);
                        }else if(item.day === "Saturday"){
                                $('#saturday_open').val(item.open_time);
                                $('#saturday_close').val(item.close_time);
                        }
                }
        }

});
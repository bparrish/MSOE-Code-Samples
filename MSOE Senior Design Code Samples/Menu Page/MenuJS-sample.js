onReady : function(){
		var self = this;

		// Set up json, can use to save grid into json
		var gridster = self.setUpGridster($($('.gridster ul')));

		var json = gridster.serialize();

		$('<div/>',{
			class: 'fixed grid-test',
			text: 'IN EDIT MODE',
			id: 'overlayGridTest', 
		}).appendTo('body');
		$('.grid-test').css('color', 'red');
		$('#overlayGridTest').css('visibility', 'hidden');
		gridster.remove_all_widgets();
		
		$.ajax({
			url : '/AppTite/SettingsServlet/',
			type : 'GET',
			dataType : 'json',
			async: false,
			data : {
				'Command' : 'getButtonConfiguration',
				'restId' : eval(sessionStorage.authUsr).rest_id
			},
			success: function(data){		
				if(data==null || data == 'false') {
					// There were no button configurations for this menu
				} else {
					json = data;
				}
			},
			error: function(data){
				console.log("Error getting button configurations!");
			}
		});
		
		if (eval(sessionStorage.authUsr).role_id != "admin") {
			$('#adminEdit').css('visibility', 'hidden');
		}
		
		// Test the loading of the buttons
		self.loadJson(eval(json), gridster);
		gridster.disable();
		
		// Menu Item handler
		$('.gridster button').on('click', function(event){
			var elm = this;
			event.preventDefault();
			// Get the 'li' select and check if it has the edit mode class
			if(gridster.is_enabled()){
				var elmId = $(elm).parent().parent().parent().attr('id');
				var color = self.rgb2hex($(elm).css('background-color')).replace('#', '');
				var line1 = $(elm)[0].childNodes[0].textContent.replace(/\s/g,'');
				var line2 = $(elm)[0].childNodes[1].textContent.replace(/\s/g,'');
				$.fancybox({
					autoscale : true,
					type : 'iframe',
					padding : 0,
					href : $context+'menuItemEdit.jsp' + '?ID=' + elmId + '&color=' + color + '&line1=' +line1 + '&line2=' +line2,
					width: 1200,
					minHeight: 600,
					afterClose: function(){
						console.log('After load!');
					}
				});
			}
			else{
				menuItemHandler(elm);
			}
			return false;
		});
		
		$('#adminEdit').on('click', function(){
			var $this = $(this);
			// Edit mode 
			if($this.hasClass('editMode')){
				var jData = gridster.serialize();
				gridster.disable();
				$this.removeClass('editMode');
				$('.gridster li').removeClass('editModeBtn');
				$this.html('Edit Menu');

				$.ajax({
					url : '/AppTite/SettingsServlet/',
					type : 'POST',
					dataType : 'text',
					data: {
						'Command' : 'saveButtonConfiguration',
						'restId' : eval(sessionStorage.authUsr).rest_id,
						'config' : JSON.stringify(jData).replace(/,/g, '|')
					},
					success: function(data) {
						if (data != null && data != "False") {
							console.log("Button configuration saved successfully!");
						} else {
						    console.log("Error saving button configuration!");
						}
					},
					error: function(data) {
						console.log("Error saving button configuration!");
					}
				});

				$('#overlayGridTest').css('visibility', 'hidden');
			}else{
				gridster.enable();
				$this.addClass('editMode');
				$('.gridster li').addClass('editModeBtn');
				$this.text('Editing...');
				$('#overlayGridTest').css('visibility', 'visible');
			}
		});
		
},

$('#voidAll').on('click',function(event){
			event.preventDefault();
			var cnfrm = confirm("Are you sure you want to delete all of these items?");
			if(cnfrm){
				$('.active.orderedItems table').empty();
				$.ajax({
					url : $servletContext + '/OrdersManagementServlet/',
					type: 'GET',
					dataType: 'json',
					data : {
						'Command' : 'deleteAll',
						'usr_id' : eval(sessionStorage.authUsr).usr_id,
						'restId' : eval(sessionStorage.authUsr).rest_id,
						success : function(data){
							$(".subtotal")[0].innerHTML = "$0.00";
						}
					}
				});
			}
			return false;
		});
		
	},

	loadJson : function(jsonGrid, gridster){
		// Need to figure out how the json will be here
		// Assume serialized array
		var self = this;
		for(var i = 0; i<jsonGrid.length; i++){
			// Give the default widget a c1 class where the button background color
			// will be green
			// After the widget is added, the color can be done
			var $elm = gridster.add_widget(
					'<li class="c1 dragMe" id="m_'+ jsonGrid[i]['col']+'_'+ jsonGrid[i]['row'] +'">'+
					'<form class="btnWrapForm">'+
					'<div class="form-group btmbtn">'+
					'<button class="form-control btn btn-num-letter bottomBtn">'+
					jsonGrid[i]['description_1']+'<span class="clearfix">'+jsonGrid[i]['description_2']+'&nbsp;</span>'+
					'</button>'+
					'</div>'+
					'</form>'+
					'</li>',
					jsonGrid[i]['size_x'],
					jsonGrid[i]['size_y'],
					jsonGrid[i]['col'],
					jsonGrid[i]['row']
			);
			// Color the button to what was passed in w/ the json
			var $button = $elm.find('button');
			var bgColor = jsonGrid[i]['color'];
			$button.css({
				backgroundColor: bgColor,
				'border-color': bgColor,
				color: 'black'
			});
			$button.attr("menuId", jsonGrid[i]['menuId']);
		}

		$('.dragMe button').each(function(){
			var $button = $(this);
			var bgColor = $button.css('backgroundColor');
			$button.hover(
					function(){
						var $this = $(this);
						$this.data('bgcolor' , bgColor)
						.css({
							backgroundColor: self.darken(bgColor, 0.08),
							'border-color': self.darken(bgColor, 0.12),
							color: 'white'
						});
					},
					function(){
						var $this = $(this);
						$this.css({
							backgroundColor: $this.data('bgcolor'),
							'border-color': $this.data('bgcolor'),
							color: 'black'
						});
					}
			);
		});


		//$('.grid-test').text("JSON LOADED SUCCESSFULLY!!!!").css('color', 'green');
		gridster.enable();
		return gridster;
	},

	setUpGridster: function($elm){
		var self = this;
		var gridster = $elm.gridster({
			widget_margins: [1,1],
			widget_selector: '.dragMe',
			widget_base_dimensions: [264, 103],
			max_cols: 5,
			max_rows: 5,
			resize: {
				enable: true
			},
			serialize_params: function($w, wdg) {
				var $tmp2 = wdg.el[0];
				var $elm = $($tmp2).find('button');
				var ln2;
				if ($elm[0].childNodes[1] === undefined) {
					ln2 = "";
				} else {
					ln2 = $elm[0].childNodes[1].textContent.replace(/\s/g,'');
				}
				return {
					id: "testItem (" + wdg.col +", " +wdg.row +")",
					col: wdg.col,
					row: wdg.row,
					size_x: wdg.size_x,
					size_y: wdg.size_y,
					color: self.rgb2hex($elm.css('backgroundColor')),
					description_1: $elm[0].childNodes[0].textContent.replace(/\s/g,''),
					description_2: ln2,
					menuId : $elm.attr("menuId")
				};
			},
			draggable: {
				stop: function(event, ui){
					var id = this.$helper[0].attributes[0].value;
					var row = this.$helper[0].attributes[1].value;
					var col = this.$helper[0].attributes[2].value;
				}, 
				items: '.dragMe',
				limit: true
			}
		}).data('gridster');

		gridster.enable();
		return gridster;
	}
	
	});
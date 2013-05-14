
function doit(){
	
	//var dataset = [5,10,15,20,25];
	
	var n_values = 30;
	var shape_width = 30;
	var shape_spacing = 20;
	var chart_width = n_values*(shape_width+shape_spacing)+20;
	var chart_height = 275;
	var padding_top = 20;
	var padding_bottom = 20;
	var padding_left = 20;
	var padding_right = 20;
	var bar_maxHeight = chart_height-padding_top;
	
	var dataset = [];                         //Initialize empty array
	for (var i = 0; i < n_values; i++) {            //Loop 25 times
	    var newNumber = Math.round( Math.random() * bar_maxHeight);   //New random number (0-30)
	    dataset.push(newNumber);              //Add new number to array
	}
	
	document.getElementById("bars").innerHTML ="";
	document.getElementById("circles").innerHTML ="";
	document.getElementById("scatter").innerHTML ="";
	
	/**Bar chart***************************************************/
	var svg_bars = d3.select("#bars").append("svg")
					.attr("width", chart_width)
					.attr("height", chart_height);
	
	var xScale = d3.scale.ordinal()
							.domain(d3.range(dataset.length))
							.rangeRoundBands([0, chart_width], 0.3);
	
	svg_bars.selectAll("rect")
				.data(dataset)
					.enter()
						.append("rect")
							//.attr("width", shape_width)
							.attr("width", xScale.rangeBand())
							.attr("height", function(d){return d;})
							//.attr("x",function(d,i){return i*(shape_spacing+shape_width)+shape_spacing;})
							.attr("x", function(d, i) {return xScale(i);})
							.attr("y", function(d,i){return chart_height-d})
							.style("fill", function(d) {return "rgb("+d+","+d+","+d+")";})
							.style("stroke-width",1)
							.style("stroke", "black")
							.on("click",function(d,i){
								console.log("click on i:"+i+" d:"+d);
							})
							.on("mouseover", function() {
						        d3.select(this)
						        	//.transition()
						        	//.duration(250)
						        	.style("fill", "orange");
						    })
						    .on("mouseout", function(d) {
						    	d3.select(this)
						    		.transition()
						    		.duration(250)
                					.style("fill", "rgb("+d+","+d+","+d+")");
						    });
	svg_bars.selectAll("rect")
				.append("title")
					.text(function(d) {
							return d;
					});
	
	svg_bars.selectAll("text")
				.data(dataset)
					.enter()
						.append("text")
							.text(function (d){return d;})
								.attr("x", function (d, i) {return i*(shape_spacing+shape_width)+shape_spacing+shape_width*0.5;})
								.attr("y", function(d,i){return chart_height-d-2})
								.attr("font-family", "sans-serif")
								.attr("font-size", "12px")
								.attr("fill", "black")
								.attr("text-anchor", "middle");
	
	
	var removeHover = function(){
		svg_bars.selectAll("rect")
			.on("mouseover", function() {})
			.on("mouseout", function() {});
	};
	var addHover = function(){
		svg_bars.selectAll("rect")
					.on("mouseover", function() {
				        d3.select(this)
				        //.transition()
				        //.duration(250)
				        .style("fill", "orange");
		    		})
	    			.on("mouseout", function(d) {
		    			d3.select(this)
				    		.transition()
				    		.duration(250)
	    					.style("fill", "rgb("+d+","+d+","+d+")");
				    });
	};
	
	var sortOrder = false;
	var sortBars = function() {

		svg_bars.selectAll("rect")
					.sort(function(a, b) {
							if (sortOrder) {return d3.ascending(a, b);}
							else {return d3.descending(a, b);}
						})
						.transition()
						.delay(function(d, i) {
				    			return i * 50;
				    	})
						.duration(1000)
						.attr("x", function(d, i) {
							return xScale(i);
						});
        
        svg_bars.selectAll("text")
        			.sort(function(a, b) {
        					if (sortOrder) {return d3.ascending(a, b);}
        					else {return d3.descending(a, b);}
        				})
        			.transition()
        			.delay(function(d, i) {
				    			return i * 50;
				    		})
        			.duration(1000)
        			.attr("x", function (d, i) {
        							return i*(shape_spacing+shape_width)+shape_spacing+shape_width*0.5;
        						});
        sortOrder = !sortOrder;
	};
	
	svg_bars.on("click", function(){
		removeHover();
		sortBars();
		addHover();
	});
	
	/**Circles chart***************************************************/
	
	var svg_circles = d3.select("#circles").append("svg")
					.attr("width", chart_width)
					.attr("height", chart_height);
	
	/*svg_circles.selectAll("line")
		.data(dataset)
			.enter()
				.append("line")
					.attr("x1", function (d, i) {return i*(shape_spacing+shape_width)+shape_spacing+5;})
					.attr("y1", 0)
					.attr("x2", function (d, i) {return i*(shape_spacing+shape_width)+shape_spacing+5;})
					.attr("y2", chart_height-padding_top)
					.style("stroke-width", 2)
					.style("stroke","rgb(255,0,0)");*/
	
	svg_circles.selectAll("circle")
			.data(dataset)
				.enter()
					.append("circle")
						.attr("cx", function (d, i) {return i*(shape_spacing+shape_width)+shape_spacing+5;})
						.attr("cy", chart_height/2)
						.attr("r", function (d) {return Math.round(d/3);})
						.style("fill", function(d) {return "rgb("+d+","+d+","+d+")";})
						.style("fill-opacity",0.7)
						.style("stroke-width",1)
						.style("stroke", "black");
						
	
	/**Scatter plot***************************************************/
	var dataset = [];               
	for (var i = 0; i < n_values; i++) {         			
	    var newPoint = [Math.round(Math.random()*100),
	                    Math.round(Math.random()*10)];
	    dataset.push(newPoint);             				
	}
	
	var scatter_svg = d3.select("#scatter").append("svg")
												.attr("width", chart_width)
												.attr("height", chart_height);
	
	var scalex = d3.scale.linear()
							.domain([0,d3.max(dataset, function(d){return d[0];})])
							.range([padding_left,chart_width-padding_right]);
	
	var scaley = d3.scale.linear()
							.domain([0,d3.max(dataset, function(d){return d[1];})])
							.range([chart_height-padding_bottom, padding_top,]);
	
	scatter_svg.selectAll("circle")
					.data(dataset)
						.enter()
							.append("circle")
								.attr("cx",function (d){return scalex(d[0]);})
								.attr("cy",function (d){return scaley(d[1]);})
								.attr("r", 10)
								.style("fill", "black");
								
	scatter_svg.selectAll("text")  // <-- Note "text", not "circle" or "rect"
	   				.data(dataset)
	   					.enter()
	   						.append("text")     // <-- Same here!
	   							.text(function(d) {return d[0] + "," + d[1];})
	   								.attr("x", function(d) {return scalex(d[0]);})
	   								.attr("y", function(d) {return scaley(d[1]);})
	   								.attr("font-family", "sans-serif")
	   								.attr("font-size", "11px")
	   								.attr("fill", "red");	
	
	var xAxis = d3.svg.axis()
					.scale(scalex)
					.orient("bottom")
					.ticks(10);
	
	scatter_svg.append("g")
					.attr("class","axis")
					.attr("transform", "translate(0," + (chart_height - padding_top) + ")")
					.call(xAxis);

	var yAxis = d3.svg.axis()
					.scale(scaley)
					.orient("left")
					.ticks(5);
	

	scatter_svg.append("g")
					.attr("class","axis")
					.attr("transform", "translate("+ padding_left+", 0)")
					.call(yAxis);
	
	//Creates new data and it given to charts
	d3.select("#new-data-btn")
			.on("click", function(){
				var dataset = [];                         //Initialize empty array
				for (var i = 0; i < n_values; i++) {            //Loop 25 times
				    var newNumber = Math.round( Math.random() * bar_maxHeight);   //New random number (0-30)
				    dataset.push(newNumber);              //Add new number to array
				}
				svg_bars.selectAll("rect")
							.data(dataset)
								.transition()
									.attr("height", function(d){return d;})
									.attr("y", function(d,i){return chart_height-d})
									.style("fill", function(d) {return "rgb("+d+","+d+","+d+")";});
				
				svg_bars.selectAll("text")
							.data(dataset)
								.transition()
									.text(function (d){return d;})
										.attr("x", function (d, i) {return i*(shape_spacing+shape_width)+shape_spacing+shape_width*0.5;})
										.attr("y", function(d,i){return chart_height-d-2});
				
				svg_circles.selectAll("circle")
								.data(dataset)
									.transition()
										.each("start", function() {      // <-- Executes at start of transition
											//d3.select(this).style("fill", "magenta");
										})
										//.attr("cx", function (d, i) {return i*(shape_spacing+shape_width)+shape_spacing+5;})
										//.attr("cy", chart_height/2)
										.attr("r", function (d) {return Math.round(d/3);})
										.style("fill", function(d) {return "rgb("+d+","+d+","+d+")";})
										.each("end", function() {        // <-- Executes at end of transition
											//d3.select(this).style("fill", "black");
										});
				
										
				
				
				var dataset = [];               
				for (var i = 0; i < n_values; i++) {         			
				    var newPoint = [Math.round(Math.random()*100),
				                    Math.round(Math.random()*10)];
				    dataset.push(newPoint);             				
				}
				
				scatter_svg.selectAll("circle")
								.data(dataset)
									.transition()
										.attr("cx",function (d){return scalex(d[0]);})
										.attr("cy",function (d){return scaley(d[1]);});
							
				scatter_svg.selectAll("text")  // <-- Note "text", not "circle" or "rect"
   								.data(dataset)
   									.transition()
   										.text(function(d) {return d[0] + "," + d[1];})
   											.attr("x", function(d) {return scalex(d[0]);})
   											.attr("y", function(d) {return scaley(d[1]);});
			});
}














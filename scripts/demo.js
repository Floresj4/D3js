var data = [4, 8, 15, 16, 23, 42, 1, 9, 66];

function html_build(){
	var linearScale = d3.scale.linear()
		.domain([0, d3.max(data)])
		.range([0, 660]);

	d3.select(".chart")
		.selectAll("div")
		.data(data)
		.enter().append("div")
		.style("width", function(d) { return linearScale(d) + "px"; })
		.text(function(d) { return d; });
}

function svg_build() {
	var width = 420;
	var barHeight = 20;
	
	var linearScale = d3.scale.linear()
		.range([0, width]);
	
	var chart = d3.select(".chart")
		.attr("width", width);
		
	
	d3.tsv("./scripts/data.tsv", type, function(error, data) {
		linearScale.domain([0, d3.max(data, function(d) {
			return d.value;
		})]);
		
		//set the height before display
		chart.attr("height", barHeight * data.length);
		
		var bar = chart.selectAll("g")
			.data(data)
			.enter().append("g")
			.attr("transform", function(d, i) { 
				return "translate(0, " + i * barHeight + ")"; 
			});

		bar.append("rect")
			.attr("width", function(d) { return linearScale(d.value); })
			.attr("height", barHeight - 1);

		bar.append("text")
			.attr("x", function(d) {
				return linearScale(d.value) - 3;
			})
			.attr("y", barHeight / 2)
			.attr("dy", ".35em")
			.text(function(d) { return d.value; });
	});
}

function type(d) {
	//coerce to number
	d.value = +d.value;
	return d;
}
var data = [4, 8, 15, 16, 23, 42, 1, 9, 66, 42, 0, ];
var margin = {top: 20, right: 30, bottom: 30, left:40};
var width = 960 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

function build_vertical() {
	var yscale = d3.scale.linear()
		.range([height, 0]);
	
	var xscale = d3.scale.ordinal()
		.rangeRoundBands([0, width], .1);
	
	//setup up the axis
	var xAxis = d3.svg.axis()
		.scale(xscale)
		.orient("bottom");
	
	var yAxis = d3.svg.axis()
		.scale(yscale)
		.orient("left")
		.ticks(10, "%");
	
	//select the chart & set
	var chart = d3.select(".chart")
		.attr("width", width + margin.right + margin.left)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.right + ")");

	//load data
	d3.tsv("./scripts/data.tsv", type, function(error, data) {

		xscale.domain(data.map(function(d){ return d.letter; }));
		yscale.domain([0, d3.max(data, function(d) { return d.value; })]);

		var barWidth = width / data.length;

		var bar = chart.selectAll("g")
			.data(data)
			.enter().append("g")
			.attr("transform", function(d, i) {
				return "translate(" + xscale(d.letter) + ", 0)"; 
			});
		
		//add the axis bar
		chart.append("g")
			.attr("class", "axis x-axis")
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis);
		
		chart.append("g")
			.attr("class", "axis y-axis")
			.call(yAxis)
			.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", 6)
			.attr("dy",  ".71em")
			.style("text-anchor", "end")
			.text("Frequency");
		
		bar.append("rect")
			.attr("y", function(d) { return yscale(d.value); })
			.attr("height", function(d) { return height - yscale(d.value); })
			.attr("width", xscale.rangeBand());

		bar.append("text")
			.attr("x", xscale.rangeBand() / 2)
			.attr("y", function(d) { return yscale(d.value) + 3; })
			.attr("dy", ".75em")
			.text(function(d) { return d.value; });
	});
}

function build_horizontal() {
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
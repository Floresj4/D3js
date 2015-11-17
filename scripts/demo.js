var data = [4, 8, 15, 16, 23, 42, 1, 9, 66];

function my_code(){
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
function d3Tooltip() {
  
  function chart(selection) {
    selection.each(function(data) {
      	
      var target = d3.select(this);
      
      target.on('mouseover.tooltip', function(d) {
        d3.select(this).call(create);
      });
      
      target.on('mousemove.tooltip', function(d) {
        // console.log('moving');
        d3.select(this).call(update);
      });
      
      target.on('mouseout.tooltip',  function(d) {
        d3.select(this).call(remove);
      });
      
    });
  }
  
  function create(selection) {
    selection.each(function(d) {
      // console.log(d);
      var body = d3.select('body'),
          tip = body.selectAll('.d3-tooltip').data([d]);

     	tip.enter().append('div')
        .classed('d3-tooltip', true)
        .text(function(d){
          if(d.data){
            return d.data.statusname + " - " + d.data.count;
          } else if(d.remaining){
            return d.remaining + " tasks due";
          } else if(_.isArray(d)){
            return d[3] + " - "+ d[2] +" hrs";
          } else {
            return d.name + " - " +d.number;
          }
        });
      
    });
  }
  
  function update(selection) {
    selection.each(function(d) {
    	var body = d3.select('body'),
          tip = body.selectAll('div.d3-tooltip').data([d]);
      
			var width  = parseInt(tip.style('width'), 10);
			var height = parseInt(tip.style('height'), 10);

      // Compute the tooltip position
      var dx = +d3.event.pageX - width / 2,
          dy = +d3.event.pageY - 1.1 * height;
      
      tip
        .style('left', dx + 'px')
        .style('top',  dy + 'px');
    });
  }
  
  function remove(selection) {
    selection.each(function(d) {
      
      var body = d3.select('body'),
          tip = d3.selectAll('div.d3-tooltip').data([d]);
      
      tip.remove();
      
    });
  }
  
  return chart;
}


// Create the tooltip
 var tip = d3Tooltip();

// var svg = d3.select('svg'),
//     rect = svg.selectAll('rect').data([0, 1, 2]);

// Add the tooltip behaviour to the rectangles
// rect.call(tip); 


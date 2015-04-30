function airwater(name, id, kind) {
  var seriesData = [];
  var latest8 = issairwater.find({type: kind},{sort: {time : -1}, limit: 5});
  var latest8reverse = latest8.fetch().reverse();
  latest8reverse.forEach(function (item) {
    seriesData.push([item.time, Number(item.value)]);
  });

  Highcharts.setOptions({
    global: {
      useUTC: false
    }
  });

  $(id).highcharts({
    chart: {
      type: 'spline',
      events: {
        load: function () {
          // set up the updating of the chart each second
          var series = this.series[0];
          setInterval(function () {
            var last_airwater = series.data[series.data.length - 1];
            var airwater = issairwater.findOne({type: kind},{sort: {time : -1}});
            if ( Number(last_airwater.y) != Number(airwater.value) ) {
              var x = airwater.time; // current time
              var y = Number(airwater.value);
              series.addPoint([x, y], true, true);
            }
          }, 2000);
        }
      }
    },
    title: {
      text: name + ' - Live data'
    },
    xAxis: {
      type: 'datetime',
      tickAmount: 15
    },
    yAxis: {
      title: {
        type: 'logarithmic',
        text: 'Value',
        tickAmount: 15
      },
      plotLines: [{
        value: 0,
        width: 1,
        color: '#808080'
      }]
    },
    series: [{
      name: kind,
      data: seriesData
    }]
  });
}

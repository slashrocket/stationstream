function solarvoltage(name, id, panel) {
  var seriesData = []
  var latest8 = isssolar.find({type: panel},{sort: {time : -1}, limit: 5});
  latest8.forEach(function (item) {
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
            var last_solar = series.data[series.data.length - 1];
            var solar = isssolar.findOne({type: panel},{sort: {time : -1}});
            if ( Number(last_solar.y) != Number(solar.value) ) {
              var x = solar.time; // current time
              var y = Number(solar.value);
              series.addPoint([x, y], true, true);
            }
          }, 5000);
        }
      }
    },
    title: {
      text: 'Voltage of Solar panel ' + name + ' - Live data'
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
      name: panel,
      data: seriesData
    }]
  });
}
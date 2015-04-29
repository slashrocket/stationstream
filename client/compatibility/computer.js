function computer(name, id, kind) {
  var seriesData = [];
  var latest8 = isscomputer.find({type: kind},{sort: {time : -1}, limit: 5});
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
            var last_computer = series.data[series.data.length - 1];
            var computer = isscomputer.findOne({type: kind},{sort: {time : -1}});
            if ( Number(last_computer.y) != Number(computer.value) ) {
              var x = computer.time; // current time
              var y = Number(computer.value);
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

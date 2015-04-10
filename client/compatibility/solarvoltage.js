function solarvoltage() {
  var seriesData = [];
  var time = new Date().getTime()
  seriesData.push(time, 0);

          Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });

        $('#solarvoltagechart').highcharts({
            chart: {
                type: 'spline',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                events: {
                    load: function () {

                        // set up the updating of the chart each second
                        var series = this.series[0];
                        setInterval(function () {
                          var solar = isssolar.findOne({type: '2Avoltage'},{sort: {time : -1}});
                            var x = (new Date()).getTime(), // current time
                                y = Math.floor(solar.value)
                            series.addPoint([x, y], true, true);
                        }, 3000);
                    }
                }
            },
            title: {
                text: 'Voltage of Solar panel 2A - Live data'
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150
            },
            yAxis: {
                title: {
                    text: 'Value'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            series: [{
                name: '2A Voltage',
                data: seriesData
            }]
  });
}
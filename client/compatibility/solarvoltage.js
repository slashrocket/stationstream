function solarvoltage() {
  var seriesData = [];
  var voltage = isssolar.find({type: '2Avoltage'},{sort: {time : -1}, limit: 10});

  voltage.forEach(function(option) {
    var dataPoint = [option.time, option.value];
    seriesData.push(dataPoint);
  });

        $('#solarvoltagechart').highcharts({
            chart: {
                type: 'spline',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10
            },
            title: {
                text: 'Voltage of Solar panel 2A - Live data'
            },
            xAxis: {
                type: 'datetime'
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
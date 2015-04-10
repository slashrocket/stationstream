Meteor.methods({
  SolarDataChart: function() {
    return Highcharts.charts[0];
  },

  UpdateSolarData: function() {
    var solar = isssolar.findOne({type: '2Avoltage'},{sort: {time : -1}});
    var dataPoint = [solar.date, solar.value];

    Meteor.call("SolarDataChart").series[0].setData(dataPoint, true);
  }
});
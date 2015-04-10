Meteor.methods({
  UpdateSolarData: function() {
    var solar = isssolar.findOne({type: '2Avoltage'},{sort: {time : -1}});
    var dataPoint = [[solar.date, solar.value]];
   //$('#solarvoltagechart').series[0].setData(dataPoint);
  }
});
Meteor.subscribe('isslocation');
Meteor.subscribe('issairwater');
Meteor.subscribe('isscomputer');
//Meteor.subscribe('isssolar');

Template.analytics.rendered = function() {
  var chart1A = solarvoltage("1A", "#solarvoltagechart1A", "1Avoltage");
  var chart1B = solarvoltage("1B", "#solarvoltagechart1B", "1Bvoltage");
  var chart2A = solarvoltage("2A", "#solarvoltagechart2A", "2Avoltage");
  var chart2B = solarvoltage("2B", "#solarvoltagechart2B", "2Bvoltage");
  var chart3A = solarvoltage("3A", "#solarvoltagechart3A", "3Avoltage");
  var chart3B = solarvoltage("3B", "#solarvoltagechart3B", "3Bvoltage");
  var chart4A = solarvoltage("4A", "#solarvoltagechart4A", "4Avoltage");
  var chart4B = solarvoltage("4B", "#solarvoltagechart4B", "4Bvoltage");
   //this.autorun(function(){
    // Highcharts.chart[0].series[0].setData(isssolar.findOne({type: '2Avoltage'},{sort: {time : -1}}).fetch());
   //});
}

Template.lightstreamer.helpers({
    isslocations: function() {
        return isslocation.find();
    },
    iss_latest_x_position: function() {
        return isslocation.findOne({type: 'positionx'},{sort: {time : -1}});
    },
    iss_latest_y_position: function() {
        return isslocation.findOne({type: 'positiony'},{sort: {time : -1}});
    },
    iss_latest_z_position: function() {
        return isslocation.findOne({type: 'positionz'},{sort: {time : -1}});
    },
    iss_o2: function() {
        return issairwater.findOne({type: 'o2'},{sort: {time : -1}});
    },
    iss_n2: function() {
        return issairwater.findOne({type: 'n2'},{sort: {time : -1}});
    },
    iss_co2: function() {
        return issairwater.findOne({type: 'co2'},{sort: {time : -1}});
    },
    iss_badh2o: function() {
        return issairwater.findOne({type: 'badh2o'},{sort: {time : -1}});
    },
    iss_goodh2o: function() {
        return issairwater.findOne({type: 'goodh2o'},{sort: {time : -1}});
    },
    iss_cabin_pressure: function() {
        return issairwater.findOne({type: 'cabinpressure'},{sort: {time : -1}});
    },
    iss_cabin_temp: function() {
        return issairwater.findOne({type: 'cabintemp'},{sort: {time : -1}});
    },
    iss_command_count: function() {
        return isscomputer.findOne({type: 'commandcount'},{sort: {time : -1}});
    },
    iss_data_count: function() {
        return isscomputer.findOne({type: 'datacount'},{sort: {time : -1}});
    },
    iss_pc_count: function() {
        return isscomputer.findOne({type: 'pccount'},{sort: {time : -1}});
    },
});

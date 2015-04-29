Meteor.subscribe('isslocation');
Meteor.subscribe('isscomputer');
           //Subscribe to Solar Data
        Meteor.subscribe('1Avoltage_isssolar'),
        Meteor.subscribe('1Bvoltage_isssolar'),
        Meteor.subscribe('2Avoltage_isssolar'),
        Meteor.subscribe('2Bvoltage_isssolar'),
        Meteor.subscribe('3Avoltage_isssolar'),
        Meteor.subscribe('3Bvoltage_isssolar'),
        Meteor.subscribe('4Avoltage_isssolar'),
        Meteor.subscribe('4BAvoltage_isssolar'),
        // Subscribe to Air and Water Data
        Meteor.subscribe('issairwater_o2'),
        Meteor.subscribe('issairwater_n2'),
        Meteor.subscribe('issairwater_co2'),
        Meteor.subscribe('issairwater_badh2o'),
        Meteor.subscribe('issairwater_goodh2o'),
        Meteor.subscribe('issairwater_cabinpressure'),
        Meteor.subscribe('issairwater_cabintemp'),
        // Subscribe to Location Data
        Meteor.subscribe('isslocation_x'),
        Meteor.subscribe('isslocation_y'),
        Meteor.subscribe('isslocation_z')
//Meteor.subscribe('isssolar');
//Meteor.subscribe('issairwater');
//Meteor.subscribe('issairwater_n2');
//Meteor.subscribe('issairwater_co2');
//Meteor.subscribe('issairwater_o2');

Template.cesium.onRendered(function() {
  //var czml = czmlpacket();
  //viewer.dataSources.add(Cesium.CzmlDataSource.load(czml));
});

Template.analytics.onRendered(function () {
        
  var chart1A = solarvoltage("1A", "#solarvoltagechart1A", "1Avoltage");
  var chart1B = solarvoltage("1B", "#solarvoltagechart1B", "1Bvoltage");
  var chart2A = solarvoltage("2A", "#solarvoltagechart2A", "2Avoltage");
  var chart2B = solarvoltage("2B", "#solarvoltagechart2B", "2Bvoltage");
  var chart3A = solarvoltage("3A", "#solarvoltagechart3A", "3Avoltage");
  var chart3B = solarvoltage("3B", "#solarvoltagechart3B", "3Bvoltage");
  var chart4A = solarvoltage("4A", "#solarvoltagechart4A", "4Avoltage");
  var chart4B = solarvoltage("4B", "#solarvoltagechart4B", "4Bvoltage");
  var charto2 = airwater("O2", "#o2", "o2")
  var chartn2 = airwater("N2", "#n2", "n2")
  var chartco2 = airwater("CO2", "#co2", "co2")
  var chartbadh2o = airwater("Waste water", "#badh2o", "badh2o")
  var chartgoodh2o = airwater("Drinkable water", "#goodh2o", "goodh2o")
  var chartpressure = airwater("ISS Cabin pressure", "#cabinpressure", "cabinpressure")
  var charttemp = airwater("ISS Cabin temp", "#cabintemp", "cabintemp")
  var chartcommand = computer("ISS Computer command count", "#commandcount", "commandcount")
  var chartdata = computer("ISS Computer data input count", "#datacount", "datacount")
  var chartpc = computer("ISS PC Connection count", "#pccount", "pccount")
  
   //this.autorun(function(){
    // Highcharts.chart[0].series[0].setData(isssolar.findOne({type: '2Avoltage'},{sort: {time : -1}}).fetch());
   //});
});

Template.sidebar.onRendered(function () {
  // Draw the initial air data chart
  //drawAirChart();
  // Detect backend data changes and instruct Chart.js to rerender the chart
  // Tracker.autorun(function(){
  // 	airChart.update();
  // })
  var o2 = issairwater.findOne({type: 'o2'},{sort: {time: -1}}).value;
  var n2 = issairwater.findOne({type: 'n2'},{sort: {time: -1}}).value;
  var co2 = issairwater.findOne({type: 'co2'},{sort: {time: -1}}).value;
  var goodh2o = issairwater.findOne({type: 'goodh2o'},{sort: {time: -1}}).value;
  var badh2o = issairwater.findOne({type: 'badh2o'},{sort: {time: -1}}).value;
  var airChart = drawAirChart( o2, n2, co2 );
  var waterChart = drawWaterChart( goodh2o, badh2o );
   setInterval(function () {
        airChart.segments[0].value = issairwater.findOne({type: 'o2'},{sort: {time: -1}}).value;
        airChart.segments[1].value = issairwater.findOne({type: 'n2'},{sort: {time: -1}}).value;
        airChart.segments[2].value = issairwater.findOne({type: 'co2'},{sort: {time: -1}}).value;
        airChart.update();
        waterChart.segments[0].value = issairwater.findOne({type: 'goodh2o'},{sort: {time: -1}}).value;
        waterChart.segments[1].value = issairwater.findOne({type: 'badh2o'},{sort: {time: -1}}).value;
        waterChart.update();
    }, 5000);
});

Template.sidebar.onCreated(function () {
  var instance = this;

  instance.autorun(function() {
    instance.subscribe('issairwater');
  });
});

Template.sidebar.helpers({
    o2: function() {
    return issairwater.findOne({type: 'o2'},{sort: {time : -1}});
  },
  n2: function() {
    return issairwater.findOne({type: 'n2'},{sort: {time : -1}});
  },
  co2: function() {
    return issairwater.findOne({type: 'co2'},{sort: {time : -1}});
  },
  goodh2o: function() {
    return issairwater.findOne({type: 'goodh2o'},{sort: {time : -1}});
  },
  badh2o: function() {
    return issairwater.findOne({type: 'badh2o'},{sort: {time : -1}});
  }
});

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

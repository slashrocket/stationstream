// counter starts at 0
Meteor.subscribe('isslocation');
Meteor.subscribe('issairwater');
Meteor.subscribe('isscomputer');
Meteor.subscribe('isssolar');

Template.analytics.rendered = function() {
  solarvoltage();
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

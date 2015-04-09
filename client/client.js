// counter starts at 0
Meteor.subscribe('isslocation');

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
});

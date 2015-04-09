// counter starts at 0
Meteor.subscribe('isslocation');

Session.setDefault('counter', 0);

Template.home.helpers({
  counter: function () {
    return Session.get('counter');
  }
});

Template.home.events({
  'click button': function () {
    // increment the counter when button is clicked
    Session.set('counter', Session.get('counter') + 1);
    //Meteor.call('pushSession');
  }
});

Template.lightstreamer.helpers({
    isslocations: function() {
      return isslocation.find();
    },
    iss_latest_x_possition: function() {
      return isslocation.findOne({type: 'positionx'},{sort: {timestamp : 1}});
    },
    iss_latest_y_possition: function() {
      return isslocation.findOne({type: 'positiony'},{sort: {timestamp : 1}});
    },
    iss_latest_z_possition: function() {
      return isslocation.findOne({type: 'positionz'},{sort: {timestamp : 1}});
    },
});

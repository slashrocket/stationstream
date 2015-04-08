// counter starts at 0
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
      return ISSLocation.find({}, { sort: {time:-1}});
    }
});

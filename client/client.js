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

Meteor.call('pushSession', function(err, data) {
  if (err)
    console.log(err);
  Session.set('q', data);
});

Template.home.greeting = function() {
  return Session.get('q').foo;
};

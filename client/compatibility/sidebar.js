Template.sidebar.onCreated(function () {
  // Use this.subscribe inside onCreated callback
  Meteor.subscribe("issairwater");
  Meteor.subscribe("issairwater_o2");
  Meteor.subscribe("issairwater_n2");
  Meteor.subscribe("issairwater_co2");
});
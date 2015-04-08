if (Meteor.isServer) {
  Meteor.startup(function () {
    Meteor.call("lightstreamerConnect")
  });
}

if (Meteor.isClient) {
  Meteor.subscribe("isslocation");
}
Meteor.startup(function () {
  Meteor.call("lightstreamerConnect")
  Restivus.configure({
    useAuth: true,
    prettyJson: true
  });
  Restivus.addCollection(isslocation, {
    excludedEndpoints: ['put', 'post', 'delete', 'deleteAll']
  });
});
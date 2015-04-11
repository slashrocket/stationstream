Meteor.publish('isslocation', function () {
  return isslocation.find({}, {sort: {time: -1}, limit: 60 });
});
Meteor.publish('issairwater', function () {
  return issairwater.find({}, {sort: {time: -1}, limit: 60});
});
Meteor.publish('isscomputer', function () {
  return isscomputer.find({}, {sort: {time: -1}, limit: 60});
});
Meteor.publish('isssolar', function () {
  return isssolar.find({}, {sort: {time: -1}, limit: 60}); 
});

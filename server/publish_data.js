Meteor.publish('isslocation', function () {
  return isslocation.find({}, {sort: {time: -1}, limit: 15 });
});
Meteor.publish('issairwater', function () {
  return issairwater.find({}, {sort: {time: -1}, limit: 25});
});
Meteor.publish('isscomputer', function () {
  return isscomputer.find({}, {sort: {time: -1}, limit: 20});
});
Meteor.publish('isssolar', function () {
  return isssolar.find({}, {sort: {time: -1}, limit: 25}); 
});
// Solar Voltage publications
Meteor.publish('1Avoltage_isssolar', function () {
  return isssolar.find({type: '1Avoltage'}, {sort: {time: -1}, limit: 10}); 
});
Meteor.publish('1Bvoltage_isssolar', function () {
  return isssolar.find({type: '1Bvoltage'}, {sort: {time: -1}, limit: 10}); 
});
Meteor.publish('2Avoltage_isssolar', function () {
  return isssolar.find({type: '2Avoltage'}, {sort: {time: -1}, limit: 10}); 
});
Meteor.publish('2Bvoltage_isssolar', function () {
  return isssolar.find({type: '2Bvoltage'}, {sort: {time: -1}, limit: 10}); 
});
Meteor.publish('3Avoltage_isssolar', function () {
  return isssolar.find({type: '3Avoltage'}, {sort: {time: -1}, limit: 10}); 
});
Meteor.publish('3Bvoltage_isssolar', function () {
  return isssolar.find({type: '3Bvoltage'}, {sort: {time: -1}, limit: 10}); 
});
Meteor.publish('4Avoltage_isssolar', function () {
  return isssolar.find({type: '4Avoltage'}, {sort: {time: -1}, limit: 10}); 
});
Meteor.publish('4BAvoltage_isssolar', function () {
  return isssolar.find({type: '4Bvoltage'}, {sort: {time: -1}, limit: 10}); 
});
// ISS Location publications
Meteor.publish('isslocation_x', function () {
  return isslocation.find({type: 'positionx'}, {sort: {time: -1}, limit: 10}); 
});
Meteor.publish('isslocation_y', function () {
  return isslocation.find({type: 'positiony'}, {sort: {time: -1}, limit: 10}); 
});
Meteor.publish('isslocation_z', function () {
  return isslocation.find({type: 'positionz'}, {sort: {time: -1}, limit: 10}); 
});
// Air and Water publications
Meteor.publish('issairwater_o2', function () {
  return issairwater.find({type: 'o2'}, {sort: {time: -1}, limit: 10}); 
});
Meteor.publish('issairwater_n2', function () {
  return issairwater.find({type: 'n2'}, {sort: {time: -1}, limit: 10}); 
});
Meteor.publish('issairwater_co2', function () {
  return issairwater.find({type: 'co2'}, {sort: {time: -1}, limit: 10}); 
});
Meteor.publish('issairwater_badh2o', function () {
  return issairwater.find({type: 'badh2o'}, {sort: {time: -1}, limit: 10}); 
});
Meteor.publish('issairwater_goodh2o', function () {
  return issairwater.find({type: 'goodh2o'}, {sort: {time: -1}, limit: 10}); 
});
Meteor.publish('issairwater_cabinpressure', function () {
  return issairwater.find({type: 'cabinpressure'}, {sort: {time: -1}, limit: 10}); 
});
Meteor.publish('issairwater_cabintemp', function () {
  return issairwater.find({type: 'cabintemp'}, {sort: {time: -1}, limit: 10}); 
});
Router.map( function () {
  this.route('home', {
    path: '/',
    template: 'home',
    waitOn: function(){
      return [
        //Subscribe to Solar Data
        Meteor.subscribe('isscomputer'),
      ];
    }
  });
  this.route('about', {
    path: '/about',
    template: 'about'
  });
  this.route('cesium', {
    path: '/cesium',
    template: 'cesium',
    waitOn: function(){
      return [
        //Subscribe to Solar Data
        Meteor.subscribe('isslocation'),
      ];
    }
  });
  this.route('analytics', {
    path: '/analytics',
    template: 'analytics',
    waitOn: function(){
      return [
        //Subscribe to Solar Data
        Meteor.subscribe('1Avoltage_isssolar'),
        Meteor.subscribe('1Bvoltage_isssolar'),
        Meteor.subscribe('2Avoltage_isssolar'),
        Meteor.subscribe('2Bvoltage_isssolar'),
        Meteor.subscribe('3Avoltage_isssolar'),
        Meteor.subscribe('3Bvoltage_isssolar'),
        Meteor.subscribe('4Avoltage_isssolar'),
        Meteor.subscribe('4BAvoltage_isssolar'),
        // Subscribe to Air and Water Data
        Meteor.subscribe('issairwater_o2'),
        Meteor.subscribe('issairwater_n2'),
        Meteor.subscribe('issairwater_co2'),
        Meteor.subscribe('issairwater_badh2o'),
        Meteor.subscribe('issairwater_goodh2o'),
        Meteor.subscribe('issairwater_cabinpressure'),
        Meteor.subscribe('issairwater_cabintemp'),
        // Subscribe to Location Data
        Meteor.subscribe('isslocation_x'),
        Meteor.subscribe('isslocation_y'),
        Meteor.subscribe('isslocation_z')
      ];
    }
  });
  this.route('lightstreamer', {
    path: '/lightstreamer',
    template: 'lightstreamer'
  });
  this.route('api', {
    path: '/api',
    template: 'api'
  });
});
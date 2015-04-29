

Router.map( function () {
  this.route('home', {
    path: '/',
    template: 'home',
  });
  this.route('about', {
    path: '/about',
    template: 'about'
  });
  this.route('cesium', {
    path: '/cesium',
    template: 'cesium'
  });
  this.route('analytics', {
    path: '/analytics',
    template: 'analytics'
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
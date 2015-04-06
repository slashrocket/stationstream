if (Meteor.isClient) {
}

if (Meteor.isServer) {
  Meteor.methods({
    /**************** Methods to interact with nasa push lightstream server *************/
    pushSession: function () {
      this.unblock();
      var params = {'LS_adapter_set': 'PROXYTELEMETRY', 'LS_client_version':  '5.0', 'LS_domain': 'nasa.gov'};
      HTTP.call("POST", "http://push1.jsc.nasa.gov:80/lightstreamer/create_session.txt", params, function(result){
        console.log(result.content);
      });
    },
    sessionData: function () {
      this.unblock();
      HTTP.call("POST", "http://push1.jsc.nasa.gov:80/lightstreamer/control.txt", function(result){console.log(result.content);
      });
    }
  });
  Meteor.call("pushSession", function(results) {
    console.log(results);
  });
  Meteor.call("sessionData", function(results) {
    console.log(results);
  });
  /****************** End nasa push methods *******************/
}

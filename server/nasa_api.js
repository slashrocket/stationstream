/** Methods to interact with nasa push lightstream server **/
Meteor.methods({
  /* Open a session stream with nasa's server */
  lightstreamerConnect: function() {
    var lightstreamer = Meteor.npmRequire('lightstreamer-client');
    var lsClient = new lightstreamer.LightstreamerClient("http://push.lightstreamer.com","ISSLIVE");  
    lsClient.connect();
    var testSubscription = new lightstreamer.Subscription("MERGE",["USLAB000025"],["USLAB000025"]);
    testSubscription.setDataAdapter("PROXYTELEMETRY");
    testSubscription.setRequestedSnapshot("yes");
    lsClient.addListener({
      onStatusChange: function(newStatus) {         
        console.log(newStatus);
      }
    });
    testSubscription.addListener({
      onSubscription: function() {
        console.log("SUBSCRIBED");
      },
      onUnsubscription: function() {
        console.log("UNSUBSCRIBED");
      },
      onItemUpdate: function(obj) {
        console.log(obj.getValue("USLAB000025") + ": " + obj.getValue("USLAB000025"));
      }
    });
    lsClient.subscribe(testSubscription);
  }
});
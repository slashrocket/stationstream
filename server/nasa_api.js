Meteor.publish('isslocation', function () {
  return isslocation.find();
});

/** Methods to interact with NASA push Lightstream server **/
Meteor.methods({
  /* Open a session stream with nasa's server */
  lightstreamerConnect: function() {
    var lightstreamer = Meteor.npmRequire('lightstreamer-client');
    var lsClient = new lightstreamer.LightstreamerClient("http://push.lightstreamer.com","ISSLIVE");  
    lsClient.connect();
    var stationTelemetry = new lightstreamer.Subscription("MERGE",["USLAB000032","USLAB000033","USLAB000034"], ["Value"]);
    lsClient.addListener({
      onStatusChange: function(newStatus) {
        console.log(newStatus);
      }
    });
    lsClient.subscribe(stationTelemetry);
    stationTelemetry.addListener({
      onSubscription: function() {
        console.log("SUBSCRIBED");
      },
      onUnsubscription: function() {
        console.log("UNSUBSCRIBED");
      },
      onItemUpdate: Meteor.bindEnvironment(function(update) {
        switch (update.getItemName()){
          case "USLAB000032":
            var value = update.getValue("Value")
            console.log("X: " + value);
            isslocation.insert({type: 'positionx', position: value, time: Date.now()});
            break;
          case "USLAB000033":
            var value = update.getValue("Value")
            console.log("Y: " + value);
            isslocation.insert({type: 'positiony', position: value, time: Date.now()});
            break;
          case "USLAB000034":
            var value = update.getValue("Value")
            console.log("Z: " + value);
            isslocation.insert({type: 'positionz', position: value, time: Date.now()});
            break;
        } 
      })
    });
  },
});
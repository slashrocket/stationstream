Meteor.publish('isslocation', function () {
  return isslocation.find();
});

/** Methods to interact with nasa push lightstream server **/
Meteor.methods({
  /* Open a session stream with nasa's server */
  lightstreamerConnect: function() {
    var lightstreamer = Meteor.npmRequire('lightstreamer-client');
    var lsClient = new lightstreamer.LightstreamerClient("http://push.lightstreamer.com","ISSLIVE");  
    lsClient.connect();
    var stationTelemetryx = new lightstreamer.Subscription("MERGE",["USLAB000032"], ["Value"]);
    var stationTelemetryy = new lightstreamer.Subscription("MERGE",["USLAB000033"], ["Value"]);
    var stationTelemetryz = new lightstreamer.Subscription("MERGE",["USLAB000034"], ["Value"]);
    lsClient.addListener({
      onStatusChange: function(newStatus) {
        console.log(newStatus);
      }
    });
    lsClient.subscribe(stationTelemetryx);
    lsClient.subscribe(stationTelemetryy);
    lsClient.subscribe(stationTelemetryz);
    stationTelemetryx.addListener({
      onSubscription: function() {
        console.log("SUBSCRIBED");
      },
      onUnsubscription: function() {
        console.log("UNSUBSCRIBED");
      },
		  onItemUpdate: Meteor.bindEnvironment(function(update) {
        var value = update.getValue("Value");
        console.log(value)
        isslocation.insert({type: 'positionx', position: value, time: Date.now()});
		  	//$("#"+update.getItemName()).text(update.getValue("Value")); <-- was used to inject results into divs
		  })
    });
    stationTelemetryy.addListener({
      onSubscription: function() {
        console.log("SUBSCRIBED");
      },
      onUnsubscription: function() {
        console.log("UNSUBSCRIBED");
      },
		  onItemUpdate: Meteor.bindEnvironment(function(update) {
        var value = update.getValue("Value");
        isslocation.insert({type: 'positiony', position: value, time: Date.now()});
		  	//$("#"+update.getItemName()).text(update.getValue("Value")); <-- was used to inject results into divs
		  })
    });
    stationTelemetryz.addListener({
      onSubscription: function() {
        console.log("SUBSCRIBED");
      },
      onUnsubscription: function() {
        console.log("UNSUBSCRIBED");
      },
		  onItemUpdate: Meteor.bindEnvironment(function(update) {
        var value = update.getValue("Value");
        isslocation.insert({type: 'positionz', position: value, time: Date.now()});
		  	//$("#"+update.getItemName()).text(update.getValue("Value")); <-- was used to inject results into divs
		  })
    });
  },
  
});
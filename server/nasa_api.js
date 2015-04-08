/** Methods to interact with nasa push lightstream server **/
Meteor.methods({
  /* Open a session stream with nasa's server */
  lightstreamerConnect: function() {
    var lightstreamer = Meteor.npmRequire('lightstreamer-client');
    var lsClient = new lightstreamer.LightstreamerClient("http://push.lightstreamer.com","ISSLIVE");  
    lsClient.connect();
    var stationTelemetry = new lightstreamer.Subscription("MERGE",["USLAB000032","USLAB000035","USLAB000033","USLAB000036","USLAB000034","USLAB000037"],["Value"]);
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
		  onItemUpdate: function(update) {
		    console.log(update.getValue("Value"));
		  	//$("#"+update.getItemName()).text(update.getValue("Value")); <-- was used to inject results into divs
		  }
    });
  }
});
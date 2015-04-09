Meteor.publish('isslocation', function () {
  return isslocation.find();
});
Meteor.publish('issairwater', function () {
  return issairwater.find();
});

/** Methods to interact with NASA push Lightstream server **/
Meteor.methods({
  /* Open a session stream with nasa's server */
  lightstreamerConnect: function() {
    var lightstreamer = Meteor.npmRequire('lightstreamer-client');
    var lsClient = new lightstreamer.LightstreamerClient("http://push.lightstreamer.com","ISSLIVE");  
    lsClient.connect();
    /* USLAB000032 = X axis
       USLAB000033 = Y axis
       USLAB000034 = Z axis */
    var stationTelemetry = new lightstreamer.Subscription("MERGE",["USLAB000032","USLAB000033","USLAB000034"], ["Value"]);
    /* NODE3000001 = Oxygen level
       NODE3000002 = Nitrogen level
       NODE3000003 = CO2 level
       NODE3000008 = Waste water amount
       NODE3000009 = Clean water amount
       USLAB000058 = Cabin air pressure
       USLAB000059 = Cabin air temp */
    var stationAirWater = new lightstreamer.Subscription("MERGE",["NODE3000001","NODE3000002","NODE3000003", "NODE3000008", "NODE3000009", "USLAB000058", "USLAB000059"], ["Value"]);
    lsClient.addListener({
      onStatusChange: function(newStatus) {
        console.log(newStatus);
      }
    });
    lsClient.subscribe(stationTelemetry);
    stationTelemetry.addListener({
      onSubscription: function() {
        console.log("SUBSCRIBED to TELEMETRY");
      },
      onUnsubscription: function() {
        console.log("UNSUBSCRIBED from TELEMETRY");
      },
      onItemUpdate: Meteor.bindEnvironment(function(update) {
        switch (update.getItemName()){
          case "USLAB000032":
            var valuex = update.getValue("Value")
            //console.log("X: " + value);
            isslocation.insert({type: 'positionx', position: valuex, time: Date.now()});
            break;
          case "USLAB000033":
            var valuey = update.getValue("Value")
            //console.log("Y: " + value);
            isslocation.insert({type: 'positiony', position: valuey, time: Date.now()});
            break;
          case "USLAB000034":
            var valuez = update.getValue("Value")
            //console.log("Z: " + value);
            isslocation.insert({type: 'positionz', position: valuez, time: Date.now()});
            break;
        } 
      })
    });
    lsClient.subscribe(stationAirWater);
    stationAirWater.addListener({
      onSubscription: function() {
        console.log("SUBSCRIBED to Air/Water");
      },
      onUnsubscription: function() {
        console.log("UNSUBSCRIBED from Air/Water");
      },
      onItemUpdate: Meteor.bindEnvironment(function(update) {
        switch (update.getItemName()){
          case "NODE3000001":
            var valuea = update.getValue("Value")
            issairwater.insert({type: 'o2', value: valuea, time: Date.now()});
            break;
          case "NODE3000002":
            var valueb = update.getValue("Value")
            issairwater.insert({type: 'n2', value: valueb, time: Date.now()});
            break;
          case "NODE3000003":
            var valuec = update.getValue("Value")
            issairwater.insert({type: 'co2', value: valuec, time: Date.now()});
            break;
          case "NODE3000008":
            var valued = update.getValue("Value")
            issairwater.insert({type: 'badh2o', value: valued, time: Date.now()});
            break;
          case "NODE3000009":
            var valuee = update.getValue("Value")
            issairwater.insert({type: 'goodh2o', value: valuee, time: Date.now()});
            break;
          case "USLAB000058":
            var valuef = update.getValue("Value")
            issairwater.insert({type: 'cabinpressure', value: valuef, time: Date.now()});
            break;
          case "USLAB000059":
            var valueg = update.getValue("Value")
            issairwater.insert({type: 'cabintemp', value: valueg, time: Date.now()});
            break;
        } 
      })
    });
  },
});
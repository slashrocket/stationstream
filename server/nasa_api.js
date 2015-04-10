Meteor.publish('isslocation', function () {
  return isslocation.find();
});
Meteor.publish('issairwater', function () {
  return issairwater.find();
});
Meteor.publish('isscomputer', function () {
  return isscomputer.find();
});
Meteor.publish('isssolar', function () {
  return isssolar.find();
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
    /* USLAB000082 = Computer command received count
       USLAB000083 = Data loading command count
       USLAB000087 = Crew PC connection count */
    var stationComputer = new lightstreamer.Subscription("MERGE",["USLAB000082","USLAB000083","USLAB000087"], ["Value"]);
    /* P4000001 = Solar array 2A voltage
       P4000004 = Solar array 4A voltage
       P4000007 = Solar array 2A rotation degrees
       P4000008 = Solar array 4A rotation degrees
       P6000001 = Solar array 4B voltage
       P6000004 = Solar array 2B voltage
       P6000007 = Solar array 4B rotation degrees
       P6000008 = Solar array 2B rotation degrees
       S0000003 = SARJ Starboard joint angle
       S0000004 = SARJ Port joint angle
       S4000001 = Solar array 1A voltage
       S4000004 = Solar array 3A voltage
       S4000007 = Solar array 1A rotation degrees
       S4000008 = Solar array 3A rotation degrees
       S6000001 = Solar array 3B voltage
       S6000004 = Solar array 1B voltage
       S6000007 = Solar array 3B rotation degrees
       S6000008 = Solar array 1B rotation degrees*/
    var stationSolar = new lightstreamer.Subscription("MERGE",["P4000001","P4000004","P4000007","P4000008","P6000001","P6000004","P6000007","P6000008","S0000003","S0000004","S4000001","S4000004","S4000007","S4000008","S6000001","S6000004","S6000007","S6000008"], ["Value"]);
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
    lsClient.subscribe(stationComputer);
    stationComputer.addListener({
      onSubscription: function() {
        console.log("SUBSCRIBED to Computer");
      },
      onUnsubscription: function() {
        console.log("UNSUBSCRIBED from Computer");
      },
      onItemUpdate: Meteor.bindEnvironment(function(update) {
        switch (update.getItemName()){
          case "USLAB000082":
            var valuea = update.getValue("Value")
            //console.log("X: " + value);
            isscomputer.insert({type: 'commandcount', value: valuea, time: Date.now()});
            break;
          case "USLAB000083":
            var valueb = update.getValue("Value")
            //console.log("Y: " + value);
            isscomputer.insert({type: 'datacount', value: valueb, time: Date.now()});
            break;
          case "USLAB000087":
            var valuec = update.getValue("Value")
            //console.log("Z: " + value);
            isscomputer.insert({type: 'pccount', value: valuec, time: Date.now()});
            break;
        } 
      })
    });
    lsClient.subscribe(stationSolar);
    stationSolar.addListener({
      onSubscription: function() {
        console.log("SUBSCRIBED to Solar");
      },
      onUnsubscription: function() {
        console.log("UNSUBSCRIBED from Solar");
      },
      onItemUpdate: Meteor.bindEnvironment(function(update) {
        switch (update.getItemName()){
          case "P4000001":
            var valuea = update.getValue("Value")
            //console.log("X: " + value);
            isssolar.insert({type: '2Avoltage', value: valuea, time: Date.now()});
            break;
          case "P4000004":
            var valueb = update.getValue("Value")
            //console.log("Y: " + value);
            isssolar.insert({type: '4Avoltage', value: valueb, time: Date.now()});
            break;
          case "P4000007":
            var valuec = update.getValue("Value")
            //console.log("Z: " + value);
            isssolar.insert({type: '2Arotate', value: valuec, time: Date.now()});
            break;
          case "P4000008":
            var valued = update.getValue("Value")
            //console.log("Z: " + value);
            isssolar.insert({type: '4Arotate', value: valued, time: Date.now()});
            break;
          case "P6000001":
            var valuee = update.getValue("Value")
            //console.log("Z: " + value);
            isssolar.insert({type: '4Bvoltage', value: valuee, time: Date.now()});
            break;
          case "P6000004":
            var valuef = update.getValue("Value")
            //console.log("Z: " + value);
            isssolar.insert({type: '2Bvoltage', value: valuef, time: Date.now()});
            break;
          case "P6000007":
            var valueg = update.getValue("Value")
            //console.log("Z: " + value);
            isssolar.insert({type: '4Brotate', value: valueg, time: Date.now()});
            break;
          case "P6000008":
            var valueh = update.getValue("Value")
            //console.log("Z: " + value);
            isssolar.insert({type: '2Brotate', value: valueh, time: Date.now()});
            break;
          case "S0000003":
            var valuei = update.getValue("Value")
            //console.log("Z: " + value);
            isssolar.insert({type: 'SARJStarRotate', value: valuei, time: Date.now()});
            break;
          case "S0000004":
            var valuej = update.getValue("Value")
            //console.log("Z: " + value);
            isssolar.insert({type: 'SARJPortRotate', value: valuej, time: Date.now()});
            break;
          case "S4000001":
            var valuek = update.getValue("Value")
            //console.log("Z: " + value);
            isssolar.insert({type: '1Avoltage', value: valuek, time: Date.now()});
            break;
          case "S4000004":
            var valuel = update.getValue("Value")
            //console.log("Z: " + value);
            isssolar.insert({type: '3Avoltage', value: valuel, time: Date.now()});
            break;
          case "S4000007":
            var valuem = update.getValue("Value")
            //console.log("Z: " + value);
            isssolar.insert({type: '1Arotate', value: valuem, time: Date.now()});
            break;
          case "S4000008":
            var valuen = update.getValue("Value")
            //console.log("Z: " + value);
            isssolar.insert({type: '3Arotate', value: valuen, time: Date.now()});
            break;
          case "S6000001":
            var valueo = update.getValue("Value")
            //console.log("Z: " + value);
            isssolar.insert({type: '3Bvoltage', value: valueo, time: Date.now()});
            break;
          case "S6000004":
            var valuep = update.getValue("Value")
            //console.log("Z: " + value);
            isssolar.insert({type: '1Bvoltage', value: valuep, time: Date.now()});
            break;
          case "S6000007":
            var valueq = update.getValue("Value")
            //console.log("Z: " + value);
            isssolar.insert({type: '3Brotate', value: valueq, time: Date.now()});
            break;
          case "S6000008":
            var valuer = update.getValue("Value")
            //console.log("Z: " + value);
            isssolar.insert({type: '1Brotate', value: valuer, time: Date.now()});
            break;
        } 
      })
    });
  },
});
Meteor.startup(function () {
  Meteor.call("lightstreamerConnect")
  Restivus.configure({
    useAuth: false,
    prettyJson: true
  });
  Restivus.addRoute('isslocation/latest', {authRequired: false}, {
    get: function(){
      var positionx = isslocation.findOne({type: 'positionx'},{sort: {time : -1}});
      var positiony = isslocation.findOne({type: 'positiony'},{sort: {time : -1}});
      var positionz = isslocation.findOne({type: 'positionz'},{sort: {time : -1}});
      var telemetry = {
        positionx: positionx.position,
        positiony: positiony.position,
        positionz: positionz.position
      };
      if (positionx && positiony && positionz){
        return {status: 'success', data: telemetry};
      }else{
        return {statusCode: 404, body: {status: 'fail', message: 'Record not found.'}}
      };
    }
  });
  Restivus.addRoute('cesium/latest', {authRequired: false}, {
    get: function(){
      var positionx = isslocation.findOne({type: 'positionx'},{sort: {time : -1}});
      var positiony = isslocation.findOne({type: 'positiony'},{sort: {time : -1}});
      var positionz = isslocation.findOne({type: 'positionz'},{sort: {time : -1}});
      var czml = [{
        id: "document",
        name: "simple",
        version: "1.0"
        },
        {
        id: "ISS",
        name: "ISS",
        billboard: {
          eyeOffset: {
            cartesian:[0,0,0]
          },
          "horizontalOrigin":"CENTER",
          "image":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADJSURBVDhPnZHRDcMgEEMZjVEYpaNklIzSEfLfD4qNnXAJSFWfhO7w2Zc0Tf9QG2rXrEzSUeZLOGm47WoH95x3Hl3jEgilvDgsOQUTqsNl68ezEwn1vae6lceSEEYvvWNT/Rxc4CXQNGadho1NXoJ+9iaqc2xi2xbt23PJCDIB6TQjOC6Bho/sDy3fBQT8PrVhibU7yBFcEPaRxOoeTwbwByCOYf9VGp1BYI1BA+EeHhmfzKbBoJEQwn1yzUZtyspIQUha85MpkNIXB7GizqDEECsAAAAASUVORK5CYII=",
          pixelOffset: {
            "cartesian2":[0,0]
          },
          scale: 1.5,
          show: true,
          verticalOrigin: "CENTER"
        },
        position: {
          cartesian: [Number(positionx.position) , Number(positiony.position) , Number(positionz.position)]
        }
      }];
      if (positionx && positiony && positionz){
        return czml;
      }else{
        return {statusCode: 404, body: {status: 'fail', message: 'Record not found.'}}
      };
    }
  });
  Restivus.addRoute('issairwater/latest', {authRequired: false}, {
    get: function(){
      var o2 = issairwater.findOne({type: 'o2'}, {sort: {time: -1}});
      var n2 = issairwater.findOne({type: 'n2'}, {sort: {time: -1}});
      var co2 = issairwater.findOne({type: 'co2'}, {sort: {time: -1}});
      var badh2o = issairwater.findOne({type: 'badh2o'}, {sort: {time: -1}});
      var goodh2o = issairwater.findOne({type: 'goodh2o'}, {sort: {time: -1}});
      var cabinpressure = issairwater.findOne({type: 'cabinpressure'}, {sort: {time: -1}});
      var cabintemp = issairwater.findOne({type: 'cabintemp'}, {sort: {time: -1}});
      var air = {
        o2: o2.value,
        n2: n2.value,
        co2: co2.value
      }
      var h2o = {
        bad: badh2o.value,
        good: goodh2o.value
      }
      var cabin = {
        pressure: cabinpressure.value,
        temp: cabintemp.value
      }
      var airwater = {
        air: air,
        h2o: h2o,
        cabin: cabin
      }
      if (o2 && n2 && co2 && badh2o && goodh2o && cabinpressure && cabintemp){
        return {status:'success', data: airwater};
      }else{
        return {statusCode: 404, body: {status: 'fail', message: 'Record not found'}}
      };
    }
  });
  Restivus.addRoute('isscomputer/latest', {authRequired: false}, {
    get: function(){
      var commandcount = isscomputer.findOne({type: 'commandcount'},{sort: {time : -1}});
      var datacount = isscomputer.findOne({type: 'datacount'},{sort: {time : -1}});
      var pccount = isscomputer.findOne({type: 'pccount'},{sort: {time : -1}});
      
      var computerdata = {
        commandcount: commandcount.value,
        datacount: datacount.value,
        pccount: pccount.value
      }
      if (commandcount && datacount && pccount){
        return {status: 'success', data: computerdata};
      }else{
        return {statusCode: 404, body: {status: 'fail', message: 'Record not found'}};
      };
    }
  });
  Restivus.addRoute('isssolar/latest', {authRequired: false}, {
    get: function(){
      // SAR Data
      var SARJStarRotate = isssolar.findOne({type: 'SARJStarRotate'},{sort: {time : -1}});
      var SARJPortRotate = isssolar.findOne({type: 'SARJPortRotate'},{sort: {time : -1}});
      // 1A Data
      var voltage1A = isssolar.findOne({type: '1Avoltage'},{sort: {time : -1}});
      var rotate1A = isssolar.findOne({type: '1Arotate'},{sort: {time : -1}});
      var Data_1A = {
        voltage: voltage1A.value,
        rotate: rotate1A.value
      };
      // 1B Data
      var voltage1B = isssolar.findOne({type: '1Bvoltage'},{sort: {time : -1}});
      var rotate1B = isssolar.findOne({type: '1Brotate'},{sort: {time : -1}});
      var Data_1B = {
        voltage: voltage1B.value,
        rotate: rotate1B.value
      };
      // 2A Data
      var voltage2A = isssolar.findOne({type: '2Avoltage'},{sort: {time : -1}});
      var rotate2A = isssolar.findOne({type: '2Arotate'},{sort: {time : -1}});
      var Data_2A = {
        voltage: voltage2A.value,
        rotate: rotate2A.value
      };
      // 2B Data
      var voltage2A = isssolar.findOne({type: '2Bvoltage'},{sort: {time : -1}});
      var rotate2B = isssolar.findOne({type: '2Brotate'},{sort: {time : -1}});
      var Data_2B = {
        voltage: voltage2A.value,
        rotate: rotate2B.value
      };
      // 3A Data
      var voltage3A = isssolar.findOne({type: '3Avoltage'},{sort: {time : -1}});
      var rotate3A = isssolar.findOne({type: '3Arotate'},{sort: {time : -1}});
      var Data_3A = {
        voltage: voltage3A.value,
        rotate: rotate3A.value
      };
      // 3B Data
      var voltage3B = isssolar.findOne({type: '3Bvoltage'},{sort: {time : -1}});
      var rotate3B = isssolar.findOne({type: '3Brotate'},{sort: {time : -1}});
      var Data_3B = {
        voltage: voltage3B.value,
        rotate: rotate3B.value
      };
      // 4A Data
      var voltage4A = isssolar.findOne({type: '4Avoltage'},{sort: {time : -1}});
      var rotate4A = isssolar.findOne({type: '4Arotate'},{sort: {time : -1}});
      var Data_4A = {
        voltage: voltage4A.value,
        rotate: rotate4A.value
      };
      // 4B Data
      var voltage4B = isssolar.findOne({type: '4Bvoltage'},{sort: {time : -1}});
      var rotate4B = isssolar.findOne({type: '4Brotate'},{sort: {time : -1}});
      var Data_4B = {
        voltage: voltage4B.value,
        rotate: rotate4B.value
      };
      var solardata = {
        SARJStarRotate: SARJPortRotate.value,
        SARJPortRotate: SARJPortRotate.value,
        Data_1A: Data_1A,
        Data_1B: Data_1B,
        Data_2A: Data_2A,
        Data_2B: Data_2B,
        Data_3A: Data_3A,
        Data_3B: Data_3B,
        Data_4A: Data_4A,
        Data_4B: Data_4B,
      };
      if (SARJStarRotate && SARJPortRotate){
        return {status: 'success', data: solardata};
      }else{
        return {statusCode: 404, body: {status: 'fail', message: 'Record not found.'}}
      };
    }
  });
});
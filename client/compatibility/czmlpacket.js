function czmlpacket() {
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
          referenceFrame: "INERTIAL",
          cartesian: [Number(positionx.position) , Number(positiony.position) , Number(positionz.position)],
          interpolationAlgorithm: "LAGRANGE",
        interpolationDegree: 5
        }
      }];
  return czml;
}

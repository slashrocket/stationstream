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
});
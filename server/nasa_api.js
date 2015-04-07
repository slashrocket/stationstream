/** Methods to interact with nasa push lightstream server **/
Meteor.methods({
  /* Obtain the session token */
  pushSession : function() {
    //this.unblock();
    var url = "http://push1.jsc.nasa.gov/lightstreamer/create_session.txt";
    var params = { params: 
                    { 'LS_adapter_set': 'PROXYTELEMETRY',
                      'LS_client_version': '5.0',
                      'LS_domain': 'nasa.gov' }};
    var headers = {"Content-type": "application/x-www-form-urlencoded","Accept": "text/plain"}
    HTTP.call("POST", url, params, headers, function(error, result){
      if (error){
        console.log(error);
        //throw new Meteor.Error("season-error","There was an error obtaining the season token")
      }else{
        console.log(result);
      }
    });
    // console.log(result.content);
    // console.log(result.statusCode);
    // console.log(result.data);
  },
  /* Pull down data using aforementioned token */
  sessionData : function() {
    //this.unblock();
    var url = "http://push1.jsc.nasa.gov:80/lightstreamer/control.txt";
    HTTP.call("POST", url, function(error, result){
      if (error){
        console.log(error);
        //throw new Meteor.Error("seasondata-error","There was an error obtaining the season data")
      }else{
        console.log(result.content);
      }
    });
  }
});
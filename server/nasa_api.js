/** Methods to interact with nasa push lightstream server **/
Meteor.NASA_API = {

  /* Obtain the session token */
  pushSession : function() {
    //this.unblock();
    var url = "http://push1.jsc.nasa.gov/lightstreamer/create_session.txt";
    var params = { params: 
                    { 'LS_adapter_set': 'PROXYTELEMETRY',
                      'LS_client_version': '5.0',
                      'LS_domain': 'nasa.gov' }};

    /*HTTP.post(url, params, function(result){
      console.log(result.content);
      console.log(result.statusCode);
      console.log(result.data);
    });*/
    
    var result = HTTP.post(url, params);
    console.log(result.content);
    console.log(result.statusCode);
    console.log(result.data);
  },

  /* Pull down data using aforementioned token */
  sessionData : function() {
    //this.unblock();
    HTTP.call("POST", "http://push1.jsc.nasa.gov:80/lightstreamer/control.txt", function(result){
      console.log(result.content);
    });
  }

};
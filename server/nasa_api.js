/** Methods to interact with nasa push lightstream server **/
Meteor.methods({
  /* Open a session stream with nasa's server */
  pushSession : function() {
    this.unblock();
    return HTTP.call("http://push1.jsc.nasa.gov/lightstreamer/create_session.js?LS_domain=nasa.gov&LS_client_version=5.0&LS_adapter_set=PROXYTELEMETRY");
  },
  /* modify what data we get back */
  sessionData : function() {
    //this.unblock();
    var url = "http://push1.jsc.nasa.gov/lightstreamer/control.txt?LS_session=Sfa9420df22498cb5T0716411&LS_id=ISPWebItem&LS_schema=utc%20utcyear&LS_mode=RAW&LS_op=add&LS_table=1";
    HTTP.call("GET", url, function(error, result){
      if (error){
        console.log(error);
        //throw new Meteor.Error("seasondata-error","There was an error obtaining the season data")
      }else{
        console.log(result.content);
      }
    });
  }
});
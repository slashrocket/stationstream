/** Methods to interact with nasa push lightstream server **/
Meteor.methods({
  /* Open a session stream with nasa's server */
  pushSession : function() {
    this.unblock();
    // we need to use "future" because our calls are async and the client
    // needs to wait to set values until after they come back from the server
    Future = Npm.require('fibers/future');
    var fut = new Future();
    HTTP.post('http://push1.jsc.nasa.gov/lightstreamer/create_session.js?LS_domain=nasa.gov&LS_client_version=5.0&LS_adapter_set=PROXYTELEMETRY', function(err,res)
                    {
      fut.return(res.content);
    });
  },
  /* modify what data we get back */
  sessionData : function() {
   this.unblock();
   return Meteor.http.call("GET", "http://push1.jsc.nasa.gov/lightstreamer/control.txt?LS_session=Sfa9420df22498cb5T0716411&LS_id=ISPWebItem&LS_schema=utc%20utcyear&LS_mode=RAW&LS_op=add&LS_table=1");
  }
});
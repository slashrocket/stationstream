/** Methods to interact with nasa push lightstream server **/
Meteor.methods({
  /* Open a session stream with nasa's server */
  pushSession : function() {
    this.unblock();
    return Meteor.http.call("GET", "http://push1.jsc.nasa.gov/lightstreamer/create_session.js?LS_domain=nasa.gov&LS_client_version=5.0&LS_adapter_set=PROXYTELEMETRY");
  },
  /* modify what data we get back */
  sessionData : function() {
   this.unblock();
   return Meteor.http.call("GET", "http://push1.jsc.nasa.gov/lightstreamer/control.txt?LS_session=Sfa9420df22498cb5T0716411&LS_id=ISPWebItem&LS_schema=utc%20utcyear&LS_mode=RAW&LS_op=add&LS_table=1");
  }
});
isslocation.deny({
  insert: function(userId, doc) {
      //Set expiry to 24 hours from now
      doc.expires = new Date( new Date().getTime() + (36000000*24) );
  }
});
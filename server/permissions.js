isslocation.deny({
  insert: function(userId, doc) {
      //Set expiry to 24 hours from now
      doc.expires = new Date( new Date().getTime() + (36000000*24) );
  }
});
isssolar.deny({
  insert: function(userId, doc) {
      //Set expiry to 6 hours from now
      doc.expires = new Date( new Date().getTime() + (36000000*6) );
  }
});
issairwater.deny({
  insert: function(userId, doc) {
      //Set expiry to 7 days from now
      doc.expires = new Date( new Date().getTime() + (36000000*24*7) );
  }
});
isscomputer.deny({
  insert: function(userId, doc) {
      //Set expiry to 30 days from now
      doc.expires = new Date( new Date().getTime() + (36000000*24*30) );
  }
});
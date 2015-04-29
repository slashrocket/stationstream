//Run every minute
Meteor.setInterval(function() {
    var rightnow = new Date();
    isslocation.remove({expires: { $lte: new Date() }});
    isssolar.remove({expires: { $lte: new Date() }});
    issairwater.remove({expires: { $lte: new Date() }});
    isscomputer.remove({expires: { $lte: new Date() }});
}, 60000);
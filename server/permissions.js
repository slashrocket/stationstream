//Run every minute
Meteor.setInterval(function() {
    isslocation.remove({expires: { $gte: new Date() }});
    isssolar.remove({expires: { $gte: new Date() }});
    issairwater.remove({expires: { $gte: new Date() }});
    isscomputer.remove({expires: { $gte: new Date() }});
    console.log("Clearing stale database entries");
}, 60000);
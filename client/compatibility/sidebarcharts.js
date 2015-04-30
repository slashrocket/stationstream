function drawAirChart(o2, n2, co2){
    var data = [
        {
            value: o2,
            //value: 1,
            //value: issairwater.findOne({type: 'o2'},{sort: {time: -1}}),
            color: "#008AE6",
            highlight: "#0099FF",
            label: "Oxygen"
        },
        {
            value: n2,
            //value: 3,
            //value: issairwater.findOne({type: 'n2'},{sort: {time: -1}}),
            color: "#00CCCC",
            highlight: "#00E6E6",
            label: "Nitrogen"
        },
        {
            value: co2,
            //value: 5,
            //value: issairwater.findOne({type: 'co2'},{sort: {time: -1}}),
            color: "#E6000",
            highlight: "#FF3333",
            label: "Carbon Dioxide"
        }
    ];

    var ctx = $("#air-chart").get(0).getContext("2d");
    var airChart = new Chart(ctx).Doughnut(data);
    return airChart
}

function drawWaterChart(goodh2o, badh2o){
    var data = [
        {
            value: goodh2o,
            //value: 1,
            color: "#2E8AE6",
            highlight: "#5CADFF",
            label: "Drinkable Water"
        },
        {
            value: badh2o,
            //value: 3,
            color: "#B2B200",
            highlight: "#E6E600",
            label: "Waste Water"
        }
    ];

    var ctx = $("#water-chart").get(0).getContext("2d");
    var waterChart = new Chart(ctx).Doughnut(data);
    return waterChart;
}


/*
    var options = {
        //Boolean - Whether we should show a stroke on each segment
        segmentShowStroke : true,

        //String - The colour of each segment stroke
        segmentStrokeColor : "#fff",

        //Number - The width of each segment stroke
        segmentStrokeWidth : 2,

        //Number - The percentage of the chart that we cut out of the middle
        percentageInnerCutout : 50, // This is 0 for Pie charts

        //Number - Amount of animation steps
        animationSteps : 100,

        //String - Animation easing effect
        animationEasing : "easeOutBounce",

        //Boolean - Whether we animate the rotation of the Doughnut
        animateRotate : true,

        //Boolean - Whether we animate scaling the Doughnut from the centre
        animateScale : false,

        //String - A legend template
        legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
    }
*/

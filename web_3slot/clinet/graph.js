//client side code for generating graph
const socket = io();
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawTimeGraph);
google.charts.setOnLoadCallback(drawHourGraph);
var timeGraphArray = [['Time', 'Number of occupied spaces'], ['1',0], ['2',0], ['3',0], ['4',0], ['5',0], ['6',0], ['7',0]];
var hourGraphArray = [['Hour', 'Number of users'],['0',0], ['1',0], ['2',0], ['3',0], ['4',0], ['5',0], ['6',0], ['7',0], ['8',0], ['9',0], ['10',0], ['11',0], ['12',0], ['13',0], ['14',0], ['15',0], ['16',0], ['17',0], ['18',0], ['19',0], ['20',0], ['21',0], ['22',0], ['23',0]];
socket.on('timeGraph', function(numOccupied){
    console.log(numOccupied);
    for (i=0; i<Object.keys(numOccupied).length; i++) {
        timeGraphArray[i+1][1] = numOccupied[i];
    }
});
socket.on('hourGraph', function(usagePerHour){
    for (i=0; i<Object.keys(usagePerHour).length; i++) {
        hourGraphArray[i+1][1] = usagePerHour[i];
    }
});
function drawTimeGraph(){
    var data = google.visualization.arrayToDataTable(timeGraphArray);
    var options = {
        chartArea: {
            width: "90%",
            height: "55%"
        },
        title: 'Car Park Status',
        legend: { position: 'bottom' },
        hAxis: {
            textPosition: "out",
            showTextEvery: 1,
        },
        vAxis: {
            viewWindowMode:'explicit',
            viewWindow: {
                max:3,
                min:0
            },
            textPosition: "in",
            format: '0'
        },
    };
    var chart = new google.visualization.LineChart(document.getElementById('time_graph'));
    chart.draw(data, options);
}

function drawHourGraph(){
    var data = google.visualization.arrayToDataTable(hourGraphArray);
    var options = {
        chartArea: {
            width: "90%",
            height: "55%"
        },
        title: 'Car Park Status',
        legend: { position: 'bottom' },
        hAxis: {
            textPosition: "out",
            showTextEvery: 1,
        },
        vAxis: {
            viewWindowMode:'explicit',
            viewWindow: {
                max:30,
                min:0
            },
            textPosition: "in",
            format: '0'
        }
    };
    var chart = new google.visualization.LineChart(document.getElementById('hour_graph'));
    chart.draw(data, options);
}
setInterval(function(){
    drawTimeGraph();
    drawHourGraph();
}, 1000);
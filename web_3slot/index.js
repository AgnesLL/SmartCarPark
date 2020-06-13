/*
//server side code
const expres = require('express');
const webapp = expres();
const http = require('http');
const httpServer = http.Server(webapp);
const fs = require('fs');
const io = require('socket.io')(httpServer);
var numUsers = 0; //cumulative
var jsondata = require("./data.json"); //state of parking space
var carParkStatusNow = [null , null , null];
webapp.use(expres.static(__dirname + "/clinet"));
httpServer.listen(5000, '0.0.0.0');
webapp.get('/' , (req , res) => 
{
    res.render(__dirname + "/clinet/protoWebpage3.ejs", 
    {
        btn1: jsondata[0].strings,
        btn2: jsondata[1].strings,
        btn3: jsondata[2].strings
    });
});

function deterr(data)
{
    var text = data.toString('utf8').split(" ");
    var state = text[1];
    var id = Number(text[0].slice(6, 7));
    console.log(text);
    console.log(`${state} ${id}`);
    if (state == 'Occupied' && carParkStatusNow[id-1]!='Occupied') {
        carParkStatusNow[id-1] = 'Occupied';
        numUsers++;
    }
    else if (state == 'Obstructed' && carParkStatusNow[id-1]!='Obstructed') {
        carParkStatusNow[id-1] = 'Obstructed';
    }
    else if (state == 'Unoccupied' && carParkStatusNow[id-1]!='Unoccupied'){
        carParkStatusNow[id-1] = 'Unoccupied';
    }
    jsondata[id-1].strings = state.toString();
    io.sockets.emit('clicked' , {jsonstate: state , jsonpos: id});
    io.sockets.emit('returnStatus' , returnval());
    fs.writeFileSync(("./data.json") , JSON.stringify(jsondata) , function(err) {return console.error;});
};

function returnval()
{
    var returnValue = [0 , 0];
    for(i = 0; i<jsondata.length; i++)
    {
        if(i < 3)
        {
            if(jsondata[i].strings == "Unoccupied" || jsondata[i].strings == "Obstructed")
            {
                returnValue[0]++;
            }
        }
        else
        {
            if(jsondata[i].strings == "Unoccupied" || jsondata[i].strings == "Obstructed")
            {
                returnValue[1]++;
            }
        }
    }
    return returnValue;
}

// time graph
var numOccupied = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0};
function calOccupied() {
    var occupiedSpace = 0;
    for (i=0; i<3; i++) {
        if (carParkStatusNow[i]=='Occupied') {
            occupiedSpace++;
        }
    };
    return occupiedSpace
};
// shift data every 15 seconds
setInterval(function(){
    for (i=0; i<(Object.keys(numOccupied).length-1); i++) {
        numOccupied[i] = numOccupied[i+1]
    };
    numOccupied[Object.keys(numOccupied).length-1] = calOccupied();
}, 15*1000);
setInterval(function(){
    numOccupied[Object.keys(numOccupied).length-1] = calOccupied();
    io.sockets.emit('timeGraph', numOccupied);
}, 1000);
// hour graph
// need a better method to get date
var date = new Date();
var hours = date.getHours();
var minute = date.getMinutes();
var usagePerHour = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0, 13:0, 14: 0, 15: 0, 16: 0, 17: 0, 18: 0, 19: 0, 20: 0, 21: 0, 22: 0, 23: 0};
setInterval(function(){
    // set numUsers as 0 and shift data when hour change
    if (minute==0) {
        numUsers = 0;
        for (i=0; i<Object.keys(usagePerHour).length; i++) {
            usagePerHour[i] = usagePerHour[i+1];
        }
        usagePerHour[23] = usagePerHour[0]
    }
}, 60*1000);

setInterval(function(){
    // set numUsers to current hour in usage per hour
    usagePerHour[hours] = numUsers;
    io.sockets.emit('hourGraph', usagePerHour);
}, 1000);
//socket
io.sockets.on('connection', function(data)
{
    //console.log(`${data.id} connected`);
    data.on('photo', function(img){
        io.sockets.emit('image', img);
    });
    
});


io.sockets.on('connect', function(data){
    data.on('changed', function(newdata){
        deterr(newdata);
        io.sockets.emit('status', newdata);
        console.log(newdata);
    });
    data.on('getStatus' , function(nullData)
    {
        io.sockets.emit('returnStatus' , returnval());
    });
});
*/
//var i = 105;
for (var i = 0; i< 2; i++){
    console.log(i);
}
console.log(i);
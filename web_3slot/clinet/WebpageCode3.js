var button1 = document.getElementById('button1');
var button2 = document.getElementById('button2');
var button3 = document.getElementById('button3');

var button1Text = document.getElementById('td4');
var button2Text = document.getElementById('td5');
var button3Text = document.getElementById('td6');

var socket = io();

var video = document.querySelector("#videoElement");
var spaces = document.getElementById('spaces');

function calculate()
{
	var totalSpace = 0;
	var array = [button1Text.innerHTML , button2Text.innerHTML , button3Text.innerHTML];
	for(i = 0; i < array.length; i++)
	{
		if(array[i] == "Unoccupied" || array[i] == "Obstructed")
		{
			totalSpace++;
		}
	}
	spaces.textContent = totalSpace;
}

function Change(col, num){
	if (col == "Occupied"){
		a = "#07ff49";
		b = "#1e7f38";	
	}
	else if (col == "Unoccupied"){
		a = "red";
		b = "#820000";
	}
	else{
		a = "#ffd000";
		b = "#9e740c";
	}
	document.getElementById(`td${num}`).style.borderColor = a;
	document.getElementById(`td${num}`).style.backgroundColor = b;
	document.getElementById(`td${num + 3}`).style.borderColor = a;
	document.getElementById(`td${num + 3}`).style.backgroundColor = b;
	document.getElementById(`td${num + 3}`).textContent = col;
	/*
	if (col == "Occupied"){
		document.getElementById(`td${num + 3}`).textContent = col;
	}
	else{
		document.getElementById(`td${num + 3}`).textContent = "Unoccupied";
	}*/
	

	calculate();
}


socket.on('clicked' , function(newdata)
{
	console.log(newdata);
	var state = newdata.jsonstate;
	var num = Number(newdata.jsonpos);
	Change(state , num);
});

socket.on('image', function(img) {
	
	var image = document.getElementById('base64img');
	image.src = 'data:image/jpeg;base64,'+img;

});






function fretch(str)
{
	fetch(str , {method: 'POST'})
	.then(function(responce)
	{
		if(responce.ok)
		{
			console.log(`${str} responce ok`);
			return;
		}
		throw new Error('Request failed');
		})
		.catch(function(error)
		{
			console.log(error);
		});
}

calculate();


var button1Text = document.getElementById('td4');
var button2Text = document.getElementById('td5');
var button3Text = document.getElementById('td6');
var button4Text = document.getElementById('td10');
var button5Text = document.getElementById('td11');
var button6Text = document.getElementById('td12');

var socket = io();

//var video = document.querySelector("#videoElement");
var spaces = document.getElementById('spaces');

function calculate()
{
	var totalSpace = 0;
	var array = [button1Text.innerHTML , button2Text.innerHTML , button3Text.innerHTML, button4Text.innerHTML, button5Text.innerHTML, button6Text.innerHTML];
	for(i = 0; i < array.length; i++)
	{
		if(array[i] == "Unoccupied" || array[i] == "Obstructed")
		{
			totalSpace++;
		}
	}
	spaces.textContent = totalSpace;
}

socket.on('clicked' , function(newdata)
{
	var state = newdata.jsonstate;
	var num = Number(newdata.jsonpos);
	console.log(newdata);
	Change(state , num);
});
socket.on("image1", function(img) {
	var image = document.getElementById('base64img1');
	image.src = 'data:image/jpeg;base64,'+img;
	console.log(image.src);
});

socket.on("image2", function(img) {
	var image = document.getElementById('base64img2');
	image.src = 'data:image/jpeg;base64,'+img;
	console.log(image.src);
});

function Change(col, num){
	if (col == "Unoccupied"){
		a = "red";
		b = "#820000";
	}
	else if (col == "Occupied"){
		a = "#07ff49";
		b = "#1e7f38";
	}
	else if(col == "Obstructed"){
		a = "#ffd000";
		b = "#9e740c";
	}
	if (num>3){
		num += 3;
	}
	document.getElementById(`td${num}`).style.borderColor = a;
	document.getElementById(`td${num}`).style.backgroundColor = b;
	document.getElementById(`td${num + 3}`).style.borderColor = a;
	document.getElementById(`td${num + 3}`).style.backgroundColor = b;
	document.getElementById(`td${num + 3}`).textContent = col;


	calculate();
}

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


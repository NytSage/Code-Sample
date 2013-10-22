var red = 0;
var green = 0;
var blue = 0;
var redState = "Up";
var greenState = "Hold";
var blueState = "Hold";

function StartColorShift(elementID, speedMS)
{
	var element = document.getElementsByClassName(elementID)[0];
	element.style.backgroundColor="rgb(0,0,0)";
	window.setInterval(function(){ShiftColors(element)}, speedMS);
}

function ShiftColors(elementID)
{
	switch(redState)
	{
		case "Up":
			if(red < 255)
			{	red += 1;}
			else
			{	redState = "Down";}
			break;
		case "Down":
			if(red > 0)
			{	red -= 1;}
			else
			{	redState = "Hold";}
			break;
		case "Hold":
			if(blue > 128)
			{	redState = "Up";}
			break;
	}
	switch(greenState)
	{
		case "Up":
			if(green < 255)
			{	green += 1;}
			else
			{	greenState = "Down";}
			break;
		case "Down":
			if(green > 0)
			{	green -= 1;}
			else
			{	greenState = "Hold";}
			break;
		case "Hold":
			if(red > 128)
			{	greenState = "Up";}
			break;
	}
	switch(blueState)
	{
		case "Up":
			if(blue < 255)
			{	blue += 1;}
			else
			{	blueState = "Down";}
			break;
		case "Down":
			if(blue > 0)
			{	blue -= 1;}
			else
			{	blueState = "Hold";}
			break;
		case "Hold":
			if(green > 128)
			{	blueState = "Up";}
			break;
	}
	elementID.style.backgroundColor="rgb("+red+","+green+","+blue+")";
}
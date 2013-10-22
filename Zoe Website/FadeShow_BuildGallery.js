var infoPanelVisibility = 0;
var fadeInvertvalID = null;

var slideShow = null;
var picture = new Array();
	picture[0] = "Gallery/Barky.jpg";
	picture[1] = "Gallery/HalfDog.jpg";
	picture[2] = "Gallery/PlumpCat.png";
	picture[3] = "Gallery/SaberFlappy.png";
	picture[4] = "Gallery/Sparkles.jpg";
var waitTimer = 0;

var imageArea1 = new Object();
imageArea1.classID;
imageArea1.visibility = 1;
imageArea1.state = "Hold";
imageArea1.index = 0;
var imageArea2 = new Object();
imageArea2.classID;
imageArea2.visibility = 0;
imageArea2.state = "Hold";
imageArea2.index = Math.floor(picture.length/2);

var galleryImage = new Array();

function StartSlideShow(image1IDstr, image2IDstr, speedMS, holdMS)
{
	if(slideShow == null)
	{
		imageArea1.classID = document.getElementsByClassName(image1IDstr)[0];
		imageArea2.classID = document.getElementsByClassName(image2IDstr)[0];
		waitTimer = holdMS;
		slideShow = setInterval(function() {SlideShow(imageArea1, imageArea2, holdMS)}, speedMS);
	}
}
function SlideShow(image1ID, image2ID, holdMS)
{
	if(imageArea1.state == "Hold" && imageArea2.state == "Hold")
	{
		if(waitTimer >= holdMS)
		{
			if(imageArea1.visibility == 1 && imageArea2.visibility == 0)
			{
				imageArea1.state = "Down";
				imageArea2.state = "Change";
				waitTimer = 0;
			}
			else if(imageArea2.visibility == 1 && imageArea1.visibility == 0)
			{
				imageArea1.state = "Change";
				imageArea2.state = "Down";
				waitTimer = 0;
			}
			else
			{
				imageArea1.visibility = 1;
				imageArea2.visibility = 0;
				waitTimer = 0;
			}
		}
		else
		{	waitTimer++;}
	}
	else
	{
		UpdateState(imageArea1);
		UpdateState(imageArea2);	
		
		imageArea1.classID.src = picture[imageArea1.index];
		imageArea1.classID.style.opacity = imageArea1.visibility;
		imageArea1.classID.height = 500;
		
		imageArea2.classID.src = picture[imageArea2.index];
		imageArea2.classID.style.opacity = imageArea2.visibility;
		imageArea2.classID.height = 500;
	}
}
function UpdateState(area)
{
	switch(area.state)
	{
		case "Up":
			if(area.visibility < 1)
			{	
				area.visibility += 0.01;
				if(area.visibility > 1)
				{	area.visibility = 1;}
			}
			else
			{	area.state = "Hold"}
			break;
		case "Down":
			if(area.visibility > 0)
			{	
				area.visibility -= 0.01;
				if(area.visibility < 0)
				{	area.visibility = 0;}
			}
			else
			{	area.state = "Hold"}
			break;
		case "Change":
			if(area.index < (picture.length-1))
				{area.index += 1;}
			else 
				{area.index = 0;}
			area.state = "Up"
			break;
	}
}

function StartMouseHoverFade(classID, amount, speedMS)
{
	if(fadeInvertvalID != null)
	{	window.clearInterval(fadeInvertvalID);}
	fadeInvertvalID = setInterval(function() {Fade(classID, amount)}, speedMS);
}
function Fade(classID, amount)
{
	infoPanelVisibility = parseFloat(classID.style.opacity);
	if(infoPanelVisibility < amount)
	{	
		infoPanelVisibility += 0.01;
		if(infoPanelVisibility > amount)
		{	infoPanelVisibility = amount;}
	}
	else if(infoPanelVisibility > amount)
	{	
		infoPanelVisibility -= 0.01;
		if(infoPanelVisibility < amount)
		{	infoPanelVisibility = amount;}
	}
	else
	{	
		window.clearInterval(fadeInvertvalID);
		return;
	}
	classID.style.opacity = infoPanelVisibility;
}

function BuildGallery() 
{
    for(var i = 0; i < picture.length; i++)
	{
    	var img = document.createElement("img");
		galleryImage.push(img);
		
		galleryImage[i].src = picture[i];
		galleryImage[i].widthOriginal = img.style.width;
		galleryImage[i].heightOriginal = img.style.height; //PROBLEM HERE! Original sizes "" or 0
		galleryImage[i].width = 128;
		galleryImage[i].height = 128;
		galleryImage[i].widthHolder = 128;
		galleryImage[i].heightHolder = 128;
		galleryImage[i].style.padding = "10px";
		galleryImage[i].alt = "image" + i;
		galleryImage[i].style.cssFloat = "left";
		galleryImage[i].style.border = "3px ridge #666";
		galleryImage[i].style.zIndex = 1;
		galleryImage[i].isExpanded = false;
		document.body.appendChild(galleryImage[i]);
		
		galleryImage[i].addEventListener("mouseover", function() {Grow(this);},false);
		galleryImage[i].addEventListener("mouseout", function() {Shrink(this);},false);
		galleryImage[i].addEventListener("click", function() {PickUp_PutBack(this);},false);
	}
}

function Grow(imageID)
{
	if(!imageID.isExpanded)
	{
		imageID.width = 154; 
		imageID.height = 154;
	}
}
function Shrink(imageID)
{
	if(!imageID.isExpanded)
	{
		imageID.width = 128;
		imageID.height = 128;
	}
}
function PickUp_PutBack(imageID)
{
	var backBlocker = document.getElementsByClassName("backBlocker")[0];
	if(imageID.isExpanded)
	{		
		imageID.style.position = "relative";
		imageID.style.zIndex = 1;
		imageID.style.left = "0";
		imageID.style.top = "0";
		imageID.width = imageID.widthHolder;
		imageID.height = imageID.heightHolder;
		backBlocker.style.zIndex = -1;
		
		imageID.isExpanded = false;
	}
	else
	{		
		imageID.style.position = "absolute";
		imageID.style.zIndex = 3;
		imageID.style.left = "0";
		imageID.style.top = "0";
		if(imageID.widthOriginal < imageID.heightOriginal)
		{	
			imageID.width = 813;
			imageID.height = 813 * (imageID.heightOriginal / imageID.widthOriginal);
		}
		else
		{	
			imageID.height = 504;
			imageID.width = 504 * (imageID.widthOriginal / imageID.heightOriginal);
		}
		backBlocker.style.zIndex = 2;
		
		imageID.isExpanded = true;
	}
	
}

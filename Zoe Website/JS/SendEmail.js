function validateForm()
{
	document.forms["contactForm"].action = "mailto:zoemnx@gmail.com?subject=Oasis Q%2FC: " + document.forms["contactForm"]["Name"].value + " (" + document.forms["contactForm"]["Subject"].value + ")";
	
	if(document.forms["contactForm"]["Name"].value == "")
	{
		alert("No name entered");
		return false;
	}
	if(document.forms["contactForm"]["Subject"].value == "")
	{
		alert("No subject entered");
		return false;
	}
	if(document.forms["contactForm"]["Message"].value == "")
	{
		alert("No message entered");
		return false;
	}
}
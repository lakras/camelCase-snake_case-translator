var inputFieldID = "camelField";
var outputFieldID = "snakeField";

translateCamelToSnake = function()
{
	inputFieldID = "camelField";
	outputFieldID = "snakeField";

	startTranslation();
	
	// translates camelCase to snake_case
	var output = input.replace(/([a-z])([A-Z])/g, "$1" + "_" + "$2");
	output = output.replace(/[a-z]_([A-Z])/g, function($0,$1) {return $0.replace($1, $1.toLowerCase());})
	
	endTranslation(output);
}

translateSnakeToCamel = function()
{
	inputFieldID = "snakeField";
	outputFieldID = "camelField";

	startTranslation();
	
	// translates snake_case to camelCase
	var output = input.replace(/\w_(\w)/g, function($0,$1) {return $0.replace($1, $1.toUpperCase());})
	output = output.replace(/(\w)_(\w)/g, "$1" + "$2");
	
	endTranslation(output);
}

upperCase = function(value)
{
	return value.toUpperCase();
}

lowerCase = function(value)
{
	return value.toLowerCase();
}

var timeoutTimer;
var input;
startTranslation = function()
{
	// retrieves code from input field
	input = document.getElementById(inputFieldID).value;
	
	// kills translation if it hasn't finished in 3 seconds
	timeoutTimer = setTimeout(respondToTimeout, 3000);
}

endTranslation = function(output)
{
	clearTimeout(timeoutTimer);

	// moves translated code to output field
	document.getElementById(outputFieldID).value = output;
}

// handles timeout
var commonErrorMessage = "\n\nPlease consider filing an issue with your code so that the bug causing this timeout can be fixed."
		+ " You can copy/paste the following URL:"
		+ "\nhttps://github.com/lakras/camelCase-snake_case-translator/issues"
		+ "\n\nSorry this happened. Thank you!";
respondToTimeout = function()
{
	document.getElementById(outputFieldID).value = "Translation timed out."
		+ commonErrorMessage;
}

// handles errors
respondToError = function(errorMessage)
{
	clearTimeout(timeoutTimer);
	if(!inputFieldIsEmpty())
	{
		document.getElementById(outputFieldID).value = "Translation failed with error: " + errorMessage
			+ commonErrorMessage;
	}
}
window.onerror = function(errorMessage, url, lineNumber)
{
	respondToError(errorMessage);
}
window.addEventListener("error", function(error)
{
	respondToError(error.message);
});

inputFieldIsEmpty = function()
{
	var contents = document.getElementById(inputFieldID).value;
	if(contents.length == 0)
	{
		return true;
	}
	if(contents === "Enter camelCase code here.")
	{
		return true;
	}
	if(contents === "Or enter snake_case code here.")
	{
		return true;
	}
	return false;
}

clearInputFields = function()
{
	if(document.getElementById("camelField").value == "Enter camelCase code here.")
	{
		document.getElementById("camelField").value = "";
	}
	if(document.getElementById("snakeField").value == "Or enter snake_case code here.")
	{
		document.getElementById("snakeField").value = "";
	}
}

copyCamelToClipboard = function() { copyToClipboard("camelField"); }
copySnakeToClipboard = function() { copyToClipboard("snakeField"); }
copyToClipboard = function(fieldID)
{
	var textToCopy = document.getElementById(fieldID).value;
	document.getElementById(fieldID).select();
	document.execCommand('copy');
	setTimeout(deselectFields,300);
}

deselectFields = function()
{
	document.getElementById("camelField").blur();
	document.getElementById("snakeField").blur();
}

function getIoSetObject()
{	
	var validString = 'RO-67';
	var invalidString = 'UNKNOWN-X';
	var codeSplit = validString.split("-");
	var numberElement = codeSplit[1];
	var objectRes = {};
	
	objectRes["validInput"] = validString;
	objectRes["invalidInput"] = invalidString;
	objectRes["parsedCode"] = codeSplit[0];
	objectRes["parsedIndex"] = Number.parseInt(numberElement);
	objectRes["typeErrorText"] = "ioSetId.split is not a function";
	objectRes["nullErrorText"] = "Cannot read property 'split' of null";
	
	return objectRes;
}

module.exports = getIoSetObject();